import sys
import os
import re
import shutil
import subprocess
import tempfile
import json
from grow.documents import document
from grow.collections import collection
from grow.pods import pods

from util.constants import FORMAT_TYPE_IDS, DEFAULT_FORMAT
from util.example_extractor import SourceCodeExtractor
from util.example_exporter import ExampleExporter

CONTENT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../content'))

AMP_VALIDATOR_JS_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../node_modules/amphtml-validator/index.js'))

podspec_yaml = '' \
   'env:\n' \
   '  name: local\n' \
   '  host: localhost\n' \
   'base_urls:\n' \
   '  preview: \'https://preview.amp.dev\'\n' \
   'deployments:\n' \
   '  default:\n' \
   '    name: default\n' \
   '    destination: local\n'

FRONTMATTER_FORMAT_PATTERN = re.compile(r'^\s*---\n(?:.(?!\n---))*\nformats:((?:\s+-\s*[a-z]+ *\n)+)',
                                        re.DOTALL | re.IGNORECASE)

EXAMPLE_FILENAME_PATTERN = re.compile(r'/(\d+)\.example\.(\d+)(?:\.(\w+))?\.html')


class ExampleExportValidator:

  def __init__(self):

    self.example_md_counter = 0
    self.example_mds = []

    self.all_found_formats = set()

    self.extractor = SourceCodeExtractor()

    self.temp_dir = tempfile.mkdtemp('inline-examples', 'amp_build')
    sys.stdout.write('Use temp dir: {}\n'.format(self.temp_dir))

    podspec_file = os.path.join(self.temp_dir, 'podspec.yaml')
    with open(podspec_file, mode='w') as fp:
      fp.write(podspec_yaml)

  def generate_examples_and_validate(self):
    self.extract_examples_from_dir(CONTENT_PATH)
    errors = []
    errors.extend(self.validate_generated_email_html())
    errors.extend(self.validate_generated_ads_html())
    errors.extend(self.validate_generated_website_html())
    errors.sort()

    for error in errors:
      sys.stdout.write(error)

    sys.stdout.write('Found {} errors in {} files with inline examples.'.format(len(errors), len(instance.example_mds)))

    shutil.rmtree(self.temp_dir)

    return len(errors) > 0

  def extract_examples_from_dir(self, path):
    files = os.listdir(path)
    files.sort()
    for entry in files:
      entry_path = os.path.join(path, entry)
      if os.path.isdir(entry_path):
        self.extract_examples_from_dir(entry_path)
      elif entry.endswith('.md'):
        self.extract_examples_from_file(entry_path)

  @staticmethod
  def load_file_content(path):
    with open(path, 'rb') as markdown_file:
      file_contents = markdown_file.read().decode('utf-8')
      return file_contents

  def extract_examples_from_file(self, path):
    file_contents = self.load_file_content(path)
    matches = self.extractor.find_examples_in_markdown(file_contents)
    if matches:
      self.example_mds.append(path)
      formats = self.get_formats_from_frontmatter(file_contents, path)
      self.all_found_formats.update(formats)
      doc = self.createTempDoc(formats)
      self.example_md_counter = self.example_md_counter + 1

      sys.stdout.write('found {} examples in {} (formats={})\n'.
                       format(len(matches), path[len(CONTENT_PATH):], formats))
      for match in matches:
        exporter = ExampleExporter(doc, match.inlineExample)
        exporter.generate_html()

  def get_formats_from_frontmatter(self, markdown_content, path):
    formats = []
    match = FRONTMATTER_FORMAT_PATTERN.search(markdown_content)
    if match:
      format_yaml =match.group(1)
      for format_id in FORMAT_TYPE_IDS:
        if format_id in format_yaml:
          formats.append(format_id)
    elif '@' in path:
      # translations inherit the frontmatter definition from the base language document
      return self.get_formats_from_default_language(path)
    if len(formats) == 0:
      formats.append(DEFAULT_FORMAT)
    return formats

  def get_formats_from_default_language(self, path):
    parent_path = path[:path.rindex('@')] + '.md'
    try:
      content = self.load_file_content(parent_path)
      return self.get_formats_from_frontmatter(content, parent_path)
    except:
      sys.stdout.write('Unable to load default language content file at {}\n'.format(parent_path))
      return [DEFAULT_FORMAT]

  def createTempDoc(self, formats):
    pod = pods.Pod(self.temp_dir)
    pod.get_podspec().yaml.get('deployments').get('default').setdefault('extracted_examples_dir', self.temp_dir)

    coll = collection.Collection(self.temp_dir, pod)
    coll.fields = {}

    doc = document.Document('/{}.md'.format(self.example_md_counter), pod, _collection=coll)
    doc.fields = {
      '$title': 'Test',
      '$path': '/{}.html'.format(self.example_md_counter),
      'formats': formats,
    }
    return doc

  def get_validation_errors(self, validator_output):
    errors = []
    validations = json.loads(validator_output)
    for path, result in validations.items():
      if result['status'] == 'FAIL':
        error_message = self.get_error_text_pattern(path)
        for error in result['errors']:
          errors.append(error_message.format(error['line'], error['col'], error['message']))
    return errors

  def get_error_text_pattern(self, path):
    match = EXAMPLE_FILENAME_PATTERN.search(path)
    if match:
      index = int(match.group(1))
      source_file = self.example_mds[index]
      source_file = source_file[len(CONTENT_PATH):]
      format_id = DEFAULT_FORMAT
      if match.group(3):
        format_id = match.group(3)
      return '{} (example:{}:{{}}:{{}}, format:{}): {{}}\n'.format(source_file, match.group(2), format_id)

    return path

  def validate_generated_email_html(self):
    command = ['node', AMP_VALIDATOR_JS_PATH, '--format', 'json', '--html_format', 'AMP4EMAIL']
    return self.perform_validation(command, '.email.html')

  def validate_generated_ads_html(self):
    command = ['node', AMP_VALIDATOR_JS_PATH, '--format', 'json', '--html_format', 'AMP4ADS']
    return self.perform_validation(command, '.ads.html')

  def validate_generated_website_html(self):
    command = ['node', AMP_VALIDATOR_JS_PATH, '--format', 'json']
    return self.perform_validation(command, '.html')

  def perform_validation(self, base_command, file_ending):
    result = []
    command = []
    command.extend(base_command)
    for html_file in os.listdir(self.temp_dir):
      if html_file.endswith(file_ending):
        html_file_path = os.path.join(self.temp_dir, html_file)
        command.append(html_file_path)
    # sys.stdout.write('Validation command {} {}\n'.format(command, file_ending))
    if len(command) > len(base_command):
      try:
        subprocess.check_output(command)
      except subprocess.CalledProcessError as error:
        result = self.get_validation_errors(error.output)
    # remove the checked files, so that we can later simply check all remaining files
    for html_file_path in command[len(base_command):]:
      os.remove(html_file_path)
    return result

instance = ExampleExportValidator()
if instance.generate_examples_and_validate():
  sys.exit(1)

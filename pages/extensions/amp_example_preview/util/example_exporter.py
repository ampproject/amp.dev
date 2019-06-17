import sys
import urlparse
import errno
from grow.documents import document

from example_document import ExampleDocument
from templates import *


FORMAT_TYPE_IDS = {
  'websites',
  'email',
  'ads',
  'stories',
}

DEFAULT_FORMAT = 'websites'

TEMPLATE_PATH = 'layouts/example-pages/'

TEMPLATES = {
  'websites': load_template(TEMPLATE_PATH + 'amp-websites-page.j2'),
  'stories': load_template(TEMPLATE_PATH + 'amp-stories-page.j2'),
  'ads': load_template(TEMPLATE_PATH + 'amp-ads-page.j2'),
  'email': load_template(TEMPLATE_PATH + 'amp-email-page.j2'),
}


class ExampleExport(object):

  def __init__(self, doc, example_document, type_id):
    """
    :type doc: document.Document
    :type example_document: ExampleDocument
    :type type_id: str
    """
    self.title = doc.title
    self.example = example_document
    self.type_id = type_id

    self.base_url = doc.pod.get_podspec().yaml.get('base_urls').get('preview')

    self.file_path = self.get_file_path(doc, example_document.index, type_id)
    self.canonical = urlparse.urljoin(self.base_url, self.file_path)
    self.url_without_format = urlparse.urljoin(self.base_url,
                                               self.get_file_path(doc, example_document.index, DEFAULT_FORMAT))

    self.language = doc.locale

  @staticmethod
  def get_file_path(doc, example_index, type_id):
    """
    :type doc: document.Document
    :type example_index: int
    :type type_id: str
    """
    result = doc.get_serving_path()
    result = result[:result.rfind('.')]  # cut off extension
    if type_id == DEFAULT_FORMAT:
      result = result + '.example.{index}.html'.format(index=example_index)
    else:
      result = result + '.example.{index}.{type}.html'.format(index=example_index, type=type_id)
    return result


class ExampleExporter(object):

  def __init__(self, doc, example_document):
    """
    :type doc: document.Document
    :type example_document: ExampleDocument
    """
    self.doc = doc
    self.example_document = example_document

  def get_example_export(self, type_name):
    if not type_name in FORMAT_TYPE_IDS:
      raise Exception('Unsupported format type: {}'.format(type))
    example_export = ExampleExport(self.doc, self.example_document, type_name)
    return example_export

  def generate_html(self):
    examples_dir = self.doc.pod.get_podspec().yaml.get('deployments').get('default').get('extracted_examples_dir')

    if not examples_dir:
      self.doc.pod.logger.info('extracted_examples_dir not set in grow deployment. '
                               'Will not write examples for {}'.format(self.doc.pod_path))
      return

    formats = ['websites']
    if hasattr(self.doc, 'formats') and len(self.doc.formats) > 0:
      formats = self.doc.formats

    preview_url = None

    for type_name in formats:
      example_export = self.get_example_export(type_name)
      self.write_example(example_export, examples_dir)
      if preview_url is None:
        preview_url = example_export.url_without_format

    return preview_url


  def write_example(self, example_export, examples_dir):
    template = TEMPLATES[example_export.type_id]
    content = template.render(export=example_export, example=example_export.example, doc=self.doc).encode('utf8')

    file_path = os.path.join(examples_dir, example_export.file_path.lstrip('/'))
    dir_name = os.path.dirname(file_path)
    try:
      os.makedirs(dir_name)
    except OSError as exc:
      if exc.errno == errno.EEXIST:
        pass
      else:
        raise
    with open(file_path, mode='w') as fp:
      fp.write(content)

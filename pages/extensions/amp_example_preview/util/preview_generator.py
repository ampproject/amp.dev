import re
from preview import ExamplePreviewMatch
from constants import ATTRIBUTE_EXAMPLE_TEMPLATES, ATTRIBUTE_EXAMPLE_IMPORTS
from templates import load_template

# find existing imports
IMPORT_PATTERN = re.compile(r'<script(?:\s[^>]*)?\scustom-(element|template)\s*=\s*"?([^"\s>/]+)',
                            re.IGNORECASE)

AMP_CUSTOM_DEPENDENCY_TEMPLATE = '<script async custom-{type}="{dependency}" ' \
                                 'src="https://cdn.ampproject.org/v0/{dependency}-{version}.js"></script>'

TEMPLATE_PATH = '/views/partials/code-preview/code-preview.j2'

def trigger(doc, original_body, content):
  if ExamplePreviewMatch.has_preview(content):
    return _transform(doc, original_body, content)
  return content


def _transform(doc, original_body, content):
  output = ''
  # find the end of the head section to insert the dependency scripts there
  pos = content.index('</head>')
  if pos < 0:
    return content

  output = output + content[0:pos]
  output = output + get_dependency_scripts(doc, content)

  matches = ExamplePreviewMatch.extract_previews(content)
  for match in matches:
    output = output + content[pos:match.start_tag_start]
    output = output + generate_preview(doc, content[match.start_tag_end:match.end_tag_start], match.preview)
    pos = match.end_tag_end

  output = output + content[pos:]
  return output


def generate_preview(doc, content, preview):
  output = ''
  preview_template = load_template(TEMPLATE_PATH, doc)
  output = output + preview_template.render(
    preview=preview,
    podspec=doc.pod.podspec,
    content=content)
  return output


def get_dependency_scripts(doc, content):
  output = ''

  if not hasattr(doc, ATTRIBUTE_EXAMPLE_IMPORTS):
    return output

  amp_imports = getattr(doc, ATTRIBUTE_EXAMPLE_IMPORTS)
  amp_templates = getattr(doc, ATTRIBUTE_EXAMPLE_TEMPLATES)

  if (amp_imports is not None and len(amp_imports) > 0
    or amp_templates is not None and len(amp_templates) > 0):

    existing_import = IMPORT_PATTERN.search(content)

    while existing_import:
      if existing_import.group(1) == 'element':
        amp_imports.discard(existing_import.group(2))
      else:
        amp_templates.discard(existing_import.group(2))

      existing_import = IMPORT_PATTERN.search(content, existing_import.end(0))

  if amp_imports is not None and len(amp_imports) > 0:
    for custom_element in amp_imports:
      output = output + AMP_CUSTOM_DEPENDENCY_TEMPLATE.format(
        type='element', dependency=custom_element.name, version=custom_element.version)

  if amp_templates is not None and len(amp_templates) > 0:
    for custom_template in amp_templates:
      output = output + AMP_CUSTOM_DEPENDENCY_TEMPLATE.format(
        type='template', dependency=custom_template.name, version=custom_template.version)

  return output

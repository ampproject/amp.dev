from .example_extractor import SourceCodeExtractor
from .example_exporter import ExampleExporter
from .preview import ExamplePreview
from .amp_component_versions import get_component
from .constants import ATTRIBUTE_EXAMPLE_TEMPLATES, ATTRIBUTE_EXAMPLE_IMPORTS, ATTRIBUTE_HAS_INLINE_PREVIEW

EXAMPLE_TRIGGER = '[example'


def trigger(doc, original_body, content):
  if EXAMPLE_TRIGGER in original_body:
    return _transform(doc, content)
  return content


def _transform(doc, content):
  source_extractor = SourceCodeExtractor()
  example_matches = source_extractor.find_examples_in_markdown(content)

  all_imports = set()
  all_templates = set()

  import_iframe = False

  pos = 0
  count = 0
  result = ''
  for match in example_matches:
    count = count + 1

    example_document = match.inlineExample
    doc.pod.logger.info('Found example {} in {}'.format(example_document.index, doc.pod_path))

    extract_url = extract_preview_file(doc, example_document)

    result = result + content[pos:match.startTagStart]

    preview = ExamplePreview(index=example_document.index,
                             mode=example_document.preview,
                             orientation=example_document.orientation,
                             url=extract_url,
                             playground=example_document.playground,
                             source=example_document.body)

    result = result + preview.get_start_tag()
    result = result + content[match.startTagEnd:match.endTagStart]
    result = result + preview.get_end_tag()

    if example_document.has_iframe_preview:
      import_iframe = True

    all_imports.update(example_document.imports)

    if example_document.template:
      all_templates.add(example_document.template)

    pos = match.endTagEnd

  result = result + content[pos:]

  # use any existing iframe or import the latest version
  if import_iframe:
    for component in all_imports:
      if component.name == 'amp-iframe':
        import_iframe = False
  if import_iframe:
    all_imports.add(get_component('amp-iframe'))

  # transfer the dependencies to the post processor
  setattr(doc, ATTRIBUTE_EXAMPLE_IMPORTS, all_imports)
  setattr(doc, ATTRIBUTE_EXAMPLE_TEMPLATES, all_templates)

  if count > 0:
    # we set this attribute, so that the page template knows it must include additional css
    setattr(doc, ATTRIBUTE_HAS_INLINE_PREVIEW, True)

  return result


def extract_preview_file(doc, inline_example):
  exporter = ExampleExporter(doc, inline_example)
  return exporter.generate_html()

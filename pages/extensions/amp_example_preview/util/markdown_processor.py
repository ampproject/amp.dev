from grow.documents import document
from .example_extractor import *

import os

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

    pos = 0
    count = 0
    result = ''
    for match in example_matches:

        inline_example = match.inlineExample

        count = count + 1

        doc.pod.logger.debug('Found example {} in {}'.format(inline_example.index, doc.pod_path))

        result = result + content[pos:match.startTagStart]

        result = result + '' \
                 + '<!-- preview id={} mode={} playground={}\n'.format(
                          inline_example.index,
                          inline_example.preview,
                          inline_example.playground)

        if inline_example.preview == 'inline':
            result = result + inline_example.source

        result = result + '\n-->\n'
        result = result + content[match.startTagEnd:match.endTagStart]
        result = result + '<!-- /preview -->' \
                          ''

        all_imports = all_imports.union(inline_example.imports)

        if inline_example.template:
            all_templates.add(inline_example.template)

        write_preview_file(doc, inline_example)

        pos = match.endTagEnd

    result = result + content[pos:]

    setattr(doc, 'example_imports', all_imports)
    setattr(doc, 'example_templates', all_templates)

    if count > 0:
        setattr(doc, 'has_inline_preview', True)

    return result


def write_preview_file(doc, inline_example):
    # TODO: implement
    base_path = doc.pod.root
    doc_path = document.Document.clean_localized_path(doc.pod_path, doc.locale)
    # deployment = doc.pod.get_deployment('default')
    build_dir = doc.pod.yaml.get('deployments').get('default').get('out_dir')
    # doc.pod.logger.info('m###### WRITE FILE {} {} {}'.format(inline_example.index, doc.get_serving_path(), build_dir))
    target_file = '{}.example.{}.html'.format(os.path.join(doc.pod.root, doc.get_serving_path().lstrip('/')), inline_example.index)
    # doc.pod.logger.info('m###### WRITE FILE ' + target_file)
    # doc.pod.write_file(target_file, inline_example.source)

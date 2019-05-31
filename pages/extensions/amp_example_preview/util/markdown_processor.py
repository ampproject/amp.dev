from grow.documents import document
from .example_extractor import *
from .preview import ExamplePreview
from .constants import *

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

        preview = ExamplePreview.for_attributes(inline_example.index,
                                                inline_example.preview,
                                                inline_example.playground,
                                                inline_example.source)

        result = result + preview.get_start_tag()
        result = result + content[match.startTagEnd:match.endTagStart]
        result = result + preview.get_end_tag()

        all_imports = all_imports.union(inline_example.imports)

        if inline_example.template:
            all_templates.add(inline_example.template)

        write_preview_file(doc, inline_example)

        pos = match.endTagEnd

    result = result + content[pos:]

    # transfer the dependencies to the post processor
    setattr(doc, ATTRIBUTE_EXAMPLE_IMPORTS, all_imports)
    setattr(doc, ATTRIBUTE_EXAMPLE_TEMPLATES, all_templates)

    if count > 0:
        # we set this attribute, so that the page template knows it must include additional css
        setattr(doc, ATTRIBUTE_HAS_INLINE_PREVIEW, True)

    return result


def write_preview_file(doc, inline_example):
    # TODO: implement
    base_path = doc.pod.root
    doc_path = document.Document.clean_localized_path(doc.pod_path, doc.locale)

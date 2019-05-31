import re
import requests

COMPONENT_VERSIONS_URL = 'https://playground.amp.dev/api/amp-component-versions'

COMPONENT_VERSIONS = requests.get(COMPONENT_VERSIONS_URL).json()

PREVIEW_TRIGGER = '<!-- preview'
PREVIEW_PATTERN = re.compile(r'<!--\s*preview(\s+[^\n]+)?\s*\n(.*?)-->(.*?)<!--\s*/\s*preview\s*-->', re.DOTALL)

# find existing imports
IMPORT_PATTERN = re.compile(r'<script(?:\s[^>]*)?\scustom-(element|template)\s*=\s*"?([^"\s>/]+)',
                            re.IGNORECASE)

AMP_CUSTOM_DEPENDENCY_TEMPLATE = '<script async custom-{type}="{dependency}" ' \
                              'src="https://cdn.ampproject.org/v0/{dependency}-{version}.js"></script>'


def trigger(doc, original_body, content):
    if PREVIEW_TRIGGER in original_body:
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

    match = PREVIEW_PATTERN.search(content)
    while match:
        settings = match.group(1)
        doc.pod.logger.debug('generate preview' + settings)

        output = output + content[pos:match.start(0)]

        inline_preview = 'mode=inline' in settings
        if inline_preview:
            output = output + '<div class="ap-o-code-preview">\n' \
                              '  <div class="ap-o-code-preview-preview">\n'
            output = output + match.group(2)
            output = output + '\n' \
                              '  </div>\n'

        output = output + match.group(3)

        if inline_preview:
            output = output + '\n</div>'

        pos = match.end(0)
        match = PREVIEW_PATTERN.search(content, pos)

    output = output + content[pos:]

    return output


def get_dependency_scripts(doc, content):
    output = ''

    if not hasattr(doc, 'example_imports'):
        return output

    amp_imports = getattr(doc, 'example_imports')
    amp_templates = getattr(doc, 'example_templates')

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
            version = COMPONENT_VERSIONS[custom_element] if custom_element in COMPONENT_VERSIONS else '0.1'
            output = output + AMP_CUSTOM_DEPENDENCY_TEMPLATE.format(
                    type='element', dependency=custom_element, version=version)

    if amp_templates is not None and len(amp_templates) > 0:
        for custom_template in amp_templates:
            version = COMPONENT_VERSIONS[custom_template] if custom_template in COMPONENT_VERSIONS else '0.1'
            output = output + AMP_CUSTOM_DEPENDENCY_TEMPLATE.format(
                    type='template', dependency=custom_template, version=version)

    return output

import re

EXAMPLE_PATTERN = re.compile(r'\[\s*example(\s[^\]]*)?\](.*?\n```html *\n(.*?)\n```.*?)\[\s*/\s*example\s*\]',
                             re.IGNORECASE | re.MULTILINE | re.DOTALL)

PREVIEW_ATTRIBUTE_PATTERN = re.compile(r'\spreview\s*=\s*"([^"]+)"')
PLAYGROUND_ATTRIBUTE_PATTERN = re.compile(r'\splayground\s*=\s*"([^"]+)"')
IMPORT_ATTRIBUTE_PATTERN = re.compile(r'\simports\s*=\s*"([^"]+)"')
TEMPLATE_ATTRIBUTE_PATTERN = re.compile(r'\stemplate\s*=\s*"([^"]+)"')


class InlineExample(object):
    def __init__(self, source, index):
        self.preview = 'inline'
        self.index = index
        self.imports = set()
        self.template = ''
        self.playground = True
        self.source = source


class InlineExampleMatch(object):
    def __init__(self, inlineExample):
        self.inlineExample = inlineExample
        self.startTagStart = -1
        self.startTagEnd = -1
        self.sourceBlockStart = -1
        self.sourceBlockEnd = -1
        self.endTagStart = -1
        self.endTagEnd = -1


class SourceCodeExtractor(object):

    def find_examples_in_markdown(self, content):
        """
          @type content: str
        """
        count = 0
        pos = 0

        result = []

        match = EXAMPLE_PATTERN.search(content)
        while match:
            count = count + 1

            attribute_string = match.group(1)

            inline_example = InlineExample(match.group(3), count)

            inline_example.preview = self._get_attribute_value(PREVIEW_ATTRIBUTE_PATTERN, attribute_string)
            inline_example.playground = \
                self._get_attribute_value(PLAYGROUND_ATTRIBUTE_PATTERN, attribute_string).lower() != 'false'
            inline_example.imports = set(
                self._get_attribute_value(IMPORT_ATTRIBUTE_PATTERN, attribute_string).split(','))
            inline_example.imports.discard('')  # in case the import is empty
            inline_example.template = self._get_attribute_value(TEMPLATE_ATTRIBUTE_PATTERN, attribute_string)

            inline_example_match = InlineExampleMatch(inline_example)
            inline_example_match.startTagStart = match.start(0)
            inline_example_match.startTagEnd = match.start(2)
            inline_example_match.sourceBlockStart = match.start(3)
            inline_example_match.sourceBlockEnd = match.end(3)
            inline_example_match.endTagStart = match.end(2)
            inline_example_match.endTagEnd = match.end(0)

            result.append(inline_example_match)

            match = EXAMPLE_PATTERN.search(content, match.end(0))

        return result

    def _get_attribute_value(self, pattern, attributesString):
        if attributesString is None:
            return ''

        match = pattern.search(attributesString)
        if match:
            return match.group(1)
        return ''


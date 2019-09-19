import re
from example_document import ExampleDocument

EXAMPLE_PATTERN = re.compile(
  r'\[\s*example(\s[^\]]*)?\](.*?)\[\s*/\s*example\s*\]',
  re.IGNORECASE | re.MULTILINE | re.DOTALL)

SOURCE_CODE_PATTERN = re.compile(
  r'(?:\n```html *\n(.*?)\n```|\[sourcecode:html\](.*?)\[/sourcecode\])',
  re.IGNORECASE | re.MULTILINE | re.DOTALL)

ATTRIBUTE_PATTERN = re.compile(r'(?:^|\s+)([\w-]+)\s*=\s*"([^"]+)"')

IMPORTS_SEPARATOR_PATTERN = re.compile(r'\s*,\s*')


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

      inline_example = self.create_example_doc(match, count)

      inline_example_match = InlineExampleMatch(inline_example)
      inline_example_match.startTagStart = match.start(0)
      inline_example_match.startTagEnd = match.start(2)
      inline_example_match.endTagStart = match.end(2)
      inline_example_match.endTagEnd = match.end(0)

      result.append(inline_example_match)

      match = EXAMPLE_PATTERN.search(content, match.end(0))

    return result

  def create_example_doc(self, example_match, index):
    example_content = example_match.group(2)
    attributes = self._get_attributes(example_match.group(1))
    source = ''

    match = SOURCE_CODE_PATTERN.search(example_content)
    while match:
      # group 1 is for a ``` block, group 2 is for a [sourcecode] block
      code_match_index = 1 if match.group(1) else 2
      if source:
        source = source + '\n'
      source = source + match.group(code_match_index)
      match = SOURCE_CODE_PATTERN.search(example_content, match.end(0))

    inline_example = ExampleDocument(source, attributes, index)
    return inline_example


  def _get_attributes(self, attributes_string):
    result = {}
    if attributes_string:
      match = ATTRIBUTE_PATTERN.search(attributes_string)
      while match:
        if match.group(2):
          result[match.group(1)] = match.group(2)
        match = ATTRIBUTE_PATTERN.search(attributes_string, match.end(0))
    return result

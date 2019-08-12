import re

SOURCECODE_BLOCK = r'\[\s*sourcecode[^\]]*\][\s\S]*?\[\s*/\s*sourcecode\s*\]'
CODE_BLOCK = r'^```[^\n][\s\S]*?^```'
INLINE_CODE_BLOCK = r'`[^`]*`'
TABLE_WITHOUT_MARKDOWN_BLOCK = r'(<\s*table)((?:[^>](?!markdown))*>)'

TABLE_WITHOUT_MARKDOWN_PATTERN = re.compile(
  SOURCECODE_BLOCK + '|' + CODE_BLOCK + '|' + INLINE_CODE_BLOCK + '|' + TABLE_WITHOUT_MARKDOWN_BLOCK,
  re.IGNORECASE | re.MULTILINE)

TABLE_WITH_MARKDOWN_PATTERN = re.compile(r'<\s*table[^>]*(\smarkdown="span")')


class HtmlBlockProcessor(object):
  """
    This class searches for html tags and adds the markdown="span" attribute
    to support markdown in html block element when the markdown extra extension is active.
    Because the markdown attribute is not valid amp, this processor also removes these from the finished pages.
    Currently only table tags are supported, but idea is that the tag names can easily be
    specified in the configuration.
  """

  def add_markdown_attributes(self, content):
    """
      Add the markdown attribute to all table tags without this attribute
      @type content: str
    """
    output = ''
    pos = 0
    match = TABLE_WITHOUT_MARKDOWN_PATTERN.search(content)
    while match:

      output = output + content[pos:match.start(0)]

      # Our expression also matches blocks that we want to skip
      # The tag block we are interested in is marked with brackets:
      if match.group(1):
        output = output + match.group(1) + ' markdown="span"' + match.group(2)
      else:
        # no changes for blocks where we do not want to search inside
        output = output + match.group(0)

      pos = match.end(0)
      match = TABLE_WITHOUT_MARKDOWN_PATTERN.search(content, pos)

    output = output + content[pos:]
    return output

  def remove_markdown_attributes(self, content):
    output = ''
    pos = 0

    match = TABLE_WITH_MARKDOWN_PATTERN.search(content)
    while match:
      output = output + content[pos:match.start(1)]
      pos = match.end(0)
      match = TABLE_WITH_MARKDOWN_PATTERN.search(content, pos)

    output = output + content[pos:]
    return output

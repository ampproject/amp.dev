import re

MARKUP_BLOCK_PATTERN = re.compile(r'\{\{.*?\}\}|\{%.*?%\}', re.DOTALL)

def unescape_in_expressions(content):
  result = ''
  pos = 0
  match = MARKUP_BLOCK_PATTERN.search(content)
  while match:
    result = result + content[pos: match.start(0)]

    unescaped_block = unescape_quotes(match.group(0))
    result = result + unescaped_block

    pos = match.end(0)
    match = MARKUP_BLOCK_PATTERN.search(content, pos)

  result = result + content[pos:]
  return result

def unescape_quotes(value):
  result = value
  # undo the entities used by pygments/formatters/html.py
  result = result.replace('&quot;', '"')
  result = result.replace('&#39;', '\'')
  result = result.replace('&lt;', '<')
  result = result.replace('&gt;', '>')

  return result
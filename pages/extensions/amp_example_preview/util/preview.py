import re
import json
from xml.sax.saxutils import escape, unescape

# We enforce a new paragraph for the code block, since otherwise we cannot ensure that
# start tag and end tag are on the same level
# For example for a source block inside the last list item the preview end tag would be after the closing list tag
# TODO: Support examples inside lists (see comment above)
PREVIEW_START_BEGINNING = '\n<!-- preview\n'
PREVIEW_END_TAG = r'<!-- /preview -->'
PREVIEW_PATTERN = re.compile(PREVIEW_START_BEGINNING + r'(.*?)\n-->\n(.*?)' + PREVIEW_END_TAG, re.DOTALL)


class ExamplePreview(object):

  def __init__(self, iterable=(), **kwargs):
    self.__dict__.update(iterable, **kwargs)

  def get_start_tag(self):
    data = json.dumps(self.__dict__)
    data = escape(data)
    # Extra escape the curly brace to prevent jinja2 markup evaluation
    data = data.replace('{', '&#123;')

    # the newline at the end is needed to ensure we are not inside a paragraph
    return '\n' + PREVIEW_START_BEGINNING + data + '\n-->\n'

  def get_end_tag(self):
    return PREVIEW_END_TAG

  @staticmethod
  def from_json(json_data):
    """
    :type json_data: str
    """
    result = ExamplePreview()

    # the saxutils will not decode the numbered entities, so do it first
    data = json_data.replace('&#123;', '{')
    data = unescape(data)
    result.__dict__ = json.loads(data)
    return result


class ExamplePreviewMatch(object):

  def __init__(self, iterable=(), **kwargs):
    self.__dict__.update(iterable, **kwargs)

  @staticmethod
  def has_preview(content):
    return PREVIEW_START_BEGINNING in content

  @staticmethod
  def extract_previews(content):
    result = []
    match = PREVIEW_PATTERN.search(content)
    while match:
      preview = ExamplePreview.from_json(match.group(1))
      entry = ExamplePreviewMatch(
        preview=preview,
        start_tag_start=match.start(0),
        start_tag_end=match.start(2),
        end_tag_start=match.end(2),
        end_tag_end=match.end(0),
      )
      result.append(entry)
      match = PREVIEW_PATTERN.search(content, match.end(0))
    return result

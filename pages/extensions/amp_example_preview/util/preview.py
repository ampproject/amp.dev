import re
import json
from xml.sax.saxutils import escape, unescape

PREVIEW_START_BEGINNING = '<!-- preview\n'
PREVIEW_END_TAG = r'<!-- /preview -->'
PREVIEW_PATTERN = re.compile(PREVIEW_START_BEGINNING + r'(.*?)\n-->\n(.*?)' + PREVIEW_END_TAG, re.DOTALL)


class ExamplePreview(object):

    def __init__(self, iterable=(), **kwargs):
        self.__dict__.update(iterable, **kwargs)

    def get_start_tag(self):
        jsonData = json.dumps(self.__dict__)
        return PREVIEW_START_BEGINNING + escape(jsonData) + '\n-->\n'

    def get_end_tag(self):
        return PREVIEW_END_TAG

    @staticmethod
    def from_json(jsonData):
        """
        :type jsonData: str
        """
        result = ExamplePreview()
        result.__dict__ = json.loads(unescape(jsonData))
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

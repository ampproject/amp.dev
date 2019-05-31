import re
import json

PREVIEW_START_BEGINNING = '<!-- preview\n'
PREVIEW_END_TAG = r'<!-- /preview -->'
PREVIEW_PATTERN = re.compile(PREVIEW_START_BEGINNING + r'(.*?)\n-->\n(.*?)' + PREVIEW_END_TAG, re.DOTALL)


class ExamplePreview(object):

    def get_start_tag(self):
        jsonData = json.dumps(self.__dict__)
        return PREVIEW_START_BEGINNING + escape_html(jsonData) + '\n-->\n'

    def get_end_tag(self):
        return PREVIEW_END_TAG

    @staticmethod
    def from_json(jsonData):
        """
        :type jsonData: str
        """
        result = ExamplePreview()
        result.__dict__ = json.loads(unescape_html(jsonData))
        return result

    @staticmethod
    def for_attributes(index, mode, playground, source):
        """
        :type index: int
        :type mode: str
        :type playground: bool
        :type source: str
        """
        result = ExamplePreview()
        result.index = index
        result.mode = mode
        result.playground = playground
        result.source = source
        return result

def escape_html(content):
    """
    :type content: str
    """
    result = content.replace('&', '&amp;')\
                    .replace('<', '&lt;')\
                    .replace('>', '&gt;')
    return result


def unescape_html(content):
    """
    :type content: str
    """
    result = content \
        .replace('&gt;', '>') \
        .replace('&lt;', '<') \
        .replace('&amp;', '&')
    return result


class ExamplePreviewMatch(object):

    def __init__(self, preview, start_tag_start, start_tag_end, end_tag_start, end_tag_end):
        """
        :type preview: ExamplePreview
        :type start_tag_start: int
        :type start_tag_end: int
        :type end_tag_start: int
        :type end_tag_end: int
        """
        self.preview = preview
        self.start_tag_start = start_tag_start
        self.start_tag_end = start_tag_end
        self.end_tag_start = end_tag_start
        self.end_tag_end = end_tag_end

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
                preview,
                match.start(0),
                match.start(2),
                match.end(2),
                match.end(0),
            )
            result.append(entry)
            match = PREVIEW_PATTERN.search(content, match.end(0))
        return result

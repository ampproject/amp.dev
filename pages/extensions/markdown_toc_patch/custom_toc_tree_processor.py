from markdown import util
from markdown.extensions.toc import TocExtension
from markdown.extensions.toc import TocTreeprocessor

class CustomTocTreeProcessor(TocTreeprocessor):
  """
  Since html code that may be inside the headlines causes problems in the TOC we remove them
  """

  def strip_html_from_names(self, toc_list):
    for item in toc_list:
      text = item.get('name', '')
      # The markdown classes insert placeholder for html tags
      # we simply remove those placeholders with the HTML_PLACEHOLDER_RE regex that matches those
      text = util.HTML_PLACEHOLDER_RE.sub('', text)
      item['name'] = text
      if item['children']:
        self.strip_html_from_names(item['children'])

  def build_toc_div(self, toc_list):
    self.strip_html_from_names(toc_list)
    div = super(CustomTocTreeProcessor, self).build_toc_div(toc_list)
    return div

  @staticmethod
  def connect_hook():
    TocExtension.TreeProcessorClass = CustomTocTreeProcessor


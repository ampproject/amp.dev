import io
from pygments.formatters import html
from .jinja2_expression_unescape import unescape_in_expressions


class CustomHtmlFormatter(html.HtmlFormatter):

  def format_unencoded(self, tokensource, outfile):
    buffer = io.StringIO()
    super(CustomHtmlFormatter, self).format_unencoded(tokensource, buffer)
    content = buffer.getvalue()
    content = unescape_in_expressions(content)
    outfile.write(content)
    return

  @staticmethod
  def connect_hook():
    html.HtmlFormatter = CustomHtmlFormatter

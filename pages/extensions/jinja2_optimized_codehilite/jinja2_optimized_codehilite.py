# -*- coding: utf-8 -*-
from grow import extensions
from .custom_html_lexer import CustomHtmlLexer
from .custom_js_lexer import CustomJavascriptLexer
from .custom_html_formatter import CustomHtmlFormatter


class Jinja2OptimizedCodehiliteExtension(extensions.BaseExtension):
  """
  The extension class has no logic.
  But we hook other classes when this file is loaded.

  - CustomHtmlLexer replaces the pygments HtmlLexer that is used for html code syntax highlighting
  - CustomHtmlFormatter hooks into the pygments html formatter unescape jinja2 expression blocks

  """
  pass

CustomHtmlLexer.connect_hook()

CustomJavascriptLexer.connect_hook()

CustomHtmlFormatter.connect_hook()


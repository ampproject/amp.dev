# -*- coding: utf-8 -*-
"""
   Customized pygments HtmlLexer with special handling for jinja2 markup blocks
"""

import re

from pygments.lexer import RegexLexer, bygroups, using
from pygments.lexers import html
from pygments.token import Text, Comment, Operator, Keyword, Name, String, \
    Punctuation
from pygments.util import looks_like_xml, html_doctype_matches

from .custom_js_lexer import CustomJavascriptLexer
from pygments.lexers.css import CssLexer


class CustomHtmlLexer(RegexLexer):
  """
  For HTML 4 and XHTML 1 markup. Nested JavaScript and CSS is highlighted
  by the appropriate lexer.
  """

  name = 'HTML'
  aliases = ['html']
  filenames = ['*.html', '*.htm', '*.xhtml', '*.xslt']
  mimetypes = ['text/html', 'application/xhtml+xml']

  flags = re.IGNORECASE | re.DOTALL

  tokens = {
    'root': [
      (r'\{\%.*?\%\}', Text),
      (r'\{\{.*?\}\}', Text),
      ('[^<&\{]+', Text),
      ('\{', Text),
      (r'&\S*?;', Name.Entity),
      (r'\<\!\[CDATA\[.*?\]\]\>', Comment.Preproc),
      ('<!--', Comment, 'comment'),
      (r'<\?.*?\?>', Comment.Preproc),
      ('<![^>]*>', Comment.Preproc),
      (r'(<)(\s*)(script)(\s*)',
       bygroups(Punctuation, Text, Name.Tag, Text),
       ('script-content', 'tag')),
      (r'(<)(\s*)(style)(\s*)',
       bygroups(Punctuation, Text, Name.Tag, Text),
       ('style-content', 'tag')),
      # note: this allows tag names not used in HTML like <x:with-dash>,
      # this is to support yet-unknown template engines and the like
      (r'(<)(\s*)([\w:.-]+)',
       bygroups(Punctuation, Text, Name.Tag), 'tag'),
      (r'(<)(\s*)(/)(\s*)([\w:.-]+)(\s*)(>)',
       bygroups(Punctuation, Text, Punctuation, Text, Name.Tag, Text,
                Punctuation)),
    ],
    'comment': [
      ('[^-]+', Comment),
      ('-->', Comment, '#pop'),
      ('-', Comment),
    ],
    'tag': [
      (r'\s+', Text),
      (r'\{%.*?%\}', Text),
      (r'\{\{.*?\}\}', Text),
      (r'([\w:-]+\s*|\[[\w:-]+\]\s*)(=)(\s*)', bygroups(Name.Attribute, Operator, Text),
       'attr'),
      (r'[\w:-]+|\[[\w:-]+\]', Name.Attribute),
      (r'(/?)(\s*)(>)', bygroups(Punctuation, Text, Punctuation), '#pop'),
    ],
    'script-content': [
      (r'(<)(\s*)(/)(\s*)(script)(\s*)(>)',
       bygroups(Punctuation, Text, Punctuation, Text, Name.Tag, Text,
                Punctuation), '#pop'),
      (r'.+?(?=<\s*/\s*script\s*>)', using(CustomJavascriptLexer)),
    ],
    'style-content': [
      (r'(<)(\s*)(/)(\s*)(style)(\s*)(>)',
       bygroups(Punctuation, Text, Punctuation, Text, Name.Tag, Text,
                Punctuation),'#pop'),
      (r'.+?(?=<\s*/\s*style\s*>)', using(CssLexer)),
    ],
    'attr': [
      ('".*?"', String, '#pop'),
      ("'.*?'", String, '#pop'),
      (r'[^\s>]+', String, '#pop'),
    ],
  }
  def analyse_text(text):
    if html_doctype_matches(text):
      return 0.5

  @staticmethod
  def connect_hook():
    html.HtmlLexer = CustomHtmlLexer

"""Tests for the html block processor."""

import unittest
import sys
import os

sys.path.extend([os.path.join(os.path.dirname(__file__), '.')])

from html_block_processor import HtmlBlockProcessor

processor = HtmlBlockProcessor()

class SourceCodeExtractorTestCase(unittest.TestCase):

  def test_add_for_simple_table_block(self):
    html = '<table>'
    result = processor.add_markdown_attributes(html)
    self.assertEqual('<table markdown="span">', result)

  def test_add_for_table_attributes_block(self):
    html = '<table colspan="0">'
    result = processor.add_markdown_attributes(html)
    self.assertEqual('<table markdown="span" colspan="0">', result)

  def test_add_for_table_with_markdown_block(self):
    html = '<table markdown>'
    result = processor.add_markdown_attributes(html)
    self.assertEqual(html, result)

  def test_add_for_table_in_inline_code_block(self):
    html = '`<table>`'
    result = processor.add_markdown_attributes(html)
    self.assertEqual(html, result)

  def test_add_for_table_in_sourcecode_block(self):
    html = '[sourcecode]<table>[/sourcecode]'
    result = processor.add_markdown_attributes(html)
    self.assertEqual(html, result)

  def test_add_for_table_in_code_block(self):
    html = 'test\n' \
           '```html\n' \
           '<!-- ` -->\n' \
           '<table><tr><td>block</td></tr></table>\n' \
           '```\n' \
           'end\n'
    result = processor.add_markdown_attributes(html)
    self.assertEqual(html, result)

  def test_remove_for_simple_table_block(self):
    html = '<table markdown="span">'
    result = processor.remove_markdown_attributes(html)
    self.assertEqual('<table>', result)

  def test_remove_for_table_attributes_block(self):
    html = '<table markdown="span" colspan="0">'
    result = processor.remove_markdown_attributes(html)
    self.assertEqual('<table colspan="0">', result)
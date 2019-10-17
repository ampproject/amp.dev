"""Tests for the source code exporter."""

import unittest
import sys
import os
from grow.pods.podspec import PodSpec
from grow.rendering.markdown_utils import MarkdownUtil

sys.path.extend([os.path.join(os.path.dirname(__file__), '.')])

from page_info_collector import PageInfoCollector

class PageInfoCollectorTestCase(unittest.TestCase):

  def test_no_page_description(self):
    doc = MockDoc({}, '# body')
    self.assertEqual('', PageInfoCollector.get_page_description(doc))

  def test_get_page_description(self):
    doc = MockDoc({}, '# body\n\nText1')
    self.assertEqual('Text1', PageInfoCollector.get_page_description(doc))
    doc = MockDoc({}, '# body\n\nText1\nSecond Line. More Text\n\nOther Block.')
    self.assertEqual('Text1\nSecond Line.', PageInfoCollector.get_page_description(doc))
    doc = MockDoc({}, '# body\n\nText with [link](#link).')
    self.assertEqual('Text with link.', PageInfoCollector.get_page_description(doc))
    doc = MockDoc({}, '# body\n\n**Text** with _markdown_! And two sentences.')
    self.assertEqual('Text with markdown!', PageInfoCollector.get_page_description(doc))
    doc = MockDoc({}, '# body\n\nText with <b>html</b>.')
    self.assertEqual('Text with html.', PageInfoCollector.get_page_description(doc))
    doc = MockDoc({}, '# body\n\nText with `code`.')
    self.assertEqual('Text with code.', PageInfoCollector.get_page_description(doc))
    doc = MockDoc({}, '<!--\ncomment\n-->\n\n# body\n\nText2')
    self.assertEqual('Text2', PageInfoCollector.get_page_description(doc))
    doc = MockDoc({}, '# body\n\n[sourcecode:javascript]\nsome script[/sourcecode]\n\nText3')
    self.assertEqual('Text3', PageInfoCollector.get_page_description(doc))
    doc = MockDoc({}, '# body\n\n[filter format="website"]\nsome content[/filter]\n\nText4')
    self.assertEqual('Text4', PageInfoCollector.get_page_description(doc))

  def test_get_page_description_from_teaser_title(self):
    doc = MockDoc({ 'teaser': {'text': 'Teaser'}}, '# body\n\nText')
    self.assertEqual('Teaser', PageInfoCollector.get_page_description(doc))

  def test_get_page_description_from_description(self):
    doc = MockDoc({ 'description': 'Desc', 'teaser': {'text': 'Teaser'}}, '# body\n\nText')
    self.assertEqual('Desc', PageInfoCollector.get_page_description(doc))


class MockDoc:

  def __init__(self, fields, body):
    """
    :type fields: dict
    :type body: str
    """
    self.fields = fields
    self.body = body
    self.pod = MockPod()
    self.html = MarkdownUtil(self.pod).markdown.convert(body)


class MockPod:

  def __init__(self):
    self.podspec = PodSpec({
      'markdown': {
        'extensions': [
          {'kind': 'sourcecode',
           'classes': True,
           'class_name': 'ap-m-code-snippet'
           }, {
            'kind': 'markdown.extensions.codehilite',
            'classes': True,
            'class_name': 'ap-m-code-snippet'
          }, {
            'kind': 'markdown.extensions.extra'
          }
        ]
      }
    }, self)

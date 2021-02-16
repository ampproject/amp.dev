"""Tests for the source code exporter."""

import unittest
import sys
import os

sys.path.extend([os.path.join(os.path.dirname(__file__), '.')])

from .example_document import ExampleDocument

class SourceCodeExporterTestCase(unittest.TestCase):

  def test_example_body_only(self):
    example_doc = self.get_example_document('<h1>headline</h1>')
    self.assertEqual('<h1>headline</h1>', example_doc.body)
    self.assertEqual(None, example_doc.head)
    self.assertEqual(None, example_doc.custom_style)
    self.assertEqual(0, len(example_doc.imports))
    self.assertEqual(None, example_doc.template)
    self.assertEqual('none', example_doc.preview)

  def test_attributes(self):
    example_doc = self.get_example_document('<h1>headline</h1>', {
      'preview':'inline',
      'template': 'amp-mustache',
      'imports': 'amp-accordion:0.9,amp-date-display',
    })
    self.assertEqual('inline', example_doc.preview)
    self.assertEqual(2, len(example_doc.imports))
    self.assertEqual('amp-accordion', example_doc.imports[0].name)
    self.assertEqual('0.9', example_doc.imports[0].version)
    self.assertEqual('amp-date-display', example_doc.imports[1].name)
    self.assertEqual('0.1', example_doc.imports[1].version) # 0.1 is always the default
    self.assertEqual('amp-mustache', example_doc.template.name)
    self.assertEqual('0.2', example_doc.template.version)

  def test_different_attributes(self):
    example_doc = self.get_example_document('<h1>headline</h1>', {
      'preview':'none',
      'template': 'amp-mustache:0.9',
      'imports': 'amp-accordion',
    })
    self.assertEqual('none', example_doc.preview)
    self.assertEqual(1, len(example_doc.imports))
    self.assertEqual('amp-accordion', example_doc.imports[0].name)
    self.assertEqual('0.1', example_doc.imports[0].version) # 0.1 is always the default
    self.assertEqual('amp-mustache', example_doc.template.name)
    self.assertEqual('0.9', example_doc.template.version)

  def test_unknown_attributes(self):
    example_doc = self.get_example_document('<h1>headline</h1>', {
      'preview':'foobar',
      'template': 'amp-foo-bar',
      'imports': 'amp-foo-baz',
    })
    self.assertEqual('none', example_doc.preview)
    self.assertEqual('amp-foo-baz', example_doc.imports[0].name)
    self.assertEqual('0.1', example_doc.imports[0].version)
    self.assertEqual('amp-foo-bar', example_doc.template.name)
    self.assertEqual('0.1', example_doc.template.version)

  def test_has_head_tag_with_head_tags(self):
    example_doc = self.get_example_document(
      '<head>\n'
      ' <meta charset="utf-8">\n'
      ' <title>Title</title>\n'
      ' <script async src="https://cdn.ampproject.org/v0.js"></script>\n'
      ' <script async custom-element="amp-date-display" src="https://cdn.ampproject.org/v0/amp-date-display-0.1.js"></script>\n'
      ' <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>\n'
      ' <link rel="canonical" href="{{doc.url}}">\n'
      ' <meta name="viewport" content="width=device-width">\n'
      ' <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>\n'
      ' <style amp-custom>h1 {color:red;}</style>\n'
      '</head>\n'
      '<body><h1>Headline</h1></body>\n',
      {'preview':'inline'})
    self.assertTrue(example_doc.has_tag_in_head('title'))
    self.assertTrue(example_doc.has_tag_in_head('meta', 'charset'))
    self.assertTrue(example_doc.has_tag_in_head('meta', 'charset', 'utf-8'))
    self.assertFalse(example_doc.has_tag_in_head('meta', 'charse'))
    self.assertFalse(example_doc.has_tag_in_head('meta', 'harset'))
    self.assertTrue(example_doc.has_tag_in_head('style', 'amp-boilerplate'))
    self.assertTrue(example_doc.has_tag_in_head('style', r'amp[\da-z]*-boilerplate'))
    self.assertTrue(example_doc.has_tag_in_head('script', 'src'))
    self.assertTrue(example_doc.has_tag_in_head('meta', 'content'))
    self.assertFalse(example_doc.has_tag_in_head('h1'))
    self.assertTrue(example_doc.has_boilerplate())
    self.assertTrue(example_doc.has_amp_script())
    self.assertTrue(example_doc.has_import_in_head('amp-date-display'))
    self.assertTrue(example_doc.has_import_in_head('amp-mustache'))
    self.assertFalse(example_doc.has_import_in_head('amp-accordion'))
    # the custom style should be removed from the head
    self.assertFalse(example_doc.has_tag_in_head('style', 'amp-custom'))
    self.assertEqual('h1 {color:red;}', example_doc.custom_style.strip())
    self.assertEqual('none', example_doc.preview)  # inline preview should be overwritten because of the head

  def test_has_head_tag_without_head_tags(self):
    example_doc = self.get_example_document(
      '<head>\n'
      ' <meta lang="en">\n'
      ' <script async custom-element="amp-date-display" src="https://cdn.ampproject.org/v0/amp-date-display-0.1.js"></script>\n'
      '</head>\n'
      '<body><h1>Headline</h1></body>\n')
    self.assertFalse(example_doc.has_tag_in_head('title'))
    self.assertFalse(example_doc.has_tag_in_head('meta', 'charset'))
    self.assertFalse(example_doc.has_tag_in_head('meta', 'charset', 'utf-8'))
    self.assertFalse(example_doc.has_tag_in_head('style', 'amp-boilerplate'))
    self.assertFalse(example_doc.has_tag_in_head('style', r'amp[\da-z]*-boilerplate'))
    self.assertTrue(example_doc.has_tag_in_head('script', 'src'))
    self.assertFalse(example_doc.has_tag_in_head('meta', 'content'))
    self.assertFalse(example_doc.has_tag_in_head('h1'))
    self.assertFalse(example_doc.has_boilerplate())
    self.assertFalse(example_doc.has_amp_script())
    self.assertTrue(example_doc.has_import_in_head('amp-date-display'))
    self.assertFalse(example_doc.has_import_in_head('amp-accordion'))
    self.assertTrue(example_doc.custom_style is None)

  def test_example_with_style(self):
    example_doc = self.get_example_document(
        '<head>\n'
        '  <title>test</title>\n'
        '  <style amp-custom>\n'
        '    h1 {color:red;}\n'
        '  </style>\n'
        '</head>\n'
        '<body>\n'
        '  <h1>Red Headline</h1>\n'
        '</body>\n')
    self.assertEqual('h1 {color:red;}', example_doc.custom_style.strip())
    self.assertFalse('<style amp-custom>' in example_doc.head)
    self.assertTrue('<title>' in example_doc.head)

  def test_full_html(self):
    example_doc = self.get_example_document(
      '<!doctype html>\n'
      '<html amp lang="en">\n'
      '  <head>\n'
      '    <meta charset="utf-8">\n'
      '    <script async src="https://cdn.ampproject.org/v0.js"></script>\n'
      '    <title>Hello, AMPs</title>\n'
      '    <link rel="canonical" href="{{doc.url}}">\n'
      '    <meta name="viewport" content="width=device-width">\n'
      '    <script type="application/ld+json">\n'
      '      {\n'
      '        "@context": "http://schema.org",\n'
      '        "@type": "NewsArticle",\n'
      '        "headline": "Open-source framework for publishing content",\n'
      '        "datePublished": "2015-10-07T12:02:41Z",\n'
      '        "image": [\n'
      '          "logo.jpg"\n'
      '        ]\n'
      '      }\n'
      '    </script>\n'
      '  </head>\n'
      '  <body>\n'
      '    <h1>Welcome to the mobile web</h1>\n'
      '  </body>\n'
      '</html>\n')
    self.assertEqual('<h1>Welcome to the mobile web</h1>', example_doc.body.strip())
    self.assertFalse(example_doc.has_boilerplate())
    self.assertTrue(example_doc.has_amp_script())

  @staticmethod
  def get_example_document(example_code, attributes={}, index=1):
    return ExampleDocument(example_code, attributes, index)

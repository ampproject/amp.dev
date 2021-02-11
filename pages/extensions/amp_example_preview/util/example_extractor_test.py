"""Tests for the source code extractor."""

import unittest
import sys
import os

sys.path.extend([os.path.join(os.path.dirname(__file__), '.')])

from .example_document import ExampleDocument
from .example_extractor import SourceCodeExtractor


class SourceCodeExtractorTestCase(unittest.TestCase):

  def test_example_with_default_settings_and_positions(self):
    extractor = SourceCodeExtractor()
    matches = extractor.find_examples_in_markdown(
      '[example]\n'
      '```html\n'
      '<h1>headline</h1>\n'
      '```\n'
      '[/example]')

    self.assertEqual(1, len(matches))
    match = matches[0]

    self.assertEqual(0, match.startTagStart)
    self.assertEqual(9, match.startTagEnd)
    self.assertEqual(18, match.sourceBlockStart)
    self.assertEqual(35, match.sourceBlockEnd)
    self.assertEqual(40, match.endTagStart)
    self.assertEqual(50, match.endTagEnd)

    inline_example = match.inlineExample
    self.assertEqual('none', inline_example.preview)
    self.assertEqual(True, inline_example.playground)

    self.assertEqual(0, len(inline_example.imports))
    self.assertEqual(None, inline_example.template)

    self.assertEqual('<h1>headline</h1>', inline_example.body.strip())

  def test_two_examples_with_positions(self):
    extractor = SourceCodeExtractor()
    matches = extractor.find_examples_in_markdown(
      '[example]\n'
      '```html\n'
      '<h1>1</h1>\n'
      '```\n'
      '[/example]\n'
      'markdown\n'
      '[example]\n'
      '```html\n'
      '<h1>2</h1>\n'
      '```\n'
      '[/example]\n'
    )

    self.assertEqual(2, len(matches))

    match = matches[0]
    self.assertEqual(0, match.startTagStart)
    self.assertEqual(9, match.startTagEnd)
    self.assertEqual(18, match.sourceBlockStart)
    self.assertEqual(28, match.sourceBlockEnd)
    self.assertEqual(33, match.endTagStart)
    self.assertEqual(43, match.endTagEnd)
    inline_example = match.inlineExample
    self.assertTrue('<h1>1</h1>' in inline_example.body)

    match = matches[1]
    self.assertEqual(53, match.startTagStart)
    self.assertEqual(62, match.startTagEnd)
    self.assertEqual(71, match.sourceBlockStart)
    self.assertEqual(81, match.sourceBlockEnd)
    self.assertEqual(86, match.endTagStart)
    self.assertEqual(96, match.endTagEnd)
    inline_example = match.inlineExample
    self.assertTrue('<h1>2</h1>' in inline_example.body)

  def test_example_with_empty_settings(self):
    extractor = SourceCodeExtractor()
    matches = extractor.find_examples_in_markdown(
      '[example\n'
      '      preview=""\n'
      '      playground=""\n'
      '      imports=""\n'
      '      template=""\n'
      ']\n'
      '```html\n'
      '<h1>headline</h1>\n'
      '```\n'
      '[/example]')

    inline_example = matches[0].inlineExample
    self.assertEqual('none', inline_example.preview)
    self.assertEqual(True, inline_example.playground)
    self.assertEqual(0, len(inline_example.imports))
    self.assertEqual(None, inline_example.template)

  def test_example_with_specific_settings(self):
    extractor = SourceCodeExtractor()
    matches = extractor.find_examples_in_markdown(
      '[example preview="top-frame" orientation="landscape" playground="false"'
      ' imports="amp-date-display, amp-accordion" template="amp-mustache"]\n'
      '```html\n'
      '<h1>headline</h1>\n'
      '```\n'
      '[/example]')

    inline_example = matches[0].inlineExample
    self.assertEqual('top-frame', inline_example.preview)
    self.assertEqual('landscape', inline_example.orientation)
    self.assertEqual(False, inline_example.playground)
    self.assertEqual(2, len(inline_example.imports))
    self.assertEqual('amp-date-display', inline_example.imports[0].name)
    self.assertEqual('amp-accordion', inline_example.imports[1].name)
    self.assertEqual('amp-mustache', inline_example.template.name)

  def test_example_with_specific_settings_alternative(self):
    extractor = SourceCodeExtractor()
    matches = extractor.find_examples_in_markdown(
      '[example\n'
      '       imports="amp-date-display ,amp-accordion"\n'
      '       preview="inline"\n'
      '       template="amp-mustache"\n'
      '       playground="false"\n'
      ']\n'
      '```html\n'
      '<h1>headline</h1>\n'
      '```\n'
      '[/example]')

    inline_example = matches[0].inlineExample
    self.assertEqual('inline', inline_example.preview)
    self.assertEqual(False, inline_example.playground)
    self.assertEqual(2, len(inline_example.imports))
    self.assertEqual('amp-date-display', inline_example.imports[0].name)
    self.assertEqual('amp-accordion', inline_example.imports[1].name)
    self.assertEqual('amp-mustache', inline_example.template.name)

  def test_example_with_specific_settings_another_alternative(self):
    extractor = SourceCodeExtractor()
    matches = extractor.find_examples_in_markdown(
      '[example\n'
      '       imports="amp-accordion"\n'
      '       preview="inline"\n'
      '       playground="False"\n'
      ']\n'
      '```html\n'
      '<h1>headline</h1>\n'
      '```\n'
      '[/example]')

    inline_example = matches[0].inlineExample
    self.assertEqual('inline', inline_example.preview)
    self.assertEqual(False, inline_example.playground)
    self.assertEqual(1, len(inline_example.imports))
    self.assertEqual('amp-accordion', inline_example.imports[0].name)
    self.assertEqual(None, inline_example.template)

  def test_example_with_sourcecode_tag(self):
    extractor = SourceCodeExtractor()
    matches = extractor.find_examples_in_markdown(
      '\ntest [example][sourcecode:html]\n'
      '<h1>headline</h1>[/sourcecode][/example]\n')

    inline_example = matches[0].inlineExample
    self.assertEqual('<h1>headline</h1>', inline_example.body.strip())

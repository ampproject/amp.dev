"""Tests for the source code extractor."""

import unittest
import sys
import os

sys.path.extend([os.path.join(os.path.dirname(__file__), '.')])

from preview import ExamplePreview, ExamplePreviewMatch


class PreviewTestCase(unittest.TestCase):

  def test_preview_wrap_and_extract(self):

    example_code = '<h1>test {% test = "test" %} {{ test + \'123\' }}</h1>'

    preview_created = ExamplePreview(index=2,
                             mode='top-frame',
                             orientation='landscape',
                             url='http://localhost/test',
                             playground=True,
                             source=example_code)

    start_tag = preview_created.get_start_tag()

    self.assertFalse('<h1>' in start_tag, 'html should be escaped')

    html_code = start_tag \
                + example_code \
                + preview_created.get_end_tag()



    html_code = '<p>before</p>' + html_code + '<p>after</p>'

    extracted_previews = ExamplePreviewMatch.extract_previews(html_code)
    self.assertEqual(1, len(extracted_previews))

    preview_extracted = extracted_previews[0].preview

    self.assertEqual(preview_created.mode, preview_extracted.mode)
    self.assertEqual(preview_created.orientation, preview_extracted.orientation)
    self.assertEqual(preview_created.url, preview_extracted.url)
    self.assertEqual(preview_created.playground, preview_extracted.playground)
    self.assertEqual(preview_created.source, preview_extracted.source)


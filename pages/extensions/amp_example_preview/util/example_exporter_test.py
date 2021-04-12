"""Tests for the source code exporter."""

import unittest
import sys
import os

sys.path.extend([os.path.join(os.path.dirname(__file__), '.')])

from .example_document import ExampleDocument
from .example_exporter import ExampleExporter
from grow.documents import document
from grow.collections import collection
from grow.pods import pods


class SourceCodeExporterTestCase(unittest.TestCase):


  def test_example_unknown_format_type(self):
    example_doc = self.get_example_export('<h1>headline</h1>', 'invalid')
    self.assertEqual(None, example_doc)

  def test_example_body_only(self):
    example_doc = self.get_example_export('<h1>headline</h1>')
    self.assertEqual('Test', example_doc.title)
    self.assertEqual('websites', example_doc.type_id)
    self.assertEqual('/test/bar.example.1.html', example_doc.file_path)

  def test_generate_html(self):
    exporter = self.get_exporter(
      '<h1>Test</h1>\n'
      '{% raw %}<p>{{no j2}}</p>{% endraw %}\n'
      '{% set test = \'TEST\' %}\n'
      '<p class="layout">{{test}}</p>')
    # TODO unit test code generation
    # exporter.generate_html()

  @staticmethod
  def get_example_export(example_code, format='websites', index=1):
    exporter = SourceCodeExporterTestCase.get_exporter(example_code, index)
    example_doc = exporter.get_example_export(format)
    return example_doc

  @staticmethod
  def get_exporter(example_code, index=1):
    example = ExampleDocument(example_code, {}, index)
    doc = SourceCodeExporterTestCase.createTestDoc()
    exporter = ExampleExporter(doc, example)
    return exporter

  @staticmethod
  def createTestDoc():
    test_dir = os.path.join(os.path.dirname(__file__), 'unit-test')
    pod = pods.Pod(test_dir)
    pod.get_podspec().yaml.get('deployments').get('default').setdefault('extracted_examples_dir', test_dir)

    coll = collection.Collection(test_dir, pod)
    coll.fields = {}

    doc = document.Document('/test/bar.md', pod, _collection=coll)
    doc.fields = {
      '$title': 'Test',
      '$path': '/test/bar.html',
      'formats': [
        'websites',
        'email'
      ],
    }
    return doc

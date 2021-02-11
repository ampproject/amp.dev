import unittest
import sys
import os

sys.path.extend([os.path.join(os.path.dirname(__file__), '.')])

from component_version_resolver import ComponentVersionResolver


class PodInternalLinkRewriterTestCase(unittest.TestCase):

  def test_all(self):
    docs = [
      MockDoc('pages/documents/components/amp-list-v0.5.md'),
      MockDoc('pages/documents/components/amp-list-v1.1.md'),
      MockDoc('pages/documents/components/amp-list-v1.3.md'),
      MockDoc('pages/documents/components/amp-list-v1.2.md'),
      MockDoc('pages/documents/components/amp-amp-list-v2.4.md'),
      MockDoc('pages/documents/components/amp-img-v2.11.md'),
      MockDoc('pages/documents/components/amp-img-v11.2.md'),
    ]
    pod = MockPod(docs)
    version_resolver = ComponentVersionResolver(pod, 'pages/documents/components/')
    doc = version_resolver.find_latest_for_component_with_no_version('pages/documents/components/amp-list.md')
    self.assertEqual(doc, 'pages/documents/components/amp-list-v1.3.md')
    doc = version_resolver.find_latest_for_component_with_no_version('pages/documents/components/amp-img.md')
    self.assertEqual(doc, 'pages/documents/components/amp-img-v11.2.md')
    doc = version_resolver.find_latest_for_component_with_no_version('pages/documents/components/amp-unknown.md')
    self.assertEqual(doc, None)


class MockPod:

  def __init__(self, doc_list):
    self.mock_collection = MockCollection(doc_list)
    self.podspec = MockPodspec()

  def get_collection(self, path):
    return self.mock_collection

class MockPodspec:

  def __init__(self):
    self.default_locale = 'en'

class MockCollection:

  def __init__(self, docs):
    self.docs = docs

  def list_docs(self, locale):
    return self.docs


class MockDoc:

  def __init__(self, pod_path):
    """
    :type pod_path: str
    """
    self.pod_path = pod_path

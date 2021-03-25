"""Tests for the source code exporter."""

import unittest
import sys
import os

from grow.pods import pods

sys.path.extend([os.path.join(os.path.dirname(__file__), '.')])

from amp_dependencies import AmpDependencies

test_dir = os.path.join(os.path.dirname(__file__), 'non_existing')
test_pod = pods.Pod(test_dir)


class AmpDependenciesTestCase(unittest.TestCase):

  def test_add_new_component(self):
    amp_deps = AmpDependencies(test_pod)
    amp_deps.add('amp-anim', '0.1')
    self.assertEqual(1, len(amp_deps._dependencies))
    version, dep_type = amp_deps._dependencies.get('amp-anim')
    self.assertEqual('0.1', version)
    self.assertEqual('element' , dep_type)

  def test_add_new_template(self):
    amp_deps = AmpDependencies(test_pod)
    amp_deps.add('amp-mustache', '0.2', 'template')
    self.assertEqual(1, len(amp_deps._dependencies))
    version, dep_type = amp_deps._dependencies.get('amp-mustache')
    self.assertEqual('0.2', version)
    self.assertEqual('template' , dep_type)

  def test_add_same_twice(self):
    amp_deps = AmpDependencies(test_pod)
    amp_deps.add('amp-anim', '0.1')
    amp_deps.add('amp-anim', '0.1')
    self.assertEqual(1, len(amp_deps._dependencies))

  def test_add_other_version(self):
    amp_deps = AmpDependencies(test_pod)
    amp_deps.add('amp-anim', '0.1')
    try:
      amp_deps.add('amp-anim', '0.2')
    except RuntimeError:
      # expected
      return
    self.fail('no exception')

  def test_add_none_first(self):
    amp_deps = AmpDependencies(test_pod)
    amp_deps.add('amp-anim', None)
    amp_deps.add('amp-anim', '99.9')
    self.assertEqual(1, len(amp_deps._dependencies))
    _version, dep_type = amp_deps._dependencies.get('amp-anim')
    self.assertEqual('99.9', _version)

  def test_add_none_second(self):
    amp_deps = AmpDependencies(test_pod)
    amp_deps.add('amp-anim', '99.9')
    amp_deps.add('amp-anim', None)
    self.assertEqual(1, len(amp_deps._dependencies))
    _version, dep_type = amp_deps._dependencies.get('amp-anim')
    self.assertEqual('99.9', _version)

  def test_emit_and_inject(self):
    amp_deps = AmpDependencies(test_pod)
    amp_deps.add('amp-anim', '99.9')
    amp_deps.add('amp-mustache', '77.7', 'template')

    content = amp_deps.emit()
    content = amp_deps.inject(content)
    self.assertEqual('<script custom-element="amp-anim" '
                      'src="https://cdn.ampproject.org/v0/amp-anim-99.9.js" async></script>'
                      '<script custom-template="amp-mustache" '
                      'src="https://cdn.ampproject.org/v0/amp-mustache-77.7.js" async></script>',
                      content)

  def test_emit_and_inject_with_default_version(self):
    amp_deps = AmpDependencies(test_pod)
    amp_deps.add('amp-anim')

    content = amp_deps.emit()
    content = amp_deps.inject(content)
    self.assertEqual('<script custom-element="amp-anim" '
                      'src="https://cdn.ampproject.org/v0/amp-anim-0.1.js" async></script>',
                      content)

  def test_inject_without_emit(self):
    amp_deps = AmpDependencies(test_pod)
    amp_deps.add('amp-anim', '0.1')
    amp_deps.add('amp-mustache', '0.2', 'template')

    content = amp_deps.inject('')
    self.assertEqual('', content)


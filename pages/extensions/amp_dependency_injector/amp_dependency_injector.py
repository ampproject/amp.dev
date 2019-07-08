# -*- coding: utf-8 -*-
import json
import re

from grow import extensions
from grow.documents import document, static_document
from grow.extensions import hooks


COMPONENT_VERSIONS_FILE = 'extensions/amp-component-versions.json'
COMPONENT_VERSIONS = {}

with open(COMPONENT_VERSIONS_FILE) as f:
  COMPONENT_VERSIONS = json.load(f)

BUILT_INS = [
    'amp-layout',
    'amp-img',
    'amp-pixel'
]

FALSE_POSITIVES = [
    'amp-state',
    'amp-story-page',
    'amp-story-grid-layer',
    'amp-story-bookend',
]

AMP_BIND_MARKERS_REGEX = re.compile(r"(<amp-state|<amp-bind-macro|\s\[(text|class|hidden|width|height|src|title|alt|srcset|open|selected|controls|loop|poster|preload|disabled|href|type|value)\]=)")
PRE_CODE_REGEX = re.compile(r"<pre(?:\s[^>]*)?>.+?</pre>|<code(?:\s[^>]*)?>.+?</code>")
ELEMENT_REGEX = re.compile(r"<(amp-\S*?)(>|\s)")
COMMENTS_REGEX = re.compile(r"<!--.*?-->", re.DOTALL | re.MULTILINE)

IMPORT_REGEX_TEMPLATE = r'<script(?:\s[^>]*)?\scustom-{type}\s*=\s*"?{dependency}[\s">]'


class AmpDependencyInjectorPostRenderHook(hooks.PostRenderHook):
    """Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
        """Should the hook trigger with current document?"""
        content = previous_result if previous_result else raw_content
        content = content.encode('utf-8')

        # Do not run for empty documents
        if content is None:
          return False

        # Check that it's not a StaticDocument
        if isinstance(doc, static_document.StaticDocument):
            return False

        # Check if the document opted out of injection
        if not doc.fields.get('$$injectAmpDependencies', True):
            return False

        # Quick check if the page is really a AMP page
        if not any(marker in content for marker in ['<html amp', '<html ⚡']):
            return False

        # And has a head element
        if '</head>' not in content:
            return False

        return True

    def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
        content = previous_result if previous_result else raw_content

        doc_path = document.Document.clean_localized_path(doc.pod_path, doc.locale)
        dependencies = self.extension._dependencyCache.get(doc_path)
        if not dependencies or self.extension.pod.env.dev:
          dependencies = self.find_dependencies(content=content)
          dependencies = self.verify_dependencies(dependencies, doc=doc)
          # Dependencies will not change so cache them
          self.extension._dependencyCache.add(doc_path, dependencies)

        content = self.inject_dependencies(dependencies, content)

        return content

    def find_dependencies(self, content):
        """Checks the generated output for possible AMP dependencies."""
        # Remove code snippets from content before searching for deps
        stripped_content = re.sub(PRE_CODE_REGEX, '', content)
        # Remove html comments
        stripped_content = re.sub(COMMENTS_REGEX, '', stripped_content)

        dependencies = []

        # Finds all <amp-*> tags that may introduce a dependency to a component
        for element in re.findall(ELEMENT_REGEX, stripped_content):
            # The first capturing group will be the component name
            component_name = element[0]
            dependencies.append(component_name)

        # Checks if document depends on <amp-form>
        if '<form' in stripped_content:
            dependencies.append('amp-form')

        # Checks if document depends on <amp-bind>, also see:
        # https://www.ampproject.org/docs/reference/components/amp-bind#element-specific-attributes
        # TODO: Add remainig bindable values
        if re.search(AMP_BIND_MARKERS_REGEX, stripped_content):
            dependencies.append('amp-bind')

        # Checks if document depends on <amp-access>
        if ' amp-access="' in stripped_content:
            dependencies.append('amp-access')

        # Checks if document depends on <amp-mustache>
        if '<template type="amp-mustache"' in stripped_content:
            dependencies.append('amp-mustache')

        # Checks if document uses <amp-fx-collection>
        if ' amp-fx="' in stripped_content:
            dependencies.append('amp-fx-collection')

        return dependencies

    def verify_dependencies(self, dependencies, doc):
        """Verifies that the found dependencies are valid components
        and filters out duplicates."""
        valid_dependencies = []
        for dependency in dependencies:
            if dependency in valid_dependencies: continue
            if dependency in BUILT_INS: continue
            if dependency in FALSE_POSITIVES: continue
            if dependency not in COMPONENT_VERSIONS:
                self.pod.logger.warning('{} uses unknown AMP dependency: {}'.format(doc, dependency))
                continue

            valid_dependencies.append(dependency)
        return valid_dependencies

    def inject_dependencies(self, dependencies, content):
        script_tags = []
        for dependency in dependencies:
            dep_type = 'element' if dependency != 'amp-mustache' else 'template'
            existing_pattern = re.compile(IMPORT_REGEX_TEMPLATE.format(type=dep_type, dependency=dependency),
                                          re.IGNORECASE)
            if not existing_pattern.search(content):

                version = COMPONENT_VERSIONS[dependency]
                src = 'https://cdn.ampproject.org/v0/{dependency}-{version}.js'.format(dependency=dependency, version=version)

                tag = '<script custom-{type}="{dependency}" src="{src}" async></script>'.format(
                  type=dep_type, dependency=dependency, src=src)
                script_tags.append(tag)

        # Add tags to end of <head>
        script_tags.append('</head>')
        content = content.replace('</head>', ''.join(script_tags))

        return content


class AmpDependencyInjectorExtension(extensions.BaseExtension):
    """AMP Dependency Injector Extension."""

    def __init__(self, pod, config):
        super(AmpDependencyInjectorExtension, self).__init__(pod, config)
        # Initialize a cache for the found dependencies
        self._dependencyCache = pod.podcache.get_object_cache('ampDeps')

    @property
    def available_hooks(self):
        """Returns the available hook classes."""
        return [AmpDependencyInjectorPostRenderHook]

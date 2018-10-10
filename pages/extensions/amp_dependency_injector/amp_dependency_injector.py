# -*- coding: utf-8 -*-
import re

from grow import extensions
from grow.documents import document, static_document
from grow.extensions import hooks

# See: https://www.ampproject.org/docs/reference/components
# TODO: Add remaining Media dependencies
VALID_DEPENDENCIES = {
    'amp-access': True,
    'amp-animation': True,
    'amp-access-laterpay': True,
    'amp-accordion': True,
    'amp-ad': True,
    'amp-ad-exit': True,
    'amp-analytics': True,
    'amp-app-banner': True,
    'amp-auto-ads': True,
    'amp-bind': True,
    'amp-byside-content': True,
    'amp-call-tracking': True,
    'amp-carousel': True,
    'amp-consent': True,
    'amp-date-picker': True,
    'amp-experiment': True,
    'amp-form': True,
    'amp-font': True,
    'amp-fx-collection': True,
    'amp-fx-flying-carpet': True,
    'amp-geo': True,
    'amp-gist': True,
    'amp-google-document-embed': True,
    'amp-iframe': True,
    'amp-image-lightbox': True,
    'amp-install-serviceworker': True,
    'amp-lightbox': True,
    'amp-lightbox-gallery': True,
    'amp-list': True,
    'amp-live-list': True,
    'amp-mustache': True,
    'amp-next-page': True,
    'amp-orientation-observer': True,
    'amp-pixel': True,
    'amp-position-observer': True,
    'amp-selector': True,
    'amp-sidebar': True,
    'amp-sticky-ad': True,
    'amp-user-notification': True,
    'amp-web-push': True,
}

BUILT_INS = [
    'amp-layout',
    'amp-img',
    'amp-pixel'
]


class AmpDependencyInjectorPostRenderHook(hooks.PostRenderHook):
    """Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
        """Should the hook trigger with current document?"""
        content = previous_result if previous_result else raw_content

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

        dependencies = self.find_dependencies(content)
        dependencies = self.verify_dependencies(dependencies)
        content = self.inject_dependencies(dependencies, content)

        return content

    def find_dependencies(self, content):
        """Checks the generated output for possible AMP dependencies."""
        # TODO: Remove code snippets from content before searching for deps

        dependencies = []

        # Finds all <amp-*> tags that may introduce a dependency to a component
        ELEMENT_REGEX = r"<(amp-\S*?)(>|\s)"
        for element in re.findall(ELEMENT_REGEX, content):
            # The first capturing group will be the component name
            component_name = element[0]
            dependencies.append(component_name)

        # Checks if document depends on <amp-form>
        if '<form' in content:
            dependencies.append('amp-form')

        # Checks if document depends on <amp-bind>, also see:
        # https://www.ampproject.org/docs/reference/components/amp-bind#element-specific-attributes
        # TODO: Add remainig bindable values
        AMP_BIND_MARKERS_REGEX = r"(<amp-state|<amp-bind-macro|\s\[(text|class|hidden|width|height|src|title|alt|srcset|open|selected|controls|loop|poster|preload|disabled|href|type|value)\]=)"
        if re.search(AMP_BIND_MARKERS_REGEX, content):
            dependencies.append('amp-bind')

        # Checks if document depends on <amp-mustache>
        if '<template type="amp-mustache"' in content:
            dependencies.append('amp-mustache')

        # Checks if document uses <amp-fx-collection>
        if 'amp-fx="' in content:
            dependencies.append('amp-fx-collection')

        return dependencies

    def verify_dependencies(self, dependencies):
        """Verifies that the found dependencies are valid components
        and filters out duplicates."""
        seen_dependencies = {}
        valid_dependencies = []
        for dependency in dependencies:
            if dependency in seen_dependencies: continue
            if dependency in BUILT_INS: continue
            if dependency not in VALID_DEPENDENCIES:
                self.pod.logger.warning('Document uses unknown AMP dependency: {}'.format(dependency))
                continue

            seen_dependencies[dependency] = True
            valid_dependencies.append(dependency)
        return valid_dependencies

    def inject_dependencies(self, dependencies, content):
        script_tags = []
        for dependency in dependencies:
            # TODO: Handle different versions, URL and type within VALID_DEPENDENCIES
            src = 'https://cdn.ampproject.org/v0/{}-0.1.js'.format(dependency)
            type = 'element' if dependency is not 'amp-mustache' else 'template'

            tag = '<script custom-{type}="{dependency}" src="{src}" async></script>'.format(type=type, dependency=dependency, src=src)
            script_tags.append(tag)

        # Add tags to end of <head>
        script_tags.append('</head>')
        content = content.replace('</head>', ''.join(script_tags))

        return content


class AmpDependencyInjectorExtension(extensions.BaseExtension):
    """AMP Dependency Injector Extension."""

    @property
    def available_hooks(self):
        """Returns the available hook classes."""
        return [AmpDependencyInjectorPostRenderHook]

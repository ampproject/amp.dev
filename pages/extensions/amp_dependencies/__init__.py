# -*- coding: utf-8 -*-
import uuid
from sets import Set

from grow import extensions
from grow.documents import document, static_document
from grow.extensions import hooks

class AmpDependencies(object):
    def __init__(self, doc):
        self._doc = doc
        self._pod = doc.pod
        # Used to determine where to print all dependencies
        self._placeholder = '{}'.format(uuid.uuid4())
        # Stores registered paths
        self._dependencies = []

    def __repr__(self):
        return '<AmpDependencies({})>'.format(self._placeholder)

    def add(self, name, version='0.1'):
        src = 'https://cdn.ampproject.org/v0/{name}-{version}.js'.format(name=name, version=version)
        type = 'element' if name != 'amp-mustache' else 'template'
        tag = '<script custom-{type}="{name}" src="{src}" async></script>'.format(type=type, name=name, src=src)

        self._dependencies.append(tag)
        return ''

    def emit(self):
        return self._placeholder

    def inject(self, content):
        # Check wether the content has the placeholder
        if self._placeholder not in content:
            return content

        dependencies = ''.join(Set(self._dependencies))
        return content.replace(self._placeholder, dependencies)


class AmpDependenciesPreRenderHook(hooks.PreRenderHook):
    """Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
        """Only run for documents with contents"""

        # Check that it's not a StaticDocument
        if isinstance(doc, static_document.StaticDocument):
            return False

        return True

    def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
        amp_dependencies = AmpDependencies(doc)
        setattr(doc, 'amp_dependencies', amp_dependencies)

        return previous_result if previous_result else raw_content


class AmpDependenciesPostRenderHook(hooks.PostRenderHook):
    """Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
        """Only needs to trigger if pre-render hook added a stylesheet
        and there is content to render"""
        # Do not run for empty documents
        content = previous_result if previous_result else original_body
        if content is None:
            return False

        # Check that it's not a StaticDocument
        if isinstance(doc, static_document.StaticDocument):
            return False

        return True

    def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
        content = previous_result if previous_result else raw_content

        amp_dependencies = getattr(doc, 'amp_dependencies')
        content = amp_dependencies.inject(content)

        return content


class AmpDependenciesExtension(extensions.BaseExtension):
    """AMP Dependencies Extension."""

    def __init__(self, pod, config):
        super(AmpDependenciesExtension, self).__init__(pod, config)

    @property
    def available_hooks(self):
        """Returns the available hook classes."""
        return [
            AmpDependenciesPreRenderHook,
            AmpDependenciesPostRenderHook,
        ]

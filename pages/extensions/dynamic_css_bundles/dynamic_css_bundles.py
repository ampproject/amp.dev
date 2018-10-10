# -*- coding: utf-8 -*-
import uuid
from operator import itemgetter

from grow import extensions
from grow.documents import document, static_document
from grow.extensions import hooks


class DynamicCssBundle(object):

    def __init__(self, doc):
        self._doc = doc
        # Used to determine where to print the finished styles
        self._placeholder = '/* {} */'.format(uuid.uuid4())
        # Stores registered paths
        self._css_files = []

    def __repr__(self):
        return '<DynamicCssBundle({})>'.format(self._placeholder)

    def addCssFile(self, path, priority=1):
        # Normalize path
        path = path.lstrip('/')
        css = (path, priority)
        if css not in self._css_files:
            self._css_files.append(css)
        # Return empty string to not print None if used with {{ }}
        return ''

    def emit(self):
        return self._placeholder

    def inject(self, content):
        # Check wether the content has the placeholder
        if self._placeholder not in content:
            return content

        # Reverse to keep natural order after sorting
        self._css_files.reverse()
        # Sort CSS files by priority
        self._css_files.sort(key=itemgetter(1))

        base_path = self._doc.pod.root
        stylesheet = []
        # Try to get CSS from files and concat it
        for path, priority in self._css_files:
            path = '{}/{}'.format(base_path, path)
            try:
                with open(path, 'r') as css_file:
                    css = css_file.read()
                    css = css.strip(' \t\n\r')

                    stylesheet.append(css)
            except IOError:
                self._doc.pod.logger.error('Could not find {}'.format(path))

        stylesheet = ''.join(stylesheet)
        return content.replace(self._placeholder, stylesheet)


class DynamicCssBundlesPreRenderHook(hooks.PreRenderHook):
    """Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
        """Only run for documents with contents"""

        # Check that it's not a StaticDocument
        if isinstance(doc, static_document.StaticDocument):
            return False

        return True

    def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
        # Create dynamic stylesheet and attach to document for use in template
        setattr(doc, 'styles', DynamicCssBundle(doc))

        return previous_result if previous_result else raw_content


class DynamicCssBundlesPostRenderHook(hooks.PostRenderHook):
    """Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
        """Only needs to trigger if pre-render hook added a stylesheet
        and there is content to render"""
        # Do not run for empty documents
        content = previous_result if previous_result else original_body
        if content is None:
            return False

        if not hasattr(doc, 'styles'):
            return False
        return True

    def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
        content = previous_result if previous_result else raw_content

        return doc.styles.inject(content)


class DynamicCssBundlesExtension(extensions.BaseExtension):
    """Dynamic CSS Bundles Extension."""

    def __init__(self, pod, config):
        super(DynamicCssBundlesExtension, self).__init__(pod, config)

    @property
    def available_hooks(self):
        """Returns the available hook classes."""
        return [
            DynamicCssBundlesPreRenderHook,
            DynamicCssBundlesPostRenderHook,
        ]

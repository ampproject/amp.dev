# -*- coding: utf-8 -*-
import uuid
from operator import itemgetter

from grow import extensions
from grow.documents import document, static_document
from grow.extensions import hooks


class AssetBundle(object):
    def __init__(self, doc):
        self._doc = doc
        self._pod = doc.pod
        self._cache = self._pod.podcache.get_object_cache('inlineTextAssets')
        # Used to determine where to print the finished styles
        self._placeholder = '/* {} */'.format(uuid.uuid4())
        # Stores registered paths
        self._files = []

    def __repr__(self):
        return '<AssetBundle({})>'.format(self._placeholder)

    def addFile(self, path, priority=1):
        # Normalize path
        path = path.lstrip('/')
        file = (path, priority)
        if file not in self._files:
            self._files.append(file)
        # Return empty string to not print None if used with {{ }}
        return ''

    def emit(self):
        return self._placeholder

    def read_file(self, path):
        file_contents = self._cache.get(path)
        if not self._pod.env.dev and file_contents:
            return file_contents
        # If file has not yet been read, add it to the cache
        try:
            with open(path, 'r') as file:
                file_contents = file.read()
                file_contents = file_contents.strip(' \t\n\r')
                self._cache.add(path, file_contents)
                return file_contents
        except IOError:
            self._pod.logger.error('Could not find {}'.format(path))

    def inject(self, content):
        # Check wether the content has the placeholder
        if self._placeholder not in content:
            return content

        # Reverse to keep natural order after sorting
        self._files.reverse()
        # Sort CSS files by priority
        self._files.sort(key=itemgetter(1))

        base_path = self._pod.root
        bundle = []
        # Try to get contents from files and concat them
        for path, priority in self._files:
            path = '{}/{}'.format(base_path, path)
            file_contents = self.read_file(path)
            if file_contents:
                bundle.append(file_contents)

        bundle = ''.join(bundle)
        return content.replace(self._placeholder, bundle)


class InlineTextAssetsPreRenderHook(hooks.PreRenderHook):
    """Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
        """Only run for documents with contents"""

        # Check that it's not a StaticDocument
        if isinstance(doc, static_document.StaticDocument):
            return False

        return True

    def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
        # Create bundles and attach them to doc
        for config in self.extension.bundles:
            bundle = AssetBundle(doc)
            # Expose AssetBundle.addFile via custom method name
            setattr(bundle, config['method'], bundle.addFile)

            # And attach the bundle to doc for use, check that it is not reserved
            setattr(doc, config['name'], bundle)
            # TODO: Check if bundle name may not be used
            # self.doc.pod.logger.error(
            #     'Please choose another bundle name. This one is already used or taken by Grow.'
            # )
            #

        return previous_result if previous_result else raw_content


class InlineTextAssetsPostRenderHook(hooks.PostRenderHook):
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

        # Replace bundle placeholder in content
        for config in self.extension.bundles:
            bundle = getattr(doc, config['name'])
            content = bundle.inject(content)

        return content


class InlineTextAssetsExtension(extensions.BaseExtension):
    """Inline Text Assets Extension."""

    def __init__(self, pod, config):
        super(InlineTextAssetsExtension, self).__init__(pod, config)
        self.bundles = config['bundles']

    @property
    def available_hooks(self):
        """Returns the available hook classes."""
        return [
            InlineTextAssetsPreRenderHook,
            InlineTextAssetsPostRenderHook,
        ]

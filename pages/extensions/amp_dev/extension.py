# -*- coding: utf-8 -*-
import os
import pkgutil
import sys
import types

from grow import extensions
from grow.documents import document, document_format, static_document
from grow.extensions import hooks

from .markdown_extras import block_filter as BlockFilter
from .markdown_extras import block_tip as BlockTip
from .markdown_extras import block_video as BlockVideo
from .markdown_extras import inline_tip as InlineTip


class AmpDevPreRenderHook(hooks.PreRenderHook):
    """Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
        # Only trigger for non-empty documents
        content = previous_result if previous_result else original_body
        if content is None:
            return False

        # Only trigger for MarkdownDocuments
        if not isinstance(doc.format, document_format.MarkdownDocumentFormat):
          return False

        return True

    def trigger(self, previous_result, doc, original_body, *_args, **_kwargs):
        content = previous_result if previous_result else original_body
        content = self.extension.transform_markdown(original_body, content)
        return content

class AmpDevExtension(extensions.BaseExtension):
    """Extends Grow with specifics for amp.dev."""

    def __init__(self, pod, config):
        super(AmpDevExtension, self).__init__(pod, config)

        # Initialize an object cache for template partials
        self.template_cache = pod.podcache.get_object_cache('amp_dev_template');

        # Expose extension direclty on pod for use in templates
        setattr(pod, 'amp_dev', self)

        # Monkey-patch getting a doc in the templates to overload URL parsing
        # behaviour
        pod.amp_dev_get_doc = pod.get_doc
        pod.get_doc = types.MethodType(get_doc, pod)

    def transform_markdown(self, original_body, content):
        content = InlineTip.trigger(original_body, content)
        content = BlockTip.trigger(original_body, content)
        content = BlockVideo.trigger(original_body, content)
        content = BlockFilter.trigger(original_body, content)
        return content

    @property
    def available_hooks(self):
        return [
            AmpDevPreRenderHook,
        ]

# Monkey patch for grow.pods.pods.Pod.get_doc
def get_doc(self, pod_path, locale=None):
    doc = self.amp_dev_get_doc(pod_path, locale=locale)
    # Monkey patch doc and add property public_path, do not do this during
    # development as otherwise Grows dev routing will fail
    public_path = doc.url.path.replace('/index.html', '/').replace('.html', '')
    setattr(doc, 'public_path', public_path)
    return doc

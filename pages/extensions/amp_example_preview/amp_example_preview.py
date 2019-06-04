# -*- coding: utf-8 -*-
from grow import extensions
from grow.documents import document, document_format
from grow.extensions import hooks

from .util import markdown_processor as markdown_pre_processor
from .util import preview_generator as example_preview_generator


class AmpMarkdownExampleExtractorHook(hooks.PreRenderHook):
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
        return markdown_pre_processor.trigger(doc, original_body, content)


class AmpPreviewRenderHook(hooks.PostRenderHook):

    def should_trigger(self, previous_result, doc, original_body, *_args, **_kwargs):
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
        return example_preview_generator.trigger(doc, original_body, content)


class AmpExamplePreviewExtension(extensions.BaseExtension):
    """Extends Grow with preview generation for inline examples."""

    def __init__(self, pod, config):
        super(AmpExamplePreviewExtension, self).__init__(pod, config)

    @property
    def available_hooks(self):
        return [
            AmpMarkdownExampleExtractorHook,
            AmpPreviewRenderHook,
        ]

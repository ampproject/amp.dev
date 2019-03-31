# -*- coding: utf-8 -*-
import os
import pkgutil
import sys

from grow import extensions
from grow.documents import document, document_format, static_document
from grow.extensions import hooks

from .markdown_extras import block_tip as BlockTip
from .markdown_extras import block_video as BlockVideo
from .markdown_extras import inline_tip as InlineTip

from .validation import validate

class AmpDevPreRenderHook(hooks.PreRenderHook):
    """Handle the pre-render hook."""

    def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
        # Only trigger for non-empty documents
        content = previous_result if previous_result else original_body
        if content is None:
            return False

        return True

    def trigger(self, previous_result, doc, original_body, *_args, **_kwargs):
        content = previous_result if previous_result else original_body
        # Trigger expansion of shortcodes only for Markdown documents
        if isinstance(doc.format, document_format.MarkdownDocumentFormat):
            content = self.extension.transform_markdown(original_body, content)

        return content

class AmpDevPostRenderHook(hooks.PostRenderHook):
    """Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
        # Only trigger for non-empty documents
        content = previous_result if previous_result else original_body
        if content is None:
            return False

        return True

    def trigger(self, previous_result, doc, original_body, *_args, **_kwargs):
        content = previous_result if previous_result else original_body

        # Always validate documents and try to add missing extensions
        content = self.extension.inject_extensions(doc, content)

        return content

class AmpDevExtension(extensions.BaseExtension):
    """Extends Grow with specifics for amp.dev."""

    def __init__(self, pod, config):
        super(AmpDevExtension, self).__init__(pod, config)

        # Initialize an object cache for template partials
        self.template_cache = pod.podcache.get_object_cache('amp_dev_template');
        self.extensions_cache = pod.podcache.get_object_cache('amp_dev_extensions');

        # Expose extension directly on pod for use in templates
        setattr(pod, 'amp_dev', self)

    def transform_markdown(self, original_body, content):
        content = InlineTip.trigger(original_body, content)
        content = BlockTip.trigger(original_body, content)
        content = BlockVideo.trigger(original_body, content)
        return content

    def inject_extensions(self, doc, content):
        # During build check if dependencies for this document has already
        # been evaluated
        script_tags = self.extensions_cache.get(doc.pod_path)
        if script_tags and not pod.podspec.env.name == 'development':
            content = content.replace('</head>', ''.join(script_tags))
            return content

        validation_result = validate(content)['-']
        missing_extensions = []
        if 'errors' in validation_result:
            for message in validation_result['errors']:
                if message['code'] == 'MISSING_REQUIRED_EXTENSION':

                    missing_extensions.append(message['params'][1])

        script_tags = []
        for extension in set(missing_extensions):
            # TODO: Handle different versions, URL and type
            src = 'https://cdn.ampproject.org/v0/{}-0.1.js'.format(extension)
            type = 'element' if extension is not 'amp-mustache' else 'template'

            tag = '<script custom-{type}="{extension}" src="{src}" async></script>'.format(type=type, extension=extension, src=src)
            script_tags.append(tag)

        # Add tags to end of <head>
        script_tags.append('</head>')
        content = content.replace('</head>', ''.join(script_tags))

        # Cache extensions to use for build
        self.extensions_cache.add(doc.pod_path, script_tags)

        return content

    @property
    def available_hooks(self):
        return [
            AmpDevPreRenderHook,
            AmpDevPostRenderHook,
        ]

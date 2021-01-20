# -*- coding: utf-8 -*-
from grow import extensions
from grow.documents import document, document_format, static_document
from grow.extensions import hooks

from .markdown_extras import block_filter as BlockFilter
from .markdown_extras import block_tip as BlockTip
from .markdown_extras import block_video as BlockVideo
from .markdown_extras import inline_tip as InlineTip


class AmpDevPreRenderHook(hooks.PreRenderHook):
    """Handle the pre-render hook."""

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

        content = self.extension.transform_markdown(doc, original_body, content)

        # The TOC should not contain headlines that are actually enclosed
        # in format filtered sections. filter_toc creates a callable that is
        # later able to filter the TOC based on those sections. It is *not* possible
        # to already evaluate this here as it would overwrite all transformations
        setattr(doc.format, 'filter_toc', BlockFilter.filter_toc(doc, content))

        return content


class AmpDevExtension(extensions.BaseExtension):
    """Extends Grow with specifics for amp.dev."""

    def __init__(self, pod, config):
        super(AmpDevExtension, self).__init__(pod, config)

        self.default_locale = pod.podspec.default_locale

        # Initialize an object cache for template partials
        self.template_cache = pod.podcache.get_object_cache('amp_dev_template');

        # Expose extension direclty on pod for use in templates
        setattr(pod, 'amp_dev', self)

    def transform_markdown(self, doc, original_body, content):
        content = InlineTip.trigger(original_body, content)
        content = BlockTip.trigger(original_body, content)
        content = BlockVideo.trigger(original_body, content)
        content = BlockFilter.trigger(original_body, content)
        return content

    def get_represented_locales(self, doc):
        """
        Will return all locales as comma separated list for which the document is used.
        :type doc: document.Document
        """

        # Only the document in the default locale might be used for any other language
        if self.default_locale != doc.locale:
          return doc.locale.alias

        # Looks like we are in the default locale
        # Find all locales that do not have an explicit translation file
        # (the default locale also has no explicit translation file)
        locales = None
        for locale in doc.locales:
          localized_path = document.Document.localize_path(doc.pod_path, locale.alias)
          if not doc.pod.file_exists(localized_path):
            if locales:
              locales = locales + ',' + locale.alias
            else:
              locales = locale.alias
        return locales

    @property
    def available_hooks(self):
        return [
            AmpDevPreRenderHook,
        ]

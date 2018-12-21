# -*- coding: utf-8 -*-
import os
import pkgutil
import sys

from grow import extensions
from grow.documents import document, static_document
from grow.extensions import hooks

import bbcode

SHORTCODES_DIR = 'shortcodes'


class ShortcodesPreRenderHook(hooks.PreRenderHook):
    """Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
        """Only trigger for non-empty documents"""
        content = previous_result if previous_result else original_body
        if content is None:
            return False

        # Check that it's not a StaticDocument
        if isinstance(doc, static_document.StaticDocument):
            return False

        # TODO: This is extremly ugly but without it Grow will cache
        # the result of rendered shortcodes. At least try to only bust
        # needed caches
        doc.pod.podcache.reset()
        return True

    def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
        content = previous_result if previous_result else raw_content

        return self.extension.parser.format(content, doc=doc)


class ShortcodesPostRenderHook(hooks.PostRenderHook):
    """ Handle the post-render hook."""

    def should_trigger(self, previous_result, doc, original_body, *_args,**_kwargs):
        """Only trigger for non-empty documents"""
        content = previous_result if previous_result else original_body
        if content is None:
            return False

        # Check that it's not a StaticDocument
        if isinstance(doc, static_document.StaticDocument):
            return False

        return True

    def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
        content = previous_result if previous_result else raw_content

        # Replace placeholders with rendered shortcodes
        for id, value in self.extension.values.iteritems():
          content = content.replace('<!-- {} -->'.format(id), value)

        # And then empty values dictionary for next document
        self.extension.values = {}

        return content


class ShortcodesExtension(extensions.BaseExtension):
    """Shortcodes Extension."""

    def __init__(self, pod, config):
        super(ShortcodesExtension, self).__init__(pod, config)
        self.parser = bbcode.Parser(
            newline='\n',
            install_defaults=False,
            escape_html=False,
            replace_cosmetic=False,
            replace_links=False)
        # Holds registered shortcodes
        self.shortcodes = []
        # Stores the values of the rendered shortcodes for later replacement
        self.values = {}

        self._load_shortcodes()

    def _load_shortcodes(self):
        """Verifies the pod has a shortcode module and loads all shortcodes"""
        shortcodes_path = '{}/{}'.format(self.pod.root, SHORTCODES_DIR)
        if os.path.exists(shortcodes_path + '/__init__.py'):
            for importer, package_name, _ in pkgutil.iter_modules(
                [shortcodes_path]):
                full_package_name = '{}.{}'.format(shortcodes_path,
                                                   package_name)
                if full_package_name not in sys.modules:
                    module = importer.find_module(package_name).load_module(
                        package_name)
                    self._register_shortcode(module)
        else:
            self.pod.logger.warning(
                'There is no shortcode package in this pod')

    def _register_shortcode(self, module):
        """Checks if a loaded module exports a shortcode class and if so instantiates
        one and tries to register it with the BBCode parser"""
        if module.shortcode:
            shortcode = module.shortcode(self.pod, self)
            self.shortcodes.append(shortcode)
            shortcode.register(self.parser)

    @property
    def available_hooks(self):
        """Returns the available hook classes."""
        return [
            ShortcodesPreRenderHook,
            ShortcodesPostRenderHook,
        ]

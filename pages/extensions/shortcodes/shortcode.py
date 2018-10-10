# -*- coding: utf-8 -*-
import os

import jinja2
import markdown
from grow.templates import tags


class Shortcode(object):

    # The (tag)name for the shortcode
    name = 'default'

    # For all BBCode options see https://bbcode.readthedocs.io/en/latest/formatters.html#custom-tag-options
    newline_closes = False
    same_tag_closes = False
    standalone = False
    render_embedded = True
    transform_newlines = False
    escape_html = False
    replace_links = False
    replace_cosmetic = True
    strip = False
    swallow_trailing_newline = False

    # Pod-relative path to the template if there is one to render
    template = None
    # Dictionary of variables that get passed into the template
    context = {}
    # If set to True markdown inside the shortcode will be rendered ahead
    prerender_markdown = False
    # Can be overwritten with a method that can be used to alter the value
    # before rendering
    transform = None
    # Set to True to enable template rendering even with empty value
    render_empty = False

    def __init__(self, pod):
        self._pod = pod

    def register(self, parser):
        """Adds a formatter for the shortcode to the BBCode parser"""
        parser.add_formatter(
            self.name,
            self._render,
            newline_closes=self.newline_closes,
            same_tag_closes=self.same_tag_closes,
            standalone=self.standalone,
            render_embedded=self.render_embedded,
            transform_newlines=self.transform_newlines,
            escape_html=self.escape_html,
            replace_links=self.replace_links,
            replace_cosmetic=self.replace_cosmetic,
            strip=self.strip,
            swallow_trailing_newline=self.swallow_trailing_newline, )
        self._pod.logger.info('Registered shortcode "{}"'.format(self.name))

    def _render(self, tag_name, value, options, parent, context):
        if self.prerender_markdown:
            # Prerender markdown to have HTML
            value = markdown.markdown(value)
        if callable(self.transform):
            # Give shortcode author the chance to manipulate the output
            value = self.transform(value=value, options=options)
        # Check if we still have a value to render
        if not value and not self.render_empty:
            return '\n'
        if self.template:
            value = self._render_template(
                doc=context['doc'], value=value, options=options)
        # Make sure to bring some room between potential markdown elements
        return '\n' + value + '\n'

    def _render_template(self, doc, value, options):
        # Check if template exists
        template_path = '{}/{}'.format(self._pod.root, self.template)
        if os.path.exists(template_path):
            # Get pod's jinja2 environment for rendering
            jinja = self._pod.get_jinja_env()

            # Build context for rendering of template
            context = self.context
            context['value'] = value
            context['options'] = options

            # Bring default grow tags/variables into template
            context['doc'] = doc
            context['g'] = tags.create_builtin_tags(self._pod, doc)

            with open(template_path) as template:
                template = jinja.from_string(template.read())
                return template.render(context)

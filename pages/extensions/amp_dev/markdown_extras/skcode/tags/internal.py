u"""
SkCode internal tag definitions code.
"""

from __future__ import absolute_import
from ..etree import TreeNode


class TextTreeNode(TreeNode):
    u""" Text tree node class. """

    inline = True
    close_inlines = False

    def render_html(self, inner_html, **kwargs):
        u"""
        Callback function for rendering HTML.
        :param inner_html: The inner HTML of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered HTML of this node.
        """
        content = self.content
        return content

    def render_text(self, inner_text, **kwargs):
        u"""
        Callback function for rendering text.
        :param inner_text: The inner text of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered text of this node.
        """
        content = self.content
        content = unescape_html_entities(content)
        content = do_cosmetics_replacement(self.root_tree_node, content)
        return content


class NewlineTreeNode(TreeNode):
    u""" Newline tree node class. """

    inline = True
    close_inlines = False

    def render_html(self, inner_html, **kwargs):
        u"""
        Callback function for rendering HTML.
        :param inner_html: The inner HTML of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered HTML of this node.
        """
        return u'\n'

    def render_text(self, inner_text, **kwargs):
        u"""
        Callback function for rendering text.
        :param inner_text: The inner text of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered text of this node.
        """
        return u' '


class HardNewlineTreeNode(NewlineTreeNode):
    u""" Newline (hard line break variant) tree node class. """

    def render_html(self, inner_html, **kwargs):
        u"""
        Callback function for rendering HTML.
        :param inner_html: The inner HTML of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered HTML of this node.
        """
        return u'<br>\n'

    def render_text(self, inner_text, **kwargs):
        u"""
        Callback function for rendering text.
        :param inner_text: The inner text of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered text of this node.
        """
        return u'\n'

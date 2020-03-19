u"""
SkCode rendering code.
"""


# Default HTML for error messages
DEFAULT_ERROR_HTML_TEMPLATE = u'<span style="font-weight: bold; color: red;" ' \
                              u'title="{error_message}">{source}</span>'
SUPPRESS_ERROR_HTML_TEMPLATE = u'<!-- {error_message} --> {source}'


def render_inner_html(tree_node,
                      force_rel_nofollow=True,
                      html_error_template=DEFAULT_ERROR_HTML_TEMPLATE, **kwargs):
    u"""
    Render all children of the given tree node as HTML.
    :param tree_node: The parent tree node with children to be rendered.
    :param force_rel_nofollow: If set to ``True``, all links in the rendered HTML will have the attribute
        "rel=nofollow" to avoid search engines to scrawl them (default ``True``).
    :param html_error_template: HTML template for displaying error messages.
    :param kwargs: Extra keywords arguments for the ``render_html`` callback method.
    :return The rendered children tree as HTML.
    """

    # Get the inner HTML
    inner_html = []
    for child_node in tree_node.children:
        inner_html.append(render_to_html(child_node,
                                         force_rel_nofollow=force_rel_nofollow,
                                         html_error_template=html_error_template, **kwargs))

    # Return the inner HTML as string
    return u''.join(inner_html)


def render_to_html(tree_node,
                   force_rel_nofollow=True,
                   html_error_template=DEFAULT_ERROR_HTML_TEMPLATE, **kwargs):
    u"""
    Render the given tree node and children recursively as HTML.
    :param tree_node: The tree node to be rendered.
    :param force_rel_nofollow: If set to ``True``, all links in the rendered HTML will have the attribute
        "rel=nofollow" to avoid search engines to scrawl them (default ``True``).
    :param html_error_template: HTML template for displaying error messages.
    :param kwargs: Extra keywords arguments for the ``render_html`` callback method.
    :return The rendered document tree as HTML.
    """

    # Get the inner HTML
    inner_html = render_inner_html(tree_node,
                                   force_rel_nofollow=force_rel_nofollow,
                                   html_error_template=html_error_template, **kwargs)

    # Render the node
    if tree_node.error_message:
        return tree_node.render_error_html(inner_html,
                                           force_rel_nofollow=force_rel_nofollow,
                                           html_error_template=html_error_template, **kwargs)
    else:
        return tree_node.render_html(inner_html,
                                     force_rel_nofollow=force_rel_nofollow,
                                     html_error_template=html_error_template, **kwargs)


def render_inner_text(tree_node, **kwargs):
    u"""
    Render all children of the given tree node as text.
    :param tree_node: The parent tree node with children to be rendered.
    :param kwargs: Extra keywords arguments for the ``render_text`` callback method.
    :return The rendered children tree as text.
    """

    # Get the inner text
    inner_text = []
    for child_node in tree_node.children:
        inner_text.append(render_to_text(child_node, **kwargs))

    # Return the inner text as string
    return u''.join(inner_text)


def render_to_text(tree_node, **kwargs):
    u"""
    Render the given tree node and children recursively as text.
    :param tree_node: The tree node to be rendered.
    :param kwargs: Extra keywords arguments for the ``render_text`` callback method.
    :return The rendered document tree as text.
    """

    # Get the inner text
    inner_text = render_inner_text(tree_node, **kwargs)

    # Render the node
    if tree_node.error_message:
        return tree_node.render_error_text(inner_text, **kwargs)
    else:
        return tree_node.render_text(inner_text, **kwargs)

u"""
SkCode AST tree builder code.
"""

from __future__ import absolute_import
from collections import defaultdict
from gettext import gettext as _

from .etree import (
    RootTreeNode,
    TreeNode
)
from .tags import (
    # DEFAULT_RECOGNIZED_TAGS_LIST,
    build_recognized_tags_dict,
    NewlineTreeNode,
    TextTreeNode
)
from .tokenizer import (
    tokenize_tag,
    TOKEN_DATA,
    TOKEN_NEWLINE,
    TOKEN_OPEN_TAG,
    TOKEN_CLOSE_TAG,
    TOKEN_SELF_CLOSE_TAG
)


def parse_skcode(text,
                 recognized_tags=[],
                 opening_tag_ch=u'[', closing_tag_ch=u']',
                 allow_tagvalue_attr=True, allow_self_closing_tags=True,
                 root_node_cls=RootTreeNode,
                 text_node_cls=TextTreeNode,
                 newline_node_cls=NewlineTreeNode,
                 mark_unclosed_tags_as_erroneous=False,
                 max_nesting_depth=16,
                 cls_options_overload=None):
    u"""
    Parse the given text as a BBCode formatted document.
    Return the resulting document tree (DOM-like parser).
    :param text: The input text to be parsed.
    :param recognized_tags: A list containing all valid tag classes.
    :type recognized_tags: iterable[TreeNode]
    :param opening_tag_ch: The opening tag char (must be one char long exactly, default '[').
    :param closing_tag_ch: The closing tag char (must be one char long exactly, default ']').
    :param allow_tagvalue_attr: Set to ``True`` to allow the BBCode ``tagname=tagvalue`` syntax shortcut
    (default is ``True``).
    :param allow_self_closing_tags: Set to ``True`` to allow the self closing tags syntax (default is ``True``).
    :param root_node_cls: The tree node class for the root node.
    :param text_node_cls: The tree node class for all normal text nodes.
    :param newline_node_cls: The tree node class for all newlines.
    :param mark_unclosed_tags_as_erroneous: If set to ``True``, unclosed tags will be mark as erroneous
    (default is ``False``).
    :param max_nesting_depth: The maximum nesting depth (default to 16). Set to zero to disable (not recommended
    because a Denial-Of-Service is possible if nesting depth is not limited).
    :param cls_options_overload: Dictionary of dictionaries mapped by node class type ``{class: {key : value}}``
    to be used to overload node options settings on a per node class basis.
    This allow simple tweak of a default class behaviour at runtime.
    :type cls_options_overload: dict[TreeNode, dict[str, Any]]
    :return The resulting document tree at the end of the parsing stage.
    """
    assert opening_tag_ch, u"The opening tag character is mandatory."
    assert len(opening_tag_ch) == 1, u"Opening tag character must be one char long exactly."
    assert closing_tag_ch, u"The closing tag character is mandatory."
    assert len(closing_tag_ch) == 1, u"Closing tag character must be one char long exactly."
    assert root_node_cls, u"Root tree node class is mandatory."
    assert text_node_cls, u"Text tree node class is mandatory."
    assert newline_node_cls, u"Newline tree node class is mandatory."
    assert max_nesting_depth >= 0, u"Maximum nesting depth must be greater or equal than zero."

    # Build the known tag names dictionary
    recognized_tags = build_recognized_tags_dict(recognized_tags)

    # Build the overload options dictionary
    extra_cls_kwargs = defaultdict(dict)
    if cls_options_overload:
        extra_cls_kwargs.update(cls_options_overload)

    # Initialize the parser
    root_tree_node = cur_tree_node = root_node_cls()
    cur_nesting_depth = 0

    # Cleanup text to avoid parsing useless whitespaces
    text = text.strip()
    if not text:
        return root_tree_node

    # Tokenize the input text
    for token in tokenize_tag(text,
                              opening_tag_ch, closing_tag_ch,
                              allow_tagvalue_attr, allow_self_closing_tags):

        # Unpack the token
        token_type, tag_name, tag_attrs, token_source = token

        # Handle DATA block
        if not cur_tree_node.parse_embedded and (token_type != TOKEN_CLOSE_TAG or tag_name != cur_tree_node.name):

            # Append the raw source to the node until closing tag found
            cur_tree_node.content += token_source
            continue

        # The ``if`` below must be an ``if`` and not an ``elif`` because we need to parse
        # the closing tag of the DATA block when received.

        # Handle unrecognized tags
        if tag_name is not None and tag_name not in recognized_tags:

            # Turn the token into raw data
            cur_tree_node.new_child(None, text_node_cls,
                                    source_open_tag=token_source,
                                    error_message=_(u'Unknown tag name'))

        # SAX-like tree building algorithm
        elif token_type == TOKEN_DATA:

            # Append to the current node
            cur_tree_node.new_child(None, text_node_cls,
                                    content=token_source)

        elif token_type == TOKEN_NEWLINE:

            # Handle newline_closes option
            # Loop to handle the case when nested tag need to be closed at once
            while cur_tree_node.newline_closes and cur_tree_node.parent is not None:
                cur_tree_node = cur_tree_node.parent

            # Append to the current node
            cur_tree_node.new_child(None, newline_node_cls)

        elif token_type == TOKEN_OPEN_TAG:

            # Handle nesting depth limit
            if max_nesting_depth and cur_nesting_depth >= max_nesting_depth:

                # Tag cannot be open, fallback as erroneous text
                cur_tree_node.new_child(None, text_node_cls,
                                        source_open_tag=token_source,
                                        error_message=_(u'Nesting depth limit reached'))

                # End of processing for this tag
                continue

            # Load tag options
            tag_cls = recognized_tags[tag_name]

            # Handle same_tag_closes option
            if cur_tree_node.same_tag_closes \
                    and isinstance(cur_tree_node, tag_cls) \
                    and cur_tree_node.parent is not None:
                cur_tree_node = cur_tree_node.parent

            # Handle close_inlines
            if tag_cls.close_inlines:
                while cur_tree_node.inline and cur_tree_node.parent is not None:
                    cur_tree_node = cur_tree_node.parent

            # Create a new child node
            new_node = cur_tree_node.new_child(tag_name, tag_cls,
                                               attrs=tag_attrs,
                                               source_open_tag=token_source,
                                               **extra_cls_kwargs[tag_cls])

            # Jump to the new child node if not standalone
            if not tag_cls.standalone:
                cur_tree_node = new_node

                # Update nesting depth limit
                cur_nesting_depth += 1

        elif token_type == TOKEN_CLOSE_TAG:

            # Check if current node can be closed
            if cur_tree_node.parent is None or cur_tree_node.name != tag_name:

                # Look for the parent to close
                depth = 0
                cursor = cur_tree_node
                while cursor.parent is not None and (
                            (cursor.weak_parent_close and cursor.parent.name != tag_name) or cursor.parent.name == tag_name):
                    depth += 1
                    cursor = cursor.parent

                # Handle weak parent close option
                if cursor.name == tag_name:

                    # Close all traversal tree nodes
                    cur_tree_node = cursor

                    # Also close the parent node
                    cur_tree_node.source_close_tag = token_source
                    cur_tree_node = cur_tree_node.parent

                    # Update nesting depth limit
                    cur_nesting_depth -= depth

                else:

                    # Tag cannot be closed, fallback as erroneous text
                    cur_tree_node.new_child(None, text_node_cls,
                                            source_close_tag=token_source,
                                            error_message=_(u'Unexpected closing tag'))

            else:

                # Close the current tree node
                cur_tree_node.source_close_tag = token_source
                cur_tree_node = cur_tree_node.parent

                # Update nesting depth limit
                if cur_nesting_depth:
                    cur_nesting_depth -= 1

        elif token_type == TOKEN_SELF_CLOSE_TAG:

            # Load tag options
            tag_cls = recognized_tags[tag_name]

            # Detect erroneous self closing tag
            if not tag_cls.standalone:

                # Erroneous tag, fallback as erroneous text
                cur_tree_node.new_child(None, text_node_cls,
                                        source_open_tag=token_source,
                                        error_message=_(u'Unexpected self closing tag'))

            else:

                # Create a new child node
                cur_tree_node.new_child(tag_name, tag_cls,
                                        attrs=tag_attrs,
                                        source_open_tag=token_source,
                                        **extra_cls_kwargs[tag_cls])

    # Close all remaining weak nodes
    while cur_tree_node != root_tree_node and cur_tree_node.parent is not None and cur_tree_node.weak_parent_close:
        cur_tree_node = cur_tree_node.parent

    # Mark unclosed tags as erroneous
    if mark_unclosed_tags_as_erroneous:
        while cur_tree_node != root_tree_node and cur_tree_node.parent is not None:
            cur_tree_node.error_message = _(u'Unclosed tag')
            cur_tree_node = cur_tree_node.parent

    # Perform sanity check
    pre_process_tree(root_tree_node)
    sanitize_tree(root_tree_node)
    post_process_tree(root_tree_node)

    # Return the resulting AST
    return root_tree_node


def pre_process_tree(tree_node):
    u"""
    Recursive method for pre-processing the given tree node and children recursively.
    :param tree_node: The tree node to be pre-processed.
    """

    # Pre-process the node
    tree_node.pre_process_node()

    # Go down the tree
    for child_node in tree_node.children:
        pre_process_tree(child_node)


def sanitize_tree(tree_node, breadcrumb=None):
    u"""
    Recursive method for sanitizing the given tree node and children recursively.
    :param tree_node: The tree node to be sanitized.
    :param breadcrumb: The current breadcrumb of parent nodes (default to an empty list).
    :type breadcrumb: list or None
    """
    breadcrumb = breadcrumb or []

    # Down to top visit order (depth-first algorithm) with breadcrumb
    sub_breadcrumb = [] if tree_node.is_root else [tree_node]
    for child_node in tree_node.children:
        sanitize_tree(child_node, breadcrumb + sub_breadcrumb)

    # Sanitize the node
    tree_node.sanitize_node(breadcrumb)


def post_process_tree(tree_node):
    u"""
    Recursive method for post-processing the given tree node and children recursively.
    :param tree_node: The tree node to be post-processed.
    """

    # Post-process the node
    tree_node.post_process_node()

    # Go down the tree
    for child_node in tree_node.children:
        post_process_tree(child_node)

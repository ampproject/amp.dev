u"""
SkCode elements tree code.
"""

from __future__ import absolute_import
from html import escape as escape_html


class TreeNode(object):
    u"""
    Tree node container class.

    A tree node is made of:
    - a root node instance (used to store document-level information),
    - a parent node instance (or ``None`` for root node),
    - a name (``None`` for internal-use only nodes),
    - an attributes dictionary,
    - a raw content string (for raw text nodes),
    - a list child nodes,
    - the opening and closing tag source strings (for error displaying),
    - an error message (in case of error).

    The tree node class also contain all tag behavior options as static variables.
    """

    # ----- Node naming options

    # Canonical tag name (string, mandatory)
    canonical_tag_name = None

    # Alias tag names (tuple of strings, can be empty)
    alias_tag_names = ()

    # ----- Node parsing options

    # Set to ``True`` if a newline should automatically close this tag.
    # When enabling this option, be sure to enable ``same_tag_closes`` to
    # avoid problem with nested tags not closed by newline.
    newline_closes = False

    # Set to ``True`` if another opening tag of the same type should
    # automatically close this tag.
    # When enabling this option, be sure to enable ``weak_parent_close`` to
    # avoid problem with unclosed tag taking down the closing tag of his parent.
    same_tag_closes = False

    # Set to ``True`` if the parent closing tag should
    # automatically close this tag (if not already closed).
    weak_parent_close = False

    # Set to ``True`` if this tag does not have a closing tag.
    # When this option is enabled, the self closing tag format is
    # allowed for the given tag along with the open tag format.
    standalone = False

    # Set to ``True`` if children tags should be parsed inside this tag
    # Setting this to ``False`` will make the tag act like a DATA/CODE tag.
    parse_embedded = True

    # Set to ``True`` if this tag is an inline tag, or to ``False`` for a block tag.
    # If set, this tag will be merging into paragraphs by the ``make_paragraphs`` utility.
    inline = False

    # Set to ``True`` if this tag should close any unclosed inline tag.
    close_inlines = True

    # ----- Utilities options

    # Set to ``True`` if any inline children nodes of this tag should be merged into paragraphs.
    make_paragraphs_here = False

    # ----- Internal use variables

    is_root = False

    def __init__(self,
                 root_tree_node, parent, name,
                 attrs=None, content=u'', children=None,
                 source_open_tag=u'', source_close_tag=u'',
                 error_message=u'', **kwargs):
        u"""
        Create a new tree node instance.
        :param root_tree_node: The root tree node instance (mandatory). Use to store document-level data.
        N.B. Child nodes root tree node instance will be reset recursively to this root tree node instance to
        allow merging of two different tree.
        :param parent: The node parent instance (mandatory). Set to ``None`` for the root node.
        N.B. Use the ``RootTreeNode`` class for the root tree node.
        :param name: The node name (mandatory for non-internal use nodes).
        :param attrs: the node attributes dictionary (default to an empty dictionary).
        :param content: The node raw content (default to an empty string).
        :param children: The node children list (default to an empty list).
        N.B. Child nodes parent instance will be reset to this node instance.
        :param source_open_tag: The source text for the opening tag of this node (default to an empty string).
        :param source_close_tag: The source text for the closing tag of this node (default to an empty string).
        :param error_message: The error message, if any error need to be reported (default to an empty string).
        """
        assert root_tree_node, u"The root tree node instance is mandatory."
        if not self.is_root:
            assert parent, u"The parent node instance is mandatory for non-root nodes."

        # Store value as attributes
        self.root_tree_node = root_tree_node
        self.parent = parent
        self.name = name
        self.attrs = attrs or {}
        self.content = content
        self.children = children or []
        self.source_open_tag = source_open_tag
        self.source_close_tag = source_close_tag
        self.error_message = error_message

        # Allow class constants overload at object creation
        for key, value in kwargs.items():
            setattr(self, key, value)

        # Rebase children parent and root tree node
        for child in self.children:
            child.parent = self
        self.reset_root_tree_node(root_tree_node)

    def reset_root_tree_node(self, new_root_tree_node):
        u"""
        Reset the root tree node instance of this node and all child nodes recursively.
        :param new_root_tree_node: The new root tree node instance
        """
        self.root_tree_node = new_root_tree_node
        for child in self.children:
            child.reset_root_tree_node(new_root_tree_node)

    def new_child(self, name, node_cls, append=True, **kwargs):
        u"""
        Create a new child node from the given arguments.
        Auto set the parent attribute of the newly created child node to this node instance and append the child
        node to the children list of this node if ``append=True``.
        :param name: The tag name of the new tre node.
        :param node_cls: The class to be used to create the new tree node.
        :param append: If set to ``True``, the newly created child will be added to the node children list.
        :param kwargs: Keyword arguments for the tree node class constructor.
        :return: The newly created node instance.
        """
        new_child_node = node_cls(self.root_tree_node, self, name, **kwargs)
        if append:
            self.children.append(new_child_node)
        return new_child_node

    def get_raw_content(self, recursive=True):
        u"""
        Return the raw content of this node and of children nodes if ``recursive=True``.
        :param recursive: Set to ``True`` to include any child nodes content (default ``True``).
        :return The raw content of this node and of children nodes, if requested.
        """
        content = self.content
        if recursive:
            for child_node in self.children:
                content += child_node.get_raw_content()
        return content

    def get_attribute_value(self, *fields, **_3to2kwargs):
        if 'default' in _3to2kwargs: default = _3to2kwargs['default']; del _3to2kwargs['default']
        else: default = u''
        u"""
        Get the attribute value by looking at each given field names.
        Return the first non empty field value or the default value.
        Use an empty string as field name to indicate the node name.
        :param fields: The list of fields to look for value in lookup order.
        :param default: The default value to be returned.
        :return: The attribute value.
        """
        for field in fields:
            value = self.attrs.get(field if field else self.name)
            if value:
                return value
        return default

    def has_attribute_switch_set(self, attr_name, name_attr_value=None):
        u"""
        Check if the given attribute switch is set or not.
        The attribute switch is set of the attribute name is found in the attributes dictionary or
        if the node named attribute has the given value.
        :param attr_name: The attribute switch field name.
        :param name_attr_value: The attribute switch node named attribute value.
        :return: A bool ``True`` if the switch is set, ``False`` otherwise.
        """
        return attr_name in self.attrs or self.attrs.get(self.name, u'').lower() == name_attr_value

    def search_in_tree(self, node_cls):
        u"""
        Walk down the tree and yield any node matching the given class.
        :param node_cls: The class type to search for (or a tuple of class types).
        """

        # Check the current tree node first
        if isinstance(self, node_cls):
            yield self

        # Check all children nodes
        for child in self.children:
            for subchild in child.search_in_tree(node_cls):
                yield subchild

    def has_errors(self):
        u"""
        Walk down the tree and return ``True`` only if at least one node is erroneous.
        """
        if self.error_message:
            return True
        for child in self.children:
            if child.has_errors():
                return True
        return False

    def pre_process_node(self):
        u"""
        Callback function for pre-processing the given node. Allow registration of IDs, references, etc.
        This function is called in a top-to-down visit order, starting from the root node and going down to each
        leaf node.
        """

    def sanitize_node(self, breadcrumb):
        u"""
        Callback function for sanitizing and cleaning-up the given node.
        This function must validate it's own state and direct children type / ordering.
        This function is called in a down-to-top visit order (depth-first algorithm), starting from the last
        node of each branch and going up to the root node. This allow unwrapping of the current node
        in the parent node children list because the parent children list is checked AFTER all his children.
        In worst case scenario, an erroneous node can be unwrap up to the root node level.
        :param breadcrumb: The breadcrumb of node instances from the root node to the current node (excluded).
        """
        # TODO implement default behavior
        # Default policy:
        # - inline accept only other inline
        # - allowed_parent_type option
        # - allow_same_type_nested option
        # - add tag_categories
        # - white list category
        # - blacklist category
        pass

    def post_process_node(self):
        u"""
        Callback function for post-processing the given node. Allow generation of summary, etc.
        This function is called in a top-to-down visit order, starting from the root node and going down to each
        leaf node.
        """

    def render_html(self, inner_html, **kwargs):
        u"""
        Callback function for rendering HTML.
        :param inner_html: The inner HTML of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered HTML of this node.
        """
        raise NotImplementedError(u'render_html() need to be implemented in subclass')

    def render_error_html(self, inner_html, html_error_template, **kwargs):
        u"""
        Callback function for rendering HTML when the node is erroneous.
        :param inner_html: The inner HTML of this tree node.
        :param html_error_template: The HTML template for rendering the erroneous parts of the output.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered HTML of this node.
        """
        output_html = []
        if self.source_open_tag:
            output_html.append(html_error_template.format(error_message=self.error_message,
                                                          source=escape_html(self.source_open_tag)))

        inner_content = inner_html or escape_html(self.get_raw_content())
        if inner_content:
            output_html.append(inner_content)

        if self.source_close_tag:
            output_html.append(html_error_template.format(error_message=self.error_message,
                                                          source=escape_html(self.source_close_tag)))

        return u'\n'.join(output_html)

    def render_text(self, inner_text, **kwargs):
        u"""
        Callback function for rendering text.
        :param inner_text: The inner text of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered text of this node.
        """
        raise NotImplementedError(u'render_text() need to be implemented in subclass')

    def render_error_text(self, inner_text, **kwargs):
        u"""
        Callback function for rendering text when the node is erroneous.
        :param inner_text: The inner text of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered HTML of this node.
        """
        output_html = []
        if self.source_open_tag:
            output_html.append(self.source_open_tag)

        inner_content = inner_text or self.get_raw_content()
        if inner_content:
            output_html.append(inner_content)

        if self.source_close_tag:
            output_html.append(self.source_close_tag)

        return u''.join(output_html)


class RootTreeNode(TreeNode):
    u"""
    Root tree node container class.
    Subclass of the ``TreeNode`` class which set ``parent=None``.
    This class is special, unwrap and delete operations are not supported.
    Attributes dictionary is not used for rendering, but instead, as a document-level data container.
    """

    make_paragraphs_here = True

    is_root = True

    def __init__(self, attrs=None, children=None, **kwargs):
        u"""
        Create a new root tree node.
        :param attrs: The root node attributes dictionary (default to an empty dictionary).
        :param children: The root node children list (default to an empty list).
        """
        self.known_ids = set()
        super(RootTreeNode, self).__init__(self, None, None, attrs=attrs, children=children, **kwargs)

    def render_html(self, inner_html, **kwargs):
        u"""
        Callback function for rendering HTML.
        :param inner_html: The inner HTML of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered HTML of this node.
        """
        return inner_html

    def render_text(self, inner_text, **kwargs):
        u"""
        Callback function for rendering text.
        :param inner_text: The inner text of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered text of this node.
        """
        return inner_text

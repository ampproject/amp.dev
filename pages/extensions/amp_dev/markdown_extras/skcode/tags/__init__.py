u"""
SkCode tag definitions code.
"""

# Import all tag definitions here
from __future__ import absolute_import
from .internal import (
    TextTreeNode,
    NewlineTreeNode,
    HardNewlineTreeNode
)


def build_recognized_tags_dict(tag_class_list):
    u"""
    Turn a list of tag node classes into a dictionary of tag names and corresponding node class.
    :param tag_class_list: The list of tag node classes for all supported tags.
    :return: A dictionary ``{tag_name: class}`` with all tag name and alias registered as key.
    """
    recognized_tags_dict = {}

    # For each tag declaration
    for tag_class in tag_class_list:

        # Sanity checks
        if type(tag_class) is not type:
            raise ValueError(u'{} is an instance, not a class type'.format(tag_class.__class__.__name__))
        if not tag_class.canonical_tag_name:
            raise ValueError(u'{} does not have a canonical name'.format(tag_class.__name__))

        # Register the canonical tag name
        if tag_class.canonical_tag_name in recognized_tags_dict:
            raise KeyError(u'Tag name "{}" is already registered'.format(tag_class.canonical_tag_name))
        recognized_tags_dict[tag_class.canonical_tag_name] = tag_class

        # Register all aliases
        for alias_name in tag_class.alias_tag_names:
            if alias_name in recognized_tags_dict:
                raise KeyError(u'Alias name "{}" is already registered'.format(alias_name))
            recognized_tags_dict[alias_name] = tag_class

    # Return the dict
    return recognized_tags_dict

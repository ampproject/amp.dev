# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import re

FILTER_TRIGGER = '[filter'
FILTER_TAG_PATTERN = re.compile(r'\[filter .*?\](?!\()', re.MULTILINE)
ATTRIBUTE_PATTERN = re.compile(r'(\w+)=(?:\"|\')(.*?)(?:\"|\')')
FILTER_END_TAG_PATTERN = '[/filter]'

DEFAULT_FORMATS = 'websites, ads, stories, email'
DEFAULT_LEVEL = 'beginner, advanced'

def trigger(original_body, content):
  if FILTER_TRIGGER in original_body:
    return _transform(content)
  return content

def _transform(content):
    for match in FILTER_TAG_PATTERN.findall(content):
        #Match attribures from filter tag
        attributes = _get_attributes(match)

        #prepare replacement
        replacement = '{% call filter(formats=\'' + attributes['formats'] + '\' , level=\'' + attributes['level'] + '\') %}\n'

        # Then also replace end tags
        content = content.replace(FILTER_END_TAG_PATTERN, '\n{% endcall %}')

        content = content.replace(match, replacement)

    return content

def _get_attributes(match):
    matches = ATTRIBUTE_PATTERN.findall(match)
    # Set reasonable defaults
    attributes = {
    'formats': DEFAULT_FORMATS,
    'level': DEFAULT_LEVEL
    }
    for match in matches:
        attributes[match[0]] = match[1]
    return attributes

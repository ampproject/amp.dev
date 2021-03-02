# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import re

VIDEO_TRIGGER = '[video'
VIDEO_TAG_PATTERN = re.compile(r'\[video .*\](?!\()', re.MULTILINE)
ATTRIBUTE_PATTERN = re.compile(r'(\w+)=(?:\"|\')(.*?)(?:\"|\')')

PARTIAL_PATH = '/views/partials/video.j2'


def trigger(original_body, content):
    if VIDEO_TRIGGER in original_body:
        return _transform(content)
    return content


def _transform(content):
    for match in VIDEO_TAG_PATTERN.findall(content):
        # Match attributes from video tag
        attributes = _get_attributes(match)

        # Prepare replacement
        replacement = '{% with %}\n'
        if 'youtube' in attributes['src']:
            replacement += '{% set youtube_id = \'' + re.search(
                r'v=(\w*)', attributes['src']).group(1) + '\' %}\n'

        # Add in other variables
        for name, value in attributes.items():
            if isinstance(value, str):
                replacement += '{% set ' + name + ' = \'' + value + '\' %}\n'
            else:
                value = str(value)
                replacement += '{% set ' + name + ' = ' + value + ' %}\n'
        replacement += '{% include \'' + PARTIAL_PATH + '\' %}\n'
        replacement += '{% endwith %}\n'

        content = content.replace(match, replacement)

    # Video is a self closing tag, no need to close
    return content


def _get_attributes(match):
    matches = ATTRIBUTE_PATTERN.findall(match)
    # Set reasonable defaults
    attributes = {
        'type': None,
        'src': '',
        'width': 16,
        'height': 9,
        'poster': None,
        'autoplay': False,
        'loop': False,
        'muted': False,
    }
    for match in matches:
        attributes[match[0]] = match[1]
    return attributes

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import re

EXAMPLES_LIST_TRIGGER = '[examples_list'
EXAMPLES_LIST_TAG_PATTERN = re.compile(r'\[examples_list.*\](?!\()', re.MULTILINE)

PARTIAL_PATH = '/views/partials/component-examples-list.j2'


def trigger(original_body, content):
    if EXAMPLES_LIST_TRIGGER in original_body:
        return _transform(content)
    return content


def _transform(content):
    for match in EXAMPLES_LIST_TAG_PATTERN.findall(content):

        replacement = '{% include \'' + PARTIAL_PATH + '\' %}\n'

        content = content.replace(match, replacement)

    return content

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import re

TIP_TRIGGER = '[tip'
TIP_START_TAG_PATTERN = re.compile(r'(\[tip( type=\"(.*?)\")?\])',
                                   re.MULTILINE)
TIP_END_TAG_PATTERN = '[/tip]'
ALLOWED_TYPES = ['default', 'important', 'read-on']

def trigger(original_body, content):
    if TIP_TRIGGER in original_body:
        return _transform(content)
    return content


def _transform(content):
    for match in TIP_START_TAG_PATTERN.findall(content):
        # For tips without a type
        if not match[1]:
            content = content.replace(
                match[0],
                '{% call tip(\'\', type=\'note\') %}')
        if match[2]:
            type = 'default' if not match[2] in ALLOWED_TYPES else match[2]
            content = content.replace(match[0], '{% call tip(\'\', type=\'' + type + '\') %}')
    # Then also replace end tags
    content = content.replace(TIP_END_TAG_PATTERN, '{% endcall %}')
    return content

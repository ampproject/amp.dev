# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import re

FILTER_TRIGGER = '[filter'
FILTER_START_TAG_PATTERN = re.compile(r'(\[filter( formats=(?:\"|\')(.*?)(?:\"|\'))?\])',
                                   re.MULTILINE)
FILTER_END_TAG_PATTERN = '[/filter]'

DEFAULT_FORMATS = ['websites', 'ads', 'stories', 'email']

def trigger(original_body, content):
  if FILTER_TRIGGER in original_body:
    return _transform(content)
  return content


def _transform(content):
  for match in FILTER_START_TAG_PATTERN.findall(content):
    formats = match[2] or DEFAULT_FORMATS
    content = content.replace(match[0], '{% call filter(formats=\'' + match[2] + '\') %}\n')
  # Then also replace end tags
  content = content.replace(FILTER_END_TAG_PATTERN, '\n{% endcall %}')
  return content

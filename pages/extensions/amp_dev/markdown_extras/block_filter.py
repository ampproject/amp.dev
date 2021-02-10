# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
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
        content = content.replace(FILTER_END_TAG_PATTERN, '\n<!-- filter -->{% endcall %}')

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

FILTERED_SECTION_PATTERN = re.compile(r'({% call filter\(.*?\) %})(.*?)(<!-- filter -->{% endcall %})', re.MULTILINE | re.DOTALL)
HEADLINE_PATTERN = re.compile(r'^#+ (.*)', re.MULTILINE)

def filter_toc(doc, content=''):
  filtered_sections = FILTERED_SECTION_PATTERN.findall(content)

  def filter(toc):
    # Check if any of the headlines is in a filtered section and if so
    # then also filter it in the TOC
    for section in filtered_sections:
      section_content = section[1]

      headlines = HEADLINE_PATTERN.findall(section_content)
      for headline in headlines:
        # The TOC will be stripped from all Markdown tags. Assume the only
        # ones used are backticks and replace them. Additionally prepare
        # the string for use in the regular expression
        headline = headline.replace('`', '')

        # As jinja2 has already run when the TOC is printed SSR statements
        # have to be handcrafted here
        filter_tags = _get_ssr_filter_tags(_get_attributes(section[0]))
        filtered_headline = filter_tags[0] + r'\1' + headline + r'\2' + filter_tags[1]
        toc = re.sub(r'(<a .*?>)' + re.escape(headline) + '(</a>)', filtered_headline, toc)
    return toc

  return filter

def _get_ssr_filter_tags(attributes):
  levels = attributes.get('levels', DEFAULT_LEVEL).replace(' ', '').split(',')
  formats = attributes.get('formats', DEFAULT_FORMATS).replace(' ', '').split(',')

  return (
    '[% if format in ' + json.dumps(formats, ensure_ascii=False) + ' and level in ' + json.dumps(levels, ensure_ascii=False) + ' %]',
    '[% endif %]'
    )

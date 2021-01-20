# -*- coding: utf-8 -*-
import json
import os
import re

from grow.documents.document import Document
from grow.pods.pods import Pod

FIRST_SENTENCE_PATTERN = re.compile(
    # We also match markup [tag]...[/tag] blocks to skip them
    r'^\[(\w+)(?:[:\s][^\]]+)\].*?\[/\1\]|(^\w[^!?.\n]*(?:\n\w[^!?.\n]*)*(?:\.|!|\?|$))',
    re.MULTILINE | re.DOTALL | re.UNICODE)

# To remove HTML blocks that are not content like headlines or sourcecode blocks
# <pre> is used for source blocks, while <code> is used for inline blocks (which we do not remove)
UNWANTED_HTML_BLOCKS_PATTERN = re.compile(r'<(h\d|pre)(?:\s[^>]+)*>.*?</\1>', re.DOTALL)

# To remove all comments (with anything inside) and all tags
HTML_TAG_PATTERN = re.compile(r'<!--.*?-->|<[^>]*>', re.DOTALL)

class PageInfoCollector(object):
  def __init__(self, pod, input_file, output_folder):
    """
    :type pod: Pod
    :type input_file: str
    :type output_folder: str
    """
    self.pod = pod

    this_dir = os.path.dirname(os.path.abspath(__file__))
    self.input_file = os.path.normpath(os.path.join(this_dir, '../../../' + input_file))
    self.output_folder = os.path.normpath(os.path.join(this_dir, '../../../' + output_folder))

  def run(self):
    self.pod.logger.info('Will extract page infos for highlight list {}'.format(self.input_file))

    if not os.path.exists(self.output_folder):
      os.makedirs(self.output_folder)

    locale_map = self.load_input()
    for locale in self.pod.list_locales():
      category_map = locale_map.get(str(locale)) or locale_map.get('default')
      locale_date = self.generate_locale(locale, category_map)
      self.write_locale_data(locale, locale_date)

    self.pod.logger.info('Page infos for highlight list {} written for all locales into {}'
                         .format(self.input_file, self.output_folder))

  def load_input(self):
    with open(self.input_file) as f:
      return json.load(f)

  def generate_locale(self, locale, category_map):
    result = {}
    for category in category_map:
      page_infos = []
      for page_link in category_map.get(category):
        doc = self.pod.get_doc(page_link, locale.alias)

        if not doc.exists:
          raise Exception('Highlight "{}" defined in file {} does not exist. Maybe needs to be imported?'.format(page_link, self.input_file))

        description = PageInfoCollector.get_page_description(doc)
        title = doc.title

        if not title:
          raise Exception('Corrupt highlight "{}" defined in file {}'.format(page_link, self.input_file))

        page_info = {
          'title': title,
          'description': description,
          'url': doc.url.path
        }
        page_infos.append(page_info)

      result.update({category: page_infos})

    return result

  def write_locale_data(self, locale, locale_data):
    file_path = os.path.join(self.output_folder, '{}.json'.format(locale))
    with open(file_path, 'w') as fp:
      json.dump(locale_data, fp)

  @staticmethod
  def get_page_description(doc):
    """
    :type doc: Document
    """
    result = doc.fields.get('description')
    if not result:
      teaser = doc.fields.get('teaser')
      if teaser:
        result = teaser.get('text')
      if not result:
        result = ''
        for first_sentence_match in FIRST_SENTENCE_PATTERN.findall(
            PageInfoCollector.extract_plain_body(doc)):
          if first_sentence_match[1]:
            result = first_sentence_match[1]
            break
    return result

  @staticmethod
  def extract_plain_body(doc):
    result = doc.html
    result = UNWANTED_HTML_BLOCKS_PATTERN.sub('', result)
    result = HTML_TAG_PATTERN.sub('', result)
    return result

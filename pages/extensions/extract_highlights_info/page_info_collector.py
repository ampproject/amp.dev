# -*- coding: utf-8 -*-
import os
import json
from grow.pods.pods import Pod
from grow.documents.document import Document


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
    return result

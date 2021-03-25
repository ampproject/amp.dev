import re

from .amp_component_versions import get_component, get_components
from .constants import PREVIEW_MODES, PREVIEW_MODES_IN_IFRAME, PREVIEW_NONE, PREVIEW_INLINE


class ExampleDocument(object):

  def __init__(self, example_source, export_attributes, index):
    """
    :type example_source: str
    :type export_attributes: dict
    :type index: int
    """
    self.index = index

    self.head = self.get_tag_content(example_source, 'head')
    self.custom_style = None

    style_match = self.find_tag(self.head, 'style', 'amp-custom')
    if style_match:
      self.custom_style = style_match.group(1)
      self.head = self.head[:style_match.start(0)] + self.head[style_match.end(0):]

    self.body = self.get_tag_content(example_source, 'body')
    if self.body is None:
      self.body = example_source

    self.imports = get_components(export_attributes.get('imports'))
    self.template = get_component(export_attributes.get('template'))

    self.preview = export_attributes.get('preview', PREVIEW_NONE)
    if self.preview == PREVIEW_INLINE and (self.head or self.custom_style) \
      or self.preview not in PREVIEW_MODES:
      # no inline preview supported if head elements are present
      self.preview = PREVIEW_NONE

    self.orientation = export_attributes.get('orientation', '')

    self.playground = 'playground' not in export_attributes or export_attributes['playground'].lower() != 'false'

  @property
  def has_iframe_preview(self):
    return self.preview in PREVIEW_MODES_IN_IFRAME

  def has_amp_script(self):
    return self.has_tag_in_head('script', 'src', 'https://cdn\\.ampproject\\.org/v\\d+(?:\\.\\d+)*\\.js')

  def has_boilerplate(self):
    return self.has_tag_in_head('style', 'amp[\da-z]*-boilerplate')

  def has_import_in_head(self, dependency):
    if not self.head:
      return False
    regex = re.compile(r'<script(?:\s[^>]*)?\scustom-[a-z]+\s*=\s*"?{dependency}[\s">]'.format(dependency=dependency))
    return regex.search(self.head) is not None

  def has_tag_in_head(self, tag_name, attribute_name_re='', attribute_value_re=''):
    code_block = self.head
    return self.has_tag(code_block, tag_name, attribute_name_re, attribute_value_re)

  @staticmethod
  def has_tag(code_block, tag_name, attribute_name_re='', attribute_value_re=''):
    if not code_block:
      return False
    tag_re = r'<' + tag_name + r'(?:\s[^>]*?)?'
    if attribute_name_re:
      tag_re = tag_re + r'\s+' + attribute_name_re
      if attribute_value_re:
        tag_re = tag_re + r'\s*=\s*(["\'])?' + attribute_value_re + r'\1'
      else:
        tag_re = tag_re + r'(?:\s*=\s*[^>]*?)?'
      tag_re = tag_re + r'(?:\s[^>]*?)?'
    tag_re = tag_re + r'/?>'
    return re.compile(tag_re, re.IGNORECASE).search(code_block) is not None

  @staticmethod
  def get_tag_content(html_code, tag, attribute=''):
    match = ExampleDocument.find_tag(html_code, tag, attribute)
    if match:
      return match.group(1)
    return None

  @staticmethod
  def find_tag(html_code, tag, attribute=''):
    match = None
    if html_code:
      optional_tag_attribute = r'(?:\s[^>]*)?'
      tag_pattern = '<' + tag
      if attribute:
        tag_pattern = tag_pattern + optional_tag_attribute + attribute
      tag_pattern = tag_pattern + optional_tag_attribute + r'>(.*?)<\s*/\s*' + tag + r'\s*>'
      match = re.search(tag_pattern, html_code, re.DOTALL | re.IGNORECASE)
    return match

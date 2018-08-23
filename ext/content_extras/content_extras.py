#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""Content extras extension for preprocessing content to add extra features Grow sites."""

from __future__ import unicode_literals
import re
from grow import extensions
from grow.extensions import hooks
from grow.documents import document


class ContentExtrasPreRenderHook(hooks.PreRenderHook):
  """Handle the pre-render hook."""

  EXTRA_TRIGGER_REGEX = re.compile(
      r'^(Note|Tip|Tips|Learn more|Leer Más|Important|Caution|Warning|Precaución|Perhatian|Más información|Importante|Pelajari lebih lanjut|Penting|詳細|重要|자세히 알아보기|중요|Saiba mais|了解详情|重要提示|Catatan|注|참고|Observação|备注|Nota|Baca lebih lanjut|参照|읽어보기|Leia mais|阅读|Read on|ヒント|도움말|Dica|提示|노트|詳細情報|继续阅读|注意|Más artículos|Continue lendo|其他资料|Watch|Remember|Ingat|メモ|주의사항|팁|Lembre\-se|Consejo|Baca juga|参考情報|주의|Cuidado):[ ]?', re.IGNORECASE | re.MULTILINE)

  def should_trigger(self, previous_result, doc, original_body, *_args, **_kwargs):
    """Should the hook trigger with current document?"""

    if isinstance(doc, document.Document) and doc.view.endswith('.html') and original_body:
      results = self.EXTRA_TRIGGER_REGEX.search(original_body)
      if results:
        return True
    return False

  def trigger(self, previous_result, doc, original_body, *_args, **_kwargs):
    """Execute pre-render modification."""
    content = previous_result if previous_result else original_body
    new_content = []

    in_block = False

    for line in content.splitlines():
      if in_block:
        # Check for an empty line to end the block.
        if not line.strip():
          in_block = False
          new_content.append('{% endcall %}')
          new_content.append('')
        else:
          new_content.append(line)
      else:
        result = self.EXTRA_TRIGGER_REGEX.search(line)
        if result:
          name = result.group(1)
          type = name

          # special handling for certain types of notes
          if name == 'Tip':
            type = 'success'
          if name == 'Tips':
            type = 'success'
          if name == 'ヒント':
            type = 'success'
          if name == '도움말':
            type = 'success'
          if name == 'Dica':
            type = 'success'
          if name == '提示':
            type = 'success'
          if name == 'Más artículos':
            type = 'success'
          if name == 'Continue lendo':
            type = 'success'
          if name == '其他资料':
            type = 'success'
          if name == '팁':
            type = 'success'
          if name == 'Consejo':
            type = 'success'

          if name == 'Learn more':
            type = 'read'
          if name == 'Read on':
            type = 'read'
          if name == 'Leer Más':
            type = 'read'
          if name == 'Leer más':
            type = 'read'
          if name == 'Más información':
            type = 'read'
          if name == 'Pelajari lebih lanjut':
            type = 'read'
          if name == '詳細':
            type = 'read'
          if name == '자세히 알아보기':
            type = 'read'
          if name == '읽어보기':
            type = 'read'
          if name == 'Saiba mais':
            type = 'read'
          if name == 'Leia mais':
            type = 'read'
          if name == '了解详情':
            type = 'read'
          if name == 'Baca lebih lanjut':
            type = 'read'
          if name == '参照':
            type = 'read'
          if name == '阅读':
            type = 'read'
          if name == '詳細情報':
            type = 'read'
          if name == '继续阅读':
            type = 'read'
          if name == 'Watch':
            type = 'read'
          if name == 'Baca juga':
            type = 'read'
          if name == '参考情報':
            type = 'read'

          if name == 'Important':
            type = 'caution'
          if name == 'Warning':
            type = 'caution'
          if name == 'Importante':
            type = 'caution'
          if name == 'Penting':
            type = 'caution'
          if name == '重要':
            type = 'caution'
          if name == '중요':
            type = 'caution'
          if name == '重要提示':
            type = 'caution'
          if name == 'Remember':
            type = 'caution'
          if name == 'Ingat':
            type = 'caution'
          if name == '주의':
            type = 'caution'
          if name == '주의사항':
            type = 'caution'
          if name == 'Lembre-se':
            type = 'caution'
          if name == 'Precaución':
            type = 'caution'
          if name == 'Perhatian':
            type = 'caution'
          if name == 'Cuidado':
            type = 'caution'

          if name == 'Catatan':
            type = 'note'
          if name == '注':
            type = 'note'
          if name == '注意':
            type = 'note'
          if name == '참고':
            type = 'note'
          if name == '노트':
            type = 'note'
          if name == 'Observação':
            type = 'note'
          if name == '备注':
            type = 'note'
          if name == 'Nota':
            type = 'note'
          if name == 'メモ':
            type = 'note'

          new_content.append('{{% call callout(\'{name}\', type=\'{type}\') %}}'.format(
              name=name, type=type.lower()))
          new_content.append(self.EXTRA_TRIGGER_REGEX.sub('', line))
          in_block = True
        else:
          new_content.append(line)

    if in_block:
      new_content.append('{% endcall %}')
      new_content.append('')

    return '\n'.join(new_content)


class ContentExtrasExtension(extensions.BaseExtension):
  """Example Extension."""

  @property
  def available_hooks(self):
    """Returns the available hook classes."""
    return [ContentExtrasPreRenderHook]

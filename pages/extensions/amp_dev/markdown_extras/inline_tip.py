# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import re

EXTRA_TRIGGER_REGEX = re.compile(
      r'^(Note|Tip|Tips|Learn more|Leer Más|Important|Caution|Warning|Precaución|Perhatian|Más información|Importante|Pelajari lebih lanjut|Penting|詳細|重要|자세히 알아보기|중요|Saiba mais|了解详情|重要提示|Catatan|注|참고|Observação|备注|Nota|Baca lebih lanjut|参照|읽어보기|Leia mais|阅读|Read on|ヒント|도움말|Dica|提示|노트|詳細情報|继续阅读|注意|Más artículos|Continue lendo|其他资料|Watch|Remember|Ingat|メモ|주의사항|팁|Lembre\-se|Consejo|Baca juga|参考情報|주의|Cuidado):[ ]?', re.IGNORECASE | re.MULTILINE)

SUCCESS_KEYWORDS = ['Tip', 'Tips', 'ヒント', '도움말', 'Dica', '提示', 'Más artículos', 'Continue lendo', '其他资料', '팁', 'Consejo']

READ_ON_KEYWORDS = ['Learn more', 'Read on', 'Leer Más', 'Leer más', 'Más información', 'Pelajari lebih lanjut', '詳細', '자세히 알아보기', '읽어보기', 'Saiba mais', 'Leia mais', '了解详情', 'Baca lebih lanjut', '参照', '阅读', '詳細情報', '继续阅读', 'Watch', 'Baca juga', '参考情報']

IMPORTANT_KEYWORDS = ['Important', 'Warning', 'Importante', 'Penting', '重要', '중요', '重要提示', 'Remember', 'Ingat', '주의', '주의사항', 'Lembre-se', 'Precaución', 'Perhatian', 'Cuidado']

NOTE_KEYWORDS = ['Note', 'Catatan', '注', '注意', '참고', '노트', 'Observação', '备注', 'Nota', 'メモ']

def trigger(original_body, content):
  results = EXTRA_TRIGGER_REGEX.search(original_body)
  if results:
    return _transform(content)
  return content

def _transform(content):
  transformed_content = []
  in_block = False

  for line in content.splitlines():
    if in_block:
      # Check for an empty line to end the block.
      if not line.strip():
        in_block = False
        transformed_content.append('{% endcall %}')
        transformed_content.append('')
      else:
        transformed_content.append(line)
    else:
      result = EXTRA_TRIGGER_REGEX.search(line)
      if result:
        name = result.group(1)
        type = name

        if name in READ_ON_KEYWORDS:
          type = 'read-on'
        elif name in IMPORTANT_KEYWORDS:
          type = 'important'
        # If no fallback type is wanted, check for in NOTE_KEYWORDS
        else:
          type = 'default'

        transformed_content.append('{{% call tip(\'{name}\', type=\'{type}\') %}}'.format(
            name=name, type=type.lower()))
        transformed_content.append(EXTRA_TRIGGER_REGEX.sub('', line))
        in_block = True
      else:
        transformed_content.append(line)
  # It might be that the last element on the page is a tip, then it needs to be
  # closed as well even if there is no next line in the loop
  if in_block:
    transformed_content.append('{% endcall %}')
    transformed_content.append('')

  return '\n'.join(transformed_content)

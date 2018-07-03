"""Content extras extension for preprocessing content to add extra features Grow sites."""

import re
from grow import extensions
from grow.extensions import hooks
from grow.documents import document


class ContentExtrasPreRenderHook(hooks.PreRenderHook):
  """Handle the pre-render hook."""

  EXTRA_TRIGGER_REGEX = re.compile(
      r'^(Note|Tip):[ ]?', re.IGNORECASE | re.MULTILINE)

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
          type = result.group(1)
          new_content.append('{{% call callout(\'{name}\', type=\'{type}\') %}}'.format(
              name=type, type=type.lower()))
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

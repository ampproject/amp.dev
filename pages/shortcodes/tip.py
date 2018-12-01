from shortcodes import Shortcode

ALLOWED_TYPES = ['default', 'important', 'note', 'read-on']

class TipShortcode(Shortcode):
  name = 'tip'
  prerender_markdown = True
  template = 'views/partials/tip.j2'

  def _get_type(self, options):
      type = options.get('type', None)
      if type not in ALLOWED_TYPES:
          type = ALLOWED_TYPES[0]
      return type

  def transform(self, value, options):
      self.context['type'] = self._get_type(options)

      return value

shortcode = TipShortcode

from shortcodes import Shortcode

ALLOWED_TYPES = ['read-on', 'important', 'note']

class TipShortcode(Shortcode):
  name = 'tip'
  prerender_markdown = True
  template = 'partials/tip.j2'

  def transform(self, value, options):
    # Only the first option key might define the type
    options = options.items()
    try:
      type = options[0][0]
    except IndexError as error:
      type = None

    if type not in ALLOWED_TYPES:
      type = 'default'

    self.context['type'] = type

    return value

shortcode = TipShortcode

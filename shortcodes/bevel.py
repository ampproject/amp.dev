from shortcodes import Shortcode

# Allowed values for position options
ALLOWED_POSITION = ['right', 'left']

class BevelShortcode(Shortcode):
    name = 'bevel'
    same_tag_closes = True
    standalone = True
    render_empty = True
    template = 'partials/bevel.j2'

    def _get_position(self, options):
        position = options.get('position', None)
        if position not in ALLOWED_POSITION:
            position = ALLOWED_POSITION[0]
        return position

    def transform(self, value, options):
        self.context['position'] = self._get_position(options)

        return value

shortcode = BevelShortcode

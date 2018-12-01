from xml.dom import minidom

from shortcodes import Shortcode

# Used to pluck out the destination switch to put it in between headlines

# Allowed values for color options
ALLOWED_BACKGROUND_COLORS = ['dark-blue', 'light-blue', 'orange', 'purple', 'green',]

class StageShortcode(Shortcode):
    name = 'stage'
    render_empty = True
    prerender_markdown = True
    template = 'views/partials/stage.j2'

    # If stage includes a subheadline, retrieve and return it
    def _get_sub_headline(self, dom):
        sub_headline = dom.getElementsByTagName('h2')

        if len(sub_headline):
            return sub_headline[0].childNodes[0].nodeValue

        return ''

    # if stage includes a headline, retrieve and return it #
    def _get_headline(self, dom):
        headline = dom.getElementsByTagName('h1')

        if len(headline):
            return headline[0].childNodes[0].nodeValue

        return ''

    def _get_background_color(self, options):
        background_color = options.get('color', None)
        if background_color not in ALLOWED_BACKGROUND_COLORS:
            background_color = ALLOWED_BACKGROUND_COLORS[0]
        return background_color

    def _get_button(self, dom):
        # Destinations will be inside a list - so only elements outside
        # the list should taken into consideration as button
        anchor = dom.getElementsByTagName('a:last-of-type')
        if len(anchor):
          return {
            'link': anchor[0].getAttribute('href'),
            'text': anchor[0].childNodes[0].nodeValue
          }
        else:
          return {}

    def transform(self, value, options):
        dom = minidom.parseString('<html>{}</html>'.format(value))

        self.context['sub_headline'] = self._get_sub_headline(dom)
        self.context['headline'] = self._get_headline(dom)

        # Only try to get button after destination switch has been plucked
        # out as it also contains links that might interfer
        self.context['button'] = self._get_button(dom)

        self.context['background_color'] = self._get_background_color(options)

        return value


shortcode = StageShortcode

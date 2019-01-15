from xml.dom import minidom

from shortcodes import Shortcode

# Used to pluck out the destination switch to put it in between headlines

# Allowed values for format options
ALLOWED_FORMATS = ['default', 'websites', 'stories', 'ads', 'emails',]

class StageShortcode(Shortcode):
    name = 'stage'
    render_empty = True
    prerender_markdown = True
    template = 'views/partials/stage.j2'

    # If stage includes a subline, retrieve and return it
    def _get_subline(self, dom):
        subline = dom.getElementsByTagName('h2')

        if len(subline):
            return subline[0].childNodes[0].nodeValue

        return ''

    # if stage includes a headline, retrieve and return it #
    def _get_headline(self, dom):
        headline = dom.getElementsByTagName('h1')

        if len(headline):
            return headline[0].childNodes[0].nodeValue

        return ''

    def _get_format(self, options):
        format = options.get('format', None)
        if format not in ALLOWED_FORMATS:
            format = ALLOWED_FORMATS[0]
        return format

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

    def _get_icon(self, options):
        icon = options.get('icon')

        if icon:
          icon = icon
        else:
          icon = {}

        return icon

    def transform(self, value, options):
        dom = minidom.parseString('<html>{}</html>'.format(value))

        self.context['subline'] = self._get_subline(dom)
        self.context['headline'] = self._get_headline(dom)

        # Only try to get button after destination switch has been plucked
        # out as it also contains links that might interfer
        self.context['button'] = self._get_button(dom)

        self.context['format'] = self._get_format(options)

        self.context['icon'] = self._get_icon(options)

        return value


shortcode = StageShortcode

import lxml.html
from shortcodes import Shortcode

# Used to pluck out the destination switch to put it in between headlines
DESTINATION_SWITCH_CLASSNAME = '.ad-m-destination-switch'

# Allowed values for color options
ALLOWED_BACKGROUND_COLORS = ['dark-blue', 'light-blue', 'orange', 'purple', 'green',]

class StageShortcode(Shortcode):
    name = 'stage'
    render_empty = True
    prerender_markdown = True
    template = 'partials/stage.j2'

    # If stage includes a subheadline, retrieve and return it
    def _get_sub_headline(self, dom):
        sub_headline = dom.cssselect('h2')
        if len(sub_headline):
            return sub_headline[0].text_content()
        return ''

    # if stage includes a headline, retrieve and return it #
    def _get_headline(self, dom):
        headline = dom.cssselect('h1')

        # Some stages inline the destination-switch between two headlines,
        # check if there is more than one headline
        if len(headline) == 2:
            self.context['headline_part_two'] = headline[1].text_content()
            return headline[0].text_content()

        elif len(headline) == 1:
            # Reset headlineTwo to empty string
            self.context['headline_part_two'] = ''
            return headline[0].text_content()

        # If no headline given, reset headlineTwo if necessary and return nothing
        else:
            self.context['headline_part_two'] = ''
            return ''

        return ''

    def _get_destination_switch(self, dom):
        destination_switch = dom.cssselect(DESTINATION_SWITCH_CLASSNAME)
        if len(destination_switch):
            html = lxml.etree.tostring(destination_switch[0])
            # Also remove destination switch from dom to easily pluck out
            # a CTA if there is one
            destination_switch[0].clear()
            return html
        return None

    def _get_background_color(self, options):
        background_color = options.get('color', None)
        if background_color not in ALLOWED_BACKGROUND_COLORS:
            background_color = ALLOWED_BACKGROUND_COLORS[0]
        return background_color

    def _get_button(self, dom):
        # Destinations will be inside a list - so only elements outside
        # the list should taken into consideration as button
        anchor = dom.cssselect('a:last-of-type')
        if len(anchor):
          return {
            'link': anchor[0].attrib.get('href'),
            'text': anchor[0].text_content()
          }
        else:
          return {}

    def _get_image(self, dom):
        image = dom.cssselect('amp-img')
        if len(image):
          html = lxml.etree.tostring(image[0])

          return html

        return None

    def transform(self, value, options):
        dom = lxml.html.fromstring('<html>{}</html>'.format(value))

        self.context['sub_headline'] = self._get_sub_headline(dom)
        self.context['headline'] = self._get_headline(dom)
        self.context['destination_switch'] = self._get_destination_switch(dom)
        self.context['image'] = self._get_image(dom)

        # Only try to get button after destination switch has been plucked
        # out as it also contains links that might interfer
        self.context['button'] = self._get_button(dom)

        self.context['background_color'] = self._get_background_color(options)

        return value


shortcode = StageShortcode

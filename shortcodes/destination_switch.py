from xml.dom import minidom

from shortcodes import Shortcode

# Used as a fallback to if no destinations are maintained
DEFAULT_DESTINATIONS = ['websites', 'stories', 'ads', 'e-mails']

# To make sure that the template always gets a valid type
ALLOWED_SWITCH_TYPES = ['rolling', 'dropdown', 'selected']


class DestinationSwitchShortcode(Shortcode):
    name = 'destination-switch'
    render_empty = True
    prerender_markdown = True
    template = 'partials/destination-switch.j2'

    def _get_switch_type(self, options):
        # Switch type might be defined by shortcode option otherwise fallback
        switch_type = options.get('type', None)
        if switch_type not in ALLOWED_SWITCH_TYPES:
            switch_type = ALLOWED_SWITCH_TYPES[0]

        return switch_type

    def _get_destinations(self, dom):
        destinations = []

        # If links are given, get links and their destinations
        links = dom.getElementsByTagName('a')
        if len(links):
            for link in links:
                destinations.append({
                  'link': link.getAttribute('href'),
                  'text': link.childNodes[0].nodeValue,
                })
        else:
            # If no links are provided, return default destinations
            for destination in DEFAULT_DESTINATIONS:
                destination = {
                    'link': '#',
                    'text': destination,
                }
                destinations.append(destination)
        return destinations

    def _get_selected_destination(self, options):
        return options.get('selected', None)

    def transform(self, value, options):
        dom = minidom.parseString('<html>{}</html>'.format(value))

        self.context['switch_type'] = self._get_switch_type(options)
        self.context['selected'] = self._get_selected_destination(options)
        self.context['destinations'] = self._get_destinations(dom)

        return value


shortcode = DestinationSwitchShortcode

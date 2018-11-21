from xml.dom import minidom
from shortcodes import Shortcode

class FilterBubbleShortcode(Shortcode):
    name = 'filter-bubbles'
    prerender_markdown = True
    template = 'partials/filter-bubbles.j2'

    def transform(self, value, options):
        dom = minidom.parseString('<html>{}</html>'.format(value))
        items = dom.getElementsByTagName('li')
        self.context['buttons'] = []

        for item in items:
          self.context['buttons'].append(item.childNodes[0].nodeValue)

        return value


shortcode = FilterBubbleShortcode
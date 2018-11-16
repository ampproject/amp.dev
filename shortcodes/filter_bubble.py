from shortcodes import Shortcode

class FilterBubbleShortCode(Shortcode):
    name = 'filter-bubble'
    prerender_markdown = True
    template = 'partials/filter-bubbles.j2'

    def transform(self, value, options):
        print(value)

shortcode = FilterBubbleShortCode
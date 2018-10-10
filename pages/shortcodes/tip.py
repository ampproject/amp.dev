from shortcodes import Shortcode


class TipShortcode(Shortcode):
    name = 'tip'
    prerender_markdown = True
    template = 'partials/tip.j2'

shortcode = TipShortcode

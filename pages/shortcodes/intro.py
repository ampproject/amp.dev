from shortcodes import Shortcode


class IntroShortcode(Shortcode):
    name = 'intro'
    prerender_markdown = True
    template = 'views/partials/intro.j2'

shortcode = IntroShortcode

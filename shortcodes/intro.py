from shortcodes import Shortcode


class IntroShortcode(Shortcode):
    name = 'intro'
    prerender_markdown = True
    template = 'partials/intro.j2'

shortcode = IntroShortcode

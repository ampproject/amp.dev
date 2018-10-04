from shortcodes import Shortcode


class StageShortcode(Shortcode):
    name = 'stage'
    prerender_markdown = True
    template = 'partials/stage.j2'

shortcode = StageShortcode

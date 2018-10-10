from shortcodes import Shortcode


class StageShortcode(Shortcode):
    name = 'stage'
    render_empty = True
    prerender_markdown = True
    template = 'partials/stage.j2'

shortcode = StageShortcode

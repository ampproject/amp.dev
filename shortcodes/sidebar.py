from shortcodes import Shortcode


class SidebarShortcode(Shortcode):
    name = 'sidebar'
    prerender_markdown = True
    template = 'partials/sidebar.j2'

shortcode = SidebarShortcode
from xml.dom import minidom

from shortcodes import Shortcode


class FloatImageShortcode(Shortcode):
    name = 'float-image'
    prerender_markdown = True
    template = 'partials/float-image.j2'

    def transform(self, value, options):
        """Get the src attributes from contained images"""
        # Create fake root element to make sure there is one
        dom = minidom.parseString('<html>{}</html>'.format(value))
        images = dom.getElementsByTagName('img')

        self.context['images'] = []
        for index, image in enumerate(images):
            self.context['images'].append(image.getAttribute('src'))
        return value


shortcode = FloatImageShortcode

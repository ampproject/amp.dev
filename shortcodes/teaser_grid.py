from xml.dom import minidom

from shortcodes import Shortcode


class TeaserGridShortcode(Shortcode):
    name = 'teaser-grid'
    template = 'partials/teaser-grid.j2'
    prerender_markdown = True
    render_empty = True

    def transform(self, value, options):
        """Finds links to content pages inside shortcodes and puts
        the corresponding doc objects into the context"""
        # Create fake root element to make sure there is one
        dom = minidom.parseString('<html>{}</html>'.format(value))

        self.context['headline'] = ''
        headlines = dom.getElementsByTagName('h1')
        if len(headlines):
          self.context['headline'] = headlines[0].childNodes[0].nodeValue

        # Find teasers and the CTA
        self.context['teasers'] = []
        self.context['cta'] = None
        for anchor in dom.getElementsByTagName('a'):
            teaser = {}
            href = anchor.getAttribute('href')
            # Check if link points to a existing document
            if self._pod.file_exists(href):
                teaser['doc'] = self._pod.get_doc(href)
                # Check if the link has a text, if so it is the CTA if there
                # is not yet already one
                if anchor.childNodes and not self.context['cta']:
                  teaser['text'] = anchor.childNodes[0].nodeValue
                  self.context['cta'] = teaser
                else:
                  self.context['teasers'].append(teaser)

        # Reset value as it should not be used
        value = ''
        return value

shortcode = TeaserGridShortcode

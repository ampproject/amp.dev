from xml.dom import minidom

from shortcodes import Shortcode

TEASER_TYPE_COMPONENT = 'component'
TEASER_TYPE_EXAMPLE = 'example'
TEASER_TYPE_GUIDE = 'guide'
TEASER_TYPE_SUCCESS_STORY = 'success_story'
TEASER_TYPE_TEMPLATE = 'template'
TEASER_TYPE_USE_CASE = 'use-case'

TYPE_TEMPLATES = {
    '/views/detail/component-detail.j2': TEASER_TYPE_COMPONENT,
    '/views/detail/example-detail.j2': TEASER_TYPE_EXAMPLE,
    '/views/detail/guide-detail.j2': TEASER_TYPE_GUIDE,
    '/views/detail/success-story-detail.j2': TEASER_TYPE_SUCCESS_STORY,
    '/views/detail/template-detail.j2': TEASER_TYPE_TEMPLATE,
    '/views/detail/use-case-detail.j2': TEASER_TYPE_USE_CASE,
}


class TeaserGridShortcode(Shortcode):
    name = 'teaser-grid'
    template = 'views/partials/teaser-grid.j2'
    prerender_markdown = True
    render_empty = True

    def _get_grid_headline(self, dom):
        """Tries to pull a headline for the grid from the markdown"""
        headlines = dom.getElementsByTagName('h1')
        if len(headlines):
            return headlines[0].childNodes[0].nodeValue
        return None

    def _get_teaser(self, teaser_doc):
        """Builds a dict containing all properties needed to render a teaser"""
        teaser = {}
        # Determine type of teaser, fall back to component teaser
        teaser['type'] = TYPE_TEMPLATES.get(teaser_doc.view,
                                            TEASER_TYPE_COMPONENT)

        # Fill generic teaser attributes
        teaser['headline'] = teaser_doc.titles('teaser')

        # Try to fill more complex teaser attributes
        teaser_fields = teaser_doc.fields.get('teaser', {})
        teaser['image'] = teaser_fields.get('image', None)
        teaser['kpi'] = teaser_fields.get('kpi', None)
        # TODO: Build excerpt from document if not maintained
        # teaser['text'] = teaser_fields.get('text', '')
        teaser['video'] = teaser_fields.get('video', '')

        # Build teaser-specific fields: get destinations
        if teaser['type'] in [TEASER_TYPE_SUCCESS_STORY, TEASER_TYPE_USE_CASE, TEASER_TYPE_TEMPLATE]:
          teaser['destination'] = teaser_doc.fields.get('destination', None)
        else:
          teaser['destinations'] = teaser_doc.fields.get('destinations', [])

        # Get logo for success story teaser
        if teaser['type'] is TEASER_TYPE_SUCCESS_STORY:
          teaser['logo'] = teaser_fields.get('logo', None)

        # Vend teasered document to template for things like URL
        teaser['doc'] = teaser_doc
        return teaser

    def transform(self, value, options):
        """Fills the context with the needed values to render the teasers"""
        # Create fake root element to make sure there is one
        dom = minidom.parseString('<html>{}</html>'.format(value))

        self.context['headline'] = self._get_grid_headline(dom)

        # Find teasers and the CTA
        self.context['teasers'] = []
        self.context['cta'] = None
        for anchor in dom.getElementsByTagName('a'):
            href = anchor.getAttribute('href')
            # Check if link points to a existing document
            if self._pod.file_exists(href):
                anchor_doc = self._pod.get_doc(href)

                if anchor.childNodes and not self.context['cta']:
                    # Check if the link has a text, if so it is the CTA if there
                    # is not yet already one
                    self.context['cta'] = {
                        'doc': anchor_doc,
                        'text': anchor.childNodes[0].nodeValue
                    }
                else:
                    # Otherwise build a teaser to render in the template
                    teaser = self._get_teaser(anchor_doc)
                    self.context['teasers'].append(teaser)

        # Reset value as it should not be used
        value = ''
        return value


shortcode = TeaserGridShortcode

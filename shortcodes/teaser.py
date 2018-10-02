from shortcodes import Shortcode


class TeaserShortcode(Shortcode):
    name = 'teaser'
    prerender_markdown = True
    template = 'partials/teaser.j2'

    def transform(self, value, options):
      """Inspects the passed in document to determine teaser type and craft
      a suiting teaser object"""
      print '######'
      print options
      print '######'

      return value

shortcode = TeaserShortcode

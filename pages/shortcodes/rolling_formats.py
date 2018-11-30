from xml.dom import minidom

from shortcodes import Shortcode

DEFAULT_FORMATS = ['websites', 'stories', 'ads', 'e-mails']


class RollingFormatsShortcode(Shortcode):
    name = 'rolling-formats'
    render_empty = True
    prerender_markdown = True
    template = 'partials/destination-switch.j2'

    def _get_formats(self, dom):
        formats = []

        for format in DEFAULT_FORMATS:
          format = {
            'text': format
          }

          formats.append(format)

        return formats

    def transform(self, value, options):

      dom = minidom.parseString('<html>{}</html>'.format(value))
      self.context['destinations'] = self._get_formats(dom)

      return value

shortcode = RollingFormatsShortcode
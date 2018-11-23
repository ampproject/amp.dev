from xml.dom import minidom

from shortcodes import Shortcode

class DestinationSwitchShortcode(Shortcode):
  name = 'destination-switch'
  render_empty = True
  prerender_markdown = True
  template = 'partials/destination-switch.j2'

  def _get_switch_type(self, options, dom):
    if len(options):
      self.context['switch_type'] = options.values()[0]
      return self.context['switch_type']
    else:
      self.context['switch_type'] = 'rolling'
      return self.context['switch_type']
    return ''

  def _set_destinations(self, dom):
    self.context['destinations'] = []
    links = dom.getElementsByTagName('a')
    destinations = ['websites', 'ads', 'stories', 'e-mails']

    # if links are given, get links and their destinations
    if len(links):
      for link in links:
        href = link.getAttribute('href')
        text = link.childNodes[0].nodeValue
        destination = {
          'link': href,
          'text': text
        }
        self.context['destinations'].append(destination)

    # if no links are provided, return only destinations
    else:
      for destination in destinations:
        destination = {
          'text': destination
        }
        self.context['destinations'].append(destination)

    return self.context['destinations']

  def transform(self, value, options):
    dom = minidom.parseString('<html>{}</html>'.format(value))

    self.context['desinations'] = self._set_destinations(dom)

    self.context['switch_type'] = self._get_switch_type(options, dom)


    return value

shortcode = DestinationSwitchShortcode
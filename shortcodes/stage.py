from xml.dom import minidom

from shortcodes import Shortcode


class StageShortcode(Shortcode):
    name = 'stage'
    render_empty = True
    prerender_markdown = True
    template = 'partials/stage.j2'

    # if stage includes a subheadline, retrieve and return it #
    def _get_sub_headline(self, dom):
      subHeadlines = dom.getElementsByTagName('h2')
      if len(subHeadlines):
          return subHeadlines[0].childNodes[0].nodeValue
      return ''

    # if stage includes a headline, retrieve and return it #
    def _get_headline(self, dom):
      headline = dom.getElementsByTagName('h1')

      # some stages inline the destination-switch between two headlines, check if there is more than one headline #
      if len(headline) == 2:
        self.context['headlineTwo'] = headline[1].childNodes[0].nodeValue
        return headline[0].childNodes[0].nodeValue

      elif len(headline) == 1:
        # reset headlineTwo to empty string #
        self.context['headlineTwo'] = ''
        return headline[0].childNodes[0].nodeValue
      return ''


    def transform(self, value, options):
        dom = minidom.parseString('<html>{}</html>'.format(value))
        self.context['subHeadline'] = self._get_sub_headline(dom)
        self.context['headline'] = self._get_headline(dom)

        anchorTag = dom.getElementsByTagName('a')

        # checks if stage should include a button #
        if len(anchorTag):
          href = anchorTag[0].getAttribute('href')
          if(self._pod.file_exists(href)):
            doc = self._pod.get_doc(href)
            self.context['linkForDoc'] = href
            self.context['linkTitle'] = anchorTag[0].childNodes[0].nodeValue

        else:
          self.context['linkForDoc'] = ''
          self.context['linkTitle'] = ''

        return value

shortcode = StageShortcode

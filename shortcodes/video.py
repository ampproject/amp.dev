from xml.dom import minidom

from shortcodes import Shortcode


class VideoShortcode(Shortcode):
    name = 'video'
    prerender_markdown = True
    template = 'partials/video.j2'

    def transform(self, value, options):
        """Get the video id from contained video"""
        # Create fake root element to make sure there is one
        dom = minidom.parseString('<html>{}</html>'.format(value))
        video = dom.getElementsByTagName('a')

        self.context['video'] = []
        for index, vid in enumerate(video):
          self.context['video'].append(vid.getAttribute('href'))
        return value


shortcode = VideoShortcode

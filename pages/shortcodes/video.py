from xml.dom import minidom
import re

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

        if len(video) == 1:
          video = video[0]
          video_src = video.getAttribute('href')


          if 'youtube.com' in video_src:
            self.context['type'] = 'youtube'

            # Extract the video ID from full youtube link by RegEx
            match = re.search(r'v=\w*', video_src)

            if match:
              str = match.group()
              youtube_id = re.split('=', str)

              self.context['youtube_id'] = youtube_id[1]
            else:
              print('no string match found for youtube id, either one was not provided or format is incorrect')

          else:
            self.context['type'] = 'unspported'
            self.context['src'] = video_src
            # TODO: Implement local videos with amp-video


        return value


shortcode = VideoShortcode

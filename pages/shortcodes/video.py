from xml.dom import minidom
import re

from shortcodes import Shortcode


class VideoShortcode(Shortcode):
    name = 'video'
    same_tag_closes = True
    standalone = True
    render_empty = True
    template = 'partials/video.j2'

    def _get_caption(self, options):
        caption = options.get('caption', None)
        return caption

    def _get_src(self, options):
        src = options.get('src', None)
        return src

    def transform(self, value, options):
        self.context['src'] = self._get_src(options)
        self.context['caption'] = self._get_caption(options)

        if 'youtube.com' in self.context['src']:
          self.context['type'] = 'youtube'

          # Extract the video ID from full youtube link by RegEx
          match = re.search(r'v=\w*', self.context['src'])

          if match:
            str = match.group()
            youtube_id = re.split('=', str)

            self.context['youtube_id'] = youtube_id[1]
          else:
            print('no string match found for youtube id, either one was not provided or format is incorrect')

        else:
          self.context['type'] = 'unsupported'
          self.context['src'] = self.context['src']
          # TODO: Implement local videos with amp-video

        return value

shortcode = VideoShortcode

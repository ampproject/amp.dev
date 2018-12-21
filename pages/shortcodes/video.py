import re
from xml.dom import minidom

from shortcodes import Shortcode


class VideoShortcode(Shortcode):
    name = 'video'
    same_tag_closes = True
    standalone = True
    render_empty = True
    template = 'views/partials/video.j2'

    def transform(self, value, options):
        self.context['src'] = options.get('src', '')
        # Always fall back to a 16:9 dimension if none is set explicitly
        self.context['width'] = options.get('width', 16)
        self.context['height'] = options.get('height', 9)

        self.context['caption'] = options.get('caption', None)

        self.context['poster'] = options.get('poster', None)

        if 'youtube.com' in self.context['src']:
          self.context['type'] = 'youtube'

          # Extract the video ID from full youtube link by RegEx
          youtube_id = re.search(r'v=(\w*)', self.context['src']).group(1)
          self.context['youtube_id'] = youtube_id
        else:
          self.context['type'] = 'unsupported'
          self.context['src'] = self.context['src']
          # TODO: Implement local videos with amp-video

        return value

shortcode = VideoShortcode

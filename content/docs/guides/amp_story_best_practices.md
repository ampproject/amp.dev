---
$title: Best practices for creating an AMP Story
$order: 7
$category: Develop
toc: true
---

[TOC]

This guide provides recommended practices that you should implement when creating an [AMP Story](/docs/reference/components/amp-story.html).


## Background color  

You should specify a background color for your AMP story pages. By having a background color, you provide a good fallback user experience even if poor network conditions prevent them from downloading any image or video assets.

*   The background color should be representative of the dominant color on the page's background asset.
*   Choose a color that allows for a smooth transition with the image or page itself. You can choose to:
    *   Pick a dominant color representative of the image/video.
    *   Pick a consistent theme color for all pages in the story. 
*   The background color should be different from the font color so that the text is readable even before the image loads.

## Text 

### Ensure readability

Ensure that text overlays on a page are readable:

* Choose a font color that contrasts with the background image and background color.
* Add a bit gradient overlay between the image and text to contrast the text and image.

### Bite-sized text   

Keep in mind that AMP Stories are designed to offer a more visual experience, so keep text on a page limited to bite-size chunks (i.e., no more than 1-2 sentences). Carefully consider your aims and the reading flow if you believe more text on a page would be appropriate.

## Video  

### Specify a poster attribute 

The `poster` is an image that displays in the UI until your video is downloaded. The poster can generally be the first frame of the video, although any image can work.  However, you should choose an image that is representative of the video and allows for a smooth transition. If you are choosing the first frame, make sure it's not just a blank temporary frame. 

The recommended dimensions for a poster image are: 720p (720w x 1280h) .

*Example: Specifying a poster*

```html
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

### Specify `<source>` vs `src` 

When specifying the source for an [amp-video](/docs/reference/components/amp-video.html), use `<source>` child elements instead of the `src` attribute. By using the `<source>` element, you can specify the video type, as well as add more video sources. In the `<source>` element, specify the MIME type via the `"type"` attribute. For HLS videos, you must specify one of the following MIME types: `application/x-mpegurl` or `application/vnd.apple.mpegurl`. For all other videos, specify the `video/` MIME prefix and the video format (e.g., "`video/mp4`").

*Example: Specifying multiple source files*

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### Size/Length of video

*  For optimal performance, you should aim to provide videos that are no larger than 4 MB.
*   For long videos, consider splitting the video over multiple pages.
*   For the cover page, avoid particularly large videos.

### Video formats

If you can only provide a single video format, provide **MP4**.  However, where possible, use **HLS** video and specify MP4 as a fallback for browsers that do not yet support HLS video. HLS performs adaptive bitrate streaming, where the quality of the video can be altered to best suit the user's network connection.

{% call callout('Note', type='note') %}
The HLS video format is not supported in the Chrome for Desktop browser (not even via emulation), so specifying an MP4 fallback is required for any desktop traffic to your page. To debug HLS videos, you'll need to use an actual mobile device via USB-debugging.
{% endcall %}

### Video resolution

AMP Story videos are always vertical (i.e., portrait view), with an expected aspect ratio of 16:9. Use the recommended resolution for the video streaming type: 

<table>
  <thead>
    <tr>
     <th>Video streaming type</th>
     <th>Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non-adaptive</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptive</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>


{% call callout('Note', type='note') %}
For mobile devices that differ from the 16:9 aspect ratio, the video might be cropped horizontally or vertically to fit the viewport.
{% endcall %}


### Video codec

1.  For MP4, use `H.264`.
1.  For WEBM, use `VP9`.
1.  For HLS or DASH, use `H.264`.


### Video quality

#### Transcoding optimizations

There are various tools you can use to encode videos and adjust the quality of the video during encoding.  Here are just a few:

<table>
  <thead>
    <tr>
     <th>Tool</th>
     <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>An encoder that can also output the HLS format including the playlist.
     </td>
    </tr>
  </tbody>
</table>

#### HLS segment size

Ensure the size of your HLS segments are typically no more than 10 seconds in duration.

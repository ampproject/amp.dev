---
$title: Best practices for creating an AMP story
$order: 12
description: 'This guide provides recommended practices that you should implement when creating an AMP story. Watch our video on creating delightful AMP story experiences.'
$category: Develop
formats:
    - stories
components:
    - youtube
    - video
---

This guide provides recommended practices that you should implement when creating an [AMP story]({{g.doc('/content/amp-dev/documentation/components/reference/amp-story.md', locale=doc.locale).url.path}}).

[video src="https://www.youtube.com/watch?v=2WjFBnCj2ew" width="480" height="270" caption="Watch our video on creating delightful AMP story experiences."]

## Tell engaging stories

AMP stories are a great way to reach your audience with visual, immersive storytelling. This document outlines some guidelines for telling engaging stories and for getting the most out of the AMP story format.  Before we dive into the details, here are some key things to remember:

### Make your AMP story complete and self-contained

Keep your reader engaged with your story. Don’t require them to click links to other websites to get essential information.

This [AMP story](https://www-washingtonpost-com.cdn.ampproject.org/c/s/www.washingtonpost.com/world/2018/07/16/amp-stories/why-india-has-million-stray-cows-roaming-country/) from The Washington Post is a good example of using minimal text and full screen portrait images and video to give the reader a good understanding of the topic.

### Use video and animation

Bring your stories to life with motion. Video and animation can help keep readers’ attention and increase understanding.  Don’t be afraid to use video frequently, and then balance it out with static content.

USA Today’s [AMP story](https://www.usatoday.com/amp-stories/beyonce-rule-the-world/) about Beyonce uses a good combination of animation and video.

### Include branding and a date in your stories
Help users understand who created the story and when it was published. Including brand attribution and a publication date on the cover page can help foster trust.

This [AMP story](https://edition-cnn-com.cdn.ampproject.org/c/s/edition.cnn.com/ampstories/travel/12-beautiful-reasons-to-visit-italy) from CNN about traveling in Italy makes it easy to see at-a-glance who published the story and how recent it is.

Keep reading for additional tips on making the most of your AMP stories.

<figure class="alignment-wrapper margin-">
  <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/do-background-still.jpg" width="1440" height="630" loop autoplay noaudio>
    <source src="/static/img/docs/guides/storiesbp/do-background.webm" type="video/webm" />
    <source src="/static/img/docs/guides/storiesbp/do-background.mp4" type="video/mp4" />
  </amp-video>
</figure>

This story uses full-bleed images, video, and animations to create an engaging reading experience. It tells a complete story, and it includes branding and a publication date.

{{ image('/static/img/docs/guides/storiesbp/dont-background.jpg', 1440, 630, layout='responsive', alt='Image showing a non-immersive AMP story', caption=' ', align='' ) }}

Landscape images and lack of motion make this story less immersive and less interesting. The big links to the full article on every page compete with other elements on the page and distract from the story.

## Text

### Keep it concise

Keep your audience engaged by avoiding large blocks of text. AMP stories is a visually-driven format. Use images to tell your story, and add text to enhance it.


<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>{{ image('/static/img/docs/guides/storiesbp/text-clear-do.jpg', 250, 500, layout='intrinsic', alt='Image showing good amount of text in an AMP story', align='center' ) }}</td>
    <td>{{ image('/static/img/docs/guides/storiesbp/text-density-dont.jpg', 250, 500, layout='intrinsic', alt='Image showing too much text in an AMP story', align='center' ) }}</td>
  </tr>
  <tr>
    <td>Try to keep text to just the essentials. Varying type size and style to break up blocks of text can increase scannability.</td>
    <td>A big wall of text like this can be hard to read and may discourage engagement with your story. </td>
  </tr>
</table>

### Make sure it’s legible

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>{{ image('/static/img/docs/guides/storiesbp/readability1-do.jpg', 250, 500, layout='intrinsic', alt='Image showing good use of text contrast in an AMP story', align='' ) }}</td>
    <td>{{ image('/static/img/docs/guides/storiesbp/readability1-dont.jpg', 250, 500, layout='intrinsic', alt='Image showing poor use of text contrast in an AMP story', align='' ) }}</td>
  </tr>
  <tr>
    <td>A high contrast makes the words easy to see.</td>
    <td>With poor contrast, your words and images may blend, making the words hard to read and the story harder to follow.</td>
  </tr>
  <tr>
    <td>{{ image('/static/img/docs/guides/storiesbp/readability2-do.jpg', 250, 500, layout='intrinsic', alt='Image showing good use of text highlight in an AMP story', align='' ) }}</td>
    <td>{{ image('/static/img/docs/guides/storiesbp/readability2-dont.jpg', 250, 500, layout='intrinsic', alt='Image showing poor use of text highlight in an AMP story', align='' ) }}</td>
  </tr>
    <tr>
      <td>Highlighting the text can make the words stand out and help keep your readers focused on your story.</td>
      <td>Using light-colored text over a busy image makes the words hard to read. </td>
  </tr>
</table>

## Images

### Use portrait, full bleed images

Create a compelling, immersive experience with full-bleed, portrait (9:16 ratio) images, which take full advantage of the mobile screen.

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>{{ image('/static/img/docs/guides/storiesbp/full-bleed-image-do.jpg', 250, 500, layout='intrinsic', alt='Image demonstrating the immersive experience full bleed images create', align='center' ) }}</td>
    <td>{{ image('/static/img/docs/guides/storiesbp/full-bleed-image-do-not.jpg', 250, 500, layout='intrinsic', alt='Image demonstrating poor landscape image fit on mobile screens', align='center' ) }}</td>
  </tr>
    <tr>
    <td>This full bleed image creates an immersive experience.</td>
    <td>Landscape images don’t fit mobile screens well. They provide a less powerful experience and may even distract the reader.</td>
  </tr>
</table>

### Crop images mindfully

Keep the focus on what’s important. Crop out unnecessary or distracting elements, and make sure the key subject of the photo is in focus and complete.


<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>{{ image('/static/img/docs/guides/storiesbp/crop-images-do.jpg', 250, 500, layout='intrinsic', alt='Image demonstrating mindful image cropping', align='center' ) }}</td>
    <td>{{ image('/static/img/docs/guides/storiesbp/crop-images-do-not.jpg', 250, 500, layout='intrinsic', alt='Image demonstrating poor image cropping', align='center' ) }}</td>
  </tr>
    <tr>
    <td>This image is cropped to align with page content and supports the main idea.</td>
    <td>With this crop, it’s unclear where the reader’s focus should be and what idea the image intends to convey.</td>
  </tr>
</table>

### Bring still images to life
Make stories more dynamic by adding motion to static images. For example, you can animate photos with fly-in, rotation, or fade-in effects, as long as the animation supports the style of your story and does not distract from your content.

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>
    <figure style="max-width: 360px">
      <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/static-image-live-do-not.jpg" width="360" height="720" loop autoplay noaudio>
        <source src="/static/img/docs/guides/storiesbp/images-life-do.webm" type="video/webm" />
        <source src="/static/img/docs/guides/storiesbp/images-life-do.mp4" type="video/mp4" />
      </amp-video>
    </figure>
    </td>
    <td>{{ image('/static/img/docs/guides/storiesbp/static-image-live-do-not.jpg', 360, 720, layout='intrinsic', alt='Image demonstrating a dull story page', align='center' ) }}</td>
  </tr>
    <tr>
    <td>The motion in this example helps support the main idea and adds a dynamic element to the page.</td>
    <td>This static page is functional, but it may be missing an opportunity to be more engaging to readers.</td>
  </tr>
</table>

## Video

### Use Portrait, Full Bleed Assets
Create a compelling, immersive experience with full-bleed, portrait (9:16 ratio) images, which take full advantage of the mobile experience.

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
  <!-- TODO: Swap assets with correct mp4 -->
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/video-bleed-do-poster.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/video-bleed-do.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/video-bleed-do.mp4" type="video/mp4" />        
        </amp-video>
      </div>
    </td>
    <td>
    <div style="max-width: 360px">
      <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/video-bleed-dont.jpg" width="360" height="720" loop autoplay noaudio>
        <source src="/static/img/docs/guides/storiesbp/video-bleed-dont.webm" type="video/webm" />
        <source src="/static/img/docs/guides/storiesbp/video-bleed-dont.mp4" type="video/mp4" />  
      </amp-video>
    </div>
    </td>
  </tr>
  <tr>
    <td>This full bleed video helps readers focus on a single key subject.</td>
    <td>This landscape video lacks the immersive feeling and may distract readers.</td>
  </tr>
</table>

### Use captions
Enable users to experience your stories anywhere.  In some settings, listening to audio is not an option. So while sound can enhance your story, listening should not be required. Use captions to keep readers engaged even when the volume is turned off.

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
  <!-- TODO: Swap assets with correct mp4 -->
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/captions-do.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/captions-do.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/captions-do.mp4" type="video/mp4" />  
        </amp-video>
      </div>
    </td>
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/captions-dont.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/captions-dont.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/captions-dont.mp4" type="video/mp4" />        
        </amp-video>
      </div>
    </td>
  </tr>
  <tr>
    <td>Captions help keep your audience engaged, even when they can’t listen to the audio. </td>
    <td>Without captions, your audience needs to be able to listen to audio to follow your story.  This may limit who engages with your content and when they are able to do so.</td>
  </tr>
</table>

For more technical video guidelines see [this section](https://amp.dev/documentation/guides-and-tutorials/develop/amp_story_best_practices.html?format=stories#video-technical-considerations) below.

## Animation

### Pay attention to timing

Animation can enhance stories when it’s visually appealing, easy to understand, and the timing is right. It’s important to deliver the right combination of style and duration. For example, simple animations should take less than 500 milliseconds, but panning on a background image should last longer.

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/duration-do.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/duration-do.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/duration-do.mp4" type="video/mp4" />          
        </amp-video>
      </div>
    </td>
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/duration-do.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/duration-dont.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/duration-dont.mp4" type="video/mp4" />          
        </amp-video>
      </div>
    </td>
  </tr>
  <tr>
    <td>This Ken Burns effect on the background image is subtle and makes the experience more immersive. It creates a right balance with the text overlay together.</td>
    <td>Here, the Ken Burns effect is too fast. The motion is distracting and makes it hard to focus on the headline.</td>
  </tr>
</table>

### Choose the right style

Pick an animation style that matches your story’s aesthetic.  AMP story offers a presets library to help you find a style and intensity that works for you and won’t distract from your content. It's easy to overdo animation, so keep the approach subtle, simple,and clear.  You want your story to stand out, not your animation.

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/style-still.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/style-do.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/style-do.mp4" type="video/mp4" />          
        </amp-video>
      </div>
    </td>
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/style-still.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/style-dont.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/style-dont.mp4" type="video/mp4" />  
        </amp-video>
      </div>
    </td>
  </tr>
  <tr>
    <td>Sliding the title up and fading in the subtitle guides the reader to follow the content of the page in the right order.</td>
    <td>This rotation animation doesn’t add value to the story. Instead, it creates visual noise and may be distracting to readers.</td>
  </tr>
</table>

### Build animation sequences with multiple objects
One way to be creative with motion is to animate multiple objects into a sequence, rather than having them all move together with one effect. Elements can have different effects and durations, but should all work together to deliver one message.

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/sequence-still.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/sequence-do.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/sequence-do.mp4" type="video/mp4" />          
        </amp-video>
      </div>
    </td>
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/sequence-still.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/sequence-dont.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/sequence-dont.mp4" type="video/mp4" />         
        </amp-video>
      </div>
    </td>
  </tr>
  <tr>
    <td>Animating these objects separately makes this visual more interesting and enjoyable. It also helps each item stand out more distinctly.</td>
    <td>Adding rapid motion to one big block like this doesn’t add to understanding, and it can be distracting.</td>
  </tr>
</table>

## Other story  components

### Use embeds strategically

Embeds can provide an added dimension to your story when used sparingly and presented in the right way. Include relevant content alongside the embed so that it’s an integrated piece of the story.  You may need to enable interactivity for your embed.

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>{{ image('/static/img/docs/guides/storiesbp/embed-do.jpg', 250, 500, layout='intrinsic', alt='Example of well used embed on AMP story page', align='center' ) }}</td>
    <td>{{ image('/static/img/docs/guides/storiesbp/embed-dont.jpg', 250, 500, layout='intrinsic', alt='AMP story page with no background or header, but a single embed looks unfinished', align='center' ) }}</td>
  </tr>
  <tr>
    <td>The embed on this page integrates well with the rest of the layout. The headline, date, and background graphics help enhance the visual.</td>
    <td>Putting the embed alone on the page looks unfinished and does not integrate with the full story well.</td>
  </tr>
</table>

### Add additional content with attachments

Keep your AMP story streamlined by putting related content in attachments. This way, readers can easily dig deeper if they want to learn more about your story. You might use attachments for long blocks of text that don’t fit in the main story, or, if your story contains a highlight video, you might make the full video available as an attachment. Help readers navigate your content by designing the attachment to align with the rest of your story.

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/attachment-still.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/attachment-do.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/attachment-do.mp4" type="video/mp4" />         
        </amp-video>
      </div>
    </td>
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/attachment-still.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/attachment-dont.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/attachment-dont.mp4" type="video/mp4" />          
        </amp-video>
      </div>
    </td>
  </tr>
  <tr>
    <td>The embed on this page integrates well with the rest of the layout. The headline, date, and background graphics help enhance the visual.</td>
    <td>Putting the embed alone on the page looks unfinished and does not integrate with the full story well.</td>
  </tr>
</table>

<table>
  <tr>
    <th>DO</th>
  </tr>
  <tr>
    <td>
      <div style="max-width: 360px">
        <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/attachment-still2.jpg" width="360" height="720" loop autoplay noaudio>
          <source src="/static/img/docs/guides/storiesbp/attachment-do2.webm" type="video/webm" />
          <source src="/static/img/docs/guides/storiesbp/attachment-do2.mp4" type="video/mp4" />         
        </amp-video>
      </div>
    </td>
  </tr>
  <tr>
    <td>A highlight video can be a useful element in an AMP story. You can include the full-length video as an attachment, giving readers the option to dive deeper into your content.</td>
  </tr>
</table>

### Be thoughtful with links

With AMP stories, you can add links anywhere on a page. When a link is tapped, a tooltip appears, letting the user know where the link goes, and allowing the user to confirm the action before leaving the story. It’s important to think strategically about the size and location of your links, as well as the frequency. Adding too many tappable elements to your pages can complicate story navigation and potentially frustrate readers.

<table>
  <tr>
    <th>DO</th>
    <th>DO NOT</th>
  </tr>
  <tr>
    <td>{{ image('/static/img/docs/guides/storiesbp/links-do.jpg', 250, 500, layout='intrinsic', alt='Example of well used links on AMP story page', align='center' ) }}</td>
    <td>{{ image('/static/img/docs/guides/storiesbp/links-dont.jpg', 250, 500, layout='intrinsic', alt='AMP story page with links that interfere with navigation', align='center' ) }}</td>
  </tr>
  <tr>
    <td>The links on this page are clearly marked and surrounded by related content. They don’t interfere with story navigation.</td>
    <td>The links on this page completely block the navigation. Readers will not be able to easily go to the previous or the next page.</td>
  </tr>
</table>

## Desktop experience

Improve the desktop experience of your AMP stories by [including landscape images](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). While AMP stories are primarily designed for mobile devices, some people do view them on desktop.  By including both portrait and landscape styles, you can ensure that people see images in the format that’s right for the device they’re using.

## Ads and sponsored content

### Label affiliate links and sponsored content

Sponsored content should be clearly labeled, and any paid or affiliate links should use the [`nofollow`](https://support.google.com/webmasters/answer/96569?hl=en) attribute.

## Technical Considerations

### Background color

You should specify a background color for your AMP story pages. By having a background color, you provide a good fallback user experience even if poor network conditions prevent them from downloading any image or video assets.

*   The background color should be representative of the dominant color on the page's background asset.
*   Choose a color that allows for a smooth transition with the image or page itself. You can choose to:
    *   Pick a dominant color representative of the image/video.
    *   Pick a consistent theme color for all pages in the story.
*   The background color should be different from the font color so that the text is readable even before the image loads.

### Video

#### Specify a poster attribute

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

#### Specify `<source>` vs `src`

When specifying the source for an [`amp-video`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-video.md', locale=doc.locale).url.path}}), use `<source>` child elements instead of the `src` attribute. By using the `<source>` element, you can specify the video type, as well as add more video sources. In the `<source>` element, specify the MIME type via the `"type"` attribute. For HLS videos, you must specify one of the following MIME types: `application/x-mpegurl` or `application/vnd.apple.mpegurl`. For all other videos, specify the `video/` MIME prefix and the video format (e.g., "`video/mp4`").

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

#### Size/Length of video

*  For optimal performance, you should aim to provide videos that are no larger than 4 MB.
*   For long videos, consider splitting the video over multiple pages.
*   For the cover page, avoid particularly large videos.

#### Video formats

If you can only provide a single video format, provide **MP4**.  However, where possible, use **HLS** video and specify MP4 as a fallback for browsers that do not yet support HLS video. HLS performs adaptive bitrate streaming, where the quality of the video can be altered to best suit the user's network connection.

[tip type="note"]
**NOTE –**  The HLS video format is not supported in the Chrome for Desktop browser (not even via emulation), so specifying an MP4 fallback is required for any desktop traffic to your page. To debug HLS videos, you'll need to use an actual mobile device via USB-debugging.
[/tip]

#### Video resolution

AMP story videos are always vertical (i.e., portrait view), with an expected aspect ratio of 16:9. Use the recommended resolution for the video streaming type:

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

[tip type="note"]
**NOTE –**  For mobile devices that differ from the 16:9 aspect ratio, the video might be cropped horizontally or vertically to fit the viewport.
[/tip]

#### Video codec

1.  For MP4, use `H.264`.
1.  For WEBM, use `VP9`.
1.  For HLS or DASH, use `H.264`.

#### Video quality

##### Transcoding optimizations

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

##### HLS segment size

Ensure the size of your HLS segments are typically no more than 10 seconds in duration.

#### Advance to next page after video ends

If attempting to automatically advance from one page to another after a video finishes playing, you should set the value of the `auto-advance-after` attribute of `<amp-story-page>` to the id of the video, rather than the expected length of the video. That is, use

```html
<amp-story-page auto-advance-after="myvideo">
```

not

```html
<amp-story-page auto-advance-after="9s">
```

This is because the video may not start playing at exactly the same time as the page is displayed, or the given length may not be correct, leading to a different between the exp

### System Layers

#### System Header

The system header contains controls such as the mute and share icons, appears at a higher z-index than the background image/video. Ensure that no essential information is covered by these icons.

#### Aspect ratio

The page height varies across different browsers and devices. When designing assets on the page, use full-bleed assets based on a 9:16 aspect ratio. Don't leave any essential content close to the edge of the page as it may be  cropped on  some devices.

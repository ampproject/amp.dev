---
$title: Web Story Player - User’s guide
description: 'The Web Story Player is the best way for you to give users a rich user experience on your sites using Web Stories.'
formats:
  - websites
  - stories
---

The Web Player has significantly matured (thanks for all the feedback and insights), and is in a great place for publishers, developers, tools and platforms to start using in their site experiences. This update recaps key capabilities from the Web Story Player, and provides guides on common implementation patterns.

# What is the Web Player?

The Web Story Player is the best way for you to give users a rich user experience on your sites using Web Stories.  Think of it like a video player: having a single video in your device is fine, but put it in a video player live on the web, and it unlocks a number of features and benefits: There’s additional controls (e.g. captions), it lives among millions of other videos that can provide related content at the end of your original video – which adds discoverability, and more.

You can think similarly of the web player. By only linking to a single story, you can miss out on a number of features and experiences that are found in other story platforms (e.g. Instagram, Snapchat) and are natural to story users. See table below for a few examples.

<table style="width: 523px; border-color: #ffff;" border="0">
<tbody>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">&nbsp;</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><strong>Single Story</strong></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><strong>Web player</strong></p>
</td>
</tr>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">
<p style="text-align: center;"><strong>A richer user experience</strong></p>
</td>
<td style="height: 31px; width: 95px;">&nbsp;</td>
<td style="height: 31px; width: 95px;">&nbsp;</td>
</tr>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">
<p><span style="font-weight: 400;">Swipe down to exit the Story and return to your site</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">❌</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">✅</span></p>
</td>
</tr>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">
<p><span style="font-weight: 400;">Swipe to next / previous story</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">❌</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">✅</span></p>
</td>
</tr>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">
<p><span style="font-weight: 400;">Same-site entry points</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">❌</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">✅</span></p>
</td>
</tr>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">
<p style="text-align: center;"><strong>Ability to customize</strong></p>
</td>
<td style="height: 31px; width: 95px;">&nbsp;</td>
<td style="height: 31px; width: 95px;">&nbsp;</td>
</tr>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">
<p><span style="font-weight: 400;">Custom events (e.g. navigate between stories)</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">❌</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">✅</span></p>
</td>
</tr>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">
<p><span style="font-weight: 400;">Additional UI controls</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">❌</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">✅</span></p>
</td>
</tr>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">
<p><span style="font-weight: 400;">Add attribution to stories</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">❌</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">✅</span></p>
</td>
</tr>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">
<p><span style="font-weight: 400;">Programmatically fetch more stories</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">❌</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">✅</span></p>
</td>
</tr>
<tr style="height: 31px;">
<td style="height: 31px; width: 332px;">
<p><span style="font-weight: 400;">Customize behavior (e.g. circular wrapping)</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">❌</span></p>
</td>
<td style="height: 31px; width: 95px;">
<p style="text-align: center;"><span style="font-weight: 400;">✅</span></p>
</td>
</tr>
</tbody>
</table>

# Common Implementations

You can use the web player to create a number of experiences in your own platform ranging from carousels to singleton cards to directly embedding the Story into a page. We have developed a [detailed UX guide](https://services.google.com/fh/files/events/web_stories_playbook_external.pdf#page=14) with best practices to go with these examples. The most common pattern that we recommend is a carousel. We will outline the best practices to create such an experience, but you should feel free to experiment and implement what works best for your use case. We will share a broader list of UX patterns in the coming weeks.

<!-----
NEW: Check the "Suppress top comment" to remove this info from the output.

Conversion time: 6.665 seconds.


Using this Markdown file:

1. Cut and paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* GDC version 1.1.19 r29
* Mon May 17 2021 15:26:26 GMT-0700 (Pacific Daylight Time)
* Source doc: https://docs.google.com/open?id=1TmVxugmpz7MN0gL3tilo2y141hsQ7HcuUXpOmw2R9Bo&resourcekey=0-SLmV5eJikc62esJTjVHYgA
----->


<p style="color: red; font-weight: bold">>>>>  GDC alert:  ERRORs: 0; WARNINGs: 0; ALERTS: 7.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>  GDC alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>
<a href="#gdcalert4">alert4</a>
<a href="#gdcalert5">alert5</a>
<a href="#gdcalert6">alert6</a>
<a href="#gdcalert7">alert7</a>

<p style="color: red; font-weight: bold">>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>



# Web Story Player - User’s guide

The Web Player has significantly matured (thanks for all the feedback and insights), and is in a great place for publishers, developers, tools and platforms to start using in their site experiences. This update recaps key capabilities from the Web Story Player, and provides guides on common implementation patterns.


## What is the Web Player?

The Web Story Player is the best way for you to give users a rich user experience on your sites using Web Stories.  Think of it like a video player: having a single video in your device is fine, but put it in a video player live on the web, and it unlocks a number of features and benefits: There’s additional controls (e.g. captions), it lives among millions of other videos that can provide related content at the end of your original video – which adds discoverability, and more.

You can think similarly of the web player. By only linking to a single story, you can miss out on a number of features and experiences that are found in other story platforms (e.g. Instagram, Snapchat) and are natural to story users. See table below for a few examples.


<table>
  <tr>
   <td>
   </td>
   <td><strong>Single Story</strong>
   </td>
   <td><strong>Web player</strong>
   </td>
  </tr>
  <tr>
   <td><strong>A richer user experience</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Swipe down to exit the Story and return t to your site
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Swipe to next / previous story
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Same-site entry points
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td><strong>Ability to customize</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Custom events (e.g. navigate between stories)
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Additional UI controls
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Add attribution to stories
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Programmatically fetch more stories
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Customize behavior (e.g. circular wrapping)
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
</table>



## Contents

Please refer to the document outline to get familiar with the contents of this document before diving into the next sections.


[TOC]



## Common implementations {#common-implementations}

You can use the web player to create a number of experiences in your own platform ranging from carousels to singleton cards to directly embedding the Story into a page. We have developed a [detailed UX guide](https://services.google.com/fh/files/events/web_stories_playbook_external.pdf#page=14) with best practices to go with these examples. The most common pattern that we recommend is a carousel. We will outline the best practices to create such an experience, but you should feel free to experiment and implement what works best for your use case. We will share a broader list of UX patterns in the coming weeks.


### Carousel ([UX details](https://services.google.com/fh/files/events/web_stories_playbook_external.pdf#page=39)) {#carousel-ux-details}

A carousel of stories has multiple stories next to each other. It generally includes a preview of the story like a thumbnail and title. When clicked, it will open the story. The user can then consume the story or swipe between stories.



    *   [Flagship example from playbook](https://000615502.deployed.codepen.website)

Important aspects to note on this sample:



*   On desktop:
    *   Entry points reveal background cards on hover
    *   Player has a [“close” button](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md#close) to exit the lightbox experience
    *   Player has a [“skip to next”](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md#skip-to-next) button to skip to the next story
*   On a mobile device:
    *   Entry point cards have smaller size than desktop
    *   There are no background cards (since there is no hover in mobile)
    *   Swiping is supported to navigate between stories
    *   Swiping down is enabled to close the story
    *   The [“scroll background page”](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md#page-scrolling) is disabled to yield that gesture for swiping to close
*   On both screen sizes:
    *   The player starts paused and only starts [playing](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md#playpause) once the user clicks on the entry point.


## Adding stories to the player {#adding-stories-to-the-player}

There are three main ways to add stories to the player.



1. Declaring them as anchor tags inside the player HTML.
2. Using the fetch behavior to fetch more stories from an endpoint.
3. Using the add() API to add a story or multiple stories.

If you only want to display a static set of stories in your player, your best option is (1). But if you want to dynamically add stories, you can do so with options (2) or (3).


### Display stories {#display-stories}

The simplest way to display and add stories to the player is to declare them directly in the HTML where the `<amp-story-player>` element is located as &lt;a> tags. See code sample in the “[Display a Web Story](https://amp.dev/documentation/guides-and-tutorials/integrate/embed-stories-nonamp/?format=stories#display-a-web-story)” section of the guide.


### Fetch more stories from an endpoint {#fetch-more-stories-from-an-endpoint}

You can create an "infinite scroll" experience as the user navigates through them in the Web Story Player. To do so, include the [fetch action](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#programmatically-fetching-more-stories) and specify an endpoint in the JSON configuration. The player automatically fetches more stories as the user gets closer to the last loaded story. You can customize fetched stories for users by setting up a backend personalization system and using the `fetch` action to serve them.


### Add stories using the add() API {#add-stories-using-the-add-api}

You can manually add a story or multiple stories using the [add() API](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#add).


## Customizable UI {#customizable-ui}

The player unlocks a number of features that allow you to customize the UI of the system display. In addition to controls, you can also add attribution for the stories inside the player, so that the user knows who published the story they are currently interacting with.


### Add attribution for creator / publisher {#add-attribution-for-creator-publisher}



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>  GDC alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")


_Creator’s title at the top of the story_

The story attribution displays the entity or publisher's name and logo. When clicked, it will navigate the user to either the entity's URL or the publisher's canonical domain.

To display the attribution on the stories, use the player's `display` and `attribution` options. See the [JSON configuration](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#json-configuration).

The data will come from the `<amp-story>`'s metadata attributes in the story's document as described:



*   For the logo: the `entity-logo-src` attribute (if provided), otherwise the `publisher-logo-src` attribute.
*   For the string of text: the `entity` attribute (if provided), otherwise the `publisher` attribute.
*   When the attribution is clicked, it will navigate the user to a URL. This will come from `entity-url` attribute if provided, otherwise it will use the story's canonical domain.

Read more about these attributes on the [Metadata Guidelines of amp-story.](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#metadata-guidelines)


### Modify & add existing controls {#modify-&-add-existing-controls}

This includes a “close” button for creating lightbox-like experiences and a “skip-to-next” button for navigating between stories on desktop. You can also add your own custom controls and listen to their events to perform custom actions.

See [examples](#example-#1-close-button-on-the-start-position) below to get an idea of what you can do.



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>  GDC alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")


<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>  GDC alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")


<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>  GDC alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")


To configure them, specify a JSON configuration with the `type=”application/json”` attribute as a child of the `&lt;amp-story-player>` element.

Inside the configuration, specify an array of “controls”. The “controls” structure is described below.

The configuration will end up looking like the following:


```
<amp-story-player>
 <script type="application/json">
   {
     "controls": [
       {
         "name": "close",
         "position": "start"
       },
       {
         "name": "skip-next"
       }
     ]
   }
 </script>
 <a href="./story1.html"> ... </a>
 <a href="./story2.html"> ... </a>
</amp-story-player>
```



#### Example #1 - Close button on the start position {#example-#1-close-button-on-the-start-position}

Since the default (when including a custom UI configuration JSON) will set all these buttons to the right, all we have to do is move the close button to the start.


<table>
  <tr>
   <td><code><amp-story-player> \
 &lt;script type="application/json"> \
   { \
     "controls": [ \
       { \
         "name": "close", \
         "position": "start" \
       } \
     ], \
   } \
 &lt;/script> \
 ... \
&lt;/amp-story-player></code>
   </td>
   <td>

<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>  GDC alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>> </span></p>


<img src="images/image5.png" width="" alt="alt_text" title="image_tooltip">

   </td>
  </tr>
</table>



#### Example #2 - Showing skip-to-next story on desktop {#example-#2-showing-skip-to-next-story-on-desktop}

On desktop, you can now display a button that navigates from the current story to the next one. It will also automatically be disabled once the user reaches the end of the stories in the player.


<table>
  <tr>
   <td><code><amp-story-player> \
 &lt;script type="application/json"> \
   { \
     "controls": [ \
       { \
         "name": "skip-next" \
       } \
     ], \
   } \
 &lt;/script> \
 ... \
&lt;/amp-story-player></code>
   </td>
   <td>

<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>  GDC alert: inline image link here (to images/image6.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>> </span></p>


<img src="images/image6.png" width="" alt="alt_text" title="image_tooltip">

   </td>
  </tr>
</table>



#### Example #3 - Changing the icon of the close button {#example-#3-changing-the-icon-of-the-close-button}


<table>
  <tr>
   <td><code><amp-story-player> \
 &lt;script type="application/json"> \
   { \
     "controls": [ \
       { \
         "name": "close", \
         "backgroundImageUrl": "https://example.com/assets/red-x.png", \
         "position": "start" \
       } \
     ] \
   } \
 &lt;/script> \
 ... \
&lt;/amp-story-player></code>
   </td>
   <td>

<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>  GDC alert: inline image link here (to images/image7.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>> </span></p>


<img src="images/image7.png" width="" alt="alt_text" title="image_tooltip">

   </td>
  </tr>
</table>



## Modify behavior {#modify-behavior}

There are a number of options for customizing the behavior of the player. Read through the following sections to get an idea of what you can do.


### Circular wrapping {#circular-wrapping}

If you want your users to go back to the first story after they finish the last one, you can enable the [circular wrapping option](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#circular-wrapping).


### Rewind stories on the background {#rewind-stories-on-the-background}

If you want to rewind the stories that users have already seen in the player, you can do so using the <code>[rewind() API](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#rewind)</code>.


### Programmatic navigation {#programmatic-navigation}

You can programmatically navigate between stories and pages inside of the player. This can be useful if you want to create your own navigational buttons outside the player, or if you want to switch between pages depending on an event, for example. To do so, use the [go()](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#go) and [show()](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#show) APIs and their variations.


## Optimize performance and SEO {#optimize-performance-and-seo}

The player does a number of things in the background to ensure it’s only using the resources it needs at any given moment. That being said, there’s a few things you can do on your end to make sure your site performs well while using the player.


### For players above the fold {#for-players-above-the-fold}

If you wish to embed stories above the fold (in the upper half of a web page; visible without scrolling down the page), we recommend waiting until a user interaction to load and play the first story. To do this, follow the following steps:



1. Disable autoplay with the JSON configuration.
2. Add a user interaction which will start playing the story.
3. Use the player API to call play() when the user interaction is detected.


### For players below the fold {#for-players-below-the-fold}

Players below the fold are automatically optimized for performance and will only preload the first story until a scroll is detected. Once the player is visible in the viewport, the story will start playing.

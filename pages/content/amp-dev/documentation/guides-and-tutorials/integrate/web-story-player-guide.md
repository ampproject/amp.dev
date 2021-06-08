---
$title: Creating Web Story experiences using the Web Story Player on non-AMP sites
description: 'The Web Story Player is the best way for you to give users a rich user experience on your sites using Web Stories.'
formats:
  - websites
  - stories
---


## What is the Web Story Player?

{{ image('/static/img/docs/web-player-main.gif', 750, 625, align='center', caption='Web Story Player demo', alt='web story player demo' ) }}

The Web Story Player is the best way for you to give users a rich user experience on your sites using Web Stories.  Think of it like a video player: having a single video in your device is fine, but put it in a video player live on the web, and it unlocks a number of features and benefits: There’s additional controls (e.g. captions), it lives among millions of other videos that can provide related content at the end of your original video – which adds discoverability, and more.

You can think similarly of the web story player. By only linking to a single story, you can miss out on a number of features and experiences that are found in other story platforms (e.g. Instagram, Snapchat) and are natural to story users. See table below for a few examples.

[tip type="note"]
This guide contains mainly features that are available on the non-AMP version of the player. To learn what's possible with the AMP-compatible version of the player, visit the [Integrate stories in AMP pages](https://amp.dev/documentation/guides-and-tutorials/integrate/embed-stories/?format=stories) article.
[/tip]


<table>
  <tr>
   <td>
   </td>
   <td><strong>Single Story</strong>
   </td>
   <td><strong>Web story player</strong>
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
   <td>Swipe down to exit the Story and return to your site
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

## Common implementations

You can use the web story player to create a number of experiences in your own platform ranging from carousels to singleton cards to directly embedding the Story into a page. We have developed a [detailed UX guide](https://services.google.com/fh/files/events/web_stories_playbook_external.pdf#page=14) with best practices to go with these examples. The most common pattern that we recommend is a carousel. We will outline the best practices to create such an experience, but you should feel free to experiment and implement what works best for your use case. We will share a broader list of UX patterns in the coming weeks.


### Carousel ([UX details](https://services.google.com/fh/files/events/web_stories_playbook_external.pdf#page=39))


{{ image('/static/img/docs/web-player-carousel.gif', 799, 792, align='center', caption='Web Story Player carousel', alt='web story player carousel of stories' ) }}


A carousel of stories has multiple stories next to each other. It generally includes a preview of the story like a thumbnail and title. When clicked, it will open the story. The user can then consume the story or swipe between stories.


[tip type="success"]

[See the demo live here!](https://000615502.deployed.codepen.website)

[/tip]

Important aspects in this sample:



*   On desktop:
    *   Player has a [“close” button](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md#close) to exit the lightbox experience
    *   Player has a [“skip to next”](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md#skip-to-next) button to skip to the next story
    *   Entry points reveal background cards on hover
*   On a mobile device:
    *   Swiping is supported to navigate between stories
    *   The [“scroll background page”](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md#page-scrolling) is disabled to yield that gesture for swiping to close
    *   Entry point cards have smaller size than desktop
    *   There are no background cards (since there is no hover in mobile)
    *   Swiping down is enabled to close the story
*   On both screen sizes:
    *   The player starts paused and only starts [playing](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md#playpause) once the user clicks on the entry point.
    *   The carousel follows the UX [best practices from the playbook](https://services.google.com/fh/files/events/web_stories_playbook_external.pdf#page=39).

To see the entire code required to build this, visit the [codepen project](https://codepen.io/maenrique/project/editor/ZMnWyV).


## Adding stories to the player

There are three main ways to add stories to the player.



1. Declaring them as anchor tags inside the player HTML.
2. Using the fetch behavior to fetch more stories from an endpoint.
3. Using the add() API to add a story or multiple stories.

If you only want to display a static set of stories in your player, your best option is (1). But if you want to dynamically add stories, you can do so with options (2) or (3).


### Display stories

The simplest way to display and add stories to the player is to declare them directly in the HTML where the `<amp-story-player>` element is located as `<a>` tags. See code sample in the “[Display a Web Story](https://amp.dev/documentation/guides-and-tutorials/integrate/embed-stories-nonamp/?format=stories#display-a-web-story)” section of the guide.


### Fetch more stories from an endpoint

You can create an "infinite scroll" experience as the user navigates through them in the Web Story Player. To do so, include the [fetch action](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#programmatically-fetching-more-stories) and specify an endpoint in the JSON configuration. The player automatically fetches more stories as the user gets closer to the last loaded story. You can customize fetched stories for users by setting up a backend personalization system and using the `fetch` action to serve them.


### Add stories using the add() API

You can manually add a story or multiple stories using the [add() API](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#add).


## Customizable UI

The player unlocks a number of features that allow you to customize the UI of the system display. In addition to controls, you can also add attribution for the stories inside the player, so that the user knows who published the story they are currently interacting with.


### Add attribution for creator / publisher


{{ image('/static/img/docs/story-attribution.png', 716, 1198, align='center third', caption='Attribution in web stories', alt='web story player showing story attribution' ) }}


_Creator’s title at the top of the story_

The story attribution displays the entity or publisher's name and logo. When clicked, it will navigate the user to either the entity's URL or the publisher's canonical domain.

To display the attribution on the stories, use the player's `display` and `attribution` options. See the [JSON configuration](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#json-configuration).

The data will come from the `<amp-story>`'s metadata attributes in the story's document as described:



*   For the logo: the `entity-logo-src` attribute (if provided), otherwise the `publisher-logo-src` attribute.
*   For the string of text: the `entity` attribute (if provided), otherwise the `publisher` attribute.
*   When the attribution is clicked, it will navigate the user to a URL. This will come from `entity-url` attribute if provided, otherwise it will use the story's canonical domain.

Read more about these attributes on the [Metadata Guidelines of amp-story.](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#metadata-guidelines)


### Modify & add existing controls

This includes a “close” button for creating lightbox-like experiences and a “skip-to-next” button for navigating between stories on desktop. You can also add your own custom controls and listen to their events to perform custom actions. See examples below to get an idea of what you can do.

To configure them, specify a JSON configuration with the `type=”application/json”` attribute as a child of the `<amp-story-player>` element.

Inside the configuration, specify an array of “controls”. The “controls” structure is described below.

The configuration will end up looking like the following:


```html
<amp-story-player>

 <script type="application/json">
   {
     "controls": [
       {
         "name": "close",
         "position": "start"
       },
       {
         "name": "skip-to-next"
       }
     ]
   }
 </script>

<a href="./story1.html"> ... </a>
<a href="./story2.html"> ... </a>
</amp-story-player>
```



#### Example #1 - Close button on the start position

Since the default (when including a custom UI configuration JSON) will set all these buttons to the right, all we have to do is move the close button to the start.

```html
<amp-story-player>
 <script type="application/json">
   {
     "controls": [
       {
         "name": "close",
         "position": "start"
       }
     ],
   }
 </script>
 ...
```
{{ image('https://github.com/ampproject/amphtml/blob/main/src/amp-story-player/img/lightbox-close-button.png?raw=true', 716, 1198, align='center third', caption='Close control of the player in the start position', alt='web story player showing custom controls' ) }}



#### Example #2 - Showing skip-to-next story on desktop

On desktop, you can now display a button that navigates from the current story to the next one. It will also automatically be disabled once the user reaches the end of the stories in the player.

```html
<amp-story-player>
 <script type="application/json">
   {
     "controls": [
       {
         "name": "skip-to-next"
       }
     ],
   }
 </script>
 ...
</amp-story-player>
```
{{ image('https://github.com/ampproject/amphtml/blob/main/src/amp-story-player/img/skip-next-desktop.png?raw=true', 1351, 962, align='center', caption='Skip-to-next control of the player', alt='web story player showing custom controls' ) }}


#### Example #3 - Changing the icon of the close button


```html
<amp-story-player>
 <script type="application/json">
   {
     "controls": [
       {
         "name": "close",
         "backgroundImageUrl": "data:image\/svg+xml;charset=utf-8,<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.77778 9.33333H4V4H9.33333V5.77778H5.77778V9.33333ZM4 14.6667H5.77778V18.2222H9.33333V20H4V14.6667ZM18.2222 18.2222H14.6667V20H20V14.6667H18.2222V18.2222ZM14.6667 5.77778V4H20V9.33333H18.2222V5.77778H14.6667Z\" fill=\"white\"\/><\/svg>",
         "position": "start"
       }
     ]
   }
 </script>
 ...
</amp-story-player>
```
{{ image('https://github.com/ampproject/amphtml/blob/main/src/amp-story-player/img/close-button-custom-background.png?raw=true', 716, 1198, align='center third', caption='Close control of the player with custom icon', alt='web story player showing custom controls' ) }}



## Modify behavior

There are a number of options for customizing the behavior of the player. Read through the following sections to get an idea of what you can do.


### Circular wrapping

If you want your users to go back to the first story after they finish the last one, you can enable the [circular wrapping option](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#circular-wrapping).


### Rewind stories on the background

If you want to rewind the stories that users have already seen in the player, you can do so using the <code>[rewind() API](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#rewind)</code>.


### Programmatic navigation

You can programmatically navigate between stories and pages inside of the player. This can be useful if you want to create your own navigational buttons outside the player, or if you want to switch between pages depending on an event, for example. To do so, use the [go()](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#go) and [show()](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md#show) APIs and their variations.


## Optimize performance and SEO

The player does a number of things in the background to ensure it’s only using the resources it needs at any given moment. That being said, there’s a few things you can do on your end to make sure your site performs well while using the player.


### For players above the fold

If you wish to embed stories above the fold (in the upper half of a web page; visible without scrolling down the page), we recommend waiting until a user interaction to load and play the first story. To do this, follow the following steps:



1. Disable autoplay with the JSON configuration.
2. Add a user interaction which will start playing the story.
3. Use the player API to call play() when the user interaction is detected.


### For players below the fold

Players below the fold are automatically optimized for performance and will only preload the first story until a scroll is detected. Once the player is visible in the viewport, the story will start playing.

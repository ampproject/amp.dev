---
$title: Embed Web Stories in non-AMP pages
$order: 4
description: 'The AMP Story Player enables you to embed stories that users are able to tap or click through, inside of a web page. Follow this step-by-step guide to learn how.'
formats:
  - websites
  - stories
---

Web Stories are a full-screen immersive content experience that user’s tap or click through at their own pace. They live on the open web with their own URL, making them easily shareable. This guide teaches you how to embed Web Stories in a non-AMP page and surface them to readers. 

[example preview="top-frame" playground="true"]
```html
<!DOCTYPE html>
<html>
  <head>
    <script
      async
      src="https://cdn.ampproject.org/amp-story-player-v0.js"
    ></script>
    <link
      href="https://cdn.ampproject.org/amp-story-player-v0.css"
      rel="stylesheet"
      type="text/css"
    />
    <style>
      header {
        height: 8vh;
        color: #545454;
        background-color: #DDB556;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      amp-story-player {
        margin: 1rem auto;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>
        Page Header
      </h1>
    </header>
    <h1>
      Article Title
    </h1>
    <p>
      Doggo ipsum smol wow very biscit length boy, doing me a frighten. Borking
      doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin
      angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer
      pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler
      shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow
      very biscit heckin angery woofer he made many woofs, snoot heckin good
      boys shoober wrinkler. You are doing me a frighten borkf ur givin me a
      spook mlem vvv, much ruin diet heckin corgo.
    </p>
    <amp-story-player style="width: 370px; height: 622px;">
      <script type="application/json">
        {
          "behavior": {
            "autoplay": true
          }
        }
      </script>

      <a
        href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
      >
      <img data-amp-story-player-poster-img src="https://amp.dev/static/samples/img/story_dog2_portrait.jpg" width="370" height="622" loading="lazy">
        Stories in AMP - Hello World
      </a>
    </amp-story-player>
    <p>
      Such treat big ol pupper. Adorable doggo super chub bork yapper clouds
      very good spot stop it fren very hand that feed shibe borkf heckin good
      boys long water shoob, the neighborhood pupper heck the neighborhood
      pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol
      borking doggo with a long snoot for pats boof thicc adorable doggo, much
      ruin diet h*ck many pats.
    </p>
  </body>
</html>
```
[/example]

# Include the Web Story Player

Web Stories rely on the AMP Story Player, in the form of the `<amp-story-player>` element, to embed and play stories on non-AMP sites. Implement the `amp-story-player` element by including the following two scripts in the head of your document:

`<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>`

`<link href="https://cdn.ampproject.org/amp-story-player-v0.css" rel="stylesheet" type="text/css">`

The first script imports the logic for the AMP Story Player. The second script sets the default styling. 

After including each script, include an `<amp-story-player>` element inside the document body.

```html
<amp-story-player style="width: 370px; height: 622px;">
      <a
        href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
      >
      <img data-amp-story-player-poster-img src="https://amp.dev/static/samples/img/story_dog2_portrait.jpg" width="370" height="622" loading="lazy">
        Stories in AMP - Hello World
      </a>
  </amp-story-player>
```

## Size the Web Story Player

You may define the story player's width, height, and other styles inline or as you would any other element's style.

```html
<body>
...
  <amp-story-player style="width: 370px; height: 622px;">
...
  </amp-story-player>
...
</body>
```

We recommend maintaining a 69:116 aspect ratio for the best user experience, but you may define any width and height.


### Responsive sizing

The story player's responsiveness works as any other block element. Use CSS to maintain width and height ratios, such as the example below:
html
```
<amp-story-player style="width: 50vw; height: 84.05vw;">
  ...
</amp-story-player>
```

# Display a Web Story 

Link to a Web Story by including an `<a>` tag with the `href` attribute pointed to the desired Web Story URL within the `<amp-story-player>` element. The `href` endpoint may be the URL of a hosted Web Story or a relative path. Place the title of the story within the `<a>` tags.

[example preview="top-frame" playground="true"]
```html
<!DOCTYPE html>
<html>
  <head>
    <script
      async
      src="https://cdn.ampproject.org/amp-story-player-v0.js"
    ></script>
    <link
      href="https://cdn.ampproject.org/amp-story-player-v0.css"
      rel="stylesheet"
      type="text/css"
    />
    <style>
      header {
        height: 8vh;
        color: #545454;
        background-color: #DDB556;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      amp-story-player {
        margin: 1rem auto;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>
        Page Header
      </h1>
    </header>
    <h1>
      Article Title
    </h1>
    <amp-story-player style="width: 370px; height: 622px;">
      <a href="https://ampfest-story-player-demo.web.app/examples/amp-story/AMPFestPlayerDemo/s3">
        <img src="https://ss.makestories.io/get?story=-MHy2RL_9ZnDFYTFB2PY&version=1600916568756" loading="lazy" data-amp-story-player-poster-img width="370" height="622"></img>
      </a>
    </amp-story-player>
  </body>
</html>
```
[/example]

## Configure the Web Story Player behavior

Specify Web Story Player behavior in a JSON configuration:

```html
<amp-story-player style="width: 370px; height: 622px;">
<script type="application/json">
    {
      "behavior": {
        "autoplay": false
      }
    }
  </script>
...
</amp-story-player>
```

The Web Story Player displays the cover page of the embedded story. If you want the Player to display the Web Story the same as it would appear when sent as a direct link, set `autoplay` to be true. If you want to wait for the user to click on a UI element, such as a play icon, set `autoplay` to false and then call the `play()` action manually upon user interaction. 

[tip type="note"]
Setting `autoplay` to true in the Web Story Player does not auto-advance story pages in individual Web Stories. Auto page advancement is defined on each Web Story and cannot be overridden by the Web Story Player.
[/tip]


## Provide a placeholder

Include a representative poster image by adding an `<img>` tag as a child of the story's `<a>` tag with the following configuration. The AMP story player displays this image while loading the full story.


```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img src="https://www.example.com/assets/cover1.html" loading="lazy" width="100%" height="100%" data-amp-story-player-poster-img>
    A title that describes this story.
  </a>
</amp-story-player>
```


For the best user experience, we strongly recommend including a poster image. If you do not include a poster image the story player will display a loader spinner with a grey background.


## Specify multiple Web Stories

Include the desired number of `<a>` tags, with each `href` attribute pointed to the desired Web Story URL, within the `<amp-story-player>` element.

[example preview="top-frame" playground="true"]
```html
<!DOCTYPE html>
<html>
  <head>
    <script
      async
      src="https://cdn.ampproject.org/amp-story-player-v0.js"
    ></script>
    <link
      href="https://cdn.ampproject.org/amp-story-player-v0.css"
      rel="stylesheet"
      type="text/css"
    />
    <style>
      header {
        height: 8vh;
        color: #545454;
        background-color: #DDB556;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      amp-story-player {
        margin: 1rem auto;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>
        Page Header
      </h1>
    </header>
    <h1>
      Article Title
    </h1>
    <amp-story-player style="width: 370px; height: 622px;">
      <a href="https://ampfest-story-player-demo.web.app/examples/amp-story/AMPFestPlayerDemo/s1"></a>
      <a href="https://ampfest-story-player-demo.web.app/examples/amp-story/AMPFestPlayerDemo/s2"></a>
      <a href="https://ampfest-story-player-demo.web.app/examples/amp-story/AMPFestPlayerDemo/s3"></a>
    </amp-story-player>
  </body>
</html>
```
[/example]


The Web Story Player displays the first embedded story. It automatically presents the user with the next story’s cover page after finishing the previous, or using the swiping motion to skip. The Web Story Player does not have any built-in UI functionality to inform the user there are multiple stories embedded in a single player. Instead, build [user entry points](#user-entry-points) to display available stories and allow user selection.  


### Circular story wrapping

You can create a circular consumption of a set of stories by adding the `circular-wrapping` action to the JSON configuration. When `circular-wrapping` is included, the Web Story Player displays the first story to users after they finish the last story.

```html
<amp-story-player>
 <script type="application/json">
   {
     "behavior": {
       "on": "end",
       "action": "circular-wrapping"
     }
   }
 </script>
 <a href="./story1.html"> ... </a>
 <a href="./story2.html"> ... </a>
  ...
</amp-story-player>
``` 

The JSON configuration must be a direct child of the `<amp-story-player>` element and include the `type="application/json"` attribute. 


### Infinite stories

You can create an "infinite scroll" experience by fetching more stories as the user navigates through them in the Web Story Player. To do so, include the `fetch` action and specify an endpoint in the JSON configuration. The player automatically fetches more stories as the user gets closer to the last loaded story. 

```html
<amp-story-player>
 <script type="application/json">
   {
     "behavior": {
       "on": "end",
       "action": "fetch",
       "endpoint": "https://example.com/my-endpoint.json?offset=${offset}"
     }
   }
 </script>
 <a href="./story1.html"> ... </a>
 <a href="./story2.html"> ... </a>
  ...
```

The JSON configuration must be a direct child of the `<amp-story-player>` element and include the `type="application/json"` attribute. For pagination, use the optional `endpoint` url variable `${offset}`  to add a parameter. The Web Story Player replaces `${offset}` with the actual offset. For example, if the publisher provides `https://example.com/my-endpoint.json?offset=${offset}` and the Web Story Player has 5 stories loaded, it sends `https://example.com/my-endpoint.json?offset=5`.

#### Response


The Web Story Player expects a JSON containing an array of story objects as a response.

```
[
  {
    "href": "https://example.com/story3.html",
    "title": "My third cool story", // optional
    "posterImage": "https://example.com/assets/story3.png" // optional
  },
  {
    "href": "https://example.com/story4.html",
    "title": "My fourth cool story", // optional
    "posterImage": "https://example.com/assets/story4.png" // optional
  }
]
```



`href`

The URL where your story is located.

`title` (optional)

The title of your story.

`posterImage` (optional)

The poster image of your story.


# Customize Web Story Player UI

You may customize the controls of the Web Story Player UI. You can add new control buttons, and change their position or look. Controls are configured as JSON with `type="application/json"` as a child of the `<amp-story-player>` element. Include an array of desired "controls".

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
         "name": "skip-next"
       }
     ]
   }
 </script>
<a href="./story1.html"> ... </a>
<a href="./story2.html"> ... </a>
</amp-story-player>
```

## Close control

By default, the Web Story Player does not include a close control. You may add a close icon to the Web Story Player by specifying a control object with the “close” name. This is recommended when using the player in implementations that display the player in a lightbox or fullscreen view. 

The “close” control supports the following customizable properties:

*   `position`: “start” or “end”.
    *   Positions the icon either on the left (“start”) or right (“end”) on LTR languages.
    *   Positions the icon on either the  left (“end”) or right (“start”) on RTL languages.
*   `visibility`: “hidden” or “visible” (default).
    *   Toggles the control’s visibility. If omitted, the default is visible.
*   `backgroundImageUrl`: string with url or data string (escaped).
    *   Changes the icon image to the provided url or data string (for inline svgs).

The close button dispatches the `amp-story-player-close` event when clicked/tapped by the user. 

```html
<amp-story-player>
 <script type="application/json">
   {
     "controls": [
       {
         "name": "close",
         "backgroundImageUrl": "data:image\/svg+xml;charset=utf-8,<\/svg>",
         "position": "start"
       }
     ]
   }
 </script>
<a href="./story1.html"> ... </a>
<a href="./story2.html"> ... </a>
</amp-story-player>
```

{{ image('/static/img/docs/close-button-custom-background.png', 363, 603, layout='intrinsic', alt='close control with custom background' ) }}

## Share control

The share control is visible in all stories, but you may customize the look and position.

The “share” control supports the following customizable properties:

*   `position`: “start” or “end”.
    *   Positions the icon either on the left (“start”) or right (“end”) on LTR languages.
    *   Positions the icon on either the  left (“end”) or right (“start”) on RTL languages.
*   `visibility`: “hidden” or “visible” (default).
    *   Toggles the control’s visibility. If omitted, the default is visible.
*   `backgroundImageUrl`: string with url or data string (escaped).
    *   Changes the icon image to the provided url or data string (for inline svgs).


## Skip-next control

Add a control that skips to the next story inside the player by specifying a control object with the “skip-next” name. This feature is only available on desktop, as mobile users may use the “swipe” gesture to skip to the next story. 

The “skip-next” control supports the following customizable properties:

*   `position`: “start” or “end”.
    *   Positions the icon either on the left (“start”) or right (“end”) on LTR languages.
    *   Positions the icon on either the  left (“end”) or right (“start”) on RTL languages.
*   `visibility`: “hidden” or “visible” (default).
    *   Toggles the control’s visibility. If omitted, the default is visible.
*   `backgroundImageUrl`: string with url or data string (escaped).
    *   Changes the icon image to the provided url or data string (for inline svgs).

## Custom control

Add a custom control to the Web Story Player by specifying the following required properties:



*   name: a string with the name of the control. e.g. “lightbox”. The dispatched event will depend on this name. The custom event will be the name of the control prefixed with amp-story-player-\*. E.g. amp-story-player-lightbox.
*   `backgroundImageUrl`: string with url or data string (escaped).
    *   Changes the icon image to the provided url or data string (for inline svgs).

```html
 <script type="application/json">
   {
     "controls": [
       {
         "name": "custom-control",
         "backgroundImageUrl": "data:image\/svg+xml;charset=utf-8,<\/svg>"
       }
     ],
   }
 </script>
```

The event custom controls dispatch depends on the name property. Events are with prefixed with “amp-story-player-\*" and then the name of the custom control. For example, “custom-control” dispatches the event “amp-story-player-custom-control”.


```html
const player = document.body.querySelector("amp-story-player");

// Listen to when the specified control was clicked.
player.addEventListener("amp-story-player-custom-control", () => {
  // This will trigger when the control with the "custom-control" name is clicked.
  performCustomAction();
});

```

You may further personalize custom controls with the following optional properties:

*   `position`: “start” or “end”.
    *   Places the icon either on the left or right on LTR languages.
*   `visibility`: “hidden” or “visible” (default).
    *   Toggles the control’s visibility. If omitted, the default is visible.


# Web Story Player interactivity

You may call the [Web Story Player’s methods](https://github.com/ampproject/amphtml/blob/master/spec/amp-story-player.md#programmatic-control) to programmatically control the player. These methods include when to initialize the player, muting the audio, and pausing the story.

```js
const playerEl = document.body.querySelector('amp-story-player');
playerEl.play()
```

Available methods are exposed on the HTML element: 

```html
const playerEl = document.querySelector('amp-story-player')
```

When creating a player dynamically, such as `document.createElement('amp-story-player')`, you may use the global class variable `AmpStoryPlayer` to load the player manually. 

```html
const player = new AmpStoryPlayer(window, playerEl)
```

[tip type="note"]
The element must be connected to the DOM before calling `load()`.
[/tip]

See the list of methods in the [Web Story Player spec](https://github.com/ampproject/amphtml/blob/master/spec/amp-story-player.md#programmatic-control).


# Interactive events

The Web Story Player dispatches events you can listen for and react to. Use these events to create interactive experiences and track analytics. The full list of events can be found on the [Web Story Player spec](https://github.com/ampproject/amphtml/blob/master/spec/amp-story-player.md#custom-events). 

In the example below, we use the `page-attachment-close`, `page-attachment-open` and `amp-story-player-back` events to change the background of a different element on our page.


```
player.addEventListener('page-attachment-close', () => {
  textEl.style.backgroundColor = 'blue';
})
player.addEventListener('page-attachment-open', () => {
  textEl.style.backgroundColor = 'red';
})
player.addEventListener('amp-story-back', () => {
  textEl.style.backgroundColor = 'green';
})
```

# User entry points <a name="user-entry-points"></a>

Now that you have your Web Story Player displaying your stories, you must introduce them to your site users via entry points. The examples below display common patterns, but there are many ways you can create entry points on your website.

<!-- TODO: Update with amp.dev example when added -->
[This example displays available stories in a carousel with circular avatars](https://codepen.io/maenrique/pen/wvWjNYr). When the user selects an avatar, the Web Story Player begins playing that story.

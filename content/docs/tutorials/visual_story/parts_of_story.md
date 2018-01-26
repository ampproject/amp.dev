---
$title: Understanding the parts of an AMP Story
$order: 2
---

An AMP Story is a full-screen visual storytelling experience that conveys information with images, videos, graphics, audio, and more. It's perfect for users who want bite-sized, visually-rich content.  

The basic ingredients that go into an AMP Story are individual **pages**. These pages, in turn, are composed of individual **layers** that contain basic HTML and AMP **elements**.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Each of those ingredients are translated into AMP components, where the story is represented by `amp-story`, the page is represented by `amp-story-page`, and the layers are represented by `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}


## Starting our story

An entire story is represented by the `amp-story` component, which serves as a container for all the pages in a story.  The `amp-story` component is also responsible for creating the UI shell, including handling gestures and navigation.

The `amp-story` component is a custom AMP component, and like all custom components, you must add the associated script for the component to the AMP document.

**Open** the `pets.html` file in your text editor, and in the `<head>` section, **add** the following script: 

```html hl_lines="2 3"
<head>
<script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-0.1.js"></script>
</head>
```

**Add** the `<amp-story>` element to the `<body>` of your document, and specify the mandatory `standalone` attribute, like so:

```html hl_lines="2 3" 
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

It's important to note that to have a valid AMP story, the `<body>` element must have only one child&mdash;the `<amp-story>` component; all other elements are contained in the `<amp-story>`.

At this point, we have a shell of a story.  The story isn't valid because it needs pages, at least one page. Let's create that page.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/docs/tutorials/visual_story/setting_up.html"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="/docs/tutorials/visual_story/create_cover_page.html"><span class="arrow-next">Next</span></a>
</div>

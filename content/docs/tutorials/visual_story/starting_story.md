---
$title: Starting our story
$order: 3
---

An entire story is represented by the `amp-story` component, which serves as a container for all the pages in a story.  The `amp-story` component is also responsible for creating the UI shell, including handling gestures and navigation.

The `amp-story component` is a custom AMP component, and like all custom components, you must add the associated script for the component to the AMP document.  Open the pets.html file in your text editor, and in the `<head>` section, add the following script: 

```html hl_lines="2 3"
<head>
<script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-0.1.js"></script>
</head>
```

Add the `<amp-story>` element to the `<body>` of your document, and specify the mandatory `standalone` attribute, like so:

```html hl_lines="2 3" 
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

It's important to note that to have a valid AMP story, the `<body>` element must have only one child--the `<amp-story>` component; all other elements are contained in the `<amp-story>`. At this point, we have a shell of a story.  The story isn't valid because it needs pages, at least one page. Let's create that page.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/docs/tutorials/visual_story/parts_of_story.html"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="/docs/tutorials/visual_story/create_cover_page.html"><span class="arrow-next">Next</span></a>
</div>

---
$title: Creating the bookend
$order: 7
description: Now that you've added all of your pages, let's look at the last screen of the story, the bookend. This last screen wraps up the story ...
author: bpaduch
---

Now that you've added all of your pages, let's look at the last screen of the story, the "bookend".  This last screen wraps up the story, and allows you to provide social sharing and related links to your story, so users can share your story or dive further into other content on your site.

The information on the bookend screen comes from a JSON file that's specified in the `<amp-story-bookend>` tag. For our tutorial, we already have a JSON file ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) that contains the bookend data.

The `<amp-story-bookend>` tag must be the last tag in [`<amp-story>`](../../../../documentation/components/reference/amp-story.md). So, let's **add** `<amp-story-bookend></amp-story-bookend>` just before the ending [`</amp-story>`](../../../../documentation/components/reference/amp-story.md) tag.  In the `amp-story-bookend` tag, point the `src` attribute to the `bookend.json` file and set `layout="nodisplay"`:

```html hl_lines="2"
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

If you refresh your browser and go to the last screen, you'll see the following bookend:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

Let's look at the JSON file.  Open the [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) file in your text editor.

Every bookend screen requires a `bookendVersion`, which is `v1.0` for this tutorial:

```json
"bookendVersion": "v1.0",
```

Social share buttons allow readers to share your content through social platforms, like Twitter, Facebook, Pinterest, and so on. You specify social share providers in a shareProviders object, and create an array containing [type names](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) for each of the social platforms.

For this tutorial, we chose Facebook, Twitter, and email for our share providers:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

The rest of the bookend screen is for related content.  All related content is contained in a `components` object.

There are various components that you can use to display related content and links; each component is specified with a type attribute. Let's look at the available components:

<table>
<thead>
<tr>
  <th width="20%">Type</th>
  <th>Description</th>
</tr>

</thead>
<tbody>
  <tr>
    <td>heading</td>
    <td>Allows you to specify a heading to group articles.
  <pre class="nopreline">
  {
    "type": "heading",
    "text": "More to read"
  },
  </pre>
    <br>
    <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="bookend heading"></amp-img>
    </figure>
    </td>
  </tr>
  <tr>
    <td>small</td>
    <td>Allows you to link to related articles with the option to include an associated small image.
  <pre class="nopreline">
  {
    "type": "small",
    "title": "Learn about cats",
    "url": "https://wikipedia.org/wiki/Cat",
    "image": "assets/bookend_cats.jpg"
  },
  </pre>
    <br>
    <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="bookend small article"></amp-img>
    </figure>
  </td>
  </tr>
  <tr>
    <td>landscape</td>
    <td>Allows you to link to articles or other content, like videos. The image associated with this type is larger and in landscape format.
  <pre class="nopreline">
  {
    "type": "landscape",
    "title": "Learn about border collies",
    "url": "https://wikipedia.org/wiki/Border_Collie",
    "image": "assets/bookend_dogs.jpg",
    "category": "Dogs"
  },
  </pre>
    <br>
    <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="bookend landscape article"></amp-img>
    </figure>
    </td>
  </tr>
  <tr>
    <td>portrait</td>
    <td>Allows you to link to stories or other content.  The image associated with this type is larger and in portrait format.
  <pre class="nopreline">
  {
    "type": "portrait",
    "title": "Learn about macaws",
    "url": "https://wikipedia.org/wiki/Macaw",
    "image": "assets/bookend_birds.jpg",
    "category": "birds"
  },
  </pre>
    <br>
    <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="bookend portrait article"></amp-img>
    </figure>
    </td>
  </tr>
  <tr>
    <td>cta-link</td>
    <td>Allows you to specify calls to action links that are displayed as buttons (e.g., read more, Subscribe).
  <pre class="nopreline">
  {
    "type": "cta-link",
    "links": [
      {
        "text": "Learn more",
        "url": "https://amp.dev/about/stories.html"
      }
    ]
  }
  </pre>
    <br>
    <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="bookend cta"></amp-img>
    </figure>
    </td>
  </tr>
</tbody>
</table>

There's more to learn about the bookend component. For details, see the [`amp-story`](../../../../documentation/components/reference/amp-story.md) reference documentation.

Our story is nearly complete.  Before we can publish our content, let's check that our AMP HTML is valid.

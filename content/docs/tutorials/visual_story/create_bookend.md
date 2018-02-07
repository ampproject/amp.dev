---
$title: Creating the bookend
$order: 6
---

Now that you've added all of your pages, let's look at the last screen of the story, the "bookend".  This last screen wraps up the story, and allows you to provide social sharing and related links to your story, so users can share your story or dive further into other content on your site.

The information on the bookend screen comes from a JSON file that's specified by the `bookend-config-src` attribute in the `<amp-story>` component.  

For our tutorial, we already have a JSON file ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) that contains the bookend data. In your `amp-story element`, **add** the  `bookend-config-src` attribute and point it to the `bookend.json` file, like so:

```html hl_lines="2"
<amp-story standalone
    bookend-config-src="bookend.json">
    ...
</amp-story>
```

If you refresh your browser and go to the last screen, you'll see the following bookend:

{{ image('/static/img/docs/tutorials/amp_story/pg6-bookend.png', 720, 1280, align='center third', alt='Bookend' ) }}

Let's look at the JSON file.  Open the [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) file in your text editor.

```json
{
  "share-providers": {
    "facebook": true,
    "twitter": true,
    "email": true
  },
  "related-articles": {
    "Articles": [
      {
        "title": "Pet adoption",
        "url": "https://en.wikipedia.org/wiki/Pet_adoption",
        "image": "/assets/related-dogs.jpg"
      },
      {
        "title": "Learn about cats",
        "url": "https://en.wikipedia.org/wiki/Cat",
        "image": "/assets/related-cats.jpg"
      }
    ]
  }
}
```

The three social share buttons (Facebook, Twitter, Email) that display on the bookend screen are specified in the `share-providers` object.  Each social share provider has a specific [type name](/docs/reference/components/amp-social-share#pre-configured-providers) with the value set to `true`.

Our related articles are specified in the `related-articles` object.  Within this object, we specified a single array named "Articles", which represents a section on that screen; it's also the heading name for that section.  Then we provided the articles we want to link to, with the following properties:

* `title`: Represents the title of the article or link
* `url`: A URL to the article or link
* `image`: A URL to an image for the specified article or link  (optional) 

Our story is nearly complete.  Before we can publish our content, let's check that our AMP HTML is valid.


<div class="prev-next-buttons">
  <a class="button prev-button" href="/docs/tutorials/visual_story/animating_elements.html"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="/docs/tutorials/visual_story/validation.html"><span class="arrow-next">Next</span></a>
</div>

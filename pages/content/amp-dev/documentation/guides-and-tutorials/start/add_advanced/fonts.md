---
$title: Adding fonts
$order: 6
---

In AMP, to keep the load times of documents as fast as possible, you cannot include external stylesheets. However, there is one exception to this rule&mdash;**fonts**.

You can embed custom fonts into your AMP page in two ways:

1. Through a `<link>` tag: for white-listed font providers only.
2. By using the `@font-face` CSS rule: there are no restrictions, all fonts are allowed.

In this tutorial, we'll use a `<link>` tag to add fonts to our page. **Add** a stylesheet link in the `<head>` to request the Raleway font:

```html
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway">
```

Now, **update** your CSS `body` selector to include a reference to Raleway:

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**Refresh** your page and check out your page’s new look. Also, inspect the AMP validator’s output.  There should be no errors for this external stylesheet request.

[tip type="note"]
Including a font in your document doesn’t require any additional components. Having said that, there is a component named [`amp-font`](/docs/reference/components/amp-font.html). The `amp-font` component isn’t used to load web fonts, instead you can use it to detect whether a web font has successfully loaded or not and respond appropriately, if necessary.

You can use amp-font to hide your text until your font is fully loaded so that the user doesn’t see the text snap from its temporary font to its true font. In the case where the font fails to load, you might want to just reveal the temporary font instead. After all, the worst scenario would be if the user didn’t get to read any text! Learn more by reading the [`amp-font`](/docs/reference/components/amp-font.html) reference documentation.
[/tip]

You've completed your AMP news article! Here's what it should look like:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">Next</span></a>
</div>

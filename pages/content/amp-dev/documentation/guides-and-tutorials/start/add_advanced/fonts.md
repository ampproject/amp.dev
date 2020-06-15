---
$title: Adding fonts
$order: 6
description: 'You can embed custom fonts into your AMP page in two ways: 1. Through a <link> tag: for allow-listed font providers only. 2. By using ...'
---

In AMP, to keep the load times of documents as fast as possible, you cannot include external stylesheets. However, there is one exception to this rule&mdash;**fonts**.

You can embed custom fonts into your AMP page in two ways:

1. Through a `<link>` tag: for allow-listed font providers only.
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
Web fonts can be detrimental to a web site's performance, even on an otherwise fast AMP site. Use the [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) CSS property to optimize the loading behaviour of your fonts.
[/tip]

You've completed your AMP news article! Here's what it should look like:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}

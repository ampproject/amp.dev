---
$title: Adding style
$order: 3
description: 'AMP pages are web pages—any styling to the page and its elements is done using standard CSS properties.'
author: crystalonscript
---

AMP pages are web pages—any styling to the page and its elements is done using standard CSS properties. However, AMP requires that all CSS is included within a custom `style` tag in the head of the document, called `<style amp-custom>`. The `<style amp-custom>` tag must go inside the`<head>` of the document. Styles may also be defined inlined if needed. Try adding the following styles to your page:

```css
  <style amp-custom>
    h1 {
      margin: 1rem;
    }
     body {
      background-color: blue;
    }
  </style>
```

AMP allows almost all CSS, but there are a few selectors that must be avoided.[ Learn about those and more about styling in AMP here](https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/style_pages/?format=websites).
---
$title: Starter code
$order: 1
description: 'The following markup is a basic AMP page.'
author: crystalonscript
---

The following markup is a basic AMP page.

[example playground="true"]
```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup/">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1 id="hello">Hello AMPHTML World!</h1>
  </body>
</html>
```
[/example]

The body content is pretty straightforward, but there’s some additional code in the head. The required markdown is broken down in the table below. Each AMP HTML document must:

<table>
  <tr>
   <td>Rule
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>Start with the &lt;!doctype html> doctype.
   </td>
   <td>Standard for HTML.
   </td>
  </tr>
  <tr>
   <td>Contain a top-level &lt;html ⚡> tag
<p>
(&lt;html amp> is accepted as well).
   </td>
   <td>Identifies the page as AMP content.
   </td>
  </tr>
  <tr>
   <td>Contain &lt;head> and &lt;body> tags.
   </td>
   <td>While optional in HTML, this is required in AMP.
   </td>
  </tr>
  <tr>
   <td>Contain a &lt;meta charset="utf-8"> tag right after the &lt;head> tag.
   </td>
   <td>Identifies the encoding for the page.
   </td>
  </tr>
  <tr>
   <td>Contain a &lt;script async src="https://cdn.ampproject.org/v0.js">&lt;/script> tag inside the &lt;head> tag. As a best practice, you should include the script as early as possible.
   </td>
   <td>Includes and loads the AMP JS library.
   </td>
  </tr>
  <tr>
   <td>Contain a &lt;link rel="canonical" href="$SOME_URL"> tag inside their &lt;head>.
   </td>
   <td>the <code>href</code> attribute should point to the page itself. This section exists for legacy reasons. 
   </td>
  </tr>
  <tr>
   <td>Contain a &lt;meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"> tag inside their &lt;head> tag.
   </td>
   <td>Specifies a responsive viewport. Learn more in <a href="https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/responsive_design/?format=websites">Create Responsive AMP Pages</a>.
   </td>
  </tr>
  <tr>
   <td>Contain the <a href="https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites">AMP boilerplate code</a> in their &lt;head> tag.
   </td>
   <td>CSS boilerplate to initially hide the content until AMP JS is loaded.
   </td>
  </tr>
</table>

Open this document in the [AMP playground](https://playground.amp.dev/) to get started building our page!
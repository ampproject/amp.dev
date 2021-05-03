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
   <td>Start with the <code>&lt;!doctype html></code> doctype.
   </td>
   <td>Standard for HTML.
   </td>
  </tr>
  <tr>
   <td>Contain a top-level <code>&lt;html ⚡></code> or <code>&lt;html amp> tag.
   </td>
   <td>Identifies the page as AMP content.
   </td>
  </tr>
  <tr>
   <td>Contain <code>&lt;head></code> and <code>&lt;body></code> tags.
   </td>
   <td>While optional in HTML, this is required in AMP.
   </td>
  </tr>
  <tr>
   <td>Contain a <code>&lt;meta charset="utf-8"></code> tag right after the <code>&lt;head></code> tag.
   </td>
   <td>Identifies the encoding for the page.
   </td>
  </tr>
  <tr>
   <td>Contain a <code>&lt;script async src="https://cdn.ampproject.org/v0.js">&lt;/script></code<>> tag inside the <code>&lt;head></code> tag. As a best practice, you should include the script as early as possible.
   </td>
   <td>Includes and loads the AMP JS library.
   </td>
  </tr>
  <tr>
   <td>Contain a <code>&lt;link rel="canonical" href="$SOME_URL"></code> tag inside their <code>&lt;head></code>.
   </td>
   <td>the <code>href</code> attribute should point to the page itself. This section exists for legacy reasons. 
   </td>
  </tr>
  <tr>
   <td>Contain a <code>&lt;meta name="viewport" content="width=device-width" /></code> tag inside their <code>&lt;head></code> tag.
   </td>
   <td>Specifies a responsive viewport. Learn more in <a href="../../develop/style_and_layout/responsive_design.md">Create Responsive AMP Pages</a>.
   </td>
  </tr>
  <tr>
   <td>Contain the <a href="../../learn/spec/amp-boilerplate.md">AMP boilerplate code</a> in their <code>&lt;head></code> tag.
   </td>
   <td>CSS boilerplate to initially hide the content until AMP JS is loaded.
   </td>
  </tr>
</table>

Click "Open this snippet in playground" under the example above to get started building our page! 

[tip type="note"]
  If you want to skip ahead, you can view the [finished tutorial code here](publish.md)!
[/tip]
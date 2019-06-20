---
$title: AMP for Email Fundamentals 
$order: 1
author: CrystalOnScript
formats:
  - email
---

If you're familiar with AMP, great news! AMP for Emails is just a subset of the AMP HTML library. If you're unfamiliar with AMP, also great news! This guide will give you everything you need to know to get started writing valid AMP Emails! 

## Required Markup

AMP Emails look like classic HTML emails, but with a few differences. Below is the minimum amount of markup required to make an email a valid AMP email.

```html
<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>
<body>
  Hello, AMP4EMAIL world.
</body>
</html>
```

Email providers who support AMP Emails have set up security checks to ensure users get a delightful and safe experience. An email build with AMP must meet all requirements:

*   Start with the `<!doctype html>` doctype. This is also standard for HTML.
*   Contain a top-level a `<html amp4email>` tag, or an `<html ⚡4email>` tag if your email is extra cool. This identifies the document as an AMP Email so it can be treated as such.
*   Define both `<head>` and `<body>` tags. This is optional in HTML, but AMP keeps things pristine!
*   Include a `<meta charset="utf-8>` tag as the first child of the `<head>` tag. This identifies the encoding for the page.
*   The AMP library is imported through a `<script async src="https://cdn.ampproject.org/v0.js"></script>` tag placed in the `<head>`. Without it, none of the awesome and dynamic functionality gained through AMP will work! As a best practice, this should be included as early as possible in the `<head>`, directly under the `<meta charset="utf-8">` tag.
*   Initially hide the email content until the AMP library is loaded by placing the AMP for Email boilerplate in the `<head>`.

```html
<head>
...
  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>
```

### AMP Specific Tag Replacements 

Since the AMP for Email library is a subset of the AMP HTML library, many of the same rules apply; AMP specific tags replace resource heavy HTML tags and require a defined width and height. This allows the AMP boilerplate to hide content until it has an idea of how it looks on the user's device. 


#### Images

To paint the page effectively, all `<img>` tags are replaced with [`<amp-img>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}). The `<amp-img>` tag requires a defined width and height and supports [AMP's layout system]
({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/index.md', locale=doc.locale).url.path}})


```
<amp-img src="https://link/to/img.jpg" 
    width="100" 
    height="100" 
    layout="responsive">
</amp-img>
```

The `<amp-img>` tag comes with powerful, built-in ways to control responsive design and set fallbacks.

[tip type="note"]
    Read more about using the AMP [layout and media queries]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md', locale=doc.locale).url.path}}?format=email) and how to set [image fallbacks]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}). 
[/tip]

#### GIFs

AMP has created [`<amp-anim>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-anim.md', locale=doc.locale).url.path}}?format=email), a specific tag for GIF images that allows the AMP runtime to reduce CPU usage when the animation is off-screen. Similar to `<amp-img>` the width and height is defined and the element must include a closing tag.

```
<amp-anim 
    width="400" 
    height="300" 
    src="my-gif.gif">
</amp-anim>
```

Additionally, it supports an optional `placeholder` child to display while the `src` file is loading, and supports the AMP layout system. 

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## Emails, with style 

Like all email clients, AMP allows for inline `style` attributes, but also supports CSS within the `<style amp-custom>` tag inside the head of the email.

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```
[tip type="important"]
    AMP enforces a size limit of 50,000 bytes for styling.
[/tip]    

In Gmail, AMP email supports attributes and pseudo-classes disallowed in other email MIME types. 

### Additional CSS Attributes

*   align-items
*   box-shadow
*   cursor 
    *   only "initial" and "cursor" values are allowed
*   justify-content
*   overflow-wrap
*   position
    *   top
    *   bottom
    *   right
    *   left
*   resize 
*   visibility
    *   only "initial", "visible" and "hidden" values are allowed
*   z-index 
    *   only values from -100-100 are allowed


### CSS Pseudo-classes

*   active
*   checked
*   disabled
*   enabled
*   first-child
*   first-of-type
*   focus
*   focus-within
*   hover
*   in-range
*   invalid
*   last-child
*   last-of-type
*   last-of-type
*   not
*   nth-child
*   nth-last-child
*   nth-last-of-type
*   nth-of-type
*   only-child
*   only-of-type
*   optional
*   out-of-range
*   read-only
*   read-write
*   required
*   valid

### Media query features

*   [pointer](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)

## Allowed AMP Components

The dynamic, visual, and interactivity features of AMP components is what takes AMP Emails into the future of email. The AMP Email components sub-sect is divided into dynamic content and layout elements. 

### Dynamic Content

<table>
  <tr>
   <td>ELEMENT
   </td>
   <td>DESCRIPTION
   </td>
  </tr>
  <tr>
   <td>
    <code>[amp-form]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>Form element. The action-xhr attribute must be used in place of the regular action attribute. Can be used in conjunction with <code>[&lt;template type="amp-mustache"&gt;]({{g.doc('/content/amp-dev/documentation/components/reference/amp-mustache.md', locale=doc.locale).url.path}}?format=email)</code> to render a response.
   </td>
  </tr>
  <tr>
   <td><code>[amp-selector]({{g.doc('/content/amp-dev/documentation/components/reference/amp-selector.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>Represents a control that presents a menu of options and lets the user choose from it.
   </td>
  </tr>
  <tr>
   <td>
    <code>[amp-bind]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}?format=email)</code> and <code>amp-state</code>
   </td>
   <td>
    Simple scripting language in AMP that allows the manipulation of a state machine for interactions between elements. Can also be used to add behavior on certain events.
    <code>amp-state</code> is used to remotely fetch the initial state machine values.
    <strong>Note:</strong> It is prohibited to bind to <code>[href]</code> or <code>[src]</code>. It is also prohibited to use the <code>AMP.print</code>, <code>AMP.navigateTo</code> and <code>AMP.goBack</code> actions.
   </td>
  </tr>
  <tr>
   <td><code>[amp-list]({{g.doc('/content/amp-dev/documentation/components/reference/amp-list.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>
    Remotely fetches JSON data that will be rendered by an <code>[&lt;amp-mustache&gt;]({{g.doc('/content/amp-dev/documentation/components/reference/amp-mustache.md', locale=doc.locale).url.path}}?format=email)</code>.
    <strong>Note:</strong> Binding to the <code>[src]</code> attribute is not allowed. Including user credentials with <code>credentials="include"</code> is also prohibited.
   </td>
  </tr>
  <tr>
   <td>
    <code>[&lt;template type="amp-mustache"&gt;]({{g.doc('/content/amp-dev/documentation/components/reference/amp-mustache.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>A Mustache template markup to render the results of an <code>amp-list</code> call and the <code>&lt;div submit-success&gt;</code> and <code>&lt;div submit-error&gt;</code> of <code>amp-form</code>.
   </td>
  </tr>
</table>

### Layout Elements

<table>
  <tr>
   <td>ELEMENT
   </td>
   <td>DESCRIPTION
   </td>
  </tr>
  <tr>
   <td><code>[amp-accordion]({{g.doc('/content/amp-dev/documentation/components/reference/amp-accordion.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>A UI element that facilitates showing/hiding different sections.
   </td>
  </tr>
  <tr>
   <td><code>[amp-carousel]({{g.doc('/content/amp-dev/documentation/components/reference/amp-carousel.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>A carousel UI component.
   </td>
  </tr>
  <tr>
   <td><code>[amp-sidebar]({{g.doc('/content/amp-dev/documentation/components/reference/amp-sidebar.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>A sidebar for navigational purposes.
   </td>
  </tr>
  <tr>
   <td><code>[amp-image-lightbox]({{g.doc('/content/amp-dev/documentation/components/reference/amp-image-lightbox.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>A lightbox for containing images.
   </td>
  </tr>
  <tr>
   <td><code>[amp-lightbox]({{g.doc('/content/amp-dev/documentation/components/reference/amp-lightbox.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>A lightbox for containing content.
   </td>
  </tr>
  <tr>
   <td><code>[amp-fit-text]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>A helper component for fitting text within a certain area.
   </td>
  </tr>
  <tr>
   <td><code>[amp-timeago]({{g.doc('/content/amp-dev/documentation/components/reference/amp-timeago.md', locale=doc.locale).url.path}}?format=email)</code>
   </td>
   <td>Provides a convenient way of rendering timestamps.
   </td>
  </tr>
</table>

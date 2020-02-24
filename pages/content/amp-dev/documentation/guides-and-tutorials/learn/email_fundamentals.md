---
$title: AMP for Email Fundamentals
$order: 1
description: 'Everything you need to know to get started writing valid AMP Emails.'
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

To paint the page effectively, all `<img>` tags are replaced with [`<amp-img>`](../../../documentation/components/reference/amp-img.md). The `<amp-img>` tag requires a defined width and height and supports [AMP's layout system](amp-html-layout/index.md)


```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

The `<amp-img>` tag comes with powerful, built-in ways to control responsive design and set fallbacks.

[tip type="note"]
    Read more about using the AMP [layout and media queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email) and how to set [image fallbacks](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).
[/tip]

#### GIFs

AMP has created [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email), a specific tag for GIF images that allows the AMP runtime to reduce CPU usage when the animation is off-screen. Similar to `<amp-img>` the width and height is defined and the element must include a closing tag.

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

## Emails, with style <a name="emails-with-style"></a>

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

Like HTML emails, AMP for Email supports a limited subset of CSS selectors and properties.

See [AMP for Email Supported CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md)
for a full list of CSS allowed across email clients that support AMP.

[tip type="important"]
    AMP enforces a size limit of 75,000 bytes for styling.
[/tip]

## Allowed AMP Components

The dynamic, visual, and interactivity features of AMP components is what takes AMP Emails into the future of email.

The full [list of supported components in AMP for Email](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md)
is available as part of the AMP for Email spec.

## Testing in different email clients

Email clients that support AMP for Email provide their own documentation and testing tools to help you with your integration.

See [Testing AMP Emails](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)
for more information and links to email client-specific documentation.

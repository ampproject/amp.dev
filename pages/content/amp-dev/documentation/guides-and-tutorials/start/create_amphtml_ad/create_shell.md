---
$title: Create the shell for the ad
$order: 0
description: 'Using your favorite text editor, create an HTML file named my-amphtml-ad.html. Copy the following HTML markup into that file: ...'
---

The [HTML required for an AMPHTML ad](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) is a variant of the [required AMPHTML for an AMP page](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md). Let's get familiar with the required code by creating the shell of our AMPHTML ad.

Using your favorite text editor, create an HTML file named **`my-amphtml-ad.html`**. Copy the following HTML markup into that file:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
</head>
<body>
</body>
</html>
```

This markup is for a basic, valid, HTML file.  Notice that we included the `meta` viewport tag so that we have a [responsive viewport](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport).

Now, let's modify the HTML to make it an AMPHTML ad.

In the `<html> `tag,  add the  `⚡4ads` attribute, which identifies the document as an AMPHTML ad.  Alternatively, you could specify the `amp4ads` attribute, which is also valid.

```html hl_lines="2"
<!doctype html>
<html ⚡4ads>
<head>
...
```

[tip type="note"]
**NOTE –**  Unlike AMP pages, [AMPHTML ads do not require a `<link rel="canonical">` tag](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules).
[/tip]

AMPHTML ads require their own version of the AMP runtime, so add the following `<script>` tag to the `<head>`section of your document:

```html hl_lines="1"
<script async src="https://ampjs.org/amp4ads-v0.js"></script>
```

AMPHTML ad creatives require a different, and considerably simple [boilerplate](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) style line than AMP pages do. Add the following code to your `<head>` section:

```html hl_lines="1"
<style amp4ads-boilerplate>body{visibility:hidden}</style>
```

To style your AMPHTML ad, your CSS must be embedded inline in the AMPHTML document using `<style amp-custom></style> `tags in the `<head>` section. As we're rendering a basic image ad, we don't require any CSS, so we won't add these tags.

[tip type="note"]
**NOTE –** For AMPHTML ads, the maximum size for an inline style sheet is *20 kilobytes*. Learn more about [CSS requirements in the AMPHTML ad spec](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css).
[/tip]

Here's the complete code for your HTML file:

```html
<!doctype html>
<html ⚡4ads>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
  <script async src="https://ampjs.org/amp4ads-v0.js"></script>
  <style amp4ads-boilerplate>body{visibility:hidden}</style>
</head>
<body>
</body>
</html>
```

You now have a valid AMPHTML ad, albeit a rather empty one. Let's create the image ad.

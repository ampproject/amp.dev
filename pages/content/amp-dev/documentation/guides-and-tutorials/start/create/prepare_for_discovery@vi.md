---
"$title": Prepare your page for discovery and distribution
"$order": '4'
description: 'In some cases, you might want to have both a non-AMP and an AMP version of the same page, for example, a news article. Consider this: If Google Search ...'
author: pbakaus
contributors:
- bpaduch
---

In some cases, you might want to have both a non-AMP and an AMP version of the same page, for example, a news article. Consider this: If Google Search finds the non-AMP version of that page, *how does it know there’s a "paired" AMP version of it*?

## Linking pages with `<link>`

To establish that a non-AMP page and an AMP page should be treated as being "paired" together, we add information about the AMP page to the non-AMP page and vice versa, in the form of `<link>` tags in the `<head>`.

Add the following to the non-AMP page:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

And this to the AMP page:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## What if I only have one page?

If you only have one page, and that page is an AMP page, you must still add the canonical link to it, which will then simply point to itself:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **READ ON –** Learn more about how Google finds AMP pages in [Google Search guidelines for AMP pages](https://support.google.com/webmasters/answer/6340290). [/tip]

---
"$title": Prepare your page for discovery and distribution
"$order": '4'
description: In manchen Fällen ist es sinnvoll, sowohl eine AMP Version als auch eine Version ohne AMP derselben Seite zu haben, z. B. für einen Nachrichtenartikel …
author: pbakaus
contributors:
- bpaduch
---

In manchen Fällen ist es sinnvoll, sowohl eine AMP Version als auch eine Version ohne AMP derselben Seite zu haben, z. B. für einen Nachrichtenartikel. Aber woher weiß die Google Suche nach dem Fund deiner traditionellen Seite eigentlich, *dass es auch eine "gekoppelte" AMP Version gibt*?

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

[tip type="read-on"] **ERFAHRE MEHR: ** In [Richtlinien für AMP Seiten (Accelerated Mobile Pages) in der Google Suche](https://support.google.com/webmasters/answer/6340290) erfährst du mehr darüber, wie Google AMP Seiten findet. [/tip]

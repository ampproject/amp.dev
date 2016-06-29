---
$title: Prepare Your Page for Discovery and Distribution
$category: Get Started
$order: 4
$parent: /content/docs/create_page.md
$path: /docs/get_started/create/prepare_for_discovery.html
$localization:
  path: /{locale}/docs/get_started/create/prepare_for_discovery.html
---

In some cases, you might want to have both a non-AMP and an AMP version of the same page, for example, a news article. Consider this: If Google Search finds the non-AMP version of that page, *how does it know there’s an AMP version of it*?

## Linking pages with `<link>`

In order to solve this problem, we add information about the AMP page to the non-AMP page and vice versa, in the form of `<link>` tags in the `<head>`.

Add the following to the non-AMP page:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

And this to the AMP page

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## What if I only have one page?

If you only have one page, and that page is an AMP page, you must still add the canonical link to it, which will then simply point to itself:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<a class="go-button button" href="/docs/get_started/create/publish.html">Continue to Step 6</a>

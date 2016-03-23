---
layout: page
title: Prepare Your Page for Discovery and Distribution
order: 4
---

In some cases, you might want to have both a non-AMP and an AMP version of the same page, for example, a news article. Consider this: If Google Search finds the non-AMP version of that page, *how does it know there’s an AMP version of it*?

## Linking pages with `<link>`

In order to solve this problem, we add information about the AMP page to the non-AMP page and vice versa, in the form of `<link>` tags in the `<head>`.

Add the following to the non-AMP page:

{% highlight html %}
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

And this to the AMP page

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
{% endhighlight %}

## What if I only have one page?

If you only have one page, and that page is an AMP page, you must still add the canonical link to it, which will then simply point to itself:

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

{% include button.html title="Continue to Step 6" link="/docs/get_started/create/publish.html" %}

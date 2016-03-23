---
layout: page
title: How AMP Speeds Up Performance
order: 2
---

The following optimizations combined are the reason AMP pages are so fast they appear to load instantly:

{% include toc.html %}

If you'd rather listen than read, the following video by AMP engineering lead Malte Ubl gives a similar overview than the following paragraphs.

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## Allow only asynchronous scripts

JavaScript is powerful,
it can modify just about every aspect of the page,
but it can also block DOM construction and delay page rendering
(see also [Adding interactivity with JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)).
To keep JavaScript from delaying page rendering,
AMP allows only asynchronous JavaScript.

AMP pages can’t include any author-written JavaScript.
Instead of using JavaScript,
interactive page features are handled in custom AMP elements.
The custom AMP elements may have JavaScript under the hood,
but they’re carefully designed to make sure they don’t cause performance degradation.

While third-party JS is allowed in iframes,
it cannot block rendering.
For example, if third-party JS uses the
[super-bad-for-performance `document.write` API](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/),
it does not block rendering the main page.

## Size all resources statically

External resources such as images, ads or iframes must state their size in the HTML
so that AMP can determine each element’s size and position before resources are downloaded.
AMP loads the layout of the page without waiting for any resources to download.

AMP uncouples document layout from resource layout.
Only one HTTP request is needed to layout the entire doc
([+fonts](#font-triggering-must-be-efficient)).
Since AMP is optimized to avoid expensive style recalculations and layouts in the browser,
there won’t be any re-layout when resources load.

## Don’t let extension mechanisms block rendering

AMP doesn’t let extension mechanisms block page rendering.
AMP supports extensions for things like
[lightboxes](/docs/reference/extended/amp-lightbox.html),
[instagram embeds](/docs/reference/extended/amp-instagram.html),
[tweets](/docs/reference/extended/amp-twitter.html), etc.
While these require additional HTTP requests,
those requests do not block page layout and rendering.

Any page that uses a custom script must tell the AMP system
that it will eventually have a custom tag.
For example, the [`amp-iframe`](/docs/reference/extended/amp-iframe.html)
script tells the system that there will be an `amp-iframe` tag.
AMP creates the iframe box before it even knows what it will include:

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## Keep all third-party JavaScript out of the critical path

Third-party JS likes to use synchronous JS loading.
They also like to `document.write` more sync scripts.
For example, if you have five ads on your page, and each of them cause three synchronous loads,
each with a 1 second latency connection,
you’re in 18 seconds of load time just for JS loading.

AMP pages allow third-party JavaScript but only in sandboxed iframes.
By restricting them to iframes, they can’t block the execution of the main page.
Even if they trigger multiple style re-calculations,
their tiny iframes have very little DOM.

The time it takes to do style-recalculations and layouts are restricted by DOM size,
so the iframe recalculations are very fast compared
to a recalculating styles and layout for the page.

## All CSS must be inline and size-bound

CSS blocks all rendering, it blocks page load, and it tends to get bloated.
In AMP HTML pages, only inline styles are allowed.
This removes 1 or often more HTTP requests from the critical rendering path
compared to most web pages.

Also, the inline style sheet has a maximum size of 50 kilobytes.
While this size is big enough for very sophisticated pages,
it still requires the page author to practice good CSS hygiene.

## Font triggering must be efficient

Web fonts are super large, so
[web font optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
is crucial to performance.
On a typical page that has a few sync scripts and a few external style sheets,
the browser waits and waits to start downloading these huge fonts until all this happens.

The AMP system declares zero HTTP requests until fonts start downloading.
This is only possible because all JS in AMP has the async attribute
and only inline style sheets are allowed;
there’s no HTTP requests blocking the browser from downloading fonts.

## Minimize style recalculations

Each time you measure something, it triggers style recalculations which are expensive
because the browser has to layout the entire page.
In AMP pages, all DOM reads happen first before all the writes.
This ensures there’s the max of one recalc of styles per frame.

Learn more about impact of style and layout recalculations on
[rendering performance](https://developers.google.com/web/fundamentals/performance/rendering/).

## Only run GPU-accelerated animations

The only way to have fast optimizations is to run them on the GPU.
GPU knows about layers, it knows how to perform some things on these layers,
it can move them, it can fade them, but it can’t update the page layout;
it will hand that task over to the browser, and that’s not good.

The rules for animation-related CSS ensure that animations can be GPU-accelerated.
Specifically, AMP only allows animating and transitioning on transform and opacity
so that page layout isn’t required.
Learn more about
[using transform and opacity for animation changes](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count).

## Prioritize resource loading

AMP controls all resource downloads: it prioritizes resource loading,
loading only what’s needed, and prefetches lazy-loaded resources.

When AMP downloads resources, it optimizes downloads
so that the currently most important resources are downloaded first.
Images and ads are only downloaded if they are likely to be seen by the user,
above the fold, or if the user is likely to quickly scroll to them.  

AMP also prefetches lazy-loaded resources.
Resources are loaded as late as possible, but prefetched as early as possible.
That way things load very fast but CPU is only used
when resources are actually shown to users.

## Load pages in an instant

The new [preconnect API](http://www.w3.org/TR/resource-hints/#dfn-preconnect)
is used heavily to ensure HTTP requests are as fast as possible when they are made.
With this,
a page can be rendered before the user explicitly states they’d like to navigate to it;
the page might already be available by the time the user actually selects it,
leading to instant loading.

While prerendering can be applied to all web content,
it can also use up a lot of bandwidth and CPU. AMP is optimized to reduce both of these factors. Prerendering only downloads resources above the fold
and prerendering doesn’t render things that might be expensive in terms of CPU.

When AMP documents get prerendered for instant loading,
only resources above the fold are actually downloaded.
When AMP documents get prerendered for instant loading,
resources that might use a lot of CPU (like third-party iframes) do not get downloaded.

Learn more about
[why AMP HTML doesn’t take full advantage of the preload scanner](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e).

## Help make AMP faster
AMP is an open-source effort.
We need your help to make AMP even faster.
Learn [how to contribute](/docs/support/contribute.html).

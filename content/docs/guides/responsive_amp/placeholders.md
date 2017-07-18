---
$title: Placeholders & fallbacks
$order: 3
toc: true
components:
  - iframe
---
[TOC]

In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible.

Some elements will even reward you for doing it by relaxing restrictions – for example, if you provide a placeholder for [`<amp-iframe>`](/docs/reference/components/amp-iframe.html#iframe-with-placeholder), it can be used near the top of the page (which won't work without).

## Placeholders

The element marked with the `placeholder` attribute acts
as a placeholder for the parent AMP element.
If specified, a `placeholder` element must be a direct child of the AMP element.
An element marked as a `placeholder` will always `fill` the parent AMP element.

<!--embedded amp-anim responsive example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

By default, the placeholder is immediately shown for the AMP element,
even if the AMP element's resources have not been downloaded or initialized.
Once ready, the AMP element typically hides its placeholder and shows the content.

{% call callout('Note', type='note') %}
The placeholder doesn’t have to be an AMP element;
any HTML element can act as the placeholder.
{% endcall %}

## Fallbacks

Use the `fallback` attribute to indicate the fallback behavior
for any element the browser doesn’t support, or if the content fails to load (e.g., Tweet deleted).

For example, use the `fallback` attribute to communicate to the user
that the browser doesn’t support a particular feature:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

The `fallback` attribute can be set on any HTML element, not just AMP elements.
If specified, the `fallback` element must be a direct child of the AMP element.

## Interaction of placeholders and fallbacks

For AMP components that rely on dynamic content (e.g., `amp-twitter`, `amp-list`), the interaction of fallbacks and placeholders operates as follows:
 
<ol>
  <li>Display the placeholder while the content is loading.</li>
  <li>If the content loads successfully, hide the placeholder and display the content.</li>
  <li>If the content fails to load:
    <ol>
      <li>If there's a fallback element, display the fallback.</li>
      <li>Otherwise, if there's a placeholder, display the placeholder.</li>
    </ol>
  </li>
</ol>

## Hiding loading indicators

Many AMP elements are whitelisted to show a "loading indicator",
which is a basic animation that shows that the element has not yet fully loaded.
Elements can opt out of this behavior by adding the `noloading` attribute.

---
$title: Include Iframes
$order: 2
---
[TOC]

Learn how to display include media content in your pages, and how to use iframes
to display advanced content outside of AMP's limitations.

## The basics

Display an iframe in your page using the
[`amp-iframe`](/docs/reference/components/amp-iframe.html) element.

Iframes are especially useful in AMP to display content not supported in the
main page context, such as content requiring user-authored JavaScript.

`amp-iframe` requirements:

* Must be at least **600px** or **75%** of the first viewport away from the top.
* Can only request resources via HTTPS, and they must not be in the same origin
  as the container, unless they do not specify allow-same-origin.

{% call callout('Tip', type='note') %}
Learn more at the [full specification for <code>amp-iframe</code>](/docs/reference/components/amp-iframe.html).
{% endcall %}

## Include the script

To include an `amp-iframe` in your page,
first include the following script to the `<head>`, which loads the additional
code for the extended component:

[sourcecode:html]
<script async custom-element="amp-iframe"
  src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

## Write the markup

An example `amp-iframe` from the
[released.amp example](https://github.com/ampproject/amphtml/blob/master/examples/released.amp.html):

[sourcecode:html]
<amp-iframe width=300 height=300
    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=Alameda,%20CA">
</amp-iframe>
[/sourcecode]

## Examples

More advanced examples can be found in our [advanced demo page](https://ampbyexample.com/components/amp-iframe/), which is embedded
as `<amp-iframe>` below:

<amp-iframe width=300 height=300
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://ampbyexample.com/components/amp-iframe/embed">
</amp-iframe>
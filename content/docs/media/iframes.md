---
$title: Include iframes
$order: 2
$category: Develop
components:
  - iframe
toc: true
---
[TOC]


Learn how to display include media content in your pages, and how to use iframes
to display advanced content outside of AMP's limitations.

## The basics

You can display an iframe in your page by using the
[`amp-iframe`](/docs/reference/components/amp-iframe.html) element.

Iframes are especially useful in AMP to display content not supported in the
main page context, such as content requiring user-authored JavaScript.

### Requirements for `amp-iframe`

* Must be at least **600px** or **75%** of the first viewport away from the top (except for iframes that use a [`placeholder`](#using-placeholders)).
* Can only request resources via HTTPS, and they must not be in the same origin as the container, unless they do not specify allow-same-origin. 

{% call callout('Read on', type='read') %}
Learn more at the [full specification for <code>amp-iframe</code>](/docs/reference/components/amp-iframe.html).
{% endcall %}

### Include the script

To include an `amp-iframe` in your page,
first include the following script to the `<head>`, which loads the additional
code for the extended component:

[sourcecode:html]
<script async custom-element="amp-iframe"
  src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### Write the markup

In the following example, we created a responsive `amp-iframe` to embed a Google Map via the [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/guide):

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=europe">
</amp-iframe>
```

Renders as: 

<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=europe">
</amp-iframe>

## Using placeholders

You can display an `amp-iframe` at the top of a document, provided the `amp-iframe` contains an element with the `placeholder` attribute, (for example, an `amp-img` element) which would be rendered as a placeholder until the iframe is ready to be displayed.

{% call callout('Read on', type='read') %}
Learn more about placeholders in [Iframe with placeholder](/docs/reference/components/amp-iframe.html#iframe-with-placeholder).
{% endcall %}


Example with placeholder:

```html
<amp-iframe width="400" height="225"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://giphy.com/embed/OWabwoEn7ezug">
  <amp-img placeholder layout="fill"
      src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>
```
Renders as: 

<amp-iframe width="400" height="225"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://giphy.com/embed/OWabwoEn7ezug">
  <amp-img placeholder layout="fill"
      src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>


## Examples

You can find more advanced amp-iframe examples in [AMP By Example](https://ampbyexample.com/components/amp-iframe/).

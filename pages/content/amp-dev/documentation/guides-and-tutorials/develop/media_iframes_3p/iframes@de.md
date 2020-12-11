---
"$title": Füge iframes hinzu
"$order": '10'
description: "Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations."
formats:
- websites
components:
- iframe
author: pbakaus
contributors:
- Meggin
- bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## Grundlagen

Mit dem Element [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) kannst du auf deiner Seite ein iframe anzeigen.

Iframes are especially useful in AMP to display content not supported in the main page context, such as content requiring user-authored JavaScript.

### Anforderungen für `amp-iframe`

- Must be at least **600px** or **75%** of the first viewport away from the top (except for iframes that use a [`placeholder`](#using-placeholders)).
- Can only request resources via HTTPS, and they must not be in the same origin as the container, unless they do not specify allow-same-origin.

[tip type="read-on"] **READ ON –** Learn more at the [full specification for `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md). [/tip]

### Include the script

To include an [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) in your page, first include the following script to the `<head>`, which loads the additional code for the extended component:

[sourcecode:html]
<script async custom-element="amp-iframe"
  src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### Schreibe das Markup

In the following example, we created a responsive [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) to embed a Google Map via the [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/guide):

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe">
</amp-iframe>
```

## Verwendung von Platzhaltern <a name="using-placeholders"></a>

Du kannst ein [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) am Anfang des Dokuments anzeigen, vorausgesetzt, das [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) enthält ein Element mit dem Attribut `placeholder` (z. B. ein [`amp-img`](../../../../documentation/components/reference/amp-img.md) Element), das als Platzhalter gerendert wird, bis das iframe zur Anzeige bereit ist.

[tip type="read-on"] **READ ON –**: Learn more about placeholders in [Iframe with placeholder](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder). [/tip]

Beispiel mit Platzhalter:

```html
<amp-iframe width="400" height="225"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://giphy.com/embed/OWabwoEn7ezug">
  <amp-img placeholder layout="fill"
      src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>
```

Wird gerendert als:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## Beispiele

You can find more advanced [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) examples in [AMP By Example](../../../../documentation/examples/documentation/amp-iframe.html).

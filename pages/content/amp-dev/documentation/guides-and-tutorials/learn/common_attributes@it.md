---
'$title': Attributi comuni degli elementi
$order: 1
description: AMP fornisce una serie di attributi comuni applicabili a molti componenti AMP (ed elementi HTML). Questo documento descrive ciascuno degli attributi comuni.
toc: 'true'
---

AMP provides a set of common attributes that are extended to many AMP components (and HTML elements). This document describes each of the common attributes.

## fallback

Un fallback viene mostrato quando il browser non supporta l'elemento in questione o quando il caricamento della risorsa sottostante non è riuscito. L'attributo `fallback` può essere posizionato su qualsiasi elemento HTML che sia figlio diretto di un elemento AMP che supporta il fallback. Il comportamento esatto rispetto al fallback dipende dall'implementazione dell'elemento, ma in genere l'elemento di fallback verrà mostrato al posto dell'elemento normale quando questo non è disponibile.

Often used with: images, animations, audio, and videos

Example:

```html
<amp-img src="invalid.jpg" height="400" width="300" layout="responsive" alt="...">
  <div fallback style="background-color: #ccc; display: flex; justify-content: center; align-items: center;">
    Could not load image
  </div>
</amp-img>
```
For more information, see [Placeholders & fallbacks](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## heights

Tutti gli elementi AMP che consentono layout di tipo `responsive`, supportano anche l'attributo `heights`. Il valore di tale attributo indica le dimensioni in base ad espressioni multimediali simili a quelle di [attributi sizes in tag `img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), ma con due differenze fondamentali:

1. The value applies to the height, not the width of the element.
2. Percent values are allowed. A percent value indicates the percent of the element's width. For example, a value of `80%` indicates that the height of the element will be 80% of the element's width.

Note: When the `heights` attribute is specified along with `width` and `height`, the `layout` is defaulted to `responsive`.

Esempio:

```html
<amp-img
  src="amp.png"
  width="320"
  height="256"
  alt="..."
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

Per ulteriori informazioni, consultare il documento [Art direction con attributi srcset, sizes e heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## layout

AMP provides a set of [layouts](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) that specify how an AMP component behaves in the document layout. You can specify a layout for a component by adding the `layout` attribute with one of the supported layout values for the element (see the element's documentation for what values are supported).

Example:

```html
<amp-img
  src="/img/amp.jpg"
  width="1080"
  height="610"
  layout="responsive"
  alt="..."
>
</amp-img>
```

Per ulteriori informazioni, consultare il documento [layout e query media](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) e la [specifica del layout](amp-html-layout/index.md).

## media <a name="media"></a>

Most AMP elements support the `media` attribute. The value of `media` is a media query. If the query does not match, the element is not rendered and its resources and potentially its child resources will not be fetched. If the browser window changes size or orientation, the media queries are re-evaluated and elements are hidden and shown based on the new results.

Example:

```html
<amp-img
  media="(min-width: 650px)"
  src="wide.jpg"
  width="466"
  height="355"
  layout="responsive"
  alt="..."
></amp-img>
<amp-img
  media="(max-width: 649px)"
  src="narrow.jpg"
  width="527"
  height="193"
  layout="responsive"
  alt="..."
></amp-img>
```

Per ulteriori informazioni, consultare il documento [Layout e media query](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries).

## noloading

L'attributo `noloading` stabilisce se l'"indicatore di caricamento" deve essere <string>disattivato</string> per questo elemento. Molti elementi AMP visualizzano un "indicatore di caricamento", che è un'animazione di base che mostra che l'elemento non è stato ancora completamente caricato.

Often used with: images, animations, videos, and ads

Example:

```html
<amp-img src="card.jpg" noloading height="190" width="297" layout="responsive" alt="...">
</amp-img>
```

## on

The `on` attribute is used to install event handlers on elements. The events that are supported depend on the element.

Often used with: lightboxes, sidebars, live lists, and forms

Syntax:

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

Example:

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay"> ... </amp-lightbox>
```

For more information, see [Actions and Events in AMP](amp-actions-and-events.md).

## placeholder

The `placeholder` attribute indicates that the element marked with this attribute acts as a placeholder for the parent AMP element. The attribute can be placed on any HTML element that is a direct child of an AMP element that supports placeholders. By default, the placeholder is immediately shown for the AMP element, even if the AMP element's resources have not been downloaded or initialized. Once ready, the AMP element typically hides its placeholder and shows the content. The exact behavior with respect to the placeholder is up to the element's implementation.

Often used with: images, animations, videos, and ads

Example:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" alt="...">
  <amp-img placeholder src="preview.png" layout="fill" alt="..."></amp-img>
</amp-anim>
```

For more information, see [Placeholders & fallbacks](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## sizes

All AMP elements that support the `responsive` layout, also support the `sizes` attribute. The value of the AMP `sizes` attribute is a sizes expression that selects the defined size corresponding to the media query based on the current window size. <strong>Additionally, AMP sets an inline style for <code>width</code> on the element</strong>.

Example:

```html
<amp-img
  src="amp.png"
  width="400"
  height="300"
  layout="responsive"
  alt="..."
  sizes="(min-width: 320px) 320px, 100vw"
>
</amp-img>
```

Questo produrrà il seguente tag `img` nidificato:

```html
<img
  decoding="async"
  src="amp.png"
  sizes="(min-width: 320px) 320px, 100vw"
  class="i-amphtml-fill-content i-amphtml-replaced-content"
/>
```

For more information, see [Art direction with srcset, sizes & heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## width and height

For some [layouts](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute), AMP components must have a `width` and `height` attribute that contains an integer pixel value.

Example:

```html
<amp-anim width="245" height="300" src="/img/cat.gif" alt="...">
</amp-anim>
```

For more information, see [Layout & Media queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) and the [Layout Spec](amp-html-layout/index.md).

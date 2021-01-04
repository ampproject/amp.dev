---
"$title": Immagini reattive con attributi srcset, sizes e heights
"$order": '4'
description: "Usando l'attributo srcset è possibile controllare le risorse di un elemento in base a diverse espressioni multimediali. In particolare, può essere usato per tutti i tag amp-img per indicare quali ..."
formats:
- websites
- email
- ads
- stories
components:
- iframe
author: pbakaus
contributors:
- bpaduch
---

## srcset

L'attributo `srcset` può essere usato per controllare le risorse di un elemento in base a diverse espressioni multimediali. In particolare, è possibile utilizzarlo per tutti i tag [`amp-img`](../../../../documentation/components/reference/amp-img.md) per indicare quali risorse di tipo immagine utilizzare in base alle diverse dimensioni dello schermo. AMP genererà automaticamente un attributo `sizes`, <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img" data-md-type="link">che soddisfa la definizione HTML5 di `sizes`</a>, per tutti i sottostanti tag `<img>` di `<amp-img>`, se l'elemento `<amp-img>` ha un attributo `srcset` ma non `sizes`.

In questo semplice esempio, l'attributo `srcset` specifica quale immagine utilizzare in base alla larghezza dello schermo. Il descrittore `w` indica al browser la larghezza di ciascuna immagine nell'elenco:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

[tip type="note"] **NOTA:** AMP supporta srcset con il descrittore `w` in tutti i browser. [/tip]

Per saperne di più sulla creazione di immagini reattive usando l'attributo `srcset`, consultare il documento [Uso di immagini reattive(Ora)](http://alistapart.com/article/using-responsive-images-now).

## sizes

L'attributo AMP opzionale `sizes` può essere usato anche insieme a `srcset`. L'attributo AMP `sizes` descrive come calcolare la dimensione dell'elemento in base a qualsiasi espressione multimediale. <strong data-md-type="raw_html">La definizione degli attributi `sizes` su qualsiasi elemento AMP permetterà ad AMP di impostare uno stile inline per la larghezza dell'elemento in questione, in base alla media query corrispondente.</strong> A seconda della dimensione calcolata per l'elemento, il programma utente seleziona la sorgente più appropriata fornita dall'attributo `srcset`.

Si consideri il seguente esempio:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

L'attributo `sizes` definisce la larghezza dell'elemento pari al 50% della dimensione della finestra di visualizzazione, quando tale dimensione è maggiore di 650 pixel. Ad esempio, se la finestra di visualizzazione è di 800 pixel, la larghezza dell'elemento sarà di 400 pixel. Quindi il browser seleziona la risorsa `srcset` relativa a 400 pixel, assumendo che la proporzione pixel del dispositivo sia 1, che in questo caso è  `hummingbird-narrow.jpg` (320 pixel).

[tip type="important"] **IMPORTANTE:** Quando l'attributo sizes è specificato insieme a larghezza e altezza, il layout predefinito è `responsive`. [/tip]

Maggiori informazioni sull'[attributo AMP `sizes` sono disponibili qui](../../../../documentation/guides-and-tutorials/learn/common_attributes.md).

## heights

Tutti gli elementi AMP personalizzati che consentono layout di tipo `responsive`, supportano anche l'attributo `heights`. Il valore di tale attributo indica le dimensioni in base ad espressioni multimediali simili a quelle dell'[attributo img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), ma con due differenze fondamentali:

1. Si applica all'altezza e non alla larghezza dell'elemento.
2. Sono consentiti valori percentuali, ad esempio `86%`. I valori percentuali utilizzati indicano la percentuale della larghezza dell'elemento.

Quando l'attributo `heights` viene specificato insieme a `width` e `height`, il `layout` è per impostazione predefinita di tipo `responsive`.

Ad esempio:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

In questo esempio, l'altezza predefinita dell'elemento sarà pari all'80% della larghezza, ma per le finestre di visualizzazione più ampie di `500 px` l'altezza sarà limitata a `200 px`.

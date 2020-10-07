---
$title: Attributi comuni degli elementi
$order: 1
description: AMP fornisce una serie di attributi comuni applicabili a molti componenti AMP (ed elementi HTML). Questo documento descrive ciascuno degli attributi comuni.
toc: true
---

AMP fornisce una serie di attributi comuni applicabili a molti componenti AMP (ed elementi HTML). Questo documento descrive ciascuno degli attributi comuni.

## fallback

Un fallback è uno strumento che consente a un elemento di comunicare all'utente che il browser non supporta l'elemento in questione o che il caricamento della risorsa sottostante non è riuscito. L'attributo `fallback` può essere posizionato su qualsiasi elemento HTML che sia figlio diretto di un elemento AMP che supporta il fallback. Il comportamento esatto rispetto al fallback dipende dall'implementazione dell'elemento, ma in genere l'elemento di fallback verrà mostrato al posto dell'elemento normale quando questo non è disponibile.

Spesso utilizzato con: immagini, animazioni, audio e video

Esempio:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" >
  <div fallback>Impossibile riprodurre immagini animate su questo dispositivo.</div>
</amp-anim>
```

Per ulteriori informazioni, consultare la sezione [Segnaposti e fallback](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## heights

Tutti gli elementi AMP che consentono layout di tipo `responsive`, supportano anche l'attributo `heights`. Il valore di tale attributo indica le dimensioni in base ad espressioni multimediali simili a quelle di [attributi sizes in tag `img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), ma con due differenze fondamentali:

1. Il valore si applica all'altezza, non alla larghezza dell'elemento.
2. I valori percentuali sono ammessi. Un valore percentuale si riferisce alla larghezza dell'elemento. Ad esempio, un valore `80%` indica che l'altezza dell'elemento sarà pari all'80% della sua larghezza.

Nota: quando l'attributo `heights` viene specificato insieme a `width` e `height`, il `layout` è per impostazione predefinita di tipo `responsive`.

Esempio:

```html
<amp-img src="amp.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
```

Per ulteriori informazioni, consultare il documento [Art direction con attributi srcset, sizes e heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## layout

AMP fornisce una serie di [layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) che specificano come si comportano i componenti AMP nel layout del documento. È possibile specificare il layout del componente aggiungendo l'attributo `layout` con uno dei valori supportati (consultare la documentazione dell'elemento per i valori supportati).

Esempio:

```html
<amp-img src="/img/amp.jpg"
    width="1080"
    height="610"
    layout="responsive"
    alt="an image">
</amp-img>
```

Per ulteriori informazioni, consultare il documento [layout e query media](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) e la [specifica del layout](amp-html-layout/index.md).

## media <a name="media"></a>

La maggior parte degli elementi AMP supporta l'attributo `media`. Il valore di `media` è una media query. Se la query non ha corrispondenze, il rendering dell'elemento non avverrà, mentre né le sue risorse né le potenziali risorse figlie saranno recuperate. Se la finestra del browser cambia dimensione o orientamento, le media query vengono rivalutate e gli elementi vengono nascosti e visualizzati in base ai nuovi risultati.

Esempio:

```html
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="466"
    height="355" layout="responsive"></amp-img>
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="527"
    height="193" layout="responsive"></amp-img>
```

Per ulteriori informazioni, consultare il documento [Layout e media query](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries).

## noloading

L'attributo `noloading` stabilisce se l'"indicatore di caricamento" deve essere <string>disattivato</string> per questo elemento. Molti elementi AMP visualizzano un "indicatore di caricamento", che è un'animazione di base che mostra che l'elemento non è stato ancora completamente caricato.

Spesso utilizzato con: immagini, animazioni, video e annunci

Esempio:

```html
<amp-img src="card.jpg"
    noloading
    height="190"
    width="297"
    layout="responsive">
</amp-img>
```

## on

L'attributo `on` viene utilizzato per installare i gestori di eventi sugli elementi. Gli eventi supportati dipendono dall'elemento.

Utilizzato spesso con: lightbox, barre laterali, elenchi live e moduli

Sintassi:

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

Esempio:

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay">
  ...
</amp-lightbox>
```

Per ulteriori informazioni, consultare il documento [Azioni ed eventi in AMP](amp-actions-and-events.md).

## placeholder

L'attributo <code>placeholder</code> indica che l'elemento contrassegnato con questo attributo funge da segnaposto per il suo elemento AMP padre. L'attributo può essere applicato a qualsiasi elemento HTML che sia figlio diretto dell'elemento AMP che supporta i segnaposto. Per impostazione predefinita, il segnaposto di un elemento AMP viene immediatamente mostrato, anche se le risorse dell'elemento non sono state scaricate o inizializzate. Una volta pronto, l'elemento AMP in genere nasconde il suo segnaposto e mostra il suo contenuto. Il comportamento esatto rispetto al segnaposto dipende dall'implementazione dell'elemento.

Spesso utilizzato con: immagini, animazioni, video e annunci

Esempio:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
```

Per ulteriori informazioni, consultare la sezione [Segnaposti e fallback](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## sizes

Tutti gli elementi AMP che supportano il layout `responsive` supportano anche l'attributo `sizes`. Il valore dell'attributo AMP `sizes` esprime la dimensione definita corrispondente alla media query in base alle dimensioni della finestra corrente. <strong>Inoltre, AMP imposta uno stile inline per l'attributo <code>width</code> sull'elemento</strong>.

Esempio:

```html
<amp-img src="amp.png"
    width="400" height="300"
    layout="responsive"
    sizes="(min-width: 320px) 320px, 100vw">
</amp-img>
```

Questo produrrà il seguente tag `img` nidificato:

```html
<img decoding="async"
    src="amp.png"
    sizes="(min-width: 320px) 320px, 100vw"
    class="i-amphtml-fill-content i-amphtml-replaced-content">
```

Per ulteriori informazioni, consultare il documento [Art direction con attributi srcset, sizes e heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## width e height

Per alcuni [layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute), i componenti AMP devono avere gli attributi `width` e `height` che devono indicare un valore intero di pixel.

Esempio:

```html
<amp-anim width="245"
    height="300"
    src="/img/cat.gif"
    alt="cat animation">
</amp-anim>
```

Per ulteriori informazioni, consultare il documento [Layout e media query](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) e la [specifica del layout](amp-html-layout/index.md).

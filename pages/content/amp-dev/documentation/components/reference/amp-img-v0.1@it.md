---
$title: amp-img
$category@: media
teaser:
  text: sostituisce il tag img HTML5
---


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



<table>
  <tr>
    <td class="col-fourty"><strong>Descrizione</strong></td>
    <td>Una sostituzione gestita dal runtime per il tag HTML <code>img</code>.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>riempimento, fisso, altezza fissa, flex-item, intrinseco, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td>Vedi <a href="https://ampbyexample.com/components/amp-img/">l'esempio di amp-img</a> di AMP By Example.</td>
  </tr>
</table>


# Comportamento <a name="behavior"></a>

Il runtime può decidere di ritardare o dare priorità al caricamento delle risorse in base alla posizione dell'area visibile, alle risorse di sistema, alla larghezza di banda della connessione o ad altri fattori. In questo modo, i componenti `amp-img` consentono al runtime di gestire efficacemente le risorse immagine.

I componenti `amp-img`, come tutte le risorse AMP recuperate dall'esterno, devono già avere una dimensione esplicita (come `width`/`height`), in modo che le proporzioni possano essere riconosciute senza dover recuperare l'immagine. L'effettivo comportamento del layout viene stabilito dall'attributo `layout`.

[tip type="read-on"]
Ulteriori informazioni sui layout nelle specifiche [Sistema layout AMP HTML](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md) e in [Layout supportati](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute).
[/tip]

# Esempio: visualizzazione di un'immagine responsive <a name="example-displaying-a-responsive-image"></a>

Nel seguente esempio viene mostrata un'immagine che si adatta alle dimensioni dell'area visibile con le impostazioni `layout=responsive`.  L'immagine si allarga e si restringe in base alle proporzioni specificate da `width` e `height`.

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

[tip type="read-on"]
Ulteriori informazioni sulle pagine AMP nella guida [Creazione di pagine AMP responsive](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).
[/tip]

Se la risorsa richiesta dal componente `amp-img` non viene caricata, lo spazio sarà vuoto a meno che non venga fornito un [`fallback`](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#fallback) secondario. La procedura di riserva viene eseguita solo sul layout iniziale; le successive modifiche src (ad esempio, tramite un ridimensionamento + srcset) non avranno una procedura di riserva a causa delle conseguenze che avrebbero sulle prestazioni.

# Esempio: specificare un'immagine di riserva <a name="example-specifying-a-fallback-image"></a>

Nel seguente esempio, se il browser non supporta WebP verrà visualizzata l'immagine JPG di riserva:

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

Utilizzando il selettore CSS e lo stile sull'elemento stesso, possono essere impostati un colore di sfondo segnaposto o un altro elemento visivo.

È possibile implementare ulteriori funzioni di immagine come didascalie con HTML standard (ad esempio `figure` e `figcaption`).

[tip type="read-on"]
Ulteriori informazioni sull'utilizzo di `amp-img` nelle seguenti risorse:

* [Segnaposto e procedura di riserva](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)
* [Includi immagini e video](../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)
[/tip]

# Attributi <a name="attributes"></a>

**src**

Questo attributo è simile all'attributo `src` nel tag `img`. Il valore deve essere un URL che rimanda a un file immagine che può essere memorizzato pubblicamente nella cache. I provider di cache possono riscrivere questi URL durante l'importazione dei file AMP in modo che rimandino a una versione dell'immagine memorizzata nella cache.

**srcset**

È uguale all'attributo `srcset` nel tag `img`. Per i browser che non supportano `srcset`, `<amp-img>` utilizza `src` per impostazione predefinita. Se viene fornito solo `srcset` ma non `src`, verrà selezionato il primo URL in `srcset`.

**sizes**

È uguale all'attributo `sizes` nel tag `img`.

[tip type="read-on"]
Consulta [Immagini responsive con srcset, dimensioni e altezze](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md) per ulteriori informazioni sull'utilizzo di `sizes` e `srcset`.
[/tip]

**alt**

Una stringa di testo alternativo, simile all'attributo `alt` `img`.

**attribuzione**

Una stringa che indica l'attribuzione dell'immagine. Ad esempio, `attribution="CC gentile concessione di Cats on Flicker"`

**height** e **width**

Una dimensione esplicita dell'immagine, che viene utilizzata dal runtime AMP per determinare le proporzioni senza dover recuperare l'immagine.

**attributi comuni**

Questo elemento include gli [attributi comuni](../../../documentation/guides-and-tutorials/learn/common_attributes.md) estesi ai componenti AMP.

# Stili <a name="styling"></a>

Lo stile di `amp-img` può essere impostato direttamente tramite le proprietà CSS. Ad esempio, l'impostazione di uno sfondo grigio segnaposto potrebbe essere ottenuta tramite:

```css
amp-img {
  background-color: grey;
  }
```

# Suggerimenti utili <a name="tips--tricks"></a>

# Ridimensionamento di un'immagine fino a una larghezza massima <a name="scaling-an-image-up-to-a-maximum-width"></a>

Se vuoi adattare l'immagine quando la finestra viene ridimensionata ma solo fino a una larghezza massima (in modo che l'immagine non superi la larghezza), procedi nel seguente modo:

1. Imposta `layout=responsive` per `<amp-img>`.
1. Nel contenitore dell'immagine, specifica l'attributo CSS `max-width:<max width to display image>`.  Perché nel contenitore?  Un elemento `amp-img` con `layout=responsive` è un elemento *a livello di blocco*, mentre `<img>` è un elemento *incorporato*. In alternativa, puoi impostare `display: inline-block` per l'elemento amp-img nel CSS.

# La differenza tra layout responsive e intrinsic <a name="the-difference-between-responsive-and-intrinsic-layout"></a>

Sia il layout `responsive` che quello `intrinsic` creano un'immagine che verrà automaticamente ridimensionata.  La differenza principale consiste nel fatto che il layout `intrinsic` utilizza un'immagine SVG come elemento di ridimensionamento.  Di conseguenza, si comportano allo stesso modo di un'immagine HTML standard, con il vantaggio che il browser conosce le dimensioni dell'immagine nel layout iniziale. Il layout `intrinsic` avrà una dimensione intrinseca e farà aumentare un `div` espresso in decimali fino a raggiungere la dimensione naturale dell'immagine o un vincolo CSS come `max-width`. Il layout `responsive` esegue il rendering di 0x0 in un `div` espresso in decimali perché prende le sue dimensioni dall'elemento principale, che non ha dimensioni naturali quando è espressa in decimali.

# Impostazione di un'immagine di dimensioni fisse <a name="setting-a-fixed-sized-image"></a>

Se vuoi che l'immagine venga visualizzata con una dimensione fissa procedi nel seguente modo:

1. Imposta `layout=fixed` per `<amp-img>`.
1. Specifica `width` e `height`.

[tip type="read-on"]
Ulteriori informazioni sul [layout dedotto](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified) quando non viene specificato l'attributo `layout`.
[/tip]

# Impostazione delle proporzioni <a name="setting-the-aspect-ratio"></a>

Per le immagini responsive, `width` e `height` non devono necessariamente corrispondere alla larghezza e all'altezza `amp-img`; questi valori devono avere le stesse proporzioni.

Ad esempio, invece di specificare `width="900"` e `height="675"`, puoi specificare `width="1.33"` e `height="1"`.

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="1.33"
  height="1"
  layout="responsive">
</amp-img>
```
[/example]

# Impostazione di più file di origine per diverse risoluzioni dello schermo <a name="setting-multiple-source-files-for-different-screen-resolutions"></a>

L'attributo [`srcset`](#attributes) deve essere utilizzato per fornire risoluzioni diverse della stessa immagine, in modo che tutte abbiano le stesse proporzioni. Il browser sceglierà automaticamente il file più appropriato da `srcset` in base alla risoluzione dello schermo e alla larghezza del dispositivo dell'utente.

Al contrario, l'attributo [`media`](../../../documentation/guides-and-tutorials/learn/common_attributes.md#media) mostra o nasconde i componenti AMP e deve essere utilizzato durante la progettazione di layout responsive. Il modo corretto per visualizzare immagini con proporzioni diverse è utilizzare più componenti `<amp-img>`, ciascuno con un attributo `media` corrispondente alle larghezze degli schermi su cui mostrare ogni istanza.

Per ulteriori dettagli, consulta la guida sulla [creazione di pagine AMP responsive](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#displaying-responsive-images).

# Mantenimento delle proporzioni per le immagini con dimensioni sconosciute <a name="maintaining-the-aspect-ratio-for-images-with-unknown-dimensions"></a>

Il sistema di layout AMP richiede le proporzioni di un'immagine prima di recuperare l'immagine; tuttavia, in alcuni casi potresti non conoscere le dimensioni dell'immagine. Per visualizzare immagini con dimensioni sconosciute e mantenere le proporzioni, combina il layout [`fill`](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) di AMP con la proprietà CSS [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/). Per ulteriori informazioni, consulta [Come supportare immagini con dimensioni sconosciute](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions) di AMP By Example.

# Convalida <a name="validation"></a>

Consulta le [regole di amp-img](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) nelle specifiche di convalida AMP.

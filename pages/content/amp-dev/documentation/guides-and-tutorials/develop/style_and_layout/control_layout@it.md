---
$title: Layout supportati
---

Rendi reattivi i tuoi elementi utilizzando `layout=responsive`.

## Valori supportati per l'attributo layout <a name="the-layout-attribute"></a>

Utilizza i layout reattivi per impostazione predefinita.

Di seguito è riportato l'elenco completo dei valori supportati per l'attributo layout.

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">Tipo di layout</th>
      <th class="col-twenty" data-th="Width/height required">Larghezza/altezza obbligatorie</th>
      <th data-th="Behavior">Comportamento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>nodisplay</code></td>
      <td class="col-twenty" data-th="Description">No</td>
      <td data-th="Behavior">Elemento non visualizzato. Questo layout può essere applicato a ogni elemento AMP. Il componente non occupa spazio sullo schermo, come non ci fosse alcuno stile di visualizzazione applicato. Si presume che l'elemento possa visualizzarsi automaticamente in seguito all'azione dell'utente, ad esempio <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed</code></td>
      <td class="col-twenty" data-th="Description">Sì</td>
      <td data-th="Behavior">L'elemento ha larghezza e altezza fisse; la reattività non è supportata. Le uniche eccezioni sono gli elementi <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> e <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>responsive</code></td>
      <td class="col-twenty" data-th="Description">Sì</td>
      <td data-th="Behavior">L'elemento viene adattato alla larghezza del relativo elemento contenitore, mentre la sua altezza viene ridimensionata automaticamente in base alle proporzioni stabilite dagli attributi di larghezza e altezza. Questo layout è adatto per la maggior parte degli elementi AMP, inclusi <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> e <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. Lo spazio disponibile dipende dall'elemento principale e può anche essere personalizzato utilizzando l'elemento CSS <code>max-width</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed-height</code></td>
      <td class="col-twenty" data-th="Description">Solo l'altezza</td>
      <td data-th="Behavior">L'elemento occupa lo spazio a sua disposizione, ma la sua altezza rimane invariata. Questo layout è adatto per elementi quali <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>, che prevede contenuti in posizione orizzontale. L'attributo <code>width</code> non deve essere presente o deve essere impostato su <code>auto</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fill</code></td>
      <td class="col-twenty" data-th="Description">No</td>
      <td data-th="Behavior">L'elemento occupa lo spazio a sua disposizione, sia in larghezza sia in altezza. In altre parole, il layout di un elemento fill corrisponde a quello dell'elemento principale.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>container</code></td>
      <td class="col-twenty" data-th="Description">No</td>
      <td data-th="Behavior">L'elemento consente ai relativi elementi secondari di definire le proprie dimensioni, come un normale elemento <code>div</code> HTML. Il componente in sé non dovrebbe avere un layout specifico, ma funzionare soltanto da contenitore. I relativi elementi secondari vengono visualizzati all'istante.</td>
    </tr>
  </tbody>
</table>

### Che cosa succede se non vengono definite la larghezza e l'altezza? <a name="what-if-width-and-height-are-undefined"></a>

Se i valori `width` o `height` non vengono specificati, in alcuni casi il runtime AMP può stabilire i seguente valori predefiniti:

* [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): per larghezza e altezza viene impostato il valore predefinito 0.
* [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): la larghezza e l'altezza predefinite vengono dedotte dal browser.

### Che cosa succede se non viene definito l'attributo layout? <a name="what-if-the-layout-attribute-isnt-specified"></a>

Il comportamento del layout viene stabilito come segue:

* Se è presente l'attributo `height`, ma l'attributo `width` non è presente o equivale ad `auto`, viene utilizzato il layout `fixed-height`.
* Se sono presenti gli attributi `width` o `height` insieme all'attributo `sizes`, viene utilizzato il layout `responsive`.
* Se sono presenti gli attributi `width` o `height`, viene utilizzato il layout `fixed`.
* Se gli attributi `width` e `height` non sono presenti, viene utilizzato il layout `container`.

## Utilizzare la regola @media e l'attributo media

Utilizza la regola [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) per stabilire l'aspetto e il comportamento del layout della pagina, come faresti per qualsiasi altro sito web.
Quando cambiano le dimensioni o l'orientamento della finestra del browser, le query supporti vengono rivalutate, dopodiché gli elementi vengono nascosti e mostrati in base ai nuovi risultati.

Visita la pagina [Utilizzare query supporti CSS per la reattività](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=it) per avere ulteriori informazioni sul controllo del layout applicando query supporti.

<a name="element-media-queries"></a>

Una funzione aggiuntiva per il responsive design disponibile in AMP è l'attributo `media`, che può essere utilizzato in ogni elemento AMP. Funziona in modo simile alle query supporti nel foglio di stile globale, ma incide soltanto sull'elemento specifico in una singola pagina.

Ad esempio, di seguito vengono considerate due immagini con query supporti che si escludono a vicenda.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

L'immagine da recuperare e visualizzare viene scelta in base alla larghezza dello schermo.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## Utilizzare gli attributi srcset e sizes

Utilizza l'attributo `srcset` per stabilire gli asset di un elemento in base alle varie espressioni di supporto.
Utilizzalo in particolare nei tag [`amp-img`](../../../../documentation/components/reference/amp-img.md) per specificare gli asset immagine da utilizzare a seconda delle dimensioni dello schermo.

In questo semplice esempio, `srcset` specifica l'immagine da utilizzare in base alla larghezza dello schermo.
Il descrittore `w` indica al browser la larghezza di ogni immagine nell'elenco:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**Nota.** AMP supporta il descrittore `w` in tutti i browser.

Leggi ulteriori informazioni sulla creazione di immagini reattive utilizzando `srcset`
 nella pagina relativa all'[utilizzo delle immagini reattive](http://alistapart.com/article/using-responsive-images-now).

Puoi anche utilizzare l'attributo `sizes` insieme all'attributo `srcset`.
L'attributo `sizes` descrive come calcolare le dimensioni dell'elemento in base all'eventuale espressione di supporto.
In base alle dimensioni calcolate dell'elemento, lo user-agent seleziona l'origine più relativa indicata dall'attributo `srcset`.

Esamina l'esempio seguente:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

L'attributo `sizes` definisce la larghezza dell'elemento pari al 50% delle dimensioni dell'area visibile, quando quest'ultima è almeno pari a 650 px.
Ad esempio, se l'area visibile è di 800 px, la larghezza dell'elemento viene impostata su 400 px.
Il browser sceglie poi la risorsa `srcset` in base alle dimensioni di 400 px, supponendo che le proporzioni pixel del dispositivo siano pari a 1; in questo caso, quindi, la risorsa è `narrow.jpg` (320 px).

**Importante.** Se l'attributo sizes viene specificato insieme alla larghezza e all'altezza, il valore predefinito del layout è `responsive`.

Leggi ulteriori informazioni sulle differenze tra gli attributi `sizes` e `srcset` e le query supporti in questo post del blog [Srcset and sizes](https://ericportis.com/posts/2014/srcset-sizes/).

## Includere attributi placeholder e fallback

### placeholder

L'elemento contrassegnato dall'attributo `placeholder` agisce da segnaposto per l'elemento AMP principale.
Se specificato, un elemento `placeholder` deve essere un elemento secondario diretto dell'elemento AMP.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

Per impostazione predefinita, il segnaposto dell'elemento AMP viene mostrato all'istante, anche se le risorse dell'elemento AMP non sono state scaricate o inizializzate.
Quando è pronto, l'elemento AMP in genere nasconde il relativo segnaposto e mostra i contenuti.

**Nota.** Il segnaposto non deve necessariamente essere un elemento AMP, ma può essere qualsiasi elemento HTML.

### fallback

Utilizza l'attributo `fallback` per indicare il comportamento di fallback di ogni elemento non supportato dal browser.
Ad esempio, utilizza l'attributo `fallback` per comunicare all'utente che il browser non supporta una determinata funzione:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

Per l'attributo `fallback` è possibile impostare qualsiasi elemento HTML, non soltanto elementi AMP.
Se specificato, l'elemento `fallback` deve essere un elemento secondario diretto dell'elemento AMP.

### noloading

Molti elementi AMP sono autorizzati a mostrare un "indicatore di caricamento", che consiste in un'animazione basilare che indica che l'elemento non è stato ancora caricato completamente.
Puoi disattivare questo comportamento per gli elementi aggiungendo l'attributo `noloading`.

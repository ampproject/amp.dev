---
$title: Creazione di pagine AMP veloci
description: Il segreto per la progettazione di siti web veloci sta nella creazione di pagine web fluide che rispondano alle esigenze degli utenti. Ad esempio, pagine che si adattano alle dimensioni e all'orientamento dello schermo dei dispositivi. L'uso di AMP ...
---

## Introduzione

Il segreto per la progettazione di siti web veloci sta nella creazione di pagine web fluide che rispondano alle esigenze degli utenti, ad esempio, pagine che si adattano alle dimensioni e all'orientamento dello schermo dei dispositivi. L'uso di AMP permette di realizzare agevolmente questo risultato. AMP supporta tutti i tipi di schermi e dispositivi e fornisce numerosi componenti integrati molto veloci.

In questa guida mostreremo come implementare facilmente questi fondamentali elementi veloci in AMP:

- [Controllo della finestra di visualizzazione](#controlling-the-viewport)
- [Creazione di layout reattivi](#creating-a-responsive-layout)
- [Ridimensionamento di contenuti multimediali](#scaling-media-for-the-page)

[video src='https://www.youtube.com/watch?v=XDvbJ2apaiA' caption='Apprendi in questo video la progettazione di elementi reattivi in AMP.']

## Controllo della finestra di visualizzazione<a name="controlling-the-viewport"></a>

[filter formats="websites, stories, ads"] Per ottimizzare le pagine web in modo che il contenuto si ridimensioni e si adatti alla finestra del browser in qualsiasi dispositivo, occorre indicare un elemento finestra di visualizzazione `meta`. L'elemento indica al browser come ridimensionare l'area visibile (finestra di visualizzazione) della pagina web.

Ma quali valori usare? Ebbene, in AMP questa informazione è già disponibile. Nell'ambito del [markup obbligatorio](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) per le pagine AMP, occorre specificare la seguente finestra di visualizzazione:

```html
<meta name="viewport" content="width=device-width" />
```

Queste sono le tipiche impostazioni di visualizzazione da usare per un sito veloce. Anche se l'attributo `initial-scale=1` non è obbligatorio per una pagina AMP valida, è tuttavia consigliato, perché imposta il livello di zoom su 1 quando la pagina è caricata per la prima volta. [/filter]

[filter models="email"] Questa sezione è valida solo per i siti web, gli annunci e le storie AMP. [/filter]

## Creazione di layout reattivi<a name="creating-a-responsive-layout"></a>

Per progettare siti veloci si possono utilizzare le query CSS [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) che adattano lo stile della pagina web a varie dimensioni dello schermo senza dover alterare il contenuto della pagina. In AMP, si possono utilizzare le stesse query CSS `@media`. Inoltre, per un controllo più preciso su un elemento AMP, è possibile specificare l'attributo `media` sull'elemento. Questo è particolarmente utile quando occorre mostrare o nascondere un elemento in base a una media query. Consultare la sezione [Gestione dell'art direction delle immagini](#changing-the-art-direction-of-an-image) per un esempio di utilizzo dell'attributo `media`.

Ridimensionare ogni elemento per adattarlo a uno schermo può essere complicato<sup><a href="#fn1" id="ref1">\*</a></sup>. Tuttavia, in AMP, si può facilmente adattare un elemento specificando l'attributo `"layout=responsive"` insieme agli attributi `width` e `height`. Applicando il layout di tipo `responsive` a un elemento, esso sarà automaticamente ridimensionato alla larghezza del suo elemento contenitore e l'altezza cambierà in base alle proporzioni specificate dai parametri `width` e `height` dell'elemento. Quasi tutti gli elementi AMP supportano un layout `responsive`; consultare la documentazione di riferimento degli elementi per vedere i layout supportati.

Anche se gli elementi possono essere facilmente adattati con l'attributo `"layout=responsive"`, occorre comunque considerare come gli elementi saranno visualizzati su schermi di tutte le dimensioni, inclusi desktop e tablet. Un errore comune è quello di consentire a un'immagine di occupare l'intera larghezza dello schermo, il che estende l'immagine oltre le dimensioni previste, causando un'esperienza negativa agli utenti di sistemi widescreen. Per impostazione predefinita, gli elementi con `layout=responsive` occuperanno l'intera larghezza del contenitore dell'elemento, che spesso non è limitato in larghezza (cioè, larghezza = 100%). Per migliorare l'aspetto delle immagini basta limitare la larghezza del contenitore dell'immagine. Ad esempio, impostando una regola di "max-width" sull'elemento "body" o "main", tutte le immagini saranno limitate a una larghezza massima predefinita.

##### Esempio: limitazione della larghezza di immagini reattive

Nell'esempio seguente, abbiamo un'immagine di fiori (640 x 427 pixel) che vogliamo visualizzare su schermi di tutte le dimensioni. Per questo abbiamo specificato i parametri `width` e `height` e impostato il layout di tipo `responsive`.

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

Tuttavia, vogliamo che l'immagine non si estenda oltre le dimensioni previste, quindi impostiamo la regola `max-width` sul contenitore a 700 pixel tramite codice CSS personalizzato:

```html
<style amp-custom>
  .resp-img {
    max-width: 700px;
  }
</style>
```

[tip type="read-on"] **CONTINUA A LEGGERE:** Per ulteriori informazioni sui diversi layout in AMP, consulta la guida su [media query e layout](control_layout.md#the-layout-attribute). [/tip]

<a id="fn1"></a> [tip type="note"] **Perché è complicato ridimensionare gli elementi per adattarli allo schermo quando posso farlo facilmente con lo stile `width=100%`?**

La cosa difficile è visualizzare gli elementi reattivi sulla pagina senza influire negativamente sulle prestazioni o sull'esperienza utente. Si potrebbero facilmente adattare le immagini allo schermo con lo stile "width=100%" ma questo causerebbe problemi alle prestazioni. Il browser deve prima scaricare l'immagine per ottenerne le dimensioni, quindi ridimensionare l'immagine per adattarla alle dimensioni dello schermo e infine tracciarla e visualizzarla di nuovo. In AMP, la procedura di rendering è ottimizzata procedendo prima alla stesura della pagina e utilizzando i segnaposto per le immagini in base alle dimensioni fornite in [`amp-img`](../../../../documentation/components/reference/amp-img.md) (servendosi di tali dati numerici per stabilire le proporzioni) e solo in seguito le risorse sono scaricate e la pagina è tracciata. Non è richiesto alcun adattamento dinamico. [/tip]

## Ridimensionamento di contenuti multimediali della pagina <a name="scaling-media-for-the-page"></a>

Probabilmente l'aspetto più impegnativo della progettazione di elementi veloci è la corretta visualizzazione dei contenuti multimediali sulla pagina in modo che rispondano alle caratteristiche dello schermo. In questa sezione vedremo come integrare video e immagini reattivi nelle pagine AMP.

### Integrazione di video

Per includere un video nella pagina web, occorre assicurarsi che l'utente possa vedere i contenuti e i controlli del video (cioè, senza fuoriuscite dai contenitori). In genere, questo risultato si ottiene con una combinazione di media query CSS, un contenitore e altri CSS. In AMP, basta aggiungere l'elemento video alla pagina e indicare `layout=responsive` sull'elemento, senza codici CSS aggiuntivi.

##### Esempio: integrazione di un video YouTube

Nell'esempio seguente, vogliamo visualizzare un video YouTube integrato che si adatti alle dimensioni e all'orientamento dello schermo del dispositivo. Aggiungendo `"layout=responsive"` all'elemento [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), il video viene ridimensionato per adattarsi alla finestra e le sue proporzioni vengono mantenute in base agli attributi `width` e `height` specificati.

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

Esistono molti tipi di video da aggiungere alle tue pagine AMP. Per i dettagli, consultare l'elenco dei [componenti multimediali](../../../../documentation/components/index.html#media) disponibili.

### Visualizzazione di immagini reattive <a name="displaying-responsive-images"></a>

Le immagini costituiscono gran parte di una pagina web (circa il [65% dei byte della pagina](http://httparchive.org/interesting.php#bytesperpage)). Le immagini dovrebbero almeno essere visibili su schermi di varie dimensioni e orientamenti (cioè, senza che l'utente debba far scorrere, restringere o ingrandire l'immagine per vederla interamente). In AMP basta usare l'attributo `"layout=responsive"` (consultare la sezione [Inclusione di immagini in AMP](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)). Oltre all'immagine reattiva di base, potrebbe essere necessario gestire più risorse di tipo immagine per:

- [Fornire immagini nitide alla giusta risoluzione](#serving-crisp-images-for-the-right-resolution)
- [Gestire l'art direction delle immagini](#changing-the-art-direction-of-an-image)
- [Fornire immagini in formato ottimizzato](#providing-optimized-images)

#### Fornire immagini nitide alla giusta risoluzione<a name="serving-crisp-images-for-the-right-resolution"></a>

Per schermi ad alta risoluzione (ad es., display Retina), occorre fornire immagini nitide e chiare; tuttavia non si possono usare le stesse immagini per dispositivi a bassa risoluzione per evitare inutili ritardi sui tempi di caricamento. Nelle pagine con e senza contenuti AMP, è possibile fornire immagini corrette in base alla densità di pixel usando l'attributo `srcset` con il descrittore di larghezza (`w`).

[tip type="note"] **NOTA:** Anche il selettore srcset in base alle proprozioni pixel del dispositivo ( `x` ) funziona; tuttavia, per una maggiore flessibilità, si consiglia di utilizzare il selettore `w`. In precedenza (nella vecchia versione di srcset), il descrittore `w` descriveva la larghezza della finestra di visualizzazione, ma ora descrive la larghezza del file sorgente dell'immagine, il che consente al programma utente di calcolare l'effettiva densità di pixel di ciascuna immagine e scegliere l'immagine appropriata per il rendering. [/tip]

##### Esempio: visualizzazione di un'immagine nitida che si adatta allo schermo

Nell'esempio seguente abbiamo diversi file di immagine che hanno le stesse proporzioni ma con risoluzioni diverse. Fornendo varie risoluzioni dell'immagine, il browser può scegliere l'immagine che meglio si adatta alla risoluzione del dispositivo. Inoltre, abbiamo specificato la dimensione per il rendering dell'immagine:

- Per finestre di visualizzazione larghe fino a 400 pixel, eseguire il rendering dell'immagine al 100% della larghezza di visualizzazione.
- Per finestre di visualizzazione larghe fino a 900 pixel, eseguire il rendering dell'immagine al 75% della larghezza di visualizzazione.
- Per dimensioni superiori a 900 pixel, effettuare il rendering dell'immagine a una larghezza di 600 pixel.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw,
            (max-width: 900px) 75vw, 600px"
>
</amp-img>
```

[/example]

Ad esempio, supponiamo di avere un dispositivo con una larghezza della finestra di visualizzazione di 412 pixel e una proporzione pixel di 2,6. In base al codice precedente, l'immagine deve essere visualizzata al 75% della larghezza della finestra di visualizzazione, quindi il browser sceglie un'immagine di circa 803 pixel (412 _ 0,75 _ 2,6), che corrisponde al tipo `apple-800.jpg`.

[tip type="read-on"] **CONTINUA A LEGGERE:** Per ulteriori informazioni sull'utilizzo degli attributi srcset e sizes in AMP, consultare la guida su [Art direction con srcset, sizes e heights](art_direction.md). [/tip]

#### Gestione dell'art direction delle immagini <a name="changing-the-art-direction-of-an-image"></a>

L'art direction indica il processo di adattamento delle caratteristiche visive di un'immagine ai vari punti di interruzione. Ad esempio, invece di ridimensionare semplicemente un'immagine man mano che lo schermo si restringe, è possibile offrire una versione ritagliata dell'immagine che ne restringe la messa a fuoco, oppure fornire immagini completamente diverse a seconda dei diversi punti di interruzione. In HTML, questi risultati possono essere ottenuti utilizzando l'elemento `picture`. In AMP, le procedure di art direction posono essere realizzate utilizzando l'attributo `media`.

##### Esempio: immagini di dimensioni diverse per diversi punti di interruzione

Nell'esempio seguente, abbiamo 3 diverse immagini ritagliate di un gatto che vogliamo visualizzare in diversi punti di interruzione. Quindi, se la larghezza della finestra di visualizzazione è:

- almeno 670 pixel, visualizzare `cat-large.jpg` (650 x 340 pixel)
- tra 470 - 669 pixel, visualizzare `cat-medium.jpg` (450 x 340 pixel)
- meno di 469 pixel, visualizzare `cat-small.jpg` (226 x 340 pixel)

[tip type="note"] **NOTA:** Poiché volevamo che le immagini avessero dimensioni fisse (cioè non fossero inclinate), non abbiamo specificato un valore di layout, che per impostazione predefinita sarà `layout=fixed` perché abbiamo impostato gli attributi di larghezza e altezza. Per ulteriori informazioni, consultare la sezione ["Cosa succede se l'attributo layout non è specificato?"](control_layout.md#what-if-the-layout-attribute-isnt-specified). [/tip]

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="grey cat"
  media="(min-width: 670px)"
  width="650"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(min-width: 470px) and (max-width: 669px)"
  width="450"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(max-width: 469px)"
  width="226"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"
></amp-img>
```

[/example]

[tip type="read-on"] **CONTINUA A LEGGERE:** Per ulteriori informazioni sull'utilizzo delle tecniche di art direction in AMP, consultare la guida [Art direction con srcset, sizes e heights](art_direction.md). [/tip]

#### Fornire immagini ottimizzate <a name="providing-optimized-images"></a>

La realizzazione di pagine dal caricamento rapido richiede immagini ottimizzate in termini di dimensioni, qualità e formato. Si consiglia di ridurre sempre le dimensioni dei file al livello minimo di qualità accettabile. Ci sono vari strumenti disponibili a questo scopo (es. [ImageAlph](http://pngmini.com/lossypng.html) o [TinyPNG](https://tinypng.com/) ). Alcuni formati di immagine forniscono capacità di compressione migliori rispetto ad altri (ad esempio, WebP e JPEG XR rispetto a JPEG). Si consiglia di fornire sempre l'immagine meglio ottimizzata per gli utenti e di verificare che il suo formato sia supportato dal browser dell'utente (infatti, [non tutti i browser supportano tutti i formati immagine](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

In HTML, i vari formati di immagine possono essere forniti utilizzando il tag `picture`. In AMP, sebbene il tag `picture` non sia supportato, è possibile offrire immagini diverse utilizzando l'attributo `fallback`.

[tip type="read-on"] **CONTINUA A LEGGERE:** Per ulteriori informazioni sui fallback in AMP, consulta la guida su [Segnaposti e fallback](placeholders.md). [/tip]

In AMP, ci sono due modi per realizzare immagini ottimizzate per la pubblicazione:

- Gli sviluppatori che utilizzano formati di immagine non diffusamente supportati, come WebP, possono configurare il proprio server per elaborare le intestazioni `Accept` del browser e restituire byte di immagini e [intestazioni `Content-Type`](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/client-hints/) di tipo opportuno. Ciò evita che il browser scarichi tipi di immagini non supportate. Qui puoi trovare ulteriori informazioni sulla [negoziazione dei contenuti](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation).[sourcecode:html] Accept: image/webp,image/apng,image/_,_/\*;q=0.8 [/sourcecode]
- Fornire fallback di immagini nidificati, come mostrato nell'esempio seguente.

##### Esempio: fornitura di diversi formati di immagine

Nell'esempio seguente, se il browser supporta WebP, fornisce l'immagine mountains.webp, altrimenti mountains.jpg.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

In aggiunta, alcune cache, come la cache AMP di Google, comprimono e convertono automaticamente le immagini in formato WebP e alle giuste risoluzioni, se il codice utente non lo fa. Tuttavia, non tutte le piattaforme utilizzano le cache, quindi è comunque necessario procedere all'ottimizzazione manuale delle immagini.

[tip type="read-on"] **CONTINUA A LEGGERE:** Per ulteriori informazioni sulle ottimizzazioni delle immagini applicate dalla cache AMP Google, consultare il post del blog ["Cache AMP Google, AMP Lite e l'esigenza della velocità"](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html). [/tip]

## Esempi da cui trarre spunto

Ecco alcuni esempi che speriamo possano essere di aiuto per la creazione di pagine AMP con contenuti reattivi:

#### Produzione

- [Getty Images "2016 in Focus" ](http://www.gettyimages.com/2016/)
- [BRIT + CO's holiday gift guide](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### Esempi realizzati da AMP

- [Esempi](../../../../documentation/examples/index.html)
- [Modelli](../../../../documentation/templates/index.html)
- [AMP Conf Workshop Codelab: Realizzazione di meravigliosi contenuti AMP](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)

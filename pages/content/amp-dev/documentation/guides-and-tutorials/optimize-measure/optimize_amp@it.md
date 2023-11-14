---
$title: Ottimizzazione delle pagine AMP ospitate
$order: 20
description: Il sistema di runtime AMP è in grado di ottimizzare la velocità delle pagine e se le pagine AMP sono fornite da una cache AMP, esse sono completamente ottimizzate per offrire le massime prestazioni di caricamento ...
author: sebastianbenz
---

Questa guida fornisce suggerimenti e indicazioni per i webmaster che intendono ottimizzare i loro siti web AMP ospitati.

### L'AMP è davvero così veloce per definizione?

Il sistema di runtime AMP è in grado di [ottimizzare la velocità](../../../about/how-amp-works.html) delle pagine e se le pagine AMP sono fornite da una [cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md), esse sono completamente ottimizzate per offrire le massime prestazioni di caricamento. Ad esempio, se gli utenti accedono alle tue pagine AMP da Google Search su dispositivi mobili, per impostazione predefinita le pagine saranno fornite da una cache AMP.

Tuttavia, le pagine AMP non vengono sempre fornite da una cache AMP. Un sito web può decidere di mostrare pagine AMP dai propri server per altre sorgenti di traffico. Il caso più frequente è quello di siti realizzati completamente in AMP, come [tasty.co](https://tasty.co), in cui gli utenti hanno la possibilità di accedere direttamente al sito. Un'altra fonte di traffico è Twitter, che ha iniziato [a fornire collegamenti alle versioni AMP delle pagine](https://searchengineland.com/twitter-ramps-amp-278300) invece di quelle mobili standard. Se un utente clicca su un collegamento in una delle app mobili di Twitter, il collegamento porta alla versione AMP della pagina in questione direttamente sulla sua origine (se disponibile).

Di conseguenza, non sempre le tue pagine AMP saranno fornite solo da cache AMP. Nei casi in cui le pagine AMP sono fornite dai loro server di origine, è importante assicurarsi che esse offrano ugualmente prestazioni di caricamento ottimali.

Le pagine AMP si caricano velocemente per impostazione predefinita, ma ci sono alcune ottimizzazioni aggiuntive delle prestazioni implementabili per permettere ai browser di caricare le pagine ancora più velocemente. Questa guida descrive alcune ottimizzazioni da considerare per la pubblicazione di pagine AMP. Tuttavia, prima di iniziare a leggere, occorre aver studiato tutte le [procedure consigliate per ottimizzare le prestazioni web fondamentali](#basic-optimizations). In particolare, l'ottimizzazione delle immagini ha un grande impatto sulla velocità di caricamento delle pagine.

Ad esempio, si possono applicare le seguenti tecniche di ottimizzazione:

- [Caricamento ottimizzato del runtime AMP](#optimize-the-amp-runtime-loading)
- [Pre-caricamento di immagini hero](#preload-hero-images) (senza modificare dimensione/codifica dell'immagine)
- [Ottimizzazione dei caratteri personalizzati](#optimize-custom-fonts) (in questo caso, i caratteri Google)

il caricamento del modello ["The Scenic"](../../../documentation/templates/index.html) è [più veloce di due secondi sulle connessioni 3G](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0).

Se vuoi saltare i dettagli dell'implementazione, puoi usare il [generatore Boilerplate AMP](/boilerplate) per generare direttamente pagine AMP ottimizzate personalizzate.

### Ottimizzazione del caricamento del sistema runtime AMP <a name="optimize-the-amp-runtime-loading"></a>

Anche se la specifica AMP è già abbastanza restrittiva sui markup consentiti nella sezione `<head>`, c'è ancora spazio per ottimizzazioni. Il segreto è strutturare la sezione `<head>` in modo che tutti gli script che bloccano il rendering e i caratteri personalizzati vengano caricati il più velocemente possibile.

Di seguito è riportato l'ordine consigliato per gli elementi della sezione `<head>` in una pagina AMP:

[sourcecode:html]

<!doctype html>

        <meta charset="utf-8">     <meta name="viewport" content="width=device-width">     <meta name="description" content="This is the AMP Boilerplate.">     <link rel="preload" as="script" href="https://ampjs.org/v0.js">     <link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">     <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin="">     <script async="" src="https://ampjs.org/v0.js"></script>     <script async="" custom-element="amp-experiment" src="https://ampjs.org/v0/amp-experiment-0.1.js"></script>     <comment></comment>     <style amp-custom=""><br>      /* Add your styles here */<br>    </style>     <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">     <style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>     <link rel="canonical" href=".">     <title>My AMP Page</title>           <h>Hello World</h>     [/sourcecode]

Esaminiamo tale ordine un elemento alla volta:

1. Il primo tag deve essere il tag `meta charset`, seguito da eventuali tag `meta` rimanenti.

2. Quindi occorre precaricare il tag `v0.js` `<script>` del runtime AMP con `<link as=script href=https://ampjs.org/v0.js rel=preload>`. Il download del sistema di runtime AMP deve iniziare appena possibile, poiché il componente [AMP boilerplate](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) nasconde il documento tramite l'attributo `body { visibility:hidden }` fino al termine di tale caricamento. Il precaricamento del sistema di runtime AMP dice al browser di caricare con la massima priorità lo script. Puoi dare un'occhiata alla sezione [rendering lato server](#server-side-rendering) per imparare ad evitare questa situazione. {amp-img6} {/amp-img6}

3. Se la pagina include estensioni che ritardano il rendering (ad es. Amp-experiment, amp-dynamic-css-classes, amp-story), occorre precaricare tali estensioni in base a come sono richieste dal runtime AMP per il rendering della pagina. [sourcecode: html]

<link as="script" rel="preload" href="https://ampjs.org/v0/amp-custom-css-0.1.js"> <link as="script" rel="preload" href="https://ampjs.org/v0/amp-experiment-0.1.js"> <link as="script" rel="preload" href="https://ampjs.org/v0/story-1.0.js">[/sourcecode] 1.  Usare [preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) per velocizzare la connessione all'altra risorsa che non conosce in anticipo l'URL completo della risorsa, ad esempio Google Fonts: [sourcecode:html]&amp;amp;lt;link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin&amp;amp;gt;[/sourcecode] 1.  Caricare il runtime AMP: [sourcecode:html]&amp;amp;lt;script async src="https://ampjs.org/v0.js"&amp;amp;gt;&amp;amp;lt;/script&amp;amp;gt;[/sourcecode] 1.  Indicare i tag `<script>` per [render-delaying extensions](https://github.com/ampproject/amphtml/blob/main/src/render-delaying-services.js) (ad es., [`amp-experiment`](../../../documentation/components/reference/amp-experiment.md) [`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md) and [`amp-story`](../../../documentation/components/reference/amp-story.md)&lt;br&gt;1.  Indicare i tag`&amp;lt;script&amp;gt;` per le estensioni rimanenti (ad es., [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ...). Tali estensioni non ritardano il rendering per cui non devono essere precaricate, poiché potrebbero consumare preziose risorse di rete al rendering iniziale.&lt;br&gt;1.  Indicare eventuali stili personalizzati tramite tag &amp;lt;style amp-custom&amp;gt;`.&lt;br&gt;1.  Aggiungere gli altri tag consentiti nella sezione `&amp;lt;head&amp;gt;`. In particolare, i font esterni vanno alla fine perché bloccano il rendering. 1.  Infine indicare [AMP boilerplate code](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md). Inserendo il codice boilerplate alla fine, si evita che gli stili personalizzati possano sovrascrivere inavvertitamente le regole css boilerplate.&lt;br&gt;</script>

[tip] La cache AMP esegue automaticamente tutte queste ottimizzazioni (e alcune altre). Puoi utilizzare lo strumento AMP Optimizer per eseguire automaticamente queste ottimizzazioni sulle pagine della tua origine. [/tip]

### Precaricamento delle immagini hero <a name="preload-hero-images"></a>

[AMP HTML utilizza un proprio elemento per le immagini: `amp-img`](../../../documentation/components/reference/amp-img.md). Sebbene [`amp-img`](../../../documentation/components/reference/amp-img.md) abbia molti vantaggi rispetto al tradizionale tag HTML `img`, uno svantaggio è che il sistema di runtime AMP deve essere caricato prima che il download dell'immagine possa iniziare. Per alcune immagini, come le immagini hero per una pagina di prodotto, è fondamentale che esse siano caricate il più rapidamente possibile. In questi casi, è meglio pre-caricare l'immagine per assicurarsi che il browser inizi a scaricare l'immagine il prima possibile e non sia necessario attendere il caricamento del runtime AMP.

[sourcecode:html]

   <link rel="preload" href="/images/elephants.png" as="image">     ...   {amp-img1}   {/amp-img1}  [/sourcecode]

Ma cosa succede se il layout reattivo richiede immagini hero diverse a seconda della larghezza dello schermo? Ad esempio, un'immagine ampia per desktop e un'immagine più stretta per dispositivi mobili come in questo caso:

[sourcecode:html] {amp-img0} {/amp-img0} {amp-img1} {/amp-img1} [/sourcecode]

La cosa buona è che `link rel=preload` supporta anche le media query. Quindi possiamo usare le stesse media query nelle nostre istruzioni di precaricamento, in questo modo:

[sourcecode:html]


<link rel="preload" as="image" href="/images/elephants_narrow.png" media="(max-width: 415px)"> <link rel="preload" as="image" href="/images/elephants_wide.jpg" media="(min-width: 416px)"> [/sourcecode]

Lo stesso approccio funziona anche per le immagini dei poster in [`amp-video`](../../../documentation/components/reference/amp-video.md):

[sourcecode:html]


<link rel="preload" href="/images/poster.jpg" as="image"> ...  {amp-video1}      ... {/amp-video1} [/sourcecode]

Occorre essere sicuri di inserire le istruzioni di precaricamento *dopo* la dichiarazione della finestra di visualizzazione perché il browser necessita delle dimensioni della finestra per determinare la larghezza dello schermo:

[sourcecode:html]


<meta name="viewport" content="width=device-width">(max-width: 415px)" ...=""> [/sourcecode]

[tip type="important"] Precaricare solo le immagini critiche, altrimenti il download dell'immagine potrebbe occupare risorse di rete richieste per il download di altri elementi critici. [/tip]

### Considerare l'idea di utilizzare un processo di lavoro dei servizi

Ora che tutti i [principali browser supportano i processi di lavoro dei servizi](https://caniuse.com/#feat=serviceworkers), è una buona idea valutare l'opportunità di aggiungerne uno al proprio sito.

Esistono due diverse architetture di rete che funzioneranno per navigazioni rapide e affidabili:

- Per applicazioni a pagina singola: il modello App Shell (che nel contesto AMP è detto [AMP-in-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)). Questo modello richiede che un processo di lavoro dei servizi trasformi un documento AMP in una PWA basata su app shell.
- Per applicazioni multi-pagina: [streaming di risorse composte](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). Un processo di lavoro dei servizi memorizza nella cache l'intestazione e il piè di pagina statici e utilizza lo streaming per restituire immediatamente una risposta parziale memorizzata nella cache durante il caricamento del contenuto.

Se nessuno di questi modelli viene utilizzato e non è possibile memorizzare nella cache l'intero sito (il che può avvenire solo per siti molto piccoli), il processo di lavoro dei servizi potrebbe avere un [impatto negativo sulle prestazioni](https://developers.google.com/web/updates/2017/02/navigation-preload). La cosa migliore in questo caso è  **non** utilizzarne.

Tuttavia, se occorre che il sito web sia [installabile dalla schermata iniziale](https://developers.google.com/web/fundamentals/app-install-banners/) o per offrire un'esperienza offline, l'uso di un processo di lavoro dei servizi sarà necessario. In questo caso, è importante utilizzare il [precaricamento di navigazione](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) per ridurre il potenziale rallentamento (Nota: attualmente, il precaricamento di navigazione è supportato solo in Chrome).

Ecco alcune procedure consigliate, se un sito web AMP utilizza un processo di lavoro dei servizi:

- Pre-memorizzare nella cache il [sistema runtime AMP](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) e le estensioni (ad es. [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- Pre-memorizzare nella cache loghi, caratteri e altri contenuti statici utilizzati nella maggior parte delle pagine.
- Fornire loghi, caratteri e immagini utilizzando una [strategia cache-first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
- Fornire il sistema di runtime e le estensioni AMP utilizzando una strategia di [aggiornamento durante la riconvalida](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate).
- Quando si utilizza una strategia network-first per le richieste di navigazione, assicurarsi di abilitare il [precaricamento di navigazione](https://developers.google.com/web/updates/2017/02/navigation-preload).

Se stai pensando di inserire un processo di lavoro dei servizi nel tuo sito AMP, dai un'occhiata a questo [esempio](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg) che ne fornisce uno che implementa tutte le procedure consigliate.

[tip type="note"] Il sistema di runtime AMP viene pubblicato al massimo 50 minuti dopo ogni aggiornamento per garantire che le modifiche siano sempre disponibili rapidamente. Per evitare probabili mancanze nella cache del browser, è una buona idea fornire il sistema di runtime AMP in uso da un processo di lavoro. [/tip]

La pre-memorizzazione in cache è importante per una rapida transizione dalle pagine AMP nella cache a pagine sulla loro origine, con o senza contenuti AMP. Il motivo è che la cache AMP riscrive gli URL del sistema di runtime AMP, modificando l'URL sempre valido in quello dell'ultima versione rilasciata, ad esempio:

`https://ampjs.org/v0.js` -> `https://ampjs.org/rtv/001515617716922/v0.js`.

La conseguenza è che una pagina AMP fornita dalla propria origine non beneficia del caching del browser e in questo caso deve scaricare nuovamente il runtime AMP (senza versione). Un processo di lavoro permette di pre-memorizzare nella cache il runtime AMP senza versione e accelerare la transizione. Per ulteriori informazioni sul motivo per cui la cache AMP applica le versioni agli URL di runtime AMP, consultare [questo documento](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime).

[tip type="note"] In Safari, c'è una differenza fondamentale nel modo in cui vengono implementati i processi di lavoro dei servizi: non è possibile in Safari installare un processo di lavoro per la propria origine, se la pagina è fornita da una cache AMP. [/tip]

### Ottimizzazione dei caratteri personalizzati <a name="optimize-custom-fonts"></a>

In AMP ci sono alcuni modi per ottimizzare il caricamento dei caratteri (la [maggior parte di essi non sono in realtà specifici di AMP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- Se possibile, utilizzare la direttiva [}font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display): essa userà i caratteri solo se sono già nella cache e tornerà ai caratteri di sistema se quelli personalizzati non sono stati ancora caricati.
- Ottimizzare i caratteri web (ad esempio, fornire caratteri personalizzati usando WOFF2).
- Pre-caricare i caratteri personalizzati: [sourcecode:html]


<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2">[/sourcecode] -Se si usano caratteri Google o di qualsiasi altro fornitore con URL di caratteri sconosciuto, occorre precollegare il rispettivo server: [sourcecode:html]  <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin> [/sourcecode]

Altra cosa importante, prova a ridurre al minimo il numero di caratteri personalizzati che utilizzi sulla tua pagina. Se puoi, usa i caratteri di sistema invece dei caratteri personalizzati perché i caratteri di sistema fanno corrispondere il tuo sito web al sistema operativo dell'utente ed evitano di caricare altre risorse.

### Layout AMP per il rendering lato server <a name="server-side-rendering"></a>

Il layout AMP con rendering lato server è una tecnica utilizzata dalle cache AMP per accelerare ulteriormente i tempi di caricamento. Con il rendering lato server è possibile rimuovere il boilerplate AMP in modo che il documento AMP possa essere tracciato senza eseguire JavaScript di runtime AMP. Ad esempio, la versione con rendering lato server di AMP Boilerplate Generator è [due volte più veloce](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual) della normale versione AMP!

Se stai pubblicando una pagina AMP, dovresti assolutamente considerare l'utilizzo di [AMP Optimizer](amp-optimizer-guide/index.md). Gli ottimizzatori AMP consentono di pubblicare pagine AMP ottimizzate dal tuo backend che includono layout AMP con rendering lato server. L'ottimizzatore AMP esegue automaticamente anche molti altri miglioramenti descritti in questo documento.

### Ottimizzazioni di base <a name="basic-optimizations"></a>

Ovviamente, tutte le ottimizzazioni di base delle prestazioni web si applicano anche alle pagine AMP:

- [Ottimizza immagini](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) e video. L'ottimizzazione delle immagini può avere un impatto enorme sulle prestazioni di caricamento.
- [Comprimi e minimizza il codice CSS e HTML](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). Poiché tutti gli elementi CSS nelle pagine AMP sono inline, è consigliabile usare strumenti quali [purifycss](https://github.com/purifycss/purifycss) per ridurre CSS inutili.
- Usa la [cache HTTP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ... e <a>molto altro</a>

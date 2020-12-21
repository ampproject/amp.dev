---
"$title": Pre-caricamento di contenuti PWA dalle pagine AMP
"$order": '1'
description: Una buona strategia è quella di trasformare il punto di ingresso nel tuo sito in una pagina AMP, quindi preparare il contenuto PWA dietro le quinte e passare a ...
formats:
- websites
author: pbakaus
---

Una buona strategia è quella di trasformare il **punto di ingresso nel tuo sito in una pagina AMP**, quindi **&nbsp;preparare il contenuto PWA dietro le quinte** e passare ad esso per proseguire il viaggio:

- Tutte le pagine "foglia" del contenuto (quelle che hanno contenuto specifico, non le pagine di panoramica) sono pubblicate come contenuto AMP per garantire un'esperienza di caricamento quasi istantanea.
- Questi contenuti AMP utilizzano lo speciale elemento [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) di AMP per preparare una cache e la shell PWA mentre l'utente si sta godendo i tuoi contenuti.
- Quando l'utente fa clic su un altro collegamento sul tuo sito web (ad esempio, il pulsante di invito all'azione in basso per un'esperienza più simile a quella di un'app), il service worker intercetta la richiesta, sostituisce la pagina e carica al suo posto la shell PWA.

Continua la lettura per scoprire perché e come utilizzare questo modello di sviluppo.

## Migliorare l'esperienza dell'utente tramite la connessione a contenuti PWA

### Uso di AMP per attrarre gli utenti

I contenuti AMP sono la scelta ideale per le cosiddette **pagine foglia**, cioè pagine di contenuti che gli utenti scoprono nel loro complesso tramite motori di ricerca, collegamenti condivisi da un loro amico o collegamenti da altri siti. Grazie al [pre-rendering speciale](../../../about/how-amp-works.html) dei contenuti AMP, le pagine AMP si caricano in modo molto veloce, il che a sua volta implica molti meno abbandoni delle pagine (gli ultimi risultati di uno [studio di DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) mostrano che **oltre il 53% degli utenti abbandona la pagina dopo 3 secondi di attesa**).

### PWA per una maggiore interattività e un ricco engagement

I contenuti PWA (App Web progressive, Progressive Web Apps) d'altra parte offrono una maggiore interattività, ma non hanno le stesse *caratteristiche di primo caricamento istantaneo* offerte dalle pagine AMP. I PWA si basano sulla tecnologia dei cosiddetti Service Worker: si tratta di proxy lato client che permettono di memorizzare in una cache tutti i tipi di risorse per la tua pagina, ma tali Service Worker si attivano solo *dopo* il primo caricamento.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='Pro e contro di AMP e PWA.') }}

## Preparare i contenuti PWA con `amp-install-serviceworker`

AMP ha la possibilità di installare il Service Worker dall'App Web Progressiva da una pagina AMP, anche se quella pagina AMP viene fornita da una cache AMP! Se realizzato correttamente, un collegamento che porta ai contenuti PWA (da una delle pagine AMP) sembrerà quasi istantaneo, simile al primo passaggio a una pagina AMP.

[tip type="tip"] **SUGGERIMENTO:** Se non hai ancora familiarità con i Service Worker, ti consigliamo [il corso Udacity di](https://www.udacity.com/course/offline-web-applications--ud899) Jake Archibald. [/tip]

Innanzitutto, installare il service worker su tutte le pagine AMP usando [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), includendo prima il componente tramite il suo script nella sezione `<head>` della pagina:

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

Quindi aggiungere quanto segue in qualche punto all'interno della sezione `<body>` (modificare il codice per farlo puntare all'effettivo processo di lavoro dei servizi):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Alla fine, nella fase di installazione del service worker, memorizzare nella cache tutte le risorse di cui il PWA avrà bisogno:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

[tip type="tip"] **SUGGERIMENTO:** esistono modi più semplici per gestire un service worker. Dai un'occhiata alle [librerie di supporto dei Service Worker](https://github.com/GoogleChrome/sw-helpers). [/tip]

## Fare in modo che tutti i collegamenti su una pagina AMP accedano ai contenuti PWA

È probabile che la maggior parte dei collegamenti sulle tue pagine AMP conducano ad altre pagine di contenuti. Esistono due strategie per assicurarsi che i clic dei collegamenti successivi portino a un "aggiornamento" dell'APP Web progressiva, [a seconda del modo in cui si utilizza AMP](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. Abbinando le pagine canoniche alle pagine AMP

In questo caso, si dispone di un sito web canonico (non AMP) e si generano pagine AMP collegate a queste pagine canoniche. Questo è attualmente il modo più comune in cui viene utilizzato AMP e implica che i collegamenti sulle tue pagine AMP porteranno probabilmente alla versione canonica del tuo sito. **Buone notizie: se il tuo sito canonico è il tuo contenuto PWA, allora è tutto pronto**.

### 2. Se il sito canonico è AMP

In questo caso le tue pagine canoniche *sono* pagine AMP: vuol dire che stai realizzando il tuo intero sito web in AMP e usi AMP come libreria (particolare divertente: lo stesso sito su cui stai leggendo queste pagine è stato realizzato in questo modo). **In questo scenario, la maggior parte dei collegamenti alle tue pagine AMP porterà ad altre pagine AMP.**

Ora puoi distribuire il tuo contenuto PWA su un percorso separato come `your-domain.com/pwa` e utilizzare il Service Worker che è già in esecuzione per **intercettare la navigazione del browser quando qualcuno fa clic su un collegamento nella pagina AMP**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

La cosa particolarmente interessante di questa tecnica è che ora stai usando un'ottimizzazione progressiva per passare da contenuti AMP a PWA. Tuttavia, ciò significa anche che i browser che non supportano ancora i service worker passeranno sempre da AMP a AMP, senza mai passare effettivamente a contenuti PWA.

AMP risolve questo problema con uno strumento chiamato [riscrittura dell'URL shell](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite). Aggiungendo un pattern URL di fallback al tag [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), stai dicendo ad AMP di riscrivere tutti i collegamenti corrispondenti a una determinata pagina per passare invece a un altro URL di shell legacy, se non è disponibile alcun supporto per i server worker:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Con questi attributi attivi, tutti i clic successivi su un contenuto AMP andranno al tuo PWA, indipendentemente da qualsiasi service worker.

[tip type="read-on"] **CONTINUA A LEGGERE:** Sei già arrivato molto avanti. Perché non riutilizzare le tue pagine AMP esistenti per costruire il tuo contenuto PWA? [Qui puoi trovare come fare](amp-in-pwa.md). [/tip]

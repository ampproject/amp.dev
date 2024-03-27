---
'$title': Trasforma il tuo sito AMP in una PWA
$order: 10
description: "Memorizzando le risorse nella cache all'interno del browser, le PWA (Progressive Web Applications) sono in grado di fornire dati, risorse e pagine offline, mantenendo elevato il coinvolgimento e il contenuto informativo degli utenti."
tutorial: 'true'
formats:
  - websites
author: crystalonscript
---

Le Progressive Web App (App web progressive) sfruttano la potenza dei [Processi di lavoro dei servizi](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), che consentono di realizzare esperienze d'uso offline eccellenti e coerenti, utilizzando diversi punti di forza della rete. Memorizzando le risorse nella cache all'interno del browser, le PWA (Progressive Web Applications) sono in grado di fornire dati, risorse e pagine offline, mantenendo elevato il coinvolgimento e il contenuto informativo degli utenti.

Questo esercitazione mostrerà come trasformare un sito AMP in una PWA installabile con funzionalità offline aggiungendo un Web Manifest e un Processo di lavoro dei servizi grazie allo strumento AMP Service Worker.

# Download ed esecuzione del codice di avviamento

Scaricare il [codice di avviamento da qui](/static/files/tutorials/amptopwa.zip).

Utilizzare un server web locale per visualizzare un anteprima del sito web.

[tip type="default"] **SUGGERIMENTO:** Per un server web veloce, eseguire il comando `python -m SimpleHTTPServer` .[/tip]

Dovrebbe essere visualizzata la pagina di destinazione di Lyrical Lightning, il festival Mobile Music Magic. Ha un collegamento sulla pagina iniziale per visualizzare il programma e il palco su cui si esibiscono le band.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

Gli utenti del nostro sito potrebbero riscontrare una connettività di rete irregolare durante l'evento proprio quando avrebbero bisogno di accedere al programma della manifestazione. Questo sito è un ottimo esempio per la trasformazione di una pagina web in una PWA, che può essere installata nella schermata iniziale del dispositivo utente e fornire tutte le funzionalità principali anche se l'utente è offline.

# Creazione di un Web app manifest

Un [web app manifest](https://developers.google.com/web/fundamentals/web-app-manifest/) è un semplice file JSON che fornisce al browser informazioni sull'applicazione web e su come deve comportarsi dopo essere stata "installata" sul dispositivo mobile o sul computer dell'utente. La presenza di un manifest è richiesta da molti browser per visualizzare la richiesta [Aggiungi alla schermata iniziale](https://developers.google.com/web/fundamentals/app-install-banners/).

Aggiungere un file di nome `manifest.json` al proprio archivio con il codice seguente:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# Aggiunta del processo di lavoro dei servizi AMP

Un processo di lavoro dei servizi è uno script che il browser esegue in background, separatamente dalle pagine web, che estende le funzionalità del browser, memorizzando nella cache le richieste per migliorare le prestazioni e fornire funzionalità offline. La realizzazione di un processo di lavoro dall'inizio è possibile ma richiede tempo. Ci sono librerie come Workbox che aiutano allo scopo, ma AMP fa un ulteriore passo avanti offrendo [AMP Service Worker](https://github.com/ampproject/amp-sw). Tale strumento automatizza molte procedure, quali la memorizzazione nella cache di script, risorse e documenti AMP, oltre all'implementazione delle più diffuse procedure consigliate, come il [pre-caricamento per la navigazione](https://developers.google.com/web/updates/2017/02/navigation-preload).

Dopo l'installazione, il processo di lavoro dei servizi AMP è in grado di memorizzare automaticamente nella [cache script](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) e [documenti AMP](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) quando l'utente li richiede. Inizieremo aggiungendo un processo di lavoro dei servizi AMP basilare.

## Creazione del file per il processo di lavoro dei servizi

Creare un file di nome `sw.js` e aggiungervi il codice seguente:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

Queste due semplici righe di codice sono in grado di importare e inizializzare il Processo di lavoro dei servizi AMP nel proprio.

## Installazione automatica del processo di lavoro dei servizi sulle pagine AMP

I siti web AMP utilizzano il componente [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) per installare in background il processo di lavoro sul browser, mentre l'utente sta usufruendo dei contenuti del sito.

Posizionare il tag dello script richiesto nell'intestazione di `index.html` e l'elemento `<amp-install-serviceworker>` all'interno della sezione `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Importante: ** Per riuscire a memorizzare nella cache tutti i contenuti di un sito, il processo di lavoro dei servizi deve essere fornito dalla directory principale (`/sw.js`) .[/tip]

L'elemento `<amp-install-serviceworker>` installa il processo di lavoro dei servizi creando un iframe ed eseguendo il file `data-iframe-src`. Creare il file `install-sw.html` e aggiungere il codice seguente:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

L'iframe registra il file del processo di lavoro dei sevizi AMP nel browser.

# Personalizzazione dei contenuti memorizzati in cache

Il processo di lavoro dei servizi AMP è dotato di vantaggiosi strumenti integrati e consente campi opzionali configurabili per ottimizzare le operazioni in base alle esigenze dell'app.

La nostra app per i festival musicali memorizzerà nella cache le nostre risorse di immagini, pre-caricherà il link di lineup e indicherà una pagina offline.

## Memorizzazione risorse in cache

Si possono configurare i processi di lavoro dei servizi per memorizzare in [cache le risorse](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching), quali immagini, video e caratteri. Ce ne serviremo per memorizzare in cache la nostra immagine di sfondo e il logo AMP. Aprire il file `sw.js` e aggiornarlo con il seguente codice:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

La strategia di memorizzazione in cache indicata è la direttiva [cache first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network). Significa che l'app proverà a fornire immagini dalla cache prima di richiedere qualsiasi risorsa dalla rete. Ciò è particolarmente utile per questa app poiché la nostra immagine di sfondo e il logo AMP non dovranno essere aggiornati.

## Pre-caricamento dei link

Il processo di lavoro dei servizi AMP esegue il pre-caricamento dei link che hanno l'attributo `data-rel=prefetch`. Ciò consente agli utenti di visualizzare le pagine offline anche se non le hanno ancora visitate. Aggiungeremo l'attributo al nostro tag di collegamento per `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Visualizzazione di pagine offline

Per gestire casi imprevisti o clic su collegamenti a pagine non pre-caricate, aggiungeremo una pagina offline per offrire un'esperienza d'uso coerente con il brand, invece di mostrare la generica pagina offline offerta dal browser. Scaricare [da qui `offline.html`](/static/files/tutorials/offline.zip) e aggiornare `sw.js` con il seguente codice:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# Test della PWA

Per verificare che il processo di lavoro dei servizi AMP in uso sta memorizzando nella cache le risorse necessarie e offre una soluzione offline corretta, si può utilizzare lo strumento [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

Testeremo il sito Lyrical Lyghtning aprendo il pannello DevTools tramite `Ctrl + Shift + I` su Windows o `Cmd + Opt + I` su Mac. Si può anche fare clic con il pulsante destro del mouse sulla pagina e selezionare `ispeziona` dal menu. Quindi selezionare `Applicazione` per visualizzare la registrazione del processo di lavoro.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Fare clic sulla casella `offline` per passare alla modalità offline. Fare clic sul link `see full lineup` e accedere a `offline.html` per controllare che le risorse siano state memorizzate in cache e pre-caricate correttamente.

[tip type="default"] **Suggerimento:** Per un'analisi approfondita delle funzioni di una Progressive Web App, eseguire [lo strumento Lighhouse di Google](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) che genera un report di funzionamento della PWA. [/tip]

# Congratulazioni!

Hai appena creato con successo una PWA (progressive web app) con AMP! In questa esercitazione hai appreso come:

- Creare un [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/)
- Installare un Processo di lavoro dei servizi in AMP, utilizzando il componente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- Personalizzare [il processo di lavoro dei servizi AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [Pre-caricamento dei link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- Creare pagine offline

Ulteriori informazioni sui [Processi di lavoro dei servizi](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) e [considerazioni sull'esperienza utente offline](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Consulta i consigli per [tracciare il coinvolgimento utenti tramite strumenti di analisi](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html) e segui l'esercitazione su [come configurare gli strumenti di analisi di base per le pagine AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).

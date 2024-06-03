---
$title: Semplice accesso offline e miglioramento delle prestazioni
description: Un processo di lavoro dei servizi è un proxy lato client che si trova tra la tua pagina e il tuo server e permette di realizzare fantastiche esperienze offline, ottenere caricamenti rapidi ...
---

[I processi di lavoro dei servizi](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) consentono di realizzare esperienze d'uso offline eccellenti e coerenti, utilizzando diversi punti di forza della rete. Memorizzando nella cache le risorse all'interno del browser, un'app web è in grado di fornire dati, risorse e pagine offline che mantengono gli utenti interessati e informati.

Ricorda: i processi di lavoro dei servizi non sono in grado di interagire con le versioni delle pagine memorizzate nella cache AMP. Pertanto vanno usati solo in caso di accesso diretto all'origine delle pagine.

## Installazione di un processo di lavoro dei servizi

Un processo di lavoro dei servizi è un proxy lato client che si trova tra la tua pagina e il tuo server e permette di realizzare fantastiche esperienze offline, ottenere caricamenti rapidi delle shell app e l'invio di notifiche push.

[tip type="note"] **NOTA: ** Chi non ha dimestichezza con il concetto di processo di lavoro dei servizi può consultare il documento [Introduzione ai fondamenti del web](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers). [/tip]

Un processo di lavoro dei servizi deve essere registrato su una determinata pagina, altrimenti il browser non lo troverà né lo eseguirà. Per impostazione predefinita, questo viene fatto con l'aiuto di un [po' di codice JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). Nelle pagine AMP, occorre utilizzare il componente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) per ottenere lo stesso risultato.

A questo scopo, occorre prima includere il componente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) tramite il suo script nella sezione `<head>` della pagina in questione:

[sourcecode:html]

<script async="" custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Quindi aggiungere quanto segue in un punto all'interno della sezione `<body>` (modificare il codice per farlo puntare all'effettivo processo di lavoro dei servizi):

[sourcecode:html] {amp-install-serviceworker0} {/amp-install-serviceworker0} [/sourcecode]

In caso gli utenti raggiungono le tue pagine AMP sulla tua origine (diversamente da quanto avviene con il primo clic, che di solito è fornito da una cache AMP), il processo di lavoro dei servizi entrerà in azione e permetterà di fare [moltissime cose interessanti](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

##Il processo di lavoro dei servizi AMP

Se sei arrivato a leggere queste pagine, stai realizzando pagine con contenuti AMP. Il team AMP mette sempre gli utenti al primo posto, allo scopo di offrire loro un'esperienza web di primissima qualità. Per realizzare questi obiettivi, il team AMP ha creato un processo di lavoro dei servizi appositamente per AMP!

[tip type="default"] **SUGGERIMENTO:** Segui la nostra esercitazione per imparare a utilizzare i [processi di lavoro dei servizi AMP nelle tue app web progressive (PWA)](/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md). [/tip]

### Installazione del processo di lavoro dei servizi AMP

Installare il processo di lavoro dei servizi AMP con la seguente semplice procedura:

- Importare il codice del processo di lavoro dei servizi AMP nel relativo file. [sourcecode:js] importScripts ('https://cdn.ampproject.org/sw/amp-sw.js'); [/sourcecode]

- Installare il processo di lavoro dei servizi con il seguente codice. [sourcecode:js] AMP_SW.init(); [/sourcecode]

- Fatto.

### Memorizzazione automatica nella cache

Il processo di lavoro dei servizi AMP memorizza automaticamente nella cache i file di script e i documenti AMP. Memorizzando nella cache i file degli script AMP, essi sono immediatamente disponibili al browser degli utenti, consentendo funzionalità offline e il caricamento più veloce di pagine su reti instabili.

Se l'app richiede tipi specifici di memorizzazione nella cache dei documenti, il processo di lavoro dei servizi AMP consente personalizzazioni. Ad esempio, l'aggiunta di un elenco di elementi non consentiti per i documenti che dovrebbero essere sempre richiesti dalla rete. Nell'esempio seguente, sostituire `Array<RegExp>` con un array di espressioni regolari che rappresentano i documenti che non si vogliono memorizzare nella cache.

[sourcecode:js] AMP_SW.init( documentCachingOptions: { denyList?: Array<regexp>; } ); [/sourcecode]</regexp>

Ulteriori informazioni sulla [personalizzazione della memorizzazione dei documenti nella cache qui](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching).

### Ottimizzazione del processo di lavoro dei servizi AMP

Per utilizzare al meglio il processo di lavoro dei servizi AMP, i campi opzionali devono essere configurati per memorizzare nella cache i collegamenti necessari al pre-caricamento delle risorse.

Le risorse che guidano la visita dell'utente a una pagina, come video, immagini importanti o PDF scaricabili, devono essere memorizzate nella cache in modo che sia possibile accedervi nuovamente se l'utente è offline.

[sourcecode:js] AMP_SW.init( assetCachingOptions: [{ regexp: /.(png|jpg)/, cachingStrategy: 'CACHE_FIRST' }], ); [/sourcecode]

È possibile personalizzare la strategia di memorizzazione nella cache e definire un elenco di elementi non consentiti.

I collegamenti alle pagine che gli utenti potrebbero visitare possono essere precaricati, consentendo loro di accedervi offline. Questo risultato può essere ottenuto aggiungendo un attributo `data-prefetch` al tag del collegamento.

[sourcecode:html] <a href="...." data-rel="prefetch"></a> [/sourcecode]

### Esperienza offline

Comunicare all'utente che si trova offline e deve provare a ricaricare il sito quando torna online, includendo una pagina offline. Il processo di lavoro dei servizi AMP può memorizzare nella cache sia la pagina che le sue risorse.

[sourcecode:js] AMP_SW.init({ offlinePageOptions: { url: '/offline.html'; assets: ['/images/offline-header.jpg']; } }) [/sourcecode]

Una pagina offline ben fatta deve sembrare parte integrante del sito originale, grazie a un'interfaccia utente coerente con il resto dell'applicazione.

### Aggiornamento forzato

Il nostro team sta lavorando all'implementazione di una funzione di aggiornamento/rimozione forzata se è necessario disabilitare o modificare il processo di lavoro dei servizi AMP, quando la distribuzione agli utenti non è andata a buon fine.

Per gestire in modo efficace un processo di lavoro dei servizi, è necessario comprendere in che modo la [memorizzazione HTTP standard nella cache influisce sull'aggiornamento del codice JavaScript del processo di lavoro dei servizi](https://developers.google.com/web/updates/2018/06/fresher-sw). I processi di lavoro forniti con le opportune direttive HTTP di memorizzazione nella cache possono risolvere piccoli bug, apportando le modifiche richieste e ridistribuendo i processi di lavoro nell'ambiente di hosting. Se è necessario rimuovere un processo di lavoro, occorre preparare per esso un file semplice che permette di [disattivarlo](https://en.wikipedia.org/wiki/NOP), come nel seguente esempio:

```js
self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
```

[tip type="read-on"] [Ulteriori informazioni](https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776) nel documento sulla gestione dei processi di lavoro dei servizi distribuiti. [/tip]

## Preparazione di un processo di lavoro dei servizi personalizzato

Si può utilizzare la tecnica sopra descritta per abilitare l'accesso offline al proprio sito web AMP, ma anche per estendere le pagine **non appena vengono fornite dall'origine**. Questo perché la risposta può essere modificata tramite l'evento `fetch` del processo di lavoro dei servizi e restituire qualsiasi risposta richiesta:

[sourcecode:js] self.addEventListener('fetch', function(event) { event.respondWith( caches.open('mysite').then(function(cache) { return cache.match(event.request).then(function(response) { var fetchPromise = fetch(event.request).then(function(networkResponse) { cache.put(event.request, networkResponse.clone()); return networkResponse; })

```
    // Modify the response here before it goes out..
    ...

    return response || fetchPromise;
  })
})
```

); }); [/sourcecode]

Utilizzando questa tecnica, si può modificare una pagina AMP con tutti i tipi di funzionalità aggiuntive che altrimenti non passerebbero la [convalida AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). Ad esempio:

- Funzionalità dinamiche che richiedono JS personalizzato.
- Componenti personalizzati/rilevanti solo per il tuo sito.

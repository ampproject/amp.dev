---
'$title': Elenco di controllo per la pubblicazione di pagine AMP
$order: 0
description: "Il segreto per la progettazione di siti web veloci sta nella creazione di pagine web fluide che rispondano alle esigenze degli utenti, ad esempio, pagine che si adattano alle dimensioni e all'orientamento dello schermo dei dispositivi in uso. Per ottenere ..."
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

Applicare il seguente elenco di controllo per realizzare siti che offrano la migliore esperienza AMP!

# Garantire la convalida delle specifiche AMP

AMP garantisce una notevole quantità di vantaggi integrati, come la riduzione dei tempi di attesa dell'utente, tramite il pre-caricamento dei contenuti dalle cache AMP. Per sfuttare questi vantaggi, le pagine realizzate devono essere documenti AMP validi. Le pagine pubblicate con errori segnalati dallo strumento di convalida AMP non sono indicizzabili dalle cache AMP e possono essere eventualmente fornite come pagine di errore.

Utilizzando i seguenti strumenti, potrai evitare di pubblicare pagine AMP non valide:

- [Convalida delle pagine AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [Strumento di convalida AMP](https://validator.ampproject.org/)
- [Tester Google AMP](https://search.google.com/test/amp)
- [Linter AMP](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [Strumenti AMP](../../../documentation/tools.html?format=websites)

# Accesso al server delle pagine AMP memorizzate in cache

Ottime notizie: le pagine AMP valide attivano automaticamente l'accesso a tutte le cache AMP esistenti! Ciò significa che gli utenti potranno usufruire sempre di contenuti che vengono caricati in modo efficiente e sicuro. Questi tipi di ottimizzazioni sono preziose, ma hanno un piccolo problema. Le pagine AMP offerte ad alcuni utenti provengono da domini che non corrispondono a quello dell'editore. Ciò può far perdere l'accesso ai dati del sito alle pagine che utilizzano componenti AMP dinamici come [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) o [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). Questi tipi di errori sono problemi che riguardano le richieste di condivisione di risorse tra le origini o CORS (Cross-origin resource sharing). Potrai lavorare in tutta sicurezza, abilitando le richieste CORS da tutte le [cache AMP](https://cdn.ampproject.org/caches.json) disponibili! Se stai usando Node.js nel tuo sistema di backend, puoi usare il [middleware amp-cors](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

Ulteriori informazioni sulla concessione dell'accesso al server:

- [Come avviene la memorizzazione nella cache delle pagine AMP ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [Richieste CORS in AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [Middleware AMP CORS](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) per Node.js

# Contenuti sicuri e condivisibili con scambi firmati

Gli scambi firmati (SXG) permettono di conservare gli URL dei domini e semplificare le analisi durante la condivisione di contenuti. Pubblicando pagine AMP con SXG, le firme digitali proteggono le informazioni legando il documento al suo URL richiesto. Questo meccanismo considera le sessioni utente e i cookie come contenuti proprietari, colmando possibili lacune nelle analisi. L'implementazione degli SXG aggiunge nuovi contenuti AMP firmati che non si sostituiscono ai normali contenuti AMP.

Ulteriori informazioni sull'implementazione di scambi firmati:

- [Pubblicare contenuti AMP utilizzando scambi firmati](signed-exchange.md?format=websites)
- [Scambi HTTP firmati](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [URL reale di Cloudflare AMP](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Scambi firmati per generare URL AMP migliori e analisi più semplici (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Test delle pagine memorizzate in cache

Le cache AMP memorizzano immagini, caratteri e contenuti delle pagine per offrire agli utenti i contenuti non appena li desiderano. Ciò rende importante verificare che le pagine AMP abbiano l'aspetto e funzionino come previsto quando vengono fornite da una cache AMP.

Quando si aggiungono pagine AMP a una cache AMP, occorre verificare con [gli strumenti per sviluppatori del browser](https://developers.google.com/web/tools/chrome-devtools/) che tutte le risorse esterne siano caricabili. Ecco un elenco di oggetti da considerare:

- immagini
- video
- endpoint amp-analytics
- endpoint amp-pixel
- caratteri personalizzati
- iframe

Ulteriori informazioni sulle cache AMP:

- [Utilizzo della cache AMP Google](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP su Google, Cache AMP Google](https://developers.google.com/amp/cache/overview)
- [Debugging dei problemi della cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [Formato URL della cache AMP e gestione delle richieste](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# Garantire che i file AMP siano individuabili dai motori di ricerca

Sia le pagine realizzate solo in AMP ("AMP first") che quelle con un duplicato AMP ("AMP accoppiate") devono essere tutte individuabili! Tutte le pagine AMP richiedono il link alla versione canonica `<link rel="canonical" href="$SOME_URL">` nella loro sezione `<head>`. Le pagine "AMP first", cioè quelle senza versione canonica, devono puntare a se stesse, mentre le pagine AMP accoppiate a una versione non AMP dovranno puntare l'una all'altra.

Assicurati che i metadati di [Schema.org](https://schema.org/) aggiungano informazioni utili! Altri siti e motori di ricerca potrebbero richiederli per condividere i tuoi contenuti e renderli individuabili.

Web Robot, Web Wanderers, Crawlers o Spider sono tutti nomi di programmi che cercano contenuti. Esplorano il web, aiutando i motori di ricerca a indicizzare i contenuti web in modo che le query dell'utente possano mostrare i risultati corretti! Assicurati che il tuo sito sia rintracciabile dagli utenti includendo le istruzioni corrette nel file `robots.txt` e impostando le intestazioni appropriate.

NON escludere i crawler tramite il file [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en).

```
User-agent: *
Disallow: /amp/                            <= don't!
```

NON aggiungere un meta tag `noindex` per i robot ai file AMP HTML.

```
<meta name="robots" content="noindex" />   <= don't!
```

NON includere `noindex` come intestazione HTTP X-Robots-Tag ai file AMP.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Scopri come rendere le tue pagine individuabili:

- [Rendi la tua pagina individuabile](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Specifiche dei meta tag dei Robots e dell'intestazione HTTP X-Robots-Tag](https://developers.google.com/search/reference/robots_meta_tag)
- [Domande frequenti sull'indicizzazione AMP](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Misurazione di traffico e navigazione degli utenti

La raccolta di metriche corrette è essenziale per eseguire analisi utili dei dati. Quando si testano i risultati sugli utenti dell'introduzione di contenuti AMP nel proprio sito, occorre effettuare le misurazioni corrette. Possono verificarsi falsi negativi, falsi positivi o risultati irrilevanti se l'analisi non tiene conto delle differenze create dall'uso dei contenuti AMP. Occorre sapere cosa cercare e come misurarlo!

Ulteriori informazioni sulla configurazione di adeguati strumenti di analisi per AMP:

- [Allora il tuo test AMP non funziona: cosa fare ora?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Analisi con cache e senza cache](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Misurazione dei percorsi degli utenti nella cache AMP e nel tuo sito web](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Misurazione del successo: novità negli strumenti di analisi ed esperimenti AMP (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Scambi firmati per generare URL AMP migliori e analisi più semplici (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

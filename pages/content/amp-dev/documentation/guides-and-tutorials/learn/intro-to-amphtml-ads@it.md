---
"$title": Introduzione agli annunci AMPHTML
"$order": '1'
description: Gli annunci AMPHTML offrono uno strumento più veloce, leggero e sicuro per fare pubblicità su web. Sebbene le pagine AMP supportino gli annunci HTML tradizionali, questi annunci possono essere lenti da caricare.
formats:
- ads
---

## Cos'è un annuncio AMPHTML?

Gli annunci AMPHTML offrono uno strumento più veloce, leggero e sicuro per fare pubblicità su web. Sebbene le pagine AMP supportino gli annunci HTML tradizionali, questi annunci possono essere lenti da caricare. Gli annunci AMPHTML possono essere riprodotti alla stessa velocità del resto della pagina AMP. Gli annunci AMPHTML sono pubblicati solo dopo essere stati convalidati, garantendone la sicurezza e la velocità. Inoltre, questi annunci possono essere pubblicati ovunque sul web, *non solo sulle pagine AMP*.

Gli annunci AMPHTML sono scritti in formato AMP HTML in base alle [specifiche degli annunci AMPHTML](a4a_spec.md) (una variante di AMP HTML + CSS). Ciò significa che gli annunci non hanno più la capacità di eseguire codici JavaScript arbitrari, che tradizionalmente sono la causa principale delle loro scarse prestazioni. Pertanto, proprio come per l'AMP principale, i casi d'uso di JavaScript negli annunci sono integrati direttamente nel progetto AMP Open Source, il che garantisce buone prestazioni.

### Vantaggi

Why are AMPHTML ads better than traditional ads?

1. **Più veloci**: gli annunci AMPHTML sono più veloci perché essi vengono richiesti nella fase iniziale del processo di rendering delle pagine e sono visualizzati subito prima che l'utente visualizzi l'annuncio. Anche la dimensione ridotta del file di annunci AMPHTML aumenta la velocità.
2. **Più leggeri**: gli annunci AMPHTML combinano le funzionalità di uso comune, riducendo le dimensioni dei file di annunci. Una volta sulla pagina, inoltre gli annunci AMPHTML consumano meno risorse. Ad esempio, anziché prevedere 10 strumenti di tracciamento ognuno dei quali invia le proprie richieste di informazioni, gli annunci AMPHTML raccolgono tutti i dati una sola volta e li distribuiscono a tutti gli strumenti di tracciamento interessati.
3. **Ben coordinati**: nelle pagine AMP, il sistema di [runtime AMP](spec/amphtml.md#amp-runtime) può coordinare le risorse limitate dei telefoni cellulari utilizzandole per il componente giusto al momento giusto ed offrire la migliore esperienza d'uso possibile. Ad esempio, gli annunci AMPHTML con animazioni sono messi in pausa quando non sono visualizzati.
4. **Più coinvolgenti**: gli utenti non hanno possibilità di interagire con annunci che non possono vedere. Gli annunci più veloci portano a una maggiore visibilità e quindi a percentuali di clic più elevate, il che alla fine garantisce le migliori prestazioni degli annunci.
5. **Protezione dai malware**: è impossibile diffondere malware tramite annunci AMPHTML perché essi sono verificati prima di essere presentati. Per questo motivo, gli inserzionisti possono garantire un'esperienza utente sicura e una migliore percezione dei marchi pubblicizzati.
6. **Più flessibili**: gli annunci AMPHTML sono progettati per funzionare su pagine web AMP, ma anche su quelle prive di elementi AMP, su qualsiasi dispositivo.

### Formati

Gli annunci AMPHTML sono flessibili e dinamici e consentono l'utilizzo di molti formati creativi quali sequenze, parallax e lightbox, solo per citarne alcuni. Si possono sfruttare i modelli di annunci AMPHTML open source disponibili negli [esempi](../../../documentation/examples/index.html).

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Sequenze</td>
    <td>Video Parallax</td>
    <td>Lightbox</td>
  </tr>
</table>

## Funzionamento degli annunci AMPHTML

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Serving AMPHTML ads to AMP pages', caption='Serving AMPHTML ads to AMP pages', align='' ) }}

1. Gli editori inseriscono uno spazio pubblicitario nella loro pagina AMP tramite il tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md), specificando la rete di annunci che desiderano utilizzare.
2. Il sistema di runtime AMP invia una richiesta di annuncio alla rete specificata per recuperare l'annuncio. Le reti pubblicitarie in grado di offrire annunci AMPHTML forniscono un'[implementazione Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) che convalida e garantisce i contenuti creativi.
3. La rete pubblicitaria risponde con l'annuncio AMPHTML e il sistema di runtime AMP esegue il rendering dell'annuncio sulla pagina AMP.

[tip type="note"] Non è necessaria alcuna integrazione speciale per fornire annunci AMPHTML in pagine prive di elementi AMP. Verificare se la propria rete supporta gli annunci AMPHTML. [/tip]

## Offerta di annunci AMPHTML

### Editori

Per offrire annunci a vendita diretta in formato AMPHTML, occorre creare annunci nel rispetto delle [specifiche degli annunci AMPHTML](a4a_spec.md) e pubblicarli utilizzando un server annunci che ne supporta la gestione. Attualmente, i seguenti server supportano gli annunci AMPHTML:

- DoubleClick for Publishers
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

Per fornire annunci AMPHTML tramite i propri canali indiretti (ad es. Exchange, SSP ecc.), occorre utilizzare reti/server di annunci indicati [nell'elenco seguente](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md).

### Fornitori di contenuti creativi

I fornitori di contenuti creativi devono creare annunci che rispettino le [specifiche degli annunci AMPHTML](a4a_spec.md). Esempi cui ispirarsi sono i modelli di annunci AMPHTML open source disponibili nella sezione [Esempi](../../../documentation/examples/index.html). In alternativa, si possono utilizzare i seguenti strumenti per creare annunci AMPHTML:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (*coming soon*)

### Reti/server di annunci

To deliver AMPHTML ads to AMP pages, you need to create an [`amp-ad`](../../../documentation/components/reference/amp-ad.md) extension for your network (unless you already have one) which uses the [Fast Fetch ad request implementation](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md).  Refer to [Integrating with AMP to serve display ads](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md) for details.  Keep in mind that no special integration is needed to serve AMPHTML to non-AMP pages.

## Creazione di annunci AMPHTML

**Dall'inizio**: gli annunci AMPHTML devono seguire le [specifiche degli annunci AMPHTM](a4a_spec.md). Per trovare demo ed esempi, consultare i modelli di annunci AMPHTML open source nella sezione [Esempi](../../../documentation/examples/documentation/amp-ad.html).

**Strumenti utilizzabili**: utilizzare uno qualsiasi dei seguenti strumenti per sviluppare contenuti creativi AMPHTML:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (*coming soon*)

### Convalida della sintassi di annunci AMPHTML

Dopo aver creato annunci AMPHTML, occorre verificare che utilizzino la sintassi AMPHTML corretta. A seconda dell'ambiente di sviluppo, ci sono varie opzioni per convalidare gli annunci AMPHTML:

- Usare il modulo [AMP validator NPM](https://www.npmjs.com/package/amphtml-validator) per integrare la procedura di convalida nei propri build CI.
- Use the [AMP validator](https://validator.ampproject.org/) for one-off testing.
- Partner with [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) and use their public validator end point.

[tip type="note"] **NOTA:** Per visualizzare rapidamente gli annunci AMPHTML nelle pagine AMP (ad esempio, utilizzando il rendering preferenziale offerto da Fast Fetch), la sintassi deve essere corretta. Se la sintassi non è valida, l'annuncio verrà comunque visualizzato, ma non altrettanto rapidamente. [/tip]

## Supporto di annunci AMPHTML in RTB

I fornitori di servizi condivisi e di annunci che desiderano supportare gli annunci AMPHTML in un ambiente di offerte in tempo reale (RTB), possono consultare la [Guida all'implementazione per gli scambi di annunci RTB](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md).

## FAQ

#### Esistono esempi di annunci AMPHTML?

Sì. Nella sezione [Esempi](../../../documentation/examples/documentation/amp-ad.html) è possibile trovare una serie di fantastici modelli di annunci AMPHTML. Tali esempi fanno uso di componenti AMP avanzati.

#### Gli annunci AMPHTML supportano la verifica di terzi e i rilevamenti di visibilità?

Sì, è disponibile il supporto nativo per la verifica e il rilevamento della visibilità utilizzando l'elemento [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) (ad esempio, ActiveView di Google si integra in questo modo). Ci sono anche altri fornitori come MOAT che stanno implementando attivamente tale supporto.

#### Gli annunci AMPHTML supportano animazioni basate su sequenze temporali?

Sì. Consultare [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### La maggior parte degli annunci hanno target selezionabili con tocco e uscite configurabili. Gli annunci AMPHTML dispongono di meccanismi simili?

Sì. Consultare [`amp-animation`](../../../documentation/components/reference/amp-ad-exit.md).

#### Non riesco a trovare quello che mi serve, dove posso fare domande?

- [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) is our recommended way to find answers to questions about AMP; since members of the AMP Project community regularly monitor Stack Overflow you will probably receive the fastest response to your questions there.
- Join the [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) channel for solutions and answers.
- If you encounter a bug in AMP or have a feature request for AMP, see [Reporting issues with AMP](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) for information on filing an issue.

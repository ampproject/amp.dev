---
$title: Integrazione di tecnologie in AMP
$order: 0
$hidden: true
description: Se sei un fornitore di tecnologie per editori o inserzionisti su web, ti suggeriamo di iniziare a supportare contenuti AMP in modo che i tuoi clienti possano continuare a sfruttare la tua tecnologia e ...
formats:
- siti web
- annunci
- storie
- e-mail
---

Ti ringraziamo per il tuo interesse a contribuire al progetto AMP! Apprezziamo la tua partecipazione al tentativo di rendere il web una piattaforma utente all'avanguardia.

Gli editori hanno creato oltre 1,4 miliardi di documenti AMP, ospitati su oltre 750 mila domini distinti. Tale crescita è stata possibile solo attraverso il sostegno di oltre 100 aziende esterne fornitrici di tecnologie già integrate con AMP.

Se sei un fornitore di tecnologie per editori o inserzionisti su web, ti suggeriamo di iniziare a supportare contenuti AMP! In questo modo i tuoi clienti potranno continuare a sfruttare la tua tecnologia, collaborando allo stesso tempo al nostro obiettivo di migliorare il web.

Questo documento delinea le aspettative verso i fornitori terzi di tecnologie AMP e definisce i livelli dei contributi.

# Linee guida per i contributi

Tutti i contributi generali sono soggetti alle [linee guida universali AMPHTML riportate in CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md). Ci aspettiamo che i soggetti terzi che contribuiscono al progetto a vari livelli si occupino delle verifiche, la manutenzione e l'aggiornamento dei propri contributi.

Per risultare idonei all'inclusione nel progetto, i contributi a ogni livello devono:

- Rispettare i [requisiti di idoneità prescritti dalla versione inglese di Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Notability).
- Garantire a editori e utenti un livello di servizi almeno pari a quello offerto da AMP.
- Essere di buona qualità.
- Creare un canale di risoluzione dei problemi per i clienti.
- Garantire un'adeguata copertura dei test di integrazione sulla produzione e i rilasci canary di AMP.
- Garantire obiettivi non ancora realizzati.

Esistono 3 livelli di contributi da parte di soggetti terzi. I livelli dipendono dalla quantità di logica aggiunta:

- Logica dei componenti: codice che determina le caratteristiche e le funzionalità principali dei componenti AMP.
- Logica di terzi: codici specifici di parti terze. Questa logica consente ai componenti di sfruttare i servizi forniti da terzi.

Quanto maggiore è la logica aggiunta all'archivio AMP, in particolare quella specifica di terzi, tanto maggiore sarà il livello del contributo. I contributi di livello elevato richiedono un maggiore impegno da parte dei soggetti che li forniscono.

I contributi di livello 1 e 2 condividono componenti tra terze parti. Se esiste un componente che soddisfa uno scopo simile a quello richiesto dalla tua attività, può essere il caso di riutilizzarlo. Ciò riduce gli sforzi e garantisce uno sviluppo più sostenibile a lungo termine.

Dopo aver deciso il livello di contributo richiesto dal tuo caso di utilizzo, puoi aprire una [segnalazione GitHub](https://github.com/ampproject/amphtml/issues/new) per iniziare.

## Contributi di livello 1

I contributi di livello 1 sfruttano la logica funzionale di componenti già esistenti. Caricano componenti di logica specifica di terze parti, quali contenuti JavaScript personalizzati, in un iframe indipendente dall'origine. Ad esempio, molte reti pubblicitarie forniscono annunci tramite il componente [`amp-ad`](../../../components/reference/amp-ad.md), ma controllano la riproduzione degli annunci attraverso la propria logica.

Per implementare le loro funzionalità, i soggetti terzi aggiungono configurazioni o funzionalità alle estensioni già esistenti, utilizzando le API fornite. Se tale componente non esiste, possono proporne uno nuovo.

I soli tipi di logica specifica di terze parti verificati nell'archivio AMP sono le configurazioni di terzi. L'aggiunta di nuovi elementi da parte di terzi a un contributo di livello 1 già esistente in genere non richiede una revisione del progetto. I terzi possono seguire la documentazione di integrazione dei componenti, ad esempio [Integrazione delle reti di annunci in AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

### Aspettative sui contributi di terzi

- Maintain and serve vendor’s custom JavaScript independently.
- Provide tests for their configuration and respond to issues.
- Provide a troubleshooting channel for developers.
- Respond to any and all bug filings related to their service.

### Level 1 example

[**amp-ad**](../../../components/reference/amp-ad.md)

Ad providers should read the [development overview](https://github.com/ampproject/amphtml/tree/master/ads#overview) and the [developer instructions](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) for adding your support to [`amp-ad`](../../../components/reference/amp-ad.md). Depending on the ad technology your company provides, you might find [these integration instructions ](/content/amp-dev/documentation/guides-and-tutorials/contribute/vendor-contributions/ad-integration-guide.md?format=ads)useful.

There are many ad providers who have added support for advertising related features like amp-ad. Here is a [sample pull request](https://github.com/ampproject/amphtml/pull/2299) from the ad network [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

## Level 2 contribution

Level 2 contributions leverage the feature logic of existing components. All logic is checked into the AMP repository, and no custom Javascript can be loaded into an iframe. For example, analytics providers add their configurations to the [`amp-analytics`](../../../components/reference/amp-analytics.md) component but including the endpoint to track data, such as user clicks.

Third parties add configurations or features, such as new APIs, to existing components to implement their functionalities. If such a component does not exist they may propose a new one.

All business logic is checked into AMP repository, but the only third party specific logic checked in is a third party configuration. If the component works with a third party provided config file, no design review is needed. If the third party configuration implements a new feature or new component it will need to pass AMP’s design review.

### Expectations of third parties

- Adding new third party service to an existing level 2 contribution typically does not need a design review. The third party can follow the documentation of that component.
- Proposing a new component for level 2 contribution will need to have feature logic that is shareable by other third party services.

### Level 2 examples

[**amp-analytics**](../../../components/reference/amp-analytics.md)

AMP analytics allows you to send events back to your server based on triggers configured by you. We have written an [analytics integration guide ](../../optimize-measure/configure-analytics/index.md)to get you started.

If you only need to add a tracking pixel with dynamic parameters to your tracking URL, check out [`amp-pixel`](../../../components/reference/amp-pixel.md). Be sure to document usage on your support pages for developers that may want to use your technology with AMP.

There are analytics providers who have added support to amp-analytics. Here is a [sample pull request](https://github.com/ampproject/amphtml/pull/1595) from the analytics provider [Parse.ly](https://www.parsely.com/help/integration/google-amp/).

[**amp-call-tracking**](../../../components/reference/amp-call-tracking.md)

If you provide call tracking measurement services, your use case may be supported with [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md). This component dynamically replaces a phone number in a hyperlink to enable call tracking, by executing a CORS request to substitute the number.

To learn more about how this component might work for you, please see the [reference documentation](../../../components/reference/amp-call-tracking.md).

## Level 3 contribution

A level 3 contribution introduces a new third party-specific component. This is only applicable if third parties are unable to:

- Find a component that exists for their use case.
- Request feature improvements to meet their use case.
- Propose a component that applies to other third party services.

### Expectations of third parties

- Write and propose a design review.
- Tests must be able to catch breakage.
- Fix, or request help, if the component breaks.
- Provide through documentation with code samples.
- Maintain and update documentation.
- Provide a troubleshooting channel for AMP developers to request assistance.

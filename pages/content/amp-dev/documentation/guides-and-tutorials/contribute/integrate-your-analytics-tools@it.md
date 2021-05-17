---
'$title': Integrazione di strumenti di analisi in AMP
$order: 1
formats:
  - websites
  - stories
teaser:
  text: Informazioni generali
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Informazioni generali <a name="overview"></a>

Utilizzando strumenti di tipo software come servizi (software-as-a-service) per editori per analizzare al meglio i loro flussi di traffico e di visitatori, potresti avere l'esigenza di integrare il tuo servizio in `amp-analytics`. Ciò consentirà ai tuoi clienti di visualizzare i flussi di traffico per le loro pagine AMP HTML.

## Per iniziare <a name="before-you-begin"></a>

Prima di poter aggiungere i tuoi servizi e strumenti di analisi al sistema runtime di AMP HTML, dovrai:

- Individuare i tipi di [variabili](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md) e [richieste](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-analytics.md#requests) di cui avrai bisogno in un documento AMP HTML per il tuo servizio di analisi.
- Determinare se la funzione di plug-in per invio in batch è necessaria per costruire l'URL finale in caso di utilizzo dell'invio in batch di richieste.
- Identificare gli eventi che determinano l'invio di richieste di analisi da parte di pagine che sono pertinenti per il tuo servizio.
- Valutare se e in che modo [tracciare gli utenti in](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-managing-user-state.md) contesti AMP proprietari e di terzi.
- Determinare come il pannello di controllo del tuo strumento di analisi gestisce il traffico AMP.
- Individuare eventuali funzionalità mancanti in `amp-analytics` e [richieste di file](https://github.com/ampproject/amphtml/issues/new) per le funzionalità necessarie.
- AMP Analytics invia le sue variabili a un endpoint preconfigurato. Se non si dispone già di un endpoint esistente, si può consultare [questo esempio](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample) su come realizzarne uno.
  - Per tutti i tipi di trasporto tranne `iframe`, le variabili vengono inviate come parametri della stringa di query in una richiesta HTTPS.
  - Per il tipo di trasporto `iframe`, viene creato un iframe e le variabili vengono inviate tramite `window.postMessage`. In questo caso, il messaggio non deve essere un URL. Questa opzione è disponibile solo per i fornitori accreditati MRC.
- Considerare come l'integrazione con `amp-analytics` può influire sulle informative adottate (in particolare quella sulla privacy) o sui contratti in essere.

## Aggiunta della propria configurazione al sistema di runtime AMP HTML<a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Creare una segnalazione [Intent-to-Implement](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../docs/contributing.md#contributing-features) che dichiara l'aggiunta della configurazione del proprio servizio di analisi al sistema runtime di AMP HTML. Assicurarsi di includere **cc @ ampproject / wg-analytics** nella descrizione.
2. Sviluppare una patch che implementa quanto segue:
   1. Un nuovo file json di configurazione `${vendorName}.json` nella [cartella](https://github.com/ampproject/amphtml/tree/main/extensions/amp-analytics/0.1/vendors) dei fornitori, che include le opzioni suddette oltre a quelle predefinite, quali:
      1. `"vars": {}` per ulteriori variabili predefinite.
      2. `"requests": {}` per le richieste che verranno utilizzate dal servizio.
      3. `"optout":` se necessario. Al momento non abbiamo un buon sistema di annullamento delle sottoscrizioni, quindi ti chiediamo di aiutarci a progettarne uno che funzioni bene per i tuoi servizi.
      4. `"warningMessage":` se necessario. Visualizzare le informazioni e gli avvisi del fornitore (quali avvisi di elementi deprecati o di migrazione) nella console.
   2. Se si utilizza il trasporto iframe, aggiungere anche una nuova riga a ANALYTICS_IFRAME_TRANSPORT_CONFIG in iframe-transport-vendors.js contenente `"*vendor-name*": "*url*"`
   3. Un esempio è disponibile nei riferimenti [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
   4. Un test nel file [extensions/amp-analytics/0.1/test/vendor-requests.json](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
   5. Aggiungere il proprio servizio di analisi all'elenco dei fornitori supportati nel file [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/./analytics-vendors-list.md). Includere tipo, descrizione e collegamenti alla documentazione di utilizzo.
3. Verificare se è richiesto un nuovo plug-in di invio in batch. Consultare le istruzioni [Aggiungi plug-in di invio in batch](#add-batch-plugin).
4. Testare il nuovo esempio inserito in [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) per assicurarsi che i risultati funzionino come previsto. Ad esempio, verificare che i dati necessari vengono raccolti e visualizzati nel pannello di controllo dello strumento di analisi.
5. Inviare una richiesta pull con questa patch, facendo riferimento alla segnalazione Intent-to-Implement.
6. Aggiornare la documentazione di utilizzo del servizio e informarne i clienti.
7. Si consiglia di mantenere [un test di integrazione al di fuori dell'archivio AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## Gestione dei tag <a name="tag-managers"></a>

I servizi di gestione dei tag hanno due opzioni per l'integrazione con AMP Analytics:

- **Approccio endpoint:** agire da endpoint aggiuntivo per `amp-analytics` e condurre la gestione del marketing nel backend.
- **Approccio di configurazione:** condurre la gestione dei tag tramite un file di configurazione JSON generato dinamicamente, univoco per ciascun editore.

L'approccio endpoint è uguale all'approccio standard descritto nella sezione precedente. L'approccio di configurazione consiste nel creare una configurazione univoca per amp-analytics specifica per ciascun editore, che include tutti i loro pacchetti di strumenti di analisi compatibili. Ciascun editore deve includere la configurazione utilizzando una sintassi simile a questa:

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

Per adottare questo approccio, consultare la documentazione per l'integrazione dei servizi degli editori con AMP Analytics.

## Altre risorse <a name="further-resources"></a>

- Approfondimento: [Perché non usare semplicemente un iframe?](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/why-not-iframe.md)
- Approfondimento: [Gestione dello stato di utenti non autenticati con AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-managing-user-state.md)
- [Esempio di amp-analytics](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- Documentazione di riferimento di [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- Documentazione di riferimento sulle [variabili di amp-analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md)

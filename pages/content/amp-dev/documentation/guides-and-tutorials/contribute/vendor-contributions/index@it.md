---
"$title": Integrazione di tecnologie in AMP
"$order": '0'
"$hidden": 'true'
description: Se sei un fornitore di tecnologie per editori o inserzionisti su web, ti suggeriamo di iniziare a supportare contenuti AMP in modo che i tuoi clienti possano continuare a sfruttare la tua tecnologia e ...
formats:
- websites
- ads
- stories
- email
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

- Manutenzione e gestione di contenuti JavaScript personalizzati del fornitore in modo indipendente.
- Fornitura dei test di configurazione e risposta alle segnalazioni di problemi.
- Creazione di un canale per la risoluzione dei problemi per gli sviluppatori.
- Gestione e risposta a tutte le seganalzioni di bug relative ai loro servizi.

### Esempio di livello 1

[**amp-ad**](../../../components/reference/amp-ad.md)

I fornitori di annunci devono leggere la [panoramica del processo di sviluppo](https://github.com/ampproject/amphtml/tree/master/ads#overview) e le [istruzioni per gli sviluppatori](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) per l'aggiunta del supporto del componente [`amp-ad`](../../../components/reference/amp-ad.md). In base alla tecnologia fornita dalla tua azienda, potrai trovare utili [queste istruzioni di integrazione](/content/amp-dev/documentation/guides-and-tutorials/contribute/vendor-contributions/ad-integration-guide.md?format=ads).

Ci sono molti fornitori di annunci che hanno aggiunto il supporto di funzionalità per gli annunci come amp-ad. Ecco una [richiesta pull di esempio](https://github.com/ampproject/amphtml/pull/2299) dalla rete di annunci [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

## Contributi di livello 2

I contributi di livello 2 sfruttano la logica funzionale di componenti già esistenti. Tutta la logica viene controllata nell'archivio AMP e nessun codice Javascript personalizzato può essere caricato negli iframe. Ad esempio, i fornitori di strumenti di analisi aggiungono le loro configurazioni al componente [`amp-analytics`](../../../components/reference/amp-analytics.md), ma includono l'endpoint per tracciare i dati, quali i clic degli utenti.

Per implementare le loro funzionalità, i terzi aggiungono configurazioni o funzionalità, quali nuove API, ai componenti già esistenti. Se tale componente non esiste, possono proporne uno nuovo.

Tutta la logica aziendale viene controllata nell'archivio AMP, ma i soli elementi della logica specifica di terzi controllati sono le configurazioni di terze parti. Se il componente funziona con un file di configurazione fornito da terzi, non è necessaria alcuna revisione del progetto. Se la configurazione definita da terzi implementa una nuova funzionalità o un nuovo componente, dovrà essere sottoposta alla revisione di design AMP.

### Aspettative sui contributi di terzi

- L'aggiunta di un nuovo servizio di terzi a contributi di livello 2 già esistente, in genere non richiede una revisione del progetto. Il terzo che fornisce il contributo può seguire la documentazione di quel componente.
- La proposta di un nuovo componente per i contributi di livello 2 dovrà avere una logica funzionale condivisibile con altri servizi di terzi.

### Esempi di livello 2

[**amp-analytics**](../../../components/reference/amp-analytics.md)

Gli strumenti di analisi AMP consentono di inviare eventi al tuo server in base a condizioni da te configurate. Per introdurti all'argomento, abbiamo scritto una [guida all'integrazione degli strumenti di analisi](../../optimize-measure/configure-analytics/index.md).

Se devi solo aggiungere un pixel di tracciamento con parametri dinamici all'URL di tracciamento, prendi in considerazione il componente [`amp-pixel`](../../../components/reference/amp-pixel.md). Assicurati di documentare l'utilizzo nelle tue pagine di supporto per gli sviluppatori che potrebbero essere interessati all'utilizzo della tua tecnologia con AMP.

Ci sono fornitori di strumenti di analisi che supportano l'attributo amp-analytics. Ecco una [richiesta pull di esempio](https://github.com/ampproject/amphtml/pull/1595) effettuata dal fornitore di strumenti di analisi [Parse.ly](https://www.parsely.com/help/integration/google-amp/) .

[**amp-call-tracking**](../../../components/reference/amp-call-tracking.md)

Se fornisci servizi di misurazione per il tracciamento di chiamate, il tuo caso di utilizzo potrebbe essere migliorato dall'utilizzo di [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md). Questo componente sostituisce in modo dinamico un numero di telefono in un collegamento ipertestuale per abilitare il tracciamento delle chiamate, eseguendo una richiesta CORS per sostituire il numero.

Per ulteriori informazioni sul funzionamento di questo componente, consultare la relativa [documentazione di riferimento](../../../components/reference/amp-call-tracking.md).

## Contributi di livello 3

Un contributo di livello 3 introduce un nuovo componente specifico di terze parti. Ciò è ammissibile solo se il soggetto terzo in questione non è in grado di:

- Trovare un componente già esistente per il proprio caso di utilizzo.
- Richiedere miglioramenti delle funzionalità in grado di soddisfare il proprio caso di utilizzo.
- Proponi un componente applicabile ad altri servizi di terzi.

### Aspettative sui contributi di terzi

- Scrivere e proporre una revisione del progetto.
- Proporre test in grado di verificare i malfunzionamenti.
- Risolvere i malfunzionamenti del componente o richiedere aiuto allo scopo.
- Fornire documentazione accurata con esempi di codice.
- Preparare e aggiornare la documentazione.
- Fornire un canale per la risoluzione dei problemi per gli sviluppatori AMP che richiedono assistenza.

---
'$title': Gestione dello stato di utenti non autenticati con AMP
$order: 2
formats:
  - websites
teaser:
  text: '**Indice**'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-managing-user-state.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

**Indice**

- [Informazioni di base](#background)
- [Guida all'implementazione](#implementation-guide)
  - [Per iniziare](#before-getting-started)
  - [Attività 1: per le pagine senza elementi AMP sull'origine dell'editore, impostare un identificatore ed inviare il ping di analisi](#task1)
  - [Attività 2: per le pagine AMP, impostare un identificatore e inviare il ping di analisi includendo la sostituzione dell'ID client nei ping di amp-analytics](#task2)
  - [Attività 3: gestire i ping di analisi provenienti dalle pagine sull'origine dell'editore](#task3)
  - [Attività 4: gestire i ping di analisi dai contesti di una cache AMP o di un visualizzatore AMP e stabilire il mapping degli identificatori (se necessario)](#task4)
  - [Attività 5: utilizzare l'ID client nei collegamenti e nell'invio dei moduli](#task5)
- [Procedure fortemente consigliate](#strongly-recommended-practices)

Lo stato dell'utente è un concetto importante nelle moderne applicazioni web. Consideriamo ad esempio i seguenti casi d'uso resi possibili dalla gestione dello stato utente:

- Un commerciante realizza un'utile applicazione **carrello della spesa** che mostra agli utenti durante la loro seconda visita gli stessi articoli che avevano aggiunto al carrello durante la loro prima visita molto tempo prima. Tale soluzione aumenta di molto la probabilità di acquisto dell'utente, che può venire a conoscenza degli articoli che aveva già pensato di acquistare.
- Un editore di notizie che può personalizzare gli **articoli consigliati** ai lettori in base alle loro precedenti visite alla pagina degli articoli dell'editore. Questa soluzione permette di aumentare il coinvolgimento del lettore e lo aiuta a scoprire nuovi contenuti cui può essere interessato.
- Uno sviluppatore web che gestisce siti di qualsiasi tipo, raccoglie **dati analitici** che permettono di distinguere se due visualizzazioni di una pagina sono effettuate da una stessa persona o da due utenti distinti che hanno visitato la stessa pagina. Informazioni di questo tipo aiutano ad analizzare le prestazioni del sito e, in definitiva, permettono di migliorarlo.

Questo articolo spiega come ottimizzare la **gestione dello stato di utenti non autenticati in AMP**, il che permette di migliorare le esperienze d'uso anche per gli utenti che non hanno eseguito azioni che permettono di identificare la propria identità, ad esempio l'accesso. Dopo aver esaminato alcune delle sfide più difficili proposte da questo argomento e aver svolto alcune considerazioni sull'approccio al probelam, questa guida descrive alcune delle modalità offerte da AMP per la gestione dello stato utente, oltre ad offrire alcuni suggerimenti su come affrontare l'implementazione tecnica.

## Informazioni di base <a name="background"></a>

L'argomento della gestione dello stato utente merita un'attenzione particolare in AMP, perché le pagine AMP possono essere visualizzate nei più svariati contesti, ad esempio su siti web, in Google Search o in app di terzi. Questo pone numerosi problemi nella gestione dello stato degli utenti che si spostano tra tali contesti.

### Contesti di visualizzazione delle pagine AMP <a name="display-contexts-for-amp-pages"></a>

Le pagine AMP offrono un formato per la portabilità di contenuti che consente di caricare rapidamente tali contenuti in ogni contesto. I documenti AMP possono essere visualizzati in tre contesti principali:

- L'origine dell'editore
- Una cache AMP
- Un visualizzatore AMP

<table>
  <tr>
    <th width="20%">Contesto</th>
    <th width="20%">Le pagine senza elementi AMP possono essere gestite in tale contesto?</th>
    <th width="20%">Le pagine AMP possono essere gestite in tale contesto?</th>
    <th>Esempio di URL</th>
  </tr>
  <tr>
    <td>Origine dell'editore</td>
    <td>Sì</td>
    <td>Sì</td>
    <td><code>https://example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Cache AMP</td>
    <td>No</td>
    <td>Sì</td>
    <td><code>https://example-com.cdn.ampproject.org/s/example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Visualizzatore AMP</td>
    <td>No</td>
    <td>Sì</td>
    <td><code>https://google.com/amp/s/example.com/article.amp.html</code></td>
  </tr>
</table>

Esaminiamo ciascuna di queste situazioni più da vicino.

**Contesto n. 1: origine dell'editore.** Le pagine AMP vengono distribuite in modo che siano originariamente ospitate e accessibili tramite il sito dell'editore, ad esempio su `https://example.com` è possibile trovare la pagina di esempio `https://example.com/article.amp.html`.

Gli editori possono decidere di pubblicare esclusivamente contenuti AMP o di pubblicare due versioni degli stessi contenuti (ovvero, pagine con contenuti AMP "accoppiati" con la stessa pagina senza elementi AMP). L'applicazione del modello di contenuti "accoppiati" richiede alcune [procedure particolari](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery) per garantire che le versioni AMP delle pagine siano individuabili da motori di ricerca, siti di social media e altre piattaforme. Entrambi gli approcci di pubblicazione sono pienamente supportati; spetta all'editore decidere quale approccio adottare.

> **NOTA:**
> A causa del modello di pubblicazione di contenuti "accoppiati" appena descritto, l'origine dell'editore (nell'esempio precedente, `https://example.com`) è un contesto in cui è **possibile accedere sia ai contenuti AMP che a quelli non AMP**. In effetti, è l'unico contesto in cui ciò può accadere, perché le cache AMP e i visualizzatori AMP, descritti successivamente, forniscono solo contenuti AMP validi.

**Contesto n. 2: una cache AMP.** I file AMP possono essere memorizzati in cache su cloud ad opera di cache di terzi per ridurre il tempo impiegato dai contenuti per raggiungere i dispositivi mobili degli utenti.

Utilizzando il formato AMP, i fornitori di contenuti rendono i file AMP disponibili per la memorizzazione nelle cache di terzi. In questo tipo di contesto, gli editori continuano a controllare i propri contenuti (che saranno pubblicati nella loro origine come descritto in precedenza), ma le piattaforme possono memorizzare in cache o replicare i contenuti per garantire agli utenti la massima velocità di accesso a tali contenuti.

Normalmente, i contenuti forniti in questo modo provenogono da un dominio diverso. Ad esempio, la [cache AMP Google](https://developers.google.com/amp/cache/overview) utilizza `https://cdn.ampproject.org` per fornire contenuti, come nel caso della pagina `https://example-com.cdn.ampproject.org/s/example.com/article.amp.html`.

**Contesto n. 3: un visualizzatore AMP.** Il formato AMP è progettato per supportare l'inlusione nei visualizzatori AMP di terzi. Ciò consente un elevato livello di ottimizzazione per il file AMP e l'esperienza offerta del visualizzatore. Questo approccio garantisce opzioni vantaggiose, quali: pre-caricamento e pre-rendering dei contenuti in modo efficace e protetto, oltre a capacità innovative come lo scorrimento completo di pagine AMP.

Proprio come nel caso della cache AMP, anche il dominio di un visualizzatore AMP sarà diverso dall'origine dell'editore. Ad esempio, il visualizzatore di Google Search è ospitato su `https://google.com` e incorpora un iframe che richiede il contenuto dell'editore dalla cache AMP Google.

### La gestione di contesti multipli implica la gestione di più stati <a name="multiple-contexts-means-multiple-state-management"></a>

Gli editori devono essere in grado di gestire lo stato utente per ogni contesto di visualizzazione separatamente. La funzione [ID Client](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#client-id) di AMP, che sfrutta i cookie o l'archiviazione locale per mantenere lo stato utente, fornisce il supporto necessario alle pagine AMP per mantenere un identificatore stabile degli utenti, che è uno pseudonimo. Da un punto di vista implementativo, questo sistema utilizza i cookie o l'archiviazione locale e AMP decide quale strumento utilizzare in base al contesto di visualizzazione. Questa scelta è determinata dall'applicabilità tecnica di tale meccanismo di gestione dello stato utente ai contenuti di centinaia o anche migliaia di editori.

In tal modo, gli editori di pagine AMP riescono spesso (anche inconsapevolmente) a realizzare esperienze di utilizzo dei propri contenuti che coprono più contesti. Torniamo a dare un'occhiata al precedente esempio dell'applicazione per un carrello di acquisti e aggiungiamo qualche dettaglio in più per creare una **storia utente** completa:

> _Il giorno 1, l'utente scopre una pagina AMP di Example Inc. tramite Google Search. Google Search carica le pagine AMP in un visualizzatore AMP. Mentre visualizza questa pagina, l'utente aggiunge quattro articoli al proprio carrello degli acquisti ma non completa l'operazione con il pagamento. Due settimane dopo, il giorno 15, l'utente si ricorda dei quattro articoli che aveva pensato di acquistare e decide di completare l'operazione. Allora l'utente accede direttamente alla homepage di Example Inc. all'indirizzo `https://example.com` (non è una pagina AMP) e trova che i quattro articoli in questione sono ancora conservati nel suo carrello della spesa._

In questo scenario, l'utente può usufruire di un servizio carrello degli acquisti che offre un'esperienza coerente, anche se tra i due eventi distanziati da un po' di tempo è passato dal contesto del visualizzatore AMP a quello dell'origine dell'editore. Questa esperienza è ben fruibile dall'utente e gli editori che stanno pensando di offrire un servizio di gestione acquisti, dovrebbero considerare l'idea di implementarla. Quindi come realizzarla?

**Per realizzare esperienze di questo tipo che coinvolgono la gestione dello stato utente, tutti i contesti che l'utente attraversa devono condividere un unico stato gestito individualmente.** Benissimo! Basta condividere tra questi contesti i valori dei cookie con gli identificatori utente. Ma c'è un problema: anche se ognuno di questi contesti mostra contenuti controllati dallo stesso editore, ognuno di essi vede gli altri come contesti esterno, perché ognuno di essi risiede su domini diversi.

<amp-img alt="AMP's ability to be displayed in many contexts means that each of those contexts has its own storage for identifiers" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/contexts-with-different-storage.png" width="1030" height="868">
  <noscript><img alt="La capacità di AMP di essere visualizzato in molti contesti significa che ognuno di questi contesti ha il proprio spazio di archiviazione per gli identificatori" src="https://github.com/ampproject/amphtml/raw/main/spec/img/contexts-with-different-storage.png"></noscript></amp-img>

Come vedremo nel seguito, gestire un'applicazione di terzi quando si interagisce con i cookie può presentare difficoltà, a seconda di come sono configurate le impostazioni del browser dell'utente. In particolare, se i cookie di terzi sono bloccati in una situazione particolare, questo impedirà la condivisione delle informazioni tra i contesti. D'altra parte, se le operazioni dei cookie di terzi sono consentite, le informazioni possono essere condivise.

## Guida all'implementazione <a name="implementation-guide"></a>

Questa sezione fornisce consigli per la gestione dello stato utente. Le attività ssono presentate in sequenza, ma possono essere raggruppate in due blocchi principali:

**Blocco n. 1: implementazione fondamentale.** Le attività 1-4 sono essenziali per il funzionamento basilare del meccanismo. Esse poggiano su un insieme minimo di funzionalità necessarie per svolgere parzialmente il lavoro: sostituzione dell'ID client di AMP, lettura e scrittura di cookie e gestione di una tabella di mapping nel sistema di back-end. Perché abbiamo detto solo"parzialmente"? Poiché le procedure svolte in queste attività si basano sulla lettura e la scrittura di cookie e le impostazioni dei cookie del browser potrebbero impedirlo in determinate circostanze, è probabile che questo insieme di attività non sia sufficiente per la gestione completa dello stato dell'utente in tutti gli scenari.

Dopo aver gettato le basi, ci occupiamo di una gamma più ristretta di casi d'uso, offrendo una soluzione completa per tali casi.

**Blocco n. 2: utilizzo dell'ID client nel collegamento e nell'invio di moduli. ** Nell'attività 5 vedremo come sfruttare l'attraversamento dei collegamenti e/o l'invio di moduli per passare le informazioni sull'ID client AMP direttamente tra i vari contesti che l'utente sta attraversando da una pagina all'altra.

> **ATTENZIONE:**
> La seguente guida all'implementazione richiede l'utilizzo dei cookie. Consultare la sezione [Procedure fortemente consigliate](#strongly-recommended-practices) per suggerimenti importanti da tenere a mente.

### Per iniziare <a name="before-getting-started"></a>

Nell'applicazione della procedura tecnica descritta di seguito, assumiamo di associare lo **stato utente** a un **identificatore** stabile che rappresenta l'utente. Ad esempio, un identificatore potrebbe avere questo aspetto: `n34ic982n2386n30`. Sul lato server quindi si associa l'identificatore `n34ic982n2386n30` a un dato insieme di informazioni utente, quali contenuto del carrello della spesa, elenco di articoli precedentemente letti, o altri dati in base al caso d'uso.

<amp-img alt="A single identifier could be used to manage user state for many use cases" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/identifiers-for-use-cases.png" width="1276" height="376">
  <noscript><img alt="È possibile utilizzare un unico identificatore per gestire lo stato utente per molti casi d'uso" src="https://github.com/ampproject/amphtml/raw/main/spec/img/identifiers-for-use-cases.png"></noscript></amp-img>

Per maggiore chiarezza, nel resto di questo documento chiameremo le varie stringhe di caratteri che fungono da identificatori con nomi più leggibili preceduti dal simbolo del dollaro (`$`):

[sourcecode:text]
n34ic982n2386n30 ⇒ $sample_id
[/sourcecode]

**Il nostro caso d'uso: **in questa guida lavoreremo su un esempio progettato per realizzare un semplice tracciamento delle visualizzazioni di una pagina (ovvero, i dati di analisi) con cui vogliamo ottenere un conteggio degli utenti della massima precisione. Ciò significa che anche se l'utente accede ai contenuti di un determinato editore da contesti diversi (anche passando da pagine AMP a pagine senza elementi AMP), vogliamo conteggiare queste visite in modo da ottenere un'analisi univoca dell'utente, la stessa che avremmo ottenuto se l'utente stesse navigando solo sulle tradizionali pagine non AMP dell'editore in questione.

**Prerequisito sulla disponibilità di valori dei cookie stabili:** assumiamo che l'utente stia utilizzando sempre lo stesso dispositivo, browser o sistema di navigazione pubblica/in incognito, per garantire che i valori dei cookie siano preservati e disponibili durante le varie sessioni dell'utente con il passare del tempo. Se questo prerequisito non è garantito, le tecniche descritte potrebbero non funzionare. Se necessario, cercheremo di gestire lo stato dell'utente in base all'identità dell'utente autenticato (ovvero che ha effettuato l'accesso).

**I concetti presentati di seguito possono essere estesi ad altri casi d'uso.** Anche se ci occupiamo solo del caso d'uso dei dati di analisi, i concetti seguenti possono essere riapplicati ad altri casi, che richiedono la gestione dello stato utente in contesti differenti.

<a id="task1"></a>

### Attività 1: per le pagine senza elementi AMP sull'origine dell'editore, impostare un identificatore ed inviare il ping di analisi <a name="task-1-for-non-amp-pages-on-the-publisher-origin-set-up-an-identifier-and-send-analytics-pings"></a>

Iniziamo dalla configurazione dei dati di analisi per pagine senza elementi AMP pubblicate al di fuori dell'origine dell'editore. Ciò può essere realizzato in molti modi, ad esempio utilizzando pacchetti di analisi come Google Analytics o Adobe Analytics, o scrivendo un'implementazione personalizzata.

Utilizzando un pacchetto di analisi di un fornitore, è probabile che esso si occupi sia dell'impostazione dei cookie che della trasmissione dei ping tramite il codice di configurazione e le API. In questo caso, occorre controllare che i passaggi seguenti siano coerenti con il proprio approccio per la gestione dei dati, ma probabilmente non sarà necessario apportare modifiche per il completamento di questa attività.

Il resto di questa attività offre una guida per l'impostazione delle proprie analisi dei dati.

##### Impostazione di un identificatore utilizzando cookie proprietari <a name="set-up-an-identifier-using-first-party-cookies"></a>

In caso di pagine non AMP pubblicate dall'origine dell'editore, occorre impostare un identificatore permanente e stabile da utilizzare su queste pagine. Questo è in genere ottenuto con un'[implementazione che fa uso di cookie proprietari](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking).

Ai fini del nostro esempio, supponiamo di aver impostato un cookie chiamato `uid` ("identificatore utente") che verrà creato alla prima visita di un utente. Se non è la prima visita dell'utente, leggere il valore già impostato alla prima visita.

Ciò significa che esistono due casi per lo stato delle pagine non AMP che si trovano sull'origine dell'editore:

**Caso n. 1: prima visita.** Alla prima visita della pagina non AMP, non ci saranno cookie. Se il cookie viene controllato prima che ne sia stato impostato uno, non si troverà alcun valore impostato nel cookie corrispondente all'`uid` in questione:

[sourcecode:bash]

> document.cookie
> ""
> [/sourcecode]

Il cookie dovrebbe essere impostato durante il caricamento iniziale, in modo che facendo questa operazione una volta caricata la pagina, si troverà che è già stato impostato un valore:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

**Caso n. 2: visita non iniziale.** Ci sarà già un set di cookie. Pertanto, aprendo la console per gli sviluppatori sulla pagina, si troverà il seguente codice:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

##### Invio dei ping di analisi <a name="send-analytics-pings"></a>

Dopo aver impostato un identificatore, esso può essere incorporato nel ping di analisi per iniziare a tracciare le visualizzazioni di pagina.

L'implementazione specifica dipenderà dalla configurazione desiderata, ma generalmente si invieranno richieste di ping al proprio server di analisi contenenti dati utili all'interno dell'URL della richiesta stessa. Ecco un esempio, che indica anche come includere il valore del cookie all'interno della richiesta:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier
[/sourcecode]

Nota: nell'esempio precedente, l'identificatore per l'utente è indicato da un parametro di query specifico, `user_id`:

[sourcecode:text]
user_id=$publisher_origin_identifier
[/sourcecode]

L'uso di "`user_id`" qui deve essere determinato da ciò che il server di analisi si aspetta di ricevere e non è specificamente legato alla chiamata del cookie che memorizza l'identificatore localmente.

<a id="task2"></a>

### Attività 2: per le pagine AMP, impostare un identificatore e inviare il ping di analisi includendo la sostituzione dell'ID client nei ping di amp-analytics <a name="task-2-for-amp-pages-set-up-an-identifier-and-send-analytics-pings-by-including-client-id-replacement-in-amp-analytics-pings"></a>

Passando ora alle pagine AMP, diamo un'occhiata a come definire e trasmettere un identificatore per l'analisi. Esso sarà applicabile indipendentemente dal contesto in cui viene presentata la pagina AMP, quindi dovrà coprire qualsiasi pagina AMP sull'origine dell'editore, fornita tramite una cache AMP o mostrata in un visualizzatore AMP.

Attraverso l'utilizzo di funzionalità che richiedono l'ID client, AMP farà il lavoro "nascosto" per generare e archiviare i valori dell'ID client e mostrarli alle funzionalità che li richiedono. Una delle funzionalità principali che utilizza l'ID client di AMP è [amp-analytics](https://amp.dev/documentation/components/amp-analytics), che è esattamente ciò di cui abbiamo bisogno per implementare il nostro esempio di analisi dei dati in esame.

Nelle pagine AMP, creare un ping amp-analytics contenente l'ID client:

<table>
  <tr>
    <td width="40%"><strong>La configurazione di amp-analytics avrà il seguente aspetto:</strong></td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=${clientId(uid)}</code></td>
  </tr>
  <tr>
    <td><strong>Ciò che viene inviato in rete avrà il seguente aspetto</strong></td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id</code><p><em>In questo caso, <code>${clientId(uid)}</code> viene sostituito da un valore reale che AMP genera in quel momento o che verrà restituito in base a ciò che il browser dell'utente ha già memorizzato localmente</em></p>
</td>
  </tr>
</table>

Una cosa da notare è il fatto che il parametro passato alla sostituzione dell'ID client, `${clientId(uid)`, è `uid`. Questa è una scelta voluta per farla corrispondere allo stesso nome di cookie utilizzato nell'origine dell'editore come descritto nell'[Attività 1](#task1). Per garantire una migliore integrazione, si può applicare la stessa tecnica.

Per quanto riguarda il resto dell'implementazione di amp-analytics, consultare la documentazione per [la configurazione di amp-analytics](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/) che riporta maggiori dettagli su come impostare le richieste di amp-analytics o modificare quelle del proprio fornitore di strumenti di analisi. Il ping può essere ulteriormente modificato per trasportare dati aggiuntivi definiti direttamente o sfruttando altre [sostituzioni AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md).

> **Informazione utile:**
> Perché abbiamo utilizzato il nome `uid` per il parametro passato alla funzione ID client? Il parametro utilizzato dalla sostituzione `clientId(...)` serve a definire l'ambito. Si può efficacemente utilizzare la funzione ID client per molti casi d'uso e, di conseguenza, generare molti ID client. Il parametro distingue tra questi casi d'uso e quindi permette di specificare il caso d'uso per il quale occorre un ID client. Ad esempio, si potrebbero inviare identificatori diversi a terze parti, quali inserzionisti, utilizzando il parametro "scope" per raggiungere questo risultato.

Sull'origine dell'editore, il concetto di "ambito" può coincidere con quello di cookie. Suggerendo un valore di `uid` per il parametro ID client qui nell'[Attività 2](#task2), ci adeguiamo alla scelta di utilizzare un cookie chiamato `uid` nell'[Attività 1](#task1).

<a id="task3"></a>

### Attività 3: gestire i ping di analisi provenienti dalle pagine sull'origine dell'editore <a name="task-3-process-analytics-pings-from-pages-on-the-publisher-origin"></a>

In virtù della configurazione eseguita nelle attività 1 e 2, quando qualcuno accede alla versione AMP (da qualsiasi contesto) o alla versione senza elementi AMP sull'origine dell'eitore, il ping di analisi utilizzerà lo stesso identificatore. Seguendo la guida dell'[Attività 2](#task2) per scegliere un "ambito" dell' ID client che abbia lo stesso nome del cookie utilizzato nell'[Attività 1](#task1), AMP riutilizzerà lo stesso cookie.

Questa situazione è illustrata nella tabella seguente:

<table>
  <tr>
    <td width="40%">Un ping di analisi proveniente da una <strong>pagina non AMP sull'origine dell'editore</strong> ha il seguente aspetto</td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code></td>
  </tr>
  <tr>
    <td>Un ping di analisi proveniente da una <strong>pagina AMP sull'origine dell'editore</strong> ha il seguente aspetto</td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code><br><em>In questo caso è lo stesso! Scegliendo un valore di ambito per <code>uid</code>, viene utilizzato il valore del sottostante cookie <code>uid</code>, che è <code>$publisher_origin_identifier</code>.</em>
</td>
  </tr>
</table>

<a id="task4"></a>

### Attività 4: gestire i ping di analisi dai contesti della cache AMP o del visualizzatore AMP e stabilire il mapping degli identificatori (se necessario) <a name="task-4-process-analytics-pings-from-amp-cache-or-amp-viewer-display-contexts-and-establish-identifier-mappings-if-needed"></a>

Anche impostando i ping di analisi nell'[Attività 2](#task2) per trasmettere i dati dalle pagine AMP visualizzate all'interno di una cache AMP o di un visualizzatore AMP, abbiamo creato un problema. Come detto in precedenza, i contesti della cache AMP e del visualizzatore AMP sono diversi dal contesto dell'origine dell'editore e, per questo, essi presentano un modo diverso di mantenere gli identificatori. Per gestire questi ping in modo da evitare problemi come il conteggio in eccesso degli utenti, adotteremo alcune [procedure](#implementation-steps) per cercare di correggere gli identificatori il più spesso possibile.

Per spiegare al meglio le procedure che stiamo eseguendo, sarà utile riconsiderare esattamente come si pesenta il problema dell'eccesso di conteggi.

#### Analisi del problema <a name="reviewing-the-problem"></a>

Si consideri il seguente flusso di interazioni:

1. Un utente visita una **pagina AMP nel contesto di un visualizzatore AMP**, ad esempio `https://google.com/amp/s/example.com/article.amp.html`. Poiché il visualizzatore AMP non ha accesso al cookie dell'`uid` sull'origine dell'editore, la procedura genera un valore casuale di `$amp_client_id` per identificare l'utente.
2. Lo stesso utente visita quindi **una pagina sull'origine dell'editore `https://example.com`**. Come descritto nell'[Attività 3](#task3), l'utente viene identificato con `$publisher_origin_identifier`.

In questo esempio i casi (1) e (2) si presentano su origini (o contesti) differenti. Per questo motivo, non esiste uno stato condiviso e `$amp_client_id` è diverso da `$publisher_origin_identifier`. Allora, qual è l'impatto? Il caso (1) è una singola sessione di visualizzazione della pagina che sembra indicare la visita di un solo utente, mentre il caso (2) è una singola sessione di visualizzazione di pagina, ma diversa, per cui sembra provenire da un altro utente. **Questo vuol dire che, anche se lo stesso utente è rimasto sui contenuti di `https://example.com`, la procedura conteggia un utente in più e l'utente nel caso (1) corrispondere a una singola visita alla pagina.**

#### Strategia di soluzione <a name="solution-strategy"></a>

Per affrontare il problema dei conteggi in eccesso, è necessario utilizzare la seguente strategia, la cui efficacia dipende dal fatto che la lettura o la scrittura di cookie di terzi sia consentita:

- **Correzione immediata dell'identificatore: se è possibile modificare i cookie di origine dell'editore o accedervi**, utilizzare o creare l'identificatore di origine dell'editore e ignorare qualsiasi identificatore all'interno della richiesta di analisi. Sarà possibile ristabilire con successo il collegamento dell'attività tra i due contesti.
- **Correzione ritardata dell'identificatore: se non è possibile modificare l'identificatore di origine dell'editore (ovvero i cookie), né accedervi**, occorre riprendere in considerazione l'ID client AMP contenuto nella richiesta di analisi stessa. Utilizzare questo identificatore come "**alias**", invece di utilizzare o creare un nuovo identificatore dell'origine dell'editore (cookie), cosa impossibile (a causa del blocco dei cookie di terzi parti) e aggiungere l'alias a una **tabella di mapping**. Non sarà possibile ricostruire immediatamente il collegamento dell'attività tra i due contesti, ma utilizzando una tabella di mapping si potrà collegare il valore dell'ID client AMP all'identificatore di origine dell'editore in una successiva visita dell'utente. Quando ciò accade, saranno disponibili le informazioni necessarie a ricostruire il collegamento delle attività e stabilire che la pagina visitata nei diversi contesti proviene dallo stesso utente. L'attività 5 descrive come ottenere una soluzione completa in scenari specifici in cui l'utente passa immediatamente da una pagina all'altra.

#### Procedura di implementazione <a name="implementation-steps"></a>

Verificare la presenza di un identificatore di origine dell'editore esistente sul server

Leggere i cookie inviati nell'ambito della richiesta di analisi. Nel nostro esempio, ciò significa controllare il cookie `uid` di example.com.

- Se la lettura del valore `uid` riesce, utilizzarlo per registrare i dati di analisi (**identificatore di registrazione dei dati di analisi**). In virtù dell'[Attività 1](#task1), conosciamo questo valore dell'identificatore `$publisher_origin_identifier`. Dopo aver individuato l'identificatore di registrazione dei dati di analisi, possiamo passare alla sezione di [Archiviazione dei dati](#data-storage).
- Se il valore `uid` non viene letto correttamente, procedere con i passaggi seguenti che coinvolgono la tabella di mapping.

##### Tabella di mapping<a name="mapping-table"></a>

La nostra tabella di mapping assocerà i valori dell'ID client AMP visualizzati nei ping di analisi agli identificatori di origine dell'editore, come indicato di seguito:

<table>
  <tr>
    <th width="50%"><strong>ID utente sull'origine dell'editore</strong></th>
    <th width="50%"><strong>ID utente sulla pagina AMP che NON è sull'origine dell'editore ("alias")</strong></th>
  </tr>
  <tr>
    <td>Proviene dall'identificatore di origine dell'editore o viene generato come valore potenziale se non è possibile accedere all'identificatore di origine dell'editore.</td>
    <td>Proviene dall'ID client AMP</td>
  </tr>
</table>

Subito dopo aver stabilito che non è stato possibile leggere l'identificatore di origine dell'editore, verificare se l'ID client AMP contenuto nel ping di analisi è già utilizzato in un mapping. A questo scopo, prima consultare la richiesta di amp-analytics in arrivo per ottenere il valore dell'ID client. Ad esempio, la seguente richiesta:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id
[/sourcecode]

estraiamo la parte in grassetto corrispondente all'ID client AMP: `$amp_client_id` .

Successivamente, esaminare la tabella di mapping alla ricerca dello stesso valore nella colonna "alias":

<table>
  <tr>
    <th width="50%"><strong>ID utente sull'origine dell'editore</strong></th>
    <th width="50%"><strong>ID utente sulla pagina AMP che NON è sull'origine dell'editore ("alias")</strong></th>
  </tr>
  <tr>
    <td><code>$existing_publisher_origin_identifier</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Nell'esempio precedente, troviamo un record che già esiste. Il valore che troviamo associato all'ID client AMP diventa l'identificatore del record di analisi. Nel nostro caso è `$existing_publisher_origin_identifier`. Una volta stabilito un identificatore del record di analisi, possiamo passare direttamente alla sezione [Archiviazione dati](#data-storage).

Altrimenti, se l'ID client AMP non viene trovato in un mapping, dobbiamo crearne uno:

1. Generare un **identificatore potenziale dell'origine dell'editore**. Negli esempi che seguono, chiameremo questo identificatore`$prospective_identifier`. Questo valore deve essere creato in base all'impostazione del valore sull'origine dell'editore, come descritto nella precedente [Attività 1](#task1).
2. Successivamente, occorre provare a [impostare](https://en.wikipedia.org/wiki/HTTP_cookie#Setting_a_cookie) l'identificatore potenziale dell'origine dell'editore come cookie sull'origine stessa. Ciò potrà avvenire se è possibile scrivere cookie di terzi, altrimenti non funzionerà.
3. Quindi, memorizzare la coppia {identificatore potenziale di origine dell'editore, ID client AMP}.

Il mapping che abbiamo creato avrà un aspetto simile a questo:

<table>
  <tr>
    <th><strong>ID utente sull'origine dell'editore</strong></th>
    <th><strong>ID utente sulla pagina AMP che NON è sull</strong></th>
  </tr>
  <tr>
    <td>
<code>$prospective_identifier</code> (generato in modalità just-in-time quando viene ricevuto il ping di analisi)</td>
    <td>
<code>$amp_client_id</code> (proveniente dal ping di analisi)</td>
  </tr>
</table>

Useremo l'identificatore potenziale di origine dell'editore come identificatore del record di analisi poiché è il valore associato allo stato sull'origine dell'editore. In questo caso è `$prospective_identifier`, che entrerà in gioco nella successiva sezione [Archiviazione dati](#data-storage).

##### Archiviazione dati <a name="data-storage"></a>

Ora che abbiamo individuato l'identificatore del record di analisi, possiamo effettivamente memorizzare le informazioni sullo stato utente (dati di analisi in questo caso) individuate da tale identificatore:

[sourcecode:text]
{analytics record identifier, analytics data ...}
[/sourcecode]

<a id="task5"></a>

### Attività 5: utilizzare l'ID client nei collegamenti e nell'invio dei moduli <a name="task-5-using-client-id-in-linking-and-form-submission"></a>

In generale, quando la lettura e la scrittura di cookie di terzi non è consentita, si verificheranno situazioni in cui la gestione dello stato utente non può essere realizzata del tutto efficacemente. Nelle attività 1-4, i passi svolti aiutano in due modi: (1) forniscono una soluzione completamente efficace nei casi in cui lettura e scrittura dei cookie di terzi sono consentiti e (2) impostano il nostro sistema per approfittare di eventuali opportunità di correggere gli identificatori multi-contesto, se la correzione immediata è impossibile a causa delle impostazioni dei cookie sul browser.

In questa attività, implementiamo un'ottimizzazione aggiuntiva che serve quando l'utente naviga da una pagina all'altra attraverso più contesti **tramite collegamenti o invii di moduli**. In queste situazioni, e con l'implementazione descritta di seguito, è possibile impostare uno schema completamente efficace per la gestione dello stato utente multi-contesto.

<amp-img alt="Links can be used to pass the identifier information of one context into another (linked) context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-form-identifier-forwarding.png" width="866" height="784">
  <noscript><img alt="I collegamenti possono essere utilizzati per passare le informazioni sull'identificatore di un contesto in un altro contesto (collegato)" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-form-identifier-forwarding.png"></noscript></amp-img>

##### Utilizzo delle funzioni di sostituzione <a name="using-substitution-features"></a>

Il nostro approccio sfrutterà due tipi di [sostituzioni di variabili AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-var-substitutions.md).

**Aggiornamento dei collegamenti in uscita per utilizzare una sostituzione dell'ID client.** Definire un nuovo parametro di query, `ref_id` ("ID referente"), che apparirà all'interno dell'URL e indicherà l'**identificatore del contesto di origine** per l'utente. Impostare questo parametro di query in modo che sia uguale al valore di sostituzione dell'ID client AMP:

[sourcecode:html]
<a
href="https://example.com/step2.html?ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Soluzione alternativa per passare l'ID client ai collegamenti in uscita:** definire il nuovo parametro di query `ref_id` come parte del componente `data-amp-addparams` dell'attributo dati e per le query che richiedono la sostituzione di parametri fornire tali dettagli nell'ambito dell'elemento `data-amp-replace`. In tal modo l'URL risulterà pulito e i parametri specificati in `data-amp-addparams` saranno aggiunti dinamicamente

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

Per il passaggio di più parametri di query tramite `data-amp-addparams`, separarli con `&` nel seguente modo

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)&pageid=p123"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Aggiornamento degli input del modulo per utilizzare una sostituzione dell'ID client:** definire un nome per il campo di input, ad esempio `orig_user_id`. Specificare il `default-value` del campo modulo in modo che corrisponda al valore della sostituzione dell'ID client AMP:

[sourcecode:html]
<input
  name="ref_id"
  type="hidden"
  value="CLIENT_ID(uid)"
  data-amp-replace="CLIENT_ID"
/>
[/sourcecode]

Implementando questa procedura, l'ID client è disponibile per il server di destinazione e/o come parametro URL sulla pagina in cui l'utente accede dopo il clic sul collegamento o l'invio del modulo (il **contesto di destinazione**). Il nome (o "chiave") sarà `ref_id` perché è così che lo abbiamo definito nelle implementazioni precedenti e avrà un valore associato uguale all'ID client. Ad esempio, seguendo il collegamento (tag `<a>`) definito sopra, l'utente accederà al seguente URL:

[sourcecode:http]
https://example.com/step2.html?ref_id=$amp_client_id
[/sourcecode]

<amp-img alt="Example of how an identifier in an AMP viewer context can be passed via link into a publisher origin context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-1.png" width="1038" height="890">
  <noscript><img alt="Esempio di come un identificatore nel contesto di un visualizzatore AMP può essere passato tramite link a un contesto di origine del publisher" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-1.png"></noscript></amp-img>

Quando l'utente arriva su una pagina contenente un valore `ref_id` come parametro URL o nell'intestazione, abbiamo l'opportunità di gestire l'identificatore `ref_id` insieme all'identificatore esposto dalla pagina stessa (cioè un valore del cookie). Includendo entrambi in un ping di analisi, il server di analisi può funzionare con entrambi i valori contemporaneamente e, sapendo che sono correlati, trasmettere questa relazione al sistema backend. Il passaggio successivo fornisce i dettagli su come eseguire questa operazione.

##### Estrazione dei parametri di query dell'URL <a name="extracting-url-query-parameters"></a>

Utilizzando le funzioni di sostituzione, definiamo un flusso per l'esplorazione dei collegamenti o l'invio di moduli che espone le informazioni, in particolare l'ID client, al server di destinazione e/o come parametro URL che può essere letto sul client dopo che l'utente ha completato la navigazione.

Se le informazioni sono trasmesse solo al server, ad esempio tramite un modulo POST, è possibile procedere all'elaborazione delle informazioni e al rendering della pagina risultante. Durante l'elaborazione di tali dati, occorre prendere nota dei passaggi relativi alla [convalida dei parametri](#parameter-validation) descritti di seguito.

Se le informazioni sono disponibili tramite URL e occorre gestirle, si possono utilizzare un paio di approcci:

- Gestione durante il reindirizzamento (gestione lato server)
- Gestione sulla pagina di destinazione (gestione lato client)

**Gestione durante il reindirizzamento (gestione lato server)**

Per effettuare l'elaborazione durante il reindirizzamento, occorre gestire la richiesta sul server ed estrarre i parametri pertinenti. Possiamo annotare i passaggi relativi alla [convalida dei parametri](#parameter-validation) descritti di seguito. Elaborare i dati, in combinazione con i valori dei cookie contenenti altri identificatori pertinenti, quindi reindirizzare a un URL che non contiene i parametri.

**Gestione sulla pagina di destinazione (gestione lato client)**

Per effettuare l'elaborazione sulla pagina di destinazione, l'approccio varierà a seconda che la pagina sia una pagina AMP o meno.

<amp-img alt="Example of how to construct an analytics ping that contains an identifier from the previous context provided via URL and an identifier from the current context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-2.png" width="1326" height="828">
  <noscript><img alt="Esempio di come costruire un ping di analisi che contiene un identificatore dal contesto precedente fornito tramite URL e un identificatore dal contesto corrente" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-2.png"></noscript></amp-img>

_Aggiornamenti alla pagina AMP:_ utilizzare la funzione di sostituzione dei parametri di query nella configurazione di amp-analytics per ottenere il valore dell'identificatore `ref_id` all'interno dell'URL. La funzione Query Parameter accetta un parametro che indica la "chiave" della coppia chiave-valore richiesta nell'URL e restituisce il valore corrispondente. Utilizzare la funzione ID client come abbiamo fatto per ottenere l'identificatore per il contesto della pagina AMP.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}
[/sourcecode]

Per la trasmissione in rete, avverrà la sostituzione dei valori effettivi.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$referrer_page_identifier&user_id=$current_page_identifier
[/sourcecode]

Seguendo i nostri esempi precedenti, abbiamo:

[sourcecode:text]
$referrer_page_identifier is $amp_client_id
$current_page_identifier is $publisher_origin_id
[/sourcecode]

in modo che il ping effettivo sarà:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$amp_client_id&user_id=$publisher_origin_id
[/sourcecode]

Si consiglia di convalidare l'autenticità dei valori dei parametri di query utilizzando i passaggi descritti nella successiva sezione [Convalida dei parametri](#parameter-validation).

_Aggiornamenti alla pagina senza elementi AMP:_ analogamente, su pagine senza elementi AMP fornita dall'origine dell'editore occorre estrarre e inviare il valore `ref_id` contenuto nell'URL. Convalidare l'autenticità del valore seguendo i passaggi descritti nella successiva sezione [Convalida dei parametri](#parameter-validation). Quindi, costruire ping di analisi che includano sia un parametro `orig_user_id` derivato da `ref_id` e un parametro `user_id` basato sul valore dell'identificatore del cookie proprietario.

<blockquote>
<p><strong>IMPORTANTE:</strong></p>
<p>Decidendo di gestire i parametri sul lato client nella pagina di destinazione, tale pagina dovrà rimuovere le informazioni sull'identificatore dagli URL non appena l'identificatore può essere acquisito.</p>
<p>Prima di rimuovere i parametri, assicurarsi che il restante codice che deve essere eseguito per la loro lettura:</p>
<ul>
  <li>sia eseguito prima che avvenga la rimozione; oppure</li>
  <li>possa accedere a un punto in cui il codice che ha letto e rimosso i parametri ha memorizzato i dati</li>
</ul>
<p>Per eseguire questa operazione su pagine non AMP, includere il seguente codice JavaScript, che rimuoverà tutti i parametri di query dall'URL:</p>
<pre>var href = location.href.replace(/\?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');<br>history.replaceState(null, null, href);</pre>
<p>Adattare tale codice se occorre rimuovere meno parametri di query.</p>
</blockquote>

##### Elaborazione di più identificatori in un ping di analisi <a name="processing-multiple-identifiers-in-an-analytics-ping"></a>

A differenza dell'[Attività 4](#task4), in cui il ping di analisi è configurato per contenere un solo valore identificativo, con i passi che abbiamo seguito finora nell'Attività 5 ora abbiamo due identificatori: `orig_user_id` e `user_id`. Tratteremo in seguito come elaborare questi due identificatori che fanno parte del ping di analisi in ingresso.

Prima di procedere, occorre annotare i passi della procedura descritta nella successiva sezione [validazione dei parametri](#parameter-validation) e predisporsi a ritenere affidabili entrambi i valori indicati da `orig_user_id` e `user_id`.

Controllare se uno dei valori ad essi corrispondenti è presente nella tabella di mapping. Nel nostro esempio precedente, la prima visualizzazione si verifica su una pagina AMP che NON si trova nell'origine dell'editore, mentre la seconda visualizzazione della pagina si verifica nell'origine dell'editore. Di conseguenza, i valori per i parametri di query del ping di analisi avranno un aspetto simile a questo:

**Caso n. 1: gestione dell'identificatore quando il ping di analisi viene inviato da una pagina sull'origine dell'editore**

<table>
  <tr>
    <th width="20%"></th>
    <th width="40%"><strong>ID utente sull'origine dell'editore</strong></th>
    <th width="40%"><strong>     <br><br>	ID utente sulla pagina AMP che NON è sull'origine dell'editore ("alias")</strong></th>
  </tr>
  <tr>
    <td><strong>Espressione nel ping di analisi</strong></td>
    <td><code>user_id=$publisher_origin_id</code></td>
    <td><code>orig_user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Chiave parametro</strong></td>
    <td><code>user_id</code></td>
    <td><code>orig_user_id</code></td>
  </tr>
  <tr>
    <td><strong>Valore parametro</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Si noti che l'identificatore proveniente dalla prima visualizzazione di pagina corrisponde alla colonna più a destra e l'identificatore proveniente dalla seconda visualizzazione di pagina si trova nella colonna centrale, in base a come è stato costruito il flusso del nostro esempio precedente.

Se invece l'utente inizia su una pagina fornita dall'origine dell'editore e successivamente si sposta su una pagina AMP che NON si trova sull'origine dell'editore, le chiavi dei parametri verranno invertite, ma non il modo in cui facciamo riferimento ai loro valori (ad esempio `$amp_client_id` si riferisce sempre a un identificatore memorizzato su una pagina AMP che NON si trova sull'origine dell'editore):

**Caso n. 2: gestione dell'identificatore quando il ping di analisi viene inviato da una pagina AMP che non è sull'origine dell'editore**

<table>
  <tr>
    <th width="20%"> </th>
    <th width="40%"><strong>ID utente sull'origine dell'editore</strong></th>
    <th width="40%"><strong>ID utente sulla pagina AMP che NON è sull'origine dell'editore ("alias")</strong></th>
  </tr>
  <tr>
    <td><strong>Espressione nel ping di analisi</strong></td>
    <td><code>orig_user_id=$publisher_origin_id</code></td>
    <td><code>user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Chiave parametro</strong></td>
    <td><code>orig_user_id</code></td>
    <td><code>user_id</code></td>
  </tr>
  <tr>
    <td><strong>Valore parametro</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Quando si esegue la ricerca nella tabella di mapping, prendere nota della situazione in cui si applica e cercare i valori all'interno delle colonne della tabella di mapping in cui ci si aspetta che appaiano. Ad esempio, se il ping di analisi viene inviato da una pagina sull'origine dell'editore (Caso n. 1), controllare i valori con chiave `user_id` nella colonna della tabella di mapping "ID utente sull'origine dell'editore" e controllare i valori con chiave `orig_user_id` nella colonna "ID utente su una pagina AMP che NON è sull'origine dell'editore ('alias')".

Se non è possibile individuare nessuno dei valori dell'identificatore utilizzato nella tabella di mapping, definire un nuovo mapping:

- Se la richiesta di analisi proviene da una pagina sull'origine dell'editore, è necessario scegliere il valore corrispondente a `uid` come identificatore del record di analisi; scegliere il valore di `orig_uid` come "alias".
- Se la richiesta di analisi non proviene da una pagina sull'origine dell'editore, è necessario scegliere il valore corrispondente a `uid` come valore "alias" nella tabella di mapping. Quindi, procedere con le restanti istruzioni nell'[Attività 4](#task4) per creare un potenziale identificatore dell'origine dell'editore e tentare di impostare questo valore come cookie sull'origine.

##### Convalida dei parametri <a name="parameter-validation"></a>

I valori contenuti in un URL possono essere stati modificati con finalità dannose, oppure avere un formato non corretto o contenere valori comunque diversi da quelli che ci si aspetterebbe di trovare. Questa situazione è talvolta chiamata richiesta intersito falsa. Se è importante garantire che i ping di analisi ricevuti dal server di analisi provengano dalle pagine che si prevede possano inviarli, quando si "inoltrano" valori che facevano parte dell'URL, è altrettanto importante convalidare il referente per garantire l'affidabilità dei valori ricevuti.

Ad esempio, nella procedura precedente, abbiamo costruito il seguente URL, su cui l'utente deve cliccare per passare alla pagina corrispondente:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$amp_client_id
[/sourcecode]

Tuttavia, è anche possibile che l'utente o qualche hacker modifichino l'URL nel seguente modo:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$malicious_value
[/sourcecode]

Occorre garantire solo l'utilizzo di istanze di<br>`$amp_client_id` evitando l'uso di istanze di `$malicious_value`.

**Procedura suggerita per convalidare i valori ricevuti tramite i parametri di query URL:** verificare che il referente della pagina di destinazione corrisponda a un URL che ci si aspetterebbe di vedere. Questo URL in genere deve essere uno già incontrato in precedenza che portava un valore di identificatore in una richiesta CORS valida. Si suggerisce di accettare solo identificatori già noti.

In una pagina non AMP, controllare il parametro `document.referrer` direttamente sul lato client o trasmettere il valore nell'ambito del ping di analisi per poter convalidare sul lato server. Se il valore del referente è affidabile, si possono accettare ed elaborare i valori originati dall'URL della pagina di destinazione, come `orig_user_id` nell'esempio precedente.

In una pagina AMP, utilizzare la variabile di sostituzione del [referente di documento](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#document-referrer) per trasmettere il valore del referente nell'ambito del ping di analisi. L'elaborazione lato server è l'unica opzione disponibile. Per illustrare questo fatto, segue un ping di analisi che la pagina di destinazione può inviare: esso contiene (1) il valore dell'ID client della pagina corrente, (2) un valore passato tramite l'URL che abbiamo impostato come valore dell'ID client nella pagina di riferimento e (3) le informazioni del referente stesso per convalidare il valore (2): `https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}&referrer=${documentReferrer}`

Se il referente non è affidabile, non accettare e non utilizzare i valori forniti tramite i parametri URL.

## Procedure fortemente consigliate <a name="strongly-recommended-practices"></a>

### Mantenere una sola associazione <a name="keep-just-one-association"></a>

**Deve essere mantenuta solo un'associazione tra identificatori di due contesti.** Se un ID client AMP precedentemente associato a un cookie o a un altro identificatore utente, è visualizzato insieme a un nuovo cookie o identificatore utente, si consiglia di eliminare tutto lo stato in relazione al cookie e all'identificatore utente usati in precedenza.

Questa procedura potrà garantire il rispetto dei requisiti di privacy degli utenti. Come spiegato in dettaglio nelle sezioni precedenti, la gestione dello stato utente in AMP spesso implica l'archiviazione e l'associazione di identificatori diversi in più contesti in cui viene visualizzato il contenuto AMP. **Questa situazione non dovrebbe mai essere troppo sfruttata per ricostituire dati o eseguire tracciamenti che l'utente non si aspetta o di cui non è stato chiaramente informato, ad esempio, dopo che l'utente ha cancellato i suoi cookie dai siti in questione.**

### Rispetto della cancellazione dei cookie e della memoria locale <a name="respect-cookie-and-local-storage-deletions"></a>

**È necessario rispettare tutti i controlli sulla privacy applicabili messi a disposizione dell'utente, inclusi eventuali controlli di questo tipo che creano la possibilità di eliminare tutti i cookie e la memoria locale.** In nessun momento l'ID client AMP o l'infrastruttura AMP devono essere [utilizzati per ricostituire un identificatore eliminato](https://en.wikipedia.org/wiki/Zombie_cookie) dopo che un utente ha esplicitamente cancellato dal suo lato una relazione di identificazione.

### Rispettare le leggi e le normative locali <a name="comply-with-local-laws-and-regulations"></a>

**In alcune giurisdizioni l'associazione di cookie e/o identificatori di due o più domini potrebbe richiedere l'aggiornamento dell'informativa sulla privacy, la fornitura di informazioni aggiuntive all'utente o la richiesta del consenso all'utente finale.** L'utilizzo dell'ID client AMP, che fa uso di cookie o dell'archiviazione locale persistente per fornire identificatori stabili, deve essere analizzato da ciascun editore per verificarne la conformità a tutte le leggi e normative applicabili in materia di raccolta, archiviazione, elaborazione dei dati e notifiche all'utente.

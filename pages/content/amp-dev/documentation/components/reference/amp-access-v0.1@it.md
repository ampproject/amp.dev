---
$title: amp-access
$category@: dynamic-content
teaser:
  text: Fornisce un paywall AMP e supporto per l'abbonamento.
---



L'Accesso AMP o il "supporto per l'abbonamento e il paywall AMP" offrono ai publisher il controllo sui contenuti a cui un lettore può accedere e con quali restrizioni, in base allo stato dell'abbonamento del lettore, al numero di visualizzazioni e ad altri fattori.

# amp-access <a name="amp-access"></a>



<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

<table>
  <tr>
    <td><strong>Disponibilità</strong></td>
    <td>Stabile</td>
  </tr><tr>
  <td class="col-fourty"><strong>Script obbligatorio</strong></td>
  <td>
    <div>
      <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js">&lt;/script></code>
    </div>
  </td>
</tr>
<tr>
  <td class="col-fourty"><strong>Esempi</strong></td>
  <td><a href="https://ampbyexample.com/components/amp-access/">Esempio di codice annotato per amp-access</a></td>
</tr>
</table>

## Relazione con `amp-subscriptions` <a name="relationship-to-amp-subscriptions"></a>

L'estensione [`amp-subscriptions`](amp-subscriptions.md) offre funzioni simili ad `amp-access`. Tuttavia, supporta un protocollo paywall di accesso più specializzato. Alcune importanti differenze sono:

1. La risposta degli entitlement di `amp-subscriptions` è simile all'autorizzazione amp-access, ma è molto definita e standardizzata.
1. L'estensione `amp-subscriptions` consente la configurazione di più servizi affinché la pagina possa partecipare alle decisioni di accesso/paywall. Tali servizi vengono eseguiti simultaneamente e viene data priorità a quello che restituisce una risposta positiva.
1. I visualizzatori AMP possono fornire una risposta di autorizzazione firmata ad `amp-subscriptions` sulla base di un contratto indipendente stipulato con i publisher come prova di accesso.
1. Il markup dei contenuti in `amp-subscriptions` è standardizzato e consente alle app e ai crawler di individuare facilmente le sezioni dei contenuti premium.

A causa della standardizzazione del markup, del supporto multi-provider e del supporto per la visualizzazione migliorato, è consigliabile che le nuove implementazioni dei fornitori di publisher e paywall utilizzino `amp-subscriptions`.

## Soluzione <a name="solution"></a>

La soluzione proposta permette al publisher di controllare le decisioni e i flussi di seguito:

- Creazione e mantenimento degli utenti
- Controllo del monitoraggio (consente un certo numero di visualizzazioni gratuite)
- Responsabilità per il flusso di accesso
- Responsabilità per l'autenticazione dell'utente
- Responsabilità per le regole di accesso e l'autorizzazione
- Flessibilità sui parametri di accesso per ogni documento

La soluzione comprende i seguenti elementi:

1. [**ID lettore AMP**](#amp-reader-id): fornito dall'ecosistema AMP, si tratta di un identificatore univoco del lettore così com'è visto da AMP.
1. [**Markup dei contenuti di accesso**](#access-content-markup): creato dal publisher, definisce quali parti di un documento sono visibili e in quali circostanze.
1. [**Endpoint di autorizzazione**](#authorization-endpoint): fornito dal publisher, restituisce la risposta che spiega quale parte di un documento può essere utilizzata dal lettore.
1. [**Endpoint del pingback**](#pingback-endpoint): fornito dal publisher, viene utilizzato per inviare l'impressione "visualizzazione" per un documento.
1. [**Link di accesso e pagina di accesso**](#login-page-and-login-link): consente al publisher di autenticare il lettore e di collegare la propria identità con l'ID lettore AMP.

La cache AMP di Google restituisce il documento al lettore con alcune sezioni oscurate utilizzando il Markup dei contenuti di accesso. Il runtime AMP richiama l'Endpoint di autorizzazione e utilizza la risposta per nascondere o mostrare sezioni diverse, come definito dal Markup dei contenuti di accesso. Dopo che il documento è stato mostrato al lettore, il runtime AMP chiama l'Endpoint del pingback, che può essere utilizzato dal publisher per aggiornare il contatore del conto alla rovescia (numero di visualizzazioni gratuite utilizzate).

La soluzione consente inoltre al publisher di inserire nel documento AMP un link di accesso che avvia la pagina di accesso/iscrizione in cui il publisher può autenticare il lettore e associare l'identità del lettore nel proprio sistema con l'ID lettore AMP.

Nella sua versione di base, questa soluzione invia il documento completo, sebbene oscurato, al lettore e mostra/nasconde le sezioni limitate in base alla risposta di autorizzazione. Tuttavia, la soluzione fornisce anche l'opzione "server", in cui le sezioni limitate possono essere escluse dalla pubblicazione del documento iniziale e scaricate solo dopo che l'autorizzazione è stata confermata.

Per supportare l'Accesso AMP, è necessario che il publisher implementi gli elementi descritti sopra. Il Markup dei contenuti di accesso e l'Endpoint di autorizzazione sono obbligatori. Endpoint del pingback e Pagina di accesso sono facoltativi.

### ID lettore AMP <a name="amp-reader-id"></a>

Per facilitare i servizi di accesso e i casi d'uso, l'Accesso AMP introduce il concetto di *ID lettore*.

L'ID lettore è un ID anonimo e univoco creato dall'ecosistema AMP. È univoco per ogni coppia di lettore/publisher: un lettore è identificato in modo diverso da due publisher diversi. Si tratta di un ID non reversibile. L'ID lettore è inserito in tutte le comunicazioni AMP/publisher e ha un'entropia molto elevata. I publisher possono utilizzare l'ID lettore per identificare il lettore e mapparlo ai propri sistemi di identità.

L'ID lettore è costruito sul dispositivo dell'utente e dovrebbe essere longevo. Tuttavia, segue le norme di archiviazione standard del browser, incluse quelle per le finestre di navigazione in incognito. Il ciclo di vita previsto di un ID lettore è di un anno tra gli utilizzi o fino a quando l'utente non cancella i propri cookie. Gli ID lettore non sono attualmente condivisi tra i dispositivi.

L'ID lettore è costruito in modo simile al meccanismo utilizzato per creare l'ID cliente esterno descritto [qui](https://docs.google.com/document/d/1f7z3X2GM_ASb3ZCI_7tngglxwS6WoWi1EB3aKzdf6vo/edit#heading=h.hb9q0wpwwhuf). Un esempio di ID lettore è `amp-OFsqR4pPKynymPyMmplPNMvxSTsNQob3TnK-oE3nwVT0clORaZ1rkeEz8xej-vV6`.

### Accesso AMP e cookie <a name="amp-access-and-cookies"></a>

I publisher possono utilizzare i propri cookie di autenticazione oppure possono basarsi sull'ID lettore o su una combinazione di entrambi.

### Markup dei contenuti di accesso <a name="access-content-markup"></a>

Il Markup dei contenuti di accesso determina le sezioni visibili o nascoste in base alla risposta di autorizzazione restituita dall'Endpoint di autorizzazione. Viene descritto tramite attributi di markup speciali.

### Endpoint di autorizzazione <a name="authorization-endpoint"></a>

L'autorizzazione è un endpoint fornito dal publisher e chiamato dal runtime AMP o dalla cache AMP di Google. Si tratta di un endpoint CORS GET con credenziali. Questo endpoint restituisce i parametri di accesso che possono essere utilizzati dal Markup dei contenuti per nascondere o mostrare parti diverse del documento.

### Endpoint del pingback <a name="pingback-endpoint"></a>

Il pingback è un endpoint fornito dal publisher e richiamato dal runtime AMP o dalla cache AMP di Google. Si tratta di un endpoint CORS POST con credenziali. Il runtime AMP chiama automaticamente questo endpoint quando il lettore inizia a visualizzare il documento. Questo endpoint viene richiamato anche dopo che il lettore ha completato il flusso di accesso. Uno degli obiettivi principali del pingback è che il publisher aggiorni le informazioni di monitoraggio.

Pingback facoltativo. Può essere disattivato impostando la proprietà di configurazione `noPingback` su `true`.

### Pagina di accesso e link di accesso <a name="login-page-and-login-link"></a>

La pagina di accesso viene implementata e gestita dal publisher e richiamata dal runtime AMP. In genere viene visualizzata come una finestra di dialogo del browser.

La pagina di accesso viene attivata quando il lettore tocca il link di accesso che può essere inserito dal publisher in qualsiasi punto del documento.

## Specifica v0.1 <a name="specification-v01"></a>

### Configurazione <a name="configuration"></a>

Tutti gli endpoint sono configurati nel documento AMP come oggetti JSON nell'HEAD del documento:

```html

<script id="amp-access" type="application/json">
  {
    "property": value,
    ...
    }
</script>

```

In questa configurazione vengono definite le seguenti proprietà:

<table>
  <tr>
    <th>Proprietà</th>
    <th>Valori</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorization</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>L'URL HTTPS dell'Endpoint di autorizzazione.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>pingback</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>L'URL HTTPS dell'Endpoint del pingback.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>noPingback</code></td>
    <td>true/false</td>
    <td>Quando è true, disattiva il pingback.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>login</code></td>
    <td class="col-twenty"><code>&lt;URL&gt;</code> o<br><Map [string, URL]></td>
    <td>L'URL HTTPS della pagina di accesso o un insieme di URL per i diversi tipi di pagine di accesso.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationFallbackResponse</code></td>
    <td><code>&lt;object&gt;</code></td>
    <td>L'oggetto JSON da utilizzare al posto della risposta di autorizzazione se non viene eseguita.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationTimeout</code></td>
    <td><code>&lt;number&gt;</code></td>
    <td>Timeout (in millisecondi) dopo il quale la richiesta di autorizzazione viene considerata non riuscita. Il valore predefinito è 3000. Valori superiori a 3000 sono consentiti solo nell'ambiente di sviluppo. </td>
  </tr>
  <tr>
    <td class="col-fourty"><code>type</code></td>
    <td>"client" o "server"</td>
    <td>L'impostazione predefinita è "client". L'opzione "server" è in fase di progettazione e questi documenti verranno aggiornati quando sarà pronta.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>namespace</code></td>
    <td>stringa</td>
    <td>L'impostazione predefinita è vuota. Lo spazio dei nomi è obbligatorio se vengono specificati più provider di accesso.</td>
  </tr>
</table>

I valori *`<URL>`* specificano gli URL HTTPS con le variabili di sostituzione. Le variabili di sostituzione sono trattate in modo più dettagliato nella sezione [Variabili URL di accesso](#access-url-variables) di seguito.

Ecco un esempio di configurazione dell'Accesso AMP:

```html

<script id="amp-access" type="application/json">
{
  "authorization":
      "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
  "pingback":
      "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
  "login":
      "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
  "authorizationFallbackResponse": {"error": true}
}
</script>

```

#### Più provider di accesso <a name="multiple-access-providers"></a>

È possibile specificare più provider di accesso utilizzando un array anziché un singolo oggetto e fornendo un `namespace` per ogni voce.

```html

<script id="amp-access" type="application/json">
[
  {
    "property": value,
    ...
    "namespace": value
  },
  ...
]
</script>
```

### Variabili URL di accesso <a name="access-url-variables"></a>

Al momento di configurare gli URL per vari endpoint, il publisher può utilizzare le variabili di sostituzione. L'elenco completo di queste variabili è definito in [Specifica Variabili AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). Inoltre, questa specifica aggiunge alcune variabili specifiche di accesso, ad esempio `READER_ID` e `AUTHDATA`. Alcune delle variabili più pertinenti sono descritte nella seguente tabella:

<table>
  <tr>
    <th>Variabile</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>READER_ID</code></td>
    <td>L'ID lettore AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AUTHDATA(field)</code></td>
    <td>Il valore del campo nella risposta di autorizzazione.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RETURN_URL</code></td>
    <td>Il segnaposto per l'URL di ritorno specificato dal runtime AMP per una finestra di dialogo di accesso a cui ritornare.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>SOURCE_URL</code></td>
    <td>L'URL di origine di questo documento AMP. Se il documento è gestito da una CDN, AMPDOC_URL sarà un URL CDN, mentre SOURCE_URL sarà l'URL di origine originale.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AMPDOC_URL</code></td>
    <td>L'URL di questo documento AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>CANONICAL_URL</code></td>
    <td>L'URL canonico di questo documento AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>DOCUMENT_REFERRER</code></td>
    <td>L'URL referrer.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>VIEWER</code></td>
    <td>L'URL del visualizzatore AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RANDOM</code></td>
    <td>Un numero casuale. Utile per evitare la memorizzazione nella cache del browser.</td>
  </tr>
</table>

Di seguito è riportato un esempio dell'URL esteso con ID lettore, URL canonico, informazioni sul referrer e cachebuster casuale:
```text
https://pub.com/access?
  rid=READER_ID
  &url=CANONICAL_URL
  &ref=DOCUMENT_REFERRER
  &_=RANDOM
```

La variabile AUTHDATA è disponibile per gli URL pingback e di accesso. Consente di trasmettere qualsiasi campo nella risposta di autorizzazione come parametro URL. Ad esempio, `AUTHDATA(isSubscriber)`. Anche le espressioni nidificate sono consentite, ad esempio `AUTHDATA(other.isSubscriber)`. Se utilizzi gli spazi dei nomi, questi possono essere anteposti al campo, ad esempio `AUTHDATA(anamespace.afield)`.

### Markup dei contenuti di accesso <a name="access-content-markup-1"></a>

Il Markup dei contenuti di accesso descrive le sezioni visibili o nascoste. Comprende due attributi AMP: `amp-access` e `amp-access-hide` che possono essere inseriti su qualsiasi elemento HTML.

L'attributo `amp-access` fornisce l'espressione che produce true o false in base alla risposta di autorizzazione restituita dall'Endpoint di autorizzazione. Il valore risultante indica se l'elemento e i suoi contenuti sono visibili o meno.

Il valore <code>amp-access</code> è un'espressione booleana definita in un linguaggio simile a SQL. La grammatica è definita nell'<a href="#appendix-a-amp-access-expression-grammar">Appendice A.</a> Si definisce come segue: ```html

<div amp-access="expression">…</div>
```Proprietà e valori fanno riferimento alle proprietà e ai valori della risposta di autorizzazione restituita dall'Endpoint di autorizzazione. Questo fornisce un sistema flessibile per supportare diversi scenari di accesso. Se utilizzi gli spazi dei nomi, basta anteporre gli spazi dei nomi ai nomi delle proprietà, ad esempio `anamespace.aproperty`.

L'attributo "amp-access-hide" può essere utilizzato per nascondere in modo ottimistico l'elemento prima della ricezione della risposta di autorizzazione, che può mostrarlo. Fornisce la semantica di "invisibile per impostazione predefinita". La risposta di autorizzazione restituita dall'autorizzazione in un secondo momento può annullare questa impostazione predefinita e rendere visibile la sezione. Se l'attributo `amp-access-hide` viene omesso, la sezione verrà mostrata/inclusa per impostazione predefinita. L'attributo "amp-access-hide" può essere utilizzato solo in combinazione con l'attributo "amp-access".
```html
<div amp-access="expression" amp-access-hide>…</div>
```

Se la richiesta di autorizzazione non va a buon fine, le espressioni "amp-access" non vengono valutate e a determinare se una sezione è visibile o nascosta è la presenza dell'attributo "amp-access-hide" inizialmente fornito dal documento.

Possiamo estendere l'insieme di attributi "amp-access-*" se necessario per supportare diverse esigenze di visualizzazione e offuscamento.*

Se la richiesta di autorizzazione non va a buon fine e la risposta "authorizationFallbackResponse" non è specificata nella documentazione, le espressioni "amp-access" non vengono valutate e a determinare se una sezione è visibile o nascosta è la presenza dell'attributo "amp-access-hide" inizialmente fornito dal documento.

Ecco un esempio che mostra il link di accesso o i contenuti completi in base allo stato dell'abbonamento:
```html
<header>
  Title of the document
</header>
<div>
  First snippet in the document.
</div>

<div amp-access="NOT subscriber" amp-access-hide>
  <a on="tap:amp-access.login">Become a subscriber now!</a>
</div>

<div amp-access="subscriber">
  Full content.
</div>

```
Qui:
- *subscriber* è un campo booleano nella risposta di autorizzazione restituita dall'Endpoint di autorizzazione. Questa sezione è nascosta per impostazione predefinita, dato che è facoltativa.
- Questo esempio sceglie di mostrare tutti i contenuti in modo ottimistico.

Ecco un altro esempio che mostra al lettore la dichiarazione di non responsabilità sullo stato del monitoraggio:
```html
{% raw %}
<section amp-access="views <= maxViews">
  <template amp-access-template type="amp-mustache">
    You are reading article {{views}} out of {{maxViews}}.
  </template>
</section>
{% endraw %}
```

Ed ecco un altro esempio che mostra contenuti aggiuntivi agli abbonati premium:
```html
<section amp-access="subscriptonType = 'premium'">
  Shhh… No one but you can read this content.
</section>
```

### Endpoint di autorizzazione <a name="authorization-endpoint-1"></a>

L'autorizzazione viene configurata tramite la proprietà `authorization` nella sezione [Configurazione dell'Accesso AMP](#configuration). Si tratta di un endpoint CORS GET con credenziali. Per sapere come garantire la sicurezza di questa richiesta, vedi [CORS Origin Security](#cors-origin-security).

L'autorizzazione può assumere qualsiasi parametro, come definito nella sezione [Variabili URL di accesso](#access-url-variables). Ad esempio, potrebbe trasmettere l'ID lettore AMP e l'URL del documento. Oltre ai parametri URL, il publisher può utilizzare qualsiasi informazione fornita naturalmente tramite protocollo HTTP, ad esempio l'indirizzo IP del lettore. È obbligatorio includere il `READER_ID`.

Questo endpoint produce la risposta di autorizzazione che può essere utilizzata nelle espressioni di markup dei contenuti per mostrare/nascondere parti diverse dei contenuti.

Il formato della richiesta è:
```text
https://publisher.com/amp-access.json?
rid=READER_ID
&url=SOURCE_URL
```
La risposta è un oggetto JSON in formato libero: può contenere proprietà e valori con poche limitazioni. Le limitazioni sono:
- I nomi delle proprietà devono essere conformi alle restrizioni definite dalla grammatica delle espressioni `amp-access` (vedi [Appendice A](#appendix-a-amp-access-expression-grammar)). Questo significa principalmente che i nomi delle proprietà non possono contenere spazi, trattini e altri caratteri non conformi alla specifica "amp-access".
- I valori delle proprietà possono essere solo uno dei seguenti tipi: stringa, numero, booleano.
- I valori possono essere nidificati anche come oggetti con valori dello stesso tipo: stringa, numero, booleano.
- Le dimensioni totali della risposta di autorizzazione serializzata non possono superare 500 byte.
- Accertati che la risposta non includa informazioni personali (PII) o dati di identificazione personale.

Di seguito è riportato un breve elenco di possibili idee per le proprietà che possono essere restituite dall'Endpoint di autorizzazione:
- Informazioni di monitoraggio: numero massimo di visualizzazioni consentite e numero corrente di visualizzazioni.
- Se ha eseguito l'accesso il lettore o un abbonato.
- Una descrizione più dettagliata dell'abbonamento: base, premium
- Dati geografici: paese, regione, area geografica di pubblicazione personalizzata

Ecco un esempio della risposta quando il lettore non è un abbonato e ha un limite di 10 articoli al mese e ne ha già visualizzati 6:
```json
{
  "maxViews": 10,
  "currentViews": 6,
  "subscriber": false
}
```
Ecco un esempio della risposta quando il lettore è connesso e ha un tipo di abbonamento premium:
```json
{
  "loggedIn": true,
  "subscriptionType": "premium"
}
```
Questo RPC può essere richiamato nella fase di prerendering e quindi non dovrebbe essere utilizzato per il conto alla rovescia del contatore dato che il lettore potrebbe non vedere mai il documento.

Un'altra considerazione importante è che in alcuni casi il Runtime AMP potrebbe dover richiamare più volte l'Endpoint di Autorizzazione per ogni impressione del documento. Questo può verificarsi quando il Runtime AMP ritiene che i parametri di accesso per il lettore siano cambiati in modo significativo, ad esempio dopo un flusso di accesso riuscito.

La risposta di autorizzazione può essere utilizzata dal Runtime AMP ed estensioni per tre diversi scopi:

1. Durante la valutazioni delle espressioni `amp-access`.
2. Durante la valutazione di modelli `<template>`, come ad esempio `amp-mustache`.
3. Quando fornisci variabili aggiuntive agli URL del pingback e di accesso utilizzando `AUTHDATA(field)`.

L'Endpoint di autorizzazione viene richiamato dal Runtime AMP come endpoint CORS accreditato. Pertanto, deve implementare il protocollo CORS. Dovrebbe utilizzare CORS Origin e l'origine della fonte per limitare l'accesso a questo servizio, come descritto nella sezione [CORS Origin Security](#cors-origin-security). Questo endpoint potrebbe utilizzare i cookie del publisher per le sue esigenze. Ad esempio, può implementare l'associazione tra l'ID lettore e l'identità utente del publisher stesso. AMP stesso non ha bisogno di essere informato di ciò (e preferisce così). Per ulteriori dettagli, consulta la documentazione su [ID lettore AMP](#amp-reader-id) e [Accesso AMP e cookie](#amp-access-and-cookies).

Il Runtime AMP (o piuttosto il browser) osserva le intestazioni delle risposte della cache quando richiama l'Endpoint di autorizzazione. Pertanto, le risposte memorizzate nella cache possono essere riutilizzate, il che può essere auspicabile o meno. Se non è il risultato desiderato, il publisher può utilizzare le intestazioni Cache-Control appropriate e/o la sostituzione delle variabili `RANDOM` per l'URL endpoint.

Se la richiesta di autorizzazione non va a buon fine, il Runtime AMP ricorrerà a "authorizationFallbackResponse", se specificato nella configurazione. In questo caso, il flusso di autorizzazione procederà normalmente con il valore della proprietà "authorizationFallbackResponse" al posto della risposta di autorizzazione. Se "authorizationFallbackResponse" non è specificato, il flusso di autorizzazione non andrà a buon fine, quindi le espressioni `amp-access` non verranno valutate e a determinare se una sezione sarà visibile o nascosta sarà la presenza dell'attributo `amp-access-hide` inizialmente fornito dal documento.

La richiesta di autorizzazione scade automaticamente e viene considerata non riuscita dopo tre secondi.

Il Runtime AMP utilizza le seguenti classi CSS durante il flusso di autorizzazione:

1. la classe CSS `amp-access-loading` viene impostata nella radice del documento quando il flusso di autorizzazione inizia e viene rimossa quando questo finisce o non va a buon fine.
2. la classe CSS `amp-access-error` viene impostata nella radice del documento quando il flusso di autorizzazione non va a buon fine.

Nell'opzione *server*, la chiamata all'Endpoint di autorizzazione viene eseguita dalla Cache AMP di Google come un semplice endpoint HTTPS. Ciò significa che in questo caso i cookie del publisher non possono essere recapitati.

### Endpoint del pingback <a name="pingback-endpoint-1"></a>

Il pingback è configurato tramite la proprietà `pingback` nella sezione [Configurazione dell'Accesso AMP](#configuration). Si tratta di un endpoint CORS POST con credenziali. Per sapere come garantire la sicurezza di questa richiesta, vedi [CORS Origin Security](#cors-origin-security).

L'URL del pingback è facoltativo. Può essere disattivato con `"noPingback": true`.

L'URL del pingback può assumere qualsiasi parametro, come definito nella sezione [Variabili URL di accesso]( #access-url-variable). Ad esempio, potrebbe trasmettere l'ID lettore AMP e l'URL del documento. È obbligatorio includere `READER_ID`.

Il pingback non produce una risposta: qualsiasi risposta viene ignorata dal Runtime AMP.

L'endpoint del pingback viene richiamato quando il lettore inizia a visualizzare il documento e dopo che ha completato il flusso di accesso.

Il publisher può scegliere di utilizzare il pingback:
- per contare il numero di visualizzazioni gratuite della pagina
- per il mapping dell'ID lettore AMP all'identità del publisher, poiché come endpoint CORS accreditato, il pingback potrebbe contenere cookie del publisher.

Il formato della richiesta è:
```text
https://publisher.com/amp-pingback?
rid=READER_ID
&url=SOURCE_URL
```

### Pagina di accesso <a name="login-page"></a>

L'URL della/e pagina/e di accesso viene configurato tramite la proprietà `login` nella sezione [Configurazione dell'Accesso AMP](#configuration).

La configurazione può specificare un singolo URL di accesso o una mappa di URL di accesso inseriti in base al tipo di accesso. Esempio di un singolo URL di accesso:
```json
{
  "login": "https://publisher.com/amp-login.html?rid={READER_ID}"
  }
```

Esempio di più URL di accesso:
```json
{
  "login": {
    "signin": "https://publisher.com/signin.html?rid={READER_ID}",
    "signup": "https://publisher.com/signup.html?rid={READER_ID}"
    }
  }
```

L'URL può assumere qualsiasi parametro, come definito nella sezione [Variabili URL di accesso](#access-url-variables). Ad esempio, potrebbe trasmettere l'ID lettore AMP e l'URL del documento. La sostituzione delle query `RETURN_URL` può essere utilizzata per specificare il parametro di query per l'URL restituito, ad esempio `?ret=RETURN_URL`. L'URL restituito è obbligatorio e se la sostituzione `RETURN_URL` non è specificata, verrà inserito automaticamente con il nome del parametro di query predefinito: "return".

La pagina di accesso è una normale pagina web senza vincoli speciali, a parte il fatto che dovrebbe funzionare correttamente come [finestra di dialogo del browser](https://developer.mozilla.org/en-US/docs/Web/API/Window/open). Per ulteriori dettagli, consulta la sezione [Flusso di accesso](#login-flow).

Il formato della richiesta è:
```text
https://publisher.com/amp-login.html?
rid=READER_ID
&url=SOURCE_URL
&return=RETURN_URL
```
Tieni presente che il parametro URL "return" viene aggiunto automaticamente dal Runtime AMP se non viene specificata la sostituzione `RETURN_URL`. Una volta che la pagina di accesso ha completato il suo lavoro, deve reindirizzare all'URL "return" specificato con il seguente formato:
```text
RETURN_URL#success=true|false
```
Osserva l'utilizzo di un parametro "success" dell'hash dell'URL. Il valore è" "true" o "false" "a seconda che l'accesso abbia esito positivo o venga abbandonato. Se possibile, la pagina di accesso invierà il segnale sia in caso di esito positivo sia in caso di esito negativo.

Se viene restituito il segnale `success=true` , il Runtime AMP richiamerà nuovamente gli Endpoint di autorizzazione e del pingback per aggiornare lo stato del documento e segnalare la "visualizzazione" con il nuovo profilo di accesso.

#### Link di accesso <a name="login-link"></a>

Il publisher può inserire il link di accesso in qualsiasi punto dei contenuti del documento.

Uno o più URL di accesso sono configurati tramite la proprietà "login" nella sezione [Configurazione dell'Accesso AMP](#configuration).

Il link di accesso può essere dichiarato su qualsiasi elemento HTML che consenta l'attributo "on". In genere, si tratta di un ancoraggio o di un pulsante. Quando un singolo URL di accesso viene configurato, il formato è:
```html <a on="tap:amp-access.login">Login or subscribe</a&gt;</code>

<p>Quando vengono configurati più URL di accesso, il formato è <code>tap:amp-access.login-{type}</code>. Esempio:
    ```html
    <a on="tap:amp-access.login-signup">Subscribe</a>
  ```

  Quando vengono utilizzati gli spazi dei nomi, il formato è `tap:amp-access.login-{namespace}` o `tap:amp-access.login-{namespace}-{type}`.

  AMP non fa distinzione tra login e subscribe. Questa distinzione può essere configurata dal publisher utilizzando più link di URL di accesso o dal profilo del publisher.

## Integrazione con *amp-analytics* <a name="integration-with-amp-analytics"></a>

L'integrazione con *amp-analytics* è documentata nel file [amp-access-analytics.md](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access/amp-access-analytics.md).

## CORS Origin Security <a name="cors-origin-security"></a>

Gli Endpoint di autorizzazione e di pingback sono endpoint CORS e devono implementare il protocollo di sicurezza descritto nella
[Specifica CORS security di AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

## Monitoraggio <a name="metering"></a>

Il monitoraggio è il sistema per cui al lettore vengono mostrati contenuti premium gratuiti per diverse visualizzazioni di documenti per un periodo di tempo determinato. Una volta raggiunta una determinata quota, viene visualizzato il lettore, al lettore viene mostrato un contenuto parziale appare il paywall con il messaggio di invito ad abbonarsi e il link di registrazione/accesso. Ad esempio, il monitoraggio può essere definito come "Il lettore può leggere 10 articoli al mese gratuitamente".

L'Accesso AMP offre le seguenti funzionalità per l'implementazione dell'accesso monitorato:

1. READER_ID deve essere utilizzato per archiviare le informazioni di monitoraggio. Poiché il publisher non può sempre impostare cookie in un contesto di terze parti, questi dati devono essere archiviati sul server.
2. Il "conteggio delle letture" può essere aggiornato solo nell'Endpoint del pingback.
3. Solo i documenti univoci possono essere conteggiati nella quota. Ad esempio, aggiornare lo stesso documento per dieci volte conta come un'unica visualizzazione. A tal fine, gli Endpoint di autorizzazione e del pingback possono inserire `SOURCE_URL` o variabili URL simili. Vedi [Variabili URL di accesso](#access-url-variables).

## First Click Free <a name="first-click-free"></a>

Le norme di First click free (o FCF) di Google sono descritte [qui](https://support.google.com/news/publisher/answer/40543), con l'aggiornamento più recente descritto più dettagliatamente [qui](https://googlewebmastercentral.blogspot.com/2015/09/first-click-free-update.html ).

Per implementare FCF, il publisher deve (1) essere in grado di determinare il servizio di riferimento per ogni visualizzazione e (2) essere in grado di contare il numero di visualizzazioni al giorno per ciascun lettore.

Entrambi i passaggi sono trattati dalle specifiche dell'Accesso AMP. Il referrer può essere inserito negli URL di autorizzazione e del pingback utilizzando la sostituzione dell'URL `DOCUMENT_REFERRER` come descritto in [Variabili URL di Accesso](#access-url-variables). Il conteggio delle visualizzazioni può essere eseguito utilizzando l'endpoint del pingback sul server. È molto simile all'implementazione del monitoraggio descritta in [Monitoraggio](#metering).

## Flusso di accesso <a name="login-flow"></a>

AMP avvia una finestra di dialogo di accesso come finestra proprietaria, popup o scheda. Se possibile, i visualizzatori AMP devono tentare di avviare la finestra di dialogo di accesso nel contesto del browser in modo che possa usufruire delle API browser di primo livello.

Il flusso di accesso viene avviato dal runtime AMP quando il lettore attiva il link di accesso e, in modo descrittivo, procede nel seguente modo:

1. La finestra di dialogo di accesso (finestra proprietaria) viene aperta dal Runtime AMP o Visualizzatore per l'URL di accesso specificato. L'URL contiene un parametro di query URL "URL di ritorno" "aggiuntivo (`&amp;return=RETURN_URL`). Inoltre, è possibile espandere un certo numero di altri parametri nell'URL, ad esempio l'ID lettore. Per ulteriori dettagli, consulta la sezione [Pagina di accesso](#login-page).
2. Il publisher visualizza una pagina di accesso in formato libero.
3. Il lettore segue i passaggi di accesso, come l'inserimento del nome utente/password o l'accesso social.
4. Il lettore invia l'accesso. Il publisher completa l'autenticazione, imposta i cookie e infine reindirizza il lettore all'URL di ritorno precedentemente richiesto. Il reindirizzamento contiene un parametro dell'hash URL `success` che può essere `true` o `false`.
5. La finestra di dialogo di accesso segue il reindirizzamento all'URL di ritorno.
6. Il Runtime AMP re-autorizza il documento.

Solo i passaggi da 2 a 5 richiedono la gestione da parte del publisher: il publisher fornisce solo la propria pagina di accesso e garantisce il reindirizzamento corretto una volta completato. Non ci sono vincoli speciali imposti sulla pagina di accesso, a parte il fatto che dovrebbe funzionare bene come una finestra di dialogo.

Come al solito, l'ID lettore deve essere incluso nella chiamata alla pagina di accesso e può essere utilizzato dal publisher per la mappatura delle identità. Come finestra proprietaria, il publisher riceverà anche i cookie e potrà impostarli. Se risulta che il lettore è già registrato come publisher, è consigliabile che il publisher reindirizzi immediatamente all'URL di ritorno con la risposta `success=true`.

## Glossario AMP <a name="amp-glossary"></a>

* **Documento AMP**: il documento HTML che segue il formato AMP e approvato dallo strumento di convalida AMP. I documenti AMP possono essere memorizzati nella cache di Google AMP.
* **Strumento di convalida AMP**: il programma che esegue un'analisi statica di un documento HTML e restituisce esito positivo o negativo a seconda che il documento sia conforme o meno al formato AMP.
* **Runtime AMP**: il runtime JavaScript che esegue il documento AMP.
* **Cache AMP di Google**: la cache proxy per i documenti AMP.
* **Visualizzatore AMP**: l'applicazione Web o nativa che visualizza/incorpora i documenti AMP.
* **Publisher.com**: il sito di un publisher AMP.
* **Endpoint CORS**: endpoint HTTPS multiorigine. Per ulteriori informazioni, consulta la pagina [https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS). Per sapere come garantire la sicurezza di tali richieste, consulta [CORS Origin Security](#cors-origin-security).
* **Lettore**: la persona che sta visualizzando i documenti AMP.
* **Prerendering AMP**: I visualizzatori AMP possono usufruire del prerendering, che esegue il rendering di un documento nascosto prima che possa essere mostrato. Questo permette un notevole aumento delle prestazioni. Tuttavia, è importante tenere conto del fatto che il prerendering del documento non costituisce una visualizzazione poiché il lettore potrebbe non riuscire mai a visualizzare il documento.

## Revisioni <a name="revisions"></a>

* 2016-set-02: proprietà di configurazione "noPingback" e pingback facoltativo.
* 2016-mar-03: reinvia pingback dopo l'accesso (v0.5).
* 2016-feb-19: corretti i campioni per rimuovere `{}` dalle sostituzioni delle varianti URL.
* 2016-feb-15: La [Configurazione](#configuration) e l'[Endpoint di autorizzazione](#authorization-endpoint) ora consentono la proprietà "authorizationFallbackResponse", che può essere utilizzata quando l'autorizzazione non va a buon fine.
* 2016-feb-11: Timeout della richiesta di autorizzazione in [Endpoint di autorizzazione](#authorization-endpoint).
* 2016-feb-11: i riferimenti di campo nidificati come `object.field` sono ora consentiti.
* 2016-feb-09: sezioni [First click free](#first-click-free) e [Monitoraggio](#metering).
* 2016-feb-03: Specifiche per la sicurezza "provenienza origine" aggiunte alla sezione [CORS Origin Security](#cors-origin-security).
* 2016-feb-01: Il parametro di query "return" per la pagina di accesso può essere personalizzato utilizzando la sostituzione URL RETURN_URL.

## Appendice A: grammatica delle espressioni "amp-access" <a name="appendix-a-amp-access-expression-grammar"></a>

La grammatica BNF più recente è disponibile al file [access-expr-impl.jison](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access/0.1/access-expr-impl.jison).

L'estratto chiave di questa grammatica è riportato di seguito:

```javascript
search_condition:
  search_condition OR search_condition
  | search_condition AND search_condition
  | NOT search_condition
  | '(' search_condition ')'
  | predicate

predicate:
    comparison_predicate | truthy_predicate

comparison_predicate:
  scalar_exp '=' scalar_exp
  | scalar_exp '!=' scalar_exp
  | scalar_exp '<' scalar_exp
  | scalar_exp '<=' scalar_exp
  | scalar_exp '>' scalar_exp
  | scalar_exp '>=' scalar_exp

truthy_predicate: scalar_exp

scalar_exp: literal | field_ref

field_ref: field_ref '.' field_name | field_name

literal: STRING | NUMERIC | TRUE | FALSE | NULL
```

Tieni presente che le espressioni `amp-access` sono valutate dal Runtime AMP e dalla Cache AMP di Google. Questo NON fa parte delle specifiche che il publisher deve implementare. È qui solo a scopo informativo.

## Informazioni dettagliate <a name="detailed-discussion"></a>

Questa sezione comprende una spiegazione dettagliata del progetto alla base delle specifiche amp-access e chiarisce le scelte di progettazione. Disponibile a breve.

## Convalida <a name="validation"></a>

Consulta le [regole di amp-access](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access/validator-amp-access.protoascii) nella specifica dello strumento di convalida AMP.

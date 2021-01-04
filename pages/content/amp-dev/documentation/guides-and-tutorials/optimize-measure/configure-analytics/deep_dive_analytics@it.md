---
"$title": Approfondimenti su AMP Analytics
"$order": '1'
description: Questa guida approfondisce il componente amp-analytics, suddividendo una configurazione di amp-analytics di esempio nei suoi elementi costitutivi chiave.
formats:
- websites
- stories
---

Questa guida si addentra nella sfera del [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), scomponendo una configurazione campione di [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) in questi blocchi predefiniti:

Il resto di questa guida usa il campione di configurazione, che consente di monitorare le visualizzazioni di pagina e i clic dell’utente sui link e inviare i dati di analisi al fornitore di terze parti, [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
```

**Nota:** il codice dell’esempio sopra è stato creato per aiutarti a capire ma non costituisce assolutamente un campione realistico. Se collabori con fornitori di strumenti di analisi, è probabile che il campione sopra non abbia senso, in quanto le configurazioni dei fornitori eliminano le complessità. Per le configurazioni di esempio fai riferimento alla documentazione del tuo fornitore di strumenti di analisi.

## Dove inviare i dati di analisi: attributo type

AMP is designed to support two common patterns of data collection:

- Ingestion by a publisher-owned endpoint for in-house analytics systems.
- Ingestion by a vendor-owned endpoint for interoperability with a vendor solution (for example, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

To send analytics data to an analytics provider, include the `type` attribute in the [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) tag and set its value to the appropriate vendor, as defind in the [Analytics Vendors](analytics-vendors.md) list.

For example: `<amp-analytics type="googleanalytics">` sends analytics data to the third-party analytics provider, Google Analytics. To send data to a publisher-owned endpoint, simply don’t include the `type` attribute; the analytics data is sent to the defined endpoints for each [request](deep_dive_analytics.md).

Analytics vendor configurations are a quick way to get started with [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). You should consult your vendor’s documentation and help resources for further guidance. As previously mentioned, the list of vendors who’ve already integrated with AMP, as well as links to their specific documentation can be found in the [Analytics Vendors](analytics-vendors.md) list.

If you’re an analytics vendor, learn more about [integrating your own analytics configuration into AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Caricamento della configurazione remota: attributo config

Non hai bisogno di includere tutta la configurazione per [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) nella tua pagina AMP. Al contrario, puoi richiamare un URL remoto per la totalità o per parte delle configurazioni.

Questo ti consente di eseguire operazioni come la modifica della configurazione in base a una richiesta specifica. Se in quanto editore hai il controllo sul file remoto, puoi eseguire qualsiasi operazione di elaborazione necessaria sul lato server per costruire i dati di configurazione.

Il primo passo per caricare le configurazioni remote è quello di includere l’attributo config nel tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

Il passo successivo è quello di creare il contenuto JSON che risiede nell’URL remoto. In questo semplice esempio, la configurazione contenuta nell’oggetto JSON è semplicemente il valore della variabile per l’account di analisi.

Contenuto di esempio in `https://example.com/analytics.account.config.json`:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

Il passo finale è quello di verificare che il contenuto del file remoto sia inserito nel punto corretto nella configurazione [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Qui, in entrambe le richieste `pageview` e `event`, il valore della variabile `account` è automaticamente impostato sul valore dell’account nell’URL remoto (`"account": "UA-XXXXX-Y"`):

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

**Importante.** AMP non consente la convalida rispetto a più usi della stessa variabile. I valori vengono inseriti seguendo un ordine di preferenza di sostituzione delle variabili e i valori negli URL remoti sono all’inizio di tale ordine (vedi [Ordinamento della sostituzione delle variabili](deep_dive_analytics.md#variable-substitution-ordering)).

## Richieste, attivazioni e trasferimenti <a name="requests-triggers--transports"></a>

L’attributo `requests` definisce ‘quali dati vengono inviati’ (ad esempio, `pageviews`, `events`) e dove vengono inviati (gli URL utilizzati per trasmettere i dati).

L’attributo `triggers` indica quando devono essere inviati i dati di analisi, ad esempio, quando un utente visualizza una pagina o quando un utente fa clic su un link.

L’attributo `transport` specifica come inviare una richiesta, più in particolare, il protocollo.

Più avanti puoi ottenere ulteriori informazioni su queste configurazioni (puoi anche approfondire queste configurazioni nel [riferimento <code>amp-analytics</code>](../../../../documentation/components/reference/amp-analytics.md).

### Quali dati vengono inviati: attributo requests <a name="what-data-gets-sent-requests-attribute"></a>

Il valore `request-name` viene utilizzato nella configurazione di attivazione per specificare quale richiesta deve essere inviata in risposta a un particolare evento. Il valore `request-value` è un URL `https`. Questi valori possono includere token segnaposto che fanno riferimento ad altre richieste o variabili.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Alcuni fornitori di strumenti di analisi (compreso Google Analytics) hanno già fornito la configurazione da utilizzare tramite l’attributo `type`. Se stai usando un fornitore di strumenti di analisi, è possibile che non sia necessario includere le informazioni `requests`. Fai riferimento alla documentazione del tuo fornitore per sapere se occorre configurare l’attributo `requests` ed eventualmente come configurarlo.

#### Aggiunta di URL di richiesta: Extra URL Params

L’attributo [extraUrlParams](../../../../documentation/components/reference/amp-analytics.md#extra-url-params) specifica i parametri supplementari da aggiungere alla stringa di query dell’URL di richiesta tramite la solita convenzione "&foo=baz".

L’esempio [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) aggiunge un ulteriore parametro <code>cd1</code> alla richiesta e imposta il valore del parametro su "AMP":

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### Quando vengono inviati i dati: attributo triggers

L’attributo `triggers` descrive quando deve essere inviata una richiesta di analisi. Contiene una coppia chiave-valore di nome-trigger e configurazione-trigger. Il nome trigger può essere qualsiasi stringa costituita da caratteri alfanumerici (a-zA-Z0-9).

Ad esempio, il seguente elemento [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) è configurato per inviare una richiesta a `https://example.com/analytics` quando il documento viene caricato per la prima volta e ogni volta che viene fatto clic su un tag `a`:

```js
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
  "trackAnchorClicks": {
    "on": "click",
    "selector": "a",
    "request": "event",
    "vars": {
      "eventId": "42",
      "eventLabel": "clicked on a link"
    }
  }
}
```

[tip type="important"] **IMPORTANTE:** l'approccio precedente è consigliato solo per le pagine AMP e non per gli annunci AMPHTML. Poiché la priorità dell'analisi è inferiore rispetto al contenuto della pagina, si consiglia di tenere traccia dei clic utilizzando un reindirizzamento del browser per evitare la perdita di clic. [/tip]

AMP supporta le seguenti configurazioni di attivazione:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Trigger Config</th>
      <th data-th="Description">Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"> <code>on</code> (obbligatorio)</td>
      <td data-th="Description">L’evento per cui invocare il listener. I valori validi sono <code>click</code>, <code>scroll</code>, <code>timer</code> e <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>request</code> (obbligatorio)</td>
      <td data-th="Description">Nome della richiesta da inviare (come specificato nelle <a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">richieste</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Un oggetto contenente le coppie chiave-valore usate per eseguire l’override delle <code>vars</code> definite nella configurazione di primo livello o per specificare <code>vars</code> univoche a questo trigger (vedi anche <a href="deep_dive_analytics.md#variable-substitution-ordering">Ordinamento della sostituzione delle variabili</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>selector</code> (obbligatorio quando <code>on</code> è impostato su <code>click</code>)</td>
      <td data-th="Description">Un selettore CSS utilizzato per definire meglio quali elementi devono essere monitorati. Usa il valore <code>*</code> per monitorare tutti gli elementi. Questa configurazione viene utilizzata insieme al trigger <code>click</code>. Scopri come usare il selettore per <a href="use_cases.md#tracking-page-clicks">monitorare i clic di pagina</a> e per le <a href="use_cases.md#tracking-social-interactions">interazioni sui social</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>scrollSpec</code> (obbligatorio quando <code>on</code> è impostato su <code>scroll</code>)</td>
      <td data-th="Description">Controlla in base a quali condizioni viene attivato l’evento <code>scroll</code> quando l’utente scorre la pagina. Questo oggetto può contenere <code>verticalBoundaries</code> e <code>horizontalBoundaries</code>. Per l’attivazione di un evento <code>scroll</code> è necessaria almeno una delle due proprietà. I valori per entrambe le proprietà devono essere serie di numeri contenenti i limiti entro i quali viene generato un evento di scorrimento. Vedi questo esempio sul <a href="use_cases.md#tracking-scrolling">monitoraggio dello scorrimento</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>timerSpec</code> (obbligatorio quando <code>on</code> è impostato su <code>timer</code>)</td>
      <td data-th="Description">Controlla quando viene attivato l’evento <code>timer</code>. Il timer si attiva immediatamente e successivamente a intervalli specifici. Questa configurazione viene utilizzata insieme al trigger <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

[tip type="important"] **IMPORTANTE:** I trigger di una configurazione con precedenza inferiore vengono sovrascritti dai trigger con lo stesso nome di una configurazione con precedenza maggiore (vedere [Ordine di sostituzione delle variabili](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

### Come vengono inviati i dati: attributo transport

L’attributo `transport` specifica come inviare una richiesta. I seguenti tre metodi sono abilitati per impostazione predefinita: Viene utilizzato solo un metodo di trasferimento ed è quello abilitato, consentito e disponibile con la precedenza più alta. La precedenza è `beacon` > `xhrpost` > `image`. Se l’agente utente del client non supporta un metodo, viene utilizzato il metodo successivo abilitato con la precedenza più alta.

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Metodo di trasferimento</th>
      <th data-th="Description">Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Indica che <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> può essere utilizzato per trasmettere la richiesta. Viene inviata una richiesta <code>POST</code>, completa di credenziali, con il corpo del testo vuoto.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Indica che <code>XMLHttpRequest</code> può essere utilizzato per trasmettere la richiesta. Viene inviata una richiesta <code>POST</code>, completa di credenziali, con il corpo del testo vuoto.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Indica che la richiesta può essere inviata generando un tag <code>Image</code>. Questo invia una richiesta <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Include l’attributo `transport` nella configurazione solo se si desidera limitare le opzioni di trasferimento, in caso contrario si possono interrompere le richieste.

Nell’esempio di seguito, `beacon` e `xhrpost` sono impostati su false, in modo tale da non essere utilizzati anche se hanno una precedenza più alta rispetto a `image`. Se l’agente utente del client supporta il metodo `image`, verrà utilizzato, in contrario non sarà inviata alcuna richiesta.

AMP inserisce le variabili con i valori in ordine di precedenza:

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## Ordinamento della sostituzione delle variabili <a name="variable-substitution-ordering"></a>

In questo esempio sono presenti una configurazione remota, variabili definite al primo livello, nei trigger e a livello della piattaforma:

1. Configurazioni remote (tramite `config`).
2. `vars` nidificate all’interno di un trigger in `triggers`.
3. `vars` al primo livello nidificate in [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
4. Valori forniti dalla piattaforma.

In this example, there’s a remote configuration, variables defined at the top-level, in triggers, and at the platform level:

```html
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
```

When the same `var` is defined in multiple locations, the variable order of precedence sets its value once. Thus, if the remote configuration defined `account` as UA-XXXXX-Y in the example above, the values of various vars will be as follows:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Valore</th>
      <th data-th="Defined By" class="col-thirty">Definito da</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Piattaforma</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Configurazione remota</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
  </tbody>
</table>

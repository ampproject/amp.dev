---
$title: Immersione nel mondo di AMP Analytics
toc: true
---
[TOC]


Questa guida si addentra nella sfera del
[componente amp-analytics](/docs/reference/extended/amp-analytics.html),
scomponendo una configurazione campione di `amp-analytics` in questi blocchi predefiniti:

Il resto di questa guida usa il campione di configurazione,
che consente di monitorare le visualizzazioni di pagina e i clic dell’utente sui link
e inviare i dati di analisi al fornitore di terze parti,
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

[sourcecode:html]
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
[/sourcecode]

**Nota:** il codice dell’esempio sopra è stato creato per aiutarti a capire ma non costituisce assolutamente un campione realistico. Se collabori con fornitori di strumenti di analisi, è probabile che il campione sopra non abbia senso, in quanto le configurazioni dei fornitori eliminano le complessità. Per le configurazioni di esempio fai riferimento alla documentazione del tuo fornitore di strumenti di analisi.

## Dove inviare i dati di analisi: attributo type

AMP è progettato per supportare due modelli diffusi di raccolta dati:

* Inserimento da un endpoint di proprietà di un publisher per i sistemi di analisi interni.
* Inserimento da un endpoint di proprietà di un fornitore per l’interoperabilità con la soluzione del fornitore
(ad esempio, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

Per inviare i dati dell’analisi a un fornitore di strumenti di analisi,
includi l’attributo `type` nel tag `amp-analytics` e imposta il suo valore
per il fornitore pertinente, come definito nella
[specifica amp-analytics](/docs/reference/extended/amp-analytics.html).

Ad esempio: `<amp-analytics type="googleanalytics">` invia i dati di analisi
al fornitore di strumenti di analisi di terze parti, Google Analytics.
Per inviare i dati a un endpoint di proprietà di un publisher
è sufficiente non includere l’attributo `type`,
i dati di analisi vengono quindi inviati agli endpoint definiti per ciascuna
[richiesta](/it/docs/guides/analytics/deep_dive_analytics.html#quali-dati-vengono-inviati:-attributo-requests).

Le configurazioni del fornitore di strumenti di analisi costituiscono un sistema rapido
per iniziare a lavorare con `amp-analytics`.
Per ulteriori informazioni è opportuno consultare la documentazione
e le risorse di riferimento rese disponibili dal fornitore.
Come precedentemente indicato,
l’elenco di fornitori che hanno già incluso l’integrazione con AMP, nonché i link
alla rispettiva documentazione specifica sono reperibili nella
[specifica amp-analytics](/docs/reference/extended/amp-analytics.html).

Se sei un fornitore di strumenti di analisi,
ottieni ulteriori informazioni sull’
[integrazione della tua configurazione di analisi personale in HTML AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Caricamento della configurazione remota: attributo config

Non hai bisogno di includere tutta la
configurazione per `amp-analytics` nella tua pagina AMP.
Al contrario, puoi richiamare un URL remoto
per la totalità o per parte delle configurazioni.

Questo ti consente di eseguire operazioni come la modifica
della configurazione in base a una richiesta specifica.
Se in quanto editore hai il controllo sul file remoto,
puoi eseguire qualsiasi operazione di elaborazione necessaria sul lato server
per costruire i dati di configurazione.

Il primo passo per caricare le configurazioni remote
è quello di includere l’attributo config nel tag `amp-analytics`:

[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

Il passo successivo è quello di creare il contenuto JSON che risiede nell’URL remoto.
In questo semplice esempio,
la configurazione contenuta nell’oggetto JSON è semplicemente il valore della variabile per l’account di analisi.

Contenuto di esempio in `https://example.com/analytics.account.config.json`:

[sourcecode:html]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

Il passo finale è quello di verificare che il contenuto del file remoto sia
inserito nel punto corretto nella configurazione `amp-analytics`.
Qui, in entrambe le richieste `pageview` e `event`,
il valore della variabile `account` è automaticamente impostato
sul valore dell’account nell’URL remoto (`"account": "UA-XXXXX-Y"`):

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

**Importante.** AMP non consente la convalida rispetto a più usi della stessa variabile.
I valori vengono inseriti seguendo un ordine di preferenza di sostituzione delle variabili
e i valori negli URL remoti sono all’inizio di tale ordine
(vedi [Ordinamento della sostituzione delle variabili](/it/docs/guides/analytics/deep_dive_analytics.html#ordinamento-della-sostituzione-delle-variabili)).

## Richieste, attivazioni e trasferimenti

L’attributo `requests` definisce ‘quali dati vengono inviati’
(ad esempio, `pageviews`, `events`)
e dove vengono inviati (gli URL utilizzati per trasmettere i dati).

L’attributo `triggers` indica quando devono essere inviati i dati di analisi,
ad esempio, quando un utente visualizza una pagina o quando un utente fa clic su un link.

L’attributo `transport` specifica come inviare una richiesta,
più in particolare, il protocollo.

Più avanti puoi ottenere ulteriori informazioni su queste configurazioni
(puoi anche approfondire queste configurazioni nel
[riferimento amp-analytics](/docs/reference/extended/amp-analytics.html)).

### Quali dati vengono inviati: attributo requests

Il valore `request-name` viene utilizzato nella configurazione di attivazione per specificare
quale richiesta deve essere inviata in risposta a un particolare evento.
Il valore `request-value` è un URL `https`.
Questi valori possono includere token segnaposto
che fanno riferimento ad altre richieste o variabili.

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

Alcuni fornitori di strumenti di analisi (compreso Google Analytics)
hanno già fornito la configurazione
da utilizzare tramite l’attributo `type`.
Se stai usando un fornitore di strumenti di analisi,
è possibile che non sia necessario includere le informazioni `requests`.
Fai riferimento alla documentazione del tuo fornitore per
sapere se occorre configurare l’attributo `requests` ed eventualmente come configurarlo.

#### Aggiunta di URL di richiesta: Extra URL Params

L’attributo [extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
specifica i parametri supplementari da aggiungere alla stringa di query dell’URL di richiesta tramite la solita convenzione "&foo=baz".

L’esempio `amp-analytics` aggiunge un ulteriore parametro <code>cd1</code>
alla richiesta e imposta il valore del parametro su "AMP":

[sourcecode:html]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### Quando vengono inviati i dati: attributo triggers

L’attributo `triggers` descrive quando deve essere inviata una richiesta di analisi.
Contiene una coppia chiave-valore di nome-trigger e configurazione-trigger.
Il nome trigger può essere qualsiasi stringa costituita da
caratteri alfanumerici (a-zA-Z0-9).

Ad esempio,
il seguente elemento `amp-analytics` è configurato per inviare una richiesta a
`https://example.com/analytics` quando il documento viene caricato per la prima volta
e ogni volta che viene fatto clic su un tag `a`:

[sourcecode:html]
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
[/sourcecode]

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
      <td data-th="Trigger Config"><code>on</code> (obbligatorio)</td>
      <td data-th="Description">L’evento per cui invocare il listener. I valori validi sono <code>click</code>, <code>scroll</code>, <code>timer</code> e <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (obbligatorio)</td>
      <td data-th="Description">Nome della richiesta da inviare (come specificato nelle <a href="/it/docs/guides/analytics/deep_dive_analytics.html#quali-dati-vengono-inviati:-attributo-requests">richieste</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Un oggetto contenente le coppie chiave-valore usate per eseguire l’override delle <code>vars</code> definite nella configurazione di primo livello o per specificare <code>vars</code> univoche a questo trigger (vedi anche <a href="/it/docs/guides/analytics/deep_dive_analytics.html#ordinamento-della-sostituzione-delle-variabili">Ordinamento della sostituzione delle variabili</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (obbligatorio quando <code>on</code> è impostato su <code>click</code>)</td>
      <td data-th="Description">Un selettore CSS utilizzato per definire meglio quali elementi devono essere monitorati. Usa il valore <code>*</code> per monitorare tutti gli elementi. Questa configurazione viene utilizzata insieme al trigger <code>click</code>. Scopri come usare il selettore per <a href="/it/docs/guides/analytics/use_cases.html#come-monitorare-i-clic-sulla-pagina">monitorare i clic di pagina</a> e per le <a href="/it/docs/guides/analytics/use_cases.html#come-monitorare-le-interazioni-con-i-social-network">interazioni sui social</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (obbligatorio quando <code>on</code> è impostato su <code>scroll</code>)</td>
      <td data-th="Description">Controlla in base a quali condizioni viene attivato l’evento <code>scroll</code> quando l’utente scorre la pagina. Questo oggetto può contenere <code>verticalBoundaries</code> e <code>horizontalBoundaries</code>. Per l’attivazione di un evento <code>scroll</code> è necessaria almeno una delle due proprietà. I valori per entrambe le proprietà devono essere serie di numeri contenenti i limiti entro i quali viene generato un evento di scorrimento. Vedi questo esempio sul <a href="/it/docs/guides/analytics/use_cases.html#come-monitorare-lo-scorrimento-delle-pagine">monitoraggio dello scorrimento</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (obbligatorio quando <code>on</code> è impostato su <code>timer</code>)</td>
      <td data-th="Description">Controlla quando viene attivato l’evento <code>timer</code>. Il timer si attiva immediatamente e successivamente a intervalli specifici. Questa configurazione viene utilizzata insieme al trigger <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

**Importante:** i trigger di una configurazione con precedenza più bassa vengono ignorati
dai trigger con lo stesso nome di una configurazione con una precedenza più alta
(vedi [Ordinamento della sostituzione delle variabili](/it/docs/guides/analytics/deep_dive_analytics.html#ordinamento-della-sostituzione-delle-variabili)).

### Come vengono inviati i dati: attributo transport

L’attributo `transport` specifica come inviare una richiesta.
I seguenti tre metodi sono abilitati per impostazione predefinita:

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

Viene utilizzato solo un metodo di trasferimento
ed è quello abilitato, consentito e disponibile
con la precedenza più alta.
La precedenza è `beacon` > `xhrpost` > `image`.
Se l’agente utente del client non supporta un metodo,
viene utilizzato il metodo successivo abilitato con la precedenza più alta.

Include l’attributo `transport` nella configurazione
solo se si desidera limitare le opzioni di trasferimento,
in caso contrario si possono interrompere le richieste.

Nell’esempio di seguito,
`beacon` e `xhrpost` sono impostati su false,
in modo tale da non essere utilizzati anche se hanno una precedenza più alta rispetto a `image`.
Se l’agente utente del client supporta il metodo `image`,
verrà utilizzato, in contrario non sarà inviata alcuna richiesta.

[sourcecode:html]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## Ordinamento della sostituzione delle variabili

AMP inserisce le variabili con i valori in ordine di precedenza:

1. Configurazioni remote (tramite `config`).
2. `vars` nidificate all’interno di un trigger in `triggers`.
3. `vars` al primo livello nidificate in `amp-analytics`.
4. Valori forniti dalla piattaforma.

In questo esempio sono presenti una configurazione remota,
variabili definite al primo livello, nei trigger e a livello della piattaforma:

[sourcecode:html]
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
[/sourcecode]

Quando la stessa `var` è definita in più posizioni,
l’ordine delle variabili di precedenza ne imposta il valore una volta.
Pertanto, se la configurazione remota definiva `account` come UA-XXXXX-Y nell’esempio sopra,
i valori delle diverse vars saranno come indicato di seguito:

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

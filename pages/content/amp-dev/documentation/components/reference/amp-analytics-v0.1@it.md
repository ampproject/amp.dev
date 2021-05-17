---
$title: amp-analytics
$category@: ads-analytics
teaser:
  text: Acquisisce i dati di analisi da un documento AMP.
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

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



Consente di acquisire dati di analisi da un documento AMP.

<table>
  <tr>
    <td class="col-fourty"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"&ht;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td>Vedi l'<a href="https://ampbyexample.com/components/amp-analytics/">esempio di amp-analytics</a> di AMP By Example.</td>
  </tr>
</table>


## I dati di analisi sono destinati a un fornitore o utilizzati internamente? <a name="sending-analytics-to-a-vendor-or-in-house"></a>

Prima di iniziare a utilizzare Analytics per AMP sul tuo sito, devi decidere se utilizzare strumenti di analisi di terze parti per analizzare il coinvolgimento degli utenti o le tue soluzioni interne.

[tip type="read-on"]
scopri tutto su Analytics per AMP nella guida [Configurazione di Analytics](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md).
[/tip]

### Invio dei dati a un fornitore di soluzioni di analisi <a name="analytics-vendors"></a>

Analytics per AMP è specificamente progettato per eseguire le misurazioni una sola volta e generare rapporti per diversi utenti. Se collabori già con uno o più fornitori di soluzioni di analisi, consulta l'elenco dei [fornitori di soluzioni di analisi](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) per sapere se hanno integrato AMP nelle loro soluzioni.

Per i fornitori di soluzioni di analisi integrate con Analytics per AMP:

1. Nel tag `<amp-analytics>`, aggiungi l'attributo `type` e imposta il valore sul [fornitore](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) specificato.
1. Determina i dati da acquisire e monitorare e specifica questi dettagli nei dati di configurazione. Consulta la documentazione del fornitore per istruzioni su come acquisire i dati di analisi.

Se le soluzioni di analisi del fornitore non sono integrate con AMP, contatta il fornitore per chiedere assistenza. Ti invitiamo inoltre a segnalare un problema relativo al progetto AMP richiedendo l'aggiunta del fornitore. Vedi anche la sezione [Integrazione degli strumenti di analisi in HTML AMP](../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md). In alternativa, contatta il fornitore per inviare i dati all'URL specificato. Per ulteriori informazioni, consulta la sezione [Invio interno di dati](#sending-data-in-house) di seguito.

*Esempio: invio di dati a un fornitore di soluzioni di analisi di terze parti*

Nel seguente esempio, i dati di analisi vengono inviati a Nielsen, un fornitore di soluzioni di analisi di terze parti, che ha integrato i suoi strumenti con AMP. I dettagli per la configurazione dei dati di analisi per Nielsen sono disponibili nella documentazione di [Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

```html
<amp-analytics type="nielsen">
  <script type="application/json">
  {
    "vars": {
      "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "apv": "1.0",
      "apn": "My AMP Website",
      "section": "Entertainment",
      "segA": "Music",
      "segB": "News",
      "segC": "Google AMP"
    }
  }
  </script>
</amp-analytics>
```

### Invio interno di dati <a name="sending-data-in-house"></a>

Se disponi di una soluzione interna per la misurazione del coinvolgimento degli utenti, avrai solo bisogno di un URL per integrare Analytics per AMP con tale soluzione. A tale URL invierai i dati. Puoi anche inviare i dati a vari URL. Ad esempio, puoi inviare i dati relativi alle visualizzazioni di pagina a un URL e i dati relativi al coinvolgimento sui social a un altro URL.

[tip type="note"]
se la tua soluzione interna prevede l'utilizzo di un fornitore di soluzioni di analisi che non ha integrato AMP, collabora con il fornitore per determinare quali informazioni di configurazione sono obbligatorie.
[/tip]

Per inviare i dati a un URL specifico:

1. Determina i dati da acquisire e monitorare e [specifica questi dettagli nei dati di configurazione](#specifying-configuration-data).
1. Nell'oggetto di configurazione [`requests`](#requests), specifica il tipo di richiesta da monitorare (ad es. visualizzazione di pagina, eventi attivati specifici) e gli URL a cui vuoi inviare i dati di monitoraggio.

[tip type="note"]
quando elabori gli URL AMP nell'intestazione del referrer delle richieste di analisi, elimina o ignora il parametro `usqp`. Questo parametro viene utilizzato da Google per attivare gli esperimenti per la cache AMP di Google.
[/tip]

*Esempio: invio di dati a un URL*

Ecco un semplice esempio che monitora le visualizzazioni di pagina.  Ogni volta che una pagina è visibile, si verifica un evento di attivazione che invia i dati sulle visualizzazioni di pagina a un URL definito insieme a un ID casuale.

```html
<amp-analytics>

<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

  [tip type="success"]
per alcuni casi d'uso comuni relativi al monitoraggio (ad esempio visualizzazioni di pagina, clic su pagine, scorrimento e così via), consulta [Analytics: casi d'uso](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/use_cases.md).
[/tip]

## Specificare i dati di configurazione <a name="specifying-configuration-data"></a>

Nell'elemento `<amp-analytics>`, devi specificare un oggetto di configurazione JSON contenente i dettagli su che cosa misurare e dove inviare i dati di analisi.

L'oggetto di configurazione per `<amp-analytics>` utilizza il seguente formato:

```javascript
{
  "requests": {
    request-name: request-value,
    ...
  },
  "vars": {
    var-name: var-value,
    ...
  },
  "extraUrlParams": {
    extraurlparam-name: extraurlparam-value,
    ...
  },
  "triggers": {
    trigger-name: trigger-object,
    ...
  },
  "transport": {
    "beacon": *boolean*,
    "xhrpost": *boolean*,
    "image": *boolean*,
  }
}
```

### Configurazione in linea o remota <a name="inline-or-remote-configuration"></a>

I dati di configurazione possono essere specificati in linea o recuperati da remoto specificando un URL nell'attributo `config`. Inoltre, è possibile selezionare la configurazione integrata per i fornitori di soluzioni di analisi più comuni utilizzando l'attributo `type`.

Se vengono utilizzati dati di configurazione provenienti da più di una di queste origini, gli oggetti di configurazione (variabili, richieste e attivatori) vengono uniti in modo tale che:

1. la configurazione remota abbia la precedenza sulla configurazione in linea e
1. la configurazione in linea abbia la precedenza sulla configurazione del fornitore.

#### Caricamento configurazione remota <a name="loading-remote-configuration"></a>

Per caricare una configurazione remota, nell'elemento `<amp-analytics>`, specifica l'attributo `config` e l'URL dei dati di configurazione. L'URL specificato deve utilizzare lo schema HTTPS. L'URL può includere [variabili URL AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md). Per accedere ai cookie, vedi l'attributo [`data-credentials`](#data-credentials). La risposta deve rispettare le [linee guida per la sicurezza CORS AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).

In questo esempio, viene specificato l'attributo `config` per caricare i dati di configurazione dall'URL specificato.

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

#### Strumento di riscrittura della configurazione <a name="configuration-rewriter"></a>

La funzione di riscrittura della configurazione è studiata per consentire ai fornitori di soluzioni analisi di riscrivere dinamicamente una configurazione fornita. È simile alla funzione di configurazione remota, ma include nella richiesta effettuata al server anche qualsiasi configurazione fornita dall'utente. Al momento, questa funzione può essere attivata solo da un fornitore di soluzioni di analisi.

Un fornitore di soluzioni di analisi specifica una proprietà configRewriter con un URL del server.
```js
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
    },
    ...
}
```

Il runtime invia una richiesta contenente la configurazione inline, unita con la configurazione remota fornita, all'endpoint configRewriter indicato dal fornitore. Il fornitore utilizza questi dati lato server per costruire e restituire una nuova configurazione riscritta.

Il runtime unisce quindi l'intera configurazione fornita per determinare la configurazione finale in ordine di precedenza dalla più alta alla più bassa:

1. Configurazione riscritta
1. Configurazione inline
1. Configurazione definita dal fornitore

##### Gruppi variabili <a name="variable-groups"></a>

Gruppi variabili è una funzione che consente ai fornitori di soluzioni di analisi di raggruppare un insieme predefinito di variabili facilmente attivabili da un utente. Queste variabili verranno quindi risolte e inviate all'endpoint `configRewriter` specificato.

Per attivare questa funzione, i fornitori di soluzioni di analisi devono creare un nuovo oggetto `varGroups` all'interno della configurazione `configRewriter`. I publisher possono quindi includere qualsiasi `varGroups` creato da un fornitore di soluzioni di analisi che intendono attivare nella propria configurazione di analisi. È possibile utilizzare tutte le variabili supportate dalla [Guida alle sostituzioni HTML AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md). *Nota importante*: le varianti $ {varName} non funzioneranno.

Ad esempio, potremmo avere un fornitore la cui configurazione è simile alla seguente:
```js
// This is predefined by vendor.
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
      'varGroups' : {
        'group1': {
          'referrer': 'DOCUMENT_REFERRER',
          'source': 'SOURCE_URL',
        'group2': {
          'title': 'TITLE',
        },
      },
    },
  },
    ...
}
```

  Puoi specificare quali gruppi di variabili sono attivati includendo `{enabled: true}` per i `varGroups` specificati nella configurazione `<amp-analytics>` del fornitore. `enabled` è una parola chiave riservata e non può essere utilizzata come nome di variabile.

  Nell'esempio riportato di seguito, `group1` e `group2` sono stati entrambi attivati. Tutti i gruppi che non sono stati specificatamente attivati verranno ignorati. Il runtime risolve tutte le variabili attivate e le unisce in un unico oggetto `configRewriter.vars`, che verrà inviato all'url dello strumento di riscrittura della configurazione.

```html
  /* Included on publisher page */
  <amp-analytics type="myVendor" id="myVendor" data-credentials="include">
    <script type="application/json">
    {
      "configRewriter": {
        "varGroups": {
          "group1": {
            "enabled": true
          },
          "group2": {
            "enabled": true
          }
        }
      }
    }
    </script>
  </amp-analytics>
```

In questo esempio, il corpo della richiesta sarà simile al seguente:
```json
/* Sent to configuration rewriter server.*/
"configRewriter": {
  "vars": {
    "referrer": "https://www.example.com",
    "source": "https://www.amp.dev",
    "title": "Cool Amp Tips"
  }
}
```

### Oggetti dati di configurazione <a name="configuration-data-objects"></a>

#### Richieste <a name="requests"></a>

L'oggetto di configurazione `requests` specifica gli URL utilizzati per trasmettere i dati a una piattaforma di analisi, nonché il comportamento di invio in batch o di segnalazione della richiesta. Il `request-name` specifica quale richiesta deve essere inviata in risposta a un determinato evento (ad esempio `pageview`, `event` e così via). Il `request-value` contiene un URL https; il valore può includere token segnaposto che possono fare riferimento ad altre richieste o variabili. Il `request-value` può anche essere un oggetto contenente configurazioni di richieste facoltative.

##### Configurazioni di richieste <a name="request-configs"></a>

Le proprietà per la definizione di una richiesta con un oggetto sono:

- `baseUrl`: definisce l'URL della richiesta (obbligatorio).
- `reportWindow`: una proprietà facoltativa che specifica il tempo (in secondi) per interrompere la segnalazione delle richieste. Il trigger con `important: true` sostituisce il vincolo massimo della finestra di segnalazione.

In questo esempio, tutte le richieste sono valide.

```javascript
"requests": {
  "base": "https://example.com/analytics?a=${account}&u=${canonicalUrl}&t=${title}",
  "pageview": {
    "baseUrl": "${base}&type=pageview"
  },
  "event": {
    "baseUrl": "${base}&type=event&eventId=${eventId}",
    "batchInterval": 5,
    "reportWindow" : 30
  }
}
```

Alcuni fornitori di soluzioni di analisi hanno una configurazione già fornita, che viene utilizzata tramite l'attributo `type`. Se utilizzi un fornitore di servizi di soluzioni di analisi, potrebbe non essere necessario includere informazioni sulle richieste. Consulta la documentazione del fornitore per sapere se è necessario configurare le richieste e in che modo.

##### Configurazioni di raggruppamento <a name="batching-configs"></a>

Per ridurre il numero di ping delle richieste, puoi specificare comportamenti di raggruppamento nella configurazione della richiesta. Eventuali [`extraUrlParams`](#extra-url-params) da parte di `triggers` che utilizzano la stessa richiesta vengono aggiunti al `baseUrl` della richiesta.

Le proprietà di raggruppamento sono:

- `batchInterval`: questa proprietà specifica l'intervallo di tempo (in secondi) per l'eliminazione dei ping delle richieste nella coda di batching. `batchInterval` può essere un numero o un array di numeri (l'intervallo di tempo minimo è 200 ms). La richiesta rispetterà tutti i valori dell'array, quindi ripeterà l'ultimo valore dell'intervallo (o il valore singolo) quando raggiunge la fine dell'array.

Ad esempio, la seguente configurazione invia un singolo ping di richiesta ogni due secondi, con un ping di richiesta di esempio simile a
`https://example.com/analytics?rc=1&rc=2`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": 2,
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

La seguente configurazione invia il primo ping di richiesta dopo un secondo e una richiesta ogni tre secondi. Il primo ping di richiesta è simile a `https://example.com/analytics?rc=1`, mentre il secondo ping della richiesta è`https://example.com/analytics?rc=2&rc=3&rc=4`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": [1, 3],
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

#### Variabili <a name="vars"></a>

Il componente `amp-analytics` definisce molte variabili di base che possono essere utilizzate nelle richieste. Un elenco di tutte queste variabili è disponibile nella [Guida alle variabili di `amp-analytics`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md). Sono inoltre supportate tutte le variabili supportate dalla [Guida alle sostituzioni HTML AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md).

L'oggetto di configurazione `vars` può essere utilizzato per definire nuove coppie chiave-valore o per sostituire le variabili esistenti a cui si può fare riferimento nei valori di `request`. Le nuove variabili vengono generalmente utilizzate per indicare le informazioni specifiche del publisher.  Gli array possono essere utilizzati per specificare un elenco di valori con codifica URL separata e delimitatore virgola.

```javascript
"vars": {
  "account": "ABC123",
  "countryCode": "tr",
  "tags": ["Swift,Jonathan", "Gulliver's Travels"]
}
```

#### Parametri URL aggiuntivi <a name="extra-url-params"></a>

L'oggetto di configurazione `extraUrlParams` specifica i parametri aggiuntivi da includere nella richiesta. Per impostazione predefinita, i parametri URL supplementari vengono aggiunti alla stringa di query di un URL di richiesta tramite la consueta convenzione "&foo=baz".

Ecco un esempio che aggiunge `&a=1&b=2&c=3` a una richiesta:

```javascript
"extraUrlParams": {
  "a": "1",
  "b": "2",
  "c": "3"
}
```

`extraUrlParams` può essere inviato tramite il corpo della richiesta anziché tramite l'URL se `useBody` è attivato e la richiesta viene inviata tramite i metodi di trasporto `beacon` o `xhrpost`. In questo caso, i parametri non hanno codifica URL né sono bidimensionali. Per ulteriori dettagli, consulta la sezione [useBody per parametri URL aggiuntivi](#use-body-for-extra-url-params).

L'attributo `extraUrlParamsReplaceMap` specifica una mappa di chiavi e valori che fungono da parametri per `String.replace()` per pre-elaborare le chiavi nella configurazione `extraUrlParams`. Ad esempio, se una configurazione `extraUrlParams` definisce `"page.title": "The title of my page"` e la proprietà `extraUrlParamsReplaceMap` definisce `"page.": "_p_"`, `&_p_title=The%20title%20of%20my%20page%20` sarà aggiunto alla richiesta.

`extraUrlParamsReplaceMap` non è richiesto per utilizzare `extraUrlParams`. Se `extraUrlParamsReplaceMap` non è definito, non avverrà alcuna sostituzione di stringa e le stringhe definite in `extraUrlParams` verranno utilizzate così come sono.

Se `useBody` è abilitato e la richiesta viene inviata tramite i metodi di trasporto `beacon` o `xhrpost`, la sostituzione della stringa `extraUrlParamsReplaceMap` verrà eseguita solo nelle chiavi di primo livello in `extraUrlParams`.

#### Attivatori <a name="triggers"></a>

L'oggetto di configurazione `triggers` descrive quando deve essere inviata una richiesta di analisi. L'attributo `triggers` contiene una coppia chiave-valore di nome-attivatore e configurazione-attivatore. Un nome-attivatore può essere qualsiasi stringa composta da caratteri alfanumerici (a-zA-Z0-9). Gli attivatori provenienti da una configurazione con precedenza inferiore vengono sostituiti da attivatori con lo stesso nome provenienti da una configurazione con precedenza superiore.

* `on` (obbligatorio) è l'evento da tenere in considerazione. I valori validi sono `render-start`, `ini-load`, `click`, `scroll`, `timer`, `visible`, `hidden`, `user-error`, [`access-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) e [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md)
* `request` (obbligatorio) è il nome della richiesta da inviare (come specificato nella sezione `requests`).
* `vars` è un oggetto contenente coppie chiave-valore utilizzate per sostituire le `vars` definite nella configurazione di primo livello o per specificare vars uniche per questo attivatore.
* `important` può essere specificato per funzionare con le richieste che supportano il comportamento di raggruppamento o la finestra di segnalazione. L'impostazione di `important` su `true` può aiutare a scaricare la coda di richieste raggruppate con alcuni attivatori. In questo caso, è possibile ridurre il numero di ping delle richieste senza perdere importanti eventi di attivazione. L'impostazione di `important` su `true` può anche sostituire il valore `reportWindow` della richiesta per l'invio di ping importanti per le richieste.
* `selector` e `selectionMethod` possono essere specificati per alcuni attivatori, ad esempio `click` e `visible`. Per ulteriori dettagli, consulta il [selettore Elemento](#element-selector).
* `scrollSpec` (obbligatorio quando `on` è impostato su `scroll`) è una configurazione utilizzata insieme all'attivatore `scroll`. Per ulteriori informazioni, consulta la sezione seguente.
* `timerSpec` (obbligatorio quando `on` è impostato su `timer`) è una configurazione utilizzata insieme all'attivatore `timer`. Per ulteriori informazioni, consulta la sezione seguente.
* `sampleSpec` è un oggetto utilizzato per definire il modo in cui le richieste possono essere campionate prima di essere inviate. Questa impostazione consente il campionamento basato su input casuali o su altre variabili supportate dalla piattaforma. L'oggetto contiene la configurazione per specificare un input utilizzato per generare un hash e una soglia che l'hash deve soddisfare.
    * `sampleOn` è un modello di stringa che viene espanso compilando le variabili di piattaforma e quindi sottoposto ad hashing per generare un numero ai fini della logica di campionamento descritta di seguito nella sezione relativa alla soglia.
    * `threshold` è una configurazione utilizzata per escludere le richieste che non soddisfano determinati criteri. Per una richiesta di accesso al fornitore di soluzioni di analisi, la seguente logica deve essere vera: `HASH(sampleOn) < threshold`.</li>
* `videoSpec` (utilizzato quando `on` è impostato su `video-*`) è una configurazione utilizzata in combinazione con gli attivatori [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).

Ad esempio, la seguente configurazione può essere utilizzata per campionare il 50% delle richieste in base a input casuali o all'1% in base all'ID client.

```javascript
'triggers': {
  'sampledOnRandom': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${random}',
      'threshold': 50,
    },
  },
  'sampledOnClientId': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${clientId(cookieName)}',
      'threshold': 1,
    },
  },
},
```

##### Selettore elementi <a name="element-selector"></a>

Alcuni attivatori, come `click` e `visible`, consentono di specificare un singolo elemento o una raccolta di elementi utilizzando le proprietà del selettore. I diversi attivatori possono applicare limitazioni e interpretazioni diverse agli elementi selezionati, ad esempio se un selettore si applica a tutti gli elementi corrispondenti o solo al primo o quali elementi possono essere abbinati: tutti o solo gli elementi AMP. Per ulteriori dettagli, consulta la documentazione di ogni attivatore pertinente.

Le proprietà del selettore sono

- `selector` è una proprietà utilizzata per trovare un elemento o una raccolta di elementi utilizzando una query CSS/DOM. La semantica dell'abbinamento dell'elemento può essere modificata utilizzando `selectionMethod`. Il valore di questa proprietà può essere uno dei seguenti:
    - un selettore CSS valido, ad esempio `#ad1` o `amp-ad`.
      - `:root` - un selettore speciale che corrisponde alla radice del documento.
- `selectionMethod` quando specificato, questa proprietà può avere uno di due valori: `scope` o `closest`. `scope` consente la selezione dell'elemento all'interno dell'elemento principale del tag `amp-analytics`. `closest` cerca l'antenato più vicino del tag `amp-analytics` che soddisfi il selettore specificato. Il valore predefinito è `scope`.

##### Attivatore avvio rendering per l'elemento embed <a name="embed-render-start-trigger"></a>

Gli elementi AMP che incorporano altri documenti negli iframe (ad esempio gli annunci) possono segnalare un evento di avvio del rendering (`"on": "render-start"`). Generalmente, questo evento viene emesso non appena è possibile confermare che il rendering del documento incorporato è stato avviato. Consulta la documentazione di un determinato elemento AMP per sapere se emette questo evento.

L'attivatore per l'elemento embed deve includere un [`selector`](#element-selector) che punta all'elemento di incorporamento:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request",
    "selector": "#embed1"
  }
}
```

L'evento di avvio del rendering viene emesso anche dal documento stesso e può essere configurato come:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request"
  }
}
```

##### Attivatore caricamento iniziale <a name="initial-load-trigger"></a>

L'evento di caricamento iniziale (`"on": "ini-load"`) viene attivato quando i contenuti iniziali di un elemento o un documento AMP sono stati caricati.

Il "caricamento iniziale" è definito in relazione al contenitore e alle dimensioni iniziali.
In particolare

- per un documento: tutti gli elementi nella prima area visibile.
- Per un elemento embed: tutti gli elementi di contenuto del documento incorporato posizionati all'interno della dimensione iniziale dell'elemento embed.
- Per un elemento AMP semplice (ad esempio `amp-img`): le risorse stesse, ad esempio un'immagine o un video.

L'attivatore per un elemento embed o AMP deve includere un [`selector`](#element-selector) che punti all'elemento:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request",
    "selector": "#embed1"
  }
}
```

L'evento di caricamento iniziale viene emesso anche dal documento stesso e può essere configurato come:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request"
  }
}
```

##### Attivatore di visibilità pagina ed elemento <a name="page-and-element-visibility-trigger"></a>

Utilizza l'attivatore di visibilità pagina (`"on": "visible"`) per attivare una richiesta quando la pagina diventa visibile. La sua attivazione può essere configurata utilizzando `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
  }
}
```

L'attivatore di visibilità elemento può essere configurato per qualsiasi elemento AMP o per una radice documenti utilizzando [`selector`](#element-selector). Viene attivato quando l'elemento specificato corrisponde ai parametri di visibilità che possono essere personalizzati utilizzando `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "elementview",
    "selector": "#ad1",
    "visibilitySpec": {/* optional visibility spec */}
  }
}
```

Tieni presente che il selettore può essere utilizzato per specificare solo un singolo elemento, non una raccolta. L'elemento può essere un [elemento esteso AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-tag-addendum.md#amp-specific-tags) o una radice documento.

L'attivatore di visibilità elemento attende il segnale specificato dalla proprietà `waitFor` in `visibilitySpec` prima di monitorare la visibilità dell'elemento. Se `waitFor` non è specificato, attende il segnale [`ini-load`](#initial-load-trigger) dell'elemento. Per ulteriori dettagli, consulta la documentazione relativa a `waitFor`.
Se `reportWhen` è specificato, l'attivatore attende il segnale prima di inviare l'evento. È utile, ad esempio, per inviare eventi di analisi quando la pagina viene chiusa.

##### Attivatore di errore <a name="error-trigger"></a>

L'evento di errore utente (`"on": "user-error"`) viene attivato quando si verifica un errore attribuibile all'autore della pagina o al software utilizzato per la sua pubblicazione. Sono inclusi, ad esempio, la configurazione errata di un componente AMP, annunci non configurati correttamente o asserzioni non riuscite. Gli errori utente sono riportati anche nella console di sviluppo.

```javascript
"triggers": {
  "userError": {
    "on": "user-error",
     "request": "error"
  }
}
```

NOTA: esiste un [problema noto](https://github.com/ampproject/amphtml/issues/10891) che segnala ancora errori dagli incorporamenti di iFrame A4A, che sono irrilevanti per la pagina.

**<a id="visibility-spec"></a>Specifiche visibilità**

`visibilitySpec` è un insieme di condizioni e proprietà che possono essere applicate agli attivatori `visible` o `hidden` in modo da modificare il momento in cui vengono attivati. Se vengono specificate più proprietà, devono essere tutte vere per consentire l'attivazione di una richiesta. Le proprietà di configurazione supportate in `visibilitySpec` sono:

- `waitFor`: questa proprietà indica che l'attivatore di visibilità deve attendere un determinato segnale prima di monitorare la visibilità. I valori supportati sono `none`, `ini-load` e `render-start`. Se `waitFor` non è definito, viene impostato automaticamente su [`ini-load`](#initial-load-trigger) quando il selettore è specificato o su `none` negli altri casi.
- `reportWhen`: questa proprietà indica che l'attivatore di visibilità deve attendere un determinato segnale prima di inviare l'attivatore. L'unico valore supportato è `documentExit`. `reportWhen` e `repeat` potrebbero non essere entrambi utilizzati nella stessa visibilitySpec. Tieni presente che, quando viene specificato `reportWhen`, la segnalazione viene inviata al momento del segnale, anche se i requisiti di visibilità non sono soddisfatti in quel momento o non sono stati soddisfatti in precedenza. Tutte le variabili pertinenti (`totalVisibleTime` ecc.) verranno completate in base ai requisiti di visibilità in questa `visibilitySpec`.
- `continuousTimeMin` e `continuousTimeMax`: queste proprietà indicano che una richiesta deve essere attivata quando (qualsiasi parte di) un elemento si trova all'interno dell'area visibile per un periodo di tempo continuo compreso tra i valori minimo e massimo specificati. I tempi sono espressi in millisecondi. Se non altrimenti specificato, `continuousTimeMin` è impostato automaticamente su 0 .
- `totalTimeMin` e `totalTimeMax`: queste proprietà indicano che una richiesta deve essere attivata quando (qualsiasi parte di) un elemento si trova all'interno dell'area visibile per un periodo di tempo continuo compreso tra i valori minimo e massimo specificati. I tempi sono espressi in millisecondi. Se non altrimenti specificato, `totalTimeMin` è impostato automaticamente su 0.
- `visiblePercentageMin` e `visiblePercentageMax`: queste proprietà indicano che una richiesta deve essere attivata quando la proporzione di un elemento visibile all'interno dell'area visibile è compresa tra le percentuali minima e massima specificate. I valori percentuali compresi tra 0 e 100 sono validi. Tieni presente che il limite superiore (`visiblePercentageMax`) è comprensivo. Il limite inferiore (`visiblePercentageMin`) è esclusivo, a meno che entrambi i limiti non siano impostati su 0 o 100. Se entrambi i limiti sono impostati su 0, l'attivatore entra in funzione quando l'elemento non è visibile. Se entrambi i limiti sono impostati su 100, l'attivatore entra in funzione quando l'elemento è completamente visibile. Quando queste proprietà vengono definite insieme ad altre proprietà correlate alla temporizzazione, viene conteggiato solo il momento in cui queste proprietà vengono soddisfatte. I valori predefiniti per `visiblePercentageMin` e `visiblePercentageMax` sono rispettivamente 0 e 100.
- `repeat`: se questa proprietà è impostata su `true`, l'attivatore entra in funzione ogni volta che vengono soddisfatte le condizioni di `visibilitySpec`. Nell'esempio seguente, se l'elemento scorre con il 51% in vista, poi con il 49% e poi di nuovo con il 51%, l'attivatore entra in funzione due volte. Tuttavia, se `repeat` è `false`, l'attivatore entra in funzione una sola volta. Il valore predefinito di `repeat` è `false`. `reportWhen` e `repeat` potrebbero non essere entrambi utilizzati nella stessa visibilitySpec.

```javascript
visibilitySpec: {
  visiblePercentageMin: 50,
  repeat: true,
}
```

`visiblePercentageThresholds` può essere utilizzato come sintassi abbreviata per la creazione di più istanze di `visibilitySpec`, che differiscono solo per `visiblePercentageMin` e `visiblePercentageMax`. Ad esempio, i seguenti sono equivalenti:

```javascript
// Due trigger con visibilitySpecs che differiscono solo in visiblePercentageMin e visiblePercentageMax:
"triggers": {
  "pageView_30_to_40": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 30,
      "visiblePercentageMax": 40,
      "continuousTimeMin": 1000,
    }
  }

  "pageView_40_to_50": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 40,
      "visiblePercentageMax": 50,
      "continuousTimeMin": 1000,
    }
  }
}

// Un trigger singolo equivalente a entrambi i precedenti:
"triggers": {
  "pageView": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageThresholds": [[30, 40], [40, 50]],
      "continuousTimeMin": 1000,
    }
  }
}
```

Oltre alle condizioni riportate sopra, `visibilitySpec` attiva anche determinate variabili documentate [qui](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#visibility-variables).

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "waitFor": "ini-load",
      "reportWhen": "documentExit",
      "visiblePercentageMin": 20,
      "totalTimeMin": 500,
      "continuousTimeMin": 200
    }
  }
}
```
Oltre alle variabili fornite come parte degli attivatori, puoi anche specificare aggiunte / sostituzioni per le [variabili come attributo dei dati](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute). Se utilizzati, questi attributi dei dati devono essere parte dell'elemento specificato come [`selector`](#element-selector).

##### Attivatore clic <a name="click-trigger"></a>

Utilizza l'attivatore clic (`"on": "click"`) per generare una richiesta quando viene fatto clic su un elemento specificato. Utilizza [`selector`](#element-selector) per controllare gli elementi che causeranno l'attivazione di questa richiesta. L'attivatore verrà messo in funzione per tutti gli elementi corrispondenti al selettore specificato.

```javascript
"vars": {
  "id1": "#socialButtonId",
  "id2": ".shareButtonClass"
},
"triggers": {
  "anchorClicks": {
    "on": "click",
    "selector": "a, ${id1}, ${id2}",
    "request": "event",
    "vars": {
      "eventId": 128
    }
  }
}
```

Oltre alle variabili fornite come parte degli attivatori, puoi anche specificare aggiunte / sostituzioni per le [variabili come attributo dei dati](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute). Se utilizzati, questi attributi dei dati devono essere parte dell'elemento specificato come `selector`

##### Attivatore di scorrimento <a name="scroll-trigger"></a>

Utilizza l'attivatore di scorrimento (`"on": "scroll"`) per attivare una richiesta in determinate condizioni quando la pagina viene scorsa. Questo attivatore fornisce [variabili speciali](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#interaction) indicanti i limiti che hanno generato l'invio della richiesta. Usa `scrollSpec` per controllare quando verrà messo in funzione:

- `scrollSpec` questo oggetto può contenere `verticalBoundaries` e `horizontalBoundaries`. È necessaria almeno una delle due proprietà per attivare un evento di scorrimento. I valori per entrambe le proprietà devono essere array di numeri contenenti i limiti su cui viene generato un evento di scorrimento. Ad esempio, nel seguente snippet di codice, l'evento di scorrimento verrà attivato quando la pagina viene scorsa verticalmente del 25%, 50% e 90%. Inoltre, l'evento viene attivato anche quando la pagina viene spostata orizzontalmente al 90% della larghezza di scorrimento. Per mantenere le prestazioni della pagina, i bordi di scorrimento sono arrotondati al multiplo di `5` più vicino.

```javascript
"triggers": {
  "scrollPings": {
    "on": "scroll",
    "scrollSpec": {
      "verticalBoundaries": [25, 50, 90],
      "horizontalBoundaries": [90]
    },
    "request": "event"
  }
}
```

##### Attivatore timer <a name="timer-trigger"></a>

Utilizza l'attivatore di timer (`"on": "timer"`) per attivare una richiesta a intervalli regolari. Utilizza `timerSpec` per controllare quando viene attivato:

- `timerSpec` specifica per gli attivatori del tipo `timer`. A meno che non venga specificato `startSpec`, il timer si attiverà immediatamente (può essere disattivato per impostazione predefinita) e successivamente a un intervallo specificato.
    - `interval` indica la lunghezza in secondi dell'intervallo del timer.
    - `maxTimerLength` specifica il tempo massimo in secondi durante il quale il timer si attiverà. Una richiesta aggiuntiva verrà generata al raggiungimento di `maxTimerLength`. Il valore predefinito è due ore. Quando è presente `stopSpec`, ma non è specificato maxTimerLength, il valore predefinito sarà infinito.
    - `immediate` attiva il timer immediatamente o meno. Booleano, il valore predefinito è true.

```javascript
"triggers": {
  "pageTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 10,
      "maxTimerLength": 600
    },
    "request": "pagetime"
  }
}
```

Per configurare un timer che cronometri gli eventi utente, utilizza:

- `startSpec` è la specifica per l'attivazione dell'avvio di un timer. Utilizza il valore `on` e `selector` per monitorare eventi specifici. Una configurazione con `startSpec` ma nessuna `stopSpec` viene interrotta solo dopo il raggiungimento di `maxTimerLength`.
- `stopSpec` è la specifica per l'attivazione dell'arresto di un timer. Una configurazione con `stopSpec` ma nessuna `startSpec` viene avviata immediatamente, ma si arresta solo al momento dell'evento specificato.

```javascript
"triggers": {
  "videoPlayTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 5,
      "startSpec": {
        "on": "video-play",
        "selector": "amp-video"
      },
      "stopSpec": {
        "on": "video-pause",
        "selector": "amp-video"
      }
    },
    "request": "videoRequest"
  }
}
```

Consulta la specifica sugli [attivatori](#triggers) per informazioni dettagliate sulla creazione di attivatori di timer nidificati. Tieni presente che non è consentito utilizzare un attivatore timer per avviare o arrestare un timer.

##### Attivatore nascosto <a name="hidden-trigger"></a>

Utilizza l'attivatore nascosto (`"on": "hidden"`) per attivare una richiesta quando la pagina viene nascosta.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
  }
}
```

È possibile includere una [`visibilitySpec`](#visibility-spec) in modo che venga attivata una richiesta solo se sono soddisfatte le condizioni di durata della visibilità.
```json
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
    "visibilitySpec": {
      "selector": "#anim-id",
      "visiblePercentageMin": 20,
      "totalTimeMin": 3000,
    }
  }
}
```
La configurazione sopra riportata si traduce in:

<blockquote>
Quando la pagina viene nascosta, attiva una richiesta se l'elemento #anim-id è stato visibile (più del 20% nell'area visibile) per più di tre secondi in totale.
</blockquote>

##### Attivatori di accesso <a name="access-triggers"></a>

Il sistema di accesso AMP emette numerosi eventi per diversi stati nel flusso di accesso. Per informazioni dettagliate sugli attivatori di accesso (`"on": "access-*"`), consulta [Accesso ad AMP e Analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md).

#### Attivatori di analisi dei dati video <a name="video-analytics-triggers"></a>

L'analisi dei dati video offre diversi attivatori (`"on": "video-*"`) utilizzabili dai publisher per monitorare diversi eventi che si verificano durante il ciclo di vita di un video. Ulteriori dettagli sono disponibili in [Analisi dei dati video AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).

#### Trasporto <a name="transport"></a>

L'oggetto di configurazione `transport` specifica come inviare una richiesta. Il valore è un oggetto con campi che
indicano quali metodi di trasporto sono accettabili.

* `beacon` indica che [`navigator.sendBeacon`](https://developer.mozilla.org/it-IT/docs/Web/API/Navigator/sendBeacon) può essere utilizzato per trasmettere la richiesta. Verrà inviata una richiesta POST con credenziali. La richiesta verrà inviata con un corpo vuoto, a meno che `useBody` non sia true. Per ulteriori informazioni su `useBody`, consulta la sezione [useBody per parametri URL aggiuntivi](#use-body-for-extra-url-params).
* `xhrpost` indica che `XMLHttpRequest` può essere utilizzato per trasmettere la richiesta. Verrà inviata una richiesta POST con credenziali. La richiesta verrà inviata con un corpo vuoto, a meno che `useBody` non sia true. Per ulteriori informazioni su `useBody`, consulta la sezione [useBody per parametri URL aggiuntivi](#use-body-for-extra-url-params).
* `image` indica che la richiesta può essere inviata generando un tag `Image`. Verrà inviata una richiesta GET. Per eliminare gli avvisi della console a causa di risposte vuote o richieste non riuscite, imposta `"image": {"suppressWarnings": true}`.

I fornitori accreditati da MRC possono utilizzare un quarto meccanismo di trasporto, "trasporto iframe", aggiungendo una stringa URL a iframe-transport-vendors.js. Questo indica che deve essere creato un iframe con l'attributo `src` impostato su questo URL e che le richieste verranno inviate a quell'iframe tramite `window.postMessage()`. In questo caso, le richieste non devono necessariamente essere URL completi. `iframe` può essere specificato solo in `iframe-transport-vendors.js`, non in linea all'interno del tag `amp-analytics`, né tramite la configurazione remota. Inoltre, il frame del fornitore potrebbe inviare una risposta, che verrà utilizzata da amp-ad-exit. Vedi [analytics-iframe-transport-remote-frame.html](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) e [fake_amp_ad_with_iframe_transport.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html): il primo file invia un oggetto JSON di risposta {'collected-data': 'abc'}, mentre il secondo utilizza tale oggetto per sostituire 'bar_' con 'abc' in finalUrl.

Se sono attivati più metodi di trasporto sopra indicati, l'ordine di precedenza è `iframe` &gt; `beacon` &gt; `xhrpost` &gt; `image`. Verrà utilizzato un solo metodo di trasporto, che sarà quello con la massima precedenza consentita e disponibile. Se lo user-agent del client non supporta un metodo, verrà utilizzato il metodo attivato successivo in ordine di precedenza. Per impostazione predefinita, tutti e quattro i metodi sopra riportati sono attivati.

Nell'esempio riportato di seguito, non viene specificato un URL `iframe` e `beacon` e `xhrpost` sono impostati su `false`, pertanto non verranno utilizzati anche se hanno precedenza superiore rispetto `image`. Solitamente, `image` viene impostato automaticamente su `true`, ma qui viene dichiarato esplicitamente. Se lo user-agent del client supporta il metodo `image`, questo verrà utilizzato; in caso contrario, non verrà inviata alcuna richiesta.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true
}
```

Per ulteriori informazioni, consulta [questo esempio che implementa l'API del client di trasporto iframe](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) e [questa pagina di esempio che incorpora tale iframe](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport.amp.html). L'esempio carica un [annuncio falso](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html), che contiene il tag `amp-analytics`. Tieni presente che i contenuti degli annunci falsi includono alcune istruzioni di configurazione aggiuntive che devono essere seguite.

##### useBody per parametri URL aggiuntivi <a name="use-body-for-extra-url-params"></a>

L'opzione di configurazione `useBody` indica se includere o meno `extraUrlParams` nel corpo della richiesta POST anziché nell'URL come parametri di query con codifica URL.

`useBody` è disponibile solo per i metodi di trasporto `beacon` e `xhrpost`. Se `useBody` è true e viene utilizzato in combinazione con uno di questi metodi di trasporto, `extraUrlParams` vengono inviati nel corpo della richiesta POST. In caso contrario, la richiesta viene inviata con un corpo vuoto e i `extraUrlParams` sono inclusi come parametri URL.

Con `useBody`, puoi includere oggetti nidificati in `extraUrlParams`. Tuttavia, se la richiesta ricade su altre opzioni di trasporto che non supportano `useBody` (ad esempio `image`), tali oggetti nidificati verranno convertiti in stringa nell'URL come `[object Object]`.

```javascript
"transport": {
  "beacon": true,
  "xhrpost": true,
  "useBody": true,
  "image": false
}
```

##### Norme sui referrer <a name="referrer-policy"></a>

Le norme sui referrer possono essere specificate come campo `referrerPolicy` nella configurazione di `transport`. Attualmente è supportato solo `no-referrer`.
Le norme sui referrer sono disponibili solo per il trasporto `image`. Se `referrerPolicy: no-referrer` è specificato, i trasporti `beacon` e `xhrpost` vengono sostituiti da `false`.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true,
  "referrerPolicy": "no-referrer"
}
```

#### Linker <a name="linkers"></a>

La funzione `linkers` consente di attivare la sincronizzazione degli ID interdominio. `amp-analytics` utilizzerà un [oggetto di configurazione](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md#format) per creare una "stringa linker", che verrà aggiunta ai link in uscita specificati nella pagina come parametro URL. Quando un utente fa clic su uno di questi link, la pagina di destinazione leggerà la stringa del linker dal parametro URL per eseguire la sincronizzazione dell'ID. In genere, viene utilizzato per partecipare alle sessioni utente in un dominio proxy AMP e un dominio del publisher.

I dettagli per la configurazione del linker sono descritti in [Inoltro ID linker](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md)

Se vuoi inserire questo parametro, consulta le informazioni sulla sua creazione in [Ricezione ID linker](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md).

#### Cookie <a name="cookies"></a>

La funzione `cookies` supporta la scrittura di cookie nel dominio di origine mediante estrazione delle informazioni [`QUERY_PARAM`](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#query-parameter) e [`LINKER_PARAM`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#linker-param) dall'URL del documento. Può essere utilizzata insieme alle funzioni `linkers` per sincronizzare gli ID dal dominio AMP con proxy con le pagine AMP del dominio di un publisher.

I dettagli sulla configurazione dei `cookies` sono disponibili su [Parametri Linker riceventi su pagine AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#receiving-linker-params-on-amp-pages)

## Convalida <a name="validation"></a>

Consulta [le regole di amp-analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/validator-amp-analytics.protoascii) nella specifica dello strumento di convalida AMP.

### Attributi validi per `<amp-analytics>` <a name="valid-attributes-for-"></a>

Questi sono gli attributi validi per il componente `amp-analytics`:

**type**

Specifica il tipo di fornitore.  Per ulteriori dettagli, consulta l'elenco dei [fornitori di soluzioni di analisi](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md).

Esempi:

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json"></amp-analytics>
```

**config**

È un attributo facoltativo, che può essere utilizzato per caricare una configurazione da un URL remoto specificato. L'URL specificato deve utilizzare lo schema HTTPS. Vedi anche l'attributo `data-include-credentials` di seguito. L'URL può includere [variabili URL AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md). La risposta deve rispettare le [linee guida per la sicurezza CORS AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).

Esempi:

```html
<amp-analytics config="https://example.com/analytics.config.json"></amp-analytics>
```

**data-credentials**<a name="data-credentials"></a>

Se impostato su `include`, attiva la possibilità di leggere e scrivere cookie sulla richiesta specificata tramite l'attributo `config`. È un attributo facoltativo.

**data-consent-notification-id**

Se è specificato, la pagina non elabora le richieste di analisi finché non viene confermata (accettata) dall'utente una [amp-user-notification](amp-user-notification.md) con l'ID elemento HTML specificato. È un attributo facoltativo.

## Analytics per i componenti AMP <a name="analytics-for-amp-components"></a>

Gli sviluppatori dei componenti AMP possono implementare la raccolta di dati utilizzando Analytics per AMP. Per ulteriori informazioni, consulta [Implementazione di Analytics per i componenti AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-components-analytics.md)

---
'$title': Vertiefung von AMP Analytics
$order: 1
description: Dieser Leitfaden befasst sich eingehend mit der Komponente "amp-analytics" und zerlegt eine Beispielkonfiguration für amp-analytics in die folgenden Schlüsselbausteine.
formats:
  - websites
  - stories
---

Dieser Leitfaden befasst sich eingehend mit der Komponente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) und zerlegt eine Beispielkonfiguration für [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) in die folgenden Schlüsselbausteine:

In diesem Leitfaden verwenden wir das folgende Konfigurationsbeispiel, welches die Seitenaufrufe und Benutzerklicks auf Links verfolgt und Analysedaten an den Drittanbieter [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/) sendet:

```html
<amp-analytics
  type="googleanalytics"
  config="https://example.com/analytics.account.config.json"
>
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
      "transport": {
        "beacon": false,
        "xhrpost": false,
        "image": true
      }
    }
  </script>
</amp-analytics>
```

Der oben angeführte Beispielcode soll dich beim Lernen unterstützen, ist aber keineswegs ein realistisches Beispiel. Wenn du Analytics Anbieter nutzt, macht das obige Beispiel höchstwahrscheinlich keinen Sinn, denn Anbieterkonfigurationen entfernen die Komplexität. In der Dokumentation [deines Analytics Anbieters ](analytics-vendors.md) findest du Beispielkonfigurationen.

## Bestimmungsort für die Analytics Daten: das Attribut "type"

AMP is designed to support two common patterns of data collection:

- Ingestion by a publisher-owned endpoint for in-house analytics systems.
- Ingestion by a vendor-owned endpoint for interoperability with a vendor solution (for example, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

To send analytics data to an analytics provider, include the `type` attribute in the [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) tag and set its value to the appropriate vendor, as defind in the [Analytics Vendors](analytics-vendors.md) list.

For example: `<amp-analytics type="googleanalytics">` sends analytics data to the third-party analytics provider, Google Analytics. To send data to a publisher-owned endpoint, simply don’t include the `type` attribute; the analytics data is sent to the defined endpoints for each [request](deep_dive_analytics.md).

Analytics vendor configurations are a quick way to get started with [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). You should consult your vendor’s documentation and help resources for further guidance. As previously mentioned, the list of vendors who’ve already integrated with AMP, as well as links to their specific documentation can be found in the [Analytics Vendors](analytics-vendors.md) list.

Wenn du Analytics Anbieter bist, findest du hier mehr Informationen über die [Integration deiner eigenen Analytics Konfiguration in AMP HTML](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md).

## Remote Konfiguration laden: das Attribut "config"

Du musst nicht die gesamte Konfiguration für [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) in deine AMP Seite einbinden. Stattdessen kannst du eine Remote URL aufrufen, um einen Teil oder alle der Konfigurationen abzurufen.

This allows you to do things like vary the configuration based on a specific request. If you as the publisher have control over the remote file, you can do any server-side processing necessary to construct the configuration data.

The first step to loading remote configurations is to include the config attribute in the [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) tag:

```html
<amp-analytics
  config="https://example.com/analytics.account.config.json"
></amp-analytics>
```

Als Nächstes muss der JSON Inhalt erstellt werden, der sich in der Remote URL befindet. In diesem einfachen Beispiel ist die im JSON Objekt enthaltene Konfiguration lediglich der Variablenwert für den Analytics Account.

Beispielinhalt in `https://example.com/analytics.account.config.json`:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

Der letzte Schritt besteht darin, sicherzustellen, dass die Inhalte der Remote Datei in der Konfiguration für [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) an die gewünschte Stelle abgerufen werden. Sowohl in der Anforderung `pageview` als auch in `event` wird hier der Wert der Variablen `account` dem Wert des Accounts gleichgesetzt, der in der Remote URL angegeben ist (`"account": "UA-XXXXX-Y"`):

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

[tip type="important"] **WICHTIG:** AMP überprüft nicht, ob eine Variable mehrmals verwendet wird. Bei der Variablensubstitution werden die Werte in einer bestimmten Rangfolge eingetragen, und die Werte in Remote URLs haben dabei höchste Priorität (siehe [Reihenfolge der Variablensubstitution](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

## Requests, Triggers und Transports <a name="requests-triggers--transports"></a>

Das Attribut `requests` definiert, welche Daten gesendet werden (z. B. `pageviews`, `events`) und wohin diese Daten gesendet werden (d. h. mit welchen URLs die Daten übermittelt werden).

Das Attribut `triggers` beschreibt, wann Analysedaten gesendet werden sollen, z. B. wenn Benutzer eine Seite ansehen oder auf einen Link klicken.

Das Attribut `transport` gibt an, wie – also über welches Protokoll – eine Anforderung gesendet werden soll.

Lies weiter, um mehr über diese Konfigurationen zu erfahren. (Informationen zu den Konfigurationen findest du auch in der [Referenz zu `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Welche Daten werden gesendet: das Attribut "request" <a name="what-data-gets-sent-requests-attribute"></a>

Das Attribut `request-name` in der Konfiguration für "trigger" gibt an, welche Anforderung als Antwort auf ein bestimmtes Event gesendet werden soll. Der Wert `request-value` ist eine `https` URL. Diese Werte können Platzhaltertoken enthalten, die auf andere Anforderungen oder Variablen verweisen können.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Einige Analytics Anbieter (einschließlich Google Analytics) stellen bereits eine Konfiguration bereit, die du mithilfe des Attributs `type` verwenden kannst. Wenn du einen Analytics Anbieter nutzt, musst du möglicherweise keine Informationen in Form von `requests` einbinden. In der Dokumentation deines Anbieters erfährst du, ob und wie `requests` konfiguriert werden müssen.

#### Anhang an die URL der Anforderung: das Attribut "extraURLParams"

Das Attribut [extraUrlParams](../../../../documentation/components/reference/amp-analytics.md#extra-url-params) gibt zusätzliche Parameter an, die an die Zeichenfolge der Abfrage in der URL der Anforderung angehängt werden. Dazu wird wie gewohnt die Konvention "&foo=baz" verwendet.

Das Beispiel zu [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) fügt der Anforderung den zusätzlichen Parameter `cd1` hinzu und setzt den Parameterwert auf "AMP":

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### Wann Daten gesendet werden: das Attribut "triggers"

Das Attribut `triggers` beschreibt, wann eine Analytics Anforderung gesendet werden soll. Es enthält das Schlüssel-Wert-Paar "trigger-name" und "trigger-configuration". Der Name des Triggers kann eine beliebige Zeichenfolge sein, die aus alphanumerischen Zeichen besteht (a-zA-Z0-9).

So wird z. B. das folgende Element [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) konfiguriert, um eine Anforderung an `https://example.com/analytics` zu senden, wenn das Dokument zum ersten Mal geladen wird, und dann jedes Mal beim Anklicken eines Tags `a`:

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

[tip type="important"] **WICHTIG:** Der oben beschriebene Ansatz wird nur für AMP Seiten, nicht für AMPHTML Ads empfohlen. Da die Analysepriorität im Vergleich zum Inhalt der Seite niedriger ist, wird empfohlen, Klicks mithilfe einer Browserumleitung zu verfolgen, um den Verlust von Klicks zu vermeiden. [/tip]

AMP unterstützt die folgenden Triggerkonfigurationen:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Triggerkonfiguration</th>
      <th data-th="Description">Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"> <code>on</code> (obligatorisch)</td>
      <td data-th="Description">Das Event, das abgehört werden soll. Gültige Werte sind <code>click</code>, <code>scroll</code>, <code>timer</code> und <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>request</code> (obligatorisch)</td>
      <td data-th="Description">Name der zu sendenden Anforderung (wie in den <a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">Anforderungen</a> festgelegt).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Ein Objekt mit Schlüssel-Wert-Paaren, mit dem das in der Konfiguration der höchsten Ebene definierte <code>vars</code> überschrieben werden kann, oder mit dem ein Objekt <code>vars</code> angegeben wird, das für diesen Trigger spezifisch ist (siehe auch <a href="deep_dive_analytics.md#variable-substitution-ordering">Reihenfolge der Variablensubstitution</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config">
<code>selector</code> (obligatorisch, wenn <code>on</code> den Wert <code>click</code> hat)</td>
      <td data-th="Description">Ein CSS Selektor, mit dem präzisiert werden kann, welche Elemente verfolgt werden sollen. Verwende den Wert <code>*</code>, um alle Elemente zu verfolgen. Diese Konfiguration wird in Verbindung mit dem Trigger <code>click</code> verwendet. Lerne, wie du den Selektor verwendest, um <a href="use_cases.md#tracking-page-clicks">Seitenklicks</a> und <a href="use_cases.md#tracking-social-interactions">soziale Interaktionen</a> zu verfolgen.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>scrollSpec</code> (obligatorisch, wenn der Wert <code>on</code> den Wert <code>scroll</code> hat)</td>
      <td data-th="Description">Steuert, unter welchen Bedingungen das Event <code>scroll</code> beim Scrollen der Seite ausgelöst wird. Dieses Objekt kann <code>verticalBoundaries</code> und <code>horizontalBoundaries</code> haben. Mindestens eine der beiden Eigenschaften ist erforderlich, damit das Event <code>scroll</code> ausgelöst wird. Die Werte beider Eigenschaften müssen Arrays aus Zahlen sein, die der Begrenzung entsprechen, an der das Scroll Event generiert wird (siehe Beispiel zu <a href="use_cases.md#tracking-scrolling">Scrolltracking</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>timerSpec</code> (obligatorisch, wenn der Wert <code>on</code> den Wert <code>timer</code> hat)</td>
      <td data-th="Description">Steuert, wann das Event <code>timer</code> ausgelöst wird. Der Timer wird sofort und dann in bestimmten Intervallen ausgelöst. Diese Konfiguration wird in Verbindung mit dem Trigger <code>timer</code> verwendet.</td>
    </tr>
  </tbody>
</table>

[tip type="important"] **WICHTIG:** Trigger aus einer Konfiguration mit niedrigerer Priorität werden von Triggern mit demselben Namen aus einer Konfiguration mit höherer Priorität überschrieben (siehe [Reihenfolge der Variablensubstitution](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

### Wie Daten gesendet werden: das Attribut "transport"

Das Attribut `transport` gibt an, wie eine Anforderung gesendet werden soll. Die folgenden drei Methoden sind standardmäßig aktiviert:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Methode für Transport</th>
      <th data-th="Description">Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Gibt an, dass <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> zum Übertragen der Anforderung verwendet werden kann. Als Folge wird eine <code>POST</code> Anforderung mit Anmeldeinformationen und einem leeren Body gesendet.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Gibt an, dass <code>XMLHttpRequest</code> zum Übertragen der Anforderung verwendet werden kann. Als Folge wird eine <code>POST</code> Anforderung mit Anmeldeinformationen und einem leeren Body gesendet.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Gibt an, dass die Anforderung durch Generieren des Tags <code>Image</code> gesendet werden kann. Als Folge wird eine <code>GET</code> Anforderung gesendet.</td>
    </tr>
  </tbody>
</table>

Es wird nur eine Methode für Transport verwendet: die Methode mit der höchsten Priorität, die aktiviert, zulässig und verfügbar ist. Die Rangfolge ist wie folgt: `beacon` > `xhrpost` > `image`. Wenn der User Agent des Clients eine Methode nicht unterstützt, wird die aktivierte Methode mit der nächsthöheren Priorität verwendet.

Include the `transport` attribute in your configuration only if you want to limit the transport options, otherwise, you may stop requests.

In the example below, `beacon` and `xhrpost` are set to false, so they will not be used even though they have higher precedence than `image`. If the client's user agent supports the `image` method, then it will be used; otherwise, no request gets sent.

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## Reihenfolge der Variablensubstitution <a name="variable-substitution-ordering"></a>

AMP populates variables with values in an order of precedence:

1. Remote Konfigurationen (über `config`)
2. `vars`, verschachtelt in einem Trigger innerhalb von `triggers`
3. `vars` der höchsten Ebene, verschachtelt in [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)
4. Von der Plattform bereitgestellte Werte

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
      <th data-th="Value">Wert</th>
      <th data-th="Defined By" class="col-thirty">Definiert durch</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Plattform</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Remote Konfiguration</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
  </tbody>
</table>

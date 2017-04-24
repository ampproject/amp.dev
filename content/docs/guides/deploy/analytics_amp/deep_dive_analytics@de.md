---
$title: Eingehende Betrachtung der AMP-Analyse
---

In dieser Anleitung wird genauer auf die [amp-analytics-Komponente](/docs/reference/extended/amp-analytics.html) eingegangen. Dabei wird eine `amp-analytics`-Beispielkonfiguration in die folgenden Grundbausteine unterteilt:

[TOC]

Im übrigen Teil dieser Anleitung wird das folgende Konfigurationsbeispiel verwendet, mit dem Seitenaufrufe und Nutzerklicks auf Links erfasst und die Analysedaten an den Drittanbieter [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/) gesendet werden:

[sourcecode:html]
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&amp;title=${title}&amp;acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&amp;elab=${eventLabel}&amp;acct=${account}"
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

**Hinweis:** Der obige Beispielcode ist als Lernhilfe gedacht und stellt kein realistisches Anwendungsbeispiel dar. Wenn Sie mit Analyseanbietern zusammenarbeiten, ist das obige Beispiel wahrscheinlich nicht sinnvoll. Anbieterkonfigurationen verringern die Komplexität. Weitere Beispielkonfigurationen können Sie wahrscheinlich der Dokumentation des Analyseanbieters entnehmen.

## Ziel für das Senden der Analysedaten: type-Attribut

AMP wurde entwickelt, zwei gebräuchliche Muster der Datenerfassung zu unterstützen:

* Aufnahme durch einen Publisher-Endpunkt für interne Analysesysteme
* Aufnahme durch einen Anbieterendpunkt für die Interoperabilität mit einer Anbieterlösung wie z. B. [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/) oder [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)

Wenn Sie Analysedaten an einen Analyseanbieter senden möchten, schließen Sie das `type`-Attribut in das `amp-analytics`-Tag ein und legen Sie als Wert den gewünschten Anbieter fest, wie in der [amp-analytics-Spezifikation](/docs/reference/extended/amp-analytics.html) beschrieben.

Mit `<amp-analytics type="googleanalytics">` werden beispielsweise Analysedaten an den Analysedrittanbieter Google Analytics gesendet.
Wenn Sie Daten an einen Publisher-Endpunkt senden möchten, schließen Sie einfach nicht das `type`-Attribut ein. Die Analysedaten werden dann an die für die jeweilige [Anforderung](/de/docs/guides/analytics/deep_dive_analytics.html#art-der-gesendeten-daten:-requests-attribut) festgelegten Endpunkte gesendet.

Konfigurationen von Analyseanbietern ermöglichen einen schnellen Einstieg in die Verwendung von `amp-analytics`.
Weitere Informationen finden Sie in der Dokumentation und den Hilferessourcen Ihres Anbieters.
Eine Liste der Anbieter, die in AMP integriert werden können, sowie Links zur entsprechenden Dokumentation finden Sie wie bereits erwähnt in der [amp-analytics-Spezifikation](/docs/reference/extended/amp-analytics.html).

Wenn Sie selbst Analyseanbieter sind, können Sie [hier mehr über die Integration Ihrer eigenen Analysekonfiguration in AMP-HTML erfahren](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Remote-Konfiguration laden: config-Attribut

Sie brauchen nicht die gesamte Konfiguration für `amp-analytics` auf Ihrer AMP-Seite einzuschließen.
Stattdessen können Sie die Konfigurationen vollständig oder teilweise von einer Remote-URL abrufen.

Dies ermöglicht Ihnen beispielsweise, die Konfiguration in Abhängigkeit von der jeweiligen Anforderung zu variieren. Wenn Sie als Publisher die Kontrolle über die Remote-Datei haben, können Sie die serverseitige Verarbeitung vornehmen, die für die Erstellung der Konfigurationsdaten erforderlich ist.

Der erste Schritt zum Laden von Remote-Konfigurationen besteht darin, das config-Attribut in das `amp-analytics`-Tag einzuschließen:

[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

Im nächsten Schritt erstellen Sie den JSON-Inhalt unter der Remote-URL. In diesem einfachen Beispiel umfasst die im JSON-Objekt enthaltene Konfiguration lediglich den Variablenwert für das Analysekonto.

Beispielinhalt in `https://example.com/analytics.account.config.json`:

[sourcecode:js]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

Im letzten Schritt sorgen Sie dafür, dass der Inhalt der Remote-Datei an der richtigen Stelle in der `amp-analytics`-Konfiguration platziert wird.
Sowohl in der `pageview`- als auch in der `event`-Anforderung wird hier der `account`-Variablenwert automatisch auf den Kontowert in der Remote-URL (`"account": "UA-XXXXX-Y"`) gesetzt:

[sourcecode:js]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&amp;title=${title}&amp;acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&amp;elab=${eventLabel}&amp;acct=${account}"
}
[/sourcecode]

**Wichtig:** AMP prüft nicht, ob dieselbe Variable mehrfach verwendet wird.
Werte werden in einer bestimmten Reihenfolge der Variablensubstitution festgelegt und Werte in Remote-URLs stehen am Anfang dieser Reihenfolge (siehe [Reihenfolge der Variablensubstitution](/de/docs/guides/analytics/deep_dive_analytics.html#reihenfolge-der-variablensubstitution)).

## Anforderungen, Trigger und Transporte

Mit dem `requests`-Attribut wird festgelegt, welche Daten (z. B. `pageviews` und `events`) wohin (an welche URLs) gesendet werden.

Mit dem `triggers`-Attribut wird beschrieben, wann Analysedaten gesendet werden sollen, z. B. wenn ein Nutzer eine Seite aufruft oder wenn er auf einen Link klickt.

Mit dem `transport`-Attribut wird angegeben, wie eine Anforderung gesendet wird, also das konkrete Protokoll.

Im Folgenden wird näher auf diese Konfigurationen eingegangen.
Außerdem finden Sie weitere Informationen in der [amp-analytics-Referenz](/docs/reference/extended/amp-analytics.html).

### Art der gesendeten Daten: requests-Attribut

Mit `request-name` wird in der Triggerkonfiguration angegeben, welche Anforderung als Antwort auf ein bestimmtes Ereignis gesendet werden soll.
`request-value` ist eine `https`-URL. Diese Werte können Platzhaltertoken enthalten, die auf weitere Anforderungen oder Variablen verweisen.

[sourcecode:js]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&amp;title=${title}&amp;acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&amp;elab=${eventLabel}&amp;acct=${account}"
}
[/sourcecode]

Einige Analyseanbieter, einschließlich Google Analytics, haben bereits eine Konfiguration bereitgestellt, die Sie mithilfe des `type`-Attributs verwenden können.
Wenn Sie einen Analyseanbieter verwenden, brauchen Sie möglicherweise keine `requests`-Informationen anzugeben.
Ob und wie `requests` konfiguriert werden muss, entnehmen Sie der Anbieterdokumentation.

#### Anforderungs-URL anhängen: zusätzliche URL-Parameter

Mit dem Attribut [extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params) werden zusätzliche Parameter angegeben, die über die gewohnte "&amp;foo=baz"-Konvention an den Abfragestring der Anforderungs-URL angehängt werden.

Im `amp-analytics`-Beispiel wird der Anforderung ein zusätzlicher Parameter `cdl` hinzugefügt und der Parameterwert auf "AMP" gesetzt:

[sourcecode:js]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### Bedingungen für das Senden von Daten: triggers-Attribut

Über das `triggers`-Attribut wird angegeben, wann eine Analyseanforderung gesendet werden soll.
Es enthält ein Schlüssel/Wert-Paar aus Triggername und Triggerkonfiguration.
Der Triggername kann ein beliebiger String aus alphanumerischen Zeichen (a–z, A–Z, 0–9) sein.

Das folgende `amp-analytics`-Element sorgt z. B. dafür, dass beim ersten Laden des Dokuments und bei jedem Klick auf ein `https://example.com/analytics`-Tag eine Anforderung an `a` gesendet wird:

[sourcecode:js]
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

AMP unterstützt die folgenden Triggerkonfigurationen:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Trigger Config">Trigger-konfiguration</th>
      <th data-th="Description">Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (erforderlich)</td>
      <td data-th="Description">Das Ereignis, auf das gewartet wird. Gültige Werte sind <code>click</code>, <code>scroll</code>, <code>timer</code> und <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (erforderlich)</td>
      <td data-th="Description">Name der zu sendenden Anforderung, wie unter [Anforderungen](/de/docs/guides/analytics/deep_dive_analytics.html#art-der-gesendeten-daten:-requests-attribut) angegeben</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Ein Objekt, das Schlüssel/Wert-Paare enthält, mit denen in der Konfiguration oberster Ebene festgelegte <code>vars</code>-Variablen überschrieben oder spezifische <code>vars</code>-Variablen für diesen Trigger angegeben werden (siehe auch [Reihenfolge der Variablensubstitution](/de/docs/guides/analytics/deep_dive_analytics.html#reihenfolge-der-variablensubstitution))</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (erforderlich, wenn <coe>on</code> auf <code>click</code> gesetzt ist)</td>
      <td data-th="Description">Ein CSS-Selektor dient zur genaueren Angabe der zu erfassenden Elemente. Bei Verwendung von <code>*</code> werden alle Elemente erfasst. Diese Konfiguration wird in Verbindung mit dem <code>click</code>-Trigger eingesetzt. [Informationen zur Verwendung des Selektors zum Erfassen von Seitenklicks](/de/docs/guides/analytics/use_cases.html#seitenklicks-erfassen) und von [Interaktionen über soziale Netzwerke](/de/docs/guides/analytics/use_cases.html#interaktionen-über-soziale-netzwerke-erfassen)</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (erforderlich, wenn <code>on</code> auf <code>scroll</code> gesetzt ist)</td>
      <td data-th="Description">Hiermit wird festgelegt, unter welchen Bedingungen beim Scrollen auf der Seite das <code>scroll</code>-Ereignis ausgelöst wird. Dieses Objekt kann <code>verticalBoundaries</code> und <code>horizontalBoundaries</code> enthalten. Für das Auslösen eines <code>scroll</code>-Ereignisses ist mindestens eine der zwei Eigenschaften erforderlich. Bei den Werten für beide Eigenschaften sollte es sich um Arrays von Zahlen handeln, die die Grenzen angeben, bei denen ein scroll-Ereignis generiert wird. [Beispiel zum Erfassen des Scrollens](/de/docs/guides/analytics/use_cases.html#scrollen-erfassen)</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (erforderlich, wenn <code>on</code> auf <code>timer</code> gesetzt ist)</td>
      <td data-th="Description">Hiermit wird festgelegt, wann das <code>timer</code>-Ereignis ausgelöst wird. Der Timer wird sofort und anschließend nach Ablauf eines angegebenen Intervalls ausgelöst. Diese Konfiguration wird in Verbindung mit dem <code>timer</code>-Trigger verwendet.</td>
    </tr>
  </tbody>
</table>

**Wichtig:** Trigger aus einer Konfiguration mit einer niedrigeren Priorität werden von gleichnamigen Triggern aus einer Konfiguration höherer Priorität überschrieben (siehe [Reihenfolge der Variablensubstitution](/de/docs/guides/analytics/deep_dive_analytics.html#reihenfolge-der-variablensubstitution)).

### Methode für das Senden von Daten: transport-Attribut

Mit dem `transport`-Attribut wird angegeben, wie eine Anforderung gesendet wird. Standardmäßig sind die drei folgenden Methoden aktiviert:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Transport Method">Transport-methode</th>
      <th data-th="Description">Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Hiermit wird angegeben, dass die Anforderung mittels [navigator.sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) übertragen werden kann. Dadurch wird eine <code>POST</code>-Anforderung mit Anmeldedaten und einem leeren body-Abschnitt gesendet.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Hiermit wird angegeben, dass die Anforderung mittels <code>XMLHttpRequest</code> übertragen werden kann. Dadurch wird eine <code>POST</code>-Anforderung mit Anmeldedaten und einem leeren body-Abschnitt gesendet.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Hiermit wird angegeben, dass die Anforderung durch Generieren eines <code>Image</code>-Tags gesendet werden kann. Dadurch wird eine <code>GET</code>-Anforderung gesendet.</td>
    </tr>
  </tbody>
</table>

Es wird nur eine einzige Transportmethode verwendet, und zwar jene mit der höchsten Priorität, die aktiviert, zulässig und verfügbar wird.
Die Prioritätsreihenfolge lautet `beacon` > `xhrpost` > `image`.
Wenn der User-Agent des Kunden eine Methode nicht unterstützt, wird die aktivierte Methode mit der höchsten verfügbaren Priorität verwendet.

Schließen Sie das `transport`-Attribut nur dann in Ihre Konfiguration ein, wenn Sie die Transportoptionen beschränken möchten. Andernfalls könnten Anforderungen unterbunden werden.

Im unten stehenden Beispiel sind `beacon` und `xhrpost` auf "false" gesetzt und werden daher nicht verwendet, obwohl sie eine höhere Priorität als `image` haben.
Wenn der User-Agent des Kunden die `image`-Methode unterstützt, wird sie auch verwendet. Andernfalls wird keine Anforderung gesendet.

[sourcecode:js]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## Reihenfolge der Variablensubstitution

AMP legt Werte für die Variablen entsprechend der Prioritätsreihenfolge fest:

1. Remote-Konfigurationen (über `config`)
2. `vars`-Variablen, die in einen Trigger innerhalb von `triggers` eingebettet sind
3. `vars`-Variablen oberster Ebene, die in `amp-analytics` eingebettet sind
4. Von der Plattform bereitgestellte Werte

In diesem Beispiel gibt es eine Remote-Konfiguration sowie Variablen, die auf oberster Ebene, in Triggern und auf Plattformebene festgelegt sind:

[sourcecode:html]
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&amp;title=${title}&amp;acct=${account}&amp;clientId=${clientId(cid-scope)}",
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

Wenn dieselbe `var`-Variable an mehreren Stellen festgelegt wird, entscheidet die Prioritätsreihenfolge der Variablen über ihren Wert.
Wenn also im obigen Beispiel in der Remote-Konfiguration für `account` der Wert UA-XXXXX-Y festgelegt wird, haben die Variablen die folgenden Werte:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="var"><code>var</code></th>
      <th data-th="Value">Wert</th>
      <th class="col-thirty" data-th="Defined By">Definiert durch</th>
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
      <td data-th="Defined By">Remote-Konfiguration</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
  </tbody>
</table>

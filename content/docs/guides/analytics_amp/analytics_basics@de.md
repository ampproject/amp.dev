---
$title: "Analytics: Grundlagen"
---

Hier erfahren Sie mehr über die Grundlagen der AMP-Analyse.

[TOC]

## amp-pixel oder amp-analytics verwenden?

AMP bietet zwei Komponenten zur Erfüllung Ihrer Analyse- und Messanforderungen: [amp-pixel](/docs/reference/amp-pixel.html) und [amp-analytics](/docs/reference/extended/amp-analytics.html).
Bei beiden Optionen werden Analysedaten an einen festgelegten Endpunkt gesendet.

Wenn Sie ein Verhalten wie das eines einfachen [Tracking-Pixels](https://en.wikipedia.org/wiki/Web_beacon#Implementation) benötigen, bietet die `amp-pixel`-Komponente ein grundlegendes Seitenaufruf-Tracking. Die Seitenaufrufdaten werden an eine festgelegte URL gesendet. Bei einigen Anbieterintegrationen kann diese Komponente erforderlich sein. In diesem Fall stellt der Anbieter den genauen URL-Endpunkt bereit.

Für die meisten Analyselösungen empfiehlt sich die Verwendung von `amp-analytics`.
Das Seitenaufruf-Tracking funktioniert auch in `amp-analytics`.
Sie können aber auch die Nutzerinteraktionen mit jeder anderen Art von Seiteninhalt erfassen, unter anderem mit Klicks auf Links und Schaltflächen.
Außerdem können Sie z. B. messen, wie weit der Nutzer auf der Seite gescrollt und ob er mit sozialen Medien interagiert hat (siehe [Eingehende Betrachtung der AMP-Analyse](/de/docs/guides/analytics/deep_dive_analytics.html)).

Im Rahmen der Integration in die AMP-Plattform bieten Anbieter vordefinierte `amp-analytics`-Konfigurationen an, mit denen Daten leicht erfasst und an ihre Tracking-Tools übertragen werden können.
Sie finden die Anbieterdokumentation in der [amp-analytics-Spezifikation](/docs/reference/extended/amp-analytics.html).

Sie können auf Ihren Seiten sowohl `amp-pixel` als auch `amp-analytics` verwenden: `amp-pixel` für einfaches Seitenaufruf-Tracking und `amp-analytics` für alle anderen Zwecke.
Sie können jedes Tag mehrfach hinzufügen.
Wenn Sie mit mehreren Analyseanbietern zusammenarbeiten, benötigen Sie ein Tag pro Lösung.
Denken Sie daran, dass einfachere AMP-Seiten für Nutzer günstiger sind. Verwenden Sie zusätzliche Tags deshalb nur, wenn es wirklich nötig ist.

## Einfache Analysekonfiguration erstellen

Im Folgenden wird erläutert, wie Sie eine einfache Konfiguration für [amp-pixel](/docs/reference/amp-pixel.html) und [amp-analytics](/docs/reference/extended/amp-analytics.html) erstellen können.

### Einfache amp-pixel-Konfiguration

Wenn Sie eine einfache `amp-pixel`-Konfiguration erstellen möchten, fügen Sie ein Tag wie das folgende in den body-Abschnitt Ihrer AMP-Seite ein:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

In diesem Beispiel werden die Seitenaufrufdaten zusammen mit einer Zufallszahl an die festgelegte URL gesendet.
Die `RANDOM`-Variable ist eine von vielen [Substitutionsvariablen in der AMP-Plattform](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
[Weitere Informationen zur Variablensubstitution](/de/docs/guides/analytics/analytics_basics#variablensubstitution)

Die [amp-pixel-Komponente](/docs/reference/amp-pixel.html) ist bereits enthalten. Daher benötigen Sie keine Einschlussdeklaration wie bei den erweiterten AMP-Komponenten wie z. B. `amp-analytics`.
Sie sollten das `amp-pixel`-Tag aber möglichst nahe am Anfang des `amp-pizel`-Abschnitts platzieren.
Das Tracking-Pixel wird nur ausgelöst, wenn das entsprechende Tag erreicht wird.
Wenn sich das `<body>`-Tag im unteren Bereich der Seite befindet, wird es möglicherweise nicht ausgelöst.

### Einfache amp-analytics-Konfiguration

Zum Erstellen einer einfachen [amp-analytics-Konfiguration](/docs/reference/extended/amp-analytics.html) müssen Sie zunächst die folgende `custom-element`-Deklaration in den `<head>`-Abschnitt des AMP-Dokuments einschließen (siehe auch [Deklaration des Komponenteneinschlusses](/docs/reference/extended.html#component-inclusion-declaration)):

[sourcecode:html]
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
[/sourcecode]

Das folgende Beispiel ähnelt dem [`amp-pixel`-Beispiel](/de/docs/guides/analytics/analytics_basics.html#einfache-amp-pixel-konfiguration)</a>.
Immer wenn eine Seite sichtbar ist, kommt es zu einem Triggerereignis und die Seitenaufrufdaten werden zusammen mit einer zufälligen ID an eine festgelegte URL gesendet:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
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
[/sourcecode]

Im obigen Beispiel wurde eine Anforderung namens "pageview" als https://foo.com/pixel?RANDOM definiert. Wie bereits erläutert, wird RANDOM durch eine Zufallszahl ersetzt. Damit sieht die Anforderung letztlich ungefähr so aus: https://foo.com/pixel?0.23479283687235653498734.

Wenn die Seite sichtbar wird, wie es das Trigger-Keyword `visible` angibt, wird ein Ereignis ausgelöst und die `pageview`-Anforderung wird gesendet.
Das triggers-Attribut bestimmt, wann die pageview-Anforderung ausgelöst wird.
[Weitere Informationen zu Anforderungen und Triggern](/de/docs/guides/analytics/deep_dive_analytics.html#anforderungen,-trigger-und-transporte)

## Variablensubstitution

Sowohl die [amp-pixel](/docs/reference/amp-pixel.html)- als auch die [amp-analytics-Komponente](/docs/reference/extended/amp-analytics.html) ermöglicht alle standardmäßigen URL-Variablensubstitutionen (siehe [AMP-HTML-Variablensubstitutionen](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).
Im folgenden Beispiel wird die Seitenaufrufanforderung zusammen mit der kanonischen URL und dem Titel des aktuellen AMP-Dokuments und einer [Client-ID](/de/docs/guides/analytics/analytics_basics.html#nutzeridentifikation) an die URL gesendet:

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&amp;title=${title}&amp;clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

Aufgrund seiner Einfachheit kann das `amp-pixel`-Tag nur Variablen enthalten, die von der Plattform definiert wurden oder die durch die AMP-Laufzeit von der AMP-Seite geparst werden können.
Im obigen Beispiel legt die Plattform die Werte sowohl für `canonicalURL` als auch für `clientId(site-user-id)` fest.
Das `amp-analytics`-Tag kann dieselben Variablen wie `amp-pixel` sowie speziell definierte Variablen innerhalb der Tag-Konfiguration enthalten.

Verwenden Sie das Format `${varName}` in einem Anforderungsstring für eine Seitenvariable oder eine von der Plattform definierte Variable.
Das `amp-analytics`-Tag ersetzt die Vorlage bei der Erstellung der Analyseanforderung durch den tatsächlichen Wert (siehe auch [Von der AMP-Analyse unterstützte Variablen](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

Im folgenden `amp-analytics`-Beispiel wird die Seitenaufrufanforderung mit zusätzlichen Daten an die URL gesendet, von denen einige aus Variablensubstitutionen extrahiert, einige durch die Plattform bereitgestellt und einige inline innerhalb der `amp-analytics`-Konfiguration definiert wurden:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&amp;title=${title}&amp;acct=${account}&amp;clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

Im obigen Beispiel werden die Variablen `account` und `title` in der `amp-analytics`-Konfiguration definiert.
Die Variablen `canonicalUrl` und `clientId` sind in der Konfiguration nicht definiert. Ihre Werte werden von der Plattform festgelegt.

**Wichtig:** Variablensubstitution ist flexibel. Dieselben Variablen können an verschiedenen Stellen definiert werden und die AMP-Laufzeit parst die Werte in der entsprechenden Reihenfolge (siehe [Reihenfolge der Variablensubstitution](/de/docs/guides/analytics/deep_dive_analytics.html#reihenfolge-der-variablensubstitution)).

## Nutzeridentifikation

Websites verwenden Cookies, um nutzerspezifische Informationen im Browser zu speichern.
Anhand von Cookies ist erkennbar, ob ein Nutzer eine Website schon einmal besucht hat.
In AMP können Seiten entweder von der Website eines Publishers oder aus einem Cache, wie z. B. dem Google-AMP-Cache, bereitgestellt werden.
Die Website des Publishers und der Cache gehören wahrscheinlich zu unterschiedlichen Domains.
Aus Sicherheitsgründen können Browser den Zugriff auf die Cookies einer anderen Domain beschränken und tun dies oft auch (siehe auch [Nutzer unabhängig von der Herkunft erfassen](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

Standardmäßig sorgt AMP für die Bereitstellung einer Client-ID, ob die Seite nun über die ursprüngliche Website des Publishers oder über einen Cache aufgerufen wird.
Die AMP-generierte Client-ID besteht aus `"amp-"` sowie einem zufälligen `base64`-codierten String und bleibt für einen Nutzer über seine Seitenaufrufe hinweg identisch.

In allen Fällen wird das Lesen und Schreiben der Client-ID durch AMP verwaltet.
Dies ist insbesondere dann von Bedeutung, wenn eine Seite über einen Cache bereitgestellt oder auf andere Weise außerhalb des Ansichtskontexts der ursprünglichen Website des Publishers angezeigt wird.
In diesem Fall besteht kein Zugriff auf die Cookies der Publisher-Website.

Wenn eine AMP-Seite über die Website eines Publishers bereitgestellt wird, kann das von AMP verwendete Client-ID-Framework auf ein Fallback-Cookie hingewiesen werden, das es suchen und verwenden soll.
In diesem Fall wird das `cid-scope-cookie-fallback-name`-Argument der `clientId`-Variable als Cookiename interpretiert.
Als Format ist sowohl `CLIENT_ID(cid-scope-cookie-fallback-name)` als auch `${clientId(cid-scope-cookie-fallback-name)}` möglich.

Beispiel:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

Wenn AMP feststellt, dass dieses Cookie gesetzt wurde, gibt die Client-ID-Substitution den Wert des Cookies zurück.
Wenn AMP feststellt, dass das Cookie nicht gesetzt wurde, generiert AMP einen Wert, der aus `amp-` und einem zufälligen base64-codierten String besteht.

Weitere Informationen zur Client-ID-Substitution, einschließlich des Hinzufügens einer optionalen Nutzerbenachrichtigungs-ID, finden Sie unter [Von der AMP-Analyse unterstützte Variablen](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).

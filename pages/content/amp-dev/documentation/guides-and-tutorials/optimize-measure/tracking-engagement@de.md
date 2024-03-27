---
'$title': So konfigurierst du die grundlegende Analyse für deine AMP Seiten
$order: 100
description: Analytics Plattformen werden gewöhnlich über Inline JavaScript Snippets und Funktionsaufrufe in Websites integriert. Diese triggern Ereignisse, die an das Analysesystem …
tutorial: 'true'
formats:
  - websites
  - stories
  - ads
---

Analyseplattformen werden gewöhnlich über Inline JavaScript Snippets und Funktionsaufrufe in Websites integriert. Diese triggern Ereignisse, die an das Analysesystem zurückgesendet werden. AMP bietet eine flexible JSON Konfigurationssyntax, um diesen Prozess für mehrere Analysepartner zu replizieren.

[tip] **TIP –** Wenn du Google Analytics als Analyseanbieter verwendest, solltest du [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) kennen. [/tip]

## Als Kontext: Analyse auf Nicht-AMP Seiten

Das folgende Beispiel zeigt das herkömmliche JavaScript-gesteuerte Google Analytics Tracking. Wir werden es in das [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) JSON Format umschreiben, schauen uns aber zuerst die traditionellen Methode an:

```html
<script>
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    '//www.google-analytics.com/analytics.js',
    'ga'
  );

  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
</script>
```

Dieses JavaScript ist recht einfach; es sendet eine Benachrichtigung, um das "pageview" Ereignis zu verfolgen.

## Schritt 1: Nimm das `amp-analytics` Skript auf

Um diese Funktionalität in AMP zu replizieren, müssen wir zuerst die Komponente <a><code>amp-analytics</code></a> in den `<head>` unseres Dokuments <strong>aufnehmen</strong>:

```html
<script
  async
  custom-element="amp-analytics"
  src="https://ampjs.org/v0/amp-analytics-0.1.js"
></script>
```

## Schritt 2: Füge den Konfigurationscode hinzu

Dann **fügen** wir die Komponente [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) am Ende des `body` unseres Dokuments hinzu:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Genau wie beim JavaScript Beispiel oben auf dieser Seite sendet dieses [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) Snippet eine Benachrichtigung an Google Analytics, die angibt, dass eine Seite angezeigt wurde.

Um dies anzugeben, haben wir den `type` auf `googleanalytics` gesetzt und dann im JSON einen Trigger erstellt, den wir "default pageview" genannt haben. Dieser Trigger wird ausgelöst, wenn die Seite sichtbar ist (aufgrund von `"on": "visible"`). Wenn er ausgelöst wird, senden wir an Google Analytics eine `pageview` Analyseanforderung mit dem von uns angegebenen `vars`.

Das für die Konfiguration von [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) verwendete JSON ist ein sehr flexibles Format. Es beschreibt, welche Analysedaten wann gesendet werden sollen. [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) enthält vollständige Details über das Format.

## Schritt 3: Hinzufügen weiterer Trigger

Vom obigen Beispiel ausgehend können wir einen weiteren Trigger mit dem Namen `"click on #header trigger"` **hinzufügen**:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        },
        "click on #header trigger": {
          "on": "click",
          "selector": "#header",
          "request": "event",
          "vars": {
            "eventCategory": "examples",
            "eventAction": "clicked-header"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Wie der Name dieses neuen Triggers schon sagt, wird er ausgelöst, wenn das Element mit der ID `"header"` angeklickt wird (angegeben durch `"on": "click"` und `"selector": "#header"`). Wenn dieser Trigger ausgelöst wird, senden wir die Anfrage `event` an unseren Analyseanbieter, wobei wir bestimmte Variablen angeben, die in die Anfrage aufgenommen werden sollen.

Wenn du eine benutzerdefinierte Trackingplattform integrieren möchtest, kannst du weiterhin [ ](../../../documentation/components/reference/amp-analytics.md)<a><code>amp-analytics</code></a> verwenden und deine eigenen personalisierten URL Endpoints definieren, an welche die Trackingdaten gesendet werden sollen. Weitere Informationen bietet die Referenzdokumentation für die Komponente <a><code>amp-analytics</code></a>.

[tip type="note"] **HINWEIS:** `"UA-YYYY-Y"` ist ein Beispielkonto für Google Analytics. Es muss durch den Google Analytics Trackingcode deiner eigenen Website ersetzt werden, falls du dieses Beispiel auf deiner Website verwendest. [/tip]

[tip type="tip"] **TIPP:** Wenn du ein einfacheres Trackingsystem bevorzugst, schau dir [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md) an. Wenn du nur Seitenaufrufe verfolgen musst, eignet sich [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md) besser als [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md), da nur die Anforderungen von herkömmlichem Pixel Tracking dafür gelten. Weitere Informationen findest du unter [Die Grundlagen von Analytics](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]

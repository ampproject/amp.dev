---
"$title": Engagement mit Analytics verfolgen
"$order": '4'
description: Analytics Plattformen werden gewöhnlich über Inline JavaScript Snippets und Funktionsaufrufe in Websites integriert. Diese triggern Ereignisse, die an das Analytics System …
---

Analytics platforms are commonly integrated into websites through inline JavaScript snippets and function calls, which trigger events that are sent back to the analytics system. AMP provides a flexible JSON configuration syntax to replicate this process for several analytics partners.

Das folgende Beispiel zeigt das traditionelle JavaScript-gesteuerte Tracking von Google Analytics. Wir werden es in das JSON Format für [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) umschreiben. Aber zuerst sehen wir uns den herkömmlichen Ansatz an:

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

Dieses JavaScript ist recht einfach; es sendet eine Benachrichtigung, um das Ereignis "Seitenaufruf" zu verfolgen.

Um diese Funktionalität in AMP zu replizieren, müssen wir zuerst die Komponente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) im `<head>` unseres Dokuments **einbinden**:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Dann **fügen** wird die Komponente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) am Ende des `body` unseres Dokuments hinzu:

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

Genau wie bei dem oben gezeigten JavaScript Beispiel sendet dieses [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) Snippet eine Benachrichtigung an Google Analytics, die angibt, dass eine Seite aufgerufen wurde.

Um dies anzugeben, haben wir dem Attribut `type` den Wert `googleanalytics` gegeben und dann im JSON einen Trigger erstellt, den wir "default pageview" genannt haben. Dieser Trigger wird ausgelöst, wenn die Seite sichtbar ist (aufgrund von `"on": "visible"`). Wenn er ausgelöst wird, senden wir die Analytics Anfrage `pageview` mit den von uns unter `vars` angegebenen Werten an Google Analytics.

Das zur Konfiguration von [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) verwendete JSON ist ein Format, mit dem du sehr flexibel beschreiben kannst, welche Analytics Daten wann gesendet werden sollen. Die Komponente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) enthält vollständige Details über das Format.

Auf Basis des obigen Beispiels können wir einen weiteren Trigger mit dem Namen `"click on #header trigger"` **hinzufügen**:

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

Wie der Name dieses neuen Triggers schon sagt, wird er ausgelöst, wenn das Element mit der ID `"header"` angeklickt wird (angegeben durch `"on": "click"` und `"selector": "#header"`). Wenn dieser Trigger ausgelöst wird, senden wir die Anfrage `event` an unseren Analytics Anbieter, wobei wir bestimmte Variablen angeben, die in die Anfrage aufgenommen werden sollen.

Wenn du eine benutzerdefinierte Trackingplattform integrieren möchtest, kannst du weiterhin [ ](../../../../documentation/components/reference/amp-analytics.md)[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) verwenden und deine eigenen personalisierten URL Endpoints definieren, an welche die Trackingdaten gesendet werden sollen. Weitere Informationen bietet die Referenzdokumentation für die Komponente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] **HINWEIS:**  `"UA-YYYY-Y"` ist ein Beispielkonto für Google Analytics. Es muss durch den Google Analytics Trackingcode deiner eigenen Website ersetzt werden, falls du dieses Beispiel auf deiner Website verwendest. [/tip]

[tip type="tip"] **TIPP:** Wenn du ein einfacheres Trackingsystem bevorzugst, sieh dir [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) an. Wenn du nur Seitenaufrufe verfolgen musst, eignet sich [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) besser als [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), da es nur die Anforderungen von herkömmlichem Pixel Tracking erfüllen muss. Weitere Informationen findest du unter [Die Grundlagen von Analytics](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]

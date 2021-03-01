---
'$title': Die Grundlagen von Analytics
$order: 0
description: 'AMP bietet zwei Komponenten, die dich bei Analytics und Messungen unterstützen sollen: amp-pixel und amp-analytics. Beide Optionen senden Analysedaten an einen definierten Endpoint.'
formats:
  - websites
  - stories
---

Hier lernst du die Grundlagen von AMP Analytics kennen.

## amp-pixel oder amp-analytics verwenden? <a name="use-amp-pixel-or-amp-analytics"></a>

AMP bietet zwei Komponenten, die dich bei Analytics und Messungen unterstützen sollen: [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) und [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Beide Optionen senden Analysedaten an einen definierten Endpoint.

Wenn du eine einfache Funktion wie den [Tracking Pixel](https://en.wikipedia.org/wiki/Web_beacon#Implementation) wünschst, kannst du das grundlegende Tracking von Seitenaufrufen der Komponente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) nutzen. Die Daten der Seitenaufrufe werden an eine angegebene URL gesendet. Manche Integrationen von Anbietern erfordern möglicherweise diese Komponente. In einem solchen Fall geben sie den genauen URL Endpunkt an.

Du kannst [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) für die meisten Analytics Lösungen verwenden. Auch das Tracking von Seitenaufrufen funktioniert mit [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Damit kannst du aber auch das User Engagement mit jeder Art von Seiteninhalt verfolgen, einschließlich Klicks auf Links und Buttons. [filter formats="websites"] Du kannst außerdem messen, wie weit Benutzer auf der Seite gescrollt haben, ob sie mit sozialen Medien inteagiert haben, und vieles mehr. [/filter] [filter formats="stories"] Du kannst außerdem messen, wie weit Benutzer in einer Story geblättert und ob sie sich mit interaktiven Elementen beschäftigt haben. [/filter]

[tip type="read-on"] Sieh dir den Abschnitt [Vertiefung von AMP Analytics](deep_dive_analytics.md) an. [/tip]

Als Teil der Integration mit der AMP Plattform stellen Anbieter vordefinierte Konfigurationen für [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) bereit. Diese machen es einfacher, Daten zu erfassen und an die Tracking Tools zu übergeben. Die Dokumentation zu verschiedenen Anbietern findest du auf der Liste [Analytics Anbieter](analytics-vendors.md).

Du kannst sowohl [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) als auch [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) auf deinen Seiten verwenden: [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) für das einfache Tracking von Seitenaufrufen und [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) für alles andere. Du kannst außerdem mehrere Instanzen dieser Tags hinzufügen. Wenn du mehrere Analytics Anbieter verwendest, benötigst du ein Tag pro Lösung. Beachte: Je einfacher die AMP Seite, desto besser ist es für Benutzer. Wenn du die zusätzlichen Tags also nicht brauchst, lass sie weg.

## Erstelle eine einfache Analytics Konfiguration

Hier lernst du, wie du eine einfache Konfiguration für [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) und [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) erstellst.

### Einfache Konfiguration für `amp-pixel`

Füge Folgendes im Abschnitt "body" deiner AMP Seite ein, um eine einfache Konfiguration für [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) zu erstellen:

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

In diesem Beispiel werden die Daten zu Seitenaufrufen zusammen mit einer Zufallszahl an die angegebene URL gesendet. Die Variable `RANDOM` ist eine von vielen [Substitutionsvariablen der AMP Plattform](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). Weitere Informationen zur [Variablensubstitution](analytics_basics.md#variable-substitution) findest du hier.

Da die Komponente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) integriert ist, musst du ihre Einbindung nicht deklarieren (darin unterscheidet sie sich von anderen erweiternden Komponenten von AMP, einschließlich [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)). Das Tag [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) solltest du aber möglichst am Anfang des Abschnittes `<body>` platzieren. Das Tracking Pixel wird nur ausgelöst, wenn das Tag selbst angezeigt wird. Wenn [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) am unteren Rand der Seite platziert wird, wird es möglicherweise nicht ausgelöst.

### Einfache Konfiguration für `amp-analytics`

Um eine einfache Konfiguration für [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) zu erstellen, musst du zunächst diese Deklaration von `custom-element` im Abschnitt `<head>` des AMP Dokuments einbinden (siehe auch [Deklaration zur Einbindung von Komponenten](../../../../documentation/components/index.html)):

```html
<script
  async
  custom-element="amp-analytics"
  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
></script>
```

Das folgende Beispiel ähnelt dem [Beispiel zu `amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Jedes Mal, wenn eine Seite sichtbar wird, wird das Trigger Event ausgelöst und die Daten zu Seitenaufrufen werden zusammen mit einer zufälligen ID an die angegebene URL gesendet:

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

Im obigen Beispiel haben wir eine Anforderung mit dem Namen "pageview" als `https://foo.com/pixel?RANDOM` definiert. Wie bereits erwähnt, wird RANDOM durch eine Zufallszahl ersetzt, sodass die Anforderung tatsächlich wie folgt aussieht: `https://foo.com/pixel?0.23479283687235653498734`.

Wenn die Seite sichtbar wird (wie durch das Trigger Schlüsselwort `visible` festgelegt), wird ein Event ausgelöst und die Anforderung `pageview` wird gesendet. Das Attribut des Triggers bestimmt, wann die Anforderung des Seitenaufrufs ausgelöst wird. Erfahre mehr über [Anforderungen und Trigger](deep_dive_analytics.md).

[filter formats="stories"]

## Standardkonfiguration der AMP Story

Die für Websites typische Benutzerführung trifft nicht auf Storys zu. Auf einer Website könnten Benutzer zum Beispiel die Überschrift lesen, zum Ende der Seite scrollen und mit einem Formular interagieren, bevor sie auf einen Link zur nächsten Seite klicken. Storys hingegen nehmen den gesamten Viewport ein, und Benutzer scrollen nicht, sondern tippen, um weiterzublättern.

{{ image('/static/img/docs/guides/analytics-pages.png', 660, 501, alt='Bild von PWA' ) }}

Viele würden jede neue [`<amp-story-page>`](../../../../documentation/components/reference/amp-story-page.md) in der Story als neuen Seitenaufruf messen, da der Inhalt sich von Bildschirm zu Bildschirm erheblich unterscheidet. Allerdings ist die Seite nur ein einzelnes Element in einer vollständigen Story – und in der Regel müssen Benutzer mehrere Story Seiten ansehen, um die volle Bedeutung der Story zu erfassen. Die Frage, wie wir etwas so Triviales wie den Seitenaufruf zählen, hat daher enorme Auswirkungen auf unseren Analyseansatz.

{{ image('/static/img/docs/guides/analytics-setup-stories.png', 1037, 528, alt='Bild von PWA' ) }}

AMP Analytics erleichtert die Implementierung der oben genannten Funktionen mit jedem Analytics Anbieter. Der folgende Ausschnitt zeigt zum Beispiel die Implementierung von [Global Site Tag](https://developers.google.com/gtagjs/) von Google Analytics.

```html
<amp-analytics type="gtag" data-credentials="include">
  <script type="application/json">
    {
      "vars": {
        "gtag_id": "YOUR_GOOGLE_ANALYTICS_ID",
        "config": {
          "YOUR_GOOGLE_ANALYTICS_ID": {
            "groups": "default"
          }
        }
      },
      "triggers": {
        "storyProgress": {
          "on": "story-page-visible",
          "vars": {
            "event_name": "custom",
            "event_action": "story_progress",
            "event_category": "${title}",
            "event_label": "${storyPageId}",
            "send_to": ["YOUR_GOOGLE_ANALYTICS_ID"]
          }
        },
        "storyEnd": {
          "on": "story-last-page-visible",
          "vars": {
            "event_name": "custom",
            "event_action": "story_complete",
            "event_category": "${title}",
            "send_to": ["YOUR_GOOGLE_ANALYTICS_ID"]
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Diese Standardkonfiguration sollte als vollständig funktionierende Konfiguration für AMP Storys ausreichen.

Wenn du über die Möglichkeiten der Standardkonfiguration hinausgehen möchtest, lies den Abschnitt [Analytics für deine AMP Storys](https://blog.amp.dev/2019/08/28/analytics-for-your-amp-stories/?_gl=1*pw0bu5*_ga*MzM1MjQ0ODE5LjE1NjUwMzU1MTg), der fortgeschrittene Use Cases mit Google Analytics enthält.

[/filter]

## Variablensubstitution <a name="variable-substitution"></a>

Sowohl die Komponente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) als auch [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) ermöglicht alle standardmäßigen Variablensubstitutionen in URLs (siehe [AMP HTML Variablensubstitutionen](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)). Im folgenden Beispiel wird die Anforderung des Seitenaufrufs zusammen mit der kanonischen URL des aktuellen AMP Dokuments, seinem Titel und einer [Client ID](analytics_basics.md#user-identification) an die URL gesendet:

```html
<amp-pixel
  src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"
></amp-pixel>
```

Aufgrund seiner einfachen Struktur kann das Tag [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) nur Variablen enthalten, die von der Plattform definiert wurden oder welche die AMP Runtime von der AMP Seite aus parsen kann. Im obigen Beispiel legt die Plattform sowohl die Werte für `canonicalURL` als auch für `clientId(site-user-id)` fest. Das Tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) kann die gleichen Variablen wie [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) sowie eindeutig definierte Variablen innerhalb der Tag Konfiguration enthalten.

Verwende in der Zeichenfolge der Anforderung für eine Seite oder eine plattformdefinierte Variable das Format `${varName}`. Zum Zeitpunkt der Erstellung der Analytics Anforderung ersetzt das Tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) das Template durch den tatsächlichen Wert (siehe auch [Von `amp-analytics` unterstützte Variablen](../../../../documentation/components/reference/amp-analytics.md)).

Im folgenden Beispiel für [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) wird die Anforderung des Seitenaufrufs an die URL gesendet, wobei zusätzliche Daten aus Variablensubstitutionen extrahiert werden, von denen einige von der Plattform bereitgestellt und andere inline innerhalb der Konfiguration für [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) definiert werden:

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}"
      },
      "vars": {
        "account": "ABC123"
      },
      "triggers": {
        "someEvent": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "My homepage"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Im obigen Beispiel werden die Variablen `account` und `title` in der Konfiguration für [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) definiert. Da die Variablen `canonicalUrl` und `clientId` nicht in der Konfiguration definiert sind, werden ihre Werte durch die Plattform ersetzt.

[tip type="important"] **WICHTIG:** Die Substitution von Variablen ist flexibel. Du kannst dieselben Variablen an verschiedenen Positionen definieren. Die AMP Runtime analysiert die Werte in dieser Rangfolge (siehe [Reihenfolge der Variablensubstitution](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

## Benutzeridentifikation <a name="user-identification"></a>

Websites verwenden Cookies, um benutzerspezifische Informationen im Browser zu speichern. Mithilfe von Cookies kann ermittelt werden, ob Benutzer eine Website bereits besucht haben. In AMP können Seiten entweder von der Website des Publishers oder von einem Cache (wie dem Google AMP Cache) bereitgestellt werden. Die Website des Publishers und der Cache haben höchstwahrscheinlich unterschiedliche Domänen. Aus Sicherheitsgründen schränken Browser manchmal den Zugriff auf Cookies anderer Domänen ein (siehe auch [Tracking von Benutzern über mehrere Quellen hinweg](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)).

Standardmäßig verwaltet AMP die Bereitstellung einer Client ID, unabhängig davon, ob auf die Seite von der ursprünglichen Publisher Website oder über einen Cache zugegriffen wird. Die AMP generierte Client ID hat den Wert `"amp-"` gefolgt von einer zufälligen, mit `base64` codierten Zeichenfolge, und sie bleibt für einen Benutzer gleich, der die Website erneut aufruft.

AMP verwaltet in allen Fällen das Lesen und Schreiben der Client ID. Das wird insbesondere dann deutlich, wenn eine Seite über einen Cache bereitgestellt oder auf andere Weise außerhalb des Anzeigekontexts der ursprünglichen Publisher Website angezeigt wird. In diesem Fall ist der Zugriff auf die Cookies der Publisher Website nicht verfügbar.

Wenn eine AMP Seite von einer Publisher Website bereitgestellt wird, kann das von AMP verwendete Client ID Framework darüber informiert werden, dass ein Fallback Cookie gesucht und verwendet werden soll. In diesem Fall wird das Argument `cid-scope-cookie-fallback-name` der Variablen `clientId` als Cookie Name interpretiert. Als Formatierung ist entweder `CLIENT_ID(cid-scope-cookie-fallback-name)` oder `${clientId(cid-scope-cookie-fallback-name)}` möglich.

Zum Beispiel:

```html
<amp-pixel
  src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"
></amp-pixel>
```

Wenn AMP feststellt, dass dieses Cookie angelegt wurde, gibt die Client ID Substitution den Wert des Cookies zurück. Wenn AMP feststellt, dass dieses Cookie nicht angelegt wurde, generiert AMP einen Wert im Format `amp-` gefolgt von einer zufälligen, in base64 codierten Zeichenfolge.

Weitere Informationen zur Client ID Substitution und dazu, wie du eine optionale ID für Benutzerbenachrichtigungen hinzufügst, findest du unter [Von amp-analytics unterstützte Variablen](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).

Weitere Informationen: Erfahre mehr über Analytics in [Vertiefung von AMP Analytics](deep_dive_analytics.md) und [Use Cases](use_cases.md).

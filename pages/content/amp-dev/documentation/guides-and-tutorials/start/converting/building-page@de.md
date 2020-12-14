---
"$title": Erstellung einer regulären HTML Seite
"$order": '1'
description: Im Projektverzeichnis findest du die Datei article.html. Das ist der Nachrichtenartikel, für den wir eine Entsprechung in AMP erstellen …
---

Im Projektverzeichnis findest du die Datei [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). Das ist der Nachrichtenartikel, für den wir eine Entsprechung in AMP erstellen.

1. **Kopiere** den gesamten Code aus der Datei `article.html` und füge ihn in eine neue Datei ein.
2. **Speichere** die neue Datei als `article.amp.html`.

[tip type="note"] **HINWEIS:** Deine AMP Dateien müssen nicht unbedingt `.amp.html` im Namen enthalten. AMP Dateien können eine beliebige Erweiterung haben. Publisher unterscheiden ihre AMP Seiten üblicherweise von den kanonischen Versionen, indem sie in der URL bestimmte Parameter verwenden. Zum Beispiel:  `http://publisher.com/article.html?amp`. [/tip]

Deine Datei `article.amp.html` sollte wie folgt aussehen:

```html
<!doctype html>
<html lang="en">
  <head>

    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>
    </article>
    <img src="mountains.jpg">
  </body>
</html>
```

Diese Seite ist absichtlich vereinfacht und enthält allgemeine statische Elemente eines Nachrichtenartikels: CSS, JavaScript und ein Bildtag.

Bisher ist die AMP Version des Artikels nur eine Kopie des Originalartikels. Wir wollen sie zu AMP konvertieren.

Wir fügen zunächst die AMP Bibliotheksdatei hinzu. Das reicht noch nicht aus, um deine neue Datei zu einer gültigen AMP Seite zu machen. Aber wie wir unten sehen werden, können wir anhand der AMP Bibliothek herausfinden, welche weiteren Schritte erforderlich sind.

Um die AMP Bibliothek aufzunehmen, **füge** am Ende des Tags `<head>` diese Zeile hinzu:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Lade** die neue Seite `article.amp.html` mit [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html) in deinem Browser und **öffne** dann die [Entwicklerkonsole](https://developer.chrome.com/devtools/docs/console) in Chrome (oder in deinem bevorzugten Browser).

Wenn du dir die JavaScript Ausgabe in der Entwicklerkonsole ansiehst (wähle dazu den Tab mit der Konsole aus), solltest du diesen Protokolleintrag sehen:

```text
Powered by AMP ⚡ HTML
```

Die AMP Bibliothek enthält einen [AMP Validator](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). Er zeigt dir, ob deine Seite ein gültiges AMP Dokument ist oder nicht. **Aktiviere** den AMP Validator, indem du diese Fragment-ID zur URL deines Dokuments hinzufügst:

```text
#development=1
```

Zum Beispiel:

```text
http://localhost:8000/article.amp.html#development=1
```

In der Entwicklerkonsole sollten mehrere Validierungsfehler angezeigt werden (möglicherweise musst du die Seite in deinem Browser manuell aktualisieren, um die Fehler anzuzeigen):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='AMP Validierungsfehler für unser Beispiel') }}

Um ein gültiges AMP Dokument zu erhalten, müssen wir alle diese Fehler beheben. Genau das werden wir in diesem Codelab tun.

Zuvor **simulieren** wir eine mobile Umgebung in den Entwicklertools des Browsers, da wir mit einem mobilen Nachrichtenartikel arbeiten. Klicke dazu beispielsweise in Chrome DevTools auf das Smartphone Symbol und wähle im Menü ein Mobilgerät aus.

In deinem Browser sollte jetzt eine simulierte mobile Auflösung wie die folgende erscheinen:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Mobile Simulation unserer AMP Seite') }}

Jetzt können wir loslegen! Gehen wir die Validierungsfehler einzeln durch und untersuchen wir ihren Bezug zu AMP.

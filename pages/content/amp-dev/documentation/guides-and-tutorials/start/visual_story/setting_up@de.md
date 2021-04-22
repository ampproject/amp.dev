---
'$title': Einrichtung
$order: 1
description: 'Richte zunächst deine Entwicklungsumgebung ein: Schritt 1. Lade den Code herunter. Lade den Beispielcode für das Tutorial entweder als ZIP Datei oder über git herunter …'
author: bpaduch
---

## Voraussetzungen

Dieses Tutorial setzt Folgendes voraus:

- Grundkenntnisse in HTML, CSS und JavaScript
- ein grundlegendes Verständnis der AMP Kernkonzepte (siehe Tutorial ["Konvertiere HTML zu AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md?format=websites))
- einen Browser deiner Wahl
- einen Texteditor deiner Wahl

## Richte deine Entwicklungsumgebung ein

#### Schritt 1. Lade den Code herunter

1. Lade den Code für das Tutorial als ZIP Datei über die folgende URL herunter: <a href="/static/files/tutorials/amp-pets-story.zip">/static/files/tutorials/amp-pets-story.zip</a>

2. Extrahiere den Inhalt der ZIP Datei. Im Verzeichnis **amp-pets-story** findest du die Bilder, Videos, Audiodateien und Daten, mit denen wir unsere Story erstellen. Die Datei **pets.html** ist unser Ausgangspunkt für die Story. Die fertige Version der Story findest du in der Datei [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Schritt 2. Führe die Beispielseite aus

Um unsere Web Story zu testen, müssen wir von einem Webserver aus auf die Dateien zugreifen. Es gibt mehrere Wege, wie du einen temporären lokalen Webserver zu Testzwecken erstellen kannst. Hier sind einige Optionen – wähle die für dich geeignete Variante aus:

- ["Web Server for Chrome" (Google Chrome App)](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Lokaler HTTP Pythonserver](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Sobald du deinen lokalen Webserver eingerichtet hast, kannst du dir ansehen, wie unsere fertige Web Story am Ende dieses Tutorials aussehen wird. Greife dazu auf diese <a href="http://localhost:8000/pets-completed.html">URL</a> zu:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] **WICHTIG:** Stelle sicher, dass die URL von `localhost` bereitgestellt wird. Andernfalls wird die Web Story möglicherweise nicht korrekt geladen und es treten Fehler wie `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.` auf. [/tip]

Klicke dich durch die fertige Story und mache dir ein Bild davon, was wir hier erstellen.

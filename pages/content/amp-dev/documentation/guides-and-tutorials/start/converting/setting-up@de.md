---
"$title": Einrichtung
"$order": '0'
description: Richte deine Entwicklungsumgebung ein. Schritt 1. Lade den Code herunter. Lade den Beispielcode für das Tutorial entweder als ZIP Datei oder via git herunter …
"$parent": "/documentation/guides-and-tutorials/start/converting/setting-up.md"
---

## Voraussetzungen

Dieses Tutorial **setzt Folgendes voraus**:

- Grundkenntnisse in HTML, CSS und JavaScript
- einen Browser deiner Wahl, der die JavaScript Konsole aufrufen kann
- einen Texteditor deiner Wahl

## Richte deine Entwicklungsumgebung ein

### Schritt 1. Lade den Code herunter

Lade den Beispielcode für das Tutorial entweder als [ZIP Datei](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip) oder via git herunter:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

Entpacke die Archivdatei (falls erforderlich) und wechsle zum Projektverzeichnis, indem du auf deinem Computer folgenden Befehl in der Befehlszeile ausführst:

```shell
cd accelerated-mobile-pages-foundations
```

Das Projektverzeichnis enthält mehrere Ressourcendateien als Beispiele sowie die Startseite [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html).

### Schritt 2. Führe die Beispielseite aus

Um unsere Beispielseite zu testen, müssen wir von einem Webserver aus auf die Dateien zugreifen. Es gibt mehrere Wege, wie du einen temporären lokalen Webserver zu Testzwecken erstellen kannst. Hier sind einige Optionen – wähle die für dich geeignete Variante aus:

- ["Web Server for Chrome" (Google Chrome App)](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [lokaler HTTP Pythonserver](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **HINWEIS:** Es wird dringend empfohlen, HTTPS in Produktionsumgebungen zu verwenden. HTTPS bietet mehrere Vorteile, die über die reine Sicherheit hinausgehen. Dazu gehört auch SEO. Weitere Informationen zu diesem Thema findest du in diesem [Blogbeitrag bei Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html). [/tip]

Nachdem du deinen lokalen Webserver eingerichtet hast, kannst du über [diese URL](http://localhost:8000/article.html) auf den Beispielartikel in deinem Browser zugreifen:

```text
http://localhost:8000/article.html
```

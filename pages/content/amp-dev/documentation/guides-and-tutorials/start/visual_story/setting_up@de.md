---
"$title": Einrichtung
"$order": '1'
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

1. Lade den Code für das Tutorial als ZIP Datei über die folgende URL herunter: <a href="https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip">https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip</a>

2. Extrahiere den Inhalt der ZIP Datei. Im Verzeichnis **amp-pets-story** findest du die Bilder, Videos, Audiodateien und Daten, mit denen wir unsere Story erstellen. Die Datei **pets.html** ist unser Ausgangspunkt für die Story. Die fertige Version der Story findest du in der Datei [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Schritt 2. Führe die Beispielseite aus

To test our sample Web Story, we need to access the files from a web server. There are several ways to create a temporary local web server for the purposes of testing.  Here are some options, choose the one that works best for you:

- ["Web Server for Chrome" (Google Chrome App)](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Lokaler HTTP Pythonserver](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

After setting up your local web server, have a look at what our completed Web Story will look like by the end of this tutorial by accessing the following <a href="http://localhost:8000/pets-completed.html">URL</a>:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] **IMPORTANT –** Make sure the URL serves from `localhost` otherwise the Web Story might not load correctly, and you may encounter errors like `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.` [/tip]

Click through the completed story and get a sense of what we'll be creating.

---
"$title": Setting up
"$order": '0'
description: Set up your development environment Step 1. Download the code. Download the sample code for the tutorial either as a ZIP file or via git ...
"$parent": "/documentation/guides-and-tutorials/start/converting/setting-up.md"
---

## Voraussetzungen

Dieses Tutorial **setzt Folgendes voraus**:

- Grundkenntnisse in HTML, CSS und JavaScript
- A browser of your choice that can inspect the JavaScript console
- A text editor of your choice

## Richte deine Entwicklungsumgebung ein

### Schritt 1. Lade den Code herunter

Lade den Beispielcode für das Tutorial entweder als [ZIP Datei](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip) oder via git herunter:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

Unzip the archive file (if necessary) and navigate to the project directory through the command line on your computer:

```shell
cd accelerated-mobile-pages-foundations
```

The project directory contains several example resources files and the starting [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) page.

### Schritt 2. Führe die Beispielseite aus

To test our sample page we need to access the files from a web server. There are several ways to create a temporary local web server for the purposes of testing.  Here are some options, choose the one that works best for you:

- [“Web Server for Chrome” Google Chrome app](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [A local HTTP Python server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **NOTE –**  It is strongly recommended that you use HTTPS in production environments. HTTPS has several benefits beyond just security including SEO. You can read more about this topic in this [Google Webmaster blog post](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html). [/tip]

After setting up your local web server, access the sample article in your browser at [this URL](http://localhost:8000/article.html):

```text
http://localhost:8000/article.html
```

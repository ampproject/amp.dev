---
'$title': Configurazione
$order: 1
description: "Configurazione dell'ambiente di sviluppo. Passo 1. Scaricare il codice. Scaricare il codice di esempio dell'esercitazione come file ZIP o tramite git ..."
author: bpaduch
---

## Prerequisiti

Prima di iniziare questa esercitazione, hai bisogno di quanto segue:

- conoscenze di base di HTML, CSS e JavaScript
- comprensione basilare dei concetti AMP fondamentali (consultare l'esercitazione ["Convertire pagine HTML in AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md?format=websites))
- Un browser a scelta
- Un editor di testo a scelta

## Configurazione dell'ambiente di sviluppo

#### Passo 1. Scaricare il codice

1. Scaricare il codice per l'esercitazione, compresso in un file zip, dal seguente URL: <a href="/static/files/tutorials/amp-pets-story.zip">/static/files/tutorials/amp-pets-story.zip</a>

2. Estrarre il contenuto del file zip. Nella directory **amp-pets-story** ci sono i file di immagini, video, audio e dati che useremo per creare la nostra storia. Il file **Pets.html** è il nostro punto di partenza per la storia. La versione completa della storia può essere trovata nel file [Pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Passo 2. Eseguire la pagina di esempio

Per testare la storia web di esempio, dobbiamo accedere ai file da un server web. Esistono diversi modi per creare un server web locale temporaneo a scopo di test. Ecco alcune opzioni tra cui scegliere quella preferita:

- [App Google Chrome "Web Server per Chrome"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Un server Python HTTP locale](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Dopo aver configurato il server web locale, diamo un'occhiata a come apparirà la storia che completeremo alla fine di questa esercitazione, accedendo al seguente <a href="http://localhost:8000/pets-completed.html">URL</a>:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] **IMPORTANTE:** Assicurarsi che l'URL funzioni da `localhost` altrimenti la storia web potrebbe non caricarsi correttamente e presentare errori come `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.` [/tip]

Clicchiamo sulla storia completata per farci un'idea di ciò che creeremo.

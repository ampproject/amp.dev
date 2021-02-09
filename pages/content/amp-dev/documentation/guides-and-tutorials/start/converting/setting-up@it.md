---
'$title': Configurazione
$order: 0
description: "Configurazione dell'ambiente di sviluppo. Passo 1. Scaricare il codice. Scaricare il codice di esempio dell'esercitazione come file in formato ZIP o tramite git ..."
'$parent': '/documentation/guides-and-tutorials/start/converting/setting-up.md'
---

## Prerequisiti

**Prima di iniziare** questa esercitazione, hai bisogno di quanto segue:

- conoscenze di base di HTML, CSS e JavaScript
- Un browser a scelta in grado di ispezionare la console JavaScript
- Un editor di testo a scelta

## Configurazione dell'ambiente di sviluppo

### Passo 1. Scaricare il codice

Scaricare il codice di esempio dell'esercitazione come [file ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip) o tramite git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

Decomprimere il file di archivio (se necessario) e spostarsi nella directory di progetto dalla linea di comando del proprio computer:

```shell
cd accelerated-mobile-pages-foundations
```

La directory di progetto contiene diversi file con esempi di risorse e la pagina [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) iniziale.

### Passo 2. Eseguire la pagina di esempio

Per testare la pagina di esempio, dobbiamo accedere ai file da un server web. Esistono diversi modi per creare un server web locale temporaneo a scopo di test. Ecco alcune opzioni tra cui scegliere quella preferita:

- [App Google Chrome "Web Server per Chrome"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Un server Python HTTP locale](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **NOTA: ** Si consiglia vivamente di utilizzare HTTPS negli ambienti di produzione. HTTPS ha diversi vantaggi oltre alla semplice sicurezza, comprese le funzioni SEO. Ulteriori informazioni su questo argomento sono disponibili in questo [post del blog di Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html). [/tip]

Dopo aver configurato il server web locale, accedere all'articolo di esempio nel browser da [questo URL](http://localhost:8000/article.html):

```text
http://localhost:8000/article.html
```

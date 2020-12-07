---
"$title": Configuration
"$order": '0'
description: 'Before starting this tutorial, you''ll need the following: - A basic knowledge of HTML, CSS, and JavaScript - A basic understanding of AMP’s core concepts see ...'
"$parent": "/content/docs/fundamentals/add_advanced.md"
---

## Prérequis

**Avant de commencer** ce didacticiel, vous aurez besoin des éléments suivants :

- A basic knowledge of HTML, CSS, and JavaScript
- A basic understanding of AMP’s core concepts (see ["Convert your HTML to AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md) tutorial)
- Un navigateur de votre choix qui peut inspecter la console JavaScript
- Un éditeur de texte de votre choix

## Configurez votre environnement de développement

### Étape 1. Téléchargez le code

Download the sample code for the tutorial either as a [ZIP file](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip) or via git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

Unzip the archive file (if necessary) and navigate to the project directory through the command line on your computer:

```shell
cd accelerated-mobile-pages-advanced
```

Le répertoire du projet contient plusieurs exemples de fichiers de ressources et la page de démarrage [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html).

### Étape 2. Exécutez la page d'exemple

Pour tester l'exemple de page AMP, nous devons accéder aux fichiers à partir d'un serveur Web. Il existe plusieurs façons de créer un serveur Web local temporaire à des fins de test. Voici quelques options, choisissez celle qui vous convient le mieux :

- [“Web Server for Chrome” Google Chrome app](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Un serveur HTTP Python local](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **REMARQUE -** Il est fortement recommandé d'utiliser HTTPS dans les environnements de production. HTTPS a plusieurs avantages au-delà de la simple sécurité, y compris le référencement. Vous pouvez en savoir plus sur ce sujet dans cet [article de blog Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html). [/tip]

Après avoir configuré votre serveur Web local, accédez à l'exemple d'article dans votre navigateur à [cette URL](http://localhost:8000/article.amp.html) :

```text
http://localhost:8000/article.amp.html
```

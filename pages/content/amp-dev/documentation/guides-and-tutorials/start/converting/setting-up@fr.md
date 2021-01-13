---
"$title": Configuration
"$order": '0'
description: "Configurez votre environnement de développement Étape 1. Téléchargez le code. Téléchargez l'exemple de code du tutoriel sous forme de fichier ZIP ou via git ..."
"$parent": "/documentation/guides-and-tutorials/start/converting/setting-up.md"
---

## Prérequis

**Avant de commencer** ce tutoriel, vous aurez besoin des éléments suivants:

- Des bases en HTML, CSS et JavaScript
- Un navigateur de votre choix qui peut inspecter la console JavaScript
- Un éditeur de texte de votre choix

## Configurez votre environnement de développement

### Étape 1. Téléchargez le code

Téléchargez l'exemple de code du tutoriel sous forme de [fichier ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip) ou via git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

Décompressez le fichier d'archive (si nécessaire) et accédez au répertoire du projet via la ligne de commande suivante sur votre ordinateur:

```shell
cd accelerated-mobile-pages-foundations
```

Le répertoire du projet contient plusieurs exemples de fichiers de ressources et la page [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) de démarrage.

### Étape 2. Exécutez la page d'exemple

Pour tester notre exemple de page, nous devons accéder aux fichiers à partir d'un serveur Web. Il existe plusieurs façons de créer un serveur Web local temporaire à des fins de test. Voici quelques options, choisissez celle qui vous convient le mieux:

- [Application Google Chrome « Web Server for Chrome »](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Un serveur HTTP Python local](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **REMARQUE -** Il est fortement recommandé d'utiliser HTTPS dans les environnements de production. HTTPS présente plusieurs avantages au-delà de la simple sécurité, y compris le référencement. Vous pouvez en savoir plus sur ce sujet dans cet [article de blog Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html). [/tip]

Après avoir configuré votre serveur Web local, accédez à l'exemple d'article dans votre navigateur à [cette URL](http://localhost:8000/article.html):

```text
http://localhost:8000/article.html
```

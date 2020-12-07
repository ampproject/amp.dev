---
"$title": Configuration
"$order": '1'
description: 'Configurez votre environnement de développement : Étape 1. Téléchargez le code. Téléchargez l''exemple de code du tutoriel sous forme de fichier ZIP ou via git ...'
author: bpaduch
---

## Prérequis

Avant de commencer ce tutoriel, vous aurez besoin des éléments suivants :

- Des bases en HTML, CSS et JavaScript
- Une compréhension des concepts de base d'AMP (voir le tutoriel ["Convertir votre HTML en AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md?format=websites))
- Un navigateur de votre choix
- Un éditeur de texte de votre choix

## Configurez votre environnement de développement

#### Étape 1. Téléchargez le code

1. Téléchargez le code du tutoriel, qui est compressé sous forme de fichier zip à partir de l'URL suivante : <a href="https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip">https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip</a>

2. Extrayez le contenu du fichier zip. Dans le répertoire **amp-pets-story** se trouvent les fichiers d'images, vidéo, audio et de données que nous utiliserons pour créer notre story. Le fichier **pets.html** est notre point de départ pour la story. La version complète de la story se trouve dans le fichier [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Étape 2. Exécutez la page d'exemple

Pour tester notre exemple de story Web, nous devons accéder aux fichiers à partir d'un serveur Web. Il existe plusieurs façons de créer un serveur Web local temporaire à des fins de test. Voici quelques options, choisissez celle qui vous convient le mieux :

- [Application Google Chrome "Web Server for Chrome"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Un serveur HTTP Python local](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Après avoir configuré votre serveur Web local, regardez à quoi ressemblera notre story Web terminée à la fin de ce tutoriel en accédant à l'<a href="http://localhost:8000/pets-completed.html">URL</a> suivante :

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] **IMPORTANT –** Assurez-vous que l'URL soit fournie à partir du `localhost`, sinon la story Web risque de ne pas être chargée correctement, et vous pourriez rencontrer des erreurs telles que `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.` [/tip]

Cliquez sur la story terminée pour avoir une idée de ce que nous allons créer.

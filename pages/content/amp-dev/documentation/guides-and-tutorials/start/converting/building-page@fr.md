---
'$title': Créer une page HTML standard
$order: 1
description: "Dans le répertoire du projet, vous trouverez un fichier nommé article.html. C'est l'article de presse pour lequel nous créons une page AMP équivalente ..."
---

Dans le répertoire du projet, vous trouverez un fichier nommé [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). C'est l'article de presse pour lequel nous créons une page AMP équivalente.

1. **Copiez** l'intégralité du code du fichier `article.html` et collez-le dans un nouveau fichier.
2. **Enregistrez** le nouveau fichier sous le nom `article.amp.html`.

[tip type="note"] **REMARQUE –** Vous n'avez pas besoin de nommer vos fichiers AMP `.amp.html`. En effet, les fichiers AMP peuvent porter l'extension que vous voulez. Très souvent, les éditeurs distinguent les pages AMP de leurs versions canoniques en utilisant les paramètres dans l'URL. Par exemple: `http://publisher.com/article.html?amp`. [/tip]

Votre fichier `article.amp.html` doit ressembler à ceci:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>
    </article>
    <img src="mountains.jpg" />
  </body>
</html>
```

Cette page est volontairement simpliste et comporte des éléments d'articles de presse statiques courants: CSS, JavaScript et une balise d'image.

Notre version AMP de l'article est juste une copie de l'article original pour le moment. Convertissons-la en AMP.

Pour commencer, nous allons ajouter le fichier de bibliothèque AMP. Cela seul ne fera pas de votre nouveau fichier une page AMP valide, mais nous verrons ci-dessous comment la bibliothèque AMP peut nous aider à déterminer ce que nous devons faire pour résoudre ce problème.

Pour inclure la bibliothèque AMP, **ajoutez** cette ligne au bas de la balise `<head>`:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Chargez** la nouvelle page `article.amp.html` dans votre navigateur sur [http: // localhost: 8000 / article.amp.html](http://localhost:8000/article.amp.html), puis **ouvrez** la [console de développement](https://developer.chrome.com/devtools/docs/console) dans Chrome (ou votre navigateur préféré).

Lorsque vous inspectez le résultat JavaScript dans la console de développement (assurez-vous que l'onglet Console est sélectionné), vous devriez voir cette entrée de journal:

```text
Powered by AMP ⚡ HTML
```

La bibliothèque AMP comprend un [validateur AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) qui vous dira s'il y a quelque chose qui empêche votre page d'être un document AMP valide. **Activez** le validateur AMP en ajoutant ce fragment d'identifiant à l'URL de votre document:

```text
#development=1
```

Par exemple:

```text
http://localhost:8000/article.amp.html#development=1
```

Dans la console de développement, vous devriez recevoir plusieurs erreurs de validation (vous devrez peut-être actualiser manuellement la page dans votre navigateur pour les voir):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='AMP validation errors for our sample') }}

Afin de le transformer en un document AMP valide, nous allons devoir corriger toutes ces erreurs: c'est exactement ce que nous allons faire dans ce codelab.

Avant d'y arriver, **simulons** une expérience d'appareil mobile dans les outils de développement du navigateur puisque nous travaillons avec un article de presse mobile. Par exemple, dans Chrome DevTools, cliquez sur l'icône de téléphone mobile et sélectionnez un appareil mobile dans le menu.

Vous devriez voir une simulation de résolution mobile dans votre navigateur, comme celle-ci:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Mobile simulation of our AMP page') }}

Nous sommes maintenant prêts à nous mettre au travail! Passons en revue les erreurs de validation une par une et examinons leur relation avec AMP.

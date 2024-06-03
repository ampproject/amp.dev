---
'$title': Utiliser AMP comme source de données pour votre PWA
$order: 1
description: "Si vous avez investi dans AMP mais que vous n'avez pas encore créé d'application Web progressive, vos pages AMP peuvent simplifier considérablement le développement de votre application Web progressive."
formats:
  - websites
author: pbakaus
---

Si vous avez investi dans AMP mais que vous n'avez pas encore créé d'application Web progressive, vos pages AMP peuvent simplifier considérablement le développement de votre application Web progressive. Dans ce guide, vous apprendrez à consommer AMP dans votre Progressive Web App et à utiliser vos pages AMP existantes comme source de données.

## De JSON à AMP

Dans le scénario le plus courant, une application Web progressive est une application d'une seule page qui se connecte à une API JSON via Ajax. Cette API JSON renvoie ensuite des ensembles de données pour piloter la navigation et le contenu réel pour rendre les articles.

Vous devez ensuite procéder à la conversion du contenu brut en HTML utilisable et le diffuser sur le client. Ce processus est coûteux et souvent difficile à maintenir. Au lieu de cela, vous pouvez réutiliser vos pages AMP déjà existantes comme source de contenu. Mieux encore, AMP rend cela facile à effectuer en quelques lignes de code.

## Incluez « Shadow AMP » dans votre application Web progressive

La première étape consiste à inclure une version spéciale d'AMP que nous appelons « Shadow AMP » dans votre application Web progressive. Oui, c'est exact, vous chargez la bibliothèque AMP dans la page de niveau supérieur, mais elle ne contrôlera pas le contenu de niveau supérieur. Elle va juste amplifier les parties de notre page que vous lui demanderez.

Incluez Shadow AMP dans la tête de votre page, comme ceci:

[sourcecode:html]

<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>

[/sourcecode]

### Comment savoir quand l'API Shadow AMP est prête à être utilisée?

Nous vous recommandons de charger la bibliothèque Shadow AMP avec l'attribut `async` en place. Cela signifie, cependant, que vous devez utiliser une certaine approche pour comprendre quand la bibliothèque est complètement chargée et prête à être utilisée.

Le bon signal à observer est la disponibilité de la variable `AMP` globale; Shadow AMP utilise une « [approche de chargement de fonction asynchrone](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/) » pour cela. Soit le code suivant:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
// AMP is now available.
});
[/sourcecode]

This code will work, and any number of callbacks added this way will indeed fire when AMP is available, but why?

Ce code se traduit par:

1. « Si window.AMP n'existe pas, créer un tableau vide pour prendre sa position »
2. « puis activer une fonction de rappel dans le tableau qui doit être exécuté lorsque AMP est prêt »

Cela fonctionne parce que la bibliothèque Shadow AMP, lors du chargement, réalisera qu'il y a déjà un tableau de rappels sous `window.AMP`, et traitera donc toute la file d'attente. Si vous exécutez à nouveau la même fonction plus tard, cela fonctionnera toujours, car Shadow AMP remplace `window.AMP` par lui-même et une méthode `push` personnalisée qui déclenche simplement le rappel immédiatement.

[tip type="tip"] **CONSEIL -** Pour rendre l'exemple de code ci-dessus pratique, nous vous recommandons de l'envelopper dans une promesse, puis de toujours utiliser ladite promesse avant de travailler avec l'API AMP. Consultez notre [code de démonstration React](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) à titre d'exemple. [/tip]

## Gérer la navigation dans votre application Web progressive

You’ll still need to implement this step manually. After all, it's up to you how you present links to content in your navigation concept. A number of lists? A bunch of cards?

Dans un scénario courant, vous récupérez du JSON qui renvoie des URL ordonnées avec certaines métadonnées. En fin de compte, vous devriez vous retrouver avec un rappel de fonction qui se déclenche lorsque l'utilisateur clique sur l'un des liens, et ledit rappel doit inclure l'URL de la page AMP demandée. Si vous avez cela, vous êtes prêt pour la dernière étape.

## Utiliser l'API Shadow AMP pour afficher une page intégrée

Finally, when you want to display content after a user action, it's time to fetch the relevant AMP document and let Shadow AMP take over. First, implement a function to fetch the page, similar to this one:

[sourcecode:javascript]
function fetchDocument(url) {

// unfortunately fetch() does not support retrieving documents,
// so we have to resort to good old XMLHttpRequest.
var xhr = new XMLHttpRequest();

return new Promise(function(resolve, reject) {
xhr.open('GET', url, true);
xhr.responseType = 'document';
xhr.setRequestHeader('Accept', 'text/html');
xhr.onload = function() {
// .responseXML contains a ready-to-use Document object
resolve(xhr.responseXML);
};
xhr.send();
});
}
[/sourcecode]

[tip type="important"] **IMPORTANT -** Pour simplifier l'exemple de code ci-dessus, nous avons ignoré la gestion des erreurs. Vous devez toujours vous assurer de détecter et de gérer les erreurs correctement. [/tip]

Maintenant que nous avons notre objet `Document` prêt à l'emploi, il est temps de laisser AMP prendre le relais et l'afficher. Obtenez une référence à l'élément DOM qui sert de conteneur pour le document AMP, puis appelez `AMP.attachShadowDoc()`, comme ceci:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
// Let AMP take over and render the page
var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] **CONSEIL -** Avant de remettre le document à AMP, c'est le moment idéal pour supprimer les éléments de page utiles lors de l'affichage de la page AMP en mode autonome, mais pas en mode intégré: par exemple, les pieds de page et les en-têtes. [/tip]

Et c'est tout! Votre page AMP s'affiche en tant que page enfant de votre application Web progressive globale.

## Nettoyez après vous

Il est fort probable que votre utilisateur naviguera d'une page AMP à une autre dans votre application Web progressive. Lorsque vous supprimez la dernière page AMP affichée, assurez-vous toujours d'en informer AMP, à l'aide du code suivant:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

Cela indiquera à AMP que vous n'utilisez plus ce document et libérera de l'espace dans la mémoire et le processeur.

## Voir en action

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Vous pouvez voir le modèle « AMP dans PWA » en action dans [l'exemple React](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) que nous avons créé. Il montre des transitions fluides pendant la navigation et vient avec un composant React simple qui enveloppe les étapes ci-dessus. C'est le juste milieu idéal: JavaScript flexible et personnalisé dans une application Web progressive et AMP pour piloter le contenu.

- Récupérez le code source ici: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- Utilisez le composant React de manière autonome via npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- Mettez-le en action ici: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (de préférence sur votre téléphone ou émulation mobile)

Vous pouvez également voir un exemple de PWA et AMP à l'aide du framework Polymer. L'exemple utilise [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) pour incorporer des pages AMP.

- Récupérez le code ici: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- Mettez-le en action ici: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)

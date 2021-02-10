---
'$title': Ajout de polices
$order: 6
description: 'Vous pouvez intégrer des polices personnalisées dans votre page AMP de deux manières : 1. Via une balise <link>: pour les fournisseurs de polices autorisés uniquement. 2. En utilisant ...'
---

Dans AMP, pour réduire au maximum les temps de chargement des documents, vous ne pouvez pas inclure de feuilles de style externes. Cependant, il existe une exception à cette règle : les **polices**.

Vous pouvez intégrer des polices personnalisées dans votre page AMP de deux manières :

1. Via une balise `<link>` : pour les fournisseurs de polices autorisés uniquement.
2. En utilisant la règle CSS `@font-face` : il n'y a pas de restrictions, toutes les polices sont autorisées.

Dans ce didacticiel, nous utiliserons une balise `<link>` pour ajouter des polices à notre page. **Ajoutez** un lien de feuille de style dans la section `<head>` pour demander la police Raleway :

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Raleway"
/>
```

Maintenant, **mettez à jour** votre sélecteur de `body` CSS pour inclure une référence à Raleway :

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**Actualisez** votre page et découvrez sa nouvelle apparence. Inspectez également la sortie du validateur AMP. Il ne devrait y avoir aucune erreur pour cette demande de feuille de style externe.

[tip type="note"] Les polices Web peuvent nuire aux performances d'un site Web, même sur un site AMP par ailleurs rapide. Utilisez la propriété CSS [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) pour optimiser le comportement de chargement de vos polices. [/tip]

Vous avez terminé votre article d'actualité AMP ! Voici à quoi il devrait ressembler :

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}

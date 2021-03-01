---
'$title': Rendre votre page visible
$order: 3
description: Il est nécessaire de configurer cette liaison bidirectionnelle afin que les moteurs de recherche comprennent la relation entre notre document canonique HTML standard et notre document AMP.
---

Maintenant que vous avez créé un article de presse dans AMP, assurons-nous que les utilisateurs peuvent trouver et découvrir votre contenu.

## Associer du contenu AMP

Votre site Web peut comprendre uniquement des pages AMP, quelques pages AMP ou aucune page AMP. Cette partie du tutoriel expliquera comment intégrer AMP dans la structure de votre site Internet.

La liaison canonique dans les pages HTML standard est une technique courante pour déclarer quelle page doit être considérée comme la page préférée lorsque plusieurs pages comportent le même contenu.

Une approche courante pour ajouter AMP à un site Web consiste à générer des versions AMP de pages HTML non AMP traditionnelles. Les deux versions ont généralement le même contenu (par exemple le texte d'un article) mais elles peuvent avoir des présentations différentes. Dans ce cas de figure, vous devez traiter les pages HTML traditionnelles comme des pages « canoniques » et associer les pages AMP à ces pages HTML.

Si vous le pouvez, utilisez AMP comme toute autre bibliothèque JavaScript pour créer votre site sans utiliser les liens canoniques. L'utilisation d'AMP pour créer un site Web complet réduit considérablement votre charge de maintenance.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Linking AMP content') }}

Pour les besoins de ce tutoriel, nous nous concentrerons sur le cas où vous avez une version AMP et une version non AMP d'une page. Dans ce tutoriel, notre site Internet comprend un article de presse contenant une page HTML non AMP (`article.html`) et une version AMP de la page (`article.amp.html`). Nous associerons ces pages via les balises `link`.

Nous avons déjà franchi la première étape pour y parvenir dans notre document AMP en incluant une balise link dans la section `<head>` pour retourner à la page canonique:

```html
<link rel="canonical" href="/article.html" />
```

L'étape suivante consiste à lier l'article canonique à la page AMP. Pour ce faire, il faut ajouter une balise `<link rel="amphtml">` dans la section `<head>` de l'article canonique.

Dans le fichier `article.html`, **ajoutez** le code suivant dans la section `<head>`:

```html
<link rel="amphtml" href="/article.amp.html" />
```

Le diagramme suivant illustre les directions des balises link:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Linking AMP content') }}

Il est nécessaire de configurer cette liaison bidirectionnelle afin que les moteurs de recherche comprennent la relation entre notre document canonique HTML standard et notre document AMP. Si aucun lien n'a été fourni, le robot d'exploration ne saura pas nécessairement quels articles sont les « versions AMP » des documents HTML standard. En fournissant explicitement ces liens, nous évitons toute ambiguïté!

## Ajouter des données structurées

Les pages AMP valides ne nécessitent pas de données structurées [schema.org](http://schema.org/), mais certaines plateformes telles que la recherche Google en ont besoin pour certaines expériences comme le carrousel Top stories. Il est généralement judicieux d'inclure des données structurées. Les données structurées aident les moteurs de recherche à mieux comprendre votre page Web et à mieux afficher votre contenu dans les pages de résultats des moteurs de recherche (par exemple, dans des extraits enrichis). Les données structurées sont incluses dans la balise `<head>` de votre page AMP via une balise de script de type `application/ld+json`.

Pour notre article de presse, **ajoutez** les données structurées suivantes au bas de la section `<head>` de votre document AMP:

```html
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://example.com/my-article.html"
    },
    "headline": "My First AMP Article",
    "image": {
      "@type": "ImageObject",
      "url": "https://example.com/article_thumbnail1.jpg",
      "height": 800,
      "width": 800
    },
    "datePublished": "2015-02-05T08:00:00+08:00",
    "dateModified": "2015-02-05T09:20:00+08:00",
    "author": {
      "@type": "Person",
      "name": "John Doe"
    },
    "publisher": {
      "@type": "Organization",
      "name": "⚡ AMP Times",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/amptimes_logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "description": "My first experience in an AMPlified world"
  }
</script>
```

[tip type="note"] **REMARQUE –** Le contenu doit toujours être le même. Pour les articles de presse, précisez le type « NewsArticle ». Le titre doit correspondre à celui de votre article. L'objet image fait référence à l'image d'affiche de l'article. [/tip]

**Rechargez** la page dans votre navigateur et vérifiez qu'aucune erreur de validation AMP n'a été introduite.

[tip type="note"] En plus du format de données structurées schema.org, il existe d'autres formats pris en charge par les moteurs de recherche et les réseaux sociaux. Consultez la documentation prise en charge:

- [Balises méta Twitter Cards](https://dev.twitter.com/cards/overview)
- [Balises méta Facebook Open Graph](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### Valider les données structurées

Pour vérifier que vos données structurées sont correctes, de nombreuses plateformes proposent des outils de validation. Dans ce tutoriel, nous validerons nos données structurées avec [l'outil de test des données structurées de Google](https://developers.google.com/structured-data/testing-tool/).

1. Dans une nouvelle fenêtre de navigateur, ouvrez [l'outil de test des données structurées de Google](https://developers.google.com/structured-data/testing-tool/).
2. Sélectionnez l'onglet **Extrait de code**.
3. Copiez et collez le code source complet de votre page AMP dans le panneau de l'éditeur de texte de l'outil de validation.
4. Cliquez sur **Exécuter le test**.

Si vos données structurées sont valides, vous devriez voir **0 erreur** et **0 avertissement**.

[tip type="read-on"] **LIRE –** Pour plus de détails sur la visibilité des pages, consultez le guide [Rendre votre page visible](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). [/tip]

Excellent! Vous avez terminé votre article de presse AMP.

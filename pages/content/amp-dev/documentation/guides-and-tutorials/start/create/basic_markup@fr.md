---
$title: Créer votre page AMP HTML
---

Le balisage suivant est un bon point de départ, un modèle standard.
Copiez et enregistrez ce qui suit dans un fichier .html.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Jusque là, le contenu dans le corps (body) est assez simple. Mais le code supplémentaire dans l'en-tête (head) de la page n'est peut-être pas aussi évident. Décomposons le balisage obligatoire.

## Balisage obligatoire

Les documents AMP HTML DOIVENT :

  - Commencer par le type du document `<!doctype html>`.
  - Contenir une balise `<html ⚡>` de niveau supérieur (`<html amp>` est également accepté).
  - Contenir les balises `<head>` et `<body>` (facultatives dans HTML).
  - Contenir une balise `<link rel="canonical" href="$SOME_URL">` dans l'en-tête qui pointe vers la version HTML standard du document AMP HTML ou vers le document lui-même si aucune version HTML n'existe.
  - Contenir une balise `<meta charset="utf-8">` comme premier enfant de la balise head.
  - Contenir une balise `<meta name="viewport" content="width=device-width,minimum-scale=1">` dans la balise head. Il est également recommandé d'inclure initial-scale=1.
  - Contenir une balise `<script async src="https://cdn.ampproject.org/v0.js"></script>` comme dernier élément de l'en-tête (inclut et charge la bibliothèque AMP JS).
  - Contenir ce qui suit dans la balise `<head>` :
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## Métadonnées facultatives

En plus des éléments de base, notre exemple inclut une définition Schema.org dans l'en-tête qui n'est pas une condition absolue pour AMP, mais une condition pour distribuer le contenu dans certains emplacements, par exemple, dans la [démonstration du carrousel d'actualités Google Search (essayez-la sur votre téléphone)](https://g.co/ampdemo).

Pour en savoir plus sur toutes les métadonnées nécessaires pour les divers autres emplacements, par exemple Twitter, [consultez nos exemples](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples). Pour en savoir plus sur AMP dans Google Search, voir [Le meilleur de l'actualité avec AMP](https://developers.google.com/structured-data/carousels/top-stories).

<hr>

Bonne nouvelle ! C'est tout ce dont nous avons besoin pour créer la première page AMP. Bien évidemment, le corps ne contient pas encore grand chose. Dans la prochaine section, nous découvrirons comment ajouter des objets de base (images et éléments AMP personnalisés), comment créer un style pour la page et comment définir une disposition réactive.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Précédent</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/include_image.md', locale=doc.locale).url.path}}"><span class="arrow-next">Prochain</span></a>
</div>

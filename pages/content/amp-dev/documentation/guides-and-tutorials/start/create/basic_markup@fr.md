---
'$title': Créer votre page AMP HTML
$order: 1
description: "Utilisation de HTTPS: lors de la création de pages et de contenu AMP, il est fortement recommandé d'utiliser le protocole HTTPS (par rapport à HTTP). Bien que HTTPS ne soit pas requis pour le document AMP lui-même ou ..."
author: pbakaus
contributors:
  - bpaduch
---

Le balisage suivant est un bon point de départ, un modèle standard. Copiez et enregistrez ce qui suit dans un fichier .html.

[sourcecode:html]

<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
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
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Jusque là, le contenu dans le corps (body) est assez simple. Mais le code supplémentaire dans l'en-tête (head) de la page n'est peut-être pas aussi évident. Décomposons le balisage obligatoire.

Utilisation de HTTPS: lors de la création de pages et de contenu AMP, il est fortement recommandé d'utiliser le protocole HTTPS (par rapport à HTTP). Bien que HTTPS ne soit pas requis pour le document AMP en soi ou pour les images et les polices, il existe de nombreuses fonctionnalités AMP qui nécessitent HTTPS (vidéos, iframes, etc.). Pour vous assurer que vos pages AMP tirent pleinement parti de toutes les fonctionnalités AMP, utilisez le protocole HTTPS. Vous pouvez en savoir plus sur HTTPS dans <a>«Pourquoi HTTPS est important»</a>.

[tip type="tip"] Utilisez le [générateur de modèles AMP](https://g.co/ampdemo) pour commencer rapidement à créer de nouvelles pages AMP. [/tip]

## Balisage obligatoire

Les documents HTML AMP DOIVENT:

| Règle                                                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commencer par le type de document `<!doctype html>`.                                                                                                                                                     | Standard pour HTML.                                                                                                                                                                                                                                                        |
| Contenir une balise `<html ⚡>` de niveau supérieur (`<html amp>` est également accepté).                                                                                                                | Identifie la page en tant que contenu AMP.                                                                                                                                                                                                                                 |
| Contenir les balises `<head>` et `<body>` (facultatives dans HTML).                                                                                                                                      | Facultatif pour HTML mais pas pour AMP.                                                                                                                                                                                                                                    |
| Contenir une balise `<meta charset="utf-8">` comme premier enfant de la balise head.                                                                                                                     | Identifie le codage de la page.                                                                                                                                                                                                                                            |
| Contenir une balise `<script async src="https://cdn.ampproject.org/v0.js"></script>` comme dernier élément de l'en-tête (inclut et charge la bibliothèque AMP JS).                                       | Inclut et charge la bibliothèque AMP JS.                                                                                                                                                                                                                                   |
| Contenir une balise `<link rel="canonical" href="$SOME_URL">` dans l'en-tête qui pointe vers la version HTML standard du document AMP HTML ou vers le document lui-même si aucune version HTML n'existe. | Pointe vers la version HTML standard du document HTML AMP ou vers lui-même si une telle version HTML n'existe pas. Pour en savoir plus, consultez la section [Rendre votre page détectable](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). |
| Contenir une balise `<meta name="viewport" content="width=device-width">` alement recommandé d'inclure initial-scale=1.                                                                                    | Spécifie une fenêtre réactive. Pour en savoir plus, consultez la section [Créer des pages AMP réactives](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).                                                                    |
| Contenir le [code du modèle AMP](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) dans la balise `<head>`.                                                                  | Modèle CSS pour masquer initialement le contenu jusqu'à ce que AMP JS soit chargé.                                                                                                                                                                                         |

## Métadonnées facultatives

Bonne nouvelle ! C'est tout ce dont nous avons besoin pour créer la première page AMP. Bien évidemment, le corps ne contient pas encore grand chose. Dans la prochaine section, nous découvrirons comment ajouter des objets de base (images et éléments AMP personnalisés), comment créer un style pour la page et comment définir une disposition réactive.

[tip type="read-on"]Consultez ces ressources pour en savoir plus:

- Premiers pas avec AMP dans la recherche Google: comment préparer vos pages AMP pour la recherche Google.
- [Exemples de métadonnées](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples) - en savoir plus sur toutes les métadonnées dont vous aurez besoin dans divers autres endroits (par exemple, Twitter) [/tip]

<hr>

Bonnes nouvelles! C'est tout ce dont nous avons besoin pour créer notre première page AMP, mais bien sûr, il ne se passe pas encore grand chose dans le corps. Dans la section suivante, nous verrons comment ajouter des éléments de base tels que des images, des éléments AMP personnalisés, comment ajouter des styles à votre page et élaborer une mise en page réactive.

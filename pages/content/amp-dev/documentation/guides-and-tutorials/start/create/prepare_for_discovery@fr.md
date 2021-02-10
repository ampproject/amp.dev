---
'$title': Préparer votre page pour la détection et la distribution
$order: 4
description: "Dans certains cas, vous pouvez avoir besoin de deux versions (AMP et non AMP) de la même page, par exemple un article d'actualités. Supposons ceci: si la recherche Google ..."
author: pbakaus
contributors:
  - bpaduch
---

Dans certains cas, vous pouvez avoir besoin de deux versions (non-AMP et AMP) de la même page. Par exemple, pour un article d'actualités. Supposons ceci : si la recherche Google trouve la version non-AMP de cette page, <em>comment sait-elle qu'il en existe également une version AMP</em>?

## Lier des pages avec <code><link></code>

Pour établir qu'une page non-AMP et une page AMP doivent être traitées comme étant "associées", nous ajoutons des informations de la page AMP à la page non-AMP et vice versa, sous la forme de balises `<link>` dans la section `<head>`.

Ajoutez ce qui suit sur la page non-AMP :

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Et ce qui suit sur la page AMP

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Que se passe-t-il si je n'ai qu'une seule page ?

Si vous n'avez qu'une seule page, et que cette page est une page AMP, vous devez tout de même lui ajouter le lien canonique, qui dans ce cas pointe simplement vers elle-même :

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **LIRE -** En savoir plus sur la façon dont Google trouve les pages AMP dans les [consignes de recherche Google pour les pages AMP](https://support.google.com/webmasters/answer/6340290). [/tip]

---
$title: Préparer votre page pour la détection et la distribution
---

Dans certains cas, vous pouvez avoir besoin de deux versions (non-AMP et AMP) de la même page. Par exemple, pour un article d'actualités. Supposons ce qui suit : Si Google Search trouve la version non-AMP de cette page, *comment sait-il qu'il en existe également une version AMP *?

## Relier les pages avec &lt;link>

Pour résoudre ce problème, nous ajoutons des informations sur la page AMP dans la page non-AMP et vice versa, sous forme de balises `<link>` dans `<head>`.

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

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Précédent</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/publish.md', locale=doc.locale).url.path}}"><span class="arrow-next">Prochain</span></a>
</div>

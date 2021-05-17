---
$title: Rendre votre page visible
---

Il peut arriver que vous souhaitiez avoir une version AMP et standard d'une même page, par exemple pour un article d'actualités. Posez-vous la question suivante : si la recherche Google trouve la version standard de cette page, comment savoir qu'il existe une version AMP de cette dernière ?

### Lier des pages avec `<link>`

Afin de résoudre ce problème, nous ajoutons des informations sur la page AMP dans la page standard et vice versa, sous la forme de balises `<link>` dans la section `<head>`.

Ajoutez ce qui suit à la page standard :

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Et ceci à la page AMP :

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Que faire si je n'ai qu'une seule page ?

Si vous n'avez qu'une seule page et qu'il s'agit d'une page AMP, vous devez tout de même y ajouter le lien canonique, qui redirigera alors simplement vers lui-même :

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## Intégrer des plates-formes tierces grâce à des métadonnées supplémentaires <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

Parfois, un site tiers (qui intègre votre page AMP ou comprend des liens vers cette dernière) ne peut se contenter de savoir que votre page est une page AMP. Il lui faut plus d'informations. Les questions qu'une plate-forme peut poser sur votre page sont par exemple "S'agit-il d'un article d'actualités ?", "Ou d'une vidéo ?" ou encore "Est-ce possible d'obtenir une capture d'écran et une courte description du contenu ?".

Cela n'est pas seulement valable pour les pages AMP, mais pour toutes les pages Web. Pour certaines plates-formes, ces métadonnées sont facultatives. Pour d'autres, elles sont obligatoires, ce qui signifie qu'elles **n'afficheront pas de liens vers votre contenu si vous n'incluez pas les bonnes métadonnées**. Assurez-vous d'inclure les métadonnées adéquates pour les plates-formes sur lesquelles vous souhaitez voir s'afficher votre contenu.

### Utiliser Schema.org pour la plupart des moteurs de recherche

[Schema.org](http://schema.org/) offre des vocabulaires ouverts permettant d'ajouter des métadonnées à toutes sortes de choses. Dans le cas de l'AMP, les propriétés adaptées au contexte comprennent le type de contenu spécifique (par exemple, "article d'actualités"), le titre, la date de publication et des images de prévisualisation associées.

Exemple :

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

Vous trouverez plus d'exemples dans le [dossier d'exemples ampproject](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples), y compris la syntaxe alternative pour l'attribut HTML.

Remarque : Cette définition de Schema.org est nécessaire pour que votre contenu puisse s'afficher dans la démonstration du [carrousel d'actualités de la recherche Google (essai sur mobile)](https://g.co/ampdemo).
Consultez également [Le meilleur de l'actualité avec AMP](https://developers.google.com/structured-data/carousels/top-stories) et l'[outil de test des données structurées](https://developers.google.com/structured-data/testing-tool/).

### Autres métadonnées pour encore plus de plates-formes

Consultez le guide [Social Discovery (Visibilité sur les réseaux sociaux)](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) sur le site Web Fundamentals (Principes fondamentaux du Web – en anglais) pour vous renseigner sur les différentes façons de préparer la visibilité et la diffusion de votre contenu.

---
$title: Inclure du contenu tiers
---

Découvrez comment inclure des composants tiers dans vos pages.

[TOC]

## Intégrer un tweet

Intégrez un tweet de Twitter dans votre page à l'aide de l'élément [`amp-twitter`](/docs/reference/components/amp-twitter.html).

Pour inclure un tweet dans votre page, incluez d'abord le script suivant dans la section `<head>` :

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Actuellement, les tweets sont automatiquement redimensionnés en fonction de la taille indiquée, mais ne s'affichent pas forcément de façon idéale.
Modifiez manuellement la largeur et la hauteur fournies ou utilisez l'attribut média pour sélectionner le format en fonction de la largeur de l'écran.

Exemple d'élément `amp-twitter` tiré de [twitter.amp](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html) :

<!-- embedded twitter example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.twitter.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Intégrer une publication Instagram

Intégrez une publication Instagram dans votre page à l'aide de l'élément [`amp-instagram`](/docs/reference/components/amp-instagram.html).

Pour inclure une publication Instagram, incluez d'abord le script suivant dans la section `<head>` :

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Incluez le code court d'Instagram figurant dans l'URL de la photo Instagram. Ainsi, dans `https://instagram.com/p/fBwFP`, `fBwFP` est le code court.
De plus, Instagram utilise un format fixe pour les mises en page responsives. Ainsi, les valeurs de largeur et de hauteur doivent être universelles.

<!-- embedded Instagram example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.instagram.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Afficher un post ou une vidéo Facebook

Affichez un post ou une vidéo Facebook dans votre page à l'aide de l'élément [`amp-facebook`](/docs/reference/components/amp-facebook.html).

Vous devez inclure le script suivant dans la section `<head>` :

Source: 
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
Avant-première:  
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### Exemple d'intégration d'une vidéo

Source: 
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
Avant-première: 
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>

## Inclure une vidéo YouTube

Incluez une vidéo YouTube dans votre page à l'aide de l'élément [`amp-youtube`](/docs/reference/components/amp-youtube.html).

Vous devez inclure le script suivant dans la section `<head>` :

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

L'élément `data-videoid` YouTube figure dans l'URL de chaque page de vidéo YouTube. Ainsi, dans `https://www.youtube.com/watch?v=Z1q71gFeRqM`, `Z1q71gFeRqM` représente l'identification vidéo.

Utilisez `layout="responsive"` pour obtenir une mise en page correcte des vidéos au format 16:9 :

<!-- embedded youtube example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Afficher une annonce

Affichez une annonce sur votre page à l'aide de l'élément [`amp-ad`](/docs/reference/components/amp-ad.html).
Seules les annonces diffusées via le protocole HTTPS sont acceptées.

Aucun code JavaScript fourni par un réseau publicitaire ne peut fonctionner dans un document AMP.
À la place, l'exécution AMP charge un iFrame d'une autre origine (via le bac à sable de l'iFrame) et exécute le JavaScript du réseau publicitaire dans ce bac à sable iFrame.

Vous devez préciser la largeur et la hauteur de l'annonce, et le type de réseau publicitaire.
Le `type` identifie le modèle de réseau publicitaire.
Des types d'annonces différents nécessitent des attributs `data-*` différents.

<!-- embedded ad example -->
<div>
<amp-iframe height="212"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Si le réseau publicitaire le permet, incluez un `placeholder` à afficher si aucune annonce n'est disponible :

<!-- embedded ad example -->
<div>
<amp-iframe height="232"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-placeholder.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

AMP accepte un large éventail de réseaux publicitaires. [Consultez la liste complète.](/docs/reference/components/amp-ad.html#supported-ad-networks)

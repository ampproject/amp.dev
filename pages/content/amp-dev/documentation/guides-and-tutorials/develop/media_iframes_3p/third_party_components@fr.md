---
$title: Inclure du contenu tiers
---

Découvrez comment inclure des composants tiers dans vos pages.

## Intégrer un tweet

Intégrez un tweet de Twitter dans votre page à l'aide de l'élément [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

Pour inclure un tweet dans votre page, incluez d'abord le script suivant dans la section `<head>` :

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://ampjs.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Actuellement, les tweets sont automatiquement redimensionnés en fonction de la taille indiquée, mais ne s'affichent pas forcément de façon idéale.
Modifiez manuellement la largeur et la hauteur fournies ou utilisez l'attribut média pour sélectionner le format en fonction de la largeur de l'écran.

Exemple d'élément [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) tiré de [twitter.amp](https://github.com/ampproject/amphtml/blob/main/examples/twitter.amp.html) :

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

## Intégrer une publication Instagram

Intégrez une publication Instagram dans votre page à l'aide de l'élément [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Pour inclure une publication Instagram, incluez d'abord le script suivant dans la section `<head>` :

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://ampjs.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Incluez le code court d'Instagram figurant dans l'URL de la photo Instagram. Ainsi, dans `https://instagram.com/p/fBwFP`, `fBwFP` est le code court.
De plus, Instagram utilise un format fixe pour les mises en page responsives. Ainsi, les valeurs de largeur et de hauteur doivent être universelles.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

## Afficher un post ou une vidéo Facebook

Affichez un post ou une vidéo Facebook dans votre page à l'aide de l'élément [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md).

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

Incluez une vidéo YouTube dans votre page à l'aide de l'élément [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

Vous devez inclure le script suivant dans la section `<head>` :

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

L'élément `data-videoid` YouTube figure dans l'URL de chaque page de vidéo YouTube. Ainsi, dans `https://www.youtube.com/watch?v=Z1q71gFeRqM`, `Z1q71gFeRqM` représente l'identification vidéo.

Utilisez `layout="responsive"` pour obtenir une mise en page correcte des vidéos au format 16:9 :

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

## Afficher une annonce

Affichez une annonce sur votre page à l'aide de l'élément [`amp-ad`](../../../../documentation/components/reference/amp-ad.md).
Seules les annonces diffusées via le protocole HTTPS sont acceptées.

Aucun code JavaScript fourni par un réseau publicitaire ne peut fonctionner dans un document AMP.
À la place, l'exécution AMP charge un iFrame d'une autre origine (via le bac à sable de l'iFrame) et exécute le JavaScript du réseau publicitaire dans ce bac à sable iFrame.

Vous devez préciser la largeur et la hauteur de l'annonce, et le type de réseau publicitaire.
Le `type` identifie le modèle de réseau publicitaire.
Des types d'annonces différents nécessitent des attributs `data-*` différents.

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
</amp-ad>
```
[/example]

Si le réseau publicitaire le permet, incluez un `placeholder` à afficher si aucune annonce n'est disponible :

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
  <div placeholder>Have a great day!</div>
</amp-ad>
```
[/example]

AMP accepte un large éventail de réseaux publicitaires. [Consultez la liste complète](../../../../documentation/components/reference/amp-ad.md#supported-ad-networks).

---
'$title': Images interactives avec les attributs srcset, sizes et heights
$order: 4
description: Utilisez l’attribut srcset pour contrôler les ressources d’un élément en fonction de différentes expressions multimédias. En particulier, utilisez-le pour toutes les balises amp-img afin de spécifier ...
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

## srcset

Utilisez l'attribut `srcset` pour contrôler les ressources d'un élément en fonction de différentes expressions multimédias. En particulier, utilisez-le pour toutes les balises [`amp-img`](../../../../documentation/components/reference/amp-img.md) afin de spécifier les éléments d'image à utiliser en fonction des différentes tailles d'écran. AMP générera automatiquement un attribut `sizes` <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img" data-md-type="link">qui répond à la définition HTML5 de tailles `sizes`</a> , pour toutes les balises `<img>` sous-jacentes de `<amp-img>` si `<amp-img>` a un attribut `srcset` mais pas d'attribut `sizes`.

Dans cet exemple simple, `srcset` spécifie l'image à utiliser en fonction de la largeur de l'écran. Le descripteur `w` indique au navigateur la largeur de chaque image de la liste:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
>
</amp-img>
```

[/example]

[tip type="note"] **REMARQUE –** AMP prend en charge srcset avec le descripteur `w`sur tous les navigateurs. [/tip]

Plus détails sur la création d'images interactives à l'aide de `srcset` dans la section [Utilisation d'images interactives (maintenant)](http://alistapart.com/article/using-responsive-images-now).

## sizes

Vous pouvez également utiliser l'attribut facultatif `sizes` d'AMP avec `srcset`. L'attribut `sizes` d'AMP décrit comment calculer la taille de l'élément en fonction d'une expression multimédia quelconque. <strong data-md-type="raw_html">La définition de `sizes` sur n'importe quel élément AMP obligera AMP à définir un style intégré pour la largeur de cet élément en fonction de la requête multimédia correspondante.</strong> En fonction de la taille calculée de l'élément, l'agent utilisateur sélectionne la source la plus proche fournie par l'attribut `srcset`.

Prenons l'exemple suivant:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw"
>
</amp-img>
```

[/example]

L'attribut `sizes` définit la largeur de l'élément comme étant égale à 50% de la taille de la fenêtre lorsque la fenêtre fait 650 pixels ou plus. Par exemple, si la fenêtre est de 800 px, la largeur de l'élément est définie sur 400 px. Le navigateur sélectionne ensuite la ressource `srcset` liée à 400px, en supposant que le ratio de pixels du périphérique est de 1, ce qui correspond dans ce cas à `hummingbird-narrow.jpg` (320px).

[tip type="important"] **IMPORTANT –** Lorsque l'attribut de taille est spécifiée en même temps que la largeur et la hauteur, la mise en page est définie par défaut sur `responsive`. [/tip]

Plus de détails sur [l'attribut `sizes` d'AMP ici](../../../../documentation/guides-and-tutorials/learn/common_attributes.md).

## heights

Tous les éléments AMP personnalisés qui permettent une mise en page `responsive` prennent également en charge l'attribut `heights`. La valeur de cet attribut est une expression de tailles basée sur les expressions multimédias comme dans le cas de l'attribut [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), mais avec deux différences essentielles :

1. Il s'applique à la hauteur et non à la largeur de l'élément.
2. Les valeurs en pourcentage sont autorisées, par exemple `86%`. Si une valeur en pourcentage est utilisée, elle indique le pourcentage de la largeur de l'élément.

Lorsque l'attribut `heights` est spécifié avec `width` et `height`, l'élément `layout` est défini par défaut sur `responsive`.

Exemple:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

[/example]

Dans cet exemple, la hauteur de l'élément par défaut sera de 80% de la largeur, mais pour une fenêtre plus large que `500px`, elle sera limitée à `200px`.

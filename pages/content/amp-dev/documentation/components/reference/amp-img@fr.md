---
$category@: media
formats:
- websites
- email
- ads
- stories
teaser:
  text: Remplacer la balise d'image HTML5.
---


<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

# amp-img

<table>
  <tr>
    <td class="col-fourty"><strong>Description</strong></td>
    <td>Remplacement de la balise <code>img</code> HTML géré par l'environnement d'exécution.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Mises en page compatibles</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-img/">exemple de composant amp-img</a> sur AMP By Example.</td>
  </tr>
</table>


# Comportement

L'environnement d'exécution peut différer le chargement des ressources ou le traiter en priorité en fonction de la position de la fenêtre d'affichage, des ressources système, de la bande passante de connexion ou d'autres facteurs. Le composant `amp-img` permet à l'environnement d'exécution de gérer efficacement les ressources d'image de cette manière.

Le composant `amp-img`, à l'instar de toutes les ressources AMP récupérées en externe, doit se voir attribuer au préalable une taille explicite (avec les attributs `width`/`height`), de sorte que les proportions puissent être déterminées sans qu'il faille récupérer l'image. Le comportement de la mise en page est déterminé par l'attribut `layout`.

[tip type="read-on"]
Pour en savoir plus sur les mises en page, consultez la spécification [AMP HTML Layout System](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md) et la section [Mises en page compatibles](https://www.ampproject.org/docs/guides/responsive/control_layout.html#the-layout-attribute).
[/tip]

# Exemple : Affichage d'une image responsive

Dans l'exemple suivant, l'image affichée répond à la taille de la fenêtre d'affichage en définissant `layout=responsive`.  L'image est étirée et réduite en fonction des proportions spécifiées par les attributs `width` et `height`.

<div>
  <amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Plus" overflow="" tabindex="0" role="button">Afficher l'intégralité du code</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

[tip type="read-on"]
Pour en savoir plus sur les pages AMP responsives, consultez le guide [Créer des pages AMP responsives](https://www.ampproject.org/docs/guides/responsive/responsive_design.html).
[/tip]

En cas d'échec de chargement de la ressource demandée par le composant `amp-img`, l'espace est vide, sauf si un élément enfant [`fallback`](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md#fallback) est fourni. Une création de remplacement n'est exécutée que sur la mise en page initiale et aucune création de ce type n'est affectée aux modifications ultérieures de l'attribut src (à l'aide de resize + srcset, par exemple) pour des raisons de performances.

# Exemple : Spécifier une image de remplacement

Dans l'exemple suivant, si le navigateur n'est pas compatible avec WebP, l'image JPG de remplacement est affichée :

<div>
  <amp-iframe height="271" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fallback.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Plus" overflow="" tabindex="0" role="button">Afficher l'intégralité du code</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

Vous pouvez définir une couleur d'arrière-plan pour l'espace réservé ou un autre élément visuel en utilisant le sélecteur CSS et en appliquant un style à l'élément proprement dit.

D'autres caractéristiques d'image, comme des légendes, peuvent être mises en œuvre avec le code HTML standard (`figure` et `figcaption`, par exemple).

[tip type="read-on"]
Pour en savoir plus sur l'utilisation du composant `amp-img`, consultez les ressources suivantes :

* [Espaces réservés et créations de remplacement](https://www.ampproject.org/docs/design/responsive/placeholders)
* [Inclure des images et des vidéos](https://www.ampproject.org/docs/media/amp_replacements)
[/tip]

# Attributs

**src**

Cet attribut est semblable à l'attribut `src` sur la balise `img`. La valeur doit être une URL qui pointe vers un fichier image pouvant être mis en cache. Les fournisseurs de cache peuvent réécrire ces URL lors de l'intégration de fichiers AMP pour les faire pointer vers une version en cache de l'image.

**srcset**

Identique à l'attribut `srcset` sur la balise `img`. Pour les navigateurs qui ne sont pas compatibles avec `srcset`, `<amp-img>` utilise par défaut `src`. Si seulement `srcset` est fourni, mais pas `src`, la première URL de l'attribut `srcset` est sélectionnée.

**sizes**

Identique à l'attribut `sizes` dans la balise `img`.

[tip type="read-on"]
Consultez la section [Images responsives avec les attributs srcset, sizes et heights](https://www.ampproject.org/docs/design/responsive/art_direction) pour en savoir plus sur l'utilisation des attributs `sizes` et `srcset`.
[/tip]

**alt**

Chaîne de texte de substitution, semblable à l'attribut `alt` dans la balise `img`.

**attribution**

Chaîne indiquant l'attribution de l'image. Par exemple, `attribution="CC courtesy of Cats on Flicker"`

**height** et **width**

Taille explicite de l'image utilisée par l'exécution AMP pour déterminer les proportions sans récupérer l'image.

**common attributes**

Cet élément comprend des [attributs communs](https://www.ampproject.org/docs/reference/common_attributes) étendus aux composants AMP.

# Application d'un style

Un style peut être appliqué directement au composant `amp-img` par le biais de propriétés CSS. Ainsi, il est possible de définir un espace réservé avec un arrière-plan gris en utilisant le code suivant :

```css
amp-img {
  background-color: grey;
  }
```

# Conseils et astuces

# Agrandir une image jusqu'à la largeur maximale

Si vous souhaitez que l'image soit agrandie à mesure que la fenêtre est redimensionnée, sans toutefois dépasser une largeur maximale, procédez comme suit :

1. Définissez `layout=responsive` pour `<amp-img>`.
1. Sur le conteneur de l'image, spécifiez l'attribut CSS `max-width:<max width to display image>`.  Pourquoi spécifier cet attribut sur le conteneur ?  Un élément `amp-img` avec `layout=responsive` est un élément *au niveau du bloc*, tandis que `<img>` est un élément *intégré*. Vous pouvez également définir `display: inline-block` dans votre code CSS pour l'élément amp-img.

# Différence entre les mises en page "responsive" et "intrinsic"

Les mises en page `responsive` et `intrinsic` créent une image qui est agrandie automatiquement.  La principale différence réside dans le fait que la mise en page `intrinsic` utilise une image SVG comme élément de mise à l'échelle.  Elle se comporte de la même manière qu'une image HTML standard, tout en conservant un avantage non négligeable, à savoir que le navigateur connaît la taille d'image sur la mise en page initiale. La mise en page `intrinsic` possède une taille intrinsèque et augmente la taille d'une balise `div` flottante jusqu'à ce qu'elle atteigne la taille d'image naturelle ou une contrainte CSS telle que la `max-width`. La mise en page `responsive` affiche 0x0 dans une balise `div` flottante, car sa taille provient du parent, lequel n'a pas de taille naturelle lorsqu'il est flottant.

# Définir une image de taille fixe

Pour que votre image soit affichée à une taille fixe, procédez comme suit :

1. Définissez `layout=fixed` pour `<amp-img>`.
1. Spécifiez les attributs `width` et `height`.

[tip type="read-on"]
En savoir plus sur la [mise en page déduite](https://www.ampproject.org/docs/design/responsive/control_layout#what-if-the-layout-attribute-isn%E2%80%99t-specified?) si vous ne spécifiez pas l'attribut `layout`
[/tip]

# Définir les proportions

Dans le cas des images responsives, les attributs `width` et `height` ne doivent pas nécessairement correspondre à la largeur et à la hauteur exactes du composant `amp-img`. Ces valeurs doivent simplement générer les mêmes proportions.

Par exemple, au lieu de spécifier `width="900"` et `height="675"`, vous pouvez simplement indiquer `width="1.33"` et `height="1"`.

<div>
  <amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.aspectratio.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Plus" overflow="" tabindex="0" role="button">Afficher l'intégralité du code</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Définir plusieurs fichiers sources pour différentes résolutions d'écran

L'attribut [`srcset`](#attributes) doit être utilisé pour fournir différentes résolutions de la même image, ayant toutes les mêmes proportions. Le navigateur choisit automatiquement le fichier le plus approprié à partir de l'attribut `srcset` en fonction de la résolution d'écran et de la largeur d'écran de l'appareil de l'utilisateur.

En revanche, l'attribut [`media`](https://www.ampproject.org/docs/reference/common_attributes#media) affiche ou masque les composants AMP et doit être utilisé lors de la conception de mises en page responsives. Pour afficher des images avec des proportions différentes, vous devez utiliser plusieurs composants `<amp-img>`, chacun avec un attribut `media` correspondant aux largeurs d'écran auxquelles chaque instance doit être affichée.

Pour plus d'informations, consultez le guide sur la [création de pages AMP responsives](https://www.ampproject.org/docs/design/responsive/responsive_design#displaying-responsive-images).

# Conserver les proportions des images de dimensions inconnues

Le système de mise en page AMP doit connaître les proportions d'une image avant de la récupérer. Toutefois, dans certains cas, il se peut que vous ne connaissiez pas les dimensions de l'image. Pour afficher des images de dimensions inconnues et conserver les proportions, associez la mise en page [`fill`](https://www.ampproject.org/docs/design/responsive/control_layout#the-layout-attribute) d'AMP à la propriété CSS [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/). Pour en savoir plus, consultez la page [How to support images with unknown dimensions](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions) sur AMP By Example.

# Validation

Consultez les [règles relatives à amp-img](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) dans les spécifications du validateur AMP.

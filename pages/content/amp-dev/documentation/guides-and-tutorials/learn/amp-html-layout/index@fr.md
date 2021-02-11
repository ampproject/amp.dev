---
'$title': Système de mise en page AMPHTML
$order: 1
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: 'Présentation '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

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

## Présentation

L'objectif principal du système de mise en page est de garantir que les éléments AMP peuvent exprimer leur mise en page afin que le moteur d'exécution puisse déduire le dimensionnement des éléments avant que les ressources distantes, telles que JavaScript et les appels de données, ne soient terminées. Cela est important car cela réduit considérablement le rendu et améliore le défilement.

Dans cet esprit, le système de mise en page AMP est conçu pour prendre en charge des mises en page peu nombreuses mais flexibles qui offrent de bonnes garanties de performances. Ce système repose sur un ensemble d'attributs tels que `layout`, `width`, `height`, `sizes` et `heights` pour exprimer les besoins de mise en page et de dimensionnement de l'élément.

## Comportement <a name="behavior"></a>

Un élément AMP non conteneur (p. ex., `layout != container`) démarre dans le mode non résolu/non construit dans lequel tous ses enfants sont masqués à l’exception d’un caractère de remplacement (voir l'attribut `placeholder`). La charge utile de JavaScript et de données nécessaire à la construction complète de l’élément peut encore être en téléchargement et en cours d’initialisation, mais l’exécution AMP sait déjà comment dimensionner et disposer l’élément en s’appuyant uniquement sur les classes CSS et les attributs `layout`, `width`, `height` et `media`. Dans la plupart des cas, un caractère de remplacement `placeholder`, s’il est spécifié, est dimensionné et positionné pour prendre tout l’espace de l’élément.

Le `placeholder` est masqué dès que l'élément est créé et que sa première mise en page est terminée. À ce stade, l'élément doit avoir tous ses enfants correctement construits et positionnés et prêts à être affichés et à accepter l'entrée d'un lecteur. Ceci constitue le comportement par défaut. Chaque élément peut remplacer, par exemple, masquer le `placeholder` plus rapidement ou le conserver plus longtemps.

L’élément est dimensionné et affiché en fonction des attributs `layout`, `width`, `height` et `media` par le runtime. Toutes les règles de mise en page sont implémentées via CSS en interne. L’élément est considéré comme de « taille définie » si sa taille peut être déduite des styles CSS et ne change pas en fonction de ses enfants : disponibles immédiatement ou insérés dynamiquement. Cela ne signifie pas que la taille de cet élément ne peut pas changer. La mise en page peut être entièrement réactive comme c’est le cas avec les mises en page `responsive`, `fixed-height`, `fill` et `flex-item`. Cela signifie simplement que la taille ne change pas sans une action explicite de l'utilisateur, par exemple lors de l'affichage, du défilement ou du téléchargement de la publication.

Si l'élément n'a pas été configuré correctement dans PROD, il ne sera pas du tout affiché et en mode DEV, le runtime affichera l'élément avec état d'erreur. Les erreurs possibles incluent des valeurs invalides ou non prises en charge des attributs `layout`, `width` et `height`.

## Attributs de mise en page <a name="layout-attributes"></a>

### `width` et `height` <a name="width-and-height"></a>

En fonction de la valeur de l'attribut `layout`, les éléments du composant AMP doivent avoir un attribut `width` et `height` qui contient une valeur de pixel entière. Le comportement de mise en page réel est déterminé par l'attribut `layout` comme décrit ci-dessous.

Dans quelques cas, si l'attribut `width` ou `height` n'est pas spécifié, le runtime AMP peut définir ces valeurs par défaut comme suit :

- `amp-pixel` : `width` et `height` sont réglés par défaut sur 0.
- `amp-audio` : les valeurs par défaut de `width` et `height` sont déduites du navigateur.

### `layout` <a name="layout"></a>

AMP fournit un ensemble de mises en page qui spécifient le comportement d'un composant AMP dans la mise en page du document. Vous pouvez spécifier une mise en page pour un composant en ajoutant l'attribut `layout` avec l'une des valeurs spécifiées dans le tableau ci-dessous.

**Exemple** : une image adaptative simple, où la largeur et la hauteur sont utilisées pour déterminer le rapport hauteur/largeur.

[sourcecode:html]
<amp-img
src="/img/amp.jpg"
width="1080"
height="610"
layout="responsive"
alt="an image"

> </amp-img>
> [/sourcecode]

Valeurs prises en charge pour l'attribut `layout` :

<table>
  <thead>
    <tr>
      <th width="30%">Valeur</th>
      <th>Comportement et exigences</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Absente</td>
      <td>Si aucune valeur n'est spécifiée, la mise en page du composant est déduite comme suit : <ul> <li>Si l'attribut <code>height</code> est présent et que <code>width</code> est absent ou défini sur <code>auto</code>, une mise en page <code>fixed-height</code> est supposée.</li> <li>Si <code>width</code> et <code>height</code> sont présents avec un attribut <code>sizes</code> ou <code>heights</code>, une mise en page <code>responsive</code> est supposé.</li> <li>Si <code>width</code> et <code>height</code> sont présents, une mise en page <code>fixed</code> est supposée.</li> <li>Si <code>width</code> et <code>height</code> sont absents, une mise en page <code>container</code> est supposée.</li> </ul>
</td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>L'élément laisse ses enfants définir sa taille, un peu comme un <code>div</code> HTML normal. Le composant est supposé ne pas avoir de mise en page spécifique mais uniquement agir comme un conteneur ; ses enfants sont rendus immédiatement.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>L'élément prend l'espace dont il dispose, à la fois en largeur et en hauteur. En d'autres termes, la mise en page et la taille d'un élément <code>fill</code> correspondent à son parent. Pour qu'un élément remplisse son conteneur parent, spécifiez la mise en page "fill" et assurez-vous que le conteneur parent spécifie <code>position:relative</code> ou <code>position:absolute</code>.</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>L'élément a une largeur et une hauteur fixes sans prise en charge de la réactivité. Les attributs <code>width</code> et <code>height</code> doivent être présents. Les seules exceptions sont les composants <code>amp-pixel</code> et <code>amp-audio</code>.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>L'élément prend l'espace dont il dispose mais garde la hauteur inchangée. Cette mise en page fonctionne bien pour des éléments tels que <code>amp-carousel</code> qui impliquent un contenu positionné horizontalement. L'attribut <code>height</code> doit être présent. L'attribut <code>width</code> ne doit pas être présent ou doit être égal à <code>auto</code>.</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>L'élément et les autres éléments de son parent avec le type de mise en page <code>flex-item</code> prennent l'espace restant du conteneur parent lorsque le parent est un conteneur flexible (<code>display: flex</code>). Les attributs <code>width</code> et <code>height</code> ne sont pas obligatoires.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>L'élément prend l'espace dont il dispose et redimensionne automatiquement sa hauteur au rapport hauteur/largeur donné par les attributs <code>width</code> et <code>height</code> <em>jusqu'à</em> ce qu'il atteigne la taille d'élément définie par les attributs width et height transmis à <code>amp-img</code>, ou atteigne une contrainte CSS, telle que max-width. Les attributs width et height doivent être présents. Cette mise en page fonctionne très bien pour la plupart des éléments AMP, y compris <code>amp-img</code>, <code>amp-carousel</code>, etc. L'espace disponible dépend de l'élément parent et peut également être personnalisé à l'aide du CSS <code>max-width</code>. Cette mise en page diffère de <code>responsive</code> par sa hauteur et sa largeur intrinsèques. Cela est plus évident dans un élément flottant où une mise en page <code>responsive</code> rendra 0x0 et une mise en page <code>intrinsic</code> gonflera jusqu'à la plus petite valeur de sa taille naturelle ou de toute contrainte CSS.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>L'élément n'est pas affiché et n'occupe aucun espace sur l'écran comme si son style d'affichage était <code>none</code>. Cette mise en page peut être appliquée à chaque élément AMP. On suppose que l'élément peut s'afficher selon l'action de l'utilisateur (par exemple, <code>amp-lightbox</code>). Les attributs <code>width</code> et <code>height</code> ne sont pas obligatoires.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>L’élément prend l’espace disponible et redimensionne automatiquement sa hauteur au rapport d’aspect donné par les attributs <code>width</code> et <code>height</code>. Cette mise en page fonctionne très bien pour la plupart des éléments AMP, y compris <code>amp-img</code>, <code>amp-video</code>, etc. L’espace disponible dépend de l’élément parent et peut également être personnalisé à l’aide du CSS <code>max-width</code>. Les attributs <code>width</code> et <code>height</code> doivent être présents.<p><strong>Remarque</strong> : les éléments avec <code>"layout=responsive"</code> n’ont pas de taille intrinsèque. La taille de l’élément est déterminée à partir de son élément conteneur. Pour garantir que votre élément AMP s’affiche, vous devez spécifier une largeur et une hauteur pour l’élément contenant. Ne spécifiez pas <code>"display:table"</code> sur l’élément contenant, car cela remplace l’affichage de l’élément AMP, et rend l’élément AMP invisible.</p>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

Tous les éléments AMP qui prennent en charge la mise en page `responsive` prennent également en charge l’attribut `sizes`. La valeur de cet attribut est une expression de tailles décrite dans [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), mais étendue à tous les éléments, pas seulement aux images. En bref, l’attribut `sizes` décrit comment la largeur de l’élément est calculée en fonction des conditions du média.

Lorsque l'attribut `sizes` est spécifié avec les attributs `width` et `height`, l'attribut `layout` est défini par défaut sur `responsive`.

**Exemple** : utilisation de l'attribut `sizes`

Dans l'exemple suivant, si la fenêtre est plus large que `320px`, l'image aura une largeur de 320px, sinon elle aura une largeur de 100vw (100 % de la largeur de la fenêtre).

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"

> </amp-img>
> [/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

L'attribut `sizes` définira un style intégré `width` sur l'élément. Lors de l'association de `disable-inline-width` avec `sizes`, l'élément AMP propage la valeur `sizes` vers la balise sous-jacente de l'élément, comme avec `img` imbriqué dans un `amp-img`, **sans** définir la valeur de `width` intégrée comme `sizes` le fait généralement dans AMP.

**Exemple** : utilisation de l'attribut `disable-inline-width`

Dans l'exemple suivant, la largeur de l'élément `<amp-img>` n'est pas affectée et l'attribut `sizes` n'est utilisé que pour sélectionner l'une des sources du `srcset`.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"
disable-inline-width

> </amp-img>
> [/sourcecode]

### `heights` <a name="heights"></a>

Tous les éléments AMP qui prennent en charge la mise en page `responsive` prennent également en charge l'attribut `heights`. La valeur de cet attribut est une expression des tailles basée sur des expressions de média similaires à l'attribut [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), mais avec deux différences clés :

1. Elle s'applique à la hauteur et non à la largeur de l'élément.
2. Les valeurs en pourcentage sont autorisées, par exemple `86%`. Si une valeur de pourcentage est utilisée, elle indique le pourcentage de la largeur de l'élément.

Lorsque l'attribut `heights` est spécifié avec `width` et `height`, `layout` est défini par défaut sur `responsive`.

**Exemple** : utilisation de l'attribut `heights`

Dans l'exemple suivant, la hauteur de l'image sera fixée par défaut à 80 % de la largeur, mais si la fenêtre est plus large que `500px`, la hauteur sera limitée à `200px`. Étant donné que l'attribut `heights` est spécifié avec `width` et `height`, la mise en page sera par défaut `responsive`.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="320"
height="256"
heights="(min-width:500px) 200px, 80%"

> </amp-img>
> [/sourcecode]

### `media` <a name="media"></a>

La plupart des éléments AMP prennent en charge l'attribut `media`. La valeur de `media` est une requête multimédia. Si la requête ne correspond pas, l'élément n'est pas du tout rendu, et ses ressources et éventuellement les ressources de ses enfants ne seront pas récupérées. Si la fenêtre du navigateur change de taille ou d'orientation, les requêtes média sont réévaluées et les éléments sont masqués et affichés en fonction des nouveaux résultats.

**Exemple** : utilisation de l'attribut `media`

Dans l'exemple suivant, nous avons 2 images avec des requêtes médias mutuellement exclusives. En fonction de la largeur de l'écran, l'une des deux images sera récupérée et rendue. L'attribut `media` est disponible sur tous les éléments AMP, il peut donc être utilisé avec des éléments non illustrés, tels que des annonces.

[sourcecode:html]
<amp-img
media="(min-width: 650px)"
src="wide.jpg"
width="466"
height="355"
layout="responsive"

> </amp-img>
> <amp-img
>   media="(max-width: 649px)"
>   src="narrow.jpg"
>   width="527"
>   height="193"
>   layout="responsive"
> </amp-img>
> [/sourcecode]

### `placeholder` <a name="placeholder"></a>

L'attribut `placeholder` peut être défini sur n'importe quel élément HTML, pas uniquement sur les éléments AMP. L'attribut `placeholder` indique que l'élément marqué avec cet attribut agit comme un caractère de remplacement pour l'élément AMP parent. S'il est spécifié, un élément d'espace réservé doit être un enfant direct de l'élément AMP. Par défaut, l'espace réservé est immédiatement affiché pour l'élément AMP, même si les ressources de l'élément AMP n'ont pas été téléchargées ou initialisées. Une fois prêt, l'élément AMP masque généralement son espace réservé et affiche le contenu. Le comportement exact par rapport à l'espace réservé dépend de l'implémentation de l'élément.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
<amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

L'attribut `fallback` peut être défini sur n'importe quel élément HTML, pas uniquement sur les éléments AMP. Une solution de secours est une convention qui permet à l'élément de communiquer au lecteur que le navigateur ne prend pas en charge l'élément. S'il est spécifié, un élément de secours doit être un enfant direct de l'élément AMP. Le comportement exact de l'élément de secours dépend de l'implémentation de l'élément.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">

  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

L'attribut `noloading` indique si l'indicateur de chargement doit être désactivé pour cet élément. De nombreux éléments AMP sont autorisés à afficher un indicateur de chargement, qui est une animation de base indiquant que l'élément n'est pas encore complètement chargé. Les éléments peuvent désactiver ce comportement en ajoutant cet attribut.

## (tl;dr) Résumé des exigences et des comportements de mise en page <a name="tldr-summary-of-layout-requirements--behaviors"></a>

Le tableau suivant décrit les paramètres acceptables, les classes CSS et les styles utilisés pour l'attribut `layout`. Notez que :

1. Toute classe CSS marquée avec le préfixe `-amp-` et tout élément avec le préfixe `i-amp-` sont considérés comme internes à AMP et leur utilisation dans les feuilles de style des utilisateurs n'est pas autorisée. Ils sont présentés ici simplement à titre informatif.
2. Même si `width` et `height` sont spécifiés dans le tableau selon les besoins, les règles par défaut peuvent s'appliquer comme c'est le cas avec `amp-pixel` et `amp-audio`.

<table>
  <thead>
    <tr>
      <th width="21%">Mise en page</th>
      <th width="20%">Largeur/ <br> hauteur requise ?</th>
      <th width="20%">Définit la taille ?</th>
      <th width="20%">Éléments supplémentaires</th>
      <th width="19%">Affichage CSS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>Non</td>
      <td>Non</td>
      <td>Non</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Non</td>
      <td>Oui, la taille des parents.</td>
      <td>Non</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Oui</td>
      <td>Oui, spécifié par <code>width</code> et <code>height</code>.</td>
      <td>Non</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>
<code>height</code> seulement ; <code>width</code> peut être <code>auto</code>
</td>
      <td>Oui, spécifié par le conteneur parent et <code>height</code>.</td>
      <td>Non</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Non</td>
      <td>Non</td>
      <td>Oui, en fonction du conteneur parent.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Oui</td>
      <td>Oui, en fonction du conteneur parent et du rapport largeur/hauteur <code>width:height</code>.</td>
      <td>Oui, <code>i-amphtml-sizer</code>.</td>
      <td>
<code>block</code> (se comporte comme un <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow">élément remplacé</a>)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Non</td>
      <td>Non</td>
      <td>Non</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Oui</td>
      <td>Oui, en fonction du conteneur parent et du rapport largeur/hauteur <code>width:height</code>.</td>
      <td>Oui, <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>

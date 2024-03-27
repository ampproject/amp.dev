---
$title: amp-carousel
$category@: layout
teaser:
  text: Afficher plusieurs éléments de contenu similaires le long d'un axe horizontal.
---

<!--
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



Carrousel générique permettant d'afficher plusieurs éléments de contenu similaires le long d'un axe horizontal. Ce composant a été conçu pour offrir une flexibilité et des performances élevées.

<table>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-carousel" src="https://ampjs.org/v0/amp-carousel-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>
      <ul>
        <li>carrousel : fixed, fixed-height et nodisplay.</li>
        <li>diapositives : fill, fixed, fixed-height, flex-item, nodisplay et responsive.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemples</strong></td>
    <td>AMP By Example :<ul>
      <li><a href="https://ampbyexample.com/components/amp-carousel/">Exemple de composant amp-carrousel</a></li>
      <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/">Galeries d'images avec amp-carousel</a></li></ul></td>
    </tr>
  </table>

# Comportement <a name="behavior"></a>

Chacun des éléments enfants immédiats du composant `amp-carousel` est considéré comme un élément du carrousel. Chacun de ces nœuds peut également comporter des éléments enfants HTML arbitraires.

Le carrousel se compose d'un nombre arbitraire d'éléments, ainsi que de flèches de navigation facultatives permettant d'avancer ou de reculer d'un seul élément.

Le carrousel change d'élément lorsque l'utilisateur balaie l'écran, utilise les touches fléchées ou clique sur une flèche de navigation facultative.

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel width="450"
  height="300">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]

# Accéder à une diapositive spécifique <a name="advancing-to-a-specific-slide"></a>

Si vous définissez une méthode pour l'attribut `on` d'un élément sur `tap:carousel-id.goToSlide(index=N)`, le carrousel ayant l'identifiant "carousel-id" passe à la diapositive suivante à index=N lorsque l'utilisateur appuie ou clique sur un élément (la première diapositive se situe à index=0, la deuxième à index=1 et ainsi de suite).

L'exemple suivant illustre un carrousel de trois images, sous lequel sont disposés des boutons d'aperçu. Lorsqu'un utilisateur clique sur l'un des boutons, l'élément de carrousel correspondant s'affiche.

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel id="carousel-with-preview"
    width="450"
    height="300"
    layout="responsive"
    type="slides">
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="apples"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="lemons"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="blueberries"></amp-img>
  </amp-carousel>
  <div class="carousel-preview">
    <button on="tap:carousel-with-preview.goToSlide(index=0)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
        width="60"
        height="40"
        alt="apples"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=1)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
        width="60"
        height="40"
        alt="lemons"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=2)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
        width="60"
        height="40"
        alt="blueberries"></amp-img>
    </button>
  </div>
```
[/example]

# Attributs <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type</strong></td>
    <td>Indique le type d'affichage des éléments du carrousel :
      <ul>
        <li><code>carousel</code> (type par défaut) : toutes les diapositives sont affichées et l'utilisateur peut les faire défiler horizontalement. Ce type n'accepte que les mises en page suivantes : <code>fixed</code>, <code>fixed-height</code> et <code>nodisplay</code>.</li>
        <li><code>slides</code> : affiche une seule diapositive à la fois. Ce type accepte les mises en page suivantes : <code>fill</code>, <code>fixed</code>, <code>fixed-height</code>, <code>flex-item</code>, <code>nodisplay</code> et <code>responsive</code>.</li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>height (obligatoire)</strong></td>
      <td>Indique la hauteur du carrousel, en pixels.</td>
    </tr>
    <tr>
      <td width="40%"><strong>controls (facultatif)</strong></td>
      <td>Affiche les flèches gauche et droite de manière permanente pour permettre à l'utilisateur de parcourir les éléments du carrousel sur des appareils mobiles.
          Par défaut, les flèches de navigation disparaissent au bout de quelques secondes sur l'écran du mobile.
          La visibilité des flèches peut également être contrôlée en appliquant un style, et une requête média peut être utilisée pour n'afficher les flèches qu'à certaines largeurs d'écran. Sur un ordinateur, les flèches sont toujours affichées, sauf si un seul élément enfant est présent.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-next-button-aria-label (facultatif)</strong></td>
        <td>Définit le libellé ARIA du bouton <code>amp-carousel-button-next</code>. Si aucune valeur n'est indiquée, le libellé ARIA est défini par défaut sur "Next item in carousel" (Élément suivant dans le carrousel).</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-prev-button-aria-label (facultatif)</strong></td>
        <td>Définit le libellé ARIA du bouton <code>amp-carousel-button-prev</code>. Si aucune valeur n'est indiquée, le libellé ARIA est défini par défaut sur "Previous item in carousel" (Élément précédent dans le carrousel).</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-button-count-format (facultatif)</strong></td>
        <td>Chaîne de format sous la forme <code>(%s of %s)</code>, utilisée comme suffixe du libellé ARIA pour <code>amp-carousel-button-next</code>/<code>amp-carousel-button-prev</code>. Cet attribut fournit aux utilisateurs d'un lecteur d'écran des informations sur leur progression dans le carrousel. Si aucune valeur n'est indiquée, la valeur par défaut est "(%s of %s)".</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay (facultatif)</strong></td>
        <td>Passe à la diapositive suivante sans intervention de l'utilisateur.<br>
          Si cet attribut est renseigné sans valeur :
          <ul>
            <li>Par défaut, le carrousel change de diapositive toutes les 5 000 millisecondes (5 secondes) ; cet intervalle peut être modifié à l'aide de l'attribut <code>delay</code>.</li>
            <li>Le cas échéant, l'attribut <code>loop</code> est associé à <code>amp-carousel</code>.</li>
            <li>Au moins deux diapositives sont nécessaires pour que la lecture automatique puisse avoir lieu.</li>
            <li>L'attribut s'applique uniquement aux carrousels dont le paramètre est <code>type=slides</code>.</li>
          </ul>
          Si cet attribut est renseigné avec une valeur :
          <ul>
            <li>Le cas échéant, l'attribut <code>loop</code> est associé à <code>amp-carousel</code>.</li>
            <li>L'attribut <code>loop</code> est supprimé une fois que le nombre requis de boucles a été effectué.</li>
          </ul></td>
        </tr>
        <tr>
          <td width="40%"><strong>delay (facultatif)</strong></td>
          <td>Définit le délai avant le passage à la diapositive suivante, en millisecondes, lorsque l'attribut <code>autoplay</code> est activé. L'attribut <code>delay</code> s'applique uniquement aux carrousels dont le paramètre est <code>type=slides</code>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop (facultatif)</strong></td>
          <td>Permet à l'utilisateur d'aller au-delà du premier ou du dernier élément. Le carrousel doit contenir au moins trois diapositives pour que la lecture en boucle soit effectuée. L'attribut <code>loop</code> s'applique uniquement aux carrousels dont le paramètre est <code>type=slides</code>.
            <em>Exemple : Affiche un carrousel de diapositives avec les attributs "controls", "looping" et "autoplay" différé.</em>

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel type="slides"
  width="450"
  height="300"
  controls
  loop
  {% if not format=='email'%}  autoplay
  delay="3000"{% endif %}
  data-next-button-aria-label="Go to next slide"
  data-previous-button-aria-label="Go to previous slide">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]</td>
          </tr>
          <tr>
            <td width="40%"><strong>common attributes</strong></td>
            <td>Cet élément inclut des <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributs communs</a> étendus aux composants AMP.</td>
          </tr>
        </table>

# Application d'un style <a name="styling"></a>

* Vous pouvez utiliser le sélecteur d'éléments `amp-carousel` pour appliquer un style librement.
* Vous pouvez utiliser le sélecteur de classes `.amp-carousel-slide` pour cibler des éléments du carrousel.
* L'état visuel d'un bouton `amp-carousel` désactivé est masqué.
* Par défaut, `.amp-carousel-button` utilise une image SVG intégrée comme image de fond pour les boutons. Vous pouvez remplacer cette image par votre propre image ou fichier SVG, comme dans l'exemple ci-dessous.

*Exemple : Image SVG intégrée `.amp-carousel-button` par défaut*

```css
.amp-carousel-button-prev {
  left: 16px;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" fill="#fff" /></svg>');
}
```

*Exemple : Remplacement de l'image SVG intégrée `.amp-carousel-button` par défaut*

```css
.amp-carousel-button-prev {
  left: 5%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="#fff" /></svg>');
}
```

# Validation <a name="validation"></a>

Consultez les [règles relatives à amp-carousel](https://github.com/ampproject/amphtml/blob/main/extensions/amp-carousel/validator-amp-carousel.protoascii) dans les spécifications du validateur AMP.

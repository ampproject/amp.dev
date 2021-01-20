---
$title: amp-selector
$category@: dynamic-content
teaser:
  text: Représente une commande qui affiche un menu d'options et permet à l'utilisateur d'y effectuer une sélection.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



Ce composant représente une commande qui affiche un menu d'options et permet à l'utilisateur d'y effectuer une sélection.

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>Toutes</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-selector/">exemple de composant amp-selector</a> sur AMP By Example.</td>
  </tr>
</table>


## Comportement <a name="behavior"></a>

Le sélecteur AMP est une commande qui présente une liste dans laquelle l'utilisateur peut choisir une ou plusieurs options. Le contenu des options ne se limite pas simplement à du texte.

* Un élément `amp-selector` peut contenir des éléments HTML ou des composants AMP arbitraires (`amp-carousel`, `amp-img`, etc.).
* Un élément `amp-selector` ne peut pas contenir de commandes `amp-selector` imbriquées.
* Vous pouvez définir les options que l'utilisateur peut sélectionner en ajoutant l'attribut `option` à l'élément et en attribuant ensuite une valeur à l'attribut (`<li option='value'></li>`, par exemple).
* Vous pouvez définir les options désactivées en ajoutant l'attribut `disabled` à l'élément (`<li option='d' disabled></li>`, par exemple).
* Vous pouvez définir les options présélectionnées en ajoutant l'attribut `selected` à l'élément (`<li option='b' selected></li>`, par exemple).
* Pour autoriser les sélections multiples, ajoutez l'attribut `multiple` à l'élément `amp-selector`.  Par défaut, `amp-selector` autorise une seule sélection à la fois.
* Pour désactiver l'intégralité de l'élément `amp-selector`, ajoutez-y l'attribut `disabled```.
* Lorsqu'un élément `amp-selector` placé dans une balise `form` contient un attribut `name`, il se comporte comme un groupe de cases à cocher ou de cases d'option, et envoie les valeurs sélectionnées (c'est-à-dire celles qui sont attribuées à l'option) par rapport au nom de l'élément `amp-selector` si un événement d'envoi est effectué sur le formulaire.

Exemple :

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">Aucune des options ci-dessus</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>

<p><amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## Effacer les sélections <a name="clearing-selections"></a>

Pour effacer toutes les sélections lorsque l'utilisateur clique ou appuie sur un élément, définissez l'attribut d'action [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) sur l'élément en question et spécifiez ensuite l'`id` du sélecteur AMP avec la méthode d'action `clear`.

Exemple :

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="[tip type="success"]
Regardez les démos sur [AMP By Example](https://ampbyexample.com/components/amp-selector/).
[/tip]

## Attributs <a name="attributes"></a>

### Attributs sur `<amp-selector>` <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled, form, multiple, name</strong></td>
    <td>Les attributs ci-dessus se comportent de la même manière qu'avec un code HTML standard <code>select</code> element [](https://developer.mozilla.org/en/docs/Web/HTML/Element/select).</td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td>L'attribut <code>keyboard-select-mode</code> détermine le mode de navigation au clavier pour les options placées entre <code>amp-selector</code>.

    <ul><li><code>none</code> (valeur par défaut) : la touche de tabulation permet de basculer entre les éléments placés entre <code>amp-selector</code>. L'utilisateur doit appuyer sur la touche "Entrée" ou sur la barre d'espace pour modifier la sélection. Les touches fléchées sont désactivées.</li>
    <li><code>focus</code> : la touche de tabulation active l'élément entre <code>amp-selector</code>. L'utilisateur parcourt les différents éléments à l'aide des touches fléchées. Il doit appuyer sur la touche "Entrée" ou sur la barre d'espace pour modifier la sélection.</li>
    <li><code>select</code> : la touche de tabulation active l'élément entre <code>amp-selector</code>. La sélection change à mesure que l'utilisateur parcourt les différentes options à l'aide des touches fléchées. </li></ul></td>
    </tr>
    </table>

### Attributs sur les options `<amp-selector>` <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>Indique que l'option peut être sélectionnée.  Si une valeur est spécifiée, son contenu est envoyé avec le formulaire.</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled, selected</strong></td>
    <td>Les attributs ci-dessus se comportent de la même manière qu'avec un code HTML standard [<code>option</code>] élément (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option).
    </td>
  </tr>
</table>

## Événements <a name="events"></a>

Les événements peuvent déclencher des actions sur d'autres composants AMP à l'aide de l'attribut `on`.
Par exemple : `on="select: my-tab.show"`

En savoir plus sur les [actions et événements AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td><code>amp-selector</code> déclenche l'événement <code>select</code> lorsque l'utilisateur sélectionne une option.
        Les sélecteurs multiples et les sélecteurs uniques déclenchent cet événement lorsque l'utilisateur sélectionne ou désélectionne des options.
        L'événement <code>select</code> n'est pas déclenché lorsque l'utilisateur appuie sur des options désactivées.
        <ul>
        <li>
        <code>event.targetOption</code> contient la valeur d'attribut <code>option</code> de l'élément sélectionné.</li>
          <li>
            <code>event.selectedOptions</code>  contient un tableau des valeurs d'attribut <code>option</code> pour tous les éléments sélectionnés.
          </li>
        </ul></td>
      </tr>

    </table>

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-selector](https://github.com/ampproject/amphtml/blob/master/extensions/amp-selector/validator-amp-selector.protoascii) dans les spécifications du validateur AMP.

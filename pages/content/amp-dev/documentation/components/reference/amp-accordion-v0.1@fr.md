---
$title: amp-accordion
$category@: layout
teaser:
  text: Permettre aux internautes d'avoir un aperçu du contenu et d'accéder directement à la section de leur choix.
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



Ce composant permet aux internautes d'avoir un aperçu du contenu et d'accéder directement à la section de leur choix. Cette fonctionnalité s'avère particulièrement utile pour les appareils mobiles sur lesquels l'utilisateur doit faire défiler ne serait-ce que quelques phrases d'une section.

<table>
  <tr>
    <td class="col-fourty"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>container</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-accordion/">Exemple de code annoté pour amp-accordion</a></td>
  </tr>
</table>


## Comportement <a name="behavior"></a>

Le composant `amp-accordion` vous permet d'afficher des sections de contenu qui peuvent être réduites et développées. Chaque élément enfant immédiat du composant `amp-accordion` est considéré comme une section de l'accordéon. Chacun de ces nœuds doit être une balise `<section>`.

* Un composant `amp-accordion` peut contenir un ou plusieurs éléments `<section>` en tant qu'éléments enfants directs.
* Chaque élément `<section>` doit contenir exactement deux enfants directs.
* Le premier élément enfant (de la section) représente le titre de la section et doit être un élément de titre (`h1`, `h2`, ..., `h6`, `header`).
* Le deuxième élément enfant (de la section) peut être n'importe quelle balise autorisée dans AMP HTML et représente le contenu de la section.
* Cliquer ou appuyer sur le titre d'une section a pour effet de développer ou de réduire cette dernière.
* L'état réduit/développé de chaque section de l'élément `amp-accordion` est conservé pour le niveau de session. Pour désactiver la conservation de cet état, ajoutez l'attribut `disable-session-states` à l'élément `amp-accordion`.

#### Exemple : Affichage d'un accordéon <a name="example-displaying-an-accordion"></a>

Trois sections sont affichées dans cet exemple. La troisième section est développée lors du chargement de la page.  Nous avons, en outre, désactivé la conservation de l'état réduit/développé en définissant l'attribut `disable-session-states`.

[example preview="inline" playground="true" imports="amp-accordion"]
```html
<amp-accordion{% if not format=='email'%} disable-session-states{% endif %}>
  <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section expanded>
    <h2>Section 3</h2>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"></amp-img>
  </section>
</amp-accordion>
```
[/example]

[tip type="success"]
Pour regarder d'autres démos du composant `amp-accordion`, rendez-vous sur [AMP By Example](https://ampbyexample.com/components/amp-accordion/).
[/tip]

### Événements <a name="events"></a>

Les événements ci-dessous sont déclenchés sur les éléments `section` de `accordion`.

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Cet événement est déclenché sur la <code>section</code> cible qui passe de l'état "réduit" à l'état "développé". Notez que cet événement n'est pas déclenché lorsque l'action <code>expand</code> est appelée sur une <code>section</code> déjà développée.</td>
  </tr>
  <tr>
    <td width="40%"><strong><strong><code>collapse</code></strong></strong></td>
    <td>Cet événement est déclenché sur la <code>section</code> cible qui passe de l'état "développé" à l'état "réduit". Notez que cet événement n'est pas déclenché lorsque l'action <code>collapse</code> est appelée sur une <code>section</code> déjà réduite.</td>
  </tr>
</table>

### Actions <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Cet événement est déclenché sur la <code>section</code> cible qui passe de l'état "réduit" à l'état "développé". Notez que cet événement n'est pas déclenché lorsque l'action <code>expand</code> est appelée sur une <code>section</code> déjà développée.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>toggle</code></strong></td>
    <td>Cette action permet de basculer entre les états "réduit" et "développé du composant <code>amp-accordion</code>. Lorsqu'elle est appelée sans arguments, cette action active/désactive toutes les sections de l'accordéon. Une seule section peut être spécifiée avec l'argument <code>section</code> et l'identifiant (<code>id</code>) correspondant comme valeur.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Cette action développe un composant <code>amp-accordion</code>. Si le composant est déjà développé, il reste dans cet état. Lorsqu'elle est appelée sans arguments, cette action développe toutes les sections de l'accordéon. Une seule section peut être spécifiée avec l'argument <code>section</code> et l'identifiant (`id`) correspondant comme valeur.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>Cette action réduit un composant <code>amp-accordion</code>. Si le composant est déjà réduit, il reste dans cet état. Lorsqu'elle est appelée sans arguments, cette action réduit toutes les sections de l'accordéon. Une seule section peut être spécifiée avec l'argument <code>section</code> et l'identifiant (<code>id</code>) correspondant comme valeur.</td>
  </tr>
</table>

#### Attributs <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong><code>animate</code></strong></td>
    <td>Définissez cet attribut sur le composant <code>&lt;amp-accordion&gt;</code> pour animer le développement et la réduction de toutes les sections de l'accordéon.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>disable-session-states</code></strong></td>
    <td>Définissez cet attribut sur l'élément <code>&lt;amp-accordion&gt;</code> pour désactiver la conservation de l'état réduit/développé de l'accordéon.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expanded</code></strong></td>
    <td>Définissez cet attribut sur une <code>&lt;section&gt;</code> pour afficher la section dans l'état développé lors du chargement de la page.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand-single-section</code></strong></td>
    <td>Définissez cet attribut sur l'élément <code>&lt;amp-accordion&gt;</code> pour n'autoriser le développement que d'une seule <code>&lt;section&gt;</code>à la fois. Si l'utilisateur sélectionne une seule <code>&lt;section&gt;</code>, toute autre <code>&lt;section&gt;</code> développée précédemment est réduite.</td>
  </tr>
</table>

## Application d'un style <a name="styling"></a>

* Vous pouvez utiliser le sélecteur d'élément `amp-accordion` pour appliquer un style librement.
* Les éléments `amp-accordion` sont toujours `display: block`.
* Les éléments `<section>`, titre et contenu ne peuvent pas être flottants.
* Lorsque la section est développée, l'attribut `expanded` est associé à l'élément `<section>`.
* Un "clearfix" est appliqué à l'élément de contenu avec la propriété `overflow: hidden` et, par conséquent, il ne peut pas contenir de barres de défilement.
* Les marges des éléments `<amp-accordion>`, `<section>`, titre et contenu sont définies sur 0, et peuvent être remplacées dans des styles personnalisés.
* Les éléments de titre et de contenu ont tous deux la propriété `position: relative`.

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-accordion](https://github.com/ampproject/amphtml/blob/master/extensions/amp-accordion/validator-amp-accordion.protoascii) dans les spécifications du validateur AMP.

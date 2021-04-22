---
$title: amp-bind
$category@: dynamic-content
teaser:
  text: Autoriser la mutation des éléments en réponse aux actions de l'utilisateur ou à des modifications de données au moyen de la liaison de données et de simples expressions de type JS.
---



Ce composant ajoute une interactivité personnalisée en utilisant la liaison de données et des expressions.


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


<table>
  <tr>
    <td class="col-fourty"><strong>Script requis</strong></td>
    <td>
      <div>
            <code>&lt;script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js">&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">Exemple de code d'introduction avec annotations</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Exemple de carrousels d'images liés avec annotations</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">Exemple de page de produit d'e-commerce avec annotations</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Didacticiels</strong></td>
    <td><a href="../../../documentation/guides-and-tutorials/develop/interactivity/index.md">Créer des pages AMP interactives</a></td>
  </tr>
</table>

# Aperçu <a name="overview"></a>

Le composant `amp-bind` vous permet d'ajouter une interactivité avec état personnalisée à vos pages AMP au moyen de la liaison de données et d'expressions de type JS.

<figure class="alignment-wrapper  margin-">
  <amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
  <figcaption>Regardez cette vidéo pour découvrir le composant amp-bind.</figcaption></figure>

# Exemple simple <a name="a-simple-example"></a>

Dans l'exemple suivant, le fait d'appuyer sur le bouton remplace le texte "Hello World" de l'élément `<p>` par "Hello amp-bind".

```html

<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>
```

[tip type="note"]
Pour des raisons de performances et pour éviter un saut de contenu inattendu, `amp-bind` n'évalue pas les expressions lors du chargement de la page. Cela signifie que les éléments visuels doivent être associés à un état par défaut et qu'il ne faut pas utiliser `amp-bind` pour l'affichage initial.
[/tip]

### Comment cela fonctionne-t-il ? <a name="how-does-it-work"></a>

`amp-bind` comprend trois composants principaux :

1. [State](#state) : état JSON mutable à l'échelle du document. Dans l'exemple ci-dessus, l'état est vide avant que l'utilisateur appuie sur le bouton.  Une fois le bouton enfoncé, l'état devient `{foo: 'amp-bind'}`.
2. [Expressions](#expressions) : expressions de type JavaScript pouvant faire référence à l'**état**. L'exemple ci-dessus contient une seule expression, `'Hello ' + foo`, qui concatène le littéral de chaîne `'Hello '` et la variable d'état `foo`.
Le nombre d'opérandes pouvant être utilisés dans une expression est limité à 100.
3. [Bindings](#bindings) : attributs spéciaux sous la forme `[property]` qui associent la propriété d'un élément à une **expression**. L'exemple ci-dessus comporte une seule liaison, `[text]`, qui met à jour le texte de l'élément `<p>` chaque fois que la valeur de l'expression change.

`amp-bind` veille tout particulièrement à garantir la vitesse, la sécurité et les performances sur les pages AMP.

### Voici un exemple un peu plus complexe <a name="a-slightly-more-complex-example"></a>

```html
<!-- Store complex nested JSON data in <amp-state> elements. -->
<amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">Ceci est un chien.</p>

<!-- CSS classes can also be added or removed with [class]. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  Chaque animal a une couleur de fond différente.
</p>

<!-- Or change an image's src with the [src] binding. -->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<button on="tap:AMP.setState({currentAnimal: 'cat'})">Set to Cat</button>
```

  Lorsque l'on appuie sur le bouton :

  1. L'**état** est mis à jour avec l'attribut `currentAnimal` défini sur `'cat'`.
  1. Les **expressions** qui dépendent de `currentAnimal` sont évaluées :

    * `'This is a ' + currentAnimal + '.'` =&gt; `'This is a cat.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

  1. Les **liaisons** qui dépendent des expressions modifiées sont mises à jour :

    * Le texte du premier élément `<p>` sera "This is a cat."
    * L'attribut `class` du deuxième élément `<p>` sera "redBackground".
    * L'élément `amp-img` affichera l'image d'un chat.</li>

  [tip type="success"]
[Regardez la **démo**](https://ampbyexample.com/components/amp-bind/) de cet exemple avec des annotations de code.
[/tip]

# Détails <a name="details"></a>

# État <a name="state"></a>

Chaque document AMP qui utilise le composant `amp-bind` comprend des données JSON mutables à l'échelle du document, désignées sous le nom d'**état**.

# Initialisation de l'état avec `amp-state` <a name="initializing-state-with-amp-state"></a>

L'état d'`amp-bind` peut être initialisé avec le composant `amp-state` :

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
    }
  </script>
</amp-state>
```

Les [expressions](#expressions) peuvent faire référence à des variables d'état via la syntaxe à points. Dans cet exemple, `myState.foo` est évalué sur `"bar"`.

* La taille maximale du fichier JSON enfant d'un élément `<amp-state>` est de 100 Ko.
* Un élément `<amp-state>` peut également spécifier une URL CORS au lieu d'un script JSON enfant. Pour plus d'informations, reportez-vous à l'[Annexe](#amp-state-specification).

# Actualisation de l'état <a name="refreshing-state"></a>

L'action `refresh` est compatible avec ce composant. Elle peut être utilisée pour actualiser le contenu de l'état.

```html
<amp-state id="amp-state" ...></amp-state>
<!-- Clicking the button will refresh and refetch the json in amp-state. -->
<button on="tap:amp-state.refresh"></button>
```

# Mise à jour de l'état avec `AMP.setState()` <a name="updating-state-with-ampsetstate"></a>

L'action [`AMP.setState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) fusionne un littéral d'objet dans l'état. Par exemple, lorsque l'on appuie sur le bouton ci-dessous, `AMP.setState()` [effectue une fusion profonde](#deep-merge-with-ampsetstate) du littéral d'objet avec l'état.

```html
<!-- Like JavaScript, you can reference existing
    variables in the values of the  object literal. -->
<button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```

En règle générale, la profondeur de fusion maximale des objets imbriqués est de 10 niveaux. Toutes les variables, y compris celles introduites par `amp-state`, peuvent être remplacées.

Lorsqu'elle est déclenchée par certains événements, l'action `AMP.setState()` peut également accéder aux données relatives aux événements sur la propriété `event`.

```html
<!-- The "change" event of this <input> element contains
      a "value" variable that can be referenced via "event.value". -->
<input type="range" on="change:AMP.setState({myRangeValue: event.value})">
```

# Modification de l'historique avec `AMP.pushState()` <a name="modifying-history-with-amppushstate"></a>

L'action [`AMP.pushState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) est semblable à `AMP.setState()`, si ce n'est qu'elle envoie une nouvelle entrée dans la pile d'historique du navigateur. Faire apparaître cette entrée d'historique (en revenant en arrière, par exemple) a pour effet de rétablir la valeur précédente des variables définie par `AMP.pushState()`.

Exemple :
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* En appuyant sur le bouton, vous définissez la variable `foo` sur 123 et envoyez une nouvelle entrée d'historique.
* En revenant en arrière, vous redéfinissez la variable `foo` sur sa valeur antérieure, à savoir "bar" (ce qui revient à appeler `AMP.setState({foo: 'bar'})`.

# Expressions <a name="expressions"></a>

Les expressions sont semblables à JavaScript, avec toutefois quelques différences importantes.

# Différences par rapport à JavaScript <a name="differences-from-javascript"></a>

* Les expressions peuvent uniquement accéder à l'[état](#state) du document conteneur.
* Les expressions n'ont **pas** accès à des données globales telles que `window` ou `document`.
* Seuls les opérateurs et les [fonctions sur liste blanche](#allow-listed-functions) peuvent être utilisés.
* En règle générale, les fonctions, classes et boucles personnalisées ne sont pas autorisées. Les fonctions fléchées sont autorisées en tant que paramètres ; `Array.prototype.map`, par exemple.
* Les variables non définies et les exceptions array-index-out-of-bounds renvoient la valeur `null` au lieu de renvoyer `undefined` ou de générer des erreurs.
* Une expression unique est actuellement limitée à 50 opérandes afin d'optimiser les performances. N'hésitez pas à [nous contacter](https://github.com/ampproject/amphtml/issues/new) si cela s'avère insuffisant dans votre cas.

Pour consulter toute la mise en œuvre et la grammaire complète de l'expression, reportez-vous aux pages [bind-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expr-impl.jison) et [bind-expression.js](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expression.js).

# Exemples <a name="examples"></a>

Toutes les expressions suivantes sont valides :

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# Fonctions sur liste blanche <a name="allow-listed-functions"></a>

<table>
  <tr>
    <th>Type d'objet </th>
    <th>Fonction(s)</th>
    <th>Exemple</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>Tableau</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code> (not-in-place)<br>
      <code>splice</code> (not-in-place)<br>
    </td>
    <td>
      <pre>// Returns [1, 2, 3].
          [3, 2, 1].sort()</pre>
        <pre>// Returns [1, 3, 5].
            [1, 2, 3].map((x, i) =&gt; x + i)</pre>
          <pre>// Returns 6.
              [1, 2, 3].reduce((x, y) =&gt; x + y)</pre>
          </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>Nombre</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            <td>
            <pre>// Returns 3.
                (3.14).toFixed()</pre>
              <pre>// Returns '3.14'.
                  (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>Chaîne</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// Returns 'abcdef'.
                      abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>Fonctions mathématiques</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// Returns 1.
                          abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Objet</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        <td>
                        <pre>// Returns ['a', 'b'].
                            keys({a: 1, b: 2})</pre>
                          <pre>// Returns [1, 2].
                              values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects"><code>Global</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// Returns 'Hello%20world'.
                                encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>

<sup>1</sup> Les fonctions fléchées à un seul paramètre ne peuvent pas contenir de parenthèses. Utilisez, par exemple, `x => x + 1` au lieu de `(x) => x + 1`. En outre, `sort()` et `splice()` renvoient des copies modifiées au lieu de s'exécuter sur place.
<sup>2</sup> Les fonctions statiques sont dépourvues d'espace de noms ; utilisez, par exemple, `abs(-1)` au lieu de `Math.abs(-1)`.

# Définir des macros avec `amp-bind-macro` <a name="defining-macros-with-amp-bind-macro"></a>

Les fragments d'expression `amp-bind` peuvent être réutilisés en définissant un élément `amp-bind-macro`. L'élément `amp-bind-macro` vous permet de définir une expression qui utilise zéro ou plusieurs arguments et fait référence à l'état actuel. Une macro peut être appelée comme une fonction en référençant sa valeur d'attribut `id` depuis n'importe quel point du document.

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro>

<div>
  L'aire du cercle est de <span [text]="circleArea(myCircle.radius)">0</span>.
</div>

```

Une macro peut également en appeler d'autres qui sont <i>définies avant elle</i>. En revanche, elle ne peut pas s'appeler de manière récursive.

# Liaisons <a name="bindings"></a>

Une **liaison** est un attribut spécial sous la forme `[property]` qui associe la propriété d'un élément à une [expression](#expressions). Une autre syntaxe compatible avec XML peut également être utilisée sous la forme `data-amp-bind-property`.

Lorsque l'**état** change, les expressions sont réévaluées et les propriétés des éléments liés sont mises à jour avec les nouveaux résultats d'expression.

`amp-bind` accepte les liaisons de données sur quatre types d'état d'élément :

<table>
  <tr>
    <th>Type</th>
    <th>Attribut(s)</th>
    <th>Détails</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/fr/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>Compatible avec la plupart des éléments textuels.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/class">Classes CSS</a></td>
    <td><code>[class]</code></td>
    <td>Le résultat de l'expression doit être une chaîne délimitée par des espaces.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/hidden">Attribut <code>hidden</code></a></td>
    <td><code>[hidden]</code></td>
    <td>Il doit s'agir d'une expression booléenne.</td>
  </tr>
  <tr>
    <td>Taille des <a href="../../../documentation/components/index.html">éléments AMP</a></td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>Modifie la largeur et/ou la hauteur de l'élément AMP.</td>
  </tr>
  <tr>
    <td>Attributs spécifiques aux éléments</td>
    <td><a href="#element-specific-attributes">Divers</a></td>
    <td></td>
  </tr>
</table>

Remarques sur les liaisons :

* Pour des raisons de sécurité, la liaison vers `innerHTML` n'est pas autorisée.
* Les valeurs qui présentent un risque sont effacées de toutes les liaisons d'attribut (`javascript:`, par exemple).
* Les résultats des expressions booléennes font varier les attributs booléens. Prenons l'exemple de `<amp-video [controls]="expr"...>`. Lorsque `expr` est défini sur `true`, l'attribut `controls` est associé à l'élément `<amp-video>`. Lorsque `expr` est défini sur `false`, l'attribut `controls` est supprimé.
* L'utilisation de crochets (`[` et `]`) dans les noms d'attribut peut poser problème lors de la rédaction de code XML (XHTML, JSX, etc.) ou de l'écriture d'attributs au moyen d'API DOM. Dans ce cas, utilisez la syntaxe `data-amp-bind-x="foo"` au lieu de `[x]="foo"`.

# Attributs spécifiques aux éléments <a name="element-specific-attributes"></a>

Seule la liaison aux composants et attributs suivants est autorisée :

<table>
  <tr>
    <th>Élément</th>
    <th>Attribut(s)</th>
    <th>Comportement</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">Modifie la vidéo Brightcove affichée.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code><sup>*</sup></td>
    <td>Modifie l'index des diapositives en cours d'affichage. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Voir un exemple</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>
      Définit la date la plus ancienne pouvant être sélectionnée.<br>
      Définit la date la plus proche pouvant être sélectionnée.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-google-document-embed&gt;</code></td>
    <td><code>[src]</code><br><code>[title]</code></td>
    <td>Affiche le document au niveau de l'URL mise à jour.<br>Modifie le titre du document.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-iframe&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Modifie l'URL source de l'iFrame.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-img&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
    <td>En cas de liaison à <code>[src]</code>, veillez également à lier <code>[srcset]</code> pour que la liaison fonctionne sur le cache.<br>Voir les <a href="amp-img.md#attributes">attributs amp-img</a> correspondants.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-lightbox&gt;</code></td>
    <td><code>[open]</code><sup>*</sup></td>
    <td>
      Active/désactive l'affichage du mode Lightbox. Conseil : Utilisez <code>on="lightboxClose: AMP.setState(...)"</code> pour mettre à jour les variables lorsque le mode Lightbox est désactivé.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-list&gt;</code></td>
    <td><code>[src]</code></td>
    <td>
      Si l'expression est une chaîne, cet élément récupère et affiche le code JSON depuis l'URL de la chaîne.
      Si l'expression est un objet ou un tableau, cet élément affiche les données d'expression.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-selector&gt;</code></td>
    <td><code>[selected]</code><sup>*</sup><br><code>[disabled]</code></td>
    <td>Modifie le ou les éléments enfants sélectionnés<br>qui sont identifiés par leurs valeurs d'attribut <code>option</code>. Une liste de valeurs séparées par des virgules est acceptée pour sélectionner plusieurs éléments. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Voir un exemple</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-state&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Récupère le code JSON de la nouvelle URL et le fusionne dans l'état existant. <em>Notez que la mise à jour suivante ignorera les éléments <code>&lt;amp-state&gt;</code> afin d'éviter les cycles.</em></td>
  </tr>
  <tr>
    <td><code>&lt;amp-video&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
    <td>Voir les <a href="amp-video.md#attributes">attributs amp-video</a> correspondants.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-youtube&gt;</code></td>
    <td><code>[data-videoid]</code></td>
    <td>Change la vidéo YouTube affichée.</td>
  </tr>
  <tr>
    <td><code>&lt;a&gt;</code></td>
    <td><code>[href]</code></td>
    <td>Modifie le lien.</td>
  </tr>
  <tr>
    <td><code>&lt;button&gt;</code></td>
    <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
    <td>Voir les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/button#Attributes">attributs button</a> correspondants.</td>
  </tr>
  <tr>
    <td><code>&lt;details&gt;</code></td>
    <td><code>[open]</code></td>
    <td>Voir les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/details#Attributes">attributs details</a> correspondants.</td>
  </tr>
  <tr>
    <td><code>&lt;fieldset&gt;</code></td>
    <td><code>[disabled]</code></td>
    <td>Active ou désactive le jeu de champs.</td>
  </tr>
  <tr>
    <td><code>&lt;image&gt;</code></td>
    <td><code>[xlink:href]</code><br>
      <td> Voir les <a href="https://developer.mozilla.org/fr/docs/Web/SVG/Element/image">attributs image</a> correspondants.</td>
    </tr>
    <tr>
      <td><code>&lt;input&gt;</code></td>
      <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
      <td>Voir les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/input#Attributes">attributs input</a> correspondants.</td>
    </tr>
    <tr>
      <td><code>&lt;option&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
      <td>Voir les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/option#Attributes">attributs option</a> correspondants.</td>
    </tr>
    <tr>
      <td><code>&lt;optgroup&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code></td>
      <td>Voir les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/optgroup#Attributes">attributs optgroup</a> correspondants.</td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
      <td>Voir les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/select#Attributes">attributs select</a> correspondants.</td>
    </tr>
    <tr>
      <td><code>&lt;source&gt;</code></td>
      <td><code>[src]</code><br><code>[type]</code></td>
      <td>Voir les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/source#Attributes">attributs source</a> correspondants.</td>
    </tr>
    <tr>
      <td><code>&lt;track&gt;</code></td>
      <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
      <td>Voir les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/track#Attributes">attributs track</a> correspondants.</td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
      <td>Voir les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/textarea#Attributes">attributs textarea</a> correspondants.</td>
    </tr>
  </table>

  <sup>*</sup> Désigne les attributs pouvant être liés auxquels ne correspond aucun élément qui ne peut pas l'être.

# Débogage <a name="debugging"></a>

Effectuez un test en mode de développement (avec le fragment d'URL `#development=1`) pour mettre en évidence les avertissements et les erreurs générés pendant le développement, et pour accéder à des fonctions de débogage spéciales.

# Avertissements <a name="warnings"></a>

En mode de développement, `amp-bind` émet un avertissement lorsque la valeur par défaut d'un attribut lié ne correspond pas au résultat initial de l'expression équivalente. Cela permet d'éviter les mutations indésirables consécutives aux modifications apportées à d'autres variables d'état. Par exemple :

```html
<!-- The element's default class value ('def') doesn't match the    
     expression result for [class] ('abc'),
     so a warning will be issued in development mode. -->

<p class="def" [class]="'abc'"></p>

```

En mode de développement, `amp-bind` émet également un avertissement lors du déréférencement de variables ou de propriétés non définies. Cela permet, en outre, d'éviter les mutations indésirables dues aux résultats d'expression `null`. Par exemple :

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
</script>
</amp-state></p>

<!-- The amp-state#myAmpState does not have a `bar` variable, so a warning
  will be issued in development mode. -->

<p [text]="myAmpState.bar">Texte d'espace réservé.</p>

```

# Erreurs <a name="errors"></a>

Plusieurs types d'erreurs d'exécution peuvent se produire lors de l'utilisation du composant `amp-bind`.

<table>
  <tr>
    <th>Type</th>
    <th>Message</th>
    <th>Suggestion</th>
  </tr>
  <tr>
    <td class="col-thirty">Liaison incorrecte</td>
    <td class="col-fourty"><em>Binding to [someBogusAttribute] on &lt;P> is not allowed</em>.</td>
    <td class="col-thirty">Utilisez uniquement des <a href="#element-specific-attributes">liaisons sur liste blanche</a>.</td>
  </tr>
  <tr>
    <td>Erreur de syntaxe</td>
    <td><em>Expression compilation error in...</em></td>
    <td>Vérifiez que l'expression ne contient pas de fautes de frappe.</td>
  </tr>
  <tr>
    <td>Fonctions ne figurant pas sur liste blanche</td>
    <td><em>alert is not a supported function.</em></td>
    <td>Utilisez uniquement des <a href="#allow-listed-functions">fonctions sur liste blanche</a>.</td>
  </tr>
  <tr>
    <td>Résultat expurgé</td>
    <td><em>"javascript:alert(1)" is not a valid result for [href].</em></td>
    <td>Évitez les expressions ou protocoles d'URL interdits qui entraîneraient l'échec de validateur AMP.</td>
  </tr>
  <tr>
    <td>Non-respect de la stratégie de sécurité du contenu (CSP)</td>
    <td><em>Refused to create a worker from 'blob:...' because it violates the following Content Security Policy directive...</em></td>
    <td>Ajoutez <code>default-src blob:</code> à la stratégie de sécurité du contenu (CSP) de votre origine. <code>amp-bind</code> délègue les tâches fastidieuses à un <a href="https://developer.mozilla.org/fr/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">web worker dédié</a> pour garantir un niveau de performances élevé.</td>
  </tr>
</table>

# État de débogage <a name="debugging-state"></a>

Utilisez `AMP.printState()` pour imprimer l'état actuel de la console.

# Annexe <a name="appendix"></a>

# Spécification de l'élément `<amp-state>` <a name="amp-state-specification"></a>

Un élément `amp-state` peut être composé d'un élément `<script>` enfant **OU** d'un attribut `src` contenant une URL CORS vers un point de terminaison JSON distant, mais pas des deux.

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state></p>

<p><amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# Traitements par lots de requêtes XHR <a name="xhr-batching"></a>

AMP regroupe les requêtes XHR (XMLHttpRequest) dans des points de terminaison JSON. En d'autres termes, vous pouvez utiliser une seule requête de données JSON comme source de données pour plusieurs consommateurs (plusieurs éléments `amp-state`, par exemple) sur une page AMP.  Supposons que l'élément `amp-state` adresse une requête XHR à un point de terminaison. Dans ce cas, lorsque la requête XHR sera en cours, les requêtes XHR ultérieures adressées au même point de terminaison ne se déclencheront pas et renverront, à la place, les résultats à partir de la première requête XHR.

# Attributs <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>URL du point de terminaison distant qui renvoie le fichier JSON qui mettra à jour cet élément <code>amp-state</code>. Il doit s'agir d'un service HTTP CORS.
        L'attribut <code>src</code> autorise toutes les substitutions de variables d'URL standards. Pour plus d'informations, consultez le <a href="https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md">Guide des substitutions</a>.
        [tip type="important"]
      Le point de terminaison doit mettre en œuvre les exigences énoncées dans la spécification <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md">Requêtes CORS dans AMP</a>.
      [/tip]</td>
  </tr>
  <tr>
    <td width="40%"><strong>credentials (facultatif)</strong></td>
    <td>Définit une option <code>credentials</code> telle qu'elle est spécifiée par l'<a href="https://fetch.spec.whatwg.org/">API Fetch</a>.
      <ul>
        <li>Valeurs acceptées : `omit`, `include`</li>
        <li>Valeur par défaut : `omit`</li>
      </ul>
      Pour envoyer des identifiants, transmettez la valeur <code>include</code>. Si cette valeur est définie, la réponse doit respecter les <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp">consignes de sécurité CORS dans AMP</a>.</td>
    </tr>
  </table>

# Fusion en profondeur avec `AMP.setState()` <a name="deep-merge-with-ampsetstate"></a>

Lorsque l'action `AMP.setState()` est appelée, `amp-bind` fusionne en profondeur le littéral d'objet fourni avec l'état actuel. Toutes les variables du littéral d'objet sont écrites directement dans l'état, à l'exception des objets imbriqués, qui sont fusionnés de manière récursive. Les primitives et les tableaux qui se trouvent dans l'état sont toujours écrasés par les variables portant le même nom dans le littéral d'objet.

Prenons l'exemple suivant :

```javascript
{
  <!-- State is empty -->
  }
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

Lorsque vous appuyez sur le premier bouton, l'état devient :

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
    }
  }
```

Lorsque vous appuyez sur le deuxième bouton, `amp-bind` fusionne de manière récursive l'argument de littéral de l'objet, `{employee: {age: 64}}`, dans l'état existant.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
    }
  }
```

`employee.age` a été mis à jour, mais les clés `employee.name` et `employee.vehicle` n'ont pas changé.

Notez que le composant `amp-bind` génère une erreur si vous appelez `AMP.setState()` avec un littéral d'objet contenant des références circulaires.

# Supprimer une variable <a name="circular-references"></a>

Pour supprimer une variable d'état, définissez sa valeur sur `null` dans `AMP.setState()`. En commençant par l'état de l'exemple précédent, si vous appuyez sur :

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

L'état est remplacé par :

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
    }
  }
```

De même, si vous appuyez sur :

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

L'état est remplacé par :

```javascript
{
  <!-- State is empty -->
  }
```

# Grammaire des expressions <a name="expression-grammar"></a>

Grammaire de type BNF pour les expressions `amp-bind` :

```text
expr:
    operation
  | invocation
  | member_access
  | '(' expr ')'
  | variable
  | literal

operation:
    !' expr
    | '-' expr
    | '+' expr
    | expr '+' expr
    | expr '-' expr
    | expr '*' expr
    | expr '/' expr
    | expr '%' expr
    | expr '&&' expr
    | expr '||' expr
    | expr '<=' expr
    | expr '<' expr
    | expr '>=' expr
    | expr '>;' expr
    | expr '!=' expr
    | expr '==' expr
    | expr '?' expr ':' expr

  invocation:
      expr '.' NAME args

    args:
        (' ')'
        | '(' array ')'
        ;

      member_access:
          expr member
          ;

        member:
            .' NAME
            | '[' expr ']'

          variable:
              NAME
              ;

            literal:
                STRING
                | NUMBER
                | TRUE
                | FALSE
                | NULL
                | object_literal
                | array_literal

              array_literal:
                  [' ']'
                  | '[' array ']'

                array:
                    expr
                    | array ',' expr

                  object_literal:
                      {' '}'
                      | '{' object '}'

                    object:
                        key_value
                        | object ',' key_value

                      key_value:
                          expr ':' expr
```

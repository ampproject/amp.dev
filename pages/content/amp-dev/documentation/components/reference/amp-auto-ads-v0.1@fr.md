---
$title: amp-auto-ads
$category@: ads-analytics
teaser:
  text: Injecter des annonces de manière dynamique dans une page AMP en utilisant un fichier de configuration diffusé à distance.
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



Ce composant injecte des annonces de manière dynamique dans une page AMP en utilisant un fichier de configuration diffusé à distance.

<table>
  <tr>
    <td class="col-fourty"><strong>Disponibilité</strong></td>
    <td>Expérimental</td>
  </tr>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td>
      <code>
        &lt;script async custom-element="amp-auto-ads"
            src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"&gt;&lt;/script&gt;
        </code>
      </td>
    </tr>
    <tr>
      <td class="col-fourty">
        <strong>
          <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">
            Mises en page compatibles
          </a>
        </strong>
      </td>
      <td>N/A</td>
    </tr>
  </table>



## Comportement

Étant donné un nombre suffisant d'emplacements valides (fournis dans la configuration), le composant `amp-auto-ads` tente d'insérer des annonces supplémentaires, tout en respectant un ensemble de contraintes spécifiées par le réseau publicitaire. Ces contraintes limitent :

* le nombre total d'annonces pouvant être insérées ;
* la distance minimale à respecter entre les annonces adjacentes.

En outre, les annonces ne sont insérées que dans les zones de la page qui n'entraînent pas de reflow non autorisé (tel que défini par attemptChangeSize).

La balise `<amp-auto-ads>` doit être placée comme premier élément enfant de `<body>`.

Le type de réseau publicitaire et toutes les informations supplémentaires (requises par le réseau publicitaire) doivent être spécifiés dans la balise.
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">;
  </amp-auto-ads>
```

## Réseaux publicitaires compatibles <a name="supported-ad-networks"></a>

* [AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [DoubleClick (expérimental)](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)

## Attributs

<table>
  <tr>
    <td width="40%"><strong>type (requis)</strong></td>
    <td>Identifiant du réseau publicitaire.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>La plupart des réseaux publicitaires nécessitent une configuration supplémentaire, qui peut leur être transmise à l'aide d'attributs <code>data-</code> HTML. Les noms des paramètres font l'objet d'une conversion standard des attributs de type "data" avec tiret vers le format camel case. Par exemple, "data-foo-bar" est envoyé à l'annonce sous la forme "fooBar" à des fins de configuration. Consultez la documentation pour savoir sur quel <a href="#supported-ad-networks">réseau publicitaire</a> les attributs peuvent être utilisés.</td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>Cet élément comprend des <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributs communs</a> étendus aux composants AMP.</td>
  </tr>
</table>

## Spécification de configuration

La configuration définit les zones de la page dans lesquelles le composant `<amp-auto-ads>` peut placer des annonces. La configuration est extraite d'un réseau publicitaire tiers, à l'URL définie dans `ad-network-config.js`. La configuration doit être un objet JSON sérialisé correspondant à la définition [`ConfigObj`](#configobj) décrite ci-dessous.

### Exemple de configuration

L'exemple suivant indique que l'annonce doit être positionnée immédiatement après tous les éléments `<P class='paragraph'>` situés dans le troisième élément `<DIV id='domId'>` de la page. Une annonce qui occupe l'un de ces emplacements doit être de type BANNER, et avoir une marge supérieure de 4 pixels et une marge inférieure de 10 pixels.

```json
{
  "placements": [
    {
      "anchor": {
        "selector": "DIV#domId",
        "index": 2,
        "sub": {
          "selector": "P.paragraph",
          "all": true,
        },
      },
      "pos": 4,
      "type": 1,
      "style": {
        "top_m": 5,
        "bot_m": 10,
      },
    },
  ]
}
```

### Définitions d'objets

#### ConfigObj <a name="configobj"></a>

Champs à spécifier dans l'objet de configuration :

<table>
  <tr>
    <th class="col-thirty">Nom du champ</th>
    <th class="col-thirty">Type</th>
    <th class="col-fourty">Description</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>Tableau&lt;!PlacementObj&gt;</td>
    <td>Champ <strong>obligatoire</strong> qui indique les emplacements potentiels où les annonces peuvent être insérées sur la page.</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Objet&lt;string, string&gt;</td>
    <td>Champ <em>facultatif</em> qui spécifie une correspondance entre le nom de l'attribut et les valeurs d'attribut à appliquer à tous les éléments <code>&lt;amp-ad&gt;</code> injectés à l'aide de cette configuration. Seuls les noms d'attributs suivants sont autorisés :
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (c'est-à-dire tout attribut de données)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>adConstraints</code></td>
    <td>AdConstraintsObj</td>
    <td>
      Champ <em>facultatif</em> qui spécifie les contraintes à appliquer lors du placement d'annonces sur la page. En l'absence de contraintes définies, <code>amp-auto-ads</code> tente d'utiliser les contraintes par défaut spécifiées dans [ad-network-config.js](0.1/ad-network-config.js).
    </td>
  </tr>
</table>

#### PlacementObj

Champs à renseigner dans l'objet de configuration `placements` :

<table>
  <tr>
    <th class="col-thirty">Nom du champ</th>
    <th class="col-thirty">Type</th>
    <th class="col-fourty">Description</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td>Champ <strong>obligatoire</strong> qui fournit des informations utilisées pour rechercher les éléments de la page auxquels est ancrée la position de l'emplacement.
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td>Champ <strong>obligatoire</strong> qui indique la position de l'emplacement par rapport à son élément d'ancrage.</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td>Champ <strong>obligatoire</strong> qui indique le type d'emplacement.</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td>Champ <em>facultatif</em> qui indique le style à appliquer à une annonce insérée à cet emplacement.
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Objet&lt;string, string&gt;</td>
    <td>Champ <em>facultatif</em> permettant de faire correspondre un nom d'attribut à une valeur pour les attributs à appliquer à tous les éléments <code>&lt;amp-ad&gt;</code> injectés à l'aide de cet emplacement. Un attribut spécifié ici remplace tout attribut du même nom qui est également spécifié dans la définition <code>ConfigObj</code> parent. Seuls les noms d'attributs suivants sont autorisés :
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (c'est-à-dire tout attribut de données)</li>
      </ul>
    </td>
  </tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

Champs à renseigner dans l'objet de configuration `anchor` :

<table>
  <tr>
    <th class="col-thirty">Nom du champ</th>
    <th class="col-thirty">Type</th>
    <th class="col-fourty">Description</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>chaîne</td>
    <td>Champ <strong>obligatoire</strong> qui définit un sélecteur CSS pour sélectionner les éléments à ce niveau de la définition d'ancrage.
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>nombre</td>
    <td>Champ <em>facultatif</em> permettant de spécifier l'index des éléments sélectionnés par le sélecteur auquel ce niveau de la définition d'ancrage doit être limité. Par défaut, la valeur est définie sur 0 (si le champ <code>all</code> est défini sur false).</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>booléen</td>
    <td>Ignoré si le champ <code>index</code> été spécifié. Si la valeur est définie sur <code>true</code>, tous les éléments sélectionnés par le sélecteur doivent être inclus ; sinon, elle est définie sur <code>false</code>.
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>nombre</td>
    <td>Champ <em>facultatif</em> qui spécifie la longueur minimale que la propriété textContent d'un élément doit avoir pour être incluse. La valeur par défaut est 0.</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>AnchorObj</td>
    <td>Champ <em>facultatif</em> indiquant un <code>AnchorObj</code> récursif qui sélectionne des éléments à l'intérieur de tout autre élément sélectionné à ce niveau de définition d'ancrage.
    </td>
  </tr>
</table>

#### PlacementStyleObj <a name="placementstyleobj"></a>

Champs à spécifier dans l'objet de configuration `style` :

<table>
  <tr>
    <th class="col-twenty">Nom du champ</th>
    <th class="col-twenty">Type</th>
    <th class="col-fourty">Description</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>nombre</td>
    <td>Champ <em>facultatif</em> qui indique la marge supérieure, en pixels, d'une annonce insérée à cette position. La valeur par défaut est 0.
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>nombre</td>
    <td>Champ <em>facultatif</em> qui indique la marge inférieure, en pixels, d'une annonce insérée à cette position. La valeur par défaut est 0.
    </td>
  </tr>
</table>

#### RelativePositionEnum <a name="relativepositionenum"></a>

Valeurs ENUM du champ `pos` dans l'objet de configuration `placements` :

<table>
  <tr>
    <th class="col-fourty">Nom</th>
    <th class="col-twenty">Valeur</th>
    <th class="col-fourty">Description</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>L'annonce doit être insérée en tant qu'élément frère immédiatement avant l'ancrage.</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>L'annonce doit être insérée en tant que premier élément enfant de l'ancrage.</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>L'annonce doit être insérée en tant que dernier élément enfant de l'ancrage.</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>L'annonce doit être insérée en tant qu'élément frère immédiatement après l'ancrage.</td>
  </tr>
</table>

#### PlacementTypeEnum <a name="placementtypeenum"></a>

Valeurs ENUM du champ `type` dans l'objet de configuration `placements` :

<table>
  <tr>
    <th class="col-fourty">Nom</th>
    <th class="col-twenty">Valeur</th>
    <th class="col-fourty">Description</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>L'emplacement décrit la position d'une bannière.</td>
  </tr>
</table>

#### AdConstraintsObj

Champs à spécifier dans l'objet de configuration `adConstraints` :

<table>
  <tr>
    <th class="col-twenty">Nom du champ</th>
    <th class="col-twenty">Type</th>
    <th class="col-fourty">Description</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>chaîne</td>
    <td>
      Champ <strong>obligatoire</strong> indiquant la distance minimale qu'il doit y avoir entre une annonce et les annonces figurant déjà sur la page (annonces placées manuellement ou placées précédemment par amp-auto-ads) au moment de l'insertion.
      Les valeurs sont exprimées sous la forme d'un nombre accompagné d'un préfixe d'unité. Par exemple : "10px" correspond à 10 pixels et "0,5vp" correspond à la moitié de la hauteur de la fenêtre d'affichage. Les valeurs négatives ne sont pas autorisées. Les unités acceptées sont les suivantes :
      <ul>
        <li>px : pixels</li>
        <li>vp : multiple de la hauteur de la fenêtre d'affichage</li>
      </ul>
      Cette valeur s'applique uniquement lorsque le nombre d'annonces déjà présentes sur la page est inférieur à tout sélecteur <code>adCount</code> spécifié dans le champ subsequentMinSpacing.
    </td>
  </tr>
  <tr>
    <td><code>subsequentMinSpacing</code></td>
    <td>Tableau&lt;!SubsequentMinSpacingObj&gt;</td>
    <td>
      Champ <em>facultatif</em> qui spécifie l'espacement à appliquer entre les annonces en fonction du nombre d'annonces déjà présentes sur la page au moment de l'insertion.
    </td>
  </tr>
  <tr>
    <td><code>maxAdCount</code></td>
    <td>nombre</td>
    <td>
      Champ <strong>obligatoire</strong> qui spécifie le nombre maximal d'annonces que le composant <code>amp-auto-ads</code> peut générer sur une page. Les annonces placées manuellement et celles insérées par <code>amp-auto-ads</code> sont comptabilisées dans ce total.
      Par exemple, si ce champ est défini sur 5 et que 3 annonces ont été placées manuellement sur la page, le composant <code>amp-auto-ads</code> insérera au maximum deux annonces supplémentaires.
    </td>
  </tr>
</table>

#### SubsequentMinSpacingObj

Champs à spécifier dans l'objet de configuration `subsequentMinSpacing`. Les entrées `subsequentMinSpacing` peuvent être utilisées pour modifier l'espacement requis entre des annonces supplémentaires en fonction du nombre d'annonces déjà présentes sur la page. Prenons l'exemple suivant :

* La page contient actuellement deux annonces
* Le champ subsequentMinSpacing est défini comme suit :
<code>
[
  {adCount: 3, spacing: "500px"},
{adCount: 5, spacing: "1000px"},
]
</code>

Au départ, la page contient deux annonces ; il n'y a donc pas de mappage.
Par conséquent, l'espacement minimal est défini par défaut sur initialMinSpacing dans l'objet `AdConstraints`.
Le composant `amp-auto-ads` tente de placer des annonces de manière récursive jusqu'à ce qu'il se trouve à court d'emplacements pouvant être utilisés sans enfreindre la contrainte `adContraints`.
Une fois que le composant `amp-auto-ads` a placé sa première annonce, la page en comporte trois. Étant donné qu'il existe un mappage pour trois annonces (ou plus) dans le champ `subsequentMinSpacing`, l'espacement minimal est désormais de 500 px.
Comme prévu, cette règle continue de s'appliquer jusqu'au moment où la page comporte cinq annonces. En cas d'insertion de la sixième annonce (ou des annonces suivantes), il faudra la séparer des autres d'au moins 1 000 pixels.

<table>
  <tr>
    <th class="col-twenty">Nom du champ</th>
    <th class="col-twenty">Type</th>
    <th class="col-fourty">Description</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>nombre</td>
    <td>
      Champ <strong>obligatoire</strong>.
      Nombre minimal d'annonces déjà présentes sur la page entraînant l'application de cette règle (en supposant qu'aucune autre règle ne corresponde mieux). Pour obtenir une explication détaillée, consultez la description ci-dessus.
    </td>
  </tr>
  <tr>
    <td><code>spacing</code></td>
    <td>chaîne</td>
    <td>
      Champ <strong>obligatoire</strong> indiquant l'espacement minimal entre les annonces qui s'applique lorsque cette condition est respectée sur la base du champ <code>adCount</code>.
      Les valeurs sont exprimées sous la forme d'un nombre accompagné d'un préfixe d'unité. Par exemple : "10px" correspond à 10 pixels et "0,5vp" correspond à la moitié de la hauteur de la fenêtre d'affichage. Les valeurs négatives ne sont pas autorisées. Les unités acceptées sont les suivantes :
      <ul>
        <li>px : pixels</li>
        <li>vp : multiple de la hauteur de la fenêtre d'affichage</li>
      </ul>
    </td>
  </tr>
</table>

## Validation

Consultez les [règles relatives à amp-auto-ads](https://github.com/ampproject/amphtml/blob/master/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii) dans les spécifications du validateur AMP.

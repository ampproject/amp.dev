---
$title: amp-pixel
$category@: ads-analytics
teaser:
  text: Pixel de suivi permettant de comptabiliser les pages vues.
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




<table>
  <tr>
    <td class="col-fourty"><strong>Description</strong></td>
    <td>Ce composant peut être utilisé comme pixel de suivi standard pour comptabiliser les pages vues.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>fixed, nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-pixel/">exemple de composant amp-pixel</a> sur AMP By Example.</td>
  </tr>
</table>

## Comportement <a name="behavior"></a>

Le composant `amp-pixel` se comporte comme un pixel de suivi simple `img`. Il utilise une seule URL, mais fournit des variables qui peuvent être remplacées par le composant dans la chaîne d'URL lors de l'exécution de la requête. Pour plus d'informations à ce sujet, consultez la section traitant des [substitutions](#substitutions).

Dans cet exemple de base, le composant `amp-pixel` envoie une requête GET simple à l'URL indiquée et ignore le résultat.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"></amp-pixel>
```

[tip type="note"]
Lors du traitement des URL AMP dans l'en-tête de page de provenance des requêtes d'analyse, supprimez ou ignorez le paramètre `usqp`. Ce paramètre est utilisé par Google pour déclencher des tests pour Google AMP Cache.
[/tip]

## Attributs <a name="attributes"></a>

##### src (obligatoire) <a name="src-required"></a>

URL simple vers un point de terminaison distant qui doit utiliser le protocole `https`.

##### referrerpolicy (facultatif) <a name="referrerpolicy-optional"></a>

Cet attribut est semblable à l'attribut `referrerpolicy` sur la balise `<img>`. Cependant, `no-referrer` est la seule valeur acceptée. Si `referrerpolicy=no-referrer` est spécifié, l'en-tête `referrer` est supprimé de la requête HTTP.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"
    referrerpolicy="no-referrer"></amp-pixel>
```

##### allow-ssr-img (facultatif) <a name="allow-ssr-img-optional"></a>

Cet attribut est utilisé dans les créations AMP4ADS. Il indique que, dans le cadre de la transformation post-validation, un élément img peut être placé directement dans l'élément amp-pixel, ce qui permet d'envoyer la demande ping parallèlement à la récupération ou l'application de l'exécution AMP.
Cela signifie que les macros contenues dans l'URL ne seront PAS développées. Par conséquent, n'utilisez cet attribut que si la source (src) ne contient pas de macros.

##### common attributes <a name="common-attributes"></a>

Cet élément inclut des [attributs communs](../../../documentation/guides-and-tutorials/learn/common_attributes.md) étendus aux composants AMP.

## Substitutions <a name="substitutions"></a>

Le composant `amp-pixel` autorise toutes les substitutions de variables d'URL standards.
Pour plus d'informations, consultez le [Guide des substitutions](https://github.com/ampproject/amphtml/blob/main/extensions/spec/amp-var-substitutions.md).

Dans l'exemple suivant, une requête peut être envoyée à une adresse semblable à `https://foo.com/pixel?0.8390278471201`, où la valeur RANDOM est générée de manière aléatoire lors de chaque impression.

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"
    layout="nodisplay"></amp-pixel>
```

## Application d'un style <a name="styling"></a>

Aucun style ne doit être appliqué au composant `amp-pixel`.

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-pixel](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) dans les spécifications du validateur AMP.

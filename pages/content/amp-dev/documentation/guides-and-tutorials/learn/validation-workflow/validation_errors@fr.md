---
$title: Erreurs de validation AMP
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

Pour être valides, les documents AMP ne doivent comprendre aucune erreur de validation.
Le but de ce document est de vous aider à mieux comprendre et à corriger les erreurs de validation que vous rencontrez lorsque vous [validez vos pages AMP](validate_amp.md).
Pour un aperçu complet des erreurs de validation, consultez les [spécifications du validateur AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

## Erreurs de balise HTML et d'attributs AMP

### Balise obligatoire manquante

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Ajoutez (ou corrigez) la balise HTML obligatoire.</td>
  </tr>
</table>

Les balises suivantes doivent être présentes dans tous les documents AMP :

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

Ces balises obligatoires comprennent un champ `mandatory: true` dans les [spécifications du validateur AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii). Elles sont également référencées dans la [spécifications AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md).

### Absence d'une balise requise par une autre balise

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Ajoutez (ou corrigez) la balise HTML requise.</td>
  </tr>
</table>

Le validateur génère l'erreur `TAG_REQUIRED_BY_MISSING` lorsqu'il trouve un composant étendu dans le document AMP, mais ne trouve pas le `<script>` équivalent.

Les [composants étendus](../../../../documentation/components/index.html) doivent être inclus explicitement dans le document AMP en tant qu'éléments personnalisés.
Pour corriger ces erreurs, accédez à la page de référence du composant étendu, copiez le script nécessaire et collez-le dans la section `<head>` du document AMP.

### Balise non autorisée

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez la balise non autorisée.</td>
  </tr>
</table>

Les balises sont ajoutées à la liste blanche. Il n'existe donc pas de liste définitive de toutes les balises interdites, toutefois les [spécifications AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) définissent dans les grandes lignes l'ensemble de balises non autorisées.

### Attribut obligatoire manquant

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Ajoutez l'attribut obligatoire à la balise.</td>
  </tr>
</table>

Les attributs obligatoires pour les balises AMP sont définis dans les [spécifications du validateur AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
Il vous suffit de rechercher la balise, de consulter les attributs répertoriés et de vérifier qu'ils sont bien définis sur `mandatory: true`.
Les attributs obligatoires pour chaque balise AMP sont également répertoriés dans les spécifications de la balise.

### Valeur d'attribut incorrecte

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Remplacez la valeur de l'attribut par une valeur valide.</td>
  </tr>
</table>

Cette erreur indique qu'une balise HTML possède un attribut avec un nom autorisé, mais une valeur interdite.
Ainsi, cette erreur se déclenche fréquemment en cas de valeurs d'URL incorrectes. Toutes les valeurs d'URL (dans les attributs `href` et `src`) doivent correspondre à l'une de ces [valeurs d'attributs possibles](http://www.w3schools.com/tags/att_a_href.asp).

**IMPORTANT** : De nombreuses valeurs d'URL AMP nécessitent le protocole HTTPS. Si vous obtenez cette erreur et que vous en ignorez la raison, vérifiez les spécifications de la balise AMP concernée pour voir si l'attribut nécessite le protocole HTTPS.

### Attribut non autorisé

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez l'attribut de la balise HTML.</td>
  </tr>
</table>

Les attributs sont ajoutés à une liste blanche. Il n'existe donc pas de liste définitive de tous les attributs interdits.
Pour connaître les attributs compatibles avec chaque balise, recherchez la balise HTML, puis `attrs` dans les [spécifications du validateur AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

En plus d'une liste blanche des attributs spécifiques pour chaque balise, les balises AMP peuvent utiliser tous les attributs ajoutés à la liste blanche dans `$GLOBAL_ATTRS`. Tous les attributs avec le préfixe `"data-"` sont également acceptés.

### Texte obligatoire manquant ou incorrect

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Ajoutez ou corrigez le texte obligatoire dans la balise.</td>
  </tr>
</table>

CDATA désigne les données de contenu figurant entre des balises HTML de début et de fin. L'évaluation de ces données se fait actuellement par le biais de listes blanches et de listes noires.
Les balises avec des données CDATA obligatoires comprennent :

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

Et :

[sourcecode:html]
<style amp-custom>
[/sourcecode]

Voici des exemples de messages détaillés correspondant à la description ci-dessus :

* "Mandatory style boilerplate (js enabled)"
* "Mandatory style boilerplate (noscript)"
* "Disallowed -amp- CSS class name prefix"
* "Disallowed !important attribute in CSS"
* "Disallowed @charset in CSS"
* "Disallowed @import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
* "Disallowed @viewport in CSS"

### Texte non autorisé à l'intérieur de la balise

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>CDATA_VIOLATES_DENYLIST</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez le texte non autorisé.</td>
  </tr>
</table>

Des données CSS spécifiques ont été ajoutées à la liste noire pour valider des règles AMP CSS essentielles.

La liste suivante indique les données CSS sur liste noire (voir également `disallowed_cdata_regex` dans les [spécifications du validateur AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)) :

* `"\\.i?-amp-"` ("Préfixe de nom de classe -amp- CSS")
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Propriété non autorisée dans l'attribut d'une balise

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez la propriété non autorisée dans l'attribut spécifié.</td>
  </tr>
</table>

Cette erreur se produit lorsque le nom d'une propriété à l'intérieur d'un attribut n'est pas autorisé.
Dans ce contexte, le terme propriété désigne les données structurées clé/valeur à l'intérieur d'un attribut.
Par exemple, dans `<meta name="viewport content="width=device-width;minimum-scale=1">`, `width` et `minimum-scale` sont des noms de propriétés.

Le code suivant génère une erreur DISALLOWED_PROPERTY_IN_ATTR_VALUE :

`<meta name="viewport content="width=device-width;invalidfoo=1">`

L'exemple suivant constitue également une erreur :

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

Il faudrait écrire : `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### Valeur de propriété incorrecte

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Corrigez la valeur de propriété incorrecte.</td>
  </tr>
</table>

Cette erreur se produit lorsque la valeur de la propriété à l'intérieur d'un attribut est incorrecte.
Dans ce contexte, le terme propriété désigne les données structurées clé/valeur à l'intérieur d'un attribut.
Par exemple, dans `<meta name="viewport content="width=device-width;minimum-scale=1">`, `device-width` et `1` sont des valeurs de propriété.

L'exemple ci-dessous provoque une erreur INVALID_PROPERTY_VALUE_IN_ATTR_VALUE :

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

L'exemple suivant constitue également une erreur :

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

Il faudrait écrire : `<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### URL manquante

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correction</strong></td>
    <td>Ajoutez l'URL valide.</td>
  </tr>
</table>

Cette erreur se produit en l'absence de l'URL nécessaire à un attribut. Il peut notamment s'agir d'un attribut `href` ou `src` vide.

### URL incorrecte

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correction</strong></td>
    <td>Réparez l'URL rompue.</td>
  </tr>
</table>

Cette erreur se produit lorsqu'un attribut a une URL, mais que cette dernière est incorrecte.

### Protocole d'URL incorrect

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correction</strong></td>
    <td>Optez pour un protocole valide. Ainsi, il vous faudra peut-être remplacer `http` par `https`.</td>
  </tr>
</table>

Cette erreur se produit pour les balises dont le `href` ou `src` doivent être définis sur certains protocoles.
Ainsi, de nombreuses balises nécessitent le protocole `https`.

### Propriété obligatoire manquante pour l'attribut

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Ajoutez la propriété manquante.</td>
  </tr>
</table>

À l'heure actuelle, cette erreur se produit en l'absence de ces propriétés obligatoires :

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

Elles renvoient à des balises attendues :

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### Attributs s'excluant mutuellement

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez l'un des attributs s'excluant mutuellement.</td>
  </tr>
</table>

Cette erreur se produit lorsqu'une balise possède deux attributs s'excluant mutuellement.
Ainsi, un seul de ces attributs est autorisé pour les balises suivantes :

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) : `data-tweetid` ou `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) : `data-shortcode` ou `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) : `src` ou `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) : `src` ou `data-videoid`

### Absence d'attribut obligatoire figurant sur la liste

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Ajoutez l'attribut obligatoire manquant parmi les attributs proposés.</td>
  </tr>
</table>

Cette erreur se produit lorsqu'une balise ne comprend aucun des attributs possibles.
Par exemple, pour les balises suivantes, il faut choisir l'un des deux attributs proposés :

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) : `data-tweetid` ou `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) : `data-shortcode` ou `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) : `src` ou `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) : `src` ou `data-videoid`

### Balise parent incorrecte

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Faites en sorte que la balise soit un enfant direct du parent requis.</td>
  </tr>
</table>

Des balises spécifiques nécessitent un parent immédiat (par opposition à un ancêtre lointain).
La liste ci-dessous répertorie le parent requis pour des balises spécifiques (balise, parent) :

* `!doctype` nécessite une balise parent `root`.
* `html` nécessite une balise parent `!doctype`.
* `head` nécessite une balise parent `html`.
* `body` nécessite une balise parent `html`.
* `link` nécessite une balise parent `head`.
* `meta` nécessite une balise parent `head`.
* `style amp-custom` nécessite une balise parent `head`.
* `style` nécessite une balise parent `boilerplate (noscript)`.
* `noscript` nécessite une balise parent `head`.
* `script` nécessite une balise parent `head`.
* `source` nécessite une balise média ([`amp-audio`](../../../../documentation/components/reference/amp-audio.md), [`amp-video`](../../../../documentation/components/reference/amp-video.md), etc.).

### Balise ancêtre non autorisée

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez (ou déplacez) la balise imbriquée non autorisée.</td>
  </tr>
</table>

Cette erreur se produit lorsqu'une balise est un descendant d'une autre balise non validée.
À l'heure actuelle, le seul exemple possible est une balise `template` non imbriquée dans une autre balise `template`.

### Balise ancêtre obligatoire

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez la balise ou faites-en un descendant de la balise spécifique.</td>
  </tr>
</table>

Les descendants obligatoires sont définis dans les [spécifications du validateur AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) comme `mandatory_ancestor`.

L'erreur se produit en l'absence de `mandatory_ancestor` (balise, ancêtre) pour les balises suivantes :

* `img` doit être un descendant de `noscript`.
* `video` doit être un descendant de `noscript`.
* `audio` doit être un descendant de `noscript`.
* `noscript` doit être un descendant de `body`.

### Balise ancêtre obligatoire avec indicateur

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez la balise, faites-en un descendant de la balise spécifique ou remplacez-la par la balise avec indicateur.</td>
  </tr>
</table>

L'erreur se produit lorsque l'une des balises suivantes est détectée dans un document AMP, et n'est pas correctement imbriquée dans son parent obligatoire :

* `img` n'est pas dans le parent `noscript`.
* `video` n'est pas dans le parent `noscript`.
* `audio` n'est pas dans le parent `noscript`.
* `noscript` n'est pas dans le parent `body`.

### Balise unique en double

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez l'une des balises en double du document AMP.</td>
  </tr>
</table>

Cette erreur se produit lorsqu'une seule instance de la balise est autorisée, et qu'un doublon est détecté.

Voici la liste complète des balises uniques :

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://cdn.ampproject.org/v0.js">`

## Erreurs de style et de mise en page <a name="erreurs-de-style-et-de-mise-en-page"></a>

Avant de différencier les erreurs de style et de mise en page, il est important de comprendre comment le [style](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) et la [mise en page](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) fonctionnent dans AMP. Étant donné que les pages AMP sont des pages HTML, les styles ressemblent beaucoup à ceux de n'importe quelle page HTML.
Il existe toutefois certaines restrictions visant à assurer un chargement rapide des pages, et le validateur AMP vise à les faire respecter.

La mise en page est plus contrôlée dans les pages AMP.
Chaque balise affichée sur la page doit avoir une hauteur et une largeur prédéfinies, afin de réduire les difficultés d'affichage et de défilement de la page.
Cela ne signifie pas que vous devez inclure manuellement ces attributs.
Pour certains types de mises en page, le validateur AMP ne génère pas d'erreurs, car il considère que des valeurs par défaut sont utilisées.

Chaque balise AMP est associée à une liste de `supported_layouts`, telle que définie dans les [spécifications du validateur AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
Le validateur génère des erreurs pour les mises en page non compatibles, et vérifie les règles de validation pour la mise en page prédéfinie.

### Feuille de style trop longue

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Réduisez la taille de la feuille de style à moins de 50 000 octets.</td>
  </tr>
</table>

Le validateur AMP génère cette erreur lorsqu'il calcule que la taille du contenu des styles de `<style amp-custom>` dépasse 50 000 octets.

### Erreur de syntaxe CSS

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>CSS_SYNTAX</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Corrigez l'erreur de syntaxe CSS.</td>
  </tr>
</table>

Cette erreur se produit lorsque des erreurs de syntaxe CSS figurent dans la balise spécifiée.
Si vous ne parvenez pas à identifier la source de l'erreur, essayez d'exécuter le CSS par le biais d'un validateur CSS en ligne, par exemple [csslint](http://csslint.net/).

### Erreur de syntaxe CSS pour une règle spécifique

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Corrigez l'erreur de syntaxe CSS spécifiée.</td>
  </tr>
</table>

Cette erreur renvoie aux règles CSS de type @. AMP n'accepte que certaines de ces règles (voir aussi les [spécifications AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).
Par exemple, `@import` est interdit.
L'erreur de validation vous indique précisément la règle incorrecte, ce qui permet de corriger plus facilement la règle concernée.

### La mise en page implicite n'est pas compatible avec la balise AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Fournissez un attribut de mise en page valide pour la balise.</td>
  </tr>
</table>

Cette erreur se produit lorsque vous ne spécifiez pas de mise en page pour la balise AMP, et que la mise en page implicite (en fonction de la largeur, de la hauteur et de la taille) n'est pas acceptée.
Vérifiez les valeurs `supported_layout` pour la balise dans les [spécifications du validateur AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Le comportement de la mise en page est déterminé par l'attribut `layout`.
Pour en savoir plus sur la mise en page, consultez la page d'aide relative au [contrôle de la mise en page](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md), ainsi que les [spécifications du système de mise en page AMP HTML](../../../../documentation/components/reference/amp-layout.md).

**Remarque** : Si vous ne spécifiez pas de mise en page et si vous n'incluez pas les valeurs `width` et `height`, la mise en page par défaut est de type CONTAINER. Le validateur génère une erreur, car le format CONTAINER n'est compatible avec aucune balise AMP.
Spécifiez une mise en page autre que CONTAINER, ou ajoutez une valeur `width` ou `height` pour corriger l'erreur.

### Attribut non autorisé par la mise en page implicite

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correction</strong></td>
    <td>Supprimez l'attribut non autorisé de la balise ou spécifiez une mise en page qui l'accepte.</td>
  </tr>
</table>

Cette erreur se produit lorsque vous ne spécifiez pas de mise en page pour la balise AMP et que la mise en page implicite contient un attribut non autorisé.
Les attributs interdits selon les types de mises en page sont décrits dans la [spécification du système de mise en page AMP HTML](../../../../documentation/components/reference/amp-layout.md).

### La mise en page spécifiée n'est pas compatible avec la balise AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Spécifiez une mise en page compatible avec la balise.</td>
  </tr>
</table>

Cette erreur se produit lorsque la mise en page spécifiée pour la balise n'est pas acceptée.
Vérifiez les valeurs `supported_layout` pour la balise dans les [spécifications du validateur AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Le comportement de la mise en page est déterminé par l'attribut `layout`.
Pour en savoir plus sur la mise en page, consultez la page d'aide relative au [contrôle de la mise en page](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md), ainsi que les [spécifications du système de mise en page AMP HTML](../../../../documentation/components/reference/amp-layout.md).

### Attribut non autorisé par la mise en page spécifiée

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correction</strong></td>
    <td>Supprimez l'attribut non autorisé de la balise ou spécifiez une mise en page qui l'accepte.</td>
  </tr>
</table>

Cette erreur se produit lorsque vous spécifiez une mise en page pour la balise AMP et que la mise en page contient un attribut non autorisé.
Les attributs interdits selon les types de mises en page sont décrits dans la [spécification du système de mise en page AMP HTML](../../../../documentation/components/reference/amp-layout.md).

### Valeur incorrecte pour l'attribut requis par la mise en page

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Définissez l'attribut sur la valeur spécifiée.</td>
  </tr>
</table>

Cette erreur se produit lorsque la valeur de l'attribut est incorrecte pour la mise en page spécifiée.
Pour comprendre ce qui déclenche cette erreur, vous devez vous familiariser avec les [différents comportements des mises en page](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).

Par exemple, vous définissez la mise en page sur `fixed-height` et vous intégrez des valeurs numériques pour `height` et `width`.
La mise en page `fixed-height` utilise une valeur `height`.
L'attribut `width` ne doit pas être présent ou doit être défini sur `auto`.
Le validateur génère l'erreur ATTR_VALUE_REQUIRED_BY_LAYOUT.

### Unités de hauteur et de largeur incohérentes

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Indiquez des unités de hauteur et de largeur cohérentes.</td>
  </tr>
</table>

À l'exception de `layout=fixed`, les attributs de largeur et de hauteur doivent être exprimés dans la même unité.
Dans le cas contraire, cette erreur est générée.

Par exemple, `<amp-img src="" layout="responsive" width="42px" height="42rem">` entraîne le message d'erreur suivant :

"La balise '[`amp-img`](../../../../documentation/components/reference/amp-img.md)  contient des unités incohérentes pour la largeur et la hauteur. La largeur est indiquée en 'px', alors que la hauteur est indiquée en 'rem'."

## Erreurs de création de modèles

Les pages AMP ne peuvent pas inclure de syntaxe de création de modèles, sauf si cette syntaxe est comprise dans une balise AMP spécialement conçue pour intégrer des modèles, par exemple [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md).

Vous pouvez inclure des modèles dans vos fichiers source, tant que le fichier de sortie ne contient pas les modèles (voir aussi [Utiliser des préprocesseurs CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)).

### L'attribut contient une syntaxe de modèle

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez la syntaxe de modèle Mustache de l'attribut.</td>
  </tr>
</table>

Cette erreur se produit à chaque fois que le validateur trouve une [syntaxe de modèle Mustache](https://mustache.github.io/mustache.5.html) dans une valeur d'attribut.

### L'attribut contient une syntaxe de modèle sans caractère d'échappement

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Ajoutez un caractère d'échappement au modèle Mustache.</td>
  </tr>
</table>

Cette erreur se produit à chaque fois que le validateur trouve une [syntaxe de modèle Mustache sans caractère d'échappement](https://mustache.github.io/mustache.5.html) dans une valeur d'attribut.

### L'attribut contient un extrait de modèle

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez l'extrait de modèle Mustache.</td>
  </tr>
</table>

Cette erreur se produit à chaque fois que le validateur trouve un [extrait de modèle Mustache](https://mustache.github.io/mustache.5.html) dans une valeur d'attribut.

## Erreurs d'obsolescence

### Balise obsolète

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DEPRECATED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Supprimez la balise obsolète.</td>
  </tr>
</table>

Cet avertissement s'affiche lorsqu'une balise AMP valide par le passé se trouve dans le document AMP.
Il s'agit seulement d'un avertissement ; les documents AMP présentant des avertissements restent valides.
Aucune balise obsolète n'existe actuellement. L'avertissement concernera les obsolescences futures.

### Attribut obsolète

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correction</strong></td>
  	<td>Nous vous conseillons de supprimer les attributs obsolètes.</td>
  </tr>
</table>

Cet avertissement s'affiche lorsqu'un attribut AMP valide par le passé se trouve dans le document AMP.
Il s'agit seulement d'un avertissement ; les documents AMP présentant des avertissements restent valides.

Identifiez les attributs obsolètes pour chaque balise AMP en recherchant `deprecation` dans la [spécification du validateur AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
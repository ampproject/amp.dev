---
$title: amp-mustache
$category@: dynamic-content
teaser:
  text: Autoriser l'affichage de modèles Mustache.js.
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



Ce composant autorise l'affichage de modèle [Mustache.js](https://github.com/janl/mustache.js/).

<table>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-mustache/">exemple de composant amp-mustache annoté</a> sur AMP By Example.</td>
  </tr>
</table>


## Remarques relatives à la version <a name="version-notes"></a>

| Version | Description |
|-------|-----|
| 0.2 | Compatibilité avec les éléments `<svg>` et réduction de la taille du paquet (12,2 Ko contre 20,5 Ko, compressé avec gzip).<br><br>Migration vers une bibliothèque de désinfection HTML plus récente (de Caja vers DOMPurify). Cela peut entraîner de légères modifications, compte tenu des différences au niveau de la mise sur liste blanche des balises et des attributs. Nous vous recommandons de commencer par tester vos pages avant de passer en production pour vous assurer que les modifications apportées au balisage généré n'ont pas d'incidence sur la fonctionnalité. |
| 0.1 | Mise en œuvre initiale. |

## Syntaxe <a name="syntax"></a>

Mustache est une syntaxe de modèle sans logique. Pour plus d'informations, consultez les [documents relatifs à Mustache.js](https://github.com/janl/mustache.js/). Voici quelques-unes des principales balises de Mustache :

* {% raw %}`{{variable}}`{% endraw %} : balise de variable. Affiche la valeur d'une variable avec échappement HTML.
* {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: balise de section. Permet de vérifier l'existence d'une variable et de la répéter s'il s'agit d'un tableau.
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: : balise inversée. Permet de vérifier qu'une variable n'existe pas.
* {% raw %}`{{{unescaped}}}`{% endraw %} : balise HTML sans échappement. Elle est limitée dans le balisage qu'elle peut générer (voir la section "Restrictions" ci-dessous).

## Utilisation <a name="usage"></a>

Le modèle `amp-mustache` doit être défini et utilisé conformément aux [spécifications du modèle AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-html-templates.md).

Tout d'abord,`amp-mustache` doit être déclaré et chargé comme suit :

```html
<script src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js" async="" custom-template="amp-mustache"></script>
```

Ensuite, les modèles Mustache peuvent être définis dans une balise `script` ou `template` comme suit :

[sourcecode:html]
{% raw %}<!-- Utilisation de la balise template. -->
<template type="amp-mustache">
  Hello {{world}}!
</template>
{% endraw %}[/sourcecode]

ou

<!-- Utilisation de la balise script. -->
[sourcecode:html]{% raw %}<script type="text/plain" template="amp-mustache">
  Hello {{world}}!
</script>
{% endraw %}[/sourcecode]


Dans la mesure du possible, utilisez la balise `template`, car la validation AMP fournit des indications dev-x utiles. Utilisez le modèle `script` pour les cas extrêmes et les problèmes liés à la création de modèles dans le contexte des tables. Pour en savoir plus, consultez la section "Tables" ci-dessous.

Le mode de détection des modèles, le moment où ils sont affichés et la manière dont les données sont fournies sont autant d'informations déterminées par l'élément AMP cible qui utilise ce modèle pour afficher son contenu (par exemple, dans un composant [amp-list](amp-list.md), [amp-form](amp-form.md), etc.).

## Restrictions <a name="restrictions"></a>
### Validation <a name="validation"></a>

À l'instar de tous les modèles AMP, les modèles `amp-mustache` doivent être des fragments DOM correctement formatés. Cela signifie notamment que vous ne pouvez pas utiliser `amp-mustache` pour les tâches suivantes :

* Calculer le nom de la balise. Par exemple, {% raw %}`<{{tagName}}>`{% endraw %} n'est pas autorisé.
* Calculer le nom de l'attribut. Par exemple, {% raw %}`<div {{attrName}}=something>`{% endraw %} n'est pas autorisé.

La sortie de "triple mustache" est expurgée afin de n'autoriser que les balises suivantes : `a`, `b`, `br`, `caption`, `colgroup`, `code`, `del`, `div`, `em`, `i`, `ins`, `li`, `mark`, `ol`, `p`, `q`, `s`, `small`, `span`, `strong`, `sub`, `sup`, `table`, `tbody`, `time`, `td`, `th`, `thead`, `tfoot`, `tr`, `u`, `ul`.

### Désinfection <a name="sanitization"></a>

La sortie de Mustache est désinfectée pour des raisons de sécurité, mais aussi pour maintenir la conformité avec AMP. Cela peut entraîner la suppression discrète de certains éléments et attributs.

## Pièges <a name="pitfalls"></a>

### Modèles imbriqués <a name="nested-templates"></a>

Conformément à la validation AMP, les éléments `<template>` ne peuvent pas être des enfants d'autres éléments `<template>`. Cela peut se produire lors de l'imbrication de deux composants qui utilisent des modèles ; `amp-list` et `amp-form`, par exemple.

Pour contourner ce problème, les éléments `<template>` peuvent également être référencés par `id` via l'attribut `template` sur le composant. Par exemple :

[sourcecode:html]
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}[/sourcecode]

Peut également être représenté sous la forme :

[sourcecode:html]
{% raw %}<!-- Externalize templates to avoid nesting. -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}[/sourcecode]

### Tables <a name="tables"></a>

Étant donné que les chaînes de modèle AMP doivent être spécifiées dans des éléments `<template>`, cela peut entraîner un comportement inattendu en raison de l'analyse du navigateur. Par exemple, les éléments `<table>` peuvent se traduire par l'adoption du texte (concept de [foster parenting](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables) en anglais). Dans l'exemple suivant :

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
  </tr>
</table>
</template>
{% endraw %}[/sourcecode]

Le navigateur va adopter les nœuds de texte {% raw %}`{{#foo}}`{% endraw %} et {% raw %}`{{/foo}}`{% endraw %}:

[sourcecode:html]
{% raw %}{{#foo}}
{{/foo}}

<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}[/sourcecode]

Pour remédier au problème, vous pouvez encapsuler les sections Mustache dans les commentaires HTML ({% raw %}`<!-- {{#bar}} -->`{% endraw %}, par exemple) en utilisant plutôt des éléments non table tels que `<div>` ou en utilisant une balise `<script type="text/plain">` pour définir vos modèles.

[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
  </tr>
</table>
</script>
{% endraw %}[/sourcecode]


### Échappement de guillemets simples ou doubles <a name="quote-escaping"></a>

Lorsque vous utilisez `amp-mustache` pour calculer des valeurs d'attribut, l'échappement de guillemets simples ou doubles peut poser problème. Par exemple :

[sourcecode:html]
{% raw %}<template type="amp-mustache">
<!-- A double-quote (") in foo will cause malformed HTML. -->
<amp-img alt="{{foo}}" src="example.jpg" width="100" height="100"></amp-img>

<!-- A single-quote (') or double-quote (") in bar will cause an AMP runtime parse error. -->
<button on="tap:AMP.setState({foo: &#39;{{bar}}&#39;})">Cliquer ici</button>
</template>
{% endraw %}[/sourcecode]



L'utilisation de codes de caractères HTML dans les variables {% raw %}`{{foo}}`{% endraw %} et {% raw %}`{{bar}}`{% endraw %} ne fonctionne pas, car Mustache interprète les caractères `&amp;` en HTML (par exemple, `&amp;quot;` -&gt; `&amp;amp;quot;`). Une solution consiste à utiliser des caractères fac-similé ; par exemple, ′ (`&prime;`) et ″ (`&Prime;`).

Il existe une [proposition ouverte](https://github.com/ampproject/amphtml/issues/8395) pour effectuer plutôt cette substitution dans le composant `amp-mustache`. N'hésitez pas à commenter le problème si vous souhaitez apporter votre aide.

### Entités HTML <a name="html-entities"></a>

Les entités HTML ne sont pas conservées dans les éléments `<template>`.

Cela peut poser problème si vous souhaitez effectuer un rendu côté serveur d'un élément `<template>` contenant du texte généré par l'utilisateur, car le texte qui contient {% raw %}`{{`, `}}`, `{{{`, `}}}`{% endraw %} sera traité comme une section Mustache. Par exemple, {% raw %}`{{`{% endraw %} ne peut pas être remplacé par les entités HTML `&lcub;&lcub;`, car elles ne sont pas conservées lorsque le navigateur analyse l'élément `<template>`.

Pour remédier à ce problème, vous pouvez remplacer des chaînes telles que {% raw %}`{{`{% endraw %} par des caractères différents ou les supprimer purement et simplement du contenu généré par l'utilisateur.

## Validation <a name="validation-1"></a>

Consultez les [règles relatives à amp-mustache](https://github.com/ampproject/amphtml/blob/main/extensions/amp-mustache/validator-amp-mustache.protoascii) dans les spécifications du validateur AMP.

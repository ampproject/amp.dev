---
'$title': Spécification AMP pour les annonces
$order: 3
formats:
  - ads
teaser:
  text: _Si vous souhaitez proposer des modifications à la norme, veuillez laisser un commentaire dans [Intention
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

_Si vous souhaitez proposer des modifications à la norme, veuillez laisser un commentaire dans [Intention de mise en œuvre](https://github.com/ampproject/amphtml/issues/4264)_.

Les annonces AMPHTML sont un mécanisme permettant de diffuser des annonces rapides et performantes sur des pages AMP. Pour assurer la diffusion rapide et fluide des documents publicitaires AMPHTML (« publicités AMP ») dans le navigateur ainsi qu'une expérience utilisateur optimale, les publicités AMP doivent obéir à un ensemble de règles de validation. Dans le même esprit que les [règles du format AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml), les annonces AMPHTML ont accès à un ensemble limité de balises, de capacités et d'extensions autorisées.

## Règles de format d'annonce AMPHTML <a name="amphtml-ad-format-rules"></a>

Sauf indication contraire ci-dessous, la publicité doit obéir à toutes les règles données par les [règles du format AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html), incluses ici en guise de référence. Par exemple, le [modèle](#boilerplate) de l'annonce AMPHTML est différent du modèle standard AMP.

En outre, les publicités doivent respecter les règles suivantes:

<table>
<thead><tr>
  <th>Règle</th>
  <th>Logique</th>
</tr></thead>
<tbody>
<tr>
<td>Doit utiliser les types <code>&lt;html ⚡4ads></code> ou <code>&lt;html amp4ads></code> comme ses balises englobantes.</td>
<td>Permet aux validateurs d'identifier un document publicitaire en tant que document AMP général ou en tant que document publicitaire AMPHTML restreint et de l'envoyer en conséquence.</td>
</tr>
<tr>
<td>Doit inclure <code>&lt;script async src="https://cdn.ampproject.org/amp4ads-v0.js"></code> comme script d'exécution au lieu de <code>https://cdn.ampproject.org/v0.js</code>.</td>
<td>Permet des comportements d'exécution personnalisés pour les annonces AMP HTML diffusées dans des iframes d'origine croisée.</td>
</tr>
<tr>
<td>Ne doit pas inclure une balise Ne doit pas inclure une balise <code>&lt;link rel="canonical"></code>.</td>
<td>Les créations publicitaires n'ont pas de « version canonique non AMP » et ne seront pas indexées de manière indépendante par la recherche. L'auto-référencement serait donc inutile.</td>
</tr>
<tr>
<td>Peut inclure des métabalises facultatives dans l'en-tête HTML comme identifiants, au format <code>&lt;meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code>. Ces métabalises doivent être placées avant le script <code>amp4ads-v0.js</code>. Les valeurs de <code>vendor</code> et <code>id</code> sont des chaînes de caractères contenant uniquement [0-9a-zA-Z_-]. La valeur de <code>type</code> est soit <code>creative-id</code> soit <code>impression-id</code>.</td>
<td>Ces identificateurs personnalisés peuvent être utilisés pour identifier l'impression ou la publicité. Ils peuvent être utiles pour le signalement et le débogage. <br><br><p> Exemple:</p>
<pre>
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td>
<code>&lt;amp-analytics></code> le suivi de la visibilité ne peut cibler que le sélecteur d'annonces complètes, via <code>"visibilitySpec": {"selector": "amp-ad" }</code> tel que défini dans <a href="https://github.com/ampproject/amphtml/issues/4018">Ticket #4018</a> et <a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a>. En particulier, il ne doit pas cibler de sélecteurs des éléments de la création publicitaire.</td>
<td>Dans certains cas, les annonces AMPHTML peuvent choisir de diffuser une publicité dans une iframe, auquel cas l'analyse de la page cible ne peut cibler que l'iframe entière de toute façon, et n'aura pas accès à des sélecteurs plus fins. <br> <p>Exemple:</p> <pre>
&lt;amp-analytics id="nestedAnalytics">
  &lt;script type="application/json">
  {
    "requests": {
      "visibility": "https://example.com/nestedAmpAnalytics"
    },
    "triggers": {
      "visibilitySpec": {
      "selector": "amp-ad",
      "visiblePercentageMin": 50,
      "continuousTimeMin": 1000
      }
    }
  }
  &lt;/script>
&lt;/amp-analytics>
</pre> <p>Cette configuration envoie une requête à l'URL <code>https://example.com/nestedAmpAnalytics</code> lorsque 50% de l'annonce englobante a été continuellement visible à l'écran pendant 1 seconde.</p>
</td>
</tr>
</tbody>
</table>

### Modèle <a name="boilerplate"></a>

Les créations publicitaires AMP HTML nécessitent un modèle de style différent et considérablement plus simple que [les documents AMP généraux](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md):

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

_Logique:_ le style `amp-boilerplate` masque le contenu du corps jusqu'à ce que le runtime AMP soit prêt et puisse l'afficher. Si Javascript est désactivé ou si le runtime AMP ne se charge pas, le modèle par défaut garantit que le contenu sera finalement affiché malgré tout. Dans les annonces AMPHTML, cependant, si Javascript est entièrement désactivé, les annonces AMPHTML ne seront pas exécutées et aucune annonce ne sera jamais diffusée, il n'est donc pas nécessaire d'utiliser la section `<noscript>`. En l'absence du runtime AMP, la plupart des machines sur lesquelles reposent les publicités AMPHTML (par exemple, les analyses pour le suivi de la visibilité ou `amp-img` pour l'affichage du contenu) ne seront pas disponibles, il est donc préférable de ne pas afficher d'annonce plutôt qu'une annonce défectueuse.

Enfin, le modèle d'annonce AMPHTML utilise `amp-a4a-boilerplate` plutôt que `amp-boilerplate` afin que les validateurs puissent facilement l'identifier et générer des messages d'erreur plus précis pour aider les développeurs.

Notez que les mêmes règles concernant les mutations du modèle de texte s'appliquent que dans le [modèle AMP général](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md).

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>Règle</th>
  <th>Logique</th>
</tr></thead>
<tbody>
  <tr>
    <td>
<code>position:fixed</code> et <code>position:sticky</code> sont interdites dans un CSS de publicité.</td>
    <td>
<code>position:fixed</code> crée une rupture avec le shadow DOM dont dépendent les annonces AMPHTML. De plus, les annonces dans AMP ne sont déjà pas autorisées à utiliser une position fixe.</td>
  </tr>
  <tr>
    <td>
<code>touch-action</code> est interdite.</td>
    <td>Une annonce qui peut manipuler <code>touch-action</code> peut interférer avec la capacité de l'utilisateur à faire défiler le document hôte.</td>
  </tr>
  <tr>
    <td>Le CSS de publicité est limité à 20 000 octets.</td>
    <td>Les gros blocs CSS gonflent la publicité, augmentent la latence du réseau et dégradent les performances de la page.</td>
  </tr>
  <tr>
    <td>Les transitions et animation sont soumises à des restrictions supplémentaires.</td>
    <td>AMP doit pouvoir contrôler toutes les animations appartenant à une annonce, afin de pouvoir les arrêter lorsque l'annonce n'est pas à l'écran ou que les ressources système sont très faibles.</td>
  </tr>
  <tr>
    <td>Les préfixes spécifiques au fournisseur sont considérés comme des alias pour le même symbole sans le préfixe à des fins de validation. Cela signifie que si un symbole <code>foo</code> est interdit par les règles de validation CSS, alors le symbole <code>-vendor-foo</code> sera également interdit.</td>
    <td>Certaines propriétés préfixées par le fournisseur fournissent des fonctionnalités équivalentes à des propriétés qui sont autrement interdites ou contraintes en vertu de ces règles. <br><br><p> Exemple: <code>-webkit-transition</code> et <code>-moz-transition</code> sont tous deux considérés comme des alias de <code>transition</code>. Ils ne seront autorisés que dans des contextes où <code>transition</code> seul serait autorisé (voir la section <a href="#selectors">Sélecteurs</a> ci-dessous).</p>
</td>
  </tr>
</tbody>
</table>

#### Animations et transitions CSS <a name="css-animations-and-transitions"></a>

##### Sélecteurs <a name="selectors"></a>

Les propriétés `transition` et `animation` ne sont autorisées que sur les sélecteurs qui:

- Contiennent uniquement les propriétés `transition`, `animation`, `transform`, `visibility` ou `opacity`.

  _Logique:_ cela permet au runtime AMP de supprimer cette classe du contexte pour désactiver les animations, si nécessaire pour les performances de la page.

**Bon**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**Mauvais**

Propriété non autorisée dans la classe CSS.

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### Propriétés avec possibilité de transition et d'animation <a name="transitionable-and-animatable-properties"></a>

Les seules propriétés qui acceptent une transition sont l'opacité et la transformation. ( [Logique](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/) )

**Bon**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**Mauvais**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**Bon**

[sourcecode:css]
@keyframes turn {
from {
transform: rotate(180deg);
}

to {
transform: rotate(90deg);
}
}
[/sourcecode]

**Mauvais**

[sourcecode:css]
@keyframes slidein {
from {
margin-left: 100%;
width: 300%;
}

to {
margin-left: 0%;
width: 100%;
}
}
[/sourcecode]

### Extensions et fonctions intégrées AMP autorisées <a name="allowed-amp-extensions-and-builtins"></a>

Les modules d'extension AMP et les balises intégrées AMP suivants sont _autorisés_ dans une création publicitaire AMPHTML. Les extensions ou balises intégrées non explicitement répertoriées sont interdites.

- [amp-accordion](https://amp.dev/documentation/components/amp-accordion)
- [amp-ad-exit](https://amp.dev/documentation/components/amp-ad-exit)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- [amp-anim](https://amp.dev/documentation/components/amp-anim)
- [amp-animation](https://amp.dev/documentation/components/amp-animation)
- [amp-audio](https://amp.dev/documentation/components/amp-audio)
- [amp-bind](https://amp.dev/documentation/components/amp-bind)
- [amp-carousel](https://amp.dev/documentation/components/amp-carousel)
- [amp-fit-text](https://amp.dev/documentation/components/amp-fit-text)
- [amp-font](https://amp.dev/documentation/components/amp-font)
- [amp-form](https://amp.dev/documentation/components/amp-form)
- [amp-img](https://amp.dev/documentation/components/amp-img)
- [amp-layout](https://amp.dev/documentation/components/amp-layout)
- [amp-lightbox](https://amp.dev/documentation/components/amp-lightbox)
- amp-mraid, à titre expérimental. Si vous envisagez de l'utiliser, veuillez ouvrir un ticket sur [wg-monetization](https://github.com/ampproject/wg-monetization/issues/new) .
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

La plupart des omissions sont liées aux performances ou permettent de simplifier l'analyse des publicités AMPHTML.

_Exemple:_ `<amp-ad>` est omis de cette liste. Cela est explicitement interdit, car autoriser un `<amp-ad>` dans `<amp-ad>` pourrait potentiellement entraîner des cascades de chargement d'annonces illimitées, ce qui ne répond pas aux objectifs de performances des annonces AMPHTML.

_Exemple:_ `<amp-iframe>` est omis de cette liste. Il est interdit car les annonces pourraient l'utiliser pour exécuter du Javascript arbitraire et charger du contenu arbitraire. Les annonces souhaitant utiliser de telles fonctionnalités doivent renvoyer `false` partir de leur entrée [a4aRegistry](https://github.com/ampproject/amphtml/blob/main/ads/_a4a-config.js#L40) et utiliser le mécanisme de diffusion d'annonce '3p iframe' existant.

_Exemple:_ `<amp-facebook>` , `<amp-instagram>` , `<amp-twitter>` et `<amp-youtube>` sont tous omis pour la même raison que `<amp-iframe>`: ils créent tous des iframes et peuvent potentiellement consommer des ressources illimitées.

_Exemple:_ `<amp-ad-network-*-impl>` sont omis de cette liste. La balise `<amp-ad>` gère la délégation à ces balises d'implémentation; les publicités ne doivent pas tenter de les inclure directement.

_Exemple:_ `<amp-lightbox>` n'est pas encore inclus, car certaines créations publicitaires AMPHTML peuvent même être diffusées dans une iframe et il n'existe actuellement aucun mécanisme permettant à une annonce de se développer au-delà d'une iframe. Si le besoin se fait ressentir, nous pourrons ajouter la prise en charge de cet élément prochainement.

### Balises HTML <a name="html-tags"></a>

Les balises suivantes sont _&nbsp;autorisées_ dans une création publicitaire AMPHTML. Les balises non explicitement autorisées sont interdites. Cette liste est un sous-ensemble de la [ liste générale des balises AMP autorisées](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md). Comme cette liste, elle est ordonnée conformément aux spécifications HTML5 de la section 4 [Les éléments du HTML](http://www.w3.org/TR/html5/single-page.html#html-elements).

La plupart des omissions sont liées aux performances ou au fait que les balises ne sont pas au standard HTML5. Par exemple, `<noscript>` est omis car les annonces AMPHTML dépendent de l'activation de JavaScript. Par conséquent, un bloc `<noscript>` ne s'exécutera jamais et, par conséquent, ne fera que gonfler la publicité, consommer la bande passante et empirer la latence. De même, `<acronym>`, `<big>` , et autres sont interdits car ils ne sont pas compatibles HTML5.

#### 4.1 L'élément racine <a name="41-the-root-element"></a>

4.1.1 `<html>`

- Doit utiliser les types `<html ⚡4ads>` ou `<html amp4ads>`

#### 4.2 Métadonnées du document <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- Les balises `<link rel=...>` ne sont pas autorisées, à l'exception de `<link rel=stylesheet>`.

- **Remarque:** contrairement à l'AMP général, les balises `<link rel="canonical">` sont interdites.

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 Sections <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 Regroupement du contenu <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 Sémantique au niveau du texte <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 Modifications <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 Contenu intégré <a name="47-embedded-content"></a>

- Le contenu intégré est pris en charge uniquement via les balises AMP, telles que `<amp-img>` ou `<amp-video>`.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

Les balises SVG ne sont pas dans l'espace de noms HTML5. Ils sont répertoriés ci-dessous sans ID de section.

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title> `

#### 4.9 Données tabulaires <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 Formulaires <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 Script <a name="411-scripting"></a>

- À l'instar d'un document AMP général, l'élément `<head>` de la publicité doit contenir une balise `<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>`.
- Contrairement à l'AMP général, `<noscript>` est interdit.
  - _Logique: étant_ donné que les annonces AMPHTML nécessitent l'activation de Javascript pour fonctionner, les blocs `<noscript>` ne servent à rien dans les annonces AMPHTML et ne font que consommer la bande passante du réseau.
- Contrairement à l'AMP général, `<script type="application/ld+json">` est interdit.
  - _Logique:_ JSON LD est utilisé pour le balisage des données structurées sur les pages hôtes, mais les créations publicitaires ne sont pas des documents autonomes et ne contiennent pas de données structurées. Les blocs JSON LD qu'ils contiennent ne feraient que consommer la bande passante.
- Toutes les autres règles et exclusions de script et sont tirées de l'AMP général.

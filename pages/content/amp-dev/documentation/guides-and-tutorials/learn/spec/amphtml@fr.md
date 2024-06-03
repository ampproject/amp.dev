---
'$title': Spécification AMP HTML
$order: 8
formats:
  - websites
teaser:
  text: "AMP HTML est un sous-ensemble de HTML permettant de créer des pages de contenu telles que des articles de presse d'une manière qui garantit certaines caractéristiques de performances de base."
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-format.md.
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

AMP HTML est un sous-ensemble de HTML permettant de créer des pages de contenu telles que des articles de presse d'une manière qui garantit certaines caractéristiques de performances de base.

En tant que sous-ensemble de HTML, il impose certaines restrictions sur l'ensemble complet des balises et des fonctionnalités disponibles via HTML, mais il ne nécessite pas le développement de nouveaux moteurs d'affichage: les agents utilisateurs existants peuvent afficher AMP HTML comme tous les autres HTML.

[tip type="read-on"] Si vous êtes principalement intéressé par ce qui est autorisé et ce qui ne l'est pas dans AMP, regardez notre [vidéo d'introduction sur les limites d'AMP](https://www.youtube.com/watch?v=Gv8A4CktajQ). [/tip]

De plus, les documents AMP HTML peuvent être téléchargés sur un serveur Web et diffusés comme n'importe quel autre document HTML; aucune configuration spéciale n'est nécessaire pour le serveur. Cependant, ils sont également conçus pour être éventuellement diffusés via des systèmes de diffusion AMP spécialisés qui proxysent des documents AMP. Ces documents les diffusent depuis leur propre origine et sont autorisés à appliquer des transformations au document qui offrent des avantages de performance supplémentaires. Voici une liste incomplète des optimisations qu'un tel système de diffusion pourrait effectuer:

- Remplacez les références d'image par des images dimensionnées selon la fenêtre de la visionneuse.
- Images en ligne visibles au-dessus du pli.
- Variables CSS en ligne.
- Précharger les composants étendus.
- Réduire le HTML et le CSS.

AMP HTML utilise un ensemble d'éléments personnalisés contribués mais gérés et hébergés de manière centralisée pour implémenter des fonctionnalités avancées telles que des galeries d'images que l'on peut dans un document AMP HTML. Bien qu'il permette de styliser le document à l'aide du CSS personnalisé, il ne permet pas du JavaScript écrit par l'auteur au-delà de ce qui est fourni par les éléments personnalisés pour atteindre ses objectifs de performance.

En utilisant le format AMP, les producteurs de contenu rendent le contenu des fichiers AMP disponible pour l'exploration (sous réserve des restrictions du fichier robots.txt), la mise en cache et l'affichage par des tiers.

## Performance <a name="performance"></a>

Les performances prévisibles sont un objectif de conception clé pour AMP HTML. Nous visons principalement à réduire le délai avant que le contenu d'une page puisse être consommé/utilisé par l'utilisateur. Concrètement, cela signifie que:

- Les requêtes HTTP nécessaires à l'affichage et à la mise en page complète du document doivent être réduites.
- Les ressources telles que les images ou les publicités ne doivent être téléchargées que si elles sont susceptibles d'être vues par l'utilisateur.
- Les navigateurs doivent pouvoir calculer l'espace nécessaire à chaque ressource sur la page sans récupérer cette ressource.

## Le format AMP HTML <a name="the-amp-html-format"></a>

### Exemple de document <a name="sample-document"></a>

[sourcecode:html]

<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Sample document</title>
    <link rel="canonical" href="./regular-html-version.html" />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <style amp-custom>
      h1 {
        color: red;
      }
    </style>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Article headline",
        "image": ["thumbnail1.jpg"],
        "datePublished": "2015-02-05T08:00:00+08:00"
      }
    </script>
    <script
      async
      custom-element="amp-carousel"
      src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-ad"
      src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
    ></script>
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Sample document</h1>
    <p>
      Some text
      <amp-img src="sample.jpg" width="300" height="300"></amp-img>
    </p>
    <amp-ad
      width="300"
      height="250"
      type="a9"
      data-aax_size="300x250"
      data-aax_pubname="test123"
      data-aax_src="302"
    >
    </amp-ad>
  </body>
</html>
[/sourcecode]

### Balisage requis <a name="required-markup"></a>

Les documents AMP HTML DOIVENT

- <a name="dctp"></a>commencer par le type de document `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>contenir une balise `<html ⚡>` de niveau supérieur (`<html amp>` est également accepté). [🔗](#ampd)
- <a name="crps"></a>contenir les balises `<head>` et `<body>` (elles sont facultatives en HTML). [🔗](#crps)
- <a name="canon"></a>contenir une balise `<link rel="canonical" href="$SOME_URL">` dans leur en-tête qui pointe vers la version HTML normale du document AMP HTML ou vers elle-même si une telle version HTML n'existe pas. [🔗](#canon)
- <a name="chrs"></a>contenir une balise `<meta charset="utf-8">` comme premier enfant de la balise head. [🔗](#chrs)
- <a name="vprt"></a>contenir une balise `<meta name="viewport" content="width=device-width">` dans leur en-tête. Il est également recommandé d'ajouter `minimum-scale=1` and `initial-scale=1`. [🔗](#vprt)
- <a name="scrpt"></a>contenir une balise `<script async src="https://cdn.ampproject.org/v0.js"></script>` dans la balise head. [🔗](#scrpt)
- <a name="boilerplate"></a>contenir le [code du modèle AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md) (`head > style[amp-boilerplate]` et `noscript > style[amp-boilerplate]`) dan sleur balise head. [🔗](#boilerplate)

### Métadonnées <a name="metadata"></a>

Il est recommandé d'annoter les documents AMP HTML avec des métadonnées standardisées: [protocole Open Graph](http://ogp.me/) , [cartes Twitter](https://dev.twitter.com/cards/overview), etc.

Nous recommandons également de baliser les documents AMP HTML avec [schema.org/CreativeWork](https://schema.org/CreativeWork) ou l'un de ses types plus spécifiques tels que [schema.org/NewsArticle](https://schema.org/NewsArticle) ou [schema.org/BlogPosting](https://schema.org/BlogPosting).

### Balises HTML <a name="html-tags"></a>

Les balises HTML peuvent être utilisées telles quelles dans AMP HTML. Certaines balises ont des balises personnalisées équivalentes (telles que `<img>` et `<amp-img>`) et d'autres balises sont carrément interdites:

<table>
  <tr>
    <th width="30%">Balise</th>
    <th>Statut en AMP HTML</th>
  </tr>
  <tr>
    <td width="30%">script</td>
    <td>Interdite sauf si le type est <code>application/ld+json</code> , <code>application/json</code> ou <code>text/plain</code>. (D'autres valeurs non exécutables peuvent être ajoutées si nécessaire.) Exception faite de la balise de script obligatoire pour charger le runtime AMP et les balises de script pour charger les composants étendus.</td>
  </tr>
  <tr>
    <td width="30%">noscript</td>
    <td>Autorisée. Peut être utilisé n'importe où dans le document. Si elle est spécifiée, le contenu à l'intérieur de l'élément <code>&lt;noscript></code> affiche si JavaScript est désactivé par l'utilisateur.</td>
  </tr>
  <tr>
    <td width="30%">base</td>
    <td>interdite.</td>
  </tr>
  <tr>
    <td width="30%">img</td>
    <td>Remplacée par <code>amp-img</code>.<br> Please note: <code>&lt;img></code> est un <a href="https://www.w3.org/TR/html5/syntax.html#void-elements"> élément nul selon HTML5</a>, il n'a donc pas de balise fermante. Toutefois, <code>&lt;amp-img></code> a une balise fermante <code>&lt;/amp-img></code>.</td>
  </tr>
    <tr>
    <td width="30%">picture</td>
    <td>Interdite. Diffusez différents formats d'image à l'aide de l'attribut <a href="https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders?format=websites">fallback</a> ou fournissez plusieurs <a href="https://amp.dev/documentation/components/amp-img#attributes"><code>srcset</code> sur <code>&lt;amp-img></code></a>.</td>
  </tr>
  <tr>
    <td width="30%">video</td>
    <td>Remplacée par <code>amp-video</code>.</td>
  </tr>
  <tr>
    <td width="30%">audio</td>
    <td>Remplacée par <code>amp-audio</code>.</td>
  </tr>
  <tr>
    <td width="30%">iframe</td>
    <td>Remplacée par <code>amp-iframe</code>.</td>
  </tr>
    <tr>
    <td width="30%">frame</td>
    <td>interdite.</td>
  </tr>
  <tr>
    <td width="30%">frameset</td>
    <td>interdite.</td>
  </tr>
  <tr>
    <td width="30%">object</td>
    <td>interdite.</td>
  </tr>
  <tr>
    <td width="30%">param</td>
    <td>interdite.</td>
  </tr>
  <tr>
    <td width="30%">applet</td>
    <td>interdite.</td>
  </tr>
  <tr>
    <td width="30%">embed</td>
    <td>interdite.</td>
  </tr>
  <tr>
    <td width="30%">form</td>
    <td>Autorisée. Nécessite l'ajout de l'extension <a href="https://amp.dev/documentation/components/amp-form">amp-form</a>.</td>
  </tr>
  <tr>
    <td width="30%">input elements</td>
    <td>Très souvent autorisés, <a href="https://amp.dev/documentation/components/amp-form#inputs-and-fields">sauf pour certains types d'entrée</a>, notamment <code>&lt;input type="button"></code>, <code>&lt;button type="image">&lt;/button></code> ne sont pas valides. Les balises similaires sont aussi autorisées: <code>&lt;fieldset></code>, <code>&lt;label></code>
</td>
  </tr>
  <tr>
    <td width="30%">button</td>
    <td>Autorisée.</td>
  </tr>
  <tr>
    <td width="30%"><code><a name="cust"></a>style</code></td>
    <td>
<a href="#boilerplate">Balise de style requise pour amp-boilerplate</a>. Une balise de style supplémentaire est autorisée dans la balise head à des fins de style personnalisé. Cette balise de style doit avoir l'attribut <code>amp-custom</code>. <a href="#cust">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">link</td>
    <td> Les valeurs <code>rel</code> enregistrées sur <a href="http://microformats.org/wiki/existing-rel-values">microformats.org</a> sont autorisées. Si une valeur <code>rel</code> est manquante dans la liste blanche, <a href="https://github.com/ampproject/amphtml/issues/new">veuillez ouvrir un ticket</a>. <code>stylesheet</code> et les autres valeurs telles que <code>preconnect</code>, <code>prerender</code> et <code>prefetch</code> qui ont des effets secondaires dans le navigateurs sont interdites. Il existe un cas particulier pour la récupération des feuilles de style auprès des fournisseurs de polices de la liste blanche.</td>
  </tr>
  <tr>
    <td width="30%">meta</td>
    <td>L'attribut <code>http-equiv</code> peut être utilisé pour des valeurs autorisées spécifiques; voir la section <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">Spécification du validateur AMP</a> pour plus de détails.</td>
  </tr>
  <tr>
    <td width="30%"><code><a name="ancr"></a>a</code></td>
    <td>La valeur de l'attribut <code>href</code> ne doit pas commencer par <code>javascript:</code>. S'il est défini, la valeur de l'attribut <code>target</code> doit être <code>_blank</code>. Sinon, il ne sera pas autorisé. <a href="#ancr">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">svg</td>
    <td>La plupart des éléments SVG sont autorisés.</td>
  </tr>
</table>

Les implémentations du validateur doivent utiliser une liste blanche basée sur la spécification HTML5 et où les balises ci-dessus sont supprimées. Voir la section [Addendum aux balises AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-tag-addendum.md).

### Commentaires <a name="comments"></a>

Les commentaires HTML conditionnels ne sont pas autorisés.

### Attributs HTML <a name="html-attributes"></a>

Les noms d'attributs commençant par `on` (comme `onclick` ou `onmouseover`) ne sont pas autorisés dans AMP HTML. L'attribut ayant `on` (pas de suffixe) comme nom de littéral est autorisé.

Les attributs XML, tels que xmlns, xml: lang, xml: base et xml: space ne sont pas autorisés dans AMP HTML.

Les attributs AMP internes préfixés par `i-amp-` ne sont pas autorisés dans AMP HTML.

### Classes <a name="classes"></a>

Les noms de classe AMP internes préfixés par `-amp-` et `i-amp-` ne sont pas autorisés dans AMP HTML.

Consultez la [documentation AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-css-classes.md)pour la signification des noms de classes préfixés par `amp-`. L'utilisation de ces classes est autorisée et vise à permettre la personnalisation de certaines fonctionnalités du runtime AMP et de ses extensions.

Tous les autres noms de classe créés sont autorisés dans le balisage HTML AMP.

### Identifiants <a name="ids"></a>

Certains noms d'ID ne sont pas autorisés dans AMP HTML, tels que les ID précédés de `-amp-` et `i-amp-` qui peuvent entrer en conflit avec les ID AMP internes.

Consultez la documentation AMP pour les extensions spécifiques avant d'utiliser les ID `amp-` et `AMP` pour éviter tout conflit avec les fonctionnalités fournies par ces extensions, telles que `amp-access`.

Voir la liste complète des noms d'ID non autorisés en recherchant `mandatory-id-attr` [ici](https://github.com/ampproject/amphtml/blob/main/docs/spec/../validator/validator-main.protoascii).

### Liens <a name="links"></a>

Le schéma `javascript:` n'est pas autorisé.

### Feuilles de style <a name="stylesheets"></a>

Les principales balises sémantiques et les éléments personnalisés AMP sont fournis avec des styles par défaut pour rendre la création d'un document interactif raisonnablement facile. Une option permettant de désactiver les styles par défaut pourra être ajoutée ultérieurement.

#### Règles @<a name="-rules"></a>

Les règles @ suivantes sont autorisées dans les feuilles de style:

`@font-face`, `@keyframes`, `@media`, `@page`, `@supports`.

`@import` n'est pas autorisé. D'autres peuvent être ajoutés ultérieurement.

#### Feuilles de style de l'auteur <a name="author-stylesheets"></a>

Les auteurs peuvent ajouter des styles personnalisés à un document en utilisant une seule balise `<style amp-custom>` dans l'en-tête du document ou dans les styles intégrés.

Les règles `@keyframes` sont aurisées dans `<style amp-custom>`. Toutefois, s'il y en a beaucoup, il est recommandé de les placer dans une balise `<style amp-keyframes>` supplémentaire, qui doit être située à la fin du document AMP. Pour plus de détails, voir la section [Feuilles de styles d'images clés](#keyframes-stylesheet) de ce document.

#### Sélecteurs <a name="selectors"></a>

Les restrictions suivantes s'appliquent aux sélecteurs dans les feuilles de style d'auteur:

##### Noms de classe et de balise <a name="class-and-tag-names"></a>

Les noms de classe, les ID, les noms de balises et les attributs dans les feuilles de style de l'auteur peuvent ne pas commencer par la chaîne `-amp-` ou `i-amp-`. Celles-ci sont réservées à un usage interne par le runtime AMP. Par conséquent, la feuille de style de l'utilisateur peut ne pas faire référence aux sélecteurs CSS pour les classes `-amp-`, les ID `i-amp-` et les balises et attributs `i-amp-`. Ces classes, ID et noms de balises/attributs ne sont pas destinés à être personnalisés par les auteurs. Les auteurs, cependant, peuvent remplacer les styles des classes `amp-` et des balises pour toutes les propriétés CSS non explicitement interdites par les spécifications de ces composants.

Pour empêcher que l'utilisation des sélecteurs d'attributs ne contourne les limitations de nom de classe, il n'est généralement pas permis aux sélecteurs CSS de contenir des jetons et des chaînes commençant par `-amp-` et `i-amp-`.

#### Important <a name="important"></a>

L'utilisation du qualificatif `!important` n'est pas autorisée. Il s'agit d'une condition nécessaire pour permettre à AMP d'appliquer ses invariants de dimensionnement d'élément.

#### Propriétés <a name="properties"></a>

AMP autorise uniquement les transitions et les animations de propriétés qui peuvent être accélérées par GPU dans les navigateurs courants. Notre liste blanche comprend actuellement: `opacity` , `transform` (également `-vendorPrefix-transform`).

Dans les exemples suivants, `<property>` doit figurer dans la liste blanche ci-dessus.

- `transition <property>` (aussi -vendorPrefix-transition)
- `@keyframes name { from: {<property>: value} to {<property: value>} }` (aussi `@-vendorPrefix-keyframes`)

#### Taille maximum <a name="maximum-size"></a>

Il s'agit d'une erreur de validation si la feuille de style de l'auteur ou tous les styles intégrés sont supérieurs à 75 000 octets.

### Feuille de style d'mages clés <a name="keyframes-stylesheet"></a>

En plus de `<style amp-custom>`, les auteurs peuvent également ajouter la balise `<style amp-keyframes>`, qui est autorisée spécifiquement pour les animations d'images clés.

Les restrictions suivantes s'appliquent à la balise `<style amp-keyframes>`:

1. Ne peut être placé que comme dernier enfant de l'élément `<body>` du document.
2. Ne peut contenir que des règles `@keyframes`, `@media`, `@supports` et leur combinaison.
3. Ne peut pas dépasser 500 000 octets.

La raison pour laquelle la balise `<style amp-keyframes>` existe est que les règles d'images clés sont souvent volumineuses, même pour des animations moyennement compliquées, ce qui conduit à une analyse CSS lente et à une première peinture de contenu. Mais ces règles dépassent souvent la limite de taille imposée à `<style amp-custom>`. Mettre de telles déclarations d'images clés au bas du document dans `<style amp-keyframes>` leur permet de dépasser les limites de taille. Et puisque les images clés ne bloquent pas l'affichage, cela évite également de bloquer la première peinture de contenu pour les analyser.

Exemple:

[sourcecode:html]

<style amp-keyframes>
@keyframes anim1 {}

@media (min-width: 600px) {
  @keyframes anim1 {}
}
</style>
</body>
[/sourcecode]

### Polices personnalisées <a name="custom-fonts"></a>

Les auteurs peuvent inclure des feuilles de style pour les polices personnalisées. Les 2 méthodes prises en charge sont les balises de lien pointant vers les fournisseurs de polices de la liste blanche et l'inclusion de `@font-face`.

Exemple:

[sourcecode:html]

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Tangerine"
/>
[/sourcecode]

Les fournisseurs de polices peuvent figurer sur la liste blanche s'ils prennent en charge les intégrations CSS uniquement et diffuser via HTTPS. Les origines suivantes sont actuellement autorisées pour la diffusion de polices via des balises de lien:

- Fonts.com: `https://fast.fonts.net`
- Google Fonts: `https://fonts.googleapis.com`
- Font Awesome: `https://maxcdn.bootstrapcdn.com, https://use.fontawesome.com`
- [Typekit](https://helpx.adobe.com/typekit/using/google-amp.html): `https://use.typekit.net/kitId.css` (remplacer `kitId` en conséquence)

REMARQUE D'IMPLÉMENTATION: l'ajout à cette liste nécessite une modification de la règle AMP Cache CSP.

Les auteurs sont libres d'ajouter toutes les polices personnalisées via une instruction CSS `@font-face` via leur CSS personnalisé. Les polices ajoutées via `@font-face` doivent être récupérées via HTTP ou HTTPS.

## Runtime AMP <a name="amp-runtime"></a>

Le runtime AMP est un morceau de JavaScript qui s'exécute dans chaque document AMP. Il fournit des implémentations pour les éléments personnalisés AMP, gère le chargement et la hiérarchisation des ressources et ajoute éventuellement un validateur de runtime pour AMP HTML à utiliser pendant le développement.

Le runtime AMP se charge via la balise obligatoire `<script src="https://cdn.ampproject.org/v0.js"></script>` du document AMPS `<head>`.

Le runtime AMP peut être placé dans un mode de développement pour n'importe quelle page. Le mode de développement déclenchera la validation AMP sur la page intégrée, qui émettra l'état de validation et toutes les erreurs sur la console de développement JavaScript. Le mode de développement peut être déclenché en ajoutant `#development=1` à l'URL de la page.

## Ressources <a name="resources"></a>

Des ressources telles que des images, des vidéos, des fichiers audio ou des annonces doivent être incluses dans un fichier AMP HTML via des éléments personnalisés tels que `<amp-img>`. Nous les appelons « ressources gérées » car c'est le runtime AMP qui décide si et quand elles seront chargées et affichées à l'utilisateur.

Il n'y a pas de garanties particulières quant au comportement de chargement du runtime AMP, mais il doit généralement s'efforcer de charger les ressources assez rapidement, afin qu'elles soient chargées au moment où l'utilisateur voudrait les voir si possible. Le runtime doit hiérarchiser les ressources qui se trouvent actuellement dans la fenêtre et tenter de prédire les modifications apportées à la fenêtre et précharger les ressources en conséquence.

Le runtime AMP peut à tout moment décider de décharger des ressources qui ne sont pas actuellement dans la fenêtre ou de réutiliser les conteneurs de ressources tels que les iframes pour réduire la consommation globale de RAM.

## Composants AMP <a name="amp-components"></a>

AMP HTML utilise des éléments personnalisés appelés « composants AMP » pour remplacer les balises de chargement de ressources intégrées telles que `<img>` et `<video>` et pour implémenter des fonctionnalités avec des interactions complexes telles que des lightbox d'images ou des carrousels.

Consultez la section [Spécifications des composants AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-components.md) pour plus de détails sur les composants pris en charge.

Il existe 2 types de composants AMP pris en charge:

1. Intégrés
2. Étendus

Les composants intégrés sont toujours disponibles dans un document AMP et ont un élément personnalisé dédié tel que `<amp-img>`. Les composants étendus doivent être explicitement inclus dans le document.

### Attributs courants <a name="common-attributes"></a>

#### `layout`, `width`, `height`, `media`, `placeholder`, `fallback` <a name="layout-width-height-media-placeholder-fallback"></a>

Ces attributs définissent la mise en page d'un élément. L'objectif principal ici est de s'assurer que l'élément peut être affiché et que son espace peut être correctement réservé avant que l'une des ressources JavaScript ou distantes n'ait été téléchargée.

Voir la section [Système de mise en page AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-layout.md) pour plus de détails sur le système de mise en page.

#### `on` <a name="on"></a>

L'attribut `on` est utilisé pour installer des gestionnaires d'événements sur des éléments. Les événements pris en charge dépendent de l'élément.

La valeur de la syntaxe est un langage simple spécifique au domaine du formulaire:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

Example: `on="tap:fooId.showLightbox"`

Si `methodName` est omis, la méthode par défaut est exécutée si elle est définie pour l'élément. Exemple: `on="tap:fooId"`

Certaines actions, si elles sont documentées, peuvent accepter des arguments. Les arguments sont définis entre parenthèses dans la notation `key=value`. Les valeurs acceptées sont:

- chaînes simples sans guillemets: `simple-value`;
- chaînes entre guillemets: `"string value"` ou `'string value'`;
- valeurs booléennes: `true` ou `false`;
- nombres: `11` ou `1.1`.

Vous pouvez écouter plusieurs événements sur un élément en séparant les deux événements par un point-virgule `;`.

Exemple: `on="submit-success:lightbox1;submit-error:lightbox2"`

Plus de détails sur les [Actions et événements AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-actions-and-events.md).

### Composants étendus <a name="extended-components"></a>

Les composants étendus sont des composants qui ne sont pas nécessairement fournis avec le runtime AMP. Ils doivent plutôt être explicitement inclus dans le document.

Les composants étendus sont chargés en incluant une balise `<script>` dans l'en-tête du document comme suit:

[sourcecode:html]

<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>

[/sourcecode]

La balise `<script>` doit avoir un attribut `async` et un attribut `custom-element` qui renvoie au nom de l'élément.

Les implémentations du runtime peuvent utiliser le nom pour afficher les caractères de remplacement de ces éléments.

L'URL du script doit commencer par `https://cdn.ampproject.org` et doit suivre une séquence très stricte de `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js`.

##### URL <a name="url"></a>

L'URL des composants étendus est de la forme:

[sourcecode:http]
https://cdn.ampproject.org/$RUNTIME_VERSION/$ELEMENT_NAME-$ELEMENT_VERSION.js
[/sourcecode]

##### Contrôle des versions <a name="versioning"></a>

Consultez la [politique de contrôle de version AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-versioning-policy.md).

### Modèles <a name="templates"></a>

Les modèles affichent HTML sur la base du contenu du modèle spécifique à la langue et des données JSON fournies.

Consultez les [spécifications du modèle AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-templates.md) pour plus de détails sur les modèles pris en charge.

Les modèles ne sont pas fournis avec le runtime AMP et doivent être téléchargés comme avec les éléments étendus. Les composants étendus sont chargés en incluant une balise `<script>` dans l'en-tête du document comme suit:

[sourcecode:html]

<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
></script>

[/sourcecode]

La balise `<script>` doit avoir un attribut `async` et un attribut `custom-template` qui renvoie au type de modèle. L'URL du script doit commencer par `https://cdn.ampproject.org` et doit suivre une séquence très stricte de `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js`.

Les modèles sont déclarés dans le document comme suit:

[sourcecode:html]
<template type="amp-mustache" id="template1">
Hello {% raw %}{{you}}{% endraw %}!
</template>
[/sourcecode]

L'attribut `type` est obligatoire et doit référencer un script `custom-template` déclaré.

L'attribut `id` est facultatif. Les éléments AMP individuels découvrent leurs propres modèles. Un scénario typique serait qu'un élément AMP recherche un `<template>` parmi ses enfants ou référencé par ID.

La syntaxe dans l'élément de modèle dépend du langage de modèle spécifique. Cependant, le langage du modèle peut être restreint dans AMP. Par exemple, conformément à l'élément "template", toutes les productions doivent être sur un DOM valide bien formé. Tous les produits du modèle sont également soumises à un nettoyage pour garantir un produit conforme AMP.

Pour en savoir plus sur la syntaxe et les restrictions d'un modèle, consultez la [documentation du modèle](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-templates.md#templates).

##### URL <a name="url-1"></a>

L'URL des composants étendus est de la forme:

[sourcecode:http]
https://cdn.ampproject.org/$RUNTIME_VERSION/$TEMPLATE_TYPE-$TEMPLATE_VERSION.js
[/sourcecode]

##### Contrôle des versions <a name="versioning-1"></a>

Voir le contrôle des versions des éléments personnalisés pour plus de détails.

## Sécurité <a name="security"></a>

Les documents AMP HTML ne doivent pas déclencher d'erreurs lorsqu'ils sont diffusés avec une politique de sécurité de contenu qui n'inclut pas les mots clés `unsafe-inline` et `unsafe-eval`.

Le format AMP HTML est conçu pour que ce soit toujours le cas.

Tous les éléments du modèle AMP doivent passer par un examen de sécurité AMP avant de pouvoir être envoyés dans le référentiel AMP.

## SVG <a name="svg"></a>

Actuellement, les éléments SVG suivants sont autorisés:

- bases: "g", "glyph", "glyphRef", "image", "marker", "metadata", "path", "solidcolor", "svg", "switch", "view"
- formes: "circle", "ellipse", "line", "polygon", "polyline", "rect"
- texte: "text", "textPath", "tref", "tspan"
- affichage: "clipPath", "filter", "hkern", "linearGradient", "mask", "pattern", "radialGradient", "vkern"
- spécial: "defs" (all children above are allowed here), "symbol", "use"
- filtre: "feColorMatrix", "feComposite", "feGaussianBlur", "feMerge", "feMergeNode", "feOffset", "foreignObject"
- ARIA: "desc", "title"

Ainsi que ces attributs:

- "xlink:href": seules les URL qui commencent par "#" sont autorisées
- "style"

## Découverte de documents AMP <a name="amp-document-discovery"></a>

Le mécanisme décrit ci-dessous fournit un moyen standard de découvrir à l'aide d'un logiciel si une version AMP existe pour un document canonique.

S'il existe un document AMP qui est une représentation alternative d'un document canonique, alors le document canonique doit pointer vers le document AMP via une balise de `link` avec la [relation "amphtml"](http://microformats.org/wiki/existing-rel-values#HTML5_link_type_extensions).

Exemple:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html" />
[/sourcecode]

Le document AMP en lui-même devrait pointer vers sa version canonique via une balise `link` avec la relation "canonical".

Exemple:

[sourcecode:html]

<link
  rel="canonical"
  href="https://www.example.com/url/to/canonical/document.html"
/>
[/sourcecode]

(Si une même ressource est à la fois le document AMP _et_ canonique, la relation canonique doit pointer vers elle-même: aucune relation "amphtml" n'est requise.)

Notez que pour une compatibilité plus large avec les systèmes qui consomment AMP, il devrait être possible de lire la relation "amphtml" sans exécuter JavaScript. (Autrement dit, la balise doit être présente dans le code HTML brut et non injectée via JavaScript.)

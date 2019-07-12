---
$category@: presentation
formats:
- websites
teaser:
  text: Format de narration visuelle détaillé.
---



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

# amp-story

<table>
  <tr>
    <td width="40%"><strong>Description</strong></td>
    <td>Format de narration visuelle détaillé.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Disponibilité</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">Test</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Mises en page compatibles</a></strong></td>
    <td>aucune</td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemples</strong></td>
    <td><ul>
      <li>Consultez l'exemple <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Hello World</a> sur AMP By Example.</li>
      <li>Suivez le didacticiel <a href="https://www.ampproject.org/docs/tutorials/visual_story">Create a visual AMP story</a> (Créer une story AMP visuelle).</li>
    </ul></td>
  </tr>
</table>

[tip type="ll callout('Important</b><a class="type_caution"] :
Il s'agit d'un composant expérimental en cours de développement. Si vous rencontrez un problème, [signalez-le à GitHub](https://github.com/ampproject/amphtml/issues/new).
[/tip]


## Remarques relatives à la version

| Version | Description                                                            |
|-------|----------------------------------------------------------------------|
| 1.0     | Version actuelle, depuis le 16 juillet 2018.                                     |
| 0.1     | Implémentation initiale.  Obsolète ; sera supprimée le 19 mars 2019. |

## Migration de la version 0.1 vers la version 1.0

Depuis le 16 juillet 2018, la version 0.1 est considérée comme obsolète. Elle sera supprimée le 19 mars 2019.  Cela peut entraîner de légères modifications, dans la mesure où vos stories seront automatiquement mises à niveau en vue d'utiliser la version 1.0.  Nous vous recommandons de faire migrer manuellement vos pages vers la version 1.0 avant cette date afin de garantir leur bon fonctionnement et de vous assurer que leur conception est correcte.

### Nouvelles fonctionnalités du bookend

Nous avons ajouté de nouvelles fonctionnalités au bookend amp-stories, ce qui permet une meilleure compatibilité avec les composants et des mises en page plus détaillées. Voici quelques-unes des modifications qui ont été effectuées :

* Les fournisseurs de partage sont triés en fonction de la configuration JSON.
* Nouveaux composants bookend :
    * Liens d'incitation à l'action
    * Zone de texte
    * Fiches en modes portrait et paysage</li>

Pour utiliser ces nouvelles fonctionnalités, ajoutez une balise `<amp-story-bookend>` en tant que dernier élément enfant de votre élément `<amp-story>` avec les attributs obligatoires comme suit :

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `src` and `layout=nodisplay` are required. -->
  <amp-story-bookend src="bookendv1.json" layout="nodisplay">
  </amp-story-bookend>
<amp-story>
```

Pour en savoir plus sur les nouveaux composants et sur la façon de les spécifier dans la configuration JSON, consultez la section [amp-story-bookend](#bookend-amp-story-bookend).

### Nouvelles exigences relatives aux métadonnées

Nous avons ajouté des attributs de métadonnées à l'élément `<amp-story>`. Ces attributs seront utilisés pour afficher un aperçu de la story dans l'écosystème des stories AMP. Ils peuvent, par exemple, être utilisés pour afficher un lien d'aperçu attrayant dans le bookend d'une story similaire. Fournir ces attributs permet également de s'assurer que la story pourra s'adapter aux expériences intégrées enrichies des stories AMP à venir.

```html
<!--</code>title<code>,</code>publisher<code>,</code>publisher-logo-src<code>and</code>poster-portrait-src` will soon be required. -->
<amp-story title="Ma story" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"></amp-story></p>

<!-- <code>poster-square-src</code> and <code>poster-landscape-src</code> are optional, but strongly recommended. -->
<amp-story title="Ma story" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg" poster-square-src="https://example.com/my-story/poster/1x1.jpg" poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
```

Notez que ces attributs de métadonnées complètent, mais ne remplacent pas, les données structurées (JSON-LD, par exemple) sur la page. Nous vous recommandons toutefois d'ajouter des [données structurées](https://developers.google.com/search/docs/data-types/article#amp-sd) à toutes vos pages AMP, y compris aux stories AMP.

Nouveaux attributs :

  | ATTRIBUT | DESCRIPTION |
  |--|--|
  | `title` [obligatoire] | Titre de la story. |
  | `publisher` [obligatoire] | Nom de l'éditeur de la story. |
  | `publisher-logo-src` [obligatoire] | Logo de l'éditeur au format carré (format 1x1) |
  | `poster-portrait-src` [obligatoire] | Poster de la story en mode portrait (format 3x4). |
  | `poster-square-src` | Poster de la story au format carré (format 1x1). |
  | `poster-landscape-src` | Poster de la story en mode paysage (format 4x3). |

#### Consignes relatives à `publisher-logo-src`

Les consignes suivantes s'appliquent à l'image du logo de l'éditeur :

* Vous devez utiliser un fichier raster, tel que `.jpg`, `.png` ou `.gif`.  Évitez les fichiers vectoriels, tels que `.svg` ou `.eps`.
* Aucune image animée n'est autorisée (les fichiers GIF animés, par exemple).
* La partie graphique du logo doit être lisible sur la couleur de fond.

<table>
  <tr>
    <td>
      <amp-img alt="Logo avec texte bleu sur fond blanc" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="Logo avec texte bleu sur fond blanc" src="img/publisher-logo-1.png">
          </noscript>
        </amp-img>
        Préféré
      </td>
      <td>
        <amp-img alt="Logo avec texte blanc sur fond bleu" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
          <noscript>
            <img alt="Logo avec texte blanc sur fond bleu" src="img/publisher-logo-2.png">
            </noscript>
          </amp-img>
          Préféré
        </td>
        <td>
          <amp-img alt="Logo avec texte bleu sur fond bleu" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
            <noscript>
              <img alt="Logo avec texte bleu sur fond bleu" src="img/publisher-logo-3.png">
              </noscript>
            </amp-img>
            À éviter
          </td>
        </tr>
      </table>

      * Le logo doit être de forme carrée, et non rectangulaire.
      * La couleur de fond ne peut pas être transparente.
      * Utilisez un seul logo par marque, lequel doit être le même dans toutes les stories AMP.
      * Le logo doit avoir une taille minimale de 96x96 pixels.

#### Consignes relatives au poster (pour `poster-portrait-src`, `poster-landscape-src` et `poster-square-src`)

Les consignes suivantes s'appliquent aux images poster de la story :

* L'image poster doit être représentative de l'intégralité de la story AMP.
* L'image poster doit être visible par l'utilisateur lorsqu'il commence la story AMP.  Cependant, l'URL du fichier image utilisée dans les métadonnées ne doit pas nécessairement correspondre exactement à celle utilisée sur la première page de la story.  L'URL utilisée dans les métadonnées peut inclure des modifications sur le plan de la taille et du recadrage, ainsi que de légers changements en matière de style à des fins de prévisualisation.
* L'image poster doit être un fichier raster, tel que `.jpg`, `.png` ou `.gif`.  Évitez les fichiers vectoriels, tels que `.svg` ou `.eps`.
* L'image poster doit être au format 3x4 pour le mode portrait, 4x3 pour le mode paysage et 1x1 pour le format carré.
* Si l'image poster provient d'un cadre d'une vidéo, la vignette doit être représentative de la vidéo. Par exemple, la première image d'une vidéo n'est généralement pas représentative.
* Chaque image poster doit respecter la taille minimale recommandée :
    * Portrait : 696 px x 928 px
    * Paysage : 928 px x 696 px
    * Carré : 928 px x 928 px</li>

## Aperçu

L'extension `amp-story` fournit un nouveau format d'affichage du contenu visuel que vous pouvez assembler dans un environnement de storytelling. Une story AMP permet de mettre à la disposition des utilisateurs des informations et des contenus condensés et visuellement attrayants.

<figure class="centered-fig">
  <amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="Exemple de story AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

## Format de story AMP

Une [story AMP](#story%3a-amp-story) est un document AMP HTML complet composé de [pages](#pages%3a-amp-story-page ), contenant à leur tour des [calques](#layers%3a-amp-story-grid-layer). Ces calques comprennent des éléments AMP et HTML, tels que des médias, des données analytiques, du texte, etc.

<amp-img alt="Hiérarchie des balises de story AMP" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Hiérarchie des balises de story AMP" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
    </noscript>
  </amp-img>

### Texte passe-partout

Le balisage suivant constitue un bon point de départ ou un texte passe-partout acceptable. Copiez-le et enregistrez-le dans un fichier portant l'extension `.html`.

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>Hello, amp-story</title>
    <link rel="canonical" href="http://example.ampproject.org/my-story.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal
    both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript>
      <style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none
        }
      </style>
    </noscript>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="my-first-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>Hello, amp-story!</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="my-second-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg2.gif" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>The End</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-bookend src="bookendv1.json" layout="nodisplay">
      </amp-story-bookend>
    </amp-story>
  </body>
</html>
```

Le contenu du corps de texte crée une story composée de deux pages.  Chaque page comprend une image de fond à fond perdu au-dessus de laquelle figure une chaîne de texte simple.

### Balisage obligatoire pour amp-story

Le format HTML de la story AMP respecte les [mêmes exigences de balisage qu'un document AMP HTML valide](https://www.ampproject.org/docs/reference/spec#required-markup), ainsi que quelques exigences supplémentaires :

| RÈGLE | DESCRIPTION |
|----|---|
| L'élément `<amp-story standalone>` est le seul élément enfant de `<body>`. | Identifie que le document est une story AMP. |
| Contenir une balise `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` en tant que troisième élément enfant de la balise `<head>`. | Inclut et charge la bibliothèque JS amp-story. |
| Contenir une balise `<link rel="canonical" href="$STORY_URL">` imbriquée dans `<head>`. | Le lien pointe vers la story proprement dite et l'identifie comme document canonique. |

## Story : `amp-story`

Le composant `amp-story` représente une story complète.  Le composant proprement dit met en œuvre le shell d'interface utilisateur, ce qui inclut la gestion des gestes et de la navigation, ainsi que l'insertion de l'interface utilisateur du shell de l'application (commandes, barre de progression, etc.).

<figure class="centered-fig">
  <amp-anim alt="exemple de composant amp-story" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="exemple de composant amp-story" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

### Exemple

```html
<amp-story
    standalone
    title="My Story"
    publisher="The AMP Team"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
    poster-square-src="https://example.com/my-story/poster/1x1.jpg"
    poster-landscape-src="https://example.com/my-story/poster/4x3.jpg"
    background-audio="my.mp3">
    <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-bookend src="./related.json"></amp-story-bookend>
</amp-story>
```

### Attributs

##### standalone [obligatoire]

Indique que le document AMP est une story.

##### title [obligatoire]

Titre de la story.

##### publisher [obligatoire]

Nom de l'éditeur de la story.

##### publisher-logo-src [obligatoire]

URL du logo de l'éditeur de la story au format carré (format 1x1). Exemple : `publisher-logo-src="https://example.com/logo/1x1.png"`, où 1x1.png est un logo d'une taille de 36x36 px.

##### poster-portrait-src [obligatoire]

URL du [poster de la story](#posters) en mode portrait (format 3x4).

##### supports-landscape [facultatif]

Active la compatibilité avec l'orientation paysage sur les appareils mobiles et permet un affichage en mode paysage à fond perdu sur les ordinateurs.

##### background-audio [facultatif]

URL d'un fichier audio diffusé pendant toute la durée de la story.

##### poster-square-src [facultatif]

URL du [poster de la story](#posters) au format carré (format 1x1).

##### poster-landscape-src [facultatif]

URL du [poster de la story](#posters) en mode paysage (format 4x3).

### Posters

On appelle "poster" l'image qui est affichée dans l'interface utilisateur jusqu'à ce que votre story soit chargée. En général, il peut s'agir du premier écran de votre story, même si vous pouvez choisir n'importe quelle image représentative.

### Enfants (du composant amp-story)

Le composant `<amp-story>` contient un ou plusieurs composants [`<amp-story-page>`](#pages%3a-amp-story-page ), contenant les différents écrans de la story.  La première page spécifiée dans l'ordre des documents est également la première affichée dans la story.

### Activation de l'orientation paysage et de l'interface pour ordinateur à fond perdu

Si l'attribut `supports-landscape` est spécifié dans l'élément `<amp-story>`, il offre les possibilités suivantes :

* Afficher la story lorsqu'un appareil mobile est placé en orientation paysage.
* Remplacer l'interface pour ordinateur par un mode immersif sans marges, en remplaçant les trois panneaux par défaut en mode portrait.

Utilisation : `<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">Avant :</span>
  <amp-anim alt="Interface d&#39;ordinateur de bureau à trois panneaux" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">Après :</span>
  <amp-anim alt="Interface d&#39;ordinateur de bureau sans marge" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## Pages : `amp-story-page`

Le composant `<amp-story-page>` représente le contenu à afficher sur une seule page d'une story.

<figure class="centered-fig">
  <amp-anim alt="Exemple de page 1" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
    <noscript>
      <img alt="Exemple de page 1" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
      </noscript>
    </amp-anim>
  </figure>
  <figure class="centered-fig">
    <amp-anim alt="Exemple de page 2" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
      <noscript>
        <img alt="Exemple de page 2" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
        </noscript>
      </amp-anim>
    </figure>

### Exemple

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-video layout="fill" src="background.mp4" poster="background.png" muted autoplay></amp-video>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>These are the Top 5 World's Most...</h1>
    <p>Jon Bersch</p>
    <p>May 18</p>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="bottom-third" src="a-logo.svg" width="64" height="64"></amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

### Attributs

##### id [obligatoire]

Identifiant unique de la page. Cet attribut peut être utilisé pour appliquer un style à la page et à ses descendants dans le code CSS. Il est également utilisé pour identifier, de manière unique, la page dans le fragment d'URL.

##### auto-advance-after [facultatif]

Indique à quel moment doit avoir lieu le passage automatique à la page suivante.  Si cet attribut est omis, la page n'avance pas automatiquement. L'attribut `auto-advance-after` doit avoir l'une des valeurs suivantes :

* Un [temps](https://developer.mozilla.org/fr/docs/Web/CSS/time) d'attente positif à respecter avant de passer automatiquement à la page suivante.
* Un ID d'une interface [HTMLMediaElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement) ou d'une vidéo video-interface dont la fin déclenchera l'avance automatique.

Par exemple :

```html
<amp-story-page id="tokyo" auto-advance-after="1s">
```

##### background-audio [facultatif]

URI d'un fichier audio qui est lu lorsque cette page est affichée.

Par exemple :

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">
```

### Enfants (du composant amp-story-page)

Le composant `<amp-story-page>` contient un ou plusieurs [calques](#layers)  qui sont empilés de bas en haut. Le premier calque spécifié dans le DOM se trouve en bas, tandis que le dernier calque qui y est spécifié se trouve en haut.

## Calques

Les calques sont empilés les uns sur les autres afin de créer l'effet visuel souhaité.

### `amp-story-grid-layer`

Le composant `<amp-story-grid-layer>` dispose ses éléments enfants dans une grille.  Sa mise en œuvre est basée sur la [spécification de grille CSS](https://www.w3.org/TR/css-grid-1/).

<div class="flex-images">
  <amp-img alt="Calque 1" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
  </amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Calque 2" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript></amp-img>
    <span class="special-char">+</span>
    <amp-img alt="Calque 3" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
      <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript></amp-img>
      <span class="special-char">=</span>
      <amp-img alt="Tous les calques" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
        <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript></amp-img>
      </div>

#### Attributs

##### template [obligatoire]

L'attribut `template` détermine la mise en page du calque de grille. Les modèles disponibles sont décrits dans la section [Modèles](#templates) ci-dessous.

##### grid-area [facultatif]

Cet attribut est spécifié sur les éléments enfants du composant `<amp-story-grid-layer>`. `grid-area` spécifie la zone nommée (en utilisant un attribut `template` qui les définit) dans laquelle doit apparaître l'élément contenant cet attribut.

Exemple

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Modèles

Vous trouverez, ci-dessous, les modèles pouvant être spécifiés pour la mise en page du calque de grille.

[tip type="success"]
Pour afficher les modèles de mise en page utilisés, consultez la [démonstration des calques sur AMP By Example](https://ampbyexample.com/stories/features/layouts/).
[/tip]

##### fill

Le modèle `fill` affiche son premier élément enfant à fond perdu (c'est-à-dire sans marges). Les autres enfants ne sont pas affichés.

Zones nommées : (aucune)

Exemple

<amp-img alt="Exemple de modèle de remplissage" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Exemple de modèle horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="fill">
  <amp-img src="cat.jpg"></amp-img>
</amp-story-grid-layer>
```

##### vertical

Le modèle `vertical` dispose ses éléments le long de l'axe des ordonnées.  Par défaut, ses éléments sont alignés en haut et peuvent occuper la totalité de l'écran le long de l'axe des abscisses.

Zones nommées : (aucune)

<amp-img alt="Exemple de modèle vertical" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Exemple de modèle horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="vertical">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### horizontal

Le modèle `horizontal` dispose ses éléments le long de l'axe des abscisses.  Par défaut, ses éléments sont alignés au début de la ligne et peuvent occuper la totalité de l'écran le long de l'axe des ordonnées.

Zones nommées : (aucune)

<amp-img alt="Exemple de modèle horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Exemple de modèle horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="horizontal">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### thirds

Le modèle `thirds` divise l'écran en trois lignes de taille identique et vous permet d'insérer du contenu dans chaque zone.

Zones nommées :

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="Exemple de modèle horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Exemple de modèle tiers" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Enfants

Un composant `amp-story-grid-layer` peut contenir l'un des éléments suivants :

**Remarque** : D'autres éléments seront ajoutés à cette liste au fil du temps.

<table>
  <tr>
    <th width="40%">Zone
    </th><th>Balises autorisées </th>
  </tr>
  <tr>
    <td>Médias</td>
    <td>
      <ul>
        <li><code>&lt;amp-audio></code></li>
        <li><code>&lt;amp-gfycat></code></li>
        <li><code>&lt;amp-google-vrview-image></code></li>
        <li><code>&lt;amp-img></code></li>
        <li><code>&lt;amp-video></code></li>
        <li><code>&lt;source></code></li>
        <li><code>&lt;svg></code></li>
        <li><code>&lt;track></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Analyses et mesures</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics></code></li>
        <li><code>&lt;amp-experiment></code></li>
        <li><code>&lt;amp-pixel></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Sections</td>
    <td>
      <ul>
        <li><code>&lt;address></code></li>
        <li><code>&lt;article></code></li>
        <li><code>&lt;aside></code></li>
        <li><code>&lt;footer></code></li>
        <li><code>&lt;h1>-&lt;h6></code></li>
        <li><code>&lt;header></code></li>
        <li><code>&lt;hgroup></code></li>
        <li><code>&lt;nav></code></li>
        <li><code>&lt;section></code></li>
        <li><code>&lt;amp-story-cta-layer></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Texte</td>
    <td>
      <ul>
        <li><code>&lt;abbr></code></li>
        <li><code>&lt;amp-fit-text></code></li>
        <li><code>&lt;amp-font></code></li>
        <li><code>&lt;amp-gist></code></li>
        <li><code>&lt;b></code></li>
        <li><code>&lt;bdi></code></li>
        <li><code>&lt;bdo></code></li>
        <li><code>&lt;blockquote></code></li>
        <li><code>&lt;br></code></li>
        <li><code>&lt;cite></code></li>
        <li><code>&lt;code></code></li>
        <li><code>&lt;data></code></li>
        <li><code>&lt;del></code></li>
        <li><code>&lt;dfn></code></li>
        <li><code>&lt;div></code></li>
        <li><code>&lt;em></code></li>
        <li><code>&lt;figcaption></code></li>
        <li><code>&lt;figure></code></li>
        <li><code>&lt;hr></code></li>
        <li><code>&lt;i></code></li>
        <li><code>&lt;ins></code></li>
        <li><code>&lt;kbd></code></li>
        <li><code>&lt;main></code></li>
        <li><code>&lt;mark></code></li>
        <li><code>&lt;p></code></li>
        <li><code>&lt;pre></code></li>
        <li><code>&lt;q></code></li>
        <li><code>&lt;rp></code></li>
        <li><code>&lt;rt></code></li>
        <li><code>&lt;rtc></code></li>
        <li><code>&lt;ruby></code></li>
        <li><code>&lt;s></code></li>
        <li><code>&lt;samp></code></li>
        <li><code>&lt;small></code></li>
        <li><code>&lt;span></code></li>
        <li><code>&lt;strong></code></li>
        <li><code>&lt;sub></code></li>
        <li><code>&lt;sup></code></li>
        <li><code>&lt;time></code></li>
        <li><code>&lt;u></code></li>
        <li><code>&lt;var></code></li>
        <li><code>&lt;wbr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Listes</td>
    <td>
      <ul>
        <li><code>&lt;amp-list></code></li>
        <li><code>&lt;amp-live-list></code></li>
        <li><code>&lt;dd></code></li>
        <li><code>&lt;dl></code></li>
        <li><code>&lt;dt></code></li>
        <li><code>&lt;li></code></li>
        <li><code>&lt;ol></code></li>
        <li><code>&lt;ul></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tables</td>
    <td>
      <ul>
        <li><code>&lt;caption></code></li>
        <li><code>&lt;col></code></li>
        <li><code>&lt;colgroup></code></li>
        <li><code>&lt;table></code></li>
        <li><code>&lt;tbody></code></li>
        <li><code>&lt;td></code></li>
        <li><code>&lt;tfoot></code></li>
        <li><code>&lt;th></code></li>
        <li><code>&lt;thead></code></li>
        <li><code>&lt;tr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Autre</td>
    <td>
      <ul>
        <li><code>&lt;amp-install-serviceworker></code></li>
        <li><code>&lt;noscript></code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

Le composant `<amp-story-cta-layer>` permet d'utiliser des éléments `<a>` et `<button>` à l'intérieur d'un composant `<amp-story-page>`.

#### Contraintes

* S'il est spécifié, l'élément `<amp-story-cta-layer>` doit être le dernier calque d'un composant `<amp-story-page>`. Par conséquent, chaque composant `<amp-story-page>` peut comporter exactement un ou aucun des éléments `<amp-story-cta-layer>`.
* Le positionnement et le dimensionnement de ce calque ne peuvent pas être définis. Les valeurs correspondent toujours à 100 % de la largeur de la page et à 20 % de sa hauteur, et l'alignement s'effectue sur le bas de la page.

#### Exemple

```html
<amp-story-page id="vertical-template-thirds">
  <amp-story-grid-layer template="thirds">
    <div class="content" grid-area="upper-third">Paragraph 1</div>
    <div class="content" grid-area="middle-third">Paragraph 2</div>
    <div class="content" grid-area="lower-third">Paragraph 3</div>
  </amp-story-grid-layer>
  <amp-story-cta-layer>
    <a href="https://www.ampproject.org" class="button">Outlink here!</a>
  </amp-story-cta-layer>
</amp-story-page>
```

<amp-img alt="Calque d&#39;incitation à l&#39;action" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
  <noscript>
    <img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
    </noscript>
  </amp-img>

  [Exemple complet dans le répertoire des exemples](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### Enfants

Le composant `amp-story-cta-layer` autorise essentiellement les mêmes descendants que `amp-story-grid-layer`, et accepte en outre les balises `<a>` et `<button>`.

Pour obtenir la liste mise à jour des éléments enfants compatibles, consultez le champ [amp-story-cta-layer-allowed-descendants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) dans les règles de validation.

## Pièces jointes à une page

### `amp-story-page-attachment`

<amp-img alt="Pièce jointe à la page de story AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
  <noscript>
    <img alt="Pièce jointe à la page de story AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
    </noscript>
  </amp-img>

  Vous pouvez joindre du contenu supplémentaire à une page de story.

  Les pièces jointes à une page de story vous permettent d'ajouter du contenu AMP HTML à des pages spécifiques. Les utilisateurs peuvent afficher ce contenu en balayant l'écran vers le haut ou en appuyant sur un élément d'incitation à l'action.
  Une invite d'interface utilisateur permettant d'ouvrir la pièce jointe est automatiquement ajoutée au bas de chaque page qui a configuré une pièce jointe.

  L'élément `<amp-story-page-attachment>` doit être le dernier enfant de `<amp-story-page>` et doit comporter l'attribut `layout="nodisplay"`. Le contenu AMP HTML de la pièce jointe doit être intégré dans votre story AMP, à l'intérieur de cette balise `<amp-story-page-attachment>`.

### Contenu et composants autorisés

Les pièces jointes à la page de la story autorisent les mêmes éléments HTML que la story AMP, ainsi que les composants supplémentaires répertoriés ci-dessous, comme des lecteurs vidéo tiers ou des intégrations de médias sociaux. Cela signifie que vous pouvez ajouter du contenu trop détaillé ou non autorisé dans une page de story AMP.

<details>
  <summary>Liste des composants AMP autorisés dans une pièce jointe à une page</summary>

  * `<amp-3d-gltf>`
  * `<amp-3q-player>`
  * `<amp-accordion>`
  * `<amp-audio>`
  * `<amp-beopinion>`
  * `<amp-bodymovin-animation>`
  * `<amp-brid-player>`
  * `<amp-brightcove>`
  * `<amp-byside-content>`
  * `<amp-call-tracking>`
  * `<amp-carousel>`
  * `<amp-dailymotion>`
  * `<amp-date-countdown>`
  * `<amp-embedly-card>`
  * `<amp-facebook>`
  * `<amp-facebook-comments>`
  * `<amp-facebook-like>`
  * `<amp-facebook-page>`
  * `<amp-fit-text>`
  * `<amp-fx-collection>`
  * `<amp-fx-flying-carpet>`
  * `<amp-gfycat>`
  * `<amp-gfycat>`
  * `<amp-gist>`
  * `<amp-gist>`
  * `<amp-google-document-embed>`
  * `<amp-google-vrview-image>`
  * `<amp-google-vrview-image>`
  * `<amp-hulu>`
  * `<amp-ima-video>`
  * `<amp-image-slider>`
  * `<amp-img>`
  * `<amp-imgur>`
  * `<amp-instagram>`
  * `<amp-izlesene>`
  * `<amp-jwplayer>`
  * `<amp-kaltura-player>`
  * `<amp-list>`
  * `<amp-list>`
  * `<amp-live-list> `
  * `<amp-live-list> `
  * `<amp-mathml>`
  * `<amp-mowplayer>`
  * `<amp-nexxtv-player>`
  * `<amp-o2-player>`
  * `<amp-ooyala-player>`
  * `<amp-pan-zoom>`
  * `<amp-pinterest>`
  * `<amp-playbuzz>`
  * `<amp-powr-player>`
  * `<amp-reach-player>`
  * `<amp-reddit>`
  * `<amp-riddle-quiz>`
  * `<amp-soundcloud>`
  * `<amp-springboard-player>`
  * `<amp-timeago>`
  * `<amp-twitter>`
  * `<amp-video>`
  * `<amp-video-iframe>`
  * `<amp-vimeo>`
  * `<amp-vine>`
  * `<amp-viqeo-player>`
  * `<amp-vk>`
  * `<amp-wistia-player>`
  * `<amp-yotpo>`
  * `<amp-youtube>`

</details>

### Exemple

```html
<amp-story-page id="foo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600">
    </amp-story-grid-layer>
  <amp-story-page-attachment layout="nodisplay">
    <h1>My title</h1>
    <p>Lots of interesting text with <a href="https://example.ampproject.org">links</a>!</p>
    <p>More text and a YouTube video!</p>
    <amp-youtube
        data-videoid="b4Vhdr8jtx0"
        layout="responsive"
        width="480" height="270">
      </amp-youtube>
    <p>And a tweet!</p>
    <amp-twitter
        data-tweetid="885634330868850689"
        layout="responsive"
        width="480" height="270">
      </amp-twitter>
  </amp-story-page-attachment>
</amp-story-page>
```

## Animations

Une animation d'entrée peut être associée à chaque élément situé à l'intérieur d'un composant `<amp-story-page>`.

Vous pouvez configurer des animations en spécifiant un ensemble d'[attributs d'animation](#animation-attributes) sur l'élément. Aucune autre extension AMP ou configuration n'est nécessaire.

### Effets d'animation

Les effets d'animation suivants sont disponibles en tant que préréglages pour les stories AMP :

| Nom du préréglage       | Durée par défaut (ms) | Retard par défaut (ms) |
|-----------------|---------------------| ------------------ |
| `drop`            | 1600                  | 0 |
| `fade-in`         | 500                   | 0 |
| `fly-in-bottom`   | 500                   | 0 |
| `fly-in-left`     | 500                   | 0 |
| `fly-in-right`    | 500                   | 0 |
| `fly-in-top`      | 500                   | 0 |
| `pulse`           | 500                   | 0 |
| `rotate-in-left`  | 700                   | 0 |
| `rotate-in-right` | 700                   | 0 |
| `twirl-in`        | 1000                  | 0 |
| `whoosh-in-left`  | 500                   | 0 |
| `whoosh-in-right` | 500                   | 0 |
| `pan-left`        | 1000                  | 0 |
| `pan-right`       | 1000                  | 0 |
| `pan-down`        | 1000                  | 0 |
| `pan-up`          | 1000                  | 0 |
| `zoom-in`         | 1000                  | 0 |
| `zoom-out`        | 1000                  | 0 |

[tip type="success"]
Rendez-vous sur AMP on Example pour voir une [démo de toutes les animations de stories AMP](https://ampbyexample.com/stories/features/animations/).
[/tip]

### Attributs d'animation

##### animate-in [obligatoire]

Utilisez cet attribut pour spécifier le nom du [préréglage de l'animation](#animation-effects) d'entrée.

*Exemple* : un en-tête apparaît depuis le côté gauche de la page.

```html
<h2 animate-in="fly-in-left">
  De gauche à droite
</h2>
```

##### animate-in-duration [facultatif]

Utilisez cet attribut pour indiquer la durée de l'animation d'entrée, en secondes ou en millisecondes (0,2 s ou 200 ms, par exemple). La durée par défaut dépend du préréglage d'animation que vous avez spécifié.

*Exemple* : un titre apparaît depuis le côté gauche de la page et l'animation se termine en moins d'une demi-seconde.

```html
<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
  De gauche à droite
</h2>
```

##### animate-in-delay [facultatif]

Utilisez cet attribut pour indiquer le délai avant le début de l'animation. La valeur doit être supérieure ou égale à 0 et exprimée en secondes ou en millisecondes (0,2 s ou 200 ms, par exemple). Le délai par défaut dépend du préréglage d'animation que vous avez spécifié.

*Exemple* : après 0,4 seconde, un en-tête apparaît depuis le côté gauche de la page et l'entrée se termine dans un délai de 0,5 seconde.

```html
<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
  De gauche à droite
</h2>
```

[tip type="note"]
Il n'est pas garanti que le délai de l'animation soit exact. Des délais supplémentaires peuvent être générés en chargeant l'extension `amp-animation` en arrière-plan, une fois que le premier élément animé a été analysé. Le contrat de l'attribut est défini sous la forme suivante : *retarder cette animation pendant au moins N millisecondes*. Cela s'applique à tous les éléments, y compris ceux dont le délai est de 0 seconde.
[/tip]

##### animate-in-after [facultatif]

Utilisez cet attribut pour enchaîner des animations ou les lire dans un certain ordre (par exemple, animation2 commence une fois qu'animation1 est terminée). Indiquez l'ID de l'élément animé qui sera suivi de l'animation de cet élément. L'élément doit figurer sur le même composant `<amp-story-page>`. Le délai est appliqué une fois l'animation de l'élément précédent terminée. Pour plus d'informations, reportez-vous à la section [Enchaîner les animations](#sequencing-animations) ci-dessous.

Par exemple, dans le code suivant, `object2` s'anime une fois que l'élément `object1` a terminé son entrée :

```html
<amp-story-page id="page1">
  <amp-story-grid-layer template="vertical">
    <div id="object1"
        animate-in="rotate-in-left">
      1
    </div>
    <div id="object2"
        animate-in="fly-in-right"
        animate-in-after="object1">
      2. <!-- will start after object1 has finished -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

##### scale-start, scale-end [facultatif, fonctionne uniquement avec les animations `zoom-in` et `zoom-out`]

Utilisez ces deux attributs pour définir plus précisément les paramètres de vos animations de zoom avant (zoom in) et de zoom arrière (zoom out). La valeur doit être supérieure ou égale à 0 et les décimales sont autorisées. Les valeurs par défaut sont scale-start: 1 et scale-start: 3 pour le zoom avant ; il s'agit des valeurs inverses pour le zoom arrière.

*Exemple* : une image dont le facteur de zoom passe de 2 à 5 en 4 secondes.

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x [facultatif, fonctionne uniquement avec les animations `pan-left` et `pan-right`]

Utilisez cet attribut pour indiquer le déplacement horizontal de votre image dans une animation de type déplacement vers la gauche/vers la droite. La valeur doit être supérieure ou égale à 0 (en pixels). La valeur par défaut permet d'effectuer un panoramique sur toute la largeur de l'image spécifiée.

*Exemple* : une image qui se déplace de 200 pixels vers la gauche en 10 secondes.

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y [facultatif, fonctionne uniquement avec les animations `pan-up` et `pan-down`]

Utilisez cet attribut pour indiquer le déplacement vertical de votre image dans une animation de type déplacement vers le haut/vers le bas. La valeur doit être supérieure ou égale à 0 (en pixels). La valeur par défaut permet d'effectuer un panoramique sur toute la hauteur de l'image spécifiée.

*Exemple* : une image qui se déplace de 50 pixels vers le bas en 15 secondes.

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### Enchaîner les animations

Pour enchaîner des animations, utilisez l'attribut `animate-in-after`. Tous les éléments d'une chaîne donnée doivent figurer dans le même composant `<amp-story-page>`. Les éléments dépourvus de l'attribut `animate-in-after` n'appartiennent pas à une chaîne de séquence et démarrent séparément lors de l'apparition de la page.

```html
<amp-story-page id="my-sequencing-page">
  <amp-story-grid-layer template="vertical">
    <div class="circle"
        animate-in="drop-in"
        animate-in-duration="1.8s">
      1. <!-- will start independently -->
    </div>
    <div id="rotate-in-left-obj"
        class="square"
        animate-in="rotate-in-left"
        animate-in-after="fade-in-obj"
        animate-in-delay="0.2s">
      2. <!-- will start after fade-in-obj has finished -->
    </div>
    <div class="square"
        animate-in-after="rotate-in-left-obj"
        animate-in="whoosh-in-right"
        animate-in-delay="0.2s">
      3. <!-- will start after rotate-in-left-obj has finished -->
    </div>
    <div id="fade-in-obj"
        class="circle"
        animate-in="fade-in"
        animate-in-duration="2.2s">
      1. <!-- will start independently -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

### Combiner plusieurs animations

Vous pouvez appliquer plusieurs animations d'entrée à un seul élément (par exemple, un élément fait son apparition sur la page et, en même temps, effectue un fondu en ouverture). Il est impossible d'attribuer plusieurs préréglages d'animation à un seul élément. Toutefois, les éléments ayant des animations d'entrée différentes peuvent être imbriqués afin de n'en former qu'un seul.

```html
<div animate-in="fly-in-left">
  <div animate-in="fade-in">
    Effet volant et fondu à l'ouverture
  </div>
</div>
```

[tip type="note"]
Si une animation composée est censée démarrer à la suite de l'animation d'un élément distinct, assurez-vous que l'attribut `animate-in-after` de tous les éléments imbriqués qui la composent est défini sur le même `id`.
[/tip]

## Bookend : `amp-story-bookend`

`amp-story-bookend` est le dernier écran de la story. Il contient des liens associés, des options de partage, des liens d'incitation à l'action et bien plus encore.

<figure class="centered-fig">
  <amp-anim alt="exemple d&#39;article associé" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
    <noscript>
      <img alt="exemple d&#39;article associé" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
    </noscript>
  </amp-anim>
</figure>

Pour l'utiliser, insérez une balise `<amp-story-bookend>` en tant qu'élément enfant de `<amp-story>` avec l'attribut obligatoire `layout=nodisplay`.
Vous pouvez ensuite spécifier la configuration JSON dans un fichier distinct et l'importer via l'attribut `src` ou le placer de manière intégrée.

Importation de la configuration JSON via l'attribut `src` :

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `layout=nodisplay` is required. -->
  <amp-story-bookend src="bookendv1.json" layout=nodisplay>
  </amp-story-bookend>
<amp-story>
```

Si vous ne souhaitez pas extraire la configuration du bookend depuis un serveur, vous pouvez également l'indiquer de manière intégrée :

```html
<amp-story standalone>
  ...
  <amp-story-bookend layout=nodisplay>
    <script type="application/json">
      {
        bookendVersion: "v1.0",
        shareProviders: [ ... ],
        components: [ ... ]
      }
    </script>
  </amp-story-bookend>
<amp-story>
```

Vous devez ensuite renseigner la configuration JSON. C'est à cet endroit que vous pouvez personnaliser le bookend. La structure générale de la configuration se présente comme suit :

```text
{
  bookendVersion: "v1.0",
  shareProviders: [
    ...
  ],
  components: [
    ...
  ]
}
```

Vous devez indiquer que vous utilisez la version v1.0 en incluant la première ligne.

#### Composants du bookend

Le bookend est constitué de divers composants. Il peut s'agir d'articles, de liens d'incitation à l'action, de texte, etc.

Ces composants sont spécifiés dans le champ `components` du fichier JSON configuré. Pour obtenir un exemple, reportez-vous à la section [Exemple de réponse JSON](#example-json-response) ci-dessous.

##### heading

Le composant `heading` comprend un champ `text` qui peut être utilisé pour ajouter un titre à un groupe d'articles.

```json
{
  type: "heading",
  text: "More to Read"
}
```

<amp-img alt="Composant heading de bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
  <noscript>
    <img alt="Composant heading de bookend" src="img/amp-story-bookend-component-heading.png">
    </noscript>
  </amp-img>

##### small

Le composant `small` peut être utilisé pour créer des liens vers des articles associés. Les champs `title` et `url` sont obligatoires, tandis que `image` est facultatif.

```json
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/article.html",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Composant small de bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
  <noscript>
    <img alt="Composant small de bookend" src="img/amp-story-bookend-component-small.png">
    </noscript>
  </amp-img>

##### landscape

Le composant `landscape` peut être utilisé pour d'autres formats de contenu, comme des vidéos. Les champs suivants sont obligatoires : `title`, `url` et `image`. Vous pouvez éventuellement ajouter un champ `category` qui affiche un sous-titre au-dessus du titre.

```json
{
  type: "landscape",
  title: "TRAPPIST-1 Planets May Still Be Wet Enough for Life",
  url: "http://example.com/article.html",
  category: "astronomy",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Composant landscape de bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="Composant landscape de bookend" src="img/amp-story-bookend-component-landscape.png">
    </noscript>
  </amp-img>

##### portrait

Le composant `portrait` peut être utilisé pour créer un lien vers d'autres stories. Les champs suivants sont obligatoires : `title`, `url` et `image`. Vous pouvez éventuellement ajouter un champ `category` qui affiche un sous-titre au-dessus du titre.

```json
{
  type: "portrait",
  category: "Science",
  title: "New discovery found",
  url: "http://example.com/article.html",
  image: "http://placehold.it/312x416"
}
```

<amp-img alt="Composant portrait de bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="Composant portrait de bookend" src="img/amp-story-bookend-component-portrait.png">
  </noscript>
</amp-img>

##### cta-link

Le composant <code>cta-link</code> vous permet de spécifier des liens pour des incitations à l'action (<code>Read More</code> ou <code>Subscribe</code>, par exemple). Ce composant comprend une clé <code>links</code> qui spécifie un tableau de liens. Chaque lien est un objet avec des valeurs ```text</code> et <code>url</code>.

```json
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup"
      },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
}
```

<amp-img alt="Composant cta-links de bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
  <noscript>
    <img alt="Composant cta-links de bookend" src="img/amp-story-bookend-component-cta-links.png">
    </noscript>
  </amp-img>

##### textbox

Le composant `textbox` vous permet de spécifier du texte à l'intérieur du bookend (des références photographiques, par exemple). Ce composant nécessite un tableau <code>text</code> dont chaque élément est une ligne de texte.

```json
{
  type: "textbox",
  text: [
    Food by Enrique McPizza,
    Choreography by Gabriel Filly,
    Script by Alan Ecma S.,
    Direction by Jon Tarantino
  ]
}
```

<amp-img alt="Composant textbox de bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Composant textbox de bookend" src="img/amp-story-bookend-component-textbox.png">
    </noscript>
</amp-img>

**Création de liens AMP vers AMP**

Dans le cas des documents affichés dans un lecteur AMP, les liens pointent généralement vers le haut (`_top`) ou s'ouvrent dans une nouvelle fenêtre. Cependant, il se peut que les liens vers les pages AMP soient toujours affichés dans le lecteur. Pour autoriser ce comportement, ajoutez `"amphtml": true` à un composant qui accepte les liens. Par exemple :

```json
...
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/my-amp-document.html",
  image: "http://placehold.it/256x128",
  amphtml: true
},
{
  type: "cta-link",
  links: [{
      text: "Sign Up",
      url: "example.com/signup",
      amphtml: true
    },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
},
...
```

#### Partage sur les réseaux sociaux

La configuration relative au partage sur les réseaux sociaux est définie dans le champ `shareProviders` de l'objet de réponse ; elle est facultative.

Ce champ doit contenir une chaîne qui représente le nom d'un fournisseur de partage (par exemple, `twitter`).

Lorsque des paramètres supplémentaires sont requis, un objet avec des paires valeur/clé doit être utilisé. L'objet doit contenir une clé `provider` avec une valeur (`facebook`, par exemple) correspondant au nom du fournisseur. Les paires valeur/clé suivantes dépendent du fournisseur de partage.

La liste des fournisseurs disponibles est identique à celle proposée par le composant [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share).

Chacun de ces fournisseurs dispose d'un ensemble différent de paramètres disponibles ([voir `data-param-*`](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a)). L'objet de configuration utilise ces paramètres sans le préfixe `data-param-`(par exemple, `data-param-app_id` apparaît dans l'objet de configuration sous la forme `app_id`).

#### Configuration JSON

Le composant `<amp-story-bookend>` doit comporter un attribut `src` qui pointe vers la configuration JSON du bookend. Il est décrit comme un point de terminaison d'URL qui accepte les requêtes GET et renvoie une réponse JSON avec le contenu du bookend.  En cas d'omission, le composant amp-story affiche une interface utilisateur par défaut pour l'écran de fin. Le système extrait les données nécessaires à l'affichage des articles populaires et associés.  Ces données peuvent être diffusées à partir d'un fichier JSON statique ou générées de manière dynamique (pour calculer les tendances actuelles, par exemple).

#### Exemple de réponse JSON

```text
{
  // You must specify version v1.0.
  bookendVersion: "v1.0",
  shareProviders: [
    email,
    tumblr,
    {
      provider: "twitter",
      // You can add custom sharing parameters depending on the social platform.
      text: "This is custom share text that I would like for the Twitter platform"
    },
    {
      provider: "facebook",
      // Facebook requires an</code>app_id` param
      app_id: "MY_FACEBOOK_APP_ID"
    }
  ],
  components: [
    {
      type: "heading",
      text: "More to read"
    },
    {
      type: "small",
      title: "This is India an the best places you should go",
      url: "<a href="
      http: //example.com/article.html">http://example.com/article.html</a>",
        image: "<a href="
      http: //placehold.it/256x128">http://placehold.it/256x128</a>"
    },
    ...
  ]
}
```

## Autres composants utilisables dans des stories AMP

Vous trouverez, ci-dessous, d'autres composants utilisables dans des stories AMP qui nécessitent des mises en garde qui leur sont propres.

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

Pour les composants d'usage plus général, consultez la [liste des enfants autorisés](https://www.ampproject.org/docs/reference/components/amp-story#children).

## Validation

Consultez les [règles relatives à amp-story](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) dans les spécifications du validateur AMP.

## Localisation

Pour localiser votre story, insérez le code de langue dans l'attribut `lang` de sa balise `<html>` ; par exemple, `<html lang="en">` pour l'anglais.  Les codes de langue acceptés sont les suivants :

* ar (arabe)
* de (allemand)
* en-GB (anglais, Royaume-Uni)
* en (anglais, États-Unis)
* es-419 (espagnol, Amérique centrale/Amérique latine)
* es (espagnol, Espagne)
* fr-CA (français Canada)
* fr (français, France)
* hi (hindi)
* id (indonésien)
* it (italien)
* ja (japonais)
* ko (coréen)
* nl (néerlandais)
* no (norvégien)
* pt-BR (portugais, Brésil)
* pt (portugais, Portugal)
* ru (russe)
* tr (turc)
* vi (vietnamien)
* zh-TW (chinois traditionnel)
* zh (chinois simplifié)

Pour les langues qui s'écrivent de droite à gauche, vous pouvez, en outre, inclure l'attribut `dir="rtl"` dans la balise `<html>` de votre story.  Cet attribut peut également être utilisé avec le code de langue ; par exemple, `<html lang="ar" dir="rtl">`.

## Ressources associées

* [Tutorial: Create a visual AMP story](https://www.ampproject.org/docs/tutorials/visual_story)
* [Exemples sur AMP By Example](https://ampbyexample.com/stories/#stories/introduction)
* [Best practices for creating an AMP story](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>

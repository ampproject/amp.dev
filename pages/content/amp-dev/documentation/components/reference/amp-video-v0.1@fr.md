---
$title: amp-video
$category@: media
teaser:
  text: Remplacer la balise vidéo HTML5.
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



Ce composant remplace la balise `video` HTML5 ; il ne doit être utilisé que pour les intégrations directes de fichiers vidéo HTML5.

<table>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemples</strong></td>
    <td>AMP By Example :<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">Exemple de composant amp-video</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">Superposition click-to-play pour amp-video</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
      <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
    </tr>
  </table>

## Comportement <a name="behavior"></a>

Le composant `amp-video` charge de manière différée la ressource vidéo spécifiée par son attribut `src`, à une heure déterminée par l'environnement d'exécution. Vous pouvez contrôler un composant `amp-video` de la même manière qu'une balise `<video>` HTML5 standard.

Le composant `amp-video` accepte jusqu'à quatre types de nœuds HTML uniques en tant qu'éléments enfants :

* Balises `source` : comme pour la balise `<video>` HTML, vous pouvez ajouter des balises `<source>` enfants pour spécifier différents fichiers multimédias sources à lire.
* Balises `track` pour activer les sous-titres dans la vidéo. Si le titre est hébergé sur une origine différente de celle du document, vous devez ajouter l'attribut `crossorigin` à la balise `<amp-video>`.
* Espace réservé avant le lancement de la lecture de la vidéo.
* Création de remplacement si le navigateur n'accepte pas le contenu vidéo HTML5 : l'attribut `fallback` peut être affecté à un ou à aucun nœud enfant immédiat. Si cet attribut est utilisé, ce nœud et ses enfants constituent le contenu qui s'affiche si la vidéo HTML5 n'est pas acceptée par le navigateur de l'utilisateur.

#### Exemple <a name="example"></a>

[example preview="inline" playground="true" imports="amp-video"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  layout="responsive"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## Analyse <a name="analytics"></a>

Le composant `amp-video` est directement compatible avec la technologie d'analyse. Pour en savoir plus, consultez la page consacrée à l'[analyse vidéo](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).

## Attributs <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>Obligatoire si aucun élément enfant <code>&lt;source&gt;</code> n'est présent. Doit être au format HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>Image du cadre à afficher avant le début de la lecture de la vidéo. Par défaut, la première image est affichée.
      <br>
        Vous pouvez également présenter une superposition click-to-play. Pour en savoir plus, reportez-vous à la section <a href="#click-to-play-overlay">Superposition click-to-play</a> ci-dessous.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay</strong></td>
        <td>Si cet attribut est utilisé et que le navigateur est compatible avec la lecture automatique, la vidéo est lue automatiquement dès qu'elle est visible. Pour être lisible, le composant doit remplir certaines conditions, <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-video-interface.md#autoplay">exposées dans la spécification relative à la vidéo dans AMP</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controls</strong></td>
        <td>Cet attribut est semblable à l'attribut <code>controls</code> de la balise <code>video</code> HTML5. Si cet attribut est utilisé, le navigateur propose des commandes permettant à l'utilisateur de contrôler la lecture de la vidéo.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controlsList</strong></td>
        <td>Identique à l'attribut <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> de l'élément vidéo HTML5. Cet attribut est accepté uniquement par certains navigateurs. Pour plus d'informations à ce sujet, consultez la page <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Nécessite l'extension <code>amp-video-docking</code>.</strong> Si cet attribut est utilisé et que la vidéo est lue manuellement, cette dernière est" "réduite" et ancrée à un coin ou à un élément de la page lorsque l'utilisateur fait défiler la page au-delà la zone visuelle du composant vidéo.
            Pour en savoir plus, consultez la <a href="amp-video-docking.md">documentation relative à l'extension d'ancrage</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop</strong></td>
          <td>Si cet attribut est utilisé, la vidéo revient automatiquement au début lorsque la lecture est terminée.</td>
        </tr>
        <tr>
          <td width="40%"><strong>crossorigin</strong></td>
          <td>Obligatoire si une ressource <code>track</code> est hébergée sur une origine différente de celle du document.</td>
        </tr>
        <tr>
          <td width="40%"><strong>disableremoteplayback</strong></td>
          <td>Détermine si l'élément multimédia peut être associé à une interface de lecture à distance telle que Chromecast ou AirPlay.</td>
        </tr>
        <tr>
          <td width="40%"><strong>muted (obsolète)</strong></td>
          <td>L'attribut <code>muted</code> est obsolète et n'a plus aucun effet. L'attribut <code>autoplay</code> contrôle automatiquement la coupure du son.</td>
        </tr>
        <tr>
          <td width="40%"><strong>noaudio</strong></td>
          <td>Ajoute une annotation pour indiquer que la vidéo est dépourvue de contenu audio. Cet attribut masque l'icône d'égaliseur qui est affichée lorsque la vidéo peut être lue automatiquement.</td>
        </tr>
        <tr>
          <td width="40%"><strong>rotate-to-fullscreen</strong></td>
          <td>Si la vidéo est visible, elle s'affiche en mode plein écran après que l'utilisateur a fait pivoter son appareil en mode paysage. Pour plus d'informations, consultez la <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-video-interface.md#rotate-to-fullscreen">spécification relative à la vidéo dans AMP</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>common attributes</strong></td>
          <td>Cet élément inclut des <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributs communs</a> étendus aux composants AMP.</td>
        </tr>
      </table>

## Attributs de l'API Media Session <a name="media-session-api-attributes"></a>

Le composant `amp-video` met en œuvre l'[API Media Session](https://developers.google.com/web/updates/2017/02/media-session) qui permet aux développeurs de spécifier davantage d'informations sur le fichier vidéo. Ces informations supplémentaires sur la vidéo s'affichent dans le centre de notifications de l'appareil de l'utilisateur (avec les commandes de lecture et de mise en pause de la vidéo).

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>Indique l'URL d'une image PNG/JPG/ICO utilisée comme illustration de la vidéo. Si l'attribut "artwork" n'est pas utilisé, l'outil d'aide de l'API Media Session utilise le champ "image" de la définition "schema.org", la balise "og: image" ou la "favicon" du site Web.</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>Indique le nom de l'auteur du fichier vidéo, spécifié sous la forme d'une chaîne.</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>Indique l'album ou la collection dont est extraite la vidéo, spécifié sous la forme d'une chaîne.</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>Indique le nom ou le titre de la vidéo, spécifié sous la forme d'une chaîne. Si cet attribut n'est pas indiqué, l'outil d'aide de l'API Media Session utilise l'attribut "aria-label" "ou revient au titre de la page.</td>
  </tr>
</table>

Exemple :

Cet exemple contient à la fois les attributs `poster` et `artwork`. L'attribut `poster` sert d'image d'espace réservé avant la lecture de la vidéo, tandis que l'attribut `artwork` est l'image qui s'affiche dans la notification via l'API Media Session.

```html
<amp-video width="720" height="305" layout="responsive"
    src="https://yourhost.com/videos/myvideo.mp4"
    poster="https://yourhost.com/posters/poster.png"
    artwork="https://yourhost.com/artworks/artwork.png"
    title="Awesome video" artist="Awesome artist"
    album="Amazing album">
</amp-video>
```

## Superposition click-to-play <a name="click-to-play-overlay"></a>

La superposition click-to-play est une fonctionnalité d'utilisation courante pour les lecteurs vidéo sur le Web.  Vous pouvez, par exemple, afficher une icône de lecture personnalisée sur laquelle l'utilisateur peut cliquer, ou encore inclure le titre de la vidéo, des images poster de différentes tailles, etc.  Étant donné que le composant `amp-video` est compatible avec l'action AMP `play` standard, vous pouvez facilement mettre en œuvre la technologie click-to-play.

Pour obtenir un exemple détaillé, consultez la page [Superposition click-to-play pour amp-video](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/) sur AMP by Example.

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-video](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) dans les spécifications du validateur AMP.

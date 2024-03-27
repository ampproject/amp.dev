---
$title: amp-youtube
$category@: media
teaser:
  text: Afficher une vidéo YouTube.
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



Ce composant affiche une vidéo [YouTube](https://www.youtube.com/).

<table>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemples</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">Exemple de code annoté pour amp-youtube</a></td>
  </tr>
</table>

## Exemple <a name="example"></a>

Avec la mise en page responsive, les valeurs de largeur et de hauteur utilisées dans l'exemple ci-dessous doivent normalement générer des mises en page correctes pour les vidéos au format 16:9 :

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
  [/sourcecode]

  [sourcecode:html]
  <amp-youtube
      id="myLiveChannel"
      data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
      width="358"
      height="204"
      layout="responsive">
    <amp-img
      src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
      placeholder
      layout="fill"
      />
  </amp-youtube>
  [/sourcecode]

## Attributs <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>Si cet attribut est utilisé et que le navigateur est compatible avec la lecture automatique :
      <ul>
        <li>Le son de la vidéo est coupé automatiquement avant le début de la lecture automatique.
        </li>
        <li>Lorsque l'utilisateur fait défiler la page et que la vidéo n'est plus visible, la lecture est suspendue.
        </li>
        <li>Lorsque la vidéo est de nouveau visible, la lecture reprend.
        </li>
        <li>Lorsque l'utilisateur appuie sur la vidéo, le son est réactivé.
        </li>
        <li>Si l'utilisateur a interagi avec la vidéo (il a, par exemple, désactivé/réactivé le son ou bien suspendu/repris la lecture) et l'a ensuite fait défiler hors ou à l'intérieur de la fenêtre d'affichage, l'état de la vidéo reste inchangé. Par exemple, si l'utilisateur met la vidéo en pause, fait défiler la page de telle sorte que la vidéo ne soit plus visible, puis revient à la vidéo, la lecture est toujours en pause.
        </li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-videoid</strong></td>
      <td>ID vidéo YouTube figurant dans chaque URL de page de vidéo YouTube.
          Par exemple, dans l'URL "https://www.youtube.com/watch?v=Z1q71gFeRqM", <code>Z1q71gFeRqM</code> correspond à l'ID vidéo.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-live-channelid</strong></td>
        <td>ID de chaîne YouTube qui fournit une URL de diffusion en direct stable. Par exemple, dans l'URL "https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q", <code>UCB8Kb4pxYzsDsHxzBfnid4Q</code> correspond à l'ID de la chaîne. Vous pouvez indiquer un attribut <code>data-live-channelid</code> au lieu d'un attribut <code>data-videoid</code> afin d'intégrer une URL stable pour une diffusion en direct plutôt qu'une vidéo. Aucun espace réservé par défaut n'est spécifié pour les chaînes. Vous pouvez en fournir un conformément à l'exemple 2 ci-dessus.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-param-*</strong></td>
        <td>Tous les attributs <code>data-param-*</code> sont ajoutés en tant que paramètre de requête à l'attribut "iframe src" de YouTube. Vous pouvez utiliser cet attribut pour transmettre des valeurs personnalisées aux plug-ins YouTube (pour indiquer si les commandes doivent être affichées ou masquées, par exemple).
            Les clés et valeurs sont encodées sous forme d'URI. Le format camel case est utilisé pour les clés.
            <ul>
            <li>`data-param-controls=1` devient `&amp;controls=1`</li>
          </ul>
          Pour consulter les autres options disponibles pour les paramètres YouTube, rendez-vous sur la page <a href="https://developers.google.com/youtube/player_parameters">Paramètres du lecteur</a>.
        </td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Nécessite l'extension <code>amp-video-docking</code>.</strong> Si cet attribut est utilisé et que la vidéo est lue manuellement, cette dernière est" "réduite" et ancrée à un coin ou à un élément de la page lorsque l'utilisateur fait défiler la page au-delà de la zone visuelle du composant vidéo.
            Pour en savoir plus, consultez la <a href="amp-video-docking.md">documentation relative à l'extension d'ancrage</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>credentials (facultatif)</strong></td>
          <td>Définit une option <code>credentials</code> telle qu'elle est spécifiée par l'<a href="https://fetch.spec.whatwg.org/">API Fetch</a>.
            <ul>
              <li>Valeurs acceptées : `omit`, `include`</li>
              <li>Valeur par défaut : `include`</li>
            </ul>
            Si vous souhaitez utiliser le <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">lecteur YouTube en mode de confidentialité avancé</a>, transmettez la valeur <code>omit</code>.
            En général, YouTube définit ses cookies lorsque le lecteur est chargé. En mode de confidentialité avancé, les cookies sont définis lorsque l'internaute a cliqué sur le lecteur.</td>
          </tr>
          <tr>
            <td width="40%"><strong>common attributes</strong></td>
            <td>Cet élément inclut des <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributs communs</a> étendus aux composants AMP.</td>
          </tr>
        </table>

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-youtube](https://github.com/ampproject/amphtml/blob/main/extensions/amp-youtube/validator-amp-youtube.protoascii) dans les spécifications du validateur AMP.

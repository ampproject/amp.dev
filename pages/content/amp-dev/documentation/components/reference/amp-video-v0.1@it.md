---
$title: amp-video
$category@: media
teaser:
  text: Sostituisce il tag video HTML5.
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



Sostituisce il tag `video` HTML5. Deve essere utilizzato esclusivamente per gli incorporamenti di file video HTML5 diretti.

<table>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://ampjs.org/v0/amp-video-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td width="40%"><strong>Esempi</strong></td>
    <td>AMP By Example:<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">Esempio amp-video</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">Overlay click-to-play per amp-video</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
      <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
    </tr>
  </table>

## Comportamento <a name="behavior"></a>

Il componente `amp-video` carica in un momento determinato dal tempo di esecuzione la risorsa video specificata dall'attributo `src`. Puoi controllare un componente `amp-video` in modo molto simile a un tag `<video>` HTML5 standard.

Il componente `amp-video` accetta fino a quattro tipi unici di nodi HTML come secondari:

* Tag `source`: come per il tag `<video>` HTML, puoi aggiungere dei tag `<source>` secondari in modo da specificare diversi file multimediali sorgente da riprodurre.
* Tag `track` per attivare i sottotitoli nel video. Se la traccia è ospitata su un'origine diversa dal documento, devi aggiungere l'attributo `crossorigin` al tag `<amp-video>`.
* Un segnaposto che verrà visualizzato prima che inizi la riproduzione del video.
* Un fallback nel caso in cui il browser non supporti video HTML5: uno o zero nodi secondari immediati possono avere l'attributo `fallback`. Se presente, questo nodo e i suoi nodi secondari formano il contenuto visualizzato nel caso in cui il video HTML5 non sia supportato dal browser dell'utente.

#### Esempio <a name="example"></a>

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

## Analisi dei dati <a name="analytics"></a>

`amp-video` supporta l'analisi dei dati per impostazione predefinita. Per ulteriori informazioni, consulta la sezione [Analisi dei dati video](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).

## Attributi <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>Obbligatorio se non sono presenti <code>&lt;source&gt;</code> secondari. Deve essere HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>L'immagine del frame da visualizzare prima che la riproduzione del video abbia inizio. Per impostazione predefinita, viene mostrato il primo frame.
      <br>
        In alternativa, puoi mostrare un overlay click-to-play. Per ulteriori informazioni, consulta la sezione <a href="#click-to-play-overlay">Overlay click-to-play</a> di seguito.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay</strong></td>
        <td>Se questo attributo è presente e il browser supporta la riproduzione automatica, il video verrà riprodotto
            automaticamente non appena sarà visibile. Le condizioni che il componente deve soddisfare per
            essere visualizzato <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-video-interface.md#autoplay">sono elencate nella specifica dei video in AMP</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>controls</strong></td>
          <td>Questo attributo è simile all'attributo <code>controls</code> nel <code>video</code> HTML5. Se questo attributo è presente, il browser offre all'utente dei controlli per gestire la riproduzione del video.</td>
        </tr>
        <tr>
          <td width="40%"><strong>controlsList</strong></td>
          <td>Identico all'attributo <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> dell'elemento video HTML5 e supportato solo da determinati browser. Per i dettagli, vai alla pagina <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>dock</strong></td>
          <td><strong>Richiede l'estensione <code>amp-video-docking</code>.</strong> Se questo attributo è presente e il video viene riprodotto manualmente, il video è "ridotto a icona" e fissato a un angolo o a un elemento quando l'utente scorre all'esterno dell'area di visualizzazione del componente video.
              Per ulteriori informazioni, consulta la <a href="amp-video-docking.md">documentazione sull'estensione amp-video-docking</a>.</td>
          </tr>
          <tr>
            <td width="40%"><strong>loop</strong></td>
            <td>Se presente, il video tornerà automaticamente all'inizio una volta raggiunta la fine.</td>
          </tr>
          <tr>
            <td width="40%"><strong>crossorigin</strong></td>
            <td>Obbligatorio se una risorsa <code>track</code> è ospitata su un'origine diversa dal documento.</td>
          </tr>
          <tr>
            <td width="40%"><strong>disableremoteplayback</strong></td>
            <td>Determina se l'elemento multimediale può avere un'interfaccia utente per la riproduzione remota come Chromecast o AirPlay.</td>
          </tr>
          <tr>
            <td width="40%"><strong>muted (obsoleto)</strong></td>
            <td>L'attributo <code>muted</code> è obsoleto e non ha più alcun effetto. L'attributo <code>autoplay</code> controlla automaticamente il comportamento di disattivazione dell'audio.</td>
          </tr>
          <tr>
            <td width="40%"><strong>noaudio</strong></td>
            <td>Annota il video come privo di audio. Nasconde l'icona dell'equalizzatore normalmente
                visualizzata quando il video dispone della riproduzione automatica.</td>
            </tr>
            <tr>
              <td width="40%"><strong>rotate-to-fullscreen</strong></td>
              <td>Se il video è visibile, viene visualizzato a schermo intero dopo che l'utente ha ruotato il dispositivo in modalità orizzontale. Per ulteriori informazioni, consulta la <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-video-interface.md#rotate-to-fullscreen">specifica dei video in AMP</a>.</td>
            </tr>
            <tr>
              <td width="40%"><strong>common attributes</strong></td>
              <td>Questo elemento include <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributi comuni</a> estesi ai componenti AMP.</td>
            </tr>
          </table>

## Attributi dell'API Media Session <a name="media-session-api-attributes"></a>

Il componente `amp-video` implementa l'[API Media Session](https://developers.google.com/web/updates/2017/02/media-session), che permette agli sviluppatori di specificare più informazioni sul file video. Queste informazioni aggiuntive vengono visualizzate nel centro notifiche del dispositivo dell'utente insieme ai controlli di riproduzione/pausa.

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>Specifica un URL per un'immagine PNG/JPG/ICO utilizzata come artwork del video. Se `artwork` non è presente, l'assistente di API Media Session utilizza il campo `image` nella definizione `schema.org`, l'`og:image` o il `favicon` del sito web.</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>Indica l'autore del file video, specificato come stringa.</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>Indica l'album/raccolta a cui appartiene il video, specificato come stringa.</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>Indica il nome/titolo del video, specificato come stringa. Se non viene fornito, l'assistente dell'API Media Session utilizza l'attributo `aria-label` o il titolo della pagina.</td>
  </tr>
</table>

Esempio:

Questo esempio contiene gli attributi `poster` e `artwork`. L'attributo `poster` funge da immagine segnaposto prima della riproduzione del video, mentre `artwork` è l'immagine visualizzata nella notifica tramite l'API Media Session.

```html
<amp-video width="720" height="305" layout="responsive"
    src="https://yourhost.com/videos/myvideo.mp4"
    poster="https://yourhost.com/posters/poster.png"
    artwork="https://yourhost.com/artworks/artwork.png"
    title="Awesome video" artist="Awesome artist"
    album="Amazing album">
</amp-video>
```

## Overlay click-to-play <a name="click-to-play-overlay"></a>

La presenza di un overlay click-to-play è una funzione comune di UX per i lettori video disponibili sul Web.  Ad esempio, potresti mostrare un'icona di riproduzione personalizzata sulla quale l'utente può fare clic, includere il titolo del video, immagini di poster di varie dimensioni e così via.  Poiché il componente `amp-video` supporta l'azione AMP `play` standard, implementare il click-to-play è facile.

Per un esempio dettagliato, visita la sezione [Overlay click-to-play per amp-video](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/) del sito AMP By Example.

## Convalida <a name="validation"></a>

Consulta le [regole amp-video](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) nella specifica dello strumento di convalida AMP.

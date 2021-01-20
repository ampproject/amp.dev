---
$title: amp-youtube
$category@: media
teaser:
  text: Mostra un video di YouTube.
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



Mostra un video di [YouTube](https://www.youtube.com/).

<table>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Esempi</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">Esempio di codice annotato per amp-youtube</a></td>
  </tr>
</table>

## Esempio <a name="example"></a>

Grazie al layout adattabile, la larghezza e l'altezza dell'esempio dovrebbero produrre layout corretti per i video con proporzioni 16:9:

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

## Attributi <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>Se questo attributo è presente e il browser supporta la riproduzione automatica:
      <ul>
        <li>L'audio del video viene automaticamente disattivato prima che la riproduzione automatica abbia inizio
        </li>
        <li>Quando l'utente scorre fino a non visualizzare più il video, questo viene messo in pausa
        </li>
        <li>Quando l'utente scorre fino a visualizzare il video, la riproduzione di questo riprende
        </li>
        <li>Quando l'utente tocca il video, l'audio viene riattivato
        </li>
        <li>Se l'utente ha interagito con il video (ad esempio, attivando o disattivando l'audio, mettendo in pausa o riprendendo il video e così via) e l'utente scorre per attivare/disattivare la visualizzazione del video, lo stato del video rimane come l'aveva lasciato l'utente. Ad esempio, se l'utente mette in pausa il video, lo fa scorrere fino a che questo non è più visualizzato e infine torna al video, questo sarà ancora in pausa.
        </li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-videoid</strong></td>
      <td>L'ID video di YouTube presente nell'URL della pagina di un qualsiasi video di YouTube.
          Ad esempio, nell'URL https://www.youtube.com/watch?v=Z1q71gFeRqM, <code>Z1q71gFeRqM</code> è l'ID video.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-live-channelid</strong></td>
        <td>L'ID canale YouTube che fornisce un URL di live streaming stabile. Ad esempio, nell'URL https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q, <code>UCB8Kb4pxYzsDsHxzBfnid4Q</code> è l'ID canale. Puoi fornire un attributo <code>data-live-channelid</code> anziché <code>data-videoid</code> per incorporare un URL stabile per un live streaming anziché un video. I canali non dispongono di segnaposti predefiniti. Puoi fornire un segnaposto per il video come nell'esempio 2 precedente.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-param-*</strong></td>
        <td>Tutti gli attributi <code>data-param-*</code> saranno aggiunti come parametri di ricerca all'src iframe di YouTube. Può essere usato per trasferire valori personalizzati ai plugin di YouTube, ad esempio per mostrare o meno i controlli.
            Le chiavi e i valori utilizzeranno la codifica URI. Le chiavi utilizzeranno la notazione a cammello.
            <ul>
            <li>`data-param-controls=1` diventa `&amp;controls=1`</li>
          </ul>
          Consulta l'articolo relativo ai <a href="https://developers.google.com/youtube/player_parameters">parametri del player di YouTube incorporato</a> per ulteriori opzioni per i parametri di YouTube.
        </td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Richiede l'estensione <code>amp-video-docking</code>.</strong> Se questo attributo è presente e il video viene riprodotto manualmente, il video viene "ridotto a icona" e fissato a un angolo o un elemento quando l'utente scorre all'esterno dell'area di visualizzazione del componente video.
            Per ulteriori informazioni, consulta la <a href="amp-video-docking.md">documentazione relativa all'estensione amp-video-docking</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>credentials (facoltativo)</strong></td>
          <td>Definisce un'opzione <code>credentials</code> come specificato dall'<a href="https://fetch.spec.whatwg.org/">API Fetch</a>.
            <ul>
              <li>Valori supportati: `omit`, `include`</li>
              <li>Impostazione predefinita: `include`</li>
            </ul>
            Se vuoi utilizzare il <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">player di YouTube in una modalità di privacy ottimizzata</a>, trasmetti il valore di <code>omit</code>.
            In genere YouTube imposta i cookie quando viene caricato il player. Nella modalità di privacy ottimizzata, i cookie vengono impostati quando l'utente fa clic sul player.</td>
          </tr>
          <tr>
            <td width="40%"><strong>common attributes</strong></td>
            <td>Questo elemento include <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributi comuni</a> estesi ai componenti AMP.</td>
          </tr>
        </table>

## Convalida <a name="validation"></a>

Consulta le [regole amp-youtube](https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube/validator-amp-youtube.protoascii) nella specifica dello strumento di convalida AMP.

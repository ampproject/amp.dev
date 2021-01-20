---
$title: amp-social-share
$category@: ads-analytics
teaser:
  text: La funzione di monitoraggio della condivisione è in fase di sviluppo.
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



Mostra un pulsante di condivisione social.


<table>
  <tr>
    <td class="col-fourty"><strong>Script obbligatorio</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td>Vedi l'<a href="https://ampbyexample.com/components/amp-social-share/">esempio amp-social-share</a> del sito AMP By Example.</td>
  </tr>
</table>

## Panoramica <a name="overview"></a>

Il componente `amp-social-share` mostra un pulsante di condivisione per diversi fornitori di piattaforme social.

## Esempi <a name="examples"></a>

**Esempio: pulsante di condivisione social di base**

Il pulsante di condivisione indovina alcuni valori predefiniti per certi fornitori preconfigurati. Il pulsante presuppone che l'URL canonico del documento corrente sia l'URL che vuoi condividere e il titolo pagina il testo che vuoi condividere.

```html
<amp-social-share type="twitter"></amp-social-share>
```

**Esempio: trasmettere i parametri**

Se vuoi trasmettere dei parametri all'endpoint di condivisione, puoi specificare `data-param-<attribute>`, che verrà aggiunto all'endpoint di condivisione.
```html
<amp-social-share type="linkedin" width="60" height="44"
    data-param-text="Hello world"
    data-param-url="https://example.com/">
</amp-social-share>
```

Linkedin è uno dei fornitori preconfigurati, pertanto in questo caso non è necessario che tu fornisca l'attributo `data-share-endpoint`.

## Attributi <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (obbligatorio)</strong></td>
    <td>Seleziona un tipo di fornitore. È obbligatorio sia per i fornitori preconfigurati che per quelli non configurati.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>Specifica il target in cui aprire il target. Il valore predefinito è <code>&#95;blank</code> per tutti i casi eccetto email/SMS su iOS, dove invece il target è impostato su <code>&#95;top</code>.
        Tieni presente che suggeriamo di utilizzare questo override solo per le email.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-share-endpoint</strong></td>
      <td>Questo attributo è <strong>obbligatorio per i fornitori non configurati</strong>.
        <br>
          Alcuni fornitori popolari dispongono di endpoint di condivisione preconfigurati. Per ulteriori dettagli, consulta la sezione <a href="#pre-configured-providers">Fornitori preconfigurati</a>. Per i fornitori non configurati, devi specificare l'endpoint di condivisione.</td>
        </tr>
        <tr>
          <td width="40%"><strong>data-param-*</strong></td>
          <td>Tutti gli attributi con prefisso <code>data-param-*</code> vengono trasformati in parametri URL e trasmessi all'endpoint di condivisione.</td>
        </tr>
      </table>

## Fornitori preconfigurati <a name="pre-configured-providers"></a>

Il componente `amp-social-share` fornisce [alcuni fornitori preconfigurati](0.1/amp-social-share-config.js) che conoscono i loro endpoint di condivisione e alcuni parametri predefiniti.

<table>
  <tr>
    <th class="col-twenty">Fornitore</th>
    <th class="col-twenty">Tipo</th>
    <th>Parametri</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">API Web Share</a> (attiva la finestra di dialogo di condivisione del sistema operativo)</td>
    <td><code>system</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: facoltativo, il valore predefinito è: "Titolo della pagina corrente"</li>
        <li><code>data-mode</code>: facoltativo, se impostato su <code>replace</code>, tutte le altre opzioni di condivisione vengono rimosse</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Email</td>
    <td><code>email</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code>: facoltativo, il valore predefinito è: Titolo della pagina corrente</li>
        <li><code>data-param-body</code>: facoltativo, il valore predefinito è: URL di <code>rel=canonical</code></li>
        <li><code>data-param-recipient</code>: facoltativo, il valore predefinito è: '' (stringa vuota)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code>: <strong>obbligatorio</strong>, il valore predefinito è: nessuno. Questo parametro è l'<code>app_id</code> di Facebook, obbligatoria per la <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">finestra di dialogo di condivisione Facebook</a></li>
        <li><code>data-param-href</code>: facoltativo, il valore predefinito è: URL di <code>rel=canonical</code></li>
        <li><code>data-param-quote</code>: facoltativo. Può essere utilizzato per condividere una citazione o un testo</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: facoltativo, il valore predefinito è: URL di <code>rel=canonical</code></li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code>: facoltativo (ma vivamente consigliato), il valore predefinito è: nessuno. URL per i file multimediali da condividere su Pinterest. Se non è impostato, Pinterest chiederà all'utente finale di caricare un file multimediale.</li>
        <li><code>data-param-url</code>: facoltativo, il valore predefinito è: URL di <code>rel=canonical</code></li>
        <li><code>data-param-description</code>: facoltativo, il valore predefinito è: Titolo della pagina corrente</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>G+</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: facoltativo, il valore predefinito è: URL di <code>rel=canonical</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: facoltativo, il valore predefinito è: URL di <code>rel=canonical</code></li>
        <li><code>data-param-text</code>: facoltativo, il valore predefinito è: Titolo della pagina corrente</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: facoltativo, il valore predefinito è: URL di <code>rel=canonical</code></li>
        <li><code>data-param-text</code>: facoltativo, il valore predefinito è: Titolo della pagina corrente</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>WhatsApp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: facoltativo, il valore predefinito è: "Titolo della pagina corrente - URL della pagina corrente"</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: facoltativo, il valore predefinito è: URL di <code>rel=canonical</code></li>
        <li><code>data-param-text</code>: facoltativo, il valore predefinito è: Titolo della pagina corrente</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SMS</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code>: facoltativo, il valore predefinito è: URL di <code>rel=title - rel=canonical</code></li></ul>
      </td>
    </tr>
  </table>

## Fornitori non configurati <a name="non-configured-providers"></a>

Oltre ai fornitori preconfigurati, puoi utilizzare dei fornitori non configurati specificando attributi aggiuntivi nel componente `amp-social-share`.

**Esempio: creare un pulsante di condivisione per un fornitore non configurato**

Nell'esempio seguente, viene creato un pulsante di condivisione tramite Facebook Messenger impostando l'attributo `data-share-endpoint` sull'endpoint corretto per il protocollo personalizzato di Facebook Messenger.

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

Poiché questi fornitori non sono preconfigurati, dovrai creare immagini e stili appropriati ai pulsanti per il fornitore.

## Stili <a name="styles"></a>

### Stili predefiniti <a name="default-styles"></a>

Per impostazione predefinita, `amp-social-share` include alcuni fornitori preconfigurati. I pulsanti di questi fornitori sono abbinati al colore e al logo ufficiali del fornitore. La larghezza e l'altezza predefinite sono rispettivamente 60 px e 44 px.

[tip type="success"]
visita il sito [AMP Start](https://ampstart.com/components#links-and-sharing) per link di condivisione adattabili e preimpostati da utilizzare nelle tue pagine AMP.
[/tip]

### Stili personalizzati <a name="custom-styles"></a>

Se vuoi utilizzare un tuo stile personale, puoi semplicemente sostituire gli stili già forniti come segue:
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## Sostituzione delle variabili <a name="variable-substitution"></a>

Puoi utilizzare la [sostituzione delle variabili AMP globali](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) nell'elemento `<amp-social-share>`. Nell'esempio seguente, `TITLE` viene sostituito con il titolo pagina e `CANONICAL_URL` con l'URL canonico del documento.

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## Convalida <a name="validation"></a>

Consulta le [regole amp-social-share](https://github.com/ampproject/amphtml/blob/master/extensions/amp-social-share/validator-amp-social-share.protoascii) nella specifica dello strumento di convalida AMP.

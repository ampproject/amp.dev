---
$title: amp-addthis
$category@: social
teaser:
  text: Mostra un incorporamento degli strumenti del sito web AddThis.
---


<!--
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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



Mostra un incorporamento degli strumenti del sito web [AddThis](https://www.addthis.com).

<table>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-addthis" src="https://ampjs.org/v0/amp-addthis-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
</table>


## Perché AddThis? <a name="why-addthis"></a>

Il componente `amp-addthis` offre pulsanti di condivisione semplici e d'effetto. Consenti ai visitatori del tuo sito web di condividere più facilmente contenuti su oltre 200 canali social, tra cui Messenger, WhatsApp, Facebook, Twitter, Pinterest e molti altri.

Oltre 15.000.000 siti web si affidano ad AddThis, con oltre due miliardi di utenti unici che condividono contenuti in ogni angolo del mondo in più di 60 lingue.

## Pulsanti di condivisione <a name="share-buttons"></a>

### Floating <a name="floating"></a>

Ai lati, in alto o in basso nella pagina, segue il lettore mentre scorre. Un ottimo modo per promuovere la condivisione senza risultare troppo invadenti.

Esempio:
```html
<!--
  In questo esempio viene utilizzato un segnaposto pubId.
  Sostituisci il valore pubId con il valore che ti verrà fornito dopo
  aver creato un account su https://www.addthis.com/dashboard.
-->
<amp-addthis
width="320"
height="92"
layout="responsive"
data-pub-id="ra-5c191331410932ff"
data-widget-id="957l"
data-widget-type="floating">
</amp-addthis>
```

### Incorporato <a name="inline"></a>

Integra i pulsanti di condivisione nei tuoi contenuti per un'esperienza di condivisione senza interruzioni.

Esempio:
```html
<!--
  In questo esempio viene utilizzato un segnaposto pubId.
  Sostituisci il valore pubId con il valore che ti verrà fornito dopo
  aver creato un account su https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="mv93"
  data-widget-type="inline">
</amp-addthis>
```

## Attributi <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>data-pub-id</strong></td>
    <td>L'ID publisher di AddThis all'interno dell'URL nella <a href="https://addthis.com/dashboard">dashboard AddThis</a> dopo aver effettuato l'accesso. Ad esempio, nell'URL <code>https://www.addthis.com/dashboard#gallery/pub/ra-5c191331410932ff</code>, <code>ra-5c191331410932ff</code> è l'ID publisher.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-id</strong></td>
    <td>L'ID widget di AddThis per lo strumento da mostrare. Si trova anche nella <a href="https://addthis.com/dashboard">dashboard AddThis</a>. Per l'ID widget di uno strumento specifico, apri lo strumento in questione nella dashboard AddThis e copia l'ultima parte dell'URL. Ad esempio, nell'URL <code>https://www.addthis.com/dashboard#tool-config/pub/ra-5c191331410932ff/widgetId/957l</code>, <code>957l</code> è l'ID widget.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-type</strong></td>
    <td>Attributo che descrive il tipo di widget.
      <ul>
        <li>Floating: <code>data-widget-type="floating"</code></li>
        <li>Incorporato: <code>data-widget-type="inline"</code></li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-title</strong></td>
      <td>Facoltativo. Se impostato, indica il titolo che lo strumento AddThis tenterà di condividere durante la condivisione. Se non è impostato, verrà usato il titolo del documento che contiene il tag <code>amp-addthis</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-url</strong></td>
      <td>Facoltativo. Se impostato, indica l'URL che lo strumento AddThis tenterà di condividere durante la condivisione. Se non è impostato, verrà usata la proprietà <code>location.href</code> del documento che contiene il tag <code>amp-addthis</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-media</strong></td>
      <td>Facoltativo. Se impostato, indica l'URL di un elemento multimediale (ad esempio, un'immagine o un video) che lo strumento AddThis tenterà di condividere durante la condivisione. Se non è impostato, viene lasciato non definito.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-description</strong></td>
      <td>Facoltativo. Se impostato, indica la descrizione della pagina che lo strumento AddThis tenterà di condividere durante la condivisione. Se non è impostato, viene lasciato non definito.</td>
    </tr>
  </table>

## Documentazione sull'implementazione <a name="implementation-documentation"></a>

1. Se non lo hai già fatto, devi creare un account AddThis su [https://www.addthis.com/register](https://www.addthis.com/register). La creazione di un account è completamente gratuita e ti permette di accedere alla nostra suite completa di strumenti per siti web, così come ai rapporti di analisi approfonditi per meglio comprendere il traffico social del tuo sito.
1. Accedi alla [dashboard](https://addthis.com/dashboard) e personalizza i pulsanti di condivisione (al momento, AMP supporta solo i pulsanti Floating e Incorporato).
1. Personalizza i pulsanti di condivisione come preferisci, quindi premi "Attiva strumento". Verrai reindirizzato alla pagina Ottieni il codice.
1. Infine, copia e incolla il codice incorporato nella sezione della pagina in cui vuoi che appaiano i pulsanti di condivisione. Per i pulsanti di condivisione Floating, puoi inserire questo codice ovunque nella sezione body: il pulsante comparirà automaticamente sul lato destro o sinistro dello schermo, a seconda delle impostazioni dello strumento.

È tutto. A questo punto, dovresti visualizzare i pulsanti di condivisione nella tua pagina.

Guarda il nostro [video di YouTube](https://www.youtube.com/watch?v=BSkuAB4er2o) per le istruzioni passo passo:
<amp-youtube width="480" height="270" data-videoid="BSkuAB4er2o" layout="responsive"></amp-youtube>

## Convalida <a name="validation"></a>

Consulta le [regole amp-addthis](https://github.com/ampproject/amphtml/blob/main/extensions/amp-addthis/validator-amp-addthis.protoascii) nella specifica dello strumento di convalida AMP.

## Privacy <a name="privacy"></a>

[http://www.addthis.com/privacy/privacy-policy/](http://www.addthis.com/privacy/privacy-policy/)

Gli strumenti e la barra degli strumenti di AddThis raccolgono informazioni dal dispositivo utilizzato dall'Utente finale per interagire con i siti dei publisher o dall'Utente barra degli strumenti per interagire con la barra degli strumenti di AddThis ("Dati AddThis").

I Dati AddThis possono essere costituiti dai seguenti elementi:

* Indirizzo IP, ID Pubblicità per il mobile (MAID, permette agli sviluppatori di app per dispositivi mobili di identificare chi sta utilizzando le loro app), ID dell'applicazione per dispositivi mobili, tipo di browser, lingua del browser, tipo di sistema operativo e la data e l'ora in cui l'Utente finale ha visitato un sito o una barra degli strumenti del publisher;
* L'utente ha utilizzato la barra degli strumenti;
* Il comportamento su un sito del publisher, ad esempio quanto a lungo l'Utente finale è rimasto sul sito, il suo comportamento di condivisione dei contenuti del sito e il comportamento di scorrimento;
* L'URL di riferimento e la ricerca web utilizzati dall'Utente finale per individuare e raggiungere un sito del publisher;
* Le parole chiave inserite nella funzionalità di ricerca della barra degli strumenti di AddThis e se e quando l'Utente barra degli strumenti scarica, installa o disinstalla la barra degli strumenti di AddThis;
* Informazioni sulla frequenza d'uso da parte dell'Utente finale degli strumenti di AddThis e da parte dell'Utente barra degli strumenti della barra degli strumenti di AddThis; e
* I dati di geolocalizzazione ricavati dall'indirizzo IP dell'Utente finale e dell'Utente barra degli strumenti.

I dati AddThis saranno trattati come informazioni personali nella misura prevista dalla legge vigente. Ai sensi dei Termini di servizio di AddThis, i publisher devono ottenere tutti i consensi e le autorizzazioni degli utenti finali necessari e fornire a Oracle le comunicazioni obbligatorie per la fornitura dei dati AddThis raccolti dagli Utenti finali.

## Assistenza <a name="support"></a>

Se hai domande o ti serve aiuto per implementare AddThis su AMP, contatta il nostro team di assistenza inviando una richiesta di supporto [qui](https://www.addthis.com/support/) o un'email all'indirizzo [help@addthis.com](mailto%3ahelp@addthis.com).

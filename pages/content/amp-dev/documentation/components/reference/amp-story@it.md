---
$category@: presentation
formats:
- websites
teaser:
  text: Un formato completo di storytelling visivo.
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
    <td width="40%"><strong>Descrizione</strong></td>
    <td>Un formato completo di storytelling visivo.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Disponibilità</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">Sperimentale</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Layout supportati</a></strong></td>
    <td>nessuno</td>
  </tr>
  <tr>
    <td width="40%"><strong>Esempi</strong></td>
    <td><ul>
      <li>Vedi l'esempio <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Hello World</a> del sito AMP By Example.</li>
      <li>Impara dal tutorial su come <a href="https://www.ampproject.org/docs/tutorials/visual_story">creare una storia visiva AMP</a>.</li>
    </ul></td>
  </tr>
</table>

[tip type="caution"]
Questo componente è sperimentale e attualmente in fase di sviluppo. Per qualsiasi problema, [invia una segnalazione su GitHub](https://github.com/ampproject/amphtml/issues/new).
[/tip]

## Note sulla versione

| Versione | Descrizione                                                            |
|-------|----------------------------------------------------------------------|
| 1.0     | Versione attuale, dal 16/07/2018                                     |
| 0.1     | Implementazione iniziale.  Obsoleta, verrà rimossa il 19/03/2019 |

## Migrazione dalla versione 0.1 a 1.0

A partire dal 16/07/2018, la versione 0.1 è considerata obsoleta e verrà rimossa dal 19/03/2019.  Per questo motivo, potrebbero verificarsi piccole modifiche che possono provocare un errore, in quanto le storie verranno aggiornate in automatico in modo da utilizzare la versione 1.0.  Ti consigliamo di eseguire manualmente la migrazione delle pagine alla versione 1.0 prima di questa data, in modo da assicurare il loro corretto funzionamento e aspetto.

### Nuove funzionalità di bookend

Abbiamo aggiunto nuove funzionalità al bookend amp-stories, per meglio supportare i componenti e i layout visivi. Alcune delle modifiche sono riportate di seguito:

* I provider di condivisione vengono ordinati in base alla configurazione JSON.
* Nuovi componenti di bookend:
    * Link di invito all'azione
    * Casella di testo
    * Schede verticali e orizzontali</li>

Per utilizzare queste nuove funzionalità, aggiungi un tag `<amp-story-bookend>` come ultimo tag secondario di `<amp-story>`, con i seguenti attributi obbligatori:

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

Per ulteriori informazioni sui nuovi componenti e su come specificarli nella configurazione JSON, consulta la sezione [amp-story-bookend](#bookend-amp-story-bookend).

### Nuovi requisiti per i metadati

Abbiamo aggiunto nuovi attributi dei metadati all'elemento `<amp-story>`. Questi attributi saranno utilizzati per mostrare un'anteprima della storia nell'ecosistema delle storie AMP. Ad esempio, possono essere utilizzati per la visualizzazione di un link di anteprima coinvolgente nel bookend di una storia collegata. Fornire questi attributi aiuterà anche a garantire che la tua storia riesca a garantire esperienze complete e incorporate anche nelle future storie AMP.

```html
<!--</code>title<code>,</code>publisher<code>,</code>publisher-logo-src<code>and</code>poster-portrait-src` sarà presto obbligatorio. -->
<amp-story title="La mia storia" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"></amp-story></p>

<!-- <code>poster-square-src</code> e <code>poster-landscape-src</code> sono facoltativi, ma vivamente consigliati. -->
<amp-story title="La mia storia" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg" poster-square-src="https://example.com/my-story/poster/1x1.jpg" poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
```

Tieni presente che questi attributi di metadati integrano e non sostituiscono i dati strutturati (ad esempio, JSON-LD) della pagina. Ti consigliamo comunque di aggiungere i [dati strutturati](https://developers.google.com/search/docs/data-types/article#amp-sd) a tutte le tue pagine AMP, incluse le storie AMP.

I nuovi attributi:

| ATTRIBUTO | DESCRIZIONE |
|--|--|
| `title` [obbligatorio] | Il titolo della storia. |
| `publisher` [obbligatorio] | Il nome del publisher della storia. |
| `publisher-logo-src` [obbligatorio] | Il logo del publisher in formato quadrato (proporzioni 1 x 1). |
| `poster-portrait-src` [obbligatorio] | Il poster della storia in formato verticale (proporzioni 3 x 4). |
| `poster-square-src` | Il poster della storia in formato quadrato (proporzioni 1 x 1). |
| `poster-landscape-src` | Il poster della storia in formato orizzontale (proporzioni 4 x 3). |

#### Linee guida `publisher-logo-src`

Le seguenti linee guida si applicano all'immagine per il logo del publisher:

* Il file deve essere un file raster, ad esempio `.jpg`, `.png` o `.gif`.  Evita di utilizzare file vettoriali, come `.svg` o `.eps`.
* Evita le immagini animate, come le GIF animate.
* La parte grafica del logo deve essere leggibile sul colore di sfondo.

<table>
  <tr>
    <td>
      <amp-img alt="Logo con testo blu su sfondo bianco" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="Logo con testo blu su sfondo bianco" src="img/publisher-logo-1.png">
        </noscript>
      </amp-img>
      Preferita
    </td>
    <td>
      <amp-img alt="Logo con testo bianco su sfondo blu" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
        <noscript>
          <img alt="Logo con testo bianco su sfondo blu" src="img/publisher-logo-2.png">
        </noscript>
      </amp-img>
      Preferita
    </td>
    <td>
      <amp-img alt="Logo con testo blu su sfondo blu" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
        <noscript>
          <img alt="Logo con testo blu su sfondo blu" src="img/publisher-logo-3.png">
        </noscript>
      </amp-img>
      Da evitare
    </td>
  </tr>
</table>

* La forma del logo deve essere quadrata e non rettangolare.
* Il colore di sfondo non deve essere trasparente.
* Utilizza solo un logo per brand che sia coerente con le storie AMP.
* Il logo deve essere di almeno 96 x 96 pixel.

#### Linee guida per i poster (per `poster-portrait-src`, `poster-landscape-src` e `poster-square-src`)

Le seguenti linee guida si applicano all'immagine per il poster della storia:

* L'immagine poster deve essere rappresentativa dell'intera storia AMP.
* L'immagine poster deve essere visibile all'utente quando questo visualizza la storia AMP.  Tuttavia, non è necessario che l'URL del file immagine utilizzato nei metadati corrisponda esattamente all'URL utilizzato nella prima pagina della storia.  L'URL utilizzato nei metadati può includere il ridimensionamento, il ritaglio o piccole modifiche stilistiche per l'uso come anteprima.
* L'immagine poster deve essere un file raster, ad esempio `.jpg`, `.png` o `.gif`.  Evita di utilizzare file vettoriali, come `.svg` o `.eps`.
* L'immagine poster deve avere proporzioni 3 x 4 per il formato verticale, 4 x 3 per il formato orizzontale e 1 x 1 per il formato quadrato.
* Se l'immagine poster viene ricavata da un frame in un video, la miniatura deve esserne rappresentativa. Ad esempio, il primo frame di un video spesso non è rappresentativo.
* Ciascuna immagine poster deve rispettare le dimensioni minime consigliate:
    * Verticale: 696 x 928 px
    * Orizzontale: 928 x 696 px
    * Quadrato: 928 x 928 px</li>

## Panoramica

L'estensione `amp-story` offre un nuovo formato per la visualizzazione di contenuti visivi che è possibile assemblare in un'esperienza narrativa. Tramite una storia AMP puoi fornire agli utenti piccole quantità di informazioni e contenuti visivamente accattivanti.

<figure class="centered-fig">
  <amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="Esempio di storia AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

## Formato della storia AMP

Una [storia AMP](#story%3a-amp-story) è un documento HTML AMP completo formato da [pagine](#pages%3a-amp-story-page), composte a loro volta da [livelli](#layers%3a-amp-story-grid-layer) con al loro interno elementi AMP e HTML, ad esempio file multimediali, dati di analisi, testo e così via.

<amp-img alt="Gerarchia dei tag della storia AMP" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Gerarchia dei tag della storia AMP" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
    </noscript>
  </amp-img>

### Boilerplate

Il seguente markup è un buon punto di partenza o boilerplate. Copialo e salvalo come file con estensione `.html`.

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

Il contenuto nel corpo crea una storia di due pagine.  Ciascuna pagina è composta da un'immagine di sfondo al vivo, con una stringa di testo in sovrimpressione.

### Markup obbligatorio per amp-story

Il formato HTML della storia AMP segue gli [stessi requisiti di markup di un documento HTML AMP valido](https://www.ampproject.org/docs/reference/spec#required-markup), oltre ai seguenti requisiti aggiuntivi:

| REGOLA | DESCRIZIONE |
|----|---|
| L'elemento `<amp-story standalone>` è l'unico elemento secondario di `<body>`. | Identifica che il documento è una storia AMP. |
| Contiene un tag `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` come terzo elemento secondario del tag `<head>`. | Include e carica la libreria JS di amp-story. |
| Contiene un tag `<link rel="canonical" href="$STORY_URL">` all'interno di `<head>`. | Il link rimanda alla storia stessa, identificandola come il documento canonico. |

## Storia: `amp-story`

Il componente `amp-story` rappresenta un'intera storia.  Il componente implementa la shell UI, tra cui la gestione dei gesti e della navigazione e l'inserimento dell'UI shell dell'applicazione (controlli, barra di avanzamento e così via).

<figure class="centered-fig">
  <amp-anim alt="Esempio di amp-story" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="Esempio di amp-story" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

### Esempio

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

### Attributi

##### standalone [obbligatorio]

Identifica che il documento AMP è una storia.

##### title [obbligatorio]

Il titolo della storia.

##### publisher [obbligatorio]

Il nome del publisher della storia.

##### publisher-logo-src [obbligatorio]

Un URL per il logo del publisher in formato quadrato (proporzioni 1 x 1). Ad esempio, `publisher-logo-src="https://example.com/logo/1x1.png"`, dove 1x1.png è un logo da 36 x 36 px.

##### poster-portrait-src [obbligatorio]

Un URL per il [poster della storia](#posters) in formato verticale (proporzioni 3 x 4).

##### supports-landscape [facoltativo]

Consente il supporto per l'orientamento orizzontale sui dispositivi mobili e un'esperienza orizzontale al vivo sui dispositivi desktop.

##### background-audio [facoltativo]

Un URL per un file audio da riprodurre durante la storia.

##### poster-square-src [facoltativo]

Un URL per il [poster della storia](#posters) in formato quadrato (proporzioni 1 x 1).

##### poster-landscape-src [facoltativo]

Un URL per il [poster della storia](#posters) in formato orizzontale (proporzioni 4 x 3).

### Poster

Un "poster" è un'immagine che viene visualizzata nell'UI durante il caricamento della storia. Generalmente, il poster può essere composto dalla prima schermata della storia, ma puoi utilizzare qualsiasi immagine rappresentativa.

### Elementi secondari (di amp-story)

Il componente `<amp-story>` contiene uno o più componenti [`<amp-story-page>`](#pages%3a-amp-story-page), che a loro volta contengono ciascuna delle singole immagini della storia.  La prima pagina specificata nell'ordine del documento è la prima pagina mostrata nella storia.

### Attivare l'orientamento orizzontale e l'esperienza desktop al vivo

Se si specifica l'attributo `supports-landscape` nell'elemento `<amp-story>`, esso:

* Permette di visualizzare la storia quando un dispositivo mobile viene tenuto in orientamento orizzontale.
* Cambia l'esperienza desktop in una modalità al vivo immersiva, sostituendo l'esperienza predefinita a tre pannelli in modalità verticale.

Uso: `<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">Prima:</span>
  <amp-anim alt="Esperienza desktop a tre pannelli" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">Dopo:</span>
  <amp-anim alt="Esperienza desktop al vivo" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## Pagine: `amp-story-page`

Il componente `<amp-story-page>` rappresenta i contenuti da visualizzare su una singola pagina di una storia.

<figure class="centered-fig">
  <amp-anim alt="Esempio pagina 1" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
    <noscript>
      <img alt="Esempio pagina 1" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
      </noscript>
    </amp-anim>
  </figure>
  <figure class="centered-fig">
    <amp-anim alt="Esempio pagina 2" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
      <noscript>
        <img alt="Esempio pagina 2" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
        </noscript>
      </amp-anim>
    </figure>

### Esempio

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

### Attributi

##### id [obbligatorio]

Un identificatore univoco per la pagina. Puoi utilizzarlo per modificare lo stile della pagina e dei suoi discendenti in CSS, oltre a identificare in modo univoco la pagina nel frammento URL.

##### auto-advance-after [facoltativo]

Specifica quando avanzare automaticamente alla pagina successiva.  Se questo attributo viene omesso, la pagina non avanzerà in modo automatico. Il valore per `auto-advance-after` deve essere:

* Una quantità di [tempo](https://developer.mozilla.org/en-US/docs/Web/CSS/time) positiva prima del passaggio automatico alla pagina successiva
* Un ID di un [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) o di un'interfaccia video il cui completamento attiverà l'avanzamento automatico

Ad esempio:

```html
<amp-story-page id="tokyo" auto-advance-after="1s">
```

##### background-audio [facoltativo]

Un URI di un file audio che viene riprodotto durante la visualizzazione della pagina.

Ad esempio:

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">
```

### Elementi secondari (di amp-story)

Il componente `<amp-story-page>` contiene uno o più [livelli](#layers).  I livelli sono impilati dal basso verso l'alto, con il primo livello specificato nel DOM in fondo all'elenco e l'ultimo livello specificato in cima.

## Livelli

I livelli sono impilati uno sopra l'altro per ottenere l'effetto visivo desiderato.

### `amp-story-grid-layer`

Il componente `<amp-story-grid-layer>` dispone i suoi elementi secondari in una griglia.  La sua implementazione si basa sulla [specifica della griglia CSS](https://www.w3.org/TR/css-grid-1/).

<div class="flex-images">
  <amp-img alt="Livello 1" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
  </amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Livello 2" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript></amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Livello 3" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript></amp-img>
  <span class="special-char">=</span>
  <amp-img alt="Tutti i livelli" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript></amp-img>
</div>

#### Attributi

##### template [obbligatorio]

L'attributo `template` determina il layout del livello della griglia. I modelli disponibili sono descritti nella sezione [Modelli](#templates) di seguito.

##### grid-area [facoltativo]

Questo attributo è specificato sugli elementi secondari di `<amp-story-grid-layer>`. `grid-area` specifica l'area nominata in cui dovrebbe comparire l'elemento che contiene questo attributo utilizzando un `template` che definisca tale area.

Esempio:

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Modelli

Di seguito sono riportati alcuni modelli disponibili per specificare il layout del livello della griglia.

[tip type="success"]
Per vedere i modelli di layout in uso, dai un'occhiata alla [demo dei layout sul sito AMP By Example](https://ampbyexample.com/stories/features/layouts/).
[/tip]

##### fill

Il modello `fill` mostra il suo primo elemento secondario al vivo. Tutti gli altri elementi secondari non vengono visualizzati.

Aree nomi: (nessuna)

Esempio:

<amp-img alt="Esempio di riempimento del modello" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Esempio di modello orizzontale" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="fill">
  <amp-img src="cat.jpg"></amp-img>
</amp-story-grid-layer>
```

##### vertical

Il modello `vertical` dispone gli elementi lungo l'asse y.  Per impostazione predefinita, gli elementi sono allineati in alto e possono occupare l'intero schermo lungo l'asse x.

Aree nomi: (nessuna)

<amp-img alt="Esempio di modello verticale" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Esempio di modello orizzontale" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
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

Il modello `horizontal` dispone gli elementi lungo l'asse x.  Per impostazione predefinita, gli elementi sono allineati all'inizio della linea e possono occupare l'intero schermo lungo l'asse y.

Aree nomi: (nessuna)

<amp-img alt="Esempio di modello orizzontale" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Esempio di modello orizzontale" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
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

Il modello `thirds` suddivide lo schermo in tre righe di uguali dimensioni e ti permette di inserire contenuti in ciascuna area.

Aree nominate:

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="Esempio di modello orizzontale" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Esempio di modello in terzi" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Elementi secondari

`amp-story-grid-layer` può contenere i seguenti elementi:

**Nota**: questo elenco verrà ampliato nel tempo.

<table>
  <tr>
    <th width="40%">Area
    </th><th>Tag consentiti </th>
  </tr>
  <tr>
    <td>Media</td>
    <td>
      <ul>
        <li><code>&lt;amp-audio></code></li>
        <li><code>&lt;amp-gfycat></code></li>
        <li><code>&lt;amp-google-vrview-image></code></li>
        <li><code>&lt;amp-img></code></li>
        <li><code>&lt;amp-video></code></li>
        <li><code>&lt;source></code></li>
        <li><code>&lt;track></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Dati di analisi e misurazione</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics></code></li>
        <li><code>&lt;amp-experiment></code></li>
        <li><code>&lt;amp-pixel></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Sezionamento</td>
    <td>
      <ul>
        <li><code>&lt;address></code></li>
        <li><code>&lt;article></code></li>
        <li><code>&lt;aside></code></li>
        <li><code>&lt;footer></code></li>
        <li><code>&lt;h1>-<h6></code></li>
        <li><code>&lt;header></code></li>
        <li><code>&lt;hgroup></code></li>
        <li><code>&lt;nav></code></li>
        <li><code>&lt;section></code></li>
        <li><code>&lt;amp-story-cta-layer></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Testo</td>
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
    <td>Elenchi</td>
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
    <td>Tabelle</td>
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
    <td>Altro</td>
    <td>
      <ul>
        <li><code>&lt;amp-install-serviceworker></code></li>
        <li><code>&lt;noscript></code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

Il componente `<amp-story-cta-layer>` permette l'utilizzo degli elementi `<a>` e `<button>` all'interno di `<amp-story-page>`.

#### Limitazioni

* Se specificato, l'elemento `<amp-story-cta-layer>` dev'essere l'ultimo livello all'interno di `<amp-story-page>`. Di conseguenza, ogni `<amp-story-page>` può avere solo uno o zero elementi `<amp-story-cta-layer>`.
* La posizione e le dimensioni di questo livello non possono essere controllate. Il livello occupa sempre il 100% della larghezza della pagina, il 20% della sua altezza ed è allineato in fondo alla pagina.

#### Esempio

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

<amp-img alt="Livello CTA" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
  <noscript>
    <img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
  </noscript>
</amp-img>

[Esempio completo nella directory degli esempi](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### Elementi secondari

`amp-story-cta-layer` supporta la maggior parte degli stessi discendenti di `amp-story-grid-layer` e, in aggiunta, i tag `<a>` e `<button>`.

Per un elenco aggiornato degli elementi secondari supportati, consulta il campo [amp-story-cta-layer-allowed-descendants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) nelle regole di convalida.

## Allegati della pagina

### `amp-story-page-attachment`

<amp-img alt="Allegato alla pagina della storia AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
  <noscript>
    <img alt="Allegato alla pagina della storia AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
    </noscript>
  </amp-img>

  Allega contenuti aggiuntivi a una pagina della storia.

  Gli allegati delle pagine della storia ti permettono di fornire contenuti HTML AMP aggiuntivi a determinate pagine. Gli utenti possono accedere a questi contenuti tramite un gesto di scorrimento verso l'alto o un tocco sull'invito all'azione.
  In fondo a ciascuna pagina per cui hai configurato un allegato verrà aggiunto automaticamente un prompt dell'UI per aprire l'allegato.

  L'elemento `<amp-story-page-attachment>` deve essere l'ultimo elemento secondario di `<amp-story-page>` e deve presentare l'attributo `layout="nodisplay"`. Il contenuto HTML AMP degli allegati dovrebbe essere incorporato nella storia AMP, all'interno del tag `<amp-story-page-attachment>`.

### Contenuti e componenti consentiti

Gli allegati delle pagine della storia consentono gli stessi elementi HTML di una storia AMP assieme ai componenti aggiuntivi elencati di seguito, come i video player di terze parti o gli incorporamenti di social media. Ciò significa che puoi aggiungere altri contenuti troppo dettagliati o non consentiti all'interno della pagina di una storia AMP.

<details>
  <summary>Elenco di componenti AMP consentiti in un allegato delle pagine</summary>

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
  * `<amp-live-list>`
  * `<amp-live-list>`
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

### Esempio

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

## Animazioni

Ogni elemento all'interno di `<amp-story-page>` può avere un'animazione di entrata.

Puoi configurare le animazioni specificando un insieme di [attributi dell'animazione](#animation-attributes) per l'elemento; non sono necessarie estensioni AMP o configurazioni aggiuntive.

### Effetti di animazione

Per le storie AMP sono disponibili come preset i seguenti effetti di animazione:

| Nome preset       | Durata predefinita (ms) | Ritardo predefinito (ms) |
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
Guarda una [demo dal vivo di tutte le animazioni delle storie AMP](https://ampbyexample.com/stories/features/animations/) sul sito AMP By Example.
[/tip]

### Attributi di animazione

##### animate-in [obbligatorio]

Utilizza questo attributo per specificare il nome del [preset dell'animazione](#animation-effects) di entrata.

*Esempio*: un'intestazione entra dal lato sinistro della pagina.

```html
<h2 animate-in="fly-in-left">
  Entra da sinistra!
</h2>
```

##### animate-in-duration [facoltativo]

Usa questo attributo per specificare la durata dell'animazione di entrata, in secondi o millisecondi (ad esempio, 0,2 s o 200 ms). La durata predefinita dipende dal preset di animazione specificato.

*Esempio*: un'intestazione entra dal lato sinistro della pagina e l'animazione termina in mezzo secondo.

```html
<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
  Entra da sinistra!
</h2>
```

##### animate-in-delay [facoltativo]

Utilizza questo attributo per specificare il ritardo prima dell'inizio dell'animazione. Il valore deve essere maggiore o uguale a 0, espresso in secondi o millisecondi (ad esempio, 0,2 s o 200 ms). Il ritardo predefinito dipende dal preset di animazione specificato.

*Esempio*: dopo 0,4 secondi un'intestazione entra dal lato sinistro della pagina e l'animazione termina in 0,5 secondi.

```html
<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
  Entra da sinistra!
</h2>
```

[tip type="note"]
Non è garantito che il ritardo dell'animazione sia esatto. Ulteriori ritardi possono essere causati dal caricamento dell'estensione `amp-animation` in background quando il primo elemento animato è stato scansionato. Il contratto dell'attributo è definito come *ritarda quest'animazione per almeno N millisecondi*. Questo vale per tutti gli elementi, compresi quelli con un ritardo di 0 secondi.
[/tip]

##### animate-in-after [facoltativo]

Utilizza questo attributo per creare catene o sequenze di animazioni (ad esempio, animazione2 inizia al termine di animazione1). Specifica l'ID dell'elemento animato che sarà seguito dall'animazione dell'elemento attuale. L'elemento deve essere presente nella stessa `<amp-story-page>`. Il ritardo viene applicato una volta terminata l'animazione dell'elemento precedente. Per ulteriori dettagli, vedi la sezione [Sequenze di animazioni](#sequencing-animations) di seguito.

Ad esempio, nel codice riportato qui sotto, l'animazione di `object2` inizia una volta terminata l'entrata di `object1`:

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

##### scale-start, scale-end [facoltativi, funzionano solo con le animazioni `zoom-in` e `zoom-out`]

Utilizza questi due attributi per specificare ulteriormente i parametri delle tue animazioni di aumento e diminuzione dello zoom. Il valore dev'essere maggiore o uguale a 0 e sono consentiti valori decimali. Le impostazioni predefinite sono scale-start: 1 e scale-start: 3 per zoom-in e l'inverso per zoom-out.

*Esempio*: un'immagine della quale viene aumentato lo zoom da 2 a 5 volte le sue dimensioni nel corso di 4 secondi.

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x [facoltativo, funziona solo con le animazioni `pan-left` e `pan-right`]

Utilizza questo attributo per specificare lo spostamento orizzontale dell'immagine in un'animazione pan-left/pan-right. Il valore deve essere maggiore o uguale a 0 in pixel. Il valore predefinito effettuerà uno spostamento pari all'intera larghezza dell'immagine specificata.

*Esempio*: un'immagine che si sposta a sinistra di 200 px in 10 secondi.

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y [facoltativo, funziona solo con le animazioni `pan-up` e `pan-down`]

Utilizza questo attributo per specificare lo spostamento verticale dell'immagine in un'animazione pan-up/pan-down. Il valore deve essere maggiore o uguale a 0 in pixel. Il valore predefinito effettuerà uno spostamento pari all'intera altezza dell'immagine specificata.

*Esempio*: un'immagine che si sposta verso il basso di 50 px in 15 secondi.

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### Sequenze di animazioni

Per creare delle sequenze di animazioni, usa l'attributo `animate-in-after`. Tutti gli elementi di una data sequenza devono essere presenti nella stessa `<amp-story-page>`. Gli elementi senza l'attributo `animate-in-after` non appartengono a una sequenza di animazioni e inizieranno in modo indipendente all'entrata nella pagina.

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

### Combinare più animazioni

Puoi applicare più animazioni di entrata a un elemento (ad esempio, un elemento entra nella pagina ed esegue contemporaneamente una dissolvenza in entrata). Non è possibile assegnare più di un preset di animazioni a un singolo elemento; tuttavia, puoi nidificare gli elementi con animazioni di entrata differenti in modo da combinarle.

```html
<div animate-in="fly-in-left">
  <div animate-in="fade-in">
    Entrerò ed eseguirò una dissolvenza in entrata!
  </div>
</div>
```

[tip type="note"]
Se vuoi che un'animazione composta inizi una volta terminata l'animazione di un elemento separato, assicurati che tutti gli elementi nidificati che compongono l'animazione possiedano l'attributo `animate-in-after` impostato sullo stesso `id`.
[/tip]

## Bookend: `amp-story-bookend`

`amp-story-bookend` è l'ultima schermata della storia. Contiene link correlati, opzioni di condivisione, link di invito all'azione e altro.

<figure class="centered-fig">
  <amp-anim alt="esempio di articolo correlato" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
    <noscript>
      <img alt="esempio di articolo correlato" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
      </noscript>
    </amp-anim>
  </figure>

  Per utilizzarlo, includi un tag `<amp-story-bookend>` come elemento secondario di `<amp-story>` con l'attributo obbligatorio `layout=nodisplay`.
  Successivamente, puoi specificare la configurazione JSON in un file separato e importarla tramite l'attributo `src`; oppure, puoi semplicemente incorporarla.

  Importare la configurazione JSON tramite l'attributo `src`:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `layout=nodisplay` is required. -->
  <amp-story-bookend src="bookendv1.json" layout=nodisplay>
  </amp-story-bookend>
</amp-story>
```

Se non vuoi recuperare la configurazione del bookend da un server, puoi anche incorporarla:

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
</amp-story>
```

Successivamente, devi compilare la configurazione JSON. A questo punto, puoi configurare il bookend. La struttura generale della configurazione è la seguente:

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

Specifica che stai utilizzando la versione 1.0 includendo la prima riga.

#### Componenti del bookend

Il bookend è composto da diversi componenti. Questi componenti possono essere articoli, link di invito all'azione, testo o altro.

Sono specificati nel campo `components` del JSON configurato. Vedi la sezione [Esempio di risposta JSON](#example-json-response) di seguito.

##### heading

Il componente <code>heading</code> possiede un campo ```text</code> che puoi utilizzare per aggiungere un titolo a un gruppo di articoli.

```json
{
  type: "heading",
  text: "More to Read"
}
```

<amp-img alt="Componente di intestazione del bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
  <noscript>
    <img alt="Componente di intestazione del bookend" src="img/amp-story-bookend-component-heading.png">
    </noscript>
  </amp-img>

##### small

Puoi utilizzare il componente `small` per creare un link ad articoli correlati. Per questo componente sono obbligatori i seguenti campi: `title`, `url`, mentre `image` è facoltativo.

```json
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/article.html",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Piccolo componente del bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
  <noscript>
    <img alt="Piccolo componente del bookend" src="img/amp-story-bookend-component-small.png">
  </noscript>
</amp-img>

##### landscape

Puoi utilizzare il componente `landscape` per formati di contenuti alternativi, come dei video. Per questo componente sono obbligatori i seguenti campi: `title`, `url` e `image`. Facoltativamente, puoi aggiungere un campo `category`, che aggiunge un sottotitolo al di sopra del titolo.

```json
{
  type: "landscape",
  title: "TRAPPIST-1 Planets May Still Be Wet Enough for Life",
  url: "http://example.com/article.html",
  category: "astronomy",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Componente orizzontale del bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="Componente orizzontale del bookend" src="img/amp-story-bookend-component-landscape.png">
  </noscript>
</amp-img>

##### portrait

Puoi utilizzare il componente `portrait` per creare un collegamento ad altre storie. Per questo componente sono obbligatori i seguenti campi: `title`, `url` e `image`. Facoltativamente, puoi aggiungere un campo `category`, che aggiunge un sottotitolo al di sopra del titolo.

```json
{
  type: "portrait",
  category: "Science",
  title: "New discovery found",
  url: "http://example.com/article.html",
  image: "http://placehold.it/312x416"
}
```

<amp-img alt="Componente verticale del bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="Componente verticale del bookend" src="img/amp-story-bookend-component-portrait.png">
  </noscript>
</amp-img>

##### cta-link

Il componente <code>cta-link</code> permette di specificare dei link per inviti all'azione (ad esempio, <code>Ulteriori informazioni</code> o <code>Iscriviti</code>). Questo componente ha una chiave <code>links</code> che specifica un array di link. Ciascun link è un oggetto con un valore ```text</code> e <code>url</code>.

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

<amp-img alt="Componente cta-links del bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
  <noscript>
    <img alt="Componente cta-links del bookend" src="img/amp-story-bookend-component-cta-links.png">
    </noscript>
  </amp-img>

##### textbox

Il componente ```textbox</code> permette di specificare il testo che compare all'interno del bookend (ad esempio, i dati relativi alle foto). Questo componente necessita di un array <code>text</code> in cui ciascun elemento è una riga di testo.

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

<amp-img alt="Componente textbox del bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Componente textbox del bookend" src="img/amp-story-bookend-component-textbox.png">
  </noscript>
</amp-img>

  **Collegamento AMP-to-AMP**

  Per i documenti mostrati in un visualizzatore AMP, in genere i link conducono a `_top` o si aprono in una nuova finestra. I link alle pagine AMP, tuttavia, potrebbero continuare a essere mostrati all'interno del visualizzatore. Per abilitare questo comportamento, aggiungi `"amphtml": true` a un componente che supporta i link. Ad esempio:


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
  links: [
    {
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

#### Condivisione sui social media

La configurazione per la condivisione sui social network è definita nel campo `shareProviders` dell'oggetto risposta ed è facoltativa.

Questo campo deve contenere una stringa. Ciascuna stringa rappresenta il nome di un fornitore di condivisione, ad esempio, `twitter`.

Nel caso in cui siano necessari parametri aggiuntivi, deve essere utilizzato un oggetto con coppie chiave-valore. L'oggetto deve contenere una chiave `provider` con un valore (ad esempio, `facebook`) corrispondente al nome del fornitore. Le successive coppie chiave-valore dipenderanno dal fornitore di condivisione.

L'elenco di fornitori disponibili è lo stesso del componente [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share).

Ciascuno di questi provider dispone di una serie differente di parametri disponibili ([vedi `data-param-*`](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a)). L'oggetto di configurazione accetta questi parametri senza il prefisso `data-param-` (ad esempio, `data-param-app_id` comparirà nell'oggetto della configurazione come `app_id`).

#### Configurazione JSON

`<amp-story-bookend>` deve avere un attributo `src` che rimandi alla configurazione JSON del bookend. È descritto come un endpoint URL che accetta richieste GET e restituisce una risposta JSON con i contenuti del bookend.  Se omesso, il componente amp-story visualizza un'UI predefinita per la schermata finale. Il sistema si occupa di recuperare i dati necessari per visualizzare gli articoli correlati e di tendenza.  Questi possono essere forniti da un file JSON statico o generati dinamicamente (ad esempio, per calcolare gli articoli attualmente di tendenza).

#### Esempio di risposta JSON

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

## Altri componenti utilizzabili nelle storie AMP

Di seguito sono riportati altri componenti utilizzabili nelle storie AMP che richiedono determinate condizioni a seconda della storia.

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

Per componenti più generalmente utilizzabili, consulta l'[elenco degli elementi secondari consentiti](https://www.ampproject.org/docs/reference/components/amp-story#children).

## Convalida

Vedi le [regole amp-story](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) nella specifica dello strumento di convalida AMP.

## Localizzazione

Per localizzare la tua storia, includi il codice della lingua nell'attributo `lang` all'interno del tag `<html>` della tua pagina, ad esempio `<html lang="en">` per l'inglese.  I codici lingua supportati sono:

* ar (arabo)
* de (tedesco)
* en-GB (inglese, Regno Unito)
* en (inglese, Stati Uniti)
* es-419 (spagnolo, America centrale/latina)
* es (spagnolo, Spagna)
* fr-CA (francese, Canada)
* fr (francese, Francia)
* hi (hindi)
* id (indonesiano)
* it (italiano)
* ja (giapponese)
* ko (coreano)
* nl (olandese)
* no (norvegese)
* pt-BR (portoghese, Brasile)
* pt (portoghese, Portogallo)
* ru (russo)
* tr (turco)
* vi (vietnamita)
* zh-TW (cinese tradizionale)
* zh (cinese semplificato)

Inoltre, per le lingue con scrittura da destra a sinistra, puoi includere l'attributo `dir="rtl"` nel tag `<html>` della tua storia.  Puoi utilizzare quest'attributo anche insieme al codice della lingua, ad esempio, `<html lang="ar" dir="rtl">`.

## Risorse correlate

* [Tutorial: creare una storia visiva AMP](https://www.ampproject.org/docs/tutorials/visual_story)
* [Esempi sul sito AMP By Example](https://ampbyexample.com/stories/#stories/introduction)
* [Best practice per la creazione di una storia AMP](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>

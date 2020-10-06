---
$title: Creazione del bookend
$order: 7
description: Ora che abbiamo aggiunto tutte le pagine, diamo un'occhiata all'ultima schermata della storia, il bookend. Quest'ultima schermata conclude la storia ...
author: bpaduch
---

Ora che abbiamo aggiunto tutte le pagine, diamo un'occhiata all'ultima schermata della storia, il "bookend". Quest'ultima schermata conclude la storia e offre strumenti di condivisione sui social e collegamenti a contenuti simili a quelli della storia, in modo che gli utenti possano condividerla e approfondire altri contenuti del sito.

Le informazioni sulla schermata di chiusura provengono da un file JSON specificato nel tag `<amp-story-bookend>`. La nostra esercitazione dispone già di un file JSON ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) che contiene i dati del bookend.

Il tag `<amp-story-bookend>` deve essere l'ultimo in [`<amp-story>`](../../../../documentation/components/reference/amp-story.md). Quindi, **aggiungiamo** i componenti `<amp-story-bookend></amp-story-bookend>` subito prima del tag di chiusura[`</amp-story>`](../../../../documentation/components/reference/amp-story.md). Nel tag `amp-story-bookend`, l'attributo `src` deve puntare al file `bookend.json` e occorre impostare l'attributo `layout="nodisplay"`:

```html
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

Aggiornando il browser, l'ultima schermata avrà il seguente bookend:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

Diamo un'occhiata al file JSON. Aprire il file [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) nell'editor di testo preferito.

Ogni schermata di bookend richiede un `bookendVersion`, che per questa esercitazione è `v1.0`:

```json
"bookendVersion": "v1.0",
```

I pulsanti di condivisione sui social consentono ai lettori di condividere i contenuti attraverso piattaforme come Twitter, Facebook, Pinterest e simili. Occorre indicare i fornitori di condivisioni social in un oggetto shareProviders e creare un array contenente i [nomi dei tipi](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) per ciascuna delle piattaforme social.

Per questa esercitazione, abbiamo scelto Facebook, Twitter ed e-mail come nostri fornitori di condivisioni:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

Il resto della schermata di bookend è per i contenuti collegati. Tutti i contenuti collegati si trovano in un oggetto `components`.

Sono disponibili vari componenti che è possibile utilizzare per visualizzare contenuti rilevanti e collegamenti a pagine simili; ogni componente è specificato con un attributo di tipo. Diamo un'occhiata ai componenti disponibili:

<table>
<thead>
<tr>
  <th width="20%">Tipo</th>
  <th>Descrizione</th>
</tr>
</thead>
<tbody>
  <tr>
    <td>heading</td>
    <td>Permette di indicare un'intestazione per raggruppare articoli.   <pre class="nopreline">   {     "type": "heading",     "text": "More to read"   },   </pre>     <br>     <figure class="alignment-wrapper half">       {amp-img3}{/amp-img3}     </figure>
</td>
  </tr>
  <tr>
    <td>small</td>
    <td>Consente di inserire un collegamento agli articoli simili con l'opzione di includere una piccola immagine associata.   <pre class="nopreline">   {     "type": "small",     "title": "Learn about cats",     "url": "https://wikipedia.org/wiki/Cat",     "image": "assets/bookend_cats.jpg"   },   </pre>     <br>     <figure class="alignment-wrapper half">       {amp-img3}{/amp-img3}     </figure>
</td>
  </tr>
  <tr>
    <td>landscape</td>
    <td>Permette di inserire collegamenti ad articoli o altri contenuti come video. L'immagine associata a questo tipo è più grande e in formato orizzontale.   <pre class="nopreline">   {     "type": "landscape",     "title": "Learn about border collies",     "url": "https://wikipedia.org/wiki/Border_Collie",     "image": "assets/bookend_dogs.jpg",     "category": "Dogs"   },   </pre>     <br>     <figure class="alignment-wrapper half">       {amp-img3}{/amp-img3}     </figure>
</td>
  </tr>
  <tr>
    <td>portrait</td>
    <td>Permette di inserire collegamenti a storie o altri contenuti. L'immagine associata a questo tipo è più grande e in formato verticale.      <pre class="nopreline">   {     "type": "portrait",     "title": "Learn about macaws",     "url": "https://wikipedia.org/wiki/Macaw",     "image": "assets/bookend_birds.jpg",     "category": "birds"   },   </pre>     <br>     <figure class="alignment-wrapper half">       {amp-img3}{/amp-img3}     </figure>
</td>
  </tr>
  <tr>
    <td>cta-link</td>
    <td>Consente di indicare collegamenti di invito all'azione visualizzati sotto forma di pulsanti (ad es., altre informazioni, iscriviti).   <pre class="nopreline">   {     "type": "cta-link",     "links": [       {         "text": "Learn more",         "url": "https://amp.dev/about/stories.html"       }     ]   }   </pre>     <br>     <figure class="alignment-wrapper half">       {amp-img3}{/amp-img3}     </figure>
</td>
  </tr>
</tbody>
</table>

Ci sarebbe molto altro da dire sul componente bookend. Per i dettagli, consultare la documentazione di riferimento di [`amp-story`](../../../../documentation/components/reference/amp-story.md).

La nostra storia è quasi completa. Prima di poter pubblicare il nostro contenuto, controlliamo che il formato AMP HTML sia valido.

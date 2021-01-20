---
"$title": Aggiunta di altre pagine
"$order": '5'
description: "Ora che abbiamo imparato come aggiungere una pagina a una storia web, possiamo procedere all'aggiunta di altre pagine alla nostra storia \"The Joy of Pets\" che è molto simile."
author: bpaduch
---

Ora che abbiamo imparato come aggiungere una pagina a una storia web, possiamo procedere all'aggiunta di altre pagine alla nostra storia "The Joy of Pets" in modo molto simile. Sulla base delle informazioni fornite di seguito, **proviamo a continuare con la creazione delle pagine rimanenti** utilizzando quanto appreso finora. In caso di problemi, puoi consultare il codice completato (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>).

[tip type="tip"] **SUGGERIMENTO:** Ricorda che ogni pagina richiede un proprio attributo "id" univoco (ad esempio, `id="page1"`). [/tip]

## Pagina 1: Gatti

Indica come visualizzare un'immagine e un testo in un unico livello.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Contiene 1 livello:       <ul>         <li>Implementa il modello <a href="create_cover_page.md#vertical"><code>vertical</code></a>.</li>         <li>Contiene 3 elementi:           <ul>             <li>Un elemento <code><h1></code> dal titolo: <em>Gatti</em> </li>             <li>un elemento dinamico <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">cat.jpg</code>, 720 x 1280px)</li>             <li>un elemento <code><q></code> per la seguente citazione: <em>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## Pagina 2: Cani

Indica come disporre il testo e visualizzare un'immagine a schermo intero con due livelli.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Contiene 2 livelli:       <ul>         <li> <b>Livello 1</b>: Implementa il modello <a href="create_cover_page.md#fill"><code>fill</code></a> e contiene un elemento dinamico <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">dog.jpg</code>, 720 x 1280px).</li>         <li> <b>Livello 2</b>:  Implementa il modello <a href="create_cover_page.md#thirds"><code>thirds</code></a> e contiene 2 elementi:           <ul>             <li>Un elemento <code><h1></code> con il titolo: <em>Cani</em> </li>             <li>Un elemento <code><p></code> che indica un elemento <a href="create_cover_page.md#thirds"><code>grid-area</code></a> che occupa la posizione <a href="create_cover_page.md#thirds"><code>lower-third</code></a> e contiene il seguente testo: <em>Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## Pagina 3: Uccelli

Indica come disporre il testo, visualizzare un'immagine a schermo intero e fornire audio di sottofondo per la pagina.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contiene 3 livelli:       <ul>         <li> <b>Livello 1</b>: Implementa il modello <a href="create_cover_page.md#fill"><code>fill</code></a> e contiene un elemento dinamico <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">bird.jpg</code>, 720 x 1280px).</li>         <li> <b>Livello 2</b>  Implementa il modello <a href="create_cover_page.md#vertical"><code>vertical</code></a> e contiene un  elemento:           <ul>             <li>Un elemento <code><h1></code> con il titolo: <em>Uccelli</em> </li>           </ul>         </li>         <li> <b>Livello 3</b>:  Implementa il modello <a href="create_cover_page.md#vertical"><code>vertical</code></a> e contiene un elemento:           <ul>             <li>Un elemento <code><q></code> per la seguente citazione: <em>A bird is three things: Feathers, flight and song, And feathers are the least of these.--Marjorie Allen Seiffert</em> </li>             <li>Questo terzo livello specifica la classe <code>class="bottom"</code> per allineare gli elementi figli in fondo allo schermo.</li>           </ul>         </li>       </ul>
</li>
      <li>Riproduce un file audio di sottofondo durante la visualizzazione della pagina. L'audio di sottofondo può essere riprodotto su una sola pagina o sull'intera storia. Per riprodurre l'audio su una sola pagina, aggiungere l'attributo <code>background-audio="assets/bird-singing.mp3"</code> all'elemento <code><amp-story-page></code>.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## Pagina 4: Conigli

Indica come disporre il testo e visualizzare un video a schermo intero per la pagina.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contiene 3 livelli:       <ul>         <li> <b>Livello 1</b>: Implementa il modello <code>fill</code> e contiene un elemento dinamico <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> (<code class="filename">rabbit.mp4</code>).           <ul>             <li>Ricordiamo di aggiungere lo <strong>&nbsp;script richiesto</strong> per il componente <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> nella sezione <code></code> in modo che il video appaia.</li>             <li>Indicare un'immagine <code>poster</code> (<code class="filename">rabbit.jpg</code>). Questo attributo è <strong>obbligatorio</strong> nelle storie AMP valide.</li>             <li>Impostare la riproduzione automatica del video con l'attributo<code>autoplay</code>. Questo attributo è <strong>obbligatorio</strong> nelle storie AMP valide.</li>             <li>Impostare la riproduzione ciclica automatica del video con l'attributo <code>loop</code>.</li>             <li>Definire le dimensioni <code>width="720"</code> <code>height="1280"</code> e un <code>layout="responsive"</code>.</li>           </ul> </li>         <li> <b>Livello 2</b>  Implementa il modello <code>vertical</code> e contiene un elemento:           <ul>             <li>Un elemento <code><h1></code> con il titolo: <em>Conigli</em> </li>           </ul>         </li>         <li> <b>Livello 3</b>:  Implementa il modello <code>vertical</code> e contiene un elemeno:           <ul>             <li>Un elemento <code><p></code> che contiene il seguente testo: <em>Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful</em>.</li>             <li>Applicare la classe CSS <code>bottom</code> al livello per allineare gli elementi figli in fondo allo schermo.</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

La nostra storia "Joy of Pets" è quasi completa. Useremo le animazioni nella nostra ultima pagina per riunire tutti gli animali domestici.

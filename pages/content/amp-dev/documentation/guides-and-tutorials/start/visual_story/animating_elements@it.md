---
"$title": Elementi animati
"$order": '6'
description: "Per migliorare ulteriormente una storia web, è possibile applicare elementi animati all'interno di una pagina. Ad esempio, puoi far entrare il titolo da ..."
components:
- anim
author: bpaduch
---

Per migliorare ulteriormente una storia web, è possibile applicare elementi animati all'interno di una pagina. Ad esempio, puoi far entrare il titolo in una pagina da sinistra, spostarlo nella pagina, farlo dissolvere ecc. Il framework delle storie AMP fornisce le seguenti animazioni preimpostate da utilizzare nelle storie web:

<table>
<thead><tr>
  <th width="50%">Animazioni preimpostate</th>
  <th width="25%">Durata predefinita (ms)</th>
  <th width="25%">Ritardo predefinito (ms)</th>
</tr></thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

Per applicare un ingresso animato a un elemento occorre indicare l'attributo <code>animate-in="<em data-md-type="raw_html"><animation data-md-type="raw_html" preset></animation></em>"</code> con uno dei valori delle animazioni preimpostate. Ad esempio per far scendere del testo in una pagina, aggiungere l'attributo `animate-in="drop"` all'elemento di testo:

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"] Prova i diversi effetti di animazione, aggiungendo l'attributo `animate-in="<animation preset>"` agli elementi nelle pagine di una storia. [/tip]

## Temporizzazione delle animazioni

Ogni animazione preimpostata ha integrato un valore di tempo predefinito per i seguenti attributi:

- **ritardo**: questo è il tempo necessario per ritardare l'avvio dell'animazione. Ad esempio, un ritardo di 0,3 secondi significa che l'animazione entra nella pagina dopo 0,3 secondi. Un ritardo di 0 secondi avvia immediatamente l'animazione.
- **durata**: indica la quantità di tempo per cui l'animazione ha luogo. Ad esempio, l'animazione in dissolvenza dall'inizio alla fine richiede 500 ms.

È possibile personalizzare i tempi di un'animazione cambiando il ritardo o la durata tramite gli attributi `animate-in-delay` e `animate-in-duration`. Nell'esempio seguente, l'elemento `my-element` entra da sinistra nella pagina dopo 0,3 secondi e completa l'entrata in 0,5 secondi:

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </p>
</amp-story-page>
```

## Animazione dell'ultima pagina

L'ultima pagina della nostra storia web è composta da due livelli: il primo livello è una raccolta di immagini di animali e il secondo livello mostra un banner di testo. Per creare questa pagina, **aggiungere** il codice seguente subito dopo la pagina precedente della storia:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img src="assets/cat.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/dog.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/bird.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/rabbit.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

Ricaricare la storia AMP nel browser e verificare che la pagina venga visualizzata correttamente e abbia questo aspetto:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

Ha un bell'aspetto, ma è tutto troppo statico! Aggiungiamo qualche animazione!

Inizieremo animando l'entrata del banner di testo e lo faremo sfrecciare dalla parte destra della pagina. Aggiungere l'attributo `animate-in="whoosh-in-right"` all'elemento `<p>` in questo modo:

```html
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

Ricaricare la pagina della storia nel browser e verificare che il banner sia visualizzato.

Poi, facciamo in modo che tutte le immagini abbiano una dissolvenza. Aggiungere l'attributo `animate-in="fade-in"` a ciascuno degli elementi [`amp-img`](../../../../documentation/components/reference/amp-img.md) come nel seguente codice:

```html
<amp-img src="assets/cat.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/dog.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/bird.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/rabbit.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
```

Aggiornando e ricaricando la pagina, ciascuna immagine avrà una dissolvenza. È un effetto fantastico, ma è appena visibile perché tutte le immagini si dissolvono allo stesso tempo! Possiamo migliorare l'effetto visivo cambiando la tempistica di queste animazioni.

Ritardiamo l'entrata della prima immagine in modo che sia vicina al banner di testo quando questo finisce di entrare, diciamo con un ritardo di 0.4 s. Le restanti tre immagini possono arrivare 0,2 s dopo l'ingresso dell'immagine precedente. Per ciascuno degli elementi [`amp-img`](../../../../documentation/components/reference/amp-img.md), aggiungiamo l'attributo `animate-in-delay=""` con un valore di ritardo opportuno. Il codice risultante dovrebbe essere simile al seguente:

```html
<amp-img src="assets/cat.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.4s">
</amp-img>
<amp-img src="assets/dog.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.6s">
</amp-img>
<amp-img src="assets/bird.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay=".8s">
</amp-img>
<amp-img src="assets/rabbit.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="1s">
</amp-img>
```

Aggiornare e ricaricare la storia. L'ultima pagina dovrebbe avere un aspetto simile al seguente:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

Ci sono molte possibilità di animazione per le storie web (ad esempio, combinazione e concatenazione di animazioni). In questa esercitazione abbiamo solo sfiorato l'argomento. Per ulteriori informazioni sulle animazioni, consultare la documentazione di riferimento di [`amp-story`](../../../../documentation/components/reference/amp-story.md).

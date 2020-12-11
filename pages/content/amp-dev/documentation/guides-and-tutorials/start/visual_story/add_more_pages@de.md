---
"$title": Weitere Seiten hinzufügen
"$order": '5'
description: Da du mit dem Hinzufügen einer Seite zu einer Web Story nun vertraut bist, sollte dir das Hinzufügen der nächsten Seiten in unserer Story "The Joy of Pets" nicht schwerfallen.
author: bpaduch
---

Now that you are familiar with adding a page to a Web Story, adding the next pages in our "The Joy of Pets" story is very similar. Based on the information provided below, **go ahead and create the remaining pages** by using what you've learned so far.  If you get stuck, look at the completed (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>) code.

[tip type="tip"] **TIPP:** Denke daran, dass jede Seite ein eindeutiges Attribut "id" benötigt (z. B. `id="page1"`). [/tip]

## Seite 1: Katzen

Demonstrates how to display an image and text in a single layer.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Enthält 1 Ebene:       <ul>         <li>Implementiert das Template <a href="create_cover_page.md#vertical"><code>vertical</code></a>.</li>         <li>Enthält 3 Elemente:           <ul>             <li>Ein Element <code><h1></code> mit dem Titel: <em>Cats</em> </li>             <li>Ein responsives <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">cat.jpg</code>, 720 x 1280px)</li>             <li>Ein Element <code><q></code> für das folgende Zitat: <em>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## Seite 2: Hunde

Demonstrates how to arrange text and display a screen-filling image with two layers.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Enthält 2 Ebenen:       <ul>         <li> <b>Ebene 1</b>: Implementiert das Template <a href="create_cover_page.md#fill"><code>fill</code></a> und enthält ein responsives <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">dog.jpg</code>, 720 x 1280px).</li>         <li> <b>Ebene 2</b>: Implementiert das Template <a href="create_cover_page.md#thirds"><code>thirds</code></a> und enthält 2 Elemente:           <ul>             <li>Ein Element <code><h1></code> mit dem Titel: <em>Dogs</em> </li>             <li>Ein Element <code><p></code>, welches das Attribut <a href="create_cover_page.md#thirds"><code>grid-area</code></a> festlegt, welches den Bereich <a href="create_cover_page.md#thirds"><code>lower-third</code></a> ausfüllt und den folgenden Text enthält: <em>Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## Seite 3: Vögel

Demonstrates how to arrange text, display a screen-filling image, and provide background audio for the page.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contains 3 layers:       <ul>         <li>
<b>Layer 1</b>: Implements the <a href="create_cover_page.md#fill"><code>fill</code></a> template, and contains a responsive <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">bird.jpg</code>, 720 x 1280px).</li>         <li>
<b>Layer 2</b>  Implements the <a href="create_cover_page.md#vertical"><code>vertical</code></a> template and contains one element:           <ul>             <li>An <code><h1></code> element with the title: <em>Birds</em>
</li>           </ul>         </li>         <li>
<b>Layer 3</b>:  Implements the <a href="create_cover_page.md#vertical"><code>vertical</code></a> template and contains one element:           <ul>             <li>A <code><q></code> element for the following quotation: <em>A bird is three things: Feathers, flight and song, And feathers are the least of these.--Marjorie Allen Seiffert</em>
</li>             <li>This third layer specifies <code>class="bottom"</code> to align the child elements to the bottom of screen.</li>           </ul>         </li>       </ul>
</li>
      <li>Spielt eine Audiodatei im Hintergrund ab, während die Seite angezeigt wird. Du kannst den Ton im Hintergrund für die gesamte Story oder für eine einzelne Seite abspielen. Um den Ton für eine Seite abzuspielen, füge das Attribut <code>background-audio="assets/bird-singing.mp3"</code> im Element <code><amp-story-page></code> ein.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## Seite 4: Kaninchen

Demonstrates how to arrange text and display a screen-filling video for the page.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Enthält 3 Ebenen:       <ul>         <li> <b>Ebene 1</b>: Implementiert das Template <code>fill</code> und enthält ein responsives <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> (<code class="filename">rabbit.mp4</code>).           <ul>             <li>Vergiss nicht, das <strong>erforderliche Skript</strong> für die Komponente <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> in deinem Abschnitt <code></code> hinzuzufügen, damit das Video angezeigt wird.</li>             <li>Gib ein <code>poster</code> Bild an (<code class="filename">rabbit.jpg</code>). Dieses Attribut ist für gültige AMP Storys <strong>erforderlich</strong>.</li>             <li>Stelle das Video mit dem Attribut <code>autoplay</code> so ein, dass es automatisch abgespielt wird. Dieses Attribut ist für gültige AMP Storys <strong>erforderlich</strong>.</li>             <li>Stelle das Video mit dem Attribut <code>loop</code> so ein, dass es automatisch in einer Endlosschleife wiedergegeben wird.</li>             <li>Gib als Abmessung <code>width="720"</code> <code>height="1280"</code> und <code>layout="responsive"</code> an.</li>           </ul> </li>         <li> <b>Ebene 2</b> Implementiert das Template <code>vertical</code> und enthält ein Element:           <ul>             <li>Ein Element <code><h1></code> mit dem Titel: <em>Rabbits</em> </li>           </ul>         </li>         <li>
<br><b>Ebene 3</b>: Implementiert das Template <code>vertical</code> und enthält ein Element:           <ul>             <li>Ein Element <code><p></code> mit dem folgenden Text: <em>Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful</em>.</li>             <li>Wende die CSS Klasse <code>bottom</code> auf die Ebene an, um die untergeordneten Elemente am unteren Bildschirmrand auszurichten.</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

Our "Joy of Pets" story is nearly complete. We'll use animations in our last page to bring all the pets together.

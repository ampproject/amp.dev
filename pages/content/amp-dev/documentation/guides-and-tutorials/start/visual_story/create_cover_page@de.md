---
'$title': Ein Deckblatt erstellen
$order: 4
description: 'Füge das Element <amp-story-page> als untergeordnetes Element von amp-story hinzu, um eine Seite zu erstellen. Weise der Seite eine eindeutige ID zu. Weisen wir unserer ersten Seite – dem Deckblatt – die eindeutige ID "cover" zu: …'
author: bpaduch
---

Eine Seite innerhalb einer Web Story wird durch die Komponente `<amp-story-page>` repräsentiert. Innerhalb einer [`amp-story`](../../../../documentation/components/reference/amp-story.md) kannst du eine oder mehrere `<amp-story-page>` Komponenten haben, die jede der einzelnen Seiten der Story enthalten. Die erste Seite, die du in der Reihenfolge des Dokuments angibst, ist die erste Seite, die in der Web Story angezeigt wird.

**Füge** das Element `<amp-story-page>` als untergeordnetes Element von [`amp-story`](../../../../documentation/components/reference/amp-story.md) hinzu, um eine Seite zu erstellen. **Weise** der Seite eine eindeutige ID zu. Weisen wir unserer ersten Seite – dem Deckblatt – die eindeutige ID `cover` zu:

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
  <amp-story-page id="cover"> </amp-story-page>
</amp-story>
```

Damit erhalten wir das Gerüst für unser Deckblatt. Unsere Story ist aber immer noch nicht gültig. Auf unserer Seite müssen wir mindestens eine **Ebene** angeben. {{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='Das Deckblatt hat zwei Ebenen', align='right third' ) }}

## Ebenen auf einer Seite

Genau wie Ebenen in einer Grafik kannst du auch Ebenen auf AMP Story Seiten verwenden, um visuelle Effekte zu erstellen. Die Ebenen sind übereinander gestapelt, was bedeutet: Die erste Ebene ist die unterste, die nächste Ebene liegt darüber, und so weiter.

Unser Deckblatt besteht aus zwei Ebenen:

- **Ebene 1**: Ein Bild, das als Hintergrund dient
- **Ebene 2**: Titel und Zusatz für die Story

### Ebene 1 erstellen

Fügen wir die erste Ebene zu unserem Deckblatt hinzu. Die Ebene enthält ein Bild, das den Bildschirm ausfüllt.

Erstelle die Ebene, indem du das Element `<amp-story-grid-layer>` als untergeordnetes Element von `<amp-story-page>` hinzufügst. Da das Bild den Bildschirm ausfüllen soll, gib das Attribut `template="fill"` für `amp-story-grid-layer` an. Füge innerhalb der Ebene das Element [`amp-img`](../../../../documentation/components/reference/amp-img.md) für die Datei `cover.jpg` hinzu und stelle sicher, dass es responsiv ist (d. h. `layout="responsive"`) und als Maße 720x1280 px hat. So sieht unsere Ebene aus:

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img
      src="assets/cover.jpg"
      width="720"
      height="1280"
      layout="responsive"
    >
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

Sehen wir uns an, wie die Seite angezeigt wird. Öffne die Seite in deinem Browser: <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

So sollte sie aussehen:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Ebene 2 erstellen

Jetzt haben wir also einen Hintergrund, brauchen aber noch die zweite Ebene, die über dem Hintergrund liegt und Überschrift und Zusatzzeile enthält. Um die zweite Ebene hinzuzufügen, können wir genau so vorgehen wie bei Ebene 1. Aber statt `fill` verwenden wir hier **`vertical`** als Template. Bevor wir jedoch weitermachen, sollten wir uns mit Templates und dem Anordnen von AMP und HTML Elementen in `<amp-story-grid-layer>` näher auseinandersetzen.

#### Elemente mit einem Template anordnen

Das Element `<amp-story-grid-layer>` ordnet seine untergeordneten Elemente in einem Raster an (basierend auf dem [CSS Raster](https://www.w3.org/TR/css-grid-1/)). Um anzugeben, wie die untergeordneten Elemente angeordnet werden sollen, musst du eines der folgenden Layout Templates festlegen:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Template: Fill</h5></td>
</tr>
<tr>
    <td width="65%">Das Template <strong>fill</strong> füllt den Bildschirm mit dem ersten untergeordneten Element der Ebene aus. Alle anderen Elemente dieser Ebene werden nicht angezeigt.     Das Template "fill" eignet sich gut für Hintergründe, einschließlich Bildern und Videos.    <code class="nopad"><pre><amp-story-grid-layer template="fill"> <amp-img src="dog.png" width="720" height="1280" layout="responsive"> </amp-img> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341, alt="Illustration: das dog.png Bild füllt den Bildschirm') }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Template: Vertical</h5></td>
</tr>
<tr>
    <td width="65%">Das Template <strong>vertical</strong> ordnet die untergeordneten Elemente entlang der y-Achse an. Die Elemente werden am oberen Rand des Bildschirms ausgerichtet und nehmen den gesamten Bildschirm entlang der x-Achse ein.     Das Template "vertical" ist sinnvoll, wenn du Elemente vertikal direkt untereinander stapeln möchtest.    <code class="nopad"><pre><amp-story-grid-layer template="vertical"> <p>element 1</p> <p>element 2</p> <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341, alt="Illustration: element1, element2 und element3, vertical gestapelt') }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Template: Horizontal</h5></td>
</tr>
<tr>
    <td width="65%">Das Template <strong>horizontal</strong> ordnet die untergeordneten Elemente entlang der x-Achse an. Die Elemente werden am Bildschirmstart ausgerichtet und nehmen den gesamten Bildschirm entlang der y-Achse ein.     Das Template "horizontal" ist sinnvoll, wenn du Elemente horizontal direkt nebeneinander stapeln möchtest.     <code class="nopad"><pre><amp-story-grid-layer template="horizontal"> <p>element 1</p> <p>element 2</p> <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341, alt="Illustration: element1, element2 und element3, horizontal in spalten gestapelt') }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Template: Thirds</h5></td>
</tr>
<tr>
<td width="65%"> Das Template <strong>thirds</strong> unterteilt den Bildschirm in drei gleich große Zeilen und ermöglicht dir, Inhalte in jedem Bereich einzufügen. Du kannst außerdem einen benannten Bereich <code>grid-area</code> angeben, um zu bestimmen, in welchem Drittel sich dein Inhalt befinden soll: <code>upper-third</code>, <code>middle-third</code> oder <code>lower-third</code>. Mithilfe benannter Rasterbereiche kannst du anpassen, wo Elemente erscheinen sollen, und damit das Standardverhalten ändern. Wenn deine Ebene z. B. zwei Elemente enthält, kannst du angeben, dass sich das erste Element in <code>grid-area="upper-third"</code> und das zweite Element in <code>grid-area="lower-third"</code> befinden soll. <code class="nopad"><pre><amp-story-grid-layer template="thirds">   <h1 grid-area="upper-third">element 1</h1>   <p grid-area="lower-third">element 2</p> </amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341, alt='Illustration: der Bildschirm ist in drei Ebenen unterteilt - upper-third, middle-third, lower-third; element1 ist im upper-third; element 2 ist im lower-third') }}</td>
</tr>
</table>

### Abschluss des Deckblatts

Da du nun ein grundlegendes Verständnis für Ebenen Templates hast, können wir die zweite Ebene unseres Deckblatts vervollständigen.

Wir möchten, dass auf Ebene 2 die Überschrift und die Zusatzzeile oben stehen und die Elemente nacheinander folgen. Deshalb geben wir als Template `vertical` an. Unsere zweite Ebene `amp-story-grid-layer` folgt der ersten:

```html
<amp-story-grid-layer>
  <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

Lade den Inhalt in deinem Browser neu und überprüfe das Ergebnis. Unser Deckblatt ist nun vollständig.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}

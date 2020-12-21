---
"$title": Working with remote data
"$order": '3'
description: Was ist, wenn deine bindbaren Daten zu groß oder zu komplex sind, um sie beim Laden der Seite abzurufen? Oder wenn jede SKU einen Preis hat …
toc: 'true'
---

Was ist, wenn deine bindbaren Daten zu groß oder zu komplex sind, um sie beim Laden der Seite abzurufen? Oder wenn jede SKU einen Preis hat und das Nachschlagen lange dauert? Es ist Zeitverschwendung, Preise für SKUs von nicht angezeigten Artikeln nachzuschlagen.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) unterstützt das Abrufen von Remotedaten über das Attribut [`src`](../../../../documentation/components/reference/amp-bind.md#attributes), das JSON von einem CORS Endpoint abruft. Dieser Abruf wird nur einmal (und zwar beim Laden der Seite) ausgeführt und stellt die Aktualität der Daten sicher (insbesondere, wenn sie aus einem Cache stammen).

You can also bind the `src` attribute for the [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) element. This means that a user action can trigger a fetch of remote JSON data into the page's bindable state.

[/tip]

## Verfügbare Größen für ein Hemd abrufen

Nutzen wir die Funktion zum Abruf von Remotedaten, um die Preise für SKUs in unserem Beispiel nachzuschlagen. Unser Express.js Entwicklungsserver in `app.js` hat bereits den Endpoint `/shirts/sizesAndPrices?shirt=<sku>`, der für eine bestimmte SKU eines Hemdes die verfügbaren Größen und Preise pro Größe zurückgibt. Er sendet die Antwort mit einer künstlichen Verzögerung von einer Sekunde, um Netzwerklatenz zu simulieren.

Request | Response
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

Ähnlich wie bei den JSON Daten in [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) Elementen werden die von diesen Abrufen zurückgegebenen Remotedaten im Attribut `id` des Elements zusammengeführt und sind dort verfügbar. Der Zugriff auf die Daten, die von der obigen Beispielantwort zurückgegeben wurden, kann z. B. über den folgenden Ausdruck erfolgen:

Expression | Result
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### Bind the data

Dies wollen wir nun auf unser E-Commerce Beispiel anwenden. Rufen wir zunächst diese Hemddaten ab, sobald eine neue SKU ausgewählt wird. Füge die Bindung `[src]` zu unserem Element `amp-state#shirts` hinzu:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Indicate unavailable sizes

Als Nächstes markieren wir deutlich die nicht verfügbaren Größen für eine bestimmte SKU. Die CSS Klasse `"unavailable"` streicht das Element mit einer diagonale Linie durch. Wir können sie zu den Elementen im [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) hinzufügen, die den nicht verfügbaren Größen entsprechen:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Now, reload the page and try it out. Selecting a new SKU (shirt color) will cause unavailable sizes to be crossed-out (after a short delay).

### Specify initial states

Es gibt aber ein kleines Problem: Was ist mit dem schwarzen Hemd, der standardmäßig ausgewählten Farbe? Wir müssen die Daten für die Größen und Preise des schwarzen Hemdes zu `amp-state#shirts` hinzufügen, da [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) nur als Reaktion auf explizite Benutzeraktionen ausgeführt wird:

```html
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg",
        "sizes": {
          "XS": 8.99,
          "S": 9.99
        }
      },
<!-- ... -->
```

And, we'll need to update the default state of relevant elements:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Add the 'unavailable' class to the next three <td> elements
           to be consistent with the available sizes of the default SKU. -->
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

[tip type="note"] **HINWEIS:**  [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) wird nicht beim Laden der Seite ausgeführt, sondern nur als Reaktion auf explizite Benutzeraktionen. So wird sichergestellt, dass das erste Laden der Seite über alle Seiten hinweg konstant schnell ist, unabhängig von der Verwendung von [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

## Variable shirt prices

Da die verfügbaren Größen nun korrekt angezeigt werden, sollten wir sicherstellen, dass auch der richtige Preis angezeigt wird.

Unser AMPPAREL Shop hat eine Besonderheit: Der Hemdpreis ist von der Farbe UND von der Größe abhängig. Das heißt, wir benötigen eine neue Variable, um die vom Benutzer ausgewählte Größe zu verfolgen. Füge eine neue Aktion zu unserem Element [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) hinzu:

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

Beachte, dass wir den Wert von `selectedSize` nicht über das Element `amp-state#selected` initialisieren. Das liegt daran, dass wir absichtlich keine vorgegebene Standardgröße angeben, sondern die Benutzer zwingen möchten, eine Größe auszuwählen.

[tip type="tip"] **TIPP:** `AMP.setState()` kann verwendet werden, um neue Variablen zu definieren und vorhandene Variablen zu ändern. Ausdrücke bewerten undefinierte Variablen mit `null`. [/tip]

Füge ein neues `<span>` Element hinzu, das das Preisetikett umschließt, und ändere den Standardtext zu "---", da keine standardmäßige Größe ausgewählt ist.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

Jetzt stimmen unsere Preise! Probiere es aus.

## Bedingt aktiver Button

Wir sind fast fertig! Deaktiviere den Button "Add to cart", wenn die ausgewählte Größe nicht verfügbar ist:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Try it out**:  If you select a size that's unavailable, you can't add it to the cart.

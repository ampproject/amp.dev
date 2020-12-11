---
"$title": Verbesserung der Interaktivität
"$order": '2'
description: 'The starter code provides a pretty bare user experience. There are a couple ways we can improve it\: - Add an indicator that displays the ...'
---

Der Startercode bietet eine recht einfache Benutzererfahrung. Es gibt mehrere Möglichkeiten, ihn zu verbessern:

- Füge einen Indikator hinzu, der die aktuelle Folie und die Gesamtzahl der Folien anzeigt.
- Wenn ein Benutzer eine andere Hemdfarbe auswählt, ändere das Bilderkarussell, um Bilder von Hemden in der ausgewählten Farbe anzuzeigen.

Vor der Einführung der Komponente [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) konnten solche Funktionen nicht hinzugefügt werden. Wir wollen [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) in der Praxis ausprobieren und diese neuen Funktionen zu unserem Beispielcode hinzufügen!

## Installiere die Komponente `amp-bind`

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) ist eine AMP Komponente, die benutzerdefinierte Interaktivität mithilfe von Datenbindung und JS ähnlichen Ausdrücken bietet. Um [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) zu verwenden, musst du es auf der Seite installieren.

Öffne die Datei [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) und füge das folgende Skript zur Liste der AMP Komponenten im Abschnitt `<head>` der Seite hinzu:

```html
<script async custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

## Füge einen Folienindikator hinzu

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) works by binding element attributes to custom expressions. These expressions can reference the "state" (mutable JSON data). We can initialize this state through the [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) component included with [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

### Initialisiere den Folienstatus

Let's initialize a state variable to keep track of the index of the currently displayed slide in the image carousel. Open [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) and add the following to the top of the `<body>` of the page (before the `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

The data within [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) elements are accessible by their associated ID. For example, we can refer to this variable by the following expression fragment:

```javascript
selected.slide // Evaluates to 0.
```

### Aktualisiere den Folienstatus

Next, let's update this variable when the user changes slides on the carousel by adding the following `"on"` action to the existing [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) element:

```html
<amp-carousel type="slides" layout="fixed-height" height=250 id="carousel"
    on="slideChange:AMP.setState({selected: {slide: event.index}})">
```

Wenn sich nun die angezeigte Folie für das [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) ändert, wird die Aktion `AMP.setState` mit dem folgenden Argument aufgerufen:

```javascript
{
  selected: {
    slide: event.index
  }
}
```

The `event.index` expression evaluates to the new slide index, and the `AMP.setState()` action merges this object literal into the current state. This replaces the current value of `selected.slide` with the value of `event.index`.

[tip type="tip"] **TIP –** `AMP.setState()` performs a deep merge of nested object literals. For more details, see the [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) documentation. [/tip]

### Binde die Indikatorelemente

Verwende als Nächstes diese Statusvariable, die die derzeit angezeigte Folie verfolgt, und erstelle einen Folienindikator. Suche das Folienindikatorelement (suche nach `<!-- TODO: "Add a slide indicator" -->`) und füge den untergeordneten Elementen die folgenden Bindungen hinzu:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` ist eine Bindung, die das Attribut `class` ändert und mit der du CSS Klassen zu jedem Element hinzufügen oder daraus entfernen kannst.

**Probiere es aus**: Aktualisiere die Seite und wechsle die Folie!

Wenn die Folie im Karussell geändert wird, passiert Folgendes:

1. Triggers the `slideChange event` ...
2. Which calls the `AMP.setState` action ...
3. Which updates the state variable `selected.slide` ...
4. Which updates the `[class]` binding on the indicator `<span>` elements!

Nice! Now we have a working slide indicator.

[tip type="success"]

See if you can add functionality so that when a user taps on a slide's indicator dot, it updates the image carousel with the selected item. As a hint, use the `tap` event and `[slide]` binding on [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Ändere die Bilder im Karussell

It would be nice if we could see images of different shirt colors when we change the selected color. With [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) we can do this by binding `[src]` on the [`amp-img`](../../../../documentation/components/reference/amp-img.md) elements within the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### Initialisiere den SKU Status

Zuerst müssen wir die Statusdaten mit den Bildquellen URLs der einzelnen farbigen Hemden initialisieren. Dazu verwenden wir ein neues [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) Element:

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

Dieses [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) Element enthält ein JSON Objekt. Es ordnet den ID String des Hemdes (d. h. eine SKU) zur URL der Farbe und des Bildes des entsprechenden Hemdes zu. Hier würde auch ein JSON Array funktionieren. Aber wenn wir ein Objekt verwenden, können wir weitere coole Dinge tun, wie du bald sehen wirst.

Jetzt können wir über die ID des Hemdes auf die URL des Bildes zugreifen. Zum Beispiel steht `shirts['10014'].color` für `"dark green"` und `shirts['10030'].image ` gibt die URL des Bildes für die Hemdfarbe `"wine"` zurück.

### Verfolge die ausgewählte SKU

If we add another state variable that tracks the selected SKU, we can bind an expression to the [`amp-img`](../../../../documentation/components/reference/amp-img.md) elements to update their `src` attributes when the selected SKU changes. Add a new `sku` key to the existing `amp-state#selected` element's JSON:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### Aktualisiere den SKU Status

Add an "on" action to the [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) that updates the `selected.sku` variable whenever a new color is selected:

```html
<amp-selector name="color"
    on="select:AMP.setState({selected: {sku: event.targetOption}})">
```

[tip type="tip"] **TIP –** This could also be done by adding `on="tap:AMP.setState(...)` actions to each [`amp-img`](../../../../documentation/components/reference/amp-img.md) child inside the [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). One of the great things about [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) is that it simplifies markup in ways like this. [/tip]

### Binde die Bildelemente

Füge dann Bindungen zu [`amp-img`](../../../../documentation/components/reference/amp-img.md) hinzu:

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img width=200 height=250 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=300 height=375 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=400 height=500 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
```

[tip type="note"] **NOTE –**  In practice, each image in the carousel would likely have a different `src`. This could be done by replacing the single image with an array of images. For simplicity, this tutorial uses a single image at different magnifications. [/tip]

**Probiere es aus**: Aktualisiere die Seite und wähle eine andere Farbe für ein Hemd. Wenn du das tust, werden die Bilder des Karussells aktualisiert, um Hemden mit der ausgewählten Farbe anzuzeigen.

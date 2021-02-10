---
'$title': Verbesserung der Interaktivität
$order: 2
description: 'Der Startercode bietet eine recht einfache Benutzererfahrung. Es gibt mehrere Möglichkeiten, ihn zu verbessern\: - Füge einen Indikator hinzu …'
---

Der Startercode bietet eine recht einfache Benutzererfahrung. Es gibt mehrere Möglichkeiten, ihn zu verbessern:

- Füge einen Indikator hinzu, der die aktuelle Folie und die Gesamtzahl der Folien anzeigt.
- Wenn ein Benutzer eine andere Hemdfarbe auswählt, ändere das Bilderkarussell, um Bilder von Hemden in der ausgewählten Farbe anzuzeigen.

Vor der Einführung der Komponente [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) konnten solche Funktionen nicht hinzugefügt werden. Wir wollen [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) in der Praxis ausprobieren und diese neuen Funktionen zu unserem Beispielcode hinzufügen!

## Installiere die Komponente `amp-bind`

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) ist eine AMP Komponente, die benutzerdefinierte Interaktivität mithilfe von Datenbindung und JS ähnlichen Ausdrücken bietet. Um [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) zu verwenden, musst du es auf der Seite installieren.

Öffne die Datei [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) und füge das folgende Skript zur Liste der AMP Komponenten im Abschnitt `<head>` der Seite hinzu:

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

## Füge einen Folienindikator hinzu

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) bindet Elementattribute an benutzerdefinierte Ausdrücke. Diese Ausdrücke können auf den "Status" (veränderbare JSON Daten) verweisen. Wir können diesen Status über die Komponente [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) initialisieren, die zu [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) gehört.

### Initialisiere den Folienstatus

Initialisieren wir eine Statusvariable, um den Index der momentan angezeigten Folie im Bilderkarussell zu verfolgen. Öffne [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) und füge Folgendes am Anfang des `<body>` der Seite (vor dem `<header>`) hinzu:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

Der Zugriff auf die Daten innerhalb von [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) Elementen erfolgt über die zugehörige ID. Zum Beispiel können wir auf diese Variable durch das folgende Ausdrucksfragment verweisen:

```javascript
selected.slide; // Evaluates to 0.
```

### Aktualisiere den Folienstatus

Dieses Variable soll nun aktualisiert werden, sobald Benutzer die Folien im Karussell wechseln. Dazu fügen wir die folgende Aktion `"on"` zu dem vorhandenen Element [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) hinzu:

```html
<amp-carousel
  type="slides"
  layout="fixed-height"
  height="250"
  id="carousel"
  on="slideChange:AMP.setState({selected: {slide: event.index}})"
></amp-carousel>
```

Wenn sich nun die angezeigte Folie für das [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) ändert, wird die Aktion `AMP.setState` mit dem folgenden Argument aufgerufen:

```javascript
{
  selected: {
    slide: event.index;
  }
}
```

Der Ausdruck `event.index` wird als neuer Folienindex ausgewertet und die Aktion `AMP.setState()` führt dieses Objektliteral im aktuellen Status zusammen. Dadurch wird der aktuelle Wert von `selected.slide` durch den Wert von `event.index` ersetzt.

[tip type="tip"] **TIPP:** `AMP.setState()` führt ein Deep Merge der verschachtelten Objektliterale durch. Weitere Informationen findest du in der Dokumentation zu [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

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

1. Das `slideChange event` wird ausgelöst …
2. Dadurch wird die Aktion `AMP.setState` aufgerufen …
3. Dadurch wird die Statusvariable `selected.slide` aktualisiert …
4. Dadurch wird die `[class]` Bindung der `<span>` Elemente des Indikators aktualisiert!

Großartig! Jetzt funktioniert unser Folienindikator.

[tip type="success"]

Versuche, eine Funktionalität hinzuzufügen, die das Bilderkarussell auf das ausgewählte Element setzt, wenn Benutzer auf den Indikatorpunkt einer Folie tippen. Tipp: Verwende das Ereignis `tap` und die Bindung `[slide]` in [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Ändere die Bilder im Karussell

Es wäre ein schöner Effekt, wenn wir Bilder mit verschiedenen Hemdfarben sehen könnten, sobald wir die ausgewählte Farbe ändern. Das können wir mit [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) erreichen, indem wir `[src]` an die [`amp-img`](../../../../documentation/components/reference/amp-img.md) Elemente innerhalb von [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) binden.

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

Wenn wir eine weitere Statusvariable hinzufügen, die die ausgewählte SKU verfolgt, können wir einen Ausdruck an die [`amp-img`](../../../../documentation/components/reference/amp-img.md) Elemente binden, um deren `src` Attribute zu aktualisieren, wenn die ausgewählte SKU sich ändert. Füge den neuen Schlüssel `sku` zum JSON des vorhandenen Elements `amp-state#selected` hinzu:

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

Füge dem [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) die Aktion "on" hinzu, die die Variable `selected.sku` aktualisiert, wenn eine neue Farbe ausgewählt wird:

```html
<amp-selector
  name="color"
  on="select:AMP.setState({selected: {sku: event.targetOption}})"
></amp-selector>
```

[tip type="tip"] **TIPP:** Das ist auch möglich, indem du Aktionen vom Typ `on="tap:AMP.setState(...)` zu jedem untergeordneten [`amp-img`](../../../../documentation/components/reference/amp-img.md) Element innerhalb von [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) hinzufügst. Einer der großen Vorteile von [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) ist, dass es auf diese Weise das Markup vereinfacht. [/tip]

### Binde die Bildelemente

Füge dann Bindungen zu [`amp-img`](../../../../documentation/components/reference/amp-img.md) hinzu:

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img
  width="200"
  height="250"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="300"
  height="375"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="400"
  height="500"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
```

[tip type="note"] **HINWEIS:** In der Praxis hätte wahrscheinlich jedes Bild im Karussell ein anderes `src`. Das kann erreicht werden, indem das einzelne Bild durch ein Array von Bildern ersetzt wird. Zur Vereinfachung verwenden wir in diesem Tutorial ein einzelnes Bild mit unterschiedlichen Vergrößerungen. [/tip]

**Probiere es aus**: Aktualisiere die Seite und wähle eine andere Farbe für ein Hemd. Wenn du das tust, werden die Bilder des Karussells aktualisiert, um Hemden mit der ausgewählten Farbe anzuzeigen.

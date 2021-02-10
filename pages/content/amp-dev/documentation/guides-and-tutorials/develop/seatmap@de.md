---
'$title': Erstelle einen Sitzplan
$order: 104
description: Sitzpläne sind wichtige Bestandteile von Web Apps für Ticketverkauf, die Implementierung in AMP kann jedoch schwierig sein. Lies weiter, um zu erfahren, wie du einen Sitzplan in AMP implementierst, indem
tutorial: 'true'
formats:
  - websites
author: kul3r4
contributors:
  - pbakaus
---

Sitzpläne sind wichtige Bestandteile von Web Apps für Ticketverkauf, die Implementierung in AMP kann jedoch schwierig sein. Lies weiter, um zu erfahren, wie du einen Sitzplan in AMP mithilfe einer Kombination verfügbarer AMP Komponenten implementierst.

[tip] Ein Live Beispiel zur Implementierung der nachfolgend beschriebenen Praktiken findest du [hier](../../../documentation/examples/documentation/SeatMap.html). [/tip]

## Benötigte AMP Komponenten

Beginnen wir mit einer Übersicht über die benötigten Komponenten:

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) ermöglicht das Zoomen und Schwenken von Inhalt durch Doppeltippen und Pinchen. Diese Komponente dient als Basis für die Implementierung des Sitzplans.

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md) ruft Inhalte dynamisch von einem CORS JSON Endpoint ab und rendert sie mithilfe eines vorgegebenen Templates. Mit dieser Komponente wird die aktuelle Verfügbarkeit des Sitzplans abgerufen, damit Benutzer immer die neuesten Daten erhalten.

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md) erweitert die Seite um zusätzliche Interaktivität. Wird in diesem Fall benötigt, um mitzuverfolgen, wie viele Sitze ausgewählt wurden.

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md) stellt ein Steuerelement dar, das ein Menü mit Optionen anzeigt, aus denen Benutzer wählen können. Der gesamte Sitzplan kann als Optionsmenü betrachtet werden, wobei jeder Sitz eine Option ist. Dies erleichtert die Gestaltung des ausgewählten Status der Sitze erheblich, da du dafür CSS Ausdrücke verwenden kannst. Der folgende Ausdruck ändert beispielsweise die Füllfarbe eines Sitzes zu Orange, sobald er ausgewählt wird.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Anforderungen

1. Um einen Sitzplan als SVG zu zeichnen, wobei jeder Sitz durch das Element `rect` dargestellt wird, benötigst du folgende Informationen zu jedem Sitz: Position `x` und `y`, `width` und `height` und eventuell `rx` und `ry`, um die Ecken der Rechtecke abzurunden.
2. Eine eindeutige Kennung für den spezifischen Sitz, der für die Buchung verwendet werden kann.
3. Ein Maß für die gesamte Breite und Höhe des Sitzplans, die im Attribut `viewbox` verwendet werden soll.

## Sitzplan zeichnen

Der Sitzplan wird über [`amp-list`](../../../documentation/components/reference/amp-list.md) und [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md) gerendert. Sobald du die Daten über den Aufruf von [`amp-list`](../../../documentation/components/reference/amp-list.md) erhalten hast, kannst du anhand dieser Daten die Sitze durchlaufen:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Nicht verfügbare Sitze gestalten

Im obigen Beispiel ist `{% raw %}{{unavailable}}{% endraw %}` der Wert eines Feldes, der vom JSON Endpoint zurückgegeben und zur Gestaltung eines nicht verfügbaren Sitzes verwendet wird. Bei diesem Ansatz ist es nicht möglich, Attribute wie `option="{{id}}"` zu entfernen, falls ein Sitz nicht verfügbar ist, da das Template nicht das `<html>` Element aller Seiten vollständig umschließen kann.

Bei einer ausführlicheren Alternative dazu werden die Tags wie folgt wiederholt:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Dimensionierung des Sitzplans

Wenn die Größe deines Sitzplans nicht festgelegt ist, ist es schwierig, die Größe der [`amp-list`](../../../documentation/components/reference/amp-list.md) festzulegen, welche den Sitzplan enthält. [`amp-list`](../../../documentation/components/reference/amp-list.md) benötigt entweder feste Maße oder verwendet `layout="fill"` (um den verfügbaren Platz des übergeordneten Containers zu nutzen). Es gibt zwei mögliche Lösungen für dieses Problem:

1. Berechne den verfügbaren Platz auf der Seite, sobald du weißt, wie viel Platz die anderen Komponenten wie Header und Footer benötigen. Diese Berechnung kann in CSS mithilfe des Ausdrucks `calc` erfolgen. Dabei wird dieser Ausdruck als `min-height` des übergeordneten div Elements der [`amp-list`](../../../documentation/components/reference/amp-list.md) verwendet.
2. Verwende ein flexibles Layout, wenn du die Höhe des Seitenlayouts kennst.

## Gestaltung von amp-pan-zoom

Wenn du den im vorherigen Abschnitt beschriebenen Ansatz verwendest, muss für [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) auch `layout="fill"` verwendet werden.

[tip type="tip"] **TIPP:** So lässt du einen gewissen Leerraum um den Sitzplan und machst ihn trotzdem zum Teil des Bereichs, in dem das Pinchen und Zoomen funktioniert:

- Füge ein umschließendes div für die SVG hinzu,
- füge Padding hinzu.

Wenn du kein umschließendes div einbaust und stattdessen dem SVG einen Außenrand (margin) gibst, werden die Ränder nicht Teil des Bereichs sein, in dem Pinchen und Zoomen möglich sind. [/tip]

## Verarbeitung des Status

Wenn Benutzer auf verschiedene Sitze klicken, können die `id`s der ausgewählten Sitze in einer Variablen mithilfe von `amp-state` verfolgt werden. Dazu kannst du entweder

- den Ausdruck [`amp-bind`](../../../documentation/components/reference/amp-bind.md) für jeden Sitz hinzufügen, um den ausgewählten Sitz in eine Liste einzutragen, oder
- [`amp-selector`](../../../documentation/components/reference/amp-selector.md) mit der Aktion `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` verwenden, um alle ausgewählten Sitze in eine Liste einzutragen.

Während die zusätzliche Komponente [`amp-selector`](../../../documentation/components/reference/amp-selector.md) beim ersten Ansatz nicht erforderlich ist, kann der Verzicht darauf den Sitzplan stark verlangsamen, da jede Instanz von [`amp-bind`](../../../documentation/components/reference/amp-bind.md) immer dann ausgewertet wird, wenn ein Sitz ausgewählt bzw. dessen Auswahl aufgehoben wird.

Beim zweiten Ansatz kann außerdem die Duplizierung des Ausdrucks [`amp-bind`](../../../documentation/components/reference/amp-bind.md) für jeden Sitz, den das Template rendert, reduziert werden.

## Endgültige HTML Struktur

Als Referenz findest du hier den endgültigen HTML Code für den Sitzplan:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
<amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
<template type="amp-mustache">
<amp-pan-zoom layout="fill" class="seatmap">
<amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
<div class="svg-container">
<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>
</div>
</amp-selector>
</amp-pan-zoom>
</template>
</amp-list>

</div>{% endraw %}
[/sourcecode]

---
"$title": Introduction to complex animations
"$order": '2'
description: Für Animationen, die nicht durch das Hinzufügen und Entfernen von Klassen gesteuert werden können, bietet AMP mehrere animationsspezifische Komponenten. Diese Komponenten wenden die AMP Prinzipien auf Animationen an …
formats:
- websites
- ads
author: CrystalOnScript
---

Für Animationen, die nicht durch das [Hinzufügen und Entfernen von Klassen](triggering_css_animations.md) gesteuert werden können, bietet AMP mehrere animationsspezifische Komponenten. Diese Komponenten wenden die AMP Prinzipien auf Animationen an: Sie sind schnell, effizient und benutzerorientiert. Zwar schränkt AMP die innerhalb von Keyframes zulässigen CSS Eigenschaften ein, bietet dafür aber Vorteile wie Feinsteuerung, nahtlose Animationen und browserübergreifende Kompatibilität ohne zusätzliche Mühe.

Verwende amp-animation, wenn du die Wiedergabe präzise steuern möchtest und präzises Timing erreichen willst, während mehrere Elemente gleichzeitig animiert werden.

## Einfache AMP Animation erstellen

The [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) component enables use of the [Web Animation API](https://www.w3.org/TR/web-animations/) in AMP.

Eine einfache [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) ist ein JSON Objekt, das aus den folgenden Schlüsselelementen besteht:

- Element, das die Komponente animiert, oder `selector`
- [Timing Properties](../../../../documentation/components/reference/amp-animation.md#timing-properties)
- [Keyframes](../../../../documentation/components/reference/amp-animation.md#keyframes)
- [Trigger](../../../../documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### Selector

Much like CSS, the [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) component links the animation properties to the element by declaring the element's tag name, class, or id in the `"selector"` field. The component animates each element with the tag type or class name declared. Use an id to ensure you animate a single element.

### Timing properties

Die [Timing Eigenschaften](../../../../documentation/components/reference/amp-animation.md#timing-properties) steuern, wie lange eine Animation dauert, wie oft sie abgespielt wird und in welche Richtung Keyframes ausgeführt werden.

Die Angabe von Timing Eigenschaften ist nicht erforderlich, aber eine Animation wird möglicherweise nicht ausgeführt, wenn Eigenschaften für die Zeit und Anzeige fehlen, z. B. `duration` und `fill`.

### Keyframes

Während CSS es erlaubt, durch Übergänge von einem Zustand in einen anderen zu wechseln, musst du Animationseigenschaften als Keyframes deklarieren, um [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) zu implementieren (ähnlich wie bei [CSS Animationen](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)). Um eine reibungslose Wiedergabe und browserübergreifende Kompatibilität zu gewährleisten, beschränkt [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) [die zulässigen Keyframe Eigenschaften](../../../../documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) auf GPU-beschleunigte Eigenschaften, die kein neues Layout verursachen und im [Compositor Thread](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture) animiert werden können. Dies verhindert, dass AMP und der [Rendervorgang](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) des Browsers durch Animationen beeinträchtigt werden.

[tip type="note"] Keyframes werden entweder direkt in einer [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) definiert oder von [`<amp style-keyframe>`](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#keyframes-stylesheet) aus referenziert, sofern sie den Beschränkungen für Eigenschaften entsprechen. Mehr Infos über [Keyframes findest du in `amp-animation`](../../../../documentation/components/reference/amp-animation.md#keyframes). [/tip]

### Trigger

Der Trigger startet die Animationssequenz. Die Erweiterung [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) startet entweder, wenn der `<body>` auf der Seite sichtbar wird, oder indem die Seite mit einer [AMP Aktion oder einem AMP Event](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) verbunden wird.

Das Auslösen bei Sichtbarkeit von `<body>` ist nützlich, wenn die Animation ausgeführt werden soll, sobald die Seite geladen wird, da sie im angezeigten Bereich oder im ersten Viewport der Seite erscheint. Animationen werden durch Sichtbarkeit ausgelöst, indem der Komponente das Attribut `trigger="visibility"` hinzugefügt wird.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Animationen stellen eine Verbindung zu einer Aktion oder einem Event her, indem sie der Komponente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) eine `id` zuweisen und diese `id` mit dem gewünschten Ereignisauslöser verknüpfen, z. B. Tippen auf einen Button.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Building complex animations

Building an animation in [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) allows for fine grained control that goes beyond starting and stopping an animation: it can also pause, reverse, and direct to a specific point. You can even chain multiple animations together and animate elements in a sequence.

### Subtargets

Elements of the same tag or class can have specified timing properties and override the values of variables defined in the top level animation.

[example preview="top-frame" playground="true" imports="amp-animation"]
```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [{"transform": "translateX(0px)"}, {"transform": "translateX(50%)"}],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">
   start
  </button>
</body>
```
[/example]

### Chained animations

Mehrere Animationen können zu einer großen Sequenz verbunden werden. Du kannst zeitgesteuerte Effekte wie Überlagerungen in einem Video erstellen, indem du Animationen in das Array `animations` in der Komponente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) schreibst.

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>

```

This setup plays each animation for 3 seconds in a sequence.

For larger animations, animations inside the `animations` array are able to reference other [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) components.

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### Animating an unknown amount of elements

Mithilfe der [Ausdrücke `var()` und `calc()`](../../../../documentation/components/reference/amp-animation.md) kannst du zusammen mit [CSS Erweiterungen](../../../../documentation/components/reference/amp-animation.md#css-extensions) komplexe und zeitgesteuerte Animationen schreiben, die mit einer beliebigen Anzahl von Elementen funktionieren. Dies ermöglicht eine simple und flüssige Animation dynamischer und benutzergenerierter Daten.

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
            {"transform": "translate3d(0px, 0px, 0px)"},
            {"transform": "translate3d(50%, 0px, 100px)"},
            {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
            {"transform": "translate3d(50%, 0px, -100px)"},
            {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex=none role="animation">
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg" layout="fill"></amp-img>
  </div>
</body>
```
[/example]

- Declaring a variable, `--duration`, and giving it the value of two seconds.
- Setting the `duration` to the var `--duration`'s value.
- Calculating the delay applied to each element with the class `.card`.
    1. Die [Erweiterung `length()`](../../../../documentation/components/reference/amp-animation.md#css-length()-extension) berechnet, wie viele `.card` Elemente ausgewählt wurden.
    2. The length then subtracts each `.card`'s [index()](../../../../documentation/components/reference/amp-animation.md#css-index()-extension)
    3. The resulting value is multiplied by the var `--duration`
    4. The final total is applied in seconds to that element's delay
- Die Animation wird auf jedes Element individuell angewendet, sodass die Karten nicht alle gleichzeitig, sondern nacheinander zufällig wiedergegeben werden.

Open the animation in the AMP playground and add more [`amp-img`](../../../../documentation/components/reference/amp-img) elements to test this behavior.

### Look great, everywhere

Animationen können [`conditions`](../../../../documentation/components/reference/amp-animation.md#conditions) enthalten, die benutzerdefinierte Effekte ermöglichen. Passe Animationen mit der [Bedingung `media`](../../../../documentation/components/reference/amp-animation.md#media-query) an eine beliebige Bildschirmgröße an und unterstütze die Abwärtskompatibilität für Browser, indem du die [Bedingungen `supports`](../../../../documentation/components/reference/amp-animation.md#supports-condition) in einer [`switch` Anweisung](../../../../documentation/components/reference/amp-animation.md#animation-switch-statement) aktivierst.

[example preview="top-frame" playground="true"]
```html
<head>
 <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
</head>
<body>
<amp-animation id="mediaAnimation" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "1s",
      "iterations": "4",
      "fill": "both",
      "direction": "alternate",
      "animations": [
        {
          "media": "(min-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(50vw)"
          }
        },
        {
          "media": "(min-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-50vw)"
          }
        }
      ]
    }
  </script>
</amp-animation>
    
  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```
[/example]

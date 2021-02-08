---
'$title': Einführung in komplexe Animationen
$order: 2
description: Für Animationen, die nicht durch das Hinzufügen und Entfernen von Klassen gesteuert werden können, bietet AMP mehrere animationsspezifische Komponenten. Diese Komponenten wenden die AMP Prinzipien auf Animationen an …
formats:
  - websites
  - ads
author: CrystalOnScript
---

Für Animationen, die nicht durch das [Hinzufügen und Entfernen von Klassen](triggering_css_animations.md) gesteuert werden können, bietet AMP mehrere animationsspezifische Komponenten. Diese Komponenten wenden die AMP Prinzipien auf Animationen an: Sie sind schnell, effizient und benutzerorientiert. Zwar schränkt AMP die innerhalb von Keyframes zulässigen CSS Eigenschaften ein, bietet dafür aber Vorteile wie Feinsteuerung, nahtlose Animationen und browserübergreifende Kompatibilität ohne zusätzliche Mühe.

Verwende amp-animation, wenn du die Wiedergabe präzise steuern möchtest und präzises Timing erreichen willst, während mehrere Elemente gleichzeitig animiert werden.

## Einfache AMP Animation erstellen

Die Komponente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) ermöglicht die Verwendung der [Web Animation API](https://www.w3.org/TR/web-animations/) in AMP.

Eine einfache [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) ist ein JSON Objekt, das aus den folgenden Schlüsselelementen besteht:

- Element, das die Komponente animiert, oder `selector`
- [Eigenschaften für das Timing](../../../../documentation/components/reference/amp-animation.md#timing-properties)
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

Ähnlich wie bei CSS verknüpft die Komponente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) die Animationseigenschaften mit dem Element, indem sie den Tagnamen, die Klasse oder die ID des Elements im Feld `"selector"` deklariert. Die Komponente animiert jedes Element mit dem deklarierten Tagtyp oder Klassennamen. Verwende eine ID, um sicherzustellen, dass ein bestimmtes Element animiert wird.

### Eigenschaften für das Timing

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

## Komplexe Animationen erstellen

Für eine Animation, die in [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) erstellt wird, können nicht nur das Starten und Stoppen der Animation präzise gesteuert werden: Sie kann auch angehalten oder umgekehrt werden und zu einem bestimmten Punkt springen. Du kannst sogar mehrere Animationen miteinander verketten und Elemente in einer Sequenz animieren.

### Teilziele

Elemente desselben Tags oder derselben Klasse können bestimmte Timing Eigenschaften haben und die Werte von Variablen überschreiben, die in der Animation der obersten Ebene definiert sind.

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
        "keyframes": [
          {"transform": "translateX(0px)"},
          {"transform": "translateX(50%)"}
        ],
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
  <button on="tap:animateThis.start">start</button>
</body>
```

[/example]

### Verkettete Animationen

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

Dieses Setup spielt jede Animation 3 Sekunden lang in einer Sequenz ab.

Für größere Animationen können Animationen innerhalb des Arrays `animations` auf andere [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) Komponenten verweisen.

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

### Animieren einer unbekannten Anzahl von Elementen

Mithilfe der [Ausdrücke `var()` und `calc()`](../../../../documentation/components/reference/amp-animation.md) kannst du zusammen mit [CSS Erweiterungen](../../../../documentation/components/reference/amp-animation.md#css-extensions) komplexe und zeitgesteuerte Animationen schreiben, die mit einer beliebigen Anzahl von Elementen funktionieren. Dies ermöglicht eine simple und flüssige Animation dynamischer und benutzergenerierter Daten.

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-animation"
    src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
  ></script>
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
  <div class="parent" on="tap:cardAdmin.start" tabindex="none" role="animation">
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg"
      layout="fill"
    ></amp-img>
  </div>
</body>
```

[/example]

- Die Variable `--duration` wird deklariert und ihr Wert wird auf zwei Sekunden gesetzt.
- `duration` wird auf den Wert der Variable `--duration` gesetzt.
- Berechnen der Verzögerung, die auf jedes Element angewendet wird, das mit dem Selektor `.card` übereinstimmt.
  1. Die [Erweiterung `length()`](<../../../../documentation/components/reference/amp-animation.md#css-length()-extension>) berechnet, wie viele `.card` Elemente ausgewählt wurden.
  2. Dann wird der [index()](<../../../../documentation/components/reference/amp-animation.md#css-index()-extension>) jeder `.card` von der Länge subtrahiert.
  3. Der resultierende Wert wird mit der Variablen `--duration` multipliziert.
  4. Die Endsumme wird in Sekunden auf die Verzögerung dieses Elements angewendet.
- Die Animation wird auf jedes Element individuell angewendet, sodass die Karten nicht alle gleichzeitig, sondern nacheinander zufällig wiedergegeben werden.

Öffne die Animation im AMP Playground und füge weitere [`amp-img`](../../../../documentation/components/reference/amp-img) Elemente hinzu, um dieses Verhalten zu testen.

### Sieht überall gut aus

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
  <script
    async
    custom-element="amp-animation"
    src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
  ></script>
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

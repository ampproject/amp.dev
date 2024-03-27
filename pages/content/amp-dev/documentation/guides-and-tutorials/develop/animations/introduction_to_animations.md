---
$title: Introduction to complex animations
$order: 2
description: For animations that can't be driven by adding and removing classes, AMP offers several animation specific components. These components apply AMP's principles to animations ...
formats:
  - websites
  - ads
author: CrystalOnScript
---

For animations that can't be driven by [adding and removing classes](triggering_css_animations.md), AMP offers several animation specific components. These components apply AMP's principles to animations: they're fast, efficient, and user first. AMP restricts what CSS properties inside keyframes are allowed, but grants benefits such as fine-grain control, seamless animations, and cross browser compatibility with no extra work.

Use amp-animation if you need to tightly control playback, as well as have precise timing with multiple elements animating at the same time.

## Creating a basic AMP animation

The [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) component enables use of the [Web Animation API](https://www.w3.org/TR/web-animations/) in AMP.

A basic [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) is a JSON object made of the following key parts:

- The element the component is animating, or `selector`.
- [Timing Properties](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties)
- [Keyframes](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes)
- [Trigger](/content/amp-dev/documentation/components/reference/amp-animation.md#triggering-animation)

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

Much like CSS, the [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) component links the animation properties to the element by declaring the element's tag name, class, or id in the `"selector"` field. The component animates each element with the tag type or class name declared. Use an id to ensure you animate a single element.

### Timing properties

The [timing properties](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties) control how long an animation takes, the amount of times it plays, and which direction keyframes execute.

No timing properties are required, but an animation might not run if properties related to time and display are missing, such as `duration` and `fill`.

### Keyframes

While CSS allows you to morph from one state to another via transitions, you must declare animation properties as keyframes to implement [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) are usable to GPU accelerated properties that do not cause a re-layout and can animate on the [compositor thread](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). This prevents animations from interfering with AMP and the browser's [render process](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing).

[tip type="note"]
Keyframes are either defined directly in an [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes).
[/tip]

### Trigger

The trigger starts the animation sequence. The [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) extension starts either when the `<body>` becomes visible on the page or by connecting it to an [AMP action or event](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)

Triggering on visibility of `<body>` is useful when the animation should run as soon as the page loads because it appears "above the fold", or within the first viewport of the page. Animations trigger through visibility by adding `trigger="visibility"` as an attribute to the component.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Animations connect to an action or event by assigning the [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) component an `id` and linking that `id` to the desired event trigger, such as tapping a button.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Building complex animations

Building an animation in [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) allows for fine grained control that goes beyond starting and stopping an animation: it can also pause, reverse, and direct to a specific point. You can even chain multiple animations together and animate elements in a sequence.

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

### Chained animations

Multiple animations can connect together to form a large sequence. You can create timed effects, such as overlays on a video, by writing animations in the `animations` array within the [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) component.

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

For larger animations, animations inside the `animations` array are able to reference other [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) components.

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

By using [`var(/content/amp-dev/documentation/components/reference/amp-animation.md#css-extensions), you can write complex and timed animations that work with any number of elements. This allows for dynamic and user generated data to be animated with ease and fluidity.

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-animation"
    src="https://ampjs.org/v0/amp-animation-0.1.js"
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
This example works by:

- Declaring a variable, `--duration`, and giving it the value of two seconds.
- Setting the `duration` to the var `--duration`'s value.
- Calculating the delay applied to each element with the class `.card`.
  1.  The [`length(/content/amp-dev/documentation/components/reference/amp-animation.md#css-length()-extension) calculates how many `.card` elements were selected
  1.  The length then subtracts each `.card`'s [index(/content/amp-dev/documentation/components/reference/amp-animation.md#css-index()-extension)
  1.  The resulting value is multiplied by the var `--duration`
  1.  The final total is applied in seconds to that element's delay
- The animation is applied to each element individually so that the cards are shuffled one after another instead of all at the same time.

Open the animation in the AMP playground and add more [`amp-img`](../../../../documentation/components/reference/amp-img) elements to test this behavior.

### Look great, everywhere

Animations can include [`conditions`](/content/amp-dev/documentation/components/reference/amp-animation.md#animation-switch-statement).

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
    src="https://ampjs.org/v0/amp-animation-0.1.js"
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

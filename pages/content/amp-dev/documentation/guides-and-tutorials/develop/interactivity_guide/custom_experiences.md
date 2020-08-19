---
formats:
  - websites
$title: Building custom interactive experiences
$order: 3
description: "This guide outlines highly customizable interactivity options to integrate into AMP pages."
author: CrystalOnScript
contributors:
  - sbenz
---

This guide outlines highly customizable interactivity options to integrate into AMP pages.  Like snowflakes and variable names, each website is unique and AMP's ready-made component library may not meet all your needs. Instead, AMP provides adaptable components that enable personalized solutions to complex interactivity needs. Use these components to build selection interfaces, widget, and the ability to process custom logic.

# Selection state management with amp-selector

Many common web experiences include presenting user’s with options and responding to their selections. With the [`amp-selector`](../../../components/reference/amp-selector.md) component, you can build menus of options, specify form input behaviors, and implement tabs.

amp-selector offers two core features:

1. Update UI based on a user selection.
2. Manage single or multiple selection states.

Define how elements behave when users make selections by allowing single or multi selection options.

```
<amp-selector class="sample-selector"
  layout="container">
  <amp-img src="/static/samples/img/landscape_sea_300x199.jpg"
    width="90"
    height="60"
    option="1"></amp-img>
  <amp-img src="/static/samples/img/landscape_desert_300x200.jpg"
    width="90"
    height="60"
    option="2"></amp-img>
  <div class="divider inline-block mx1"></div>
  <amp-img src="/static/samples/img/landscape_ship_300x200.jpg"
    width="90"
    height="60"
    option="3"></amp-img>
  <amp-img src="/static/samples/img/landscape_village_300x200.jpg"
    width="90"
    height="60"
    option="4"></amp-img>
</amp-selector>

<amp-selector layout="container"
  class="sample-selector"
  multiple>
  <amp-img src="/static/samples/img/landscape_sea_300x199.jpg"
    width="90"
    height="60"
    option="1"></amp-img>
  <amp-img src="/static/samples/img/landscape_desert_300x200.jpg"
    width="90"
    height="60"
    option="2"></amp-img>
  <amp-img src="/static/samples/img/landscape_ship_300x200.jpg"
    width="90"
    height="60"
    option="3"></amp-img>
  <amp-img src="/static/samples/img/landscape_village_300x200.jpg"
    width="90"
    height="60"
    option="4"></amp-img>
</amp-selector>

```

You can disable or highlight selector options based on user interactions.

```
<amp-selector layout="container"
  class="sample-selector"
  multiple>
  <amp-img src="/static/samples/img/landscape_sea_300x199.jpg"
    width="90"
    height="60"
    option="1"></amp-img>
  <amp-img src="/static/samples/img/landscape_desert_300x200.jpg"
    width="90"
    height="60"
    option="2"
    selected></amp-img>
  <amp-img src="/static/samples/img/landscape_ship_300x200.jpg"
    width="90"
    height="60"
    option="3"></amp-img>
  <amp-img src="/static/samples/img/landscape_village_300x200.jpg"
    width="90"
    height="60"
    option="4"
    disabled></amp-img>
</amp-selector>

```

It exposes selection events enabling interaction with other AMP components.

```
<amp-selector id="carouselWithPreviewSelector"
  class="carousel-preview"
  on="select:carouselWithPreview.goToSlide(index=event.targetOption)"
  layout="container">
  <amp-img option="0"
    selected
    src="https://unsplash.it/60/40?image=10"
    width="60"
    height="40"
    alt="a sample image"></amp-img>
  <amp-img option="1"
    src="https://unsplash.it/60/40?image=11"
    width="60"
    height="40"
    alt="a sample image"></amp-img>
  <amp-img option="2"
    src="https://unsplash.it/60/40?image=12"
    width="60"
    height="40"
    alt="a sample image"></amp-img>
  <amp-img option="3"
    src="https://unsplash.it/60/40?image=13"
    width="60"
    height="40"
    alt="a sample image"></amp-img>
</amp-selector>
<amp-carousel id="carouselWithPreview"
  width="400"
  height="300"
  layout="responsive"
  type="slides"
  on="slideChange:carouselWithPreviewSelector.toggle(index=event.index, value=true)">
  <amp-img src="https://unsplash.it/400/300?image=10"
    layout="fill"
    alt="a sample image"></amp-img>
  <amp-img src="https://unsplash.it/400/300?image=11"
    layout="fill"
    alt="a sample image"></amp-img>
  <amp-img src="https://unsplash.it/400/300?image=12"
    layout="fill"
    alt="a sample image"></amp-img>
  <amp-img src="https://unsplash.it/400/300?image=13"
    layout="fill"
    alt="a sample image"></amp-img>
</amp-carousel>
```

Here is an example in which we combine `amp-selector` with an SVG to create an interactive chart.

```
<head>
 <style amp-custom>
    .bar[option][selected] {
          fill: red;
      outline: none;
    }
  </style>
</head>
<body>
  <amp-selector>
    <svg class="chart" width="420" height="150" aria-labelledby="title desc" role="img">
      <title id="title">A bar chart showing information</title>
      <desc id="desc">4 apples; 8 bananas; 15 kiwis; 16 oranges; 23 lemons</desc>
      <g class="bar" option>
        <rect width="40" height="19"></rect>
        <text x="45" y="9.5" dy=".35em">4 apples</text>
      </g>
      <g class="bar" option>
        <rect width="80" height="19" y="20"></rect>
        <text x="85" y="28" dy=".35em">8 bananas</text>
      </g>
      <g class="bar" option>
        <rect width="150" height="19" y="40"></rect>
        <text x="150" y="48" dy=".35em">15 kiwis</text>
      </g>
      <g class="bar" option selected>
        <rect width="160" height="19" y="60"></rect>
        <text x="161" y="68" dy=".35em">16 oranges</text>
      </g>
      <g class="bar" option>
        <rect width="230" height="19" y="80"></rect>
        <text x="235" y="88" dy=".35em">23 lemons</text>
      </g>
    </svg>
  </amp-selector>
</body>
```

[playground](https://playground.amp.dev/?mode=Responsive#share=PCFkb2N0eXBlIGh0bWw+CjxodG1sIOKaoT4KPGhlYWQ+CiAgPG1ldGEgY2hhcnNldD0idXRmLTgiPgogIDx0aXRsZT5NeSBBTVAgUGFnZTwvdGl0bGU+CiAgPGxpbmsgcmVsPSJjYW5vbmljYWwiIGhyZWY9InNlbGYuaHRtbCIgLz4KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLG1pbmltdW0tc2NhbGU9MSxpbml0aWFsLXNjYWxlPTEiPgogIDxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tb3otYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1zLWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoO2FuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RofUAtd2Via2l0LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1vei1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tcy1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1vLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1Aa2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fTwvc3R5bGU+PG5vc2NyaXB0PjxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjpub25lOy1tb3otYW5pbWF0aW9uOm5vbmU7LW1zLWFuaW1hdGlvbjpub25lO2FuaW1hdGlvbjpub25lfTwvc3R5bGU+PC9ub3NjcmlwdD4KICA8c2NyaXB0IGFzeW5jIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanMiPjwvc2NyaXB0PgogIDxzY3JpcHQgYXN5bmMgY3VzdG9tLWVsZW1lbnQ9ImFtcC1zZWxlY3RvciIgc3JjPSJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC9hbXAtc2VsZWN0b3ItMC4xLmpzIj48L3NjcmlwdD4KICA8c3R5bGUgYW1wLWN1c3RvbT4KICAgIC5iYXJbb3B0aW9uXVtzZWxlY3RlZF0gewogIAkgIGZpbGw6IHJlZDsKICAgICAgb3V0bGluZTogbm9uZTsKICAgIH0KICA8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5PgogIDxhbXAtc2VsZWN0b3I+CiAgICA8c3ZnIGNsYXNzPSJjaGFydCIgd2lkdGg9IjQyMCIgaGVpZ2h0PSIxNTAiIGFyaWEtbGFiZWxsZWRieT0idGl0bGUgZGVzYyIgcm9sZT0iaW1nIj4KICAgICAgPHRpdGxlIGlkPSJ0aXRsZSI+QSBiYXIgY2hhcnQgc2hvd2luZyBpbmZvcm1hdGlvbjwvdGl0bGU+CiAgICAgIDxkZXNjIGlkPSJkZXNjIj40IGFwcGxlczsgOCBiYW5hbmFzOyAxNSBraXdpczsgMTYgb3JhbmdlczsgMjMgbGVtb25zPC9kZXNjPgogICAgICA8ZyBjbGFzcz0iYmFyIiBvcHRpb24+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjE5Ij48L3JlY3Q+CiAgICAgICAgPHRleHQgeD0iNDUiIHk9IjkuNSIgZHk9Ii4zNWVtIj40IGFwcGxlczwvdGV4dD4KICAgICAgPC9nPgogICAgICA8ZyBjbGFzcz0iYmFyIiBvcHRpb24+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjE5IiB5PSIyMCI+PC9yZWN0PgogICAgICAgIDx0ZXh0IHg9Ijg1IiB5PSIyOCIgZHk9Ii4zNWVtIj44IGJhbmFuYXM8L3RleHQ+CiAgICAgIDwvZz4KICAgICAgPGcgY2xhc3M9ImJhciIgb3B0aW9uPgogICAgICAgIDxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTkiIHk9IjQwIj48L3JlY3Q+CiAgICAgICAgPHRleHQgeD0iMTUwIiB5PSI0OCIgZHk9Ii4zNWVtIj4xNSBraXdpczwvdGV4dD4KICAgICAgPC9nPgogICAgICA8ZyBjbGFzcz0iYmFyIiBvcHRpb24gc2VsZWN0ZWQ+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxOSIgeT0iNjAiPjwvcmVjdD4KICAgICAgICA8dGV4dCB4PSIxNjEiIHk9IjY4IiBkeT0iLjM1ZW0iPjE2IG9yYW5nZXM8L3RleHQ+CiAgICAgIDwvZz4KICAgICAgPGcgY2xhc3M9ImJhciIgb3B0aW9uPgogICAgICAgIDxyZWN0IHdpZHRoPSIyMzAiIGhlaWdodD0iMTkiIHk9IjgwIj48L3JlY3Q+CiAgICAgICAgPHRleHQgeD0iMjM1IiB5PSI4OCIgZHk9Ii4zNWVtIj4yMyBsZW1vbnM8L3RleHQ+CiAgICAgIDwvZz4KICAgIDwvc3ZnPgogIDwvYW1wLXNlbGVjdG9yPgo8L2JvZHk+CjwvaHRtbD4=)

# Simple interactivity and data binding with amp-bind

User's expect the modern web to react to their interactions and reflect changes they've made. The `amp-bind` component enables state setting, reading, UI changes, and can process user inputs and simple logic.

```
<amp-state id="name">
  <script type="application/json">
    "?"
  </script>
</amp-state>
<input id="name-input"
  placeholder="Enter a name"
  on="input-throttled:AMP.setState({ name: event.value })">
<div>Hello <span [text]="name">?</span></div>
(Maybe in this example we have a predefined state and a button that say "set state" and also a text box for a user to overwrite that state)
```

The `amp-bind` component performs no evaluations on page load, with the exception of combining with amp-list.

Read on: Read more on evaluating state on page load with amp-list in Client-side rendering in AMP.

Instead it waits until a user triggers an action that interacts with amp-bind. This supports Core Web Vitals by not performing calculations that would slow down page load, and disallows page layout shifts, increasing speed to first user interaction.

`amp-bind` uses its own syntax to build interactivity and bind elements. It utilized three main concepts: state, expressions and bindings.

## State

Each AMP page that uses `amp-bind` has its own scoped, mutable JSON data with a size limit of 100kb. This data is the state.

Example

[Playground](https://playground.amp.dev/amp/undefined#share=PCFkb2N0eXBlIGh0bWw+CjxodG1sIOKaoT4KPGhlYWQ+CiAgPG1ldGEgY2hhcnNldD0idXRmLTgiPgogIDx0aXRsZT5NeSBBTVAgUGFnZTwvdGl0bGU+CiAgPGxpbmsgcmVsPSJjYW5vbmljYWwiIGhyZWY9InNlbGYuaHRtbCIgLz4KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLG1pbmltdW0tc2NhbGU9MSxpbml0aWFsLXNjYWxlPTEiPgogIDxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tb3otYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1zLWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoO2FuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RofUAtd2Via2l0LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1vei1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tcy1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1vLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1Aa2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fTwvc3R5bGU+PG5vc2NyaXB0PjxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjpub25lOy1tb3otYW5pbWF0aW9uOm5vbmU7LW1zLWFuaW1hdGlvbjpub25lO2FuaW1hdGlvbjpub25lfTwvc3R5bGU+PC9ub3NjcmlwdD4KICA8c2NyaXB0IGFzeW5jIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanMiPjwvc2NyaXB0PgogIDxzY3JpcHQgYXN5bmMgY3VzdG9tLXRlbXBsYXRlPSJhbXAtbXVzdGFjaGUiIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAvYW1wLW11c3RhY2hlLTAuMi5qcyI+PC9zY3JpcHQ+CiAgPHNjcmlwdCBhc3luYyBjdXN0b20tZWxlbWVudD0iYW1wLWxpc3QiIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAvYW1wLWxpc3QtMC4xLmpzIj48L3NjcmlwdD4KICA8c2NyaXB0IGFzeW5jIGN1c3RvbS1lbGVtZW50PSJhbXAtYmluZCIgc3JjPSJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC9hbXAtYmluZC0wLjEuanMiPjwvc2NyaXB0PgogIDxzdHlsZSBhbXAtY3VzdG9tPgogICAgaDEgewogICAgICBtYXJnaW46IDFyZW07CiAgICB9CiAgPC9zdHlsZT4KPC9oZWFkPgo8Ym9keT4KICA8YW1wLXN0YXRlIGlkPSJ0b2RvcyI+CiAgICA8c2NyaXB0IHR5cGU9ImFwcGxpY2F0aW9uL2pzb24iPgogICAgICBbCiAgICAgICAgIkxlYXJuIEFNUCIKICAgICAgXQogICAgPC9zY3JpcHQ+CiAgPC9hbXAtc3RhdGU+CiAgCiAgPGlucHV0IGlkPSJ0b2RvSW5wdXQiIHR5cGU9InRleHQiIG9uPSJpbnB1dC10aHJvdHRsZWQ6QU1QLnNldFN0YXRlKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VG9kbzogZXZlbnQudmFsdWUKICAgICAgICAgICAgICAgICAgICAgICAgIH0pIj4KICA8YnV0dG9uIG9uPSJ0YXA6QU1QLnNldFN0YXRlKHsKICAgICAgICAgICAgICAgIHRvZG9zOiB0b2Rvcy5jb25jYXQobmV3VG9kbykKICAgICAgICAgICAgICB9KSI+CiAgICBBZGQgVG9kbwogIDwvYnV0dG9uPgogIDxhbXAtbGlzdCBbc3JjXT0idG9kb3MiIHNyYz0iYW1wLXN0YXRlOnRvZG9zIiBoZWlnaHQ9IjIwIiBpdGVtcz0iLiIgW2lzLWxheW91dC1jb250YWluZXJdPXRydWU+CiAgICA8dGVtcGxhdGUgdHlwZT0iYW1wLW11c3RhY2hlIj4KICAgICAgPGxpPnt7Ln19PC9saT4KICAgIDwvdGVtcGxhdGU+CiAgPC9hbXAtbGlzdD4KPC9ib2R5Pgo8L2h0bWw+)

`amp-bind` supports predefined states, state initialization after user interaction, and updates to states. You may reference, add, or change any variables defined as key value pairs by using expressions, bindings, actions and events.

There are multiple ways to declare and use state. Read more on state in the [amp-bind documentation](../../../components/reference/amp-bind.md#state).

## Expressions

The `amp-bind` component uses JavaScript-like expressions to perform operations on data from user input and state variables.

```
<p [text]="myExpressionsState.foo"></p>
<!-- 1 + '1'; // 11 -->
<button on="tap:AMP.setState({myExpressionsState: {foo: 1 + '1'}})">
  foo: 1 + "1"
</button>
<!-- 1 + +'1'; // 2 -->
<button on="tap:AMP.setState({myExpressionsState: {foo: 1 + + '1'}})">
  foo: 1 + + "1"
</button>
<!-- !0; // true -->
<button on="tap:AMP.setState({myExpressionsState: {foo: !0}})">foo: !0</button>
<!-- null || 'default'; // 'default' -->
<button on="tap:AMP.setState({myExpressionsState: {foo: null || 'default'}})">
  null || "default"
</button>
<!-- [1, 2, 3].map(x => x + 1); // 2,3,4 -->
<button
  on="tap:AMP.setState({myExpressionsState: {foo: [1, 2, 3].map(x => x + 1)}})"
>
  [1, 2, 3].map(x => x + 1)
</button>
```

These expressions have an [allow-list of supported functions](../../../components/reference/amp-bind.md#allowed-listed-functions) with slight [differences and limitations](../../../components/reference/amp-bind.md#differences-from-javascript) from classic JavaScript. Read more on [expressions here](../../../components/reference/amp-bind.md#expressions).

[tip type="note"]
Expressions can become hard to maintain quickly. Make sure to keep it simple and use amp-bind-macro and amp-action-macro to encapsulate common logic.
[/tip]

### Define expression macros

You may reuse an amp-bind expression fragment by defining an [amp-bind-macro](../../../components/reference/amp-bind.md#defining-macros-with-amp-bind-macro). The `amp-bind-macro` element allows an expression that takes zero or more arguments and references the current state. Invoke amp-bind-macros like a function, referencing the `id` attribute value from anywhere in the document.

```
<amp-bind-macro
  id="circleArea"
  arguments="radius"
  expression="3.14 * radius * radius"
></amp-bind-macro>
<p>
  Input a radius value
</p>
<input
  type="number"
  min="0"
  max="100"
  value="0"
  on="input-throttled:AMP.setState({myCircle:{radius: event.value}})"
/>
<p>
  The circle has an area of
  <span [text]="circleArea(myCircle.radius)">0</span>.
</p>
```

A macro can also call other macros defined before itself. A macro cannot call itself recursively.

## Bindings

Bindings are special attributes that bring it all together by linking an element’s proper to an expression. A binding is a special attribute in the form `[property]` . This  links an element’s property to a state. Use bindings to update text, change an image’s size, or allow users to specify appearances.

Example

Read more about [bindings here](../../../components/reference/amp-bind.md#bindings) and see a full list of bindable attributes for [AMP components](../../../components/reference/amp-bind.md#amp-component-specific-attributes) and [HTML elements](../../../components/reference/amp-bind.md#html-attributes).

# Complex interactivity with amp-script

Some experiences require highly complex solutions with custom logic. In these cases, use the `amp-script` component to embed features into your AMP pag. You can write vanilla JavaScript, or import a library such as Preact, all without sacrificing performance. Use it to manipulate the DOM or import personalized widgets.

`amp-script` has a [limit of 150 kilobytes](../../../components/reference/amp-script.md#size-of-javascript-code) of custom JavaScript on each page, shared between each instance of `<amp-script>`. It has an [allow-list of APIs](../../../components/reference/amp-script.md#allowed-apis) and some [security features](../../../components/reference/amp-script.md#security-features) to be aware of.

## Building Custom widgets

We believe the web should be delightful, immersive and unique. Unique websites will require functionality and style that’s personal to their brand. With amp-script, you can import custom widgets anywhere in your page. Use these widgets to create beautiful interfaces that run on complex logic written in vanilla JavaScript, Preact, or whatever you need.

Example w/Preact

## Managing complex interactivity with state

You may need to perform complex calculations or retrieve and process information from foundational logic that change the DOM. You can manage this logic by wrapping the entire page in an amp-script element, but in doing so you lose some of the AMP benefits. To keep these benefits, you may off-load complex calculations to amp-script, then combine it with amp-bind to update and reflect the new state.

### Implement all interactivity in amp-script

In some cases, wrapping an entire page in `<amp-script>` is the best way to create highly interactive experiences with AMP.

EXAMPLE

While this solution gives you absolute control over the page, it does remove some of the benefits AMP provides. Such as creating new AMP components. The amp-script component can add any HTML element to the page DOM, but is limited to [`amp-layout`](../../../components/reference/amp-layout.md) and [`amp-img`](../../../components/reference/amp-img.md) components.

### Combine amp-script and amp-bind

The amp-script components lets you implement complex domain logic that would cause amp-bind expressions to become too complicated. Instead of wrapping the entire page in `<amp-script>` tags, offload the logic to amp-script and use `amp-bind` to update the page state with the results. There is one caveat, user’s must interact with an element that triggers the calculation. However, once the information is processed, `amp-script` can update the page’s state on it’s own by calling [`AMP.setState`](../../../components/reference/amp-bind.md#updating-state-variables-with-amp.setstate()). The powers of `amp-bind` will handle the rest to update the DOM.

Example
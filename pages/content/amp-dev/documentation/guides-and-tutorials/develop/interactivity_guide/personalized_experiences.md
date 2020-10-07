---
formats:
  - websites
$title: Building personalized interactive experiences
$order: 3
description: This guide outlines highly personalized interactivity options to integrate into AMP pages.
author: CrystalOnScript
contributors:
  - sbenz
---

This guide outlines highly personalized interactivity options to integrate into AMP pages.  Like snowflakes and variable names, each website is unique and AMP's ready-made component library may not meet all your needs. Instead, AMP provides adaptable components that enable personalized solutions to complex interactivity needs. Use these components to build selection interfaces, display widgets, and process custom logic.

# Selection state management with amp-selector

Many common web experiences include presenting users with options and responding to their selections. With the [`amp-selector`](../../../components/reference/amp-selector.md) component, you can build menus of options, specify form input behaviors, and implement tabs.

amp-selector offers two core features:

1. Update UI based on a user selection.
2. Manage single or multiple selection states.

Define how elements behave when users make selections by allowing single or multi selection options. You can disable or highlight selector options based on user interactions and it exposes selection events enabling interaction with other AMP components.

[example preview="top-frame" playground="true" imports="amp-selector, amp-carousel"]
```html
<amp-selector layout="container"
  class="sample-selector"
  multiple>
  <amp-img src="/static/samples/img/landscape_sea_300x199.jpg"
    width="90"
    height="60"
    option="1"
    alt="Photo of a sea landscape"></amp-img>
  <amp-img src="/static/samples/img/landscape_desert_300x200.jpg"
    width="90"
    height="60"
    option="2"
    selected
    alt="Photo of a desert landscape"></amp-img>
  <amp-img src="/static/samples/img/landscape_ship_300x200.jpg"
    width="90"
    height="60"
    option="3"
    alt="Photo of a water landscape with ship"></amp-img>
  <amp-img src="/static/samples/img/landscape_village_300x200.jpg"
    width="90"
    height="60"
    option="4"
    disabled
    alt="Photo of a village landscape"></amp-img>
</amp-selector>
```
[/example]

Here is an example in which we combine `amp-selector` with an SVG to create an interactive chart.

[example preview="top-frame" playground="true" imports="amp-selector"]
```html
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
[/example]

# Simple interactivity and data binding with amp-bind

Users expect the modern web to react to their interactions and reflect changes they've made. The `amp-bind` component enables state setting, reading, UI changes, and can process user inputs and simple logic.

[example preview="top-frame" playground="true" imports="amp-bind"]
```html
<amp-state id="foo">
  <script type="application/json">
    {
        "bar": "State is set."
    }
  </script>
</amp-state>
<p [text]="foo.bar">No state is set</p>
<button on="tap:AMP.setState({})">Set State</button>

```
[/example]

The `amp-bind` component performs no evaluations on page load, with the exception of combining with amp-list.

[tip type="read-on"]
Read more on evaluating state on page load with amp-list in [Client-side rendering in AMP](client_rendering.md).
[/tip]

Instead it waits until a user triggers an action that interacts with amp-bind. This supports Core Web Vitals by not performing calculations that would slow down page load, and disallows page layout shifts, increasing speed to first user interaction.

`amp-bind` uses its own syntax to build interactivity and bind elements. It utilized three main concepts: state, expressions and bindings.

## Bindings

Bindings are special attributes that bring it all together by linking an element’s property to an expression. A binding is a special attribute in the form `[property]` . This links an element’s property to a state. Use bindings to update text, change an image’s size, or allow users to specify appearances.

Read more about [bindings here](../../../components/reference/amp-bind.md#bindings) and see a full list of bindable attributes for [AMP components](../../../components/reference/amp-bind.md#amp-component-specific-attributes) and [HTML elements](../../../components/reference/amp-bind.md#html-attributes).

## State

Each AMP page that uses `amp-bind` has its own scoped, mutable JSON data with a size limit of 100kb. This data is the state.

[example preview="top-frame" playground="true" imports="amp-bind, amp-list" template="amp-mustache"]
```html
<amp-state id="todos">
    <script type="application/json">
      [
        "Learn AMP"
      ]
    </script>
  </amp-state>
  
  <input id="todoInput" type="text" on="input-throttled:AMP.setState({
                           newTodo: event.value
                         })">
  <button on="tap:AMP.setState({
                todos: todos.concat(newTodo)
              })">
    Add Todo
  </button>
 <amp-list [src]="todos" src="amp-state:todos" height="20" items="." [is-layout-container]=true>
      {% raw %}<template type="amp-mustache">
      <li>{{.}}</li>
    </template>{% endraw %}
  </amp-list>
```
[/example]

`amp-bind` supports predefined states, state initialization after user interaction, and updates to states. You may reference, add, or change any variables defined as key value pairs by using expressions, bindings, actions and events.

There are multiple ways to declare and use state. Read more on state in the [amp-bind documentation](../../../components/reference/amp-bind.md#state).

## Expressions

The `amp-bind` component uses JavaScript-like expressions to perform operations on data from user input and state variables.

[example preview="top-frame" playground="true" imports="amp-bind"]
```html
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
[/example]

These expressions have an [allowlist of supported functions](../../../components/reference/amp-bind.md#allowed-listed-functions) with slight [differences and limitations](../../../components/reference/amp-bind.md#differences-from-javascript) from classic JavaScript. Read more on [expressions here](../../../components/reference/amp-bind.md#expressions).

[tip type="note"]
Expressions can become hard to maintain quickly. Make sure to keep it simple and use amp-bind-macro and amp-action-macro to encapsulate common logic.
[/tip]

### Define expression macros

You may reuse an amp-bind expression fragment by defining an [amp-bind-macro](../../../components/reference/amp-bind.md#defining-macros-with-amp-bind-macro). The `amp-bind-macro` element allows an expression that takes zero or more arguments and references the current state. Invoke `amp-bind-macro` like a function, referencing the `id` attribute value from anywhere in the document.

[example preview="top-frame" playground="true" imports="amp-bind"]
```html
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
[/example]

A macro can also call other macros defined before itself. A macro cannot call itself recursively.

# Complex interactivity with amp-script

Some experiences require highly complex solutions with custom logic. In these cases, use the `amp-script` component to embed features into your AMP pag. You can write vanilla JavaScript, or import a library such as Preact, all without sacrificing performance. Use it to manipulate the DOM or import personalized widgets.

`amp-script` has a [limit of 150 kilobytes](../../../components/reference/amp-script.md#size-of-javascript-code) of custom JavaScript on each page, shared between each instance of `<amp-script>`. It has an [allowlist of APIs](../../../components/reference/amp-script.md#allowed-apis) and some [security features](../../../components/reference/amp-script.md#security-features) to be aware of.

## Building custom widgets

We believe the web should be delightful, immersive and unique. Unique websites will require functionality and style that’s personal to their brand. With amp-script, you can import custom widgets anywhere in your page. Use these widgets to create beautiful interfaces that run on complex logic written in vanilla JavaScript, Preact, or whatever you need. View the [Worker DOM Preact demo here](https://github.com/ampproject/worker-dom/tree/main/demo/preact-todomvc).

## Managing complex interactivity with state

You may need to perform complex calculations or retrieve and process information from foundational logic that change the DOM. You can manage this logic by wrapping the entire page in an amp-script element, but in doing so you lose some of the AMP benefits. To keep these benefits, you may off-load complex calculations to amp-script, then combine it with amp-bind to update and reflect the new state.

### Implement all interactivity in amp-script

In some cases, wrapping an entire page in `<amp-script>` is the best way to create highly interactive experiences with AMP.

While this solution gives you absolute control over the page, it does remove some of the benefits AMP provides. Such as creating new AMP components. The amp-script component can add any HTML element to the page DOM, but is limited to [`amp-layout`](../../../components/reference/amp-layout.md) and [`amp-img`](../../../components/reference/amp-img.md) components.

### Combine amp-script and amp-bind

The amp-script components lets you implement complex domain logic that would cause amp-bind expressions to become too complicated. Instead of wrapping the entire page in `<amp-script>` tags, offload the logic to amp-script and use `amp-bind` to update the page state with the results. There is one caveat, user’s must interact with an element that triggers the calculation. However, once the information is processed, `amp-script` can update the page’s state on it’s own by calling [`AMP.setState`](../../../components/reference/amp-bind.md#updating-state-variables-with-amp.setstate()). The powers of `amp-bind` will handle the rest to update the DOM.

[example preview="top-frame" playground="true" imports="amp-bind, amp-script"]
```html
<head>
  <meta
    name="amp-script-src"
    content="sha384-qdYQLoj2SRKXBu33BwIoyRKorw0b0nQ8UPIoIMc9wL8KVLcKODSAK52yNGQNS_vN"
  />
  <style amp-custom>
    .clickedButton {
      border: 5px solid green;
    }
  </style>
</head>
<body>
  <amp-script width="200" height="100" script="hello-world" [class]="scriptStyle">
    <button>Hello amp-script!</button>
  </amp-script>
  <script id="hello-world" type="text/plain" target="amp-script">
    const btn = document.querySelector('button');
    btn.addEventListener('click', () => {
      document.body.textContent = 'Hello World!';
      AMP.setState({ scriptStyle: "clickedButton" })
    });
  </script>
</body>
```
[/example]

---
formats:
  - websites
$title: Interactivity foundations
$order: 1
description: This guide outlines interactivity foundations in AMP.
author: CrystalOnScript
contributors:
  - sbenz
---

This guide outlines interactivity foundations in AMP. Some primitives will look familiar to other frameworks, like hiding and showing elements, but AMP also exposes specific actions and events. Read on to learn how to install listeners, respond to user interaction, and bring the basics of interactivity into your pages.

# Event listeners and event handling

AMP installs event listeners on elements via the [`on` attribute](../../learn/amp-actions-and-events.md) with the event and responding action as values. Events allow you to listen and react to component specific user interactions. In the example below, the `<h1>` element hides when the user clicks the button. The `tap` event triggers the `hide` action.

[example preview="inline" playground="true"]
```html
 <h1 id="helloWorld">Hello AMP World!</h1>
<button on="tap:helloWorld.hide">
  Goodbye World
</button>
```
[/example]

Event listeners and actions follow a specific syntax in AMP:

```html
on="eventName:targetId.actionName(optionalParam='foo')"
```

*   Registration of the listening event. Always `on` in AMP.
*   The event name, followed by a colon. The example above uses [`tap`](../../learn/amp-actions-and-events.md#---all-elements).
*   The id of the target element, or a [special target](../../learn/amp-actions-and-events.md#special-targets), to perform the action on, followed by a period. The example above specifies `helloWorld`, the id of the `<h1>` element.
*   The desired action name. The example above uses [`hide`](../../learn/amp-actions-and-events.md#-all-elements).
*   You may define multiple events on a single element. The AMP event section below outlines this syntax.
*   You may define multiple actions in response to a single action. The AMP actions section below outlines this syntax.

## AMP events

Register event listeners by placing the `on` attribute onto the desired element or AMP component.

You may register none, one, or many events on a single element. Register multiple events by placing a semicolon between declarations within the `on` attribute’s value. The example below listens for the `tap` event and the input-specific `change` event to show and hide the [hidden](#hide-elements-on-page-load) `<p>` element.

[example preview="inline" playground="true"]
```html
<input on="tap:hiddenInstructions.show;change:hiddenInstructions.hide" tabindex=0 role="textbox" type="text">
<input type="submit" value="Submit">
<p hidden id="hiddenInstructions">
  Type your name!
</p>
```
[/example]

The `tap` event is the AMP specific implementation of `click`. The globally-defined `tap` event is available to all elements. There are [HTML element specific](../../learn/amp-actions-and-events.md#---all-elements) and AMP component specific events you can listen for. Find events specific to an AMP component on their [reference pages](../../../components/index.html).

## AMP actions

AMP responds to events by performing the action defined. There must be a specified element id or [special target](../../learn/amp-actions-and-events.md#special-targets). You may register one or many actions for each event. Register multiple actions to a single event by placing a comma between each `targetId.action` pairing.

The example below hides `helloHeading` and shows `goodbyeHeading` on the single `tap` event trigger.

[example preview="inline" playground="true"]
```html
  <h1 id="helloHeading">Hello AMP World!</h1>
  <h1 id="goodbyeHeading" hidden>Goodbye AMP World!</h1>
  <button on="tap:helloHeading.hide,goodbyeHeading.show">
    Goodbye World
  </button>
```
[/example]

AMP has [six globally-defined actions](../../learn/amp-actions-and-events.md#-all-elements): 

*   `hide`
*   `show`
*   `toggleVisibility`
*   `toggleClass()`
*   `scrollTo()`
*   `focus`

There are HTML element specific and AMP component specific actions you can execute.

# Hide, show and toggle element visibility

AMP provides three globally-available actions that change element visibility. They are:

*   `hide`
*   `show`
*   `toggleVisibility`

[example preview="inline" playground="true"]
```html
<button on="tap:sweetImage.toggleVisibility,savoryImage.toggleVisibility">
    Toggle Sweet and Savory
  </button>
  <amp-img
           hidden
           id="savoryImage"  
           layout="responsive"
           width="300"
           height="200"
           src="https://amp.dev/static/samples/img/image3.jpg"
           alt="Photo of savory sushi"></amp-img>
  <amp-img 
           id="sweetImage" 
           layout="responsive"
           width="300"
           height="200"
           src="https://amp.dev/static/samples/img/image2.jpg"
           alt="Photo of a sweet cupcakes"></amp-img>
```
[/example]

To reveal an element via the `show` action, it must be previously hidden with the [`hidden`](https://www.w3schools.com/tags/att_hidden.asp) attribute, or from a `hide` or `toggleVisibility` action. The `show` action does not support elements hidden by CSS `display:none` or AMP’s `layout=nodisplay`.

## Hide elements on page load <a name="hide-elements-on-page-load"></a>

Specify elements that should not be visible to users on page load by applying the [`hidden`](https://www.w3schools.com/tags/att_hidden.asp) attribute.

[example preview="inline" playground="true"]
```html
  <p>
    Visible
  </p>  
  <p hidden>
    Hidden
  </p>
  <p>
    Visible
  </p>
```
[/example]

# Add, remove and toggle CSS classes

A common basic interactivity need is applying and removing CSS classes. The globally-defined `toggleClass()` AMP actions fills this need. You can add, remove and toggle CSS classes in response to events.

The `toggleClass()` action requires one argument, `class="className"`. This works when applying and removing a single class.

[example preview="top-frame" playground="true"]
```html
<head>
  <style amp-custom>
    h1 {
      margin: 1rem;
    }
    .border {
      border-style: dotted;
    }
  </style>
</head>
<body>
  <h1 id="borderHeading">Toggle my border!</h1>
  <button on="tap:borderHeading.toggleClass(class='border')">
    Toggle Border
  </button>
</body>  
```
[/example]

The `toggleClass()` action allows for an optional additional argument `force`. The `force` attribute takes a boolean value. When set to `true` it allows the defined class to be added during that toggle, but not removed. When set to `false` it allows the defined class to be removed during that toggle, but not added. This argument is useful for toggling conflicting CSS attributes, such as the background color in the example below:

[example preview="top-frame" playground="true"]
```html
<head>
 <style amp-custom>
    h1 {
      margin: 1rem;
    }
    .green {
      background-color: green;
    }
    .red {
      background-color: red;
    }
    .border {
      border-style: dotted;
    }
  </style>
</head>
<body>
 <h1 id="togleHeading">Hello AMP World!</h1>
<button on="tap:togleHeading.toggleClass(class='red'),togleHeading.toggleClass(class='green', force=false)">
  Toggle Red
</button>
<button on="tap:togleHeading.toggleClass(class='green'),togleHeading.toggleClass(class='red', force=false)">
  Toggle Green
</button>
<button on="tap:togleHeading.toggleClass(class='border')">
  Toggle Border
</button>
</body>  
```
[/example]

Read more in [Triggering CSS animations & transitions](../animations/triggering_css_animations.md).

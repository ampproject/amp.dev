---
$title: Triggering CSS animations & transitions
$order: 1
description: 'Triggering CSS animations on pages relies on adding and removing classes, done via JavaScript. You can achieve the same behavior on AMP pages by using the toggleClass action ...'
formats:
  - websites
  - ads
---

CSS animations enable web elements to transition from one CSS style configuration to another. The browser can start defined animations on load, but event triggered CSS animations [rely on adding and removing classes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP supports both animation types.

Use CSS when you have a smaller, contained animation that doesn't need to be precisely timed.

## Defining CSS and keyframes

You can define CSS in AMP in the following ways:

[filter formats="websites, stories"]

*   Within the `<style amp-custom>` tag inside the head of the document. 75,000 byte limit.
*   Inline styles. Each instance of an inline style has a 1,000 byte limit. Inline styles count towards the 75,000 byte `<style amp-custom>` limit.
*   Within the `<style amp-keyframes>` tag inside the head of the document. 500,000 byte limit. Restricted to keyframe properties.

[/filter]

[filter formats="ads"]

*   Within the `<style amp-custom>` tag inside the head of the document. 20,000 byte limit.
*   Inline styles. Each instance of an inline style has a 1,000 byte limit. Inline styles count towards the 20,000 byte `<style amp-custom>` limit.
*   Within the `<style amp-keyframes>` tag inside the head of the document. 500,000 byte limit. Restricted to keyframe properties.

[/filter]

[tip type="read-on"]
  Read more in [Style & layout](../style_and_layout/index.md) about using CSS in AMP.
[/tip]

[filter formats="websites, stories"]
To keep your pages lean and speedy, AMP has enforced a 75,000 byte CSS limit in the `<amp style-custom>` tag. While you can use this to define animation styles, the 500,000 bye limit inside of `<amp style-keyframes>` tag allows for more verbose animations that won't take away precious site style resources.
[/filter]

[filter formats="ads"]
To keep your ads lean and speedy, AMP has enforced a 20,000 byte CSS limit in the `<amp style-custom>` tag. While you can use this to define animation styles,the 500,000 bye limit inside of `<amp style-keyframes>` tag allows for more verbose animations that won't take away precious site style resources.
[/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## Adding, removing, and toggling classes

The AMP action, `toggleClass` enables the addition and removal of classes to defined elements.

```js
elementName.toggleClass(class="className")
```

You can toggle a class on the same element you'd like users to interact with, such as an animated hamburger menu.

```html
 <div id="hamburger" tabindex=1 role=button on="tap:hamburger.toggleClass(class='close')">

```
The `toggleClass` action can apply to other elements as well and toggle between two classes by adding the `force` attribute.

```html
<button on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)">
  Disappear
</button>
<button on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)">
  Reappear
</button>
```

If you need to remove a class and disallow reapplication, add the `force` attribute with a value of `false`. If you need to addd a class and disallow removal, add `force` with a value of `true`.

## Animate with CSS and state

You can add and remove any number of CSS classes with states using [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-bind" src="https://ampjs.org/v0/amp-bind-0.1.js"></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
    button {
      margin-top:  1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"> </div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">
    Move Right
  </button>
</body>
```
[/example]

Define multiple class animations by first adding a list of CSS classes within the `<style amp-custom>` tag in the `head` of the document:

```css
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
```

Then pair each class with a state:

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```
And link the element with the classes:

```html
  <div [class]="magicBox[animateBox].className"> </div>
```

The states change from a linked AMP action or event. The following example changes the state from user interaction:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">
  Move Right
</button>
```

Using [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) in this way set the class explicitly to the defined class. You will not have to tell it to remove other classes.

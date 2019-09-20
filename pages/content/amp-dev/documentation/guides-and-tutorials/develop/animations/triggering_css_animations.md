---
$title: Triggering CSS animations & transitions
$order: 1
description: 'Triggering CSS animations on pages relies on adding and removing classes, done via JavaScript. You can achieve the same behavior on AMP pages by using the toggleClass action ...'
formats:
  - websites
  - ads
---

Triggering CSS animations [relies on adding and removing classes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations), done via JavaScript. You can achieve the same behavior on AMP pages by using the [`toggleClass`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#*-(all-elements)) action. With `toggleClass`, AMP pages can add, remove, and toggle CSS classes like non-AMP pages.

## Defining CSS and Keyframes

You can define CSS in AMP in the follow ways:

*   Within the `<style amp-custom>` tag inside the head of the document. 50,000 byte limit.
*   Inline styles. Detract from the 50,000 byte `<style amp-custom>` limit.
*   Within the `<style amp-keyframes>` tag inside the head of the document. 500,000 byte limit. Restricted to keyframe properties.

To keep you pages lean and speedy, AMP has enforced a 50,000 byte CSS limit in the `<amp style-custom>` tag. While you can use this to define animation styles,the 500,000 bye limit inside of `<amp style-keyframes>` tag allows for more verbose animations that won't take away precious site style resources.

```
...
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
...
```

## Adding, Removing, and Toggling Classes


[example preview="top-frame" playground="true" imports="amp-bind"]
```html
<head>
  <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
    <style amp-custom>
        #hamburger {
            width: 60px;
            height: 45px;
            position: relative;
            margin: 50px auto;
            transform: rotate(0deg);
            transition: .5s ease-in-out;
            cursor: pointer;
            outline: none;
        }
 
        #hamburger span {
            display: block;
            position: absolute;
            height: 9px;
            width: 100%;
            background: #0479C4;
            border-radius: 9px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: .5s ease-in-out;
        }
        #hamburger span:nth-child(1) {
            top: 0px;
            transform-origin: left center;
        }
 
        #hamburger span:nth-child(2) {
            top: 21px;
            transform-origin: left center;
        }
 
        #hamburger span:nth-child(3) {
            top: 42px;
            transform-origin: left center;
        }
 
        #hamburger.close span:nth-child(1) {
            transform: rotate(45deg);
        }
 
        #hamburger.close span:nth-child(2) {
            width: 0%;
            opacity: 0;
            transition: .1s;
        }
 
        #hamburger.close span:nth-child(3) {
            transform: rotate(-45deg);
        }
    </style>
</head>
<body>
  <div id="hamburger" tabindex=1 role=button on="tap:AMP.setState({open: !open})" 
  [class]="open ? 'close' : ' '" class=" ">
      <span></span>
      <span></span>
      <span></span>
  </div>
</body>
```
[/example]

The AMP action, `toggleClass` enables the addition and removal of classes to defined elements.

```
elementName.toggleClass(class="className")
```

You can toggle a class on the same element you'd like users to interact with, such as an animated hamburger menu.

```
 <div id="hamburger" tabindex=1 role=button on="tap:hamburger.toggleClass(class='close')">

```
The `toggleClass` action can apply to other elements as well and toggle between two classes by adding the `force` attribute.

```
<button on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)">
    Disappear
</button>
<button on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)">
    Reappear
</button>
```

If you need to remove a class and disallow reapplication, add the `force` attribute with a value of `false`. If you need to addd a class and disallow removal, add `force` with a value of `true`.

## Animate with numerous classes

You can add and remove any number of CSS classes with [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

[example preview="top-frame" playground="true" imports="amp-bind"]
```html
<head>
  <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(50px)
    }
    .right {
      transform: translatex(-50px)
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
  <div class=" " [class]="magicBox[animateBox].className"> </div>
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

```
...
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(50px)
    }
    .right {
      transform: translatex(-50px)
    }
    button {
      margin-top:  1rem;
      margin-left: 1rem;
    }
  </style>
...
```

Then pair each class with a state:

```
...
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
...
```
And link the element with the classes:

```
...
  <div class=" " [class]="magicBox[animateBox].className"> </div>
...
```

The states change from a linked AMP action or event. The following example changes the state from user interaction:

```
...
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
...
```

Using [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) in this way set the class explicitly to the defined class. You will not have to tell it to remove other classes.

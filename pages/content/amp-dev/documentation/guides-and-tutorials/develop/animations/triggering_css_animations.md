---
$title: Triggering CSS animations & transitions
$order: 1
description: 'Triggering CSS animations on pages relies on adding and removing classes, done via JavaScript. You can achieve the same behavior on AMP pages by using the toggleClass action ...'
formats:
  - websites
  - ads
---

Triggering CSS animations [relies on adding and removing classes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations), done via JavaScript. You can achieve the same behavior on AMP pages by using the [`toggleClass`](docs/interaction_dynamic/amp-actions-and-events#*-(all-elements)) action. With `toggleClass`, AMP pages can add, remove, and toggle CSS classes like non-AMP pages.

## Defining CSS and Keyframes

You can define CSS in AMP in the follow ways:

*   Within the `<style amp-custom>` tag inside the head of the document. 50,000 byte limit.
*   Within the `<style amp-keyframes>` tag inside the head of the document. 500,000 byte limit. Restricted to keyframe properties.
*   Inline styles. 25,000 byte limit.

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

## Animate with Numerous Classes

The [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) extension works by defining different states as a JSON object inside [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state).

You can define a list of CSS classes within the `<style amp-custom>` tag in the `head` of the document:

```
...
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
      transform: translatex(50px)
    }
    .right {
      transform: translatex(-50px)
    }

    button {
      margin-top: 120px;
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

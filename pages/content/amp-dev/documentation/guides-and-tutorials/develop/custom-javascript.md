---
$title: Use custom JavaScript in AMP pages
$order: 7
formats:
  - websites
author:
  - morss
contributors:
  - CrystalOnScript
  - fstanis
description: A guide to using amp-script, an AMP component that allows you to write custom JavaScript
---

## What is amp-script?

`amp-script` is a bit of an outlier among AMP components. Most AMP components provide the logic and functionality that custom JavaScript usually does, so you don't need to write your own JavaScript. In contrast, `amp-script`'s purpose is to let you run your own JavaScript, but in a way that maintains AMP's performance guarantees. This guide provides background on this component and best practices for its use.


## Why was amp-script created?

When AMP was created, its validation rules precluded AMP developers from writing any of their own JavaScript. AMP was created to make it easier to build faster, more reliable websites - and excessive JavaScript can defeat this goal. Not only does JavaScript take time to load, parse, and execute, but JavaScript in any given browser tab runs in a single thread. So if a JavaScript task is running, and the user takes an action that fires an event handler, that handler can't execute until that task is finished. This makes the page slow to respond. Worse still, the browser itself may be unable to change the UI until the task is done. This can slow down animations and scrolling or pause them altogether.

[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), which have existed [since Firefox 3.5](https://caniuse.com/?search=worker), offer an alternative. Web workers run in a separate thread. This is possible because they lack access to the DOM or the `window` object, and each worker runs in its own global scope. Thus they can't interfere with each other's work or with mutations caused by code in the main thread. They can only communicate with the main thread and with one another via [messages containing objects](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/postMessage). Workers offer a path to a multithreaded Web, a way to encapsulate JavaScript in a sandbox where it can't block the UI.


## How does amp-script work?

Web workers seem like a perfect way to run custom JavaScript in AMP. Unfortunately, workers don't have access to the DOM. To fill this gap, the AMP team created an open-source library called [WorkerDOM](https://github.com/ampproject/worker-dom/). WorkerDOM copies the DOM to a virtual DOM and makes the copy available to a worker. WorkerDOM also recreates a subset of the standard DOM API. When the worker makes changes to the virtual DOM, WorkerDOM recreates those changes in the real DOM. This lets the worker manipulate the DOM and make changes on the page using standard techniques.

[tip type="default"]
Note that the DOM synchronization only goes in one direction. If you modify the DOM in the main thread, `amp-script` won't know it's changed. Thus it's not advisable to use `amp-script` on an area that `amp-bind`, or other JavaScript, could modify.
[/tip]

`amp-script` is essentially a wrapper around WorkerDOM that makes WorkerDOM usable in AMP. Some of its functionality is provided by WorkerDOM, and the rest comes from [the component itself](https://github.com/ampproject/amphtml/blob/master/extensions/amp-script/0.1/amp-script.js). For simplicity, henceforth we'll simply refer to `amp-script`.


## What can amp-script do?

The JavaScript language is the same in a worker as it is elsewhere in the browser. WorkerDOM also recreates many commonly used DOM APIs and makes them available for your use. It supports common Web APIs like `Fetch` and `Canvas`, and it gives you to selected global objects like `navigator` and `localStorage`. You can assign handlers for browser events in the usual way.

However, `amp-script` does not support the entire DOM API or Web API, as this would make its own JavaScript too large and cumbersome. See [the documentation](../../../documentation/components/reference/amp-script.md#supported-apis) for details, and see [these samples](../../../documentation/examples/components/amp-script/index.html) to see `amp-script` in use.

A handful of synchronous DOM API methods are replaced with alternatives that return a Promise. For example,  `getBoundingClientRect()` is replaced by `getBoundingClientRectAsync()`.

To maintain AMP's performance guarantees, certain actions [are restricted](../../../documentation/components/reference/amp-script.md#user-gestures). Your code is discouraged from making potentially distracting mutations unless they follow a user interaction. You can't add stylesheets or additional scripts to the DOM, and [`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts) is not supported.


## Preact and other frameworks

Given this partial DOM API support, how is it best to approach `amp-script`? Here are two possibilities:

**1) Know what's supported.** Get to know [the rich set of supported APIs](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md). You need to think about JavaScript differently - more as a concise set of tools.

**2) Use Preact.** Since the team couldn't rebuild all the DOM APIs, they focused on the limited set of APIs used by [Preact](https://preactjs.com/) and [React](https://reactjs.org/). If you use one of these frameworks, you should be able to build elaborate interactions with much less worry about what's supported. That said, React bundles often exceed `amp-script`'s [150K limit](../../../documentation/components/reference/amp-script.md#size-of-javascript-code). For this reason, Preact is strongly recommended.

`amp-script` has been tested with frameworks like [Vue](https://vuejs.org/), [Angular](https://angularjs.org/), [Aurelia](https://aurelia.io/), and [lit-html](https://lit-html.polymer-project.org/), but less extensively. If you find a gap, please [file an issue](https://github.com/ampproject/worker-dom/issues) - or, better still, [submit a pull request](https://github.com/ampproject/worker-dom/pulls).

Since `amp-script` cannot exhaustively support the DOM API, simply copying a library like [jQuery](https://jquery.com/) into an `<amp-script>` component will not work.

## How should I use amp-script?

`amp-script` was created to help you fill the gaps in your AMP webpage's functionality. One can't simply copy existing JavaScript into `amp-script` and expect it to work without modification. Instead, `amp-script` takes care of logic and interactions that existing AMP components don't provide.

The following are a few excellent use cases for `amp-script`.

### Create new interactions

When possible, it's better to use an AMP component for a DOM interaction. If the interaction you wish to create would be of interest to other developers, you are encouraged to [suggest and contribute](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md) a new component. Otherwise, `amp-script` provides a fine way to create interactions not currently supported by AMP components.

### Add advanced logic

`amp-bind` allows you to introduce logic into user interactions, but your JavaScript needs to fit into a single expression. Because the code is encapsulated in an HTML attribute, it won't get the benefit of syntax highlighting in your IDE, you can't set breakpoints, and it may be hard to debug. For any logic that doesn't fit neatly into a compact expression, `amp-script` presents a promising alternative.

### Enhance AMP components <a name="enhance-amp-components"></a>

`amp-script` has access to AMP state variables and the `AMP.getState()` and `AMP.setState()` methods. This provides a path to enhance existing AMP components with your own logic. It also makes it possible to affect the DOM outside of the `<amp-script>` component itself. See [here](../../../documentation/examples/components/amp-script/index.html#interacting-with-%3Camp-state%3E) and [here](../../../documentation/examples/components/amp-script/index.html#interacting-with-amp-components) for examples.

### Replace amp-bind and amp-list

AMP has an extensive system of [actions and events](../learn/amp-actions-and-events.md) that allow you to handle browser events by taking common actions on the DOM or by mutating the state of AMP components. It also includes interactive components like [`amp-bind`](../../examples/documentation/amp-bind.html) and [`amp-list`](../../../documentation/components/reference/amp-list.md). If you're new to AMP and you're comfortable with JavaScript, it may be easier to simply use `amp-script`. For more elaborate interactions, `amp-script` will [likely be easier](#amp-script---or-amp-bind-and-amp-list).

### Handle server data

AMP allows you to retrieve server data using `amp-list` and to format it using [`amp-mustache`](../../examples/documentation/amp-mustache.html). In cases where mustache templates are insufficient, `amp-script` can fetch the data, format it, and inject the formatted data into the DOM. If you need to massage server data before sending it to `amp-mustache`, an `amp-script` function can be the data source for `amp-list`. See [the documentation](../../../documentation/components/reference/amp-list.md?format=websites#initialization-from-amp-state) for details and a code sample.

### Introduce new capabilities

You can use `amp-script` to leverage areas of the Web API and DOM API that aren't currently accessible to AMP components, or to use these APIs in ways that AMP components don't support. For example, `amp-script` supports `WebSockets` ([example](../../../documentation/examples/components/amp-script/index.html#using-a-websocket-for-live-updates)), `localStorage`, and `Canvas`. It supports browser events that AMP doesn't pass to traditional components. And since `amp-script` provides access to the `navigator` object, you can retrieve information about [the user's browser](../../../documentation/examples/components/amp-script/index.html#detecting-the-operating-system) or [preferred language](../../../documentation/examples/components/amp-script/index.html#personalization).

## amp-script - or amp-bind and amp-list? <a name="amp-script---or-amp-bind-and-amp-list"></a>

This is a matter of personal preference. For a new AMP developer, it may seem easier to stick with JavaScript than to learn to use `amp-bind` and `amp-list`. But the complete AMP developer is likely to want to use both traditional interactive AMP components and `amp-script`.

`amp-bind` is a fine choice for simple interactions. In this example, pressing a button changes a text fragment. AMP's data binding makes this straightforward and easy to read:

```html
<p [text]="name">Rajesh</p>
<button on="tap:AMP.setState({name: 'Priya'})">I am Priya</button>
```

Similarly, if you need to use an API whose output you control, you may be able to implement business logic on the server, and you may be able to format the data it outputs so that it fits smoothly into an `amp-mustache` template. For such cases, `amp-list` may be a good choice.

`amp-bind` also provides a straightforward mechanism to communicate between AMP components. In this example, tapping on an image in an `<amp-selector>` sets the state variable `selectedSlide` to `0`, which in turn makes an `<amp-carousel>` move to its first slide.

```html
<amp-carousel slide="selectedSlide">
...
</amp-carousel>

<amp-selector>
  <amp-img on="tap:AMP.setState({selectedSlide: 0})"/>
</amp-selector>
```

Traditional interactive AMP components may also be more suitable for interactions that span large sections of a webpage - as you may not wish to wrap so much of the DOM in an `<amp-script>`. Generally speaking, `amp-list` and `amp-bind` are tightly integrated with the rest of AMP, and it's straightforward to sprinkle these throughout a webpage.

On the other hand, on pages that involve more complex state variables or multiple interactions, `amp-script` likely provides a simpler path. This example is from the [AMP Camp e-commerce demo site](https://camp.samples.amp.dev/product-details?categoryId=women-shirts&productId=79121):

```html
<amp-selector
  name="color"
  layout="container"
  [selected]="product.selectedColor"
  on="select:AMP.setState({
      product: 
        {
          selectedSlide: product[event.targetOption].option - 1,
          selectedColor: event.targetOption,
          selectedSize: product[event.targetOption].sizes[product.selectedSize] != null ?
                        product.selectedSize : 
                        product[event.targetOption].defaultSize,
          selectedQuantity: 1
        }
      })"
></amp-selector>
```

This site was created before `amp-script` was released. But this sort of logic might easily be easier to write and debug in JavaScript. In general, for pages with more business logic, `amp-script` may well be less confusing and will allow you to follow better programming practices.

`amp-script` is designed to control just the portion of a page it encloses. Still, [as noted above](#enhance-amp-components), it can also affect the rest of the page by mutating state variables, just like `amp-bind`.


## You can help

At the time this guide is being written, `amp-script` is still an evolving technology. Thus developers are encouraged to get involved - to think of ways to improve it, to [submit issues](https://github.com/ampproject/amphtml/issues), and of course to [suggest and contribute new features](https://github.com/ampproject/amphtml/pulls)!

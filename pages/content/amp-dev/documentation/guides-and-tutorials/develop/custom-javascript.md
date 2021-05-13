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

`amp-script` lets you write and run your own JavaScript in a way that maintains AMP's performance guarantees. Most AMP components enable common web interactions through their own logic, letting you build your page quickly without writing JavaScript or importing third-party libraries. By using `amp-script`, you can embrace custom logic for specific use cases or unique needs without losing AMP's benefits.

This guide provides background on this component and best practices for its use.


## Web workers

Excessive JavaScript can make websites slow and unresponsive. In order to control what JavaScript AMP pages load and when it executes, AMP's validation rules forbid developers from running JavaScript in a webpage via a `<script>` tag.

[Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) present a way to run JavaScript more safely. Normally all JavaScript [runs in a single thread](https://www.youtube.com/watch?v=cCOL7MC4Pl0), but each worker runs in a thread of its own. This is possible because they lack access to the DOM or the `window` object, and each worker runs in its own global scope. Thus they can't interfere with each other's work or with mutations caused by code in the main thread. They can only communicate with the main thread and with one another via [messages containing objects](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/postMessage). Workers offer a path to a multithreaded Web, a way to encapsulate JavaScript in a sandbox where it can't block the UI.

Workers don't come with access to the DOM. To fill this gap, the AMP team created an open-source library called [WorkerDOM](https://github.com/ampproject/worker-dom/). WorkerDOM copies the DOM to a virtual DOM and makes the copy available to a worker. WorkerDOM also recreates a subset of the standard DOM API. When the worker makes changes to the virtual DOM, WorkerDOM recreates those changes in the real DOM. This lets the worker manipulate the DOM and make changes on the page using standard techniques. The DOM synchronization only goes in one direction. If the main thread modifies the DOM, no mechanism exists to let the worker know.

`amp-script` is a wrapper around WorkerDOM that makes WorkerDOM usable in AMP, providing connections to AMP features, establishing the developer API, and introducing restrictions that protect the user experience. WorkerDOM provides the core of `amp-script`'s functionality.


## Overview of `amp-script`

The JavaScript language is the same in a worker as it is elsewhere in the browser. Thus, in `amp-script`, you can use all the usual constructs that JavaScript provides. WorkerDOM also recreates many commonly used DOM APIs and makes them available for your use. It supports common Web APIs like `Fetch` and `Canvas`, and it gives you to selected global objects like `navigator` and `localStorage`. You can assign handlers for browser events in the usual way.

However, `amp-script` does not support the entire DOM API or Web API, as this would make its own JavaScript too large and cumbersome. See [the documentation](../../../documentation/components/reference/amp-script.md#supported-apis) for details, and refer to [these samples](https://amp.dev/documentation/examples/components/amp-script/) to see `amp-script` in use.

`amp-script` replaces a handful of synchronous DOM API methods with alternatives that return a Promise.   For example, instead of `getBoundingClientRect()`, you use `getBoundingClientRectAsync()`. Sometimes this is necessary for DOM APIs that provide synchronous access to computed layout, and sometimes so that `amp-script` can call the native browser method and await a response.

To maintain AMP's guarantees of performance and layout stability, `amp-script` comes with some restrictions. If the size of the `amp-script` container is not fixed, your code can only make a mutation if triggered by a user interaction. You can't add stylesheets or additional scripts to the DOM, and [`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts) is not supported. See [the documentation](../../../documentation/components/reference/amp-script.md#user-gestures) for details.


## Using JavaScript frameworks

Since the DOM API is not fully supported, how is it best to approach manipulating the DOM in `amp-script`? Here are two possibilities.

**1) Know what's supported.** Get to know [the rich set of supported APIs](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md). You need to think about the DOM API differently - less as a large set of properties and methods that's developed over many years, and more as a concise set of tools.

**2) Use Preact.** Not only is [React](https://reactjs.org/) a popular way to build websites, but it mutates the DOM using a subset of the DOM API. `amp-script` can includes full support for this portion of the API, and thus full support for React. That said, React bundles often exceed `amp-script`'s [150K limit](../../../documentation/components/reference/amp-script.md#size-of-javascript-code). So it's recommended that you use [Preact](https://preactjs.com/), a lightweight alternative to React. Preact is designed for straightforward migration from React. With Preact, you should be able to build elaborate interactions with much less worry about what's supported. 

The team has tested `amp-script` with frameworks like [Vue](https://vuejs.org/), [Angular](https://angularjs.org/), [Aurelia](https://aurelia.io/), and [lit-html](https://lit-html.polymer-project.org/), but less extensively. If you find a gap, please [file an issue](https://github.com/ampproject/worker-dom/issues) - or, better still, [submit a pull request](https://github.com/ampproject/worker-dom/pulls).

Since `amp-script` cannot exhaustively support the DOM API, simply copying a library like [jQuery](https://jquery.com/) into an `<amp-script>` component will not work.

## Use cases

`amp-script` expands the range of your AMP webpage's functionality. Since it supports a subset of the DOM and Web APIs, and since its use [comes with restrictions](https://amp.dev/documentation/components/amp-script/#restrictions), it is not an all-purpose JavaScript solution. Any substantial body of existing JavaScript will likely need modification to work in the `amp-script` context.

However, `amp-script` presents a fine way to take care of logic and interactions that existing AMP components don't provide. The following are a few excellent use cases.

### Create new interactions

`amp-script` gives you the power of JavaScript and the DOM API. It lets you create interactions that other AMP components can't, opening up a door to the full creativity of the Web.

That said, before turning to `amp-script` to create a new interaction, check to see if an AMP component or a combination of components can do the same thing. Leveraging existing AMP components will ultimately make your code smaller and more maintainable. If a component can achieve an effect that's similar to what you want, you may be able to [customize its behavior with `amp-script`](#enhance-amp-components).

If you use `amp-script` to create an interaction that might be of interest to other developers, please consider [suggesting or contributing](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md) a new component.

### Add advanced logic

When your logic doesn't fit neatly into a compact expression, `amp-script` is the best choice. `amp-bind` allows you to introduce logic into user interactions, but your JavaScript needs to fit into a single expression. Because the code is encapsulated in an HTML attribute, it won't get the benefit of syntax highlighting in your IDE, you can't set breakpoints, and debugging may be a challenge. In such cases, `amp-script` allows you to follow best programming practices.

### Enhance AMP components <a name="enhance-amp-components"></a>

`amp-script` has access to AMP state variables and the `AMP.getState()` and `AMP.setState()` methods. This provides a path to enhance existing AMP components with your own logic. It also makes it possible to affect the DOM outside of the `<amp-script>` component itself. See [here](https://amp.dev/documentation/examples/components/amp-script/#interacting-with-%3Camp-state%3E) and [here](https://amp.dev/documentation/examples/components/amp-script/#interacting-with-amp-components) for examples.

### Replace amp-bind and amp-list

If you're new to AMP and you're comfortable with JavaScript, it may tempting to use `amp-script` for every browser interaction. However, for simpler interactions, you will likely want to learn to use `amp-bind` and AMP's [actions and events](../learn/amp-actions-and-events.md) system. For more elaborate interactions, or for cases that require more logic and complex state variable manipulation, `amp-script` will [likely be easier](#when-to-replace-amp-bind-and-amp-list).

### Handle server data

AMP allows you to retrieve server data using `amp-list` and to format it using [`amp-mustache`](../../examples/documentation/amp-mustache.html). In cases where mustache templates are insufficient, `amp-script` can fetch the data, format it, and inject the formatted data into the DOM. If you need to massage server data before sending it to `amp-mustache`, an `amp-script` function can be the data source for `amp-list`. See [the documentation](../../../documentation/components/reference/amp-list.md?format=websites#initialization-from-amp-state) for details and a code sample.

### Introduce new capabilities

You can use `amp-script` to leverage areas of the Web API and DOM API that aren't currently accessible to AMP components, or to use these APIs in ways that AMP components don't support. For example, `amp-script` supports `WebSockets` ([example](https://amp.dev/documentation/examples/components/amp-script/#using-a-websocket-for-live-updates)), `localStorage`, and `Canvas`. It supports a wide variety of browser events, so you can listen for events beyond [those that AMP passes to traditional components](https://amp.dev/documentation/guides-and-tutorials/learn/amp-actions-and-events/). And since `amp-script` provides access to the `navigator` object, you can retrieve information about [the user's browser](https://amp.dev/documentation/examples/components/amp-script/#detecting-the-operating-system) or [preferred language](https://amp.dev/documentation/examples/components/amp-script/#personalization).

## When to replace amp-bind and amp-list <a name="when-to-replace-amp-bind-and-amp-list"></a>

For a new AMP developer who's comfortable with JavaScript, it may seem easier to always use `amp-script` than to learn `amp-bind` and `amp-list`. However, in some cases, `amp-bind` and `amp-list` are a better fit.

`amp-bind` is generally more straightforward for basic interactions, where its tight integration into HTML tags is compelling. In this example, pressing a button changes a text fragment. AMP's data binding makes this straightforward and easy to read:

```html
<p [text]="name">Rajesh</p>
<button on="tap:AMP.setState({name: 'Priya'})">I am Priya</button>
```

Similarly, when using an API whose output you control, you may be able to implement business logic on the server. You may be able to format the data the API outputs so that it fits smoothly into an `amp-mustache` template. `amp-list` is a good fit in such cases.

`amp-bind` also provides a straightforward mechanism to communicate between AMP components. In this example, tapping on an image in an `<amp-selector>` sets the state variable `selectedSlide` to `0`, which in turn makes an `<amp-carousel>` move to its first slide.

```html
<amp-carousel slide="selectedSlide">
...
</amp-carousel>

<amp-selector>
  <amp-img on="tap:AMP.setState({selectedSlide: 0})"/>
</amp-selector>
```

Traditional interactive AMP components may also be more suitable for interactions that span large sections of a webpage - as you may not wish to wrap so much of the DOM in an `<amp-script>`. `amp-list` and `amp-bind` are tightly integrated with the rest of AMP, making it convenient to use binding anywhere on a webpage.

However, on pages that involve more complex state variables or multiple interactions, using `amp-script` will result in simpler and more maintainable code. Take this example, from the [AMP Camp e-commerce demo site](https://camp.samples.amp.dev/product-details?categoryId=women-shirts&productId=79121):

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

This demo was created before `amp-script` was released. But this sort of logic would be easier to write and debug in JavaScript. For pages with more business logic, using `amp-script` will allow you to avoid confusion and to follow better programming practices.

In many cases, you'll want to use both `amp-script` and `amp-bind` on the same page. Deploy `amp-bind` for simpler interactions, turning to `amp-script` when you need more logic or structure. Furthermore, although `amp-script` can only make mutations to its DOM chilrden, [as noted above](#enhance-amp-components), it can affect the rest of the page by mutating state variables. `amp-bind` does the rest, as in [this example](https://amp.dev/documentation/examples/components/amp-script/#interacting-with-%3Camp-state%3E).

Although WorkerDOM will change the real DOM when your code changes the virtual DOM to which it has access, no mechanism exists to synchronize in the reverse direction. Thus it's not advisable to use `amp-bind` or other means to modify the children of your `<amp-script>`. Reserve that area of the page for your `amp-script` JavaScript.


## Contribute to `amp-script`

`amp-script` is always evolving, just as AMP is. You can help improve it by getting involved. Think of new features that other developers might also need, [submit issues](https://github.com/ampproject/amphtml/issues), and of course [suggest and contribute new features](https://github.com/ampproject/amphtml/pulls)!

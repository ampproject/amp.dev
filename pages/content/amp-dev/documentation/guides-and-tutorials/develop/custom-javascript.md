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

`amp-script` is a bit of an outlier among AMP components. Most AMP components provide the logic and functionality that custom JavaScript usually does, so you don't need to write your own JavaScript. In contrast, `amp-script`'s purpose is to let you run your own JavaScript, but in a way that keeps that JavaScript from breaking AMP's performance guarantees. This guide provides background on this component and best practices for its use.


## Why was amp-script created?

When AMP was created, its validation rules precluded AMP developers from writing any of their own JavaScript. After all, AMP was created to make it easier to build faster, more reliable websites - and excessive JavaScript is a common speed culprit. Not only does JavaScript take time to load, parse, and execute, but JavaScript in any given browser tab runs in a single thread. This means that if a JavaScript task is running, and the user takes an action that fires an event handler, that handler can't execute until that task is finished. This can make the page unresponsive. Worse still, the browser itself may be unable to change the UI until the task is done.

[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), which have existed [since Firefox 3.5](https://caniuse.com/?search=worker), have long offered a way out. These workers run in a separate thread. This is possible because they don't have access to the DOM or the `window` object, and each worker runs in its own global scope. Thus they can't interfere with each other's work or with mutations caused by code in the main thread. They can only communicate with the main thread and with one another via [messages containing objects](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/postMessage). Workers offer a path to a multithreaded Web, to encapsulating JavaScript in a sandbox where it can't block the UI!


## How does amp-script work?

Thus workers seem like a perfect way to run custom JavaScript in AMP. Unfortunately, they don't have access to the DOM. To fill this gap, the AMP team created an open-source library called [WorkerDOM](https://github.com/ampproject/worker-dom/). WorkerDOM copies the DOM to a virtual DOM and makes this copy available to the worker. WorkerDOM also recreates a subset of the standard DOM API. When the worker makes changes to the virtual DOM, WorkerDOM recreates those changes in the real DOM. This lets the Worker manipulate the DOM and make changes on the page using standard techniques.

(Note that this synchronizing only goes in one direction. If you modify the DOM in the main thread, `amp-script` won't know about it. Thus it's not advisable to use `amp-script` on an area that, say, your own JavaScript could modify in an invalid AMP context.)

`amp-script` is essentially a wrapper around WorkerDOM that makes it usable in AMP. Some of its functionality is provided by WorkerDOM, and the rest comes from [the component itself](https://github.com/ampproject/amphtml/blob/master/extensions/amp-script/0.1/amp-script.js). For simplicity, henceforth we'll simply refer to `amp-script`.


## What can amp-script do?

Workers can use JavaScript just as it's used elsewhere in the browser. WorkerDOM recreates many commonly used DOM APIs and makes them available for your use. It also supports common Web APIs like `Fetch` and `Canvas`. You can assign handlers for browser events in the usual way.

However, `amp-script` does not support the entire DOM API or Web API, as this would make its own JavaScript too large and slow. See [the documentation](https://amp.dev/documentation/components/amp-script/#supported-apis) for details, and see [these samples](https://amp.dev/documentation/examples/components/amp-script/) to see `amp-script` in use.

A handful of synchronous DOM API methods are replaced with alternatives that return a Promise. For example,  `getBoundingClientRect()` is replaced by `getBoundingClientRectAsync()`.

In addition, to maintain AMP's performance guarantees, certain actions are restricted. Your code is discouraged from making DOM mutations that are overly distracting unless they follow a user interaction (see xxx). You can't add stylesheets or additional scripts to the DOM, and [`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts) is not supported.


## Preact and other frameworks

Given this partial support, how is it best to approach `amp-script`? Here are two possibilities:

**1) Know what's supported.** Get to know [the rich set of supported APIs](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md). You need to think about JavaScript differently - more as a concise set of tools.

**2) Use Preact.** Since the team couldn't rebuild all the DOM APIs, they focused on the limited set of APIs used by [Preact](https://preactjs.com/) and [React](https://reactjs.org/). If you use one of these frameworks, you should be able to build more complex interactions with much less worry about what's supported. That said, React bundles will typically exceed `amp-script`'s [150K limit](https://amp.dev/documentation/components/amp-script/#size-of-javascript-code). For this reason, Preact is strongly recommended.

`amp-script` has also been tested with frameworks like [Vue](https://vuejs.org/), [Angular](https://angularjs.org/), [Aurelia](https://aurelia.io/), and [lit-html](https://lit-html.polymer-project.org/),  but not as extensively. If you find a gap, please [file an issue](https://github.com/ampproject/worker-dom/issues) - or, better still, [submit a pull request](https://github.com/ampproject/worker-dom/pulls).

Since `amp-script` cannot exhaustively support the DOM API, simply copying a library like [jQuery](https://jquery.com/) into an `&lt;amp-script>` component will not work.


## How should I use amp-script?

`amp-script` was created to help you fill the gaps in your AMP webpage's functionality. One can't simply copy existing JavaScript into `amp-script` and expect it to work without modification. Instead, `amp-script` takes care of logic and interactions that existing AMP components don't provide.

The following are a few excellent use cases for `amp-script`.

### Create new interactions

When possible, it's better to use an AMP component for a DOM interaction. If the interaction you wish to create would be of interest to other developers, you are encouraged to [suggest and contribute](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md) a new component. Otherwise, `amp-script` provides a fine way to create interactions not currently supported by AMP components.

### Add advanced logic

`amp-bind` allows you to introduce logic into user interactions, but JavaScript needs to fit into a single expression. Because this logic is encapsulated in an HTML attribute, it won't get the benefit of syntax highlighting in your IDE, you can't set breakpoints, and it may be hard to debug. For any logic that doesn't fit neatly into a compact expression, `amp-script` presents a promising alternative.

### Enhance AMP components

`amp-script` has access to AMP state variables and the `AMP.getState()` and `AMP.setState()` methods. This lets you enhance existing AMP components with your own logic. It also provides a way to affect the DOM outside of the `&lt;amp-script>` component itself. See [here](https://amp.dev/documentation/examples/components/amp-script/#interacting-with-%3Camp-state%3E) and [here](https://amp.dev/documentation/examples/components/amp-script/#interacting-with-amp-components) for examples.

### Replace interactive components

AMP has an extensive system of [actions and events](https://amp.dev/documentation/guides-and-tutorials/learn/amp-actions-and-events/) that allow you to handle browser events, taking standard actions on the DOM and mutating the state of AMP components. It also includes interactive components like [`amp-bind`](https://amp.dev/documentation/components/amp-bind/) and [`amp-list`](https://amp.dev/documentation/components/amp-list/). If you're new to AMP and you're comfortable with JavaScript, it may be easier to simply use `amp-script`. For more elaborate interactions, `amp-script` will likely be easier, as discussed here.

**(TODO: insert link)**

### Handle server data

AMP allows you to retrieve server data using `amp-list` and to format it using [`amp-mustache`](https://amp.dev/documentation/components/amp-mustache/). For cases where mustache templating is insufficient, `amp-script` can fetch the data, format it, and inject the formatted data into the DOM. If you simply need to massage the server data before sending it to `amp-mustache`, an `amp-script` function can be the data source for `amp-list`. See [the documentation](https://amp.dev/documentation/components/amp-list/?format=websites#initialization-from-amp-state) for details and a code sample.

### Introduce new capabilities

You can use `amp-script` to access elements of the Web and DOM APIs that aren't currently accessible to AMP components, or in ways that AMP components don't support. For example, `amp-script` supports `WebSockets` ([example](https://amp.dev/documentation/examples/components/amp-script/#using-a-websocket-for-live-updates)), `localStorage`, and `Canvas`. It supports browser events that AMP doesn't normally pass along. And since you can access the `navigator` object, you can retrieve information about [the user's browser](https://amp.dev/documentation/examples/components/amp-script/#detecting-the-operating-system) or [preferred language](https://amp.dev/documentation/examples/components/amp-script/#personalization).

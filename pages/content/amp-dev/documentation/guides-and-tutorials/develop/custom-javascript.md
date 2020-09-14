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
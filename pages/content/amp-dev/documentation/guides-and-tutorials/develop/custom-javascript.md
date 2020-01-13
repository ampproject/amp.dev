---
$title: Include custom JavaScript in AMP pages
$order: 7
formats:
  - websites
author: CrystalOnScript
contributors:
  - fstanis
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.
---

AMP strives to provide a consistently good experience to all users across the web by encouraging the use of high-functioning and seamless components that are ready to go out of the box.

Some web experiences require a high amount of customization that go beyond the state binding capabilities of [`amp-bind`](../../../documentation/components/reference/amp-bind.md?format=websites) and the dynamic data retrieval and templating functionality of [`amp-list`](../../../documentation/components/reference/amp-list.md?format=websites) and [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md?format=websites). For those one-off cases, AMP has created [`<amp-script>`](../../../documentation/components/reference/amp-script.md?format=websites), a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.

# Inserting custom JavaScript

AMP pages support custom JavaScript through the `<amp-script>` component. The example below demonstrates how to use `amp-script` with a JavaScript file loaded from a URL:

```html
<!doctype html>
<html ⚡>
<head>
  ...
  <script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>
<body>  
  ...
  <amp-script layout="container" src="https://example.com/myfile.js">
    <p>Initial content that can be modified from JavaScript</p>
  </amp-script>
  ...
</body>
</html>
```

The `<amp-script>` component registers a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) to run on a separate thread than the main page. The Web Worker is given its own copy of the DOM through `amp-script` use of [Worker DOM](https://github.com/ampproject/worker-dom). This allows the Web Worker to use JavaScript libraries, such as [React](https://reactjs.org/) and [jQuery](https://jquery.com/), without modification.

The `amp-script` component sends messages between the Web Worker thread and the main thread, causing any changes the user makes on the main DOM to be echoed on the Web Worker's false DOM. In turn, the Web Worker can then update the false DOM, which is reflected on the main DOM.

## Custom scripts caching

The [AMP cache](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) serves custom JavaScript files inserted with `<amp-script>` same as AMP component scripts. This ensures that any custom JavaScript will not slow the speed of an AMP document.

The AMP cache proxies the JavaScript files and then delivers them. Users can expect the same performance experience from a page using `<amp-script>` as a page that doesn't include it.

# Using `<amp-script>`

To keep experiences on AMP pages consistent, limitations exist on `<amp-script>` to guarantee a fast loading time and smooth UI.

## Initialization

JavaScript inside the Web Worker allows minimal change to the DOM on load. Changes allowed during this phase are:

*   Registering event handlers.
*   Splitting a TextNode into multiple TextNodes, to allow for frameworks that require it.

The DOM inside `<amp-script>` tags should be almost identical before and after initialization.

For example, if starting with the code below:
```html
<text> Hello world </text>
```
Worker DOM permits minor changes in structure but not content:

```html
 <text>Hello </text><text>world</text>
```

## DOM manipulation

For user experience and security reasons, `amp-script` enforces DOM manipulation restrictions.

### User interaction

When a user interacts with elements wrapped inside an `<amp-script>` component, DOM manipulations must respond quickly. If running a `fetch` function, DOM manipulations must be completed within a **five second** window. If your `amp-script` logic is not preforming a fetch, the DOM has **less than one second** to update the DOM.  If a script mutates the DOM outside of the permitted window, it will result in a fatal error and the `amp-script` component will terminate the Web Worker. A terminated `<amp-script>` component will not run again.

### Unprompted changes

If your `<amp-script>` component uses a fixed layout, other than `layout=container`, and is sufficiently small, there is no interaction requirement to manipulate the DOM.

[tip type="note"]
As of April 2019, your `<amp-script>` component must be at a fixed hight of `300 px` or less to meet the unprompted change requirement.
[/tip]

## Script size

AMP enforces a limit of 150 kilobytes of custom JavaScript on each page. This limit is shared  among all `<amp-script>` component on that page. Any external JavaScript library must be imported to each individual `<amp-script>` component.

## Scope

Any DOM elements the custom JavaScript files wishes to interact with must be wrapped inside the `<amp-script>` component tags. This includes other AMP components. The `<amp-script>` component considers `document.body` to be the `amp-script` element and not the document's `<body>` element.

If you were to call `document.body.appendChild(document.createElement('span'))` within the `<amp-script>`file in the following document:

```html
<body>  
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
    </amp-script>
  </div>
</body>
```

It would result in this:

```html
<body>  
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
      <span></span>
    </amp-script>
  </div>
</body>
```

## Event triggers

All event triggers are allowed.

## API restrictions <a name="api-restrictions"></a>

 Some synchronous methods are disallowed in `<amp-script>` and replaced with alternatives, such as [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)). Because `Element.getBoundingClientRect()` could not be implemented in a Web Worker, an async alternative to it, `getBoundingClientRectAsync()`, is provided. `getBoundingClientRectAsync()` returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) instead of returning the result directly.

View [this chart](https://github.com/ampproject/worker-dom/blob/master/web_compat_table.md) to see WorkerDOM supported APIs.

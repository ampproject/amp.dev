---
$title: Include Custom JavaScript in AMP Pages
$order: 7
formats:
  - websites
author: CrystalOnScript
---

AMP strives to provide a consistently good experience to all users across the web by encouraging the use of high-functioning and seamless components that are ready to go out of the box. 

Some web experiences require a high amount of customization that go beyond the state binding capabilities of [`amp-bind`](https://amp.dev/documentation/components/reference/amp-bind.html?format=websites) and the dynamic data retrieval and templating functionality of [`amp-list`](https://amp.dev/documentation/components/reference/amp-list.html?format=websites) and [`amp-mustache`](https://amp.dev/documentation/components/reference/amp-mustache.html?format=websites). For those one-of-a-kind cases, AMP has created [`<amp-script>`](https://amp.dev/documentation/components/reference/amp-script.html?format=websites), a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.


# Inserting Custom JavaScript 

AMP pages support custom JavaScript through the `<amp-script>` component. 


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

[tip type="important"]
 `<amp-script>` is in experimental mode and may break in unpredictable ways.
[/tip]

## Custom Scripts Caching 

The [AMP cache](https://www.ampproject.org/docs/fundamentals/how_cached) serves custom JavaScript files inserted with `<amp-script>` same as AMP component scripts. This ensures that any custom JavaScript will not slow the speed of an AMP document. 

The AMP cache proxies the JavaScript files and then delivers them. Users can expect the same performance experience from a page using `<amp-script>` as a page that doesn't include it. 

# Limitations to `<amp-script>`

To keep experiences on AMP pages consistent, limitations exist on `<amp-script>` to guarantee a fast loading time and smooth UI. 

## Initialization

JavaScript inside the Web Worker allows minimal change to the DOM on load. Changes allowed during this phase are:


*   Registering event handlers
*   Splitting a TextNode into multiple TextNodes, assuming the text doesn't change

The DOM inside `<amp-script>` tags should be almost identical before and after initialization. 


## Interaction

DOM manipulations inside `<amp-script>` must happen quickly. If the DOM is mutated after a one second window of a user interaction with an AMP page, such as clicking, the Web Worker will be terminated. A terminated `<amp-script>` component will not run again. 


## Script Size 

AMP enforces a limit of 150 kilobytes of custom JavaScript on each page. This limit is shared  between every `<amp-script>` component on that page. If using a library, it must be imported to each individual `<amp-script>` element. 

## Scope

Any DOM elements the custom JavaScript files wishes to interact with must be wrapped inside the `<amp-script>` component tags. The `<amp-script>` component considers `document.body` to be the amp-script element and not the document's `<body>` element.

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


It will result in this:


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



## Event Triggers 

JavaScript inserted using `<amp-script>` can listen for the following events:

*   Change
*   Click
*   Focus
*   Blur 


## Latency Concerns

Web Workers and the main thread communicate through `[postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)`. This can cause a bad user experience with latency, such as use of the `[<canvas>` tag](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage). All canvas draw functions would need to be communicated through `postMessage()` to the actual DOM, unintentionally slowing down the page. However, `<amp-script>` supports the use of [basic SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes). 

TIP: View the[ allowed listed API's here](https://github.com/ampproject/worker-dom/blob/5ef03379c154034545b55f29a2e249f035ee4c8f/src/worker-thread/index.safe.ts#L50-L127).


## API Restrictions 

Additionally, some synchronous methods are disallowed in `<amp-script>`, such as [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). Because the Web Worker can't calculate the size and position of an element precisely, it needs to use `postMessage()` to run this inside the main thread. This means the result of the method is not immediately available, since it requires a corresponding `postMessage()` response from the main thread. `<amp-script>` has an async method called `Element.getBoundingClientRectAsync() that returns a Promise instead of synchronously returning the result.

View [this chart](https://github.com/ampproject/worker-dom/blob/master/web_compat_table.md) to see what API are implemented in WorkerDOM. 

[tip type="important"]
Any library relying on `Element.getBoundingClientRect()` would need to be modified to use `Element.getBoundingClientRectAsync()` instead.
[/tip]
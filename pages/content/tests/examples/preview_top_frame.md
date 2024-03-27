---
$title: Top frame preview
$order: 11
formats:
  - websites
  - email
  - stories
  - ads
$sitemap:
  enabled: False
---

Start

[example preview="top-frame" playground="true" template="amp-mustache" orientation="landscape"
imports="amp-list,amp-carousel,amp-bind,amp-lightbox-gallery" ]

```html
<!doctype html>
<html ⚡ lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <link rel="canonical" href="/static/samples/standalone/amp-website.html">
  <title>AMP Website Demo</title>
  <script async src="https://ampjs.org/v0.js"></script>
  <script async custom-element="amp-list" src="https://ampjs.org/v0/amp-list-0.1.js"></script>
  <script async custom-template="amp-mustache" src="https://ampjs.org/v0/amp-mustache-0.2.js"></script>
  <script async custom-element="amp-carousel" src="https://ampjs.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-bind" src="https://ampjs.org/v0/amp-bind-0.1.js"></script>
  <script async custom-element="amp-lightbox-gallery" src="https://ampjs.org/v0/amp-lightbox-gallery-0.1.js"></script>
  <style amp-custom>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    body > * {
      margin: 0.5rem 0 0.5rem 0.5rem;
    }
    amp-carousel {
      margin: 0;
    }
    input[type=number] {
      width: 2rem;
    }
    .red {
      color: red;
    }
    </style>
</head>
<body>

  <h2>AMP is easy</h2>

  <p>Here is a responsive image carousel implemented in AMP. Tap
  on one of the images to enter the lightbox mode.</p>
  <amp-carousel type="slides"
                width="400"
                height="300"
                layout="responsive"
                lightbox>
    <amp-img src="https://unsplash.it/400/300?image=10"
             width="400"
             height="300"
             layout="responsive"
             alt="a sample image">
    </amp-img>
    <amp-img src="https://unsplash.it/400/300?image=11"
             width="400"
             height="300"
             layout="responsive"
             alt="a sample image">
    </amp-img>
    <amp-img src="https://unsplash.it/400/300?image=12"
             width="400"
             height="300"
             layout="responsive"
             alt="a sample image">
    </amp-img>
    <amp-img src="https://unsplash.it/400/300?image=13"
             width="400"
             height="300"
             layout="responsive"
             alt="a sample image">
    </amp-img>
  </amp-carousel>


  <h2>AMP is interactive</h2>

  <p>AMP provides a rich set of built-in actions for creating
  interactive websites.</p>

  <button on="tap:greeting.show">Show</button>
  <button on="tap:greeting.hide">Hide</button>
  <button on="tap:greeting.toggleVisibility">Toggle</button>
  <span id="greeting" hidden>Hello</span>

  <p>... and this is how you toggle a class attribute.</p>

  <button on="tap:greeting2.toggleClass(class='red')">Toggle red</button>
  <span id="greeting2">Hello</span>


  <h2>AMP is dynamic</h2>

  <p>AMP offers different ways to render dynamic content on a page.
  With amp-list it's possible to client-side render data pulled
  in from a JSON endpoint.</p>

  <amp-list id="time"
            layout="fixed-height"
            height="18"
            src="/documentation/examples/api/time"
            binding="refresh"
            single-item
            items=".">
    <template type="amp-mustache">
      The time is: {{time}} <button on="tap:time.refresh">Refresh</button>
    </template>
  </amp-list>

  <p>Here is another example, a simple calculator implemented with amp-bind:</p>

  <input type="number"
         on="input-debounced:AMP.setState({a: event.valueAsNumber})"
         value="0"> +
  <input type="number"
        on="input-debounced:AMP.setState({b: event.valueAsNumber})"
        value="0"> =
 <span [text]="a + b">0</span>

</body>
</html>

```

[/example]

End

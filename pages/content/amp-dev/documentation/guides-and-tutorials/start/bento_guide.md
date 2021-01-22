---
$title: Use AMP components in non-AMP pages
$order: 1
description: 'Use a subset of AMP components as standalone elements in non-AMP pages with Bento AMP.'
tutorial: false
toc: true
formats:
  - websites
author: CrystalOnScript
---

Use AMP's well-tested, cross-browser compatible and accessible components anywhere on the web with Bento AMP. Bento AMP allows you to use AMP components in non-AMP pages without needing to commit to fully valid AMP! You can take these components and place them in implementations with frameworks and CMSs that don't support AMP. Bento also lets you test out AMP components to see if the path to valid AMP is right for your use case.

[tip type="important"]
 Bento is only available [experimentally](../learn/experimental.md). Read our [Blog Post](TODO) for information on future plans and how to get involved! 
[/tip]

# Use Bento components in non-AMP pages

Bento components are still in development and APIs might change. However, they're available for experimental use in a developer preview. This means you must enable the experimental flag either in the document or the console. This is no different from other [experiments in AMP](../learn/experimental.md). 

Keep an eye out for announcements and updates. While Bento AMP is in developer preview, the team will continue to make necessary changes to the API to improve features.


## Enable Bento Experiment 

Bento components are available experimentally and you must [enable experimental features](../learn/experimental.md).

Enable the Bento experiment by including the script below:


```
<script>
  (self.AMP = self.AMP || []).push(function (AMP) {
    AMP.toggleExperiment('bento', true);
  });
</script>
```

## Import AMP runtime and Bento component script

You must include the AMP runtime script and import the component script for each individual Bento component desired.

```
<script async src="https://cdn.ampproject.org/v0.js"></script>

<script async custom-element="amp-bento-component-name" src="https://cdn.ampproject.org/v0/amp-bento-component-name-1.0.js"></script>
``` 

[tip type="note"]
To make Bento components load event faster, eliminating need for the AMP runtime script is a high priority for Bento AMP. Follow our progress on the [Bento roadmap](../../../community/roadmap.html?category=bento#status-updates).
[/tip]

Read each Bento component’s reference documentation for implementation details.

## Layout and styling

Bento components need to be layout using standard CSS to avoid [content shifts](https://web.dev/cls/). 

[tip type="note"]

Bento components don't support [AMP's layout](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/). 

[/tip]

For the best page load experience give AMP components defined `width`/`height` and apply them as styles.

```css
<style>
    amp-base-carousel {
    display: block;
    height: 400px;
    width: 600px;
    overflow: hidden;
    }
    amp-accordion {
    width: 600px;
    }
</style>
```


## Interacting with Bento components

Bento components have individual APIs that grant access to component actions and events. Access to component APIs and invoking events use the following syntax:

```
await customElements.whenDefined('amp-bento-component');
const api = await component.getApi();
api.callMethod();
```

[tip type="note"]

Fully valid AMP installs event listeners on elements via the [`on` attribute](../learn/amp-actions-and-events.md) with the event and responding action as values. Bento AMP does not rely on this attribute. Instead, use component APIs to manage and react to events.

[/tip]

The example below triggers [`amp-accordion`'s toggle action](../../../documentation/components/reference/amp-accordion.md#toggle) when the user clicks the "Toggle Accordion" button.

```
<amp-accordion id="my-accordion" disable-session-states>
  <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section>
    <h2>Section 3</h2>
    <img class="article-img" width="1024" height="682" src="https://raw.githubusercontent.com/ampproject/amp.dev/future/examples/static/samples/img/product2_1024x682.jpg">
  </section>
</amp-accordion>
<button id="toggle">
  Toggle Accordion
</button>
<script>
  const toggleAccordion = async () => {
    const accordion = document.querySelector('#myAccordion')
    const api = await accordion.getApi();
    api.toggle();
  }
  const toggleButton = document.querySelector('#toggle')
  toggleButton.addEventListener('click', toggleAccordion)
</script>
```

Read each [component's reference documentation](#available-bento-components) for a full list of available actions and events. 


# Available Bento components  <a name="available-bento-components"></a>

Bento supported AMP components are listed below:

*   [amp-accordion](../../../documentation/components/reference/amp-accordion-v1.0.md)
*   [amp-base-carousel](../../../documentation/components/reference/amp-base-carousel-v1.0.md)
*   [amp-inline-gallery](../../../documentation/components/reference/amp-inline-gallery-v1.0.md)
    *   amp-inline-gallery-pagination
    *   amp-inline-gallery-thumbnails
*   [amp-stream-gallery](../../../documentation/components/reference/amp-stream-gallery-v1.0.md)
*   [amp-date-countdown](../../../documentation/components/reference/amp-date-countdown-v1.0.md)
*   [amp-date-display](../../../documentation/components/reference/amp-date-display-v1.0.md)
*   [amp-fit-text](../../../documentation/components/reference/amp-fit-text-v1.0.md)
*   [amp-instagram](../../../documentation/components/reference/amp-instagram-v1.0.md)
*   [amp-lightbox](../../../documentation/components/reference/amp-lightbox-v1.0.md)
*   [amp-selector](../../../documentation/components/reference/amp-selector-v1.0.md)
*   [amp-social-share](../../../documentation/components/reference/amp-social-share-v1.0.md)
*   [amp-timeago](../../../documentation/components/reference/amp-timeago-v1.0.md)
*   Video components
    *   [amp-video](../../../documentation/components/reference/amp-video-v1.0.md)
    *   [amp-youtube](../../../documentation/components/reference/amp-youtube-v1.0.md)

# Bento in action

The example below demonstrates how to include `amp-base-carousel` and `amp-accordion` in a non-AMP HTML page.

```
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>AMP Public Radio</title>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script
      async
      custom-element="amp-base-carousel"
      src="https://cdn.ampproject.org/v0/amp-base-carousel-1.0.js"
    ></script>
    <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-1.0.js"></script>
    <script>
      ((self.AMP = self.AMP || []).push(function (AMP) {
        AMP.toggleExperiment('bento', true);
      }));
    </script>
    <style>
      amp-base-carousel {
        display: block;
        height: 400px;
        width: 600px;
        overflow: hidden;
      }
      amp-accordion {
        width: 600px;
      }
    </style>
  </head>
  <body>
    <h1>Bento AMP Components</h1>
      <p>
        This demo includes the following components and configurations:
        <ul>
          <li>`amp-base-carousel` with looping and autoadvancing on 5s interval</li>
          <li>`amp-accordion` with three expandable sections</li>
        </ul>
      </p>
      <amp-base-carousel
        id="my-carousel"
        class="carousel-style"
        controls="never"
        loop
        auto-advance
        auto-advance-interval="5000"
      >
      <img
          class="article-img"
          width="1024"
          height="682"
          src="https://raw.githubusercontent.com/ampproject/amp.dev/future/examples/static/samples/img/green_apple_1_1024x682.jpg"
        >
      <img
          class="article-img"
          width="1024"
          height="682"
          src="https://raw.githubusercontent.com/ampproject/amp.dev/future/examples/static/samples/img/golden_apple1_1024x682.jpg"
        >
        <img
            class="article-img"
            width="1024"
            height="682"
            src="https://raw.githubusercontent.com/ampproject/amp.dev/future/examples/static/samples/img/product2_1024x682.jpg"
          >
      </amp-base-carousel>
    <button id="previous-button">
      Previous Slide
    </button>
    <button id="next-button">
      Next Slide
    </button>
    <script>
        const nextButton = document.querySelector('#next-button');
        const prevButton = document.querySelector('#previous-button');  
        const carousel = document.querySelector('amp-base-carousel');
        
        customElements
        .whenDefined('amp-base-carousel')
        .then(() => {
            return carousel.getApi();
        })
        .then((api) => {
            nextButton.addEventListener('click', () => api.next());
            prevButton.addEventListener('click', () => api.prev());
        });
    </script>
  </body>
</html>
```

See the [demo in action on Glitch](TODO).

# Working with experiments

Bento AMP is in experimental mode and available through the developer preview. The AMP team welcomes developer feedback through [GitHub](https://github.com/ampproject/amphtml/issues) and our [Slack](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) channel. Please reach out with any questions or issues. 


# Page experience

Bento components are designed to be highly performant and contribute to an excellent page experience. Developers are highly encouraged to [file issues](https://github.com/ampproject/amphtml/issues) if they see contradictory results.  


# AMP caches and validation

Using Bento components during the limited developer preview makes your web page an invalid AMP page. Therefore, your doc and any Bento components are not served by any AMP caches.

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

## Import AMP runtime and Bento component logic

You must include the AMP runtime script and import the logic for each individual Bento component desired.

```
<script async src="https://cdn.ampproject.org/v0.js"></script>

<script async custom-element="amp-bento-component-name" src="https://cdn.ampproject.org/v0/amp-bento-1.0.js"></script>
``` 

[tip type="note"]
Eliminating need for the AMP runtime script is a high priority for Bento AMP. Follow our progress on the [Bento roadmap](../../../community/roadmap.html?category=bento#status-updates).
[/tip]

Read each Bento component’s reference documentation for implementation details.

## Layout and styling

Fully valid AMP pages use the AMP layout system to infer sizing of elements to create a page structure before downloading any remote resources. This is important since this significantly reduces rendering and scrolling jank. However, Bento use imports components into less controlled environments, increasing the risk of content shifting. For the best page load experience, take the following measures:
  

## Interacting with Bento components

Fully valid AMP installs event listeners on elements via the [`on` attribute](../learn/amp-actions-and-events.md) with the event and responding action as values. Bento AMP does not rely on this attribute. Instead, the AMP team will provide a JS API to manage and react to events. 

During the developer preview, you can register component events and respond with defined actions using following syntax:

`el.getApi().then(api => api.play())`

The code below triggers [`amp-base-carousel`'s next action](../../../documentation/components/reference/amp-base-carousel.md#next) when executed. 

```
<button id="next-button">
      Next Slide
    </button>
    <script>
    let nextButton = document.getElementById('next-button')
    function nextSlide(){
      const carousel = document.querySelector('amp-base-carousel');
      customElements
        .whenDefined('amp-base-carousel')
        .then(() => {
          return carousel.getApi();
        })
        .then((api) => {
          // Make the carousel go to the next slide
          api.next();
      });
    }
    nextButton.addEventListener("click", nextSlide())
    </script>
```

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

The example below demonstrates how to include `amp-base-carousel` and `amp-fit-text` in a non-AMP HTML page.

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
    <script
      async
      custom-element="amp-fit-text"
      src="https://cdn.ampproject.org/v0/amp-fit-text-1.0.js"
    ></script>
    <script>
      (self.AMP = self.AMP || []).push(function (AMP) {
        AMP.toggleExperiment('bento', true);
      });
    </script>
    <style>
      body {
        font-family: sans-serif;
        padding: 10%;
        max-width: 600px;
      }
      .article-slide {
        height: 100%;
        display: flex;
        border: 1px solid lightgrey;
        border-radius: 5px;
        box-sizing: border-box;
      }
      .article-description {
        min-width: 40%;
        padding: 16px;
        padding-left: 60px;
      }
      .article-description h2 {
        font-weight: 400;
        letter-spacing: 1.08px;
        text-transform: uppercase;
        font-size: 12pt;
        color: grey;
        margin: 8px;
      }
      .article-description amp-fit-text {
        color: #333;
        font-weight: 700;
        margin: 8px;
      }
      .article-description amp-fit-text:hover,
      .article-description h2:hover {
        color: steelblue;
      }
      .article-img {
        border-top-right-radius: 5px 5px;
        border-bottom-right-radius: 5px 5px;
        display: inline-block;
        width: 100%;
        height: auto;
        max-width: 700px;
        max-height: 393px;
        aspect-ratio: 700px / 393px;
      }
      a {
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <h1>Article headline</h1>
    <div class="article-body">
      <p>
        This demo includes the following components and configurations:
        <ul>
          <li>amp-base-carousel with looping and autoadvancing on 5s interval</li>
          <li>amp-fit-text set to exactly 20px font size (headlines)</li>
        </ul>
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        ullamcorper turpis vel commodo scelerisque. Phasellus luctus nunc ut
        elit cursus, et imperdiet diam vehicula. Duis et nisi sed urna blandit
        bibendum et sit amet erat. Suspendisse potenti. Curabitur consequat
        volutpat arcu nec elementum. Etiam a turpis ac libero varius
        condimentum. Maecenas sollicitudin felis aliquam tortor vulputate, ac
        posuere velit semper.
      </p>
      <p>
        Fusce pretium tempor justo, vitae consequat dolor maximus eget. Aliquam
        iaculis tincidunt quam sed maximus. Suspendisse faucibus ornare sodales.
        Nullam id dolor vitae arcu consequat ornare a et lectus. Sed tempus eget
        enim eget lobortis. Mauris sem est, accumsan sed tincidunt ut, sagittis
        vel arcu. Nullam in libero nisi.
      </p>
      <h1>More Stories from NPR</h1>
      <amp-base-carousel
        height="150"
        loop
        auto-advance
        auto-advance-interval="5000"
      >
        <article class="article-slide">
          <div class="article-description">
            <a href="https://www.npr.org/sections/education/">
              <h2>Education</h2>
            </a>
            <a
              href="https://www.npr.org/2020/12/04/938050723/5-things-weve-learned-about-virtual-school-in-2020"
            >
              <amp-fit-text height="70" min-font-size="20" max-font-size="20">
                5 Things We've Learned About Virtual School In 2020
              </amp-fit-text>
            </a>
          </div>
          <img
            class="article-img"
            src="https://media.npr.org/assets/img/2020/12/02/virtualschooling_npr_carsonmcnamara_update_wide-9b3a04c62be660616532d546f47645280f977892.jpg?s=700"
          >
        </article>
        <article class="article-slide">
          <div class="article-description">
            <a href="https://www.npr.org/sections/health/">
              <h2>Health</h2>
            </a>
            <a
              href="https://www.npr.org/sections/health-shots/2020/12/03/942446185/uks-approval-of-pfizer-vaccine-should-give-people-hope-vaccine-expert-says"
            >
              <amp-fit-text height="70" min-font-size="20" max-font-size="20">
                U.K.'s Approval Of Pfizer Vaccine Should 'Give People Hope,'
                Vaccine Expert Says
              </amp-fit-text>
            </a>
          </div>
          <img
            class="article-img"
            width="700"
            height="393"
            src="https://media.npr.org/assets/img/2020/12/03/vaccine_wide-479daadfcb96b7c8a0b614d7aab152d43018e877.jpg?s=600"
          >
        </article>
        <article class="article-slide">
          <div class="article-description">
            <a href="https://www.npr.org/sections/music-videos/">
              <h2>Music Videos</h2>
            </a>
            <a
              href="https://www.npr.org/2020/12/04/942186930/dua-lipa-tiny-desk-home-concert"
            >
              <amp-fit-text height="70" min-font-size="20" max-font-size="20"
                >Dua Lipa: Tiny Desk (Home) Concert</amp-fit-text
              >
            </a>
          </div>
          <img
            class="article-img"
            width="700"
            height="393"
            src="https://media.npr.org/assets/img/2020/12/03/dua_wide-41767488aed1f75828f980b6b41339a0c65d4964.jpg?s=600"
          >
        </article>
        <article class="article-slide">
          <div class="article-description">
            <a href="https://www.npr.org/sections/national/">
              <h2>National</h2>
            </a>
            <a
              href="https://www.npr.org/2020/12/03/942034617/time-names-its-kid-of-the-year-water-testing-scientist-gitanjali-rao"
            >
              <amp-fit-text height="70" min-font-size="20" max-font-size="20">
                'Time' Names Its Kid Of The Year: Water-Testing Scientist
                Gitanjali Rao
              </amp-fit-text>
            </a>
          </div>
          <img
            class="article-img"
            width="700"
            height="393"
            src="https://media.npr.org/assets/img/2020/12/03/time201207_koty.coverfinal_wide-a7cff22dc41f55823d394817f2c1a0acfc105a66.jpg?s=600"
            layout="intrinsic"
          >
        </article>
        <article class="article-slide">
          <div class="article-description">
            <a href="https://www.npr.org/sections/book-reviews/">
              <h2>Book Reviews</h2>
            </a>
            <a
              href="https://www.npr.org/2020/12/04/941982629/maureen-corrigans-10-books-that-will-connect-you-in-a-socially-distant-year"
            >
              <amp-fit-text height="70" min-font-size="20" max-font-size="20">
                Maureen Corrigan's 10 Books That Will Connect You In A Socially
                Distant Year
              </amp-fit-text>
            </a>
          </div>
          <img
            class="article-img"
            width="700"
            height="393"
            src="https://media.npr.org/assets/img/2020/12/03/corrigan2020_wide-26e0b93fd657db854e1ba2bdb7b18539ca72ecfa-s1100-c85.jpg"
          >
        </article>
      </amp-base-carousel>
    </div>
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

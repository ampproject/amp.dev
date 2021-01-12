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

Use AMP's well-tested, cross browser compatible and accessible components everywhere with Bento AMP. Bento AMP allows you to use AMP components in non-AMP pages without needing to commit to fully valid AMP! Bento allows you to take components and place them in implementations with frameworks and CMSs that don't support AMP. 

Bento AMP enables you to insert highly performant and tested web components, such as carousels and media embeds, anywhere you need. Developers can use Bento components for one-off cases, such as adding a carousel to an otherwise non-AMP page. Bento is also a way of testing out AMP components to see if the path to valid AMP is right for your use case.

[tip type="important"]
 Bento is only available [experimentally](../learn/experimental.md). Read our [Blog Post](TODO) for information on future plans and how to get involved! 
[/tip]

# Use Bento components in non-AMP pages

Bento components are available for experimental use in the developer preview. This means you must enable the experimental flag either in the document or the console. This is no different from other [experiments in AMP](../learn/experimental.md). 

The risk of using the Bento experiment is also the same. The AMP teams reserves the right to change the API drastically based on feedback. Changes are necessary to improve features.


## Enable Bento Experiment 

Bento components are available experimentally and you must [enable experimental features](../learn/experimental.md).

You can enable all Bento components by including the script below:


```
<script>
  (self.AMP = self.AMP || []).push(function (AMP) {
    AMP.toggleExperiment('bento', true);
  });
</script>
```


Or enable a single Bento component by including the script below. Ensure you replace `bento-foo` with the desired [supported component](#available-bento-components) name given on its documentation page:


```
<script>
  (self.AMP = self.AMP || []).push(function (AMP) {
    AMP.toggleExperiment('bento-foo', true);
  });
</script>
```



## Import AMP runtime and Bento component logic

You must include the AMP runtime script and import the logic for each individual Bento component desired.

```
<script async src="https://cdn.ampproject.org/v0.js"></script>

<script async custom-element="amp-bento-component-name" src="https://cdn.ampproject.org/v0/amp-bento-1.0.js"></script>
``` 

Read each Bento component’s reference documentation for implementation details.


# Available Bento components  <a name="available-bento-components"></a>

Bento supported AMP components are listed below:



*   [amp-accordion](../../../documentation/components/reference/amp-accordion.md)
*   [amp-base-carousel](../../../documentation/components/reference/amp-base-carousel.md)
*   [amp-inline-gallery](../../../documentation/components/reference/amp-inline-gallery.md)
    *   amp-inline-gallery-pagination
    *   amp-inline-gallery-thumbnails
*   [amp-stream-gallery](../../../documentation/components/reference/amp-stream-gallery.md)
*   [amp-date-countdown](../../../documentation/components/reference/amp-date-countdown.md)
*   [amp-date-display](../../../documentation/components/reference/amp-date-display.md)
*   [amp-fit-text](../../../documentation/components/reference/amp-fit-text.md)
*   [amp-instagram](../../../documentation/components/reference/amp-instagram.md)
*   [amp-lightbox](../../../documentation/components/reference/amp-lightbox.md)
*   [amp-selector](../../../documentation/components/reference/amp-selector.md)
*   [amp-social-share](../../../documentation/components/reference/amp-social-share.md)
*   [amp-timeago](../../../documentation/components/reference/amp-timeago.md)
*   Video components
    *   [amp-video](../../../documentation/components/reference/amp-video.md)
    *   [amp-youtube](../../../documentation/components/reference/amp-youtube.md)

# Bento in action

The example below demonstrates how to include `amp-base-carousel` and `amp-fit-text` in a non-AMP HTML page.

```
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>AMP Public Radio</title>
    <link rel="canonical" href="self.html" />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
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
      (self.AMP = self.AMP || []).push(function(AMP) {
        AMP.toggleExperiment("amp-base-carousel-bento", true);
        AMP.toggleExperiment("amp-fit-text-bento", true);
      });
    </script>
    <style amp-custom>
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
          <amp-img
            class="article-img"
            width="700"
            height="393"
            src="https://media.npr.org/assets/img/2020/12/02/virtualschooling_npr_carsonmcnamara_update_wide-9b3a04c62be660616532d546f47645280f977892.jpg?s=700"
            layout="intrinsic"
          ></amp-img>
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
          <amp-img
            class="article-img"
            width="700"
            height="393"
            src="https://media.npr.org/assets/img/2020/12/03/vaccine_wide-479daadfcb96b7c8a0b614d7aab152d43018e877.jpg?s=600"
            layout="intrinsic"
          ></amp-img>
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
          <amp-img
            class="article-img"
            width="700"
            height="393"
            src="https://media.npr.org/assets/img/2020/12/03/dua_wide-41767488aed1f75828f980b6b41339a0c65d4964.jpg?s=600"
            layout="intrinsic"
          ></amp-img>
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
          <amp-img
            class="article-img"
            width="700"
            height="393"
            src="https://media.npr.org/assets/img/2020/12/03/time201207_koty.coverfinal_wide-a7cff22dc41f55823d394817f2c1a0acfc105a66.jpg?s=600"
            layout="intrinsic"
          ></amp-img>
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
          <amp-img
            class="article-img"
            width="700"
            height="393"
            src="https://media.npr.org/assets/img/2020/12/03/corrigan2020_wide-26e0b93fd657db854e1ba2bdb7b18539ca72ecfa-s1100-c85.jpg"
            layout="intrinsic"
          ></amp-img>
        </article>
      </amp-base-carousel>
    </div>
  </body>
</html>
```

See the [demo in action on Glitch](TODO).

# Working with experiments

Bento AMP is in experimental mode and available through the developer preview. The AMP team welcomes developer feedback through [GitHub](https://github.com/ampproject/amphtml/issues) and our [Slack](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) channel. Please reach out with any questions or issues. 


## Page experience

Bento components are designed to be highly performant and contribute to an excellent page experience. Developers are highly encouraged to [file issues](https://github.com/ampproject/amphtml/issues) if they see contradictory results.  


## AMP caches and validation

Using Bento components during the limited developer preview makes your web page an invalid AMP page. Therefore, your doc and any Bento components are not added to any AMP caches.
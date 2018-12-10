---
$title: Thinking in Components
$order: 3
toc: true
---
[TOC]

## What are components?

AMP is component-based web library. But what actually are components? How do they differ from HTML tags we already know about?

Components are the building blocks of websites. They represent the combination of some structure (HTML), styling (CSS), and behavior (JavaScript) with an interface that makes it easy to use in your site and share with others. Components have:

* A name (eg. “amp-img”) used as the tag name to identify the component
* Custom attributes that change the behavior, style or contents of a component (width/height, src, attribution, etc)
* Events that can capture user inputs to the component (“on” attribute)
* Optionally, components have “children”. This is content (text, HTML tags, or other components) that is placed between the opening and closing tags of the component. The way that these children are displayed on the page is different for each component.

AMP’s component system helps you quickly build efficient and responsive features into your pages with minimal effort. The AMP library provides a list of components for you to use. There are components for building forms and carousels, for integrating page analytics, for making XHR requests to servers, and for much more. You can see the full list of available components at the the [AMP Components reference](https://www.ampproject.org/docs/reference/components).


| `<amp-img src="IMG-URL" layout="responsive" width="640" height="480"></amp-img>` | `<amp-twitter width="486" height="657" layout="responsive" data-tweetid="ID"></amp-twitter>` | `<amp-youtube data-videoid="ID" layout="responsive" width="480" height="270"></amp-youtube>`|
| --------- | ----------- | ----------- |
| {{ image('/static/img/courses/beginner/image8.png', 194, 340, caption='amp-img') }} | {{ image('/static/img/courses/beginner/image6.png', 194, 340, caption='amp-twitter') }} | {{ image('/static/img/courses/beginner/image7.png', 194, 340, caption='amp-youtube') }} |

The goal when building out your AMP sites is to use AMP components whenever possible. This maximizes the performance benefits of building an AMP page, because you don’t have to reinvent the wheel, and you can leverage the work of the AMP library authors.

Almost all AMP components are run by at least some JavaScript. For some AMP components (like the `<amp-img>`), the JavaScript is built directly into the AMP script you included in the top of your page. But for most AMP components, you need to include a separate JavaScript file in order to use the component. The purpose of requiring you to include scripts separately is that you only include the scripts you actually use in your site, and your users then only have to download the scripts necessary to browse your page. Less code to download means that your site will load quicker for your customers!

## Our first AMP component: `<amp-img>`

Most HTML tags can be used directly in AMP, but certain tags, such as the `<img>` tag, are replaced with equivalent AMP components. The reason for this is that these components have accessibility, responsiveness and performance best practices built right in.

For example, in the case of amp-img, AMP requires us to specify the dimensions of the image. The reason for this is that AMP needs to understand the layout of the page before assets (eg. images) load. This improves the user experience when your page is loading but before the image assets have been downloaded. When the images are downloaded, they can be inserted into the page without causing any existing content on the page to be moved around. This gives the AMP runtime more leeway in deciding when to load image assets based on the capabilities of the user’s device and internet connection.

You can really see why AMP is so powerful! It’s taking a lot of factors into account on your behalf, so all you have to worry about is building out the page that’s best for your users.

[tip type="read-on"]
If you want to know more about AMP’s automatic optimizations, you can read about lazy-loading and pre-rendering in AMP in the appendix.
[/tip]

To use the component and to resolve the `<amp-img>` validation error from earlier, we need to replace the existing img tag in our page with the AMP equivalent. To do that, instead of `<img …>` write `<amp-img…>` and give your image fixed dimensions. Give the image a `width` of `640` and a `height` of `480`.

The result should look like this:

[sourcecode:html]
{% raw %}<amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746" width=”640” height="480"></amp-img>
{% endraw %}[/sourcecode]

Look at the live page. The AMP Validator should now report no validation errors!

## Arranging and Sizing Components in AMP

However, now there is a problem with how our page looks. You won’t notice it on a large desktop monitor, but it is instantly apparent what’s wrong when we look at the site on a mobile device.

{{ image('/static/img/courses/beginner/image15.png', 194, 340, caption='The image of the bicycle runs off the edge of the screen') }}

Notice that the image doesn’t shrink to fit smaller screens; it simply runs off the side of the page. This is because if we do not specify a strategy for laying out the image and resizing it, it’s going to default to a fixed width and height as we specified in our code. We can fix this issue using AMP's layout system.

We are going to give our image a `layout` of type `responsive` so that it automatically scales as the window is resized. The responsive layout causes the image to assume the dimensions of the parent container, all while respecting the original aspect ratio. If the parent container is only 320 pixels wide, then the image will maintain its aspect ratio and be resized to 320x240 (instead of 640x480). Add the layout attribute to our images. If done correctly, it will looks something like this:

[sourcecode:html]
{% raw %}<amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746" layout="responsive" width="640" height="480"></amp-img>
{% endraw %}[/sourcecode]

After you have made the changes, look at your page. Voila! Our image has the correct aspect ratio and responsively fills the width of the screen.

{{ image('/static/img/courses/beginner/image14.png', 194, 340, caption='Image of bicycle with correct aspect ratio') }}

Learning how to use layout system is critical to becoming a successful AMP developer. All of the layouts that AMP gives you to choose between can be implemented using plain CSS, but often they can be difficult to implement or have tricky edge cases that require deep knowledge to work around. AMP exposes many of these layout options to be used on any element in your AMP page. Check out the [official documentation](https://www.ampproject.org/docs/design/responsive_amp) for more information about the layout system.

[tip type="tip"]
Try selecting different mobile devices from the dropdown menu (see screenshot below) to see how the image adapts to different screen sizes. It is good practice to test your site on different screen sizes. Browsers on actual mobile devices may behave differently, so, when possible, test your webpage on real devices.

{{ image('/static/img/courses/beginner/image18.png', 200, 200, caption='Dropdown list of devices in Chrome') }}
[/tip]

## Cycling through images using <amp-carousel>
A carousel is an element containing a set of items that can be scrolled through like a slideshow. 
The AMP implementation of a carousel is the component, amp-carousel. This component is not built-in, so you will need to add it’s script in the page's `<head>`.

Look at the documentation of `<amp-carousel>` for a moment. You will notice a few things:
* The required script tag - This is the tag that we need to add to the head, so that it works!
* The supported layouts - We briefly discussed the layout attribute in a previous section. It controls the way the element is rendered on the screen and makes our life easier.
* The list of attributes - We talked about custom attributes in the previous section on web components. These allow us to customize our AMP component in certain ways.

You are going to see each of these things in documentation for almost all AMP components. Let’s explore the documentation using one its examples:

[sourcecode:html]
{% raw %} <amp-carousel id="carousel-with-preview"
    width="450"
    height="300"
    layout="responsive"
    type="slides">
    <amp-img src="images/image1.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="apples"></amp-img>
    <amp-img src="images/image2.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="lemons"></amp-img>
    <amp-img src="images/image3.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="blueberries"></amp-img>
  </amp-carousel>
{% endraw %}[/sourcecode]

We see that this carousel has three images inside of it that users can slide between. The attributes of this carousel component instance (id, width, height, layout, and type) are split into three groups: [attributes common to all HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) (id), [attributes common to all AMP components](https://www.ampproject.org/docs/reference/common_attributes) (width, height, layout), and attributes unique to the carousel component (type).

In the documentation for amp-carousel, we see a listing for “type” in the list of attributes for the component. It shows that the valid inputs for type include “slides” and “carousel”. Notice that the default value for type is “carousel”. That means that `<amp-carousel>...</amp-carousel>` and `<amp-carousel type=”carousel”>...</amp-carousel>` are equivalent expressions. This is useful, because with components that have many attributes, you don’t need to include every one of them if you just want to use the default value!

[tip type="read-on"]
 Some attributes do not require a value at all. These are called [boolean attributes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes). In these cases, the attribute has a default value of false and has a value of true when attached to an element or component. For example, `<input type=”checkbox” disabled>` means that the disabled attribute has a value of true, indicating the checkbox should be disabled. Absence of the disabled attribute gives it the default value of false and means the input is enabled.
[/tip]

There are many other custom attributes that can be used with the amp-carousel component. It’s useful when using an AMP component for the first time to spend some time looking through the documentation to see all the ways that you can customize the appearance or behavior of the component through attributes.

Let’s practice using the documentation to add an amp-carousel to our project. In our project, add a carousel under the `<p class="main-text">` element with the following settings:

* Give the carousel a responsive layout
* Give the carousel a type of slides
* Add three images to the carousel: assets/cheddar-chaser.jpg, assets/cheese.jpg, and assets/mouse.jpg
* Make the carousel images able to loop back to the beginning if a user tries to advance beyond the last slide
* Give each image a responsive layout

Recommended style guidelines:
* Give the carousel a width of 412 and a height of 309
* Give each image a width of 412 and a height of 309

After you have made the changes, look at the live page and see how you did!

You should be looking at something like this:

{{ image('/static/img/courses/beginner/image13.png', 194, 340, caption='The carousel in our page') }}

Here is how the code you added might look in your project:

[sourcecode:html]
{% raw %}<amp-carousel layout="responsive" width="412" height="309" 
        type="slides" loop>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser.jpg?1540228205366" width="412" height="309"
        layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese.jpg?1540228223785" width="412" height="309"
        layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse.jpg?1540228223963" width="412" height="309"
        layout="responsive"></amp-img>
</amp-carousel>
{% endraw %}[/sourcecode]

Remember to include the `amp-carousel` script in the `<head>`:

[sourcecode:html]
{% raw %}<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<link rel="canonical" href="https://www.site.com/amp/document.html">
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
{% endraw %}[/sourcecode]

## Embedding YouTube videos with `<amp-youtube>`

Let’s embed a YouTube video in the document to get people excited about our site! The procedure will be similar to the way we added `<amp-carousel>`. Use the [amp-youtube documentation](https://www.ampproject.org/docs/reference/components/amp-youtube) to embed a YouTube video under the carousel element with the following settings (again, don't forget to add the script to the `<head>`):
* Set the video id to `BlpMQ7fMCzA`
* Make the video layout responsive

Recommended style guidelines:
* Set the element width to 480 and the height to 270

After you have made the changes, look at your page. You should now see the YouTube video:

{{ image('/static/img/courses/beginner/image9.png', 194, 340, caption='Image of the YouTube video in the page') }}

[sourcecode:html]
{% raw %}<amp-youtube data-videoid="BlpMQ7fMCzA" layout="responsive" width="480" height="270"></amp-youtube>
{% endraw %}[/sourcecode]

Remember to include the `amp-youtube` script in the `<head>`:

[sourcecode:html]
{% raw %}<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<link rel="canonical" href="https://www.site.com/amp/document.html">
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
{% endraw %}[/sourcecode]

[tip type="read-on"]
In addition to the <amp-youtube> component, AMP also includes support for other video players. Check out "[Integrating Videos in AMP an Overview](https://ampbyexample.com/advanced/integrating_videos_in_amp_an_overview/)" on AMP by Example.
[/tip]

## Displaying social media posts with <amp-twitter>

You should, by now, start to feel comfortable adding simple AMP components to your application. We’re going to keep going by adding a Twitter post callout to our site.

First let's make a new heading to organize the page nicely. Add the following snippet just below the `amp-youtube` component:

[sourcecode:html]
{% raw %}<h2 class="main-heading">Chico's Cheese Bicycles says</h2>{% endraw %}[/sourcecode]

Using your experience so far and the [amp-twitter documentation](https://www.ampproject.org/docs/reference/components/amp-twitter), embed a tweet below the new heading with the following settings:
* Set the tweet id to `944269037327892481`
* Make the tweet responsive

Recommended style guidelines:
* Set the `width` to `486` and the `height` to `657`

After you have made the changes look at the live version of your page. You should see the tweet appear:

{{ image('/static/img/courses/beginner/image4.png', 194, 340, caption='Image of tweet embedded in the page') }}

Solution:

[sourcecode:html]
{% raw %}<h2 class="main-heading">Chico's Cheese Bicycles says</h2>
<amp-twitter width="486" height="657" layout="responsive"
  data-tweetid="944269037327892481">
</amp-twitter>
{% endraw %}[/sourcecode]

Remember to include the `amp-twitter` script in the `<head>`:

[sourcecode:html]
{% raw %}<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<link rel="canonical" href="https://www.site.com/amp/document.html">
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
{% endraw %}[/sourcecode]

## Adding social sharing buttons

Social media links are present in many web pages we visit today. AMP provides us with ready-made link-buttons that, once configured, will allow users to share your page on their social media with a single click, helping you grow your user engagement.

As we have been doing, using the AMP documentation, your task is now to add buttons below the amp-twitter component that let the user share our page with a single click. The twist is that instead of linking to the specific component we’re going to use, you will need to navigate and search within the [AMP Components Reference](https://www.ampproject.org/docs/reference/components) to find the relevant AMP component (Hint: the title of this section should help you find what you’re looking for).

Once you have located the correct component, click the name of the component to access its documentation, and use that documentation to add components that:
* Gives the user the option to share your page on the following platforms: Email, Facebook, Google Plus, and Twitter.
* Has the Facebook `data-param-app_id` of `533464587051336`

Recommended style guidelines:
* Wrap the AMP components in a `div` with a `social-bar` class
* Give each AMP component a `width` and `height` of `44`

After you have completed this task, your page should contain buttons for the user to share your site:

{{ image('/static/img/courses/beginner/image16.png', 194, 340, caption='Social media buttons embedded in the page') }}

Solution:

[sourcecode:html]
{% raw %}<div class="social-bar">
  <amp-social-share type="email" width="44" height="44"></amp-social-share>
  <amp-social-share type="facebook" width="44" height="44"
      data-param-app_id="533464587051336"></amp-social-share>
  <amp-social-share type="gplus" width="44" height="44"></amp-social-share>
  <amp-social-share type="twitter" width="44" height="44"></amp-social-share>
</div>
{% endraw %}[/sourcecode]

Remember to include the `amp-social-share` script in the `<head>`:

[sourcecode:html]
{% raw %}<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
<script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<link rel="canonical" href="https://www.site.com/amp/document.html">
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
{% endraw %}[/sourcecode]




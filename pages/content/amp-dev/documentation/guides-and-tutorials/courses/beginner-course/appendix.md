---
$title: Appendix
$order: 7
toc: true
---
[TOC]

## Why AMP

Today's websites have grown to an average of over 3 MB since the early days of the web. 75% of sites now take longer than 3 seconds to load on a 3G connection. Obtrusive ads can further block users from engaging with a site's actual content. The combination of slow load times and disruptive advertisements often results in a bad experience that many users leave behind.

To create and maintain a fast, functional, and beautiful mobile site takes a lot of effort. That's why the Accelerated Mobile Pages (AMP) Project was first started. AMP helps developers to quickly create fast web experiences that are easy to maintain. When you use the AMP format, your pages will be fast, and will avoid many of the big user experience pitfalls.

## AMP Support
AMP runs on standard HTML, JavaScript, and CSS. It’s simply a specific use of standard web technologies, and it works in all modern browsers. To be more specific, AMP supports the latest two versions of major browsers like Chrome, Firefox, Edge, Safari, Opera and UC Browser. It also supports desktop, phone, tablet and the web view version of these respective browsers. See [here](https://www.ampproject.org/support/faqs/supported-browsers) for more information. 

AMP does not allow any custom JavaScript; you can only write your own JavaScript in very limited contexts. However, AMP's JavaScript runtime provides all the logic that most sites need. AMP also restricts a small number of HTML tags and CSS rules from use (we'll explore these a bit later). This means that even if your knowledge of JavaScript is very limited, you will still be able to create your awesome, performant webpage!

## Explaining the boilerplate AMP HTML

### The `<link rel="canonical">` tag
When AMP began, it was only used for creating web pages for mobile devices. A web page would have an AMP version that was served to mobile devices, and a version written in regular HTML for desktops (referred to as the “canonical” version). You would then link the two versions using a `<link>` tag so that search engines would know that both docs represented the same webpage. 

So, the non-AMP document contained a link to the AMP document, like this:

[sourcecode:html]
{% raw %}<link rel="amphtml" href="https://www.site.com/amp/document.html">
{% endraw %}[/sourcecode]

And the AMP document contained a link to the non-AMP document, like this:
[sourcecode:html]
{% raw %}<link rel="canonical" href="https://www.site.com/document.html">
{% endraw %}[/sourcecode]

Now that AMP is more full-featured, unless you require additional features on your desktop page, it's easier to use AMP for both mobile and desktop. That way, you’re only maintaining one page instead of two! Nonetheless, the <link> is still required. In this case, you simply link the page to itself, like this:

[sourcecode:html]
{% raw %}<link rel="canonical" href="https://www.site.com/amp/document.html">
{% endraw %}[/sourcecode]

Using a single AMP page for all devices is called “canonical AMP”. That’s what we’re doing for our cheese bike shop!

### The amp-boilerplate <style> tag

All AMP HTML pages must also contain some default styles within the <head> tag. This styling affects the look and feel of the page until the AMP library is fully loaded. What it does, essentially, is it initially hides the content until the page is ready, that is all elements of the page are ready and AMP knows where they go and how much space they are taking up. Once this is complete, the page fades in. This way the users view the page in its final form straight away, leaving them with the perception that the page was loaded instantly. 

### Why the viewport <meta> tag?

AMP works on mobile and desktop devices alike. Since a user may experience your webpage on either, it's best to check your webpage on both devices while developing. To simulate a mobile device experience in Chrome DevTools, click the mobile phone device icon here:

{{ image('/static/img/courses/beginner/image5.png', 30, 100, caption='Mobile preview in DevTools') }}

Now select a mobile device (for example a "Nexus 5X") from this menu:

{{ image('/static/img/courses/beginner/image1.png', 30, 300, caption='Select a mobile device') }}

You should see a simulation of how the page would look for the selected device in your browser such as this:

{{ image('/static/img/courses/beginner/image17.png', 194, 340, caption='A simulation of how the page looks on mobile') }}

Notice the content doesn't fit well on the mobile device's screen. The “viewport” meta tag takes care of that. This tag scales our page to create the best view in the given screen size.
Since we want our AMP pages to be optimized for mobile devices, and also be responsive, it goes without saying that this tag is required by the AMP validator.

So, the following tag must be placed within the <head> tag of our AMP page. Add it below the shortcut icon link.

[sourcecode:html]
{% raw %}<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
{% endraw %}[/sourcecode]

If you refresh your page, it should now look a bit better in small screens, like this:

{{ image('/static/img/courses/beginner/image10.png', 194, 340, caption='Mobile optimized page') }}

You will not notice much of a difference now, apart from the title, but you can try it as we move further along to understand how the scaling works.

## Explaining Validation errors

### Notice the AMP <script> tag

[sourcecode:html]
{% raw %}<script async src="https://cdn.ampproject.org/v0.js"></script>
{% endraw %}[/sourcecode]

Why is the async attribute there?

One of the rules of AMP is that it does not allow third party JavaScript code. The only JavaScript that is allowed is the AMP runtime script. JavaScript, however powerful and indispensable for the web, when loaded synchronously, it can block DOM construction and delay page rendering (until it loads). To keep JavaScript from delaying page rendering, AMP allows only asynchronous JavaScript. So, the AMP runtime script must be loaded asynchronously!

### `<img>`

You might have noticed that our img error said something else apart from `<amp-img>` tag suggestion. The error specifically said: *“The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?”*.

Why does it say that the img tag can only appear within a “noscript” tag, and what is a noscript tag, anyway? From [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript): “The HTML `<noscript>` element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.” In short, whatever is within a noscript tag will be rendered only if and when your are in an environment where no JavaScript is allowed.

How is this relevant to AMP, you ask. AMP is a JavaScript library, and amp elements are loaded with an AMP script. If no scripts are allowed, the AMP and its elements will not be loaded. In such cases, whatever is in the noscript tag will be loaded. The AMP validator throws this error in order to remind you that all images must be in an amp-img tag, apart from the case where you expect to find your page in a noscript environment, and thus provide an image in a noscript tag as a fallback.

## Lazy-Loading in AMP
“Lazy-loading” means that resources (images, data, videos, scripts, etc) are not loaded until they are needed. When AMP downloads resources, it optimizes downloads so that the currently most important resources are downloaded first. Images and ads are only downloaded if they are likely to be seen by the user, or if the user is likely to quickly scroll to them. These equivalent components for media assets (`<amp-img>` instead of `<img>`) are called “managed resources” because whether and when they will be loaded and displayed to the user is decided by AMP. AMP may at any time decide to unload resources that are not currently in visible by the user.
One of the performance optimizations of AMP requires that elements such as `<amp-img>` declare their height in advance. This helps AMP calculate how the layout will look in a better way. This is crucial, for example, because AMP preloads all resources that are needed in the first viewport, all that the user first sees when they visit the website.

## Fixed vs Responsive layout
AMP includes a [layout system](https://ampbyexample.com/advanced/layout_system/) to ensure the page layout is as rigid as possible before the browser renders the page. This system gives us a [`layout`](https://www.ampproject.org/docs/guides/responsive/control_layout#supported-values-for-the-layout-attribute) attribute that lets us position and scale elements in a variety of ways -- fixed dimensions, responsive design, fixed height, and more. The layout system is responsible for enforcing size declarations of certain elements. 

The layout attribute is available for most elements and it specifies how an AMP component appears on the page. Two common values for the layout attribute are the “fixed” and the “responsive”. If an element has a fixed layout, the width and height attributes must be present. Then, the element will maintain this exact size in pixels, no matter how the screen or the viewport change. If an element has a responsive layout, again, both the width and height attributes must be present. In this case, however, the element will be resized automatically to take up all available space, maintaining the aspect ratio given by the set width and height. The available space depends on the parent element.

## Carousels?

There are a host of JavaScript libraries for creating carousels, but they are typically non-performant. In fact, carousels full of large images are one of the most common causes of slow page load.
The `amp-carousel` component is designed to be performant; it lazy-loads images before they are visible. 

## More on the AMP Cache

A quick explanation of AMP Cache is the following “[The Google AMP Cache serves cached copies of valid AMP content published to the web.](https://developers.google.com/amp/cache/overview)” In short, once Google (or another search engine which has an AMP cache, like Microsoft and Bing) discovers a valid AMP page, then it stores a copy of it in its cache.@Bilal how is the open source website for applitools? can we get it published now?

Doing this, it passes your page through an number of optimization functions. In short, after it validates your content, it caches images, fonts and AMP documents. It then limits maximum image dimensions and does some transformations to your images via the amp-img tag, like removing metadata, converting images to smaller, mobile-friendlier formats, generating alternate versions for different screen sizes. Finally, it also sanitizes your HTML and CSS.

What happens next is when you visit an AMP page, the AMP Cache cached copy is served to you. The result is that you see the content in a perceived instance. This is also due to pre-rendering. The AMP Cache makes sure that only assets in the first viewport get preloaded, and no third-party scripts get executed. 

This pre-rendering magic comes into play in Google Search results, too. If you search for something, then, in the search results, a few of the AMP pages a user will likely click on will be pre-rendered, so that the user experience seems seamless and instant. This results in a much cheaper, less bandwidth and CPU-intensive preload. 

See [this article](https://developers.google.com/amp/cache/overview) for more information about the types of optimizations that the AMP cache applies.

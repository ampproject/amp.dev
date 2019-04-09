---
$title: Appendix
$order: 7
---

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

Now that AMP is more full-featured, unless you require additional features on your desktop page, it's easier to use AMP for both mobile and desktop. That way, you’re only maintaining one page instead of two! Nonetheless, the `<link>` is still required. In this case, you simply link the page to itself, like this:

[sourcecode:html]
{% raw %}<link rel="canonical" href="https://www.site.com/amp/document.html">
{% endraw %}[/sourcecode]

Using a single AMP page for all devices is called “canonical AMP”. That’s what we’re doing for our cheese bike shop!

### The amp-boilerplate `<style>` tag

All AMP HTML pages must also contain some default styles within the `<head>` tag. This styling affects the look and feel of the page until the AMP library is fully loaded. What it does, essentially, is it initially hides the content until the page is ready, that is all elements of the page are ready and AMP knows where they go and how much space they are taking up. Once this is complete, the page fades in. This way the users view the page in its final form straight away, leaving them with the perception that the page was loaded instantly. 

### Why the viewport `<meta>` tag?

AMP works on mobile and desktop devices alike. Since a user may experience your webpage on either, it's best to check your webpage on both devices while developing. To simulate a mobile device experience in Chrome DevTools, click the mobile phone device icon here:

{{ image('/static/img/courses/beginner/image5.png', 409, 244, align='center half', caption='Mobile preview in DevTools') }}

Now select a mobile device (for example a "Nexus 5X") from this menu:

{{ image('/static/img/courses/beginner/image1.png', 193,341, align='center third', caption='Select a mobile device') }}

You should see a simulation of how the page would look for the selected device in your browser such as this:

{{ image('/static/img/courses/beginner/image11.png', 445, 816,  align='center third', caption='A simulation of how the page looks on mobile') }}

Notice the content doesn't fit well on the mobile device's screen. The “viewport” meta tag takes care of that. This tag scales our page to create the best view in the given screen size.
Since we want our AMP pages to be optimized for mobile devices, and also be responsive, it goes without saying that this tag is required by the AMP validator.

So, the following tag must be placed within the `<head>` tag of our AMP page. Add it below the shortcut icon link.

[sourcecode:html]
{% raw %}<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
{% endraw %}[/sourcecode]

If you refresh your page, it should now look a bit better in small screens, like this:

{{ image('/static/img/courses/beginner/image20.png', 414, 733,  align='center third', caption='Mobile optimized page') }}

You will not notice much of a difference now, apart from the title, but you can try it as we move further along to understand how the scaling works.

## Lazy-Loading in AMP
“Lazy-loading” means that resources (images, data, videos, scripts, etc) are not loaded until they are needed. When AMP downloads resources, it optimizes downloads so that the currently most important resources are downloaded first. Images and ads are only downloaded if they are likely to be seen by the user, or if the user is likely to quickly scroll to them. These equivalent components for media assets (`<amp-img>` instead of `<img>`) are called “managed resources” because whether and when they will be loaded and displayed to the user is decided by AMP. AMP may at any time decide to unload resources that are not currently in visible by the user.
One of the performance optimizations of AMP requires that elements such as `<amp-img>` declare their height in advance. This helps AMP calculate how the layout will look in a better way. This is crucial, for example, because AMP preloads all resources that are needed in the first viewport, all that the user first sees when they visit the website.

## Fixed vs Responsive layout
AMP includes a [layout system]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.md', locale=doc.locale).url.path}}) to ensure the page layout is as rigid as possible before the browser renders the page. This system gives us a [`layout`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.md', locale=doc.locale).url.path}}) attribute that lets us position and scale elements in a variety of ways -- fixed dimensions, responsive design, fixed height, and more. The layout system is responsible for enforcing size declarations of certain elements. 

The layout attribute is available for most elements and it specifies how an AMP component appears on the page. Two common values for the layout attribute are the “fixed” and the “responsive”. If an element has a fixed layout, the width and height attributes must be present. Then, the element will maintain this exact size in pixels, no matter how the screen or the viewport change. If an element has a responsive layout, again, both the width and height attributes must be present. In this case, however, the element will be resized automatically to take up all available space, maintaining the aspect ratio given by the set width and height. The available space depends on the parent element.

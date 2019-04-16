---
$title: Thinking in Components
$order: 4
---

## Adding Features To Our Site

So far, we’ve converted our basic HTML site into a basic AMP site. There is only one validation error remaining in our site, and we’ll fix it by using an `<amp-img>` component instead of an `<img>` tag. As we fix this last validation error, we’ll learn what AMP components are, why some HTML tags are replaced or disallowed in AMP, and how to add components to our site.

After that, it’s time to add additional functionality to our website. To complete the initial version of our Chico’s Cheese Bike homepage, we are going to add some additional marketing content. The team has decided to add a YouTube video about making our cheese bikes, a carousel of images of our various cheese bike products, and some social media links that will help users share our site with their favorite social networks.

It might seem daunting to add so many pieces to our site so quickly. We would need to create HTML, CSS, and JavaScript to fulfill many of the requirements for the features we want to add (such as how to change the active slide of the carousel). Then, we’d have to consider how to make the whole site performant.

But that’s the beauty of AMP. With AMP, we don’t have to worry about all those details! The AMP library authors have given us drop-in building blocks that provide us with these features and help take care of qualities like performance, accessibility, and security. These blocks are called **components**, and they are the key to making successful sites with AMP.

## What are Web Components?

Components are building blocks for the web. They represent the combination of structure (HTML), styling (CSS), and behavior (JavaScript) with an interface that makes it easy to use in your site and share with others. Components have:

- A name (eg. `<amp-img>`) used as the tag name to identify the component.

- Custom attributes that change the behavior, style, or contents of a component (like `width`, `height`, `src`, and `attribution`).

- Events that can capture user inputs to the component (`on` attribute).

Optionally, components also have "children." Here, "children" refers to content (such as text, HTML tags, or other components) that is placed between the opening and closing tags of the component. The way these children are displayed on the page is different for each component.

AMP’s component system helps you quickly build efficient and responsive features into your pages with minimal effort. The AMP library provides a comprehensive list of components for you to use. There are components for building forms and carousels, for integrating page analytics, for making XHR requests to servers, and much more. The possibilities are virtually endless. You can see the full list of available components at the the AMP Components reference [here]({{g.doc('/content/amp-dev/documentation/components/index.md', locale=doc.locale).url.path}}).

As an example, here are three AMP components we could use in our site:

| AMP component                                                                                | How it renders on our site                                        |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `<amp-img src="IMG-URL" layout="responsive" width="640" height="480"></amp-img>`             | {{ image('/static/img/courses/beginner/image14.png', 311, 550) }} |
| `<amp-twitter width="486" height="657" layout="responsive" data-tweetid="ID"></amp-twitter>` | {{ image('/static/img/courses/beginner/image19.png', 311, 550) }} |
| `<amp-youtube data-videoid="ID" layout="responsive" width="480" height="270"></amp-youtube>` | {{ image('/static/img/courses/beginner/image15.png', 311, 550) }} |

The goal when building out your AMP sites is to use AMP components whenever possible. Components maximize the performance benefits of building with AMP, because you don’t have to create something that already exists, thereby leveraging the work of the AMP library authors.

Almost all AMP components are run by at least some JavaScript. For some AMP components (like `<amp-img>`), the JavaScript is built directly into the AMP runtime script you included at the top of your page in the boilerplate. For most AMP components, you’ll need to include a separate script tag. And there’s a good reason for that: You only include the scripts you actually use in your site. Then, users only have to download the code necessary to browse your page. Less code to download means that your site will load faster!

## Exercise 3: Our First Component - `<amp-img>`

Most HTML tags can be used directly in AMP, but certain tags, such as the `<img>` tag, must be replaced with equivalent AMP components. These components incorporate built-in best practices in accessibility, responsiveness, and performance.

For example, in the case of `<amp-img>`, AMP requires us to specify the dimensions of the image. AMP needs to understand the layout of the page before assets (such as images) load. This improves the user experience when your page is loading, but before the image assets have been downloaded. When the images are downloaded, they can be inserted into the page without causing any existing content on the page to move around. This gives the AMP runtime room to decide when to load image assets based on the capabilities of the user’s device and internet connection.

[tip type="note"]
**Note**: If you want to know more about AMP’s automatic optimizations, you can read about lazy-loading in AMP in the [appendix]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/appendix.md', locale=doc.locale).url.path}}).
[/tip]

To use the component and to resolve the `<amp-img>` validation error from earlier, replace the existing img tag in our page with the AMP equivalent.
Hint: instead of `<img …>`, write `<amp-img …>` and give your image fixed dimensions. Give the image a `width` of `640` and a `height` of `480`.

If necessary, reference the documentation for `<amp-img>` [here]({{g.doc('/content/amp-dev/documentation/components/amp-img.md', locale=doc.locale).url.path}}).

### Solution

The portion of the page containing the image should look like this:

[sourcecode:html]
{% raw %}<amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746" width=”640” height="480"></amp-img>
{% endraw %}[/sourcecode]

[tip type="note"]
**Note**:: Check the AMP Validator extension. If you’ve completed this exercise successfully, the extension icon should be green. If so, congratulations! Your page is now valid AMP!
[/tip]

## Arranging and Sizing Components

The next problem we need to troubleshoot has to do with how our page looks. You won’t notice it on a large desktop monitor, but it’s easy to see what’s wrong when we look at the site on a mobile device.

{{ image('/static/img/courses/beginner/image23.png', 311, 550,  align='center third', caption='The image of the bicycle runs off the edge of the screen') }}

The image we added to the page doesn’t shrink to fit smaller screens; it just spills over the side. If we don’t specify a strategy for laying out the image and resizing it, it’s going to default to a fixed width and height as we specified in our code. Luckily, we can fix this issue using AMP's layout system.

We are going to give our image a `layout` of type `responsive` so that it automatically scales as the window is resized. The responsive layout causes the image to assume the dimensions of the parent container, all while respecting the original aspect ratio. If the parent container is only 320 pixels wide, the image will maintain its aspect ratio and be resized to 320x240 (instead of 640x480).

Add the `layout` attribute to our image. If done correctly, it will looks something like this:

[sourcecode:html]
{% raw %}<amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746" layout="responsive" width="640" height="480"></amp-img>
{% endraw %}[/sourcecode]

After you have made the change, take a look at your page. The image has the correct aspect ratio and responsively fills the width of the screen. Problem solved.

{{ image('/static/img/courses/beginner/image26.png', 311, 550,  align='center third', caption='Image of bicycle with correct aspect ratio') }}

There are other layout types beyond responsive (at least 8 in total, in fact).
For example, the `fixed` layout indicates that the component should never be resized from the height and width that are assigned to it. The `intrinsic` layout is similar to the `responsive` layout, except that it has the concept of an intrinsic height and width that cannot be exceeded by the component. Some layouts can only be applied to certain components. The documentation for each component will specify which layouts are valid for that component. You can read about the rest of the layout types [here]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.md', locale=doc.locale).url.path}}).

If you want to become a successful AMP developer, learning how to use the layout system is critical. All of the layouts that AMP provides can be implemented using plain CSS, but often they can be complicated or have tricky edge cases that require deep knowledge to work around. AMP simplifies the process and exposes many of these layout options to be used on any element in your AMP page. Check out the
[official documentation]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/index.md', locale=doc.locale).url.path}}) for more information about the layout system.

[tip type="tip"]
**Tip**: Try selecting different mobile devices from the dropdown menu (see screenshot below) to see how the image adapts to different screen sizes. It’s good practice to test your site on different screen sizes. Browsers on actual mobile devices may behave differently, so when possible, test your webpage on real devices too.

{{ image('/static/img/courses/beginner/image4.png', 297, 380,  align='center half', caption='Dropdown list of devices in Chrome') }}
[/tip]

## Exercise 4: Embedding Video

Next, let’s embed a YouTube video in our document. Our marketing team at Chico’s Bikes released [this](https://www.youtube.com/watch?v=BlpMQ7fMCzA) video of one of our cheese bikes being constructed.

Use the [`<amp-youtube>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}) documentation to embed this YouTube video under the `<amp-img>` component with the following settings:

- Set the video id to `BlpMQ7fMCzA`.

- Make the video layout `responsive`.

- **Note**: Don't forget to add the script to the `<head>`.

Recommended style guidelines:

- Set the element `width` to `480` and the `height` to `270`.

[tip type="read-on"]
**Hint**: The documentation contains examples of how to use the `<amp-youtube>`component. For this exercise, it’s sufficient to copy one of those examples and adapt it to the requirements above.[/tip]

After you have made the changes, look at your page. You should now see the YouTube video:

{{ image('/static/img/courses/beginner/image18.png', 311, 550,  align='center third', caption='Image of the YouTube video in the page') }}

### Solution

[sourcecode:html]
{% raw %}<amp-youtube data-videoid="BlpMQ7fMCzA" layout="responsive" width="480" height="270"></amp-youtube>
{% endraw %}[/sourcecode]

Remember to include the `<amp-youtube>` script in the `<head>`:

```
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

[tip type="note"]
**Note**: AMP also includes support for other video players. Check out "[Integrating Videos in AMP an Overview](https://ampbyexample.com/advanced/integrating_videos_in_amp_an_overview/)" on AMP by Example.[/tip]

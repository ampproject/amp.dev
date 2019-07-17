---
$title: Making Components Work Together
$order: 4
---

## Adding Interactions To The Image Carousel

In the previous course, we added a carousel of images to our site. Now, we want to improve this feature. It's common in web development to release a feature on our sites and then iteratively improve it over time as we collect user feedback.

We received the following feedback about our carousel from testers:

* "I want to jump right to a particular slide."

* "I can't tell which slide I'm on."

* "The images are too small. I can't see image details."

Based on this feedback, our product manager at Chico's Cheese Bikes has come up with a plan to address these concerns with the image carousel. We're going to make the following improvements to our image carousel:

* Clicking an image in the horizontal list of thumbnails should move the carousel to the corresponding slide.

* Clicking on the carousel image slide should make an enlarged version of the image appear in a pop-up.

Ultimately, we're adding a few thumbnail images below the carousel. Those thumbnails will match up with the carousel, just like our testers wanted.

We will implement these requirements one at a time. Along the way, we'll bring in additional AMP components and connect them with events and actions. We will also learn how to build more elaborate user interface designs by combining components and making them work together.

## Exercise 5: Adding Thumbnail Previews

The first step is to add a set of thumbnail preview images below our existing image carousel. The existing carousel only shows one image at a time, because its `type` is set to `slides`. The default `type` for a carousel is `carousel`. Instead of showing a single image at a time, it shows all the images inside of the carousel scrollable horizontally. We can make thumbnails by reducing the size of the images in the second carousel.

However, we also need to make it so that clicking an image in the set of thumbnails also advances the carousel to the corresponding slide. We can understand this requirement as a combination of two simpler requirements: 1) detecting when a slide is clicked, and 2) changing the slide of a carousel.

Earlier, in the [Handling User Interaction]({{g.doc('/content/amp-dev/documentation/courses/intermediate-course/handling-user-interactions.md', locale=doc.locale).url.path}}) section of this training, we talked about events and actions. "Detecting a click" sounds like an event. "Changing a slide" sounds like an action. We register for events using the `on` attribute. The `tap` event is a way to detect when something is clicked or touched on a touchscreen. We can handle this event on each of the images in our thumbnails carousel.

Actions are like functions we can call on components to make them change. We need to find the action that changes the selected slide of a carousel. To do this, we look at the behavior section of the [`<amp-carousel>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-carousel.md', locale=doc.locale).url.path}}) documentation. There, we see that the action `goToSlide()` advances the carousel to a specific slide. The `goToSlide()` action is used like a function method: `carousel-id.goToSlide(index=N)`. Here, `carousel-id` is the ID of the larger carousel component and `N` is the zero-index number of the clicked image (zero-index means that the first image is 0, the second image is 1, and so on).

For example, if we had the following carousel:

[sourcecode:html]
{% raw %}<amp-carousel id="myCustomCarousel" type="slides" ...>
    ...
</amp-carousel>
{% endraw %}[/sourcecode]

Then clicking the following button would set the above carousel to its second slide:

[sourcecode:html]
{% raw %}<button on="tap:myCustomCarousel.goToSlide(index=1)">
   Set Carousel To Second Slide (Index 1)
</button>
{% endraw %}[/sourcecode]

With this information, add a thumbnail carousel below the existing carousel using the smaller images in the `assets` folder, with the following settings:

* Add an `<amp-carousel>` with a type of `carousel` and `fixed-height` layout type.

* Give each thumbnail image a `fixed` layout type.

* Add the images named `cheddar-chaser-thumb`, `cheese-thumb`, and `mouse-thumb` to the carousel, in that order.

* Make it so that when a thumbnail image is clicked, the corresponding image in the original carousel is shown. **Hint**: The original carousel should have an ID of `carousel`. The thumbnail images have index 0, 1, and 2 in the carousel, respectively.

* Make sure that the images have an appropriate `tabindex` and a role of `button`.

Recommended style guidelines:

* Give the thumbnail carousel a `height` of 78.

* Give the thumbnail carousel a `thumbnail-carousel` class.

* Give each thumbnail image the following size attributes: `width="96"` `height="72"`.

Once you are done, your page should look like this:

{{ image('/static/img/courses/intermediate/image7.png', 310, 552, align='center third', caption='The carousel with the image thumbnails') }}

### Solution

[sourcecode:html]
{% raw %}<amp-carousel layout="responsive" width="412" height="309" type="slides" loop id="carousel">
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser.jpg?1540228205366"
        width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese.jpg?1540228223785"
        width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse.jpg?1540228223963"
        width="412" height="309" layout="responsive"></amp-img>
</amp-carousel>
<amp-carousel class="thumbnail-carousel" layout="fixed-height" width="auto" height="78">
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser-thumb.jpg?1540228250623"
        on="tap:carousel.goToSlide(index=0)" width="96" height="72" layout="fixed" role="button" tabindex="0"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-thumb.jpg?1540228249992"
        on="tap:carousel.goToSlide(index=1)" width="96" height="72" layout="fixed" role="button" tabindex="1"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse-thumb.jpg?1540228249062"
        on="tap:carousel.goToSlide(index=2)" width="96" height="72" layout="fixed" role="button" tabindex="2"></amp-img>
</amp-carousel>
{% endraw %}[/sourcecode]

## Exercise 6: Tracking The Selected Thumbnail

Next, we want the thumbnail the user has selected to look different than the others, so that they know what they've selected. This isn't possible with what we've built so far, because there's no way to keep track of what slide the main carousel is on. In order to fulfill this requirement, we need an AMP component that lets a user make a selection from a list and keeps track of their choice.

The [`<amp-selector>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-selector.md', locale=doc.locale).url.path}}) component presents a menu of options and lets the user select from among them. Any HTML or other AMP components can be contained and deeply nested within an `<amp-selector>` component (except another `<amp-selector>` component). The selectable options are determined by the elements and/or components that have an `option` attribute. Whenever an option is selected, that element or component is also given a `selected` attribute. The `selected` attribute is targetable by CSS, so we can use it to add a unique style to the currently selected image.

If we were to implement the `<amp-selector>` right now, we'd notice that the selected thumbnail doesn't change if the user manually changes the slide on the larger carousel. We need a way to detect when the slide changes on the larger carousel and use that as a trigger to set the selected thumbnail in the `<amp-selector>` component. "Detect when the slide changes" sounds like an event. "Set the selected thumbnail" sounds like an action. In the [documentation]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md', locale=doc.locale).url.path}}), we see that `<amp-carousel>` lets you use a `slideChange` event for carousels of type `slides` where the index of the new slide is `event.index`. This lets you know when the carousel has moved to a given slide.

We also see in the [documentation]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md', locale=doc.locale).url.path}}) that `<amp-selector>` exposes an action called `toggle` that takes an index and add or removes `selected` from the corresponding option. If the `<amp-selector>` component only allows a single selection, then toggling a different option also causes the `selected` status to be removed from all other options.

Implement the ability to visually distinguish the selected thumbnail with the following specifications:

* Add an `<amp-selector>` component with ID `ampSelector`, name `single_image_select`, and layout `container` that surrounds the `<amp-carousel>` of thumbnail images.

* Add an `option` attribute to each thumbnail image component with a `value` that matches the index of the image in the carousel.

* Add an event handler to the larger image carousel that toggles the appropriate image option when the slide changes for the carousel.

Recommended style guidelines:

* As long as you've followed the guidelines, the styles are already included in the CSS at the top of the file and do not require editing. If you want to look at the rules, you can see them with the identifiers `amp-selector amp-img[option]` and `amp-selector amp-img[option][selected]`.

Once you have finished, the result should look like this:

{{ image('/static/img/courses/intermediate/image11.png', 312, 553, align='center third', caption='Image of the styled thumbnail carousel') }}

### Solution

[sourcecode:html]
{% raw %}<amp-carousel on="slideChange:ampSelector.toggle(index=event.index)"
    layout="responsive" width="412" height="309" type="slides" loop id="carousel">
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser.jpg?1540228205366"
        width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese.jpg?1540228223785"
        width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse.jpg?1540228223963"
        width="412" height="309" layout="responsive"></amp-img>
</amp-carousel>
<amp-selector layout="container" name="single_image_select" id="ampSelector">
    <amp-carousel class="thumbnail-carousel" layout="fixed-height" width="auto" height="78">
        <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser-thumb.jpg?1540228250623"
            option="0" selected on="tap:carousel.goToSlide(index=0)" tabindex="1" role="button"
            width="96" height="72" layout="fixed"></amp-img>
        <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-thumb.jpg?1540228249992"
            option="1" on="tap:carousel.goToSlide(index=1)" tabindex="1" role="button"
            width="96" height="72" layout="fixed"></amp-img>
        <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse-thumb.jpg?1540228249062"
            option="2" on="tap:carousel.goToSlide(index=2)" tabindex="1" role="button"
            width="96" height="72" layout="fixed"></amp-img>
    </amp-carousel>
</amp-selector>
{% endraw %}[/sourcecode]

Remember to include the `<amp-selector>` library in the `<head>`:

[sourcecode:html]
{% raw %}<script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
{% endraw %}[/sourcecode]

## Exercise 7: Zooming In On a Carousel Image

Lastly, we want to zoom in on a carousel image when a user clicks on it so that it shows up in more detail. A popular way to achieve this is with a lightbox. A lightbox component takes an element such as an image and places it above the rest of the content on the page. So you can focus on that image or element, the rest of the page gets partially obscured by a semi-transparent background.

The [`<amp-image-lightbox>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-image-lightbox.md', locale=doc.locale).url.path}}) is a full-screen popup component that implements the lightbox pattern. If you include the ID of an `<amp-image-lightbox>` in an event-handler of an `<amp-img>` component, then a lightbox containing that image appears and expands until the lightbox fills the entire screen. For example, add the following code to the large image at the top of our page to see how the lightbox approach works:

[sourcecode:html]
{% raw %}<amp-image-lightbox id="ricotta-racer-lightbox" layout="nodisplay"></amp-image-lightbox>
<amp-img on="tap:ricotta-racer-lightbox" role="button" tabindex="0" src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746" layout="responsive" width="640" height="480"></amp-img>
{% endraw %}[/sourcecode]

Remember to include the `<amp-image-lightbox>` JavaScript in the `<head>`:

[sourcecode:html]
{% raw %}<script async custom-element="amp-image-lightbox" src="https://cdn.ampproject.org/v0/amp-image-lightbox-0.1.js"></script>
{% endraw %}[/sourcecode]

We could apply this approach to each image in our larger carousel to implement our requirement. However, there is an even more organic way to accomplish the same thing. The `<amp-lightbox-gallery>` component extends the behavior of the `<amp-img>` and `<amp-carousel>` components by adding a `lightbox` attribute. A component with the `lightbox` attribute will open a styled lightbox when clicked. There is no need to have an `<amp-image-lightbox>` to connect with, nor is there a need to have a click-handler on the image or carousel to open in the lightbox.

To implement the lightbox effect on our larger carousel:

* Add the `<amp-lightbox-gallery>` script to your `<head>`.

* Add the `lightbox` attribute to your larger `<amp-carousel>`.

### Solution

[sourcecode:html]
{% raw %}<amp-carousel on="slideChange:ampSelector.toggle(index=event.index)"
    layout="responsive" width="412" height="309" type="slides" loop id="carousel" lightbox>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser.jpg?1540228205366"
        width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese.jpg?1540228223785"
        width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse.jpg?1540228223963"
        width="412" height="309" layout="responsive"></amp-img>
</amp-carousel>
{% endraw %}[/sourcecode]

Remember to include the `<amp-lightbox-gallery>` library in the `<head>`:

[sourcecode:html]
{% raw %}<script async custom-element="amp-lightbox-gallery" src="https://cdn.ampproject.org/v0/amp-lightbox-gallery-0.1.js"></script>
{% endraw %}[/sourcecode]

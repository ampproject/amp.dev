---
$title: Finding the Right Component
$order: 5
---

## Navigating the AMP Component Documentation

So far, the components we’ve used have been fairly straightforward. For `<amp-img>` and `<amp-youtube>`, it was sufficient to visit the documentation, look at an example, and copy that to our site. For more advanced features of these components, or for more complicated components, we will need to read and absorb more information from the documentation.

In order to develop AMP sites effectively, it’s important to learn how to navigate the AMP component documentation. We will practice this skill extensively throughout each of the trainings in this series.

Next, we want to add a collection of images of cheese bike products for our users to scroll through. For this, we’ll use an image carousel component. A **carousel** is an element containing a set of items that can be swiped through like a slideshow. The AMP implementation of a carousel is the component: `<amp-carousel>`. This component is not built in, so you will need to add its script in the page's `<head>`.

When we look at the [documentation]({{g.doc('/content/amp-dev/documentation/components/reference/amp-carousel.md', locale=doc.locale).url.path}}) for `<amp-carousel>`, we’re looking for answers to questions such as:

- What does this component do?

- How do I use this component?

- How can I use attributes to customize this component?

- How do I style this component?

- Do I need to include an additional script to enable this component?

- What layouts does this component support?

{{ image('/static/img/courses/beginner/image25.webp', 1024, 771, caption='AMP documentation page for `<amp-carousel>`.') }}

Look at the following items in the [documentation]({{g.doc('/content/amp-dev/documentation/components/reference/amp-carousel.md', locale=doc.locale).url.path}}) of `<amp-carousel>`:

- **The description** - At the top of the documentation for every component is a brief description. It summarizes what the component is and why it exists.

- **The behavior section** - This section explains how the component works. It usually provides both some sample code as well as a preview of what the component looks like.

- **The list of attributes** - We talked about custom attributes in the previous section on web components. These allow us to customize our AMP component in certain ways. This section contains the list of different attributes, their possible values, and what the attributes control.

- **The styling section** - This section explains how to use CSS to change the appearance of this component. Beyond styling by tag name or ID, many components provide additional CSS classes that can be used to change the appearance of the component in certain states. For example, `<amp-carousel>` provides the class `.amp-carousel-button`, which allows developers to restyle the buttons that change the carousel slide.

- **The required script tag** - Located at the top of the documentation, this tag needs to be added to the `<head>` of our site to make the component work. Most components require these additional scripts in order to work.

- **The supported layouts** - We discussed the [layout]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.md', locale=doc.locale).url.path}}) attribute in a previous section. It controls the way the element is rendered on the screen. This section explains which layouts are valid for this component.

These items are listed in the documentation for almost all AMP components. Let’s explore the documentation using one of its examples:

[sourcecode:html]
{% raw %}<amp-carousel id="carousel-with-preview"
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

This carousel contains three images for users to slide through. The attributes of this carousel component instance (`id`, `width`, `height`, `layout`, and `type`) are split into three groups: [attributes common to all HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) (`id`), [attributes common to all AMP components]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/common_attributes.md', locale=doc.locale).url.path}}) (`width`, `height`, and `layout`), and attributes unique to the carousel component (`type`).

In the documentation for `<amp-carousel>`, we see that the component can have a `type` attribute. It shows that the valid inputs for `type` include `slides` and `carousel`.

This means that if you don’t specify a `type`, the default will be `carousel`.

[tip type="read-on"]
**Tip**: Some attributes do not require a value at all. These are called [boolean attributes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes). In these cases, the attribute has a default value of `false` and a value of `true` when attached to an element or component.
[/tip]

Many other custom attributes can be used with the `<amp-carousel>` component. When using an AMP component for the first time, look through the documentation to get a feel for all the ways that you can customize the appearance or behavior of the component through attributes.

## Exercise 5: Creating an Image Slideshow

Let’s practice using the documentation to add an `<amp-carousel>` to our project. Add a carousel under the `<p class="main-text">` element with the following settings:

- Give the carousel a `responsive` layout.

- Give the carousel a `type` of `slides`.

- Add three images to the carousel: `assets/cheddar-chaser.jpg`, `assets/cheese.jpg`, and `assets/mouse.jpg`.

- Make the carousel images loop back to the beginning if a user tries to advance beyond the last slide.

Recommended style guidelines:

- Give the carousel a `width` of `412` and a height of `309`.

- Give each image a `width` of `412` and a height of `309`.

After you have made the changes, look at the live page to check your work. Your page should look something like this:

{{ image('/static/img/courses/beginner/image9.png', 312, 552,  align='center third', caption='The carousel in our page.') }}

### Solution

Here is how the code you added might look in your project:

[sourcecode:html]
{% raw %}<amp-carousel layout="responsive" width="412" height="309" type="slides" loop>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser.jpg?1540228205366"
             width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese.jpg?1540228223785"
             width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse.jpg?1540228223963"
             width="412" height="309" layout="responsive"></amp-img>
</amp-carousel>
{% endraw %}[/sourcecode]

Remember to include the `<amp-carousel>` script in the `<head>`:

```
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

## Discovering New Components

As we continue to develop our cheese bike site, we won’t always know the name of the AMP component we want to add to implement some desired new feature. The AMP community has produced a large collection of components that handle many different types of functionality: ads and analytics, dynamic content, layout, media, presentation, and social. It’s typical when developing an AMP site to be given a set of requirements for a new feature, and then to search through the lists of AMP components in search of a component that fulfills those requirements.

The first way to discover new AMP components is to use your favorite search engine or the search functionality on the AMP project [site](https://amp.dev/). This is an effective way to go directly to the documentation for a component that you already know by name. Additionally, you can search for descriptions of components you’re interested in to find results. Searching “YouTube videos,” for example, will bring up `<amp-youtube>` as the first result. Similarly, searching “collapsible content” will bring up the `<amp-accordion>` component as the first result.

Another way to find components is to use the [AMP Components Reference]({{g.doc('/content/amp-dev/documentation/components/index.md', locale=doc.locale).url.path}}) page. It contains a list of the components supported by AMP. Each component entry includes the name of the component and a short description of what functionality the component provides. We can access the documentation for a component by clicking on its name. As we learned earlier, the documentation will go even deeper into the behavior of the component. Based on these bits of information, we should be able to determine whether the component will fulfill our needs or whether we need to search for a different component. In a future training, we will discuss what to do if no single component meets all of our requirements.

{{ image('/static/img/courses/beginner/image3.webp', 1024, 541, caption='The AMP Component Reference page.') }}

Finally, we might still have questions about how the component would act on our site, or we may be unclear about how to use the component in more complex ways. The [AMP By Example]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}}) section on amp.dev has pages showcasing many AMP components, showing a variety of ways to configure those components to meet common use cases in modern websites. Usually, you can get to the corresponding AMP By Example page for a component directly from its documentation.

{{ image('/static/img/courses/beginner/image7.webp', 1024, 699, caption='AMP By Example page for the `<amp-carousel>` component.') }}

## Exercise 6: Adding Social Sharing Links

Social media links are common in modern web pages. AMP provides us with ready-made link buttons that allow users to share your page on their social media with a single click, thereby helping you grow your user engagement.

Using the AMP documentation, add buttons below the `<amp-youtube>` component that let the user **share** our page with a single click. However, you will need to navigate and search within the [AMP Components Reference]({{g.doc('/content/amp-dev/documentation/components/index.md', locale=doc.locale).url.path}}) to find the relevant AMP component. (**Hint**: The title of this section should help you find what you’re looking for.)

Once you have located the correct component, click the name of the component to access its documentation. Use that documentation to add components that:

- Gives the user the option to share your page on the following platforms: Email, LinkedIn, Tumblr, and Twitter.

Recommended style guidelines:

- Wrap the AMP components in a `div` with a `social-bar` class.

- Give each AMP component a `width` and `height` of `44`.

After you have completed this task, your page should contain buttons for the user to share your site:

{{ image('/static/img/courses/beginner/image19.webp', 375, 668,  align='center third', caption='Social media buttons embedded in the page.') }}

### Solution

[sourcecode:html]
{% raw %}<div class="social-bar">
  <amp-social-share type="email" width="44" height="44"></amp-social-share>
  <amp-social-share type="linkedin" width="44" height="44"></amp-social-share>
  <amp-social-share type="tumblr" width="44" height="44"></amp-social-share>
  <amp-social-share type="twitter" width="44" height="44"></amp-social-share>
</div>
{% endraw %}[/sourcecode]

Remember to include the `<amp-social-share>` script in the `<head>`:

```
<script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>
```

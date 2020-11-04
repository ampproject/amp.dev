---
formats:
  - websites
$title: Ready-made interactivity with AMP components
$order: 2
description: This guide outlines interactive possibilities available in the AMP component library.
author: CrystalOnScript
contributors:
  - sbenz
---

This guide outlines interactive possibilities available in the [AMP component library](../../../components/index.html). The library provides ready-made elements that meet common and uncommon user interface needs. You are able to customize these components, and how they interact with users, to meet specific needs. Read-on to learn how to harness this to decrease initial build costs without losing adaptability.

# Ready-made interactive components

Many of the available components fulfill a single purpose of interactivity. Most can standalone, but a core principle of AMP is composability. Composability allows you to combine different AMP components together to implement a customized interaction. Most allow templating with [amp-mustache](https://amp.dev/documentation/components/amp-mustache/).

AMP offers the following ready-made interactive components:

*   [**amp-accordion**](../../../components/reference/amp-accordion.md): a stacked list of headers that collapse or expand content sections with user interaction.
*   [**amp-app-banner**](../../../components/reference/amp-app-banner.md): A wrapper and minimal UI for a cross-platform, fixed-position banner showing a call-to-action to install an app.
*   [**amp-autocomplete**](../../..//components/reference/amp-autocomplete.md): suggests completed results corresponding to the user input as they type.
*   [**amp-base-carousel**](../../../components/reference/amp-base-carousel.md): displays multiple similar pieces of content along a horizontal axis or vertical axis.
*   [**amp-carousel**](../../../components/reference/amp-carousel.md): displays multiple pieces of content along a horizontal axis that users can tap through.
*   [**amp-consent**](../../../components/reference/amp-consent.md): a UI control that collects and stores a user’s consent. Can block other AMP components based on user consent.
*   [**amp-date-picker**](../../../components/reference/amp-date-picker.md): a widget to select dates.
*   [**amp-form**](../../../components/reference/amp-form.md): creates forms, but with AMP powers.
*   [**amp-lightbox-gallery**](../../../components/reference/amp-lightbox-gallery.md): displays images in a lightbox gallery.
*   [**amp-image-lightbox**](../../../components/reference/amp-image-lightbox.md): Provides a lightbox effect for a specified image.
*   [**amp-image-slider**](../../../components/reference/amp-image-slider.md): A slider to compare two images.
*   [**amp-inline-gallery**](../../../components/reference/amp-inline-gallery.md): displays multiple images along a horizontal axis that users can tap through.
*   [**amp-inputmask**](../../../components/reference/amp-inputmask.md): provides input masking capabilities to inputs in AMP forms.
*   [**amp-lightbox**](../../../components/reference/amp-lightbox.md): displays elements in a full-viewport “lightbox” modal.
*   [**amp-mega-menu**](../../../components/reference/amp-mega-menu.md): Displays top-level navigational content inside expandable containers.
*   [**amp-nested-menu**](../../../components/reference/amp-nested-menu.md): Displays a drilldown menu with arbitrary levels of nested submenus.
*   [**amp-recaptcha-input**](../../../components/reference/amp-recaptcha-input.md): appends a reCAPTCHA v3 token to AMP form submissions.
*   [**amp-sidebar**](../../../components/reference/amp-sidebar.md): a way to display meta content intended for temporary access such as navigation, links, buttons, menus.
*   [**amp-truncate-text**](../../../components/reference/amp-truncate-text.md): Truncates text with an ellipsis, optionally showing an overflow element.
*   [**amp-user-notification**](../../../components/reference/amp-user-notification.md): Displays a dismissable notification to the user.
*   [**amp-video**](../../../components/reference/amp-video.md): Replaces the HTML5 video tag.
*   [**amp-video-docking**](../../../components/reference/amp-video-docking.md): unctionality for videos that minimize ("dock") to a corner or a custom position on scroll.

# Implementation patterns

Using an AMP component may be as easy copy and pasting the sample code! If not, you are able to specify functionality. Each component’s reference documentation outlines behavior and styling customization.

If you are unable to find a ready-made solution, think about how you could achieve the desired behavior by combining existing components. Combine multiple components or other HTML elements to create new ones! The AMP team is constantly surprised with the creative solutions developers have composed, some are featured in our [examples](../../../examples/index.html) (and if you create something cool we encourage you to [contribute it](https://github.com/ampproject/amp.dev/blob/future/contributing/samples.md)!). It’s impossible to document all the ways to combine AMP components, but this section outlines some best practices.

## Customize behavior with attributes

By using [common AMP attributes](../../learn/common_attributes.md) and element-specific attributes you can customize and combine components to fit your needs. Read the reference documentation to learn its specific attributes.

### Small behavior change

Some attributes will change a small behavior. In the example below, the [`amp-accordion`](../../../components/reference/amp-accordion.md) includes the [`animate`](../../../components/reference/amp-accordion.md#animate) attribute. This attribute adds a slight "roll down" animation to the expansion and collapse of each section when the user interacts with it.

[example preview="top-frame" playground="true" orientation="portrait" imports="amp-accordion"]
```html
<amp-accordion animate>
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
    <amp-img
      src="/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"
      alt="Photo of a squirrel"
    ></amp-img>
  </section>
</amp-accordion>
```
[/example]

## Combination and composition

Combine AMP components with other AMP components or HTML elements to improve or build more complex interactivity and user experiences. For example, combine [`amp-form`](../../../components/reference/amp-form.md) and [`amp-date-picker`](../../../components/reference/amp-date-picker.md) to create a booking flow.

[example preview="top-frame" playground="true" orientation="portrait" imports="amp-form, amp-date-picker"]
```html
<form method="post" action-xhr="/documentation/examples/api/submit-form-xhr" target="_top">
  <amp-date-picker id="form-picker" type="single" mode="static" layout="fixed-height" height="360" format="YYYY-MM-DD">
  </amp-date-picker>
  <input type="submit">
  <div submit-success>
    Thanks!
  </div>
</form>
```
[/example]

There are no limits on the number of components you may combine. The example below builds on the previous one. We’ve added [`amp-inputmask`](../../../components/reference/amp-inputmask.md) to communicate the type of input accepted from a user and [`amp-mustache`](../../../components/reference/amp-mustache.md) to relay a success message.

[example preview="top-frame" playground="true" orientation="portrait" imports="amp-form, amp-date-picker, amp-inputmask" template="amp-mustache"]
```html
<form class="sample-form" method="post" action-xhr="/documentation/examples/api/postal" target="_top">
  <amp-date-picker id="form-picker" type="single" mode="static" layout="fixed-height" height="360" format="YYYY-MM-DD">
  </amp-date-picker>
  <label>Phone: <input name="code" type="tel" mask="+\1_(000)_000-0000" placeholder="+1 (555) 555-5555" mask-output="alphanumeric"></label>
  <input type="submit">
  <div submit-success>
    <template type="amp-mustache">
      <p>The raw value: {% raw %}{{code}}{% endraw %}</p>
      <p>The unmasked value: {% raw %}{{code-unmasked}}{% endraw %}</p>
    </template>
  </div>
</form>
```
[/example]

The components listed at the beginning of the guides are a great way to get started with AMP. Familiarizing with these helps you get an overview of the different building blocks AMP provides.

## Actions and events

As outlined in [Interactivity foundations](foundations.md), AMP exposes globally available actions and events. Many of AMP’s components have their own component specific actions and events, made available by use of that component. [AMP’s action and event system](../../learn/amp-actions-and-events.md) is a powerful way to implement more complex interaction patterns. In the example below we open a lightbox on a successful form submission.

[example preview="top-frame" playground="true" orientation="portrait" imports="amp-form, amp-lightbox-gallery" template="amp-mustache"]
```html
<form on="submit-success:amp-lightbox-gallery.open(id='squirrel')" method="post" action-xhr="/documentation/examples/api/postal" target="_top">
  <label>Postal code: <input name="code" mask="L0L_0L0" placeholder="A1A 1A1"></label>
  <input type="submit">
  <div submit-success>
    <amp-img src="/static/inline-examples/images/squirrel.jpg" width="320" height="256" lightbox id="squirrel" alt="Photo of a squirrel"></amp-img>
  </div>
</form>
```
[/example]

Check out the actions and events overview page to learn more about the different kinds of actions and events available in AMP.

### Define reusable actions

If you are chaining multiple actions, you can define them together as a single and reusable action. Use the [amp-action-macro](../../../components/reference/amp-action-macro.md) component to create AMP action macros. Each action macro needs an id and an action to execute. Call the action macro by it’s id and pass the arguments that alter its behavior.

[example preview="top-frame" playground="true" imports="amp-action-macro"]
```html
<amp-action-macro
  id="navigate-action"
  execute="AMP.navigateTo(url='https://amp.dev/')"
></amp-action-macro>

<button on="tap:navigate-action.execute()">amp.dev</button>
```
[/example]

# Customization continued

This guide has just a few examples of the ways you can use ready-made components to build interactivity. If you have a need for a ready-made component that is not listed, you may file a [feature request](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type%3A+Feature+Request&template=feature_request.md&title=) or declare an [intent to implement](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=INTENT+TO+IMPLEMENT&template=intent-to-implement--i2i-.md&title=I2I%3A+%3Cyour+feature%2Fchange%3E) and [contribute](../../contribute/index.md) it yourself. Otherwise, check out [Building personalized interactive experiences](personalized_experiences.md) for highly customized integration options in AMP.
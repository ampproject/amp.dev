---
$title: AMP for Email best practices
$order: 1
$category: Develop
formats:
    - email
---

AMP allows for exciting new types of immersive and engaging content in email! When designing emails, keep in mind the following best practices to ensure they are performant, reliable across platforms, and work as your users expect.

#Speed

When using [`amp-list`](../../components/reference/amp-list-v0.1.md?format=email) to dynamically fetch content, include a placeholder to keep the integrity of the components structure. The placeholder should be as similar in layout as possible to the document after it's returned the requested data. This ensures the message size isn't changing or mutating the layout significantly.

#Usability and accessibility

- When using
  [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email), ensure the `controls` attribute is set. This lets users on touchscreen devices such as smartphones to navigate the carousel.
- When using [`amp-form`](../../components/reference/amp-form-v0.1.md?format=email), keep in mind not all input types are supported on iOS. Refer to [Supported Input Values](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) in the Safari HTML Reference for more information.
- Not all [`autocomplete` attribute values](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) are supported across different apps and browsers. Assume that autocomplete isn't available to your users and keep the forms short.

#Styling

- Make sure your email is only using [AMP for Email Supported CSS](../learn/email-spec/amp-email-css.md?format=email)
- Avoid using viewport units (`vw`, `vh`, `vmin` and `vmax`) anywhere in your CSS and HTML. Since AMP emails render inside an iframe, the viewport of the email doesn't match the browser's viewport.
- Different browsers have different default CSS styling. Use a CSS library that normalizes styles if needed. For more information about default styles, style normalization and a list of available libaries, see [Reboot, Resets, and Reasoning](https://css-tricks.com/reboot-resets-reasoning/).
- Be careful with overflowing margin in CSS: they may not get rendered due to [an AMP layout limitation](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241).

##Mobile

Ensure your message looks good on all screen sizes by using [CSS media queries](style_and_layout/control_layout.md?format=email) to identify the device. Messages should be tested on mobile devices to ensure the layout is correct and components work as expected.

#Other Gotchas

When working AMP for Email, keep in mind the following tips and tricks:

- The AMP for Email playground doesn't proxy XHRs, but some email providers do.
- The AMP MIME part should appear before the HTML MIME part in your email to ensure maximum compatibility across email clients.
- The `src` attribute of [`amp-list`](../../components/reference/amp-list-v0.1.md?format=email), [`action-xhr`](../../components/reference/amp-form-v0.1.md?format=email#action-xhr) of [`amp-form`](../../components/reference/amp-form-v0.1.md?format=email), the `src` for [`amp-img`](../../components/reference/amp-img-v0.1.md?format=email), or the href attribute of an `<a>` tag cannot be mutated by [`amp-bind`](../../components/reference/amp-bind-v0.1.md?format=email).
- Your messages should include a static HTML version in the event that a user is taken to the HTML version of the message, or if that user forwards the message.
- The AMP for Email format imposes a [byte limit on the size of the email](../learn/email-spec/amp-email-format/?format=email#required-markup). Prevent your email from falling back to static email due to exceeding the size limit by
    - Trimming your email and removing unnecessary content
    - Minimizing the number of hyperlinks in your email, whose URLs could be rewritten into very long URLs by ESPs and analytics platforms
    - Eliminating unncessary use of HTML constructs such as multiple nested `div`s that can be collapsed into one `div`
    - Minimizing whitespace characters in the [`on` attribute for events and actions](../learn/amp-email-actions-and-events/?format=email) and [`amp-bind` binding expressions](../../components/reference/amp-bind-v0.1.md?format=email#expressions)
    - Using tools like [HTML and CSS minifiers](https://github.com/kangax/html-minifier) to perform compressions such as:
        - Removing unnecessary whitespace characters (such as space and newline characters used for making the source code human-readable) in HTML and CSS
        - Removing comments in HTML and CSS
        - Removing [optional tags](https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission)
        - Minifying the length of ID and class names used in CSS selectors and HTML


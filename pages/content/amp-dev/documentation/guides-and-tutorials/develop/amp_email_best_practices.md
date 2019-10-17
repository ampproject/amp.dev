---
$title: AMP for Email best practices
$order: 1
$category: Develop
formats:
    - email
---

AMP allows for exciting new types of immersive and engaging content in email! When designing emails, keep in mind the following best practices to ensure they are performant, reliable across platforms, and work as your users expect.

#Speed

When using [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) to dynamically fetch content, include a placeholder to keep the integrity of the components structure. The placeholder should be as similar in layout as possible to the document after it's returned the requested data. This ensures the message size isn't changing or mutating the layout significantly.

#Mobile

Ensure your message looks good on all screen sizes by using [CSS media queries](style_and_layout/control_layout.md?format=email) to identify the device. Messages should be tested on mobile devices to ensure the layout is correct and components work as expected. Because swiping is a common action on mobile email apps, take proper steps to ensure your users can interact with your content. Components such as [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md?format=email) can include the [`controls`](../../../documentation/components/reference/amp-carousel.md?format=email#controls-(optional)) attribute to make the navigation buttons always visible on mobile.

#Other Gotchas

When working AMP for Email, keep in mind the following tips and tricks:

*   The AMP for Email playground doesn't proxy XHRs, but some email providers do.
*   The AMP MIME part should appear before the HTML MIME part in your email to ensure maximum compatibility across email clients.
*   The `src` attribute of [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email), [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) of [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), the `src` for [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email), or the href attribute of an `<a>` tag cannot be mutated by [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email).
*   Your messages should include a static HTML version in the event that a user is taken to the HTML version of the message, or if that user forwards the message.
*   Be careful with overflowing margin in CSS: they may not get rendered due to [an AMP layout limitation](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241).

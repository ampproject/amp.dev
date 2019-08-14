---
$title: Create a login-requiring AMP page
$order: 0
description: 'Some user interactions with a page, such as leaving a comment, could be conditioned by a login flow. You can implement a login flow ...'
numbered: 1
$hidden: true
formats:
  - websites
---
Some user interactions with a page, such as leaving a comment, could be conditioned by a login flow. You can implement a login flow with AMP by using the [`amp-access`](../../../../documentation/components/reference/amp-access.md) component combined with the [`amp-form`](../../../../documentation/components/reference/amp-form.md) component.

[tip type="tip"]
**TIP –** To see a sample implementation, visit the [comment section sample](../../../../documentation/examples/documentation/Comment_Section.html) at [ampbyexample.com](../../../../documentation/examples/index.html).
[/tip]

The [comment section sample](../../../../documentation/examples/documentation/Comment_Section.html) combines [`amp-access`](../../../../documentation/components/reference/amp-access.md) and [`amp-form`](../../../../documentation/components/reference/amp-form.md) to create a comment section which is enabled only when an user has logged in. In order to explain how this sample works, let's follow the set of actions that will be performed once you land on the page.

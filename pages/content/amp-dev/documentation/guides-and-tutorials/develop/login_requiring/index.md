---
$title: Create a login-requiring AMP page
$path: /documentation/guides-and-tutorials/develop/login_requiring/create-login.html
$order: 0
description: 'Some user interactions with a page, such as leaving a comment, could be conditioned by a login flow. You can implement a login flow ...'
numbered: 1
$hidden: true
formats:
  - websites
---
Some user interactions with a page, such as leaving a comment, could be conditioned by a login flow. You can implement a login flow with AMP by using the [`amp-access`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}}) component combined with the [`amp-form`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}) component.

[tip type="tip"]
**TIP –** To see a sample implementation, visit the [comment section sample]({{g.doc('/content/amp-dev/documentation/examples/documentation/Comment_Section.html', locale=doc.locale).url.path}}) at [ampbyexample.com]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}}).
[/tip]

The [comment section sample]({{g.doc('/content/amp-dev/documentation/examples/documentation/Comment_Section.html', locale=doc.locale).url.path}}) combines [`amp-access`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}}) and [`amp-form`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}) to create a comment section which is enabled only when an user has logged in. In order to explain how this sample works, let's follow the set of actions that will be performed once you land on the page.

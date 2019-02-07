---
$title: Create a login-requiring AMP page
$path: /documentation/guides-and-tutorials/develop/login_requiring/create-login.html
$order: 0
numbered: 1
$hidden: true
formats:
  - websites
---
Some user interactions with a page, such as leaving a comment, could be conditioned by a login flow. You can implement a login flow with AMP by using the [`amp-access`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}}) component combined with the [`amp-form`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}) component.

[tip type="tip"]
**TIP –** To see a sample implementation, visit the [comment section sample](https://ampbyexample.com/samples_templates/comment_section/) at [ampbyexample.com](https://ampbyexample.com).
[/tip]

The [comment section sample](https://ampbyexample.com/samples_templates/comment_section/) combines [`amp-access`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}}) and [`amp-form`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}) to create a comment section which is enabled only when an user has logged in. In order to explain how this sample works, let's follow the set of actions that will be performed once you land on the page.

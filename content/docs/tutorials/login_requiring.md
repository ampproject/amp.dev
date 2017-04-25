---
$title: Create a login-requiring AMP page
$order: 2
numbered: 1
---
Some user interactions with a page, such as leaving a comment, could be conditioned by a login flow. You can implement a login flow with AMP by using the [amp-access](https://www.ampproject.org/docs/reference/components/amp-access) component combined with the [amp-form](https://www.ampproject.org/docs/reference/components/amp-form) component.
{% call callout('Tip', type='success') %}
To see a sample implementation, visit the [comment section sample](https://ampbyexample.com/samples_templates/comment_section/) at [ampbyexample.com](https://ampbyexample.com).
{% endcall %}

The [comment section sample](https://ampbyexample.com/samples_templates/comment_section/) combines `amp-access` and `amp-form` to create a comment section which is enabled only when an user has logged in. In order to explain how this sample works, let's follow the set of actions that will be performed once you land on the page.

{% include "/views/partials/sub_nav.html" %}

<a class="button go-button" href="/docs/tutorials/login_requiring/login.html">Continue to Step 1</a>

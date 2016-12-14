---
$title: Add a comment
$order: 1
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

At this point, the user can add a comment using the `amp-form` library. Notice how the presence of the form is conditional, depending on the state `amp-access` component:

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

We specify a POST method and a XHR action, as non XHR actions are not allowed with POST methods in AMP.
Because this is a demo, we are not persisting comments, so it’s only possible to add one comment at the time; whenever a comment is added, the AMPByExample server replies with a JSON response containing the entered text with some additions, like a timestamp, an avatar and a name for the user.

Here's an example of said response:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

The form component will simply display those values inside the page using the [amp-mustache](https://ampbyexample.com/components/amp-mustache/) template:

[sourcecode:html]
<div submit-success>
<template type="amp-mustache">
      	<div class="comment-user">
              <amp-img width="44" class="user-avatar" height="44" alt="user" src="{{UserImg}}"></amp-img>
              <div class="card comment">
               <p><span class="user">{{User}}</span> <span class="date">{{Datetime}}</span></p>
               <p>{{Text}}</p>
              </div>
            </div>
      </template>
</div>
[/sourcecode]

Notice how the template is wrapped in a div with the `submit-success` attribute. We are only checking if the value of the comment is not empty in this sample; in case it’s empty we return an error that would cause to execute the code:

[sourcecode:html]
<div submit-error>
<template type="amp-mustache">
            Error! Looks like something went wrong with your comment, please try to submit it again.
      </template>
</div>
[/sourcecode]

To add a little detail to it, by using the attribute required, we are enforcing on the client side the presence of a text before hitting the Comment button:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

When you add a comment and click the submit button, you should now see something similar to the following screenshot:, you should see something similar to the snapshot below:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>

<a class="go-button button" href="/docs/get_started/login_requiring/logout.html">Continue to Step 3</a>

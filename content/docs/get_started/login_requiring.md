---
$title: Create a login-requiring AMP page
$order: 3
---
Some user interactions with a page, such as leaving a comment, could be conditioned by a login flow. A login flow can be implemented with AMP using the [amp-access](https://www.ampproject.org/docs/reference/components/amp-access) component combined with the [amp-form](https://www.ampproject.org/docs/reference/components/amp-form) component. 
To see a sample implementation, visit the [comment section sample](https://ampbyexample.com/samples_templates/comment_section/) at [ampbyexample.com](https://ampbyexample.com).

The [comment section sample](https://ampbyexample.com/samples_templates/comment_section/) combines `amp-access` and `amp-form` to realize a comment section which is enabled only when an user has logged in. In order to explain how this sample works, we will follow the set of actions that will be performed once you land on the page.

## Login

The first time you land on the page, you can see 2 comments and a login button. 

<amp-img src="/static/img/login-button.png" alt="Login button" height="290" width="300"></amp-img>

If you look for the login button in the code, you will find:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
          <h5>Please login to comment</h5>
          <a on="tap:amp-access.login-sign-in" class="button button-primary comment-button">Login</a>  
</span> 
[/sourcecode]

The span element is conditioned by the `amp-access` attribute with the value `NOT logged in`. 

Here it follows the configuration for amp-access:

[sourcecode:html]
<script id="amp-access" type="application/json">
  {
    "authorization": "https://ampbyexample.com/samples_templates/comment_section/authorization?rid=READER_ID&url=CANONICAL_URL&ref=DOCUMENT_REFERRER&_=RANDOM",
    "noPingback": "true",
    "login": {
      "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
      "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
    },
    "authorizationFallbackResponse": {
      "error": true,
      "loggedIn": false
    }
  }
</script>
[/sourcecode]

The authorization endpoint is deployed as part of AMPByExample. It’s in fact responsibility of the publisher of the page to provide this endpoint. In the sample case, for simplicity sake, we implemented a simple logic where when this request is received, the server reads the value of a cookie called `ABE_LOGGED_IN`. If the cookie is not there, we return a json containing `loggedIn = false`. This means that the first time you land on the page, this request will return `loggedIn = false` and the login button will be shown.

Looking again at the button HTML code, by using `on="tap:amp-access.login-sign-in"`, we specify that once the user taps on the button, the URL specified in the JSON above should be used:

[sourcecode:json]
{ 
	"login": {
          "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

Notice that it’s possible to define different URLs inside the login node, in this case we are defining `sign-in`, we will later define `sign-out`

The login page is a normal HTML page in which we populate the login and password values for the sake of simplicity. Notice the usage of `returnURL` hidden input type, which is populated by the AMPByExample server via server-side templating. The server reads this value from a parameter called `return` automatically added by the AMP library to the sign-in URL. 

Find below an example of the value for the `return` parameter added to the request once you click on the login button, you can explore this value by using the Chrome dev console navigating to the Network tab.

<amp-img src="/static/img/return-parameter.png" alt="Return parameter" height="150" width="600"></amp-img>


Once the AMPByExample server receives the post request from the login page and the login and password are correct, it redirect to the `returnURL` we mentioned above appending the parameter `#success=true`. The AMP runtime can now authorize the page and finally allow you to add a comment.

It’s important to understand what the AMP runtime does and what the server should be doing, as the implementation of the server is responsibility of the publisher of the page. 

As a quick recap:

- The AMP runtime automatically adds the return parameter to the sign-in request specified inside the login JSON object 
-  The AMP runtime understands that should should close the login page and redirect to the page specified by the return URL parameter. 
-  The server should orchestrate the response once the user clicks on the login button


A more detailed explanation about this flow can also be found [here](https://www.ampproject.org/docs/reference/components/amp-access#login-flow). 

## Add a comment

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

At this point, you can add a comment using the `amp-form` library. Notice how the presence of the form is conditioned by the `amp-access` component:

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

We specify a POST method and a XHR action, as non XHR actions are not allowed with POST methods in AMP.
For sake of simplicity, we are not persisting comments, so it’s only possible to add a comment at the time; whenever a comment is added, the AMPByExample server replies with a json containing the entered text with some additions, like a timestamp, an avatar and a name for the user. 

Find an example of response below:

[sourcecode:json]
{"Datetime":"09:34:21", 
"User":"Charlie", 
"Text":"Hello!", 
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

The form component will simply display those value inside the page using [amp-mustache](https://ampbyexample.com/components/amp-mustache/) template:

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

A little bit further on this, by using the attribute required, we are enforcing on the client side the presence of a text before hitting the Comment button:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Now add a comment and click comment, you should see something similar to the snapshot below:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>

## Logout
Similar to the login button, the logout button is conditioned by the `amp-access` attribute:

[sourcecode:html]
<a amp-access="loggedIn" amp-access-hide role="button" tabindex="0" on="tap:amp-access.login-sign-out" class="button button-primary comment-button">Logout</a>
[/sourcecode]

The URL to be used once you click on the logout, is specified in the amp-access JSON configuration, as part of the login object:

[sourcecode:json]
{
"login": {
          "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
          "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
        }
}
[/sourcecode]

Similar to the login, when the AMPByExample server receives a logout requests, it uses the return URL query parameter automatically added by the AMP library and redirects to it adding `#success=true`. By this time, you are back on the initial page; the AMPByExample cookie previously created for the login page (called `ABE_LOGGED_IN`) would be cleared at this point.


## Conclusions
In this tutorial we explored how to combine `amp-access` and `amp-form` to realize a comment section enabled by a login. We focused mostly on how we used those 2 components more than documenting them, while describing how we implemented a sample published on [ampbyexample.com.](https://ampbyexample.com/) In order to show the interaction between the component and a server, the sample provides a simple backend implementation which uses a cookie to save the login status.
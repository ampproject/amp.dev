---
$title: Login
$order: 1
description: 'The first time you land on the page, you can see 2 comments and a login button. If you look for the login button in the code, you will find ...'
---

The first time you land on the [page](../../../../documentation/examples/previews/Comment_Section.html), you can see 2 comments and a login button.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

If you look for the login button in the code, you will find:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

The behaviour of [`amp-access`](../../../../documentation/components/reference/amp-access.md) related attributes are dependent on a page-wide configuration for [`amp-access`](../../../../documentation/components/reference/amp-access.md), in our case, this one:

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

The authorization endpoint is deployed as part of AMPByExample. It's the responsibility of the publisher of the page to provide this endpoint. In this sample case, for simplicity, we implemented basic logic so that when this request is received, the server reads the value of a cookie named `ABE_LOGGED_IN`. If the cookie is not there, we return a JSON response containing `loggedIn = false`. As a result, the first time a user lands on the page, this request will return `loggedIn = false` and the login button will be shown.

Looking again at the button's HTML code, by using `on="tap:amp-access.login-sign-in"`, we specify that once the user taps on the button, the URL specified in the JSON above should be used:

[sourcecode:json]
{
	"login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

[tip type="note"]
**NOTE –**  Notice that it’s possible to define different URLs inside the login node, in this case we are defining `sign-in`, and we will later define `sign-out`.
[/tip]

The login page is a non-AMP page in which we populate the login and password values for the sake of simplicity. Notice the usage of `returnURL` hidden input type, which is populated by the AMPByExample server via server-side templating. The server reads this value from a parameter called `return`, automatically added by the AMP library to the sign-in URL.

In the example below, the value for the `return` parameter is added to the request once you click the login button. You can explore this value by using the Chrome DevTools console and navigating to the Network tab.

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

Once the AMPByExample server receives the POST request from the login page and the login and password are correct, it redirects the request to the `returnURL` that we mentioned above, and appends the `#success=true` parameter. The AMP runtime can now authorize the page and finally allow you to add a comment.

It’s important to understand what the AMP runtime does and what the server should be doing, as the implementation of the server is the responsibility of the publisher of the page.

As a quick recap:

- The AMP runtime automatically adds the return parameter to the sign-in request specified inside the login JSON object
- The AMP runtime closes the login page and redirects to the page specified by the return URL parameter
- The server should orchestrate the response once the user clicks on the login button

[tip type="tip"]
**TIP –** A more detailed explanation about this flow can also be found in the [`amp-access`](../../../../documentation/components/reference/amp-access.md).
[/tip]

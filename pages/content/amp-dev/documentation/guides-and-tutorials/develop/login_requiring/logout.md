---
$title: Logout
$order: 2
---

Similar to the login button, the presence of the logout button is conditionally dependent on the state of the `amp-access` component:

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

When you click the Logout button, you are directed to the URL that you specified in the `amp-access` JSON configuration, as part of the login object:

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Similar to the login, when the AMPByExample server receives a logout request, it uses the return URL query parameter automatically added by the AMP library and redirects to it, adding `#success=true`. By this time, you are back on the initial page; the AMPByExample cookie previously created for the login page (called `ABE_LOGGED_IN`) would be cleared at this point.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/add_comment.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/summary.md', locale=doc.locale).url.path}}"><span class="arrow-next">Next</span></a>
</div>

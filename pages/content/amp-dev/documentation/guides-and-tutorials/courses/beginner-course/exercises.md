---
$title: Beginner Course Exercises
$order: 8
toc: true
---
[TOC]

## Draft for reference


[tip type="important"]
Tip of type important

Perform these validation checks *before* you process the request. This validation helps to provide protection against CSRF attacks, and avoids processing untrusted sources requests.
[/tip]


[tip type="read-on"]
Tip of type read on

For information on AMP Cache URL formats, see these resources:

- [Google AMP Cache Overview](https://developers.google.com/amp/cache/overview)
- [Cloudflare AMP Cache](https://amp.cloudflare.com/)
[/tip]

[sourcecode:html]
{% raw %}<amp-list credentials="include" 
    src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}

Source Code: html

  </template>
</amp-list>
{% endraw %}[/sourcecode]

[sourcecode:text]
Source-code: text
AMP-Same-Origin: true
[/sourcecode]

[sourcecode:javascript]
/*Source code javascript*/
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
  var unauthorized = 'Unauthorized Request';
  var origin;
  var allowedOrigins = [
     "https://example.com",
     "https://example-com.cdn.ampproject.org",
     "https://example.com.amp.cloudflare.com",
     "https://cdn.ampproject.org" ];
  var allowedSourceOrigin = "https://example.com";  //publisher's origin
  var sourceOrigin = req.query.__amp_source_origin;
}
[/sourcecode]

[sourcecode:shell]
source code shell
curl 'https://ampbyexample.com/json/examples.json?__amp_source_origin=https%3A%2F%2Fampbyexample.com' -H 'AMP-Same-Origin: true' -I
[/sourcecode]


[tip type="note"]
Tip of type note
For information on AMP Cache URL formats, see these resources:

- [Google AMP Cache Overview](https://developers.google.com/amp/cache/overview)
- [Cloudflare AMP Cache](https://amp.cloudflare.com/)
[/tip]

[tip type="default"]
Tip of type default
For information on AMP Cache URL formats, see these resources:

- [Google AMP Cache Overview](https://developers.google.com/amp/cache/overview)
- [Cloudflare AMP Cache](https://amp.cloudflare.com/)
[/tip]
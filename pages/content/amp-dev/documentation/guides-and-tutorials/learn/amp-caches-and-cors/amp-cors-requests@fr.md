---
"$title": CORS in AMP
order: '12'
formats:
- websites
- email
- stories
- ads
teaser:
  text: |2-

    Many AMP components and extensions take advantage of remote endpoints by
    using
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

Many AMP components and extensions take advantage of remote endpoints by using Cross-Origin Resource Sharing (CORS) requests. This document explains the key aspects of using CORS in AMP. To learn about CORS itself, see the [W3 CORS Spec](https://www.w3.org/TR/cors/).

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin-" data-md-type="link">Why do I need CORS for my own origin?</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">Utilizing cookies for CORS requests</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">CORS security in AMP</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">Verify CORS requests</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) Allow requests for specific CORS origins</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) Allow same-origin requests</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">Send CORS response headers</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered"><a href="#access-control-allow-origin-origin" data-md-type="link">Access-Control-Allow-Origin: </a></li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">Processing state changing requests</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">Example walkthrough: Handing CORS requests and responses</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">Testing CORS in AMP</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## Why do I need CORS for my own origin? <a name="why-do-i-need-cors-for-my-own-origin"></a>

You might be confused as to why you'd need CORS for requests to your own origin, let's dig into that.

AMP components that fetch dynamic data (e.g., amp-form, amp-list, etc.) make CORS requests to remote endpoints to retrieve the data. If your AMP page includes such components, you'll need to handle CORS so that those requests do not fail.

Let's illustrate this with an example:

Let's say you have an AMP page that lists products with prices. To update the prices on the page, the user clicks a button, which retrieves the latest prices from a JSON endpoint (done via the amp-list component). The JSON is on your domain.

Okay, so the page is *on my domain* and the JSON is *on my domain*. I see no problem!

Ah, mais comment votre utilisateur est-il arrivé sur votre page AMP ? S'agit-il d'une page mise en cache à laquelle il accède ? Il est fort probable que votre utilisateur n'ait pas accédé directement à votre page AMP, mais qu'il ait découvert votre page via une autre plateforme. Par exemple, la recherche Google utilise le cache AMP Google pour afficher rapidement les pages AMP ; ce sont des pages mises en cache qui sont diffusées à partir du cache AMP Google, qui est un domaine *différent*. Lorsque votre utilisateur clique sur le bouton pour mettre à jour les prix sur votre page, la page AMP mise en cache envoie une requête à votre domaine d'origine pour obtenir les prix, ce qui crée une discordance entre les origines (cache -> domaine d'origine). Pour permettre de telles requêtes d'origine croisée, vous devez gérer CORS, sinon la requête échouera.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript>     <img alt="CORS and Cache" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png">   </noscript></amp-img>

**Okay, what should I do?**

1. For AMP pages that fetch dynamic data, make sure you test the cached version of those pages; *don't just test on your own domain*. (See [Testing CORS in AMP](#testing-cors-in-amp) section below)
2. Follow the instructions in this document for handling CORS requests and responses.

## Utilizing cookies for CORS requests <a name="utilizing-cookies-for-cors-requests"></a>

Most AMP components that use CORS requests either automatically set the [credentials mode](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) or allow the author to optionally enable it. For example, the [`amp-list`](https://amp.dev/documentation/components/amp-list) component fetches dynamic content from a CORS JSON endpoint, and allows the author to set the credential mode through the `credentials` attribute.

*Example: Including personalized content in an amp-list via cookies*

[sourcecode:html]
<amp-list
  credentials="include"
  src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"
>
  <template type="amp-mustache">
    Your personal offer: ${% raw %}{{price}}{% endraw %}
  </template>
</amp-list>
[/sourcecode]

By specifying the credentials mode, the origin can include cookies in the CORS request and also set cookies in the response (subject to [third-party cookie restrictions](#third-party-cookie-restrictions)).

### Third-party cookie restrictions <a name="third-party-cookie-restrictions"></a>

The same third-party cookie restrictions specified in the browser also apply to the credentialed CORS requests in AMP. These restrictions depend on the browser and the platform, but for some browsers, the origin can only set cookies if the user has previously visited the origin in a 1st-party (top) window. Or, in other words, only after the user has directly visited the origin website itself. Given this, a service accessed via CORS cannot assume that it will be able to set cookies by default.

## CORS security in AMP <a name="cors-security-in-amp"></a>

To ensure valid and secure requests and responses for your AMP pages, you must:

1. [Verify the request](#verify-cors-requests).
2. [Send the appropriate response headers](#send-cors-response-headers).

If you're using Node in your backend, you can use the [AMP CORS middleware](https://www.npmjs.com/package/amp-toolbox-cors), which is part of the [AMP Toolbox](https://github.com/ampproject/amp-toolbox).

### Verify CORS requests <a name="verify-cors-requests"></a>

When your endpoint receives a CORS request:

1. [Verify that the CORS <code>Origin</code> header is an allowed origin (publisher's origin + AMP caches)](#verify-cors-header).
2. [If there isn't an Origin header, check that the request is from the same origin (via `AMP-Same-Origin`)](#allow-same-origin-requests).

#### 1) Allow requests for specific CORS origins <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

CORS endpoints receive the requesting origin via the `Origin` HTTP header. Endpoints should only allow requests from: (1) the publisher's own origin; and (2) every `cacheDomain` origin listed in [https://cdn.ampproject.org/caches.json](https://cdn.ampproject.org/caches.json).

For example, endpoints should allow requests from:

- Google AMP Cache subdomain: `https://<publisher's domain>.cdn.ampproject.org` <br>(for example, `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] Pour plus d'informations sur les formats d'URL de cache AMP, consultez ces ressources :

- [Google AMP Cache Overview](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) Allow same-origin requests <a name="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

For same-origin requests where the `Origin` header is missing, AMP sets the following custom header:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

Cet en-tête personnalisé est envoyé par le runtime AMP lorsqu'une requête XHR est effectuée sur la même origine (c'est-à-dire un document diffusé à partir d'une URL ne provenant pas du cache). Autorisez les requêtes qui contiennent l'en-tête `AMP-same-origin:true`.

### Send CORS response headers <a name="send-cors-response-headers"></a>

After verifying the CORS request, the resulting HTTP response must contain the following headers:

##### Access-Control-Allow-Origin: <origin> </origin><a name="access-control-allow-origin-origin"></a>

This header is a <a href="https://www.w3.org/TR/cors/">W3 CORS Spec</a> requirement, where <code>origin</code> refers to the requesting origin that was allowed via the CORS <code>Origin</code> request header (for example, <code>"https://<publisher's subdomain>.cdn.ampproject.org"</code>).

Although the W3 CORS spec allows the value of <code>*</code> to be returned in the response, for improved security, you should:

- If the `Origin` header is present, validate and echo the value of the <code><code data-md-type="codespan">Origin</code> header.

### Processing state changing requests <a name="processing-state-changing-requests"></a>

[tip type="important"] Perform these validation checks *before* you process the request. This validation helps to provide protection against CSRF attacks, and avoids processing untrusted sources requests. [/tip]

Before processing requests that could change the state of your system (for example, a user subscribes to or unsubscribes from a mailing list), check the following:

**If the `Origin` header is set**:

1. If the origin does not match one of the following values, stop and return an error response:

    - `<publisher's domain>.cdn.ampproject.org`
    - the publisher's origin (aka yours)

    where `*` represents a wildcard match, and not an actual asterisk ( * ).

2. Otherwise, process the request.

**If the `Origin` header is NOT set**:

1. Verify that the request contains the `AMP-Same-Origin: true` header. If the request does not contain this header, stop and return an error response.
2. Otherwise, process the request.

## Example walkthrough: Handing CORS requests and responses <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

There are two scenarios to account for in CORS requests to your endpoint:

1. A request from the same origin.
2. A request from a cached origin (from an AMP Cache).

Let's walk though these scenarios with an example. In our example, we manage the `example.com` site that hosts an AMP page named `article-amp.html.`The AMP page contains an `amp-list` to retrieve dynamic data from a `data.json` file that is also hosted on `example.com`. We want to process requests to our `data.json` file that come from our AMP page. These requests could be from the AMP page on the same origin (non-cached) or from the AMP page on a different origin (cached).

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript>     <img alt="CORS example" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png">   </noscript></amp-img>

### Allowed origins <a name="allowed-origins"></a>

Based on what we know about CORS and AMP (from [Verify CORS requests](#verify-cors-requests) above), for our example we will allow requests from the following domains:

- `example.com` --- Publisher's domain
- `example-com.cdn.ampproject.org` --- Google AMP Cache subdomain

### Response headers for allowed requests <a name="response-headers-for-allowed-requests"></a>

For requests from the allowed origins, our response will contain the following headers:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

These are additional response headers we might include in our CORS response:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### Pseudo CORS logic <a name="pseudo-cors-logic"></a>

Our logic for handling CORS requests and responses can be simplified into the following pseudo code:

[sourcecode:text]
IF CORS header present
   IF origin IN allowed-origins
      allow request & send response
   ELSE
      deny request
ELSE
   IF "AMP-Same-Origin: true"
      allow request & send response
   ELSE
      deny request
[/sourcecode]

#### CORS sample code <a name="cors-sample-code"></a>

Here's a sample JavaScript function that we could use to handle CORS requests and responses:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
  var unauthorized = 'Unauthorized Request';
  var origin;
  var allowedOrigins = [
    'https://example.com',
    'https://example-com.cdn.ampproject.org',
    'https://cdn.ampproject.org',
  ];
  var allowedSourceOrigin = 'https://example.com'; //publisher's origin
  // If same origin
  if (req.headers['amp-same-origin'] == 'true') {
    origin = sourceOrigin;
    // If allowed CORS origin & allowed source origin
  } else if (
    allowedOrigins.indexOf(req.headers.origin) != -1 &&
    sourceOrigin == allowedSourceOrigin
  ) {
    origin = req.headers.origin;
  } else {
    res.statusCode = 403;
    res.end(JSON.stringify({message: unauthorized}));
    throw unauthorized;
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**Note**: For a working code sample, see [amp-cors.js](https://github.com/ampproject/amphtml/blob/master/build-system/server/amp-cors.js).

### Scenario 1: Get request from AMP page on same origin <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

In the following scenario, the `article-amp.html` page requests the `data.json` file; the origins are the same.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript>     <img alt="CORS example" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png">   </noscript></amp-img>

If we examine the request, we'll find:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

As this request is from the same origin, there is no `Origin` header but the custom AMP request header of `AMP-Same-Origin: true` is present. We can allow this request as it's from the same origin (`https://example.com`).

Our response headers would be:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### Scenario 2: Get request from cached AMP page <a name="scenario-2-get-request-from-cached-amp-page"></a>

In the following scenario, the `article-amp.html` page cached on the Google AMP Cache requests the `data.json` file; the origins differ.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript>     <img alt="CORS example" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png">   </noscript></amp-img>

If we examine this request, we'll find:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

As this request contains an `Origin` header, we'll verify that it's from an allowed origin. We can allow this request as it's from an allowed origin.

Our response headers would be:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## Working with cached fonts <a name="working-with-cached-fonts"></a>

Google AMP Cache caches AMP HTML documents, images and fonts to optimize the speed of the AMP page. While making the AMP page fast, we also want to be careful in securing the cached resources. We will be making a change in how AMP cache responds it’s cached resources, typically for fonts, by respecting the origin’s `Access-Control-Allow-Origin` value.

### Past behavior (before October 2019) <a name="past-behavior-before-october-2019"></a>

Lorsqu'une page AMP chargeait `https://example.com/some/font.ttf` à partir de l'attribut `@font-face src`, AMP Cache mettait en cache le fichier de police et diffusait la ressource comme ci-dessous avec l'inconnue `Access-Control-Allow-Origin`.

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: *

### New behavior (October 2019 and after) <a name="new-behavior-october-2019-and-after"></a>

While the current implementation is permissive, this could lead to unexpected use of the fonts from cross-origin sites. In this change AMP Cache will start to respond with the exact same `Access-Control-Allow-Origin` value the origin server responds. To properly load the fonts from the cached AMP document, you will need to accept the AMP Cache origin via the header.

A sample implementation would be:

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
  var unauthorized = 'Unauthorized Request';
  var allowedOrigins = [
    'https://example.com',
    'https://example-com.cdn.ampproject.org',
  ];
  // If allowed CORS origin
  if (allowedOrigins.indexOf(req.headers.origin) != -1) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    res.statusCode = 403;
    res.end(JSON.stringify({message: unauthorized}));
    throw unauthorized;
  }
}
[/sourcecode]

As an example, if you wanted to load /some/font.ttf in `https://example.com/amp.html`, the origin server should respond with the Access-Control-Allow-Origin header as below.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript>     <img alt="CORS font example" src="https://amp.dev/static/img/docs/cors-font.jpg">   </noscript></amp-img>

[tip type="note"] If your font file is okay to be accessible from any origin, you can respond with a wild card `Access-Control-Allow-Origin`, AMP cache will also echo that value meaning it will be responding with `Access-Control-Allow-Origin: *`. If you already have this setting, there is no need in changing anything. [/tip]

We are planning to make this change around mid October 2019 and would expect every AMP publishers using self-hosted fonts to check if it’s affected.

#### Roll out plan <a name="roll-out-plan"></a>

- 2019-09-30: release contains more precise control over which domains this change applies to. This build should roll out over the course of this week.
- 2019-10-07: test domains will be enabled for manual testing.
- 2019-10-14: (but depending on how testing goes): the feature will be rolled out generally.

Follow the related [issue here.](https://github.com/ampproject/amphtml/issues/24834)

## Testing CORS in AMP <a name="testing-cors-in-amp"></a>

When you are testing your AMP pages, make sure to include tests from the cached versions of your AMP pages.

### Verify the page via the cache URL <a name="verify-the-page-via-the-cache-url"></a>

To ensure your cached AMP page renders and functions correctly:

1. From your browser, open the URL that the AMP Cache would use to access your AMP page. You can determine the cache URL format from this [tool on AMP By Example](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/).

    For example:

    - URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
    - AMP Cache URL format: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. Open your browser's development tools and verify that there are no errors and that all resources loaded correctly.

### Verify your server response headers <a name="verify-your-server-response-headers"></a>

You can use the `curl` command to verify that your server is sending the correct HTTP response headers. In the `curl` command, provide the request URL and any custom headers you wish to add.

**Syntax**: `curl <request-url> -H <custom-header> - I`

#### Test request from same origin <a name="test-request-from-same-origin"></a>

In a same-origin request, the AMP system adds the custom `AMP-Same-Origin:true` header.

Here's our curl command for testing a request from `https://ampbyexample.com` to the `examples.json` file (on the same domain):

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

The results from the command show the correct response headers (note: extra information was trimmed):

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### Test request from cached AMP page <a name="test-request-from-cached-amp-page"></a>

Dans une requête CORS ne provenant pas du même domaine (c'est-à-dire du cache), l'en-tête `origin` fait partie de la requête.

Here's our curl command for testing a request from the cached AMP page on the Google AMP Cache to the `examples.json` file:

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

The results from the command show the correct response headers:

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```

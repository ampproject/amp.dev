---
$title: AMP Cache URL Format and Request Handling
$order: 9
toc: false
formats:
  - websites
  - stories
  - ads
author: Gregable
contributors:
  - sebastianbenz
---

In this document, you'll learn about the AMP Cache URL format and how it handles requests.

## URL Format

When possible, the Google AMP Cache will create a subdomain for each AMP document's domain by first converting it from [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) to UTF-8. The caches replaces every `-` (dash) with `--` (2 dashes) and replace every `.` (dot) with `-` (dash). For example, `pub.com` will map to `pub-com.cdn.ampproject.org`.

You can use this URL calculator to convert an URL into an AMP cache version:

<div>
<amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div>
</amp-iframe>
</div>

[tip type="tip"]
  Use the [AMP-Toolbox Cache URL](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) [Node.js](https://nodejs.org) module to translate a URL from the origin to the AMP Cache URL format.
[/tip]

This document describes:

*   The URL structure on an AMP Cache.
*   How to predict how your URLs will appear on an AMP cache.
*   How to reverse an AMP Cache Origin header to determine what its publisher domain was.


## Domain Name Protocol

All documents use https protocol on AMP caches.

## Domain Name Suffix

All AMP Caches are registered in a JSON file, found online on the [AMPHTML Repository](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json). An example cache record in this file will look like:


```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

An AMP Cache serves records on the domain specified by `cacheDomain`. In this case, the domain is `cdn.ampproject.org`.

This document uses URLs with `cdn.ampproject.org` as examples, but other caches typically use a similar URL structure.

## Domain Name Prefix

An AMP Cache serves documents on an altered URL, such as `example-com.cdn.ampproject.org`. The first dotted component of the original domain name in the example, `example.com`, becomes `example-com`. This document refers to this non-dotted string, `example-com`, as the “domain prefix”. See below for the algorithm that performs this transformation.

Multiple dotted components are not used in this prefix, such as `example.com.cdn.ampproject.org`, due to the constraint of https (TLS) certificates, [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1):


```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```


Publisher domains can be up to 255 characters in length, while each domain prefix is limited to 63 characters, as per [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11) which reads:


```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

All publisher domains map to a unique domain prefix. The algorithm for doing so attempts to make the mapping human-readable. However, mapping reverts to using a secure hashing for publisher domains if they are too long, and in the cases described below:


### Basic Algorithm

The basic algorithm for converting a publisher domain to a domain prefix is as follows:

1.  Punycode Decode the publisher domain. See [RFC 3492](https://tools.ietf.org/html/rfc3492)
1.  Replace any "`-`" (hyphen) character in the output of step 1 with "`--`" (two hyphens).
1.  Replace any "`.`" (dot) character in the output of step 2 with "`-`" (hyphen).
1.  If the output of step 3 has a "`-`" (hyphen) at both positions 3 and 4, then to the output of step 3, add a prefix of "`0-`" and add a suffix of "`-0`". See [#26205](https://github.com/ampproject/amphtml/issues/26205) for background.
1.  Punycode Encode the output of step 3. See [RFC 3492](https://tools.ietf.org/html/rfc3492)

A few examples of the basic algorithm:

<table>
  <tr>
   <td><strong>Publisher Domain</strong>
   </td>
   <td><strong>Domain Prefix</strong>
   </td>
  </tr>
  <tr>
   <td><code>example.com</code>
   </td>
   <td><code>example-com</code>
   </td>
  </tr>
  <tr>
   <td><code>foo.example.com</code>
   </td>
   <td><code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td><code>foo-example.com</code>
   </td>
   <td><code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td><code>xn--57hw060o.com</code> (⚡😊.com)
   </td>
   <td><code>xn---com-p33b41770a</code> (⚡😊-com)
   </td>
  </tr>
  <tr>
   <td><code>en-us.example.com</code>
   </td>
   <td><code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>


After running the basic algorithm, if and only if the domain prefix is not a valid DNS label, we run the Fallback Algorithm described below.

A domain prefix is not a valid DNS label if it is longer than 63 characters


### Fallback Algorithm

The fallback algorithm for converting a publisher domain to a domain prefix is as follows:

1.  Hash the publisher’s domain using SHA256.
1.  Base32 Escape the output of step 1.
1.  Remove the last 4 characters from the output of step 2, which are always `=` (equals) characters.

The fallback algorithm will produce a 52 character string such as the following with no `-` (hyphen): `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.


### Combined Algorithm

The combined algorithm is:

1.  Run the Basic Algorithm. If the output is a valid DNS label, append the Cache domain suffix and return, for example `example-com.cdn.ampproject.org`. Otherwise continue to step 2.
1.  Run the Fallback Algorithm. Append the Cache domain suffix and return, for example: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`


## URL Path

The “path” of a URL on the AMP Cache is always comprised of one or more prefix directories, such as `/c`, followed by a `/s` infix only if the publisher URL is http `s`, followed by the URL of the publisher document without the protocol.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Image displaying cached URL formats') }}

The prefix directories, such as `/c` correspond to different types of serving that an AMP Cache may perform. Different AMP Caches may support different serving types, and this is not an exhaustive list:

* `/c` - <strong>C</strong>ontent: This is an AMP document served as a standalone page which may be linked to directly in some interfaces.
* `/v` - <strong>V</strong>iewer: This is also an AMP document, but is served in an [AMP Viewer](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer) which is a frame environment that displays an AMP document in the context of a Search Result Page or other interface.
* `/wp` - <strong>W</strong>eb <strong>P</strong>ackage: This is an AMP document served as a [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/), a Web Package technology. These URLs act as redirects to the publisher’s own origin.
* `/cert` - <strong>Cert</strong>ificate: This is a public certificate for use with a [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/).
* `/i` - <strong>I</strong>mage: This is an image served by the AMP cache, typically as a document subresource.
* `/ii` - <strong>I</strong>mage: This is also an image served by the AMP Cache, but is typically may be combined with other cache-configuring parameters such as `/ii/w800` which indicates a maximum-width that the document is requesting. The cache can produce images with a different scale here in order to save bandwidth for the browser.

In addition, AMP Caches may choose append special query parameters to the document URL which are not part of the publisher document query. For example, [`<amp-live-list>`](../../../components/reference/amp-live-list.md) makes refresh requests by fetching a document with the parameter `amp_latest_update_time<`. These parameters are not passed to the origin when the document is crawled, but are strictly present to configure the request to the AMP Cache.

## CORS Origins

Many publishers use CORS requests from their AMP document to retrieve extra data. CORS requests work by sending an `Origin:` HTTP header in the request specifying the origin of the document making the request. As seen above, the origin of the document is different on an AMP Cache than on the original document. In the domain name sections above, you can find the algorithm for determining the Origin of an AMP Cache URL given a publisher URL. Below we specify the reverse algorithm for deciphering a CORS `Origin:` request header back to an original publisher domain.


### AMP Cache Origin to Publisher Domain

An AMP Cache Origin header value will look like one of the following examples:



* `https://www-example-com.cdn.ampproject.org`
* `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

First, remove the protocol prefix (`https://`) and the AMP Cache domain suffix, such as `.cdn.ampproject.org`. The suffix may be from any one of the caches listed in [caches.json](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json). The remaining string will be the “domain prefix”. In the case of the above two examples, the “domain prefix is:



*   `www-example-com`
*   `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

Next, check to see if the “domain prefix” contains at least one ‘`-`’ (hyphen). Containing one or more hyphens is the most common case by far. If the “domain prefix” does not contain at least one ‘`-`’ (hyphen), the AMP Cache Origin cannot be reversed directly. Instead, if you know the set of possible publisher domains, you can create the set of AMP Cache Origins using the Domain Name algorithm further above in this document. You can then validate against the fixed set.

The rest of the algorithm assumes that the “domain prefix” contains at least one ‘`-`’ (hyphen).



1.  If the domain prefix starts with `xn--`, punycode decode the “domain prefix”. For example `xn---com-p33b41770a` becomes `⚡😊-com`. See [RFC 3492](https://tools.ietf.org/html/rfc3492) for punycode.
1.  If the domain prefix starts with "`0-`" and ends with "`-0`", strip both the "`0-`" prefix and the "-0" suffix.
1.  Iterate through the characters output by Step 2 in order, emitting them as encountered. When you encounter a "`-`" (hyphen), peek at the following character. If the following character is also a "`-`" (hyphen), skip both characters from the input and emit a single "`-`" (hyphen). If the following character is any other character, skip only the current single "`-`" (hyphen) and emit a "`.`" (dot).  For example, `a--b-example-com` becomes `a-b.example.com`.
1.  Punycode encode the result of Step 3. See [RFC 3492](https://tools.ietf.org/html/rfc3492) for punycode.

The result of Step 4 will be the Publisher Domain. The protocol is unavailable from the domain itself, but is either `http` or `https`. The port is always the default for the protocol.


## Redirect & Error Handling

Here are some examples for how the AMP Cache handles redirects and errors:

**Redirects**

The AMP Cache follows redirects when resolving AMP URLs. For example, if an URL redirects to another AMP URL:

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

Then the AMP Cache will return the content of the resolved redirect for the original URL.

Example: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

Important: If you move the location of the AMP files on your server, make sure to set up a redirect from the old location to the new one.

**Not Found**

When a page is not found in the AMP Cache, it will show an error page and return a 404 status.

Example: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**Invalid AMP**

When a page is invalid AMP, the AMP Cache will redirect to the canonical page.</p>

Example: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**Server Errors**

If an URL returns a 5XX server errors, the AMP Cache will return a 404 status.</p>

Example: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)

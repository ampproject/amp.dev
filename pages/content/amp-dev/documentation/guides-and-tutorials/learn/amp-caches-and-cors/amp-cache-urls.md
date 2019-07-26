---
$title: AMP Cache URL Format and Request Handling
$order: 9
toc: false
formats:
  - websites
  - stories
  - ads
author: sebastianbenz
---
{% do doc.amp_dependencies.add('amp-iframe', '0.1') %}

In this document, you'll learn about the AMP Cache URL format and how it handles requests. 

## URL Format

When possible, the Google AMP Cache will create a subdomain for each AMP document's domain by first converting it from [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) to UTF-8. The caches replaces every `-` (dash) with `--` (2 dashes) and replace every `.` (dot) with `-` (dash). For example, `pub.com` will map to `pub-com.cdn.ampproject.org`.

You can use this URL calculator to convert an URL into an AMP cache version:

<div>
<amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div>
</amp-iframe>
</div>

The converted AMP Cache URL consists of the following parts:

* `amp-dev`: the publisher domain converted into a subdomain using the algorithm described above.</li>
* `cdn.ampproject.org`: the AMP Cache domain.
* `c`: to indicate that it's an AMP document (there is also `i` for image and `r` for resources such as fonts).
* `s`: indicating that the AMP Cache fetches the content from the origin using TLS (secure HTTPS).
* `amp-dev.com/index.amp.html`: the original URL excluding the scheme.

It is OK for URLs to include parameters in the query string, simply include these in the AMP Cache URL as well.

Example: [https://amp-dev.cdn.ampproject.org/c/s/amp.dev/documentation/examples/api/query?value=Hello%20World](https://amp-dev.cdn.ampproject.org/c/s/amp.dev/documentation/examples/api/query?value=Hello%20World).

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

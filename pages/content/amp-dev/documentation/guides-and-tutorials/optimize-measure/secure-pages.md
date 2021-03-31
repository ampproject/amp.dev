---
$title: Secure from third party attacks
$order: 7
description: Take measures to protect your AMP pages and users from security vulnerabilities on the web
formats:
  - websites
author: CrystalOnScript
---

Take measures to protect your site and users from security vulnerabilities on the web. One of the most sinister is [cross-site scripting](https://www.google.com/about/appsecurity/learning/xss/) (XSS). XSS is a security bug that can allow an attacker to inject malicious code onto the HTML pages displayed to users.

Protect against these types of attacks by adopting a [Content Security Policy (CSP)](https://csp.withgoogle.com/docs/index.html). AMP caches like the Google AMP Cache already add CSP to your pages! However, pages lack this additional layer of protection when users circumvent the cached version, if you do not add your own CSP.

# Implement AMP’s CSP

Implement a CSP by adding the appropriate meta tag to the head of your pages. Below is AMP’s CSP, allowing only AMP scripts to be injected into your page:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[You can view the full example here](https://github.com/ampproject/amphtml/blob/master/examples/csp.amp.html).

Please note that if you are using a service worker (via [`amp-install-serviceworker`](../../components/reference/amp-install-serviceworker.md)) then the above CSP will block the service worker script from being installed. In such case, you'll need to add the URL to the service worker script to the allowed list of `script-src` URLs.

[tip type="read-on"]
Learn more about [protecting about security vulnerabilities and CSPs here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).
[/tip]

---
$title: Serve AMP using Signed Exchanges 
$order: 0
formats:
  - websites
author: CrystalOnScript
---

AMP provides speed benefits above and beyond the format through techniques like caching and preloading. These benefits can have [downsides](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/) like extra URLs being displayed when embeded inside an [AMP Viewer](https://developers.google.com/search/docs/guides/about-amp). By serving AMP content using Signed Exchanges, you can use a new web platform feature to overcome all of these.

A [Signed Exchange](https://developers.google.com/web/updates/2018/11/signed-exchanges) response is made up of a valid AMP document and the original URL of the content. This information is protected by digital signatures that securely tie the document to its claimed URL. This enables browsers to safely display the original URL in the URL bar instead of the hostname of the machine that delivered the bytes to the browser. 

Signed Exchange AMP content is delivered _in addition to_ (rather than instead of) regular AMP content.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URLs after signed exchange', caption=' ', align='' ) }}

[tip type="note"]
    This feature is currently supported on Chrome, but implementation is planned for additional browsers. 
[/tip]

# Will Signed Exchanges work for me?

To implement Signed Exchanges, you must meet the following requirements:

*   Your site must be hosted on your own HTTPS server and not from a shared host. 
*   The ability to generate AMP signed exchanges, such as by running [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md), as a [Go binary](https://golang.org/doc/install), or within a [Docker VM](https://docs.docker.com/machine/get-started/). 
    *   Ability to update the packager every six weeks.
*   Ability to [Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) on `Accept` and `AMP-Cache-Transform` headers on edge HTTP servers, returning different content for the same URL. 
*   Your system running the `amppackager` needs to be able to make outgoing network requests to:
    *   The certificate authority that issues your certificate
    *   The publisher server that hosts the AMP documents to sign
    *   `cdn.ampproject.org` to obtain the current version of AMP
*   A persistent shared storage filesystem between all instances of `amppackager` running in the same data center. 


# Implementing Signed Exchanges 

Below is the suggested order of implementation to support Signed Exchanges on your AMP documents.


## Acquire a supported TLS certificate

Your site must have a [TLS certificate that supports the `CanSignHttpEchanges` flag](https://www.digicert.com/account/ietf/http-signed-exchange.php). As of April 2019, only [DigiCert](https://www.digicert.com/) provides this extension.

Below is an example of an [openssl](https://www.openssl.org/) command to generate certificate signed request for `ampbyexample.com`:


```html
$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

### Additional certificates 
The [`amppackager`](https://github.com/ampproject/amppackager) needs two files for encryption: a **CertFile** and a **KeyFile**. These are specified in the `amppkg.toml` config file. 

The **KeyFile** is the private key. This may have been generated via an openssl command such as:


```html
openssl ecparam -out ampdev-packager.key -name prime256v1 -genkey
```


The private key is used to _generate_ the CSR which is sent to the certificate authority, but is otherwise kept private.

If it is generated via the openssl command above, it will be in `PEM` format. It should look something like the following:


```html
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
AwEHoUQDQgAEuVN1uONEEx/6OhyYu5PDsVGKdN3chhqVKtL9lQilW1r08qYeJlxp
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----

```


The **CertFile** is the public certificate. This is created by concatenating origin-specific certificate provided by DigiCert and the `DigiCertCA.crt` file to create something like the following:


```html
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```


If needed, can encrypt the `cert.pem` and `privkey.pem` as follows:


```html
openssl aes-256-cbc -md md5 -e -k $PASSWORD -in cert.pem -out cert.pem.enc
openssl aes-256-cbc -md md5 -e -k $PASSWORD -in privkey.pem -out privkey.pem.enc
```


And decrypt:


```html
openssl aes-256-cbc -md md5 -d -k $PASSWORD -in cert.pem.enc -out cert.pem
openssl aes-256-cbc -md md5 -d -k $PASSWORD -in privkey.pem.enc -out privkey.pem
```


## Determine which URLs will be signed 

You will need to create a URL pattern that defines which documents should be signed. It is critical that private content, such as personalized information should not be signed, to avoid sending misleading or incorrect content.

For performance purposes, the packager should only be passed valid AMP documents as input. Some invalid AMP documents are fine if needed, but you should avoid sending all traffic through the packager. 


## Deploy packager to a staging server

You should set Signed Exchanges up on a staging server first, to verify a correct setup, before migrating to production to ensure proper implementation. We recommend using [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) and its built-in web server. 

Follow instructions [here to set up `amppackager` for your site](https://github.com/ampproject/amppackager/blob/master/README.md). 

[tip type="read-on"]
The [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) file for `amp.dev` demonstrates Signed Exchange support setup.
[/tip]

NOTE: Alternatively, you can use the command-line clients [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) and [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange), and handle version negotiation and certificate management tasks by hand. This should only be implemented if `amppackager` does not fit for your production environment. You will need to serve with the appropriate content-types (`application/signed-exchange;v=b3` and `application/cert-chain+cbor`). 

Test that your staging site returns the content with the added MIME type `application/signed-exchange` when provided with the correct request headers. In the below example, replace `staging.example.com` with your staging server.


```html
$ curl -si -H 'amp-cache-transform: google' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

This command should return the following:

```html
content-type: application/signed-exchange;v=b3
```

[tip type="important"]
The `v=b3` version string is the current version. This version will change. 
[/tip]

The response will be a binary encoding of your AMP page.

You can also test with the accept header Chrome sends on navigations:


```html
$ curl -si -H 'amp-cache-transform: google' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' https://staging.example.com/ | less
```


Use the [`dump-signedexchange` tool](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) to read the Signed Exchange output. 


```html
$ curl -s --output - -H 'amp-cache-transform: google' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```


The `-verify` switch will not work at this point because the required certificates are not on the `https://example.com/` server. 


## Publish content and direct traffic 

Ensure your signed documents have the correct headers needed to find and filter content. These headers can be found in the [Productionizing section of the `amppackager` README](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing). 

Read On: The [`serveStaticFiles()`](https://github.com/ithinkihaveacat/amp-by-example/blob/d6eae5970a290bbfa8ce7a25d8842be0087a9c8d/backend/static.go#L50-L72) function of the `https://ampbyexample.com` source code may be a helpful example. 

You should test that your production server returns content with the `application/signed-exchange` MIME type when provided with the appropriate headers. 


### Testing with Chrome

You can also test in Chrome with the help of the [ModHeader extension](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en). Install it from the Chrome Webstore and configure the `Request Headers` to `amp-cache-transform` with a `Value` of `google`.



{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testing Chrome with the help of the ModHeader extension', caption=' ', align='' ) }}


After requesting `https://example.com/` your server will deliver a Signed Exchange, but it should look and behave the same as before. You will need to check that a Signed Exchange is correctly being returned via the[ DevTools console](https://developers.google.com/web/tools/chrome-devtools/).


{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Signed exchange header displayed in the DevTools console', caption=' ', align='' ) }}

Under the `Network` tab, click on your domain name and check that `Signed HTTP exchange` appears under `Preview`. 


### Testing with the Google AMP Cache

Confirm that the signed exchanges are compatible with the Google AMP cache. This related to their discoverability on search engines such as Google Search. 

To test signed echanges in the Google AMP cache, open the network tab in DevTools, enable `Preserve log`, and visit a URL such as `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

DevTools will show a `200` with a `signed-exchange` row, and a `from signed-exchange` row, if the request was successful. 

If unsuccessful, the signed-exchange rows will be missing, or they will be highlighted red.

## Successful Signed Exchanges  

If your AMP pages were successfully distributed with Signed Exchanges, their search results will display the AMP lightning bolt, same as before, but tapping on the results will show `https://example.com` in the URL bar, instead of a URL beginning with `https://www.google.com/amp/….`. Additionally, the `viewer` bar will not appear.

Within the DevTools console, under the `network` tab, you will be able to see `signed-exchange` under the `type` column.  


{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='Within the DevTools console, under the network tab, you will be able to see signed-exchange under the type column.', caption=' ', align='' ) }}

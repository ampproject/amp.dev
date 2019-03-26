---
$title: AMP for Email - Email Provider integration
$order: 4
desccription: 'The AMPHTML library is a set of components, backed by carefully curated JavaScript, that enables functionality beyond HTML, with a focus on performance and security.'
formats:
  - email
---

AMP is an open source initiative that enables the creation of consistently fast, beautiful, and high-performing web experiences across devices and distribution platforms. The AMPHTML library is a set of components, backed by carefully curated JavaScript, that enables functionality beyond HTML, with a focus on performance and security.

There are [AMP components]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}) for everything from carousels, to responsive form elements, to retrieving fresh content from remote endpoints. The AMPHTML Email format provides a subset of AMPHTML components for use in email messages, that allows recipients of AMP emails to interact dynamically with content directly in the message.

This guide is a high-level overview of implementing support for the AMP for Email format, aimed at  Email Providers. For further technical details, please see [the spec]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-email-format.md', locale=doc.locale).url.path}}).

## AMP for Email Specification

The [AMP for Email Specification]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-email-format.md', locale=doc.locale).url.path}}) has been added to the AMPHTML project. It covers AMP for Email in detail and includes answers to specific questions and provides guidelines for general AMP Email developers.

## Validate AMP Emails
It is important to user security and experience that emails sent with AMP HTML are validated as proper AMP documents. The [AMP validator](https://github.com/ampproject/amphtml/tree/master/validator) ensures that AMP Emails are respecting the AMP for Email (`AMP4Email` or `⚡4email`) spec and make proper use of AMP components. Email Providers are highly encouraged to run the validator prior to rendering the message as a sanity check. In case the AMP part of the email is not valid, the HTML version can be used as rendering fallback.

## Add an AMP Viewer
An AMP viewer is required to display AMP in emails and keep the user experience secure. An AMP Viewer sandboxes content while allowing communication between the AMP runtime and the embedding client.

The AMP project has published [two versions of the AMP Viewer](https://github.com/ampproject/amp-viewer), that use a WebView or iframe to show an AMP document with additional functionality you may need. The AMP Viewer can be used directly or as an example for your implementation.

## Host AMP JavaScript
Just like regular AMP, only the Javascript from the allowed AMP components can be used within AMP Emails.  All AMP components have been vetted and security-reviewed to protect against XSS and the AMP validator strictly verifies the structure of the document and usage of AMP elements.

Email clients or servers should host copies of AMP’s JavaScript files themselves. All sophisticated AMP integrations use this method; the Google AMP Cache hosts the files separately from the central CDN and so does the CloudFlare AMP Cache. However, AMP cache is neither used nor needed for AMP Emails.

While AMP for Email provides certain level of security, a few more measures must be taken to safely provide users with the features and interactivity of AMP components.

##Spam Check and Sanitize Spam
While the AMP Validator will only allow [whitelisted components](https://github.com/ampproject/amphtml/blob/master/spec/amp-email-format.md#amp-components) through, a spam checker should analyze and sanitize an email containing AMP much like it would analyze a regular HTML email. The system should also ensure the email passes at minimum DKIM, DMARC, and SPF checks. Furthermore, a sender whitelist is also a strong way to mitigate risks.

##Include a Proxy Server
A proxy server is fundamental and should be responsible for handling XHR requests that originate from the AMP Email (e.g. from [`amp-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-list.md', locale=doc.locale).url.path}}), [`amp-form`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}), etc) and perform spam checks and sanitization on the content fetched by these requests.

Some dynamic elements in an AMP Email may rely on remote content. Additional steps should be taken to prevent user data, such as IP address, cookies, and type of device, from being leaked to third party endpoints and giving rewrite access to parts of the AMP Email.

##Update CORS Headers
Since the requests go through a proxy server, the AMP Email CORS requirements are slightly different than the existing [AMP CORS]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md', locale=doc.locale).url.path}}) requirements.

The following describes what headers to expect in a request from each source and the headers that should be included in the response by the server.

###Requests
All requests coming from your proxy servers should contain the following:

[sourcecode]
(Header) Origin: https://MAIL.YOURDOMAIN.com
(Query parameter) __amp_source_origin=<sender email address>
[/sourcecode]

For example, an XHR request that originated from an email sent by sender@example.com would have the following header and query parameter:

[sourcecode]
(Header) Origin: https://MAIL.YOURDOMAIN.com
(Query parameter) __amp_source_origin=sender@example.com
[/sourcecode]

The endpoints used in the email will verify these values and reject any requests that do not contain these two values.

###Responses
All responses should contain the following 3 headers:

[sourcecode]
Access-Control-Allow-Origin: https://MAIL.YOURDOMAIN.com
AMP-Access-Control-Allow-Source-Origin:
    <your sender email address>
Access-Control-Allow-Source-Origin:
    AMP-Access-Control-Allow-Source-Origin
[/sourcecode]

For example, if the email was sent by sender@example.com, then the headers should look like the following:

[sourcecode]
Access-Control-Allow-Origin: https://MAIL.YOURDOMAIN.com
AMP-Access-Control-Allow-Source-Origin: sender@example.com
Access-Control-Allow-Source-Origin: AMP-Access-Control-Allow-Source-Origin
[/sourcecode]

If the response does not contain these headers, your proxy server should reject the response and AMP should not render the response.

## Set Standard Security Measures
It’s worth saying that security is an ongoing concern, and you should have a good security and risk mitigation plan. It is crucial to have measures in place to apply if a new vulnerability is found, and you may need to have a quick way to disable AMP for Email, block senders, block XHR requests to servers, etc.

On top of your current spam/phishing mitigation strategies, it is imperative to include new ones for the new XHRs requests. Render content derived from all XHR requests after performing spam, phishing and sanitization checks.

## Understand Allowed CSS properties and selectors
AMP for Email does not restrict CSS itself. However, CSS allowed within email messages vary depending on the email provider. For reference, the list of CSS properties and values allowed in Gmail can be found at [Gmail Supported CSS Properties & Media Queries](https://developers.google.com/gmail/design/reference/supported_css), other Email Providers are encouraged to also publish a similar list to help developers/creators.

## Signify a Change and Set a Fallback
Make clear to the user that the email uses AMP for Email and offer the regular HTML version as an alternative.
If the AMP email is invalid, render the HTML version as a standard fallback. For older emails, you may need to store and use older versions of the AMP runtime when new ones are released for breaking changes.

## Current AMP for Email Support
Gmail will support AMP for Email on iOS, Android, and Web. We're working with other email providers and clients to have their Web and mobile apps support it as well. Please reach out by [filing an issue on GitHub](https://github.com/ampproject/amphtml/issues/new) if you’re interested in including AMP for Email in your service.

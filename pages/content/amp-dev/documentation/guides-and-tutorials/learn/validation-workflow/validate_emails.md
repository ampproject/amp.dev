---
$title: Validate AMP Emails
$order: 1
author: CrystalOnScript
formats:
  - email
---


AMP Emails depend on the AMP JS library to enable rich interactive and dynamic experiences for readers. For this reason, email providers require your messages to be validated. Valid AMP markup guarantees emails are safe and exceed user experience standards. 


# How do I check if my email is valid AMP?

There are several ways available to validate an email as a valid AMP Email. They will all produce the exact same result, so choose whichever one suits your development style the most! 


## Web-based validator 

The AMP [web-based validator](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) supports the AMP for Email platform. Use the web-based validator by pasting your AMP Email into the tool. It will flag any validator errors directly inline. 


{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}



## Command-line validator

You can validate AMP Emails files by using the [AMP HTML validator command line tool](https://www.npmjs.com/package/amphtml-validator). 


### Installation



1.  Make sure you have [Node.js with its package manager 'npm' ](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)on your system.
1.  Install the AMP HTML validator command line tool by running the following command: `npm install -g amphtml-validator`.


### Usage

After installing the command-line tool, run the following command after replacing `<amphtml file>` with your file containing the AMP Email content.


```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```


If the email is valid the command-line tool will result in a `PASS`. If invalid, it will return with the errors it found. 


## AMP playground

You can also validate AMP Emails using the [AMP playground](https://playground.amp.dev/?runtime=amp4email). Similar to the web-based validator, paste your AMP Email into the tool, and the playground will flag any validator errors directly inline.

### Validate delivered emails

Sometimes your delivered AMP Emails may be invalid even though the email markup you authored has already been validated by tools documented in this page. The most common reason for this to happen is that your [ESP](https://amp.dev/support/faq/email-support/) modified your email markup and made it invalid after you have sent your email to your ESP for delivery. For example, if your ESP is SparkPost and you haven't configured HTTPS tracking pixels with SparkPost, then SparkPost will add an insecure HTTP tracking pixel to your email. Since AMP Emails only allow HTTPS images, this will make your AMP Email invalid.

To check whether an email delivered to your inbox is valid AMP:

1. [download the AMP Email as an `.eml` file](https://www.codetwo.com/kb/export-email-to-file) from your email client.
2. Open the [AMP playground](https://playground.amp.dev/?runtime=amp4email).
3. Click on "IMPORT EMAIL", and select the `.eml` file you just downloaded.

The playground will import the AMP email you downloaded into the inline editor and flag any validation errors.

# What happens if my email isn't valid?

The AMP Validator isn't just a convenience for you during development, email providers supporting AMP Emails will automatically fallback to the provided HTML or Plain Text MIME types. An AMP Email should only be sent if it passes the validator. 

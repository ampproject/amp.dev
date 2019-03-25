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

The AMP [web-based validator](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) support the AMP for Email platform. Use the web-based validator is by pasting your AMP Email into the tool. It will flag any validator errors directly inline. 


{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}



## Command-line validator

You can validate AMP Emails files by using the [AMP HTML validator command line tool](https://www.npmjs.com/package/amphtml-validator). 


## Installation



1.  Make sure you have [Node.js with its package manager 'npm' ](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)on your system.
1.  Install the AMP HTML validator command line tool by running the following command: `npm install -g amphtml-validator`.


## Usage

After installing the command-line tool, run the following command after replacing `<amphtml file>` with your file containing the AMP Email content.


```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```


If the email is valid the command-line tool will result in a `PASS`. If invalid, it will return with the errors it found. 


# What happens if my email isn't valid?

The AMP Validator isn't just a convenience for you during development, email providers supporting AMP Emails will automatically fallback to the provided HTML or Plain Text MIME types. An AMP Email should only be sent if it passes the validator. 

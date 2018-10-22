# v2.7.1
## 12/05/2017

1. [](#new)
    * Added new `onEmailSend()` event hook before sending [#70](https://github.com/getgrav/grav-plugin-email/pull/70)
1. [](#improved)
    * Added examples of setting up Email plugin with various SMTP providers
    * Updated RU language [#60](https://github.com/getgrav/grav-plugin-email/pull/60)
    * Updated to SwiftMailer v5.4.8

# v2.7.0
## 10/26/2017

1. [](#improved)
    * Now uses a dedicated `logs/email.log` file when `debug: true`
    * Improved the README.txt file with examples, and troubleshooting
    * Changed default engine to `sendmail` as `mail` is deprecated and not functioning [swiftmailer#866](https://github.com/swiftmailer/swiftmailer/issues/866}

# v2.6.2
## 09/30/2017

1. [](#improved)
    * Removed extraneous files from vendor folder 

# v2.6.1
## 09/07/2017

1. [](#improved)
    * Improved the error message when missing `from` in the configuration
    * Silently catch malformed email exceptions

# v2.6.0
## 05/22/2017

1. [](#improved)
    * Inherit options from plugin configuration [#39](https://github.com/getgrav/grav-plugin-email/pull/39)
1. [](#bugfix)
    * Also process translation on the email subject [https://github.com/getgrav/grav-plugin-comments/issues/38](https://github.com/getgrav/grav-plugin-comments/issues/38)

# v2.5.3
## 01/03/2017

1. [](#improved)
    * Updated to SwiftMailer 5.4.5 [#45](https://github.com/getgrav/grav-plugin-email/issues/45)

# v2.5.2
## 12/13/2016

1. [](#new)
    * RC released as stable

# v2.5.2-rc.1
## 11/26/2016

1. [](#new)
    * Added a new `process_markdown` option for emails in forms
1. [](#improved)
    * Improved the `Utils::sendEmail()` method to take the email type as an option

# v2.5.1
## 10/19/2016

1. [](#improved)
    * CLI command will fallback to use the `to` from email plugin config if not provided
    * Explicit Composer based class loader to fix issues with class case

# v2.5.0
## 09/07/2016

1. [](#new)
    * Added a new `bin/plugin email test-email` CLI command
1. [](#improved)
    * Moved Email `Utils` class from Login to Email plugin
    * Provide a sample base `email/base.html.twig` template for emails
1. [](#bugfix)
    * Fix handling attachments with the updated file upload field

# v2.4.3
## 08/16/2016

1. [](#improved)
    * Added Russian translation
    * Updated Swiftmailer to 5.4.3 [#37](https://github.com/getgrav/grav-plugin-email/issues/37)

# v2.4.2
## 08/10/2016

1. [](#improved)
    * Added Croatian translation

# v2.4.1
## 07/14/2016

1. [](#improved)
    * Allow multiple email recipients (comma separated) [#31](https://github.com/getgrav/grav-plugin-email/issues/31)
    * Added Danish and Spanish translations

# v2.4.0
## 05/11/2016

1. [](#improved)
    * Now includes Swiftmailer v5.4.2 which introduces a number of bug fixes and improvements
1. [](#bugfix)
    * Correct `starttls` implementation, bundled in TLS

# v2.3.0
## 04/20/2016

1. [](#improved)
    * Added debug option to enable logging on SwiftMailer.
    * Updated SwiftMailer from v5.1.0 to v5.4.1.
    * Added an option in the Admin settings to enable `starttls`
1. [](#bugfix)
    * Correctly name TLS in the Admin settings, the label was `TTS` (but the value was correctly named `tls`)

# v2.2.0
## 02/05/2016

1. [](#new)
    * Allow to send attachments in forms
    * Added French translation
1. [](#improved)
    * Throw an exception when trying to send emails without a `from` or `to` parameters setup, to intercept less meaningful errors and provide a better description on how to fix the problem
    * Changed SMTP password in admin to use a password field instead of plain text

# v2.1.0
## 12/18/2015

1. [](#new)
    * Added missing `content_type` to email.yaml
    * Added default values for CC and BCC
 1. [](#improved)
    * Improved documentation of new email params in `README.md`
    * Moved config setting of `mailer.default` to `mailer.engine`

# v2.0.0
## 12/11/2015

1. [](#new)
    * Added support for from/sender name (Thomas Keitel)
    * Added support for message content type (Thomas Keitel)
    * Added support for reply addresses (Thomas Keitel)
    * Added support for CC/BCC (Thomas Keitel)
    * Added support for multiple body parts (Thomas Keitel)
1. [](#bugfix)
    * Fix email engine selection (z38)

# v1.0.0
## 11/20/2015

1. [](#bugfix)
    * Fix for issue with no body parameter specified

# v0.2.1
## 09/11/2015

1. [](#bugfix)
    * Fix onFormProcessed event

# v0.2.0
## 08/11/2015

1. [](#improved)
    * Disable `enable` in admin

# v0.1.0
## 08/04/2015

1. [](#new)
    * ChangeLog started...

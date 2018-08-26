# Grav Email Plugin

The **email plugin** for [Grav](http://github.com/getgrav/grav) adds the ability to send email. This is particularly useful for the **admin** and **login** plugins.

# Installation

The email plugin is easy to install with GPM.

```
$ bin/gpm install email
```

# Configuration

By default, the plugin uses PHP Mail as the mail engine. 

```
enabled: true
from:
from_name:
to:
to_name:
mailer:
  engine: sendmail
  smtp:
    server: localhost
    port: 25
    encryption: none
    user: ''
    password: ''
  sendmail:
    bin: '/usr/sbin/sendmail -bs'
content_type: text/html
debug: false
```

You can configure the Email plugin by using the Admin plugin, navigating to the Plugins list and choosing `Email`.

That's the easiest route. Or you can also alter the Plugin configuration by copying the `user/plugins/email/email.yaml` file into `user/config/plugins/email.yaml` and make your modifications there.

The first setting you'd likely change is your `Email from` / `Email to` names and emails.

Also, you'd likely want to setup a SMTP server instead of using PHP Mail, as the latter is not 100% reliable and you might experience problems with emails.

> NOTE: `engine: mail` has been deprecated from the SwiftMail library that this plugin uses as it does not funtion at all.  Please use `smtp` if at all possibe, and `sendmail` if SMTP is not an option.

### Mailtrap.io

A good way to test emails is to use a SMTP server service that's built for testing emails, for example [https://mailtrap.io](https://mailtrap.io)

Setup the Email plugin to use that SMTP server with the fake inbox data. For example enter this configuration in `user/config/plugins/email.yaml` or through the Admin panel:

```
mailer:
  engine: smtp
  smtp:
    server: mailtrap.io
    port: 2525
    encryption: none
    user: YOUR_MAILTRAP_INBOX_USER
    password: YOUR_MAILTRAP_INBOX_PASSWORD
```

That service will intercept emails and show them on their web-based interface instead of sending them for real.

You can try and fine tune the emails there while testing.

### Google Email

A popular option for sending email is to simply use your Google Accounts SMTP server.  To set this up you will need to do 2 things first:

1. Enable IMAP in your Gmail `Settings` -> `Forwarding and POP/IMAP` -> `IMAP Access`
2. Enable `Less secure apps` in your [user account settings](https://myaccount.google.com/lesssecureapps)
3. If you have 2-factor authentication, you will need to create a unique application password to use rather than your personal password

Then configure the Email plugin:

```
mailer:
  engine: smtp
  smtp:
    server: smtp.gmail.com
    port: 465
    encryption: ssl
    user: 'YOUR_GOOGLE_EMAIL_ADDRESS'
    password: 'YOUR_GOOGLE_PASSWORD'
```

> NOTE: Check your email sending limits: https://support.google.com/a/answer/166852?hl=en

#### Sparkpost

Generous email sending limits even in the free tier, and simple setup, make [Sparkpost](https://www.sparkpost.com) a great option for email sending. You just need to create an account, then setup a verified sending domain.  Sparkpost does a nice job of making this process very easy and undertandable. Then just click on the SMTP Relay option to get your details for the configuration:

```
mailer:
  engine: smtp
  smtp:
    server: smtp.sparkpostmail.com
    port: 587
    encryption: tls
    user: 'SMTP_Injection'
    password: 'SEND_EMAIL_API_KEY'
```

Then try sending a test email...

#### Sendgrid

[Sendgrid](https://sendgrid.com) offers a very easy-to-setup serivce with 100 emails/day for free.  The next level allows you to send 40k/email a day for just $10/month. Configuration is pretty simple, just create an account, then click SMTP integration and click the button to create an API key.  The configuration is as follows:

```
mailer:
  engine: smtp
  smtp:
    server: smtp.sendgrid.net
    port: 587
    encryption: tls
    user: 'apikey'
    password: 'YOUR_SENDGRID_API_KEY'
```

#### Mailgun

[Mailgun is a great service](https://www.mailgun.com/) that offers 10k/emails per month for free.  Setup does require SPIF domain verification so that means you need to add at least a TXT entry in your DNS.  This is pretty standard for SMTP sending services and does provide verification for remote email servers and makes your email sending more reliable.  The Mailgun site, walks you through this process however, and the verification process is simple and fast.

```
mailer:
  engine: smtp
  smtp:
    server: smtp.mailgun.org
    port: 587
    encryption: tls
    user: 'MAILGUN_EMAIL_ADDRESS'
    password: 'MAILGUN_EMAIL_PASSWORD'
```

Adjust these configurations for your account.

#### MailJet

Mailjet is another great service that is easy to quickly setup and get started sending email.  The free account gives you 200 emails/day or 600 emails/month.  Just signup and setup your SPF and DKIM entries for your domain.  Then click on the SMTP settings and use those to configure the email plugin:

```
mailer:
  engine: smtp
  smtp:
    server: in-v3.mailjet.com
    port: 587
    encryption: tls
    user: 'MAILJUST_USERNAME_API_KEY'
    password: 'MAILJUST_PASSWORD_SECRET_KEY'
```

It's that easy!

#### Sendmail

Although not as reliable as SMTP not providing as much debug information, sendmail is a simple option as long as your hosting provider is not blocking the default SMTP port `25`:

```
mailer:
  engine: sendmail
  sendmail:
    bin: '/usr/sbin/sendmail -bs'
```

Simply adjust your binary command line to suite your environment

### SMTP Email Services

Solid SMTP options that even provide a FREE tier for low email volumes include:

* SendGrid (100/day free) - https://sendgrid.com
* Mailgun - (10k/month free) - https://www.mailgun.com
* Mailjet - (6k/month free) - https://www.mailjet.com/
* Sparkpost - (15k/month free) - https://www.sparkpost.com
* Amazon SES (62k/month free) - https://aws.amazon.com/ses/

If you are still unsure why should be using one in the first place, check out this article: https://zapier.com/learn/email-marketing/best-transactional-email-sending-services/

## Testing with CLI Command

You can test your email configuration with the following CLI Command:

```
$ bin/plugin email test-email -t steve@apple.com
```

You can also pass in a configuration environment:

```
$ bin/plugin email test-email -t steve@apple.com -e mysite.com
```

This will use the email configuration you have located in `user/mysite.com/config/plugins/email.yaml`. Read the docs to find out more about environment-based configuration: https://learn.getgrav.org/advanced/environment-config

# Programmatically send emails

Add this code in your plugins:

```php

        $to = 'email@test.com';
        $from = 'email@test.com';

        $subject = 'Test';
        $content = 'Test';

        $message = $this->grav['Email']->message($subject, $content, 'text/html')
            ->setFrom($from)
            ->setTo($to);

        $sent = $this->grav['Email']->send($message);
```
 
# Emails sent with Forms

When executing email actions during form processing, action parameters are inherited from the global configuration but may also be overridden on a per-action basis.

```
title: Custom form

form:
  name: custom_form
  fields:

    # Any fields you'd like to add to the form:
    # Their values may be referenced in email actions via '{{ form.value.FIELDNAME|e }}'

  process:
    - email:
        subject: "[Custom form] {{ form.value.name|e }}"
        body: "{% include 'forms/data.txt.twig' %}"
        from: sender@example.com
        from_name: 'Custom sender name'
        to: recipient@example.com
        to_name: 'Custom recipient name'
        content_type: 'text/plain'
        process_markdown: true
```

## Sending Attachments

You can add file inputs to your form, and send those files via Email.
Just add an `attachments` field and list the file input fields names. You can have multiple file fields, and this will send all the files as attachments. Example:

```
form:
  name: custom_form
  fields:

    -
      name: my-file
      label: 'Add a file'
      type: file
      multiple: false
      destination: user/data/files
      accept:
        - application/pdf
        - application/x-pdf
        - image/png
        - text/plain

  process:
    -
      email:
        body: '{% include "forms/data.html.twig" %}'
        attachments:
          - 'my-file'
```

## Additional action parameters

To have more control over your generated email, you may also use the following additional parameters:

* `reply_to`: Set one or more addresses that should be used to reply to the message.
* `cc` _(Carbon copy)_: Add one or more addresses to the delivery list. Many email clients will mark email in one's inbox differently depending on whether they are in the `To:` or `Cc:` list.
* `bcc` _(Blind carbon copy)_: Add one or more addresses to the delivery list that should (usually) not be listed in the message data, remaining invisible to other recipients.
* `charset`: Explicitly set a charset for the generated email body (only takes effect if `body` parameter is a string, defaults to `utf-8`)

### Specifying email addresses

Email-related parameters (`from`, `to`, `reply_to`, `cc`and `bcc`) allow different notations for single / multiple values:

#### Single email address string

```
to: mail@example.com
```

####  Multiple email address strings

```
to:
  - mail@example.com
  - mail+1@example.com
  - mail+2@example.com
```

#### Single email address with name

```
to:
  mail: mail@example.com
  name: Human-readable name
```

#### Multiple email addresses (with and without names)

```
to:
  -
    mail: mail@example.com
    name: Human-readable name
  -
    mail: mail+2@example.com
    name: Another human-readable name
  -
    mail+3@example.com
  -
    mail+4@example.com
```

## Multi-part MIME messages

Apart from a simple string, an email body may contain different MIME parts (e.g. HTML body with plain text fallback). You may even specify a different charset for each part (default to `utf-8`):

```
body:
  -
    content_type: 'text/html'
    body: "{% include 'forms/default/data.html.twig' %}"
  -
    content_type: 'text/plain'
    body: "{% include 'forms/default/data.txt.twig' %}"
    charset: 'iso-8859-1'
```

# Troubleshooting

## Emails are not sent

#### Debugging

The first step in determining why emails are not sent is to enable debugging.  This can be done via the `user/config/email.yaml` file or via the plugin settings in the admin.  Just enable this and then try sending an email again.  Then inspect the `logs/email.log` file for potential problems.

#### ISP Port 25 blocking 

By default, when sending via PHP or Sendmail the machine running the webserver will attempt to send mail using the SMTP protocol.  This uses port `25` which is often blocked by ISPs to protected against spamming.  You can determine if this port is blocked by running this command in your temrinal (mac/linux only):

```
(echo >/dev/tcp/localhost/25) &>/dev/null && echo "TCP port 25 opened" || echo "TCP port 25 closed"
```

If it's blocked there are ways to configure relays to different ports, but the simplest solution is to use SMTP for mail sending.


#### Exceptions

If you get an exception when sending email but you cannot see what the error is, you need to enable more verbose exception messages. In the `user/config/system.yaml` file ensure your have the following configuration:

```
errors:
  display: 1                                    
  log: true 
```

## Configuration Issues

As explained above in the Configuration section, if you're using the default settings, set the Plugin configuration to use a SMTP server. It can be [Gmail](https://www.digitalocean.com/community/tutorials/how-to-use-google-s-smtp-server) or another SMTP server you have at your disposal. 

This is the first thing to check. The reason is that PHP Mail, the default system used by the Plugin, is not 100% reliable and emails might not arrive.

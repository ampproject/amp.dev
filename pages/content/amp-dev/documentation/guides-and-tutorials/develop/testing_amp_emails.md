---
$title: Testing AMP emails
$order: 2
$category: Develop
formats:
  - email
author: fstanis
---

Before your email is ready to be sent to a large audience, it's good practice to perform a few tests and ensure your users will receive a good experience when they open your email.

## Testing checklist

1.  Make sure your email contains an HTML and/or plain text version in addition to AMP. This version is displayed as fallback for email clients that don't currently support the AMP MIME type.
1.  Ensure your AMP is valid by following the steps outlined in [Validate AMP Emails]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.html', locale=doc.locale).url.path}}).
1.  Review [AMP for Email Supported CSS]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.html', locale=doc.locale).url.path}}) to make sure the CSS you're using is supported across all email clients.
1.  Try your email in the [AMP Playground](https://playground.amp.dev/?runtime=amp4email) and ensure all dynamic features such as forms work correctly.

## Testing specific to email clients

Email clients that support AMP also provide developer documentation that may contain additional guidelines and requirements.

### Gmail

Gmail documentation lists guidelines for testing in [Test your AMP emails in Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email).

Gmail users can use the [Gmail AMP for Email Playground](https://amp.gmail.dev/playground/) to send an email to themselves for testing.

### Mail.ru

[Mail.ru AMP emails](https://postmaster.mail.ru/amp) provides information on how to enable testing in your Mail.ru account.

Mail.ru users can use the [Mail.ru AMP Playground](https://postmaster.mail.ru/amp/playground.html) to send an email to themselves for testing.

### Outlook.com

Outlook.com documentation has a [Get Started with AMP for Email](https://docs.microsoft.com/en-us/outlook/amphtml/get-started) guide that explains how to author and test AMP emails.

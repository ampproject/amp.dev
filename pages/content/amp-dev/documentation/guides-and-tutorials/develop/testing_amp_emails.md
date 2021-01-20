---
$title: Testing AMP emails
$order: 2
$category: Develop
description: 'Ensure great user experience by testing your AMP emails before sending to a large audience.'
formats:
  - email
author: fstanis
---

Ensure great user experience by testing your AMP emails before sending to a large audience.

## Testing checklist

1.  Include an HTML and/or a plain text version of your AMP email. Email clients that don't support AMP will display this as a fallback.
1.  Ensure your AMP is valid by following the steps outlined in [Validate AMP Emails](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md).
1.  Review [AMP for Email Supported CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) to make sure the CSS you're using is supported across all email clients.
1.  Try your email in the [AMP Playground](https://playground.amp.dev/?runtime=amp4email) and ensure all dynamic features such as forms work correctly.

## Testing specific to email clients

Email clients that support AMP also provide developer documentation that may contain additional guidelines and requirements.

### Gmail

Gmail documentation lists guidelines for testing in [Test your AMP emails in Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email).

Gmail users can use the [Gmail AMP for Email Playground](https://amp.gmail.dev/playground/) to send an email to themselves for testing.

### Mail.ru

[Mail.ru AMP emails](https://postmaster.mail.ru/amp) provides information on how to enable testing in your Mail.ru account.

Mail.ru users can use the [Mail.ru AMP Playground](https://postmaster.mail.ru/amp/playground.html) to send an email to themselves for testing.

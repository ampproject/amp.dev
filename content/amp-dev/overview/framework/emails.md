---
$title: What is AMP for email
$titles:
  header: Framework
---
[stage color="green"]
## Why should I use AMP?
# Improve user engagement with rich and immersive
[destination-switch type="selected" selected="e-mails"]
- [websites](/content/amp-dev/overview/framework/websites.md)
- [stories](/content/amp-dev/overview/framework/stories.md)
- [ads](/content/amp-dev/overview/framework/ads.md)
- [e-mails](/content/amp-dev/overview/framework/emails.md)
[/destination-switch]
[/stage]

[include('/content/shared/hints/content-missing.md')]

More than 270 billion emails are sent every day, it is the pillar of many consumer and enterprise workflows. However the content that is sent in an email message is still limited – messages are static, can become out of date, and are not actionable without opening a browser. AMPHTML email seeks to enhance and modernize the email experience through added support for dynamic content and interactivity while keeping users safe. AMPHTML for email makes modern App functionality available within email.

## Benefits for developers

### Increased capabilities
AMPHTML email is an expansion of the already existing blazingly fast and high-performing AMPHTML project and opens up a whole new world of possibilities for users to engage with content. AMP for email can integrate with existing compatible apps like Doodle, Booking.com and Pinterest.

The AMPHTML email format provides a subset of AMPHTML components for use in email messages, that allows recipients of AMPHTML emails to interact dynamically with content directly in the message. AMP for email is intended to work safely with all web-based clients.

#### Guides & Tutorials:
[AMP for Email specifications](Link)

### Easy to develop

AMPHTML for email is being developed as part of the AMP Project and is simple and straightforward to use. Embedding AMP within an email is simple, add a new MIME part with a content type of text/x-amp-html as a descendant of multipart/alternative. It should live alongside the existing text/html or text/plain parts. This ensures that the email message works on all clients.

AMP by example:
[Link to relevant doc](Link)

### Consistency and scalability

The fast and rich user experience that is the goal of AMP is also available. Developers can use AMP to create more expressive and engaging experiences in Email. Compared to websites, email is a different user context with different models of privacy and security. For example, phishing is a major concern for email. To maintain users’ expectations of security and privacy, we’ll only allow a conservative subset of AMP functionality. To enforce this, we propose adding a new AMPHTML email validation spec identified by a new attribute on the document element: amp4email. This is similar to the technique used by the AMPHTML Ads project which introduced its own spec that uses the attribute amp4ads.

#### Guides & Tutorials:
[Documentation](Link)

## Benefits for your business

### Increased personalization
AMPHTML for email allows exciting smarter user engagement, as customers can take action directly within their email such as managing their subscriptions, responding to polls, doodles, and bookings. This is possible because the server retrieves fresh content from remote endpoints, keeping email up to date. Because fewer steps are needed to personalize results, it is easier to please and keep customers engaged.

[Duis dolor](Link)

### Interactive customer experience
AMP Email’s expanding capabilities allows you to take action right inside your Inbox. This includes carousels and accordions, and taking user input on forms and questionnaires. Ad components are not allowed allowed in AMP for email, keeping users safe.

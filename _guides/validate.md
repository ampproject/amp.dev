---
layout: page
title: Validate AMP Pages
order: 4
---

The key strength of AMP isn’t just that it makes your pages fast, but that it makes your pages fast in a way that can be *validated*. This way, third parties such as Twitter, Instagram or Google Search can feel great about serving AMP pages to readers in increasingly interesting ways.

## How do I check if my page is valid AMP?

The AMP validator comes bundled with the AMP JS library, so it is available on every AMP page out of the box. To validate:

  1. Open your page in your browser
  1. Add "`#development=1`" to the URL, for example, `http://localhost:8000/released.amp.html#development=1`.
  1. Open the [Chrome DevTools console](https://developers.google.com/web/tools/chrome-devtools/debug/console/) and check for validation errors.

You may also want to confirm that your AMP document is [discoverable](/docs/guides/discovery.html) to third-party platforms.

## What happens if my page isn’t valid?

<amp-img src="/docs/assets/validator_errors.png" width="1348" height="518" layout="responsive"></amp-img>

The AMP validator isn’t just a convenience for you during development. It’s also used by platforms like Twitter or Google who integrate your AMP pages into their content and search results. More so, they usually don’t request the pages directly from your server but make use of the Google AMP Cache, a free service that caches your pages and makes them available across the world, so they load even faster.

If the AMP validation service detects that there’s something wrong with your page, it won’t get discovered and distributed by third party websites and won’t appear in the Google AMP Cache.  So not only would you lose the speed benefits of the cache, it’s likely that your page will not be seen in many places! That would be a shame, so let’s make sure it doesn’t happen.

## How do I fix validation errors?

Most validation errors are easy to address and fix.  Consider this error:

<amp-img src="/docs/assets/validator_mandatory_error.png" width="836" height="127" layout="responsive"></amp-img>

  1. The first line of the error does its best to estimate where the error happened. Clicking on it should locate the general area.
  1. The second line, The part in red is the actual name of the error. In this case, **MANDATORY_ATTR_MISSING** signals that we’ve used a tag and forgot an important attribute.
  1. The third line points to the piece of the [AMP HTML Spec](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md) that talks about the limitation or feature in question.

Carefully re-reading the spec, we realize that not only were we missing an important attribute, we also used a `<script>` tag for our own JavaScript, which isn’t allowed in the first place!

To better understand the complete list of potential errors,
see the [AMP Validation Errors guide](https://www.ampproject.org/docs/reference/validation_errors.html).
Each AMP specification also provides a validation errors table
that lists the errors specific to that component.
If you’re still stuck after careful evaluation, [let us know](/docs/support/contribute.html) and we’ll try to help.


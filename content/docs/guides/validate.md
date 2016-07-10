---
$title: Validate AMP Pages
$order: 4
---

The key strength of AMP isn’t just that it makes your pages fast, but that it makes your pages fast in a way that can be *validated*. This way, third parties such as Twitter, Instagram or Google Search can feel great about serving AMP pages to readers in increasingly interesting ways.

## How do I check if my page is valid AMP?

There are several ways available to validate an AMP document. They will all
produce the exact same result, so use whichever one suits your development
style the most.

In addition to AMP validity, you may also want to confirm that your AMP document is [discoverable](/docs/guides/discovery.html) to third-party platforms.

### Browser Developer Console.

The AMP Validator comes bundled with the AMP JS library, so it is available on every AMP page out of the box. To validate:

  1. Open your AMP page in your browser
  1. Append "`#development=1`" to the URL, for example, `http://localhost:8000/released.amp.html#development=1`.
  1. Open the [Chrome DevTools console](https://developers.google.com/web/tools/chrome-devtools/debug/console/) and check for validation errors.

Developer Console errors will look similar to this:

<amp-img src="/static/img/docs/validator_errors.png"
         width="713" height="243" layout="responsive"
         alt="Screen grab of AMP Validator errors in chrome developer console">
</amp-img>

### Web Interface

The AMP Validator can be used as a web interface at
<a href="https://validator.ampproject.org/">validator.ampproject.org</a>. This
interface shows errors displayed inline alongside the HTML source of the page.
The interface is an interactive editor: changes to the html source result in
interactive revalidation.

<amp-img src="/static/img/docs/validator_web_ui.png"
         width="660" height="507" layout="responsive"
         alt="Screen grab of validator.ampproject.org with error examples.">
</amp-img>

### Browser Extension

The AMP Validator can be accessed directly from your browser's toolbar using
a browser extension. As you browse, it will automatically validate each AMP page
visited and gives a visual indication of the validity of the page as a colored
icon.

 * When there are errors within an AMP page the extension’s icon shows in a red
color and displays the number of errors encountered, like this:

<!-- TODO: The alignment of these images leaves much to be desired. Would be
nice to put them on the same line as the bullet points, given how small they
are, or centered if that's not feasible. With the pre-minified CSS though, it's
hard for me to make these changes -->

<amp-img src="/static/img/docs/validator_icon_invalid.png"
         width="20" height="20" layout="fixed"
         alt="Red AMP icon indicating invalid AMP document.">
</amp-img>
 
 * When there are no errors within an AMP page, the icon shows in a green color
   and displays the number of warnings, if any exist:

<amp-img src="/static/img/docs/validator_icon_valid.png"
         width="20" height="20" layout="fixed"
         alt="Green AMP icon indicating valid AMP document.">
</amp-img>

 * When the page isn’t AMP but the page indicates that an AMP version is
   available, the icon shows in a blue color with a link icon, and clicking on
   the extension will redirect the browser to the AMP version.

<amp-img src="/static/img/docs/validator_icon_link.png"
         width="20" height="20" layout="fixed"
         alt="Blue AMP icon indicating AMP HTML variant if clicked.">
</amp-img>

AMP Validator Extension for
[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) and [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

## What happens if my page isn’t valid?

The AMP Validator isn’t just a convenience for you during development. It’s also used by platforms like Twitter or Google who integrate your AMP pages into their content and search results. More so, they usually don’t request the pages directly from your server but make use of the Google AMP Cache, a free service that caches your pages and makes them available across the world, so they load even faster.

If the AMP validation service detects that there’s something wrong with your page, it won’t get discovered and distributed by third party websites and won’t appear in the Google AMP Cache. So not only would you lose the speed benefits of the cache, it’s likely that your page will not be seen in many places! That would be a shame, so let’s make sure it doesn’t happen.

## How do I fix validation errors?

Most validation errors are easy to address and fix. Consider this HTML tag:

`<img src="cat.png">`

Which generates this AMP validation error, shown in these different tools:

 * Browser Developer Console
<amp-img src="/static/img/docs/validator_console_imgerror.png"
         width="696" height="30" layout="responsive"
         alt="AMP error: The tag 'img' may only appear as a descendant of tag
         'noscript'. Did you mean 'amp-img'? line 11, column 2">
</amp-img>

 * Web Interface
<amp-img src="/static/img/docs/validator_webui_imgerror.png"
         width="676" height="58" layout="responsive"
         alt="AMP error: The tag 'img' may only appear as a descendant of tag
         'noscript'. Did you mean 'amp-img'? line 11, column 2">
</amp-img>

* Browser Extension
<amp-img src="/static/img/docs/validator_extension_imgerror.png"
         width="724" height="108" layout="responsive"
         alt="AMP error: The tag 'img' may only appear as a descendant of tag
         'noscript'. Did you mean 'amp-img'? line 11, column 2">
</amp-img>

Each tool gives several pieces of information:


  1. The location (line and column) in the HTML document where the error
     occurred, clickable in some interfaces to highlight that location. In this
     case the issue occurs on line 11, column 2.
  1. A line of text describing the error. In this case the text indicates that
     we are using an `<img>` tag, when we should have used an `<amp-img>` tag.
  1. A link to a relevant document about the error. In this case the
     documentation for the `<amp-img>` tag. Not all errors generate
     documentation links.
  
Carefully re-reading the spec, we realize that we are using an `<img>` tag, when we should have used an `<amp-img>` tag.

To better understand the complete list of potential errors,
see the [AMP Validation Errors guide](https://www.ampproject.org/docs/reference/validation_errors.html).
If you’re still stuck after careful evaluation, [ask a
question](http://stackoverflow.com/questions/tagged/amp-html) and we'll try to
help.


---
$title: Validate AMP pages
$order: 0
description: 'Watch our video about the various validation options. The key strength of AMP isn’t just that it makes your pages fast, but that it makes your pages ...'
formats:
  - websites
  - stories
  - ads
---

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='Watch our video about the various validation options.']

The key strength of AMP isn’t just that it makes your pages fast, but that it makes your pages fast in a way that can be *validated*. This way, third parties such as Twitter, Instagram or Google Search can feel great about serving AMP pages to readers in increasingly interesting ways.

## How do I check if my page is valid AMP?

There are several ways available to validate an AMP document. They will all
produce the exact same result, so use whichever one suits your development
style the most.

In addition to AMP validity, you may also want to confirm that your AMP document is [discoverable](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) to third-party platforms.

### Browser Developer Console

The AMP Validator comes bundled with the AMP JS library, so it is available on every AMP page out of the box. To validate:

  1. Open your AMP page in your browser.
  1. Append "`#development=[1,actions,amp,amp4ads,amp4email]`" to the URL, for example, `http://localhost:8000/released.amp.html#development=1` is the legacy means of validating the `AMP` format. The following URL, `http://localhost:8000/released.amp.html#development=amp4email` will validate the document against the AMP for email spec.
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

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png"
               width="20" height="20" layout="fixed"
               alt="Red AMP icon indicating invalid AMP document.">
      </amp-img>
    </td>
    <td>When there are errors within an AMP page the extension’s icon
      shows in a red color and displays the number of errors encountered.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png"
               width="20" height="20" layout="fixed"
               alt="Green AMP icon indicating valid AMP document.">
      </amp-img>
    </td>
    <td>When there are no errors within an AMP page, the icon shows in a
      green color and displays the number of warnings, if any exist.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png"
               width="20" height="20" layout="fixed"
               alt="Blue AMP icon indicating AMP HTML variant if clicked.">
      </amp-img>
    </td>
    <td>When the page isn’t AMP but the page indicates that an AMP version is
      available, the icon shows in a blue color with a link icon, and clicking on
      the extension will redirect the browser to the AMP version.
    </td>
  </tr>
</table>

AMP Validator Extension for
[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) and [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### NPM Packages for CI

As part of your build and test pipelines, you can integrate AMP validation through the AMP Validator NPM packages: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) or [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (a gulp plugin).  For example, you can use the AMP Validator NPM package for integration tests or in a scheduled task to verify production AMP pages.

##### Example: Validating an AMP HTML file

In this example, we validate an AMP HTML file by using the [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) NPM package.  The validation status is piped out to the console.

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  ((result.status === 'PASS') ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
  }
});
```

#####Example: Using a gulp task to validate AMP HTML

In this example, we have a gulp task that validates all AMP HTML files.  If there's an AMP validation error, the task exits with an error code (1).

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html'
};

gulp.task('amphtml:validate', () => {
  return gulp.src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['amphtml:validate'], function () {
});
```

### Command Line Tool

You can validate AMP HTML files by using the [AMP HTML validator command line tool](https://www.npmjs.com/package/amphtml-validator).

Getting Started:

1.  Make sure you have [Node.js with its package manager
'npm'](https://docs.npmjs.com/getting-started/installing-node) on your system.
2.  Install the  [AMP HTML validator command line tool](https://www.npmjs.com/package/amphtml-validator) by running the following command: `npm install -g amphtml-validator`.

Now let's validate a real AMP HTML page:

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

Unsurprisingly this page is valid AMP HTML. Let's try a page that is not valid:
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). To run the `amphtml-validator` command, you can either provide the URL of the page or a local file name. Download and save [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) into a file, then run:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

The format of the error messages consists of file name, line, column, and message,
often followed by a link to the AMP HTML reference. Some editors, including Emacs, can interpret this format and let
you jump to the errors in the original file.

For a good starting point to make your own AMP page consider [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

The command line tool offers additional features including switching off
the color, printing JSON output, or running a specific version of the
validator Javascript (by default it runs the latest published script).

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## What happens if my page isn’t valid?

The AMP Validator isn’t just a convenience for you during development. It’s also used by platforms like Twitter or Google who integrate your AMP pages into their content and search results. More so, they usually don’t request the pages directly from your server but make use of the Google AMP Cache, a free service that caches your pages and makes them available across the world, so they load even faster.

If the AMP validation service detects that there’s something wrong with your page, it won’t get discovered and distributed by third party websites and won’t appear in the Google AMP Cache. So not only would you lose the speed benefits of the cache, it’s likely that your page will not be seen in many places! That would be a shame, so let’s make sure it doesn’t happen.

## How do I fix validation errors?

Most validation errors are easy to address and fix. Consider this HTML tag:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

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
     we are using an `<img>` tag, when we should have used an [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) tag.
  1. A link to a relevant document about the error. In this case the
     documentation for the [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) tag. Not all errors generate
     documentation links.

Carefully re-reading the [spec](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md), we realize that we are using an `<img>` tag, when we should have used an [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) tag.

To better understand the complete list of potential errors,
see the [AMP Validation Errors guide](validation_errors.md).
If you’re still stuck after careful evaluation, [ask a
question](http://stackoverflow.com/questions/tagged/amp-html) and we'll try to
help.

---
$title: AMP validation errors
$order: 1
description: 'Valid AMP documents must not include any validation errors. The purpose of this document is to help you better understand and fix any validation errors ...'
formats:
  - websites
  - stories
  - email
  - ads
---

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

Valid AMP documents must not include any validation errors.
The purpose of this document is to help you better understand
and fix any validation errors you encounter
when you [validate your AMP pages](validate_amp.md).
For a complete overview of the validation errors,
see the [AMP validator specification](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

## AMP HTML tag and attribute errors

### Mandatory tag missing

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Add (or correct) the mandatory HTML tag.</td>
  </tr>
</table>

[filter formats="websites, stories, ads"]
The following tags must be present in all AMP docs:
[/filter]

[filter formats="email"]
The following tags must be present in all AMP emails:
[/filter]

[filter formats="websites, stories, ads"]
* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`
[/filter]

[filter formats="email"]
* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp4email> or <html ⚡4email>`
* <a name="head"></a>`<head>`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="boilerplate"></a>`<style amp4email-boilerplate>body{visibility:hidden}</style>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`
[/filter]

These mandatory tags include a `mandatory: true` field in the <a href="https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii">AMP validator spec</a>;
they are also referenced in the [AMP specification](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md).

### Tag required by another tag is missing

<table>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Add (or correct) the required HTML tag.</td>
  </tr>
</table>

The validator throws the `TAG_REQUIRED_BY_MISSING` error
when it finds an extended component in the AMP document,
but doesn't find its equivalent `<script>`.

[Extended components](../../../../documentation/components/index.html)
must be explicitly included in the AMP document as custom elements.
To fix these errors, navigate to the extended component's reference page,
copy its required script, and paste it into the AMP document `<head>`.

### Disallowed tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove the disallowed tag.</td>
  </tr>
</table>

Tags are allowlisted, so there is no definitive list of all disallowed tags;
however, the [AMP specification](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)
broadly defines the set of disallowed tags.

### Custom JavaScript is not allowed

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_SCRIPT_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Custom JavaScript is not allowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove the javascript tags or use amp-script.</td>
  </tr>
</table>

The AMP format does not allow custom JavaScript to be added to pages via the `<script>` element. Many common uses of JavaScript have AMP
HTML library equivalent implementations. See [AMP
components](../../../../documentation/components/index.html) for the set of components that can be
used to enhance AMP HTML pages.

If none of the available components cover your use case, [`amp-script`](../../../../documentation/components/reference/amp-script.md) can be used to run your custom JavaScript.

### Mandatory attribute missing

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Add mandatory attribute to tag.</td>
  </tr>
</table>

Mandatory attributes for AMP tags are defined within
[AMP's validator spec](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
Simply search for the tag,
view the listed attributes,
and check for `mandatory: true`.
Mandatory attributes for each AMP tag are also listed
within the tag's specification.

### Invalid attribute value

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Fix the attribute value to something that is valid.</td>
  </tr>
</table>

This error indicates that an HTML tag has an attribute with an allowed name,
but not an allowed value.
For example, one common trigger for this error is invalid values for URLs.
All URLs values (in `href` and `src` attributes) must match one of these
[possible attribute values](http://www.w3schools.com/tags/att_a_href.asp).

<strong>IMPORTANT:</strong> Many URL values in AMP require HTTPS.
If you are getting this error, and aren't sure why,
check the relevant AMP tag's specification
to see if the attribute requires HTTPS.

### Disallowed attribute

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove the attribute from the HTML tag.</td>
  </tr>
</table>

Attributes are allowlisted, so there is no definitive list of all disallowed attributes.
To check the supported attributes for each specific tag,
search for HTML tag, and then `attrs`
in the [AMP validator spec](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

In addition to a allowlist of specific attributes for each tag,
all AMP tags can use any of the attributes allow-listed under `$GLOBAL_ATTRS`;
all attributes with a prefix of `"data-"` are also allowlisted.

### Mandatory text missing or incorrect

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Add or correct the mandatory text inside the tag.</td>
  </tr>
</table>

CDATA is the content data between a start and end HTML tag
and is currently evaluated with both allowlists and denylists.
Tags with mandatory CDATA include:

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

And:

[sourcecode:html]
<style amp-custom>
[/sourcecode]

Detailed messages for this can be one of the following:

* "Mandatory style boilerplate (js enabled)"
* "Mandatory style boilerplate (noscript)"
* "Disallowed -amp- CSS class name prefix"
* "Disallowed !important attribute in CSS"
* "Disallowed &#64;charset in CSS"
* "Disallowed &#64;import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
[filter formats="websites, stories, ads"]
* "Disallowed @viewport in CSS"
[/filter]

### Disallowed text inside tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>CDATA_VIOLATES_DENYLIST</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove disallowed text.</td>
  </tr>
</table>

Specific CSS data has been denylisted
to validate essential CSS AMP rules.

The following is the list of denylisted CSS data
(see also [`disallowed_cdata_regex` in the AMP validator spec](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)):

* `"\\.i?-amp-"` ("CSS -amp- class name prefix")
* `"!important"`
* `"charset"`
* `"&#64;import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
[filter formats="websites, stories, ads"]
* `"@viewport"`
[/filter]
[filter formats="websites, stories, ads"]
### Disallowed property inside attribute in tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove disallowed property in the specified attribute.</td>
  </tr>
</table>

This error occurs when the property name inside an attribute is not allowed.
The term property in this context means the structured key/value data inside an attribute.

For example,
the following would result in an error:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

It should be: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.
As another example, in

`<meta name="viewport content="width=device-width;minimum-scale=1">`,
`width` and `minimum-scale` are property names.

The following results in a DISALLOWED_PROPERTY_IN_ATTR_VALUE error:

`<meta name="viewport content="width=device-width;invalidfoo=1">`
[/filter]




### Invalid property value

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Correct the invalid property value.</td>
  </tr>
</table>

This error occurs when the property value inside an attribute is invalid.
The term property in this context means the structured key/value data inside an attribute.

[filter formats="websites, stories, ads"]
For example, in
`<meta name="viewport content="width=device-width;minimum-scale=1">`,
`device-width` and `1` are property values.

The following results in a INVALID_PROPERTY_VALUE_IN_ATTR_VALUE error:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Note, if you're attempting to output a valueless attribute (for example, an attribute such as `autoplay`, `controls` or `loop` for the [`amp-video`](../../../../documentation/components/reference/amp-video.md), etc.) component), but your HTML build process is generating a default (but invalid) value such as `true` (React, for example, will produce `<amp-video autoplay="true" ...>` [by default](https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true)), the workaround is to output the attribute's name as the value. For example, `<amp-video autoplay="autoplay" ...>`.
[/filter]

### Missing URL

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Fix</strong></td>
    <td>Add the valid URL.</td>
  </tr>
</table>

This error occurs when an attribute that requires a URL is missing it,
for example, an empty `href` or `src` attribute.

### Invalid URL

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Fix</strong></td>
    <td>Fix the broken URL.</td>
  </tr>
</table>

This error occurs when a attribute has a URL,
but the URL is invalid.

### Invalid URL protocol

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Fix</strong></td>
    <td>Change to a valid protocol, for example, `http` may need to be `https`.</td>
  </tr>
</table>

This error occurs for tags that have an `href` or `src`
that must be set to certain protocols.
For example, many tags require `https`.

[filter formats="websites, stories, ads"]
### Mandatory property missing from attribute

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Add the missing property.</td>
  </tr>
</table>

Currently, this error occurs if these mandatory properties are missing:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

They refer to expected tags:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`
[/filter]

### Mutually exclusive attributes

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove one of the mutually exclusive attributes.</td>
  </tr>
</table>

This error occurs when a tag has both of the mutually exclusive attributes.
For example, only one is allowed for the following tags:

* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` or `srcdoc`
* [`amp-jwplayer`](../../../../documentation/components/reference/amp-jwplayer.md): `data-media-id` or `data-playlist-id`

### Missing mandatory attribute from list

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Add the missing mandatory attribute from the choice of attributes provided.</td>
  </tr>
</table>

This error occurs when a tag is missing one required attribute
from multiple choices.
For example, these tags require one attribute from two possible choices:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` or `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` or `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` or `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` or `data-videoid`

### Wrong parent tag

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Make the tag a direct child of the required parent.</td>
  </tr>
</table>

Specific tags require an immediate parent (as opposed to distant ancestor).
The following lists the required parent for specific tags
(tag, parent):

* `!doctype` requires parent tag `root`.
* `html` requires parent tag `!doctype`.
* `head` requires parent tag `html`.
* `body` requires parent tag `html`.
* `link` requires parent tag `head`.
* `meta` requires parent tag `head`.
* `style amp-custom` requires parent tag `head`.
* `style` requires parent tag `boilerplate (noscript)`.
* `noscript` requires parent tag `head`.
* `script` requires parent tag `head`.
* `source` requires a media tag ([`amp-audio`](../../../../documentation/components/reference/amp-audio.md), [`amp-video`](../../../../documentation/components/reference/amp-video.md), etc.).

### Disallowed tag ancestor

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove (or move) the disallowed nested tag.</td>
  </tr>
</table>

This error occurs when a tag is a descendant of another tag
which doesn't validate.
Currently, the only example is a <code>template</code> tag,
which may not be nested under another <code>template</code> tag.

### Mandatory tag ancestor

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Either remove the tag or make it a descendant of the specific tag.</td>
  </tr>
</table>

Mandatory descendants are defined in the
[AMP validator specification](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)
as `mandatory_ancestor`.

The error occurs when the following tags
are missing their `mandatory_ancestor` (tag, ancestor):

* `img` must be a descendant of `noscript`.
* `video` must be a descendant of `noscript`.
* `audio` must be a descendant of `noscript`.
* `noscript` must be a descendant of `body`.

[filter formats="websites, stories, ads"]
### Mandatory tag ancestor with hint

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove the tag, make it a descendate of the specific tag, or replace the tag with the hinted tag.</td>
  </tr>
</table>

The error occurs when one of the following tags is found in the AMP document,
and isn't properly nested in its mandatory parent:

* `img` isn't within `noscript` parent.
* `video` isn't within `noscript` parent.
* `audio` isn't within `noscript` parent.
* `noscript` isn't within `body` parent.
[/filter]

### Duplicate unique tag

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove one of the duplicate tags from the AMP document.</td>
  </tr>
</table>

This error occurs when exactly one instance of the tag is allowed,
and a duplicate is found.

The full list of unique tags is known:

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
[filter formats="websites, stories, ads"]
* `<meta viewport>`
[/filter]
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://cdn.ampproject.org/v0.js">`

## Style and layout errors <a name="style-and-layout-errors"></a>

Before diving into style and layout errors,
it's worth understanding how
[styling](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) and
[layout](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) work in AMP.
Since AMP pages are HTML pages, styling is very much the same as any HTML page.
But there are some restrictions to ensure pages load fast,
and the AMP validator enforces these restrictions.

Layout is more controlled in AMP pages.
Any tag that gets displayed on the page
requires a pre-defined height and width,
significantly reducing rendering and scrolling jank.
This doesn't mean that you have to manually include these attributes.
For certain layout types,
the AMP validator won't throw errors
as default values are assumed.

Each AMP tag has a ist of `supported_layouts`,
as defined in the
[AMP validator specification](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
The validator will throw errors for unsupported layouts,
and it will check validation rules for the pre-defined layout.

### Stylesheet too long

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Reduce the size of the stylesheet to be under 75,000 bytes.</td>
  </tr>
</table>

The AMP validator throws this error
when it measures the size of the styles content
within `<style amp-custom>` to exceed the 75,000 bytes limit.

### CSS syntax error

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>CSS_SYNTAX</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Fix the CSS syntax error.</td>
  </tr>
</table>

This error occurs when you've CSS syntax errors
in the specified tag.
If you aren't sure what's causing the error,
try running the CSS
through an online CSS validator, for example,
[csslint](http://csslint.net/).

### CSS syntax error at specific rule

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Fix the specified CSS syntax error.</td>
  </tr>
</table>

This error refers to the @-rules within CSS,
for which AMP only allows a handful of rules.
(see also the [AMP specification](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).
For example, <code>@import</code> isn't allowed.
The validation error specifically
tells you the rule that's invalid,
making it easier to fix that rule.

### Implied layout isn't supported by AMP tag

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Provide a valid layout attribute for the tag.</td>
  </tr>
</table>

This error occurs when you don't specify a layout for the AMP tag,
and the implied layout (based on width, height, and sizes) isn't supported.
Check the `supported_layout` values for the tag
in the [AMP validator specification](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Actual layout behavior is determined by the `layout` attribute.
For more on how layout works,
see [How to Control Layout](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) and
the [AMP HTML layout system specification](../../../../documentation/components/reference/amp-layout.md).

[tip type="note"]
**NOTE –**  If you don't specify the layout,
and you don't include `width` and `height` values,
the layout defaults to CONTAINER.
The validator throws an error
as CONTAINER isn't supported in any AMP tags.
Specify a layout other than CONTAINER,
or add a `width` and/or `height` value and the error goes away.
[/tip]

### Attribute not allowed by implied layout

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Fix</strong></td>
    <td>Remove the disallowed attribute from the tag,
      or else specify a layout that allows it.</td>
  </tr>
</table>

This error occurs when you don't specify a layout for the AMP tag,
and the implied layout contains a disallowed attribute.
Disallowed attributes for layout types are described in the
[AMP HTML layout system specification](../../../../documentation/components/reference/amp-layout.md).

### Specified layout isn't supported by AMP tag

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Specify a layout that is supported by the tag.</td>
  </tr>
</table>

This error occurs when the specified layout
for the tag isn't supported.
Check the `supported_layout` values for the tag
in the [AMP validator specification](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Actual layout behavior is determined by the `layout` attribute.
For more on how layout works,
see [How to Control Layout](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) and
the [AMP HTML layout system specification](../../../../documentation/components/reference/amp-layout.md).

### Attribute not allowed by specified layout

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Fix</strong></td>
    <td>Remove the disallowed attribute from the tag,
      or else specify a layout that allows it.</td>
  </tr>
</table>

This error occurs when you specify a layout for the AMP tag,
and the layout contains a disallowed attribute.
Disallowed attributes for layout types are described in the
[AMP HTML layout system specification](../../../../documentation/components/reference/amp-layout.md).

### Invalid value for attribute required by layout

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Set the attribute to the specified value.</td>
  </tr>
</table>

This error occurs when the attribute value is invalid for the specified layout.
To understand what triggers this error,
you need to familiarize yourself with
the [different behaviors of layouts](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute).

Let's say you set the layout to be `fixed-height` and
you include numeric values for both `height` and `width`.
The `fixed-height` layout takes on a `height` value.
The `width` attribute must not be present or else set to `auto`.
The validator throws the ATTR_VALUE_REQUIRED_BY_LAYOUT.

### Inconsistent units for width and height

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Provide consistent unit widths and heights.</td>
  </tr>
</table>

With the exception of `layout=fixed`,
width and height attributes need to be expressed in the same units.
When they are not, this error is triggered.

For example, `<amp-img src="" layout="responsive" width="42px" height="42rem">`,
results in this error message:

"Inconsistent units for width and height in tag '[`amp-img`](../../../../documentation/components/reference/amp-img.md)  - width is specified in 'px' whereas height is specified in 'rem'."

## Templating errors

AMP pages can't include templating syntax,
unless that syntax is within an AMP tag specifically
designed to include templates, for example,
[`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md).

It's OK to include templates in your source files,
so long as the generated output of those files doesn't contain the templates
(see also
[Use CSS preprocessors](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md#using-css-preprocessors)).

### Attribute contains template syntax

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove Mustache template syntax from the attribute.</td>
  </tr>
</table>

This error occurs anytime the validator finds
[Mustache template syntax](https://mustache.github.io/mustache.5.html)
in an attribute value.

### Attribute contains unescaped template syntax

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Escape the mustache template.</td>
  </tr>
</table>

This error occurs anytime the validator finds
[unescaped Mustache template syntax](https://mustache.github.io/mustache.5.html)
in an attribute value.

### Attribute contains template partial

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove the mustache partial.</td>
  </tr>
</table>

This error occurs anytime the validator finds a
[Mustache partial](https://mustache.github.io/mustache.5.html)
in an attribute value.

## Deprecation errors

### Deprecated tag

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DEPRECATED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>Remove the deprecated tag.</td>
  </tr>
</table>

This warning occurs when a previously valid AMP tag is found in the AMP document.
It's only a warning; AMP documents with warnings continue to be valid.
Currently no deprecated tags exist; the warning is reserved for future deprecations.

### Deprecated attribute

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Fix</strong></td>
  	<td>As good practice, remove the deprecated attribute.</td>
  </tr>
</table>

This warning occurs when a previously valid AMP attribute is found in the AMP document.
It's only a warning; AMP documents with warnings continue to be valid.

Identify deprecated attributes for each AMP tag
by searching for `deprecation` in the
[AMP validator specification](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

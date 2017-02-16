---
$title: amp-mustache
$order: 46
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



<table>
  <tr>
    <td width="40%"><strong>Description</strong></td>
    <td>Allows rendering of <a href="https://github.com/janl/mustache.js/">Mustache.js</a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Availability</strong></td>
    <td>Stable</td>
  </tr>
  <tr>
    <td width="40%"><strong>Required Script</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Examples</strong></td>
    <td>None</td>
  </tr>
</table>

## Syntax

Mustache is a logic-less template syntax. See [Mustache.js docs](https://github.com/janl/mustache.js/) for more details. Some of the core Mustache tags are:

- {% raw %}`{{variable}}`{% endraw %}: A variable tag. It outputs the the HTML-escaped value of a variable.
- {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: A section tag. It can test the existence of a variable and iterate over it if it's an array.
- {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: An inverted tag. It can test the non-existence of a variable.

## Usage

The `amp-mustache` template has to be defined and used according to the
[AMP Template Spec](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mustache/../../spec/amp-html-templates.md).

First, the `amp-mustache` has to be declared/loaded like this:

[sourcecode:html]
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>
[/sourcecode]

Then, the Mustache templates can be defined in the `template{% raw %}`{{world}}`{% endraw %}amp-mustache` templates are required to be well-formed DOM fragments. This means
that among other things, you can't use `amp-mustache` to:

- Calculate tag name. E.g. {% raw %}`{{tagName}}`{% endraw %} is not allowed.
- Calculate attribute name. E.g. {% raw %}`{{attrName}}`{% endraw %} is not allowed.
- Output arbitrary HTML using {% raw %}`{{unescaped}}}`{% endraw %}. The output of "triple-mustache" is sanitized to only allow
formatting tags such as `<b>`, `<i>`, and so on.

Notice also that because the body of the template has to be specified within the `template` element, it is
impossible to specify {% raw %}`{{&var}}`{% endraw %} expressions - they will always be escaped as {% raw %}`{{&amp;var}}`{% endraw %}. The triple-mustache
{% raw %}`{{var}}}`{% endraw %} has to be used for these cases.

## Validation

See [amp-mustache rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mustache/0.1/validator-amp-mustache.protoascii) in the AMP validator specification.

## Creating a New Sample

Samples live in `examples/source`. Pick one of the existing category folders.

If your sample can live in a single HTML file, create a new `*.html` in one of the sample category folders:

```shell
$ vim examples/source/1.components/amp-awesome.html
```

If your sample requires a custom backend API, create a new folder that is to contain both, your sample HTML file, which must be named `index.html`, and your API implementation, which must be named `api.js`.

```shell
$ mkdir examples/source/1.components/amp-awesome
$ vim examples/source/1.components/amp-awesome/index.html
$ vim examples/source/1.components/amp-awesome/api.js
```

If your sample, does not fit into one of the existing categories, please [open an issue](https://github.com/ampproject/docs/issues/new) first and ask for feedback.

[Here is a sample template](https://gist.github.com/sebastianbenz/45d3dae499f35dedb65e01546356ff7a) you can use to get started.

## Frontmatter

Samples can define additional metadata, such as author name or supported AMP formats, via a YAML frontmatter. Here is a template to get you started:

```
<!---
author: your-github-username
formats:
  - websites
--->
```

**Note the triple dash comment (`<!---`).** Also, make sure to list all supported formats (websites, ads, email, stories).

You must list all the supported AMP formats that your sample supports. If your sample is for a specific AMP format, define that single format.

```
formats
  - email
```

Please list all experimental components that your sample uses:

```
experiments:
  - amp-autocomplete
```

Other supported flags are:

**`validAmp`:** marks the sample as intentionally invalid AMP skipping validation during build.

```yaml
validAmp # [default: true]
  - true
  - false
```

**`draft`:** marks the sample as draft so it won't be linked to from the homepage, but will still be accessible via URL.

```yaml
draft # [default: true]
  - true
  - false
```

**`landscape` (only for AMP Stories):** use landscape mode previews.
```yaml
draft # [default: false]
  - true
  - false
```

**`tags`:** assign the sample to multiple categories.

```yaml
tags # [default: '']
  - ads-analytics
  - dynamic-content
  - layout
  - media
  - presentation
  - social
  - personalization
```

## Writing the sample

Add documentation to your sample's code by wrapping text in HTML comments:

```html
<!-- Look! Images in AMP. -->
<amp-img src="img/image1.jpg" width="200" height="100" layout="responsive"></amp-img>
```

This works for elements in the `<head>` as well:

```html
<head>
  <!-- Import the amp-youtube component -->
  <script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js"></script>
  ...
</head>
```

Every HTML comment creates a separate example section spanning the following HTML element.

```html
<!-- This comment spans the whole following section including the two images -->
<section>
  <amp-img src="img/image1.jpg" width="200" height="100" layout="responsive"></amp-img>
  <amp-img src="img/image2.jpg" width="200" height="100" layout="responsive"></amp-img>
</section>
```

Nesting comments are not supported:

```html
<!-- A comment -->
<div>
  <!-- This does not work because the parent div has already a comment -->
  <amp-img src="img/image1.jpg" width="200" height="100" layout="responsive"></amp-img>
</div>
<div>
  <!-- Commenting inside nested tags works though -->
  <amp-img src="img/image1.jpg" width="200" height="100" layout="responsive"></amp-img>
</div>
```

If your comment spans multiple elements, wrap these in a single `<div>` without any attributes. The enclosing `<div>` tag will be hidden in source code listings:

```html
<!-- The enclosing `div` will be hidden in source code listings. -->
<div>
  <button on="tap:my-lightbox" role="button" tabindex="0">Open lightbox</button>
  <amp-lightbox id="my-lightbox" layout="nodisplay">
    <h1>Hello World!</h1>
  </amp-lightbox>
</div>
```

#### Sample Styling

Sometimes it's good to add a little bit more styling to a sample (e.g., to separate a button from an input field). To make sure that all samples have a consistent styling, please use the following CSS variables to style specific elements in your sample:

```
:root {
  --color-primary: #005AF0;
  --color-secondary: #00DCC0;
  --color-text-light: #fff;
  --color-text-dark: #000;
  --color-error: #B00020;
  --color-bg-light: #FAFAFC;

  --space-1: .5rem;  /* 8px */
  --space-2: 1rem;   /* 16px */
  --space-3: 1.5rem; /* 24px */
  --space-4: 2rem;   /* 32px */

  --box-shadow-1: 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 1px -1px rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
```

You can use them to style your samples like this:

```
.button {
  margin: var(--space-2);
  padding: var(--space-1);
  background-color: var(--color-primary);
  color: var(--color-text-light);
}
```

Only add the ones that you need for the sample. These CSS variable declarations will be automatically added to your sample if you use `npx gulp create ...` to create the sample.

**Colors**

<img width="743" alt="screenshot 2018-11-30 at 00 22 57" src="https://user-images.githubusercontent.com/380472/49258635-6aae0180-f436-11e8-8ca0-2210fd4c0a96.png">

**Spaces**

<img width="643" alt="screenshot 2018-11-30 at 00 23 08" src="https://user-images.githubusercontent.com/380472/49258634-6aae0180-f436-11e8-9716-50c69970c113.png">

#### Formatting

You can use [Markdown](https://help.github.com/articles/github-flavored-markdown/) to format your documentation:

```html
<!--
  A simple [responsive]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md', locale=doc.locale).url.path}})
  image - *width* and *height* are used to determine the aspect ratio.
-->
<amp-img src="img/image1.jpg" width="200" height="100" layout="responsive"></amp-img>
```

#### Notes, Warnings & Tips

There's a special markup available for callouts:

```
[tip type="default|important|note|read-on"]
Tip!
[/tip]
```

For example:

```
[tip type="important"]
Warning! This might go wrong.
[/tip]
```

#### Hints

If you'd like to provide additional information about a single element inside a section, use the `<!--~ hint syntax ~-->`:

```html
<!-- A comment about the form. -->
<form method="post"
  action-xhr="https://example.com/subscribe"
  target="_top">
  <fieldset>
    <input type="text" name="username">

    <!--~ Addition explanation about the hidden field. ~-->
    <input type="hidden" name="id" value="abc">
  </fieldset>
</form>
```

This will make the `<input>` element clickable, with the additional explanation appearing on click.

#### Filtering

If a section is only applicable to one format, use `@format(comma-separated-list)` anywhere in the section comment to indicate that section is only applicable to the format(s) listed.

```html
<!--
  The following code only applies to AMP emails.

  @format(email)
-->
<p>Hello, world!</p>
```

### Adding backend functionality

Before writing your own API endpoint, please take a look at the [existing generic API endpoints](https://github.com/ampproject/docs/tree/future/examples/api), maybe you can re-use one of them.

Sample specific backend endpoints live in a JS file inside the sample folder. They are implemented via [Express routing](https://expressjs.com/en/guide/routing.html). You can address your API endpoints relative to your sample's location, e.g. `<amp-list src="you-api-route' ...>`.

Here is a template to get you started:

```
/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const examples = express.Router();

examples.get('/echo', (request, response) => {
  response.json(request.query);
});

module.exports = examples;
```

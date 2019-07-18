# Writing documentation and guides

This document holds all the information that is relevant to maintain and contribute the content for each if its packages.

## Collections
Pages inside [Grow](https://grow.io/docs/) are stored in so called collections. A collection is established by creating a *_blueprint.yaml* in a directory. The following fields are evaluated by the amp.dev setup:

```yaml
# If true on a collection, "Get started" and "Previous chapter" and "Next chapter"
# link are automatically added to the bottom of the page
chaptered: true|false
```

## Documents

### Frontmatter
The documents inside the *pages* package are Grow documents that use the [built-in fields](http://grow.io/docs/documents/#built-in-fields) and some additional ones that are used to categorize them:

```yaml
formats [default: websites,ads,email,stories]:
  - websites
  - ads
  - email
  - stories
status [default: production]:
  - experimental
  - canary
  - production
validAmp [default: true]
  - true
  - false
draft [default: true]
  - true
  - false
tags [default: '']
  - ads-analytics
  - dynamic-content
  - layout
  - media
  - presentation
  - social
  - personalization
```

### Format filtering documents
By the categorization via the `formats` list in the frontmatter the user is able to filter the documentation by one of the formats. The filtered variants of each page get generated during build time but you are also able to create custom filtered ones by duplicating the document you want to filter it and append the format it is going to be filtered by. So for example a filtered version of `index@es.md` becomes `index.ads.md`.

If the document has a specific path that is not getting inherited from the `_blueprint.yaml` also make sure to set a matching path. Same example: `index.md` has `$path: /category.html` then `index.ads.md` needs to have `$path: /category.ads.html`. Otherwise the build process is not able to match the base and the filtered variant. To not have double navigation items make sure to also give `$hidden: true` to the filtered variant.

### Format filtered paragraphs
Documents will be relevant to multiple formats on a broad scope, but may contain sections and paragraphs that are not accurate for all formats listed in the frontmatter. You can wrap paragraphs in a filter to hide or show them, depending on what format the user has selected.

```
[filter formats="websites"]
This is only visible for [websites](?format=websites).
[/filter]

[filter formats='websites, email']
This is visible for [websites](?format=websites) & [email](?format=email).
[/filter]

[filter formats="stories"]
This is visible for [stories](?format=stories).
[/filter]
```

### Shortcodes
The project enables various shortcodes to extend the basic functionality of markdown.

**Tip**
```md
[tip type="default|important|note|read-on"]
# Headline
Text.
[/tip]
```

The `type=default` can be omitted.

**Video**
```md
[video src="https://www.youtube.com/watch?v=npum8JsITQE" caption="This is the caption text."]
```

The video ID (`npum8JsITQE` in the above example) will be extracted automatically.

**Stage**
```md
<section class="ap--stage ap--container-fluid">
[stage format="websites|stories|ads|emails"]
## What is AMP?
# AMP is a web component framework for easily creating user first

[Get Started](/content/amp-dev/documentation/guides-and-tutorials/index.md)
[/stage]
</section>
```

The Link is optional and will create a button inside the stage.

**Teaser grid**
```md
[teaser-grid]
[](/content/shared/fill-ins/success-story.md)
[](/content/shared/fill-ins/success-story-2.md)
[](/content/shared/fill-ins/success-story.md)

[All success stories](#)
[/teaser-grid]
```

A list of links that will expand to a row of cards that link to the document.

**Importing AMP Components**

Import AMP components via:

```md
{% do doc.amp_dependencies.add('amp-anim', '0.1') %}
```

### Code Samples
Code samples are placed inside sets of three backticks. The sourcecode language specified at the end of the first backtick set.

<pre>
```html
  // code sample
```

```css
  // code sample
```

```js
  // code sample
```
</pre>

If your code contains double curly braces, which often is the case if you use amp-mustache templates, you have to wrap the code part:

<pre>
```html
{% raw %}
  // code with double curly braces
{% endraw %}
```
</pre>

**Code samples in lists**

Python-Markdown has some limitations. Use the following syntax when including code samples in lists:
<pre>
  <code>
  1. First:
    [sourcecode:html]
      &lt;html&gt;
          &lt;p&gt;Indented content.&lt;/p&gt;
      &lt;/html&gt;
    [/sourcecode]
  2. Second
  3. Third
  </code>
</pre>

**Code samples with preview**

You can let a code sample have a preview or a link to open the code sample in the AMP Playground:

<pre>
  <code>
[example preview="default: none|inline"
         playground="default: true|false"
         imports="&lt;custom-element-1&gt;,&lt;custom-element-2&gt;,..."
         template="&lt;custom-template&gt;"]
```html
  // code sample
```
[/example]
  </code>
</pre>

An inline preview is only possible if the code does not contain any head elements.
For email content with resource links use the placeholder `{{server_for_email}}`.

<pre>
  <code>
[example preview="inline"
         playground="true"
         imports="amp-list"
         template="amp-mustache"]
```html
&lt;amp-list width=&quot;auto&quot; height=&quot;100&quot; layout=&quot;fixed-height&quot;
  src=&quot;{{server_for_email}}/static/inline-examples/data/amp-list-urls.json&quot;&gt;
  &lt;template type=&quot;amp-mustache&quot;&gt;{% raw %}
    &lt;div class=&quot;url-entry&quot;&gt;
      &lt;a href=&quot;{{url}}&quot;&gt;{{title}}&lt;/a&gt;
    &lt;/div&gt;
  {% endraw %}&lt;/template&gt;
&lt;/amp-list&gt;
```
[/example]
  </code>
</pre>

### SUCCESS STORY (EXAMPLE STRUCTURE)

Arrays can contain multiple elements. The media source can be `image_src` or `video_src`.

Leave the device.direction property empty to get a flat front view.
Device.layouts and their ratios:
  - Desktop: 8:5
  - Tablet: 4:3
  - Mobile: 3:5

The order of contents' elements is equal to the order of the resulting page.
Content layouts:
  - media + text
  - media only
  - text only
  - quote
  - text with media + button

The stage has the ability to display three different device layouts:
  - all (Three elements with devices.type desktop, tablet and mobile)
  - tablet-mobile (Two elements with devices.type tablet and mobile)
  - mobile (One element with devices.type mobile)
Other combinations aren't allowed and can lead to broken layouts.

```yaml
stage:
  headline: <string>
  subline: <string>
  layout: [all | tablet-mobile | mobile]
  devices:
    - image_src: [url] | video_src: [url]
      width: <number>
      height: <number>
      type: [mobile |  tablet | desktop] (depends on the layout)
      direction: [left | right | left-flat | right-flat] (optional)
      alt: <string>
      poster_src: [url]
      artwork_src: [url]
      video_title: <string>
      video_artist: <string>
      video_album: <string>

kpis:
  - value: <string>
    text: <string> (optional)

contents:
  #(media + text)
  - layout: text-media
    image_src: [url] | video_src: [url]
    width: <number>
    height: <number>
    type: [mobile |  tablet | desktop] (optional)
    direction: [left | right | left-flat | right-flat] (optional)
    alt: <string>
    headline: <string> (optional)
    text: <string>
    background: [gradient | gray]

  #(media only)
  - layout: media
    image_src: [url] | video_src: [url]
    width: <number>
    height: <number>
    type: [mobile |  tablet | desktop] (optional)
    direction: [left | right | left-flat | right-flat] (optional)
    alt: <string>

  #(text only)
  - layout: text
    headline: <string> (optional)
    text: <string>

  #(quote)
  - layout: quote
    quote: <string>
    image_src: [url]
    width: <number>
    height: <number>
    alt: <string>
    author: <string>
    story_url: [url]

  #(text + media + button)
  - layout: text-button
    image_src: [url] | video_src: [url]
    width: <number>
    height: <number>
    type: [mobile |  tablet | desktop] (optional)
    direction: [left | right | left-flat | right-flat] (optional)
    alt: <string>
    headline: <string> (optional)
    text: <string>
    download_url: [url]
    background: [gradient | gray]
```

---
"$title": AMP HTML Specification
order: '8'
formats:
- websites
teaser:
  text: |2-

    AMP HTML is a subset of HTML for authoring content pages such as news
    articles in a way that guarantees certain baseline performance
    characteristics.
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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

AMP HTML is a subset of HTML for authoring content pages such as news articles in a way that guarantees certain baseline performance characteristics.

Being a subset of HTML, it puts some restrictions on the full set of tags and functionality available through HTML but it does not require the development of new rendering engines: existing user agents can render AMP HTML just like all other HTML.

[tip type="read-on"] If you're primarily interested in what's allowed in AMP and what isn't, watch our [primer video on AMP's limitations](https://www.youtube.com/watch?v=Gv8A4CktajQ). [/tip]

Also, AMP HTML documents can be uploaded to a web server and served just like any other HTML document; no special configuration for the server is necessary. However, they are also designed to be optionally served through specialized AMP serving systems that proxy AMP documents. These documents serve them from their own origin and are allowed to apply transformations to the document that provide additional performance benefits. An incomplete list of optimizations such a serving system might do is:

- Replace image references with images sized to the viewer’s viewport.
- Inline images that are visible above the fold.
- Inline CSS variables.
- Preload extended components.
- Minify HTML and CSS.

AMP HTML uses a set of contributed but centrally managed and hosted custom elements to implement advanced functionality such as image galleries that might be found in an AMP HTML document. While it does allow styling the document using custom CSS, it does not allow author written JavaScript beyond what is provided through the custom elements to reach its performance goals.

By using the AMP format, content producers are making the content in AMP files available to be crawled (subject to robots.txt restrictions), cached, and displayed by third parties.

## Производительность <a name="performance"></a>

Predictable performance is a key design goal for AMP HTML. Primarily we are aiming at reducing the time until the content of a page can be consumed / used by the user. In concrete terms this means that:

- HTTP requests necessary to render and fully layout the document should be minimized.
- Такие ресурсы, как изображения или реклама, следует загружать только в том случае, если они могут быть просмотрены пользователем.
- Browsers should be able to calculate the space needed by every resource on the page without fetching that resource.

## Формат AMP HTML <a name="the-amp-html-format"></a>

### Образец документа <a name="sample-document"></a>

[sourcecode:html]
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Sample document</title>
    <link rel="canonical" href="./regular-html-version.html" />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <style amp-custom>
      h1 {
        color: red;
      }
    </style>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Article headline",
        "image": ["thumbnail1.jpg"],
        "datePublished": "2015-02-05T08:00:00+08:00"
      }
    </script>
    <script
      async
      custom-element="amp-carousel"
      src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-ad"
      src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
    ></script>
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Sample document</h1>
    <p>
      Some text
      <amp-img src="sample.jpg" width="300" height="300"></amp-img>
    </p>
    <amp-ad
      width="300"
      height="250"
      type="a9"
      data-aax_size="300x250"
      data-aax_pubname="test123"
      data-aax_src="302"
    >
    </amp-ad>
  </body>
</html>
[/sourcecode]

### Required markup <a name="required-markup"></a>

AMP HTML documents MUST

- <a name="dctp"></a> начинаться с элемента `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a> содержать тег верхнего уровня `<html ⚡>` (также допускается `<html amp>`). [🔗](#ampd)
- <a name="crps"></a> содержать теги `<head>` и `<body>` (в HTML они необязательны). [🔗](#crps)
- <a name="canon"></a>содержать тег `<link rel="canonical" href="$SOME_URL">` (внутри тега head), указывающий на «обычную» HTML-версию документа AMP HTML либо на текущий документ (если обычной HTML-версии не существует). [🔗](#canon)
- <a name="chrs"></a> содержать `<meta charset="utf-8">` в качестве первого дочернего элемента тега head. [🔗](#chrs)
- <a name="vprt"></a> содержать тег `<meta name="viewport" content="width=device-width">` внутри своего тега head. Также рекомендуется добавлять `minimum-scale=1` и `initial-scale=1`. [🔗](#vprt)
- <a name="scrpt"></a> содержать `<script async src="https://cdn.ampproject.org/v0.js"></script>` в теге head. [🔗](#scrpt)
- <a name="boilerplate"></a> содержать [шаблонный код AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md) ( `head > style[amp-boilerplate]` и `noscript > style[amp-boilerplate]`) в теге head. [🔗](#boilerplate)

### Метаданные <a name="metadata"></a>

It is encouraged that AMP HTML documents are annotated with standardized metadata: [Open Graph Protocol](http://ogp.me/), [Twitter Cards](https://dev.twitter.com/cards/overview), etc.

We also recommend that AMP HTML documents are marked up with [schema.org/CreativeWork](https://schema.org/CreativeWork) or any of its more specific types such as [schema.org/NewsArticle](https://schema.org/NewsArticle) or [schema.org/BlogPosting](https://schema.org/BlogPosting).

### HTML-теги <a name="html-tags"></a>

HTML tags can be used unchanged in AMP HTML. Certain tags have equivalent custom tags (such as `<img>` and `<amp-img>`) and other tags are outright prohibited:

<table>
  <tr>
    <th width="30%">Tag</th>
    <th>Status in AMP HTML</th>
  </tr>
  <tr>
    <td width="30%">script</td>
    <td>Запрещен, если параметр type не имеет значение <code>application/ld+json</code>, <code>application/json</code> или <code>text/plain</code> (другие неисполняемые значения могут быть добавлены по мере необходимости). Исключения — обязательный тег script, используемый для загрузки среды выполнения AMP, а также теги script для загрузки расширенных компонентов.</td>
  </tr>
  <tr>
    <td width="30%">noscript</td>
    <td>Разрешен. Можно использовать в любом месте документа. Содержимое внутри элемента <code><noscript></noscript></code> будет показано, если пользователь отключит JavaScript.</td>
  </tr>
  <tr>
    <td width="30%">base</td>
    <td>Запрещен.</td>
  </tr>
  <tr>
    <td width="30%">img</td>
    <td>Заменен на <code>amp-img</code>.<br> Обратите внимание: в соответствии со стандартом HTML5 <code><img></code> является <a href="https://www.w3.org/TR/html5/syntax.html#void-elements">пустым элементом</a>, поэтому у него нет закрывающего тега. Однако у <code></code> закрывающий тег есть (<code></code>).</td>
  </tr>
    <tr>
    <td width="30%">picture</td>
    <td>Запрещен. Чтобы выдавать изображения в разных форматах, используйте атрибут <a href="https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders?format=websites">fallback</a> или добавьте несколько атрибутов <a href="https://amp.dev/documentation/components/amp-img#attributes"><code>srcset</code> в элемент </a><code></code>.</td>
  </tr>
  <tr>
    <td width="30%">video</td>
    <td>Заменен на <code>amp-video</code>.</td>
  </tr>
  <tr>
    <td width="30%">audio</td>
    <td>Заменен на <code>amp-audio</code>.</td>
  </tr>
  <tr>
    <td width="30%">iframe</td>
    <td>Заменен на <code>amp-iframe</code>.</td>
  </tr>
    <tr>
    <td width="30%">frame</td>
    <td>Запрещен.</td>
  </tr>
  <tr>
    <td width="30%">frameset</td>
    <td>Запрещен.</td>
  </tr>
  <tr>
    <td width="30%">object</td>
    <td>Запрещен.</td>
  </tr>
  <tr>
    <td width="30%">param</td>
    <td>Запрещен.</td>
  </tr>
  <tr>
    <td width="30%">applet</td>
    <td>Запрещен.</td>
  </tr>
  <tr>
    <td width="30%">embed</td>
    <td>Запрещен.</td>
  </tr>
  <tr>
    <td width="30%">form</td>
    <td>Разрешен. Требует добавления расширения <a href="https://amp.dev/documentation/components/amp-form">amp-form</a>.</td>
  </tr>
  <tr>
    <td width="30%">Элементы input <a></a>
</td>
    <td>В основном разрешены, <a href="https://amp.dev/documentation/components/amp-form#inputs-and-fields">за исключением некоторых типов</a>, а именно <code></code>, <code></code>. Разрешены также связанные с ними теги: <code></code>, <code></code>
</td>
  </tr>
  <tr>
    <td width="30%">button</td>
    <td>Разрешен.</td>
  </tr>
  <tr>
    <td width="30%"><code>style</code></td>
    <td>
<a href="#boilerplate">Обязательный тег стиля для amp-boilerplate</a>. В теге head допускается еще один тег стиля для индивидуального оформления. Этот тег стиля должен иметь атрибут <code>amp-custom</code>. <a href="#cust">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">link</td>
    <td>Допускаются значения <code>rel</code>, зарегистрированные на <a href="http://microformats.org/wiki/existing-rel-values">microformats.org</a>. Если значение <code>rel</code> отсутствует в нашем белом списке, <a href="https://github.com/ampproject/amphtml/issues/new">создайте задачу</a>. Запрещены <code>stylesheet</code> и другие значения, такие как <code>preconnect</code>, <code>prerender</code> и <code>prefetch</code>, имеющие побочные эффекты в браузере. Предусмотрено одно исключение для загрузки таблиц стилей с сайтов разрешенных поставщиков шрифтов.</td>
  </tr>
  <tr>
    <td width="30%">meta</td>
    <td>Атрибут <code>http-equiv</code> может использоваться для указания определенных допустимых значений; подробности см. в <a href="https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii">спецификации валидатора AMP</a>.</td>
  </tr>
  <tr>
    <td width="30%"><code>a</code></td>
    <td>Значение атрибута <code>href</code> не должно начинаться с <code>javascript:</code>. Если установлен атрибут <code>target</code>, значение должно быть <code>_blank</code>. В остальных случаях разрешен. <a href="#ancr">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">svg</td>
    <td>Most SVG elements are allowed.</td>
  </tr>
</table>

Validator implementations should use a white list based on the HTML5 specification with the above tags removed. See [AMP Tag Addendum](https://github.com/ampproject/amphtml/blob/master/spec/amp-tag-addendum.md).

### Комментарии <a name="comments"></a>

Conditional HTML comments are not allowed.

### HTML-атрибуты <a name="html-attributes"></a>

Attribute names starting with `on` (such as `onclick` or `onmouseover`) are disallowed in AMP HTML. The attribute with the literal name `on` (no suffix) is allowed.

XML-related attributes, such as xmlns, xml:lang, xml:base, and xml:space are disallowed in AMP HTML.

Internal AMP attributes prefixed with `i-amp-` are disallowed in AMP HTML.

### Классы <a name="classes"></a>

Internal AMP class names prefixed with `-amp-` and `i-amp-` are disallowed in AMP HTML.

Consult [AMP documentation](https://github.com/ampproject/amphtml/blob/master/spec/amp-css-classes.md) for meaning of class names prefixed with `amp-`. The use of these classes is allowed and meant to allow customization of some features of AMP runtime and extensions.

All other authored class names are allowed in AMP HTML markup.

### IDs <a name="ids"></a>

Certain ID names are disallowed in AMP HTML, such as IDs prefixed with `-amp-` and `i-amp-` that may conflict with internal AMP IDs.

Consult the AMP documentation for specific extensions before using `amp-` and `AMP` IDs to avoid conflict with the features provided by these extensions, such as `amp-access`.

View the full list of disallowed ID names by searching for `mandatory-id-attr` [here](https://github.com/ampproject/amphtml/blob/master/spec/../validator/validator-main.protoascii).

### Ссылки <a name="links"></a>

The `javascript:` schema is disallowed.

### Таблицы стилей <a name="stylesheets"></a>

Major semantic tags and the AMP custom elements come with default styles to make authoring a responsive document reasonably easy. An option to opt out of default styles may be added in the future.

#### @-rules <a name="-rules"></a>

The following @-rules are allowed in stylesheets:

`@font-face`, `@keyframes`, `@media`, `@page`, `@supports`.

`@import` will not be allowed. Others may be added in the future.

#### Авторские таблицы стилей <a name="author-stylesheets"></a>

Authors may add custom styles to a document using a single `<style amp-custom>` tag in the head of the document or inline styles.

`@keyframes` rules are allowed in the `<style amp-custom>`. However, if they are too many of them, it's recommended to place them in the additional `<style amp-keyframes>` tag, which must be located at the end of the AMP document. For details, see the [Keyframes stylesheet](#keyframes-stylesheet) section of this document.

#### Селекторы <a name="selectors"></a>

The following restrictions apply to selectors in author style sheets:

##### Имена классов и тегов <a name="class-and-tag-names"></a>

Class names, IDs, tag names and attributes, in author stylesheets, may not start with the string `-amp-` and `i-amp-`. These are reserved for internal use by the AMP runtime. It follows, that the user's stylesheet may not reference CSS selectors for `-amp-` classes, `i-amp-` IDs and `i-amp-` tags and attributes. These classes, IDs and tag/attribute names are not meant to be customized by authors. Authors, however, can override styles of `amp-` classes and tags for any CSS properties not explicitly forbidden by these components' spec.

To prevent usage of attribute selectors to circumvent class name limitations it is generally not allowed for CSS selectors to contain tokens and strings starting with `-amp-` and `i-amp-`.

#### Important <a name="important"></a>

Usage of the `!important` qualifier is not allowed. This is a necessary requirement to enable AMP to enforce its element sizing invariants.

#### Свойства <a name="properties"></a>

AMP only allows transitions and animations of properties that can be GPU accelerated in common browsers. We currently white list: `opacity`, `transform` (also `-vendorPrefix-transform`).

In the following examples `<property>` needs to be in the white list above.

- `transition <property>` (also -vendorPrefix-transition)
- `@keyframes name { from: {<property>: value} to {<property: value>} }` (также `@-vendorPrefix-keyframes`)

#### Максимальный размер <a name="maximum-size"></a>

It is a validation error if the author stylesheet or inline styles together are larger than 75,000 bytes.

### Таблица стилей ключевых кадров <a name="keyframes-stylesheet"></a>

In addition to the `<style amp-custom>`, authors may also add the `<style amp-keyframes>` tag, which is allowed specifically for keyframes animations.

The following restrictions apply to the `<style amp-keyframes>` tag:

1. Может быть размещен только как последний дочерний элемент элемента `<body>`.
2. Может содержать только `@keyframes`, `@media`, `@supports` и их комбинации.
3. Его объем не может превышать 500 000 байт.

The reason the `<style amp-keyframes>` tag exists is because keyframes rules are often bulky even for moderately complicated animations, which leads to slow CSS parsing and first contentful paint. But such rules often exceed the size limit imposed on `<style amp-custom>`. Putting such keyframes declarations at the bottom of the document in the `<style amp-keyframes>` allows them to exceed size limitations. And since keyframes are not render-blocking, it also avoids blocking first contentful paint to parse them.

Example:

[sourcecode:html]
<style amp-keyframes>
@keyframes anim1 {}

@media (min-width: 600px) {
  @keyframes anim1 {}
}
</style>
</body>
[/sourcecode]

### Пользовательские шрифты <a name="custom-fonts"></a>

Authors may include stylesheets for custom fonts. The 2 supported methods are link tags pointing to white listed font providers and `@font-face` inclusion.

Example:

[sourcecode:html]
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Tangerine"
/>
[/sourcecode]

Font providers can be white listed if they support CSS-only integrations and serve over HTTPS. The following origins are currently allowed for font serving via link tags:

- Fonts.com: `https://fast.fonts.net`
- Google Fonts: `https://fonts.googleapis.com`
- Font Awesome: `https://maxcdn.bootstrapcdn.com, https://use.fontawesome.com`
- [Typekit](https://helpx.adobe.com/typekit/using/google-amp.html): `https://use.typekit.net/kitId.css` (замените `kitId` соответствующим образом)

IMPLEMENTERS NOTE: Adding to this list requires a change to the AMP Cache CSP rule.

Authors are free to include all custom fonts via an `@font-face` CSS instruction via their custom CSS. Fonts included via `@font-face` must be fetched via the HTTP or HTTPS scheme.

## Среда выполнения AMP <a name="amp-runtime"></a>

The AMP runtime is a piece of JavaScript that runs inside every AMP document. It provides implementations for AMP custom elements, manages resource loading and prioritization and optionally includes a runtime validator for AMP HTML for use during development.

The AMP runtime is loaded via the mandatory <code><script src="https://cdn.ampproject.org/v0.js"></script></code> tag in the AMP document <code></code>.

The AMP runtime can be placed into a development mode for any page. Development mode will trigger AMP validation on the embedded page, which will emit the validation status and any errors to the JavaScript developer console. Development mode may be triggered by appending `#development=1` to the URL of the page.

## Ресурсы <a name="resources"></a>

Resources such as images, videos, audio files or ads must be included into an AMP HTML file through custom elements such as `<amp-img>`. We call them “managed resources” because whether and when they will be loaded and displayed to the user is decided by the AMP runtime.

There are no particular guarantees as to the loading behavior of the AMP runtime, but it should generally strive to load resources quickly enough, so that they are loaded by the time the user would like to see them if possible. The runtime should prioritize resources currently in the viewport and attempt to predict changes to the viewport and preload resources accordingly.

The AMP runtime may at any time decide to unload resources that are not currently in viewport or reuse the resource containers such as iframes to reduce overall RAM consumption.

## Компоненты AMP <a name="amp-components"></a>

AMP HTML uses custom elements called “AMP components” to substitute built-in resource-loading tags such as `<img>` and `<video>` and to implement features with complex interactions such as image lightboxes or carousels.

See the [AMP component spec](https://github.com/ampproject/amphtml/blob/master/spec/./amp-html-components.md) for details about supported components.

There are 2 types of supported AMP components:

1. Встроенные
2. Расширенные

Built-in components are always available in an AMP document and have a dedicated custom element such as `<amp-img>`. Extended components must be explicitly included into the document.

### Общие атрибуты <a name="common-attributes"></a>

#### `layout`, `width`, `height`, `media`, `placeholder`, `fallback` <a name="layout-width-height-media-placeholder-fallback"></a>

These attributes define the layout of an element. The key goal here is to ensure that the element can be displayed and its space can be properly reserved before any of the JavaScript or remote resources have been downloaded.

See the [AMP Layout System](https://github.com/ampproject/amphtml/blob/master/spec/./amp-html-layout.md) for details about the layout system.

#### `on` <a name="on"></a>

The `on` attribute is used to install event handlers on elements. The events that are supported depend on the element.

The value for the syntax is a simple domain specific language of the form:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

Example: `on="tap:fooId.showLightbox"`

If `methodName` is omitted the default method is executed if defined for the element. Example: `on="tap:fooId"`

Some actions, if documented, may accept arguments. The arguments are defined between parentheses in `key=value` notation. The accepted values are:

- простые строки без кавычек: `simple-value`;
- строки в кавычках: `"string value"` или `'string value'`;
- логические значения: `true` или `false`;
- числа: `11` или `1.1`.

You can listen to multiple events on an element by separating the two events with a semicolon `;`.

Example: `on="submit-success:lightbox1;submit-error:lightbox2"`

Read more about [AMP Actions and Events](https://github.com/ampproject/amphtml/blob/master/spec/./amp-actions-and-events.md).

### Расширенные компоненты <a name="extended-components"></a>

Extended components are components that do not necessarily ship with the AMP runtime. Instead they must be explicitly included into the document.

Extended components are loaded by including a `<script>` tag in the head of the document like this:

[sourcecode:html]
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
[/sourcecode]

The `<script>` tag must have an `async` attribute and must have a `custom-element` attribute referencing the name of the element.

Runtime implementations may use the name to render placeholders for these elements.

The script URL must start with `https://cdn.ampproject.org` and must follow a very strict pattern of `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js`.

##### URL <a name="url"></a>

The URL for extended components is of the form:

[sourcecode:http]
https://cdn.ampproject.org/$RUNTIME_VERSION/$ELEMENT_NAME-$ELEMENT_VERSION.js
[/sourcecode]

##### Управление версиями <a name="versioning"></a>

See the [AMP versioning policy](https://github.com/ampproject/amphtml/blob/master/spec/amp-versioning-policy.md).

### Шаблоны <a name="templates"></a>

Templates render HTML content based on the language-specific template and provided JSON data.

See the [AMP template spec](https://github.com/ampproject/amphtml/blob/master/spec/./amp-html-templates.md) for details about supported templates.

Templates are not shipped with the AMP runtime and have to be downloaded just as with extended elements. Extended components are loaded by including a `<script>` tag in the head of the document like this:

[sourcecode:html]
<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
></script>
[/sourcecode]

The `<script>` tag must have an `async` attribute and must have a `custom-template` attribute referencing the type of the template. The script URL must start with `https://cdn.ampproject.org` and must follow a very strict pattern of `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js`.

The templates are declared in the document as following:

[sourcecode:html]
<template type="amp-mustache" id="template1">
  Hello {% raw %}{{you}}{% endraw %}!
</template>
[/sourcecode]

The `type` attribute is required and must reference a declared `custom-template` script.

The `id` attribute is optional. Individual AMP elements discover their own templates. Typical scenarios would involve an AMP element looking for a `<template>` either among its children or referenced by ID.

The syntax within the template element depends on the specific template language. However, the template language could be restricted within AMP. For instance, in accordance with the "template" element, all productions have to be over a valid well-formed DOM. All of the template outputs are also subject to sanitizing to ensure AMP-valid output.

To learn about the syntax and restrictions for an template, visit the [template's documentation](https://github.com/ampproject/amphtml/blob/master/spec/./amp-html-templates.md#templates).

##### URL <a name="url-1"></a>

The URL for extended components is of the form:

[sourcecode:http]
https://cdn.ampproject.org/$RUNTIME_VERSION/$TEMPLATE_TYPE-$TEMPLATE_VERSION.js
[/sourcecode]

##### Управление версиями <a name="versioning-1"></a>

See versioning of custom elements for more details.

## Безопасность <a name="security"></a>

AMP HTML documents must not trigger errors when served with a Content Security Policy that does not include the keywords `unsafe-inline` and `unsafe-eval`.

The AMP HTML format is designed so that is always the case.

All AMP template elements must go through AMP security review before they can be submitted into AMP repository.

## SVG <a name="svg"></a>

Currently, the following SVG elements are allowed:

- базовые: "g", "glyph", "glyphRef", "image", "marker", "metadata", "path", "solidcolor", "svg", "switch", "view"
- формы: "circle", "ellipse", "line", "polygon", "polyline", "rect"
- текст: "text", "textPath", "tref", "tspan"
- rendering: "clipPath", "filter", "hkern", "linearGradient", "mask", "pattern", "radialGradient", "vkern"
- специальные: "defs" (здесь разрешены все дочерние элементы, указанные выше), "symbol", "use"
- фильтр: "feColorMatrix", "feComposite", "feGaussianBlur", "feMerge", "feMergeNode", "feOffset", "foreignObject"
- ARIA: "desc", "title"

As well as these attributes:

- "xlink:href": only URIs starting with "#" are allowed
- "style"

## Обнаружение документов AMP <a name="amp-document-discovery"></a>

The mechanism described below provides a standardized way for software to discover whether an AMP version exists for a canonical document.

If an AMP document exists that is an alternative representation of a canonical document, then the canonical document should point to the AMP document via a `link` tag with the [relation "amphtml"](http://microformats.org/wiki/existing-rel-values#HTML5_link_type_extensions).

Example:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html" />
[/sourcecode]

The AMP document itself is expected to point back to its canonical document via a `link` tag with the relation "canonical".

Example:

[sourcecode:html]
<link
  rel="canonical"
  href="https://www.example.com/url/to/canonical/document.html"
/>
[/sourcecode]

(If a single resource is simultaneously the AMP *and* the canonical document, the canonical relation should point to itself--no "amphtml" relation is required.)

Note that for widest compatibility with AMP-consuming systems, it should be possible to read the "amphtml" relation without executing JavaScript. (That is, the tag should be present in the raw HTML, and not injected via JavaScript.)

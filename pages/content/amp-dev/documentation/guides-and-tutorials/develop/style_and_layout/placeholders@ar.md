---
"$title": العناصر النائبة والاحتياطية
"$order": '3'
descriptions: "In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible."
formats:
- websites
- email
- ads
- stories
components:
- iframe
author: pbakaus
contributors:
- bpaduch
---

In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible.

Some elements will even reward you for doing it by relaxing restrictions – for example, if you provide a placeholder for [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), it can be used near the top of the page (which won't work without).

## العناصر النائبة

The element marked with the `placeholder` attribute acts as a placeholder for the parent AMP element. If specified, a `placeholder` element must be a direct child of the AMP element. An element marked as a `placeholder` will always `fill` the parent AMP element.

[example preview="inline" playground="true" imports="amp-anim:0.1"]
```html
<amp-anim src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300">
  <amp-img placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill">
  </amp-img>
</amp-anim>
```
[/example]

By default, the placeholder is immediately shown for the AMP element, even if the AMP element's resources have not been downloaded or initialized. Once ready, the AMP element typically hides its placeholder and shows the content.

[tip type="note"] **NOTE –**  The placeholder doesn’t have to be an AMP element; any HTML element can act as the placeholder. [/tip]

## الاحتياطيات <a name="fallbacks"></a>

يمكنك تحديد السمة `fallback` في عنصر ما للإشارة إلى سلوك الاحتياطي:

- for any element the browser doesn’t support
- if the content fails to load (e.g., Tweet deleted)
- if the image type is unsupported (e.g., WebP isn't supported in all browsers)

يمكنك تعيين السمة `fallback` إلى *أي* عنصر HTML، وليس فقط عناصر AMP. وإذا تم تحديده، فيجب أن يكون العنصر `fallback` تابعًا مباشرًا لعنصر AMP.

##### مثال: ميزة غير مدعومة

In the following example, we use the `fallback` attribute to communicate to the user that the browser doesn’t support a particular feature:

[example preview="inline" playground="true" imports="amp-video:0.1"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

##### مثال: عرض تنسيقات صور مختلفة

In the following example, we use the `fallback` attribute to tell the browser to use the JPEG file if the WebP format is unsupported.

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

## تفاعل العناصر النائبة والاحتياطية

For AMP components that rely on dynamic content (e.g., [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md)), the interaction of fallbacks and placeholders operates as follows:

<ol>
  <li>عرض العنصر النائب أثناء تحميل المحتوى.</li>
  <li>إذا تم تحميل المحتوى بنجاح، فيتم إخفاء العنصر النائب وعرض المحتوى.</li>
  <li>في حالة فشل تحميل المحتوى:     <ol>       <li>إذا كان هناك عنصر احتياطي، فيتم عرض العنصر الاحتياطي.</li>       <li>بخلاف ذلك، يتم الاستمرار في عرض العنصر النائب<br>.</li>     </ol>
</li>
</ol>

## إخفاء مؤشرات التحميل

Many AMP elements are allowlisted to show a "loading indicator", which is a basic animation that shows that the element has not yet fully loaded. Elements can opt out of this behavior by adding the `noloading` attribute.

---
"$title": Placeholders & fallbacks
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

Чтобы придерживаться стандартов ощущаемой производительности и концепции прогрессивного улучшения, при создании AMP-ресурсов рекомендуется указывать заполнители и резервные элементы везде, где это возможно.

Some elements will even reward you for doing it by relaxing restrictions – for example, if you provide a placeholder for [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), it can be used near the top of the page (which won't work without).

## Placeholders

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

По умолчанию заполнитель элемента AMP отображается немедленно, даже если ресурсы элемента AMP не были загружены или инициализированы. Когда элемент AMP будет готов, он, как правило, скрывает заполнитель и показывает свое содержимое.

[tip type="note"] **NOTE –**  The placeholder doesn’t have to be an AMP element; any HTML element can act as the placeholder. [/tip]

## Fallbacks <a name="fallbacks"></a>

You can specify the `fallback` attribute on an element to indicate the fallback behavior:

- для любого элемента, который не поддерживается браузером
- если контент не удалось загрузить (например, твит был удален)
- если тип изображения не поддерживается (например, WebP поддерживается не во всех браузерах)

You can set the `fallback` attribute on *any* HTML element, not just AMP elements. If specified, the `fallback` element must be a direct child of the AMP element.

##### Example: Unsupported feature

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

##### Пример: выдача изображений разных форматов

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

## Взаимодействие заполнителей и резервных элементов

For AMP components that rely on dynamic content (e.g., [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md)), the interaction of fallbacks and placeholders operates as follows:

<ol>
  <li>Заполнитель отображается во время загрузки контента.</li>
  <li>Если содержимое загружается успешно, заполнитель скрывается и отображается контент.</li>
  <li>If the content fails to load:     <ol>       <li>If there's a fallback element, display the fallback.</li>       <li>Otherwise, continue displaying the placeholder.</li>     </ol>   </li>
</ol>

## Hiding loading indicators

Many AMP elements are allowlisted to show a "loading indicator", which is a basic animation that shows that the element has not yet fully loaded. Elements can opt out of this behavior by adding the `noloading` attribute.

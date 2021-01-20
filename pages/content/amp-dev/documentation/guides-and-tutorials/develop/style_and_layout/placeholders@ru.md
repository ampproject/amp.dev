---
"$title": Заполнители и резервные элементы
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

Некоторые элементы даже вознаграждают вас за это путем ослабления ограничений, — например, если указать заполнитель для элемента [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), этот элемент можно будет использовать в верхней части страницы (в противном случае это невозможно).

## Заполнители

Элемент, помеченный атрибутом `placeholder`, действует как заполнитель для своего родительского элемента AMP. Элемент `placeholder` должен всегда быть прямым потомком элемента AMP. Элемент, помеченный как `placeholder`, будет всегда заполнять (`fill`) родительский элемент AMP.

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

[tip type="note"] **ПРИМЕЧАНИЕ**. Заполнитель не обязательно должен быть элементом AMP; в качестве заполнителя может выступать любой элемент HTML. [/tip]

## Резервные элементы <a name="fallbacks"></a>

Вы можете добавить в элемент атрибут `fallback`, чтобы указать резервное поведение:

- для любого элемента, который не поддерживается браузером
- если контент не удалось загрузить (например, твит был удален)
- если тип изображения не поддерживается (например, WebP поддерживается не во всех браузерах)

Вы можете установить атрибут `fallback` для *любого* элемента HTML, а не только для элементов AMP. Элемент `fallback` должен быть прямым потомком элемента AMP.

##### Пример: неподдерживаемая функция

В следующем примере мы используем атрибут `fallback`, чтобы сообщить пользователю, что браузер не поддерживает определенную функцию:

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

В следующем примере мы используем атрибут `fallback`, чтобы дать браузеру инструкцию использовать файл JPEG, если формат WebP не поддерживается.

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

Для компонентов AMP, которые используют динамический контент (например, [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md)), взаимодействие резервных элементов и заполнителей работает следующим образом:

<ol>
  <li>Заполнитель отображается во время загрузки контента.</li>
  <li>Если содержимое загружается успешно, заполнитель скрывается и отображается контент.</li>
  <li>Если контент не загружается: <ol>
<li> Если есть резервный элемент, он отображается. </li>
<li> В противном случае продолжает отображаться заполнитель. </li>
</ol>
</li>
</ol>

## Скрытие индикаторов загрузки

Во многих элементах AMP включен показ «индикатора загрузки» — простой анимации, которая показывает, что элемент еще не полностью загружен. Чтобы отключить это поведение, добавьте в элемент атрибут `noloading`.

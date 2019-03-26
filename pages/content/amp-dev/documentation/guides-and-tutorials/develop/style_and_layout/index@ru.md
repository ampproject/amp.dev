---
$title: Как создать адаптивные AMP-страницы
---

Чтобы сделать элементы на AMP-страницах адаптивными, просто добавьте в них атрибут `layout=responsive`.

## Как создать адаптивные изображения

Все сторонние ресурсы, в том числе изображения, должны иметь указанный размер и положение, чтобы при их загрузке не происходила перекомпоновка страницы.

Чтобы создать адаптивное изображение, задайте его ширину и высоту, выберите адаптивный макет и с помощью атрибута [`srcset`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md', locale=doc.locale).url.path}}) укажите, какое изображение следует использовать в зависимости от размеров экрана:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Ширина элемента [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) устанавливается равной ширине контейнера, а его высота автоматически меняется в соответствии с соотношением сторон, определяемым атрибутами width и height:

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857" layout="responsive"></amp-img>

[Подробнее...]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-img.html', locale=doc.locale).url.path}})

## Как добавить стили на страницу

Добавьте все стили в тег `<style amp-custom>` в заголовке документа.
Пример:

[sourcecode:html]
<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
[/sourcecode]

**Внимание!** На одной AMP-странице можно добавить только один тег `<style amp-custom>`.

Задайте стили компонентов с помощью селекторов классов или элементов, а также общих свойств CSS. Пример:

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**Внимание!** Проверьте, поддерживаются ли выбранные вами стили в AMP, поскольку некоторые из них недоступны из соображений производительности. [Подробнее...]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md', locale=doc.locale).url.path}})

## Размеры и положение элементов

AMP разделяет процессы обработки макета документа и ресурсов. Это позволяет сначала загружать макет.

Укажите размер и положение всех видимых элементов AMP, задав значение атрибутов `width` и `height`.
Эти атрибуты определяют соотношение сторон элемента, размеры которого могут меняться в зависимости от параметров контейнера.

Создайте адаптивный макет,
у которого ширина элемента равна ширине контейнера, а высота автоматически меняется в соответствии с соотношением сторон, заданным атрибутами width и height.

Подробнее о том, [какие стили поддерживаются в AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md', locale=doc.locale).url.path}})...

## Как проверить стили и макет

Для проверки значений CSS и макета страницы используется инструмент AMP Validator.

Он определяет, не превышает ли объем стилей CSS 50 тыс. байтов, выявляет запрещенные стили и проверяет, правильно ли отформатирован макет страницы.
Ознакомьтесь с [полным списком ошибок в стилях и макетах]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md', locale=doc.locale).url.path}}).

Ниже представлен пример ошибки, возникшей из-за того, что объем стиля CSS страницы превышает 50 тыс. байтов:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Подробнее [о проверке AMP-страниц, в том числе о выявлении и устранении ошибок в стилях]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/index.md', locale=doc.locale).url.path}})...

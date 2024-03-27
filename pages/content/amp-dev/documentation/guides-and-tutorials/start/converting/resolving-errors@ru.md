---
'$title': Устранение ошибок валидации
$order: 2
description: В этом разделе мы просмотрим и устраним ошибки валидации AMP на нашей AMP-странице. Обратите внимание, что порядок отображения ошибок в вашей консоли может отличаться.
---

В этом разделе мы просмотрим и устраним ошибки валидации AMP на нашей AMP-странице. Обратите внимание, что порядок отображения ошибок в вашей консоли может отличаться.

## Добавление кодировки

Для начала мы исправим следующую ошибку:

<pre class="error-text">The mandatory tag 'meta charset=utf-8' is missing or incorrect.</pre>

При создании AMP-страницы всегда указывайте кодировку, чтобы обеспечить корректное отображение текста. Тег meta с информацией о кодировке должен быть первым дочерним элементом тега `<head>`. Это нужно для того, чтобы избежать повторной интерпретации контента, добавленного до meta-тега кодировки.

**Добавьте** в качестве первой строки тега `<head>` следующий код:

```html
<meta charset="utf-8" />
```

**Сохраните** файл и обновите страницу. Убедитесь, что ошибка кодировки больше не появляется.

## Добавление канонической ссылки

Теперь рассмотрим следующую ошибку:

<pre class="error-text">The mandatory tag 'link rel=canonical' is missing or incorrect.</pre>

В каждом документе AMP должна присутствовать ссылка, указывающая на его «каноническую» версию. Подробнее о том, что такое каноническая страница, и о различных подходах к указанию канонических ссылок читайте в разделе [Обеспечение обнаружения страницы](discoverable.md) данного урока.

В рамках данного урока мы будем считать канонической страницей исходную статью в формате HTML, преобразование которой мы выполняем.

**Добавьте** после тега `<meta charset="utf-8" />` следующий код:

```html
<link rel="canonical" href="/article.html" />
```

[tip type="note"] Вы можете создать самостоятельную каноническую AMP-страницу. При этом указать каноническую ссылку по-прежнему необходимо, но она должна указывать на саму AMP-статью:

```html
<link rel="canonical" href="article.amp.html" />
```

[/tip]

Теперь **перезагрузите** страницу. Хотя на ней все еще остается множество других ошибок, ошибка отсутствия канонической ссылки теперь устранена.

## Добавление атрибута AMP

Для того чтобы пометить страницу как AMP-документ, спецификация AMP требует добавить в ее корневой элемент `<html>` специальный атрибут.

<pre class="error-text">The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'<br>The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.</pre>

Ошибки, приведенные выше, можно устранить, добавив в тег `<html>` атрибут `⚡`:

```html
<html ⚡ lang="en"></html>
```

Теперь перезагрузите страницу и убедитесь, что обе ошибки исчезли.

[tip type="note"] Хотя рекомендуется использовать атрибут `⚡`, вместо `⚡` также можно указывать атрибут `amp`:

```html
<html amp lang="en"></html>
```

[/tip]

## Указание области просмотра

Теперь займемся следующей ошибкой:

<pre class="error-text">The mandatory tag 'meta name=viewport' is missing or incorrect.</pre>

Спецификация AMP требует указания для области просмотра атрибутов `width` и `minimum-scale`. Их значения должны быть равны `device-width` и `1` соответственно. Область просмотра обозначается в коде HTML-страницы при помощи распространенного meta-тега viewport в разделе `<head>`.

Чтобы устранить ошибку области просмотра, добавьте в тег `<head>` следующий HTML-код:

```html
<meta name="viewport" content="width=device-width" />
```

Приведенные выше значения `width` и `minimum-scale` обязательны для AMP-страниц. Параметр `initial-scale` не является обязательным, но рекомендуется к использованию и обычно применяется на мобильных веб-страницах. Подробнее об области просмотра и адаптивном дизайне см. в разделе [Настройка области просмотра](https://developers.google.com/speed/docs/insights/ConfigureViewport).

Теперь снова **перезагрузите** страницу и удостоверьтесь, что ошибка исчезла.

## Замена внешних таблиц стилей

Ошибка, приведенная ниже, связана с использованием таблиц стилей:

<pre class="error-text">The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.</pre>

Если конкретнее, она сообщает о недопустимости использования внутри тега `<head>` следующей ссылки на таблицу стилей:

```html
<link href="base.css" rel="stylesheet" />
```

Проблема заключается в том, что ссылка указывает на внешнюю таблицу стилей. Для того чтобы документы AMP загружались как можно быстрее, использование внешних таблиц стилей не допускается. Вместо этого все стилевые правила должны быть включены непосредственно в документ AMP при помощи тегов `<style amp-custom></style>` или в виде встроенных стилей.

```html
<style amp-custom>
  /* The content from base.css */
</style>
```

Итак, давайте исправим ошибку:

1. **Удалите** тег `<link>`, указывающий на таблицу стилей, из раздела `<head>` и замените его встроенным тегом `<style amp-custom></style>`. Атрибут `amp-custom` в теге style является обязательным..
2. **Скопируйте** все стили из файла [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) в тег `<style amp-custom></style>`.

И снова **перезагрузите** страницу и убедитесь, что ошибка, относящаяся к таблицам стилей, исчезла.

[tip type="note"] **ПРИМЕЧАНИЕ.** Помимо того, что стили должны быть встроены в код страницы, общий объем стилевой информации в файле не должен превышать 50 килобайт. Используйте препроцессоры, такие как [SASS](http://sass-lang.com/), чтобы сократить размер CSS перед встраиванием в код AMP-страницы. [/tip]

[tip type="important"] **ВАЖНО.** Во всем документе AMP может быть только один тег style. Если AMP-страница ссылается на несколько внешних таблиц стилей, необходимо объединить их в один набор правил. О том, какие правила CSS разрешены в AMP, читайте в статье [Поддерживаемые элементы CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md). [/tip]

## Исключение стороннего JavaScript

Проблемы с таблицами стилей можно сравнительно легко решить путем встраивания CSS-кода, однако с JavaScript ситуация иная:

<pre class="error-text">The tag 'script' is disallowed except in specific forms.</pre>

Скрипты в AMP, как правило, разрешены только в том случае, если они соответствуют двум основным требованиям:

1. Любой код JavaScript должен быть асинхронным (т. е. в теге script должен быть указан атрибут `async`).
2. JavaScript должен быть частью библиотеки AMP или компонентов AMP, используемых на странице.

Это фактически исключает использование в AMP какого-либо пользовательского или стороннего JavaScript, кроме случаев, указанных ниже.

[tip type="note"] Единственными исключениями из запрета на пользовательские и сторонние скрипты являются:

1. Скрипты, которые добавляют на страницу метаданные или используются для настройки компонентов AMP. У таких скриптов атрибут type будет равен `application/ld+json` или `application/json`.
2. Скрипты, выполняемые внутри iframe. Включение JavaScript в iframe следует использовать только в случае крайней необходимости. Функциональность, использующую JavaScript, по возможности следует заменять альтернативной реализацией, использующей [компоненты AMP](../../../../documentation/components/index.html). В следующем разделе мы рассмотрим наш первый компонент AMP. [/tip]

Попробуйте открыть внешний файл [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js). Как вы видите, файл не содержит кода JavaScript; в нем есть лишь комментарий со следующим текстом:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Поскольку этот внешний файл JavaScript не является функциональной частью сайта, ссылку на него спокойно можно удалить.

**Удалите** из вашего документа следующую ссылку на внешний JavaScript:

```html
<script type="text/javascript" src="base.js"></script>
```

Теперь **перезагрузите** страницу и убедитесь, что ошибка, относящаяся к скриптам, исчезла.

## Включение шаблонного CSS-кода AMP

Следующие ошибки сообщают об отсутствии шаблонного кода:

<pre class="error-text">The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.<br>The mandatory tag 'head > style : boilerplate' is missing or incorrect.<br>The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.</pre>

В каждом документе AMP обязательно должен присутствовать следующий шаблонный код:

```html
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
  }</style
><noscript
  ><style amp-boilerplate>
    body {
      -webkit-animation: none;
      -moz-animation: none;
      -ms-animation: none;
      animation: none;
    }
  </style></noscript
>
```

**Добавьте** шаблонный код в конец тега `<head>` вашего документа.

Тег `<style amp-boilerplate>` на начальном этапе скрывает контент в теле страницы; рендеринг контента происходит после окончания загрузки JavaScript-библиотеки AMP. Это сделано для того, чтобы предотвратить рендеринг нестилизованного контента (Flash Of Unstyled Content, FOUC). Благодаря этому загрузка страницы выглядит мгновенной: весь ее контент становится видимым сразу, и рендеринг первого экрана выполняется за один проход. Второй тег отключает эту логику, если в браузере выключен JavaScript.

## Замена `<img>` на `<amp-img>`

AMP не поддерживает стандартные HTML-элементы для отображения мультимедийного контента, что и объясняет следующую ошибку:

<pre class="error-text">The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?</pre>

Существует веб-компонент AMP, специально разработанный в качестве замены тега `<img>`, — это тег [`<amp-img>`](../../../../documentation/components/reference/amp-img.md):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Замените** тег `<img>` тегом [`<amp-img>`](../../../../documentation/components/reference/amp-img.md), приведенным выше, и запустите валидатор снова. Вы увидите несколько новых ошибок:

<pre class="error-text">Layout not supported: container<br>The implied layout 'CONTAINER' is not supported by tag 'amp-img'.</pre>

Почему тег [`amp-img`](../../../../documentation/components/reference/amp-img.md) вызвал еще одну ошибку? Потому что [`amp-img`](../../../../documentation/components/reference/amp-img.md) не является прямой заменой традиционного HTML-тега img. При использовании [`amp-img`](../../../../documentation/components/reference/amp-img.md) необходимо соблюдать дополнительные требования.

### Система макетов AMP

Ошибка макета сообщает нам, что [`amp-img`](../../../../documentation/components/reference/amp-img.md) не поддерживает тип макета `container`. Один из главных принципов, заложенных в AMP, — это сокращение времени, затрачиваемого на перекомпоновку DOM при рендеринге веб-страниц.

Чтобы добиться этого, AMP использует систему макетов, позволяющую гарантировать, что при скачивании и рендеринге страницы ее макет будет известен как можно раньше.

Ниже показано сравнение компоновки типичной HTML-страницы с подходом, используемым в AMP. Обратите внимание, что в примере слева загрузка каждого изображения или рекламного блока приводит к перекомпоновке текста. Подход, используемый в системе макетов AMP, позволяет избежать скачков текста даже тогда, когда загрузка изображений и рекламы занимает много времени.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="A comparison between how content is normally laid out and AMP's approach") }}

Система макетов AMP позволяет использовать различные способы позиционирования и определения размеров элементов на странице: фиксированные размеры, адаптивный дизайн, фиксированная высота и так далее.

В случае нашей статьи система макетов по умолчанию назначила элементу [`amp-img`](../../../../documentation/components/reference/amp-img.md) тип `container`. Однако тип `container` подходит только для элементов, содержащих дочерние элементы. Тип `container` несовместим с тегом [`amp-img`](../../../../documentation/components/reference/amp-img.md), что и является причиной ошибки.

Почему по умолчанию был выбран тип `container`? Потому что мы не указали для тега [`amp-img`](../../../../documentation/components/reference/amp-img.md) атрибут `height`. В HTML можно сократить количество операций перекомпоновки, указывая для всех элементов на странице фиксированную ширину и высоту. В AMP указывать ширину и высоту элементов [`amp-img`](../../../../documentation/components/reference/amp-img.md) необходимо для того, чтобы позволить AMP заранее определить соотношение сторон элемента.

**Добавьте** в тег [`amp-img`](../../../../documentation/components/reference/amp-img.md) атрибуты `width` и `height`:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Обновите страницу и проверьте валидатор, чтобы удостовериться, что других ошибок на странице больше нет.

Теперь ваш документ соответствует спецификации AMP, но изображение смотрится не очень красиво из-за неоптимального расположения на странице. По умолчанию, когда вы указываете высоту и ширину элемента [`amp-img`](../../../../documentation/components/reference/amp-img.md), AMP жестко фиксирует его размеры — но разве не здорово было бы, если бы AMP автоматически масштабировал изображение, _адаптируя_ его под страницу вне зависимости от размера экрана?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Our image isn't responsive.") }}

К счастью, AMP может определять соотношение сторон элементов на основании указанных размеров (длины и ширины), что позволяет системе макетов AMP позиционировать и масштабировать элемент различными способами. Настроить позиционирование и масштабирование элемента в AMP можно при помощи атрибута `layout`.

Давайте **установим** атрибут layout в значение `responsive`, чтобы изображение автоматически масштабировалось:

```html
<amp-img
  src="mountains.jpg"
  layout="responsive"
  width="266"
  height="150"
></amp-img>
```

Теперь наше изображение имеет верное соотношение сторон и адаптивно заполняет всю ширину экрана.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Our image is now responsive!") }}

[tip type="read-on"] **ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ.** Подробнее о системе макетов AMP читайте в [спецификации макетов AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md). [/tip]

## Готово!

Теперь ваш документ AMP должен выглядеть примерно так:

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>News Article</title>

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
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://ampjs.org/v0.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

Обновите страницу и проверьте вывод консоли. Вы должны увидеть следующее сообщение:

<pre class="success-text">AMP validation successful.</pre>

### Часто задаваемые вопросы

- [Что такое перекомпоновка DOM?](http://stackoverflow.com/a/27637245)
- [Что происходит, если не указан атрибут layout?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [Что происходит, если не указаны ширина и высота?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)

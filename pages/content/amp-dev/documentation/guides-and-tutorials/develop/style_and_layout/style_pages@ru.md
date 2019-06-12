---
$title: Поддерживаемые элементы CSS
---

Оформление AMP-страниц, как и любых других, определяется с помощью CSS, однако такие страницы не требуют указывать сторонние таблицы стилей (за исключением [пользовательских шрифтов](#пользовательские-шрифты)).
Кроме того, запрещены некоторые стили, а также атрибуты встроенного стиля, потому что они снижают производительность.

Все стили [должны содержаться в заголовке документа]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md', locale=doc.locale).url.path}}),
однако с помощью препроцессоров и шаблонов CSS можно создавать статические страницы, что позволяет более эффективно управлять контентом.

**Примечание.** Компоненты AMP по умолчанию содержат стили, позволяющие упростить разработку адаптивных страниц.
Эти стили определяются в файле [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).

## Использование препроцессоров CSS

Контент, созданный с помощью препроцессоров, отображается как на страницах AMP, так и на любых других веб-страницах.
Например, на сайте [amp.dev](https://amp.dev/) используется язык [Sass](http://sass-lang.com/).
Для создания статических страниц AMP, составляющих сайт [amp.dev](https://amp.dev/), применяется генератор <a href="http://grow.io/"><span class="notranslate">Grow</span></a>.

Если вы используете препроцессоры, загружайте только те элементы, которые применяются на ваших страницах.
Например, файл [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) будет содержать всю необходимую разметку AMP и встроенные стили CSS из исходных файлов `*.scss`,
а также скрипт специальных элементов для атрибута [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}). Благодаря этому на многих страницах сайта можно встраивать видео YouTube.

[sourcecode:html] {% raw %}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

Чтобы узнать, как указанный выше код преобразуется в формат HTML для AMP-страниц, просмотрите исходный код любой страницы на сайте [amp.dev](https://amp.dev/).
Для этого в браузере Chrome нажмите правую кнопку мыши и выберите `Просмотр кода страницы`.

## Запрещенные стили

На AMP-страницах запрещено использовать следующие стили:

<table>
  <thead>
    <tr>
      <th data-th="Banned style">Запрещенный стиль</th>
      <th data-th="Description">Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Атрибуты встроенного стиля</td>
      <td data-th="Description">Все стили должны быть определены в теге <code>&lt;style amp-custom&gt;</code> в разделе страницы <code>&lt;head&gt;</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code> (важный классификатор) </td>
      <td data-th="Description">Использование запрещено.
      Это необходимо для того, чтобы AMP-страницы соблюдали собственные правила, касающиеся определения размеров элементов.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">Использование запрещено (за исключением <a href="#пользовательские-шрифты">пользовательских шрифтов</a>).</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (универсальный селектор)</td>
      <td data-th="Description">Снижает производительность и может использоваться для обхода других ограничений селектора.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">Может использоваться для имитации универсального селектора.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Псевдоселекторы, псевдоклассы и псевдоэлементы</td>
      <td data-th="Description">Псевдоселекторы, псевдоклассы и псевдоэлементы можно использовать только в селекторах, содержащих названия тегов, которые не начинаются с префикса <code>amp-</code>.
      Примеры допустимых селекторов: <code>a:hover, div:last-of-type</code>. Примеры недопустимых селекторов: <code>amp-img:hover, amp-img:last-of-type</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Названия классов <code>-amp-</code> и тегов <code>i-amp-</code></td>
      <td data-th="Description">Названия классов в специальных таблицах стилей не должны начинаться со строки <code>-amp-</code>. Они зарезервированы для внутреннего использования AMP-страницами. Из этого следует, что таблица стилей пользователя не может ссылаться на селекторы CSS для классов <code>-amp-</code> и тегов <code>i-amp</code>.</td>
    </tr>
  </tbody>
</table>

## Внесенные в белый список переходы и анимация элементов

На AMP-страницах разрешены только переходы и анимация элементов, которые могут быть обработаны графическим процессором в обычных браузерах.
В белый список проекта AMP в настоящее время внесены элементы `opacity`, `transform` и `-vendorPrefix-transform`.

В приведенных ниже примерах атрибут `<property>` должен находиться в белом списке:

* `transition <property> (Also -vendorPrefix-transition)`
* @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

Элементы `overflow`, `overflow-y` и `overflow-x` не могут иметь значение <span class="notranslate">“auto”</span> или <span class="notranslate">“scroll”</span>.
Ни у одного пользовательского элемента в документе AMP не должно быть полосы прокрутки.

## Пользовательские шрифты

На страницах AMP не должно быть сторонних таблиц стилей (за исключением пользовательских шрифтов).
Их можно включить с помощью тегов со ссылкой на поставщиков шрифтов, внесенных в белый список, или атрибута `@font-face`.

Поставщиков шрифтов можно внести в белый список только в том случае, если они поддерживают интеграцию исключительно с CSS и используют протокол HTTPS. Сейчас в этом списке два поставщика:

* [https://fast.fonts.net](https://fast.fonts.net)
* [https://fonts.googleapis.com](https://fonts.googleapis.com)

Пример тега со ссылкой на поставщика шрифтов, внесенного в белый список (Google Fonts):

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Также можно использовать элемент [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).
Шрифты, добавленные с помощью атрибута `@font-face`, должны быть получены по протоколу HTTP или HTTPS.

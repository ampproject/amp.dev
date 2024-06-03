---
'$title': Поддерживаемые элементы CSS
description: Как и обычные страницы, AMP-страницы оформляются с помощью CSS, однако в них не допускаются ссылки на внешние таблицы стилей (за исключением внешних шрифтов). Кроме того, некоторые стили запрещены...
formats:
  - websites
  - email
  - ads
  - stories
author: Meggin
contributors:
  - pbakaus
  - CrystalOnScript
  - bpaduch
  - choumx
---

[filter formats="email"] Примечание. Формат «AMP для писем» накладывает дополнительные ограничения на CSS, которые описаны в статье [Поддержка CSS в AMP для писем](../../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md). [/filter]

Оформление AMP-страниц, как и любых других, определяется с помощью CSS, однако такие страницы не требуют указывать сторонние таблицы стилей (за исключением [пользовательских шрифтов](#the-custom-fonts-exception)). Кроме того, запрещены некоторые стили, а также атрибуты встроенного стиля, потому что они снижают производительность.

Все стили [должны содержаться в заголовке документа](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), однако с помощью препроцессоров и шаблонов CSS можно создавать статические страницы, что позволяет более эффективно управлять контентом.

**Примечание.** Компоненты AMP по умолчанию содержат стили, позволяющие упростить разработку адаптивных страниц. Эти стили определяются в файле [`amp.css`](https://github.com/ampproject/amphtml/blob/main/css/amp.css).

## Запрещенные стили

На AMP-страницах запрещено использовать следующие стили:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Запрещенный стиль</th>
      <th data-th="Description">Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Квалификатор <code>!important</code>
</td>
      <td data-th="Description">Запрещено использовать <code>!important</code> или ссылаться на него. Это требование важно для контроля выбора размеров элементов в AMP.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”></code></td>
      <td data-th="Description">Запрещен (за исключением <a href="#the-custom-fonts-exception">внешних шрифтов</a>).</td>
    </tr>
    <tr>
      <td data-th="Banned style">Использование строки <code>i-amphtml-</code> в наименованиях классов и тегов</td>
      <td data-th="Description">Валидатор не пропускает имена классов и тегов, совпадающие с регулярным выражением «(^|\W)i-amphtml-». Подобные имена зарезервированы для внутреннего использования платформой AMP. Соответственно, таблица стилей пользователя не может ссылаться на CSS-селекторы классов и тегов с именами, содержащими <code>i-amphtml-</code>.</td>
    </tr>
  </tbody>
</table>

## Рекомендации по производительности

Для обеспечения оптимальной производительности некоторые разрешенные стили должны ограничиваться указанными ниже значениями:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Ограниченный стиль</th>
      <th data-th="Description">Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style">Свойство <code>transition</code>
</td>
      <td data-th="Description">Только свойства, которые поддерживают аппаратное ускорение графическим адаптером (на данный момент это <code>opacity</code>, <code>transform</code> и <code>-браузерныйПрефикс-transform</code>).</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description">Только свойства, которые поддерживают аппаратное ускорение графическим адаптером (на данный момент это <code>opacity</code>, <code>transform</code> и <code>-браузерныйПрефикс-transform</code>).</td>
    </tr>
  </tbody>
</table>

## Исключение для внешних шрифтов <a name="the-custom-fonts-exception"></a>

AMP-страницы не могут включать внешние таблицы стилей, за исключением внешних шрифтов.

[tip type="read-on"] **ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ.** Подробнее о [внешних шрифтах в AMP можно узнать здесь](custom_fonts.md). [/tip]

## Использование препроцессоров CSS <a name="using-css-preprocessors"></a>

Контент, созданный с помощью препроцессоров, отображается как на страницах AMP, так и на любых других веб-страницах. Например, на сайте [amp.dev](https://amp.dev/) используется язык [Sass](http://sass-lang.com/). Для создания статических страниц AMP, составляющих сайт [amp.dev](https://amp.dev/), применяется генератор <a href="http://grow.io/"><span class="notranslate">Grow</span></a>.

Если вы используете препроцессоры, загружайте только те элементы, которые применяются на ваших страницах. Например, файл [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) будет содержать всю необходимую разметку AMP и встроенные стили CSS из исходных файлов `*.scss`, а также скрипт специальных элементов для атрибута [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md). Благодаря этому на многих страницах сайта можно встраивать видео YouTube.

[sourcecode:html] {% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
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

Чтобы узнать, как указанный выше код преобразуется в формат HTML для AMP-страниц, просмотрите исходный код любой страницы на сайте [amp.dev](https://amp.dev/). Для этого в браузере Chrome нажмите правую кнопку мыши и выберите `Просмотр кода страницы`.

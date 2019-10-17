---
$title: О проверке AMP-страниц
---

Преимущество технологии AMP заключается не только в том, что благодаря ей ускоряется загрузка страниц, а в том, что такие страницы можно *проверять*. Это позволяет избежать проблем с показом AMP-страниц в Google Поиске и таких сервисах, как Twitter или Instagram.

## Как проверить, соответствует ли страница критериям AMP

AMP-документ можно проверить несколькими способами, однако все они приводят к одному и тому же результату. Вы можете выбрать самый подходящий вариант.

Также вы можете проверить, [находят](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) ли AMP-документ сторонние платформы.

### Консоль разработчика браузера

Инструмент AMP Validator содержит библиотеку JavaScript AMP, поэтому она по умолчанию доступна на всех AMP-страницах. Чтобы проверить AMP-страницу, выполните следующие действия:

  1. Откройте AMP-страницу в браузере.
  1. Добавьте к URL элемент `#development=1`, например так: `http://localhost:8000/released.amp.html#development=1`.
  1. Откройте [консоль разработчика Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) и проверьте страницу на наличие ошибок

Ошибки будут выглядеть примерно так:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" alt="Скриншот страницы с ошибками, обнаруженными инструментом AMP Validator, в консоли разработчика Chrome" layout="responsive"></amp-img>

### Веб-интерфейс

На сайте [validator.ampproject.org](https://validator.ampproject.org/) реализован веб-интерфейс для инструмента AMP Validator. В нем показывается HTML-код страницы и ее ошибки.
Интерфейс представляет собой интерактивный редактор: за внесением изменений в HTML-код следует повторная проверка страницы.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" alt="Скриншот страницы сайта validator.ampproject.org с примерами ошибок" layout="responsive"></amp-img>

### Расширение для браузера

Инструмент AMP Validator также можно использовать как расширение на панели инструментов браузера. Он автоматически проверяет все посещаемые AMP-страницы, а его значок меняет цвет в зависимости от результатов этой проверки.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" alt="Красный значок, указывающий на то, что документ не соответствует критериям AMP" layout="fixed"></amp-img>

    </td>
    <td>Если на странице выявлены проблемы, значок расширения становится красного цвета и на нем показывается количество ошибок.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" alt="Зеленый значок, указывающий на то, что документ соответствует критериям AMP" layout="fixed"></amp-img>

    </td>
    <td>Если ошибки не обнаружены, отображается зеленый значок и количество предупреждений (при их наличии).
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" alt="Синий значок, после нажатия на которой появляется вариант кода HTML для AMP" layout="fixed"></amp-img>

    </td>
    <td>Если страница не использует технологию AMP, но сообщает, что доступна ее AMP-версия, вы увидите синий значок и символ ссылки под ним. При нажатии на расширение браузер откроет AMP-версию страницы.
    </td>
  </tr>
</table>

Вы можете скачать расширение AMP Validator для браузеров [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) и [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Инструмент командной строки

Чтобы использовать этот инструмент, вам может потребоваться установить [Node.js с помощью менеджера пакетов `npm`](https://docs.npmjs.com/getting-started/installing-node).

Чтобы установить [инструмент командной строки AMP HTML Validator](https://www.npmjs.com/package/amphtml-validator), введите команду `npm install -g amphtml-validator`.

Ниже указано, как проверить AMP-страницу в формате HTML.

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

Как мы видим, HTML-код этой страницы соответствует требованиям AMP. Давайте проверим страницу [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html), на которой есть ошибки. Чтобы выполнить команду `amphtml-validator`, следует указать URL страницы или имя файла на компьютере. Загрузите и сохраните [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) в файл, а затем выполните следующую команду:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

Сообщения об ошибках содержат название файла, строку, столбец и текст, после которых часто приводится ссылка на HTML-код AMP-страницы. Некоторые редакторы, например текстовый редактор Emacs, который выявляет команды и режим компиляции, способны анализировать эти сообщения и позволяют просматривать ошибки в исходном файле.

Проанализируем страницу [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html), которую можно использовать в качестве основы для создания других AMP-страниц:

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

В инструменте командной строки доступны и другие функции, в том числе отключение цвета, вывод на печать файлов в формате JSON и запуск определенной версии валидатора JavaScript (по умолчанию запускается последний опубликованный сценарий).

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## Что произойдет, если страница не соответствует критериям AMP

AMP Validator не просто инструмент, который упрощает разработку сайта: такие платформы, как Twitter и Google, используют его при включении AMP-страниц в свое содержание и результаты поиска. Более того, чаще всего они не запрашивают страницы напрямую с сервера, а применяют бесплатный сервис Google AMP Cache, который кеширует страницы и делает их доступными для пользователей по всему миру, ускоряя таким образом загрузку.

Если инструмент AMP Validation выявит проблемы на вашей странице, он запретит ее обнаружение сторонними сайтами и кеширование с помощью сервиса Google AMP Cache. В результате у одних пользователей снизится скорость загрузки страницы, а у других она вовсе не будет показываться. О том, как этого избежать, читайте ниже.

## Как устранить выявленные ошибки

Большинство ошибок легко обнаружить и устранить. Рассмотрим следующий тег HTML:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Вот как будет выглядеть ошибка при проверке AMP в трех различных инструментах:

* Консоль разработчика браузера
<amp-img alt="Ошибка AMP: тег img может быть только потомком тега noscript.Возможно, вы имели в виду amp-img?Строка 11, столбец 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive"></amp-img>

* Веб-интерфейс
<amp-img alt="Ошибка AMP: тег img может быть только потомком тега noscript.Возможно, вы имели в виду amp-img?Строка 11, столбец 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive"></amp-img>

* Расширение для браузера
<amp-img alt="Ошибка AMP: тег img может быть только потомком тега noscript.Возможно, вы имели в виду amp-img?Строка 11, столбец 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive"></amp-img>

Все эти инструменты предоставляют следующие данные:

1. Номера строки и столбца в документе HTML, где наблюдается ошибка. В некоторых интерфейсах можно нажать кнопку мыши и выделить место с ошибкой. В данном случае координаты ошибки таковы: строка 11, столбец 2.
1. Текстовую строку с описанием ошибки. В данном случае в строке указано, что вместо тега [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) используется тег `<img>`.
1. Ссылку на документ с описанием ошибки. В данном случае по ней доступен документ, посвященный тегу [`<amp-img>`](../../../../documentation/components/reference/amp-img.md). Такие ссылки доступны не для всех ошибок.

Из спецификации можно узнать, что проблема заключается в использовании тега `<img>` вместо [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).

Полный список потенциальных ошибок представлен в [этом руководстве](validation_errors.md).
Если вы не смогли обнаружить и устранить ошибку, [задайте нам вопрос](http://stackoverflow.com/questions/tagged/amp-html).

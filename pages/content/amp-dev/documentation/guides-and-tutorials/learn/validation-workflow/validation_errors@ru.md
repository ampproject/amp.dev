---
$title: Ошибки на AMP-страницах
---

В AMP-документах не должно быть ошибок кода.
В этом документе рассказывается, как устранить ошибки, возникающие при [проверке AMP-страниц](validate_amp.md).
Полный список неполадок приведен в [спецификации](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

## Ошибки в HTML-тегах и атрибутах на AMP-страницах

### Отсутствует обязательный тег

<table>
   <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The mandatory tag '%1' is missing or incorrect."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Добавьте необходимый HTML-тег или исправьте ошибку в нем.</td>
  </tr>
</table>

Следующие теги должны присутствовать во всех AMP-документах:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://ampjs.org/v0.js"></script>`
* <a name="body"></a>`<body>`

Обязательные теги включают в себя поле `mandatory: true` в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii). Также они приведены в [документации по AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md).

### Отсутствует тег, который требуется для работы другого тега

<table>
   <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">TAG_REQUIRED_BY_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The '%1' tag is missing or incorrect, but required by '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Добавьте необходимый HTML-тег или исправьте ошибку в нем.</td>
  </tr>
</table>

Валидатор выводит ошибку `TAG_REQUIRED_BY_MISSING`, когда обнаруживает в AMP-документе расширенный компонент без соответствующего тега `<script>`.

[Расширенные компоненты](../../../../documentation/components/index.html) должны быть включены в AMP-документ как специальные элементы.
Чтобы исправить эту ошибку, перейдите на справочную страницу расширенного компонента, скопируйте нужный скрипт и вставьте его в тег `<head>` AMP-документа.

### Недопустимый тег

<table>
   <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">DISALLOWED_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The tag '%1' is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите недопустимый тег.</td>
  </tr>
</table>

Теги вносятся в белый список, так что единого списка всех недопустимых тегов не существует. Однако в [документации по AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) в целом описано, какие теги могут быть недопустимыми.

### Отсутствует обязательный атрибут

<table>
   <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">MANDATORY_ATTR_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The mandatory attribute '%1' is missing in tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Добавьте обязательный атрибут для тега.</td>
  </tr>
</table>

Обязательные атрибуты перечислены в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
Найдите нужный тег, просмотрите атрибуты и убедитесь, что для них задан параметр `mandatory: true`.
Обязательные атрибуты для каждого тега AMP также перечислены в его описании.

### Неверное значение атрибута

<table>
   <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">INVALID_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Укажите действительное значение атрибута.</td>
  </tr>
</table>

Эта ошибка говорит о том, что в теге HTML есть атрибут с допустимым названием, но неверным значением.
Например, часто встречаются ошибки в URL. Все значения URL в атрибутах `href` и `src` должны быть указаны в одном из [допустимых форматов](http://www.w3schools.com/tags/att_a_href.asp).

<strong>ВАЖНО.</strong> Для многих URL требуется протокол HTTPS. Если вы не можете понять причину ошибки, проверьте спецификацию соответствующего тега AMP. Возможно, необходимо изменить протокол.

### Недопустимый атрибут

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">DISALLOWED_ATTR</span></td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The attribute '%1' may not appear in tag '%2'."</span></td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите атрибут из HTML-тега.</td>
  </tr>
</table>

Атрибуты вносятся в белый список, так что единого списка всех недопустимых атрибутов не существует.
Чтобы узнать, какие атрибуты поддерживаются определенным тегом, найдите тег HTML, а затем выполните поиск по запросу `attrs` в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Помимо атрибутов из белого списка для каждого конкретного тега, поддерживаются также все атрибуты из белого списка для `$GLOBAL_ATTRS`. Атрибуты с префиксом `"data-"` также разрешены.

### Отсутствует или неверно указан обязательный текст

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">MANDATORY_CDATA_MISSING_OR_INCORRECT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Добавьте в тег обязательный текст или исправьте его.</td>
  </tr>
</table>

CDATA – это контент между открывающим и закрывающим тегами HTML. Он проверяется с учетом белого и черного списков.
Теги, для которых контент CDATA обязателен:

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

и

[sourcecode:html]
<style amp-custom>
[/sourcecode]

Сообщения об ошибке могут быть следующими:

* "Обязателен стереотипный стиль (js включен)"
* "Обязателен стереотипный стиль (noscript)"
* "Недопустимый префикс имени для класса -amp- в CSS"
* "Недопустимый атрибут !important в CSS"
* "Недопустимая директива @charset в CSS"
* "Недопустимая директива @import в CSS"
* "Недопустимая директива @namespace в CSS"
* "Недопустимая директива @supports в CSS"
* "Недопустимая директива @document в CSS"
* "Недопустимая директива @page в CSS"
* "Недопустимая директива @viewport в CSS"

### Недопустимый текст внутри тега

<table>
   <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">CDATA_VIOLATES_DENYLIST</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите недопустимый текст.</td>
  </tr>
</table>

Определенные данные CSS были внесены в черный список, чтобы проверить соответствие важным правилам CSS для AMP.

Черный список данных CSS (см. также [`disallowed_cdata_regex` в спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)):

* `"\\.i?-amp-"` ("префикс имени для класса -amp- в CSS")
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Недопустимое свойство атрибута внутри тега

<table>
   <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">DISALLOWED_PROPERTY_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The property '%1' in attribute '%2' in tag '%3' is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите недопустимое свойство из указанного атрибута.</td>
  </tr>
</table>

Эта ошибка возникает, если в атрибуте обнаруживается недопустимое свойство.
Свойством в данном случае считается структурированная пара "ключ-значение".
Например, в атрибуте `<meta name="viewport content="width=device-width;minimum-scale=1">` есть свойства `width` and `minimum-scale`.

Ошибка возникает в следующем случае:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

Ещё один пример недопустимого свойства:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

Правильный вариант: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### Недопустимое значение свойства

<table>
   <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Исправьте недопустимое значение свойства.</td>
  </tr>
</table>

Эта ошибка возникает, если в атрибуте обнаруживается недопустимое значение свойства.
Свойством в данном случае считается структурированная пара "ключ-значение".
Например, в атрибуте `<meta name="viewport content="width=device-width;minimum-scale=1">` есть значения свойств `device-width` и `1`.

Ошибка возникает в следующем случае:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Ещё один пример недопустимого значения свойства:

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

Правильный вариант: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### Отсутствует URL

<table>
  <tr>
    <td class="col-thirty"><strong>Код</strong></td>
    <td><span class="notranslate">MISSING_URL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Формат</strong></td>
    <td><span class="notranslate">"Missing URL for attribute '%1' in tag '%2'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Действия</strong></td>
    <td>Добавьте действительный URL.</td>
  </tr>
</table>

Эта ошибка возникает, когда в атрибуте, таком как `href` или `src`, должен быть URL, но его нет.

### Недействительный URL

<table>
  <tr>
    <td class="col-thirty"><strong>Код</strong></td>
    <td><span class="notranslate">INVALID_URL_PROTOCOL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Формат</strong></td>
    <td><span class="notranslate">"Malformed URL '%3' for attribute '%1' in tag '%2'"</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Действия</strong></td>
    <td>Исправьте URL.</td>
  </tr>
</table>

Эта ошибка возникает, когда для атрибута задан недействительный URL.

### Неверный протокол URL

<table>
  <tr>
    <td class="col-thirty"><strong>Код</strong></td>
    <td><span class="notranslate">INVALID_URL_PROTOCOL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Формат</strong></td>
    <td><span class="notranslate">Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Действия</strong></td>
    <td>Укажите правильный протокол, например `https` вместо `http`.</td>
  </tr>
</table>

Эта ошибка возникает, если в атрибутах `href` или `src` должны быть указаны URL с определенным протоколом.
Например, многие теги поддерживают только `https`.

### Отсутствует обязательное свойство атрибута

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The property '%1' is missing from attribute '%2' in tag '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Добавьте отсутствующее свойство.</td>
  </tr>
</table>

В настоящее время эта ошибка указывает на отсутствие следующих обязательных свойств:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

Правило относится только к определенным тегам:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### Взаимоисключающие атрибуты

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">MUTUALLY_EXCLUSIVE_ATTRS</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите один из взаимоисключающих атрибутов.</td>
  </tr>
</table>

Эта ошибка возникает, если в теге обнаружены взаимоисключающие атрибуты.
Например, для следующих тегов допускается только один из указанных атрибутов:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` или `src`;
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` или `src`;
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` или `srcdoc`;
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` или `data-videoid`.

### Отсутствует обязательный атрибут из списка

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">MANDATORY_ONEOF_ATTR_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The tag '%1' is missing a mandatory attribute - pick one of %2." </span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Найдите в списке отсутствующий обязательный атрибут и добавьте его.</td>
  </tr>
</table>

Эта ошибка возникает, если в теге отсутствует какой-либо из обязательных атрибутов, перечисленных в списке:
Например, для следующих тегов необходимо указать любой из двух атрибутов:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` или `src`;
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` или `src`;
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` или `srcdoc`;
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` или `data-videoid`.

### Неверный родительский тег

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">WRONG_PARENT_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The parent tag of tag '%1' is '%2', but it can only be '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Включите тег непосредственно в нужный родительский тег.</td>
  </tr>
</table>

Некоторые теги должны быть включены непосредственно в конкретный родительский тег.
Ниже перечислены действующие правила:

* Для тега `!doctype` требуется родительский тег `root`.
* Для тега `html` требуется родительский тег `!doctype`.
* Для тега `head` требуется родительский тег `html`.
* Для тега `body` требуется родительский тег `html`.
* Для тега `link` требуется родительский тег `head`.
* Для тега `meta` требуется родительский тег `head`.
* Для тега `style amp-custom` требуется родительский тег `head`.
* Для тега `style` требуется родительский тег `boilerplate (noscript)`.
* Для тега `noscript` требуется родительский тег `head`.
* Для тега `script` требуется родительский тег `head`.
* Для тега `source` требуется медиатег ([`amp-audio`](../../../../documentation/components/reference/amp-audio.md), [`amp-video`](../../../../documentation/components/reference/amp-video.md) и т. п.).

### Недопустимый родительский тег

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">DISALLOWED_TAG_ANCESTOR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The tag '%1' may not appear as a descendant of tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите или переместите недопустимый вложенный тег.</td>
  </tr>
</table>

Эта ошибка возникает, если тег включен в неподходящий родительский тег.
В настоящее время есть только одно такое правило: один тег `template` нельзя помещать в другой аналогичный тег<code></code>.

### Обязательный родительский тег

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_ANCESTOR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The tag '%1' may only appear as a descendant of tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите тег или сделайте его дочерним для подходящего тега.</td>
  </tr>
</table>

Требования к родительским и дочерним тегам приведены в [спецификации для валидатора AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) в разделе `mandatory_ancestor`.

Ошибка возникает, когда для следующих тегов не указан `mandatory_ancestor` (родительский тег):

* Тег `img` может быть дочерним только для тега `noscript`.
* Тег `video` может быть дочерним только для тега `noscript`.
* Тег `audio` может быть дочерним только для тега `noscript`.
* Тег `noscript` может быть дочерним только для тега `body`.

### Обязательный родительский тег с подсказкой

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_ANCESTOR_WITH_HINT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите тег или сделайте его дочерним для подходящего тега. Можно также заменить тег на другой, с подсказкой.</td>
  </tr>
</table>

Ошибка возникает, если в AMP-документе обнаруживается одна из следующих проблем:

* Тег `img` не заключен в родительский тег `noscript`.
* Тег `video` не заключен в родительский тег `noscript`.
* Тег `audio` не заключен в родительский тег `noscript`.
* Тег `noscript` не заключен в родительский тег `body`.

### Повтор уникального тега

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">DUPLICATE_UNIQUE_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The tag '%1' appears more than once in the document."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите из AMP-документа один из повторяющихся тегов.</td>
  </tr>
</table>

Эта ошибка возникает, когда в документе обнаруживается два одинаковых тега, которые должны быть уникальными.

Полный список уникальных тегов:

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://ampjs.org/v0.js">`

## Ошибки стиля и дизайна <a name="style-and-layout-errors"></a>

Прежде чем переходить к разбору ошибок, следует понять, как на AMP-страницах работают [стили](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) и [шаблоны](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). Поскольку AMP-страницы имеют формат HTML, они во многом похожи на обычные HTML-страницы.
Но существует ряд ограничений, которые обеспечивают быструю загрузку контента.

Шаблоны для AMP-страниц более строгие.
Для любого тега, который отображается на странице, должна быть предварительно задана ширина и высота, чтобы контент при загрузке не смещался.
Вы можете не добавлять эти атрибуты вручную.
Для некоторых типов шаблонов валидатор AMP не выдает ошибки, поскольку используются значения по умолчанию.

Для каждого тега AMP есть свои поддерживаемые шаблоны (`supported_layouts`). Подробнее о них читайте в [спецификации](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
Если используется недопустимый шаблон, валидатор выдаст ошибку. Проверяются только правила для предварительно заданного шаблона.

### Слишком большая таблица стилей

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">STYLESHEET_TOO_LONG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Уменьшите таблицу стилей, чтобы ее объем составлял не более 50 000 байт.</td>
  </tr>
</table>

Эта ошибка возникает, если объем контента в теге `<style amp-custom>` превышает 50 000 байт.

### Ошибка синтаксиса CSS

<table>
   <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">CSS_SYNTAX</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"CSS syntax error in tag '%1' - %2."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Исправьте ошибку синтаксиса CSS.</td>
  </tr>
</table>

Эта ошибка возникает, если в указанном теге обнаруживаются ошибки CSS.
Если вы не знаете, почему это происходит, попробуйте проверить CSS в Интернете, например с помощью инструмента [csslint](http://csslint.net/).

### Ошибка синтаксиса CSS в конкретном правиле

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">CSS_SYNTAX_INVALID_AT_RULE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Исправьте указанную ошибку синтаксиса CSS.</td>
  </tr>
</table>

Эта ошибка относится к директивам CSS. Для них существует совсем немного правил, относящихся к AMP-страницам
(см. также [требования к AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).
Например, директива `@import` не поддерживается.
Ошибка валидации указывает на недействительное правило.

### Предполагаемый макет не подходит для тега AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">IMPLIED_LAYOUT_INVALID</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The implied layout '%1' is not supported by tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Укажите действительный атрибут макета для тега.</td>
  </tr>
</table>

Эта ошибка возникает, если для тега AMP не указан макет либо если указанный макет (ширина, высота и размеры) не поддерживается.
Допустимые значения атрибута `supported_layout` для тегов приведены в [спецификации для валидатора AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Поведение макета определяется атрибутом `layout`.
Подробнее о том, как работает макет, читайте в [этом разделе](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) нашей [спецификации](../../../../documentation/components/reference/amp-layout.md).

**Примечание.** Если макет не указан или в нем отсутствуют значения `width` и `height`, по умолчанию используется вариант CONTAINER. Валидатор выдает ошибку, поскольку этот вариант не поддерживается тегами AMP.
Чтобы устранить ошибку, укажите другой макет либо значение атрибутов `width` и/или `height`.

### Предполагаемый макет не поддерживает атрибут

<table>
  <tr>
    <td class="col-thirty"><strong>Код</strong></td>
    <td><span class="notranslate">ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Формат</strong></td>
    <td><span class="notranslate">"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Действия</strong></td>
    <td>Удалите из тега недопустимый атрибут или укажите совместимый макет.</td>
  </tr>
</table>

Эта ошибка возникает, если для тега AMP не указан макет либо же указанный макет содержит недопустимый атрибут.
Списки недопустимых атрибутов для разных макетов приведены в нашей [спецификации](../../../../documentation/components/reference/amp-layout.md).

### Указанный макет не подходит для тега AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">SPECIFIED_LAYOUT_INVALID</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The specified layout '%1' is not supported by tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Укажите макет, который поддерживается тегом.</td>
  </tr>
</table>

Эта ошибка возникает, если тег не поддерживает указанный макет.
Допустимые значения атрибута `supported_layout` для тегов приведены в [спецификации для валидатора AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Поведение макета определяется атрибутом `layout`.
Подробнее о том, как работает макет, читайте в [этом разделе](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) нашей [спецификации](../../../../documentation/components/reference/amp-layout.md).

### Указанный макет не поддерживает атрибут

<table>
  <tr>
    <td class="col-thirty"><strong>Код</strong></td>
    <td><span class="notranslate">ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Формат</strong></td>
    <td><span class="notranslate">"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Действия</strong></td>
    <td>Удалите из тега недопустимый атрибут или укажите совместимый макет.</td>
  </tr>
</table>

Эта ошибка возникает, если для тега AMP указан макет, но он содержит недопустимый атрибут.
Списки недопустимых атрибутов для разных макетов приведены в нашей [спецификации](../../../../documentation/components/reference/amp-layout.md).

### Недопустимое значение обязательного атрибута

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">ATTR_VALUE_REQUIRED_BY_LAYOUT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Укажите необходимое значение атрибута.</td>
  </tr>
</table>

Эта ошибка возникает, когда значение атрибута не поддерживается указанным макетом.
Чтобы понять, в чем проблема, ознакомьтесь с [вариантами поведения макетов](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).

Допустим, вы используете макет `fixed-height` и указали числовые значения для атрибутов `height` и `width`.
Макет `fixed-height` принимает значение `height`.
Атрибут `width` должен отсутствовать, либо же иметь значение `auto`.
Иначе валидатор выдает ошибку.

### Несоответствие единиц измерения ширины и высоты

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Обеспечьте единообразие единиц измерения ширины и высоты.</td>
  </tr>
</table>

За исключением варианта `layout=fixed` ширина и высота должны быть заданы в одних и тех же единицах измерения.
Иначе появляется эта ошибка.

Пример неверного кода: `<amp-img src="" layout="responsive" width="42px" height="42rem">`.

В теге "[`amp-img`](../../../../documentation/components/reference/amp-img.md)  разные единицы измерения ширины и высоты – "px" и "rem" соответственно.

## Ошибки, связанные с шаблонами

AMP-страницы не могут содержать синтаксис шаблонов, если он не включен в тег, специально созданный для таких случаев, например [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md).

Вы можете включать шаблоны в исходные файлы, если при выходе контент отображается без них (см. раздел об использовании [препроцессоров CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)).

### Атрибут содержит синтаксис шаблона

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">TEMPLATE_IN_ATTR_NAME</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"Mustache template syntax in attribute name '%1' in tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите из атрибута синтаксис шаблона Mustache.</td>
  </tr>
</table>

Эта ошибка возникает, если валидатор обнаруживает [синтаксис шаблона Mustache](https://mustache.github.io/mustache.5.html) в значении атрибута.

### Атрибут содержит неэкранированный синтаксис шаблона

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">UNESCAPED_TEMPLATE_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Экранируйте шаблон Mustache.</td>
  </tr>
</table>

Эта ошибка возникает, если валидатор обнаруживает [неэкранированный синтаксис шаблона Mustache](https://mustache.github.io/mustache.5.html) в значении атрибута.

### Атрибут содержит подшаблон

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">TEMPLATE_PARTIAL_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите подшаблон Mustache.</td>
  </tr>
</table>

Эта ошибка возникает, если валидатор обнаруживает [подшаблон Mustache](https://mustache.github.io/mustache.5.html) в значении атрибута.

## Неподдерживаемые элементы

### Тег не поддерживается

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">DEPRECATED_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">No error message defined as yet (no deprecated tags).</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Удалите тег, который больше не поддерживается.</td>
  </tr>
</table>

Это предупреждение отображается, если в AMP-документе обнаружен устаревший тег.
Оно не считается ошибкой.
В настоящее время устаревших тегов нет, эта функция предусмотрена на будущее.

### Атрибут не поддерживается

<table>
  <tr>
  	<td class="col-thirty"><strong>Код</strong></td>
  	<td><span class="notranslate">DEPRECATED_ATTR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Формат</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Действия</strong></td>
  	<td>Рекомендуется удалить атрибут, который больше не поддерживается.</td>
  </tr>
</table>

Это предупреждение отображается, если в AMP-документе обнаружен устаревший атрибут.
Оно не считается ошибкой.

Устаревшие атрибуты для каждого тега можно найти по запросу `deprecation` в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

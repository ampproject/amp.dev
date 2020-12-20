---
"$title": Добавление собственных шрифтов
"$order": '6'
description: AMP-страницы не могут включать внешние таблицы стилей, за исключением внешних шрифтов. Вы можете встроить внешние шрифты на свою страницу двумя способами...
formats:
- websites
- ads
- stories
author: pbakaus
---

AMP-страницы не могут включать внешние таблицы стилей, за исключением внешних шрифтов. Вы можете встроить внешние шрифты на свою страницу двумя способами:

1. Через `<link>`: только для разрешенных поставщиков шрифтов.
2. Через `@font-face` (без ограничений, разрешены все шрифты)

### 1. Использование `<link>`

Используйте `<link>` (обычно в теге head страницы), например так:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Для загрузки шрифтов с помощью тегов link разрешены следующие источники:

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com.**

### 2. Использование `@font-face`

В качестве альтернативы вы можете использовать [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) в своей таблице стилей AMP:

[sourcecode:html]
<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>
[/sourcecode]

[tip type="note"] **ПРИМЕЧАНИЕ.** Шрифты, добавленные посредством `@font-face`, должны загружаться по схеме HTTP или HTTPS. [/tip]

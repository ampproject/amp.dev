---
"$title": Создание оболочки для рекламы
"$order": '0'
description: '"Используя свой любимый текстовый редактор, создайте HTML-файл с именем my-amphtml-ad.html. Скопируйте в этот файл следующую разметку HTML: ..."'
---

[Обязательный HTML-код для рекламы AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) является вариантом [обязательного AMPHTML-кода для AMP-страницы](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md). Давайте познакомимся с обязательным кодом, создав оболочку нашей AMPHTML-рекламы.

Используя свой любимый текстовый редактор, создайте HTML-файл с именем **`my-amphtml-ad.html`**. Скопируйте в этот файл следующую разметку HTML:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
</head>
<body>
</body>
</html>
```

Эта разметка предназначена для простейшего корректно сформированного HTML-файла. Обратите внимание, что мы включили `meta`-тег области просмотра, чтобы получить [адаптивную область просмотра](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport).

Теперь давайте изменим HTML, превратив его в AMPHTML-рекламу.

В `<html>` добавьте атрибут `⚡4ads`, который определяет документ как AMPHTML-рекламу. Также можно использовать альтернативный атрибут `amp4ads`.

```html
<!doctype html>
<html ⚡4ads>
<head>
...
```

[tip type="note"] **ПРИМЕЧАНИЕ.** В отличие от AMP-страниц, [AMPHTML-реклама не требует указания тега `<link rel="canonical">`](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules). [/tip]

AMPHTML-рекламе требуется собственная версия среды выполнения AMP, поэтому добавьте в раздел `<head>` документа следующий `<script>`:

```html
<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
```

Для AMPHTML-рекламы требуется cвоя, значительно более простая строка [стандартного](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) стиля, чем для AMP-страниц. Добавьте в раздел `<head>` следующий код:

```html
<style amp4ads-boilerplate>body{visibility:hidden}</style>
```

Для стилизации AMPHTML-рекламы CSS-код встраивается в документ AMPHTML с помощью тегов `<style amp-custom></style>` в разделе `<head>`. Поскольку мы отображаем простую графическую рекламу, CSS нам не нужен; соответственно, добавлять эти теги мы не будем.

[tip type="note"] **ПРИМЕЧАНИЕ.** В AMPHTML-рекламе максимальный размер встроенной таблицы стилей составляет *20 килобайт*. Дополнительные сведения о [требованиях к CSS см. в спецификации AMPHTML-рекламы](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css). [/tip]

Вот полный код вашего HTML-файла:

```html
<!doctype html>
<html ⚡4ads>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
  <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
  <style amp4ads-boilerplate>body{visibility:hidden}</style>
</head>
<body>
</body>
</html>
```

Теперь у вас есть корректно сформированная, но пустая AMPHTML-реклама. Давайте перейдем к созданию графической рекламы.

---
'$title': Создание обычной HTML-страницы
$order: 1
description: В директории проекта есть файл article.html. Это новостная статья, на основе которой мы создадим эквивалентную AMP-страницу...
---

В директории проекта есть файл [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). Это новостная статья, на основе которой мы создадим эквивалентную AMP-страницу.

1. **Скопируйте** весь код из файла `article.html` и вставьте его в новый файл.
2. **Сохраните** новый файл под именем `article.amp.html`.

[tip type="note"] **ПРИМЕЧАНИЕ.** Имя AMP-файлов не обязательно должно заканчиваться на `.amp.html` (может быть любым). Чтобы отделять AMP-страницы от канонических версий, многие издатели используют параметры в конце URL-адреса, например: `http://publisher.com/article.html?amp`. [/tip]

Содержимое вашего файла `article.amp.html` должно выглядеть следующим образом:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>
    </article>
    <img src="mountains.jpg" />
  </body>
</html>
```

Это намеренно упрощенная страница с обычными элементами новостных статей: кодом CSS и JavaScript, а также тегом изображения.

В настоящее время AMP-версия нашей статьи идентична оригинальной статье. Давайте преобразуем ее в формат AMP.

Для начала мы добавим файл библиотеки AMP. Этого недостаточно для того, чтобы сделать ваш новый файл корректно сформированной AMP-страницей, но ниже мы увидим, какие дополнительные действия нужно выполнить, чтобы это исправить.

Для того чтобы включить библиотеку AMP, **добавьте** в конец тега `<head>` следующую строку:

```html
<script async src="https://ampjs.org/v0.js"></script>
```

**Загрузите** в браузере новый файл `article.amp.html`, перейдя по адресу [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html), а затем **откройте** [консоль разработчика](https://developer.chrome.com/devtools/docs/console) в Chrome (или в другом удобном вам браузере).

Просматривая в консоли разработчика вывод JavaScript (вкладка «Console»), вы увидите следующую запись:

```text
Powered by AMP ⚡ HTML
```

Библиотека AMP содержит [AMP-валидатор](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), который проверяет код страницы на соответствие требованиям к AMP-документам и сообщает о выявленных проблемах. Чтобы **включить** AMP-валидатор, добавьте в URL-адрес документа следующий идентификатор фрагмента:

```text
#development=1
```

Например:

```text
http://localhost:8000/article.amp.html#development=1
```

В консоли разработчика должно появиться несколько ошибок валидации (возможно, для этого потребуется вручную обновить страницу в браузере):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='AMP validation errors for our sample') }}

Для того чтобы привести документ в соответствие со стандартом AMP, нам потребуется устранить все ошибки. Именно этим мы и займемся в данном уроке.

Прежде чем приступить, давайте включим режим **имитации** мобильного устройства в инструментах разработчика браузера, поскольку наша новостная статья предназначена для мобильных устройств. Например, в Chrome DevTools щелкните значок мобильного телефона и выберите в меню мобильное устройство.

После этого ваш браузер будет отображать страницу в симулированном разрешении экрана мобильного устройства:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Mobile simulation of our AMP page') }}

Теперь мы можем приступить к работе. Давайте последовательно изучим все ошибки валидации и узнаем, какое отношение они имеют к AMP.

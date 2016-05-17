---
layout: page
title: Что такое AMP?
order: 0
locale: ru
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP представляет собой способ создания веб-страниц с быстро визуализируемым статическим содержимым.
Практическое применение AMP включает в себя три различные части:

{% include toc.html %}

**AMP HTML** представляет собой разметку HTML с некоторыми ограничениями для повышения надежности работы
и некоторыми расширениями для создания содержимого, выходящего за пределы базовой разметки HTML.
Библиотека **AMP JS** обеспечивает быструю визуализацию страниц AMP HTML.
Дополнительный кеш **Google AMP Cache** используется для предоставления страниц AMP HTML.

## AMP HTML

AMP HTML является базовой разметкой HTML, дополненной персонализированными свойствами AMP.
Простейший файл AMP HTML может выглядеть следующим образом:

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

Хотя большинство тегов в странице AMP HTML являются обычными тегами HTML,
некоторые теги HTML заменяются тегами AMP (см. также
[Теги HTML в спецификации AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
С помощью этих персонализированных элементов, которые называются компонентами AMP HTML,
можно легко создать стандартные шаблоны для реализации эффективного способа представления страниц.

Например, тег [`amp-img`](/docs/reference/amp-img.html)
обеспечивает полную поддержку атрибута `srcset` даже в тех браузерах, которые пока его не поддерживают.
Узнайте, как [создать свою первую страницу AMP HTML](/docs/get_started/create_page.html).

## AMP JS

[Библиотека AMP JS](https://github.com/ampproject/amphtml/tree/master/src) реализует
все [практические методы эффективного применения AMP](/docs/get_started/technical_overview.html),
управляет загрузкой ресурсов и предоставляет упомянутые выше персонализированные теги
для быстрой визуализации страницы.

Одной из наиболее значительных оптимизаций является асинхронная обработка данных из внешних источников, поэтому никакие элементы страницы не могут блокировать ее визуализацию.

Другие способы повышения производительности включают в себя изолирование всех встроенных фреймов, предварительный расчет макета каждого элемента страницы перед загрузкой ресурсов и отключение медленных селекторов CSS.

Чтобы получить дополнительную информацию не только по [методам оптимизации](/docs/get_started/technical_overview.html), но и об имеющихся ограничениях, [ознакомьтесь со спецификацией AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## Google AMP Cache

Кеш Google AMP Cache представляет собой сеть на основе прокси-серверов
для предоставления всех допустимых документов AMP.
Этот кеш получает страницы AMP HTML, кеширует их и автоматически повышает скорость их отображения.
При использовании Google AMP Cache сам документ, все файлы JS и все изображения загружаются
из одного источника, использующего
[HTTP 2.0](https://http2.github.io/) для максимальной эффективности отображения.

В кеш также встроена
[система проверки](https://github.com/ampproject/amphtml/tree/master/validator),
которая подтверждает возможность работы страницы и ее
независимость от внешних источников.
Система проверки запускает последовательность операторов контроля,
которые подтверждают, что разметка страницы соответствует спецификации AMP HTML.

Другая версия проверки входит в состав каждой страницы AMP. Эта версия может регистрировать ошибки проверки непосредственно в консоли браузера при визуализации страницы,
что позволяет увидеть, как сложные изменения кода
могут повлиять на производительность и интерфейс пользователя.

Ознакомьтесь с дополнительной информацией о [тестировании страниц AMP HTML](/docs/guides/validate.html).

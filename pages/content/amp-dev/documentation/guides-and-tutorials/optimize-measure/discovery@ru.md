---
$title: Как сообщать о наличии AMP-версии страницы
---

Для некоторых видов контента, например новостных статей, целесообразно размещать на одной странице как обычную версию материалов, так и вариант в формате AMP. Как сделать так, чтобы робот Google, обнаружив обычную страницу, обрабатывал ее AMP-версию?

### Связывание страниц с помощью `<link>`

Чтобы решить эту проблему, добавьте информацию об AMP-странице в раздел `<head>` обычной страницы, используя теги `<link>`, и наоборот.

На обычную страницу следует добавить следующий код:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

На AMP-странице нужно разместить такой код:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Что делать, если у меня есть только AMP-версия страницы?

Добавьте на нее каноническую ссылку, которая будет вести на эту же страницу:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## Интеграция со сторонними платформами с помощью метаданных <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

Иногда стороннему сайту, на который встроена ваша AMP-страница или добавлена ссылка на нее, требуются дополнительные сведения. Например, платформа может запрашивать, какой контент содержит страница, а также существует ли ее скриншот и краткое описание.

Это касается не только AMP-страниц, но и вообще всех веб-страниц. При этом для некоторых платформ наличие метаданных является обязательным, т. е. они **не показывают ссылки на контент, если нужные метаданные отсутствуют**. Добавьте метаданные для платформ, на которых будет размещаться ваш контент.

### Использование разметки Schema.org для большинства поисковых систем

На сайте [Schema.org](http://schema.org) доступны словари, позволяющие добавлять метаданные для всех типов контента. В случае AMP-страниц метаданные включают тип контента (например, "новостная статья"), заголовок, дату публикации и изображения для предварительного просмотра.

Пример:

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

Ознакомьтесь с [примерами метаданных, а также альтернативным синтаксисом атрибутов HTML](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples).

Примечание: чтобы ваш контент показывался в демоверсии [карусели новостей Google Поиска на мобильных устройствах](https://g.co/ampdemo), обязательно используйте разметку Schema.org.
Прочитайте [это руководство](https://developers.google.com/structured-data/carousels/top-stories) или воспользуйтесь [инструментом проверки структурированных данных](https://developers.google.com/structured-data/testing-tool/).

### Другие метаданные для прочих платформ

Прочитайте [о других способах, позволяющих упростить распространение вашего контента и улучшить его позиции в результатах поиска в различных сервисах](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/).

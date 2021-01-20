---
$title: Создание страницы AMP HTML
---

Следующая разметка может служить хорошей начальной точкой или шаблоном.
Скопируйте ее и сохраните в файл с расширением .html.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Содержимое тела страницы пока достаточно простое. Однако в ее заголовке содержится много дополнительного кода, который не так очевиден. Попробуем проанализировать необходимую разметку.

## Необходимая разметка

Документ AMP HTML ДОЛЖЕН:

  - Начинаться с типа документа `<!doctype html>`.
  - Содержать тег верхнего уровня `<html ⚡>` (также допускается использование `<html amp>`).
  - Содержать теги `<head>` и `<body>` (необязательные в разметке HTML).
  - Содержать внутри заголовка тег `<link rel="canonical" href="$SOME_URL">`, который указывает на обычную HTML-версию документа AMP HTML или на сам исходный документ, если такой версии не существует.
  - Содержать тег `<meta charset="utf-8">` в качестве первого дочернего элемента тега заголовка.
  - Содержать в теге заголовка тег `<meta name="viewport" content="width=device-width">в него значение initial-scale=1.
  - Содержать в качестве последнего элемента заголовка тег `<script async src="https://cdn.ampproject.org/v0.js"></script>`, который указывает и загружает библиотеку AMP JS.
  - Содержать в теге `<head>` следующий код:
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## Дополнительные метаданные

Кроме выполнения этих простых требований заголовок нашего примера также включает определение Schema.org, которое не является жестким требованием для AMP, но необходимо для предоставления контента в некоторых местах, например в [демонстрации карусельного представления новостей Google Поиска (попробуйте на своем телефоне)](https://g.co/ampdemo).

Чтобы узнать больше о всех метаданных, которые потребуются в различных других местах, таких как Twitter, [ознакомьтесь с нашими примерами](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples). Для получения дополнительной информации об использовании AMP в Google Поиске см. раздел [Горячие новости с AMP](https://developers.google.com/structured-data/carousels/top-stories).

<hr>

Это все, что потребуется для создания нашей первой страницы AMP, однако в ее теле пока ничего нет. В следующем разделе мы рассмотрим способы добавления основных компонентов, таких как изображения и персонализированные элементы AMP, а также настройку стиля страницы и разработку отзывчивого макета.

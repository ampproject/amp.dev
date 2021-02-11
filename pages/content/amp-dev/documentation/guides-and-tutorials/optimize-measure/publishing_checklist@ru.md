---
'$title': Контрольный список для публикации AMP-страниц
$order: 0
description: Адаптивный веб-дизайн позволяет создавать веб-страницы, подстраивающиеся под пользователя и учитывающие размер и ориентацию его экрана. Вы можете добиться...
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

Следуйте приведенным ниже рекомендациям, чтобы задействовать на своем сайте все возможности AMP.

# Следите за соответствием спецификации AMP

AMP по умолчанию предоставляет множество преимуществ, таких как предварительная загрузка контента из AMP-кешей с целью сокращения времени ожидания. Страницы, опубликованные с ошибками AMP-валидатора, не индексируются AMP-кешами, и вместо них могут отображаться страницы с сообщениями об ошибке.

Чтобы проверить AMP-страницу перед публикацией, используйте следующие ссылки:

- [О проверке AMP-страниц](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [AMP-валидатор](https://validator.ampproject.org/)
- [Проверка AMP-страниц от Google](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [Инструменты AMP](../../../documentation/tools.html?format=websites)

# Предоставляйте кешированным AMP-страницам доступ к серверу

Отличные новости: AMP-страницы, не содержащие ошибок, автоматически добавляются во все существующие AMP-кеши, а значит, ваши пользователи смогут наслаждаться безопасным просмотром контента с минимальным временем загрузки. Такие оптимизации весьма полезны, но у них есть небольшой недостаток: у некоторых пользователей AMP-страницы будут загружаться с доменов, отличных от вашего. Из-за этого некоторые страницы могут утратить доступ к данным сайта при использовании динамических компонентов AMP, таких как [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) или [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). Такие ошибки называются ошибками CORS (совместного использования ресурсов между источниками), и для их устранения необходимо разрешить CORS-запросы от всех доступных [AMP-кешей](https://cdn.ampproject.org/caches.json) — это не представляет никакой угрозы для безопасности. Если серверная часть вашего сайта основана на Node.js, вы можете использовать [промежуточное ПО amp-cors](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

Подробнее о предоставлении доступа к серверу:

- [Как кешируются AMP-страницы](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [CORS в AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [Промежуточное ПО AMP CORS](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) для Node.js

# Используйте подписанные обмены для безопасной передачи контента

Механизм подписанных обменов (SXG) позволяет передавать контент с сохранением оригинального домена, а также упрощает аналитику. Выдача AMP-страниц с применением SXG защищает вашу информацию, связывая документ с его заявленным URL при помощи цифровой подписи. При этом пользовательские сеансы и cookie-файлы функционируют так, как будто страница загружена с оригинального домена, что устраняет возможные препятствия для средств аналитики. SXG доставляет подписанный контент AMP в дополнение к обычному, а не вместо него.

Подробнее о реализации подписанных обменов:

- [Выдача контента AMP с использованием подписанных обменов](signed-exchange.md?format=websites)
- [Подписанные HTTP-обмены](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Отображение исходных URL-адресов AMP-страниц и упрощение аналитики при помощи подписанных обменов (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Тестируйте кешированные страницы

AMP-кеши хранят изображения, шрифты и содержимое страниц, чтобы пользователи могли загружать ваш контент максимально быстро. Именно поэтому важно проверять, что ваши AMP-страницы выглядят и работают надлежащим образом при загрузке из AMP-кеша.

Добавляя AMP-страницы в AMP-кеш, используйте [встроенные в браузер инструменты разработчика](https://developers.google.com/web/tools/chrome-devtools/), чтобы убедиться, что все внешние ресурсы доступны для загрузки. Вот список ресурсов, на которые следует обратить внимание:

- изображения
- видео
- конечные точки amp-analytics
- конечные точки amp-pixel
- загружаемые шрифты
- элементы iframe

Подробнее об AMP-кешах:

- [Использование Google AMP Cache](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP в Google, Google AMP Cache](https://developers.google.com/amp/cache/overview)
- [Устранение проблем при работе с AMP-кешем](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [AMP-кеш: формат URL-адресов и обработка запросов](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# Убедитесь, что ваши файлы AMP видны поисковым системам

При публикации AMP-страниц (как самостоятельных, так и в паре с традиционными страницами) важно позаботиться, чтобы их могли обнаружить поисковые системы. Каждая AMP-страница должна содержать тег `<link rel="canonical" href="$SOME_URL">` в разделе `<head>`. AMP-страницы должны ссылаться либо на саму себя (если это самостоятельная страница), либо на свою традиционную (не-AMP) версию; в последнем случае традиционная версия должна содержать аналогичную ссылку на AMP-версию.

Укажите на странице метаданные в соответствии со стандартом [Schema.org](https://schema.org/), поскольку они могут потребоваться для публикации контента на других сайтах или в поисковых системах.

Поисковый робот (также известен как веб-паук или веб-краулер) — это программа для поиска контента. Такие программы путешествуют по различным сайтам, индексируя контент для поисковых систем, чтобы те могли отображать его пользователям в соответствии с их запросами. Для того чтобы сделать сайт доступным для поисковых роботов, добавьте соответствующие инструкции в `robots.txt` и настройте нужные заголовки.

НЕ закрывайте доступ поисковым ботам при помощи файла [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en).

```
User-agent: *
Disallow: /amp/                            <= don't!
```

НЕ добавляйте метатег robots со значением `noindex` в файлы AMP HTML.

```
<meta name="robots" content="noindex" />   <= don't!
```

НЕ устанавливайте для AMP-файлов HTTP-заголовок X-Robots-Tag со значением `noindex`.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Подробнее о том, как сделать страницы доступными для поиска:

- [Как сделать страницу доступной для поиска ](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Спецификации метатега robots и HTTP-заголовка X-Robots-Tag](https://developers.google.com/search/reference/robots_meta_tag)
- [Часто задаваемые вопросы об индексировании AMP-страниц](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Измерение пользовательского трафика и переходов

Ключевым элементом качественной аналитики является сбор правильных метрик. Если вы хотите выяснить, как добавление на сайт AMP-версий страниц влияет на ваших пользователей, убедитесь, что вы измеряете нужные показатели. Если аналитика не учитывает особенностей AMP, можно получить ложноотрицательные, ложноположительные или нерелевантные результаты. Убедитесь, что понимаете, какой показатель нужно измерять и как это делается.

Подробнее о правильной настройке аналитики в AMP:

- [Итак, ваш AMP-тест не показывает нужной эффективности. Что делать?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Анализ кешированных страниц в сравнении с обычными](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Измерение перемещений пользователей между AMP-кешем и вашим сайтом](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Измерение успеха: новые и экспериментальные возможности аналитики для AMP (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Отображение исходных URL-адресов AMP-страниц и упрощение аналитики при помощи подписанных обменов (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

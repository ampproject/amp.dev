---
'$title': Защита от сторонних атак
$order: 7
description: Примите меры для защиты ваших AMP-страниц и пользователей от сетевых уязвимостей
formats:
  - websites
author: CrystalOnScript
---

Примите меры для защиты вашего сайта и пользователей от сетевых уязвимостей. Одной из самых опасных уязвимостей является [межсайтовый скриптинг](https://www.google.com/about/appsecurity/learning/xss/) (XSS). XSS — это ошибка безопасности, которая может позволить злоумышленнику внедрить вредоносный код на HTML-страницы, просматриваемые пользователями.

Чтобы защититься от подобных атак, вы можете задействовать [политику безопасности контента (CSP)](https://csp.withgoogle.com/docs/index.html). AMP-кеши, такие как Google AMP Cache, добавляют CSP на ваши страницы автоматически. Однако при просмотре некешированной версии страницы этот дополнительный слой безопасности отсутствует, если только вы не добавите свою собственную CSP.

# Внедрение CSP-политики AMP

Чтобы внедрить CSP-политику, добавьте соответствующий метатег в элементы head на своих страницах. Ниже представлена CSP-политика AMP, которая позволяет вставлять на вашу страницу только скрипты AMP:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[Полный пример можно просмотреть здесь](https://github.com/ampproject/amphtml/blob/master/examples/csp.amp.html).

[tip type="read-on"] Подробнее о [защите от брешей безопасности и политиках CSP можно узнать здесь](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). [/tip]

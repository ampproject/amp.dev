---
'$title': Отслеживание просмотров рекламы
$order: 2
description: Из самой рекламы AMPHTML вы можете отслеживать ее показатели с помощью компонентов amp-pixel или amp-analytics. В нашем базовом примере мы добавим возможность отслеживать просмотры страниц ...
---

Из самой рекламы AMPHTML вы можете отслеживать ее показатели с помощью компонентов [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) или [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). В нашем базовом примере мы добавим возможность отслеживать просмотры страниц с помощью компонента [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) и указывать на URL-адрес, который регистрирует просмотры страниц (в данном случае — фиктивный URL):

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img
      width="300"
      height="250"
      alt="Learn amp"
      src="/static/img/docs/ads/amp-300x250.png"
    ></amp-img>
  </a>
  <amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

Вот и все — вы создали свою рекламу AMPHTML!

Перед загрузкой рекламы на рекламный сервер вам нужно сделать еще один последний шаг — убедиться, что ваш синтаксис действителен.

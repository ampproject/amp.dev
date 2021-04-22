---
'$title': Интеграция с AMP для показа медийной рекламы
$order: 5
description: Это руководство предназначено для рекламных сетей, которые хотят интегрироваться с AMP для показа медийной рекламы на AMP-страницах.
formats:
  - ads
---

Это руководство предназначено для рекламных сетей, которые хотят интегрироваться с AMP для показа медийной рекламы на AMP-страницах.

## Обзор

Рекламные серверы могут выполнять интеграцию с AMP для показа традиционной HTML-рекламы на AMP-страницах, а также для показа рекламы [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md).

##### Хотите показывать традиционную HTML-рекламу?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### Хотите показывать рекламу на AMPHTML?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (т. е. если вы еще не создали его для показа традиционной HTML-рекламы).
2. [Создайте интеграцию Fast Fetch для показа рекламы AMPHTML](#creating-a-fast-fetch-integration).

## Создание `amp-ad` <a name="creating-an-amp-ad"></a>

Поддерживаемые вами издатели включают в свои страницы предоставленную вами библиотеку JavaScript и размещают на страницах различные «рекламные сниппеты», которые используют эту библиотеку для загрузки рекламы и отображения ее на сайте издателя. Так как AMP не позволяет издателям выполнять произвольный JavaScript, вам потребуется внести правки в открытый код компонента [`amp-ad`](../../../documentation/components/reference/amp-ad.md), чтобы позволить ему выполнять запрос рекламы с вашего рекламного сервера.

[tip type="note"] **Примечание.** Вы можете использовать эту реализацию [`amp-ad`](../../../documentation/components/reference/amp-ad.md) для отображения традиционной HTML-рекламы **и** AMPHTML-рекламы. [/tip]

Например, запрос на сервер Amazon A9 можно выполнить с помощью следующего синтаксиса:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

В приведенном выше коде с помощью атрибута `type` указывается рекламная сеть, которой в данном случае является A9. Атрибуты `data-*` используются для передачи обязательных параметров сервера Amazon A9. В файле [`a9.js`](https://github.com/ampproject/amphtml/blob/main/ads/a9.js) показано, как параметры сопоставляются с вызовом JavaScript на URL сервера A9. Параметры, передаваемые тегом [`amp-ad`](../../../documentation/components/reference/amp-ad.md), добавляются к URL-адресу для возврата рекламного объявления.

Инструкции по созданию интеграции [`amp-ad`](../../../documentation/components/reference/amp-ad.md) см. в разделе [Интеграция рекламных сетей в AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## Создание интеграции Fast Fetch <a name="creating-a-fast-fetch-integration"></a>

[Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/) — это механизм AMP, который отделяет запрос рекламы от ответа рекламы, что позволяет запросам рекламы выполняться на более раннем этапе жизненного цикла страницы и отображать рекламу только тогда, когда она может быть просмотрена пользователями. Fast Fetch обеспечивает приоритет в обработке проверенной рекламы AMPHTML по сравнению с традиционной HTML-рекламой. В Fast Fetch, если реклама не проходит проверку, она помещается в междоменный iframe, чтобы изолировать ее от остальной части документа AMP. И наоборот, реклама AMPHTML, прошедшая проверку, записывается прямо в код страницы. Fast Fetch обрабатывает как AMP-, так и не-AMP-рекламу; для рекламы, не прошедшей проверку, дополнительных запросов рекламы не требуется.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Fast Fetch Integration flow', caption='Fast Fetch Integration flow' ) }}

Чтобы показывать AMPHTML-рекламу с вашего рекламного сервера, вы должны обеспечить интеграцию Fast Fetch, которая включает в себя:

1. Поддержку SSL.
2. Код JavaScript для создания запроса рекламы (примеры реализации: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) и [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)).
3. Проверку и подписание креатива через службу проверки рекламы — например, сервис от [Cloudflare](https://blog.cloudflare.com/firebolt/), позволяющий любому независимому рекламному провайдеру показывать более быструю, «легкую» и увлекательную рекламу.

Инструкции по созданию интеграции Fast Fetch см. в [Руководстве по сетевому внедрению Fast Fetch](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md).

## Ресурсы по теме

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [Список поддерживаемых поставщиков рекламы](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [Запись в блоге о запуске Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)

---
"$title": Монетизация AMP-страницы с помощью рекламы
"$order": '0'
description: В этом руководстве представлены инструкции и передовые методы показа рекламы на ваших AMP-страницах. Итак, чтобы отображать рекламу в AMP-контексте, вам нужно добавить на свою AMP-страницу...
formats:
- websites
---

В этом руководстве представлены инструкции и передовые методы показа рекламы на ваших AMP-страницах.

## Добавление рекламы на вашу страницу

In non-AMP pages (traditional HTML), if you want to display ads on your page, you'd include a snippet of JavaScript to serve ads from your ad network.  For performance and security reasons, you cannot include third-party JavaScript in AMP pages.  So, to display ads in AMP, you need to add the custom [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component to your AMP page.

[tip type="tip"] **TIP –** See [AMP By Example for a live demo](../../../../documentation/components/reference/amp-ad.md) that demonstrates adding an amp-ad tag to an AMP page. [/tip]

Давайте рассмотрим, какие действия надо выполнить, чтобы добавить компонент, который позволит вам отображать рекламу на своей AMP-странице.

### Шаг 1: включение скрипта {code0}amp-analytics{/code0}

The [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component is a custom ad extension to the AMP library. Under the hood of [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) is custom JavaScript that's carefully designed to optimize performance. To run the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component, you must add the required JavaScript for this component in the `head` section of your AMP page:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### Шаг 2. Добавьте тег amp-ad на свою AMP-страницу

Over 100+ [ad servers and networks](ads_vendors.md) provide built-in integrations with AMP.  To add an ad for a given ad network, add the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) tag, and specify the network in the `type` attribute.

В этом примере мы добавляем рекламное место для показа рекламы из сети a9:

```html
<amp-ad type="a9">
</amp-ad>
```

### Шаг 3. Укажите размер рекламного блока

Add the `width` and `height` attributes to the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)  tag.  This specifies the size of the ad on your AMP page:

```html
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### Шаг 4. Настройте параметры рекламной сети

Each network has specific data attributes they require to serve ads.  Refer to the ad network's [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) documentation and add the attributes that are needed In the following example,  the a9 network requires additional parameters to specify the size of the ad, and other details:

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### Шаг 5. Укажите заполнитель (необязательно)

Depending on the ad network, you can choose to show a placeholder until the ad is available for viewing. This provides a better user experience by preventing a blank space.  To specify a placeholder, add a child element with the `placeholder` attribute. Learn more in [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Шаг 6. Укажите резервный элемент (необязательно)

Depending on the ad network, you can choose to show a fallback element if no ad is available to serve. To specify a fallback, add a child element with the `fallback` attribute. Learn more in [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

Поздравляем — вы начали показ рекламы на своей AMP-странице!

## Показ рекламы AMPHTML, продаваемой напрямую

The [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component serves ads from the network you specify.  Those ads can be standard HTML ads or AMPHTML ads, provided that the ad network supports AMPHTML ads. To serve your direct-sold ads as AMPHTML ads, create the ad in AMP HTML according to the [AMPHTML ad spec](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) requirements and use an [ad server that serves AMPHTML ads](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md#publishers).

## Дополнение данных таргетинга в составе запросов рекламы

Входящая в состав механизма Fast Fetch функция Real-Time Config (RTC) позволяет издателям дополнять запросы рекламы собственными и сторонними данными таргетинга, которые извлекаются во время выполнения запроса. Для каждого отдельного рекламного места RTC разрешает выполнить до 5 обращений к серверам таргетинга, результаты которых добавляются к запросу рекламы. Чтобы вы могли использовать RTC в своей рекламе, используемая вами рекламная сеть должна поддерживать RTC и Fast Fetch.

Подробнее об RTC можно узнать в этом видео на YouTube:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Watch Effective AMP Monetization with Header Bidding.']

Дополнительную информацию можно также получить из следующих ресурсов, посвященных RTC:

- [AMP RTC publisher implementation guide](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [AMP Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## Рекомендуемые методы

Вот несколько советов, как повысить эффективность рекламы на ваших AMP-страницах:

### Размещение и элементы управления: оптимизируйте места размещения рекламы

- **Place the same number of ads** on AMP Pages as your non-AMP pages to generate maximum revenue per page.
- **Place the first ad immediately below the first viewport** ("below the fold") to provide an optimal user experience.
- Unless you're using advanced CSS or media queries, **ensure your ad units are centered on the page** to provide your users with an optimal mobile web experience.
- Enable [multi-size ad requests](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests) on your AMP inventory to increase ad auction pressure and drive revenue.

### Спрос и цены: получайте правильную цену за свою рекламу

- **Sell ad units on your AMP pages across all sales channels**, including direct and indirect to maximize competition for your inventory on AMP pages.
- **Price your ad inventory on AMP pages** similar to your inventory on non-AMP pages. Monitor performance and adjust pricing accordingly.
- **Ensure all ad demand channels are competing** for ad inventory on your AMP pages to drive up competition.

### Типы рекламы: показывайте самую лучшую рекламу

- **Avoid heavy creatives** per [IAB guidelines](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf).
- **Avoid interstitials** or other ad formats that cause the content to reflow on ad load.
- **Optimize for viewability** by setting the data-loading-strategy to prefer-viewability-over-views.
- **Place ads in your video content** via [supported players](../../../../documentation/components/index.html#media) or [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) to enable revenue on all types of content.
- **Implement native ads** to compete with display ads using multi-sized ad requests, adding demand pressure while providing your readers with a premium user experience.

### Инновации: предлагайте наиболее привлекательные рекламные продукты

- **Размещайте рекламу на дополнительных AMP-страницах,** чтобы получать дополнительный доход:
    - [Реклама в карусели](../../../../documentation/examples/documentation/Carousel_Ad.html)
    - [Реклама в лайтбоксе](../../../../documentation/examples/documentation/Lightbox_Ad.html)
    - ... and [more](../../../../documentation/examples/index.html)
- **Implement new formats for direct sold ads** to equip your sales team with high-impact, innovative ad products:
    - [Прикрепленная реклама](../../../../documentation/examples/documentation/amp-sticky-ad.html)
    - [Flying Carpet](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Дополнительные ресурсы

- [AMPHTML ad templates](../../../../documentation/examples/index.html)
- [Demo: Shows how to add `amp-ad` to your AMP page](../../../../documentation/components/reference/amp-ad.md)

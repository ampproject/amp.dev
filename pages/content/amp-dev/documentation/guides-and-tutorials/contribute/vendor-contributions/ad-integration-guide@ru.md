---
"$title": Интеграция ваших рекламных технологий с AMP
order: '3'
formats:
- ads
teaser:
  text: Инструкции, приведенные ниже, предназначены для провайдеров рекламных технологий, желающих выполнить интеграцию с AMP HTML.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

Инструкции, приведенные ниже, предназначены для провайдеров рекламных технологий, желающих выполнить интеграцию с AMP HTML. Чтобы обеспечить минимальную задержку связи и надлежащее качество интеграции, прежде чем отправлять пулреквест в AMP Project, выполните инструкции, приведенные [здесь](https://github.com/ampproject/amphtml/blob/master/ads/../3p/README.md#ads). Более общие инструкции о том, как помочь развитию проекта AMP, см. в файле [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/ads/../CONTRIBUTING.md).

## Рекламный сервер <a name="ad-server"></a>

*Examples : DFP, A9*

As an ad server, publishers you support include a JavaScript library provided by you and place various "ad snippets" that rely on the JavaScript library to fetch ads and render them on the publisher’s website.

Поскольку AMP не разрешает издателям выполнять произвольный код JavaScript, вам потребуется внести дополнения в открытый исходный код AMP, чтобы разрешить тегу `amp-ad` запрашивать рекламу с вашего рекламного сервера.

For example : Amazon A9 server can be invoked by using following syntax:

[sourcecode:html]
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
[/sourcecode]

Обратите внимание, что атрибуты, следующие за `type`, используются для передачи параметров, необходимым серверу Amazon A9 для выдачи рекламы. В файле [a9.js](https://github.com/ampproject/amphtml/blob/master/ads/./a9.js) можно увидеть, как производится перенос параметров в JavaScript-вызов, который обращается к серверу A9 по URL-адресу `https://c.amazon-adsystem.com/aax2/assoc.js`. Передаваемые тегом AMP-рекламы параметры добавляются к URL-адресу для получения рекламного объявления с сервера.

Подробные сведения о том, как интегрировать вашу рекламную сеть с AMP, см. в статье [Интеграция рекламных сетей с AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

## Система продажи рекламных площадей (SSP) или рекламная биржа <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

*Examples : Rubicon, Criteo OR Appnexus, Ad-Exchange*

Если ваша SSP хочет получать запросы непосредственно с веб-страницы издателя, следуйте описанной выше процедуре по интеграции с рекламным сервером. Добавление собственного значения `type` в тег amp-ad позволяет вам напрямую передавать тег издателю для непосредственного использования ваших тегов в AMP-страницах издателя.

More commonly, SSPs work with the publisher to traffick the SSP’s ad tags in their ad server. In this case, ensure that all assets being loaded by your script in the ad server’s creative are being made over HTTPS. There are some restrictions around some ad formats like expandables, so we recommend that you test out the most commonly delivered creative formats with your publishers.

## Рекламное агентство <a name="ad-agency"></a>

*Examples : Essence, Omnicom*

Work with your publisher to ensure that the creatives you develop are AMP-compliant. Since all creatives are served into iframes whose size is determined when the ad is called, ensure that your creative doesn't try to modify the size of the iframe.

Ensure that all assets that are part of the creative are requested using HTTPS. Some ad formats are not fully supported at the moment and we recommend testing the creatives in an AMP environment. Some examples are : Rich Media Expandables, Interstitials, Page Level Ads.

## Видеопроигрыватель <a name="video-player"></a>

*Examples : Brightcove, Ooyala*

Видеопроигрыватель, который работает на обычных HTML-страницах, не будет работать с AMP; требуется тег, позволяющий среде выполнения AMP загружать ваш проигрыватель. Компания Brightcove создала специальный тег [amp-brightcove](https://github.com/ampproject/amphtml/blob/master/extensions/amp-brightcove/amp-brightcove.md), который позволяет воспроизводить медиаконтент и рекламу на AMP-страницах.

A Brightcove player can be invoked by the following:

[sourcecode:html]
<amp-brightcove
  data-account="1290862519001"
  data-video-id="ref:amp-docs-sample"
  data-player="S1Tt8cgaM"
  layout="responsive"
  width="480"
  height="270"
>
</amp-brightcove>
[/sourcecode]

Инструкции о том, как разработать свой amp-тег, подобный тегу Brightcove, см. в [этом пулреквесте](https://github.com/ampproject/amphtml/pull/1052).

## Сеть видеорекламы <a name="video-ad-network"></a>

*Examples : Tremor, Brightroll*

If you are a video ad network, please work with your publisher to ensure that:

- All video assets are served over HTTPS
- The publisher’s video player has AMP support

## Платформа управления данными (DMP) <a name="data-management-platform-dmp"></a>

*Examples : KRUX, Bluekai*

См. раздел [Как оптимизировать пользовательскую конфигурацию рекламы](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration).

You can use a similar approach to enrich the ad call by passing in audience segments that you get from the user cookie into the ad call.

## Провайдер данных о видимости <a name="viewability-provider"></a>

*Examples : MOAT, Integral Ad Science*

Viewability providers typically integrate with publishers via the ad server’s creative wrappers. If that is the case, ensure that the creative wrapper loads all assets over HTTPS.

На примере MOAT: убедитесь, что адрес `http://js.moatads.com` заменен на `https://z.moatads.com`

Кроме того, ознакомьтесь с возможностью применения [паттерна Intersection observer](https://github.com/ampproject/amphtml/blob/master/ads/README.md#ad-viewability).

## Платформа рекомендации контента <a name="content-recommendation-platform"></a>

*Examples : Taboola, Outbrain*

Как правило, работа платформ рекомендаций контента осуществляется через встроенный блок JavaScript на сайте издателя, однако такой подход не будет работать на AMP-страницах. Чтобы рекомендовать контент на AMP-страницах, советуем использовать [расширение `amp-embed`](https://amp.dev/documentation/components/amp-ad) для запроса сведений о контенте (см. пример [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md)).

---
$title: amp-ad
$category@: ads-analytics
teaser:
  text: Контейнер для показа объявлений
---



Контейнер для показа объявлений. `amp-embed` – это псевдоним тега `amp-ad`. У них идентичный функционал, но разные названия. Используйте название `amp-embed`, когда оно больше подходит с точки зрения семантики. В документах AMP теги amp-ad и amp-embed поддерживаются только в рамках протокола HTTPS.

# <a name="amp-ad"></a> amp-ad / amp-embed


[tip type="note"]
Спецификации `amp-ad` и `amp-embed` могут значительно измениться со временем. Текущий подход нацелен на то, чтобы формат AMP обеспечивал показ объявлений.
[/tip]

<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<table>
  <tr>
    <td class="col-fourty"><strong>Описание</strong></td>
    <td>Контейнер для показа объявлений. <code>amp-embed</code> – это псевдоним тега <code>amp-ad</code>. У них идентичный функционал, но разные названия. Используйте название <code>amp-embed</code>, когда оно больше подходит с точки зрения семантики. В документах AMP теги amp-ad и amp-embed поддерживаются только в рамках протокола HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">&lt;/script></code><br>Примечание: элемент amp-ad может работать без этого скрипта, но мы настоятельно рекомендуем использовать его для последующей совместимости.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-ad/">Пример amp-ad</a> на сайте AMP By Example.</td>
  </tr>
</table>

## Поведение <a name="behavior"></a>

Объявления загружаются подобно остальным ресурсам в документах AMP, но в них есть специальный элемент `<amp-ad>`. Код JavScript, предоставляемый рекламными сетями, запрещено обрабатывать непосредственно в документах AMP, поэтому среда выполнения AMP загружает iframe из другого источника в тестовую среду iframe и выполняет код JavaScript рекламной сети в этой среде.

В элементе `<amp-ad>` ширина и высота должны указываться в соответствии с [правилом](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors) используемого типа компоновки. Для этого требуется аргумент `type`, который определяет, какая рекламная сеть будет показываться. Все атрибуты `data-*` в теге автоматически передаются в код, который в конечном итоге показывает объявление. Какие атрибуты `data-*` обязательны для того или иного типа сети, определяется требованиями рекламной сети, которые должны быть задокументированы.

#### Пример: показ нескольких объявлений <a name="example-displaying-a-few-ads"></a>

[example preview="inline" playground="true" imports="amp-ad"]
```html
<amp-ad type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
    width="300"
    height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  </amp-ad>
  <amp-ad width="300"
    height="250"
    type="industrybrains"
    data-width="300"
    data-height="250"
    data-cid="19626-3798936394">
  </amp-ad>
  <amp-embed type="taboola"
    width="400"
    height="300"
    layout="responsive"
    data-publisher="amp-demo"
    data-mode="thumbnails-a"
    data-placement="Ads Example"
    data-article="auto">
  </amp-embed>
```
[/example]

## Атрибуты <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (обязательно)</strong></td>
    <td>Указывает идентификатор <a href="#supported-ad-networks">рекламной сети</a>. Атрибут <code>type</code> определяет шаблон, используемый для тега объявления.</td>
  </tr>
  <tr>
    <td width="40%"><strong>src (необязательно)</strong></td>
    <td>Используйте этот атрибут, чтобы загрузить тег "script" для указанной рекламной сети. Может использоваться для рекламных сетей, в которых на странице используется единственный тег "script". Значение <code>src</code> должно иметь префикс, занесенный в белый список для указанной рекламной сети, а также должно использовать протокол <code>https</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>Для большинства рекламных сетей требуются дополнительные параметры конфигурации, которые можно передать в сеть с помощью HTML-атрибутов <code>data-</code>. При этом дефисы из имен параметров удаляются и используется "верблюжья" нотация. Например, параметр data-foo-bar передается как fooBar. <a href="#supported-ad-networks">Подробнее…</a></td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td>Атрибуты, начинающиеся с <code>data-vars-</code>, зарезервированы для <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute">переменных <code>amp-analytics</code></a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (необязательно)</strong></td>
    <td>Используйте этот атрибут, чтобы передавать в объявление параметры конфигурации через объект JSON любой сложности. Объект передается в объявление в исходном виде без декорирования имен.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (необязательно)</strong></td>
    <td>Если этот атрибут указан, то нужно подтверждать атрибут <a href="amp-user-notification.md">amp-user-notification</a> с помощью идентификатора HTML, пока идентификатор клиента AMP пользователя (он аналогичен файлу cookie) не будет передан в объявление. Это означает, что отображение объявления будет отложено, пока пользователь не даст подтверждение.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy (необязательно)</strong></td>
    <td>Загружает объявление, когда оно находится на определенном расстоянии (исчисляется в количестве экранов) от текущей зоны видимости. Если атрибут <code>data-loading-strategy</code> отсутствует, то значение по умолчанию равно 3. Вы можете указать значение с плавающей запятой в диапазоне [0, 3]. Если оно не указано, значение будет равно 1,25). При меньших значениях повышается видимость (т. е. вероятность того, что загруженное объявление увидит пользователь), но может снизиться количество показов (т. е. загружается меньше объявлений). Если этот атрибут указан, но его значение не задано, система присвоит ему значение с плавающей запятой, которое позволит оптимизировать видимость без особого снижения числа показов. Если в качестве значения указано <code>prefer-viewability-over-views</code>, автоматически будет выполняться оптимизация по видимости.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id (необязательно)</strong></td>
    <td>Сообщает идентификатор компонента контейнера объявления в случае попытки свернуть свертывания. Компонентом контейнера должен выступать родительский компонент <code>&lt;amp-layout&gt;</code> объявления. Если атрибут <code>data-ad-container-id</code> указан и такой компонент контейнера <code>&lt;amp-layout&gt;</code> обнаружен, библиотека AMP попытается во время заполнения свернуть компонент контейнера, а не объявления. Эта функция может пригодиться, когда в коде есть индикатор объявления.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>Этот элемент содержит <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">распространенные атрибуты</a>, расширенные до компонентов AMP.</td>
  </tr>
</table>

## Тег <a name="placeholder"></a>

Элемент `amp-ad` может поддерживать дочерний элемент с атрибутом `placeholder`. Если такая возможность предусмотрена в рекламной сети, этот элемент показывается до тех пор, пока объявление доступно для просмотра. Подробные сведения о заполнителях и резервных атрибутах можно найти в [этой статье](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Нет доступных объявлений <a name="no-ad-available"></a>

Если для рекламного места нет доступных объявлений, AMP пытается свернуть элемент `amp-ad` (`display: none`). AMP определяет, можно ли выполнить эту операцию, не меняя позицию прокрутки, выбранную пользователем. Если объявление находится в зоне видимости, оно не будет свернуто, потому что это изменит позицию прокрутки; в противном же случае оно будет свернуто.

Что происходит, если свернуть объявление не удалось? Компонент `amp-ad` поддерживает дочерний элемент с атрибутом `fallback`. Если такой резервный элемент настроен, он будет показан. В противном случае AMP покажет резервный элемент, используемый по умолчанию.

Пример:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Показ видеорекламы <a name="serving-video-ads"></a>

Есть 3 способа монетизации роликов в AMP с помощью видеорекламы

1. В AMP встроена поддержка некоторых видеопроигрывателей (таких, как BrightCove, DailyMotion и др.), с помощью которых можно монетизировать объявления. Полный список можно найти [здесь](../../../documentation/components/index.html#media).

1. Используйте компонент [amp-ima-video](amp-ima-video.md), который доступен с со встроенным видеопроигрывателем IMA SDK и HTML5.
1. Если вы используете видеопроигрыватель, который не поддерживается в AMP, вы можете показывать его с помощью [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
При этом следует соблюдать следующие требования:``

    * при загрузке видеопроигрывателя в первую область просмотра следует использовать статическое изображение, созданное на основе видео ([подробнее…](amp-iframe.md#iframe-with-placeholder));
    * видео и изображение нужно размещать на серверах HTTPS.</li>

## Показ объявлений из пользовательского домена <a name="running-ads-from-a-custom-domain"></a>

AMP поддерживает загрузку bootstrap iframe, которая используется для показа объявлений из пользовательского домена (например, из вашего).

Чтобы включить эту функцию, скопируйте файл [remote.html](https://github.com/ampproject/amphtml/blob/master/3p/remote.html) в свой веб-сервер, а затем добавьте в свои файлы AMP следующий метатег:

```html
<meta name="amp-3p-iframe-src" content="https://assets.vash-domen.com/path/to/remote.html">
```

  Атрибут `content` метатега – это абсолютный URL вашей копии файла remote.html, размещенного на вашем веб-сервере. В этом URL должна использоваться схема HTTPS. Он не может находиться там же, где находятся ваши файлы AMP. Например, если ваши AMP-файлы размещены на `www.example.com`, то этот URL должен отличаться от `www.example.com` (например, это может быть `xxx.example.com`). [Подробнее…](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)

### Защита <a name="security"></a>

**Подтвердите входящие данные**, прежде чем передавать их в функцию `draw3p`, чтобы обеспечить корректную работу тега iframe. Это, в частности, касается рекламных сетей, в которых разрешено пользовательское внедрение JavaScript.

В случае с тегами iframe также следует убедиться, что они встраиваются только в совместимые источники, к числу которых относятся:

* ваши собственные источники;
* `https://cdn.ampproject.org` для кеша AMP.

В случае кеша AMP вам также нужно убедиться, что оригинал источника (т. е. документа, отправляемого сервером cdn.ampproject.org) относится к вашим источникам.

Применение оригиналов может быть обеспечено с помощью 3-го аргумента функции `draw3p` и должно быть дополнительно обеспечено с помощью директивы [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) для поддержки на уровне браузера.

### Улучшение входящей конфигурации объявления <a name="enhance-incoming-ad-configuration"></a>

Иногда возникает необходимость улучшить запрос объявления перед отправкой его на сервер объявлений (необязательно).

Если в вашей рекламной сети поддерживается [Fast Fetch (быстрый запрос)](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad), используйте [Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (RTC). Например Fast Fetch и RTC поддерживаются в интеграциях DoubleClick и AdSense.

Если в рекламной сети используются стандартные запросы, вы можете передать обратный вызов в вызов функции `draw3p` в файле [remote.html](https://github.com/ampproject/amphtml/blob/master/3p/remote.html). Обратный вызов получает входящую конфигурацию в первом аргументе, а затем получает ещё один обратный вызов во втором аргументе (`done` в примере ниже). Этот обратный вызов должен вызываться с обновленным параметром "config", чтобы отображение объявления не прерывалось.

Пример:

```JS
draw3p(function(config, done) {
  config.targeting = Math.random() > 0.5 ? 'sport' : 'fashion';
  //Здесь не нужно вызывать setTimeout: Это используется как пример,
  //который показывает, что обратный вызов done в асинхронном режиме допускается.
  setTimeout(function() {
    done(config);
  }, 100)
}, ['razreshenny-tip-obyavleniya'], ['vash-domen.com']);
```

## Поддержка стилей <a name="styling"></a>

Элементы `<amp-ad>` можно не добавлять в контейнеры, в которых задан параметр CSS `position: fixed` (за исключением `amp-lightbox`).
Это связано с удобством использования при показе оверлеев на всю страницу. В будущем, возможно, будут разрешены подобные форматы объявлений внутри управляемых контейнеров AMP, в которых используются определенные инварианты пользовательского интерфейса.

## Проверка <a name="validation"></a>

С [правилами для компонента amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) можно ознакомиться в спецификации валидатора AMP.

## Поддерживаемые рекламные сети <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/master/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/master/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/master/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/master/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/master/ads/adform.md)
* [Adfox](https://github.com/ampproject/amphtml/blob/master/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/master/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/master/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/master/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/master/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/master/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/master/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/master/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/master/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/master/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/master/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/master/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/master/ads/adreactor.md)
* [AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/master/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/master/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/master/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/master/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/master/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/master/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/master/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/master/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/master/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/master/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/master/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/master/ads/adverticum.md)
* [AdvertServe](https://github.com/ampproject/amphtml/blob/master/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/master/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/master/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/master/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/master/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/master/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/master/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/master/ads/atomx.md)
* [Baidu](https://github.com/ampproject/amphtml/blob/master/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/master/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/master/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/master/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/master/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/master/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/master/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/master/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/master/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/master/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/master/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/master/ads/google/csa.md)
* [CxenseDisplay](https://github.com/ampproject/amphtml/blob/master/ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/master/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/master/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/master/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/master/ads/dotandads.md)
* [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/master/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/master/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/master/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/master/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/master/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/master/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/master/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/master/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/master/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/master/ads/freewheel.md)
* [Fusion](https://github.com/ampproject/amphtml/blob/master/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/master/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/master/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/master/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/master/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/master/ads/holder.md)
* [I-Mobile](https://github.com/ampproject/amphtml/blob/master/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/master/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/master/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/master/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/master/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/master/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/master/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/master/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/master/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/master/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/master/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/master/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/master/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/master/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/master/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/master/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/master/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/master/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/master/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/master/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/master/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/master/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/master/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/master/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/master/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/master/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/master/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/master/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/master/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/master/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/master/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/master/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/master/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/master/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/master/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/master/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/master/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/master/ads/onnetwork.md)
* [Open AdStream (OAS)](https://github.com/ampproject/amphtml/blob/master/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/master/ads/openx.md)
* [Pixels](https://github.com/ampproject/amphtml/blob/master/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/master/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/master/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/master/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/master/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/master/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/master/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/master/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/master/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/master/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/master/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/master/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/master/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/master/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/master/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/master/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/master/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/master/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/master/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/master/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/master/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/master/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/master/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/master/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/master/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/master/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/master/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/master/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/master/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/master/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/master/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/master/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/master/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/master/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/master/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/master/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/master/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/master/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/master/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/master/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/master/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/master/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/master/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/master/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/master/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/master/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/master/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/master/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/master/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/master/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/master/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/master/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/master/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/master/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/master/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/master/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/master/ads/yahoojp.md)
* [Яндекс](https://github.com/ampproject/amphtml/blob/master/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/master/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/master/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/master/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/master/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/master/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/master/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/master/ads/zucks.md)

## Поддерживаемые типы встраивания <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/master/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/master/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/master/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/master/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/master/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/master/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/master/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/master/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/master/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/master/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/master/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/master/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/master/ads/zergnet.md)
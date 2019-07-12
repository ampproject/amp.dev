---
$category@: ads-analytics
formats:
- websites
teaser:
  text: Контейнер для показа объявлений
---

# amp-ad / amp-embed

Контейнер для показа объявлений. `amp-embed` – это псевдоним тега `amp-ad`. У них идентичный функционал, но разные названия. Используйте название `amp-embed`, когда оно больше подходит с точки зрения семантики. В документах AMP теги amp-ad и amp-embed поддерживаются только в рамках протокола HTTPS.

# `amp-ad` / `amp-embed`


[tip type="note"]
Спецификации `amp-ad` и `amp-embed` могут значительно измениться со временем. Текущий подход нацелен на то, чтобы формат AMP обеспечивал показ объявлений.
[/tip]

<!---
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
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Поддерживаемые макеты</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-ad/">Пример amp-ad</a> на сайте AMP By Example.</td>
  </tr>
</table>

## Поведение

Объявления загружаются подобно остальным ресурсам в документах AMP, но в них есть специальный элемент `<amp-ad>`. Код JavScript, предоставляемый рекламными сетями, запрещено обрабатывать непосредственно в документах AMP, поэтому среда выполнения AMP загружает iframe из другого источника в тестовую среду iframe и выполняет код JavaScript рекламной сети в этой среде.

В элементе `<amp-ad>` ширина и высота должны указываться в соответствии с [правилом](https://www.ampproject.org/docs/design/amp-html-layout#%28tl;dr%29-summary-of-layout-requirements-&amp;-behaviors) используемого типа компоновки. Для этого требуется аргумент `type`, который определяет, какая рекламная сеть будет показываться. Все атрибуты `data-*` в теге автоматически передаются в код, который в конечном итоге показывает объявление. Какие атрибуты `data-*` обязательны для того или иного типа сети, определяется требованиями рекламной сети, которые должны быть задокументированы.

#### Пример: показ нескольких объявлений

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="522" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampad.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Ещё" overflow="" tabindex="0" role="button">Показать код полностью</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

## Атрибуты

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
    <td>Если этот атрибут указан, то нужно подтверждать атрибут <a href="https://www.ampproject.org/docs/reference/components/amp-user-notification.html">amp-user-notification</a> с помощью идентификатора HTML, пока идентификатор клиента AMP пользователя (он аналогичен файлу cookie) не будет передан в объявление. Это означает, что отображение объявления будет отложено, пока пользователь не даст подтверждение.</td>
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
    <td>Этот элемент содержит <a href="https://www.ampproject.org/docs/reference/common_attributes">распространенные атрибуты</a>, расширенные до компонентов AMP.</td>
  </tr>
</table>

## Тег

Элемент `amp-ad` может поддерживать дочерний элемент с атрибутом `placeholder`. Если такая возможность предусмотрена в рекламной сети, этот элемент показывается до тех пор, пока объявление доступно для просмотра. Подробные сведения о заполнителях и резервных атрибутах можно найти в [этой статье](https://www.ampproject.org/docs/guides/responsive/placeholders).

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Нет доступных объявлений

Если для рекламного места нет доступных объявлений, AMP пытается свернуть элемент `amp-ad` (`display: none`). AMP определяет, можно ли выполнить эту операцию, не меняя позицию прокрутки, выбранную пользователем. Если объявление находится в зоне видимости, оно не будет свернуто, потому что это изменит позицию прокрутки; в противном же случае оно будет свернуто.

Что происходит, если свернуть объявление не удалось? Компонент `amp-ad` поддерживает дочерний элемент с атрибутом `fallback`. Если такой резервный элемент настроен, он будет показан. В противном случае AMP покажет резервный элемент, используемый по умолчанию.

Пример:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Показ видеорекламы

Есть 3 способа монетизации роликов в AMP с помощью видеорекламы

1. В AMP встроена поддержка некоторых видеопроигрывателей (таких, как BrightCove, DailyMotion и др.), с помощью которых можно монетизировать объявления. Полный список можно найти [здесь](https://www.ampproject.org/docs/reference/components#media).

1. Используйте компонент [amp-ima-video](https://www.ampproject.org/docs/reference/components/amp-ima-video.html), который доступен с со встроенным видеопроигрывателем IMA SDK и HTML5.
1. Если вы используете видеопроигрыватель, который не поддерживается в AMP, вы можете показывать его с помощью [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
При этом следует соблюдать следующие требования:``

    * при загрузке видеопроигрывателя в первую область просмотра следует использовать статическое изображение, созданное на основе видео ([подробнее…](https://www.ampproject.org/docs/reference/components/amp-iframe#iframe-with-placeholder));
    * видео и изображение нужно размещать на серверах HTTPS.</li>

## Показ объявлений из пользовательского домена

AMP поддерживает загрузку bootstrap iframe, которая используется для показа объявлений из пользовательского домена (например, из вашего).

Чтобы включить эту функцию, скопируйте файл [remote.html](../../3p/remote.html) в свой веб-сервер, а затем добавьте в свои файлы AMP следующий метатег:

```html
<meta name="amp-3p-iframe-src" content="https://assets.vash-domen.com/path/to/remote.html">
```

  Атрибут `content` метатега – это абсолютный URL вашей копии файла remote.html, размещенного на вашем веб-сервере. В этом URL должна использоваться схема HTTPS. Он не может находиться там же, где находятся ваши файлы AMP. Например, если ваши AMP-файлы размещены на `www.example.com`, то этот URL должен отличаться от `www.example.com` (например, это может быть `xxx.example.com`). [Подробнее…](../../spec/amp-iframe-origin-policy.md)

### Защита

**Подтвердите входящие данные**, прежде чем передавать их в функцию `draw3p`, чтобы обеспечить корректную работу тега iframe. Это, в частности, касается рекламных сетей, в которых разрешено пользовательское внедрение JavaScript.

В случае с тегами iframe также следует убедиться, что они встраиваются только в совместимые источники, к числу которых относятся:

* ваши собственные источники;
* `https://cdn.ampproject.org` для кеша AMP.

В случае кеша AMP вам также нужно убедиться, что оригинал источника (т. е. документа, отправляемого сервером cdn.ampproject.org) относится к вашим источникам.

Применение оригиналов может быть обеспечено с помощью 3-го аргумента функции `draw3p` и должно быть дополнительно обеспечено с помощью директивы [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) для поддержки на уровне браузера.

### Улучшение входящей конфигурации объявления

Иногда возникает необходимость улучшить запрос объявления перед отправкой его на сервер объявлений (необязательно).

Если в вашей рекламной сети поддерживается [Fast Fetch (быстрый запрос)](https://www.ampproject.org/docs/ads/adnetwork_integration#creating-an-amp-ad-implementation), используйте [Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (RTC). Например Fast Fetch и RTC поддерживаются в интеграциях DoubleClick и AdSense.

Если в рекламной сети используются стандартные запросы, вы можете передать обратный вызов в вызов функции `draw3p` в файле [remote.html](../../3p/remote.html). Обратный вызов получает входящую конфигурацию в первом аргументе, а затем получает ещё один обратный вызов во втором аргументе (`done` в примере ниже). Этот обратный вызов должен вызываться с обновленным параметром "config", чтобы отображение объявления не прерывалось.

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

## Поддержка стилей

Элементы `<amp-ad>` можно не добавлять в контейнеры, в которых задан параметр CSS `position: fixed` (за исключением `amp-lightbox`).
Это связано с удобством использования при показе оверлеев на всю страницу. В будущем, возможно, будут разрешены подобные форматы объявлений внутри управляемых контейнеров AMP, в которых используются определенные инварианты пользовательского интерфейса.

## Проверка

С [правилами для компонента amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) можно ознакомиться в спецификации валидатора AMP.

## Поддерживаемые рекламные сети

* [A8](../../ads/a8.md)
* [A9](../../ads/a9.md)
* [AccessTrade](../../ads/accesstrade.md)
* [Adblade](../../ads/adblade.md)
* [AdButler](../../ads/adbutler.md)
* [Adform](../../ads/adform.md)
* [Adfox](../../ads/adfox.md)
* [Ad Generation](../../ads/adgeneration.md)
* [Adhese](../../ads/adhese.md)
* [Adincube](../../ads/adincube.md)
* [ADITION](../../ads/adition.md)
* [Adman](../../ads/adman.md)
* [AdmanMedia](../../ads/admanmedia.md)
* [Admixer](../../ads/admixer.md)
* [AdOcean](../../ads/adocean.md)
* [AdPicker](../../ads/adpicker.md)
* [AdPlugg](../../ads/adplugg.md)
* [Adpon](../../ads/adpon.md)
* [AdReactor](../../ads/adreactor.md)
* [AdSense](../../ads/google/adsense.md)
* [AdSensor](../../ads/adsensor.md)
* [AdsNative](../../ads/adsnative.md)
* [AdSpeed](../../ads/adspeed.md)
* [AdSpirit](../../ads/adspirit.md)
* [AdStir](../../ads/adstir.md)
* [AdTech](../../ads/adtech.md)
* [AdThrive](../../ads/adthrive.md)
* [AdUnity](../../ads/adunity.md)
* [Ad Up Technology](../../ads/aduptech.md)
* [Adventive](../../ads/adventive.md)
* [Adverline](../../ads/adverline.md)
* [Adverticum](../../ads/adverticum.md)
* [AdvertServe](../../ads/advertserve.md)
* [Adyoulike](../../ads/adyoulike.md)
* [Affiliate-B](../../ads/affiliateb.md)
* [AMoAd](../../ads/amoad.md)
* [AppNexus](../../ads/appnexus.md)
* [AppVador](../../ads/appvador.md)
* [Atomx](../../ads/atomx.md)
* [Baidu](../../ads/baidu.md)
* [BeOpinion](../amp-beopinion/amp-beopinion.md)
* [Bidtellect](../../ads/bidtellect.md)
* [brainy](../../ads/brainy.md)
* [Broadstreet Ads](../../ads/broadstreetads.md)
* [CA A.J.A. Infeed](../../ads/caajainfeed.md)
* [CA-ProFit-X](../../ads/caprofitx.md)
* [Cedato](../../ads/cedato.md)
* [Chargeads](../../ads/chargeads.md)
* [Colombia](../../ads/colombia.md)
* [Connatix](../../ads/connatix.md)
* [Content.ad](../../ads/contentad.md)
* [Criteo](../../ads/criteo.md)
* [CSA](../../ads/google/csa.md)
* [CxenseDisplay](../../ads/eas.md)
* [Dianomi](../../ads/dianomi.md)
* [Directadvert](../../ads/directadvert.md)
* [DistroScale](../../ads/distroscale.md)
* [Dot and Media](../../ads/dotandads.md)
* [DoubleClick](../../ads/google/doubleclick.md)
* [eADV](../../ads/eadv.md)
* [E-Planning](../../ads/eplanning.md)
* [Ezoic](../../ads/ezoic.md)
* [Felmat](../../ads/felmat.md)
* [FlexOneELEPHANT](../../ads/f1e.md)
* [FlexOneHARRIER](../../ads/f1h.md)
* [Flite](../../ads/flite.md)
* [fluct](../../ads/fluct.md)
* [FreeWheel](../../ads/freewheel.md)
* [Fusion](../../ads/fusion.md)
* [GenieeSSP](../../ads/genieessp.md)
* [Giraff](../../ads/giraff.md)
* [GMOSSP](../../ads/gmossp.md)
* [GumGum](../../ads/gumgum.md)
* [Holder](../../ads/holder.md)
* [I-Mobile](../../ads/imobile.md)
* [Imonomy](../../ads/imonomy.md)
* [iBillboard](../../ads/ibillboard.md)
* [Imedia](../../ads/imedia.md)
* [Improve Digital](../../ads/improvedigital.md)
* [Index Exchange](../../ads/ix.md)
* [Industrybrains](../../ads/industrybrains.md)
* [InMobi](../../ads/inmobi.md)
* [Innity](../../ads/innity.md)
* [Kargo](../../ads/kargo.md)
* [Kiosked](../../ads/kiosked.md)
* [Kixer](../../ads/kixer.md)
* [Kuadio](../../ads/kuadio.md)
* [Ligatus](../../ads/ligatus.md)
* [LockerDome](../../ads/lockerdome.md)
* [LOKA](../../ads/loka.md)
* [MADS](../../ads/mads.md)
* [MANTIS](../../ads/mantis.md)
* [Media.net](../../ads/medianet.md)
* [MediaImpact](../../ads/mediaimpact.md)
* [Mediavine](../../ads/mediavine.md)
* [Medyanet](../../ads/medyanet.md)
* [Meg](../../ads/meg.md)
* [MicroAd](../../ads/microad.md)
* [MixiMedia](../../ads/miximedia.md)
* [Mixpo](../../ads/mixpo.md)
* [Monetizer101](../../ads/monetizer101.md)
* [mox](../../ads/mox.md)
* [myTarget](../../ads/mytarget.md)
* [myWidget](../../ads/mywidget.md)
* [Nativo](../../ads/nativo.md)
* [Navegg](../../ads/navegg.md)
* [Nend](../../ads/nend.md)
* [NETLETIX](../../ads/netletix.md)
* [Noddus](../../ads/noddus.md)
* [Nokta](../../ads/nokta.md)
* [OneAD](../../ads/onead.md)
* [OnNetwork](../../ads/onnetwork.md)
* [Open AdStream (OAS)](../../ads/openadstream.md)
* [OpenX](../../ads/openx.md)
* [Pixels](../../ads/pixels.md)
* [plista](../../ads/plista.md)
* [polymorphicAds](../../ads/polymorphicads.md)
* [popin](../../ads/popin.md)
* [Pressboard](../../ads/pressboard.md)
* [PromoteIQ](../../ads/promoteiq.md)
* [PubGuru](../../ads/pubguru.md)
* [PubMatic](../../ads/pubmatic.md)
* [Pubmine](../../ads/pubmine.md)
* [PulsePoint](../../ads/pulsepoint.md)
* [Purch](../../ads/purch.md)
* [Rambler&amp;Co](../../ads/capirs.md)
* [RbInfoxSg](../../ads/rbinfox.md)
* [Realclick](../../ads/realclick.md)
* [recomAD](../../ads/recomad.md)
* [Red for Publishers](../../ads/rfp.md)
* [Relap](../../ads/relap.md)
* [Revcontent](../../ads/revcontent.md)
* [RevJet](../../ads/revjet.md)
* [Rubicon Project](../../ads/rubicon.md)
* [RUNative](../../ads/runative.md)
* [SAS CI 360 Match](../../ads/sas.md)
* [Sekindo](../../ads/sekindo.md)
* [Sharethrough](../../ads/sharethrough.md)
* [Sklik](../../ads/sklik.md)
* [SlimCut Media](../../ads/slimcutmedia.md)
* [Smart AdServer](../../ads/smartadserver.md)
* [smartclip](../../ads/smartclip.md)
* [sogou Ad](../../ads/sogouad.md)
* [Sortable](../../ads/sortable.md)
* [SOVRN](../../ads/sovrn.md)
* [Speakol](../../ads/speakol.md)
* [SpotX](../../ads/spotx.md)
* [SunMedia](../../ads/sunmedia.md)
* [Swoop](../../ads/swoop.md)
* [TcsEmotion](../../ads/tcsemotion.md)
* [Teads](../../ads/teads.md)
* [torimochi](../../ads/torimochi.md)
* [TripleLift](../../ads/triplelift.md)
* [Trugaze](../../ads/trugaze.md)
* [UZOU](../../ads/uzou.md)
* [ValueCommerce](../../ads/valuecommerce.md)
* [video intelligence](../../ads/videointelligence.md)
* [Videonow](../../ads/videonow.md)
* [Viralize](../../ads/viralize.md)
* [UAS](../../ads/uas.md)
* [ucfunnel](../../ads/ucfunnel.md)
* [Unruly](../../ads/unruly.md)
* [VMFive](../../ads/vmfive.md)
* [Webediads](../../ads/webediads.md)
* [Weborama](../../ads/weborama.md)
* [Widespace](../../ads/widespace.md)
* [Wisteria](../../ads/wisteria.md)
* [WPMedia](../../ads/wpmedia.md)
* [Xlift](../../ads/xlift.md)
* [Yahoo](../../ads/yahoo.md)
* [YahooJP](../../ads/yahoojp.md)
* [Яндекс](../../ads/yandex.md)
* [Yengo](../../ads/yengo.md)
* [Yieldbot](../../ads/yieldbot.md)
* [Yieldmo](../../ads/yieldmo.md)
* [Yieldone](../../ads/yieldone.md)
* [Yieldpro](../../ads/yieldpro.md)
* [Zedo](../../ads/zedo.md)
* [Zucks](../../ads/zucks.md)

## Поддерживаемые типы встраивания

* [24smi](../../ads/24smi.md)
* [AJA](../../ads/aja.md)
* [Bringhub](../../ads/bringhub.md)
* [Dable](../../ads/dable.md)
* [Engageya](../../ads/engageya.md)
* [Epeex](../../ads/epeex.md)
* [Jubna](../../ads/jubna.md)
* [Outbrain](../../ads/outbrain.md)
* [Postquare](../../ads/postquare.md)
* [PubExchange](../../ads/pubexchange.md)
* [Smi2](../../ads/smi2.md)
* [Taboola](../../ads/taboola.md)
* [Zen](../../ads/zen.md)
* [ZergNet](../../ads/zergnet.md)

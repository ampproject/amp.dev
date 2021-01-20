---
"$title": Поставщики аналитики
order: '3'
formats:
- websites
- stories
- ads
teaser:
  text: В этом документе перечислены поставщики аналитики, предоставляющие встроенные конфигурации для использования с компонентом amp-analytics.
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vendors-list.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

В этом документе перечислены поставщики аналитики, предоставляющие встроенные конфигурации для работы с компонентом [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics/).

Поставщики, желающие интегрировать свои услуги с [`<amp-analytics>`](https://amp.dev/documentation/components/amp-analytics/), должны ознакомиться со сведениями в разделе [Интеграция ваших аналитических инструментов с AMP](https://amp.dev/documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools).

### Acquia Lift <a name="acquia-lift"></a>

Значение атрибута типа: `acquialift`

Добавляет поддержку Acquia Lift. Должны быть указаны переменные `decisionApiUrl`, `accountId` и `siteId`. Более подробную информацию об Acquia Lift можно найти по адресу [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics <a name="adobe-analytics"></a>

Значение атрибута типа: `adobeanalytics`

Добавляет поддержку Adobe Analytics. Более подробную информацию о добавлении поддержки Adobe Analytics можно найти на сайте [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics <a name="afs-analytics"></a>

Значение атрибута типа: `afsanalytics`

Добавляет поддержку AFS Analytics. Должны быть указаны дополнительные переменные `websiteid` и `server`. Дополнительные сведения о добавлении поддержки AFS Analytics можно найти на сайте [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### Alexa Internet <a name="alexa-internet"></a>

Значение атрибута типа: `alexametrics`

Добавляет поддержку Alexa Certified Site Metrics. Должны быть указаны переменные `atrk_acct` и `domain`. Дополнительную информацию можно найти на странице [Certified Metrics FAQ](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics) на сайте Alexa.

### Amplitude <a name="amplitude"></a>

Значение атрибута типа: `amplitude`

### AT Internet <a name="at-internet"></a>

Значение атрибута типа: `atinternet`

Добавляет поддержку AT Internet. Более подробную информацию о добавлении поддержки AT Internet можно найти на сайте [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics <a name="baidu-analytics"></a>

Значение атрибута типа: `baiduanalytics`

Добавляет поддержку Baidu Analytics. Более подробную информацию о добавлении поддержки Baidu Analytics можно найти на сайте [tangji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### BlueConic <a name="blueconic"></a>

Значение атрибута типа: `blueconic`

### Browsi <a name="browsi"></a>

Значение атрибута типа: `browsi`

### Burt <a name="burt"></a>

Значение атрибута типа: `burt`

Добавляет поддержку Burt. Кроме того, должна быть указана переменная `trackingKey`. Также можно указать дополнительные переменные `category` и `subCategory`. Более подробную информацию можно найти на сайте [burtcorp.com](http://burtcorp.com).

### BySide <a name="byside"></a>

Значение атрибута типа: `byside`

### Captain Metrics <a name="captain-metrics"></a>

Значение атрибута типа: `captainmetrics`

### Chartbeat <a name="chartbeat"></a>

Значение атрибута типа: `chartbeat`

Добавляет поддержку Chartbeat. Более подробную информацию о добавлении поддержки Chartbeat можно найти на сайте [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics <a name="clicky-web-analytics"></a>

Значение атрибута типа: `clicky`

Добавляет поддержку Clicky Web Analytics. Более подробную информацию о добавлении поддержки Clicky можно найти на сайте [clicky.com](https://clicky.com/help/apps-plugins).

### comScore <a name="comscore"></a>

Значение атрибута типа: `comscore`

Добавляет поддержку аналитики просмотров страниц comScore Unified Digital Measurement™. Требуется определить переменную *var* `c2` с указанием предоставленного comScore значения *c2 id*. Подробную информацию можно получить на сайте [comscore.com](http://www.comscore.com).

### Cxense <a name="cxense"></a>

Значение атрибута типа: `cxense`

Добавляет поддержку аналитики Cxense Insight. Требуется определение *var* `siteId` с указанием предоставленного *Cxense* значения siteId. Более подробную информацию можно найти на сайте [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Deep.BI <a name="deepbi"></a>

Значение атрибута типа: `deepbi`

### Dynatrace <a name="dynatrace"></a>

Значение атрибута типа: `dynatrace`

Добавляет поддержку реального мониторинга пользователей в Dynatrace. Используя данные, полученные от Dynatrace, необходимо указать *var* `app` со значением *application id* и *var* `tenant` со значением *environment id*. Более подробную информацию о добавлении мониторинга реальных пользователей Dynatrace можно найти на сайте [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### EPICA <a name="epica"></a>

Значение атрибута типа: `epica`

Добавляет поддержку регистрации просмотров страниц и событий в EPICA. Более подробную информацию можно найти в [документации EPICA](https://www.epica.ai).

### Eulerian Analytics <a name="eulerian-analytics"></a>

Значение атрибута типа: `euleriananalytics`

Добавляет поддержку Eulerian Technologies Analytics. Требуется определить *var* `analyticsHost`, указав домен, делегированный Eulerian. Более подробную информацию можно найти на сайте [eulerian.wiki](https://eulerian.wiki).

### Пиксель Facebook <a name="facebook-pixel"></a>

Значение атрибута типа: `facebookpixel`

Добавляет поддержку [пикселя Facebook](https://www.facebook.com/business/a/facebook-pixel). В вашей конфигурации [`amp-analytics`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./amp-analytics.md) следует указать идентификатор пикселя как `pixelId: ВАШ-ID-ПИКСЕЛЯ`. Поддерживаемые события вместе с соответствующими значениями событий можно указать в соответствии с [документацией пикселя Facebook для разработчиков](https://developers.facebook.com/docs/ads-for-websites/pixel-events).

### Gemius <a name="gemius"></a>

Значение атрибута типа: `gemius`

Добавляет поддержку аналитики Gemius Audience/Prism. Кроме того, необходимо указать полученные от gemius переменные `prefix` и `identifier`. Также можно указать необязательную переменную `extraparams` (ключ1=значение1|ключ2=значение2). Более подробную информацию можно найти на сайте [gemius.com](https://www.gemius.com).

### GfK Sensic <a name="gfk-sensic"></a>

Значение атрибута типа: `gfksensic`

Добавляет поддержку аналитики использования аудиопотока GfK Sensic. Для получения подробной информации обратитесь к нашей [клиентской документации](https://confluence-docu.gfk.com/display/SENSIC/AMP+Integration).

### Google Реклама <a name="google-ads"></a>

Значение атрибута типа: `googleadwords`

Добавляет поддержку отслеживания конверсий и ремаркетинга в Google Рекламе. Дополнительная информация об [отслеживании конверсий](https://support.google.com/adwords/answer/1722054?hl=en) и [ремаркетинге](https://support.google.com/adwords/answer/2453998?hl=en) приведена в Справочном центре Google Рекламы. Теги можно использовать независимо друг от друга.

### Google Analytics <a name="google-analytics"></a>

Значение атрибута типа: `googleanalytics`

Добавляет поддержку Google Analytics. Более подробную информацию о добавлении поддержки Google Analytics можно найти на сайте [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Диспетчер тегов Google <a name="google-tag-manager"></a>

Значение атрибута типа: Н/Д

В отличие от других поставщиков аналитики, Диспетчер тегов Google — это служба управления тегами, для которой не требуется атрибут `type`. Диспетчер тегов Google [поддерживается](https://developers.google.com/google-ads/amp/landing-pages#google_tag_manager) в AMP. Обратитесь к документации Диспетчера тегов Google, чтобы узнать о [поддерживаемых тегах](https://support.google.com/tagmanager/answer/6106924) и получить инструкции по [добавлению Диспетчера тегов Google на вашу AMP-страницу](https://support.google.com/tagmanager/answer/6103696).

### Ibeat Analytics <a name="ibeat-analytics"></a>

Значение атрибута типа: `ibeatanalytics`

Добавляет поддержку Ibeat Analytics. Более подробную информацию о добавлении поддержки Ibeat можно найти на [сайте Ibeat в разделе интеграции](https://ibeat.indiatimes.com/support.html#h.a5rit14mwie1).

### INFOnline/IVW <a name="infonline--ivw"></a>

Тип значения атрибута: `infonline`

Добавляет поддержку [INFOnline](https://www.infonline.de)/[IVW](http://www.ivw.de). Требует наличия копии [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) на поддомене, отличающемся от домена AMP-файла, инициирующего добавление ([почему?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Файл должен выдаваться по HTTPS. Например, если ваши AMP-файлы размещены на `www.example.com`, тогда `amp-analytics-infonline.html` должен находиться на другом поддомене, таком как `iframe.example.com` или `assets.example.com`.

Дополнительно должны быть определены следующие переменные:

- `st`: идентификатор предложения
- `co`: комментарий
- `cp`: код
- `url`: HTTPS-расположение `amp-analytics-infonline.html`

Более подробную информацию о добавлении поддержки INFOnline/IVW можно найти на сайте [www.infonline.de](https://www.infonline.de/).

### INFOnline анонимный <a name="infonline-anonymous"></a>

Значение атрибута типа: `infonline-anonymous`

Добавляет поддержку [анонимной версии INFOnline](https://www.infonline.de). Требует наличия копии [amp-analytics-infonline.html](https://www.infonline.de/amp/infonline-anonymous.html) на поддомене, отличающемся от домена AMP-файла, инициирующего добавление ([почему?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Файл должен выдаваться по HTTPS. Например, если ваши AMP-файлы размещены на `www.example.com`, тогда `infonline-anonymous.html` должен находиться на другом поддомене, таком как `iframe.example.com` или `assets.example.com`.

Дополнительно должны быть определены следующие переменные:

- `st`: идентификатор предложения
- `co`: комментарий
- `cp`: код
- `url`: HTTPS-расположение `infonline-anonymous.html`
- `dn`: имя домена ретрансляции

Более подробную информацию о добавлении поддержки анонимной версии INFOnline можно найти на сайте [www.infonline.de](https://www.infonline.de/).

### ip-label <a name="ip-label"></a>

Тип значения атрибута: `iplabel`

### Keen <a name="keen"></a>

Значение атрибута типа: `keen`

Добавляет поддержку Keen. Кроме того, должны быть определены следующие переменные `var`:

- `projectId`: идентификатор вашего проекта
- `writeKey`: ваш ключ записи

Чтобы добавить дополнительные данные, используйте `extraUrlParams`. Описание настройки можно найти на [keen.io/docs/api](https://keen.io/docs/api/).

### Kenshoo <a name="kenshoo"></a>

Значение атрибута типа: `kenshoo`

Добавляет поддержку Kenshoo. Дополнительную информацию и описание настройки можно найти на сайте [helpcenter.kenshoo.com](https://helpcenter.kenshoo.com/hc/en-us/articles/360025260592).

### Krux <a name="krux"></a>

Значение атрибута типа: `krux`

Добавляет поддержку Krux. Описание настройки можно найти на [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

### Linkpulse <a name="linkpulse"></a>

Значение атрибута типа: `linkpulse`

Добавляет поддержку Linkpulse. Описание настройки можно найти на сайте [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame <a name="lotame"></a>

Значение атрибута типа: `lotame`

Добавляет поддержку Lotame. Дополнительную информацию и описание настройки можно найти на сайте [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP).

### Mapp Intelligence <a name="mapp-intelligence"></a>

Значение атрибута типа: `mapp_intelligence`

Добавляет поддержку отслеживания в Mapp Intelligence. Дополнительную информацию и описание настройки можно найти на сайте [docs.mapp.com](https://docs.mapp.com/pages/viewpage.action?pageId=10027966).

### Marin Software <a name="marin-software"></a>

Значение атрибута типа: `marinsoftware`

### Médiamétrie <a name="m%C3%A9diam%C3%A9trie"></a>

Значение атрибута типа: `mediametrie`

Добавляет поддержку отслеживающих страниц Médiamétrie. Требуется указать *var* `serial`. Переменные с `level1` по `level4` могут быть указаны по желанию. Дополнительную информацию можно найти на сайте [mediametrie.com](http://www.mediametrie.com/).

### mediarithmics <a name="mediarithmics"></a>

Значение атрибута типа: `mediarithmics`

Добавляет поддержку mediarithmics. Дополнительную информацию и описание настройки можно найти по адресу `https://developer.mediarithmics.com`.

### Memo <a name="memo"></a>

Значение атрибута типа: `memo`

### Metrika <a name="metrika"></a>

Значение атрибута типа: `metrika`

### Moat Analytics <a name="moat-analytics"></a>

Значение атрибута типа: `moat`

Добавляет поддержку Moat. Пожалуйста, свяжитесь с вашим представителем Moat для получения информации о настройке. Более подробную информацию о Moat можно найти по адресу [moat.com/analytics](https://moat.com/analytics).

### Mobify <a name="mobify"></a>

Значение атрибута типа: `mobify`

Добавляет поддержку Mobify. Более подробную информацию о добавлении поддержки Mobify можно найти на сайте [docs.mobify.com](https://docs.mobify.com/amp-sdk/latest/guides/amp-analytics/).

### MoEngage <a name="moengage"></a>

Значение атрибута типа: `moengage`

### mParticle <a name="mparticle"></a>

Значение атрибута типа: `mparticle`

Добавляет поддержку mParticle. Более подробную информацию о добавлении поддержки mParticle можно найти на сайте [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### Navegg <a name="navegg"></a>

Значение атрибута типа: `navegg`

### New Relic <a name="new-relic"></a>

Значение атрибута типа: `newrelic`

Добавляет поддержку New Relic Browser для измерения пропускной способности и производительности AMP. Чтобы начать фиксацию данных, помимо указания значения `newrelic` вам также потребуется добавить `app ID` и `license key` из вашего аккаунта New Relic Browser. Дополнительные сведения можно получить в документации New Relic Browser по взаимодействию с AMP, на сайте [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser).

### Nielsen <a name="nielsen"></a>

Значение атрибута типа: `nielsen`

Добавляет поддержку Nielsen DCR. Чтобы создать свой `apid`, а также получить помощь по определению оставшихся параметров в разделе `vars`, свяжитесь со своим представителем в Nielsen. Для получения дополнительной информации см. [техническую документацию Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### Nielsen Marketing Cloud <a name="nielsen-marketing-cloud"></a>

Значение атрибута типа: `nielsen-marketing-cloud`

Добавляет поддержку Nielsen Marketing Cloud. Более подробную информацию можно найти на сайте [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html).

### OEWA <a name="oewa"></a>

Значение атрибута типа: `oewa`

Добавляет поддержку <code>[OEWA](https://www.oewa.at)</code>. Требует наличия копии [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) на поддомене, отличающемся от домена AMP-файла, инициирующего добавление ([почему?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Файл должен выдаваться по HTTPS. Например, если ваши AMP-файлы размещены на `www.example.com`, тогда `amp-analytics-oewa.html` должен находиться на другом поддомене, таком как `oewa-amp.example.com`. Дополнительные сведения о добавлении поддержки OEWA можно найти [здесь](http://www.oewa.at/Implementierung).

Также должны быть определены следующие переменные:

В разделе `vars`:

- `s`: предложение
- `cp`: путь к категории

В разделе `requests`:

- `url`: HTTPS-размещение `amp-analytics-oewa.html`

[tip type="note"] **ПРИМЕЧАНИЕ.** Существует вариант с именем `oewadirect`, который не использует решение iframe-ping и обладает улучшенным механизмом определения клиентов с помощью `AMP CLIENT_ID`. В настоящее время этот модуль является ЭКСПЕРИМЕНТАЛЬНЫМ: OEWA запрещает его использование, так как он не использует `oewa2.js`. [/tip]

### Oracle Infinity Analytics <a name="oracle-infinity-analytics"></a>

Значение атрибута типа: `oracleInfinityAnalytics`

### Parsely <a name="parsely"></a>

Значение атрибута типа: `parsely`

Добавляет поддержку Parsely. Описание настройки можно найти на [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Permutive <a name="permutive"></a>

Значение атрибута типа: `permutive`

Добавляет поддержку сбора событий в Permutive. Кроме того, должны быть определены следующие `vars`:

- `namespace`: ваше пространство имен Permutive AMP
- `key`: ваш открытый ключ для Permutive API

Используйте `extraUrlParams`, чтобы добавить дополнительные свойства события. Полное описание настройки можно найти на сайте [support.permutive.com](http://support.permutive.com).

### Pistats <a name="pistats"></a>

Значение атрибута типа: `piStats`

### Piano <a name="piano"></a>

Значение атрибута типа: `piano`

Добавляет поддержку Piano. Описание настройки можно найти на сайте [vx.piano.io](http://vx.piano.io/javascript-tracking-amp).

### Pinpoll <a name="pinpoll"></a>

Значение атрибута типа: `pinpoll`

Добавляет поддержку Pinpoll. Описание настройки можно найти на сайте [pinpoll.com](https://pinpoll.com/).

### Pressboard <a name="pressboard"></a>

Значение атрибута типа: `pressboard`

Добавляет поддержку Pressboard. Описание настройки можно найти на сайте [help.pressboard.ca](http://help.pressboard.ca/publisher-resources/getting-started/implementing-google-amp).

### Quantcast Measurement <a name="quantcast-measurement"></a>

Значение атрибута типа: `quantcast`

Добавляет поддержку Quantcast Measurement. Более подробную информацию о добавлении Quantcast Measurement можно найти на сайте [quantcast.com.](https://www.quantcast.com/help/guides/)

### Rakam <a name="rakam"></a>

Значение атрибута типа: `rakam`

### reppublika <a name="reppublika"></a>

Значение атрибута типа: `reppublika`

### Retargetly <a name="retargetly"></a>

Значение атрибута типа: `retargetly`

### RudderStack <a name="rudderstack"></a>

Значение атрибута типа: `rudderstack`

Добавляет поддержку регистрации просмотров страниц и событий в RudderStack. Дополнительные сведения о реализации см. в нашей [документации](https://docs.rudderstack.com/sdk-integration-guide/getting-started-with-javascript-sdk/amp-analytics).

### Segment <a name="segment"></a>

Тип значения атрибута: `segment`

Добавляет поддержку регистрации просмотров страниц и событий в Segment. Полный список полей, которые вы можете отправлять, см. в [Спецификации Segment](https://segment.com/docs/spec/).

### ShinyStat <a name="shinystat"></a>

Значение атрибута типа: `shinystat`

### SOASTA mPulse <a name="soasta-mpulse"></a>

Значение атрибута типа: `mpulse`

Добавляет поддержку [SOASTA mPulse](https://www.soasta.com/mPulse). Описание настройки можно найти на сайте [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach <a name="simplereach"></a>

Значение атрибута типа: `simplereach`

Добавляет поддержку SimpleReach. Описание настройки можно найти на странице `http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation`.

### Snowplow Analytics <a name="snowplow-analytics"></a>

Значение атрибута типа: `snowplow`, `snowplow_v2`

Добавляет поддержку Snowplow Analytics. Более подробную информацию о добавлении поддержки Snowplow Analytics можно найти по адресу [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Рамблер/ТОП-100 <a name="ramblertop-100"></a>

Значение атрибута типа: `top100`

Добавляет поддержку Рамблер/ТОП-100. Описание настройки можно найти на сайте [top100.rambler.ru](https://top100.rambler.ru).

### TEA Analytics <a name="tea-analytics"></a>

Значение атрибута типа: `teaanalytics`

Добавляет поддержку TEA Analytics. Более подробную информацию о добавлении поддержки TEA Analytics можно получить у Кимберли (wuqian56@gmail.com).

### Tealium Collect <a name="tealium-collect"></a>

Значение атрибута типа: `tealiumcollect`

Добавляет поддержку Tealium Collect. Более подробную информацию о добавлении поддержки Tealium Collect можно найти на сайте [docs.tealium.com](https://docs.tealium.com/platforms/amp/install/).

### Top.Mail.Ru <a name="topmailru"></a>

Значение атрибута типа: `topmailru`

Добавляет поддержку Top.Mail.Ru. Описание настройки можно найти в [справке Top.Mail.Ru](https://help.mail.ru/top/amp-analytics).

### Treasure Data <a name="treasure-data"></a>

Значение атрибута типа: `treasuredata`

Добавляет поддержку Treasure Data. Описание настройки можно найти на [treasuredata.com](https://docs.treasuredata.com/articles/javascript-sdk-google-amp).

### Umeng + Analytics <a name="umeng-analytics"></a>

Значение атрибута типа: `umenganalytics`

Добавляет поддержку Umeng + Analytics. Более подробную информацию о добавлении поддержки Umeng + Analytics можно найти на [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5).

### Upscore <a name="upscore"></a>

Значение атрибута типа: `upscore`

### Vpon Analytics <a name="vpon-analytics"></a>

Значение атрибута типа: `vponanalytics`

Добавляет поддержку Vpon Analytics. Описание настройки можно найти на сайте [Vpon Analytics](https://cmp.vpadn.com/dmp/doc/amp_analytics.html).

### Webengage <a name="webengage"></a>

Тип атрибута `webengage`

### Webtrekk <a name="webtrekk"></a>

Значение ~~`webtrekk`~~ устарело (будет удалено 31/12/2018) — используйте `webtrekk_v2`

Добавляет поддержку Webtrekk. Описание настройки можно найти на сайте [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html).

### Яндекс.Метрика <a name="yandex-metrica"></a>

Значение атрибута типа: `metrika`

Добавляет поддержку Яндекс.Метрики. Описание настройки можно найти на [сайте службы поддержки Яндекса](https://yandex.com/support/metrica/code/install-counter-amp.xml).

---
$title: 애널리틱스 공급업체
---

이 도움말에서는 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 구성요소에 사용할 내장형 구성을 갖춘 분석 공급업체를 소개합니다.

분석 데이터를 타사 공급업체로 전송하려면 다음 단계를 따르세요.

1. [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 태그에서 `type` 속성을 추가하고 아래 [*공급업체*](#vendors) 섹션에서 설명한 대로 지정된 공급업체에 해당 값을 설정합니다.
2. 어떤 데이터를 확보 및 추적할지 결정하고 구성 데이터에서 세부정보를 지정합니다. 분석 데이터를 확보하는 방법에 관한 정보는 공급업체의 도움말을 참조하세요.

다음 예에서는 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)  빌트인 환경설정을 지원하는 타사 애널리틱스 서비스 업체인 [Google 애널리틱스](#google-analytics)에 페이지뷰 데이터를 전송합니다.

```html
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

[tip type="success"]

코드 사용에 익숙한 경우 [`vendors.js`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/0.1/vendors.js) 파일에서 환경설정과 관련한 소스코드를 확인할 수 있습니다.

[/tip]

[tip type="note"]

서비스를 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)와 통합하려는 공급업체는 [애널리틱스 도구를 AMP와 통합](../../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md) 세부정보를 참조하세요.

[/tip]

<hr>

## 공급업체 <a name="vendors"></a>

### Acquia Lift

타입 속성값: `acquialift`

Acquia Lift 지원을 추가합니다. `decisionApiUrl`, `accountId`, `siteId`를 지정해야 합니다. Acquia Lift에 관한 자세한 내용은 [https://docs.acquia.com/lift](https://docs.acquia.com/lift)를 참고하세요.

### Adobe Analytics

타입 속성값: `adobeanalytics`

Adobe Analytics 지원을 추가합니다. Adobe Analytics 지원 추가에 관한 자세한 내용은 [marketing.adobe.com](https://marketing.adobe.com/resources/help/ko_KR/sc/implement/?f=accelerated-mobile-pages)을 참고하세요.

### AFS Analytics

타입 속성값: `afsanalytics`

AFS Analytics 지원을 추가합니다. `websiteid` 및 `server` 변수도 지정해야 합니다. AFS Analytics 지원 추가에 관한 자세한 내용은 [afsanalytics.com](https://www.afsanalytics.com/articles/developers/)을 참고하세요.

### Alexa Internet

타입 속성값: `alexametrics`

Alexa Certified Site Metrics 지원을 추가합니다. `atrk_acct` 및 `domain` 변수를 지정해야 합니다. 자세한 내용은 [Alexa’s Certified Metrics FAQ](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics)를 참고하세요.

### AT Internet

타입 속성값: `atinternet`

AT Internet 지원을 추가합니다. AT Internet 지원 추가에 관한 자세한 내용은 [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/)을 참고하세요.

### Baidu Analytics

타입 속성값: `baiduanalytics`

Baidu Analytics 지원을 추가합니다. Baidu Analytics 지원 추가에 관한 자세한 내용은 [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0)을 참고하세요.

### Burt

타입 속성값: `burt`

Burt 지원을 추가합니다. `trackingKey` 변수도 지정해야 합니다. 선택사항으로 `category` 및 `subCategory` 변수도 지정할 수 있습니다. 자세한 내용은 [burtcorp.com](http://burtcorp.com)을 참고하세요.

### Chartbeat

타입 속성값: `chartbeat`

Chartbeat 지원을 추가합니다. Chartbeat 지원 추가에 관한 자세한 내용은 [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp)을 참고하세요.

### Clicky Web Analytics

타입 속성값: `clicky`

Clicky Web Analytics 지원을 추가합니다. Clicky 지원 추가에 관한 자세한 내용은 [clicky.com](https://clicky.com/help/apps-plugins)을 참고하세요.

### comScore

타입 속성값: `comscore`

comScore 통합 디지털 측정™ 페이지뷰 분석 지원을 추가합니다. comScore에서 제공한 *c2 id*로 *var* `c2`를 정의해야 합니다. 자세한 내용은 [comscore.com](http://www.comscore.com)을 참고하세요.

### Cxense

타입 속성값: `cxense`

Cxense Insight 분석 지원을 추가합니다. Cxense에서 제공한 *siteId*로 *var* `siteId`를 정의해야 합니다. 자세한 내용은 [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration)을 참고하세요.

### Dynatrace

타입 속성값: `dynatrace`

Dynatrace 실제 사용자 모니터링 지원을 추가합니다. Dynatrace에서 제공한 *application id*로 *var* `app`을 정의하고 Dynatrace 제공 *environment identifier*로 *var* `tenant`를 정의해야 합니다. Dynatrace 실제 사용자 모니터링 추가에 관한 자세한 내용은 [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/)을 참고하세요.

### Eulerian Analytics

타입 속성값: `euleriananalytics`

Eulerian Technologies Analytics 지원을 추가합니다. Eulerian에서 위임한 도메인으로 *var* `analyticsHost`를 정의해야 합니다. 자세한 내용은 [eulerian.wiki](https://eulerian.wiki)를 참고하세요.

### Facebook Pixel

타입 속성값: `facebookpixel`

[Facebook Pixel](https://www.facebook.com/business/a/facebook-pixel) 지원을 추가합니다. [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 설정에서 Pixel ID를 `pixelId: YOUR-PIXEL-ID`로 정의해야 합니다. 지정 가능한 해당 이벤트 값과 함께 지원되는 이벤트는 [Facebook Pixel 개발자 도움말](https://developers.facebook.com/docs/ads-for-websites/pixel-events)에 상세하게 설명되어 있습니다.

### Gemius

타입 속성값: `gemius`

Gemius Audience/Prism 분석 지원을 추가합니다. Gemius 제공 `prefix` 및 `identifier` 변수도 지정해야 합니다. 선택사항인 `extraparams` (key1=value1|key2=value2) 변수를 지정할 수도 있습니다. 자세한 내용은 [gemius.com](https://www.gemius.com)을 참고하세요.

### Google 애드워즈

타입 속성값: `googleadwords`

Google AdWords 전환추적 및 리마케팅 지원을 추가합니다. 자세한 내용은 AdWords 고객센터의 [전환추적](https://support.google.com/adwords/answer/1722054?hl=ko) 및 [리마케팅](https://support.google.com/adwords/answer/2453998?hl=ko)을 참고하세요. 두 태그는 서로 독립적으로 사용할 수 있습니다.

### Google 애널리틱스 <a name="google-analytics"></a>

타입 속성값: `googleanalytics`

Google 애널리틱스 지원을 추가합니다. Google Analytics 지원 추가에 관한 자세한 내용은 [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/)을 참고하세요.

### INFOnline / IVW

타입 속성값: `infonline`

[INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de) 지원을 추가합니다. [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html)의 사본이, 포함된 AMP 파일 ([이유?](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md))와 다른 하위 도메인에서 필요합니다. 파일은 HTTPS를 통해 제공해야 합니다. 예를 들어, AMP 파일이 `www.example.com`에 호스팅된 경우 `amp-analytics-infonline.html`이 `iframe.example.com` 또는 `assets.example.com` 등 다른 하위 도메인에 있어야 합니다.

다음 변수도 정의되어야 합니다.

* `st`: Angebotskennung
* `co`: 댓글
* `cp`: 코드
* `url`: `amp-analytics-infonline.html`의 HTTPS 위치

INFOnline / IVW 지원 추가에 관한 자세한 내용은 [www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/)를 참고하세요.

### Krux

타입 속성값: `krux`

Krux 지원을 추가합니다.  구성에 관한 세부정보는 [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608)을 참고하세요.

### Linkpulse

타입 속성값: `linkpulse`

Linkpulse 지원을 추가합니다. 구성에 관한 세부정보는 [docs.linkpulse.com](http://docs.linkpulse.com)을 참고하세요.

### Lotame

타입 속성값: `lotame`

Lotame 지원을 추가합니다.  자세한 내용과 구성에 관한 세부정보는 [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP)을 참고하세요.

### Médiamétrie

타입 속성값: `mediametrie`

Médiamétrie 추적 페이지 지원을 추가합니다. *var* `serial`을 정의해야 합니다. Vars `level1`부터 `level4`까지는 선택사항입니다.  자세한 내용은 [mediametrie.com](http://www.mediametrie.com/)을 참고하세요.

### mediarithmics

타입 속성값: `mediarithmics`

mediarithmics 지원을 추가합니다. 자세한 내용과 구성에 관한 세부정보는 [developer.mediarithmics.com](https://developer.mediarithmics.com/)을 참고하세요.

### mParticle

타입 속성값: `mparticle`

mParticle 지원을 추가합니다. mParticle 지원 추가에 관한 자세한 내용은 [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp)을 참고하세요.

### New Relic

타입 속성값: `newrelic`

AMP 처리량 및 실적을 측정하기 위한 New Relic 브라우저 지원을 추가합니다. `newrelic` 속성값을 추가하면 데이터를 가져오기 위해 New Relic 브라우저 계정에 있는 `app ID` 및 `license key`를 추가해야 합니다. 자세한 내용은 [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser)의 New Relic 브라우저 AMP 문서 페이지를 참고하세요.

### Nielsen

타입 속성값: `nielsen`

Nielsen DCR 지원을 추가합니다. `apid`로 설정하고 `vars` 섹션의 남은 매개변수를 정의하는 데 도움을 받으려면 Nielsen 담당자에게 문의하세요. 자세한 내용은 [Nielsen 지원 도움말](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API)을 참고하세요.

### Nielsen Marketing Cloud

타입 속성값: `nielsen-marketing-cloud`

Nielsen Marketing Cloud 지원을 추가합니다. 자세한 내용은 [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html)를 참고하세요.

### OEWA

타입 속성값: `oewa`

[OEWA](https://www.oewa.at) 지원을 추가합니다. [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html)의 사본이 포함된 AMP 파일과 다른 하위 도메인에 있어야 합니다([이유?](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md)). 파일은 HTTPS를 통해 제공해야 합니다. 예를 들어, AMP 파일이 `www.example.com`에 호스팅된 경우, `amp-analytics-oewa.html`은 `oewa-amp.example.com` 등 다른 하위 도메인에 있어야 합니다. OEWA 지원 추가에 관한 자세한 내용은 [여기](http://www.oewa.at/Implementierung)를 참고하세요.

다음 변수도 정의되어야 합니다.

`vars` 섹션:

- `s`: 제공
- `cp`: 카테고리 경로

`requests` 섹션에서 다음 단계를 따르세요.

- `url`: `amp-analytics-oewa.html`의 HTTPS 위치

[tip type="note"]

iframe-ping 솔루션을 사용하지 않고 `AMP CLIENT_ID`를 사용하여 클라이언트 감지 기능을 개선한 `oewadirect`라는 변형 버전이 있습니다.  현재 실험실 기능으로서, `oewa2.js`를 사용하지 않으므로 OEWA에서 사용을 금지하고 있습니다.

[/tip]

### Parsely

타입 속성값: `parsely`

Parsely 지원을 추가합니다. 구성에 관한 세부정보는 [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html)를 참고하세요.

### Piano

타입 속성값: `piano`

Piano 지원을 추가합니다.  구성에 관한 세부정보는 [vx.piano.io](http://vx.piano.io/javascript-tracking-amp)를 참고하세요.

### Quantcast Measurement

타입 속성값: `quantcast`

Quantcast Measurement 지원을 추가합니다. Quantcast Measurement 추가에 관한 자세한 내용은 [quantcast.com](https://www.quantcast.com/help/guides/)을 참고하세요.

### Segment

타입 속성값: `segment`

세그먼트 페이지뷰 및 이벤트 지원을 추가합니다.
전송할 수 있는 전체 필드 목록을 확인하려면 [Segment Spec](https://segment.com/docs/spec/)을 참고하세요.

### SOASTA mPulse

타입 속성값: `mpulse`

[SOASTA mPulse](https://www.soasta.com/mPulse) 지원을 추가합니다. 구성에 관한 세부정보는 [docs.soasta.com](http://docs.soasta.com/)을 참고하세요.

### SimpleReach

타입 속성값: `simplereach`

SimpleReach 지원을 추가합니다.  구성에 관한 세부정보는 [simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation)를 참고하세요.

### Snowplow Analytics

타입 속성값: `snowplow`

Snowplow Analytics 지원을 추가합니다. Snowplow Analytics 지원 추가에 관한 자세한 내용은 [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker)를 참고하세요.

### Rambler/TOP-100

타입 속성값: `top100`

Rambler/TOP-100 지원을 추가합니다. 구성에 관한 세부정보는 [top100.rambler.ru](https://top100.rambler.ru/docs)를 참고하세요.

### Top.Mail.Ru

타입 속성값: `topmailru`

Top.Mail.Ru 지원을 추가합니다. 구성에 관한 세부정보는 [Top.Mail.Ru 도움말](https://help.mail.ru/top/amp-analytics)을 참고하세요.

### Umeng+ Analytics

타입 속성값: `umenganalytics`

Umeng+ Analytics 지원을 추가합니다. Umeng+ Analytics 지원 추가에 관한 자세한 내용은 [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5)을 참고하세요.

### Treasure Data

타입 속성값: `treasuredata`

Treasure Data 지원을 추가합니다. 구성에 관한 세부정보는 [treasuredata.com](https://docs.treasuredata.com/articles/javascript-sdk-google-amp)을 참고하세요.

### Webtrekk

속성값 ~~`webtrekk`~~가 지원 중단됩니다(2018년 12월 31일 삭제 예정). 대신 `webtrekk_2`를 사용하세요.

Webtrekk 지원을 추가합니다. 환경설정에 관한 세부정보는 [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html)을 참고하세요.

### Yandex Metrica

타입 속성값: `metrika`

Yandex Metrica 지원을 추가합니다.  구성에 관한 세부정보는 [Yandex 지원](https://yandex.com/support/metrica/code/install-counter-amp.xml)을 참고하세요.

---
$title: "애널리틱스 공급업체"
$order: 4
toc: true
---

[TOC]

 이 문서에는 [`amp-analytics`](/ko/docs/reference/components/amp-analytics.html) 구성요소와 함께 사용할 수 있는 구성이 내장된 애널리틱스 공급업체의 목록이 기술되어 있습니다.

`type` 속성을 사용하여 애널리틱스 공급업체의 이름을 지정하면 `amp-analytics`를 신속하게 구성하여 해당 제품을 사용할 수 있습니다. 이때 사용자 ID 등과 같은 추가 구성이 필요할 수도 있습니다.

 자세한 정보는 아래 기술된 공급업체에 문의하세요. 일부 공급업체의 경우 아래 섹션에 문의할 페이지가 링크로 제공되어 있습니다. 또한 [vendors.js](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/0.1/vendors.js) 파일을 통해 각 공급업체의 구성을 자세하게 알아볼 수 있습니다.

**예:**

다음은 `XYZ`라는 애널리틱스 제공업체를 `type`으로 지정하는 스니펫입니다.

```html
<amp-analytics type="XYZ"> ... </amp-analytics>
```

{% call callout('읽어보기', type='read') %}
[`amp-analytics`](/ko/docs/reference/components/amp-analytics.html) 로 애널리틱스를 추적하는 방법에 관해 자세히 알아보세요. {% endcall %}

## 공급업체

### Acquia Lift

속성값 유형: `acquialift`

 Acquia Lift 지원을 추가합니다. `decisionApiUrl`, `accountId`, `siteId`를 지정해야 합니다. Acquia Lift에 관한 자세한 내용은 다음에서 확인할 수 있습니다. [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics

속성값 유형: `adobeanalytics`

 Adobe Analytics 지원을 추가합니다. Adobe Analytics 지원 추가에 관한 자세한 내용은 [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html) 에서 확인할 수 있습니다.

### AFS Analytics

속성값 유형: `afsanalytics`

 AFS Analytics 지원을 추가합니다. 추가로 `websiteid` 및 `server` 변수를 지정해야 합니다. AFS Analytics 지원 추가에 관한 자세한 내용은 [afsanalytics.com](https://www.afsanalytics.com/articles/developers/) 에서 확인할 수 있습니다.

### AT Internet

속성값 유형: `atinternet`

 AT Internet 지원을 추가합니다. AT Internet 지원 추가에 관한 자세한 내용은 [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/) 에서 확인할 수 있습니다.

### Baidu Analytics

속성값 유형: `baiduanalytics`

 Baidu Analytics 지원을 추가합니다. Baidu Analytics 지원 추가에 관한 자세한 내용은 [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0) 에서 확인할 수 있습니다.

### Burt

속성값 유형: `burt`

 Burt 지원을 추가합니다. 추가로 `trackingKey` 변수를 지정해야 합니다. `category` 및 `subCategory` 변수도 지정할 수 있습니다 (선택사항). 자세한 내용은 [burtcorp.com](http://burtcorp.com) 에서 확인할 수 있습니다.

### Chartbeat

속성값 유형: `chartbeat`

 Chartbeat 지원을 추가합니다. Chartbeat 지원 추가에 관한 자세한 내용은 [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp) 에서 확인할 수 있습니다.

### Clicky Web Analytics

속성값 유형: `clicky`

 Clicky Web Analytics 지원을 추가합니다. Clicky 지원 추가에 관한 자세한 내용은 [clicky.com](https://clicky.com/help/apps-plugins) 에서 확인할 수 있습니다.

### comScore

속성값 유형: `comscore`

 comScore Unified Digital Measurement&trade; 페이지 조회수 애널리틱스 지원을 추가합니다. Requires defining*var* `c2`(comScore에서 제공한*c2 id* 포함) 를 정의해야 합니다. 자세한 내용은 [comscore.com](http://www.comscore.com) 에서 확인할 수 있습니다.

### Cxense

속성값 유형: `cxense`

 Cxense Insight 애널리틱스 지원을 추가합니다. Requires defining*var* `siteId`(Cxense에서 제공한 *siteId* 포함) 를 정의해야 합니다. 자세한 내용은 [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration) 에서 확인할 수 있습니다.

### Dynatrace

속성값 유형: `dynatrace`

 Dynatrace 실제 사용자 모니터링 지원을 추가합니다. Requires defining *var* `app`(Dynatrace에서 제공한 *애플리케이션 ID*  포함) 및 *var* `tenant`(Dynatrace에서 제공한 *환경 식별자* 포함) 를 정의해야 합니다. Dynatrace 실제 사용자 모니터링 추가에 관한 자세한 내용은 [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/) 에서 확인할 수 있습니다.

### Eulerian Analytics

속성값 유형: `euleriananalytics`

 Eulerian Technologies Analytics 지원을 추가합니다. Eulerian에서 위임한 도메인을 포함하는*var*  `analyticsHost`를 정의해야 합니다. 자세한 내용은[eulerian.wiki](https://eulerian.wiki)에서 확인할 수 있습니다.

### Gemius

속성값 유형: `gemius`

 Gemius Audience/Prism 애널리틱스 지원을 추가합니다. 추가로 gemius에서 제공한 `prefix` 및 `identifier` 변수를 지정해야 합니다. `extraparams` 변수(key1=value1|key2=value2) 도 지정할 수 있습니다(선택사항). 자세한 내용은 [gemius.com](https://www.gemius.com) 에서 확인할 수 있습니다.

### Google AdWords

속성값 유형: `googleadwords`

 Google 애드워즈 변환 추적 및 리마케팅 지원을 추가합니다. See more details in the AdWords help center for [변환 추적](https://support.google.com/adwords/answer/1722054?hl=en) 및[리마케팅](https://support.google.com/adwords/answer/2453998?hl=en) 에 관한 자세한 내용은 애드워즈 고객센터에서 확인하세요. 두 가지 태그는 서로 독립적으로 사용할 수 있습니다.

### Google 애널리틱스

속성값 유형: `googleanalytics`

 Google 애널리틱스 지원을 추가합니다. Google 애널리틱스 지원 추가에 관한 자세한 내용은 [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/) 에서 확인할 수 있습니다.

### INFOnline / IVW

속성값 유형: `infonline`

[INFOnline](https://www.infonline.de)  / [IVW](http://www.ivw.de) 지원을 추가합니다. 포함되어 있는 AMP 파일이 있는 하위 도메인과 다른 하위 도메인에 [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) 사본이 있어야 합니다 ([다른 하위 도메인에 있어야 하는 이유](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). 해당 파일은 HTTPS를 통해 게재되어야 합니다. 예를 들어 AMP 파일이 `www.example.com` 에 호스팅되어 있는 경우 `iframe.example.com` 또는 `assets.example.com` 과 같은 다른 하위 도메인에 `amp-analytics-infonline.html` 이 있어야 합니다.

또한 다음의 변수가 지정되어야 합니다.

* `st`: Angebotskennung
* `co`: 댓글
* `cp`: 코드
* `url`: `amp-analytics-infonline.html`의 HTTPS 위치

 INFOnline / IVW 지원 추가에 관한 자세한 내용은 [www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/) 에서 확인할 수 있습니다.

### Krux

속성값 유형: `krux`

 Krux 지원을 추가합니다. 구성 관련 세부정보는 [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608) 에서 확인할 수 있습니다.

### Linkpulse

속성값 유형: `linkpulse`

 Linkpulse 지원을 추가합니다. 구성과 관련된 자세한 내용은 [docs.linkpulse.com](http://docs.linkpulse.com) 에서 확인할 수 있습니다.

### Lotame

속성값 유형: `lotame`

 Lotame 지원을 추가합니다. 자세한 내용 및 구성 관련 세부정보는 [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP) 에서 확인할 수 있습니다.

### Médiamétrie

속성값 유형: `mediametrie`

 Médiamétrie 추적 페이지 지원을 추가합니다. Requires defining *var* `serial`을 정의해야 합니다. Vars `level1` ~ `level4` 는 선택사항입니다. 자세한 내용은 [mediametrie.com](http://www.mediametrie.com/) 에서 확인할 수 있습니다.

### mParticle

속성값 유형: `mparticle`

 mParticle 지원을 추가합니다. mParticle 지원 추가에 관한 자세한 내용은 [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp) 에서 확인할 수 있습니다.

### Nielsen

속성값 유형: `nielsen`

 Nielsen DCR 지원을 추가합니다. `apid` 설정 및 `vars` 섹션의 나머지 변수 정의와 관련해 Nielsen 상담원에게 문의하세요. 자세한 내용은 [Nielsen 지원 문서](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API) 를 참조하세요.

### OEWA

속성값 유형: `oewa`

 [OEWA](https://www.oewa.at) 지원을 추가합니다. 포함되어 있는 AMP 파일이 있는 하위 도메인과 다른 하위 도메인에 [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) 사본이 있어야 합니다 ([다른 하위 도메인에 있어야 하는 이유](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). 해당 파일은 HTTPS 를 통해 게재되어야 합니다. 예를 들어 AMP 파일이 `www.example.com`에 호스팅되어 있는 경우 `oewa-amp.example.com` 과 같은 다른 하위 도메인에 `amp-analytics-oewa.html` 이 있어야 합니다. OEWA 지원 추가에 관한 자세한 내용은 [여기](http://www.oewa.at/basic/implementierung) 에서 확인할 수 있습니다.

또한 다음의 변수가 지정되어야 합니다.

`vars` 섹션

- `s`: 주문
- `cp`: 카테고리 경로

`requests` 섹션

- `url`: `amp-analytics-oewa.html`의 HTTPS 위치

{% call callout('참고', type='caution') %}
이와 비슷하지만 iframe-ping 솔루션을 사용하지 않으며, `AMP CLIENT_ID`를 사용하여 더욱 우수한 클라이언트 탐지 기능을 갖는 `oewadirect`도 있습니다. 이는 현재 실험 단계이며 `oewa2.js`를 사용하지 않기 때문에 OEWA에서 금지하고 있습니다.
{% endcall %}

### Parsely

속성값 유형: `parsely`

 Parsely 지원을 추가합니다. 구성 관련 세부정보는 [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html) 에서 확인할 수 있습니다.

### Piano

속성값 유형: `piano`

 Piano 지원을 추가합니다. 구성 관련 세부정보는 [vx.piano.io](http://vx.piano.io/javascript-tracking-amp) 에서 확인할 수 있습니다.

### Quantcast Measurement

속성값 유형: `quantcast`

 Quantcast Measurement 지원을 추가합니다. Quantcast Measurement 지원 추가에 관한 자세한 내용은 [quantcast.com ](https://www.quantcast.com/help/guides/) 에서 확인할 수 있습니다.

### Segment

속성값 유형: `segment`

 Segment 페이지 조회수와 이벤트 지원을 추가합니다. 전송 가능한 입력란의 전체 목록을 확인하려면 [Segment Spec](https://segment.com/docs/spec/) 을 확인하세요.

### SOASTA mPulse

속성값 유형: `mpulse`

 [SOASTA mPulse](https://www.soasta.com/mPulse) 지원을 추가합니다. 구성 관련 세부정보는 [docs.soasta.com](http://docs.soasta.com/) 에서 확인할 수 있습니다.

### SimpleReach

속성값 유형: `simplereach`

 SimpleReach 지원을 추가합니다. 구성 관련 세부정보는 [simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation) 에서 확인할 수 있습니다.

### Snowplow Analytics

속성값 유형: `snowplow`

 Snowplow Analytics 지원을 추가합니다. Snowplow Analytics 지원 추가에 관한 자세한 내용은 [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker) 에서 확인할 수 있습니다.

### Rambler/TOP-100

속성값 유형: `top100`

 Rambler/TOP-100 지원을 추가합니다. 구성 관련 세부정보는 [top100.rambler.ru](https://top100.rambler.ru/docs) 에서 확인할 수 있습니다.

### Webtrekk

속성값 유형: `webtrekk`

 Webtrekk 지원을 추가합니다. 구성 관련 세부정보는 [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html) 에서 확인할 수 있습니다.

### Yandex Metrica

속성값 유형: `metrika`

 Yandex Metrica 지원을 추가합니다. 구성 관련 세부정보는 [Yandex Support](https://yandex.com/support/metrica/code/install-counter-amp.xml) 에서 확인할 수 있습니다.


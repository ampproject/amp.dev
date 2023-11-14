---
$title: amp-ad
$category@: ads-analytics
teaser:
  text: 광고를 표시하는 컨테이너입니다.
---



광고를 표시하는 컨테이너입니다. `amp-embed`는 `amp-ad` 태그의 별칭이며 다양한 태그 이름으로 모든 기능이 파생됩니다. 의미상 더 정확한 경우 `amp-embed`를 사용하세요. AMP 문서는 HTTPS를 통해 게재되는 광고/삽입만 지원합니다.

# <a name="amp-ad"></a> amp-ad / amp-embed


[tip type="note"]
`amp-ad`/`amp-embed` 사양은 시간이 지남에 따라 크게 개선될 가능성이 높습니다. 현재 접근 방식은 형식을 부트스트랩하여 광고를 게재할 수 있도록 설계되었습니다.
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
    <td class="col-fourty"><strong>설명</strong></td>
    <td>광고를 표시하는 컨테이너입니다. <code>amp-embed</code>는 <code>amp-ad</code> 태그의 별칭이며 다양한 태그 이름으로 모든 기능이 파생됩니다. 의미상 더 정확한 경우 <code>amp-embed</code>를 사용하세요. AMP 문서는 HTTPS를 통해 게재되는 광고/삽입만 지원합니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://ampjs.org/v0/amp-ad-0.1.js">&lt;</code><br>참고: amp-ad는 이 스크립트가 없어도 작동할 수 있지만 향후 호환성을 위해 사용하는 것이 좋습니다.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-ad/">amp-ad 예</a>를 참조하세요.</td>
  </tr>
</table>

## 동작 <a name="behavior"></a>

광고는 AMP 문서의 다른 모든 리소스와 마찬가지로
`<amp-ad>`라는 특별한 맞춤 요소와 함께 로드됩니다. 광고 네트워크에서 제공하는 자바스크립트는 AMP 문서 내에서 실행할 수 없습니다. 대신 AMP 런타임에서는 AMP 문서로 iframe 샌드박스를 통해 다른 원본에서 iframe을 로드하고 그 iframe 샌드박스 내에서는 광고 네트워크의 JS를 실행합니다.

`<amp-ad>`를 사용하려면 레이아웃 유형의 [규칙](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors)에 따라 너비와 높이 값을 지정해야 합니다. 이를 위해 표시할 광고 네트워크를 선택하는 `type` 인수가 필요합니다. 태그의 모든 `data-*` 속성은 이후에 광고를 렌더링하는 코드에 인수로 자동 전달됩니다. 특정 네트워크 유형에 필요한 `data-` 속성은 상황에 따라 다르며 광고 네트워크에서 문서화되어야 합니다.

#### 예: 몇 가지 광고 표시 <a name="example-displaying-a-few-ads"></a>

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

## 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type(필수)</strong></td>
    <td><a href="#supported-ad-networks">광고 네트워크</a>의 식별자를 지정합니다. <code>type</code> 속성은 광고 태그에 사용할 템플릿을 선택합니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>src(선택사항)</strong></td>
    <td>이 속성을 사용해 지정된 광고 네트워크의 스크립트 태그를 로드합니다. 이 속성은 페이지에 정확히 1개의 스크립트 태그를 삽입해야 하는 광고 네트워크에 사용할 수 있습니다. <code>src</code> 값에는 지정된 광고 네트워크에서 허용되는 접두사가 있어야 하며 값은 <code>https</code> 프로토콜을 사용해야 합니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>대부분의 광고 네트워크에는 HTML <code>data-</code> 속성을 사용해 네트워크에 전달될 수 있는 추가 구성이 필요합니다. 매개변수 이름의 표준 데이터 속성 대시는 카멜식 대소문자로 변환됩니다. 예를 들어 'data-foo-bar'는 구성을 위해 'fooBar'로 광고에 전송됩니다. 사용할 수 있는 속성은 <a href="#supported-ad-networks">광고 네트워크</a> 문서를 참조하세요.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td><code>data-vars-</code>로 시작하는 속성은 <a href="https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute"><code>amp-analytics</code> vars</a> 전용입니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json(선택사항)</strong></td>
    <td>이 속성을 사용해 구성을 임의의 복잡한 JSON 개체로 광고에 전달합니다. 개체는 이름이 변경되지 않고 그대로 광고에 전달됩니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id(선택사항)</strong></td>
    <td>제공되는 경우 쿠키와 마찬가지로 사용자의 'AMP 클라이언트 ID'가 광고에 전달될 때까지 지정된 HTML ID로 <a href="amp-user-notification.md">amp-user-notification</a>을 확인해야 합니다. 즉, 사용자가 알림을 확인할 때까지 광고 렌더링이 지연됩니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy(선택사항)</strong></td>
    <td>광고가 현재 표시 영역에서 지정된 표시 영역 수만큼 떨어져 있을 때 로드를 시작하도록 광고에 지시합니다. <code>data-loading-strategy</code> 속성이 없으면 기본값은 3입니다. [0, 3] 범위에서 부동 값을 지정할 수 있으며, 값을 지정하지 않으면 값이 1.25로 설정됩니다. 작은 값을 사용하면 조회가능성이 높아지지만(즉, 광고가 로드된 후 표시될 가능성 증가) 노출은 적게 생성될 위험(즉, 로드되는 광고가 적음)이 있습니다. 속성을 지정했지만 값을 비워 두면 시스템에서 노출수에 큰 영향을 미치지 않으면서 조회가능성을 최적화하는 부동 값을 지정합니다. 값으로 <code>prefer-viewability-over-views</code>를 지정해도 조회가능성이 자동으로 최적화됩니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id(선택사항)</strong></td>
    <td>접기를 시도하는 경우 컨테이너 구성요소 ID를 광고에 알립니다. 컨테이너 구성요소는 광고의 상위인 <code>&lt;amp-layout&gt;</code> 구성요소여야 합니다. <code>data-ad-container-id</code>를 지정했는데 그 <code>&lt;amp-layout&gt;</code> 컨테이너 구성요소가 발견되면, AMP 런타임에서 채우기가 없는 동안 광고 구성요소 대신 컨테이너 구성요소를 접으려고 시도합니다. 이 기능은 광고 표시기가 있을 때 유용할 수 있습니다.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>공통 속성</strong></td>
    <td>이 요소에는 AMP 구성요소로 확장된 <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">공통 속성</a>이 포함됩니다.</td>
  </tr>
</table>

## 자리표시자 <a name="placeholder"></a>

필요한 경우 `amp-ad`는 `placeholder` 속성으로 하위 요소를 지원합니다. 광고 네트워크에서 지원하는 경우 게재할 수 있는 광고가 없으면 이 요소가 표시됩니다. [자리표시자 및 대체 동작](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)에서 자세히 알아보세요.

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>로드 중 ...</div>
</amp-ad>
```

## 사용 가능한 광고 없음 <a name="no-ad-available"></a>

슬롯에 사용할 수 있는 광고가 없으면 AMP에서 `amp-ad` 요소를 접으려고(즉, `display: none`으로 설정) 시도합니다. AMP에서는 사용자의 스크롤 위치에 영향을 주지 않고 이 작업을 실행할 수 있는지 확인합니다. 광고가 현재 표시 영역에 있으면 사용자의 스크롤 위치에 영향을 주기 때문에 광고가 접히지 않지만, 광고가 현재 표시 영역 외부에 있으면 접힙니다.

접지 못하는 경우 `amp-ad` 구성요소는 `fallback` 속성으로 하위 요소를 지원합니다. 대체 요소가 있는 경우 맞춤 대체 요소가 표시됩니다. 그렇지 않으면 AMP에서 기본 대체 동작을 적용합니다.

대체 동작의 예:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>광고 없음</div>
</amp-ad>
```

## 동영상 광고 게재 <a name="serving-video-ads"></a>

다음 3가지 방법으로 동영상 광고로 AMP에서 수익을 창출할 수 있습니다.

1. AMP에서는 기본적으로 BrightCove, DailyMotion 등 광고로 수익을 창출할 수 있는 여러 동영상 플레이어를 지원합니다. 전체 목록은 [media](../../../documentation/components/index.html#media) 구성요소를 참조하세요.

1. 내장 IMA SDK 및 HTML5 동영상 플레이어와 함께 제공되는 [amp-ima-video](amp-ima-video.md) 구성요소를 사용합니다.
1. AMP에서 지원되지 않는 동영상 플레이어를 사용하는 경우 [amp-iframe](https://ampbyexample.com/components/amp-iframe/)을 사용해 맞춤 플레이어를 제공할 수 있습니다.
`amp-iframe` 접근 방식을 사용하는 경우 다음 안내를 따르세요.

    * 첫 번째 표시 영역에 플레이어를 로드하는 경우 포스터가 있어야 합니다. [자세히 알아보기](amp-iframe.md#iframe-with-placeholder)
    * 동영상과 포스터는 HTTPS를 통해 제공되어야 합니다.</li>

## 맞춤 도메인에서 광고 게재 <a name="running-ads-from-a-custom-domain"></a>

AMP에서는 내 도메인과 같은 맞춤 도메인에서 광고를 로드하는 데 사용되는 부트스트랩 iframe 로드를 지원합니다.

이 기능을 사용 설정하려면 [remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html) 파일을 웹 서버에 복사하세요. 그런 다음 AMP 파일에 다음 메타 태그를 추가합니다.

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  메타 태그의 `content` 속성은 웹 서버의 remote.html 파일 사본의 절대 URL입니다. 이 URL은 'https' 스키마를 사용해야 하며, AMP 파일과 동일한 원본에 있으면 안 됩니다. 예를 들어 `www.example.com`에 AMP 파일을 호스팅하는 경우 이 URL은 `www.example.com`에 있으면 안 되지만 `something-else.example.com`에 있는 것은 괜찮습니다. iframe에서 허용되는 원본에 대한 자세한 내용은 ['Iframe 원본 정책'](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md)을 참조하세요.

### 보안 <a name="security"></a>

수신 데이터를 `draw3p` 함수에 전달하기 전에 **수신 데이터의 유효성을 검사** 하여 iframe에서 정상적인 작업만 실행하는지 확인합니다. 특히 맞춤 자바스크립트 삽입을 허용하는 광고 네트워크의 경우가 여기에 해당합니다.

또한 iframe은 iframe이 적용될 것으로 예상되는 원본에만 삽입되도록 시행해야 합니다. 원본은 다음과 같아야 합니다.

* 내 원본
* AMP 캐시의 `https://cdn.ampproject.org`

AMP 캐시의 경우 '소스 원본'(cdn.ampproject.org에서 제공한 문서의 원본)이 내 원본 중 하나인지도 확인해야 합니다.

원본 시행은 `draw3p`의 세 번째 인수와 함께 실행될 수 있으며 전체 브라우저 지원을 받으려면 [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) 명령어를 사용해 추가로 실행되어야 합니다.

### 수신 광고 구성 향상 <a name="enhance-incoming-ad-configuration"></a>

완전히 선택사항입니다. 광고 서버로 광고 요청을 하기 전에 광고 요청을 향상하는 것이 바람직한 경우가 있습니다.

광고 네트워크에서 [빠른 가져오기](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad)를 지원하는 경우 [RTC(Real Time Config)](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-documentation.md)를 사용하세요. 예를 들어 DoubleClick과 애드센스 통합에서는 빠른 가져오기와 RTC를 모두 지원합니다.

광고 네트워크에서 지연된 가져오기를 사용하는 경우 [remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html) 파일의 `draw3p` 함수 호출에 콜백을 전달할 수 있습니다. 콜백은 수신 구성을 첫 번째 인수로 받은 다음 다른 콜백을 두 번째 인수(아래 예에서 `done`이라고 불림)로 받습니다. 광고 렌더링을 진행하려면 업데이트된 구성으로 이 콜백을 호출해야 합니다.

예:

```JS
draw3p(function(config, done) {
  config.targeting = Math.random() > 0.5 ? 'sport' : 'fashion';
  // 여기서 실제로 setTimeout을 설정하지는 마세요. 이는 예제로만 사용되어야 하지만
  // done 콜백을 비동기적으로 호출해도 괜찮습니다.
  setTimeout(function() {
    done(config);
  }, 100)
}, ['allowed-ad-type'], ['your-domain.com']);
```

## 스타일 지정 <a name="styling"></a>

`<amp-ad>` 요소는 CSS `position: fixed`가 설정된 컨테이너(`amp-lightbox` 제외)에 포함되거나 배치되지 않을 수 있습니다.
이는 전체 페이지 오버레이 광고가 UX에 미치는 영향 때문이며, 향후 특정 UX 불변 속성을 유지 관리하는 AMP 제어 컨테이너 내에 유사한 광고 형식을 허용하는 것으로 간주될 수 있습니다.

## 확인 <a name="validation"></a>

AMP 유효성 검사기 사양의 [amp-ad 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad/validator-amp-ad.protoascii)을 참조하세요.

## 지원되는 광고 네트워크 <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/main/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/main/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/main/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/main/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/main/ads/adform.md)
* [Adfox](https://github.com/ampproject/amphtml/blob/main/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/main/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/main/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/main/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/main/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/main/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/main/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/main/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/main/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/main/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/main/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/main/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/main/ads/adreactor.md)
* [애드센스](https://github.com/ampproject/amphtml/blob/main/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/main/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/main/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/main/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/main/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/main/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/main/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/main/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/main/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/main/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/main/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/main/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/main/ads/adverticum.md)
* [AdvertServe](https://github.com/ampproject/amphtml/blob/main/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/main/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/main/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/main/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/main/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/main/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/main/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/main/ads/atomx.md)
* [Baidu](https://github.com/ampproject/amphtml/blob/main/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/main/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/main/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/main/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/main/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/main/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/main/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/main/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/main/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/main/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/main/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/main/ads/google/csa.md)
* [CxenseDisplay](https://github.com/ampproject/amphtml/blob/main/ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/main/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/main/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/main/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/main/ads/dotandads.md)
* [DoubleClick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/main/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/main/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/main/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/main/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/main/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/main/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/main/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/main/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/main/ads/freewheel.md)
* [Fusion](https://github.com/ampproject/amphtml/blob/main/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/main/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/main/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/main/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/main/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/main/ads/holder.md)
* [I-Mobile](https://github.com/ampproject/amphtml/blob/main/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/main/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/main/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/main/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/main/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/main/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/main/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/main/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/main/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/main/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/main/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/main/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/main/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/main/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/main/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/main/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/main/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/main/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/main/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/main/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/main/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/main/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/main/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/main/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/main/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/main/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/main/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/main/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/main/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/main/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/main/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/main/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/main/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/main/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/main/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/main/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/main/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/main/ads/onnetwork.md)
* [Open AdStream(OAS)](https://github.com/ampproject/amphtml/blob/main/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/main/ads/openx.md)
* [Pixels](https://github.com/ampproject/amphtml/blob/main/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/main/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/main/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/main/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/main/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/main/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/main/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/main/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/main/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/main/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/main/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/main/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/main/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/main/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/main/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/main/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/main/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/main/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/main/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/main/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/main/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/main/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/main/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/main/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/main/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/main/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/main/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/main/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/main/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/main/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/main/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/main/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/main/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/main/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/main/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/main/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/main/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/main/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/main/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/main/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/main/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/main/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/main/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/main/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/main/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/main/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/main/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/main/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/main/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/main/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/main/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/main/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/main/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/main/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/main/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/main/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/main/ads/yahoojp.md)
* [Yandex](https://github.com/ampproject/amphtml/blob/main/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/main/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/main/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/main/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/main/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/main/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/main/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/main/ads/zucks.md)

## 지원되는 삽입 유형 <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/main/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/main/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/main/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/main/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/main/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/main/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/main/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/main/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/main/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/main/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/main/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/main/ads/zergnet.md)
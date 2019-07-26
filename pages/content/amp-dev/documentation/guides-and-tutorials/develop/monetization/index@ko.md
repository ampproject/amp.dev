---
$title: AMP 페이지에서 광고로 수익 창출하기
---

이 가이드에서는 AMP 페이지에 광고를 게재하기 위한 안내와 권장사항을 제공합니다.

## 페이지에 광고 추가하기

AMP가 아닌 페이지(기존 HTML 페이지)에 광고를 게재하려면 자바스크립트 스니펫을 포함하여 광고 네트워크에서 광고가 게재되도록 해야 합니다.  성능 및 보안상의 이유로 AMP 페이지에는 타사 자바스크립트를 포함할 수 없습니다.  따라서 AMP에 광고를 게재하려면 AMP 페이지에 맞춤 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 구성요소를 추가해야 합니다.

[tip type="success"]

[AMP By Example 라이브 데모]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})에서 AMP 페이지에 amp-ad 태그를 추가하는 방법을 알아보세요.

[/tip]

AMP 페이지에 광고를 게재하기 위해 구성요소를 추가하는 단계를 살펴보겠습니다.

### 1단계: amp-ad 스크립트 추가

`<amp-ad>` 구성요소는 AMP 라이브러리의 맞춤 광고 확장입니다. `<amp-ad>`는 성능 최적화를 위해 특별히 고안된 맞춤 자바스크립트를 기반으로 합니다. `<amp-ad>` 구성요소를 실행하려면 AMP 페이지의 `head` 섹션에 이 구성요소의 필수 자바스크립트를 추가해야 합니다.

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### 2단계: AMP 페이지에 amp-ad 태그 추가

100개가 넘는 [광고 서버와 네트워크]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}})에서는 AMP와의 통합을 기본으로 제공합니다.  광고 네트워크의 광고를 추가하려면 `<amp-ad>` 태그를 추가하고 `type` 속성에 네트워크를 지정하세요.

이 예에서는 a9 네트워크의 광고를 게재하기 위해 광고 슬롯을 추가합니다.

```html
<amp-ad type="a9">
</amp-ad>
```

### 3단계: 광고 단위 크기 지정

`<amp-ad>` 태그에 `width` 및 `height` 속성을 추가합니다.  이 속성은 AMP 페이지의 광고 크기를 지정합니다.

```html hl_lines="2"
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### 4단계: 광고 네트워크 매개변수 설정

각 네트워크에는 광고를 게재하는 데 필요한 특정 데이터 속성이 있습니다.  광고 네트워크의 `<amp-ad>` 문서를 참조하여 필요한 속성을 추가하세요. 다음 예에서 a9 네트워크에서는 광고 크기 및 기타 세부정보를 지정하기 위한 추가 매개변수를 요구합니다.

```html hl_lines="3 4 5"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### 5단계: (선택사항) 자리표시자 지정

광고 네트워크에 따라 광고가 없는 경우 자리표시자를 표시하도록 선택할 수 있습니다. 이렇게 하면 공백을 방지함으로써 사용자 환경이 개선됩니다.  자리표시자를 지정하려면 `placeholder` 속성으로 하위 요소를 추가하세요. [자리표시자 및 대체 동작]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}})에서 자세히 알아보세요.

```html hl_lines="6"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### 6단계: (선택사항) 대체 동작 지정

광고 네트워크에 따라서는 게재할 수 있는 광고가 없는 경우 대체 요소를 표시하도록 선택할 수 있습니다. 대체 동작을 지정하려면 `fallback` 속성으로 하위 요소를 추가하세요. [자리표시자 및 대체 동작]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}})에서 자세히 알아보세요.

```html hl_lines="6"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

축하합니다! 이제 AMP 페이지에 광고가 게재됩니다.

## 직접 판매 AMPHTML 광고 게재

[`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})를 사용하세요.

## 광고 요청의 타겟팅 데이터 보강

빠른 가져오기 게재 메커니즘의 일부로서 RTC(Real-Time Config) 기능을 사용하면 게시자가 런타임 시 가져온 자사 및 타사 타겟팅 정보로 광고 요청을 보강할 수 있습니다. RTC를 사용하면 개별 광고 슬롯의 타겟팅 서버에 최대 5개의 콜아웃이 허용되며, 그 결과는 광고 요청에 추가됩니다.  광고에서 RTC를 사용하려면 사용하는 광고 네트워크에서 RTC와 빠른 가져오기를 지원해야 합니다.

다음 YouTube 동영상에서 RTC를 자세히 알아볼 수 있습니다.

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='헤더 입찰로 효과적인 AMP 수익 창출 동영상 보기']

또는 다음 RTC 참고자료에서 자세히 알아보세요.

*   [AMP RTC 게시자 구현 가이드](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
*   [AMP Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## 권장사항

AMP 페이지의 광고 효과를 극대화하기 위한 팁을 확인해 보세요.

### 게재위치 및 제어: 광고 게재위치 최적화

*   페이지당 최대 수익을 얻으려면 AMP 페이지에 AMP가 아닌 페이지와 **동일한 개수의 광고를 게재**하세요.
*   **첫 번째 표시 영역 바로 아래 첫 번째 광고를 게재**하여('스크롤 해야 볼 수 있는 부분') 최적의 사용자 환경을 제공하세요.
*   고급 CSS 또는 미디어 쿼리를 사용하지 않는 한 **광고 단위가 페이지 가운데 오도록 하여** 사용자에게 최적의 모바일 웹 환경을 제공하세요.
*   AMP 인벤토리에서 [크기가 여러 개인 광고 요청](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests)을 사용 설정하여 광고 입찰 경쟁률을 높이고 수익을 창출하세요.

### 수요 및 가격 책정: 광고에 적절한 가격 책정

*   직접 판매와 간접 판매를 포함한 **모든 영업 채널에서 AMP 페이지의 광고 단위를 판매**하여 AMP 페이지에서 인벤토리의 경쟁을 극대화하세요.
*   AMP가 아닌 페이지의 인벤토리와 유사하게 **AMP 페이지의 광고 인벤토리 가격을 책정**하세요. 실적을 모니터링하고 그에 따라 가격을 조정하세요.
*   **모든 광고 수요 채널이 AMP 페이지의 광고 인벤토리를 놓고 경쟁**하도록 유도하세요.

### 광고 유형: 가장 적절한 유형의 광고 게재

*   [IAB 가이드라인](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf)에 따라 **용량이 큰 광고 소재를 사용하지 마세요**.
*   광고 로드 시 콘텐츠 리플로우를 유발하는 **전면 광고**나 기타 광고 형식을 **사용하지 마세요**.
*   data-loading-strategy를 prefer-viewability-over-views로 설정하여 **조회가능성을 최적화**하세요.
*   [지원되는 플레이어]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}#media) 또는 [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}})을 사용해 **동영상 콘텐츠에 광고를 게재**하여 모든 유형의 콘텐츠에서 수익을 창출하세요.
*   크기가 여러 개인 광고 요청을 사용하여 디스플레이 광고와 경쟁할 **네이티브 광고를 구현**함으로써 수요 압력을 늘리면서 독자에게 우수한 사용자 환경을 제공하세요.

### 혁신: 가장 좋은 성과를 내는 광고 제품 제공

*   **부속 AMP 페이지에 광고를 구현**하여 수익을 늘리세요.
    *   [캐러셀 광고]({{g.doc('/content/amp-dev/documentation/examples/documentation/Carousel_Ad.html', locale=doc.locale).url.path}})
    *   [라이트박스 광고]({{g.doc('/content/amp-dev/documentation/examples/documentation/Lightbox_Ad.html', locale=doc.locale).url.path}})
    *   ... 외 [더보기]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}})
*   **직접 판매 광고를 위한 새로운 형식을 구현**하여 영업팀에서 효과적이고 혁신적인 광고 제품을 활용할 수 있도록 하세요.
    *   [고정 광고]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-sticky-ad.html', locale=doc.locale).url.path}})
    *   [Flying Carpet]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-fx-flying-carpet.html', locale=doc.locale).url.path}})

## 추가 리소스

*   [AMPHTML 광고 템플릿]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}})
*   [데모: AMP 페이지에 `amp-ad`를 추가하는 방법 보기]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})

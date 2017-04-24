---
$title : AMP 페이지 광고 팁
$order : 1
---

### 위치 & 제어: <br /> 광고 위치 최적화하기

- AMP 페이지에서 타게팅, 리포팅 및 제어를 목적으로 **개별 광고 유닛을 만드십시오**
- AMP 페이지에 AMP 페이지가 아닌 페이지와 **동일한 갯수의 광고를 게재** 하여 페이지당 수익을 최대화 하십시오.
- **첫번째 광고를 뷰포트 바로 아래에 두어** ("스크롤 해야 볼 수 있는 부분 아래") 최적의 사용자 경험을 제공하십시오.
- 고급 CSS나 미디어쿼리를 사용하지 않는다면, **광고를 페이지의 중앙에 두어** 유저에게 최적의 모바일 웹 경험을 제공할 수 있습니다.
- AMP 인벤토리에서 **<a href="https://github.com/ampproject/amphtml/tree/master/ads#support-for-multi-size-ad-requests">multi-size ad 요청</a>을 사용하면** 광고 입찰비를 올리고 수익을 높일 수 있습니다.

### 수요 & 가격: <br /> 광고에 적절한 가격을 제시하십시오.

- 직접 판매 및 간접 판매를 비롯한 모든 채널에서 **AMP 페이지의 광고 유닛을 판매하여**, AMP 페이지의 인벤토리 경쟁을 극대화 하십시오. 
- **AMP 페이지의 ad 인벤토리 가격은** AMP가 아닌 페이지의 인벤토리와 비슷합니다. 성능을 모니터링하고 이에 따라 가격을 조정하십시오.
- 경쟁을 촉진하기 위해 AMP 페이지의 모든 ad 인벤토리를 **모든 광고 채널이 경쟁하는 지 확인하십시오.**

### 광고 타입: <br /> 최적의 광고 타입을 제공하십시오

- <a href="http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf">IAB 가이드라인</a>에 따라 **무거운 광고를 피하십시오.**
- 로드 시 콘텐츠 리플로우를 발생하는 다른 광고 포맷이나 **삽입 광고를 피하십시오.**
- 매개변수를 설정하여 **조회가능성을 최적화합니다** :<br /> 
<em>data-loading-strategy = prefer-viewability-over-views</em>
-  [지원되는 플레이어](https://www.ampproject.org/docs/reference/components#media)나 [`amp-iframe`](https://ampbyexample.com/components/amp-iframe/)를 통해 **비디오 콘텐츠에 광고를 게재하면** 모든 타입의 콘텐츠에서 수익을 얻을 수 있습니다.
- **네이티브 광고를 구현하여** 여러 크기의 요청을 사용해 디스플레이 광고와 경쟁하고, 프리미엄 사용자 경험을 제공하여 수요 압력을 추가하십시오.

### 혁신: <br /> 가장 매력적인 광고 제품을 제공하십시오

- **보조 AMP 페이지에 광고를 구현하여** 점진적으로 수익을 창출하십시오:
    - [Ads in your AMP Image Carousel](https://github.com/jasti/amp-ads-testing/blob/master/dfp-amp-testing/amp_tests/amp-carousel-demo.html)
    - [Ads in your AMP Lightbox](https://github.com/jasti/amp-ads-testing/blob/master/dfp-amp-testing/amp_tests/amp-lightbox-demo.html)
- **직접 판매하는 광고의 새로운 포맷을 구현하여** 판매 팀에 효과적이고 혁신적인 광고 제품을 제공하십시오:
    - [Sticky Ads](https://ampbyexample.com/components/amp-sticky-ad/)
    - [Flying Carpet](https://ampbyexample.com/components/amp-fx-flying-carpet/)

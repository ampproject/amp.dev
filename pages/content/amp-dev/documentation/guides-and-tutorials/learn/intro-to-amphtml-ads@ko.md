---
"$title": Intro to AMPHTML ads
"$order": '1'
description: AMPHTML 광고는 웹에서 광고하는 더 빠르고 가볍고 안전한 방법입니다. AMP 페이지는 기존 HTML 광고를 지원하지만 이러한 광고는로드 속도가 느릴 수 있습니다.
formats:
- ads
---

## AMP HTML 광고란 무엇인가요?

AMP HTML 광고는 더 빠르고 가벼우면서 안전한 웹 광고 기법입니다. AMP 페이지에서는 기존의 HTML 광고를 지원하지만, 이러한 광고는 로드 속도가 느릴 수 있습니다. 광고를 나머지 AMP 페이지만큼 빠르게 만들려면 AMP HTML 형식으로 광고를 만들 수 있습니다. AMP HTML 광고는 검사 결과 안전하고 효율적이라고 확인된 경우에만 게재됩니다. 무엇보다 AMP 페이지뿐 아니라 웹상의 어느 곳이든 게재할 수 있습니다.

AMP HTML 광고는 [AMP HTML 광고 사양](a4a_spec.md)(AMP HTML + CSS의 변형)에 따라 AMP HTML 형식으로 작성됩니다. 일반적으로 광고 실적 저하의 가장 큰 원인인 임의의 자바스크립트를 실행하는 기능이 광고에서 더 이상 지원되지 않는다는 의미입니다. 따라서 핵심 AMP와 마찬가지로 AMP 오픈소스 프로젝트에는 핵심 광고 자바스크립트 사용 사례가 포함되어 있어 광고의 정상적인 동작을 보장합니다.

### 이점

기존 광고보다 AMP HTML 광고가 더 효율적인 이유는 무엇인가요?

1. **속도 향상**: AMP HTML 광고는 페이지 렌더링 프로세스 초기에 광고가 요청되고 사용자가 광고를 보기 직전에 바로 표시되므로 속도가 더 빠릅니다. AMP HTML 광고가 파일 크기가 작은 점도 속도 향상에 한몫합니다.
2. **크기 감소**: 일반적으로 AMP HTML 광고 번들에는 광고의 파일 크기를 줄이는 광고 기능이 사용됩니다. 또한 페이지에 게재된 AMP HTML 광고는 리소스를 더 적게 소비합니다. 예를 들어 일반 광고에서는 추적기 10개가 각각 고유 정보를 요청하지만, AMP HTML 광고에서는 모든 데이터를 한 번에 수집하여 개수에 상관없이 필요한 추적기에 배포합니다.
3. **조정 가능**: AMP 페이지에서 [AMP 런타임](spec/amphtml.md#amp-runtime)은 휴대전화의 제한된 리소스를 적합한 구성요소로 시기적절하게 조정하여 최고의 사용자 환경을 제공할 수 있습니다. 예를 들어, 광고가 현재 표시 영역에 나타나지 않을 때는 애니메이션이 포함된 AMP HTML 광고가 일시중지됩니다.
4. **사용자 상호작용 증가**: 사용자는 자신이 볼 수 있는 광고와만 상호작용할 수 있습니다. 광고 속도가 빨라지면 조회가능성이 증가하고 클릭률이 높아져 광고 실적이 향상됩니다.
5. **멀웨어로부터 안전하게 보호**: AMP HTML 광고는 게재되기 전에 확인 절차를 거치므로 AMP HTML을 통해 멀웨어가 확산될 수 없습니다. 따라서 광고주는 안전한 사용자 환경과 긍정적인 브랜드 인식을 확보할 수 있습니다.
6. **높은 유연성**: AMP HTML 광고는 모든 기기뿐만 아니라 AMP와 비 AMP 웹페이지에서도 작동하도록 설계되었습니다.

### 형식

AMP HTML 광고는 유연하고 동적인 데다가 캐러셀, 시차 및 라이트박스 등의 다양한 광고 소재 형식을 허용합니다. [Examples](../../../documentation/examples/index.html)에서 오픈소스 AMP HTML 광고 템플릿을 활용하여 시작해 보세요.

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>캐러셀/td>     </td>
    <td>동영상 시차</td>
    <td>라이트박스</td>
  </tr>
</table>

## AMP HTML 광고의 작동 방식

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='AMP 페이지에 AMP HTML 광고 게재', caption='AMP 페이지에 AMP HTML 광고 게재', align='' ) }}

1. 게시자가 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 태그를 통해 AMP 페이지에 광고 슬롯을 삽입하여 사용하려는 광고 네트워크를 지정합니다.
2. AMP 런타임이 지정된 광고 네트워크에 광고 요청을 보내 광고를 가져옵니다. AMP HTML 광고를 게재할 수 있는 광고 네트워크는 광고 소재를 검사하고 서명하는 [빠른 가져오기 구현](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md)을 지원합니다.
3. 광고 네트워크가 AMP HTML 광고로 응답하고 AMP 런타임이 AMP 페이지에 광고를 렌더링합니다.

[tip type="note"] AMP가 아닌 페이지에 AMPHTML 광고를 게재하기 위해 특별한 통합이 필요하지 않습니다. 광고 네트워크에서 AMPHTML 광고를 지원하는지 확인하세요. [/tip]

## AMP HTML 광고 게재

### 게시자

직접 판매 광고 형식을 AMP HTML로 게재하려면 [AMP HTML 광고 사양](a4a_spec.md)에 따라 광고를 만들고 AMP HTML 광고 게재를 지원하는 광고 서버를 사용하여 광고를 게재해야 합니다.  현재 AMP HTML 광고를 지원하는 광고 서버는 다음과 같습니다.

- DoubleClick for Publishers
- TripleLift
- Dianomi
- Adzerk
- Google 애드센스

간접 채널(예: Exchange, SSP 등)을 통해 AMP HTML 광고를 게재하려면 [이 목록](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)에 있는 지원 광고 네트워크/광고 서버를 사용하세요.

### 광고 회사

광고 회사에서는 [AMP HTML 광고 사양](a4a_spec.md)에 따라 광고를 만들어야 합니다. 아이디어를 얻고 예시를 확인하려면 [Examples](../../../documentation/examples/index.html)의 오픈소스 AMP HTML 광고 템플릿을 참조하세요. 또한 다음 도구 중 하나를 사용하여 AMP HTML 광고를 만들 수도 있습니다.

- [Celtra Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate(*출시 예정*)

### 광고 네트워크/서버

AMP HTML 광고를 AMP 페이지에 게재하려면 네트워크에서 [빠른 가져오기 광고 요청 구현](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) 기능을 사용하는 `amp-ad` 확장자를 만들어야 합니다(없는 경우).  자세한 내용은 [AMP와 통합하여 디스플레이 광고 게재](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md)를 참조하세요.  비 AMP 페이지에 AMP HTML을 게재할 경우 특별한 통합이 필요하지 않습니다.

## AMP HTML 광고 만들기

**처음부터 만들기**: AMP HTML 광고는 [AMP HTML 광고 사양](a4a_spec.md)을 준수해야 합니다.  데모 및 예시를 확인하려면 [AMP by Example](../../../documentation/examples/documentation/amp-ad.html)에서 오픈소스 AMP HTML 광고 템플릿을 확인하세요.

**도구 사용**: 다음 중 원하는 도구를 사용하여 AMP HTML 광고 소재를 만들 수 있습니다.

- [Celtra Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate(*출시 예정*)

### AMP HTML 광고 구문의 유효성 검사

AMP HTML 광고를 만든 후 광고가 적절한 AMP HTML 구문을 사용하는지 확인해야 합니다. 개발 환경에 따라 AMP HTML 광고의 유효성을 검사하는 몇 가지 옵션이 있습니다.

- [AMP 유효성 검사 도구 NPM](https://www.npmjs.com/package/amphtml-validator) 모듈을 사용하여 유효성 검사를 빌드 CI에 통합합니다.
- [AMP 유효성 검사 도구](https://validator.ampproject.org/)를 사용하여 일회성 검사를 실행합니다.
- [Cloudflare](https://blog.cloudflare.com/amp-validator-api/)와 파트너 관계를 맺어 공용 유효성 검사 도구 엔드포인트를 사용합니다.

[tip type="note"] **참고 –** AMP 페이지에서 AMPHTML 광고를 빠르게 렌더링하려면 (즉, Fast Fetch에서 우선 렌더링 사용) 구문이 정확해야합니다. 구문이 유효하지 않은 경우에도 광고가 빠르게 렌더링되지는 않습니다. [/tip]

## RTB의 AMP HTML 광고 지원

실시간 입찰(RTB) 환경에서 AMP HTML 광고를 지원하려는 SSP 및 Ad Exchange의 경우 자세한 내용을 확인하려면 [RTB Ad Exchange를 위한 구현 가이드](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md)를 참조하세요.

## FAQ

#### AMP HTML 광고 샘플을 확인할 수 있나요?

예. [Examples](../../../documentation/examples/index.html)에서 몇 가지 훌륭한 AMP HTML 광고 템플릿을 확인할 수 있습니다. 이러한 샘플은 AMP의 고급 구성요소를 사용합니다.

#### AMP HTML 광고는 타사 인증과 조회가능성 감지 기능을 지원하나요?

예. [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md)를 사용한 인증 및 조회가능성 감지 기능이 기본으로 지원됩니다(예: Google ActiveView의 경우 이 방식으로 통합됨). 또한 MOAT 등의 다른 공급업체도 이 기능을 적극적으로 지원하고 있습니다.

#### AMP HTML 광고는 타임라인 기반 애니메이션을 지원하나요?

예. [`amp-animation`](../../../documentation/components/reference/amp-animation.md)을 참조하세요.

#### 대부분의 광고에는 탭할 수 있는 대상과 설정 가능한 광고 이탈이 있습니다. AMP HTML 광고에도 비슷한 메커니즘이 있나요?

예. [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md)을 참조하세요.

#### 필요한 기능을 찾을 수 없습니다. 어디에 질문하면 되나요?

- AMP 관련 질문의 답변은 [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html)에서 찾아보는 것이 좋습니다. AMP 프로젝트 커뮤니티 구성원이 정기적으로 Stack Overflow를 모니터링하므로 질문을 가장 빠르게 해결할 수 있는 방법입니다.
- [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) 채널에 참여하여 솔루션 및 답변을 확인해 보세요.
- AMP에서 버그가 발생하거나 AMP에 요청할 기능이 있다면 [AMP 문제 신고](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp)에서 문제를 신고하는 방법을 확인하세요.

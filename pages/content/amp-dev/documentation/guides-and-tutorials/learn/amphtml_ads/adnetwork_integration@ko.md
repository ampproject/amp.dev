---
$title: AMP와 통합하여 디스플레이 광고 게재
---

[TOC]

이 가이드는 AMP와 통합하여 디스플레이 광고를 AMP 페이지에 게재하려는 광고 네트워크를 위한 것입니다.

## 개요

광고 서버에서는 AMP와 통합하여 기본 HTML 광고를 AMP 페이지에 게재할 뿐 아니라 [AMP HTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}) 광고를 게재할 수 있습니다.

##### 기본 HTML 광고를 게재하고 싶나요?

1.  [AMP 광고 구현 만들기](#creating-an-amp-ad-implementation)

##### AMP HTML 광고를 게재하고 싶나요?

1. [AMP 광고 구현 만들기](#creating-an-amp-ad-implementation)(예: 기본 HTML 광고를 게재하기 위한 광고 구현을 아직 만들지 않은 경우)
2. [AMP HTML 광고 게재를 위한 빠른 가져오기 통합 만들기](#creating-a-fast-fetch-integration)


## AMP 광고 구현 만들기

광고 서버로서 지원되는 게시자는 제공된 JavaScript 라이브러리를 포함하며, JavaScript 라이브러리를 사용하여 광고를 가져온 다음 게시자의 웹사이트에 렌더링하는 다양한 '광고 스니펫'을 배치합니다. 게시자는 AMP를 사용하여 임의의 JavaScript를 실행할 수 없으므로 AMP 오픈소스 코드를 작성하여 [`AMP 광고`](/ko/docs/reference/components/amp-ad.html) 태그를 통해 광고 서버에서 광고를 요청하도록 허용해야 합니다.

[tip type="note"]

이 AMP 광고 구현을 사용하여 기본 HTML 광고 **및** AMP HTML 광고를 표시할 수 있습니다.

[/tip]


예를 들어, 다음 구문을 사용하여 Amazon A9 서버를 호출할 수 있습니다.

```html
<amp-ad width="300" height="250"
    type="a9"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

위의 코드에서 `type` 속성은 광고 네트워크(이 경우 A9)를 지정합니다. `data-*` 속성은 Amazon A9 서버에서 광고를 제공하는 데 필요한 매개변수에 따라 달라집니다. [`a9.js`](https://github.com/ampproject/amphtml/blob/master/ads/a9.js) 파일에서는 매개변수를 매핑하여 A9 서버의 URL에 대한 JavaScript 호출을 생성하는 방법을 보여줍니다. AMP 광고 태그에 의해 전달되는 해당 매개변수는 광고를 반환하는 URL에 추가됩니다.

`AMP 광고` 통합을 만드는 방법은 [AMP에 광고 네트워크 통합](https://github.com/ampproject/amphtml/blob/master/ads/README.md)을 참조하세요.

## 빠른 가져오기 통합 만들기

[빠른 가져오기](/latest/blog/even-faster-loading-ads-in-amp/)는 광고 요청을 광고 응답과 분리하는 AMP 메커니즘으로, 광고 요청이 페이지 수명주기의 초기에 발생하고 사용자가 원하는 경우에만 광고를 렌더링하도록 해줍니다. 빠른 가져오기는 기본 HTML 광고보다 확인된 AMP HTML 광고를 처리하는 데 주로 사용됩니다. 빠른 가져오기 내에서 광고 유효성 검사에 실패한 경우 해당 광고는 교차 도메인 iframe으로 래핑 되어 나머지 AMP 문서에서 샌드박스로 전송됩니다. 반대로 유효성 검사를 통과한 AMP HTML 광고는 페이지에 직접 기록됩니다. 빠른 가져오기에서는 AMP 광고와 AMP가 아닌 광고를 모두 처리하므로 유효성 검사에 실패한 광고에 대한 추가 광고 요청이 필요하지 않습니다. 

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='빠른 가져오기 통합 흐름', caption='빠른 가져오기 통합 흐름' ) }}

광고 서버에서 AMP HTML 광고를 게재하려면 다음을 포함하는 빠른 가져오기 통합을 제공해야 합니다.

1.  SSL 네트워크 통신 지원
1.  광고 요청을 작성하는 JavaScript 제공(예제 구현: [애드센스](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) 및 [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl))
1.  유효성 검사 서비스를 통한 광고 소재 유효성 검사 및 서명. [Cloudflare](https://blog.cloudflare.com/firebolt/)는 AMP 광고 확인 서비스를 제공하여, 독립 광고 제공업체에서 더 빠르고, 가볍고, 참여가 높은 광고를 게재할 수 있도록 지원합니다.

빠른 가져오기 통합을 생성하는 방법은 [빠른 가져오기 네트워크 구현 가이드](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md)를 참조하세요. 


## 관련 리소스

*   [모든 AMP 광고 확장에 대한 GitHub 디렉토리](https://github.com/ampproject/amphtml/tree/master/ads)
*   [지원되는 광고 공급업체 목록]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}})
*   [빠른 가져오기 출시 관련 블로그 항목](/latest/blog/even-faster-loading-ads-in-amp/)
 

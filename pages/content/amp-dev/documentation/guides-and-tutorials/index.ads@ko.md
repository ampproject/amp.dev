---
$title: AMP 광고 소개
---

AMP 프로젝트의 목표는 웹페이지를 빠르게 제공함으로써 사용자의 목적을 달성하는 데 도움이 되는 것입니다. AMP에 광고를 게재하면 사용자에게 빠르고 안전하며 설득력 있고 효과적으로 광고를 제공함으로써 똑같은 목적을 달성할 수 있습니다. 그 원리가 무엇일까요?  

광고를 AMP 페이지에 게재하는 것은 기존과 같이 광고를 HTML 페이지에 게재하는 것과 큰 차이가 없습니다.

{{ image('/static/img/docs/ads/ads_in_amp.svg', 647, 263, alt='AMP 페이지에 광고 게재', align='' ) }}

1.  AMP 페이지를 시작하면 게시자가 페이지에서 광고를 표시할 슬롯을 만듭니다. 기존에는 이를 위해 JavaScript 코드를 삽입했지만, AMP에서는 게시자가 특정 광고 네트워크의 AMP 페이지에 [`<amp-ad>`](/ko/docs/reference/components/amp-ad.html) 태그를 추가합니다. 자세한 내용은 [AMP 페이지에서 광고로 수익 창출]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}}) 가이드를 참조하세요.

2.  사용자가 AMP 페이지를 로드하면 `<amp-ad>` 태그에서 광고 네트워크에 광고 요청을 보냅니다. 광고 네트워크에서는 광고를 AMP 페이지에 반환하기 위해 `amp-ad` 구현을 작성합니다. 자세한 내용은 [AMP에 광고 네트워크 통합](https://github.com/ampproject/amphtml/blob/master/ads/README.md) 가이드를 참조하세요.

3.  광고 네트워크에서는 광고주가 만든 광고 소재를 공급합니다. 광고주는 기존 HTML을 사용하거나 새로운 [AMP HTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}) 형식으로 광고 소재를 작성할 수 있습니다. 

## 지원되는 광고 네트워크

AMP는 다양한 [광고 서버 및 네트워크]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}})를 지원합니다.

[tip type="note"]
광고 기술을 AMP와 통합하려고 하시나요? 이 [가이드라인]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/integration-guide.md', locale=doc.locale).url.path}})을 참조하세요.
[/tip]

## 지원되는 광고

AMP에서는 기존 광고는 물론이고 더 빠르고 안전한 AMP HTML 광고도 지원합니다.  어떻게 작성되었는지에 관계없이 AMP 페이지 광고는 외부 리소스와 비슷하며 동일한 [AMP의 모든 리소스에 적용되는 제약 조건](/learn/about-how/)을 준수해야 합니다.   AMP 광고 요구 사항에 관한 자세한 내용은 [이 가이드](https://github.com/ampproject/amphtml/blob/master/ads/README.md#constraints)를 참조하세요.

## AMP HTML 광고로 광고 속도 향상

AMP HTML 광고는 더 빠르고, 가볍고, 안전한 웹 광고 방식입니다. AMP 페이지에서는 기존 HTML 광고를 지원하지만 이러한 광고는 로드 속도가 느릴 수 있습니다. AMP HTML 형식으로 광고를 만들면 광고를 AMP 페이지의 나머지 부분만큼 빠르게 로드되도록 할 수 있습니다. AMP HTML 광고는 유효성을 검사하여 멀웨어가 없는 것으로 확인된 경우에만 게재됩니다. 무엇보다 AMP HTML 광고는 AMP 페이지뿐 아니라 웹 어디에나 게재될 수 있습니다.

AMP HTML 광고에 관한 자세한 내용은 [AMP HTML 광고]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}) 가이드를 참조하세요.


## 시작하기

AMP에서 광고를 시작하려면 다음 리소스를 참조하세요.

* [AMP 페이지에서 광고로 수익 창출]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}})
* [AMP와 통합하여 디스플레이 광고 게재]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/adnetwork_integration.md', locale=doc.locale).url.path}})
* [AMP HTML 광고]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}})
 

---
"$title": AMPHTML 광고 제작하기
description: 이번 튜토리얼에서는 AMP 및 비 AMP 페이지에서 지원되는 AMPHTML 광고를 처음부터 제작하는 방법을 알아봅니다.
formats:
- ads
---

{{ image('/static/img/docs/ads/amp-ad-framed-final.png', 597, 1240, align='right third', caption='Completed AMPHTML image ad') }}

이번 튜토리얼에서는 AMP 및 비 AMP 페이지에서 지원되는 [AMPHTML](../../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md) 광고를 처음부터 제작하는 방법을 알아봅니다. 이 튜토리얼에 사용된 광고 유형은 단순한 이미지 광고입니다.

AMPHTML 광고는 기존의 HTML 광고와 유사하지만 기존 HTML로 코딩되는 대신 [AMPHTML 광고 사양](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md)에 따라 AMPHTML로 코딩되어 있습니다. AMPHTML로 광고를 제작하면 AMP 페이지에서 활용되는 동일한 최적화 및 퍼포먼스의 이점을 누릴 수 있으며 더 빠르고, 더 가벼우며 안전한 방식으로 웹 광고를 제작할 수 있습니다. 무엇보다도 *AMP 페이지만이 아닌* 웹 어디서든 광고를 표시할 수 있어 좋습니다.

## 학습 내용:

- [AMPHTML 광고 사양](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md)에 따라 유효한 AMPHTML 광고 생성
- [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 컴포넌트를 사용하여 광고 뷰 추적
- [AMP 검사기](https://validator.ampproject.org/#htmlFormat=AMP4ADS)로 AMPHTML 광고 구문 검사

## 선행 요건:

- HTML, CSS 및 JavaScript 기본 지식
- 원하는 브라우저 및 텍스트 에디터

[tip] *처음부터 제작하는 건 별로인가요?*  그렇다면 다음 도구 중 하나를 사용하여 AMPHTML 광고를 제작해 보세요.

- [Celtra Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate(*곧 지원 예정*) [/tip]

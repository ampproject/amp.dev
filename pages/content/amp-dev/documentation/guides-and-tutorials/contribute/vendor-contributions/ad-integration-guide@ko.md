---
'$title': 광고 기술을 AMP에 통합하기
$order: 3
formats:
  - ads
teaser:
  text: AMP HTML 통합을 고려하는 광고 기술 제공업체라면 아래 가이드라인을 확인해 보세요
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

AMP HTML 통합을 고려하는 광고 기술 제공업체라면 아래 가이드라인을 확인해 보세요. 최소 지연 시간과 높은 품질을 확보하려면 AMP 오픈소스 프로젝트에 Pull 요청을 제출하기 전 [이곳](https://github.com/ampproject/amphtml/blob/master/ads/../3p/README.md#ads)에 열거된 지침을 따르시는 편이 좋습니다. AMP 기여 방법과 관련한 일반 가이드는 [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/ads/../CONTRIBUTING.md) 페이지를 참조하세요.

## 광고 서버<a name="ad-server"></a>

_예시: DFP, A9_

광고 서버로서 귀사의 지원을 받는 퍼블리셔는 귀사에서 제공한 JavaScript 라이브러리를 다양한 "광고 코드 조각"을 배치합니다. 이러한 코드 조각이 광고를 가져와 퍼블리셔 웹사이트에 렌더링하는 데 JavaScript 라이브러리가 사용됩니다.

퍼블리셔가 임의의 JavaScript를 실행하는 것은 AMP에서 허용되지 않으므로 `amp-ad` 태그로 광고 서버의 광고를 요청하려면 AMP 오픈소스 코드에 기여해야 합니다.

예시: Amazon A9 서버는 다음 구문을 통해 호출할 수 있습니다.

[sourcecode:html]
<amp-ad
width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302"

> </amp-ad>
> [/sourcecode]

`type` 다음의 각 속성은 Amazon A9 서버에서 광고를 전달하는 데 필요한 매개변수에 종속된다는 점에 유의하세요. [a9.js](https://github.com/ampproject/amphtml/blob/master/ads/./a9.js) 파일은 `https://c.amazon-adsystem.com/aax2/assoc.js` URL을 통해 A9 서버를 호출하는 JavaScript 호출을 생성하고자 매개변수가 매핑된 방식을 보여줍니다. AMP 광고 태그로 전달되는 관련 매개변수는 URL에 추가되어 광고를 반환합니다.

광고 네트워크를 AMP와 통합하는 방식을 자세히 알아보려면 [광고 네트워크를 AMP에 통합](https://github.com/ampproject/amphtml/blob/master/ads/README.md) 페이지를 참조하세요.

## SSP(Supply Side Platform) 또는 광고 거래 <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

_예시: Rubicon, Criteo OR Appnexus, Ad-Exchange_

퍼블리셔의 웹페이지에서 바로 호출되길 원하는 판매측 플랫폼의 경우 광고 서버와 통합 시 상단에 명시된 동일한 지침을 따라야 합니다. 고유한 `type` 값을 amp-ad 태그에 추가하면 태그가 퍼블리셔에 바로 배포될 수 있어 퍼블리셔는 AMP 페이지에 태그를 직접 삽입할 수 있습니다.

보다 일반적으로 SSP는 퍼블리셔와 협업을 통해 SSP광고 태그를 광고 서버에 전달합니다. 이런 경우 광고 서버의 광고에서 스크립트로 로드되는 모든 애셋이 HTTPS로 전환되어야 합니다. 확장형 광고와 같은 광고 형식에는 일부 제한이 있으므로 퍼블리셔에 가장 일반적으로 전달되는 광고 형식을 시도하시길 권장합니다.

## 광고 대행사 <a name="ad-agency"></a>

_예시: Essence, Omnicom_

퍼블리셔와 협업을 통해 귀사에서 개발하는 광고의 AMP 호환성을 보장합니다. 모든 광고는 호출 시 광고 크기가 결정되는 iframe으로 제공되므로 광고가 iframe 크기를 수정하지 않도록 주의해야 합니다.

광고의 일부인 모든 애셋은 HTTPS를 통해 요청되어야 합니다. 현재 일부 광고 형식은 완벽히 지원되지 않으므로 AMP 환경에서 광고를 테스트하는 편이 좋습니다. 예시로는 리치 미디어 확장형 광고, 전면 광고, 페이지 레벨 광고 등이 있습니다.

## 동영상 플레이어 <a name="video-player"></a>

_예시: Brightcove, Ooyala_

일반 HTML 페이지에서 작동하는 동영상 플레이어는 AMP에서 지원되지 않으므로 AMP Runtime에서 플레이어를 로드할 수 있도록 특정 태그가 생성되어야 합니다. Brightcove는 미디어 및 광고를 AMP 페이지에서 플레이할 수 있도록 사용자 지정 [amp-brightcove](https://github.com/ampproject/amphtml/blob/master/extensions/amp-brightcove/amp-brightcove.md) 태그를 생성했습니다.

다음 코드를 통해 Brightcove 플레이어를 호출할 수 있습니다.

[sourcecode:html]
<amp-brightcove
data-account="1290862519001"
data-video-id="ref:amp-docs-sample"
data-player="S1Tt8cgaM"
layout="responsive"
width="480"
height="270"

> </amp-brightcove>
> [/sourcecode]

Brightcove와 같은 AMP 태그를 개발하는 방법은 다음 [Pull 요청](https://github.com/ampproject/amphtml/pull/1052)을 참조하세요.

## 동영상 광고 네트워크 <a name="video-ad-network"></a>

_예시: Tremor, Brightroll_

동영상 광고 네트워크의 경우 퍼블리셔와 협업하여,

- 모든 동영상 애셋이 HTTPS를 통해 제공되도록 합니다
- 퍼블리셔의 동영상 플레이어에서 AMP 지원을 제공합니다

## 데이터 관리 플랫폼(DMP) <a name="data-management-platform-dmp"></a>

_예시: KRUX, Bluekai_

[사용자 지정 광고 구성을 개선하는 방법](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration)을 확인하세요.

사용자 쿠키에서 확보한 잠재 고객 세그먼트를 광고 호출로 전달하는 방식으로 유사한 접근법을 활용해 광고 호출을 개선할 수 있습니다.

## 광고 조회 가능성 제공업체<a name="viewability-provider"></a>

_예시: MOAT, Integral Ad Science_

일반적으로 광고 제회 가능성 제공업체는 광고 서버의 광고 래퍼를 통해 퍼블리셔와 통합됩니다. 이런 경우 광고 래퍼가 모든 애셋을 HTTPS로 로드해야 합니다.

예를 들어 MOAT의 경우 `http://js.moatads.com`이 `https://z.moatads.com`으로 전환됩니다.

또한 [Intersection Observer 패턴](https://github.com/ampproject/amphtml/blob/master/ads/README.md#ad-viewability)을 활용한 접근법도 참조하세요.

## 콘텐츠 추천 플랫폼 <a name="content-recommendation-platform"></a>

_예시: Taboola, Outbrain_

이 접근법은 현재 퍼블리셔 웹사이트에 JavaScript가 임베드된 경우 유용하지만 AMP 페이지에서 작동하지 않습니다. AMP 페이지에서 콘텐츠를 추천하려면 [`amp-embed` 확장 프로그램](https://amp.dev/documentation/components/amp-ad)을 활용하여 콘텐츠 디테일을 요청하는 편이 권장됩니다. [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md) 예시를 확인해 보세요.

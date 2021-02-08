---
'$title': 확장형 AMP 컴포넌트 추가
$order: 2
description: AMP 컴포넌트 시스템을 이용하면 최소한의 노력으로 기사에 효율적인 반응형 기능을 빠르게 구성할 수 있습니다. AMP HTML 라이브러리의 AMP 컴포넌트는 3가지로 분류됩니다...
---

AMP의 컴포넌트 시스템을 이용하면 최소한의 노력으로 기사에 효율적인 반응형 기능을 빠르게 구성할 수 있습니다. AMP HTML 라이브러리의 AMP 컴포넌트는 3가지로 분류됩니다.

- **기본 제공**: 기본 AMP JavaScript 라이브러리(`<head>` 태그에 지정)에 포함된 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 및 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 등의 컴포넌트입니다. 이러한 컴포넌트는 AMP 문서에서 즉시 사용할 수 있습니다.

- **확장형**: 기본 라이브러리의 확장형이며, 사용자 지정 요소로 문서에 명시적으로 포함되어야 합니다. 사용자 지정 요소의 경우 특정 스크립트를 `<head>` 섹션에 추가해야 합니다(예: `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **실험용**: 이미 출시되었지만 아직 폭넓게 사용할 수 없는 컴포넌트입니다. 개발자는 실험용 컴포넌트가 완전히 출시되기 전에 이러한 기능을 사용할 수 있습니다. [실험적 기능](../../../../documentation/guides-and-tutorials/learn/experimental.md)에서 자세히 알아보세요.

예시에서 기본 제공 컴포넌트인 [`amp-img`](../../../../documentation/components/reference/amp-img.md)가 이미 사용되었으며 <a class="" href="https://gitlocalize.com/repo/4863/ko/pages/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md">"HTML를 AMP로 변환"</a> 가이드를 통해 해당 컴포넌트가 AMP 레이아웃 시스템과 어떤 관련이 있는지 살펴보았습니다. 이제 자주 사용되는 **확장형** AMP 컴포넌트를 뉴스 기사에 추가해보겠습니다.

## 광고로 수익 창출

AMP 광고는 [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 컴포넌트를 사용하여 구성합니다. [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 컴포넌트를 사용하면 너비, 높이, 레이아웃 모드 등 여러 가지 방법으로 광고를 구성할 수 있습니다. 그러나 많은 광고 플랫폼에는 추가 구성이 필요합니다. 예를 들면 광고 네트워크의 계정 ID, 게재할 광고, 광고 타겟팅 옵션 등이 요구됩니다. 이러한 옵션은 [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 컴포넌트에 HTML 속성으로 간단하게 지정할 수 있습니다.

다음 **DoubleClick** 광고의 예시를 살펴보세요.

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static"
>
</amp-ad>
```

보시다시피 구성이 매우 단순합니다. `type` 속성에서 사용하려는 광고 플랫폼의 [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 컴포넌트를 알 수 있습니다. 이 예제에서는 [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md) 플랫폼을 사용할 것이므로 값으로 `doubleclick`을 지정했습니다.

`data-slot` 속성은 더 특별합니다. [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)에서 `data-`로 시작하는 모든 속성은 공급업체별 속성입니다. 즉, 모든 공급업체가 해당 속성을 요구하는 것은 아니며, 관련 속성이 제공된 경우에도 응답하지 않을 수 있습니다. 위의 **DoubleClick** 예시와 다음 [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md) 플랫폼의 테스트 광고를 비교하여 살펴보겠습니다.

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

위의 두 예제를 모두 기사의 `<header>` 태그 바로 뒤에 **추가**해 보세요.

핵심 AMP 라이브러리 JavaScript 파일에 모든 컴포넌트가 포함된 것은 아니라는 점을 기억하세요. 광고 컴포넌트에 JavaScript 요청을 추가해야 합니다.

`<head>` 태그에 아래 스크립트를 <strong>추가</strong>하세요.

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

페이지를 <strong>새로고침</strong>하면 테스트 광고 두 개가 표시됩니다.

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"] <strong>중요 –</strong> 개발자 콘솔에서 <code>Mixed Content</code> 또는 <code>XMLHttpRequest cannot load</code> 등의 오류가 발생할 수 있습니다. <code>Mixed Content</code> 오류는 A9 광고와 관련되었을 가능성이 높으며 로드된 콘텐츠 중 안전하지 않은 콘텐츠가 있기 때문에 발생합니다. AMP로 광고를 게재할 때 항상 이러한 오류를 주의해야 합니다. [/tip]

아래 두 개의 <a><code>amp-ad</code></a>를 통해 <a><code>amp-ad</code></a>에서 광고 플랫폼 기능을 지원하도록 제공되는 유연성을 확인할 수 있습니다. 이 예시의 경우 DoubleClick의 대시보드를 사용하여 특정 국가에서만 표시되는 두 개의 DoubleClick 테스트 광고를 구성했습니다. 첫 번째 광고는 영국에서만 표시되며 두 번째 광고는 미국에서만 표시됩니다. 앞서 추가한 광고 아래에 AMP 문서의 두 가지 지역 타겟팅 광고 구성을 <strong>추가</strong>해 보세요.

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk"
>
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us"
>
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

페이지를 <strong>새로고침</strong>하고 확인해 보세요. 다음 스크린샷은 캐나다에서 캡처하였으며, 두 광고 모두 로드되지 않습니다.

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] <strong>참고 –</strong> 이 [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 태그 내에 <code>fallback</code>이라는 속성이 있는 <code>div</code> 태그가 추가되었음을 알 수 있습니다. <code>fallback</code> 속성이 무엇을 의미하는지 짐작할 수 있으신가요? 이 속성은 상위 요소가 로드되지 않았을 때 이 속성의 콘텐츠만 표시하도록 AMP의 로딩 시스템에 알려줍니다. <a class="" href="https://gitlocalize.com/repo/4863/ko/pages/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md">플레이스홀더 및 대체 콘텐츠</a> 문서를 통해 자세히 알아보세요. [/tip]

[tip type="read-on"] <strong>읽어보기 –</strong> 지원되는 최신 광고 네트워크를 확인하려면 <a><code>amp-ad</code></a> 컴포넌트 참조 문서를 읽어보세요. [/tip]

[tip type="note"] <strong>참고 –</strong> 광고 네트워크에서 제공하는 JavaScript는 AMP 문서 내에서 실행할 수 없습니다. AMP 런타임은 대신 iframe 샌드박스를 통해 다른 출처의 iframe을 AMP 문서로 로드하고 iframe 샌드박스 내에서는 광고 네트워크의 JS를 실행합니다. [/tip]

이제 AMP 문서에 텍스트, 이미지 및 페이지에 삽입된 광고가 포함되어 있습니다. 모두 스토리를 전달하고 콘텐츠로 수익을 창출하는 데 중요한 요소입니다. 그러나 오늘날의 많은 웹사이트는 사진이나 텍스트 외에도 다양한 기능을 포함합니다.

지금부터는 아래와 같이 뉴스 기사에서 자주 볼 수 있는 다양한 고급 웹 기능을 추가해 AMP 문서를 한 단계 발전시켜 보겠습니다.

- YouTube 동영상
- 트윗
- 기사 인용

## YouTube 동영상 삽입

문서에 YouTube 동영상을 삽입해 보겠습니다. AMP 문서의 <code><header></code> 바로 뒤(앞서 추가한 <a><code>amp-ad</code></a> 위)에 다음 코드를 <strong>추가</strong>하세요.

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270"
>
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

페이지를 <strong>새로고침</strong>하면 동영상 대신 <em>“동영상을 로드할 수 없습니다.”</em>라는 메시지가 표시됩니다.

이 오류 메시지는 브라우저에서 문제없이 YouTube 동영상을 표시할 수 있더라도 표시됩니다. 이유가 무엇일까요? 동영상을 로드하지 못한 것이 아니라 컴포넌트 자체를 로드하지 못했기 때문입니다.

핵심 AMP 라이브러리 JavaScript 파일에 모든 컴포넌트가 포함된 것은 아니라는 점을 기억하세요. YouTube 컴포넌트에 JavaScript 요청을 추가해야 합니다.

[tip type="note"] <strong>참고 –</strong> 아직 개발자 콘솔이 열려 있고 URL에 `#development=1`이 포함된 경우, 해당 시점에 <a><code>amp-youtube</code></a> JavaScript를 추가하라는 AMP 검사기 오류와 추가할 <code>script</code> 태그를 확인할 수 있는 문서 링크가 표시됩니다. [/tip]

<code><head></code> 태그에 아래 스크립트를 <strong>추가</strong>하세요.

```html
<script
  async
  custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
></script>
```

페이지를 <strong>새로고침</strong>하면 YouTube 동영상이 표시됩니다.

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

페이지의 다른 요소와 마찬가지로, AMP 레이아웃 시스템이 가로세로 비율을 계산할 수 있도록 동영상의 <code>width</code>와 `height`를 지정했습니다. 또한, 동영상이 상위 요소의 너비에 맞도록 <code>layout</code>을 <code>responsive</code>로 설정했습니다.

YouTube 동영상 삽입과 관련한 자세한 정보는 [`amp-youtube`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks) 컴포넌트 문서를 읽어보세요. 추가 동영상 및 미디어 컴포넌트는 <a>미디어 AMP 컴포넌트 목록</a>에서 확인할 수 있습니다.

[tip type="tip"] <strong>팁 –</strong> 컴포넌트가 로드되지 않거나 브라우저에서 컴포넌트가 지원되지 않으면 [`fallback`](../../../../documentation/components/reference/amp-twitter.md) 속성을 사용하여 사용자에게 알려야 합니다. [/tip]

## 트윗 표시

사전에 서식이 지정된 Twitter 트윗을 삽입하는 기능은 뉴스 기사에서 널리 활용됩니다. <a><code>amp-twitter</code></a> 컴포넌트로 이 기능을 간편하게 사용할 수 있습니다.

먼저 문서의 <code><head></code> 태그에 다음 JavaScript 요청을 추가합니다.

```html
<script
  async
  custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
></script>
```

이제 다음 코드를 기사에 <strong>추가</strong>하여 트윗을 삽입합니다.

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985"
></amp-twitter>
```

<code>data-tweetid</code> 속성은 특정 플랫폼에 필요한 사용자 지정 속성의 또 다른 예입니다. 이 예시의 경우 Twitter에서 <code>data-tweetid</code> 속성의 값을 특정 트윗으로 연결합니다.

브라우저를 <strong>새로고침</strong>하고 페이지를 보면 트윗이 표시됨을 확인할 수 있습니다.

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

Twitter 트윗을 삽입하는 방법을 자세히 알아보려면 [<code>amp-twitter</code>](../../../../documentation/components/index.html) 컴포넌트 문서를 읽어보세요.

[tip type="tip"] <strong>팁 –</strong> AMP는 소셜 네트워크의 콘텐츠를 삽입에 필요한 다양한 컴포넌트를 제공합니다. 최신 <a class="" href="https://gitlocalize.com/repo/4863/ko/pages/content/amp-dev/documentation/components/index.html#social">소셜 AMP 컴포넌트</a> 문서를 참조하세요. [/tip]

## 기사 인용문 강조 표시

뉴스 기사에서 널리 사용되는 기능 중 하나는 기사 내의 텍스트에서 흥미로운 부분을 강조 표시하는 기능입니다. 예를 들어 특정 출처에서 참조한 인용문이나 중요한 사실을 큰 글꼴로 여러 번 표시하여 독자의 관심을 유도할 수 있습니다.

그러나 텍스트 조각은 길이가 제각각이기 때문에 큰 글꼴 크기와 페이지에서 텍스트가 차지하는 공간의 균형을 맞추기 어려울 수 있습니다.

AMP는 이러한 상황을 위해 특별히 제작된 <a><code>amp-fit-text</code></a> 컴포넌트를 제공합니다. <a><code>amp-fit-text</code></a> 컴포넌트를 통해 고정된 너비 및 높이 요소와 최대 글꼴 크기를 정의할 수 있습니다. 이 컴포넌트를 활용하면 텍스트가 허용되는 너비 및 높이에 맞도록 글꼴 크기를 스마트하게 <strong>조정</strong>할 수 있습니다.

직접 해보겠습니다. 먼저 <code><head></code> 태그에 컴포넌트 라이브러리를 <strong>추가</strong>합니다.

```html
<script
  async
  custom-element="amp-fit-text"
  src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"
></script>
```

페이지에 다음 코드를 추가합니다.

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

페이지를 <strong>새로고침</strong>하고 결과를 확인해 보세요.

이번에는 다른 실험을 해 보겠습니다. 인용문이 훨씬 짧으면 어떻게 될까요?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

인용문이 길 때는 어떻게 될까요?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  And the Raven, never flitting, still is sitting, still is sitting. On the
  pallid bust of Pallas just above my chamber door; And his eyes have all the
  seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming
  throws his shadow on the floor; And my soul from out that shadow that lies
  floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

[`amp-fit-text`](../../../../documentation/examples/documentation/amp-fit-text.html)를 이용한 마지막 실험에서는 "Hello"와 같이 짧은 텍스트의 높이를 훨씬 높은 값으로(예: 400) 설정하고 max-font-size 속성값은 42로 유지해 보겠습니다. 결과 페이지가 어떻게 표시될까요? 텍스트가 세로로 가운데 정렬되나요? 아니면 <a><code>amp-fit-text</code></a> 태그의 높이가 최대 글꼴 크기에 맞게 축소되나요? 직접 코드를 수정하여 확인하기 전에 AMP의 레이아웃 시스템에 관해 이미 알고 있는 지식을 활용하여 질문에 답해보세요.

[예제로 학습하는 AMP 라이브 데모](../../../../documentation/examples/documentation/amp-fit-text.html)를 통해 [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md)에 대해 자세히 알아볼 수 있습니다.

---
$title: 확장 AMP 구성요소 추가
---

AMP의 구성요소 시스템을 이용하면 최소한의 노력으로 기사에 효율적인 반응형 기능을 빠르게 빌드할 수 있습니다. AMP HTML 라이브러리의 AMP 구성요소는 3가지입니다.

- **기본 제공**: 기본 AMP 자바스크립트 라이브러리(`<head>` 태그에 지정됨)에 포함된 [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) 및 [`amp-pixel`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-pixel.md', locale=doc.locale).url.path}}) 등의 구성요소입니다.  이러한 구성요소는 AMP 문서에서 즉시 사용할 수 있습니다.

- **확장**: 기본 라이브러리의 확장이며, 맞춤 요소로 문서에 명시적으로 포함되어야 합니다.  맞춤 요소의 경우 특정 스크립트를 `<head>` 섹션에 추가해야 합니다(예: `<script async custom-element="amp-video" ...`).

- **실험용**: 이미 출시되었지만 아직 폭넓게 사용할 수 없는 구성요소입니다. 개발자는 실험용 구성요소가 완전히 출시되기 전에 이러한 기능을 사용할 수 있습니다.  [실험 기능]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/experimental.md', locale=doc.locale).url.path}})에서 자세히 알아보세요.

Google의 샘플에서는 이미 기본 제공 구성요소인 [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) 가이드에서는 이 구성요소가 AMP 레이아웃 시스템과 어떤 관련이 있는지 살펴보았습니다.  이제 자주 사용되는 **확장** AMP 구성요소를 뉴스 기사에 추가해 보겠습니다.

## 광고로 수익 창출하기

AMP 광고는 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 구성요소를 사용하여 구성합니다. [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 구성요소를 사용하면 너비, 높이, 레이아웃 모드 등 여러 가지 방법으로 광고를 구성할 수 있습니다. 그러나 많은 광고 플랫폼에는 추가 구성이 필요합니다. 예를 들면 광고 네트워크의 계정 ID, 게재할 광고, 광고 타겟팅 옵션 등이 요구됩니다. 이러한 옵션은 HTML 속성으로 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 구성요소에서 간단하게 지정할 수 있습니다.

다음 **DoubleClick** 광고의 예시를 살펴보세요.

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

보시다시피 구성이 매우 단순합니다. `type` 속성에서 사용하려는 광고 플랫폼의 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 구성요소를 알 수 있습니다. 이 예제에서는 [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md) 플랫폼을 사용할 것이므로 값으로 `doubleclick`을 지정했습니다.

`data-slot` 속성은 더 특별합니다. [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})에서 `data-`로 시작하는 모든 속성은 공급업체별 속성입니다. 즉, 모든 공급업체에 이 속성이 있어야 하는 것은 아니며, 관련 속성이 제공되었어도 응답하지 않을 수 있습니다. 예를 들어 위의 **DoubleClick** 예시와 다음 [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md) 플랫폼의 테스트 광고를 비교해 보겠습니다.

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302">
</amp-ad>
```

위의 두 예제를 모두 기사의 `<header>` 태그 바로 뒤에 **추가**해 보세요. 그런 다음 페이지를 **새로고침**하면 두 개의 테스트 광고가 표시됩니다.

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"]
개발자 콘솔에서 `Mixed Content` 또는 `XMLHttpRequest cannot load` 등의 오류가 생길 수 있습니다. `Mixed Content` 오류는 A9 광고와 관련이 있을 수 있으며 로드된 모든 콘텐츠가 안전하지 않기 때문에 생깁니다. 이러한 사항은 AMP에 광고를 게재할 때 항상 주의해야 합니다.
[/tip]

아래 두 개의 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})를 통해 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})에서 광고 플랫폼 기능을 지원할 수 있도록 제공하는 유연성의 예를 확인할 수 있습니다.  여기에서는 DoubleClick의 대시보드를 사용하여 특정 국가에서만 표시되는 두 개의 DoubleClick 테스트 광고를 구성했습니다. 첫 번째 광고는 영국에서만 표시되고 두 번째 광고는 미국에서만 표시됩니다.  AMP 문서에서 앞서 추가한 광고 아래에 이 두 개의 지역 타겟팅 광고 구성을 **추가**해 보세요.

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk">
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us">
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

페이지를 **새로고침**하고 확인해 보세요. 다음 스크린샷은 캐나다에서 캡처하였으며, 두 광고 모두 로드되지 않습니다.

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"]

이 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 태그 내에 `fallback`이라는 속성이 있는 `div` 태그가 추가되었음을 알 수 있습니다. `fallback` 속성이 무엇을 의미하는지 짐작할 수 있으신가요? 이 속성에서는 상위 요소가 로드되지 않았을 때 이 속성의 콘텐츠만 표시하도록 AMP의 로딩 시스템에 알려줍니다. [자리표시자 및 대체 동작]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}})에서 자세히 알아보세요.

[/tip]

[tip type="read-on"]
지원되는 최신 광고 네트워크를 확인하려면 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 구성요소 참조 문서를 읽어보세요.
[/tip]

[tip type="note"]
광고 네트워크에서 제공하는 자바스크립트는 AMP 문서 내에서 실행할 수 없습니다. AMP 런타임에서는 대신 iframe 샌드박스를 통해 다른 출처에서 AMP 문서로 iframe을 로드하고 이 iframe 샌드박스 내에서는 광고 네트워크의 JS를 실행합니다.
[/tip]

이제 AMP 문서에는 텍스트, 이미지 및 페이지에 삽입된 광고가 포함되어 있으며 모두 스토리를 전달하고 콘텐츠로 수익을 창출하는 데 중요한 요소입니다. 그러나 오늘날의 웹사이트에는 대부분 사진이나 텍스트 외에도 다양한 기능이 포함됩니다.

지금부터는 아래와 같이 뉴스 기사에서 자주 볼 수 있는 더 많은 고급 웹 기능을 추가해 AMP 문서를 한 단계 발전시켜 보겠습니다.

- YouTube 동영상
- 트윗
- 기사 인용

## YouTube 동영상 삽입하기
문서에 YouTube 동영상을 삽입해 보겠습니다. AMP 문서의 `<header>` 바로 뒤(앞서 추가한 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 위)에 다음 코드를 **추가**하세요.

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270">
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

페이지를 **새로고침**하면 동영상 대신 *'동영상을 로드할 수 없습니다.'*라는 텍스트가 표시됩니다.

이 오류 메시지는 브라우저에서 문제없이 YouTube 동영상을 표시할 수 있더라도 표시됩니다. 왜일까요? 동영상을 로드하지 못한 것이 아니라 구성요소 자체를 로드하지 못했기 때문입니다.

핵심 AMP 라이브러리 자바스크립트 파일에 모든 구성요소가 포함되어 있지는 않다는 점을 기억하세요. YouTube 구성요소를 위한 자바스크립트 요청을 추가해야 합니다.

[tip type="note"]
아직 개발자 콘솔이 열려 있고 URL에 `#development=1`이 있으면 이 시점에 [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}) 자바스크립트를 추가하라는 AMP 유효성 검사 오류와 어떤 `script` 태그를 추가해야 하는지 알 수 있는 문서의 링크가 표시됩니다.
[/tip]

`<head>` 태그에 아래 스크립트를 **추가**하세요.

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

페이지를 **새로고침**하면 YouTube 동영상이 표시됩니다.

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='삽입된 YouTube 동영상') }}

페이지의 다른 요소와 마찬가지로, AMP 레이아웃 시스템에서 가로세로 비율을 계산할 수 있도록 동영상의 `width`와 `height`를 지정했습니다. 또한, 동영상이 상위 요소의 너비에 맞도록 `layout`을 `responsive`로 설정했습니다.

YouTube 동영상 삽입에 관해 자세히 알아보려면 [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}})에서 확인하세요.

[tip]
구성요소가 로드되지 않거나 브라우저에서 구성요소가 지원되지 않으면 [`fallback`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}#fallbacks) 속성을 사용하여 사용자에게 알리세요.
[/tip]

## 트윗 표시하기
사전에 서식이 지정된 트위터의 트윗을 삽입하는 기능은 뉴스 기사에서 널리 쓰입니다. [`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}) 구성요소로 이 기능을 간편하게 사용할 수 있습니다.

먼저 문서의 `<head>` 태그에 다음 자바스크립트 요청을 추가하세요.

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

이제 이 코드를 기사에 **추가**하여 트윗을 삽입하세요.

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

`data-tweetid` 속성은 특정 플랫폼에 필요한 맞춤 속성의 또 다른 예입니다. 여기에서는 트위터에서 `data-tweetid` 속성의 값을 특정 트윗으로 연결합니다.

브라우저를 **새로고침**하고 페이지를 보면 트윗이 표시됨을 확인할 수 있습니다.

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='삽입된 트윗') }}

트위터에서 트윗을 삽입하는 방법에 관해 자세히 알아보려면 [`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}) 구성요소 문서를 읽어보세요.

[tip]
AMP에서는 소셜 네트워크의 콘텐츠를 삽입하는 데 필요한 더 많은 구성요소를 제공합니다. 최신 [소셜 AMP 구성요소]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}})를 참조하세요.
[/tip]

## 기사 인용문 강조표시하기

뉴스 기사에서 널리 사용되는 기능 중 하나로는 기사 내의 텍스트에서 특히 흥미로운 부분을 강조표시하는 기능이 있습니다. 예를 들어 특정 출처에서 참조한 인용문이나 중요한 사실을 큰 글꼴로 여러 번 표시하여 독자의 관심을 유도할 수 있습니다.

그러나 텍스트의 스니펫은 길이가 제각각이기 때문에 큰 글꼴 크기와 페이지에서 텍스트가 차지하는 공간의 균형을 맞추기 어려울 수 있습니다.

AMP에서는 이러한 상황을 위해 특별히 만들어진 [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) 구성요소를 제공합니다. [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) 구성요소를 통해 고정된 너비 및 높이 요소와 최대 글꼴 크기를 정의할 수 있습니다. 이 구성요소를 통해 텍스트가 허용되는 너비 및 높이 안에 맞춰질 수 있도록 글꼴 크기를 스마트하게 **조정**할 수 있습니다.

직접 해보겠습니다. 먼저 구성요소 라이브러리를 `<head>` 태그에 **추가**하세요.

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

페이지에 다음을 추가하세요.

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

페이지를 **새로고침**하고 결과를 확인해 보세요.

이번에는 다른 실험을 해 보겠습니다. 인용문이 훨씬 짧으면 어떻게 될까요?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

인용문이 길 때는 어떻게 될까요?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

[`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}})를 이용한 마지막 실험에서는 '안녕하세요'와 같이 짧은 텍스트의 높이를 훨씬 높은 값으로(예: 400) 설정하고 max-font-size 속성값은 42로 유지해 보겠습니다. 결과 페이지가 어떻게 표시될까요? 텍스트가 세로로 가운데 정렬되나요? 아니면 [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) 태그의 높이가 최대 글꼴 크기에 맞게 축소되나요? 직접 코드를 수정하여 확인하기 전에 AMP의 레이아웃 시스템에 관해 이미 알고 있는 지식을 활용하여 질문에 답변해 보세요.

[AMP by Example의 라이브 데모],[`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-fit-text.html', locale=doc.locale).url.path}}).url.path}})에 관해 자세히 알아보세요.

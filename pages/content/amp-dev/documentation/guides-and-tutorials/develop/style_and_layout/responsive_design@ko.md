---
$title: 반응형 AMP 페이지 만들기
---

## 소개

반응형 웹 디자인의 목적은 사용자의 요구에 맞는, 즉 기기의 화면 크기와 방향에 따라 반응하는 매끄러운 웹페이지를 만드는 것입니다. AMP를 사용하면 반응형 페이지를 쉽게 만들 수 있습니다. AMP는 모든 화면과 기기 카테고리를 지원하며 반응형 구성요소를 기본으로 제공합니다.

이 가이드에서는 AMP에서 필수 반응형 요소를 간편하게 구현하는 방법을 설명합니다.

- [표시 영역 제어](#controlling-the-viewport)
- [반응형 레이아웃 만들기](#creating-a-responsive-layout)
- [미디어 조정](#scaling-media-for-the-page)

## 표시 영역 제어 <a name="controlling-the-viewport"></a>

콘텐츠가 모든 기기의 브라우저 창에 맞게 조정될 수 있도록 웹페이지를 최적화하려면 `meta` 표시 영역 요소를 지정해야 합니다. 표시 영역 요소는 웹페이지의 표시 영역 비율과 크기를 조정하는 방법을 브라우저에 알려줍니다.

그렇다면 어떤 값을 사용해야 할까요? AMP에 이미 준비되어 있습니다. AMP 페이지에 있는 [필수 마크업](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#required-markup)의 일부로서 다음 표시 영역을 지정해야 합니다.

```html
<meta name="viewport" content="width=device-width" />
```

이 설정은 반응형 사이트에 사용하는 일반적인 표시 영역 설정입니다. 올바른 AMP 페이지를 위해 반드시 `initial-scale=1`로 지정해야 하는 것은 아니지만 페이지가 처음 로드될 때 확대/축소 수준이 1이 되도록 이 설정을 유지하는 것이 좋습니다.

## 반응형 레이아웃 만들기 <a name="creating-a-responsive-layout"></a>

반응형 디자인에서는 CSS [`@media`](https://developer.mozilla.org/docs/Web/CSS/@media) 쿼리를 사용하여 페이지의 콘텐츠를 변경하지 않고도 다양한 화면 크기에 맞게 웹페이지의 스타일을 조정할 수 있습니다. AMP에서 동일한 CSS `@media` 쿼리를 계속 사용할 수 있습니다. 또한 요소의 `media` 속성을 지정하여 AMP 요소를 더욱 세밀하게 제어할 수 있습니다. 이 기능은 미디어 쿼리에 따라 요소를 표시하거나 숨겨야 할 때 특히 유용합니다. `media` 속성을 사용하는 예를 보려면 [이미지의 아트 디렉션 변경](#changing-the-art-direction-of-an-image) 섹션을 참조하세요.

각 요소의 크기를 화면에 맞게 조정하기가 까다로울 수 있습니다<sup><a href="#fn1" id="ref1">\*</a></sup>. 그러나 AMP에서는 요소의 `width` 및 `height` 속성과 함께 `"layout=responsive"` 속성을 지정하여 간편하게 반응형 요소를 만들 수 있습니다. 요소에 `responsive` 레이아웃을 적용하면 요소는 컨테이너 요소의 너비에 맞춰 자동으로 크기를 조절하며, 높이는 요소의 `width` 및 `height`에 지정된 가로세로 비율에 따라 변경됩니다. 거의 모든 AMP 요소가 `responsive` 레이아웃을 지원합니다. 지원되는 레이아웃을 보려면 요소의 참조 문서를 확인하세요.

`"layout=responsive"`를 사용하여 간편하게 반응형 요소를 만들 수 있지만 데스크톱과 태블릿 등 모든 화면 크기에서 요소가 표시되는 방식을 고려해야 합니다. 흔히 하는 실수는 이미지가 화면의 전체 너비를 차지하도록 하는 것입니다. 이렇게 하면 이미지가 원하는 크기 이상으로 늘어나서 와이드스크린 사용자의 사용 환경이 나빠집니다. 기본적으로 `layout=responsive`를 사용하는 요소는 요소 컨테이너의 전체 너비를 차지하며, 종종 너비가 제한되지 않게 됩니다(즉, width=100%). 이미지 컨테이너의 너비를 제한하기만 해도 이미지가 표시되는 방식을 개선할 수 있습니다. 예를 들면 'body' 또는 'main'에 'max-width' 규칙을 설정하여 모든 이미지를 지정된 최대 너비로 제한할 수 있습니다.

##### 예: 반응형 이미지의 너비 제한

아래 예에서는 모든 화면 크기에 표시하려는 꽃 이미지(640x427px)에 `width` 및 `height`를 지정하고 레이아웃을 `responsive`로 설정합니다.

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

이때, 이미지가 원하는 크기 이상으로 늘어나지 않도록 하기 위해 다음과 같이 맞춤 CSS를 사용하여 컨테이너의 `max-width`를 700px로 설정합니다.

```html
<style amp-custom>
  .resp-img {
    max-width: 700px;
  }
</style>
```

읽어보기: AMP의 다양한 레이아웃을 자세히 알아보려면 [레이아웃 및 미디어 쿼리](control_layout.md) 가이드를 참조하세요.

<a id="fn1"></a>
[tip type="note"]
**\*'width=100%' 스타일을 사용하여 간편하게 수행할 수 있는데 화면에 맞게 요소의 크기를 조정하는 것이 까다로운 이유가 무엇일까요?** 성능 통계와 사용자 환경에 부정적인 영향을 주지 않으면서 반응형 요소가 페이지에 렌더링되도록 하는 것이 까다롭습니다. 물론 'width=100%'를 사용하면 화면에 이미지를 간편하게 맞출 수 있지만, 대신 성능이 저하됩니다. 브라우저는 먼저 이미지를 다운로드하여 이미지의 크기를 파악하고 화면 크기에 맞게 이미지 크기를 조정한 후 마지막으로 페이지를 리플로우하고 다시 채워야 합니다. AMP에서는 렌더링 경로를 최적화함으로써 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 제공된 크기(이 숫자를 사용하여 가로세로 비율을 설정)를 바탕으로 이미지의 자리 표시자가 준비된 페이지가 먼저 배치된 후 리소스를 다운로드하고 페이지를 채웁니다. 리플로우는 필요하지 않습니다.
[/tip]

## 페이지에 맞게 미디어 조정 <a name="scaling-media-for-the-page"></a>

반응형 디자인에서 가장 어려운 부분은 화면의 특성에 반응할 수 있도록 미디어를 페이지에 올바르게 표시하는 것입니다. 이 섹션에서는 AMP 페이지에 반응형 동영상과 이미지를 삽입하는 방법을 살펴봅니다.

### 동영상 삽입

웹페이지에 동영상을 포함할 때는 동영상 콘텐츠와 동영상 컨트롤이 화면을 벗어나지 않고 사용자에게 올바르게 표시되도록 해야 합니다. 일반적으로 CSS 미디어 쿼리, 컨테이너 그리고 기타 CSS를 조합하여 이 작업을 수행합니다. AMP에서는 페이지에 동영상 요소를 추가하고 요소에 `layout=responsive`를 지정하기만 하면 되며, 추가 CSS는 필요하지 않습니다.

##### 예: YouTube 동영상 삽입

아래 예에서는 삽입된 YouTube 동영상이 기기 화면의 크기와 방향에 따라 반응하는 것을 보여드리겠습니다. [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) 요소에 `"layout=responsive"`를 추가하면 창에 맞춰 동영상 크기가 조정되며 가로세로 비율은 `width` 및 `height`에 지정된 값으로 유지됩니다.

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

다양한 유형의 동영상을 AMP 페이지에 추가할 수 있습니다. 자세한 내용은 사용 가능한 [미디어 구성요소](../../../../documentation/components/index.html#media) 목록을 참조하세요.

### 반응형 이미지 표시하기 <a name="displaying-responsive-images"></a>

이미지는 웹페이지의 상당 부분을 차지합니다(대략 [페이지 바이트의 65%](http://httparchive.org/interesting.php#bytesperpage)). 사용자가 스크롤하거나 손가락을 모으거나 확대/축소하지 않고도 전체 이미지를 볼 수 있도록 이미지는 기본적으로 여러 화면 크기와 방향으로 표시되어야 합니다. AMP에서는 `"layout=responsive"` 속성을 사용해 간편하게 완료할 수 있습니다([AMP에서 이미지 포함](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md) 참조). 기본 반응형 이미지 외에도 여러 이미지 리소스를 게재하여 다음과 같은 작업을 수행할 수 있습니다.

- [적절한 해상도로 선명한 이미지 게재](#serving-crisp-images-for-the-right-resolution)
- [이미지의 아트 디렉션 변경](#changing-the-art-direction-of-an-image)
- [최적화된 이미지 형식 제공](#providing-optimized-images)

#### 적절한 해상도로 선명한 이미지 게재 <a name="serving-crisp-images-for-the-right-resolution"></a>

레티나 디스플레이 등의 고해상도 화면에서는 선명하고 뚜렷한 이미지를 제공해야 하지만, 저해상도 기기에서는 로드 시간이 불필요하게 길어질 수 있으므로 이와 같은 이미지를 사용할 필요가 없습니다. AMP가 아닌 페이지에서나 AMP 페이지에서나 모두 너비 설명자 ( `w` )와 `srcset`을 함께 사용하여 화면의 픽셀 밀도에 맞는 적절한 이미지를 게재할 수 있습니다.

참고: DPR (`x`) 기반의 srcset 선택자도 사용할 수 있지만 더 높은 유연성을 위해서는 `w` 선택자를 사용하는 것이 좋습니다. 이전에는(이전의 srcset 제안에서는) `w` 설명자가 표시 영역 너비를 설명했지만, 지금은 이미지 소스 파일의 너비를 설명합니다. 따라서 사용자 에이전트가 각 이미지의 효과적인 픽셀 밀도를 계산하고 렌더링할 적절한 이미지를 선택할 수 있습니다.

##### 예: 화면에 맞는 선명한 이미지 표시

다음 예에는 가로세로 비율은 동일하지만 해상도가 다른 몇 개의 이미지 파일이 있습니다. 다양한 이미지 해상도를 제공함으로써 브라우저에서 기기의 해상도에 가장 적합한 이미지를 선택할 수 있습니다. 또한 이미지를 렌더링할 크기를 다음과 같이 지정했습니다.

- 표시 영역 너비가 최대 400px인 경우, 표시 영역 너비의 100%로 이미지를 렌더링합니다.
- 표시 영역 너비가 최대 900px인 경우, 표시 영역 너비의 75%로 이미지를 렌더링합니다.
- 표시 영역 너비가 900px을 넘는 경우, 600px의 너비로 이미지를 렌더링합니다.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw,
            (max-width: 900px) 75vw, 600px"
>
</amp-img>
```

[/example]

표시 영역의 너비가 412px이고 DPR이 2.6인 기기가 있다고 가정해 보겠습니다. 위의 코드에 따라 이미지가 표시 영역 너비의 75%로 표시되어야 하므로 브라우저에서는 803px(412 _ .75 _ 2.6)에 가까운 `apple-800.jpg` 이미지를 선택합니다.

읽어보기: AMP에서 srcset 및 크기를 사용하는 방법을 자세히 알아보려면 [srcset, 크기, 높이를 사용하는 아트 디렉션](art_direction.md) 가이드를 참조하세요.

#### 이미지의 아트 디렉션 변경 <a name="changing-the-art-direction-of-an-image"></a>

아트 디렉션은 특정 중단점에 맞게 이미지의 시각적 특성을 조정하는 것을 의미합니다. 예를 들어, 화면이 좁아지면 단순히 이미지의 비율을 조정하는 것이 아니라 이미지의 포커스가 좁아지도록 자른 이미지를 게재하거나 다른 중단점에 완전히 다른 이미지를 게재해야 할 수 있습니다. HTML에서는 `picture` 요소를 사용하여 이 작업을 수행할 수 있으며, AMP에서는 `media` 속성을 사용하여 아트 디렉션을 적용할 수 있습니다.

##### 예: 다른 중단점에 다른 크기의 이미지 사용

다음 예에는 서로 다른 중단점에 표시하기 위해 3가지 버전으로 자른 고양이 이미지가 있으며, 표시 영역 너비에 따라 다음과 같이 표시됩니다.

- 670px 이상인 경우 `cat-large.jpg`(650x340px) 표시
- 470~669px인 경우 `cat-medium.jpg`(450x340px) 표시
- 469px 이하인 경우 `cat-small.jpg`(226x340px) 표시

참고: 변형되지 않는 고정된 크기로 이미지를 표시하려고 했으므로 레이아웃 값을 지정하지 않았습니다. 너비와 높이를 설정했기 때문에 기본적으로 `layout=fixed`로 설정됩니다. 자세한 내용은 ['레이아웃 속성이 지정되지 않으면 어떻게 되나요?'](control_layout.md#what-if-the-layout-attribute-isnt-specified)를 참조하세요.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="grey cat"
  media="(min-width: 670px)"
  width="650"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(min-width: 470px) and (max-width: 669px)"
  width="450"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(max-width: 469px)"
  width="226"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"
></amp-img>
```

[/example]

읽어보기: AMP의 아트 디렉션에 관해 자세히 알아보려면 [srcset, 크기, 높이를 사용하는 아트 디렉션](art_direction.md) 가이드를 참조하세요.

#### 최적화된 이미지 제공 <a name="providing-optimized-images"></a>

빠르게 로드되는 페이지를 게재하려면 크기, 품질, 형식이 최적화된 이미지가 필요합니다. 항상 파일 크기를 허용되는 최저 수준까지 줄이세요. 이미지를 '고속으로 처리'하기 위해 다양한 도구를 사용할 수 있습니다(예: [ImageAlph](http://pngmini.com/lossypng.html) 또는 [TinyPNG](https://tinypng.com/)). 이미지 형식별로 살펴보면 다른 형식에 비해 우수한 압축 기능을 제공하는 이미지 형식이 있습니다(예: WebP 및 JPEG XR의 압축 기능이 JPEG보다 우수함). 사용자에게 가장 최적화된 이미지를 제공하고 사용자의 브라우저에서 이미지가 지원되도록 해야 합니다([브라우저별로 지원되는 이미지 형식 보기](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

HTML에서는 `picture` 태그를 사용하여 다른 이미지 형식을 게재할 수 있습니다. AMP에서는 `picture` 태그가 지원되지 않지만 `fallback` 속성을 사용하여 다른 이미지를 게재할 수 있습니다.

읽어보기: fallback에 관해 자세히 알아보려면 [자리표시자 및 Fallback](placeholders.md) 가이드를 참조하세요.

##### 예: 다른 이미지 형식 게재

아래 예에서는 브라우저가 WebP를 지원하면 mountains.webp를 게재하고, 지원하지 않으면 mountains.jpg를 게재합니다.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

한 가지 보너스 기능으로, Google AMP 캐시와 같은 일부 캐시는 사용자가 직접 수행하지 않는 경우 자동으로 이미지를 압축하고 WebP 및 적절한 해상도로 변환합니다. 그러나 모든 플랫폼에서 캐시를 사용하는 것은 아니므로, 캐시를 사용하지 않는 플랫폼에서는 수동으로 이미지를 최적화해야 합니다.

읽어보기: Google AMP 캐시가 적용하는 이미지 최적화를 자세히 알아보려면 ['Google AMP 캐시, AMP Lite 그리고 속도의 필요성'](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html) 블로그 게시물을 참조하세요.

## 영감을 주는 사례

반응형 AMP 페이지를 만드는 데 도움이 될만한 몇 가지 사례를 확인해 보세요.

#### 프로덕션

- [Getty Images '2016 in Focus'](http://www.gettyimages.com/2016/)
- [BRIT + CO의 연말연시 선물 가이드](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### AMP 제작

- [예제별 AMP: 샘플 및 템플릿](../../../../documentation/examples/index.html)
- [템플릿](../../../../documentation/templates/index.html)
- [AMP Conf Workshop Codelab: 멋진 AMP 만들기](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)

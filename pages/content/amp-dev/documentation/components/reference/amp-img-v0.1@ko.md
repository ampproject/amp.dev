---
$title: amp-img
$category@: media
teaser:
  text:: HTML5 이미지 태그를 대체합니다.
---


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



<table>
  <tr>
    <td class="col-fourty"><strong>설명</strong></td>
    <td>HTML <code>img</code> 태그의 런타임 관리 대체입니다.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-img/">amp-img 예</a>를 참조하세요.</td>
  </tr>
</table>


# 동작 <a name="behavior"></a>

런타임에서 표시 영역 위치, 시스템 리소스, 연결, 대역폭 또는 기타 요인을 기반으로 리소스 로드를 지연하거나 우선순위를 지정하도록 선택할 수 있습니다. `amp-img` 구성요소를 사용하면 런타임에서 이미지 리소스를 이와 같이 효율적으로 관리할 수 있습니다.

이미지를 가져오지 않고도 가로세로 비율을 알 수 있도록, 외부에서 가져온 모든 AMP 리소스와 같은 `amp-img` 구성요소에는 명시적으로 미리 크기를 지정해야 합니다(`width`/`height` 사용). 실제 레이아웃 동작은 `layout` 속성에 따라 결정됩니다.

[tip type="read-on"]
[AMP HTML 레이아웃 시스템](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md) 사양과 [지원되는 레이아웃](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute)에서 레이아웃에 관해 자세히 알아보세요.
[/tip]

# 예: 반응형 이미지 표시 <a name="example-displaying-a-responsive-image"></a>

다음 예에서는 `layout=responsive`를 설정하여 표시 영역의 크기에 반응하는 이미지를 표시합니다.  `width`와 `height`로 지정된 가로세로 비율에 따라 이미지가 확장되고 줄어듭니다.

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

[tip type="read-on"]
[반응형 AMP 페이지 만들기](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md) 가이드에서 반응형 AMP 페이지에 관해 알아보세요.
[/tip]

`amp-img` 구성요소에서 요청한 리소스를 로드하지 못하면, [`fallback`](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#fallback) 하위 요소를 제공하지 않은 경우 공간이 비게 됩니다. 대체(예: 크기 조정 + srcset를 통한) 사실이 성능에 영향을 미치지 않는 한 초기 레이아웃과 후속 src 변경에서만 대체가 실행됩니다.

# 예: 대체 이미지 지정 <a name="example-specifying-a-fallback-image"></a>

다음 예에서 브라우저가 WebP를 지원하지 않는 경우 대체 JPG 이미지가 표시됩니다.

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

자리표시자 배경색 또는 기타 시각적 요소 자체에서 CSS 선택기와 스타일을 사용하여 설정할 수 있습니다.

자막과 같은 추가 이미지 기능은 표준 HTML(예: `figure` 및 `figcaption`)을 사용하여 구현할 수 있습니다.

[tip type="read-on"]
다음 리소스에서 `amp-img` 사용에 관해 자세히 알아보세요.

* [자리표시자 및 대체](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)
* [이미지 및 동영상 포함](../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)
[/tip]

# 속성 <a name="attributes"></a>

**src**

이 속성은 `img` 태그의 `src` 속성과 비슷합니다. 이 값은 공개적으로 캐시 가능한 이미지 파일을 가리키는 URL이어야 합니다. 이미지의 캐싱된 버전을 가리키도록 AMP 파일을 처리할 때 캐시 공급자가 이 URL을 다시 쓸 수 있습니다.

**srcset**

`img` 태그의 `srcset` 속성과 같습니다. `srcset`을 지원하지 않는 브라우저의 경우 `<amp-img>`가 기본적으로 `src`를 사용합니다. `srcset`만 제공되고 `src`는 제공되지 않는 경우 `srcset`의 첫 번째 url만 선택합니다.

**sizes**

`img` 태그의 `sizes` 속성과 같습니다.

[tip type="read-on"]
`sizes` 및 `srcset` 사용은 [srcset, sizes 및 heights를 사용하는 반응형 이미지](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md)를 참조하세요.
[/tip]

**alt**

`img`의 `alt` 속성과 비슷한 대체 텍스트 문자열입니다.

**attribution**

이미지의 기여 분석을 나타내는 문자열입니다. 예를 들어 `attribution="CC courtesy of Cats on Flicker"`입니다.

**height** 및 **width**

이미지를 가져오지 않고 가로세로 비율을 판별하기 위해 AMP 런타임에서 사용하는 이미지의 명시적 크기입니다.

**공통 속성**

이 요소에는 AMP 구성요소로 확장된 [공통 속성](../../../documentation/guides-and-tutorials/learn/common_attributes.md)이 포함됩니다.

# 스타일 지정 <a name="styling"></a>

`amp-img`는 CSS 속성을 통해 직접 스타일을 지정할 수 있습니다. 예를 들어 다음을 통해
회색의 백그라운드 자리표시자를 사용할 수 있습니다.

```css
amp-img {
  background-color: grey;
  }
```

# 도움말 및 유용한 정보 <a name="tips--tricks"></a>

# 이미지를 최대 너비까지 확장 <a name="scaling-an-image-up-to-a-maximum-width"></a>

창의 크기가 조정됨에 따라 이미지의 크기를 조정하지만 이미지가 자체 너비 이상으로 확장되지 않도록 최대 너비까지만 조정하려는 경우 다음을 시행합니다.

1. `<amp-img>`의 `layout=responsive`를 설정합니다.
1. 이미지의 컨테이너에서 `max-width:<max width to display image>` CSS 속성을 지정합니다.  왜 컨테이너에서 지정해야 할까요?  `layout=responsive`가 있는 `amp-img` 요소는 *블록 수준* 요소입니다. 여기서 `<img>`는 *인라인*입니다*. 또는 CSS에서 amp-img 요소의 `display: inline-block`을 설정할 수 있습니다.

# 반응형 레이아웃과 내장형 레이아웃 사이의 차이점 <a name="the-difference-between-responsive-and-intrinsic-layout"></a>

`responsive`과 `intrinsic` 레이아웃에서는 자동으로 크기가 조정되는 이미지를 만듭니다.  `intrinsic` 레이아웃에서는 SVG 이미지를 크기 조정 요소로 사용한다는 주된 차이점이 있습니다.  따라서 표준 HTML 이미지와 동일한 방식으로 작동하며 브라우저에서 초기 레이아웃의 이미지 크기를 알 수 있다는 이점이 유지됩니다. `intrinsic` 레이아웃에는 고유 크기가 있으며 기본 이미지 크기 또는 `max-width`와 같은 CSS 제한조건에 도달할 때까지 플로팅 `div`로 확장됩니다. `responsive` 레이아웃은 플로팅될 때 기본 크기가 지정되지 않는 상위 요소로부터 크기를 가져오므로 플로팅된 `div`에서 0 x 0으로 렌더링됩니다.

# 고정 크기 이미지 설정 <a name="setting-a-fixed-sized-image"></a>

이미지를 고정 크기로 표시하려는 경우 다음을 시행하세요.

1. `<amp-img>`의 `layout=fixed`를 설정합니다.
1. `width` 및 `height`를 지정합니다.

[tip type="read-on"]
`layout` 속성을 지정하지 않는 경우 [유추된 레이아웃](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)에 관해 알아보세요.
[/tip]

# 가로세로 비율 설정 <a name="setting-the-aspect-ratio"></a>

반응형 이미지의 경우 `width`와 `height`은 `amp-img`의 너비 및 높이와 정확히 일치하지 않아도 됩니다. 해당 값의 가로세로 비율이 같기만 하면 됩니다.

예를 들어 `width="900"`과 `height="675"`를 지정하지 않고 `width="1.33"`과 `height="1"`을 지정할 수 있습니다.

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="1.33"
  height="1"
  layout="responsive">
</amp-img>
```
[/example]

# 여러 다른 화면 해상도에 맞게 여러 소스 파일 설정 <a name="setting-multiple-source-files-for-different-screen-resolutions"></a>

같은 이미지에 대해 가로세로 비율이 모두 동일한 여러 다른 해상도를 제공하기 위해 [`srcset`](#attributes) 속성을 사용해야 합니다. 브라우저에서 사용자 기기의 화면 해상도와 너비를 기반으로 `srcset`에서 가장 적합한 파일을 자동으로 선택합니다.

대조적으로 [`media`](../../../documentation/guides-and-tutorials/learn/common_attributes.md#media) 속성에서는 AMP 구성요소를 표시하거나 숨기므로 반응형 레이아웃을 디자인할 때 사용해야 합니다. 가로세로 비율이 서로 다른 이미지를 표시하려면 여러 `<amp-img>` 구성요소를 사용하는 것이 적합합니다. 이때 각 구성요소에서는 각 인스턴스를 표시할 화면 너비에 맞는 `media` 속성을 사용합니다.

자세한 내용은 [반응형 AMP 페이지 만들기](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#displaying-responsive-images)의 가이드를 참조하세요.

# 크기를 알 수 없는 이미지의 가로세로 비율 유지 <a name="maintaining-the-aspect-ratio-for-images-with-unknown-dimensions"></a>

AMP 레이아웃 시스템에서 이미지를 가져오기 전에 이미지의 가로세로 비율을 미리 알고 있어야 합니다. 그러나 경우에 따라 이미지의 크기를 알지 못할 수 있습니다. 크기를 알 수 없는 이미지를 표시하고 가로세로 비율을 유지하려면 AMP의 [`fill`](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) 레이아웃을 [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/) CSS 속성과 결합합니다. 자세한 정보는 AMP By Example의 [크기를 알 수 없는 이미지 지원 방법](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions)을 참조하세요.

# 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양에서 [amp-img rules](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)를 참조하세요.

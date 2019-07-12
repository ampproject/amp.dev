---
$category@: ads-analytics
formats:
  - websites
  - ads
  - stories
  teaser:
      text:  페이지 조회수를 계산하는 추적 픽셀입니다.
---


<!---
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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
# amp-pixel


<table>
  <tr>
    <td class="col-fourty"><strong>설명</strong></td>
    <td>페이지 조회수를 계산하는 일반 추적 픽셀로 사용할 수 있습니다.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">지원되는 레이아웃</a></strong></td>
    <td>fixed, nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-pixel/">amp-pixel 예</a>를 참조하세요.</td>
  </tr>
</table>

## 동작

`amp-pixel` 구성요소는 단순 추적 픽셀 `img`와 같이 동작합니다. 이 구성요소에서는 하나의 URL을 사용하지만, 요청할 때 URL 문자열에서 구성요소로 대체될 수 있는 변수를 제공합니다. 자세한 내용은 [대체](#substitutions) 섹션을 참조하세요.

이 기본 예에서는 `amp-pixel`에서 지정된 URL에 간단한 GET 요청을 실행하고 결과는 무시합니다.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"></amp-pixel>
```

  [tip type="note"]
애널리틱스 요청의 리퍼러 헤더에서 AMP URL을 처리할 때 `usqp` 매개변수를 제외하거나 무시하세요. 이 매개변수는 Google이 Google AMP 캐시에 대한 실험을 트리거하는 데 사용됩니다.
[/tip]

## 속성

##### src(필수)

`https` 프로토콜이어야 하는 원격 엔드포인트의 단순 URL입니다.

##### referrerpolicy(선택사항)

이 속성은 `<img>`의 `referrerpolicy` 속성과 비슷하지만 `no-referrer` 값만 허용됩니다. `referrerpolicy=no-referrer`가 지정된 경우 HTTP 요청에서 `referrer` 헤더가 삭제됩니다.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"
    referrerpolicy="no-referrer"></amp-pixel>
```

##### allow-ssr-img(선택사항)

이 속성을 AMP4ADS 광고 소재에 사용하면 사후 유효성 검사 변환의 일부로 img 요소를 amp-pixel 요소에 직접 둘 수 있으므로, AMP 런타임 가져오기/실행과 동시에 ping을 전송할 수 있습니다.
즉, url에 있는 모든 매크로는 확장되지 않으므로 src에 없는 경우에만 사용해야 합니다.

##### 공통 속성

이 요소에는 AMP 구성요소로 확장된 [공통 속성](https://www.ampproject.org/docs/reference/common_attributes)이 포함됩니다.

## 대체

`amp-pixel`을 사용하면 모든 표준 URL 변수를 대체할 수 있습니다.
자세한 정보는 [대체 가이드](../spec/amp-var-substitutions.md)를 참조하세요.

다음 예에서는 `https://foo.com/pixel?0.8390278471201`와 같은 사이트에 요청을 할 수 있으며 여기서는 노출할 때마다 RANDOM 값이 무작위로 생성됩니다.

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"
    layout="nodisplay"></amp-pixel>
```

## 스타일 지정

`amp-pixel`의 스타일은 지정되지 않아야 합니다.

## 유효성 검사

AMP 유효성 검사기 사양에서 [amp-pixel 규칙](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)을 참조하세요.

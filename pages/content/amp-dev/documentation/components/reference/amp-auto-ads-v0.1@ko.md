---
$title: amp-auto-ads
$category@: ads-analytics
teaser:
  text: 원격으로 제공되는 구성 파일을 사용하여 AMP 페이지에 동적으로 광고를 삽입합니다.
---

<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



원격으로 제공되는 구성 파일을 사용하여 AMP 페이지에 동적으로 광고를 삽입합니다.

<table>
  <tr>
    <td class="col-fourty"><strong>지원 대상</strong></td>
    <td>시험용</td>
  </tr>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td>
    <code>
      &lt;script async custom-element="amp-auto-ads"
      src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">&lt;/script>
    </code>
      </td>
    </tr>
    <tr>
      <td class="col-fourty">
        <strong>
          <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">
            지원되는 레이아웃
          </a>
        </strong>
      </td>
      <td>N/A</td>
    </tr>
  </table>


## 동작

충분한 수의 유효한 위치가 지정되면(구성에서 제공) `amp-auto-ads`는 광고 네트워크에서 지정한 제약 조건을 준수하면서 추가 광고를 삽입하려고 시도합니다. 이러한 제약 조건은 다음을 제한합니다.

* 삽입할 수 있는 총 광고 수
* 인접한 광고 간에 필요한 최소 거리

이 외에도 허용되지 않는 재흐름을 일으키지 않는 페이지의 위치에만 광고를 삽입할 수 있습니다(attemptChangeSize에 의해 결정됨).

`<amp-auto-ads>` 태그는 `<body>`의 첫 번째 하위로 배치해야 합니다.

광고 네트워크 유형 및 추가 정보(광고 네트워크에 필요)는 태그에서 지정해야 합니다.
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">
  </amp-auto-ads>
```

## 지원되는 광고 네트워크 <a name="supported-ad-networks"></a>

* [애드센스](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [DoubleClick (experimental)](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)

## 속성

<table>
  <tr>
    <td width="40%"><strong>유형(필수)</strong></td>
    <td>광고 네트워크의 식별자.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>대부분의 광고 네트워크에는 HTML <code>data-</code> 속성을 사용해 네트워크에 전달될 수 있는 추가 구성이 필요합니다. 매개변수 이름의 표준 데이터 속성 대시는 카멜식 대소문자로 변환됩니다. 예를 들어 'data-foo-bar'는 구성을 위해 'fooBar'로 광고에 전송됩니다. 사용할 수 있는 속성은 <a href="#supported-ad-networks">광고 네트워크</a> 문서를 참조하세요.</td>
  </tr>
  <tr>
    <td width="40%"><strong>공통 속성</strong></td>
    <td>이 요소에는 AMP 구성요소로 확장된 <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">공통 속성</a>이 포함되어 있습니다.</td>
  </tr>
</table>

## 구성 사양

구성은 `<amp-auto-ads>`가 페이지의 어느 위치에 광고를 개제할 수 있는지를 정의합니다. `ad-network-config.js`에 정의된 URL의 제3자 광고 네트워크에서 구성을 가져옵니다. 구성은 아래에 설명된 [`ConfigObj`](#configobj) 정의와 일치하는 직렬화된 JSON 개체여야 합니다.

### 구성 예

다음 예는 페이지에서 세 번째 `<DIV id='domId'>` 내에 있는 `<P class='paragraph'>` 요소 바로 뒤에 광고를 배치하도록 지정합니다. 이러한 위치에 배치되는 광고는 BANNER 유형이어야 하며 상단 여백은 4px, 하단 여백은 10px여야 합니다.

```json
{
  "placements": [
    {
      "anchor": {
        "selector": "DIV#domId",
        "index": 2,
        "sub": {
          "selector": "P.paragraph",
          "all": true,
        },
      },
      "pos": 4,
      "type": 1,
      "style": {
        "top_m": 5,
        "bot_m": 10,
      },
    },
  ]
}
```

### 개체 정의

#### ConfigObj <a name="configobj"></a>

구성 개체에서 지정할 입력란:

<table>
  <tr>
    <th class="col-thirty">입력란 이름</th>
    <th class="col-thirty">유형</th>
    <th class="col-fourty">설명</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>Array&lt;!PlacementObj&gt;</td>
    <td>페이지에 광고를 삽입할 수 있는 잠재적 장소를 나타내는 <strong>필수</strong> 입력란.</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object<문자열, 문자열></td>
    <td>이 구성을 사용하여 삽입된 모든 <code>&lt;amp-ad&gt;</code> 요소에 적용할 속성 값에 속성 이름을 매핑하는 방식을 지정하는 <em>선택적</em> 입력란. 다음 속성 이름만 허용됩니다.
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-&ast; (즉, 임의의 데이터 속성)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>adConstraints</code></td>
    <td>AdConstraintsObj</td>
    <td>
      페이지에 광고를 게재할 때 사용해야 하는 제약 조건을 지정하는 <em>선택적</em> 입력란. 지정되지 않은 경우, <code>amp-auto-ads</code>는 [ad-network-config.js](0.1/ad-network-config.js)에 지정된 기본 제약 조건을 사용하려고 시도합니다.
    </td>
  </tr>
</table>

#### PlacementObj

`placements` 구성 개체에서 지정할 입력란:

<table>
  <tr>
    <th class="col-thirty">입력란 이름</th>
    <th class="col-thirty">유형</th>
    <th class="col-fourty">설명</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td>게재 위치를 고정할 페이지의 요소를 조회하는 데 사용되는 정보를 제공하는 <strong>필수</strong> 입력란.
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td>앵커 요소를 기준으로 게재 위치를 나타내는 <strong>필수</strong> 입력란.</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td>게재 유형을 나타내는 <strong>필수</strong> 입력란.</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td>이 게재 위치에 삽입된 광고에 적용해야 할 스타일을 나타내는 <em>선택적</em> 입력란.
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object<문자열, 문자열></td>
    <td>이 게재위치를 사용하여 삽입된 모든 <code>&lt;amp-ad&gt;</code> 요소에 적용할 속성 값에 속성 이름을 매핑하기 위한 <em>선택적</em> 입력란. 여기에 지정된 속성은 상위 <code>ConfigObj</code>에서도 지정된 동일한 이름의 속성을 재정의합니다. 다음 속성 이름만 허용됩니다.
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-&ast;(즉, 임의의 데이터 속성)</li>
      </ul>
    </td>
  </tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

`anchor` 구성 개체에서 지정할 입력란:

<table>
  <tr>
    <th class="col-thirty">입력란 이름</th>
    <th class="col-thirty">유형</th>
    <th class="col-fourty">설명</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>문자열</td>
    <td>이 수준의 앵커 정의에서 요소를 선택하는 CSS 선택기를 정의하는 <strong>필수</strong> 입력란.
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>숫자</td>
    <td>이 수준의 앵커 정의를 제한해야 할 선택기에 의해 선택된 요소의 색인을 지정하는 <em>선택적</em> 입력란. 기본적으로 이 값은 0으로 설정됩니다(<code>all</code> 입력란이 false인 경우).</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>부울</td>
    <td><code>index</code> 입력란이 지정되면 무시됩니다. <code>true</code>로 설정하면 선택기에서 선택한 모든 요소를 포함해야 함을 나타냅니다. 그렇게 하지 않으려면 <code>false</code>로 설정합니다.
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>숫자</td>
    <td>포함할 요소에서 textContent 속성의 최소 길이를 지정하는 <em>선택적</em> 입력란. 기본값은 0입니다.</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>AnchorObj</td>
    <td>이 수준의 앵커 정의에서 선택된 요소 내에서 요소를 선택할 재귀적 <code>AnchorObj</code>를 지정하는 <em>선택적</em> 입력란.
    </td>
  </tr>
</table>

#### PlacementStyleObj <a name="placementstyleobj"></a>

`style` 구성 개체에서 지정할 입력란:

<table>
  <tr>
    <th class="col-twenty">입력란 이름</th>
    <th class="col-twenty">유형</th>
    <th class="col-fourty">설명</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>숫자</td>
    <td>이 위치에 삽입된 광고에 필요한 상단 여백을 픽셀 단위로 나타내는 <em>선택적</em> 입력란. 기본값: 0.
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>숫자</td>
    <td>이 위치에 삽입된 광고에 필요한 하단 여백을 픽셀 단위로 나타내는 <em>선택적</em> 입력란. 기본값: 0.
    </td>
  </tr>
</table>

#### RelativePositionEnum <a name="relativepositionenum"></a>

`placements` 구성 개체의 `pos` 입력란에 대한 ENUM 값:

<table>
  <tr>
    <th class="col-fourty">이름</th>
    <th class="col-twenty">값</th>
    <th class="col-fourty">설명</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>광고를 앵커 바로 앞에 형제 요소로 삽입해야 합니다.</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>광고를 앵커의 첫 번째 하위 요소로 삽입해야 합니다.</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>광고를 앵커의 마지막 하위 요소로 삽입해야 합니다.</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>광고를 앵커 바로 뒤에 형제 요소로 삽입해야 합니다.</td>
  </tr>
</table>

#### PlacementTypeEnum <a name="placementtypeenum"></a>

`placements` 구성 개체의 `type` 입력란에 대한 ENUM 값:

<table>
  <tr>
    <th class="col-fourty">이름</th>
    <th class="col-twenty">값</th>
    <th class="col-fourty">설명</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>게재위치는 배너 광고 위치를 설명합니다.</td>
  </tr>
</table>

#### AdConstraintsObj

`adConstraints` 구성 개체에서 지정할 입력란:

<table>
  <tr>
    <th class="col-twenty">입력란 이름</th>
    <th class="col-twenty">유형</th>
    <th class="col-fourty">설명</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>문자열</td>
    <td>
      새 광고를 삽입할 때 페이지에 이미 있는 광고(수동으로 배치했든 전에 amp-auto-ads로 배치했든)와 떨어져야 하는 최소 거리를 나타내는 <strong>필수</strong> 입력란.
      값은 단위 접두어와 함께 숫자로 표시됩니다. 예를 들어 '10px'는 10픽셀, '0.5vp'는 절반의 표시 영역 높이를 의미합니다. 음수 값은 유효하지 않습니다. 지원 단위는 다음과 같습니다.
      <ul>
        <li>px - 픽셀</li>
        <li>vp - 표시 영역 높이의 배수</li>
      </ul>
      이 값은 페이지에 이미 있는 광고의 수가 subsequentMinSpacing 입력란에 지정된 <code>adCount</code> 확인 숫자보다 작은 경우에만 적용됩니다.
    </td>
  </tr>
  <tr>
    <td><code>subsequentMinSpacing</code></td>
    <td>Array&lt;!SubsequentMinSpacingObj&gt;</td>
    <td>
      삽입 시 페이지에 이미 있는 광고의 수를 기반으로 적용해야 할 광고 간격을 지정하는 <em>선택적</em> 입력란.
    </td>
  </tr>
  <tr>
    <td><code>maxAdCount</code></td>
    <td>숫자</td>
    <td>
      <code>amp-auto-ads</code>가 페이지에 게재할 수 있는 최대 광고 수를 지정하는 <strong>필수</strong> 입력란. 수동으로 게재한 광고와 <code>amp-auto-ads</code>로 게재한 광고 모두 이 합계에 포함됩니다.
          예를 들어, 이 입력란을 5로 설정했는데 페이지에 수동으로 게재한 광고가 3개 있으면 <code>amp-auto-ads</code>는 최대 2개의 광고를 추가로 게재할 수 있습니다.
        </td>
    </tr>
  </table>

#### SubsequentMinSpacingObj

`subsequentMinSpacing` 구성 개체에서 지정할 입력란. 이미 페이지에 있는 광고의 수를 기반으로 추가적인 광고 간에 필요한 간격을 변경하는 데 `subsequentMinSpacing` 항목을 사용할 수 있습니다. 예를 들어 다음 시나리오를 고려해볼 수 있습니다.

* 페이지에 기존 광고 2개
* subsequentMinSpacing 입력란:
<code>
  [
    {adCount: 3, spacing: "500px"},
    {adCount: 5, spacing: "1000px"},
  ]
</code>

초기에는 페이지에 2개의 기존 광고가 있으므로 매핑이 일치하지 않습니다.
따라서 최소 간격의 기본값은 `AdConstraints` 개체의 initialMinSpacing입니다.
`amp-auto-ads`는 `adContraints`를 위반하지 않으면서 사용할 수 있는 게재위치가 고갈될 때까지 재귀적으로 광고의 게재를 시도합니다.
`amp-auto-ads`가 첫 번째 광고를 게재한 후 페이지에는 3개의 광고가 있게 되고 `subsequentMinSpacing`에 3개(또는 그 이상) 광고에 대한 매핑이 있으므로 최소 간격은 이제 500px이 됩니다.
5개 광고에 대한 규칙이 있기 때문에 이것은 페이지에 5개의 광고가 있게 될 때까지 적용됩니다. 따라서 6번째 광고를 삽입하려면 최소 1,000px이 확보되도록 다른 광고를 지워야 합니다.

<table>
  <tr>
    <th class="col-twenty">입력란 이름</th>
    <th class="col-twenty">유형</th>
    <th class="col-fourty">설명</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>숫자</td>
    <td>
      <strong>필수</strong> 입력란.
          이 규칙을 적용할 페이지에 이미 있는 최소 광고 개수(더 나은 일치 규칙이 없다고 가정). 자세한 내용은 위의 설명을 참조하세요.
        </td>
    </tr>
    <tr>
      <td><code>spacing</code></td>
      <td>문자열</td>
      <td>
        <code>adCount</code>를 기반으로 이 규칙이 일치할 때 적용되는 최소 광고 간격을 지정하는 <strong>필수</strong> 입력란.
            값은 단위 접두어와 함께 숫자로 표시됩니다. 예를 들어 '10px'는 10픽셀, '0.5vp'는 절반의 표시 영역 높이를 의미합니다. 음수 값은 유효하지 않습니다. 지원 단위는 다음과 같습니다.
            <ul>
            <li>px - 픽셀</li>
            <li>vp - 표시 영역 높이의 배수</li>
          </ul>
        </td>
      </tr>
    </table>

## 유효성 검사

AMP 유효성 검사 도구 사양의 [amp-auto-ads 규칙](https://github.com/ampproject/amphtml/blob/master/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii)을 참조하세요.

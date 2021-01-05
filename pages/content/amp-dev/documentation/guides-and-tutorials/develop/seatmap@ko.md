---
"$title": 좌석 맵 제작하기
"$order": '104'
description: 티켓 발권 웹 앱에서 좌석 맵은 중요한 부분이지만 AMP 구현은 까다로울 수 있습니다. 이 글을 읽고 AMP에서 좌석 맵을 구현하는 방법을 알아보세요.
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- pbakaus
---

티켓 발권 웹 앱에서 좌석 맵은 중요한 부분이지만 AMP 구현은 까다로울 수 있습니다. 이 글을 읽고 AMP에서 지원되는 AMP 컴포넌트를 조합하여 좌석 맵을 구현하는 방법을 알아보세요.

[tip] 하단에 설명된 예제를 구현하는 라이브 샘플은 [여기](../../../documentation/examples/documentation/SeatMap.html)에서 제공됩니다. [/tip]

## 필요한 AMP 컴포넌트

먼저 필요한 컴포넌트를 살펴보도록 하겠습니다.

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md)를 사용하면 화면을 두 번 탭하거나 핀칭 동작으로 콘텐츠 확대/축소 또는 화면 이동이 가능합니다. 이 컴포넌트는 좌석 맵 구현의 기본이 됩니다.

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md)는 CORS JSON 엔드포인트에서 콘텐츠를 가져와 제공된 템플릿을 활용하여 렌더링합니다. 현재 좌석 맵의 예약 현황을 가져오는 데 사용되며 사용자는 항상 최신 데이터를 확인할 수 있습니다.

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md)로 페이지에 대화형 기능을 추가할 수 있습니다. 선택된 좌석이 몇 개인지 추적하는 데 필요합니다.

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md)는 옵션 메뉴를 제시하고 사용자가 선택할 수 있도록 하는 제어 기능을 표시합니다. 전체 좌석 맵은 각 좌석을 옵션으로 하는 옵션 메뉴로 간주될 수 있습니다. CSS 표현식을 사용하면 선택한 좌석 상태 스타일링이 한결 간편합니다. 예를 들어, 다음 표현식을 통해 선택된 좌석을 주황색으로 표시할 수 있습니다.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## 요구 사항

1. 각 좌석이 `rect` 요소로 표현되는 SVG로 좌석 맵을 그리려면 각각의 좌석과 관련한 다음 정보가 필요합니다. 위치 `x` 및 `y`, `width`(너비) 및 `height`(높이), 가능하다면 사각형 모서리를 둥글게 처리하는 `rx` 및 `ry`.
2. 예약 시 사용할 수 있는 좌석별 고유 식별자.
3. `viewbox` 속성에 사용할 수 있는 좌석 맵의 전체 너비 및 높이 측정.

## 좌석 맵 그리기

좌석 맵은 [`amp-list`](../../../documentation/components/reference/amp-list.md) 및 [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md)를 통해 렌더링됩니다. [`amp-list`](../../../documentation/components/reference/amp-list.md) 호출에서 데이터를 수신한 후 해당 데이터를 사용하여 좌석을 반복할 수 있습니다.

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## 예약 불가 좌석 스타일링

상단 예제에서 `{% raw %}{{unavailable}}{% endraw %}`는 JSON 엔드포인트로 반환된 필드 값이며 예약 불가 좌석의 스타일링에 사용됩니다. 이러한 접근 방식을 사용하면 좌석이 예약 불가능한 경우 `option="{{id}}"`와 같은 속성을 삭제할 수 없습니다. 템플릿으로 전체 페이지의 `<html>` 요소를 감쌀 수 없기 때문입니다.

이를 대체하는 한층 복잡한 접근 방식은 다음과 같이 태그를 반복하는 것입니다.

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## 좌석 맵 크기 지정

좌석 맵의 크기가 고정되지 않으면 좌석 맵이 포함된 [`amp-list`](../../../documentation/components/reference/amp-list.md)의 크기 지정이 어렵습니다. [`amp-list`](../../../documentation/components/reference/amp-list.md)에는 고정된 치수가 필요하거나 `layout="fill"`이 사용되어야 합니다(목적: 상위 컨테이너의 가능한 공간 활용). 이 문제를 처리하는 두 가지 방식이 있습니다.

1. 헤더나 푸터와 같은 기타 컴포넌트에서 사용되는 공간을 알고 있는 경우 페이지의 가능한 공간을 계산합니다. CSS에서 `calc` 표현식을 사용하고 [`amp-list`](../../../documentation/components/reference/amp-list.md)의 상위 div를 `min-height`로 지정하여 이러한 계산을 수행할 수 있습니다.
2. 페이지 레이아웃 높이를 알고 있다면 플렉스 레이아웃을 사용합니다.

## amp-pan-zoom 스타일링

이전 섹션에 명시된 접근 방식을 사용한다면 [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md)에서도 `layout="fill"`이 사용되어야 합니다.

[tip type="tip"] **TIP –** 좌석 맵 주위의 공백을 유지하는 동시에 핀칭 및 확대/축소 영역으로 구성하려면,

- SVG에 감싸는 div를 추가합니다.
- 패딩을 추가합니다.

감싸는 div 없이 SVG에 여백을 추가하면 여백 부분이 확대/축소 및 핀칭 영역으로 지정되지 않습니다. [/tip]

## 처리 상태

사용자가 다른 좌석을 클릭한 경우 다음과 같은 방식으로 `amp-state`를 활용하여 변수의 좌석 `id`를 추적할 수 있습니다.

- 모든 좌석에 [`amp-bind`](../../../documentation/components/reference/amp-bind.md) 표현식을 더해 목록에 선택한 좌석을 추가합니다.
- 또는 [`amp-selector`](../../../documentation/components/reference/amp-selector.md) 및 `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` 액션이 함께 사용하여 선택한 모든 좌석을 목록에 추가합니다.

첫 번째 접근 방식에는 [`amp-selector`](../../../documentation/components/reference/amp-selector.md)가 추가로 필요하지 않지만 좌석이 선택/선택 해제될 시마다 모든 [`amp-bind`](../../../documentation/components/reference/amp-bind.md) 표현식이 평가되므로 좌석 맵이 매우 느려질 수 있습니다.

또한 두 번째 접근 방식을 활용하면 템플릿으로 렌더링되는 모든 좌석에서 [`amp-bind`](../../../documentation/components/reference/amp-bind.md) 표현식 중복이 감소합니다.

## 최종 HTML 구조

좌석 맵 최종 HTML 구조는 다음을 참조하세요.

[sourcecode:html]
{% raw %}<div class="seatmap-container">
  <amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
    <template type="amp-mustache">
      <amp-pan-zoom layout="fill" class="seatmap">
        <amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
          <div class="svg-container">
            <svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
            {{#seats}}
              <rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
            {{/seats}}
            </svg>
          </div>
        </amp-selector>
      </amp-pan-zoom>
    </template>
  </amp-list>
</div>{% endraw %}
[/sourcecode]

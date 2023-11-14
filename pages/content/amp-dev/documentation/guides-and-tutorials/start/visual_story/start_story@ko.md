---
$title: 본격적으로 스토리 시작하기
---

이제부터 작성할 이야기는 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 컴포넌트안에 들어가는데 [`amp-story`](../../../../documentation/components/reference/amp-story.md)는 이야기를
구성하는 모든 페이지를 포함하는 컨테이너 역할을 합니다. [`amp-story`](../../../../documentation/components/reference/amp-story.md) 컴포넌트는
사용자의 동작(gesture)과 이동(navigation)을 처리하는 UI 셸 역할도 합니다.

[`amp-story`](../../../../documentation/components/reference/amp-story.md)는 커스텀 AMP 컴포넌트라서 해당 AMP 문서에서 미리
필요한 스크립트를 추가해주어야 합니다. 예제에서 보면 `pets.html` 파일을 에디터에서
**열어서** `<head>` 섹션안에 다음과 같은 스크립트를 **추가**해야 합니다:

```html hl_lines="2 3"
<head>
<script async custom-element="amp-story"
        src="https://ampjs.org/v0/amp-story-1.0.js"></script>
</head>
```

이제 `<amp-story>` 요소를 `<body>`안에 **추가**합니다. 참, `standalone` 속성을
추가하는 것을 잊지 마십시오.

```html hl_lines="2 3"
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

여기서 중요한 것 한가지. `<body>` 요소는 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 컴포넌트를 딱 하나만
포함해야만 합니다. 그리고 다른 요소들은 모두 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 컴포넌트안에
들어있어야 합니다.

## 메타 정보 설정

스토리를 쉽게 찾을 수 있어야 AMP 스토리 생태계가 건강하게 유지될 수 있습니다.
그러기 위해서 스토리에 대한 약간의 정보를 메타데이터 형태로 제공해주어야 합니다.
예를 들어,

* 스토리의 제목: `title` 속성입니다. 이를테면 “Joy of Pets” 텍스트가 들어갑니다.
* 퍼블리셔의 이름: `publisher` 속성입니다. 이를테면 “AMP tutorials” 텍스트가 들어갑니다.
* 퍼블리셔의 로고: `publisher-logo-src` 속성입니다. 로고 이미지의 URL을 넣는데, 이미지는 1x1 비율(aspect ratio) 또는 정사각형이어야 합니다.
* 스토리의 포스터(대표) 이미지: `poster-portrait-src` 속성에 들어갑니다. 포스터 이미지의 URL을 넣는데, 반드시 3x4 비율의 세로방향(portrait) 이미지로 넣습니다.

자, [`amp-story`](../../../../documentation/components/reference/amp-story.md) 태그의 필수 속성에 적절한 값을 채워보겠습니다:

```html hl_lines="2 3 4 5"
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
```

위의 필수 속성외에도 다른 속성도 있습니다. 다른 속성에 대해서도 알고 싶으면
[`amp-story`](../../../../documentation/components/reference/amp-story.md) 레퍼런스 문서의 [attributes](../../../../documentation/components/reference/amp-story.md#attributes)
섹션을 참고하십시오.

[tip type="note"]

여기에서 설명한 메타데이터 속성은 해당 페이지의 Structured Data (예를 들면
JSON-LD)를 대체하는 것은 아닙니다. [`amp-story`](../../../../documentation/components/reference/amp-story.md)  들어가는 title, publisher 등이
페이지에 이미 있는 Structured Data와 중복된다고 Structured Data를 없애면
안된다는 뜻입니다.
참고로, [Structured Data](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata)는
AMP 문서(AMP 스토리를 포함하여)를 여러 플랫폼이나 서비스에서 문서가 잘 보여줄 수
있게하는 메타데이터 포맷입니다.

[/tip]

여기까지 왔으면 껍데기만 만들어진 셈인데 아직 유효(valid)한 문서는 아닙니다.
[`amp-story`](../../../../documentation/components/reference/amp-story.md) 컴포넌트는 최소한 하나 이상의 페이지를 갖고 있어야합니다. 그럼 이제
페이지를 만들어보겠습니다.

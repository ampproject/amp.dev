---
'$title': 웹 페이지에 스토리 삽입
$order: 3
description: AMP Story Player
formats:
  - websites
  - stories
---

스토리는 몰입을 유도하는 전면 경험입니다. 고유 URL을 통해 오픈 웹에서 호스팅되므로 쉽게 공유할 수 있습니다. 하지만 스토리를 블로그, 제품 설명 또는 뉴스 기사와 같은 사이트에 통합하려는 경우에는 어떻게 해야 할까요?

AMP Story Player를 사용하면 웹 페이지에 사용자가 탭하거나 클릭할 수 있는 스토리를 삽입할 수 있습니다. 단계별 가이드를 따라 삽입 방법을 알아보세요.

# 비 AMP 페이지에 스토리 표시

비 AMP 페이지에도 AMP 스토리를 삽입하면 사용자가 호스트 문서를 떠나지 않고도 해당 스토리를 탭하거나 클릭할 수 있습니다.

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## AMP 스토리 플레이어 삽입

비 AMP 페이지에서 AMP 스토리를 표시하려면 [`amp-story-player`](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md) 요소를 사용해야 합니다.

### 스크립트 가져오기

문서 헤드에 필수 스크립트 두 개를 포함합니다.

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link
  href="https://cdn.ampproject.org/amp-story-player-v0.css"
  rel="stylesheet"
  type="text/css"
/>
```

첫 번째 스크립트는 플레이어 로직을 가져오며 두 번째 스크립트는 기본 스타일링을 설정합니다.

### 스토리 지정

문서 `body`에 `<amp-story-player>` 요소를 포함합니다. 다음으로 `<a>` 태그를 `<amp-story-player>` 요소에 배치하여 원하는 스토리를 지정합니다. `href`를 사용해 스토리의 위치를 지정합니다. `href` 태그는 호스팅된 스토리 또는 상대 경로의 URL을 지정할 수도 있습니다. 스토리 제목은 `<a>` 태그 안에 배치합니다.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
  >
    Stories in AMP - Hello World
  </a>
</amp-story-player>
```

### 플레이어 크기 조정

스토리 플레이어의 `width`, `height` 및 기타 스타일 인라인을 정의하거나 다른 요소의 스타일처럼 설정할 수 있습니다.

```html
<body>
  ...
  <amp-story-player style="width: 360px; height: 600px;">
    ...
  </amp-story-player>
  ...
</body>
```

We recommend maintaining a 3:5 aspect ratio for the best user experience, but you may define any width and height.

#### 반응형 크기 조정

스토리 플레이어의 반응성은 다른 블록 요소와 마찬가지로 작동합니다. 아래 예시와 같이 너비 및 높이 비율을 유지하려면 CSS를 사용하세요.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;"> ... </amp-story-player>
```

### 플레이스홀더 제공

스토리의 `<a>` 태그에 다음 구성과 함께 `<img>` 태그를 하위 요소로 추가하여 대표 포스터 이미지를 삽입합니다. AMP 스토리 플레이어는 전체 스토리 로딩 중 해당 이미지를 표시합니다.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes this story.
  </a>
</amp-story-player>
```

최상의 사용자 경험을 위해 포스터 이미지를 포함하는 것이 권장됩니다. 포스터 이미지를 포함하지 않으면 스토리 플레이어는 회색 배경의 로딩 스피너를 표시합니다.

## 여러 스토리 삽입

You may add multiple stories in the same `<amp-story-player>` element by defining multiple `<a>` tags. The player presents the second story’s cover page after user’s tap through the first.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

`<amp-story-player>` 인스턴스는 원하는 개수만큼 삽입할 수 있으며 별도의 뷰어로 각각 표시됩니다.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

# AMP 페이지에 스토리 표시

AMP 페이지에서 `<amp-story-player>` 컴포넌트를 사용하려면 [amp-story-player의 AMP 버전](https://amp.dev/documentation/components/amp-story-player/?format=stories) 문서를 읽어보세요.

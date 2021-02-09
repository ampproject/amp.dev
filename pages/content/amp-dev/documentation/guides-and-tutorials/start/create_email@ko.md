---
'$title': 첫 AMP 이메일 작성
$order: 0
description: 첫 이메일을 작성하며 AMP 이메일의 차별점을 알아보세요.
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

이메일 발신자는 이메일용 AMP를 통해 이메일 메시지에서 AMP를 사용하여 새로운 기능의 모든 호스트를 지원할 수 있습니다. AMP로 작성된 이메일에는 이미지 캐러셀 또는 아코디언과 같은 인터랙티브 요소 및 메시지의 최신 콘텐츠가 포함될 수 있으며 수신자는 받은 편지함을 떠나지 않고도 양식에 응답하는 등의 조치를 취할 수 있습니다.

이메일용 AMP는 기존 이메일과 호환 가능합니다. 메시지의 AMP 버전이 HTML 및 일반 텍스트와 함께 새로운 MIME 부분으로 이메일에 임베딩되어 모든 메일 클라이언트에서 호환성을 보장합니다.

팁: 이메일용 AMP를 지원하는 이메일 플랫폼(ESP), 클라이언트 및 제공 업체 목록은 FAQ에서 [지원되는 이메일 플랫폼](../../../support/faq/email-support.md)을 참조하세요.

이 튜토리얼에서는 AMP로 작동하는 동적 이메일을 처음으로 작성하여 전송하는 법을 배웁니다. 최종 코드는 [이곳](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73)에서 확인할 수 있습니다.

# AMP 이메일 상용구로 시작하기

AMP 플레이그라운드는 이메일용 AMP 형식을 지원하여 AMP 이메일의 개발, 테스트 및 유효성 검사를 실행할 수 있습니다. [AMP Playground](https://playground.amp.dev/?runtime=amp4email)를 열고 왼쪽 상단의 형식이 `AMP for Email`로 설정되었는지 확인하세요. 이제 다음 코드가 표시될 것입니다.

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

이 예시에는 모든 필수 마크업 및 유효한 AMP 이메일을 위한 최소한의 코드가 포함되어 있습니다. 또한 오른쪽 상단의 드롭다운 메뉴를 클릭하면 유효한 이메일 템플릿의 다양한 기타 예시를 목록으로 확인하실 수 있습니다.

그럼, 기존 HTML 이메일과 AMP 이메일의 주요 차이점을 간략하게 살펴볼까요.

- AMP 이메일은 html 태그 내에 `⚡4email` 또는 `amp4email`을 사용하여 AMP로 작성된 이메일임을 표시합니다.
- 또한 `<head>` 태그에는 AMP 런타임을 로드하는 `<script>` 태그가 사용되어야 합니다. `<script async src="https://cdn.ampproject.org/v0.js"></script>`
- CSS 상용구는 AMP가 로드될 때까지 처음에 콘텐츠를 숨김 처리합니다. ` <style amp4email-boilerplate>body{visibility:hidden}</style>`

기존에 이메일 작업 경험이 있다면 이메일에 스크립트를 배치하는 아이디어에 대한 우려를 느끼실 겁니다! 하지만 안심하세요. AMP를 지원하는 이메일 제공 업체는 철저한 검사를 수행하여 검증된 AMP 스크립트만이 클라이언트에서 실행되도록 허용합니다. 따라서 보안상 취약성 없이도 동적이고 인터랙티브한 기능이 수신자의 메일함에서 바로 실행될 수 있습니다! AMP 이메일의 필수 마크업에 대한 자세한 내용을 이곳에서 읽어보세요.

[tip type="important"] [지원되는 컴포넌트](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md)의 AMP 스크립트만이 AMP 이메일에 사용될 수 있습니다. [/tip]

# 이미지 사용하기

이메일에 사용되는 대다수의 HTML 태그는 AMP 이메일에서도 사용 가능합니다. 하지만 `<img>` 태그와 같은 일부 태그는 [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md)처럼 동등한 AMP 태그로 대체됩니다.

`<amp-img>` 태그 사용 시에는 이미지의 너비와 높이가 정의되어야 하며, `<img>`와는 달리 `<amp-img>` 태그는 `</amp-img>`를 통해 명시적으로 닫아야 합니다.

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

또한 GIF 파일은 [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md)로 지원됩니다.

이메일이 서버에서 호스팅되지 않으므로 AMP 이메일에서 URL은 절대 경로를 사용해야 하며, HTTPS여야 합니다.

[Placekitten](https://placekitten.com/)은 플레이스홀더로 고양이 이미지를 사용하는 웹사이트입니다. 이 사이트는 URL에서 이미지 크기를 직접 선택할 수 있게 허용합니다!

아래 코드를 추가하여 첫 번째 이메일에서 이미지를 사용할 수 있습니다.

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## 반응형 이메일 제작하기

사용자는 다양한 기기와 화면 크기로 이메일을 읽습니다. AMP의 기본 제공 레이아웃 시스템을 사용해보세요! [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) 시스템 및 미디어 쿼리를 활용하면 반응형 이메일을 손쉽게 구현할 수 있습니다. 배치된 고양이 이미지의 크기를 화면에 맞춰 적절히 조절하려면 `layout="responsive"` 속성을 `<amp-image>`에 추가하시면 됩니다.

[tip type="read-on"] [AMP가 레이아웃 및 미디어 쿼리와 함께 작동하는 방식을 자세히 알아보세요](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

브라우저 창을 확대하거나 축소하여 이미지 크기 변경을 확인할 수 있습니다! [지원되는 레이아웃 전용 컴포넌트 목록 이곳](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout)에서 살펴보세요.

# 표시 및 레이아웃

이미지 하나도 괜찮지만 여러 개의 이미지를 표시하려면 어떻게 해야 할까요? 이메일용 AMP는 아코디언 및 사이드바와 같은 레이아웃 요소를 지원합니다.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

이번 튜토리얼에서는 [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md)을 활용하여 입양을 기다리는 고양이 사진을 표시해보겠습니다.

이메일 헤드에 `amp-carousel` 스크립트를 추가합니다.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
```

다음으로 `<amp-carousel>` 태그로 첫 번째 이미지를 감싸줍니다.

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

변한 게 없는 듯 보인다면 제대로 된 것입니다! 캐러셀이 `type=slides` 속성에 추가되어 사진이 한 번에 한 장씩 표시됩니다. 태그 안에 사진 하나만을 배치했으므로 사용자 슬라이더 화살표가 제공되지는 않습니다.

다음으로 고양이 이미지 자리를 입양을 기다리는 `<amp-carousel>` 내부의 AMP 고양이 이미지로 바꿔보겠습니다.

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

이제 캐러셀의 왼쪽 또는 오른쪽의 탐색 화살표를 클릭하여 사진을 바꿀 수 있습니다.

## 스타일링을 추가하여 전송

AMP는 `<style amp-custom>` 태그 내의 문서 헤드에서 스타일링을 허용합니다. 또한 기존에는 금지되었던 CSS 클래스 및 의사 클래스도 이제 사용할 수 있습니다. [이곳에서 전체 목록을 확인하세요](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

`Hello, AMP4EMAIL world`를 실제 제목으로 업데이트해보겠습니다.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

다음으로 헤드에 스타일링을 추가합니다.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# 동적 기능 추가하기

일반적으로 이메일에서는 정적 콘텐츠만이 허용됩니다. 하지만 AMP는 이메일에 무궁무진한 가능성을 더해줍니다! 이제 사용자는 [양식](/content/amp-dev/documentation/components/reference/amp-form.md)에 응답하거나 [콘텐츠가 동적으로 업데이트되는 목록](/content/amp-dev/documentation/components/reference/amp-list.md)을 받고 콘텐츠와 상호작용할 수 있습니다.

이번 튜토리얼에서는 [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md)를 활용하여 사용자가 고양이 슬라이드를 보고 있을 경우 입양 가능한 고양이의 이름과 설명이 표시되도록 해보겠습니다. 먼저 이메일 헤드에 `amp-bind` 스크립트를 추가합니다.

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

다음으로 AMP 바인드 변수 "myState"를 [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state) 태그 내의 JSON 문자열로 선언합니다. 고양이 사진이 4장 있으므로, 4장 모두에 대한 상태를 추가합니다.

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[AMP 액션 및 이벤트](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md)는 다양한 상태를 트리거합니다. 이번 예제에서는 사용자가 캐러셀 탐색 화살표를 클릭할 경우 상태가 업데이트되도록 설정할 것입니다. amp-carousel은 [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides) 이벤트를 호출합니다. 해당 이벤트에서 `AMP.setState`를 통해 `currentCat` 변수가 업데이트됩니다.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

이 코드는 `currentCat`의 상태가 캐러셀 색인의 고양이 사진과 일치하도록 설정합니다. 따라서 `event.index=2` 슬라이드에 있을 경우 상태는 배열의 색인 2에 포함된 항목으로 매핑됩니다.

이제 표시되어야 할 나머지 항목은 고양이 이름과 설명뿐입니다. 닫는 `amp-carousel` 태그에 다음 코드를 추가하세요.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

`amp-bind` 확장자는 [표현식](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) 및 [바인딩](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings)을 사용해 콘텐츠를 동적으로 변경합니다. 상단의 코드 예시는 `[text]` 바인딩을 활용하여 상태가 변경될 때마다 `"myState.cats[currentCat].name"`를 평가하는 방식으로 <br> `<span>` 태그 내의 텍스트를 업데이트합니다.

[tip type="note"] 성능을 유지하고 예기치 않은 콘텐츠 이동의 위험을 방지하기 위해 amp-bind는 페이지 로드 시 표현식을 평가하지 않습니다. 즉, 시각적 요소에는 기본 상태가 제공되며, 초기 렌더링 시 시각적 요소가 amp-bind에 의존하지 않습니다.[/tip]

`</div>` 태그 다음에 고양이 설명을 잊지 말고 추가해 주세요!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

이제 캐러셀에서 고양이 사진을 변경할 때마다 이름과 설명도 함께 업데이트됩니다!

# AMP 이메일 전송하기

받은 편지함으로 이메일을 전송하는 방법은 [AMP 이메일 테스트 문서를 참조](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)하세요.

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

축하합니다! 이제 첫 AMP 이메일을 전송하셨습니다!

다음 단계로 [이메일용 AMP 기본 문서를 읽어보세요](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).

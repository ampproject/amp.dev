---
'$title': 이메일용 AMP 기초
$order: 1
description: 올바른 AMP 이메일 작성을 시작하기 위해 알아야 할 모든 것.
author: CrystalOnScript
formats:
  - email
---

AMP에 익숙하시다면 좋은 소식이 있습니다! 이메일용 AMP는 AMP HTML 라이브러리의 하위 집합에 불과하다는 것이죠! AMP를 잘 모르셔도 괜찮습니다! 이 가이드에서 올바른 AMP 이메일 작성을 시작하는 데 필요한 모든 것을 알려드릴 테니까요!

## 필수 마크업

AMP 이메일은 전형적인 HTML 이메일과 유사하게 보이지만 몇 가지 차이점이 있습니다. 아래에서 올바른 AMP 이메일 작성에 필요한 최소한의 마크업을 확인해 보세요.

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
  </head>
  <body>
    Hello, AMP4EMAIL world.
  </body>
</html>
```

AMP 이메일을 지원하는 이메일 제공 업체는 즐겁고 안전한 사용자 경험을 보장하기 위해 보안 검사를 설정했습니다. AMP로 작성된 이메일은 다음 요구 사항을 모두 충족해야 합니다.

- `<!doctype html>` 문서형 선언으로 시작합니다. 이 요건은 HTML 표준이기도 합니다.
- 더 멋진 이메일의 경우 최상위 `<html amp4email>` 태그 또는 `<html ⚡4email>` 태그를 포함합니다. 이러한 태그는 문서를 AMP 이메일로 식별하여 적합하게 처리할 수 있습니다.
- `<head>` 및 `<body>` 태그를 모두 정의합니다. 이 요건은 HTML에서 선택 사항이지만 AMP는 완벽을 기합니다!
- `<head>` 태그의 첫 번째 하위 요소로 `<meta charset="utf-8>` 태그를 포함하여 페이지의 인코딩을 식별합니다.
- `<head>` 태그에 배치된 `<script async src="https://cdn.ampproject.org/v0.js"></script>` 태그를 통해 AMP 라이브러리를 가져옵니다. 라이브러리 없이는 AMP로 제작 가능한 멋진 동적 기능들이 작동하지 않습니다! 모범 사례로서 `<meta charset="utf-8">` 태그 바로 아래 `<head>` 태그에 가능한 초기에 포함되어야 합니다.
- AMP 이메일 상용구를 `<head>`에 배치하여 AMP 라이브러리가 로드되기 전까지 초반에는 이메일 콘텐츠를 숨깁니다.

```html
<head>
  ...
  <style amp4email-boilerplate>
    body {
      visibility: hidden;
    }
  </style>
</head>
```

### AMP 전용 태그 대체

이메일용 AMP 라이브러리는 AMP HTML 라이브러리의 하위 집합이므로 여러 동일한 규칙이 적용됩니다. AMP 전용 태그는 리소스 소모가 큰 HTML 태그를 교체하며 정의된 너비 및 높이를 필요로 합니다. 따라서 AMP 상용구는 사용자 기기에서 콘텐츠가 표시되는 방식이 확인되기 전까지 콘텐츠를 숨길 수 있습니다.

#### 이미지

페이지를 효과적으로 표시하려면 모든 `<img>` 태그는 [`<amp-img>`](../../../documentation/components/reference/amp-img.md) 태그로 대체되어야 합니다. `<amp-img>` 태그는 정의된 너비 및 높이를 필요로 하며 [AMP 레이아웃 시스템](amp-html-layout/index.md)을 지원합니다.

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

`<amp-img>` 태그는 반응형 디자인을 제어하고 폴백을 설정하는 강력한 기본 기능을 지원합니다.

[tip type="note"] AMP [레이아웃 및 미디어 쿼리](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email)를 사용하고 [이미지 폴백](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)을 설정하는 방법을 자세히 알아보세요. [/tip]

#### GIF

AMP는 GIF 이미지 전용 태그인 [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email)를 제작했습니다. 이 태그를 사용하면 애니메이션이 화면에 표시되지 않을 경우 AMP 런타임 시 CPU 사용량을 줄일 수 있습니다. `<amp-img>`와 유사하게 너비와 높이는 정의되어 있으며 요소에는 닫는 태그가 포함되어야 합니다.

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

또한 이 태그는 `src` 파일 로딩 중 표시할 선택적 `placeholder` 하위 요소가 있으며 AMP 레이아웃 시스템을 지원합니다.

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## 이메일 스타일링 <a name="emails-with-style"></a>

모든 이메일 클라이언트와 마찬가지로 AMP는 인라인 `style` 속성을 허용하지만 이메일 헤드의 `<style amp-custom>` 태그 내부의 CSS도 지원합니다.

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

HTML 이메일처럼 이메일용 AMP도 CSS 선택자 및 속성의 하위 집합을 제한적으로 지원합니다.

AMP를 지원하는 이메일 클라이언트에서 허용되는 CSS 전체 목록을 확인하려면 [이메일용 AMP 지원 CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) 문서를 참조하세요.

[tip type="important"] AMP는 스타일링 크기를 75,000 바이트로 제한합니다. [/tip]

## 허용되는 AMP 컴포넌트

AMP 이메일이 차세대 이메일로 간주되는 이유는 AMP 구성 요소의 동적, 시각적 및 대화형 기능 덕분입니다.

[이메일용 AMP에서 지원되는 컴포넌트 전체 목록](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md)은 이메일용 AMP 사양의 일부로 제공됩니다.

## 인증 요청

동적인 개인 맞춤형 이메일 콘텐츠에는 종종 사용자 인증이 필요합니다. 하지만 사용자 데이터 보호를 위해 AMP 이메일 내부의 모든 HTTP 요청은 프록시 처리되고 쿠키가 제거될 수 있습니다.

AMP 이메일의 요청 인증에 액세스 토큰을 사용할 수도 있습니다.

### 액세스 토큰

액세스 토큰은 사용자 인증에 활용됩니다. 이메일 발신자가 액세스 토큰을 제공하고 확인합니다. 발신자는 토큰을 사용해 AMP 이메일 액세스 권한이 있는 사용자만이 이메일에 포함된 요청을 전송할 수 있도록 합니다. 액세스 토큰은 암호학적으로 안전하고 시간 및 범위 제한이 있어야 하며 요청 URL에 포함됩니다.

아래 예시는 `<amp-list>`를 사용하여 인증된 데이터를 표시하는 방법을 보여줍니다.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

이와 유사하게 `<amp-form>` 사용 시에는 `action-xhr` URL에 액세스 토큰을 배치해야 합니다.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### 예시

다음 예시는 로그인한 사용자가 계정에 메모를 추가한 후 나중에 확인할 수 있는 가상의 메모 작성 서비스에 관한 것입니다. 이 서비스는 사용자인 `jane@example.com`에게 이전에 작성했떤 메모 목록이 포함된 이메일을 전송하려 합니다. 최근 사용자 메모는 `https://example.com/personal-notes` 엔드포인트에서 JSON 형식으로 제공됩니다.

이메일을 전송하기 전 해당 서비스는 `jane@example.com: A3a4roX9x`를 위해 암호학적으로 안전하며 사용이 제한된 액세스 토큰을 생성합니다. 이 액세스 토큰은 URL 쿼리 내부의 `exampletoken`이라는 필드 이름에 포함됩니다.

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

`https://example.com/personal-notes` 엔드포인트로 exampletoken 매개변수를 검사하고 해당 토큰과 연결된 사용자를 찾을 수 있습니다.

### 사용이 제한된 액세스 토큰

사용이 제한된 액세스 토큰은 메시지가 전송된 사용자가 액션을 수행할 수 있도록 요청 스푸핑 및 [리플레이 공격](https://en.wikipedia.org/wiki/Replay_attack)을 방지하는 보호를 제공합니다. 요청 매개변수에 고유 토큰 매개변수를 추가하고 액션이 호출되었을 시 이를 검사하여 보호를 수행할 수 있습니다.

토큰 매개변수는 특정 액션이나 특정 사용자만이 사용할 수 있는 키로 생성되어야 합니다. 요청된 액션이 수행되기 전 토큰 유효성 및 토큰이 사용자를 위해 생성한 토큰과 일치하는지 여부를 확인해야 합니다. 토큰이 일치하면 액션이 수행될 수 있으며 차후 요청 시 해당 토큰은 유효하지 않습니다.

액세스 토큰은 HttpActionHandler의 URL 속성의 일부로 사용자에게 전송되어야 합니다. 예를 들어 애플리케이션이 승인 요청을 `http://www.example.com/approve?requestId=123`에서 처리할 경우 추가 `accessToken` 매개변수 포함을 고려하고 `http://www.example.com/approve?requestId=123&accessToken=xyz`로 전송된 요청을 수신해야 합니다.

`requestId=123` 및 `accessToken=xyz` 조합은 미리 생성되어야 하며 `accessToken`이 `requestId`에서 추론될 수 없도록 합니다. `requestId=123`이며 `accessToken`이 없거나 `accessToken`이 `xyz`와 일치하지 않는 모든 승인 요청은 거부되어야 합니다. 이 요청이 완료되면 동일한 ID 및 액세스 토큰이 포함된 미래의 요청도 거부되어야 합니다.

## 다른 이메일 클라이언트에서 테스팅

이메일용 AMP를 지원하는 이메일 클라이언트는 통합에 도움이 되는 자체 문서 및 테스팅 도구를 제공합니다.

자세한 정보 및 이메일 클라이언트별 문서 링크는 [AMP 이메일 테스팅](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)을 참조하세요.

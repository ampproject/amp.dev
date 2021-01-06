---
"$title": Building a regular HTML page
"$order": '1'
description: 프로젝트 디렉토리에서 article.html라는 파일을 찾을 수 있습니다. 이 파일의 뉴스 기사를 AMP 페이지로...
---

프로젝트 디렉토리에서 [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html)라는 파일을 찾을 수 있습니다. 이 파일의 뉴스 기사를 AMP 페이지로 제작해보겠습니다.

1. `article.html `파일에서 전체 코드를 **복사**하고 새 파일에 붙여넣습니다.
2. 새 파일을 `article.amp.html`로 **저장**합니다.

[tip type="note"] 사실 AMP 파일의 이름을 반드시 `.amp.html`로 저장할 필요는 없으며 모든 확장자를 사용할 수 있습니다. 실제로 퍼블리셔가 URL의 매개변수를 사용하여 AMP 페이지와 표준 버전을 구별하는 경우도 일반적입니다. 예: `http://publisher.com/article.html?amp` [/tip]

`article.amp.html` 파일은 다음과 같이 표시되어야 합니다.

```html
<!doctype html>
<html lang="en">
  <head>

    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>
    </article>
    <img src="mountains.jpg">
  </body>
</html>
```

이 페이지는 뉴스 기사의 일반적인 정적 요소(CSS, JavaScript, 이미지 태그)를 사용하여 의도적으로 단순하게 구성했습니다.

현재 AMP 버전의 기사는 원본 기사를 그대로 옮겨 온 것에 불과합니다. 이를 AMP로 변환해보겠습니다.

시작하려면 AMP 라이브러리 파일을 추가합니다. 이 작업만으로 새 파일을 유효한 AMP 페이지로 구성할 순 없지만 문제 해결에 필요한 것을 파악하는 데 AMP 라이브러리가 어떻게 도움이 되는지 아래에서 확인할 수 있습니다.

AMP 라이브러리를 포함하려면 다음 줄을 `<head>` 태그 하단에 **추가**합니다.

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

브라우저에서 [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html)을 연 다음, 새 `article.amp.html` 페이지를 **로드**하고 Chrome이나 선호하는 브라우저에서 [Developer Console](https://developer.chrome.com/devtools/docs/console)을 **엽니다**.

Developer Console에서 JavaScript 출력을 검사할 때(Console 탭이 선택되어 있어야 함) 다음 로그 항목이 표시되어야 합니다.

```text
Powered by AMP ⚡ HTML
```

AMP 라이브러리에 포함된 [AMP 검사기](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)는 페이지를 유효한 AMP 문서로 변환하는 데 방해가 되는 요소가 있는지 알려줍니다. 다음 프래그먼트 식별자를 문서 URL에 추가하여 AMP 검사기를 **활성화**합니다.

```text
#development=1
```

예:

```text
http://localhost:8000/article.amp.html#development=1
```

Developer Console에 여러 유효성 오류가 표시되었을 것입니다(확인을 위해 브라우저 페이지를 직접 새로고침해야 할 수도 있음).

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='샘플의 AMP 유효성 오류') }}

이를 유효한 AMP 문서로 만들기 위해서는 모든 오류를 해결해야 합니다. codelab에서 처리할 작업입니다.

모바일 뉴스 기사로 작업하고 있었으므로 오류 해결을 시작하기 전에 브라우저의 개발자 도구에서 모바일 기기 환경을 **시뮬레이션**합니다. 예를 들어 Chrome DevTools에서는 휴대전화 아이콘을 클릭하고 메뉴에서 모바일 기기를 선택하면 됩니다.

브라우저에 다음과 같이 모바일로 시뮬레이션된 해상도가 표시됩니다.

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='AMP 페이지의 모바일 시뮬레이션') }}

이제 작업을 시작할 준비가 되었습니다. 유효성 오류를 하나씩 확인하고 AMP와 어떻게 관련되어 있는지 알아보도록 하겠습니다.

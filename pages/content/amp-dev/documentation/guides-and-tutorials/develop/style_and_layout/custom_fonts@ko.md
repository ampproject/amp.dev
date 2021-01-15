---
"$title": 사용자 지정 글꼴 추가하기
"$order": '6'
description: AMP 페이지에는 외부 스타일시트를 포함할 수 없지만 사용자 지정 글꼴은 추가할 수 있습니다. 다음의 2가지 방법으로 페이지에 사용자 지정 글꼴을 삽입...
formats:
- websites
- ads
- stories
author: pbakaus
---

AMP 페이지에는 외부 스타일시트를 포함할 수 없지만 사용자 지정 글꼴은 추가할 수 있습니다. 다음의 2가지 방법으로 페이지에 사용자 지정 글꼴을 삽입할 수 있습니다.

1. `<link>` 태그 사용(허용된 글꼴만 사용 가능)
2. `@font-face` 사용(제한 없이 모든 글꼴 허용)

### 1. `<link>` 사용

다음과 같이 `<link>` 태그를 사용하세요(일반적으로 페이지 헤드에 삽입).

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

다음 출처의 글꼴이 허용되며 링크 태그로 글꼴을 제공할 시 사용 가능합니다.

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. `@font-face` 사용

또는 AMP 스타일시트 내에서 [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)를 사용할 수 있습니다.

[sourcecode:html]
<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>
[/sourcecode]

[tip type="note"] <strong>참고 –</strong> `@font-face`를 사용하여 삽입된 글꼴은 HTTP 또는 HTTPS 방식으로 가져와야 합니다. [/tip]

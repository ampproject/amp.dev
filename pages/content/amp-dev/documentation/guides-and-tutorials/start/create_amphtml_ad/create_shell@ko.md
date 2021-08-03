---
'$title': 광고 쉘 생성하기
$order: 0
description: '가장 좋아하는 텍스트 에디터를 사용하여 my-amphtml-ad.html라는 이름의 HTML 파일을 생성합니다. 다음 HTML 마크업을 해당 파일에 붙여넣기합니다:...'
---

[AMPHTML 광고에 필요한 HTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md)은 [AMP 페이지에 필요한 AMPHTML](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)의 변형입니다. AMPHTML 광고 쉘을 생성하며 필수 코드를 익혀보겠습니다.

가장 좋아하는 텍스트 에디터를 사용하여 **`my-amphtml-ad.html`**라는 이름의 HTML 파일을 생성합니다. 다음 HTML 마크업을 해당 파일에 붙여넣기합니다:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
  </head>
  <body></body>
</html>
```

이 마크업은 유효한 기본 HTML 파일입니다. [반응형 뷰포트](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport)를 설정하고자 `meta` 뷰포트 태그가 추가되었습니다.

이제 HTML을 수정하여 AMPHTML 광고로 제작하겠습니다.

`<html> ` 태그에 `⚡4ads` 속성을 추가하면 문서가 AMPHTML 광고로 식별됩니다. 또는 유효한 다른 속성인 `amp4ads` 속성을 지정할 수도 있습니다.

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    ...
  </head>
</html>
```

[tip type="note"] **참조 –** AMP 페이지와는 달리 [AMPHTML 광고에는 `<link rel="canonical">` 태그가 필요하지 않습니다](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules). [/tip]

AMPHTML 광고는 자체적인 AMP 런타임 버전을 필요로 하므로 다음 `<script>` 태그를 문서의 `<head>` 섹션에 추가합니다.

```html
<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
```

AMPHTML 광고에는 AMP 페이지와는 다르고 훨씬 단순한 [상용구](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) 스타일 라인이 필요합니다. 다음 코드를 `<head>` 섹션에 추가합니다.

```html
<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>
```

AMPHTML 광고 스타일링을 위해 `<head>` 섹션의 `<style amp-custom>` 태그를 사용하여 AMPHTML 문서에 CSS를 인라인으로 삽입해야 합니다. 현재 예시에서는 기본 이미지 광고를 렌더링하는 것이므로 CSS는 필요하지 않습니다. 따라서 해당 태그도 추가하지 않습니다.

[tip type="note"] **참조 –** AMPHTML 광고의 경우 인라인 스타일 시트의 최대 크기는 *20 킬로바이트*입니다. [AMPHTML 광고 사양의 CSS 요구 사항](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css)을 자세히 알아보세요. [/tip]

HTML 파일의 완성된 코드는 다음과 같습니다.

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
    <style amp4ads-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body></body>
</html>
```

이제 유효한 AMPHTML 광고가 생성되었지만 이 광고는 비어 있습니다. 다음으로 이미지 광고를 제작해보겠습니다.

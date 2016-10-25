---
$title: 커스텀 폰트
$order: 5
---
[TOC]

AMP 페이지는 커스텀 폰트를 제외한 외부 스타일 시트를 포함할 수 없습니다.
커스텀 폰트를 페이지에 포함하기 위한 방법이 두가지 있습니다:

1. `<link>` 태그를 통해서 (허용하는 폰트 제공자만 사용 가능)
2. `@font-face`를 통해서 (제한 없음, 모든 폰트를 허용)

### 1. `<link>` 사용하기

(보통 페이지의 head에서) `<link>` 태그를 사용할 수 있습니다.

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

아래 origin들은 link 태그를 통한 폰트 제공을 허용하는 폰트 제공자입니다.

* Typography.com: **https://cloud.typography.com**
* Fonts.com: **https://fast.fonts.net**
* Google Fonts: **https://fonts.googleapis.com**
* Font Awesome: **https://maxcdn.bootstrapcdn.com**

### 2. `@font-face` 사용하기

`<link>` 대신, AMP 스타일시트에 [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)를 사용할 수 있습니다.

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

{% call callout('Note', type='note') %}
`@font-face`를 통해 포함하는 폰트는,
반드시 HTTP나 HTTPS 스킴으로 가져와야합니다.
{% endcall %}



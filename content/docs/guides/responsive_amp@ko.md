---
$title: 스타일 및 레이아웃 적용
$order: 0
toc: true
---
[TOC]


AMP HTML 페이지에서 스타일링과 레이아웃은 일반 HTML 페이지와 매우 유사하며,
마찬가지로 CSS 사용이 가능합니다.

그러나, AMP에서는 요소 표시를 더 잘 컨트롤 하기 위해서,
[플레이스홀더 & 폴백](/ko/docs/guides/author-develop/responsive/placeholders.html),
[srcset을 통한 고품질의 미려한 이미지 처리](/ko/docs/guides/author-develop/responsive/art_direction.html),
[레이아웃 속성](/ko/docs/guides/author-develop/responsive/control_layout.html) 같은 기능을 주고,
반응형 디자인 능력을 확장하며,
성능 및 사용성 이유로 인해 몇가지 CSS 사용에 제한을 두었습니다.

{% call callout('팁', type='success') %}
AMP에서 요소를 반응형으로 만드는 건 정말 쉽습니다.
단지 `layout="responsive"`를 해당 요소에 추가하기만 하면 됩니다.
{% endcall %}

## 페이지에 스타일 추가하기

모든 CSS는 문서의 헤드 내부의 `<style amp-custom>` 태그 안에 넣습니다.
예를 들면:

[sourcecode:html]
<!doctype html>
  <head>
    ...
    <style amp-custom>
      /* 커스텀 스타일은 모두 여기 넣습니다. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    ...
  </head>
[/sourcecode]

{% call callout('중요', type='caution') %}
당신의 페이지에 `<style amp-custom>` 태그는 한개만 넣을 수 있습니다.
    AMP는 한개까지만 허용합니다.
{% endcall %}

일반적인 CSS 속성과 class 혹은 요소 셀렉터를 이용하여 컴포넌트 스타일을 정의합니다.
예를 들어:

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive"
  </amp-img>
</body>
[/sourcecode]

{% call callout('중요', type='caution') %}
스타일이 AMP 내에서 허용하는 지 확인하길 바랍니다.
몇가지 스타일은 성능 이슈로 인해 허용하지 않습니다.
([Supported CSS](/ko/docs/guides/author-develop/responsive/style_pages.html)를 보시길 바랍니다).
{% endcall %}

## 반응형 레이아웃 요소

모든 보이는 AMP 요소에 `width`나 `height` 속성을 제공함으로써 위치와 크기를 정의할 수 있습니다.
이 속성들은 컨테이너와 함께 늘어날 수 있는 요소의 종횡비를 의미합니다.

레이아웃을 반응형으로 지정해야합니다.
요소의 사이즈는 width와 height 속성으로 제공한 종횡비에 맞춰
해당 컨테이너 요소의 width와 height에 맞추어 자동으로 리사이즈합니다.

{% call callout('함께 읽기', type='success') %}
Learn more about [supported layouts in AMP](/ko/docs/guides/author-develop/responsive/control_layout.html).
{% endcall %}

## 플레이스홀더와 폴백 제공하기
플레이스홀더와 폴백의 기본 지원은 당신의 유저가 비어있는 스크린을 두번 다시 볼 필요가 없음을 의미합니다.

{% call callout('함께 읽기', type='success') %}
Learn more about [placeholders and fallbacks](/ko/docs/guides/author-develop/responsive/placeholders.html).
{% endcall %}

## 미적 이미지 처리
AMP는 시나리오에 맞춘 이미지의 로드 세부 제어를 위해 `srcset`과 `sizes` 속성을 제공합니다.

{% call callout('함께 읽기', type='success') %}
Learn more about [art direction with srcset and sizes](/ko/docs/guides/author-develop/responsive/art_direction.html).
{% endcall %}

## 스타일과 레이아웃 유효성 검사기

AMP 유효성 검사기를 이용하여
페이지의 CSS와 레이아웃 값을 테스트할 수 있습니다.

유효성 검사기는 페이지의 CSS가 50,000 바이트 제한을 넘지 않았는 지,
허용하지 않는 스타일을 사용하였는 지, 페이지의 레이아웃 지원을 보장하는 지,
올바른 포맷인 지를 확인합니다.

[Style and layout errors](/ko/docs/reference/validation_errors.html#style-and-layout-errors)의 완전한 리스트를 확인할 수 있습니다.

페이지 내 CSS가 50,000 바이트 제한을 넘은 경우의 콘솔 에러 예제입니다:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

{% call callout('함께 읽기', type='success') %}
Learn more about how to [validate and fix your AMP pages](/ko/docs/guides/debug/validate.html).
{% endcall %}

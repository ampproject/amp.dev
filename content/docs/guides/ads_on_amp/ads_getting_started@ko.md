---
$title : "시작하기"
$order : 0
---

## AMP 페이지에서 손쉽게 광고를 제공하는 3가지 방법

어떻게 시작할 지 모르겠나요? 이 가이드에서는 AMP 페이지에 광고를 빠르고 쉽게 제공하는 방법을 배웁니다.

### 1. AMP 페이지에 `<amp-ads>` 컴포넌트 추가하기:

[sourcecode:html]
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
[/sourcecode]

`amp-ads` 컴포넌트를 추가함으로써, AMP 페이지에 광고 프레임워크를 추가할 수 있습니다.

### 2. `type` 속성 내에 ad 서버나 ad 네트워크 정의하기

[sourcecode:html]
<amp-ad
      type="a9">
  </amp-ad>
[/sourcecode]

지원하는 ad 네트워크 목록은 [여기](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks)에서 볼 수 있습니다.

### 3. ad 유닛에 width와 height를 정의하세요:

[sourcecode:html]
<amp-ad width="300"
      height="250"
      type="a9"
      data-aax_size="300x250"
      data-aax_pubname="test123"
      data-aax_src="302">
  </amp-ad>
[/sourcecode]

ad 유닛에 width와 height를 정의하여, AMP 페이지 내 ad 사이즈를 정의할 수 있습니다.

{% call callout('Note', type='note') %}
추가 데이터 속성은 서버에 배포하고 적절한 사이즈를 가져오도록 광고 네트워크에 알리는 것입니다. 각 광고 네트워크별로 보내는 속성이 다릅니다. [Learn more](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks).
{% endcall %}

### 4. [옵션] placeholder 정의:

[sourcecode:html]
 <amp-ad width="300"
      height="200"
      type="doubleclick"
      data-slot="/4119129/doesnt-exist">
    <amp-img placeholder src="placeholder-image.jpg"></amp-img>
  </amp-ad>
[/sourcecode]

AMP는 선택적인 placeholder 속성을 지원합니다. 
Ad 네트워크에 의해 광고를 볼 수 있는 상태가 될 때까지 대체화면을 보여줄 수 있습니다. 이렇게 하면 빈 공간이 보이지 않게 하여 더 나은 사용자 경험을 제공합니다.

{% call callout('Note', type='note') %}
[Learn more about `placeholder`](/docs/guides/responsive/placeholders#placeholders).
{% endcall %}

### 5. [옵션] fallback 속성 정의:

[sourcecode:html]
<amp-ad width="300"
      height="200"
      type="doubleclick"
      data-slot="/4119129/doesnt-exist">
    <amp-img fallback src="fallback-image.jpg"></amp-img>
  </amp-ad>
[/sourcecode]

AMP는 선택적인 fallback 속성을 지원합니다.
Ad 네트워크에 의해 광고를 받아올 수 없을 때 보여줄 fallback 요소를 고를 수 있습니다.

{% call callout('Note', type='note') %}
[Learn more about `fallback`](/docs/guides/responsive/placeholders#fallbacks).
{% endcall %}

### 6. 축하합니다! 이제 AMP 페이지에 광고를 제공할 수 있습니다.

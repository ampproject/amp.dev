---
$title: 페이지를 더 발견할 수 있게 만들기
---
[TOC]


뉴스 기사같은 몇가지 케이스에서, 같은 페이지가 AMP인 버전과 AMP가 아닌 버전을 원할 수 있습니다.
고려하기: 만약 Google 검색이 AMP가 아닌 페이지를 찾았다면, AMP 버전 페이지를 어떻게 찾을 수 있을까요?

### &lt;link&gt;를 이용한 연결

이러한 문제를 해결하기 위해,
`<head>` 요소 내 `<link>` 태그를 넣는 형태로
AMP 페이지에 AMP가 아닌 페이지에 대한 정보를 추가하고,
AMP가 아닌 페이지에 AMP 페이지에 대한 정보를 추가합니다.

AMP가 아닌 페이지에는 다음과 같이 추가합니다:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

AMP 페이지에는 다음과 같이 추가합니다:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### 페이지가 하나인 경우에는 어떻게 해야하나요?

만약 AMP 페이지 하나만 가지고 있다면,
단순히 자기 자신을 가리키는 `canonical` 링크를 추가해야합니다.

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## 추가 메타데이터를 통한 서드 파티 플랫폼 통합

종종 (AMP 페이지를 포함하거나 링크를 가져가는) 서드 파티 사이트에서 AMP 페이지라는 사실 외에 페이지에 대한 다른 정보를 알 필요가 있을 수 있습니다.
플랫폼에서 물어볼만한 것들은 "뉴스 기사야?", "비디오야?", "스크린샷이나 간단한 소개 가지고있어?" 같은 류의 것들입니다.

이는 AMP 페이지뿐만 아니라 모든 웹 페이지와 관련되어있습니다.
몇가지 플랫폼에서, 이런 메타데이터는 부가적이며, 다른 경우 필수이며,
이 경우 **올바른 메타데이터를 포함하지 않으면 콘텐츠로의 링크를 보여주고 싶지 않다** 라는 의미를 가집니다.
콘텐츠가 나타나게 하기 위해 플랫폼을 위한 올바른 메타데이터를 포함하기 바랍니다.


### 대부분의 검색엔진을 위한 Schema.org 사용

[Schema.org](http://schema.org/)는 여러 물건에 메타데이터를 추가할 수 있는 오픈 문법을 제안합니다.
AMP같은 경우, 콘텐츠 타입 정의를 포함하는 콘텍스트의 이해를 위해 속성을 사용하며 (예를 들면, `news article`),
헤드라인, 발행일 및 관련된 미리보기 이미지 등을 정의할 수 있습니다.

예시:

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

대체 HTML 속성 문법을 포함한 더 많은 예제는
[ampproject examples folder](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples)에서 찾을 수 있습니다.

노트: 이 Schema.org 정의는 [Google Search news carousel (try on mobile)](https://g.co/ampdemo) 데모와 같이 콘텐츠를 나타내기 위한 필수 요건입니다.
[Top Stories with AMP](https://developers.google.com/structured-data/carousels/top-stories) 및 [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)을 살펴보길 바랍니다.

### 더 많은 플랫폼을 위한 다른 메타데이터

[Social Discovery guide at Web Fundamentals](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/)에서
컨텐츠를 발견하고 배포하도록 준비하는 다른 방법을 모두 배울 수 있습니다.

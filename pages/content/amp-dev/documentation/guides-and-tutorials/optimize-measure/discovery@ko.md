---
formats:
- websites
"$title": 검색 가능한 페이지로 설정
"$titles":
  teaser: 검색 가능한 페이지로 설정
"$order": '5'
description: 어떤 경우에는 비 AMP 버전과 AMP 버전을 모두 지원하는 페이지가 필요할 수 있습니다.  예를 들면 뉴스 기사 등이 이에 해당됩니다...
teaser:
  icon: discover
  text: 검색 엔진에서 사이트의 AMP 버전의 존재 유무를 파악하는 방법을 알아보세요.
  label: 자세히 알아보기
---

어떤 경우에는 비 AMP 버전과 AMP 버전을 모두 지원하는 페이지가 필요할 수 있습니다. 예를 들면 뉴스 기사 등이 이에 해당됩니다. 만약 Google 검색에서 해당 페이지의 비 AMP 버전을 찾은 경우 동일 페이지의 AMP 버전이 있는지 어떻게 알 수 있을까요?

### <link>로 페이지 연결

이 문제를 해결하기 위해 비 AMP 페이지에 `<head>`의 `<link>` 태그 형식으로 AMP 페이지에 관한 정보를 추가할 수 있으며, 그 반대의 경우도 가능합니다.

비 AMP 페이지에 다음을 추가합니다.

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

그리고 이것은 AMP 페이지에 :

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### 페이지가 하나만 있는 경우

페이지가 하나만 있고 그 페이지가 AMP 페이지인 경우에도 표준 링크를 추가해야 합니다. 이 경우 자체적으로 연결됩니다.

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] <strong>읽어보기 –</strong> [AMP 페이지용 Google 검색 가이드라인](https://support.google.com/webmasters/answer/6340290)에서 Google이 AMP 페이지를 확인하는 방법을 자세히 알아보세요. [/tip]

## 추가 메타데이터를 통해 타사 플랫폼으로 통합 <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

타사 사이트에서 AMP 페이지를 삽입하거나 AMP 페이지로 링크를 연결할 경우, 해당 페이지가 AMP 페이지라는 사실 이상의 정보가 필요합니다. 플랫폼에서 페이지에 던질 수 있는 질문은 "뉴스 기사인가요?", "동영상인가요?", "스크린샷과 짧은 설명이 있나요?" 등이 있습니다.

이는 AMP 페이지뿐 아니라 모든 웹페이지에 공통으로 적용됩니다. 이 메타데이터는 플랫폼에 따라 추가사항일 수도 있고 필수 사항일 수도 있습니다. 메타데이터가 필수 사항인 경우 **정확한 메타데이터를 포함하지 않으면 콘텐츠의 링크가 표시되지 않습니다**. 콘텐츠를 표시하고자 하는 플랫폼에 정확한 메타데이터가 포함되었는지 확인하세요.

### 대부분의 검색엔진에 Schema.org 사용하기

[Schema.org](http://schema.org/)는 다양한 정보를 메타데이터로 표현할 수 있는 공개 어휘를 제공합니다. AMP의 경우 컨텍스트에 적합한 속성으로 특정 콘텐츠 유형(예: '뉴스 기사'), 제목, 게시 날짜, 관련 미리보기 이미지가 있습니다.

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

대체 HTML 속성 구문을 포함한 더 많은 예시는 [AMP 프로젝트 예시 폴더](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples)에서 찾아볼 수 있습니다.

[tip type="read-on"] 구조화된 데이터에 관한 자세한 내용은 다음 리소스에서 확인하세요.

- 주요뉴스 캐러셀, 레시피 카드 등 [Google 검색 리치 결과에 콘텐츠가 구조적으로 표시되도록 구성](https://developers.google.com/search/docs/guides/mark-up-content)하는 방법을 알아보세요.
- [Google 구조화된 데이터용 테스트 도구](https://developers.google.com/structured-data/testing-tool/)로 구조화된 데이터를 테스트하세요. [/tip]

### 더 많은 플랫폼의 기타 데이터

[웹 기초의 소셜 검색 가이드](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/)로 이동하여 콘텐츠가 검색되고 배포될 수 있도록 준비하는 여러 방법을 알아보세요.

---
"$title": 검색 가능한 페이지로 설정
"$order": '3'
description: 검색엔진에서 일반 HTML 표준 문서와 AMP 문서의 관계를 이해할 수 있도록 양방향 연결을 설정해야 합니다.
---

이제 AMP로 뉴스 기사를 제작했으니 사용자가 내 콘텐츠를 찾고 검색할 수 있도록 설정해야 합니다.

## AMP 콘텐츠 연결

웹사이트의 전체 또는 일부를 AMP 페이지로 만들거나 AMP 페이지를 전혀 사용하지 않을 수 있습니다. 이번 튜토리얼에서는 웹사이트 구조에 AMP를 통합하는 방법을 설명합니다.

일반 HTML 페이지에서 표준 연결이란 여러 페이지에 동일한 콘텐츠가 포함되어 있을 때 어떤 페이지를 선호하는 페이지로 간주할지 결정하는 일반적인 기술입니다.

웹사이트에 AMP를 추가하는 가장 일반적인 접근 방법은 AMP HTML 페이지가 아닌 기존 페이지의 AMP 버전을 만드는 것입니다. 일반적으로 두 가지 버전은 콘텐츠(예: 기사의 텍스트)는 같지만 레이아웃이 다를 수 있습니다. 이 경우 기본 HTML 페이지를 "표준" 페이지로 취급하고 AMP 페이지를 이 HTML 페이지와 페어링해야 합니다.

가능하다면 AMP를 여느 JavaScript 라이브러리처럼 사용하여 사이트를 구축하고 표준 연결은 신경 쓰지 마세요. AMP를 사용하여 전체 웹사이트를 구축하면 유지보수 부담이 대폭 줄어듭니다.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='AMP 콘텐츠 연결') }}

이 튜토리얼의 목적상 페이지의 AMP 버전과 AMP가 아닌 버전이 모두 존재하는 경우에 집중하겠습니다. 이번 튜토리얼에서 다룰 웹사이트에는 AMP HTML 페이지가 아닌 페이지(`article.html`)와 해당 페이지의 AMP 버전(`article.amp.html`)이 있는 뉴스 기사가 포함되어 있습니다. `link`를 통해 이 페이지를 페어링하게 됩니다.

이미 `<head>`의 링크 태그를 다시 표준 페이지에 포함함으로써 AMP 문서에서 이 목적을 달성하기 위한 첫 번째 단계를 완료했습니다.

```html
<link rel="canonical" href="/article.html">
```

다음 단계는 표준 기사를 AMP 페이지에 연결하는 것입니다. 이는 `<link rel="amphtml">` 태그를 표준 기사의 `<head>` 섹션에 추가하여 완료할 수 있습니다.

`article.html` 파일에서 다음 코드를 `<head>` 섹션에 **추가**하세요.

```html
<link rel="amphtml" href="/article.amp.html">
```

아래의 그림에는 링크 태그의 경로가 나와 있습니다.

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='AMP 콘텐츠 연결') }}

검색엔진에서 이 일반 HTML 표준 문서와 AMP 문서의 관계를 이해할 수 있도록 양방향 연결을 설정해야 합니다. 제공된 링크가 없으면 크롤러는 어떤 기사가 일반 HTML 문서의 "AMP 버전"인지 명확하게 인식하지 못할 수 있습니다. 이 링크를 명시적으로 제공해야 모호한 부분이 사라집니다!

## 구조적 데이터 추가

유효한 AMP 페이지에는 [schema.org](http://schema.org/)의 구조적 데이터가 필요하지 않지만, Google Search와 같은 일부 플랫폼의 경우 인기 스토리 캐러셀과 같은 특정 환경에서 구조적 데이터를 필요로 합니다. 일반적으로 구조적 데이터를 포함하는 것이 좋습니다. 구조적 데이터를 사용하면 검색엔진이 웹페이지를 더 잘 이해할 수 있고 검색엔진 검색 결과(예: 리치 스니펫)에 콘텐츠를 더 잘 표시할 수 있습니다. 구조적 데이터는 `application/ld+json` 유형 스크립트 태그를 통해 AMP 페이지의 `<head>` 태그에 포함됩니다.

뉴스 기사에 대해 AMP 문서의 `<head>` 섹션 하단에 다음의 구조화된 데이터를 **추가** 하세요.

```html
<script type="application/ld+json">
{
"@context": "http://schema.org",
"@type": "NewsArticle",
"mainEntityOfPage":{
   "@type":"WebPage",
   "@id":"https://example.com/my-article.html"
},
"headline": "My First AMP Article",
"image": {
   "@type": "ImageObject",
   "url": "https://example.com/article_thumbnail1.jpg",
   "height": 800,
   "width": 800
},
"datePublished": "2015-02-05T08:00:00+08:00",
"dateModified": "2015-02-05T09:20:00+08:00",
"author": {
   "@type": "Person",
   "name": "John Doe"
},
"publisher": {
   "@type": "Organization",
   "name": "⚡ AMP Times",
   "logo": {
     "@type": "ImageObject",
     "url": "https://example.com/amptimes_logo.jpg",
     "width": 600,
     "height": 60
   }
},
"description": "My first experience in an AMPlified world"
}
</script>
```

[tip type="note"] <strong>참고 –</strong>콘텐츠는 동일해야 합니다. 뉴스 기사에 "NewsArticle" 유형을 지정하세요. 제목은 기사 제목과 일치해야 합니다. 이미지 객체는 기사의 히어로 이미지를 참조합니다. [/tip]

브라우저에서 페이지를 **다시 로드**하고 AMP 유효성 검사 오류가 없는지 확인합니다.

[tip type="note"] 검색엔진 및 소셜 미디어 네트워크에서는 schema.org의 구조적 데이터 형식 외에도 다른 형식을 지원합니다. 다음의 지원되는 문서를 참조하세요.

- [Twitter 카드 메타태그](https://dev.twitter.com/cards/overview)
- [Facebook 오픈 그래프 메타태그](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### 구조적 데이터 유효성 검사

구조화된 데이터가 올바른지 확인하기 위해 여러 플랫폼에서 유효성 검사 도구를 제공합니다. 이 가이드에서는 [Google 구조화된 데이터용 테스트 도구](https://developers.google.com/structured-data/testing-tool/)로 구조적 데이터의 유효성을 검사합니다.

1. 새 브라우저 창에서 [Google 구조화된 데이터 테스트 도구](https://developers.google.com/structured-data/testing-tool/)를 엽니다.
2. **코드 스니펫** 탭을 선택합니다.
3. AMP 페이지의 전체 소스 코드를 복사하여 유효성 검사 도구의 텍스트 수정 패널에 붙여넣습니다.
4. **테스트 실행**을 클릭합니다.

구조적 데이터가 유효하면 **오류 0개** 및 **경고 0개**로 표시됩니다.

[tip type="read-on"] <strong>읽어보기 –</strong>페이지 검색 가능성에 관해 자세히 알아보려면 [검색 가능한 페이지로 설정](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) 가이드를 참조하세요. [/tip]

훌륭합니다. 이제 AMP 뉴스 기사가 완성되었습니다.

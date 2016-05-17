---
layout: page
title: AMP HTML 페이지 만들기
order: 0
locale: ko
---

다음의 마크업은 적절한 시작점이나 표준이 될 수 있습니다.
이것을 복사하여 .html 확장자로 파일에 저장합니다.

{% highlight html %}
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
{% endhighlight %}

지금까지의 본문 콘텐츠는 매우 단순합니다. 그러나 즉시 이해되지 않을 수도 있는 추가적인 코드가 페이지 헤드에 많이 있습니다. 필수 마크업을 분석해 보겠습니다.

## 필수 마크업

AMP HTML 문서는:

  - Doctype `<!doctype html>`로 시작해야 합니다.
  - 최상위 `<html ⚡>` 태그를 포함해야 합니다(`<html amp>`도 허용됨).
  - `<head>` 및 `<body>` 태그를 포함해야 합니다(HTML에서는 선택 항목).
  - AMP HTML 문서의 일반 HTML 버전을 가리키는 `<link rel="canonical" href="$SOME_URL" />` 태그를 헤드 내에 포함해야 합니다. 이러한 HTML 버전이 없는 경우 스스로를 가리키는 태그를 포함해야 합니다.
  - 헤드 태그의 첫 번째 하위 요소로서 `<meta charset="utf-8">` 태그를 포함해야 합니다.
  - 헤드 태그 내에 `<meta name="viewport" content="width=device-width,minimum-scale=1">` 태그를 포함해야 합니다. 또한 initial-scale=1을 포함시키는 것이 좋습니다.
  - 헤드의 마지막 요소로서 `<script async src="https://cdn.ampproject.org/v0.js"></script>` 태그를 포함해야 합니다(이 요소는 AMP JS 라이브러리를 포함하고 로드합니다).
  - `<head>` 태그에 다음을 포함해야 합니다.
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## 선택 항목인 메타데이터

우리의 샘플에서는 최소한의 요구사항 뿐만 아니라 Schema.org 정의도 헤드에 포함합니다. 이것은 AMP에는 엄격한 요구사항이 아니지만, 여러분의 콘텐츠를 특정 장소(예: [Google 검색 뉴스 캐러셀 데모(전화에서 시도)](https://g.co/ampdemo))에 배포하기 위한 요구사항입니다.

다양한 다른 곳(예: Twitter)에 필요한 모든 메타데이터에 대해 알아보시려면 [샘플을 살펴보세요](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples). Google 검색에서 AMP에 대해 구체적으로 알아보려면, [Top Stories with AMP](https://developers.google.com/structured-data/carousels/top-stories)를 참조하세요.

<hr>

희소식입니다! 이것만 있으면 우리는 첫 번째 AMP 페이지를 만들 수 있습니다. 물론 본문은 아직 갈 길이 멉니다. 다음 섹션에서는 이미지, 사용자 지정 AMP 요소와 같은 기본사항을 추가하는 방법과 페이지에 스타일을 지정하고 반응형 레이아웃을 만드는 방법에 대해 설명합니다.

{% include button.html title="2단계로 계속" link="/docs/get_started/create/include_image.ko.html" %}

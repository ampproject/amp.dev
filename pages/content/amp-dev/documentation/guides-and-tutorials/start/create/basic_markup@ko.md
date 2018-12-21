---
$title: AMP HTML 페이지 만들기
---

다음 마크업은 알맞은 시작점 또는 상용구입니다.
마크업을 복사하여 확장자가 .html인 파일에 저장하세요.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>안녕하세요. AMP입니다.</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html">
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
  </head>
  <body>
    <h1>모바일 웹에 오신 것을 환영합니다.</h1>
  </body>
</html>
[/sourcecode]

지금까지 본문의 콘텐츠는 상당히 간단했습니다. 하지만 페이지 헤드에 있는 추가 코드는 한눈에 명확하지 않은 경우도 많습니다. 지금부터 필수 마크업을 분석하겠습니다.

[tip type="note"]
AMP 페이지 및 콘텐츠를 만들 때는 HTTPS 프로토콜(vs. HTTP) 사용을 고려해 봐야 합니다. HTTPS는 AMP 문서 자체나 이미지/글꼴에 필수는 아니지만 여러 AMP 기능(예: 동영상, iframes 등)에서 HTTPS가 필요합니다. AMP 페이지에서 모든 AMP 기능을 최대한 활용하려면 HTTPS 프로토콜을 사용하세요.  ['HTTPS가 중요한 이유'](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https)에서 HTTPS에 관해 자세히 알아보세요.
[/tip]

## 필수 마크업

AMP HTML 문서는 다음 규칙을 준수해야 합니다.

| 규칙      | 설명 |
| --------- | ----------- |
| `<!doctype html>` doctype으로 시작해야 합니다. | HTML 표준입니다. |
| 최상위 `<html ⚡>` 태그 <br>을 포함해야 합니다(`<html amp>`도 허용됨). | 페이지를 AMP 콘텐츠로 식별합니다. |
| `<head>` 및 `<body>` 태그를 포함해야 합니다. | HTML에서는 선택사항이지만 AMP에서는 아닙니다.
| `<meta charset="utf-8">` 태그를 `<head>` 태그의 첫 번째 하위 요소로 포함해야 합니다. | 페이지 인코딩을 식별합니다. |
| `<script async src="https://cdn.ampproject.org/v0.js"></script>` 태그를 `<head>` 태그의 두 번째 하위 요소로 포함해야 합니다. | AMP JS 라이브러리를 포함하고 로드합니다. |
| `<head>` 내에 `<link rel="canonical" href="$SOME_URL">` 태그를 포함해야 합니다. | AMP HTML 문서의 일반 HTML 버전을 가리킵니다. HTML 버전이 존재하지 않으면 문서 자체를 가리킵니다. [페이지를 검색 가능하게 만들기]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}})에서 자세히 알아보세요.
| `<head>` 태그 내에 `<meta name="viewport" content="width=device-width,minimum-scale=1">` 태그를 포함해야 합니다. `initial-scale=1`도 포함하는 것이 좋습니다. | 반응형 표시 영역을 지정합니다. [반응형 AMP 페이지 만들기]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md', locale=doc.locale).url.path}})에서 자세히 알아보세요. |
| `<head>` 태그에 [AMP 상용구 코드]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md', locale=doc.locale).url.path}})를 포함해야 합니다.  | CSS 상용구는 AMP JS가 로드되기 전까지 우선 콘텐츠를 숨깁니다. |

## 선택적 메타데이터

기본적인 요구사항 외에도 샘플에는 헤드에 Schema.org 정의가 포함되어 있습니다. AMP에서 반드시 준수해야 하는 요구사항은 아니지만, 콘텐츠가 특정 장소(예: Google 검색 주요뉴스 캐러셀)에 배포될 수 있게 하려면 필수입니다.

[tip type="read-on"] 자세히 알아보려면 리소스를 방문하세요.

* [Google 검색에서 AMP 시작하기](https://developers.google.com/amp/docs) - Google 검색용으로 AMP 페이지를 준비하는 방법을 알아보세요.
  * [메타데이터 샘플](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) - 여러 다른 장소(예: Twitter)에서 필요한 모든 메타데이터를 자세히 알아보세요.
[/tip]

<hr>

좋은 소식을 전해드립니다. 첫 AMP 페이지를 만드는 데 필요한 것은 이게 전부지만, 본문에는 더 많은 내용이 있습니다. 다음 섹션에서는 이미지, 맞춤 AMP 요소와 같은 기본사항을 추가하는 방법, 페이지 스타일을 지정하는 방법 및 반응형 레이아웃을 만드는 방법을 다루겠습니다.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/include_image.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>
 

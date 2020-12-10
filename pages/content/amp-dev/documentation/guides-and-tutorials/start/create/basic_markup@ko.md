---
$title: AMP HTML로 이루어진 페이지 만들기
---

아래 마크업 코드는 AMP를 시작하기에 딱 맞는 시작점이자 보일러플레이트 코드입니다.
아래 마크업을 복사하여 확장자가 .html인 파일에 저장하세요.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
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

body 안에 있는 콘텐츠는 꽤 간단합니다.
하지만 페이지의 head 안에 있는 수많은 추가 코드들은 한 눈에 보이게 명확하지 않아보입니다.
지금부터 필수 마크업을 분석해보겠습니다.

[tip type="note"]
AMP 페이지 및 콘텐츠를 만들 때는 HTTPS 프로토콜(vs. HTTP) 사용을 고려해 봐야 합니다. HTTPS는 AMP 문서 자체나 이미지/글꼴에 필수는 아니지만 여러 AMP 기능(예: 동영상, iframes 등)에서 HTTPS가 필요합니다. AMP 페이지에서 모든 AMP 기능을 최대한 활용하려면 HTTPS 프로토콜을 사용하세요. ['HTTPS가 중요한 이유'](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https)에서 HTTPS에 관해 자세히 알아보세요.
[/tip]

## 필수 마크업

AMP HTML 문서는 다음 규칙을 준수해야 합니다.

| 규칙      | 설명 |
| --------- | ----------- |
| `<!doctype html>` doctype으로 시작해야 합니다. | HTML 표준입니다. |
| 최상위 태그로 `<html ⚡>` 태그를 사용해야 합니다 (`<html amp>`도 사용 가능합니다). | 페이지를 AMP 콘텐츠로 식별합니다. |
| `<head>` 및 `<body>` 태그를 작성해야 합니다. | HTML에서는 선택사항이지만 AMP에서는 아닙니다.
| `<meta charset="utf-8">` 태그를 `<head>` 태그의 첫 번째 자식 요소로 사용해야 합니다. | 페이지 인코딩을 식별합니다. |
| `<script async src="https://cdn.ampproject.org/v0.js"></script>` 태그를 `<head>` 태그의 두 번째 자식 요소로 사용해야 합니다. | AMP JS 라이브러리를 가져오고 로드합니다. |
| `<head>` 내에 `<link rel="canonical" href="$SOME_URL">` 태그를 사용해야 합니다. | AMP HTML 문서의 AMP가 아닌 HTML 버전을 가리킵니다. HTML 버전이 존재하지 않으면 문서 자체를 가리킵니다. [페이지를 검색 가능하게 만들기](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md)에서 자세히 알아보세요.
| `<head>` 태그 내에 `<meta name="viewport" content="width=device-width">`도 작성하는 것이 좋습니다. | 반응형 뷰포트를 지정합니다. [반응형 AMP 페이지 만들기](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md)에서 자세히 알아보세요. |
| `<head>` 태그에 [AMP 보일러플레이트 코드](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md)를 포함해야 합니다.  | CSS 보일러플레이트는 AMP JS가 로드되기 전까지 우선 콘텐츠를 숨깁니다. |

## 선택적으로 사용 가능한 메타데이터

기본적인 요구사항에 더하여 샘플 코드에는 head에 Schema.org 정의를 포함하고 있습니다. 이는 AMP에서 반드시 준수해야하는 요구사항은 아니지만, 콘텐츠가 특정 영역 (예: Google 검색의 top storied 캐러셀 같은 곳)에서 노출되게 하려면 필수로 작성해야합니다.

[tip type="read-on"] 자세히 알아보려면 아래 리소스를 참고해보세요.

* [Google 검색에서 AMP 시작하기](https://developers.google.com/amp/docs) - Google 검색용으로 AMP 페이지를 준비하는 방법을 알아보세요.
  * [메타데이터 샘플](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) - 여러 다른 장소(예: Twitter)에서 필요한 모든 메타데이터를 자세히 알아보세요.
[/tip]

<hr>

짜잔! 첫번째 AMP 페이지를 다 만들었습니다. 하지만 당연하게도 
좋은 소식을 전해드립니다. 첫 AMP 페이지를 만드는 데 필요한 것은 이게 전부지만, 본문에는 더 많은 내용이 있습니다. 다음 섹션에서는 이미지, 맞춤 AMP 요소와 같은 기본사항을 추가하는 방법, 페이지 스타일을 지정하는 방법 및 반응형 레이아웃을 만드는 방법을 다루겠습니다.

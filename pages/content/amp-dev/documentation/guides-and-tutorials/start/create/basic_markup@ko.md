---
'$title': AMP HTML로 이루어진 페이지 만들기
$order: 1
description: 'HTTPS 사용: AMP 페이지 및 콘텐츠 생성 시 HTTPS 프로토콜(vs. HTTP) 사용을 고려하는 것이 좋습니다. HTTPS는 AMP 문서 자체에서 필수는 아니지만...'
author: pbakaus
contributors:
  - bpaduch
---

아래 마크업 코드는 AMP 페이지 생성을 위한 적절한 출발점이자 상용구 코드입니다. 이를 복사하여 확장자가 .html인 파일에 저장하세요.

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
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

body 태그 내의 콘텐츠는 꽤 간단하지만 페이지의 head 안에 있는 수많은 추가 코드들은 한눈에 명확하게 파악할 수 없습니다. 지금부터 필수 마크업을 분석해보겠습니다.

HTTPS 사용: AMP 페이지 및 콘텐츠 생성 시 HTTPS 프로토콜(vs. HTTP) 사용을 고려하는 것이 좋습니다. HTTPS는 AMP 문서 자체 또는 이미지/글꼴에 필수는 아니지만 여러 AMP 기능(예: 동영상, iframes 등)에 필요합니다. AMP 페이지에서 모든 AMP 기능을 최대한 활용하려면 HTTPS 프로토콜을 사용하세요. ["HTTPS가 중요한 이유"](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https)에서 HTTPS에 관해 자세히 알아보실 수 있습니다.

[tip type="tip"] 새로운 AMP 페이지 생성을 빠르게 시작하려면 <a class="" href="https://gitlocalize.com/boilerplate">AMP 상용구 생성기</a>를 사용하세요. [/tip]

## 필수 마크업

AMP HTML 문서는 다음 규칙을 준수해야 합니다.

| 규칙                                                                                                                                                                                | 설명                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<!doctype html>` doctype으로 시작해야 합니다.                                                                                                                                      | HTML 표준입니다.                                                                                                                                                                                                                                                                 |
| 최상위 태그로 `<html ⚡>` 태그를 사용해야 합니다 (`<html amp>`도 사용 가능합니다).                                                                                                  | 페이지를 AMP 콘텐츠로 식별합니다.                                                                                                                                                                                                                                                |
| `<head>` 및 `<body>` 태그를 작성해야 합니다.                                                                                                                                        | HTML에서는 선택사항이지만 AMP에서는 아닙니다.                                                                                                                                                                                                                                    |
| `<meta charset="utf-8">` 태그를 `<head>` 태그의 첫 번째 자식 요소로 사용해야 합니다.                                                                                                | 페이지 인코딩을 식별합니다.                                                                                                                                                                                                                                                      |
| `<head>` 태그에 `<script async src="https://cdn.ampproject.org/v0.js"></script>` 태그를 포함합니다. 모범 사례로서 <code><head></code>의 스크립트는 가능한 초기에 포함되어야 합니다. | AMP JS 라이브러리를 가져오고 로드합니다.                                                                                                                                                                                                                                         |
| `<head>` 내에 `<link rel="canonical" href="$SOME_URL">` 태그를 포함해야 합니다.                                                                                                     | AMP HTML 문서의 일반 HTML 버전을 가리킵니다. HTML 버전이 존재하지 않으면 문서 자체를 가리킵니다. [검색 가능한 페이지로 설정](https://gitlocalize.com/repo/4863/ko/pages/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md)에서 자세히 알아보세요. |
| `<meta name="viewport" content="width=device-width">`를 포함합니다. initial-scale=1`을 포함하는 것도 좋습니다.                                                                      | 반응형 뷰포트를 지정합니다. [반응형 AMP 페이지 만들기](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md)에서 자세히 알아보세요.                                                                                                      |
| `<head>` 태그에 [AMP 상용구 코드](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md)를 포함해야 합니다.                                                  | CSS 상용구는 AMP JS가 로드되기 전까지 우선 콘텐츠를 숨깁니다.                                                                                                                                                                                                                    |

## 선택적으로 사용 가능한 메타데이터

예시 코드 기본적인 요구사항에 더하여 head에 Schema.org 정의를 포함하고 있습니다. 이는 AMP에서 반드시 준수해야 하는 요구사항은 아니지만, 콘텐츠가 특정 영역(예: Google 검색의 인기 스토리 캐러셀)에 노출되게 하려면 필수로 작성해야 합니다.

[tip type="read-on"] 자세히 알아보려면 아래 리소스를 참고하세요.

- [Google 검색에서 AMP 시작하기](https://developers.google.com/amp/docs) - Google 검색용으로 AMP 페이지를 준비하는 방법을 알아보세요.
- [메타데이터 예시](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) - 여러 다른 장소(예: Twitter)에서 필요한 모든 메타데이터를 자세히 알아보세요. [/tip]

<hr>

좋은 소식이 있습니다! 첫 AMP 페이지를 만드는 데 필요한 것은 이게 전부지만, 본문에는 아직 많은 내용이 없습니다. 다음 섹션에서 이미지, 사용자 지정 AMP 요소와 같은 기본 콘텐츠를 추가하는 방법과 페이지 스타일 지정 방법 및 반응형 레이아웃 생성 방법을 살펴보겠습니다.

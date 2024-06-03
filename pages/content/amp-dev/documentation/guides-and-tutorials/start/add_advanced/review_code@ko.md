---
'$title': 시작 코드 검토
$order: 1
description: 코드를 추가하기 전에 샘플 article.amp.html 페이지를 살펴보겠습니다. 샘플 페이지는 다음과 같이 작성되어 있습니다...
---

코드를 추가하기 전에 샘플 [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) 페이지를 살펴 보겠습니다. 샘플 페이지는 다음과 같이 작성되어 있습니다.

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>News Article</title>

    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://example.com/my-article.html"
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
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

이 페이지는 [AMP 유효성 검사](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) 및 [schema.org](http://schema.org/) 구조화된 데이터 유효성 검사를 모두 통과하는 단순한 AMP 페이지입니다. 이 페이지를 뉴스 웹사이트에 배포하면 사용자는 검색엔진의 결과 페이지에서 보다 풍부한 정보를 제공하는 리치 결과(예: Google 검색의 주요뉴스 캐러셀)를 통해 이 페이지를 발견할 수 있습니다.

## AMP 유효성 검사 도구 사용 설정

페이지를 변경해 보기 전에 유효한 AMP HTML을 사용하고 있는지 확인하기 위해 [AMP 유효성 검사 도구](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)를 사용하도록 설정해 보겠습니다. URL에 다음 프래그먼트 식별자를 **추가**하세요.

```text
# development=1

```

예:

```text
http://localhost:8000/article.amp.html#development=1
```

Chrome이나 선호하는 브라우저에서 [개발자 콘솔](https://developer.chrome.com/devtools/docs/console)을 열고 AMP 오류가 없는지 확인하세요.

[tip] 다음과 같은 다양한 도구를 사용하여 AMP 페이지의 유효성을 검사할 수 있습니다.

- [Chrome용 AMP 유효성 검사 도구 확장 프로그램](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- [Opera용 AMP 유효성 검사 도구 확장 프로그램](https://addons.opera.com/ko/extensions/details/amp-validator/)
- [AMP 유효성 검사 도구 웹 인터페이스](https://validator.ampproject.org/)
- 그 외 다수

[AMP 페이지 유효성 검사](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) 가이드에서 자세한 내용을 알아보세요. [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Nexus 5X 기기 시뮬레이션') }}

## 모바일 환경 시뮬레이션

우리는 이 페이지를 휴대기기용으로 디자인하고 있습니다. 그러니 브라우저의 개발자 도구에서 휴대기기 사용자 경험을 **시뮬레이션**해 봅시다. 예를 들어 Chrome DevTools에서는 휴대전화 아이콘을 클릭하고 메뉴에서 휴대기기를 선택하면 됩니다.

이제 페이지 작업을 시작할 수 있습니다. 페이지에 AMP 구성요소 몇 가지를 추가해 보겠습니다.

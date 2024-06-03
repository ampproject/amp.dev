---
'$title': Xem lại mã bắt đầu
$order: 1
description: 'Trước khi chúng ta bắt đầu thêm mã, hãy cùng xem lại trang mẫu article.amp.html, có nội dung như sau: ...'
---

Trước khi chúng ta bắt đầu thêm mã, hãy cùng xem lại trang mẫu [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html), có nội dung như sau:

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

Đây là một trang AMP đơn giản đã đạt cả [xác thực AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) và xác thực dữ liệu có cấu trúc [schema.org](http://schema.org/). Nếu trang này được triển khai trên một website tin tức, người dùng có thể phát hiện trang thông qua các trải nghiệm phong phú trong Trang Kết quả Công cụ Tìm kiếm (ví dụ, băng chuyền Câu chuyện hàng đầu trong Google Search).

## Bật Bộ xác thực AMP

Trước khi thay đổi trang, hãy bật [bộ xác thực AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) để chúng ta biết mình đang làm việc với AMP HTML hợp lệ. <strong>Thêm</strong> mã định danh mảnh vỡ này vào URL của bạn:

```text
#development=1
```

Ví dụ:

```text
http://localhost:8000/article.amp.html#development=1
```

Mở [Bảng điều khiển Nhà phát triển](https://developer.chrome.com/devtools/docs/console) trong Chrome (hoặc trình duyệt ưa thích của bạn) và xác minh rằng không có lỗi AMP.

[tip] Bạn có thể sử dụng các công cụ khác để xác thực cho trang AMP của mình, ví dụ như:

- [Phần mở rộng AMP Validator cho Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- [Phần mở rộng AMP Validator cho Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- [Giao diện Web AMP Validator](https://validator.ampproject.org/)
- ... và nhiều hơn thế nữa

Tìm hiểu thêm trong hướng dẫn về [Xác thực các trang AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simulated on a Nexus 5X device') }}

## Giả lập trải nghiệm di động

Chúng ta đang thiết kế trang này cho một thiết bị di động, vậy nên hãy **giả lập** trải nghiệm thiết bị di động trong công cụ nhà phát triển của trình duyệt của bạn. Ví dụ, trong Chrome DevTools, nhấn vào biểu tượng điện thoại di động, và chọn một thiết bị di động từ menu.

Bây giờ, chúng ta có thể bắt đầu làm việc với nội dung trang này. Hãy thêm một số thành phần AMP vào trang của chúng ta.

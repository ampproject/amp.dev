---
'$title': 查看入门代码
$order: 1
description: 在开始添加代码之前，我们先来看一下示例 article.amp.html 网页（如下所示）…
---

在开始添加代码之前，我们先来看一下示例 [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) 网页（如下所示）：

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

这是一个非常简单且已顺利通过 [AMP 验证](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)和 [schema.org](http://schema.org/) 结构化数据验证的 AMP 网页。如果此网页被部署在新闻网站上，用户便可通过搜索引擎结果页中提供的丰富体验（例如，Google 搜索中的“焦点新闻”轮播界面）发现此网页。

## 启用 AMP 验证工具

在更改此网页之前，我们需要先启用 [AMP 验证工具](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)，以确保要更改的网页是有效的 AMP HTML 网页。请将以下片段标识符**添加**到您的网址中：

```text
# development=1

```

例如：

```text
http://localhost:8000/article.amp.html#development=1
```

在 Chrome（或您的首选浏览器）中打开[开发者控制台](https://developer.chrome.com/devtools/docs/console)，然后验证并确保此网页中没有任何 AMP 错误。

[tip] 您也可以使用其他工具验证您的 AMP 网页，例如：

- [适用于 Chrome 的 AMP 验证工具扩展程序](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- [适用于 Opera 的 AMP 验证工具扩展程序](https://addons.opera.com/zh-cn/extensions/details/amp-validator/)
- [AMP 验证工具网页界面](https://validator.ampproject.org/)
- …等等

要想了解详情，请参阅[验证 AMP 网页](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)指南。 [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='在 Nexus 5X 设备上模拟') }}

## 模拟移动版体验

此网页是专门针对移动设备设计的，所以我们要在您的浏览器的开发者工具中**模拟**移动设备体验。例如，在 Chrome DevTools 中，点击手机图标，然后从菜单中选择一种移动设备。

现在，我们可以开始更改此网页了。首先，让我们向此网页中添加一些 AMP 组件。

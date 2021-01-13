---
"$title": مراجعة رمز البدء
"$order": '1'
description: '"قبل البدء في إضافة رمز، هيا نراجع مثال صفحة article.amp.html، والذي يجب أن يكون كالتالي: ..."'
---

قبل البدء في إضافة رمز، هيا نراجع مثال صفحة [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html)، والذي يجب أن يكون كالتالي:

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

هذه صفحة AMP بسيطة اجتازت كلا من [التحقق من صحة AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) والتحقق من صحة بيانات [schema.org](http://schema.org/) الهيكلية. إذا تم نشر هذه الصفحة على موقع ويب للأخبار، فيمكن للمستخدم اكتشاف الصفحة عن طريق تجارب ثرية في صفحات نتائج محرك البحث (مثل العرض الدوار لأهم القصص في بحث Google).

## تمكين أداة التحقق من صحة AMP

قبل أن نبدل الصفحة، هيا نقوم بتمكين [أداة التحقق من صحة AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) لكي نعرف أننا نعمل على رمز AMP HTML صالح.  **أضف** معرف المقطع  هذا إلى عنوان URL الخاص بك:

```text
#development=1
```

على سبيل المثال:

```text
http://localhost:8000/article.amp.html#development=1
```

افتح [وحدة تحكم المطورين](https://developer.chrome.com/devtools/docs/console) في Chrome (أو المتصفح المفضل لك)، وتحقق من عدم وجود أخطاء في AMP.

[tip] يمكنك استخدام العديد من الأدوات الأخرى للتحقق من صحة صفحة AMP الخاصة بك، مثل:

- [ملحق أداة التحقق من صحة AMP لـ Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- [ملحق أداة التحقق من صحة AMP لـ Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- [واجهة ويب أداة التحقق من صحة AMP](https://validator.ampproject.org/)
- ... وغير ذلك الكثير

تعلم المزيد في دليل [التحقق من صحة صفحات AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='المحاكاة على جهاز Nexus 5X') }}

## محاكاة تجربة المحمول

عند تصميم هذه الصفحة لجهاز محمول، هيا نقوم **بمحاكاة** تجربة الجهاز المحمول في أدوات المطورين على المتصفح الخاص بك. على سبيل المثال، في Chrome DevTools، انقر فوق رمز الهاتف المحمول، وحدد الجهاز المحمول من القائمة.

الآن، يمكنك بدء العمل على الصفحة نفسها. هيا نضيف بعد مكونات AMP على صفحتك.

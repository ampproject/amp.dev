---
formats:
- websites
"$title": Make your pages discoverable
"$titles":
  teaser: Make your pages discoverable
"$order": '5'
description: 'In some cases, you might want to have both a non-AMP and an AMP version of the same page, for example, a news article. Consider this: If Google Search ...'
teaser:
  icon: khám phá
  text: Tìm hiểu cách công cụ tìm kiếm biết được có một phiên bản AMP cho website của bạn.
  label: Tìm hiểu thêm
---

In some cases, you might want to have both a non-AMP and an AMP version of the same page, for example, a news article. Consider this: If Google Search finds the non-AMP version of that page, how does it know there’s an AMP version of it?

### Liên kết các trang với <link>

In order to solve this problem, we add information about the AMP page to the non-AMP page and vice versa, in the form of `<link>` tags in the `<head>`.

Add the following to the non-AMP page:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Thêm thông tin này vào trang AMP:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Nếu tôi chỉ có một trang thì sao?

Nếu bạn chỉ có một trang, và trang đó là trang AMP, bạn vẫn phải thêm liên kết chính thức vào trang đó, và liên kết này đơn giản là trỏ đến chính nó:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **ĐỌC TIẾP –** Tìm hiểu thêm về cách Google tìm ra các trang AMP trong [hướng dẫn của Google Tìm kiếm dành cho các trang AMP](https://support.google.com/webmasters/answer/6340290). [/tip]

## Tích hợp với những nền tảng bên thứ ba thông qua siêu dữ liệu khác <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

Sometimes a third-party site (that embeds your AMP page or includes links to it) needs to know more about your page other than the fact that it is an AMP page. The questions a platform might ask about your page are things like “Are you a news article?”, “Or a video?”, or “Do you have a screenshot and short description?”.

Điều này không chỉ thích hợp cho các trang AMP mà còn cho tất cả các trang web. Đối với một số nền tảng, siêu dữ liệu này là phần cộng thêm, nhưng đối với số khác thì nó là điều bắt buộc, nghĩa là họ **không hiển thị liên kết đến nội dung của bạn nếu bạn không bao gồm siêu dữ liệu phù hợp**. Hãy bảo đảm là bạn bao gồm siêu dữ liệu phù hợp cho những nền tảng bạn muốn nội dung xuất hiện trên đó.

### Dùng Schema.org cho hầu hết các công cụ tìm kiếm

[Schema.org](http://schema.org/) offers open vocabularies to add meta data to all sorts of things. In the case of AMP, the properties that make sense in context include the specific type of content (i.e. ‘news article’), the headline, the published date and associated preview images.

Ví dụ:

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

Xem thêm ví dụ ở [thư mục ví dụ ampproject](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples), bao gồm cú pháp thuộc tính HTML thay thế.

[tip type="read-on"] Truy cập những nguồn này để biết thêm thông tin về dữ liệu có cấu trúc:

- Learn how to [Structure your content to appear in Google Search rich results](https://developers.google.com/search/docs/guides/mark-up-content) (e.g., top stories carousel, recipe cards, etc.).
- Test your structured data with the [Google Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/). [/tip]

### Siêu dữ liệu khác cho những nền tảng khác nữa

Head to the [Social Discovery guide at Web Fundamentals](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) to learn about all the other different ways of preparing your content for discovery and distribution.

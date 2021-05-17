---
formats:
  - websites
'$title': Quảng bá các trang của bạn
'$titles':
  teaser: Make your pages discoverable
$order: 5
description: 'Trong một số trường hợp, bạn có thể muốn cả phiên bản AMP lẫn không phải AMP cho cùng một trang, ví dụ như trang bài báo tin tức. Hãy xét đến điều này: nếu Google Tìm kiếm...'
teaser:
  icon: khám phá
  text: Tìm hiểu cách công cụ tìm kiếm biết được có một phiên bản AMP cho website của bạn.
  label: Tìm hiểu thêm
---

Trong một số trường hợp, bạn có thể muốn có cả hai phiên bản AMP và không phải AMP của cùng một trang, ví dụ như cho một bài viết tin tức. Hãy cân nhắc: Nếu Google Tìm kiếm tìm thấy phiên bản không phải AMP của trang đó, liệu họ có biết rằng có một phiên bản AMP "cặp đôi" của nó hay không?

### Liên kết các trang với <link>

Để giải quyết vấn đề này, chúng tôi thêm thông tin về trang AMP vào trang không phải AMP và ngược lại, dưới dạng thẻ `<link>` trong `<head>`.

Thêm thông tin sau vào trang không phải AMP:

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

Đôi khi một website bên thứ ba (vốn nhúng trang AMP của bạn hoặc bao gồm những liên kết đến trang đó) cần biết thêm về trang của bạn ngoài thông tin đó là một trang AMP. Những câu hỏi mà một nền tảng có thể nêu ra về trang của bạn là những câu như "Bạn là trang bài báo tin tức?", "Hay trang video?", hay "Bạn có ảnh chụp màn hình và miêu tả ngắn không?".

Điều này không chỉ thích hợp cho các trang AMP mà còn cho tất cả các trang web. Đối với một số nền tảng, siêu dữ liệu này là phần cộng thêm, nhưng đối với số khác thì nó là điều bắt buộc, nghĩa là họ **không hiển thị liên kết đến nội dung của bạn nếu bạn không bao gồm siêu dữ liệu phù hợp**. Hãy bảo đảm là bạn bao gồm siêu dữ liệu phù hợp cho những nền tảng bạn muốn nội dung xuất hiện trên đó.

### Dùng Schema.org cho hầu hết các công cụ tìm kiếm

[Schema.org](http://schema.org/) cung ứng những từ vựng mở để thêm siêu dữ liệu vào đủ loại thành phần. Trong trường hợp AMP, những thuộc tính có nghĩa trong bối cảnh này bao gồm loại nội dung cụ thể (tức là 'bài báo tin tức'), tiêu đề bài, ngày phát hành và hình ảnh xem trước có liên quan.

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

Xem thêm ví dụ ở [thư mục ví dụ ampproject](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples), bao gồm cú pháp thuộc tính HTML thay thế.

[tip type="read-on"] Truy cập những nguồn này để biết thêm thông tin về dữ liệu có cấu trúc:

- Tìm hiểu cách [Đặt cấu trúc cho nội dung của bạn để xuất hiện trong số những kết quả phong phú của Google Tìm kiếm](https://developers.google.com/search/docs/guides/mark-up-content) (như băng chuyền câu chuyện hàng đầu, thẻ công thức nấu ăn, v.v.).
- Kiểm tra dữ liệu có cấu trúc bằng [Công cụ kiểm tra dữ liệu có cấu trúc của Google](https://developers.google.com/structured-data/testing-tool/). [/tip]

### Siêu dữ liệu khác cho những nền tảng khác nữa

Hãy ghé [hướng dẫn Khám phá xã hội tại Web Fundamentals](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) để tìm hiểu về tất cả những cách khác cho việc sửa soạn nội dung của bạn để cho mục đích khám phá và phân phối.

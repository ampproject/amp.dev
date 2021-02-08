---
'$title': Quảng bá trang của bạn
$order: 3
description: Bạn cần thiết lập liên kết hai hướng để các công cụ tìm kiếm có thể hiểu mối quan hệ giữa tài liệu HTML chính thức với tài liệu AMP của chúng ta.
---

Giờ đây bạn đã tạo một bài viết tin tức trong AMP, hãy đảm bảo những người dùng có thể tìm thấy và khám phá nội dung của bạn.

## Liên kết nội dung AMP

Website của bạn có thể bao gồm toàn bộ các trang AMP, một số trang AMP, hoặc không có trang AMP nào. Phần này của bài thực hành sẽ bàn về cách để tích hợp AMP vào cấu trúc website của bạn.

Liên kết chính thức trong các trang HTML thông thường là một kỹ thuật thông dụng để khai báo trang nào nên được coi là trang ưu tiên khi có nhiều trang có chung một nội dung.

Một lối tiếp cận thông dụng khi thêm AMP vào một website là tạo các phiên bản AMP của các trang truyền thống, không phải AMP HTML. Cả hai phiên bản đều có cùng nội dung (ví dụ như nội dung của bài viết), nhưng chúng có cách trình bày khác nhau. Trong trường hợp này, bạn nên coi các trang HTML truyền thống là trang “chính thức”, và ghép các trang AMP với các trang HTML đó.

Nếu có thể, hãy sử dụng AMP như mọi thư viện JavaScript khác để xây dựng website của bạn và quên đi việc liên kết chính thức. Sử dụng AMP để xây dựng toàn bộ website sẽ giảm đáng kể gánh nặng bảo trì của bạn.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Linking AMP content') }}

Vì mục đích của bài thực hành này, chúng tôi sẽ tập trung vào trường hợp mà ở đó bạn có cả hai phiên bản AMP và không phải AMP của một trang. Trong bài thực hành này, website của chúng ta bao gồm một bài viết tin tức có một trang không phải AMP HTML (`article.html`) và một phiên bản AMP của trang này (`article.amp.html`). Chúng ta sẽ ghép đôi các trang này bằng `link` (liên kết).

Chúng ta đã thực hiện bước đầu tiên để đạt được điều này trong tài liệu AMP của mình bằng cách bao gồm một thẻ liên kết trong phần `<head>` (đầu đề) để chỉ lại về trang chính thức:

```html
<link rel="canonical" href="/article.html" />
```

Bước tiếp theo là liên kết bài viết chính thức với trang AMP. Việc này có thể được thực hiện bằng cách bao gồm một thẻ `<link rel="amphtml">` trong phần `<head>` của bài viết chính thức.

Trong tập tin `article.html`, **thêm** đoạn code sau vào phần `<head>`:

```html
<link rel="amphtml" href="/article.amp.html" />
```

Sơ đồ sau đây minh họa hướng của các thẻ liên kết:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Linking AMP content') }}

Bạn cần thiết lập liên kết hai hướng để các công cụ tìm kiếm có thể hiểu mối quan hệ giữa tài liệu HTML chính thức với tài liệu AMP của chúng ta. Nếu không có liên kết nào được cung cấp, crawler sẽ không rõ bài viết nào là “phiên bản AMP” của các tài liệu HTML thông thường. Thông qua việc cung cấp các liên kết này, chúng ta sẽ đảm bảo mọi chuyện đều rõ ràng!

## Bổ sung cấu trúc dữ liệu

Các trang AMP hợp lệ không cần cấu trúc dữ liệu [schema.org](http://schema.org/), nhưng một số nền tảng như Google Search đòi hỏi nó cho một số trải nghiệm như băng chuyền Câu chuyện hàng đầu. Việc bao gồm cấu trúc dữ liệu thường là một ý tưởng tốt. Cấu trúc dữ liệu giúp các công cụ tìm kiếm hiểu rõ hơn về trang web của bạn, và hiển thị tốt hơn nội dung của bạn trong Trang Kết quả Tìm kiếm (ví dụ, trong các mảnh tin phong phú). Cấu trúc dữ liệu được bao gồm trong thẻ `<head>` của trang AMP thông qua một thẻ kịch bản loại `application/ld+json`.

Ở bài viết tin tức của chúng ta, **thêm** cấu trúc dữ liệu sau đây vào cuối phần `<head>` trong tài liệu AMP của bạn:

```html
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
```

[tip type="note"] **LƯU Ý** – Nội dung sau đây nên được giữ nguyên. Đối với các bài viết tin tức, hãy nhập loại là “NewsArticle”. Đầu đề phải khớp với tiêu đề của bài viết. Đối tượng ảnh là ảnh anh hùng của bài viết. [/tip]

**Tải lại** trang này trong trình duyệt của bạn và xác minh rằng không có lỗi Xác thực AMP nào xảy ra.

[tip type="note"] Ngoài định dạng cấu trúc dữ liệu schema.org, còn có các định dạng khác được hỗ trợ bởi công cụ tìm kiếm và mạng xã hội. Tham khảo tài liệu sau đây:

- [Thẻ siêu dữ liệu Twitter Cards](https://dev.twitter.com/cards/overview)
- [Thẻ siêu dữ liệu Facebook Open Graph](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### Xác thực cấu trúc dữ liệu

Để xác minh cấu trúc dữ liệu của bạn là đúng, rất nhiều nền tảng cung cấp các công cụ xác thực. Trong bài thực hành này, chúng ta sẽ xác thực cấu trúc dữ liệu của mình bằng [Google Structured Data Validation Tool](https://developers.google.com/structured-data/testing-tool/) (Công cụ Xác thực Cấu trúc Dữ liệu của Google).

1. Trong một cửa sổ trình duyệt mới, mở [Google Structured Data Validation Tool](https://developers.google.com/structured-data/testing-tool/) (Công cụ Xác thực Cấu trúc Dữ liệu của Google).
2. Chọn tab **Đoạn mã**.
3. Sao chép và dán toàn bộ mã nguồn từ trang AMP của bạn vào bảng điều khiển chỉnh sửa văn bản của công cụ xác thực.
4. Nhấn **Chạy thử nghiệm**.

Nếu cấu trúc dữ liệu của bạn là hợp lệ, bạn sẽ thấy **0 lỗi**, và **0 cảnh báo**.

[tip type="read-on"] **ĐỌC THÊM –** Để tìm hiểu thêm về việc quảng bá trang, hãy xem hướng dẫn [Quảng bá trang của bạn](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). [/tip]

Tuyệt lắm! Bạn đã hoàn thành bài viết tin tức AMP của mình.

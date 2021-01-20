---
"$title": Tải sẵn PWA của bạn từ các trang AMP
"$order": '1'
description: Một chiến lược tốt là đặt một trang AMP làm trang đầu vào cho website của bạn, sau đó khởi động PWA đằng sau hậu trường và chuyển sang...
formats:
- websites
author: pbakaus
---

Một chiến lược tốt là **đặt một trang AMP làm trang đầu vào cho website của bạn**, sau đó **khởi động PWA đằng sau hậu trường** và chuyển sang nó cho đoạn đường tiếp theo:

- Mọi trang “lá” nội dung (những trang có nội dung cụ thể, không chỉ là trang tổng quan) đều được đăng dưới dạng AMP cho trải nghiệm tải gần như tức thì.
- Các AMP này sử dụng yếu tố đặc biệt [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) của AMP để khởi động một bộ nhớ đệm và dòng lệnh PWA trong khi người dùng đang thưởng thức nội dung của bạn.
- Khi người dùng nhấn vào một liên kết khác trên website của bạn (ví dụ, nút kêu gọi hành động ở cuối cho một trải nghiệm tương đương ứng dụng), service worker sẽ tiếp quản yêu cầu này, giành quyền kiểm soát trang và tải dòng lệnh PWA.

Đọc thêm để tìm hiểu lý do, và cách để sử dụng quy luật phát triển này.

## Cải thiện hành trình người dùng bằng cách kết nối với một PWA

### AMP để thu nhận người dùng ban đầu

AMP là một giải pháp lý tưởng cho các **trang lá**, là các trang nội dung mà người dùng của bạn phát hiện một cách tự nhiên thông qua một công cụ tìm kiếm, một liên kết do bạn bè chia sẻ hoặc thông qua một liên kết trên một website khác. Nhờ [kỹ thuật render sẵn chuyên dụng](../../../about/how-amp-works.html) của AMP, các trang AMP có thể tải rất nhanh, điều này đồng nghĩa với tỷ lệ bỏ cuộc thấp hơn đáng kể ([nghiên cứu mới nhất của DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) cho thấy **hơn 53% người dùng sẽ bỏ cuộc sau 3 giây**).

### PWA cho khả năng tương tác và gắn kết đa dạng

Mặt khác, Ứng dụng Web Lũy tiến cho phép khả năng tương tác và gắn kết lớn hơn đáng kể, nhưng không có <em>đặc điểm tải đầu tiên tức thì</em> của một trang AMP. Ở cốt lõi của chúng là một công nghệ mang tên Service Worker, một proxy phía máy khách cho phép bạn lưu bộ nhớ đệm cho đủ loại tài sản cho các trang của bạn, nhưng Service Worker đó chỉ kích hoạt <em>sau</em> lần tải đầu tiên.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='The pros and cons of AMP vs. PWA.') }}

## Khởi động PWA của bạn với `amp-install-serviceworker`

AMP có khả năng cài đặt Service Worker cho Ứng dụng Web Lũy tiến của bạn từ trong một trang AMP – đúng vậy, kể cả khi trang AMP đó được phục vụ từ một Bộ nhớ đệm AMP! Nếu được thực hiện đúng cách, một liên kết dẫn đến PWA của bạn (từ một trong các trang AMP) sẽ có cảm giác gần như tức thì, giống như cú nhảy đầu tiên đến trang AMP.

[tip type="tip"] **MẸO –** Nếu bạn chưa biết về Service Worker, tôi đặc biệt khuyến nghị [khóa học Udacity](https://www.udacity.com/course/offline-web-applications--ud899) của Jake Archibald. [/tip]

Đầu tiên, cài đặt service worker trên tất cả các Trang AMP của bạn bằng [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), đầu tiên bằng cách bao gồm thành phần này thông qua kịch bản của nó trong phần `<head>` (đầu đề) của trang của bạn:

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

Sau đó thêm phần sau vào đâu đó trong phần `<body>` (thân) của bạn (sửa để chỉ đến Service Worker thực của bạn):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Cuối cùng, trong bước cài đặt của service worker, lưu bất kỳ tài nguyên nào mà PWA sẽ cần vào bộ nhớ đệm:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

[tip type="tip"] **MẸO –** Đây là các cách dễ hơn để làm việc với một Service Worker. Xem [thư viện trợ giúp Service Worker](https://github.com/GoogleChrome/sw-helpers). [/tip]

## Đặt tất cả các liên kết trên một Trang AMP để điều hướng đến PWA

Nhiều khả năng là hầu hết các liên kết trên trang AMP của bạn đều dẫn đến các trang nội dung khác. Có 2 chiến lược để đảm bảo các nhấp chuột vào liên kết sau đó sẽ dẫn đến "nâng cấp" cho Ứng dụng Web Lũy tiến, [tùy thuộc vào cách bạn sử dụng AMP](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. Nếu bạn ghép đôi các trang chính thức của mình với trang AMP

Trong trường hợp này, bạn sẽ có một website chính thức (không phải AMP) và tạo các trang AMP được liên kết đến những trang chính thức này. Hiện tại, đây là cách sử dụng phổ biến nhất của AMP, và nó có nghĩa rằng các liên kết trên trang AMP của bạn nhiều khả năng sẽ liên kết đến phiên bản chính thức của website của bạn. **Tin tốt: Nếu website chính thức của bạn là PWA của bạn, bạn đã sẵn sàng**.

### 2. Nếu website chính thức của bạn là AMP

Trong trường hợp này, các trang chính thức của bạn *là* các trang AMP của bạn: Bạn đang xây dựng toàn bộ website của mình bằng AMP, và chỉ sử dụng AMP như một thư viện (dữ kiện vui: website bạn đang đọc bài viết này cũng được xây dựng theo cách đó). **Trong trường hợp này, hầu hết các liên kết trên các trang AMP của bạn đều sẽ dẫn đến các trang AMP khác.**

Bây giờ bạn có thể triển khai PWA của mình trên một đường dẫn riêng như `your-domain.com/pwa` và sử dụng Service Worker đã chạy để **tiếp quản điều hướng của trình duyệt khi một ai đó nhấn vào một liên kết trên Trang AMP**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

Điều đặc biệt thú vị về kỹ thuật này là bạn đang sử dụng tăng cường lũy tiến để chuyển từ AMP sang PWA. Tuy nhiên, điều này cũng có nghĩa rằng, ở trạng thái nguyên bản, các trình duyệt chưa hỗ trợ service worker sẽ nhảy từ AMP sang AMP và không bao giờ thực sự điều hướng sang PWA.

AMP giải quyết vấn đề này với một kỹ thuật tên là [viết lại URL dòng lệnh](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite). Thông qua việc bổ sung một quy luật URL phương án dự phòng vào thẻ [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), bạn đang hướng dẫn AMP viết lại tất cả các liên kết khớp trên một trang cụ thể để truy cập một URL dòng lệnh cũ trong trường hợp không phát hiện hỗ trợ cho service worker:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Khi các thuộc tính này được áp dụng, mọi nhấp chuột sau đó trên một AMP sẽ đến PWA của bạn, bất kể service worker thế nào.

[tip type="read-on"] **ĐỌC TIẾP –** Bạn đã đến đây rồi – tại sao không tái sử dụng các trang AMP hiện có để xây dựng PWA của mình? [Cách thức thế này](amp-in-pwa.md). [/tip]

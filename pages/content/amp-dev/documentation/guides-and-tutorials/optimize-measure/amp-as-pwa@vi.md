---
'$title': Dễ dàng truy cập ngoại tuyến và cải thiện hiệu năng
$order: 11
description: 'Một Service Worker là một proxy phía máy khách và là trung gian giữa trang và máy chủ của bạn; Service Worker được sử dụng để xây dựng các trải nghiệm ngoại tuyến, tải nhanh...'
formats:
  - websites
author: CrystalOnScript
contributors:
  - pbakaus
---

[Service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) cho phép tạo ra các trải nghiệm ngoại tuyến phong phú và trải nghiệm người dùng nhất quán trên nhiều cường độ tín hiệu mạng khác nhau. Thông qua việc lưu tài nguyên trong bộ nhớ đệm của trình duyệt, một ứng dụng web có thể cung cấp dữ liệu, tài sản và các trang ngoại tuyến cho người dùng để giúp họ gắn kết và cập nhật.

Hãy nhớ: Service Worker sẽ không thể tương tác với phiên bản AMP của trang được lưu trong bộ nhớ đệm. Hãy sử dụng nó cho các hành trình đi tiếp đến nguồn gốc của bạn.

## Cài đặt một Service Worker

Một Service Worker là một proxy phía máy khách và là trung gian giữa trang và máy chủ của bạn; Service Worker được sử dụng để xây dựng các trải nghiệm ngoại tuyến, tải nhanh các tình huống vỏ ứng dụng, và gửi thông báo đẩy.

[tip type="note"] **LƯU Ý –** Nếu bạn chưa quen với khái niệm về Service Worker, hãy đọc <a class="" href="https://developers.google.com/web/fundamentals/getting-started/primers/service-workers">bài giới thiệu tại WebFundamentals</a>. [/tip]

Service Worker của bạn cần được đăng ký trên một trang nhất định, nếu không, trình duyệt sẽ không thể tìm thấy hay chạy nó. Theo mặc định, việc này được thực hiện với sự trợ giúp của [một chút JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). Trên các Trang AMP, bạn có thể sử dụng thành phần [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) để làm điều này.

Vì thế, trước hết hãy bao gồm thành phần [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) thông qua kịch bản của nó trong phần `<head>` (đầu đề) của trang của bạn:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Sau đó thêm phần sau vào đâu đó trong phần `<body>` (thân) của bạn (sửa để chỉ đến Service Worker thực của bạn):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Nếu người dùng điều hướng đến các trang AMP của bạn trên nguồn gốc của bạn (không phải ở lần nhấp chuột đầu tiên, vốn thường được phục vụ từ một Bộ nhớ đệm AMP), Service Worker sẽ tiếp quản và có thể làm [nhiều điều rất thú vị](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

## Service Worker AMP

Nếu bạn đang ở đây, chắc hẳn bạn đang xây dựng các trang AMP. Đội ngũ AMP rất quan tâm đến việc đặt người dùng làm ưu tiên hàng đầu và mang đến họ một trải nghiệm web đẳng cấp thế giới. Để đảm bảo các trải nghiệm này được nhất quán, nhóm AMP đã tạo ra một service worker dành riêng cho AMP!

[tip type="default"] **MẸO –** Làm theo bài thực hành của chúng tôi để sử dụng [Service Worker AMP trong PWA của bạn](/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md). [/tip]

### Cài đặt Service Worker AMP

Cài đặt Service Worker AMP với các bước tối thiểu:

- [sourcecode:js] importScripts('https://ampjs.org/sw/amp-sw.js'); [/sourcecode]

- [sourcecode:js]
  AMP_SW.init();
  [/sourcecode]

- Xong.

### Lưu bộ nhớ đệm tự động

Service Worker AMP sẽ tự động lưu các tập tin kịch bản AMP và tài liệu AMP trong bộ nhớ đệm. Thông qua việc lưu các tập tin kịch bản AMP trong bộ nhớ đệm, chúng có thể được trình duyệt người dùng sử dụng ngay lập tức, cho phép các chức năng ngoại tuyến và tải trang nhanh hơn trên mạng không ổn định.

Nếu ứng dụng của bạn yêu cầu các loại bộ nhớ đệm cụ thể, Service Worker AMP cũng có khả năng tùy chỉnh. Ví dụ như thêm một danh sách từ chối cho các tài liệu, vốn luôn cần được yêu cầu từ mạng lưới. Trong ví dụ sau, thay `Array<RegExp>` bằng một dãy các biểu thức chính quy đại diện cho các tài liệu mà bạn không muốn lưu trong bộ nhớ đệm.

[sourcecode:js]
AMP_SW.init(
documentCachingOptions: {
denyList?: Array<RegExp>;
}
);
[/sourcecode]

Đọc thêm về [tùy chỉnh việc lưu tài liệu trong bộ nhớ đệm ở đây](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching).

### Tối ưu Service Worker AMP

Để tận dụng tối đa chức năng của Service Worker AMP, các trường tùy chọn đều phải được cấu hình để lưu các tài sản cần thiết trong bộ nhớ đệm và truy xuất trước các liên kết.

Các tài sản thúc đẩy người dùng truy cập đến một trang, ví dụ như video, ảnh quan trọng, hoặc một tập tin PDF có thể tải về nên được lưu trong bộ nhớ đệm để chúng có thể được truy cập lại khi người dùng ngoại tuyến.

[sourcecode:js]
AMP_SW.init(
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
);
[/sourcecode]

Bạn có thể tùy chỉnh chiến lược lưu bộ nhớ đệm và định nghĩa một danh sách từ chối.

Liên kết đến các trang mà người dùng của bạn ghé thăm có thể được truy xuất trước, cho phép họ truy cập chúng khi đang ngoại tuyến. Việc này được thực hiện bằng cách thêm một thuộc tính `data-prefetch` vào thẻ liên kết.

[sourcecode:html]
<a href='....' data-rel='prefetch' />
[/sourcecode]

### Trải nghiệm Ngoại tuyến

Thông báo với người dùng rằng họ đang ngoại tuyến, và nên tải lại trang khi họ có mạng, bằng cách bao gồm một trang ngoại tuyến. Service Worker AMP có thể lưu cả hai trang và các tài sản của nó trong bộ nhớ đệm.

[sourcecode:js] AMP_SW.init({ offlinePageOptions: { url: '/offline.html'; assets: ['/images/offline-header.jpg']; } }) [/sourcecode]

Một trang ngoại tuyến thành công sẽ trông như một phần trên website của bạn và có UI thống nhất với phần còn lại của ứng dụng.

### Buộc Cập nhật

Nhóm đang làm việc để triển khai một tính năng buộc cập nhật/gỡ bỏ nếu Service Worker AMP của bạn cần bị tắt hoặc thay đổi nếu việc triển khai cho người dùng xảy ra sự cố.

Để quản lý hiệu quả một service worker, bạn cần hiểu cách [bộ nhớ đệm HTTP tiêu chuẩn ảnh hưởng đến việc cập nhật cho JavaScript của service worker](https://developers.google.com/web/updates/2018/06/fresher-sw). Các service worker được phục vụ với chỉ dẫn về bộ nhớ đệm HTTP phù hợp có thể giải quyết các bản khắc phục lỗi nhỏ bằng cách thực hiện các thay đổi phù hợp và triển khai lại service worker cho môi trường máy chủ của bạn. Nếu bạn cần gỡ bỏ một service worker, hãy giữ một tập tin service worker [no-op](https://en.wikipedia.org/wiki/NOP) (không hoạt động) đơn giản ở chỗ thuận tiện, như sau:

```js
self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
```

[tip type="read-on"] [Đọc thêm](https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776) về việc quản lý các service worker được triển khai. [/tip]

## Write a Custom Service Worker

Bạn có thể sử dụng kỹ thuật ở trên để cho phép truy cập ngoại tuyến đến website AMP của mình, cũng như mở rộng các trang của bạn **ngay khi chúng được phục vụ từ nguồn gốc**. Đó là bởi bạn có thể sửa đổi hồi đáp thông qua sự kiện `fetch` (truy xuất) của Service Worker, và trả về mọi hồi đáp mà bạn muốn:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
event.respondWith(
caches.open('mysite').then(function(cache) {
return cache.match(event.request).then(function(response) {
var fetchPromise = fetch(event.request).then(function(networkResponse) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
})

        // Modify the response here before it goes out..
        ...

        return response || fetchPromise;
      })
    })

);
});
[/sourcecode]

Sử dụng kỹ thuật này, bạn có thể bổ sung đủ loại chức năng cho Trang AMP của mình, mà trong trường hợp khác sẽ không qua được [xác thực AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), ví dụ:

- Các tính năng động cần JS tùy chỉnh.
- Các thành phần được tùy chỉnh/chỉ liên quan đến website của bạn.

---
'$title': Mối liên hệ giữa AMP và PWA
$order: 7
description: Các Ứng dụng Web Lũy tiến và trang AMP hoạt động rất tốt với nhau. Trong thực tế, trong nhiều trường hợp, chúng đều bổ trợ cho nhau theo cách này hoặc cách khác. Tìm hiểu cách để...
formats:
  - websites
components:
  - youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Watch the intro to combining AMP and PWA.']

Các Ứng dụng Web Lũy tiến và trang AMP hoạt động rất tốt với nhau. Trong thực tế, trong nhiều trường hợp, chúng đều bổ trợ cho nhau theo cách này hoặc cách khác. Tìm hiểu cách để:

1. [Bật các tính năng PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) cho các trang AMP của bạn
2. Tạo một [hành trình người dùng cuốn hút, siêu nhanh](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) từ AMP đến PWA
3. [Đơn giản hóa PWA của bạn](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) với sức mạnh của AMP

[tip type="note"]

Tìm hiểu thêm về [Ứng dụng Web Lũy tiến](https://developers.google.com/web/progressive-web-apps/) tại Web Fundamentals.

[/tip]

## Các trang AMP với tính năng PWA

Các Trang AMP có thể sử dụng nhiều tính năng PWA, chừng nào chúng được phục vụ từ nguồn của bạn (từ tên miền website của bạn) thay vì từ một Bộ nhớ đệm AMP. Điều này có nghĩa các tính năng PWA sẽ không được kích hoạt khi sử dụng một Trang AMP trong một nền tảng như Google hoặc Bing, nhưng chúng sẽ kích hoạt trên hành trình sau đó, hoặc nếu người dùng điều hướng trực tiếp đến các trang AMP của bạn.

[tip type="read-on"] **ĐỌC THÊM –** Tìm hiểu cách để [bật các tính năng PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) cho Trang AMP của bạn. [/tip]

## AMP như một điểm đầu vào PWA của bạn

Ưu điểm đặc trưng của AMP là **khả năng cung cấp gần như tức thì**, một đặc tính khiến AMP rất phù hợp để tương tác người dùng lần đầu với website của bạn. _Các ứng dụng web lũy tiến_ cho phép **tương tác tốt hơn và nhiều tính năng hỗ trợ gắn kết**, nhưng lần tải đầu tiên của chúng bị hạn chế bởi thực tế rằng Service Worker của website, cũng như các tài sản và dòng lệnh ứng dụng chỉ thực sự tăng tốc cung cấp trên các lần tải sau đó.

Một chiến lược tốt là đặt một trang AMP làm trang đầu vào cho website của bạn, sau đó khởi động PWA đằng sau hậu trường và chuyển sang nó cho đoạn đường tiếp theo.

[tip type="read-on"] **ĐỌC TIẾP –** Tìm hiểu cách để [kết nối AMP với một PWA](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) thông qua [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md). [/tip]

## AMP như một nguồn dữ liệu cho PWA của bạn

Một trong các tính năng cốt lõi của các Trang AMP là chúng có thể được nhúng một cách dễ dàng và an toàn, đó là lý do ngày càng nhiều nền tảng hỗ trợ việc phân phối và phục vụ các trang này.

Nếu bạn đang xây dựng một Ứng dụng Web Lũy tiến, bạn có thể nhận các lợi ích này và giảm thiểu sự phức tạp của hệ thống backend và máy khách của mình bằng cách **sử dụng lại các Trang AMP như một nguồn dữ liệu cho PWA của bạn**.

[tip type="read-on"] **ĐỌC TIẾP –** Tìm hiểu cách để [sử dụng các trang AMP trong một PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md). [/tip]

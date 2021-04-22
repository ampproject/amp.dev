---
'$title': Tích hợp công cụ phân tích của bạn với AMP
$order: 1
formats:
  - websites
  - stories
teaser:
  text: Tổng quan
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Tổng quan <a name="overview"></a>

Nếu bạn vận hành một phần mềm như một dịch vụ để giúp các nhà phát hành hiểu rõ hơn về lưu lượng và khách truy cập của họ, bạn có thể muốn tích hợp dịch vụ của mình vào `amp-analytics`. Việc này sẽ cho phép các khách hàng của bạn xem quy luật lưu lượng cho các trang AMP HTML của họ.

## Trước khi bắt đầu <a name="before-you-begin"></a>

Trước khi bạn có thể thêm dịch vụ phân tích của mình vào thời gian chạy AMP HTML, bạn có thể cần:

- Xác định loại [biến số](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md) và [yêu cầu](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-analytics.md#requests) bạn sẽ cần trong một tài liệu AMP HTML cho dịch vụ phân tích của mình.
- Xác định liệu chức năng tiện ích chia lô có là cần thiết để xây dựng URL cuối cùng hay không nếu sử dụng các yêu cầu có hành vi chia lô.
- Xác định các yếu tố kích hoạt dẫn đến yêu cầu phân tích được gửi từ một trang liên quan đến dịch vụ của bạn.
- Cân nhắc cách bạn sẽ [theo dõi người dùng](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md) trong các ngữ cảnh AMP bên thứ nhất và bên thứ ba.
- Xác định cách bảng điều khiển phân tích của bạn xử lý lưu lượng AMP.
- Xác định các chức năng còn thiếu trong `amp-analytics`, và [gửi yêu cầu](https://github.com/ampproject/amphtml/issues/new) cho các tính năng cần thiết.
- AMP Analytics sẽ gửi các biến số của nó đến một điểm cuối được cấu hình sẵn. Nếu bạn chưa có một điểm cuối hiện có, hãy xem lại [mẫu này](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample) để có cái nhìn tổng quan về cách xây dựng nó.
  - Đối với tất cả các loại vận chuyển ngoại trừ `iframe`, các biến số sẽ được gửi dưới dạng tham số chuỗi truy vấn trong một yêu cầu HTTPS.
  - Đối với loại vận chuyển `iframe`, một iframe được tạo và các biến số được gửi đến nó qua `window.postMessage`. Trong trường hợp này, thông điệp này không cần phải là một URL. Tùy chọn này chỉ được cung cấp cho các nhà cung cấp có chứng nhận MRC.
- Cân nhắc tác dụng của việc tích hợp `amp-analytics` đến mọi chính sách (cụ thể là chính sách quyền riêng tư của bạn) hoặc thỏa thuận mà bạn có thể có.

## Thêm cấu hình của bạn vào thời gian chạy AMP HTML <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Tạo một [vấn đề Ý định Triển khai](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features), tuyên bố rằng bạn sẽ thêm cấu hình của dịch vụ phân tích của mình vào thời gian chạy AMP HTML. Hãy nhớ bao gồm **cc @ampproject/wg-analytics** trong mô tả của bạn.
2. Phát triển một bản vá triển khai những nội dung sau:
   1. Một tập tin json cấu hình mới `${vendorName}.json` trong [thư mục](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors) nhà cung cấp, bao gồm mọi tùy chọn ngoài tùy chọn mặc định như:
      1. `"vars": {}` cho các biến số mặc định bổ sung.
      2. `"requests": {}` cho các yêu cầu mà dịch vụ của bạn sẽ sử dụng.
      3. `"optout":` nếu cần. Hiện tại, chúng tôi không có một hệ thống bỏ đăng ký hoàn hảo, vậy nên hãy liên hệ để giúp chúng tôi thiết kế một hệ thống hoạt động tốt đối với bạn.
      4. `"warningMessage":` nếu cần. Hiển thị thông tin cảnh báo từ nhà cung cấp (ví dụ như vô hiệu hoặc chuyển đổi) trong bảng điều khiển.
   2. Nếu bạn đang sử dụng vận chuyển iframe, hãy thêm một dòng mới vào ANALYTICS_IFRAME_TRANSPORT_CONFIG trong iframe-transport-vendors.js chứa `"*vendor-name*": "*url*"`
   3. Một ví dụ trong tài liệu tham khảo [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
   4. Một kiểm tra trong tập tin [extensions/amp-analytics/0.1/test/vendor-requests.json](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
   5. Thêm dịch vụ phân tích của bạn vào danh sách nhà cung cấp được hỗ trợ trong tập tin [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/./analytics-vendors-list.md). Bao gồm loại, mô tả và liên kết đến tài liệu sử dụng của bạn.
3. Nếu một tiện ích lô mới là cần thiết. Vui lòng tham khảo [Thêm Tiện ích Lô](#add-batch-plugin) để được hướng dẫn.
4. Kiểm tra ví dụ mới mà bạn đã đặt vào [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) để đảm bảo các chức năng từ ví dụ đang hoạt động như kỳ vọng. Ví dụ, dữ liệu cần thiết đang được thu thập và hiển thị trong bảng điều khiển phân tích của bạn.
5. Gửi một Yêu cầu Kéo với bản vá này, tham chiếu vấn đề Ý định Triển khai.
6. Cập nhật tài liệu sử dụng dịch vụ của bạn và thông báo với các khách hàng.
7. Bạn nên duy trì một [kiểm tra tích hợp bên ngoài kho lưu trữ AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## Quản lý Thẻ <a name="tag-managers"></a>

Dịch vụ quản lý thẻ có 2 tùy chọn để tích hợp dịch vụ Phân tích AMP:

- **Lối tiếp cận đầu cuối:** Có chức năng như một đầu cuối bổ sung cho `amp-analytics`, và phân tích việc quản lý tiếp thị trong backend.
- **Lối tiếp cận cấu hình:** Thực hiện quản lý thẻ thông qua một tập tin cấu hình JSON được tạo năng động và duy nhất cho từng nhà phát hành.

Lối tiếp cận điểm cuối cũng giống như lối tiếp cận tiêu chuẩn được mô tả trong phần trước. Lối tiếp cận cấu hình bao gồm tạo một cấu hình amp-analytics duy nhất cho từng nhà phát hành và bao gồm tất cả các gói phân tích tương thích của họ. Một nhà phát hành sẽ bao gồm cấu hình này sử dụng một cú pháp giống như:

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

Để thực hiện lối tiếp cận này, hãy xem lại tài liệu để tích hợp vào AMP Analytics cho nhà phát hành.

## Tài nguyên bổ sung <a name="further-resources"></a>

- Deep Dive: [Tại sao lại không sử dụng một iframe?](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/why-not-iframe.md)
- Deep Dive: [Quản lý trạng thái người dùng chưa xác thực với AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md)
- [Mẫu amp-analytics](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- Tài liệu tham khảo [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- Tài liệu tham khảo [biến số amp-analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md)

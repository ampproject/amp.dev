---
"$title": Biện pháp thực hành tiên tiến nhất cho AMP cho Email
"$order": '1'
"$category": Develop
formats:
- email
---

AMP cho phép các loại nội dung mới và cuốn hút trong email! Khi thiết kế email, hãy chú ý đến các biện pháp thực hành tiên tiến nhất sau đây để đảm bảo email của bạn có hiệu năng tốt, ổn định trên các nền tảng khác nhau và hoạt động như kỳ vọng của người dùng.

#Tốc độ

Khi sử dụng [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) để truy xuất năng động nội dung, hãy bao gồm một mã giữ chỗ để đảm bảo tính toàn vẹn của cấu trúc thành phần. Mã giữ chỗ này nên có bố cục giống như tài liệu sau khi nó đã trả về dữ liệu được yêu cầu. Điều này đảm bảo kích cỡ hay bố cục tin nhắn không bị thay đổi quá mức.

#Công năng và hỗ trợ tiếp cận

- Khi sử dụng [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email), hãy đảm bảo các thuộc tính `controls` được thiết lập. Điều này cho phép người dùng trên các thiết bị cảm ứng như điện thoại thông minh có thể điều hướng băng chuyền.
- Khi sử dụng [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), hãy nhớ rằng không phải loại dữ liệu đầu vào nào cũng được hỗ trợ trên iOS. Hãy tham khảo [Các Giá trị Đầu vào được Hỗ trợ](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) trong Tài liệu Tham khảo HTML Safari để biết thêm thông tin.
- Không phải [giá trị thuộc tính `autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) nào cũng được hỗ trợ trên các ứng dụng và trình duyệt khác nhau. Hãy giả sử tính năng tự động điền không khả dụng cho người dùng của bạn và giữ các biểu mẫu này ngắn.

#Phong cách

- Đảm bảo email của bạn chỉ sử dụng [CSS được Hỗ trợ cho AMP cho Email](../learn/email-spec/amp-email-css.md?format=email)
- Tránh sử dụng các đơn vị màn hiển thị (`vw`, `vh`, `vmin` và `vmax`) trong CSS và HTML của bạn. Bởi email AMP được render trong một iframe, màn hiển thị của email sẽ không khớp với màn hiển thị của trình duyệt.
- Các trình duyệt khác nhau đều có phong cách CSS mặc định khác nhau. Sử dụng một thư viện CSS có phong cách chuẩn hóa nếu cần. Để biết thêm thông tin về các phong cách mặc định, chuẩn hóa phong cách và một danh sách các thư viện khả dụng, hãy xem [Khởi động lại, Đặt lại và Lý do](https://css-tricks.com/reboot-resets-reasoning/).
- Cẩn thận với lề tràn trong CSS: chúng có thể không được render do [giới hạn về bố cục của AMP](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241).

##Di động

Đảm bảo thư của bạn hiển thị tốt trên tất cả các kích cỡ màn hình bằng cách sử dụng [các truy vấn CSS đa phương tiện](style_and_layout/control_layout.md?format=email) để xác định thiết bị. Thư nên được kiểm tra trên các thiết bị di động để đảm bảo chúng có bố cục phù hợp và các thành phần hoạt động như kỳ vọng.

#Các mẹo khác

Khi làm việc với AMP cho Email, hãy lưu ý các mẹo và lời khuyên sau:

- Sân thực hành AMP cho Email không hỗ trợ proxy XHR, nhưng một số nhà cung cấp email khác thì có.
- Thành phần AMP MIME nên xuất hiện trước phần HTML MIME trong email của bạn để đảm bảo độ tương thích tối đa trên tất cả các trình khách email.
- Thuộc tính `src` của [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email), [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) của [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), `src` cho [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email), hoặc thuộc tính href của một thẻ `<a>` không thể được sửa đổi bởi [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email).
- Thư của bạn nên bao gồm một phiên bản HTML tĩnh trong trường hợp người dùng được đưa đến phiên bản HTML của thư, hoặc nếu người dùng chuyển tiếp thư đó.

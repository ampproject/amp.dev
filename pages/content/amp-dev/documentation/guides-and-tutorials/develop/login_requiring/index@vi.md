---
"$title": Tạo một trang AMP cần đăng nhập
"$order": '0'
description: Một số tương tác của người dùng với trang, ví dụ như để lại bình luận, có thể được đặt điều kiện theo một quy trình đăng nhập. Bạn có thể triển khai một quy trình đăng nhập...
numbered: '1'
"$hidden": 'true'
formats:
- websites
---

Một số tương tác của người dùng với trang, ví dụ như để lại bình luận, có thể được đặt điều kiện theo một quy trình đăng nhập. Bạn có thể triển khai một quy trình đăng nhập với AMP bằng cách sử dụng thành phần [`amp-access`](../../../../documentation/components/reference/amp-access.md) kết hợp với thành phần [`amp-form`](../../../../documentation/components/reference/amp-form.md).

[tip type="tip"] **MẸO –** Để xem một bản demo, vui lòng truy cập [mẫu phần bình luận](../../../../documentation/examples/documentation/Comment_Section.html) tại [ampbyexample.com](../../../../documentation/examples/index.html). [/tip]

[Mẫu phần bình luận](../../../../documentation/examples/documentation/Comment_Section.html) kết hợp [`amp-access`](../../../../documentation/components/reference/amp-access.md) và [`amp-form`](../../../../documentation/components/reference/amp-form.md) để tạo thành một phần bình luận chỉ được bật khi người dùng đã đăng nhập. Để giải thích cách hoạt động của đoạn code mẫu này, hãy theo dõi các nhóm hành động được thực hiện khi bạn vào trang.

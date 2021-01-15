---
"$title": Đăng nhập
"$order": '1'
description: Lần đầu tiên bạn vào trang, bạn có thể thấy 2 bình luận và một nút đăng nhập. Nếu bạn tìm nút đăng nhập trong code, bạn sẽ thấy...
---

Lần đầu tiên bạn vào [trang](../../../../documentation/examples/previews/Comment_Section.html), bạn có thể thấy 2 bình luận và một nút đăng nhập.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

Nếu bạn tìm nút đăng nhập trong code, bạn sẽ thấy:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

Hành vi của các thuộc tính liên quan đến [`amp-access`](../../../../documentation/components/reference/amp-access.md) phụ thuộc vào một cấu hình toàn trang cho [`amp-access`](../../../../documentation/components/reference/amp-access.md), trong trường hợp của chúng ta:

[sourcecode:html]
<script id="amp-access" type="application/json">
  {
    "authorization": "https://ampbyexample.com/samples_templates/comment_section/authorization?rid=READER_ID&url=CANONICAL_URL&ref=DOCUMENT_REFERRER&_=RANDOM",
    "noPingback": "true",
    "login": {
      "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
      "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
    },
    "authorizationFallbackResponse": {
      "error": true,
      "loggedIn": false
    }
  }
</script>
[/sourcecode]

Điểm cuối xác thực được triển khai như một phần của AMPByExample. Nhà phát hành trang web có trách nhiệm cung cấp điểm cuối này. Trong trường hợp mẫu này, để đơn giản, chúng ta đã triển khai lôgic cơ bản rằng khi yêu cầu này được tiếp nhận, máy chủ sẽ đọc giá trị của một cookie tên là `ABE_LOGGED_IN`. Nếu cookie không có ở đó, chúng ta sẽ trả về một hồi đáp JSON chứa `loggedIn = false`. Do đó, lần đầu tiên người dùng vào trang, yêu cầu này sẽ trả về `loggedIn = false` và nút đăng nhập sẽ được hiển thị.

Nhìn lại mã HTML của nút này, bằng cách sử dụng `on="tap:amp-access.login-sign-in"`, chúng ta quy định rằng sau khi người dùng chạm vào nút đó, URL được quy định trong JSON ở trên sẽ được sử dụng:

[sourcecode:json]
{
	"login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

[tip type="note"] **LƯU Ý –** Lưu ý rằng bạn có thể quy định các URL khác nhau trong node đăng nhập, trong trường hợp này, chúng ta đang định nghĩa `sign-in`, và sau đó chúng ta sẽ định nghĩa `sign-out`. [/tip]

Trang đăng nhập là một trang phi AMP mà chúng ta sẽ điền các giá trị đăng nhập và mật khẩu để đơn giản hóa. Lưu ý việc sử dụng loại nhập liệu ẩn `returnURL`, được máy chủ AMPByExample điền dữ liệu vào thông qua khuôn mẫu phía máy chủ. Máy chủ sẽ đọc giá trị này từ một tham số gọi là `return` (trả về), được thư viện AMP tự động bổ sung vào URL đăng nhập.

Trong ví dụ dưới đây, giá trị cho tham số `return` (trả về) được thêm vào yêu cầu sau khi bạn đã nhấn vào nút đăng nhập. Bạn có thể khám phá giá trị này bằng cách sử dụng bảng điều khiển Chrome DevTools và điều hướng đến tab Network (Mạng).

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

Sau khi máy chủ AMPByExample đã nhận yêu cầu POST từ trang đăng nhập và thông tin đăng nhập và mật khẩu là chính xác, nó sẽ chuyển hướng yêu cầu đến `returnURL` mà chúng ta đã nhắc đến ở trên, và chèn tham số `#success=true`. Bây giờ, thời gian chạy AMP đã có thể xác thực trang và cho phép bạn thêm một bình luận.

Bạn cần hiểu về công việc của thời gian chạy AMP và của máy chủ, bởi việc triển khai máy chủ là trách nhiệm của nhà phát hành trang web.

Tóm lại:

- Thời gian chạy AMP sẽ tự động thêm tham số trả về vào yêu cầu đăng nhập được quy định trong đối tượng JSON đăng nhập
- Thời gian chạy AMP sẽ đóng trang đăng nhập và chuyển hướng đến trang được quy định bởi tham số URL trả về
- Máy chủ nên xử lý hồi đáp sau khi người dùng nhấn vào nút đăng nhập

[tip type="tip"] **MẸO –** Một giải thích chi tiết hơn về quy trình này cũng có thể được tìm thấy trong [`amp-access`](../../../../documentation/components/reference/amp-access.md). [/tip]

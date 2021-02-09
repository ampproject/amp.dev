---
'$title': Đăng xuất
$order: 3
description: Cũng giống như nút đăng nhập, việc hiển thị nút đăng xuất tùy thuộc vào trạng thái của thành phần amp-access...
---

Cũng giống như nút đăng nhập, việc hiển thị nút đăng xuất tùy thuộc vào trạng thái của thành phần [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Khi bạn nhấn nút Đăng xuất, bạn sẽ được chuyển hướng đến URL mà bạn đã quy định trong cấu hình JSON [`amp-access`](../../../../documentation/components/reference/amp-access.md), như một phần của đối tượng đăng nhập:

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
"sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
}
}
[/sourcecode]

Tương tự đăng nhập, khi máy chủ AMPByExample nhận được một yêu cầu đăng xuất, nó sẽ sử dụng tham số truy vấn URL trả về đã được thư viện AMP tự động thêm vào và chuyển hướng đến đó, bổ sung thêm chuỗi `#success=true`. Bây giờ, bạn đã quay về trang ban đầu; cookie AMPByExample vốn trước đó đã được tạo cho trang đăng nhập (tên là `ABE_LOGGED_IN`) sẽ được xóa ở thời điểm hiện tại.

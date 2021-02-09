---
'$title': Thêm bình luận
$order: 2
description: Tạm thời điểm hiện tại, người dùng có thể thêm một bình luận sử dụng thư viện amp-form. Hãy lưu ý điều kiện hiển thị biểu mẫu, tùy thuộc vào trạng thái của thành phần amp-access...
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

Tạm thời điểm hiện tại, người dùng có thể thêm một bình luận sử dụng thư viện [`amp-form`](../../../../documentation/components/reference/amp-form.md). Hãy lưu ý điều kiện hiển thị biểu mẫu, tùy thuộc vào trạng thái của thành phần [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]

<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

Chúng ta quy định một phương thức POST và một hành động XHR, bởi các hành động không phải là XHR không được cho phép với POST trong AMP. Bởi đây là bản demo, chúng ta không duy trì bình luận liên tục, vậy nên bạn chỉ có thể thêm một bình luận tại một thời điểm; mỗi khi một bình luận được bổ sung, máy chủ AMPByExample sẽ trả lời với một hồi đáp JSON chứa văn bản đã nhập với một số thông tin bổ sung như dấu thời gian, hình đại diện và tên người dùng.

Đây là một ví dụ về hồi đáp JSON:

[sourcecode:json] {"Datetime":"09:34:21", "User":"Charlie", "Text":"Hello!", "UserImg":"/img/ic_account_box_black_48dp_1x.png"} [/sourcecode]

Thành phần biểu mẫu sẽ chỉ hiển thị các giá trị này trong trang sử dụng khuôn mẫu [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md):

[sourcecode:html]

<div submit-success>
  <template type="amp-mustache">
    <div class="comment-user">
      <amp-img width="44" class="user-avatar" height="44" alt="user" src="{{UserImg}}"></amp-img>
      <div class="card comment">
        <p><span class="user">{% raw %}{{User}}{% endraw %}</span><span class="date">{% raw %}{{Datetime}}{% endraw %}</span></p>
        <p>{% raw %}{{Text}}{% endraw %}</p>
      </div>
    </div>
  </template>
</div>
[/sourcecode]

Trong ví dụ này, chúng ta chỉ kiểm tra liệu giá trị của bình luận có trống hay không; nếu giá trị này bị trống, chúng ta sẽ trả về một lỗi để khiến đoạn code sau được thực thi

[sourcecode:html]

<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

Để tạo điểm nhấn, chúng ta bổ sung thuộc tính `required` để buộc có văn bản bình luận trước khi gửi đi bình luận đó:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Khi bạn thêm một bình luận và nhấn nút gửi đi, bạn sẽ thấy nội dung như trong ảnh chụp màn hình sau:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>

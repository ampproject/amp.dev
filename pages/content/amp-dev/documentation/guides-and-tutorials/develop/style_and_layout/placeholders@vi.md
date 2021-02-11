---
'$title': Mã giữ chỗ & phương án dự phòng
$order: 3
descriptions: "In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible."
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible.

Một số yếu tố thậm chí còn thưởng cho bạn nếu bạn đáp ứng điều đó bằng cách nới lỏng các hạn chế – ví dụ, nếu bạn cung cấp một mã giữ chỗ cho [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), nó có thể được sử dụng ở gần đầu trang (vốn không thể được thực hiện nếu thiếu nó).

## Mã giữ chỗ

Yếu tố được đánh dấu thuộc tính `placeholder` (mã giữ chỗ) sẽ hoạt động như mã giữ chỗ cho yếu tố AMP cha. Nếu được quy định, một yếu tố `placeholder` (mã giữ chỗ) phải là một con trực tiếp của yếu tố AMP. Yếu tố được đánh dấu là một `placeholder` (mã giữ chỗ) sẽ luôn `fill` (lấp đầy) yếu tố AMP của cha.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300"
>
  <amp-img
    placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill"
  >
  </amp-img>
</amp-anim>
```

[/example]

Theo mặc định, mã giữ chỗ sẽ được hiển thị ngay lập tức cho yếu tố AMP, kể cả khi tài nguyên của yếu tố AMP chưa được tải về hoặc bắt đầu. Sau khi đã sẵn sàng, yếu tố AMP thường sẽ ẩn mã giữ chỗ của nó và hiển thị nội dung.

[tip type="note"] **LƯU Ý –** Mã giữ chỗ không cần phải là một yếu tố AMP; mọi yếu tố HTML đều có thể hoạt động như mã giữ chỗ. [/tip]

## Phương án dự phòng <a name="fallbacks"></a>

Bạn có thể quy định thuộc tính `fallback` (phương án dự phòng) cho một yếu tố để chỉ báo hành vi phương án dự phòng:

- cho mọi yếu tố mà trình duyệt không hỗ trợ
- nếu nội dung không được tải (ví dụ, Tweet đã bị xóa)
- Nếu loại ảnh không được hỗ trợ (ví dụ, WebP không được hỗ trợ trong mọi trình duyệt)

Bạn có thể thiết lập thuộc tính `fallback` (phương án dự phòng) cho _mọi_ yếu tố HTML, không chỉ các yếu tố AMP. Nếu được quy định, yếu tố `fallback` (phương án dự phòng) phải là một con trực tiếp của yếu tố AMP.

##### Ví dụ: Tính năng không được hỗ trợ

Trong ví dụ sau, chúng tôi sử dụng thuộc tính `fallback` (phương án dự phòng) để thông báo với người dùng rằng trình duyệt này không hỗ trợ một tính năng cụ thể:

[example preview="inline" playground="true" imports="amp-video:0.1"]

```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

[/example]

##### Ví dụ: Phục vụ các định dạng ảnh khác nhau

Trong ví dụ sau, chúng tôi sử dụng thuộc tính `fallback` (phương án dự phòng) để yêu cầu trình duyệt sử dụng tập tin JPEG nếu định dạng WebP không được hỗ trợ.

[example preview="inline" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

## Tương tác giữa mã giữ chỗ và phương án dự phòng

Đối với các thành phần AMP phụ thuộc vào nội dung động (ví dụ như [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md)), việc tương tác giữa phương án dự phòng và mã giữ chỗ hoạt động như sau:

<ol>
  <li>Hiển thị mã giữ chỗ khi nội dung đang tải.</li>
  <li>Nếu nội dung được tải thành công, ẩn mã giữ chỗ và hiển thị nội dung.</li>
  <li>Nếu nội dung không thể được tải:     <ol>       <li>Nếu có một yếu tố phương án dự phòng, hiển thị phương án dự phòng.</li>       <li>Nếu không, tiếp tục hiển thị mã giữ chỗ.</li>     </ol>
</li>
</ol>

## Ẩn các chỉ báo tải

Rất nhiều yếu tố AMP được cho phép hiển thị một "chỉ báo tải", vốn là một hình hoạt họa cơ bản cho thấy rằng yếu tố này chưa được tải đầy đủ. Các yếu tố có thể bỏ hành vi này bằng cách thêm thuộc tính `noloading`.

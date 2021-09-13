---
'$title': Bao gồm ảnh & video
$order: 8
description: Cũng như một trang HTML thông thường, AMP cho phép bạn nhúng các ảnh, video và nội dung âm thanh. Tìm hiểu điểm khác biệt của AMP và học cách để...
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Cũng như một trang HTML thông thường, AMP cho phép bạn nhúng các **ảnh**, **video** và nội dung **âm thanh**. Tìm hiểu điểm khác biệt của AMP và học cách để bao gồm chúng trong các trang của bạn.

## Tại sao không sử dụng <code>&lt;img><66/code>, <code>&lt;video></code> và <code>&lt;audio></code>?

AMP không hỗ trợ việc sử dụng các thẻ HTML mặc định tương ứng để hiển thị nội dung đa phương tiện, ví dụ như `<img>`. Chúng tôi cung cấp các thành phần tương đương vì lý do sau:

- Chúng tôi cần hiểu bố cục của trang trước khi tải tài sản, vốn là thiết yếu để [hỗ trợ tải trước cho màn hiển thị đầu tiên](../../../../about/how-amp-works.html#size-all-resources-statically)
- Chúng tôi cần kiểm soát các yêu cầu mạng để [tải lười và ưu tiên tài nguyên một cách hiệu quả](../../../../about/how-amp-works.html#prioritize-resource-loading)

Thận trọng: Tuy không được hỗ trợ, nhưng chúng _vẫn sẽ được_ render; tuy nhiên, AMP sẽ không [xác thực cho các trang của bạn](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) và bạn sẽ không nhận được tất cả lợi ích mà AMP mang lại.

## Ảnh

Bao gồm một ảnh trong trang của bạn sử dụng yếu tố [`amp-img`](../../../../documentation/components/reference/amp-img.md), ví dụ như:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
</amp-img>
```

[/example]

Trong ví dụ cơ bản nhất này, ảnh sẽ hiển thị với chiều cao và chiều rộng cố định. Tối thiểu là một chiều rộng và chiều cao cụ thể phải được quy định.

#### Hiển thị ảnh khi JavaScript bị vô hiệu

Bởi [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) phụ thuộc vào JavaScript, nếu người dùng chọn vô hiệu kịch bản, các ảnh sẽ không được hiển thị. Trong trường hợp này, bạn cần cung cấp một phương án dự phòng cho ảnh sử dụng `<img>` và `<noscript>`, ví dụ như:

[example preview="inline" playground="true"]

```html
<amp-img
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
  <noscript>
    <img
      src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
      width="264"
      height="195"
    />
  </noscript>
</amp-img>
```

[/example]

### Bố cục nâng cao

AMP cho phép bạn tạo các trang tương thích hoàn toàn một cách dễ dàng hơn so với sử dụng CSS/HTML tiêu chuẩn. Ở dạng cơ bản nhất, tất cả những gì bạn cần làm là bổ sung `layout="responsive"`:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive"
>
</amp-img>
```

[/example]

[tip type="read-on"] **ĐỌC TIẾP –** Tìm hiểu thêm về các [kỹ thuật tạo bố cục nâng cao](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

### Hành vi và mã giữ chỗ

Thời gian chạy AMP HTML có thể quản lý hiệu quả các tài nguyên ảnh, chọn trì hoãn hay ưu tiên tải tài nguyên dựa trên vị trí màn hiển thị, tài nguyên hệ thống, băng thông kết nối hay các yếu tố khác.

[tip type="read-on"] **ĐỌC TIẾP –** Tìm hiểu cách để [cung cấp các phương án dự phòng và mã giữ chỗ cho ảnh](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

## Ảnh hoạt họa

Yếu tố [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) rất giống với yếu tố [`amp-img`](../../../../documentation/components/reference/amp-img.md) và cung cấp các chức năng bổ sung để quản lý việc tải và phát các ảnh hoạt họa như ảnh GIF.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
>
  <amp-img
    placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
  >
  </amp-img>
</amp-anim>
```

[/example]

[tip type="note"] **LƯU Ý –** Bao gồm `<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` trong phần head (đầu đề) của trang để sử dụng thành phần này. [/tip]

## Video

Bao gồm một video trong trang của bạn sử dụng yếu tố [`amp-video`](../../../../documentation/components/reference/amp-video.md).

Chỉ sử dụng yếu tố này để nhúng trực tiếp tập tin video HTML5. Yếu tố này tải tài nguyên video như được quy định bởi thuộc tính `src` theo nguyên tắc tải lười, tại thời điểm quy định bởi AMP.

Bao gồm một mã giữ chỗ trước khi video bắt đầu, cùng một phương án dự phòng nếu trình duyệt không hỗ trợ video HTML5, ví dụ:

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

## Âm thanh

Bao gồm tài nguyên âm thanh trong trang của bạn sử dụng yếu tố [`amp-audio`](../../../../documentation/components/reference/amp-audio.md).

Chỉ sử dụng yếu tố này để nhúng trực tiếp tập tin âm thanh HTML5. Cũng như mọi tài nguyên bên ngoài được nhúng vào một trang AMP, yếu tố này tải tài nguyên âm thanh như được quy định bởi thuộc tính `src` theo nguyên tắc tải lười, tại thời điểm quy định bởi AMP.

Bao gồm dự phòng, nếu trình duyệt không hỗ trợ âm thanh HTML5, ví dụ:

[example preview="inline" playground="true" imports="amp-audio:0.1"]

```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```

[/example]

[tip type="note"] **LƯU Ý –** Bao gồm `<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` trong phần head (đầu đề) của trang để sử dụng thành phần này. [/tip]

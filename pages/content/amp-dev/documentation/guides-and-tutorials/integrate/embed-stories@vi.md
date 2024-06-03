---
'$title': Nhúng các câu chuyện vào các trang web
$order: 3
description: Trình phát AMP Story
formats:
  - websites
  - stories
---

Câu chuyện là một trải nghiệm đắm chìm toàn màn hình. Chúng được lưu trữ trên web mở với URL của riêng mình, cho phép chúng có thể dễ dàng được chia sẻ. Nhưng nếu bạn muốn tích hợp các câu chuyện vào website của mình, chẳng hạn như trong một blog, mô tả sản phẩm hoặc bài viết tin tức?

Trình phát AMP Story cho phép bạn nhúng các câu chuyện mà người dùng có thể chạm hoặc nhấp qua vào trong một trang web. Làm theo hướng dẫn từng bước này để biết cách.

# Hiển thị các câu chuyện trong một trang không phải AMP

Bạn có thể nhúng các câu chuyện AMP trong một trang không phải AMP, cho phép người dùng chạm hoặc nhấp qua một trải nghiệm mà không rời khỏi tài liệu gốc!

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## Nhúng trình phát AMP Story

Việc hiển thị một AMP Story trong một trang không phải AMP đòi hỏi yếu tố [`amp-story-player`](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md).

### Nhập kịch bản

Bao gồm 2 kịch bản bắt buộc trong phần head (đầu đề) của tài liệu:

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link
  href="https://cdn.ampproject.org/amp-story-player-v0.css"
  rel="stylesheet"
  type="text/css"
/>
```

Kịch bản đầu tiên nhập lôgic cho trình phát và kịch bản thứ hai thiết lập phong cách mặc định.

### Quy định một câu chuyện

Bao gồm yếu tố `<amp-story-player>` bên trong `body` (thân) tài liệu. Sau đó quy định câu chuyện mong muốn bằng cách đặt một thẻ `<a>` bên trong yếu tố `<amp-story-player>`. Chỉ `href` đến vị trí của câu chuyện. `href` có thể chỉ đến URL của một câu chuyện được lưu trữ hoặc một đường dẫn tương đối. Đặt tiêu đề của câu chuyện trong thẻ `<a>`.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
  >
    Stories in AMP - Hello World
  </a>
</amp-story-player>
```

### Đổi kích cỡ trình phát

Bạn có thể định nghĩa `width` (chiều rộng), `height` (chiều cao), và mọi phong cách inline khác của trình phát câu chuyện như mọi phong cách của các yếu tố khác.

```html
<body>
  ...
  <amp-story-player style="width: 360px; height: 600px;">
    ...
  </amp-story-player>
  ...
</body>
```

We recommend maintaining a 3:5 aspect ratio for the best user experience, but you may define any width and height.

#### Đổi kích cỡ tương thích

Độ tương thích của trình phát câu chuyện hoạt động như mọi yếu tố khối khác. Sử dụng CSS để duy trì tỷ lệ chiều rộng và chiều cao, ví dụ như dưới đây:

```html
<amp-story-player style="width: 50vw; height: 83.35vw;"> ... </amp-story-player>
```

### Cung cấp một mã giữ chỗ

Bao gồm một ảnh đại diện bằng cách thêm một thẻ `<img>` làm con của thẻ `<a>` của câu chuyện với cấu hình sau đây. Trình phát AMP Story sẽ hiển thị ảnh này trong thời gian tải toàn bộ câu chuyện.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes this story.
  </a>
</amp-story-player>
```

Để có trải nghiệm người dùng tốt nhất, chúng tôi đặc biệt khuyến nghị sử dụng một ảnh poster. Nếu bạn không bao gồm một ảnh poster, trình phát câu chuyện sẽ hiển thị một con quay tải với nền xám.

## Nhúng nhiều câu chuyện

You may add multiple stories in the same `<amp-story-player>` element by defining multiple `<a>` tags. The player presents the second story’s cover page after user’s tap through the first.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

Bạn có thể nhúng bao nhiêu trường hợp `<amp-story-player>` tùy thích. Chúng sẽ được hiển thị như các trình xem khác nhau.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

# Hiển thị các câu chuyện trong một trang AMP

Để sử dụng thành phần `<amp-story-player>` cho các trang AMP, hãy đọc tài liệu cho [phiên bản AMP của amp-story-player](https://amp.dev/documentation/components/amp-story-player/?format=stories).

---
'$title': Các phần tử hoạt họa
$order: 6
description: Bạn có thể cải tiến thêm nữa Câu chuyện web bằng cách áp dụng chuyển động vào bằng hình hoạt họa cho các phần tử bên trong một trang. Ví dụ như bạn có thể làm tiêu đề bay vào từ...
components:
  - anim
author: bpaduch
---

Bạn có thể cải tiến thêm nữa Câu chuyện web bằng cách áp dụng chuyển động vào bằng hình hoạt họa cho các phần tử bên trong một trang. Ví dụ như bạn có thể làm tiêu đề bay vào từ bên trái, hoặc thả vào trang, hoặc mờ dần, v.v. Khung câu chuyện AMP cung ứng những hình hoạt họa thiết lập sẵn sau để dùng trong Câu chuyện web:

<table>
<thead><tr>
  <th width="50%">Hình hoạt họa thiết lập sẵn</th>
  <th width="25%">Thời lượng mặc định (mili giây)</th>
  <th width="25%">Độ trễ mặc định (mili giây)</th>
</tr></thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

Để áp dụng chuyển động vào của hình hoạt họa đối với một phần tử, bạn phải quy định <code>animate-in="<em data-md-type="raw_html"><animation data-md-type="raw_html" preset></animation></em>"</code> với một trong những giá trị của hình hoạt họa thiết lập sẵn. Ví dụ như để thả chữ vào trang, hãy thêm `animate-in="drop"` vào phần tử văn bản:

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"] Khám phá những hiệu ứng hoạt hình khác nhau bằng cách thêm thuộc tính `animate-in="<animation preset>"` vào các phần tử trên các trang câu chuyện. [/tip]

## Định thời gian cho hình hoạt họa

Mỗi hình hoạt họa thiết lập sẵn đều có giá trị thời gian mặc định tích hợp sẵn dành cho:

- **delay** (độ trễ): Đây là lượng thời gian trì hoãn việc khởi động hình hoạt họa. Ví dụ, độ trễ 0,3 giây nghĩa là hình hoạt họa đi vào trang sau 0,3 giây. Độ trễ 0 giây sẽ khởi động hình hoạt họa ngay lập tức.
- **duration** (thời lượng): Đây là lượng thời gian chạy hình hoạt họa. Ví dụ hình hoạt họa dạng mờ dần từ bắt đầu đến lúc kết thúc mất 500 mili giây.

Bạn có thể tùy chỉnh tác vụ định thời gian của một hình hoạt họa bằng cách thay đổi độ trễ hay thời lượng thông qua thuộc tính `animate-in-delay` và `animate-in-duration`. Trong ví dụ sau, `my-element` bay vào từ bên trái trang sau 0,3 giây và hoàn thành việc bay vào trong vòng 0,5 giây:

```html
<amp-story-page id="my-page">
  ...
  <p
    class="my-element"
    animate-in="fly-in-left"
    animate-in-delay="0.3s"
    animate-in-duration="0.5s"
  >
    I'm going to fly into the page from the left!
  </p>
</amp-story-page>
```

## Tạo hình hoạt họa cho trang cuối cùng

Trang cuối của Câu chuyện web gồm hai lớp: lớp đầu tiên là bức tranh ghép các hình ảnh loài vật và lớp thứ nhì hiển thị dòng chữ băng rôn nào đó. Để tạo trang này, **thêm** đoạn mã sau ngay sau trang câu chuyện trước đó:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img
        src="assets/cat.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/dog.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/bird.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/rabbit.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

Tải lại câu chuyện AMP trong trình duyệt, và xác minh trang đó render chính xác và trông như thế này:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

Trông tuyệt đó nhưng mọi thứ đang ở trạng thái tĩnh! Ta hãy làm nó chuyển động!

Ta sẽ bắt đầu bằng cách tạo hình động cho chuyển động vào của dòng chữ băng rôn và để nó "bay vèo vào" từ bên phải của trang. Thêm `animate-in="whoosh-in-right"` vào phần tử `<p>` giống thế này:

```html
<p class="banner-text" animate-in="whoosh-in-right">
  Pets can lower your stress levels!
</p>
```

Tải lại trang câu chuyện trong trình duyệt, và xác minh rằng băng rôn bay vèo vào.

Tiếp theo, hãy làm cho tất cả các hình ảnh mờ dần. Thêm `animate-in="fade-in"` vào từng phần tử [`amp-img`](../../../../documentation/components/reference/amp-img.md) để mã trông giống như sau:

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
```

Nếu bạn làm mới và tải lại trang, mỗi hình ảnh sẽ mờ đi. Điều đó thật tuyệt nhưng bạn hầu như không thể nhận thấy hiệu ứng vì tất cả các hình ảnh đều mờ đi cùng lúc! Chúng ta có thể cải thiện hiệu ứng hình ảnh bằng cách thay đổi thời gian của những hình hoạt họa này.

Hãy tạo độ trễ cho chuyển động vào của hình ảnh đầu tiên để nó đến gần khi băng rôn chữ đi vào xong, chẳng hạn 0,4 giây. Ba hình ảnh còn lại có thể xuất hiện 0,2 giây sau chuyển động vào của hình ảnh trước. Đối với mỗi phần tử [`amp-img`](../../../../documentation/components/reference/amp-img.md), hãy thêm `animate-in-delay=""` với giá trị thời gian trễ thích hợp. Mã của bạn sẽ giống như sau:

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.4s"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.6s"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay=".8s"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="1s"
>
</amp-img>
```

Làm mới và tải lại câu chuyện của bạn. Trang cuối cùng của bạn sẽ trông như thế này:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

Có rất nhiều khả năng làm việc với hình hoạt họa trong Câu chuyện web (ví dụ: kết hợp nhiều hình hoạt họa, tạo chuỗi hình hoạt họa) và hướng dẫn này chỉ nêu sơ lược trên bề mặt thôi. Để tìm hiểu thêm về hình hoạt họa, hãy xem tài liệu tham khảo [`amp-story`](../../../../documentation/components/reference/amp-story.md) .

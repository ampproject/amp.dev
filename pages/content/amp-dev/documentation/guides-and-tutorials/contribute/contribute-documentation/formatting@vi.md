---
'$title': Hướng dẫn & thực hành định dạng
$order: 3
description: Yêu cầu định dạng tập tin cho amp.dev
formats:
  - websites
  - stories
  - ads
  - email
author: CrystalOnScript
---

Các hướng dẫn và thực hành được gửi trong [Markdown](https://www.markdownguide.org/), với một front matter bổ sung và định dạng mã ngắn.

## Địa chỉ tài liệu

Nội dung trên amp.dev được kéo từ hai kho lưu trữ, [amp.dev](https://github.com/ampproject/amp.dev) và [AMPHTML](https://github.com/ampproject/amphtml). Mọi tài liệu tham khảo trong các thành phần đều được kéo từ AMPHTML, từ các thành phần tích hợp hoặc mở rộng.

- [Thành phần tích hợp ](https://github.com/ampproject/amphtml/tree/main/src/builtins)
- [Thành phần](https://github.com/ampproject/amphtml/tree/main/extensions)
- [Khóa học](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses)
- [Ví dụ](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
- [Hướng dẫn & thực hành](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

Có một vài loại tài liệu khác được nhập vào amp.dev từ AMPHTML. Chúng được [liệt kê trong tập tin này](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json). Không cập nhật các tài liệu này trong kho lưu trữ amp.dev – các thay đổi của bạn sẽ bị ghi đè trên các lần dựng sau đó!

## Front matter

Front matter được hiển thị ở đầu mỗi bài hướng dẫn và thực hành.

Ví dụ:

```yaml
$title: Include Custom JavaScript in AMP Pages
$order: 7
formats:
  - websites
author: CrystalOnScript
contributors:
  - fstanis
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.
```

<table>
  <tr>
   <td>
    <code>$title</code>
   </td>
   <td>Tiêu đề của tài liệu của bạn như được hiển thị trong phần mục lục. Viết hoa chữ đầu tiên của từ đầu tiên, ngoại trừ “AMP” và các danh từ riêng khác. Sử dụng ký tự `&` thay cho từ `and` (và).</td>
  </tr>
  <tr>
   <td>
    <code>$order</code>
   </td>
   <td>Quy định vị trí của tài liệu của bạn trong phần mục lục. Bạn có thể cần sửa `$order` trong các tài liệu khác để đảm bảo nó được hiển thị ở đúng vị trí.</td>
  </tr>
  <tr>
   <td>
    <code>formats</code>
   </td>
   <td>Liệt kê các trải nghiệm AMP liên quan đến tài liệu của bạn. Nếu tài liệu của bạn liên quan đến các website AMP và câu chuyện AMP, nhưng không phải là quảng cáo AMP hoặc email AMP, front matter của bạn sẽ trông như thế này: ```yaml formats: - websites - stories ```</td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>Tác giả là bạn! Sử dụng tên người dùng GitHub của bạn.</td>
  </tr>
  <tr>
   <td>
<code>contributors</code>
   </td>
   <td>Liệt kê bất cứ ai đã đóng góp vào tài liệu của bạn. Trường này không bắt buộc.</td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>Viết một mô tả ngắn về bài hướng dẫn hoặc thực hành của bạn. Việc này sẽ giúp tối ưu công cụ tìm kiếm, và đưa bài viết của bạn đến với những người cần nó!</td>
  </tr>
  <tr>
   <td>
<code>tutorial</code>
   </td>
   <td>Thêm `tutorial: true` vào front matter cho website để thêm biểu tượng thực hành vào cạnh nó. Các bài thực hành được đặt ở cuối phần của chúng trong mục lục.</td>
  </tr>
</table>

# Mã ngắn

Để xem danh sách các mã ngắn và ứng dụng của chúng, hãy đọc [documentation.md trên GitHub](https://github.com/ampproject/amp.dev/blob/future/contributing/documentation.md#shortcodes).

## Ảnh

amp.dev được xây dựng với AMP! Do đó, các ảnh của chúng tôi phải phù hợp với tiêu chí [`amp-img`](../../../../documentation/components/reference/amp-img.md). Quy trình xây dựng sử dụng cú pháp sau để chuyển đổi ảnh sang định dạng `amp-img` chuẩn.

<div class="ap-m-code-snippet"><pre>{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app') }}</pre></div>

## Lọc các phần

Một số tài liệu có thể liên quan cho nhiều định dạng AMP, nhưng một số định dạng có thể cần được giải thích thêm hoặc chứa những thông tin không liên quan đến các định dạng khác. Bạn có thể lọc các phần này bằng cách gói chúng trong mã ngắn sau.

<div class="ap-m-code-snippet"><pre>&amp;lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="websites, email"]
This is visible for [websites](?format=websites) &amp; [email](?format=email).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="stories"]
This is visible for [stories](?format=stories).
&amp;lsqb;/filter]</pre></div>

## Mẹo

Bạn có thể thêm mẹo và chú ý bằng cách gói văn bản trong mã ngắn sau:

<div class="ap-m-code-snippet"><pre>&amp;lsqb;tip type="default"]
Default tip
[/tip]

&amp;lsqb;tip type="important"]
Important
[/tip]

&amp;lsqb;tip type="note"]
Note
[/tip]

&amp;lsqb;tip type="read-on"]
Read-on
[/tip]</pre></div>

## Trích đoạn code

Đặt trích đoạn code trong nhóm 3 dấu huyền (backtick), quy định ngôn ngữ ở cuối nhóm dấu huyền đầu tiên.

<div class="ap-m-code-snippet"><pre>```html
  // code sample
```

```css
// code sample
```

````js
  // code sample
```</pre></div>

Nếu mã của bạn chứa 2 ngoặc nhọn, thường là khi bạn sử dụng khuôn mẫu [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites), bạn phải gói phần chứa code:

<div class="ap-m-code-snippet"><pre>```html<br>{% raw	%}<br>  // code with double curly braces<br>{% endraw	%}<br>```</pre></div>

### Trích đoạn mã trong danh sách

Python-Markdown có một số giới hạn. Sử dụng cú pháp sau khi bao gồm các trích đoạn code trong danh sách:

<div class="ap-m-code-snippet"><pre>&lsqb;sourcecode:html]
      <html>
        <p>Indented content.</p>
      </html>
    &lsqb;/sourcecode]</pre></div>

## Xem trước code mẫu

Code mẫu có thể có một bản xem trước và/hoặc liên kết đến một phiên bản [Sân thực hành AMP](https://playground.amp.dev/).

<div class="ap-m-code-snippet">
  <pre>&lsqb;example preview="default: none|inline|top-frame"
          playground="default: true|false"
          imports="<custom-element-1>,<custom-element-2>,..."
          template="<custom-template>"]
  ```html
    // code sample
````

&lsqb;/example]</pre>

</div>

Lưu ý: Bản xem trước sẽ tự động được chuyển đổi thành định dạng hiện tại khi mở nó trong sân thực hành 🤯!

Sử dụng thuộc tính `preview` để quy định cách tạo bản xem trước này:

- **none**: Không có bản xem trước nào được tạo

- **inline**: Bản xem trước sẽ được hiển thị bên trên mã nguồn. Một bản xem trước inline chỉ khả dĩ cho các ví dụ website thông thường nếu code này không chứa bất kỳ yếu tố `head` nào. Sử dụng tùy chọn này cho các ví dụ nhỏ không cần tạo phong cách hoặc các yếu tố `head` khác (không tính dữ liệu trích nhập, bởi chúng được quy định qua thuộc tính `imports`).

- **top-frame**: Bản xem trước sẽ được hiển thị bên trên mã nguồn trong một iframe. Hướng có thể được chuyển đổi giữa chế độ `portrait` (dọc) và `landscape`(ngang). Bạn có thể chọn sẵn hướng bằng cách quy định thuộc tính bổ sung:

- **orientation**: `default: landscape|portrait`

Nếu cần yếu tố tùy chỉnh, quy định chúng trong thuộc tính `imports` dưới dạng một danh sách phân tách bởi dấu phẩy, với tên của thành phần theo sau bởi một dấu hai chấm và phiên bản. Nếu mã của bạn sử dụng [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites), hãy quy định yếu tố phụ thuộc trong thuộc tính `template`.

Đối với nội dung email chứa liên kết tài nguyên, hãy sử dụng mã giữ chỗ <code>{{server_for_email}}</code> trong mã nguồn.

### Ví dụ Inline

Đây là một ví dụ đơn giản về code inline nhúng. Bạn có thể quy định CSS thông qua phong cách inline:

<div class="ap-m-code-snippet"><pre>[example preview="inline" playground="true"]
    ```html
    <div style="background: red; width: 200px; height: 200px;">Hello World</div>
    ```
  [/example]</pre></div>

Nó trông như thế này:

[example preview="inline" playground="true"]

```html
<div style="background: red; width: 200px; height: 200px;">Hello World</div>
```

[/example]

Cảnh báo: ví dụ inline được nhúng trực tiếp vào trang. Điều này có thể gây xung đột nếu các thành phần đã được sử dụng trên trang này rồi (ví dụ `amp-consent`).

### Xem trước Top-Frame

Sử dụng xem trước top-frame mỗi khi bạn cần quy định các yếu tố đầu mục hoặc quy định phong cách toàn cục trong `<style amp-custom>`.

Quan trọng: Không thêm bất kỳ đoạn code soạn sẵn AMP nào vào phần đầu mục bởi nó sẽ được thêm tự động tùy vào định dạng AMP. Chỉ thêm các yếu tố mà code mẫu cần vào đầu mục!

<div class="ap-m-code-snippet"><pre>
  &#91;example preview="top-frame"
         playground="true"]
    ```html
    &lt;head&gt;
      &lt;script async custom-element=&quot;amp-youtube&quot; src=&quot;https://ampjs.org/v0/amp-youtube-0.1.js&quot;&gt;&lt;/script&gt;
      &lt;style amp-custom&gt;
        body {
          background: red;
        }
      &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
      &lt;h1&gt;Hello AMP&lt;/h1&gt;
      &lt;amp-youtube width=&quot;480&quot;
        height=&quot;270&quot;
        layout=&quot;responsive&quot;
        data-videoid=&quot;lBTCB7yLs8Y&quot;&gt;
      &lt;/amp-youtube&gt;
    &lt;/body&gt;
    ```
  [/example]</pre></div>

Nó trông như thế này:

[example preview="top-frame"
playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-youtube"
    src="https://ampjs.org/v0/amp-youtube-0.1.js"
  ></script>
  <style amp-custom>
    body {
      background: red;
    }
  </style>
</head>
<body>
  <h1>Hello AMP</h1>
  <amp-youtube
    width="480"
    height="270"
    layout="responsive"
    data-videoid="lBTCB7yLs8Y"
  >
  </amp-youtube>
</body>
```

[/example]

### Câu chuyện AMP

Sử dụng `preview="top-frame"` cùng với `orientation="portrait"` để xem trước các Câu chuyện AMP.

<div class="ap-m-code-snippet"><pre>
  &#91;example preview="top-frame"
         orientation="portrait"
         playground="true"]
    ```html
    &lt;head&gt;
      &lt;script async custom-element=&quot;amp-story&quot;
          src=&quot;https://ampjs.org/v0/amp-story-1.0.js&quot;&gt;&lt;/script&gt;
      &lt;style amp-custom&gt;
        body {
          font-family: 'Roboto', sans-serif;
        }
        amp-story-page {
          background: white;
        }
      &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
      &lt;amp-story standalone&gt;
        &lt;amp-story-page id=&quot;cover&quot;&gt;
          &lt;amp-story-grid-layer template=&quot;vertical&quot;&gt;
            &lt;h1&gt;Hello World&lt;/h1&gt;
            &lt;p&gt;This is the cover page of this story.&lt;/p&gt;
          &lt;/amp-story-grid-layer&gt;
        &lt;/amp-story-page&gt;
        &lt;amp-story-page id=&quot;page-1&quot;&gt;
          &lt;amp-story-grid-layer template=&quot;vertical&quot;&gt;
            &lt;h1&gt;First Page&lt;/h1&gt;
            &lt;p&gt;This is the first page of this story.&lt;/p&gt;
          &lt;/amp-story-grid-layer&gt;
        &lt;/amp-story-page&gt;
      &lt;/amp-story&gt;
    &lt;/body&gt;
    ```
  [/example]</pre></div>

Nó trông như thế này:

[example preview="top-frame"
orientation="portrait"
playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-story"
    src="https://ampjs.org/v0/amp-story-1.0.js"
  ></script>
  <style amp-custom>
    body {
      font-family: 'Roboto', sans-serif;
    }
    amp-story-page {
      background: white;
    }
  </style>
</head>
<body>
  <amp-story standalone>
    <amp-story-page id="cover">
      <amp-story-grid-layer template="vertical">
        <h1>Hello World</h1>
        <p>This is the cover page of this story.</p>
      </amp-story-grid-layer>
    </amp-story-page>
    <amp-story-page id="page-1">
      <amp-story-grid-layer template="vertical">
        <h1>First Page</h1>
        <p>This is the first page of this story.</p>
      </amp-story-grid-layer>
    </amp-story-page>
  </amp-story>
</body>
```

[/example]

### URL tuyệt đối cho Email AMP

Lưu ý cách chúng tôi sử dụng <code>{{server_for_email}}</code> để quy định URL điểm cuối tuyệt đối nếu code được nhúng trong một email AMP.

<div class="ap-m-code-snippet"><pre>[example preview="top-frame" playground="true"]
    ```html
    <div class="resp-img">
      <amp-img alt="flowers"
        src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
        layout="responsive"
        width="640"
        height="427"></amp-img>
    </div>
    ```
  [/example]</pre></div>

Nó trông như thế này:

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

### Thoát khuôn mẫu mustache

Đây là một ví dụ `top-frame` sử dụng một điểm cuối từ xa. Khuôn mẫu mustache cần được thoát trong các ví dụ sử dụng <code>{% raw %}</code> và <code>{% endraw %}</code>:

<div class="ap-m-code-snippet">
  <pre>[example preview="top-frame"
        playground="true"
        imports="amp-list:0.1"
        template="amp-mustache:0.2"]
    ```html
    <amp-list width="auto" height="100" layout="fixed-height"
      src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
      <template type="amp-mustache">{% raw %}
        <div class="url-entry">
          <a href="{{url}}">{{title}}</a>
        </div>
      {% endraw %}
      </template>
    </amp-list>
    ```
[/example]</pre>
</div>

Nó trông như thế này:

[example preview="top-frame"
playground="true"
imports="amp-list:0.1"
template="amp-mustache:0.2"]

```html
<amp-list
  width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json"
>
  <template type="amp-mustache"
    >{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
    {% endraw %}
  </template>
</amp-list>
```

[/example]

## Liên kết

Bạn có thể liên kết đến các trang khác với cú pháp liên kết markdown tiêu chuẩn:

```md
[link](../../../courses/beginning-course/index.md)
```

Khi liên kết đến một trang khác trên amp.dev, tham chiếu sẽ là một đường dẫn tập tin tương đối đến tập tin mục tiêu.

### Anchor

Liên kết đến các phần cụ thể trong một tài liệu sử dụng các anchor:

```md
[link to example section](#example-section)
```

Vui lòng tạo mục tiêu anchor bằng `<a name="#anchor-name></a>` trước khi liên kết đến một phần không có anchor. Một vị trí tốt là ở cuối đầu mục phần:

```html
## Example section <a name="example-section"></a>
```

Bạn chỉ được sử dụng chữ cái, số, dấu gạch ngang và gạch dưới trong một anchor. Vui lòng sử dụng tên anchor ngắn bằng tiếng Anh, phù hợp với đầu mục hoặc mô tả phần. Đảm bảo tên anchor là duy nhất trong tài liệu.

Khi một Trang được dịch, tên anchor phải không được thay đổi và giữ nguyên bằng tiếng Anh.

Khi bạn tạo một anchor mà sẽ được sử dụng trong một liên kết từ một trang khác, bạn cũng nên tạo anchor đó trong tất cả các bản dịch.

### Bộ lọc định dạng AMP

Tài liệu thành phần, hướng dẫn và thực hành cùng các ví dụ có thể được lọc theo định dạng AMP, ví dụ như website AMP hoặc câu chuyện AMP. Khi liên kết đến một trang như vậy, bạn cần quy định rõ một định dạng được hỗ trợ bởi mục tiêu, bằng cách chèn tham số định dạng vào liên kết:

```md
[link](../../learn/amp-actions-and-events.md?format=websites)
```

Chỉ khi bạn chắc chắn rằng mục tiêu hỗ trợ **tất cả** các định dạng mà trang của bạn hỗ trợ thì bạn mới có thể bỏ tham số này.

### Tham khảo cho thành phần

Một liên kết đến tài liệu tham khảo cho thành phần sẽ tự động chỉ đến phiên bản mới nhất nếu liên kết của bạn không chứa thông tin phiên bản. Khi bạn muốn chỉ đến một phiên bản cụ thể, hãy nhập tên đầy đủ:

```md
[latest version](../../../components/reference/amp-carousel.md?format=websites)
[explicit version](../../../components/reference/amp-carousel-v0.2.md?format=websites)
```

## Cấu trúc Tài liệu

### Tiêu đề, đầu mục và tiểu mục

Chữ cái đầu tiên của từ đầu tiên trong tiêu đề, đầu mục và tiểu mục được viết hoa, những chữ sau được viết thường. Ngoại lệ bao gồm AMP và các danh từ riêng. Không có đầu mục nào được đặt tên là `Introduction` (Giới thiệu), phần giới thiệu phải ở sau tiêu đề tài liệu.

### Đặt tên cho tài liệu

Đặt tên tài liệu theo quy ước về dấu gạch ngang.

<table>
  <tr>
   <td>
<strong>Nên</strong>
   </td>
   <td>
<strong>Không nên</strong>
   </td>
  </tr>
  <tr>
   <td>hello-world-tutorial.md</td>
   <td>hello_world_tutorial.md</td>
  </tr>
  <tr>
   <td>website-fundamentals.md</td>
   <td>websiteFundamentals.md</td>
  </tr>
  <tr>
   <td>actions-and-events.md</td>
   <td>actionsandevents.md</td>
  </tr>
</table>

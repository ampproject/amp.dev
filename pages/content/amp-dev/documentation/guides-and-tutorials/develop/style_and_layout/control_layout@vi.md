---
'$title': Bố cục & truy vấn đa phương tiện
$order: 1
description: 'AMP hỗ trợ cả 2 loại truy vấn đa phương tiện & truy vấn yếu tố, cùng với một phương thức tích hợp sẵn mạnh mẽ để kiểm soát bố cục của các yếu tố riêng lẻ. Thuộc tính layout (bố cục) cho phép làm việc và...'
formats:
  - websites
  - email
  - ads
  - stories
author: Meggin
contributors:
  - pbakaus
---

AMP hỗ trợ cả 2 loại **truy vấn đa phương tiện** & **truy vấn yếu tố**, cùng với một phương thức tích hợp sẵn mạnh mẽ để kiểm soát **bố cục** của các yếu tố riêng lẻ. Thuộc tính `layout` (bố cục) cho phép làm việc và tạo các thiết kế hoàn toàn tương thích một cách dễ dàng hơn rất nhiều so với chỉ sử dụng CSS.

## Dễ dàng tạo ảnh tương thích

Tạo các ảnh tương thích bằng cách quy định `width` và `height`, đặt bố cục là `responsive` (tương thích), và chỉ báo với [`srcset`](art_direction.md) rằng tài sản ảnh nào sẽ được sử dụng dựa trên các kích cỡ màn hình khác nhau:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Yếu tố [`amp-img`](../../../../documentation/components/reference/amp-img.md) này sẽ tự động vừa với chiều rộng của yếu tố container của nó, và chiều cao của nó được thiết lập tự động theo tỷ lệ khung hình được xác định bởi chiều rộng và chiều cao đã cho. Hãy thử ngay bằng cách đổi kích cỡ cửa sổ trình duyệt này:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

[tip type="tip"] **TIP –** See our side-by-side live demos of [`amp-img`](../../../../documentation/components/reference/amp-img.md): [Live Demos on AMP By Example](../../../../documentation/examples/documentation/amp-img.html?format=websites). [/tip]

## Thuộc tính layout (bố cục) <a name="the-layout-attribute"></a>

Thuộc tính `layout` (bố cục) cho phép bạn kiểm soát dễ dàng, chi tiết cách render yếu tố trên màn hình. Rất nhiều thao tác trong số này cũng có thể được thực hiện chỉ với CSS – nhưng chúng sẽ khó hơn rất nhiều và cần nhiều thủ thuật. Thay vào đó, hãy sử dụng thuộc tính `layout` (bố cục).

### Các giá trị được hỗ trợ cho thuộc tính `layout` (bố cục)

Các giá trị sau có thể được sử dụng trong thuộc tính `layout` (bố cục):

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">Loại bố cục</th>
      <th data-th="Width/height required" class="col-twenty">Chiều rộng/<br>cần chiều cao</th>
      <th data-th="Behavior">Hành vi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">Không</td>
      <td data-th="Behavior">Yếu tố không được hiển thị. Bố cục này có thể được áp dụng cho mọi yếu tố AMP. Thành phần này không chiếm diện tích trên màn hình bởi nó không có phong cách hiển thị. Yếu tố này có thể được hiển thị tùy theo hành động của người dùng, ví dụ như, <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">Có</td>
      <td data-th="Behavior">Yếu tố này có một chiều rộng và chiều cao cố định, và không hỗ trợ tương thích. Các ngoại lệ duy nhất là các yếu tố <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> và <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">Có</td>
      <td data-th="Behavior">Yếu tố được đổi kích cỡ theo chiều rộng của yếu tố container và tự đổi chiều cao của nó theo tỷ lệ khung hình được xác định bởi thuộc tính chiều rộng và chiều cao. Bố cục này hoạt động tốt cho hầu hết các yếu tố AMP, bao gồm <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>, <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. Không gian có sẵn phụ thuộc vào yếu tố cha và cũng có thể được tùy chỉnh sử dụng CSS <code>max-width</code>.<p><strong>LƯU Ý</strong>: Các yếu tố có <code>"layout=responsive"</code> không có kích cỡ thực chất. Kích cỡ của yếu tố này được xác định bởi yếu tố container của nó. Để đảm bảo yếu tố AMP của bạn được hiển thị, bạn phải quy định một chiều rộng và chiều cao cho yếu tố chứa nó. Không quy định  <code>"display:table"</code> trên yếu tố chứa nó bởi điều này sẽ ghi đè việc hiển thị yếu tố AMP, khiến yếu tố AMP bị vô hình.</p>
</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">Chỉ chiều cao</td>
      <td data-th="Behavior">Yếu tố sẽ chiếm diện tích dành cho nó nhưng không thay đổi chiều cao. Bố cục này hoạt động tốt cho các yếu tố như <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> liên quan đến nội dung được đặt ngang. Thuộc tính <code>width</code> (chiều rộng) phải không được quy định hoặc bằng <code>auto</code> (tự động).</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">Không</td>
      <td data-th="Behavior">Yếu tố sẽ chiếm diện tích dành cho nó, cả chiều rộng lẫn chiều cao. Nói cách khác, bố cục của một yếu tố fill (lấp đầy) sẽ khớp với cha của nó. Để một yếu tố có thể lấp đầy container cha của nó, hãy đảm bảo container cha quy định `position:relative` (vị trí:tương đối) hoặc `position:absolute` (vị trí:tuyệt đối).</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">Không</td>
      <td data-th="Behavior">Yếu tố cho phép con của nó tự quy định kích cỡ, như một thẻ <code>div</code> HTML thông thường. Thành phần này được giả sử là không có một bố cục cụ thể, mà hoạt động như một container. Các con của nó sẽ được render ngay lập tức.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">Không</td>
      <td data-th="Behavior">Yếu tố và các yếu tố khác trong cha của nó sẽ chiếm diện tích còn lại của container cha khi cha là một container linh hoạt (nghĩa là, <code>display:flex</code> (hiển thị:linh hoạt)). Kích cỡ của yếu tố được xác định bởi yếu tố cha và số yếu tố khác bên trong cha theo bố cục CSS <code>display:flex</code> (hiển thị:linh hoạt).</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>intrinsic</code></td>
      <td data-th="Description">Có</td>
      <td data-th="Behavior">Yếu tố này chiếm dịch tích dành cho nó và tự động đổi kích cỡ chiều cao của nó theo tỷ lệ khung hình được quy định bởi thuộc tính <code>width</code> (chiều rộng) và <code>height</code> (chiều cao) <em>cho đến khi</em> nó đạt kích cỡ tự nhiên của yếu tố hoặc đạt một giới hạn CSS (ví dụ như max-width). Các thuộc tính width (chiều rộng) và height (chiều cao) phải được quy định. Bố cục này hoạt động tốt cho hầu hết các yếu tố AMP, bao gồm <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>, <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>, v.v. Không gian có sẵn phụ thuộc vào yếu tố cha và cũng có thể được tùy chỉnh sử dụng CSS <code>max-width</code>. Bố cục này khác với bố cục <code>responsive</code> (tương thích) bởi nó có một chiều cao và chiều rộng thực chất. Điều này được thể hiện rõ nhất trong một yếu tố nổi mà ở đó bố cục <code>responsive</code> (tương thích) sẽ render 0x0 và một bố cục  <code>intrinsic</code> (thực chất) sẽ tăng lên đến ngưỡng nhỏ hơn của kích cỡ tự nhiên của nó hay bất kỳ hạn chế CSS nào.</td>
    </tr>
  </tbody>
</table>

[tip type="tip"] **MẸO –** Truy cập trang [Minh họa cho bố cục AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html) để xem cách các bố cục khác nhau phản ứng với việc thay đổi kích cỡ màn hình. [/tip]

### Điều gì xảy ra nếu chiều rộng và chiều cao không được định nghĩa? <a name="what-if-width-and-height-are-undefined"></a>

Trong một số trường hợp, nếu `width` (chiều rộng) hoặc `height` (chiều cao) không được quy định, thời gian chạy AMP có thể gán mặc định cho các giá trị này như sau:

- [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): Cả chiều rộng và chiều cao sẽ được đặt mặc định là 0.
- [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): Chiều rộng và chiều cao mặc định được suy luận từ trình duyệt.

### Điều gì xảy ra nếu thuộc tính <code>layout</code> (bố cục) không được quy định? <a name="what-if-the-layout-attribute-isnt-specified"></a>

Nếu thuộc tính <code>layout</code> (bố cục) không được quy định, AMP sẽ cố suy luận hoặc phỏng đoán giá trị phù hợp:

<table>
  <thead>
    <tr>
      <th data-th="Rule">Quy định</th>
      <th data-th="Inferred layout" class="col-thirty">Bố cục suy luận</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule">
<code>height</code> (chiều cao) được quy định và <code>width</code> (chiều rộng) bị thiếu hoặc bằng <code>auto</code> (tự động)</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Các thuộc tính <code>width</code> (chiều rộng) hoặc <code>height</code> (chiều cao) được quy định cùng với thuộc tính <code>sizes</code> (kích cỡ)</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Cả hai thuộc tính <code>width</code> (chiều rộng) và <code>height</code> (chiều cao) đều được quy định</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule">
<code>width</code> (chiều rộng) và <code>height</code> (chiều cao) không được quy định</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## Sử dụng các truy vấn đa phương tiện

### Truy vấn đa phương tiện CSS

Sử dụng [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) để kiểm soát ngoại hình và hành vi của bố cục trang, cũng như cách bạn làm trên các website khác. Khi cửa sổ trình duyệt thay đổi kích cỡ hoặc hướng, các truy vấn đa phương tiện sẽ được tái đánh giá và các yếu tố được ẩn và hiển thị dựa trên kết quả mới.

[tip type="read-on"] **ĐỌC TIẾP –** Tìm hiểu thêm về việc kiểm soát bố cục bằng cách áp dụng các truy vấn đa phương tiện trong [Sử dụng các truy vấn đa phương tiện CSS để đảm bảo tương thích](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en). [/tip]

### Truy vấn đa phương tiện yếu tố <a name="element-media-queries"></a>

Một tính năng mới cho thiết kế tương thích trong AMP là thuộc tính `media` (đa phương tiện). Thuộc tính này có thể được sử dụng trên mọi yếu tố AMP; nó hoạt động tương tự như truy vấn đa phương tiện trong stylesheet toàn cục của bạn, nhưng chỉ ảnh hưởng đến yếu tố cụ thể trên một trang duy nhất.

Ví dụ, ở đây chúng ta có 2 ảnh với các truy vấn đa phương tiện loại trừ lẫn nhau.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="527"
    height="355"
    layout="responsive">
</amp-img>
[/sourcecode]

Tùy thuộc vào chiều rộng màn hình, một trong hai truy vấn sẽ được truy xuất và render.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="466"
    height="193"
    layout="responsive">
</amp-img>
[/sourcecode]

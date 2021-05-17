---
'$title': Hệ thống Bố cục AMPHTML
$order: 1
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: 'Tổng quan '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

## Tổng quan

Mục đích chính của hệ thống bố cục là đảm bảo các yếu tố AMP có thể diễn đạt bố cục của chúng để thời gian chạy có thể suy diễn kích thước của các yếu tố trước khi các tài nguyên từ xa như JavaScript và cuộc gọi dữ liệu được hoàn tất. Điều này quan trọng bởi nó giúp giảm đáng kể thời gian render và tình trạng giật khi cuộn.

Xét đến điều này, Hệ thống Bố cục AMP được thiết kế để hỗ trợ một số ít bố cục linh hoạt giúp đảm bảo hiệu năng tốt. Hệ thống này phụ thuộc vào một nhóm các thuộc tính như `layout` (bố cục), `width` (chiều rộng), `height` (chiều cao), `sizes` (kích thước) và `heights` (chiều cao) để diễn đạt nhu cầu về bố cục và kích thước của yếu tố.

## Hành vi <a name="behavior"></a>

Một yếu tố AMP ngoài container (ví dụ, `layout != container`) sẽ khởi động trong chế độ chưa diễn giải/chưa xây dựng trong đó tất cả các con của nó đều bị ẩn ngoại trừ một mã giữ chỗ (xem thuộc tính `placeholder` (mã giữ chỗ)). JavaScript và trọng tải dữ liệu cần để xây dựng toàn bộ yếu tố vẫn có thể đang tải về và khởi động, nhưng thời gian chạy AMP đã biết làm thế nào để chia kích thước và bố cục cho yếu tố mà chỉ dựa vào các lớp CSS và các thuộc tính `layout` (bố cục), `width` (chiều rộng), `height` (chiều cao) và `media` (đa phương tiện). Trong hầu hết các trường hợp, một `placeholder` (mã giữ chỗ), nếu được quy định, sẽ được đổi kích thước và vị trí để tận dụng toàn bộ không gian của yếu tố.

`Placeholder` (mã giữ chỗ) sẽ được ẩn ngay khi yếu tố được xây dựng và bố cục đầu tiên của nó hoàn tất. Ở thời điểm này, yếu tố này được kỳ vọng là đã xây dựng và định vị các con của nó đúng cách để sẵn sàng được hiển thị và chấp nhận đầu vào của một độc giả. Đây là hành vi mặc định. Mỗi yếu tố có thể ghi đè lên, ví dụ như, ẩn `placeholder` (mã giữ chỗ) nhanh hơn hoặc giữ nó lâu hơn.

Yếu tố này được đổi kích thước và hiển thị dựa trên các thuộc tính `layout` (bố cục), `width` (chiều rộng), `height` (chiều cao) và `media` (đa phương tiện) theo thời gian chạy. Tất cả các quy tắc bố cục đều được triển khai thông qua CSS nội bộ. Yếu tố này được cho là "định nghĩa kích thước" nếu kích thước của nó có thể được suy diễn từ phong cách CSS và không thay đổi dựa trên các con của nó: khả dụng ngay lập tức hoặc được chèn động. Điều này không có nghĩa kích thước của yếu tố này không thể được thay đổi. Bố cục có thể được tương thích hoàn toàn như với các bố cục `responsive` (tương thích), `fixed-height` (chiều cao cố định), `fill` (lấp đầy) và `flex-item` (linh hoạt). Nó chỉ có nghĩa là kích thước không thay đổi nếu không được người dùng tương tác rõ ràng, ví dụ như trong quá trình render hoặc cuộn, hoặc sau khi tải về.

Nếu yếu tố được cấu hình sai cách, nó sẽ hoàn toàn không được render trong PROD, và trong chế độ DEV, thời gian chạy sẽ render yếu tố này trong trạng thái lỗi. Các lỗi tiềm năng bao gồm giá trị không hợp lệ hoặc không được hỗ trợ của các thuộc tính `layout` (bố cục), `width` (chiều rộng) và `height` (chiều cao).

## Thuộc tính Bố cục <a name="layout-attributes"></a>

### `width` và `height` <a name="width-and-height"></a>

Tùy thuộc vào giá trị của thuộc tính `layout` (bố cục), các yếu tố thành phần AMP phải có một thuộc tính `width` (chiều rộng) và `height` (chiều cao) chứa một giá trị điểm ảnh là số nguyên. Hành vi bố cục thực tế được xác định bởi thuộc tính `layout` (bố cục) như được mô tả dưới đây.

Trong một số trường hợp, nếu `width` (chiều rộng) hoặc `height` (chiều cao) không được quy định, thời gian chạy AMP có thể gán mặc định cho các giá trị này như sau:

- `amp-pixel`: Cả `width` (chiều rộng) và `height` (chiều cao) đều được đặt mặc định là 0.
- `amp-audio`: `width` (chiều rộng) và `height` (chiều cao) mặc định được suy diễn từ trình duyệt.

### `layout` <a name="layout"></a>

AMP cung cấp một nhóm bố cục quy định hoạt động của một thành phần AMP trong bố cục tài liệu. Bạn có thể quy định một bố cục cho một thành phần bằng cách bổ sung thuộc tính `layout` (bố cục) với một trong các giá trị bố cục được quy định trong bảng dưới đây.

**Ví dụ**: Một ảnh tương thích đơn giản, ở đó chiều rộng và chiều cao được sử dụng để xác định tỷ lệ khung hình.

[sourcecode:html]
<amp-img
src="/img/amp.jpg"
width="1080"
height="610"
layout="responsive"
alt="an image"

> </amp-img>
> [/sourcecode]

Các giá trị được hỗ trợ cho thuộc tính `layout` (bố cục):

<table>
  <thead>
    <tr>
      <th width="30%">Giá trị</th>
      <th>Hành vi và Yêu cầu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Không có</td>
      <td>Nếu không có giá trị nào được quy định, bố cục cho thành phần sẽ được suy diễn như sau:         <ul>           <li>Nếu <code>height</code> (chiều cao) được quy định và <code>width</code> (chiều rộng) bị thiếu hoặc được thiết lập là <code>auto</code> (tự động), một bố cục <code>fixed-height</code> (có chiều cao cố định) sẽ được ngầm định.</li>           <li>Nếu <code>width</code> (chiều rộng) và <code>height</code> (chiều cao) cùng được quy định với một thuộc tính <code>sizes</code> (kích thước) hoặc <code>heights</code> (chiều cao), một bố cục <code>responsive</code> (tương thích) sẽ được ngầm định.</li>           <li>Nếu <code>width</code> (chiều rộng) và <code>height</code> (chiều cao) cùng được quy định, một bố cục <code>fixed</code> (cố định) sẽ được ngầm định.</li>           <li> Nếu <code>width</code> (chiều rộng) và <code>height</code> (chiều cao) bị thiếu, một bố cục <code>container</code> (hộp chứa) sẽ được ngầm định.</li>         </ul>
</td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>Yếu tố cho phép con của nó tự quy định kích cỡ, như một thẻ <code>div</code> HTML thông thường. Thành phần này được giả sử là không có một bố cục cụ thể, mà hoạt động như một container; các con của nó được render ngay lập tức.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Yếu tố sẽ chiếm diện tích dành cho nó, cả chiều rộng lẫn chiều cao. Nói cách khác, bố cục và kích thước của một yếu tố <code>fill</code> (lấp đầy) sẽ khớp với cha của nó. Để một yếu tố có thể lấp đầy container cha của nó, quy định bố cục "fill" (lấp đầy) và đảm bảo container cha quy định <code>position:relative</code> (vị trí:tương đối) hoặc <code>position:absolute</code> (vị trí:tuyệt đối).</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Yếu tố này có một chiều rộng và chiều cao cố định, và không hỗ trợ tương thích. Các thuộc tính <code>width</code> (chiều rộng) và <code>height</code> (chiều cao) phải được quy định. Các ngoại lệ duy nhất là các thành phần <code>amp-pixel</code> và <code>amp-audio</code>.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>Yếu tố sẽ chiếm diện tích dành cho nó nhưng không thay đổi chiều cao. Bố cục này hoạt động tốt cho các yếu tố như <code>amp-carousel</code> liên quan đến nội dung được đặt ngang. Thuộc tính <code>height</code> (chiều cao) phải được quy định. Thuộc tính <code>width</code> (chiều rộng) phải không được quy định hoặc bằng <code>auto</code> (tự động).</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Yếu tố và các yếu tố khác trong cha của nó với loại bố cục <code>flex-item</code> sẽ chiếm diện tích còn lại của container cha khi cha là một container linh hoạt (nghĩa là, <code>display: flex</code> (hiển thị:linh hoạt)). Các thuộc tính <code>width</code> (chiều rộng) và <code>height</code> (chiều cao) là không cần thiết.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Yếu tố này chiếm dịch tích dành cho nó và tự động đổi kích cỡ chiều cao của nó theo tỷ lệ khung hình được quy định bởi thuộc tính <code>width</code> (chiều rộng) và <code>height</code> (chiều cao) <em>cho đến khi</em> nó đạt kích thước của yếu tố, được định nghĩa với các thuộc tính `width` và `height` được truyền đến <code>amp-img</code>, hoặc đạt một giới hạn CSS ví dụ như `max-width`. Các thuộc tính width (chiều rộng) và height (chiều cao) phải được quy định. Bố cục này hoạt động tốt cho hầu hết các yếu tố AMP, bao gồm <code>amp-img</code>, <code>amp-carousel</code>, v.v. Không gian có sẵn phụ thuộc vào yếu tố cha và cũng có thể được tùy chỉnh sử dụng CSS <code>max-width</code>. Bố cục này khác với bố cục <code>responsive</code> (tương thích) bởi nó có một chiều cao và chiều rộng thực chất. Điều này được thể hiện rõ nhất trong một yếu tố nổi mà ở đó bố cục <code>responsive</code> (tương thích) sẽ render 0x0 và một bố cục <code>intrinsic</code> (thực chất) sẽ tăng lên đến ngưỡng nhỏ hơn của kích cỡ tự nhiên của nó hay bất kỳ hạn chế CSS nào.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Yếu tố này không được hiển thị, và không chiếm diện tích trên màn hình bởi phong cách hiển thị của nó là  <code>none</code> (không có). Bố cục này có thể được áp dụng cho mọi yếu tố AMP. Yếu tố này có thể được hiển thị tùy theo hành động của người dùng (ví dụ như <code>amp-lightbox</code>). Các thuộc tính <code>width</code> (chiều rộng) và <code>height</code> (chiều cao) là không cần thiết.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Yếu tố này chiếm dịch tích dành cho nó và tự động đổi kích cỡ chiều cao của nó theo tỷ lệ khung hình được quy định bởi thuộc tính <code>width</code> (chiều rộng) và <code>height</code> (chiều cao). Bố cục này hoạt động tốt cho hầu hết các yếu tố AMP, bao gồm <code>amp-img</code>, <code>amp-video</code>, v.v. Không gian có sẵn phụ thuộc vào yếu tố cha và cũng có thể được tùy chỉnh sử dụng CSS <code>max-width</code>. Các thuộc tính <code>width</code> (chiều rộng) và <code>height</code> (chiều cao) phải được quy định.<p><strong>Lưu ý</strong>: Các yếu tố có <code>"layout=responsive"</code> không có kích cỡ thực chất. Kích cỡ của yếu tố này được xác định bởi yếu tố container của nó. Để đảm bảo yếu tố AMP của bạn được hiển thị, bạn phải quy định một chiều rộng và chiều cao cho yếu tố chứa nó. Không quy định  <code>"display:table"</code> trên yếu tố chứa nó bởi điều này sẽ ghi đè việc hiển thị yếu tố AMP, khiến yếu tố AMP bị vô hình.</p>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

Mọi yếu tố AMP hỗ trợ bố cục `responsive` (tương thích) cũng đều hỗ trợ thuộc tính `sizes` (kích cỡ). Giá trị của thuộc tính này là biểu thức sizes (kích cỡ) như được mô tả trong [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), nhưng được mở rộng cho mọi yếu tố, không chỉ là ảnh. Nói một cách ngắn gọn, thuộc tính `sizes` (kích thước) mô tả cách chiều rộng của yếu tố được tính dựa trên các điều kiện đa phương tiện.

Khi thuộc tính `sizes` (kích thước) được quy định với `width` (chiều rộng) và `height` (chiều cao), `layout` (bố cục) sẽ được đặt mặc định là `responsive` (tương thích).

**Ví dụ**: Sử dụng thuộc tính `sizes` (kích thước)

Trong ví dụ sau, nếu màn hiển thị rộng hơn `320px`, ảnh sẽ rộng 320px, nếu không, nó sẽ rộng 100vw (100% chiều rộng màn hiển thị).

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"

> </amp-img>
> [/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

Thuộc tính `sizes` (kích thước) đứng riêng sẽ thiết lập một phong cách `width` (chiều rộng) inline cho yếu tố này. Khi kết hợp `disable-inline-width` với `sizes`, yếu tố AMP sẽ nhân rộng giá trị của `sizes` (kích thước) đến thẻ cơ sở của yếu tố, cũng giống `img` được lồng trong một `amp-img`, **mà không** thiết lập `width` inline như `sizes` thường làm khi đứng riêng trong AMP.

**Ví dụ**: Sử dụng thuộc tính `disable-inline-width`

Trong ví dụ sau, chiều rộng của yếu tố `<amp-img>` không bị ảnh hưởng, và `sizes` (kích thước) chỉ được sử dụng để chọn một nguồn từ `srcset`.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"
disable-inline-width

> </amp-img>
> [/sourcecode]

### `heights` <a name="heights"></a>

Mọi yếu tố AMP hỗ trợ bố cục `responsive` (tương thích) cũng đều hỗ trợ thuộc tính `heights` (chiều cao). Giá trị của thuộc tính này là biểu thức sizes (kích cỡ) dựa trên biểu thức đa phương tiện tương tự với [thuộc tính img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), nhưng với 2 điểm khác biệt chính:

1. Giá trị này được áp dụng cho chiều cao, chứ không phải là chiều rộng của yếu tố.
2. Nó cho phép giá trị phần trăm, ví dụ như `86%`. Nếu giá trị phần trăm được sử dụng, nó sẽ chỉ báo phần trăm chiều rộng của yếu tố.

Khi thuộc tính `heights` (chiều cao) được quy định với `width` (chiều rộng) và `height` (chiều cao), `layout` (bố cục) sẽ được đặt mặc định là `responsive` (tương thích).

**Ví dụ**: Sử dụng thuộc tính `height` (chiều cao)

Trong ví dụ sau, chiều cao của ảnh sẽ được đặt mặc định là 80% chiều rộng, nhưng nếu màn hiển thị rộng hơn `500px`, chiều cao sẽ được giới hạn ở `200px`. Bởi thuộc tính `heights` (chiều cao) được quy định với `width` (chiều rộng) và `height` (chiều cao), bố cục sẽ được đặt mặc định là `responsive` (tương thích).

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="320"
height="256"
heights="(min-width:500px) 200px, 80%"

> </amp-img>
> [/sourcecode]

### `media` <a name="media"></a>

Hầu hết các yếu tố đều hỗ trợ thuộc tính `media` (đa phương tiện). Giá trị của `media` là một truy vấn đa phương tiện. Nếu truy vấn không khớp, yếu tố này sẽ hoàn toàn không được render và các tài nguyên và có thể là tài nguyên con của nó sẽ không được truy xuất. Nếu cửa sổ trình duyệt thay đổi kích cỡ hoặc hướng, các truy vấn đa phương tiện sẽ được tái đánh giá và các yếu tố được ẩn và hiển thị dựa trên kết quả mới.

**Ví dụ**: Sử dụng thuộc tính `media` (đa phương tiện)

Trong ví dụ sau đây, chúng ta có 2 ảnh với các truy vấn đa phương tiện loại trừ lẫn nhau. Tùy thuộc vào chiều rộng màn hình, một trong hai ảnh sẽ được truy xuất và render. Thuộc tính `media` (đa phương tiện) khả dụng trên tất cả các yếu tố AMP, vậy nên nó có thể được sử dụng với các yếu tố không phải ảnh, ví dụ như quảng cáo.

[sourcecode:html]
<amp-img
media="(min-width: 650px)"
src="wide.jpg"
width="466"
height="355"
layout="responsive"

> </amp-img>
> <amp-img
>   media="(max-width: 649px)"
>   src="narrow.jpg"
>   width="527"
>   height="193"
>   layout="responsive"
> </amp-img>
> [/sourcecode]

### `placeholder` <a name="placeholder"></a>

Thuộc tính `placeholder` (mã giữ chỗ) có thể được thiết lập trên mọi yếu tố HTML, không chỉ các yếu tố AMP. Thuộc tính `placeholder` (mã giữ chỗ) cho thấy yếu tố được đánh dấu với thuộc tính này sẽ hoạt động như mã giữ chỗ cho yếu tố AMP cha. Nếu được quy định, một yếu tố placeholder (mã giữ chỗ) phải là một con trực tiếp của yếu tố AMP. Theo mặc định, mã giữ chỗ sẽ được hiển thị ngay lập tức cho yếu tố AMP, kể cả khi tài nguyên của yếu tố AMP chưa được tải về hoặc bắt đầu. Sau khi đã sẵn sàng, yếu tố AMP thường sẽ ẩn mã giữ chỗ của nó và hiển thị nội dung. Hành vi chính xác liên quan đến mã giữ chỗ này phụ thuộc vào việc triển khai của yếu tố.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
<amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

Thuộc tính `fallback` (phương án dự phòng) có thể được thiết lập trên mọi yếu tố HTML, không chỉ các yếu tố AMP. Phương án dự phòng là một quy ước cho phép yếu tố giao tiếp với độc giả rằng trình duyệt không hỗ trợ yếu tố. Nếu được quy định, một yếu tố fallback (phương án dự phòng) phải là một con trực tiếp của yếu tố AMP. Hành vi chính xác liên quan đến phương án dự phòng này phụ thuộc vào việc triển khai của yếu tố.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">

  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

Thuộc tính `noloading` (không tải) chỉ báo khi nào thì "chỉ báo tải" nên được tắt cho yếu tố này. Rất nhiều yếu tố AMP được cho phép hiển thị một "chỉ báo tải", vốn là một hình hoạt họa cơ bản cho thấy rằng yếu tố này chưa được tải đầy đủ. Các yếu tố có thể bỏ hành vi này bằng cách thêm thuộc tính này.

## (tl;dr) Tóm tắt Yêu cầu & Hành vi của Bố cục <a name="tldr-summary-of-layout-requirements--behaviors"></a>

Bảng sau đây mô tả các tham số được chấp nhận, lớp CSS và phong cách được sử dụng cho thuộc tính `layout` (bố cục). Lưu ý rằng:

1. Mọi lớp CSS có tiền tố `-amp-` và các yếu tố có tiền tố `i-amp-` đều được coi là nội bộ đối với AMP và việc sử dụng của chúng trong các stylesheet người dùng là không được cho phép. Chúng chỉ được hiển thị ở đây vì mục đích thông tin.
2. Tuy `width` (chiều rộng) và `height` (chiều cao) được quy định trong bảng này như cần thiết, các quy tắc mặc định có thể áp dụng như trường hợp của `amp-pixel` và `amp-audio`.

<table>
  <thead>
    <tr>
      <th width="21%">Bố cục</th>
      <th width="20%">Cần Chiều rộng/<br>Chiều cao?</th>
      <th width="20%">Định nghĩa Kích thước?</th>
      <th width="20%">Yếu tố Bổ sung</th>
      <th width="19%">CSS "display"</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>Không</td>
      <td>Không</td>
      <td>Không</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Không</td>
      <td>Có, kích thước của cha.</td>
      <td>Không</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Có</td>
      <td>Có, quy định bởi <code>width</code> (chiều rộng) và <code>height</code> (chiều cao).</td>
      <td>Không</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>Chỉ <code>height</code> (chiều cao); <code>width</code> (chiều rộng) có thể là <code>auto</code> (tự động)</td>
      <td>Có, quy định bởi container cha và <code>height</code> (chiều cao).</td>
      <td>Không</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Không</td>
      <td>Không</td>
      <td>Có, dựa trên container cha.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Có</td>
      <td>Có, dựa trên container cha và tỷ lệ khung hình của <code>width:height</code> (chiều rộng:chiều cao).</td>
      <td>Có, <code>i-amphtml-sizer</code>.</td>
      <td> <code>block</code> (cư xử như một <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow">yếu tố bị thay thế</a>)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Không</td>
      <td>Không</td>
      <td>Không</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Có</td>
      <td>Có, dựa trên container cha và tỷ lệ khung hình của <code>width:height</code> (chiều rộng:chiều cao).</td>
      <td>Có, <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>

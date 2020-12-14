---
"$title": Hành động và sự kiện trong email AMP
order: '0'
formats:
- email
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-email-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

[tip type="note"] Tài liệu này bàn về các hành động và sự kiện cho định dạng email AMP. Đọc [Hành động và sự kiện](https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md) cho các website, câu chuyện và quảng cáo trong AMP. [/tip]

Thuộc tính `on` (bật) được sử dụng để cài đặt bộ xử lý sự kiện cho các yếu tố. Các sự kiện được hỗ trợ tùy thuộc vào yếu tố.

Giá trị cho cú pháp là một ngôn ngữ đơn giản dành riêng cho lĩnh vực của biểu mẫu:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

Xem bảng dưới đây để biết mô tả về từng phần của cú pháp.

<table>
  <tr>
    <th width="30%">Cú pháp</th>
    <th width="18%">Bắt buộc?</th>
    <th width="42%">Mô tả</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>có</td>
    <td>Đây là tên của sự kiện được yếu tố hiển thị.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>có</td>
    <td>Đây là DOM ID cho yếu tố, hoặc một <a href="#special-targets">mục tiêu đặc biệt</a> được định nghĩa sẵn mà bạn muốn thực thi một hành động hoặc để đáp lại sự kiện. Trong ví dụ sau,  <code>targetId</code> là DOM ID của mục tiêu <code>amp-lightbox</code>, <code>photo-slides</code>.<br>     <code><amp-lightbox id="photo-slides"></amp-lightbox> <button on="tap:photo-slides">Show Images</button></code>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>không</td>
    <td>Dành cho các yếu tố với hành động mặc định.<br><p>Đây là phương thức được yếu tố mục tiêu (tham chiếu bởi <code>targetId</code>) hiển thị và bạn muốn thực thi khi sự kiện được kích hoạt.</p> <p>AMP có một khái niệm về một hành động mặc định mà các yếu tố có thể triển khai. Vậy nên khi bỏ sót  <code>methodName</code>, AMP sẽ thực thi phương thức mặc định đó.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>không</td>
    <td>Some actions, if documented, may accept arguments. The arguments are defined between parentheses in <code>key=value</code> notation. The accepted values are:       <ul>         <li>simple unquoted strings: <code>simple-value</code>
</li>         <li>quoted strings: <code>"string value"</code> or <code>'string value'</code>
</li>         <li>boolean values: <code>true</code> or <code>false</code>
</li>         <li>numbers: <code>11</code> or <code>1.1</code>
</li>         <li>dot-syntax reference to event data: <code>event.someDataVariableName</code>
</li>       </ul>     </td>
  </tr>
</table>

## Xử lý nhiều sự kiện <a name="handling-multiple-events"></a>

Bạn có thể lắng nghe nhiều sự kiện trên một yếu tố bằng cách chia tách các sự kiện bằng dấu chấm phẩy `;`.

Ví dụ: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Nhiều hành động cho một sự kiện <a name="multiple-actions-for-one-event"></a>

Bạn có thể thực thi nhiều hành động lần lượt cho cùng một sự kiện bằng cách chia tách các hành động với một dấu phẩy ','.

Ví dụ: `on="tap:target1.actionA,target2.actionB"`

## Các sự kiện và hành động được định nghĩa toàn cục <a name="globally-defined-events-and-actions"></a>

AMP định nghĩa một sự kiện `tap` (chạm) trên toàn cục mà bạn có thể lắng nghe trên mọi yếu tố HTML (bao gồm các yếu tố AMP).

AMP cũng định nghĩa các hành động `hide` (ẩn), `show` (hiển thị) và `toggleVisibility` (bật/tắt hiển thị) trên toàn cục mà bạn có thể kích hoạt trên mọi yếu tố HTML.

[tip type="note"]

Một yếu tố chỉ có thể được hiển thị nếu trước đó nó đã bị ẩn bởi một hành động `hide` hoặc `toggleVisibility`, hoặc bằng cách sử dụng thuộc tính [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) (ẩn). Hành động `show` (hiển thị) không hỗ trợ các yếu tố bị ẩn bởi `display:none` (hiển thị:không) của CSS hoặc `layout=nodisplay` (bố cục=không hiển thị) của AMP.

Ví dụ, những việc sau có thể được thực hiện trong AMP:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## Các sự kiện cụ thể của yếu tố <a name="element-specific-events"></a>

### * - tất cả yếu tố <a name="---all-elements"></a>

<table>
  <tr>
    <th>Sự kiện</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>Kích hoạt khi yếu tố được nhấn/chạm vào.</td>
  </tr>
</table>

### Yếu tố đầu vào <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">Sự kiện</th>
    <th width="30%">Mô tả</th>
    <th width="40%">Yếu tố</th>
    <th>Dữ liệu</th>
  </tr>
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Fired when the value of the element is changed and committed.       <p>       Data properties mirror those in <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>     </td>
    <td><code>input</code></td>
    <td>
      <pre>event.min
event.max
event.value
event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td>
<code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <tr>
    <td><code>input-debounced</code></td>
    <td>Kích hoạt khi giá trị của yếu tố được thay đổi. Điều này tương tự như sự kiện <code>change</code> (thay đổi) tiêu chuẩn, nhưng chỉ kích hoạt khi 300ms đã trôi qua sau khi giá trị của dữ liệu đầu vào đã ngừng thay đổi.</td>
    <td>Các yếu tố kích hoạt sự kiện <code>input</code> (nhập liệu).</td>
    <td>Giống như dữ liệu sự kiện <code>change</code> (thay đổi).</td>
  </tr>
  <tr>
    <td><code>input-throttled</code></td>
    <td>Kích hoạt khi giá trị của yếu tố được thay đổi. Điều này tương tự như sự kiện <code>change</code> (thay đổi) tiêu chuẩn, nhưng bị hạn chế chỉ kích hoạt tối đa một lần sau mỗi 100ms trong khi giá trị của dữ liệu đầu vào đang thay đổi.</td>
    <td>Các yếu tố kích hoạt sự kiện <code>input</code> (nhập liệu).</td>
    <td>Giống như dữ liệu sự kiện <code>change</code> (thay đổi).</td>
  </tr>
</table>

### amp-accordion > phần <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>Kích hoạt khi một phần accordion được mở rộng.</td>
    <td>Không có.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Kích hoạt khi một phần accordion được thu hẹp.</td>
    <td>Không có.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>Kích hoạt khi slide hiện tại của băng chuyền được thay đổi.</td>
    <td><pre>// Slide number.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>Kích hoạt khi lightbox được hiển thị hoàn toàn.</td>
    <td>Không có</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>Kích hoạt khi lightbox được đóng hoàn toàn.</td>
    <td>Không có</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td>
<code>fetch-error</code>(low-trust)</td>
    <td>Kích hoạt khi truy xuất dữ liệu thất bại.</td>
    <td>Không có</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Kích hoạt khi một tùy chọn được chọn hoặc bỏ chọn.</td>
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>Kích hoạt khi thanh bên được mở hoàn toàn sau khi quá trình chuyển tiếp kết thúc.</td>
    <td>Không có</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Kích hoạt khi thanh bên được đóng hoàn toàn sau khi quá trình chuyển tiếp kết thúc.</td>
    <td>Không có</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td>
<code>fetch-error</code>(low-trust)</td>
    <td>Kích hoạt khi truy xuất dữ liệu thất bại.</td>
    <td>Không có</td>
  </tr>
</table>

### form <a name="form"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Kích hoạt khi biểu mẫu được gửi đi.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Kích hoạt khi gửi biểu mẫu thành công.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Kích hoạt khi gửi biểu mẫu thất bại.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Kích hoạt khi biểu mẫu là hợp lệ.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Kích hoạt khi biểu mẫu là không hợp lệ.</td>
    <td></td>
  </tr>
</table>

## Các hành động dành riêng cho yếu tố <a name="element-specific-actions"></a>

### * (tất cả yếu tố) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Ẩn yếu tố mục tiêu.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Shows the target element. If an     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> element</a> becomes visible as a     result, it gains focus.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Toggles the visibility of the target element. If an     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> element</a> becomes visible as a     result, it gains focus.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Bật/tắt lớp của yếu tố mục tiêu.  <code>force</code> (bắt buộc) là tùy chọn, nhưng nếu được định nghĩa, nó đảm bảo lớp này chỉ được thêm mà không bị xóa nếu đặt thành <code>true</code> (đúng), và chỉ bị xóa nhưng không được thêm nếu đặt thành  <code>false</code> (sai).</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Makes the target element gain focus. To lose focus, <code>focus</code>     on another element (usually parent element). We strongly advise against     losing focus by focusing on <code>body</code>/<code>documentElement</code>     for accessibility reasons.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>Toggles the <code>expanded</code> and <code>collapsed</code> states of <code>amp-accordion</code> sections. When called with no arguments, it toggles all sections of the accordion. Trigger on a specific section by providing the section id: <code>on="tap:myAccordion.toggle(section='section-id')"</code>.   </td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Mở rộng các phần của accordion. Nếu một phần đã được mở rộng rồi, nó vẫn sẽ được mở rộng. Khi được gọi mà không có tham số, nó sẽ mở rộng tất cả các phần của accordion. Kích hoạt trên một phần cụ thể bằng cách cung cấp ID phần: <code>on="tap:myAccordion.expand(section=</code>
</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Thu hẹp các phần của accordion. Nếu một phần đã được thu hẹp rồi, nó vẫn sẽ được thu hẹp. Khi được gọi mà không có tham số, nó sẽ thu hẹp tất cả các phần của accordion. Kích hoạt trên một phần cụ thể bằng cách cung cấp ID phần: <code>on="tap:myAccordion.collapse(section=</code>
</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>Chuyển băng chuyền đến một thứ tự slide cụ thể.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Mở lightbox ảnh với ảnh nguồn là ảnh đã kích hoạt hành động này.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Mở lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Đóng lightbox.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>Cập nhật bố cục của <code>amp-list</code> thành  <code>layout="CONTAINTER"</code> để cho phép <a href="https://github.com/ampproject/amphtml/blob/master/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">đổi kích cỡ năng động</a>.</td>
  </tr>
  <tr>
    <td>
<code>fetch-error</code>(low-trust)</td>
    <td>Kích hoạt khi truy xuất dữ liệu thất bại.</td>
    <td>Không có</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Xóa tất cả các lựa chọn từ một  <code>amp-selector</code> đã quy định.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>Di chuyển lựa chọn về phía trước theo giá trị của `delta`. `delta` mặc định được đặt là -1. Nếu không có tùy chọn nào được chọn, trạng thái được chọn sẽ trở thành giá trị của tùy chọn gần nhất.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>Di chuyển lựa chọn về phía sau theo giá trị của `delta`. `delta` mặc định được đặt là 1. Nếu không có tùy chọn nào được chọn, trạng thái được chọn sẽ trở thành giá trị của tùy chọn đầu tiên.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>Toggles the application of the `selected`. If the select attribute is absent, this action adds it. If the select attribute is present, this action removes it.     You may force and keep an add or remove by including a boolean value in the `value` argument. A value of `true` will force add the `selected` attribute and not remove it if already present. A value of  `false` will remove the attribute, but not add it if absent.   </td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Mở thanh bên.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Đóng thanh bên.</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>Bật/tắt trạng thái của thanh bên.</td>
  </tr>
</table>

### form <a name="form-1"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Xóa mọi giá trị dữ liệu đầu vào của biểu mẫu.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Gửi biểu mẫu.</td>
  </tr>
</table>

## Mục tiêu đặc biệt <a name="special-targets"></a>

Sau đây là các mục tiêu được cung cấp bởi hệ thống AMP với các yêu cầu đặc biệt:

### Mục tiêu: AMP <a name="target-amp"></a>

Mục tiêu `AMP` được cung cấp bởi thời gian chạy AMP và triển khai các hành động ở cấp độ cao nhất, áp dụng cho toàn tài liệu.

<table>
  <tr>
    <th width="40%">Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Yêu cầu <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>Hợp nhất một object literal vào một trạng thái ràng buộc được.</p>
      <p></p>
    </td>
  </tr>
</table>

<sup>1</sup>Khi được sử dụng với <a href="#multiple-actions-for-one-event">nhiều hành động</a>, các hành động sau đó sẽ chờ <code>setState()</code> hoàn thành trước khi kích hoạt. Chỉ một <code>setState()</code> được cho phép cho mỗi sự kiện.

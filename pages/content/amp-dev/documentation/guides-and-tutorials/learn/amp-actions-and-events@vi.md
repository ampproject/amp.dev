---
'$title': Hành động và sự kiện
$order: 0
formats:
  - websites
  - stories
  - ads
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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

[tip type="note"] Tài liệu này bàn về các hành động và sự kiện cho các website, câu chuyện và quảng cáo trong AMP. Đọc [Hành động và sự kiện trong email AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-email-actions-and-events.md) cho định dạng email AMP. [/tip]

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
    <td>Đây là DOM ID cho yếu tố, hoặc một <a href="#special-targets">mục tiêu đặc biệt</a> được định nghĩa sẵn mà bạn muốn thực thi một hành động hoặc để đáp lại sự kiện. Trong ví dụ sau,  <code>targetId</code> là DOM ID của mục tiêu <code>amp-lightbox</code>, <code>photo-slides</code>. <pre>&lt;amp-lightbox id="photo-slides">&lt;/amp-lightbox> &lt;button on="tap:photo-slides">Show Images&lt;/button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>không</td>
    <td>Dành cho các yếu tố với hành động mặc định.<p>Đây là phương thức được yếu tố mục tiêu (tham chiếu bởi <code>targetId</code>) hiển thị và bạn muốn thực thi khi sự kiện được kích hoạt.</p> <p>AMP có một khái niệm về một hành động mặc định mà các yếu tố có thể triển khai. Vậy nên khi bỏ sót  <code>methodName</code>, AMP sẽ thực thi phương thức mặc định đó.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>không</td>
    <td>Một số hành động, nếu được ghi chép, có thể chấp nhận các tham số. Các tham số được định nghĩa giữa các ngoặc đơn trong chú thích <code>key=value</code>. Các giá trị được chấp nhận là: <ul> <li>các chuỗi đơn giản không được trích dẫn: <code>simple-value</code> </li> <li>các chuỗi được trích dẫn: <code>"string value"</code> hoặc <code>'string value'</code> </li> <li>giá trị boolean: <code>true</code> hoặc <code>false</code> </li> <li>số: <code>11</code> hoặc <code>1.1</code> </li> <li>Tham chiếu cú pháp dấu chấm cho dữ liệu sự kiện: <code>event.someDataVariableName</code> </li> </ul>
</td>
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

### \* - tất cả yếu tố <a name="---all-elements"></a>

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
  <!-- change -->
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Kích hoạt khi giá trị của yếu tố được thay đổi và cam kết. <p>Thuộc tính dữ liệu sao chép các thuộc tính trong <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> và <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min event.max event.value event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min event.max event.value</pre>
    </td>
  </tr>
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>Kích hoạt khi giá trị của yếu tố được thay đổi. Điều này tương tự như sự kiện <code>change</code> (thay đổi) tiêu chuẩn, nhưng chỉ kích hoạt khi 300ms đã trôi qua sau khi giá trị của dữ liệu đầu vào đã ngừng thay đổi.</td>
    <td>Các yếu tố kích hoạt sự kiện <code>input</code> (nhập liệu).</td>
    <td>Giống như dữ liệu sự kiện <code>change</code> (thay đổi).</td>
  </tr>
    <!-- input-throttled -->
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
    <td><pre>// Slide number. event.index</pre></td>
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
    <td><code>changeToLayoutContainer</code></td>
    <td>Cập nhật bố cục của <code>amp-list</code> thành <code>layout="CONTAINTER"</code> để cho phép <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">đổi kích cỡ năng động</a>.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
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
    <td><pre>// Target element's "option" attribute value. event.targetOption<br>// Array of "option" attribute values of all selected elements. event.selectedOptions</pre></td>
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

### amp-state <a name="amp-state-1"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>Kích hoạt khi truy xuất dữ liệu thất bại.</td>
    <td>Không có</td>
  </tr>
</table>

### amp-video, amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">Sự kiện</th>
    <th width="35%">Mô tả</th>
    <th width="40%">Dữ liệu</th>
  </tr>
  <tr>
    <td> <code>firstPlay</code>(low-trust)</td>
    <td>Kích hoạt lần đầu tiên video được người dùng phát. Ở các video tự động phát, việc này được kích hoạt ngay khi người dùng tương tác với video. Đây là sự kiện có mức tin tưởng thấp, điều này có nghĩa nó không thể kích hoạt hầu hết các hành động; chỉ các hành động có mức tin tưởng thấp như <code>amp-animation</code> mới có thể được chạy.</td>
    <td></td>
  </tr>
  <tr>
    <td> <code>timeUpdate</code>(low-trust)</td>
    <td>Kích hoạt khi vị trí phát của một video được thay đổi. Tần suất của sự kiện được AMP kiểm soát và hiện được đặt ở chu kỳ 1 giây. Đây là sự kiện có mức tin tưởng thấp, điều này có nghĩa nó không thể kích hoạt hầu hết các hành động; chỉ các hành động có mức tin tưởng thấp như <code>amp-animation</code> mới có thể được chạy.</td>
    <td> <code>{time, percent}</code><code>time</code> indicates the current time in seconds, <code>percent</code> is a number between 0 and 1 and indicates current position as percentage of total time.</td>
  </tr>
</table>

### form

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
    <td>Fired when the form is invalid.</td>
    <td></td>
  </tr>
</table>

## Các hành động dành riêng cho yếu tố <a name="element-specific-actions"></a>

### \* (tất cả yếu tố) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Hides the target element.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Shows the target element. If an     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> element</a> becomes visible as a     result, it gains focus.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Bật/tắt hiển thị yếu tố mục tiêu. Nếu một <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">yếu tố <code>autofocus</code> (tự động lấy tiêu điểm)</a> được hiển thị, nó sẽ được lấy tiêu điểm.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Bật/tắt lớp của yếu tố mục tiêu.  <code>force</code> (bắt buộc) là tùy chọn, nhưng nếu được định nghĩa, nó đảm bảo lớp này chỉ được thêm mà không bị xóa nếu đặt thành <code>true</code> (đúng), và chỉ bị xóa nhưng không được thêm nếu đặt thành <code>false</code> (sai).</td>
  </tr>
  <tr>
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>Cuộn một yếu tố vào màn hiển thị với một hình hoạt họa mượt mà.<br> <code>duration</code> (thời lượng) là không bắt buộc. Quy định thời lượng của hình hoạt họa tính theo mili giây. Nếu không quy định, một số tương đương với chênh lệch tốc độ cuộn thấp hơn hoặc bằng 500 mili giây sẽ được sử dụng.<br> <code>position</code> (vị trí) là không bắt buộc. Một trong các giá trị <code>top</code> (trên cùng), <code>center</code> (ở giữa) hoặc <code>bottom</code> (dưới cùng)  (mặc định là <code>top</code>). Quy định vị trí của yếu tố tương đối với màn hiển thị sau khi cuộn.<br> Như một biện pháp thực hành tiên tiến nhất về hỗ trợ tiếp cận, ghép yếu tố này với một cuộc gọi <code>focus()</code> để tập trung vào yếu tố đang được cuộn đến.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Lấy tiêu điểm vào yếu tố mục tiêu. Để bỏ tiêu điểm, <code>focus</code> (tập trung) vào một yếu tố khác (thường là yếu tố cha). Chúng tôi đặc biệt khuyến cáo không giảm tiêu điểm bằng cách tập trung vào  <code>body</code>/<code>documentElement</code> vì lý do hỗ trợ tiếp cận.</td>
  </tr>
</table>

### amp-audio <a name="amp-audio"></a>

<table>
  <tr>
    <th width="20%">Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Phát âm thanh. Không hoạt động nếu yếu tố <code><amp-audio></code> là con của <code>&lt;amp-story></code>.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Tạm dừng âm thanh. Không hoạt động nếu yếu tố <code><amp-audio></code> là con của <code>&lt;amp-story></code>.</td>
  </tr>
</table>

### amp-bodymovin-animation <a name="amp-bodymovin-animation"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Phát hình hoạt họa.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Tạm dừng hình hoạt họa.</td>
  </tr>
  <tr>
    <td><code>stop</code></td>
    <td>Dừng hình hoạt họa.</td>
  </tr>
  <tr>
    <td><code>seekTo(time=INTEGER)</code></td>
    <td>Đặt currentTime của hình hoạt họa thành giá trị được quy định và tạm dừng hình hoạt họa.</td>
  </tr>
  <tr>
    <td><code>seekTo(percent=[0,1])</code></td>
    <td>Sử dụng giá trị phần trăm được cho để xác định currentTime của hình hoạt họa thành giá trị được quy định và tạm dừng hình hoạt họa.</td>
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
    <td>Bật/tắt trạng thái <code>expanded</code> (mở rộng) và <code>collapsed</code> (thu hẹp) của các phần <code>amp-accordion</code>. Khi được gọi mà không có tham số, nó sẽ bật/tắt tất cả các phần của accordion. Kích hoạt trên một phần cụ thể bằng cách cung cấp ID phần: <code>on="tap:myAccordion.toggle(section=</code>
</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Mở rộng các phần của accordion. Nếu một phần đã được mở rộng rồi, nó vẫn sẽ được mở rộng. Khi được gọi mà không có tham số, nó sẽ mở rộng tất cả các phần của accordion. Kích hoạt trên một phần cụ thể bằng cách cung cấp ID phần: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Thu hẹp các phần của accordion. Nếu một phần đã được thu hẹp rồi, nó vẫn sẽ được thu hẹp. Khi được gọi mà không có tham số, nó sẽ thu hẹp tất cả các phần của accordion. Kích hoạt trên một phần cụ thể bằng cách cung cấp ID phần: <code>on="tap:myAccordion.collapse(section='section-id')"</code>.</td>
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
  <tr>
    <td><code>toggleAutoplay(toggleOn=true|false)</code></td>
    <td>Bật/tắt trạng thái tự động phát của băng chuyền. <code>toggleOn</code> là không bắt buộc.</td>
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

### amp-lightbox-gallery <a name="amp-lightbox-gallery"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>open</code></td>
    <td>Mở thư viện lightbox. Có thể được kích hoạt bằng cách chạm vào một yếu tố khác, nếu bạn quy định id ảnh: `on="tap:amp-lightbox-gallery.open(id='image-id')"`.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Làm mới dữ liệu từ <code>src</code> và render lại danh sách.</td>
  </tr>
</table>

### amp-live-list <a name="amp-live-list"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>update (default)</code></td>
    <td>Cập nhật các mục DOM để hiển thị nội dung được cập nhật.</td>
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
    <td>Xóa tất cả các lựa chọn từ một <code>amp-selector</code> đã quy định.</td>
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
    <td>Bật/tắt mục `selected` (được chọn). Nếu không có thuộc tính được chọn, hành động này sẽ bổ sung nó. Nếu có thuộc tính được chọn, hành động này sẽ xóa nó. Bạn có thể bắt buộc và duy trì thêm hoặc xóa bằng cách thêm một giá trị boolean trong tham số `value` (giá trị). Một giá trị `true` (đúng) sẽ bắt buộc thêm thuộc tính `selected` (được chọn) và không xóa nó nếu nó đã được chọn. Một giá trị `false` (sai) sẽ xóa thuộc tính, và không thêm nó nếu nó không được chọn.</td>
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

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Truy xuất lại dữ liệu tại thuộc tính `src`, đồng thời bỏ qua bộ nhớ đệm của trình duyệt.</td>
  </tr>
</table>

### amp-user-notification <a name="amp-user-notification"></a>

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>dismiss (default)</code></td>
    <td>Ẩn yếu tố thông báo người dùng được tham chiếu.</td>
  </tr>
</table>

### Yếu tố video <a name="video-elements"></a>

Các hành động dưới đây được hỗ trợ trong các yếu tố video AMP sau đây: `amp-video`, `amp-youtube`, `amp-3q-player`, `amp-brid-player`, `amp-dailymotion`, `amp-delight-player`, `amp-ima-video`.

<table>
  <tr>
    <th>Hành động</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Phát video.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Tạm dừng video.</td>
  </tr>
  <tr>
    <td><code>mute</code></td>
    <td>Tắt tiếng video.</td>
  </tr>
  <tr>
    <td><code>unmute</code></td>
    <td>Bỏ tắt tiếng video.</td>
  </tr>
  <tr>
    <td><code>fullscreencenter</code></td>
    <td>Hiển thị video toàn màn hình.</td>
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
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Điều hướng cửa sổ hiện tại đến URL được cho, đến mục tiêu được quy định (không bắt buộc) nếu được cho (hiện tại chỉ hỗ trợ <code>_top</code> (trên cùng) và <code>_blank </code> (trống)). Tham số <code>opener</code> (mở) có thể được quy định khi sử dụng mục tiêu là <code>_blank</code> (trống) để cho phép các trang mới được mở truy cập <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/opener"><code>window.opener</code></a>. Hỗ trợ <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md">thay thế URL tiêu chuẩn</a>.</p>
      <p><strong>Lưu ý</strong>: Nên sử dụng các liên kết <code>&lt;a&gt;</code> bất cứ khi nào có thể bởi  <code>AMP.navigateTo</code> không được các web crawler công nhận.</p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Cố đóng cửa sổ nếu được cho phép, nếu không, nó sẽ điều hướng tương tự như Hành động <code>navigateTo</code>. Hữu ích cho các trường hợp sử dụng ở đó một nút "Quay lại" có thể là cần thiết để đóng cửa sổ nếu nó được mở trong một cửa sổ mới từ trang trước đó hoặc điều hướng nếu nó không được mở.</p>
      <p><strong>Lưu ý:</strong> Sử dụng bình thường<code>&lt;a&gt;</a></code> liên kết được khuyến nghị nếu có thể vì <code>AMP.closeOrNavigateTo</code> không được trình thu thập dữ liệu web nhận dạng.</p>
    </td>
  </tr>
  <tr>
    <td><code>goBack</code></td>
    <td>Về trang trước trong lịch sử.</td>
  </tr>
  <tr>
    <td><code>print</code></td>
    <td>Mở Hộp thoại In để in trang hiện tại.</td>
  </tr>
  <tr>
    <td>scrollTo(id=STRING, duration=INTEGER, position=STRING)</td>
    <td>Cuộn đến ID yếu tố được cung cấp trên trang hiện tại.</td>
  </tr>
  <tr>
    <td>optoutOfCid</td>
    <td>Hủy tạo ID Máy khách cho tất cả phạm vi.</td>
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
  <tr>
    <td>
<code>pushState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Yêu cầu <a href="https://amp.dev/documentation/components/amp-bind.html#modifying-history-with-amppushstate">amp-bind</a>.</p>
      <p>Hợp nhất một object literal vào một trạng thái ràng buộc được và đẩy một mục mới vào danh sách lịch sử trình duyệt. Việc đẩy mục này sẽ khôi phục các giá trị trước đó của biến số (trong ví dụ này là <code>foo</code>).</p>
</td>
  </tr>
</table>

<sup>1</sup>Khi được sử dụng với <a href="#multiple-actions-for-one-event">nhiều hành động</a>, các hành động sau đó sẽ chờ <code>setState()</code> hoặc <code>pushState()</code> hoàn thành trước khi kích hoạt. Chỉ một <code>setState()</code> hoặc <code>pushState()</code> được cho phép cho mỗi sự kiện.

### Mục tiêu: amp-access <a name="target-amp-access"></a>

Mục tiêu `amp-access` được cung cấp bởi thành phần [amp-access](https://amp.dev/documentation/components/amp-access.html).

Mục tiêu `amp-access` là mục tiêu đặc biệt vì các lý do sau:

1. Bạn không thể cung cấp ID tùy chỉnh cho mục tiêu này. Mục tiêu này luôn là `amp-access`.
2. Các hành động cho `amp-access` là năng động tùy thuộc vào cấu trúc của [Cấu hình Truy cập AMP](https://amp.dev/documentation/components/amp-access#configuration).

Xem [chi tiết](https://amp.dev/documentation/components/amp-access#login-link) về việc sử dụng mục tiêu `amp-access`.

---
"$title": Gỡ lỗi cho các vấn đề của Bộ nhớ đệm AMP
order: '8'
formats:
- websites
- stories
- ads
teaser:
  text: Vì sao tài liệu của tôi lại bị vỡ trên một bộ nhớ đệm AMP?
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Vì sao tài liệu của tôi lại bị vỡ trên một bộ nhớ đệm AMP? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

Các tài liệu AMP hợp lệ thường xuất hiện và hành xử trên các Bộ nhớ đệm AMP giống như trên nguồn của chúng. Tuy nhiên, có một số thành phần và cấu hình máy chủ có thể gây vấn đề.

Nếu một tài liệu cụ thể xuất hiện và hành xử như kỳ vọng trên nguồn của bạn, nhưng không làm thế khi được xem qua bộ nhớ đệm ([cách để ánh xạ URL nguồn gốc đến Bộ nhớ đệm AMP của Google](https://developers.google.com/amp/cache/overview#amp-cache-url-format)), hãy làm như sau:

1. Mở bảng điều khiển công cụ nhà phát triển/gỡ lỗi của trình duyệt, và giải quyết mọi lỗi hoặc cảnh báo được hiển thị.
2. Xử lý tài liệu qua [AMPBench](https://ampbench.appspot.com/) và giải quyết mọi lỗi hoặc cảnh báo ngoài kỳ vọng.

Nếu bạn vẫn có vấn đề sau khi làm theo các bước này, hãy kiểm tra bảng dưới đây.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">Triệu chứng</th>
      <th width="30%">Vấn đề</th>
      <th width="40%">Giải pháp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Phông chữ web không xuất hiện (các phông chữ phương án dự phòng được sử dụng)</td>
      <td>Bộ nhớ đệm AMP không có trong danh sách trắng của nhà cung cấp phông chữ.</td>
      <td>Liên hệ với nhà cung cấp phông chữ và yêu cầu họ cho phép <a href="https://amp.dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests#cors-security-in-amp">tất cả các bộ nhớ đệm</a>.</td>
    </tr>
    <tr>
      <td>Các tài sản (ví dụ như phông chữ và ảnh) không xuất hiện (<strong>chỉ nguồn gốc HTTP</strong>)</td>
      <td>Tài liệu này sử dụng các URL phụ thuộc vào giao thức.</td>
      <td>Chuyển sang các URL tuyệt đối (nghĩa là, <code>http://www.site.com/doc/amp</code>, không phải <code>//www.site.com/doc/amp</code>).</td>
    </tr>
    <tr>
      <td rowspan="2">Các tài sản (ví dụ như phông chữ và ảnh) không xuất hiện</td>
      <td>Các tài sản này được phục vụ với loại MIME không đúng.</td>
      <td>Quy định <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">một loại MIME được chấp nhận</a>.</td>
    </tr>
    <tr>
      <td>Bộ nhớ đệm AMP không thể truy cập tài sản này.</td>
      <td>Đảm bảo Bộ nhớ đệm AMP có thể truy cập các tài sản của bạn và không bị chặn bởi một địa chỉ IP, hoặc một user agent, v.v. (<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Danh sách các user agent được sử dụng bởi Google crawler</a>).</td>
    </tr>
    <tr>
      <td>Các yếu tố động như <code><amp-form/></code>, <code><amp-list/></code>, không hành xử như kỳ vọng.</td>
      <td>Các đầu đề CORS bị vỡ hoặc thiếu.</td>
      <td>Các thành phần này thực hiện các yêu cầu chéo nguồn gốc từ Bộ nhớ đệm AMP đến nguồn của bạn. Theo mặc định, trình duyệt sẽ chặn các yêu cầu này. Để cho phép các yêu cầu này, hãy phát ra các <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">đầu đề CORS</a> cho phép <a href="https://amp.dev/documentation/guides-and-tutorials/amp-cors-requests.html">tất cả bộ nhớ đệm</a>.</td>
    </tr>
    <tr>
      <td>Nội dung đang được phục vụ phải bị xóa do một thông báo chấm dứt theo pháp luật.</td>
      <td>Bộ nhớ đệm AMP chưa cập nhật lệnh xóa này.</td>
      <td>Theo dõi hướng dẫn cho từng Bộ nhớ đệm AMP để làm mới nội dung. Đối với Bộ nhớ đệm AMP của Google, hãy tham khảo <a href="https://developers.google.com/amp/cache/update-cache">Cập nhật Nội dung AMP</a>.</td>
    </tr>
</tbody>
</table>

</table>

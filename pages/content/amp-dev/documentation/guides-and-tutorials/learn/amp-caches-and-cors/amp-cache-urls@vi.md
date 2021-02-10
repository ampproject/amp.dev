---
'$title': Định dạng URL của Bộ nhớ đệm AMP và Xử lý Yêu cầu
$order: 9
toc: 'false'
formats:
  - websites
  - stories
  - ads
author: Gregable
contributors:
  - sebastianbenz
---

Trong tài liệu này, bạn sẽ tìm hiểu về định dạng URL của Bộ nhớ đệm AMP và cách nó xử lý các yêu cầu.

## Định dạng URL

Khi có thể, Bộ nhớ đệm AMP của Google sẽ tạo một tên miền con cho tên miền của từng tài liệu AMP bằng cách chuyển chúng từ định dạng <a class="" href="https://en.wikipedia.org/wiki/Punycode">IDN (punycode)</a> sang UTF-8. Bộ nhớ đệm này sẽ thay mọi ký hiệu `-` (dấu gạch ngang) bằng `--` (2 dấu gạch ngang) và thay mọi `.` (dấu chấm) bằng `-` (dấu gạch ngang). Ví dụ, `pub.com` sẽ được ánh xạ thành `pub-com.cdn.ampproject.org`.

Bạn có thể dùng bộ tính URL này để chuyển đổi một URL thành một phiên bản bộ nhớ đệm AMP:

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] Sử dụng mô-đun [Node.js](https://nodejs.org) của [AMP-Toolbox Cache URL](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) để dịch một URL từ một nguồn sang định dạng URL Bộ nhớ đệm AMP. [/tip]

Tài liệu này mô tả:

- Cấu trúc URL trên một Bộ nhớ đệm AMP.
- Làm thế nào để dự đoán cách URL của bạn được hiển thị trên một bộ nhớ đệm AMP.
- Cách để đảo ngược một đầu đề Nguồn Bộ nhớ đệm AMP để xác định tên miền của nhà phát hành của nó.

## Giao thức Tên miền

Tất cả các tài liệu đều sử dụng giao thức https trên các bộ nhớ đệm AMP.

## Hậu tố Tên miền

Tất cả các Bộ nhớ đệm AMP đều được đăng ký trong một tập tin JSON, được đăng trực tuyến trên [Kho lưu trữ AMPHTML](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). Một hồ sơ bộ nhớ đệm mẫu trong tập tin này sẽ có dạng:

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

Một Bộ nhớ đệm AMP phục vụ các hồ sơ trên tên miền được quy định bởi `cacheDomain`. Trong trường hợp này, tên miền đó là `cdn.ampproject.org`.

Tài liệu này sử dụng các URL với `cdn.ampproject.org` làm ví dụ, nhưng các bộ nhớ đệm khác cũng thường sử dụng một cấu trúc URL tương tự.

## Tiền tố Tên miền

Một Bộ nhớ đệm AMP phục vụ các tài liệu trên một URL sửa đổi, ví dụ như `example-com.cdn.ampproject.org`. Thành phần dấu chấm đầu tiên của một tên miền gốc trong ví dụ, `example.com`, sẽ trở thành `example-com`. Tài liệu này gọi chuỗi không chứa dấu chấm `example-com` này là “tiền tố tên miền”. Xem bên dưới để biết thuật toán thực hiện việc chuyển đổi này.

Nhiều thành phần dấu chấm không được sử dụng trong tiền tố này, ví dụ như `example.com.cdn.ampproject.org`, bởi hạn chế của các chứng nhận https (TLS), [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1):

```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```

Tên miền của nhà phát hành có thể có độ dài tối đa 255 ký tự, trong khi mỗi tiền tố tên miền bị giới hạn ở 63 ký tự, theo [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11):

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

Mọi tên miền của nhà phát hành đều sẽ ánh xạ đến một tiền tố tên miền riêng. Thuật toán làm việc này sẽ cố gắng hiển thị ánh xạ theo cách con người có thể đọc. Tuy nhiên, việc ánh xạ sẽ chuyển về một định dạng mã băm bảo mật cho tên miền của nhà phát hành nếu chúng quá dài, và trong các trường hợp được mô tả dưới đây:

### Thuật toán Cơ bản

Thuật toán cơ bản để chuyển đổi một tên miền của nhà phát hành thành một tiền tố tên miền là như sau:

1. Giải mã Punycode cho tên miền của nhà phát hành. Xem [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Thay thế mọi ký tự "<code>-</code>" (dấu gạch ngang) trong phần đầu ra của bước 1 bằng "<code>--</code>" (2 dấu gạch ngang).
3. Thay thế mọi ký tự "`.`" (dấu chấm) trong phần đầu ra của bước 2 bằng "`-`" (dấu gạch ngang).
4. Nếu đầu ra của bước 3 có một "`-`" (dấu gạch ngang) ở cả vị trí 3 và 4, thêm một tiền tố "`0-`" và một hậu tố "`-0`" vào đầu ra của bước 3. Xem [#26205](https://github.com/ampproject/amphtml/issues/26205) để biết nền.
5. Mã hóa Punycode cho đầu ra của bước 3. Xem [RFC 3492](https://tools.ietf.org/html/rfc3492)

Một vài ví dụ về thuật toán cơ bản:

<table>
  <tr>
   <td>
<strong>Tên miền của Nhà phát hành</strong>
   </td>
   <td>
<strong>Tiền tố Tên miền</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

Sau khi chạy thuật toán cơ bản, nếu và chỉ nếu tiền tố tên miền không phải là một nhãn DNS hợp lệ, chúng ta sẽ chạy Thuật toán Dự phòng như được mô tả dưới đây.

Tiền tố tên miền không phải là một nhãn DNS hợp lệ nếu nó dài hơn 63 ký tự

### Thuật toán Dự phòng

Thuật toán dự phòng để chuyển đổi một tên miền của nhà phát hành thành một tiền tố tên miền là như sau:

1. Băm tên miền của nhà phát hành bằng SHA256.
2. Thoát Base32 cho đầu ra của bước 1.
3. Xóa 4 ký tự cuối cùng khỏi đầu ra của bước 2, vốn là các ký tự `=` (dấu bằng).

Thuật toán sẽ tạo một chuỗi 52 ký tự như sau, không có dấu `-` (dấu gạch ngang): `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### Thuật toán Tổng hợp

Thuật toán tổng hợp là:

1. Chạy Thuật toán Cơ bản. Nếu đầu ra là một nhãn DNS hợp lệ, chèn hậu tố tên miền Bộ nhớ đệm và trả về, ví dụ như `example-com.cdn.ampproject.org`. Nếu không, chuyển sang bước 2.
2. Chạy Thuật toán Dự phòng. Chèn hậu tố tên miền Bộ nhớ đệm và trả về, ví dụ như: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

## Đường dẫn URL

“Đường dẫn” của một URL trên Bộ nhớ đệm AMP luôn bao gồm một hoặc nhiều thư mục tiền tố, ví dụ như `/c`, theo sau là một trung tố `/s` chỉ khi URL nhà phát hành là http `s`, theo sau là URL của tài liệu nhà phát hành mà không chứa giao thức.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Image displaying cached URL formats') }}

Các thư mục tiền tố, ví dụ như `/c` tương ứng với các kiểu phục vụ khác nhau của một Bộ nhớ đệm AMP. Các Bộ nhớ đệm AMP khác nhau có thể hỗ trợ các kiểu phục vụ khác nhau, và đây không phải là một danh sách đầy đủ:

- `/c` - <strong>C</strong>ontent (Nội dung): Đây là một tài liệu AMP được phục vụ như một trang độc lập và có thể được liên kết trực tiếp trong một số giao diện.
- `/v` - <strong>V</strong>iewer (Trình xem): Đây cũng là một tài liệu AMP, nhưng được phục vụ trong một [AMP Viewer](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer) (Trình xem AMP), vốn là một môi trường khung hiển thị tài liệu AMP trong một ngữ cảnh của một Trang Kết quả Tìm kiếm hoặc một giao diện khác.
- `/wp` - <strong>W</strong>eb <strong>P</strong>ackage (Gói tin Web): Đây là một tài liệu AMP được phục vụ như [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/) (Tín hiệu được Ký nhận), một công nghệ Gói tin Web. Các URL sẽ chuyển hướng đến nguồn của chính nhà phát hành.
- `/cert` - <strong>Cert</strong>ificate (Chứng nhận): Đây là một chứng nhận công khai để sử dụng với một [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/) (Tín hiệu được Ký nhận).
- `/i` - <strong>I</strong>mage (Ảnh): Đây là một ảnh được phục vụ bởi bộ nhớ đệm AMP, thông thường như một tài nguyên con của tài liệu.
- `/ii` - <strong>I</strong>mage (Ảnh): Đây cũng là một ảnh được phục vụ bởi Bộ nhớ đệm AMP, nhưng thường có thể được kết hợp với các tham số cấu hình bộ nhớ đệm khác như `/ii/w800`, chỉ báo một chiều rộng tối đa được yêu cầu bởi tài liệu. Bộ nhớ đệm có thể tạo các ảnh với một tỷ lệ khác nhau để tiết kiệm băng thông cho trình duyệt.

Ngoài ra, các Bộ nhớ đệm AMP có thể chèn những tham số truy vấn đặc biệt vào URL tài liệu, vốn không thuộc truy vấn tài liệu của nhà phát hành. Ví dụ, [`<amp-live-list>`](../../../components/reference/amp-live-list.md) sẽ thực hiện các yêu cầu làm mới bằng cách truy xuất một tài liệu với tham số `amp_latest_update_time<`. Các tham số này không được truyền đến nguồn khi tài liệu này được crawl, nhưng phải có để cấu hình yêu cầu đến Bộ nhớ đệm AMP.

## Nguồn CORS

Rất nhiều nhà phát hành sử dụng các yêu cầu CORS từ tài liệu AMP để truy xuất dữ liệu bổ sung. Các yêu cầu CORS hoạt động bằng cách gửi đi một đầu đề `Origin:` HTTP trong yêu cầu, nêu rõ nguồn gốc của tài liệu đang thực hiện yêu cầu. Như có thể thấy ở trên, nguồn của tài liệu trên một Bộ nhớ đệm AMP khác với nguồn trên tài liệu gốc. Trong phần tên miền ở trên, bạn có thể thấy các thuật toán để xác định Nguồn của một URL Bộ nhớ đệm AMP khi được cho một URL nhà phát hành. Dưới đây là thuật toán đảo ngược để truy vết một đầu đề yêu cầu CORS `Origin:` về tên miền của nhà phát hành gốc.

### Từ Nguồn của Bộ nhớ đệm AMP đến Tên miền của Nhà phát hành

Giá trị đầu đề Nguồn của Bộ nhớ đệm AMP sẽ trông như một ví dụ sau đây:

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

Trước tiên, hãy xóa tiền tố giao thức (`https://`) và hậu tố tên miền Bộ nhớ đệm AMP ví dụ như `.cdn.ampproject.org`. Hậu tố này có thể là từ một trong các bộ nhớ đệm được liệt kê trong [caches.json](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). Chuỗi còn lại sẽ là “tiền tố tên miền”. Trong trường hợp của 2 ví dụ ở trên, “tiền tố tên miền” là:

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

Tiếp đó, hãy kiểm tra để xem liệu “tiền tố tên miền” có chứa ít nhất một ‘<code>-</code>’ (dấu gạch ngang) hay không. Việc có một hoặc nhiều dấu gạch ngang là rất phổ biến. Nếu “tiền tố tên miền” không chứa ít nhất một ‘<code>-</code>’ (dấu gạch ngang), Nguồn của Bộ nhớ đệm AMP không thể được đảo ngược trực tiếp. Thay vào đó, nếu bạn biết nhóm các tên miền của nhà phát hành khả dĩ, bạn có thể tạo nhóm các Nguồn của Bộ nhớ đệm AMP sử dụng thuật toán Tên miền ở phần trên của tài liệu này. Sau đó, bạn có thể xác thực nó với một nhóm cố định.

Phần còn lại của thuật toán giả sử rằng “tiền tố tên miền” có chứa ít nhất một ‘`-`’ (dấu gạch ngang).

1. Nếu tiền tố tên miền bắt đầu bằng `xn--`, giải mã punycode cho “tiền tố tên miền”. Ví dụ, `xn---com-p33b41770a` sẽ trở thành `⚡😊-com`. Xem [RFC 3492](https://tools.ietf.org/html/rfc3492) cho punycode.
2. Nếu tiền tố tên miền bắt đầu bằng "`0-`" và kết thúc bằng "`-0`", xóa cả hai tiền tố "`0-`" và hậu tố "-0".
3. Lặp lại tuần tự cho tất cả các ký tự đầu ra của Bước 2, phát chúng ra khi gặp. Khi bạn gặp một "`-`" (dấu gạch ngang), kiểm tra nhanh ký tự tiếp theo. Nếu ký tự tiếp theo cũng là một "`-`" (dấu gạch ngang), bỏ qua cả hai ký tự ở phần nhập liệu và phát ra một "`-`" (dấu ngạch ngang). Nếu ký tự tiếp theo là một ký tự khác, chỉ bỏ qua "`-`" (dấu gạch ngang) hiện tại và phát ra một "`.`" (dấu chấm). Ví dụ, `a--b-example-com` sẽ trở thành `a-b.example.com`.
4. Mã hóa Punycode cho kết quả của Bước 3. Xem [RFC 3492](https://tools.ietf.org/html/rfc3492) cho punycode.

Kết quả của Bước 4 sẽ là Tên miền của Nhà phát hành. Giao thức này không khả dụng từ bản thân tên miền, mà là `http` hoặc `https`. Đây luôn là cổng mặc định cho giao thức này.

## Xử lý Chuyển hướng & Lỗi

Sau đây là một số ví dụ về cách Bộ nhớ đệm AMP xử lý chuyển hướng và lỗi:

**Chuyển hướng**

Bộ nhớ đệm AMP sẽ tuân theo lệnh chuyển hướng khi giải quyết URL AMP. Ví dụ, nếu một URL chuyển hướng đến một URL AMP khác:

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

Bộ nhớ đệm AMP sẽ trả về nội dung của lệnh chuyển hướng đã được giải quyết cho URL gốc.

Ví dụ: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

Quan trọng: Nếu bạn di chuyển địa điểm của các tập tin AMP trên máy chủ của mình, hãy nhớ thiết lập một lệnh chuyển hướng từ địa điểm cũ sang địa điểm mới.

**Không tìm thấy**

Khi không thể tìm thấy một trang nào đó trong Bộ nhớ đệm AMP, nó sẽ hiển thị một trang lỗi và trả về trạng thái 404.

Ví dụ: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**AMP không hợp lệ**

Khi một trang không phải là AMP hợp lệ, Bộ nhớ đệm AMP sẽ chuyển hướng đến trang chính thức.

Ví dụ: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**Lỗi Máy chủ**

Nếu một URL trả về lỗi máy chủ 5XX, Bộ nhớ đệm AMP sẽ trả về một trạng thái 404.

Ví dụ: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)

---
'$title': CORS trong AMP
$order: 12
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: Rất nhiều thành phần và phần mở rộng AMP tận dụng các điểm cuối từ xa bằng cách sử dụng
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cors-requests.md.
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

Rất nhiều thành phần và phần mở rộng AMP tận dụng các điểm cuối từ xa bằng cách sử dụng các yêu cầu Chia sẻ Tài nguyên Nhiều Nguồn gốc (CORS). Tài liệu này giải thích các khía cạnh chính của việc sử dụng CORS trong AMP. Để tìm hiểu về CORS, hãy tham khảo [Thông số W3 CORS](https://www.w3.org/TR/cors/).

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin-" data-md-type="link">Vì sao tôi cần CORS cho nguồn gốc của mình?</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">Sử dụng cookie cho các yêu cầu CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">Bảo mật cho CORS trong AMP</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">Xác minh các yêu cầu CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) Cho phép những yêu cầu cho các nguồn gốc CORS cụ thể</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) Cho phép những yêu cầu có cùng nguồn gốc</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">Gửi đầu đề hồi đáp CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<a href="#access-control-allow-origin-origin" data-md-type="link">Access-Control-Allow-Origin (Kiểm soát-Truy cập-Cho phép-Nguồn gốc): </a>
</li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">Xử lý các yêu cầu thay đổi trạng thái</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">Hướng dẫn ví dụ: Xử lý các yêu cầu và hồi đáp CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">Kiểm tra CORS trong AMP</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## Vì sao tôi cần CORS cho nguồn gốc của mình? <a name="why-do-i-need-cors-for-my-own-origin"></a>

Bạn có thể tự hỏi vì sao mình cần CORS cho các yêu cầu cho nguồn gốc của chính mình, hãy cùng phân tích về nó.

Các thành phần AMP truy xuất dữ liệu động (ví dụ amp-form, amp-list, v.v.) đưa ra các yêu cầu CORS cho các điểm cuối từ xa để truy xuất dữ liệu. Nếu trang AMP của bạn bao gồm các thành phần đó, bạn sẽ cần xử lý CORS để các yêu cầu đó không thất bại.

Hãy cùng minh họa điều này bằng một ví dụ:

Giả sử rằng bạn có một trang AMP liệt kê các sản phẩm kèm giá. Để cập nhật giá trên trang này, người dùng sẽ nhấn vào một nút để truy xuất giá mới nhất từ một điểm cuối JSON (thực hiện thông qua thành phần amp-list). JSON nằm trên tên miền của bạn.

Vậy là, trang này nằm _trên tên miền của tôi_ và JSON nằm _trên tên miền của tôi_. Tôi không thấy vấn đề gì!

À, nhưng làm thế nào người dùng của bạn có thể truy cập trang AMP của bạn? Liệu có một trang bộ nhớ đệm mà họ có thể truy cập? Nhiều khả năng người dùng của bạn đã không truy cập trực tiếp đến trang AMP của bạn, mà thay vào đó, họ khám phá trang của bạn thông qua một nền tảng khác. Ví dụ, Google Search sử dụng Bộ nhớ đệm AMP của Google để render nhanh các trang AMP; đây là các trang trong bộ nhớ đệm được phục vụ từ một Bộ nhớ đệm AMP của Google, nằm trên một tên miền khác. Khi người dùng của bạn nhấn vào nút để cập nhật giá trên trang của bạn, trang AMP trong bộ nhớ đệm này sẽ gửi một yêu cầu đến tên miền nguồn gốc của bạn để nhận giá, vốn không khớp giữa các nguồn gốc (bộ nhớ đệm -> tên miền nguồn gốc). Để cho phép các yêu cầu chéo nguồn gốc này, bạn cần xử lý CORS, nếu không, yêu cầu này sẽ thất bại.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS và bộ nhớ đệm" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**Được rồi, vậy tôi nên làm gì?**

1. Đối với các trang AMP truy xuất dữ liệu động, hãy đảm bảo bạn kiểm tra phiên bản trong bộ nhớ đệm của các trang đó; _đừng chỉ kiểm tra trên tên miền của bạn_. (Xem phần [Kiểm tra CORS trong AMP](#testing-cors-in-amp) dưới đây)
2. Làm theo các hướng dẫn trong tài liệu này để xử lý các yêu cầu và hồi đáp CORS.

## Sử dụng cookie cho các yêu cầu CORS <a name="utilizing-cookies-for-cors-requests"></a>

Hầu hết các thành phần AMP sử dụng các yêu cầu CORS đều tự động thiết lập [chế độ chứng nhận](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) hoặc cho phép tác giả bật nó như một tùy chọn. Ví dụ, thành phần[`amp-list`](https://amp.dev/documentation/components/amp-list) truy xuất nội dung động từ một điểm cuối CORS JSON, và cho phép tác giả thiết lập chế độ chứng nhận thông qua thuộc tính `credentials` (chứng nhận).

_Ví dụ: Bao gồm nội dung cá nhân hóa trong một amp-list thông qua các cookie_

[sourcecode:html]
<amp-list
credentials="include"
src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"

>   <template type="amp-mustache">

    Your personal offer: ${% raw %}{{price}}{% endraw %}

  </template>
</amp-list>
[/sourcecode]

Thông qua việc quy định chế độ chứng nhận, nguồn gốc có thể bao gồm các cookie trong yêu cầu CORS và đồng thời thiết lập cookie để đáp lại (tùy theo [các hạn chế đối với cookie của bên thứ ba](#third-party-cookie-restrictions)).

### Các hạn chế đối với cookie của bên thứ ba <a name="third-party-cookie-restrictions"></a>

Các hạn chế đối với cookie của bên thứ ba được quy định trong trình duyệt cũng áp dụng cho các yêu cầu CORS được chứng nhận trong AMP. Các hạn chế này tùy thuộc vào trình duyệt và nền tảng, còn đối với một số trình duyệt, nguồn gốc chỉ có thể thiết lập cookie nếu người dùng trước đó đã truy cập nguồn gốc trong một cửa sổ bên thứ nhất (trên cùng). Hoặc, nói một cách khác, chỉ sau khi người dùng đã truy cập trực tiếp website nguồn gốc. Do đó, một dịch vụ được truy cập thông qua CORS không thể giả sử rằng nó có thể thiết lập cookie theo mặc định.

## Bảo mật cho CORS trong AMP <a name="cors-security-in-amp"></a>

Để đảm bảo các yêu cầu và hồi đáp hợp lệ và bảo mật cho các trang AMP, bạn phải:

1. [Xác minh yêu cầu](#verify-cors-requests).
2. [Gửi các đầu đề hồi đáp phù hợp](#send-cors-response-headers).

Nếu bạn đang sử dụng Node trong backend của mình, bạn có thể sử dụng [phần mềm trung gian AMP CORS](https://www.npmjs.com/package/amp-toolbox-cors), vốn là một phần của [Hộp công cụ AMP](https://github.com/ampproject/amp-toolbox).

### Xác minh các yêu cầu CORS <a name="verify-cors-requests"></a>

Khi điểm cuối của bạn nhận được một yêu cầu CORS:

1. [Xác minh rằng đầu đề CORS <code>Origin</code> là một nguồn gốc được cho phép (nguồn gốc của nhà phát hành + bộ nhớ đệm AMP)](#verify-cors-header).
2. [Nếu không có một đầu đề Nguồn gốc, kiểm tra rằng yêu cầu đó là từ cùng một nguồn gốc (thông qua `AMP-Same-Origin`)](#allow-same-origin-requests).

#### 1) Cho phép những yêu cầu cho các nguồn gốc CORS cụ thể <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

Các điểm cuối CORS nhận nguồn gốc yêu cầu thông qua đầu đề HTTP của `Origin` (Nguồn gốc). Các điểm cuối chỉ nên cho phép các yêu cầu từ: (1) nguồn gốc của riêng nhà phát hành; và (2) mỗi nguồn gốc `cacheDomain` được liệt kê trong [https://ampjs.org/caches.json](https://ampjs.org/caches.json).

Ví dụ, các điểm cuối nên cho phép các yêu cầu từ:

- Tên miền con Bộ nhớ đệm AMP của Google: `https://<tên miền của nhà phát hành>.cdn.ampproject.org` <br>(ví dụ, `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] Để biết thêm thông tin về định dạng URL của Bộ nhớ đệm AMP, hãy xem các tài nguyên sau:

- [Google AMP Cache Overview](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) Cho phép những yêu cầu có cùng nguồn gốc <a name="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

Đối với các yêu cầu cùng nguồn gốc mà ở đó đầu đề `Origin` (Nguồn gốc) còn thiếu, AMP thiết lập đầu đề tùy chỉnh sau đây:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

Đầu đề tùy chỉnh này được gửi bởi Thời gian chạy AMP khi một yêu cầu XHR được thực hiện trên cùng nguồn gốc (nghĩa là, tài liệu được phục vụ từ một URL không có trong bộ nhớ đệm). Cho phép các yêu cầu chứa đầu đề `AMP-Same-Origin:true`.

### Gửi đầu đề hồi đáp CORS <a name="send-cors-response-headers"></a>

Sau khi xác minh yêu cầu CORS, kết quả hồi đáp HTTP phải chứa các đầu đề sau:

##### Access-Control-Allow-Origin (Kiểm soát-Truy cập-Cho phép-Nguồn gốc): &lt;origin&gt; <a name="access-control-allow-origin-origin"></a>

Đầu đề này là một yêu cầu <a href="https://www.w3.org/TR/cors/">Thông số W3 CORS</a>, ở đó <code>origin</code> (nguồn gốc) là nguồn gốc yêu cầu đã được cho phép thông qua đầu đề yêu cầu <code>Origin</code> CORS (ví dụ, <code>"https://&lt;tên miền con của nhà phát hành>.cdn.ampproject.org"</code>).

Tuy thông số W3 CORS cho phép giá trị <code>\*</code> được trả về trong hồi đáp, để đảm bảo bảo mật, bạn nên:

- Nếu đầu đề `Origin` (Nguồn gốc) tồn tại, xác thực và lặp lại giá trị của đầu đề <code>Origin</code>.

### Xử lý các yêu cầu thay đổi trạng thái <a name="processing-state-changing-requests"></a>

[tip type="important"] Thực hiện các kiểm tra xác thực này _trước khi_ bạn xử lý yêu cầu. Việc xác thực này giúp bảo vệ chống lại các cuộc tấn công CSRF, và tránh việc xử lý yêu cầu từ các nguồn không được tin tưởng. [/tip]

Trước khi xử lý các yêu cầu có thể thay đổi trạng thái của hệ thống (ví dụ, một người dùng đăng ký hoặc bỏ đăng ký khỏi một danh sách nhận thư), kiểm tra những điều sau:

**Nếu đầu đề `Origin` được thiết lập:**:

1. Nếu nguồn gốc không khớp với một trong các giá trị sau đây, dừng và trả về một hồi đáp lỗi:

   - `<tên miền của nhà phát hành>.cdn.ampproject.org`
   - nguồn gốc của nhà phát hành (nghĩa là bạn)

   ở đó `*` là một kết quả khớp ký tự đại diện, chứ không phải là một dấu hoa thị thật ( \* ).

2. Nếu không, xử lý yêu cầu.

**Nếu đầu đề `Origin` KHÔNG được thiết lập:**:

1. Xác minh rằng yêu cầu này chứa đầu đề `AMP-Same-Origin: true`. Nếu yêu cầu không chứa đầu đề này, dừng và trả về một hồi đáp lỗi.
2. Nếu không, xử lý yêu cầu.

## Hướng dẫn ví dụ: Xử lý các yêu cầu và hồi đáp CORS <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

Có 2 tình huống cần tính đến trong các yêu cầu CORS đến điểm cuối của bạn:

1. Một yêu cầu từ cùng một nguồn gốc.
2. Một yêu cầu từ một nguồn gốc trong bộ nhớ đệm (từ một Bộ nhớ đệm AMP).

Hãy cùng xem kỹ các tình huống này với một ví dụ. Trong ví dụ này, chúng ta quản lý website `example.com` lưu trữ một trang AMP tên là `article-amp.html.`. Trang AMP này chứa một `amp-list` để truy xuất dữ liệu động từ một tập tin `data.json` cũng được lưu trữ trên `example.com`. Chúng ta muốn xử lý các yêu cầu đến tập tin `data.json` từ trang AMP của mình. Các yêu cầu này có thể là từ trang AMP trên cùng một nguồn gốc (không phải trong bộ nhớ đệm) hoặc từ trang AMP trên một nguồn gốc khác (được lưu trong bộ nhớ đệm).

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="Ví dụ CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### Các nguồn gốc được cho phép <a name="allowed-origins"></a>

Dựa trên những gì chúng ta biết về CORS và AMP (từ phần [Xác minh các yêu cầu CORS](#verify-cors-requests) ở trên), trong ví dụ này, chúng ta sẽ cho phép các yêu cầu từ những tên miền sau:

- `example.com` --- Tên miền của nhà phát hành
- `example-com.cdn.ampproject.org` --- Tên miền con Bộ nhớ đệm AMP của Google

### Đầu đề hồi đáp cho các yêu cầu được cho phép <a name="response-headers-for-allowed-requests"></a>

Đối với các yêu cầu từ những nguồn gốc được cho phép, hồi đáp của chúng ta sẽ chứa các đầu đề sau:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

Đây là các đầu đề hồi đáp bổ sung mà chúng ta có thể bao gồm trong hồi đáp CORS của mình:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### Lôgic CORS giả <a name="pseudo-cors-logic"></a>

Lôgic xử lý các yêu cầu và hồi đáp CORS của chúng ta có thể được đơn giản hóa thành mã giả sau:

[sourcecode:text]
IF CORS header present
IF origin IN allowed-origins
allow request & send response
ELSE
deny request
ELSE
IF "AMP-Same-Origin: true"
allow request & send response
ELSE
deny request
[/sourcecode]

#### Code mẫu CORS <a name="cors-sample-code"></a>

Đây là một chức năng JavaScript mẫu mà chúng ta có thể sử dụng để xử lý các yêu cầu và hồi đáp CORS:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var origin;
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
'https://cdn.ampproject.org',
];
var allowedSourceOrigin = 'https://example.com'; //publisher's origin
// If same origin
if (req.headers['amp-same-origin'] == 'true') {
origin = sourceOrigin;
// If allowed CORS origin & allowed source origin
} else if (
allowedOrigins.indexOf(req.headers.origin) != -1 &&
sourceOrigin == allowedSourceOrigin
) {
origin = req.headers.origin;
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}

res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**Lưu ý**: Để có một code mẫu hoạt động tốt, hãy xem [amp-cors.js](https://github.com/ampproject/amphtml/blob/main/build-system/server/amp-cors.js).

### Tình huống 1: Nhận yêu cầu từ trang AMP trên cùng một nguồn gốc <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

Trong tình huống sau, trang `article-amp.html` yêu cầu tập tin `data.json`; nguồn gốc của chúng là giống nhau.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="Ví dụ CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

Nếu chúng ta xem kỹ yêu cầu, chúng ta sẽ thấy:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

Bởi yêu cầu này đến từ cùng một nguồn gốc, không có đầu đề `Origin` nào, nhưng đầu đề yêu cầu AMP tùy chỉnh của `AMP-Same-Origin: true` vẫn tồn tại. Chúng ta có thể cho phép yêu cầu này bởi nó đến từ cùng một nguồn gốc (`https://example.com`).

Đầu đề hồi đáp của chúng ta sẽ là:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### Tình huống 2: Nhận yêu cầu từ trang AMP trong bộ nhớ đệm <a name="scenario-2-get-request-from-cached-amp-page"></a>

Trong tình huống sau, trang `article-amp.html` được lưu trong Bộ nhớ đệm AMP của Google yêu cầu tập tin `data.json`; nguồn gốc của chúng là khác nhau.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="Ví dụ CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

Nếu chúng ta xem kỹ yêu cầu này, chúng ta sẽ thấy:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

Bởi yêu cầu này chứa một đầu đề `Origin` (Nguồn gốc), chúng ta sẽ xác minh rằng nó đến từ một nguồn gốc được cho phép. Chúng ta có thể cho phép yêu cầu này bởi nó đến từ một nguồn gốc được cho phép.

Đầu đề hồi đáp của chúng ta sẽ là:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## Làm việc với các phông chữ trong bộ nhớ đệm <a name="working-with-cached-fonts"></a>

Bộ nhớ đệm AMP của Google lưu các tài liệu, ảnh và phông chữ AMP HTML để tối ưu tốc độ của trang AMP. Ngoài việc đảm bảo các trang AMP được tải nhanh, chúng ta còn muốn bảo mật cho các tài nguyên trong bộ nhớ đệm. Chúng ta sẽ thay đổi cách bộ nhớ đệm AMP hồi đáp cho các tài nguyên được lưu trong bộ nhớ đệm, thường là các phông chữ, bằng cách tôn trọng giá trị `Access-Control-Allow-Origin` (Kiểm soát-Truy cập-Cho phép-Nguồn gốc) của nguồn gốc đó.

### Hành vi trước đây (trước tháng 10 năm 2019) <a name="past-behavior-before-october-2019"></a>

Khi một trang AMP đang tải `https://example.com/some/font.ttf` từ thuộc tính `@font-face src`, Bộ nhớ đệm AMP sẽ lưu tập tin phông chữ và phục vụ tài nguyên đó như dưới đây và với ký tự đại diện `Access-Control-Allow-Origin` (Kiểm soát-Truy cập-Cho phép-Nguồn gốc).

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: \*

### Hành vi mới (từ tháng 10 năm 2019 về sau) <a name="new-behavior-october-2019-and-after"></a>

Bởi việc triển khai hiện tại là cho phép theo mặc định, điều này có thể dẫn đến những ứng dụng ngoài kỳ vọng của phông chữ từ các website có nguồn gốc chéo. Trong thay đổi này, Bộ nhớ đệm AMP sẽ bắt đầu hồi đáp với cùng giá trị `Access-Control-Allow-Origin` (Kiểm soát-Truy cập-Cho phép-Nguồn gốc) được máy chủ nguồn gốc hồi đáp. Để tải đúng cách phông chữ từ tài liệu AMP trong bộ nhớ đệm, bạn sẽ cần chấp nhận nguồn gốc Bộ nhớ đệm AMP thông qua đầu đề.

Một việc triển khai mẫu sẽ là:

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
];
// If allowed CORS origin
if (allowedOrigins.indexOf(req.headers.origin) != -1) {
res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}
}
[/sourcecode]

Ví dụ, nếu bạn muốn tải /some/font.ttf trong `https://example.com/amp.html`, máy chủ nguồn gốc sẽ hồi đáp với đầu đề Access-Control-Allow-Origin (Kiểm soát-Truy cập-Cho phép-Nguồn gốc) như dưới đây.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="Ví dụ về phông chữ CORS" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] Nếu tập tin phông chữ của bạn cho phép việc truy cập từ bất kỳ nguồn gốc nào, bạn có thể hồi đáp với một thẻ ký tự đại diện `Access-Control-Allow-Origin` (Kiểm soát-Truy cập-Cho phép-Nguồn gốc), bộ nhớ đệm AMP cũng sẽ lặp lại giá trị này, đồng nghĩa nó sẽ được hồi đáp với `Access-Control-Allow-Origin: *`. Nếu bạn đã có cài đặt này thì không cần thay đổi thứ gì. [/tip]

Chúng tôi dự tính thực hiện thay đổi này vào khoảng giữa tháng 10 năm 2019 và kỳ vọng tất cả các nhà phát hành AMP có phông chữ tự lưu trữ đều kiểm tra xem liệu họ có bị ảnh hưởng hay không.

#### Kế hoạch triển khai <a name="roll-out-plan"></a>

- 2019-09-30: bản phát hành cho phép kiểm soát chi tiết hơn các tên miền được áp dụng thay đổi này. Bản dựng này sẽ được triển khai dần dần trong tuần này.
- 2019-10-07: các tên miền kiểm tra cần được bật để kiểm tra thủ công.
- 2019-10-14: (nhưng tùy thuộc vào việc kiểm tra thực tế): tính năng này sẽ được triển khai tổng quát.

Theo dõi [vấn đề liên quan ở đây.](https://github.com/ampproject/amphtml/issues/24834)

## Kiểm tra CORS trong AMP <a name="testing-cors-in-amp"></a>

Khi bạn đang kiểm tra các trang AMP của mình, hãy đảm bảo bạn bao gồm kiểm tra từ các phiên bản trong bộ nhớ đệm của trang AMP của mình.

### Xác minh trang thông qua URL bộ nhớ đệm <a name="verify-the-page-via-the-cache-url"></a>

Để đảm bảo trang AMP trong bộ nhớ đệm của bạn render và hoạt động đúng cách:

1. Từ trình duyệt của bạn, mở URL mà Bộ nhớ đệm AMP sẽ sử dụng để truy cập trang AMP của bạn. Bạn có thể xác định định dạng URL bộ nhớ đệm từ [công cụ này trên AMP By Example](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/).

   Ví dụ:

   - URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
   - Định dạng URL Bộ nhớ đệm AMP: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. Mở công cụ phát triển trình duyệt của bạn và xác minh rằng không có lỗi nào và tất cả các tài nguyên đều được tải đúng cách.

### Xác minh đầu đề hồi đáp cho máy chủ của bạn <a name="verify-your-server-response-headers"></a>

Bạn có thể sử dụng lệnh `curl` để xác minh rằng máy chủ của mình đang gửi đi đúng đầu đề hồi đáp HTTP. Trong lệnh `curl`, cung cấp URL yêu cầu và mọi đầu đề tùy chỉnh mà bạn muốn thêm.

**Cú pháp**: `curl <request-url> -H <custom-header> - I`

#### Yêu cầu kiểm tra từ cùng một nguồn gốc <a name="test-request-from-same-origin"></a>

Trong yêu cầu cùng nguồn gốc, hệ thống AMP sẽ bổ sung đầu đề `AMP-Same-Origin:true` tùy chỉnh.

Đây là lệnh curl của chúng ta để kiểm tra một yêu cầu từ `https://ampbyexample.com` đến tập tin `examples.json` (trên cùng một tên miền):

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

Kết quả từ lệnh phải hiển thị đúng đầu đề hồi đáp (lưu ý: thông tin bổ sung đã bị lược bớt):

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### Yêu cầu kiểm tra từ trang AMP trong bộ nhớ đệm <a name="test-request-from-cached-amp-page"></a>

Trong một yêu cầu CORS không phải từ cùng một tên miền (ví dụ: bộ nhớ đệm), đầu đề `origin` (nguồn gốc) là một phần của yêu cầu.

Đây là lệnh curl của chúng ta để kiểm tra một yêu cầu từ trang AMP trong bộ nhớ đệm trên Bộ nhớ đệm AMP của Google đến tập tin `examples.json`:

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

Kết quả từ lệnh phải hiển thị đúng đầu đề hồi đáp:

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```

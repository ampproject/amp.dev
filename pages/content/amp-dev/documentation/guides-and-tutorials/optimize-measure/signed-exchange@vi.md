---
"$title": Phục vụ AMP bằng trao đổi nội dung đã kí danh
"$order": '4'
formats:
- websites
author: CrystalOnScript
---

AMP mang đến những lợi ích về tốc độ vượt xa phần định dạng thông qua những kĩ thuật như lưu bộ nhớ đệm và tải trước. Những lợi ích này có thể có [những mặt trái](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/) như có thêm nhiều URL được hiển thị khi được nhúng bên trong một [Trình xem AMP](https://developers.google.com/search/docs/guides/about-amp). Bằng cách phân phát nội dung AMP bằng trao đổi nội dung đã kí danh, bạn có thể dùng tính năng mới trong nền tảng web để vượt qua tất cả những mặt trái này.

Một [trao đổi nội dung đã kí danh](https://developers.google.com/web/updates/2018/11/signed-exchanges) bao gồm một tài liệu AMP hợp lệ và URL gốc của nội dung. Thông tin này được bảo vệ bởi những chữ kí kỹ thuật số, vốn liên kết bảo mật tài liệu này với URL của nó. Điều này giúp các trình duyệt hiển thị an toàn URL gốc trong thanh URL thay vì tên máy chủ phân phối các byte đến trình duyệt.

Nội dung AMP đã kí danh được chuyển phát *thêm vào* (chứ không thay thế) nội dung AMP thông thường.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"] Tính năng này hiện được hỗ trợ ở Chrome, nhưng việc thực thi được lên kế hoạch cho những trình duyệt khác. [/tip]

# Liệu trao đổi nội dung đã kí danh có hiệu quả đối với tôi?

Để thực thi trao đổi nội dung đã kí danh, bạn phải đáp ứng những yêu cầu sau:

- Khả năng cấu hình và kiểm soát các header HTTP được máy chủ tạo ra. (Phần lớn những giải pháp đặt máy chủ trên cơ sở web thuần tuý như Blogger đều *không* tương thích với trao đổi nội dung đã kí danh.)
- Khả năng tạo trao đổi nội dung đã kí danh của AMP, chẳng hạn bằng cách chạy [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md), như một [Go binary](https://golang.org/doc/install), hoặc bên trong một [Docker VM](https://docs.docker.com/machine/get-started/).
    - Trình đóng gói cần được cập nhật sau mỗi sáu tuần.
- Khả năng thực hiện tác vụ [Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) lên header `Accept` và `AMP-Cache-Transform` trên các máy chủ HTTP rìa, trả về nội dung khác nhau cho cùng URL.
- Hệ thống chạy `amppackager` cần phải thực hiện được những yêu cầu mạng gửi đi đến:
    - Cơ quan chứng chỉ cung cấp chứng chỉ của bạn
    - Máy chủ nhà phát hành lưu trữ những tài liệu AMP cần kí danh
    - `cdn.ampproject.org` để có được phiên bản hiện tại của AMP
- Một hệ thống file lưu trữ bền được chia sẻ cho tất cả các thể hiện của `amppackager` chạy trong cùng trung tâm dữ liệu.

# Thực thi trao đổi nội dung đã kí danh

Dưới đây là trình tự được đề xuất cho việc thực thi để hỗ trợ trao đổi nội dung đã kí danh trên những tài liệu AMP.

## Đạt một chứng chỉ TLS được hỗ trợ

Để tạo trao đổi nội dung đã kí danh, bạn cần một chứng chỉ TLS với mở rộng `CanSignHttpExchanges`. Tính đến tháng Tư 2019, [DigiCert](https://www.digicert.com/) là nhà cung cấp duy nhất của mở rộng này ([thông tin thêm](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)).

Để tạo chứng chỉ này, Cơ quan chứng chỉ (CA) sẽ cần có một Yêu cầu kí chứng chỉ (CSR), vốn có thể được tạo ra bằng `openssl`. Một ví dụ về CSR cho `ampbyexample.com`:

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## Xác định URL nào sẽ được kí danh

Bạn sẽ cần tạo một mẫu hình URL định ra tài liệu nào cần được kí danh. Điều quan trọng là nội dung riêng tư, chẳng hạn thông tin được cá nhân hoá không cần phải kí, để tránh gửi đi thông tin sai lệch hay không chính xác.

Vì mục đích hiệu năng, trình đóng gói chỉ cần được đưa qua những tài liệu AMP hợp lệ làm đầu vào. Một số tài liệu AMP không hợp lệ cũng ổn nếu cần thiết, nhưng bạn nên tránh gửi đi mọi lưu lượng quá trình đóng gói.

## Triển khai trình đóng gói cho một máy chủ thử nghiệm

Trước tiên bạn cần thiết lập trao đổi nội dung đã kí danh trên một máy chủ thử nghiệm để xác minh việc thiết lập của bạn chính xác trước khi chuyển sang giai đoạn xuất ra.

Chúng tôi khuyến nghị dùng [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) để tạo trao đổi nội dung đã kí danh. Tuy nhiên nếu điều này không hợp cho môi trường sản xuất của bạn, bạn thay vào đó có thể dùng máy khách dòng lệnh [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) và [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange), và tự mình xử lí việc thoả thuận nội dung và các tác vụ quản lí chứng chỉ.

Những chỉ dẫn sau áp dụng cho những triển khai bằng `amppackager`.

### Cấu hình

Tập tin cấu hình (`amppkg.toml`) của [`amppackager`](https://github.com/ampproject/amppackager) yêu cầu **CertFile** và **KeyFile**.

**KeyFile** là khoá riêng tư (`ampbyexample-packager.key` trong ví dụ ở trên), và nó cần phải có định dạng sau. (Lưu ý: đừng chia sẻ khoá riêng tư của bạn, và chú ý không để lộ nó do sơ suất!)

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

**CertFile** là chứng chỉ công khai. Nếu DigiCert cung cấp chứng chỉ này, tập tin này có thể được tạo bằng cách ghép lại với nhau chứng chỉ chuyên cho nguồn gốc do DigiCert cung cấp và tập tin `DigiCertCA.crt`.

```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### Cài đặt

Làm theo những chỉ dẫn [ở đây để thiết lập `amppackager` cho website của bạn](https://github.com/ampproject/amppackager/blob/master/README.md).

[tip type="read-on"] Xem [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (được dùng bởi `amp.dev`) để biết một ví dụ về những thay đổi phía máy chủ mà bạn sẽ cần đến để định tuyến những yêu cầu bắt buộc đến `amppkg`. [/tip]

### Thử nghiệm

Xác minh rằng website thử nghiệm phản ứng với nội dung loại MIME `application/signed-exchange` khi được chỉ định bởi các yêu cầu HTTP (thay thế `staging.example.com` bằng máy chủ thử nghiệm của bạn):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

Đầu ra phải bao gồm dòng này:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] `v="1..100"` trong yêu cầu là một thuộc tính giữ chỗ. Đừng đưa vào giá trị chính xác; thay vào đó, như [được miêu tả trong những chỉ dẫn cài đặt amppackager](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing), hãy xem thử sự tồn tại của mỗi header `amp-cache-transform`, và bỏ qua phần giá trị. [/tip]

[tip type="important"] Chuỗi phiên bản `v=b3` trong phần đáp ứng là phiên bản tính đến tháng Tám 2019. Phiên bản này sẽ thay đổi. [/tip]

Phần lớn của đáp ứng nên là trang AMP của bạn (bằng văn bản thô). Có một header nhị nguyên nhỏ, và nếu trang >16kb thì một vài byte nhị nguyên rải rác khắp nơi.

[Công cụ `dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) có thể được dùng để kiểm xét phần đáp ứng:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(Lưu ý rằng chức năng chuyển `-verify` sẽ không hoạt động ở điểm này vì những chứng chỉ bắt buộc không nằm trên máy chủ `https://example.com/`.)

Xác minh rằng phần đáp ứng *luôn* bao gồm header `Vary` với giá trị `Accept,AMP-Cache-Transform` (bất luận loại MIME là `text/html`, `application/signed-exchange`, hay gì đó khác):

```sh
$ curl -si https://staging.example.com/ | less
```

Đầu ra này phải bao gồm dòng này:

```txt
vary: Accept,AMP-Cache-Transform
```

## Triển khai trình đóng gói cho giai đoạn sản xuất

### Cài đặt

Điều chỉnh các bước triển khai thử nghiệm bên trên sao cho phù hợp với môi trường sản xuất.

### Thử nghiệm

#### Với những công cụ dòng lệnh

Chạy thử những bài kiểm tra giống như trên. `dump-signedexchange -verify` giờ đây có thể cũng sẽ chạy được.

#### Với Chrome

Bạn còn có thể thừ nghiệm trong Chrome nhờ sự trợ giúp của [phần mở rộng ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en). Cài đặt nó từ Chrome Webstore và cấu hình `Request Headers` thành `amp-cache-transform` với `Value` là `google`.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testing Chrome with the help of the ModHeader extension', caption=' ', align='' ) }}

Sau khi yêu cầu `https://example.com/`, máy chủ của bạn sẽ phát một trao đổi nội dung đã kí danh, nhưng nó nên có diện mạo và cư xử y như trước. Bạn sẽ cần kiểm tra xem một trao đổi nội dung đã kí danh có được trả về chính xác qua [bảng điều khiển DevTools](https://developers.google.com/web/tools/chrome-devtools/) hay không.

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Signed exchange header displayed in the DevTools console', caption=' ', align='' ) }}

Bên dưới tab `Network`, nhấp vào tên miền của bạn và kiểm xem `trao đổi HTTP đã kí danh` có xuất hiện ở dưới phần `Xem trước` không.

#### Với Bộ nhớ đệm AMP của Google

Xác nhận rằng những trao đổi nội dung đã kí danh tương thích với bộ nhớ đệm AMP của Google. Điều này liên quan đến tính năng khám phá được trên những công cụ tìm kiếm như Google Tìm kiếm.

Để kiểm tra trao đổi nội dung đã kí danh trong bộ nhớ đệm AMP của Google, hãy mở tab mạng trong DevTools, bật `Preserve log`, và truy cập một URL, chẳng hạn như `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

DevTools sẽ hiển thị `200` với hàng `signed-exchange`, và hàng `from signed-exchange`, nếu yêu cầu thành công.

Nếu không thành công, những hàng trao đổi nội dung đã kí danh sẽ bị thiếu, hoặc chúng sẽ được đánh dấu màu đỏ. Một header `warning` cũng có thể có mặt để cung cấp thêm thông tin.

## Trao đổi nội dung đã kí danh trong Google Tìm kiếm

Nếu các trang AMP được phân phối thành công ở dạng trao đổi nội dung đã kí danh, những kết quả tìm kiếm của chúng sẽ hiển thị hình tia sét AMP, y như trước, nhưng khi chạm vào kết quả thì `https://example.com` sẽ hiện ở thanh URL, thay vì là một URL bắt đầu bằng `https://www.google.com/amp/….`. Ngoài ra, thanh `viewer` sẽ không xuất hiện.

Bên trong bảng điều khiển DevTools, bên dưới tab `network`, bạn sẽ thấy `signed-exchange` bên dưới cột `type`.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='Within the DevTools console, under the network tab, you will be able to see signed-exchange under the type column.', caption=' ', align='' ) }}

# Nhà cung cấp dịch vụ trao đổi nội dung đã kí danh

Đây là danh sách các CDN và nhà cung cấp máy chủ vốn mang đến phần hỗ trợ sáng tạo cho trao đổi nội dung đã kí danh. Dùng một trong những nhà cung cấp này là cách dễ nhất để bắt đầu với trao đổi nội dung đã kí danh:

- [AMP Packager Google Cloud Click-to-Deploy Installer](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) là một công cụ để cải thiện URL của AMP bằng cách phục vụ AMP qua Tín hiệu được Ký nhận. Đọc thêm trên [AMP Blog](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/).
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) là một trong những mạng lưới lớn nhất thế giới. Ngày nay, các doanh nghiệp, tổ chức phi lợi nhuận, blogger và bất kì ai có mặt ở Internet đều sở hữu được những website và ứng dụng nhanh hơn cũng như bảo mật hơn nhờ Cloudflare.

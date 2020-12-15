---
"$title": Đào sâu vào phân tích AMP
"$order": '1'
description: Hướng dẫn này đào sâu vào thành phần amp-analytics, tách gỡ ra một cấu hình mẫu của amp-analytics thành những khối dựng then chốt này.
formats:
- websites
- stories
---

Hướng dẫn này đào sâu vào thành phần [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), tách gỡ một cấu hình mẫu của [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) thành những khối dựng then chốt này:

Phần còn lại của hướng dẫn này sử dụng mẫu cấu hình này, vốn dùng để theo dõi lượt xem trang và những nhấp chuột của người dùng, rồi gửi dữ liệu phân tích đến nhà cung cấp bên thứ ba, [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
```

Đoạn mã ví dụ ở trên nhằm giúp bạn tìm hiểu, nhưng nó không hề là một mẫu thực tế. Nếu bạn đang làm việc với những nhà cung cấp công cụ phân tích, có thể đoạn mẫu trên không có nghĩa; cấu hình của nhà cung cấp sẽ bỏ đi tính phức tạp. Tham khảo [tài liệu của nhà cung cấp công cụ phân tích](analytics-vendors.md) để biết các cấu hình mẫu.

## Chỗ gửi đi dữ liệu phân tích: thuộc tính type

AMP is designed to support two common patterns of data collection:

- Thu thập bằng điểm cuối do nhà phát hành sở hữu đối với hệ thống phân tích nội bộ.
- Thu thập bằng điểm cuối do nhà cung cấp sở hữu đối với tính liên tác với giải pháp của nhà cung cấp (ví dụ như [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

To send analytics data to an analytics provider, include the `type` attribute in the [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) tag and set its value to the appropriate vendor, as defind in the [Analytics Vendors](analytics-vendors.md) list.

For example: `<amp-analytics type="googleanalytics">` sends analytics data to the third-party analytics provider, Google Analytics. To send data to a publisher-owned endpoint, simply don’t include the `type` attribute; the analytics data is sent to the defined endpoints for each [request](deep_dive_analytics.md).

Các cấu hình của nhà cung cấp công cụ phân tích là cách nhanh chóng để bắt đầu với [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Bạn nên tham khảo tài liệu của nhà cung cấp và nguồn tài nguyên trợ giúp để biết thêm thông tin hướng dẫn. Như đã đề cập trước đó, danh sách nhà cung cấp đã tích hợp với AMP, cũng như những liên kết đến tài liệu cụ thể của họ có thể tìm thấy trong danh sách [Nhà cung cấp công cụ phân tích](analytics-vendors.md).

If you’re an analytics vendor, learn more about [integrating your own analytics configuration into AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Tải cấu hình từ xa: thuộc tính config

Bạn không cần phải bao gồm toàn bộ cấu hình cho [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) hoàn toàn trên trang AMP của mình. Thay vì vậy, bạn có thể phát lệnh gọi đến một URL từ xa cho toàn bộ hay một phần của các cấu hình.

Điều này cho phép bạn làm những việc như thay đổi cấu hình dựa trên một yêu cầu cụ thể. Nếu bạn ở vai trò nhà phát hành có quyền kiểm soát đối với file từ xa đó, bạn có thể làm bất kì khâu xử lí nào phía máy chủ mà cần thiết để xây dựng dữ liệu cấu hình.

Bước đầu tiên để tải những cấu hình từ xa là bao gồm thuộc tính config trong thẻ [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

Bước tiếp theo là tạo nội dung JSON ngụ trong URL từ xa. Trong ví dụ giản đơn này, phần cấu hình chứa đựng trong đối tượng JSON chỉ là giá trị của biến số cho tài khoản phân tích.

Nội dung của ví dụ trong `https://example.com/analytics.account.config.json`:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

Bước cuối cùng là bảo đảm nội dung trong file từ xa được kéo vào chỗ thích hợp trong cấu hình [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Trong cả yêu cầu `pageview` lẫn yêu cầu `event` ở đây, giá trị của biến `account` được tự động đặt thành giá trị tài khoản trong URL từ xa (`"account": "UA-XXXXX-Y"`):

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

[tip type="important"] **QUAN TRỌNG –** AMP không xác thực cho nhiều lần sử dụng của cùng biến số. Các giá trị được nạp dữ liệu theo thứ tự ưu tiên của việc thay thế biến số, và giá trị trong những URL từ xa nằm trên cùng của thứ tự đó (xem [Sắp thứ tự của thay thế biến số](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

## Requests, triggers & transports <a name="requests-triggers--transports"></a>

Thuộc tính `requests` định ra ‘dữ liệu gì được gửi đi’ (ví dụ, `pageviews`, `events`), và nơi gửi đến dữ liệu đó (những URL được dùng để truyền dữ liệu).

Thuộc tính `triggers` mô tả thời điểm nên gửi dữ liệu phân tích, ví dụ như khi một người dùng xem một trang, khi một người dùng nhấp vào một liên kết.

Thuộc tính `transport` chỉ định cách gửi một yêu cầu, cụ thể hơn là chỉ định giao thức gửi.

Đọc tiếp để tìm hiểu thêm về những cấu hình này. (Bạn cũng có thể đọc về những cấu hình này trong phần [tham khảo `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)

### Dữ liệu gì được gửi đi: thuộc tính requests<a name="what-data-gets-sent-requests-attribute"></a>

`request-name` được dùng trong cấu hình kích hoạt để chỉ định yêu cầu gì cần được gửi để đáp ứng một sự kiện đặc thù. `request-value` là một URL `https`. Những giá trị này có thể bao gồm các token giữ chỗ vốn có thể tham chiếu yêu cầu hay biến số khác.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Một số nhà cung cấp công cụ phân tích (bao gồm Google Analytics) đã cung cấp phần cấu hình, cái mà bạn có thể sử dụng qua thuộc tính `type`. Nếu bạn đang dùng một nhà cung cấp công cụ phân tích, bạn có thể không cần phải bao gồm thông tin `requests`. Xem tài liệu của nhà cung cấp để tìm hiểu xem liệu `requests` có cần được cấu hình không, và cách cấu hình ra sao.

#### Nối URL yêu cầu: Tham số URL thêm vào

Thuộc tính [extraUrlParams](../../../../documentation/components/reference/amp-analytics.md#extra-url-params) chỉ định những tham số thêm vào để nối với chuỗi truy vấn của URL yêu cầu thông qua quy ước "&foo=baz".

Ví dụ [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) thêm một tham số bổ sung `cd1` vào yêu cầu và đặt giá trị tham số là "AMP":

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### Thời điểm gửi đi dữ liệu: thuộc tính triggers

Thuộc tính `triggers` mô tả thời điểm một yêu cầu phân tích cần được gửi đi. Nó gồm một cặp khoá và giá trị của tên mã kích hoạt và cấu hình mã kích hoạt. Tên mã kích hoạt có thể là bất kì chuỗi nào gồm các kí tự chữ và số (a-z, A-Z, 0-9).

Ví dụ, yếu tố [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) sau được cấu hình để gửi một yêu cầu đến `https://example.com/analytics` khi tài liệu được tải lần đầu, và mỗi lần có người nhấp vào thẻ `a`:

```js
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
  "trackAnchorClicks": {
    "on": "click",
    "selector": "a",
    "request": "event",
    "vars": {
      "eventId": "42",
      "eventLabel": "clicked on a link"
    }
  }
}
```

[tip type="important"] **QUAN TRỌNG –** Phương cách bên trên chỉ được khuyến nghị cho những trang AMP và không cho quảng cáo HTML AMP. Bởi vì mức ưu tiên của công cụ phân tích thấp hơn so với nội dung trên trang, nên người ta thường khuyến nghị rằng những nhấp chuột nên được theo dõi bằng tác vụ chuyển hướng của trình duyệt để tránh mất đi lần nhấp chuột. [/tip]

AMP hỗ trợ những cấu hình kích hoạt sau:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Cấu hình kích hoạt</th>
      <th data-th="Description">Mô tả</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config">
<code>on</code> (bắt buộc)</td>
      <td data-th="Description">Sự kiện cần lắng nghe. Giá trị hợp lệ là <code>click</code>, <code>scroll</code>, <code>timer</code>, và <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>request</code> (bắt buộc)</td>
      <td data-th="Description">Tên của yêu cầu cần gửi đi (theo chỉ định trong <a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">requests</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Một đối tượng chứa cặp khoá và giá trị được dùng để ghi đè <code>vars</code> được định nghĩa trong cấu hình cấp cao nhất, hoặc để chỉ định <code>vars</code> đặc trưng cho mã kích hoạt này (xem thêm <a href="deep_dive_analytics.md#variable-substitution-ordering">Sắp thứ tự thay thế biến số</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>selector</code> (bắt buộc khi <code>on</code> được đặt thành <code>click</code>)</td>
      <td data-th="Description">Một bộ chọn CSS được dùng để cải tiến những yếu tố nào nên được theo dõi. Sử dụng giá trị <code>*</code> để theo dõi tất cả các yếu tố. Cấu hình này được dùng kết hợp với yếu tố kích hoạt <code>click</code>. Tìm hiểu cách dùng bộ chọn để <a href="use_cases.md#tracking-page-clicks">theo dõi số lần nhấp vào trang</a> và <a href="use_cases.md#tracking-social-interactions">các tương tác mạng xã hội</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>scrollSpec</code> (bắt buộc khi <code>on</code> được đặt thành <code>scroll</code>)</td>
      <td data-th="Description">Điều khiển ở điều kiện nào khi trang được cuộn thì sự kiện <code>scroll</code> kích phát. Đối tượng này có thể bao gồm <code>verticalBoundaries</code> và <code>horizontalBoundaries</code>. Ít nhất một trong hai đặc tính cần đến cho sự kiện <code>scroll</code> kích phát. Những giá trị cho cả hai đặc tính nên là dãy các con số chứa đường ranh giới tại đó một sự kiện cuộn được tạo ra. Xem ví dụ này về việc <a href="use_cases.md#tracking-scrolling">theo dõi thao tác cuộn</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>timerSpec</code> (bắt buộc khi <code>on</code> được đặt thành <code>timer</code>)</td>
      <td data-th="Description">Điều khiển thời điển kích phát sự kiện <code>timer</code>. Bộ định giờ này sẽ kích phát ngay lập tức và sau đó ở những quãng thời gian được chỉ định. Cấu hình này được dùng kết hợp với yếu tố kích hoạt <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

[tip type="important"] **QUAN TRỌNG –** Những yếu tố kích hoạt từ một cấu hình với độ ưu tiên thấp hơn sẽ bị ghi đè bởi những yếu tố kích hoạt cùng tên từ một cấu hình có độ ưu tiên cao hơn (xem [Sắp xếp thứ tự thay thế biến số](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

### Cách dữ liệu được gửi đi: thuộc tính transport

Thuộc tính `transport` chỉ định cách gửi một yêu cầu. Ba phương pháp sau được bật theo mặc định:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Phương pháp vận chuyển</th>
      <th data-th="Description">Mô tả</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Cho biết <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> có thể được dùng để truyền yêu cầu. Cái này sẽ gửi một yêu cầu <code>POST</code>, kèm các chứng danh, và phần thân trống.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Cho biết <code>XMLHttpRequest</code> có thể được dùng để truyền yêu cầu. Cái này sẽ gửi một yêu cầu <code>POST</code>, kèm các chứng danh, và phần thân trống.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Cho biết yêu cầu có thể được gửi bằng cách tạo thẻ <code>Image</code>. Cái này sẽ gửi đi một yêu cầu <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Chỉ một phương pháp vận chuyển được dùng đến, và đó là phương pháp có độ ưu tiên cao nhất mà đã được bật, được cho phép và khả dụng. Độ ưu tiên là `beacon` > `xhrpost` > `image`. Nếu tác nhân người dùng của máy khách không hỗ trợ một phương pháp nào đó, thì sẽ dùng đến phương pháp có độ ưu tiên cao tiếp theo mà được bật.

Bao gồm thuộc tính `transport` trong cấu hình của bạn chỉ khi bạn muốn giới hạn các phương án vận chuyển, còn không, bạn có thể dừng các yêu cầu.

Trong ví dụ bên dưới, `beacon` và `xhrpost` được đặt thành false, nên chúng sẽ không được dùng cho dù chúng có độ ưu tiên cao hơn `image`. Nếu tác nhân người dùng của máy khách hỗ trợ phương pháp `image` thì nó sẽ được dùng đến; không thì không có yêu cầu nào được gửi đi.

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## Sắp thứ tự thay thế biến số <a name="variable-substitution-ordering"></a>

AMP nạp dữ liệu cho các biến số với các giá trị theo thứ tự ưu tiên:

1. Cấu hình từ xa (qua `config`).
2. `vars` được lồng bên trong một yếu tố kích hoạt ở trong `triggers`.
3. `vars` ở cấp cao nhất được lồng ở trong [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
4. Giá trị do nền tảng cung cấp.

Trong ví dụ này, có một cấu hình từ xa, những biến số được định nghĩa ở cấp cao nhất, trong các yếu tố kích hoạt, và ở cấp nền tảng:

```html
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
```

Khi cùng một `var` được định nghĩa ở nhiều vị trí, thứ tự ưu tiên của biến số sẽ đặt giá trị của nó một lần. Do đó, nếu cấu hình từ xa định nghĩa `account` là UA-XXXXX-Y trong ví dụ ở trên, những giá trị vars khác nhau sẽ như sau:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Giá trị</th>
      <th data-th="Defined By" class="col-thirty">Định nghĩa bởi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Nền tảng</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">Trang chủ của tôi</td>
      <td data-th="Defined By">Yếu tố kích hoạt</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Cấu hình từ xa</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">người dùng của tôi</td>
      <td data-th="Defined By">Yếu tố kích hoạt</td>
    </tr>
  </tbody>
</table>

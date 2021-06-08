---
'$title': Thêm các thành phần AMP mở rộng
$order: 2
description: 'Hệ thống thành phần AMP cho phép bạn nhanh chóng xây dựng các tính năng hiệu quả và tương thích vào bài viết của mình một cách dễ dàng. Thư viện AMP HTML có 3 phân loại cho các thành phần AMP: ...'
---

Hệ thống thành phần AMP cho phép bạn nhanh chóng xây dựng các tính năng hiệu quả và tương thích vào bài viết của mình một cách dễ dàng. Thư viện AMP HTML có 3 phân loại cho các thành phần AMP:

- **tích hợp**: Các thành phần này được bao gồm trong thư viện JavaScript AMP cơ sở (được quy định trong thẻ `<head>` (đầu đề)), ví dụ như [`amp-img`](../../../../documentation/components/reference/amp-img.md) và [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Các thành phần này có thể được sử dụng ngay lập tức trong một tài liệu AMP.

- **mở rộng**: Đây là các phần mở rộng cho thư viện cơ sở và phải được bao gồm một cách rõ ràng trong tài liệu dưới dạng các yếu tố tùy chỉnh. Các yếu tố tùy chỉnh yêu cầu các kịch bản cụ thể, được thêm vào phần `<head>` (đầu đề) (ví dụ, `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **thử nghiệm**: Các thành phần này đã được phát hành nhưng vẫn chưa sẵn sàng cho sử dụng rộng khắp. Các nhà phát triển có thể đăng ký sử dụng các tính năng này trước khi chúng được phát hành đầy đủ. Tìm hiểu thêm trong [các tính năng Thử nghiệm](../../../../documentation/guides-and-tutorials/learn/experimental.md).

Mẫu của chúng ta đã sử dụng một thành phần tích hợp, [`amp-img`](../../../../documentation/components/reference/amp-img.md), và chúng ta đã khám phá cách thành phần đó liên quan đến hệ thống bố cục AMP trong bài thực hành ["Chuyển đổi HTML sang AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md). Bây giờ, hãy bổ sung một số thành phần AMP **mở rộng** thông dụng vào bài viết tin tức.

## Kiếm tiền với quảng cáo

Các quảng cáo trong AMP được xây dựng với thành phần [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Thành phần [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) cho phép bạn cấu hình quảng cáo theo nhiều cách, ví dụ như width (chiều rộng), height (chiều cao) và chế độ bố cục. Tuy nhiên, rất nhiều nền tảng quảng cáo đòi hỏi cấu hình bổ sung, ví dụ như ID tài khoản cho mạng lưới quảng cáo, các loại quảng cáo được phục vụ, hoặc các tùy chọn để nhắm mục tiêu quảng cáo. Các tùy chọn này có thể dễ dàng được quy định trong thành phần [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bằng cách sử dụng các thuộc tính HTML.

Hãy xem ví dụ này cho một quảng cáo **DoubleClick**:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static"
>
</amp-ad>
```

Như bạn có thể thấy, đây là một cấu hình rất đơn giản. Lưu ý thuộc tính `type` (loại), thông báo về thành phần [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) của nền tảng quảng cáo mà chúng ta muốn sử dụng. Trong trường hợp này, chúng ta muốn sử dụng nền tảng [DoubleClick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md), vậy nên chúng ta đã đặt `doubleclick` làm giá trị.

Thuộc tính `data-slot` độc đáo hơn. Trong [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), mọi thuộc tính bắt đầu với `data-` đều là các thuộc tính dành cho nhà cung cấp. Điều này có nghĩa không phải nhà cung cấp nào cũng cần thuộc tính cụ thể này, hay phản ứng nếu nó được cung cấp. Ví dụ, hãy so sánh ví dụ **DoubleClick** ở trên với quảng cáo thử nghiệm sau đây từ nền tảng [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Hãy thử **thêm** cả hai ví dụ ở trên vào bài viết của bạn, ngay sau thẻ `<header>`.

Hãy nhớ, không phải thành phần nào cũng được bao gồm trong tập tin JavaScript của thư viện AMP cốt lõi. Chúng ta cần bao gồm một yêu cầu JavaScript bổ sung cho thành phần quảng cáo.

**Thêm** kịch bản sau vào thẻ `<head>`:

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

**Làm mới** trang này và bạn sẽ thấy 2 quảng cáo thử nghiệm:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"] **QUAN TRỌNG –** Bạn có thể gặp một số lỗi trong bảng điều khiển nhà phát triển của mình, ví dụ như `Mixed Content` (Nội dung Hỗn hợp) hoặc `XMLHttpRequest cannot load` (XMLHttpRequest không thể được tải). Lỗi trước nhiều khả năng liên quan đến quảng cáo A9 bởi không phải nội dung nào được nó tải đều bảo mật. Đây là một yêu cầu đáng kể cho mọi quảng cáo được phục vụ trên AMP. [/tip]

2 [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) dưới đây là ví dụ về sự linh hoạt mà [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) mang lại cho các nền tảng quảng cáo hỗ trợ. Trong trường hợp này, chúng ta đã cấu hình (với bảng điều khiển của DoubleClick) 2 quảng cáo thử nghiệm của DoubleClick để chỉ hiển thị trong một số quốc gia-- quảng cáo đầu tiên sẽ chỉ hiển thị ở Vương quốc Anh và quảng cáo thứ hai sẽ chỉ hiển thị ở Hoa Kỳ. Thử **thêm** 2 cấu hình quảng cáo nhắm vào địa lý này trong tài liệu AMP, bên dưới các quảng cáo mà bạn đã thêm vào ở trên:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk"
>
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us"
>
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**Làm mới** trang và xem thử. Ảnh chụp màn hình sau được chụp từ Canada, vậy nên không có quảng cáo nào được tải:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] **LƯU Ý –** Bạn có thể nhận thấy rằng bên trong các thẻ [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) này là các thẻ `div` bổ sung với một thuộc tính tên là `fallback` (phương án dự phòng) trên chúng. Bạn có thể đoán xem thuộc tính `fallback` (phương án dự phòng) này chỉ báo gì? Nó thông báo với hệ thống tải của AMP là chỉ hiển thị các nội dung của yếu tố đó khi yếu tố cha không thể tải thành công. Tìm hiểu thêm trong [Mã giữ chỗ & phương án dự phòng](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

[tip type="read-on"] **ĐỌC TIẾP –** Để xem các mạng lưới quảng cáo được hỗ trợ mới nhất, hãy đọc tài liệu tham khảo cho thành phần [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). [/tip]

[tip type="note"] **LƯU Ý –** JavaScript của mạng lưới quảng cáo không được chạy trong tài liệu AMP. Thay vào đó, thời gian chạy AMP sẽ tải một iframe từ một nguồn khác (thông qua một iframe sandbox) dưới dạng tài liệu AMP và thực thi JS của mạng lưới quảng cáo trong iframe sandbox đó. [/tip]

Tài liệu AMP của chúng tôi hiện bao gồm văn bản, một ảnh, và một quảng cáo được nhúng trên trang, tất cả đều là các nguyên liệu chính để kể một câu chuyện và kiếm tiền từ nội dung của bạn. Tuy nhiên, các website hiện đại thường bao gồm nhiều chức năng hơn là chỉ ảnh và văn bản.

Hãy đưa tài liệu AMP của chúng tôi lên cấp độ tiếp theo và bổ sung các chức năng web cao cấp thường có trên các bài viết tin tức như:

- Video YouTube
- Tweet
- Trích dẫn bài viết

## Nhúng một video YouTube

Hãy thử nhúng một video YouTube vào tài liệu. **Thêm** đoạn code sau ngay sau phần `<header>` trong tài liệu AMP của bạn (trên [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) mà bạn vừa thêm):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270"
>
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Làm mới** trang. Thay vì video, bạn sẽ thấy văn bản này: _“The video could not be loaded”_ (Video không thể được tải).

Kể cả khi trình duyệt của bạn có thể hiển thị các video YouTube mà không gặp vấn đề gì, bạn vẫn sẽ nhận được lỗi này. Tại sao? Không phải là video không thể được tải, mà đây là lỗi của thành phần.

Hãy nhớ, không phải thành phần nào cũng được bao gồm trong tập tin JavaScript của thư viện AMP cốt lõi. Chúng ta cần bao gồm một yêu cầu JavaScript bổ sung cho thành phần YouTube.

[tip type="note"] **LƯU Ý –** Nếu bạn vẫn mở bảng điều khiển nhà phát triển và có `#development=1` trong URL của bạn, bạn sẽ thấy một lỗi xác thực AMP ở thời điểm này, nhắc bạn thêm JavaScript [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) cùng một liên kết đến tài liệu cho bạn biết thẻ `script` cần được bổ sung. [/tip]

**Thêm** kịch bản sau vào thẻ `<head>`:

```html
<script
  async
  custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
></script>
```

**Làm mới** trang này và bạn sẽ thấy video YouTube:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

Cũng như với các yếu tố khác trên trang, chúng tôi quy định `width` (chiều rộng) và `height` (chiều cao) của video để hệ thống bố cục AMP có thể tính tỷ lệ khung hình. Đồng thời, chúng tôi cũng đặt `layout` (bố cục) thành `responsive` (tương thích), để video có thể lấp đầy chiều rộng của yếu tố cha.

Để tìm hiểu thêm về việc nhúng các video YouTube, hãy đọc tài liệu của thành phần [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md). Để biết thông tin về các thành phần video và đa phương tiện khác, hãy xem [danh sách các thành phần AMP đa phương tiện](../../../../documentation/components/index.html#media).

[tip type="tip"] **GỢI Ý –** Sử dụng thuộc tính [`fallback`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks) (phương án dự phòng) để thông báo với người dùng là một thành phần đã không thể được tải, hoặc nếu thành phần đó không được hỗ trợ trong trình duyệt. [/tip]

## Hiển thị một Tweet

Việc nhúng các tweet đã được định dạng sẵn từ Twitter là một tính năng phổ biến trong các bài viết tin tức. Thành phần [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) có thể dễ dàng cung cấp chức năng này.

Bắt đầu với việc thêm yêu cầu JavaScript sau vào thẻ `<head>` của tài liệu:

```html
<script
  async
  custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
></script>
```

Bây giờ, trong bài viết của bạn, **thêm** đoạn code này để nhúng Tweet:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

Thuộc tính `data-tweetid` là một ví dụ khác về thuộc tính tùy chỉnh được yêu cầu bởi một nền tảng cụ thể. Trong trường hợp này, Twitter liên kết giá trị của thuộc tính `data-tweetid` đến một Tweet cụ thể.

**Làm mới** trình duyệt của bạn và kiểm tra trang. Bạn sẽ thấy Tweet đã được hiển thị:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

Để tìm hiểu thêm về việc nhúng các Tweet Twitter, hãy đọc tài liệu của thành phần [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

[tip type="tip"] **MẸO –** AMP cung cấp nhiều thành phần hơn nữa để nhúng nội dung từ các mạng xã hội. Xem các [thành phần AMP xã hội](../../../../documentation/components/index.html#social) mới nhất. [/tip]

## Nhấn mạnh một trích dẫn bài viết

Một tính năng phổ biến trong các bài viết tin tức là nhấn mạnh các trích đoạn đặc biệt hấp dẫn từ một bài viết. Ví dụ, trích dẫn từ một nguồn cụ thể hoặc một dữ kiện quan trọng có thể được lặp lại trong một phông chữ lớn hơn để thu hút sự chú ý của độc giả.

Tuy nhiên, không phải trích đoạn văn bản nào cũng có độ dài giống nhau, điều này có thể khiến bạn khó cân bằng một phông chữ lớn hơn với diện tích mà văn bản đó sử dụng trên trang.

AMP cung cấp một thành phần khác được thiết kế cụ thể cho tình huống này, nó được gọi là thành phần [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md). Thành phần [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) cho phép bạn định nghĩa một yếu tố có chiều rộng và chiều cao cố định, cùng một kích cỡ phông chữ tối đa. Thành phần này sẽ chia tỷ lệ phông chữ một cách thông minh cho **vừa** văn bản trong chiều rộng và chiều cao khả dụng.

Hãy cùng thử nó. Đầu tiên, **thêm** thư viện của thành phần vào thẻ `<head>`:

```html
<script
  async
  custom-element="amp-fit-text"
  src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"
></script>
```

Thêm phần sau vào trang của bạn:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Làm mới** trang và xem kết quả!

Bây giờ, hãy thử nghiệm thêm nữa. Điều gì xảy ra nếu trích dẫn ngắn hơn rất nhiều?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

Hoặc, điều gì xảy ra nếu trích dẫn dài hơn?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  And the Raven, never flitting, still is sitting, still is sitting. On the
  pallid bust of Pallas just above my chamber door; And his eyes have all the
  seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming
  throws his shadow on the floor; And my soul from out that shadow that lies
  floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

Trong thử nghiệm cuối cùng với [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md), hãy thử tạo một văn bản ngắn, ví dụ như "Hello" với một chiều cao lớn hơn nhiều (ví dụ, giá trị 400) và duy trì giá trị thuộc tính max-font-size là 42. Trang kết quả trông sẽ như thế nào? Liệu văn bản này có được căn giữa theo chiều dọc? Hay, liệu chiều cao của thẻ [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) sẽ thu nhỏ để cho vừa kích cỡ phông chữ tối đa? Với những gì bạn đã biết về hệ thống bố cục của AMP, hãy thử trả lời câu hỏi này trước khi thử nghiệm với code!

Bạn có thể tìm hiểu thêm về [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) từ [live demo của AMP by Example](../../../../documentation/examples/documentation/amp-fit-text.html).

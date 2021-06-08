---
'$title': Quản lý trạng thái người dùng chưa xác thực với AMP
$order: 2
formats:
  - websites
teaser:
  text: '**Mục lục**'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-managing-user-state.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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

**Mục lục**

- [Nền](#background)
- [Hướng dẫn triển khai](#implementation-guide)
  - [Trước khi bắt đầu](#before-getting-started)
  - [Tác vụ 1: Đối với các trang không phải AMP trên nguồn gốc của nhà phát hành, thiết lập một mã định danh và gửi ping phân tích](#task1)
  - [Tác vụ 2: Đối với các trang AMP, thiết lập một mã định danh và gửi ping phân tích bằng cách bao gồm ID Máy khách thay thế trong các lệnh ping amp-analytics](#task2)
  - [Tác vụ 3: Xử lý các ping phân tích từ các trang trên nguồn gốc của nhà phát hành](#task3)
  - [Tác vụ 4: Xử lý ping phân tích từ bộ nhớ đệm AMP hoặc ngữ cảnh hiển thị của trình xem AMP và thiết lập các sơ đồ mã định danh (nếu cần)](#task4)
  - [Tác vụ 5: Sử dụng ID Máy khách trong liên kết và biểu mẫu được gửi đi](#task5)
- [Các biện pháp thực hành được đặc biệt khuyến nghị](#strongly-recommended-practices)

Trạng thái người dùng là một khái niệm quan trọng trên các trang web ngày nay. Hãy cân nhắc trường hợp sử dụng sau, có được bằng cách quản lý trạng thái người dùng:

- Một thương gia xây dựng một **giỏ hàng** hữu ích hiển thị cho người dùng các sản phẩm tương tự trong lần truy cập thứ hai của họ mà họ đã thêm vào giỏ ở lần truy cập thứ nhất rất nhiều tuần trước. Trải nghiệm này sẽ tăng khả năng người dùng mua sản phẩm đó bằng cách đảm bảo họ vẫn nhớ về sản phẩm mà họ đã cân nhắc mua trong quá khứ.
- Một nhà phát hành tin tức có thể tùy chỉnh các **bài viết được khuyến nghị** cho một độc giả dựa trên các lần truy cập lặp lại của độc giả đến các bài viết của nhà phát hành này, điều này giúp gắn kết độc giả và khuyến khích họ khám phá các nội dung khác.
- Một nhà phát triển website vận hành một loại website bất kỳ thu thập thông tin **phân tích** có thể cho biết liệu 2 lượt xem trang là của cùng 1 người xem 2 trang hay 2 người khác nhau, mỗi người xem 1 trang. Việc sở hữu kiến thức này giúp họ biết hiệu quả của website và, quan trọng hơn cả, cách để cải thiện nó.

Bài viết này được thiết kế để giúp bạn trở nên thành công hơn trong việc **quản lý trạng thái người dùng chưa xác thực trong AMP**, một cách để cung cấp hành trình liền mạch cho người dùng ngay cả khi họ chưa có hành động nào để cung cấp danh tính của mình, chẳng hạn như đăng nhập. Sau khi xem lại một số thách thức và cân nhắc trong việc tiếp cận chủ đề này, hướng dẫn này sẽ phác thảo các cách mà trạng thái người dùng được hỗ trợ bởi AMP và cung cấp các khuyến nghị về cách bạn có thể tiếp cận một lối triển khai kỹ thuật.

## Nền <a name="background"></a>

Chủ đề trạng thái người dùng cần được chú ý đặc biệt trong AMP bởi các trang AMP có thể được hiển thị theo nhiều ngữ cảnh khác nhau, ví dụ như trên website của bạn, trong Google Tìm kiếm hoặc một ứng dụng của bên thứ ba. Việc này mang đến các thách thức trong việc quản lý trạng thái người dùng khi người dùng điều hướng giữa các ngữ cảnh này.

### Các ngữ cảnh hiển thị cho trang AMP <a name="display-contexts-for-amp-pages"></a>

Bạn có thể coi AMP như một định dạng nội dung lưu động, cho phép nội dung có thể được tải nhanh chóng ở bất cứ đâu. Các tài liệu AMP có thể được hiển thị thông qua 3 ngữ cảnh đáng lưu ý:

- Nguồn gốc của nhà phát hành
- Một bộ nhớ đệm AMP
- Một trình xem AMP

<table>
  <tr>
    <th width="20%">Ngữ cảnh</th>
    <th width="20%">Liệu các trang không phải AMP có thể được phục vụ từ đây?</th>
    <th width="20%">Liệu các trang AMP có thể được phục vụ từ đây?</th>
    <th>URL mẫu</th>
  </tr>
  <tr>
    <td>Nguồn gốc của nhà phát hành</td>
    <td>Có</td>
    <td>Có</td>
    <td><code>https://example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Bộ nhớ đệm AMP</td>
    <td>Không</td>
    <td>Có</td>
    <td><code>https://example-com.cdn.ampproject.org/s/example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Trình xem AMP</td>
    <td>Không</td>
    <td>Có</td>
    <td><code>https://google.com/amp/s/example.com/article.amp.html</code></td>
  </tr>
</table>

Hãy cùng xem kỹ từng tình huống trong đây.

**Ngữ cảnh #1: nguồn gốc của nhà phát hành.** Các trang AMP được triển khai theo cách mà ban đầu chúng được lưu trữ và truy cập thông qua website của nhà phát hành, chẳng hạn như trên `https://example.com`, bạn có thể tìm thấy `https://example.com/article.amp.html`.

Các nhà phát hành có thể chọn chỉ phát hành bằng AMP, hoặc phát hành 2 phiên bản của nội dung (nghĩa là, nội dung AMP “kết hợp” với nội dung không phải AMP). Mô hình “kết hợp” đòi hỏi một số [bước cụ thể](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery) để đảm bảo các phiên bản AMP của trang có thể được khám phá trên công cụ tìm kiếm, mạng xã hội và các nền tảng khác. Cả hai lối phát hành này đều được hỗ trợ toàn diện; nhà phát hành có quyền quyết định lối tiếp cận để thực hiện.

> **LƯU Ý:**
> Do mô hình phát hành “kết hợp” này mà nguồn gốc của nhà phát hành (trong ví dụ ở trên là `https://example.com`) là một ngữ cảnh trong đó **cả nội dung AMP và không phải AMP đều có thể được truy cập**. Hiển nhiên, đó là ngữ cảnh duy nhất mà điều này có thể xảy ra bởi các bộ nhớ đệm AMP và trình xem AMP, được mô tả dưới đây, chỉ cung cấp nội dung AMP hợp lệ.

**Ngữ cảnh #2: một bộ nhớ đệm AMP.** Các tập tin AMP có thể được lưu bộ nhớ đệm trong đám mây bởi một bộ nhớ đệm của bên thứ ba để giảm thời gian mà nội dung được đưa đến thiết bị di động của người dùng.

Thông qua việc sử dụng định dạng AMP, các nhà sản xuất nội dung cho phép nội dung trong các tập tin AMP được lưu trong bộ nhớ đệm bởi các bên thứ ba. Theo loại khung này, các nhà phát hành sẽ tiếp tục kiểm soát nội dung của họ (bằng cách phát hành lên nguồn gốc của họ như đã nói ở trên), nhưng các nền tảng có thể lưu hoặc sao chép nội dung để đảm bảo tốc độ cung cấp tối ưu cho người dùng.

Thông thường, nội dung được cung cấp theo cách này đều có nguồn gốc từ một tên miền khác. Ví dụ [Bộ nhớ đệm AMP của Google](https://developers.google.com/amp/cache/overview) sử dụng `https://cdn.ampproject.org` để cung cấp nội dung, ví dụ như `https://example-com.cdn.ampproject.org/s/example.com/article.amp.html`.

**Ngữ cảnh #3: một trình xem AMP.** Định dạng AMP được xây dựng để hỗ trợ nhúng trong các trình xem AMP của bên thứ ba. Việc này cho phép một cấp độ hợp tác cao hơn giữa tập tin AMP và trải nghiệm người xem, các lợi ích bao gồm: tải sẵn và render sẵn nội dung một cách thông minh và bảo mật, và các tiện ích sáng tạo như vuốt giữa các trang AMP đầy đủ.

Cũng như trường hợp bộ nhớ đệm AMP, tên miền cho một trình xem AMP cũng sẽ khác với nguồn gốc của nhà phát hành. Ví dụ, trình xem cho Google Tìm kiếm được lưu trữ trên `https://google.com` và nhúng một iframe yêu cầu nội dung nhà phát hành từ Bộ nhớ đệm AMP của Google.

### Nhiều ngữ cảnh đồng nghĩa với nhiều cách quản lý trạng thái <a name="multiple-contexts-means-multiple-state-management"></a>

Các nhà phát hành phải chuẩn bị để quản lý trạng thái người dùng cho từng ngữ cảnh hiển thị. Tính năng [ID Máy khách](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#client-id) của AMP tận dụng cookie hoặc ổ lưu trữ cục bộ để duy trì trạng thái và cung cấp hỗ trợ cần thiết cho các trang AMP để có một mã định danh ổn định cho người dùng. Từ quan điểm triển khai, có thể sử dụng cookie hoặc ổ lưu trữ cục bộ, và AMP sẽ đưa ra quyết định sử dụng cách nào tùy thuộc vào ngữ cảnh hiển thị. Lựa chọn này chịu ảnh hưởng bởi tính khả thi kỹ thuật đối với việc quản lý trạng thái này, phóng lên hàng trăm hoặc hàng nghìn nhà phát hành.

Tuy nhiên, các nhà phát hành trang AMP có thể vô ý thiết kế các hành trình người dùng liên quan đến nhiều ngữ cảnh khác nhau. Hãy nhìn lại trường hợp sử dụng giỏ hàng trước đây của chúng ta và bổ sung một số chi tiết để biến nó thành một **câu chuyện người dùng** đầy đủ:

> _Vào ngày 1, người dùng khám phá một trang AMP từ Example Inc. thông qua Google Tìm kiếm. Google Tìm kiếm tải các trang AMP trong một trình xem AMP. Trong khi xem trang này, người dùng thêm 4 sản phẩm vào giỏ hàng của họ nhưng không thanh toán. 2 tuần sau, vào ngày 15, người dùng nhớ đến 4 sản phẩm mà họ đã cân nhắc mua và quyết định bây giờ là lúc để mua. Họ truy cập trang chủ của Example Inc. tại `https://example.com` một cách trực tiếp (đó là một trang chủ không phải AMP), và thấy 4 sản phẩm của họ vẫn được lưu trong giỏ hàng._

Trong tình huống này, người dùng nhận được một trải nghiệm giỏ hàng nhất quán, ngay cả khi họ đã chuyển từ một ngữ cảnh trình xem AMP sang ngữ cảnh nguồn gốc của nhà phát hành—và một khoảng thời gian đã trôi qua giữa 2 sự kiện này. Trải nghiệm này rất hợp lý, và nếu bạn đang thiết kế một trải nghiệm mua sắm, bạn nên hỗ trợ nó, vậy làm thế nào bạn có thể biến nó thành hiện thực?

**Để cho phép trải nghiệm này và mọi trải nghiệm liên quan đến trạng thái người dùng, mọi ngữ cảnh sử dụng của người dùng đều phải có chung trạng thái (được duy trì riêng biệt với nhau).** “Thật hoàn hảo!”, bạn thốt lên, với ý tưởng là chia sẻ giá trị cookie với các mã định danh người dùng trên các ranh giới ngữ cảnh này. Một vấn đề: tuy mỗi ngữ cảnh này đều hiển thị nội dung được kiểm soát bởi cùng một nhà phát hành, chúng sẽ đều coi nhau như bên thứ ba bởi mỗi ngữ cảnh đều sống trên các tên miền khác nhau.

<amp-img alt="AMP's ability to be displayed in many contexts means that each of those contexts has its own storage for identifiers" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/contexts-with-different-storage.png" width="1030" height="868">
  <noscript><img alt="Khả năng hiển thị của AMP trong nhiều ngữ cảnh có nghĩa là mỗi ngữ cảnh đó đều có bộ nhớ riêng cho số nhận dạng" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/contexts-with-different-storage.png"></noscript></amp-img>

Như bạn có thể thấy trong cuộc thảo luận sau, việc ở vị thế của một bên thứ ba khi tương tác với cookie có thể mang đến nhiều thách thức tùy thuộc vào cách cấu hình cài đặt trình duyệt của người dùng. Cụ thể, nếu các cookie của bên thứ ba bị chặn trong một tình huống cụ thể, nó sẽ ngăn thông tin được chia sẻ trên nhiều ngữ cảnh. Mặt khác, nếu cookie của bên thứ ba được phép hoạt động, thông tin sẽ có thể được chia sẻ.

## Hướng dẫn triển khai <a name="implementation-guide"></a>

Phần này cung cấp các khuyến nghị để quản lý trạng thái người dùng. Các tác vụ dưới đây được trình bày dưới dạng tiến độ, nhưng nhìn chung có thể được xem theo 2 phần:

**Phần #1: Triển khai cơ bản:** Tác vụ 1-4 là thiết yếu để triển khai phần cơ bản. Chúng phụ thuộc vào một nhóm tính năng tối thiểu để hoàn thành một phần công việc: Thay ID Máy khách của AMP, đọc và ghi cookie, và duy trì một bảng sơ đồ backend. Vì sao lại “một phần”? Bởi các bước được nêu trong tác vụ này phụ thuộc vào việc đọc và ghi các cookie và bởi cài đặt cookie của trình duyệt có thể ngăn điều này trong một số tình huống nhất định, nhóm tác vụ này nhiều khả năng sẽ là không đủ để quản lý toàn diện trạng thái người dùng trong mọi tình huống.

Sau khi thiết lập nền tảng, chúng ta sẽ xem xét một chủ đề với phạm vi sử dụng hẹp hơn, nhưng cung cấp một giải pháp toàn diện cho những trường hợp sử dụng đó.

**Phần #2: Sử dụng ID Máy khách trong liên kết và biểu mẫu được gửi đi:** Trong Tác vụ 5, bạn sẽ học được lợi thế của việc điều hướng liên kết và/hoặc gửi đi biểu mẫu để truyền tải thông tin ID Máy khách AMP qua nhiều ranh giới ngữ cảnh khác nhau, ở đó người dùng điều hướng trực tiếp từ trang này sang trang kia.

> **CHÚ Ý:**
> Hướng dẫn triển khai sau đây tư vấn về việc sử dụng và làm việc với cookie. Hãy tham vấn [Các biện pháp thực hành được đặc biệt khuyến nghị ](#strongly-recommended-practices) để biết các đề xuất quan trọng cần lưu ý.

### Trước khi bắt đầu <a name="before-getting-started"></a>

Khi thực hiện các hướng dẫn kỹ thuật dưới đây, hãy giả sử rằng bạn sẽ ràng buộc **trạng thái người dùng** với một **mã định danh** ổn định đại diện cho người dùng. Ví dụ, mã định danh có thể có dạng `n34ic982n2386n30`. Ở phía máy chủ, bạn sẽ liên kết `n34ic982n2386n30` với mọi nhóm thông tin trạng thái người dùng, ví dụ như nội dung giỏ hàng, một danh sách các bài viết đã đọc trước đó, hoặc các dữ liệu khác tùy thuộc vào trường hợp sử dụng.

<amp-img alt="A single identifier could be used to manage user state for many use cases" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/identifiers-for-use-cases.png" width="1276" height="376">
  <noscript><img alt="Một số nhận dạng duy nhất có thể được sử dụng để quản lý trạng thái người dùng cho nhiều trường hợp sử dụng" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/identifiers-for-use-cases.png"></noscript></amp-img>

Để đảm bảo sự rõ ràng ở phần còn lại của tài liệu này, chúng ta sẽ gọi những chuỗi ký tự khác nhau, là các mã định danh, bằng các tên dễ đọc, đứng trước bởi một ký tự đô-la (`$`):

[sourcecode:text]
n34ic982n2386n30 ⇒ $sample_id
[/sourcecode]

**Trường hợp sử dụng của chúng ta:** Trong suốt hướng dẫn này, chúng ta sẽ làm việc trên một ví dụ được thiết kế để theo dõi lượt xem trang một cách đơn giản (nghĩa là trình phân tích), trong đó chúng ta muốn tạo ra cách đếm người dùng chính xác nhất. Điều này có nghĩa ngay cả khi người dùng đang truy cập một nội dung cụ thể của nhà phát hành từ các ngữ cảnh khác nhau (bao gồm chuyển giữa các trang AMP và không phải AMP), chúng ta muốn các lượt truy cập này được đếm vào một định nghĩa người dùng duy nhất, như thể người dùng chỉ đang duyệt trên các trang truyền thống không phải AMP của nhà phát hành đó.

**Giả sử về tình trạng sẵn có của các giá trị cookie ổn định:** Chúng ta cũng giả sử rằng người dùng đang sử dụng cùng một thiết bị, trình duyệt, chế độ duyệt không riêng tư/không ẩn danh, để đảm bảo rằng các giá trị cookie được giữ nguyên và khả dụng trên các phiên làm việc của người dùng theo thời gian. Nếu không, các kỹ thuật này sẽ không hoạt động đúng kỳ vọng. Nếu cần, hãy kiểm tra để đảm bảo trạng thái người dùng dựa trên danh tính được xác thực của người dùng (nghĩa là, danh tính đăng nhập).

**Các khái niệm được trình bày dưới đây có thể được mở rộng cho các trường hợp sử dụng khác:** Tuy chúng ta chỉ tập trung vào trường hợp sử dụng phân tích, các khái niệm được trình bày dưới đây có thể được tái sử dụng cho các trường hợp sử dụng khác, vốn đòi hỏi việc quản lý trạng thái người dùng trên nhiều ngữ cảnh.

<a id="task1"></a>

### Tác vụ 1: Đối với các trang không phải AMP trên nguồn gốc của nhà phát hành, thiết lập một mã định danh và gửi ping phân tích <a name="task-1-for-non-amp-pages-on-the-publisher-origin-set-up-an-identifier-and-send-analytics-pings"></a>

Hãy bắt đầu bằng cách cấu hình phân tích cho các trang không phải AMP, được phục vụ ngay từ nguồn gốc của nhà phát hành. Điều này có thể được thực hiện theo nhiều cách, bao gồm sử dụng một gói phân tích như Google Analytics hoặc Adobe Analytics, hoặc bằng cách viết một tác vụ triển khai tùy chỉnh.

Nếu bạn đang sử dụng một gói phân tích từ một nhà cung cấp, nhiều khả năng gói đó đã đảm nhiệm cả việc thiết lập cookie và truyền tải ping qua mã cấu hình và API của nó. Nếu vậy, bạn nên đọc qua các bước dưới đây để đảm bảo chúng phù hợp với phong cách phân tích của bạn, nhưng bạn có thể kỳ vọng mình sẽ không cần thay đổi gì khi hoàn thành tác vụ này.

Phần còn lại của tác vụ này cung cấp các hướng dẫn nếu bạn muốn thiết lập trình phân tích của riêng mình.

##### Thiết lập một mã định danh sử dụng các cookie của bên thứ nhất <a name="set-up-an-identifier-using-first-party-cookies"></a>

Nếu bạn có các trang không phải AMP đang được phục vụ từ nguồn gốc nhà phát hành của mình, hãy thiết lập một mã định danh cố định và ổn định để sử dụng cho các trang này. Điều này thường được [triển khai sử dụng các cookie của bên thứ nhất](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking).

Vì mục đích của ví dụ này, hãy giả sử rằng bạn đã đặt một cookie tên là `uid` (“mã định danh người dùng”) mà sẽ được tạo ở lần truy cập đầu tiên của người dùng. Nếu đây không phải lần truy cập đầu tiên của người dùng, thì đọc giá trị đã được đặt ở lần truy cập đầu tiên trước đó.

Điều này có nghĩa có 2 trường hợp cho trạng thái của các trang không phải AMP trên nguồn gốc của nhà phát hành:

**Trường hợp #1: Lần truy cập ban đầu.** Sau khi vừa đến trang không phải AMP, sẽ không có cookie nào. Nếu bạn kiểm tra cookie trước khi nó được đặt, bạn sẽ không thấy giá trị nào được đặt trong cookie tương ứng với `uid`:

[sourcecode:bash]

> document.cookie
> ""
> [/sourcecode]

Cookie sẽ được đặt ở một thời điểm nào đó trong lần tải ban đầu, vậy nên nếu bạn làm việc này sau khi trang được tải, bạn sẽ thấy một giá trị đã được đặt:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

**Trường hợp #2: Lần truy cập không phải ban đầu.** Sẽ có một cookie đã được đặt từ trước rồi. Do đó, nếu bạn mở bảng điều khiển nhà phát triển trên trang này, bạn sẽ thấy:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

##### Gửi đi ping phân tích <a name="send-analytics-pings"></a>

Sau khi bạn đã thiết lập một mã định danh, bạn có thể tích hợp nó trong ping phân tích để bắt đầu theo dõi lượt xem trang.

Việc triển khai cụ thể sẽ tùy thuộc vào cấu hình mong muốn của bạn, nhưng nhìn chung, bạn sẽ muốn gửi ping (yêu cầu) đến máy chủ phân tích của mình, bao gồm các dữ liệu hữu ích trong URL của chính yêu cầu đó. Đây là một ví dụ, nó cũng cho thấy cách bạn có thể bao gồm giá trị cookie bên trong yêu cầu:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier
[/sourcecode]

Lưu ý rằng trong ví dụ ở trên, mã định danh cho người dùng được chỉ báo bởi một tham số truy vấn cụ thể, `user_id`:

[sourcecode:text]
user_id=$publisher_origin_identifier
[/sourcecode]

Việc sử dụng “`user_id`” ở đây nên được quyết định bởi nội dung mà máy chủ phân tích của bạn quen xử lý, chứ không liên quan cụ thể đến tên của cookie lưu trữ mã định danh này một cách cục bộ.

<a id="task2"></a>

### Tác vụ 2: Đối với các trang AMP, thiết lập một mã định danh và gửi ping phân tích bằng cách bao gồm ID Máy khách thay thế trong các lệnh ping amp-analytics <a name="task-2-for-amp-pages-set-up-an-identifier-and-send-analytics-pings-by-including-client-id-replacement-in-amp-analytics-pings"></a>

Xét đến các trang AMP, hãy xem cách bạn có thể thiết lập và truyền tải một mã định danh cho các trình phân tích. Mã này sẽ được áp dụng bất kể ngữ cảnh của trang AMP, vậy nên nó bao gồm mọi trang AMP trên nguồn gốc của nhà phát hành, được phục vụ qua một bộ nhớ đệm AMP hay hiển thị trong một trình xem AMP.

Thông qua việc sử dụng các tính năng cần ID Máy khách, AMP sẽ làm việc “ngầm” để tạo và lưu trữ các giá trị ID máy khách và cung cấp chúng cho các tính năng cần chúng. Một tính năng chính có thể sử dụng ID Máy khách của AMP là [amp-analytics](https://amp.dev/documentation/components/amp-analytics), nó chính là thứ mà chúng ta sẽ cần để triển khai ví dụ về trường hợp sử dụng phân tích của mình.

Trên các trang AMP, xây dựng một mã ping amp-analytics chứa ID Máy khách:

<table>
  <tr>
    <td width="40%"><strong>Cấu hình amp-analytics sẽ có dạng như sau:</strong></td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=${clientId(uid)}</code></td>
  </tr>
  <tr>
    <td><strong>Những gì được truyền tải qua mạng sẽ có dạng như sau:</strong></td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id</code><p><em>Trong trường hợp này, <code>${clientId(uid)}</code> được thay thế bởi một giá trị thực tế mà AMP tạo tại thời điểm đó, hoặc sẽ được trả về dựa trên những gì mà trình duyệt của người dùng đã lưu trữ cục bộ</em></p>
</td>
  </tr>
</table>

Lưu ý rằng tham số được truyền vào ID Máy khách thay thế, `${clientId(uid)` là `uid`. Đây là một lựa chọn có ý định phù hợp với tên cookie đã được sử dụng trên nguồn gốc của nhà phát hành như được mô tả trong [Tác vụ 1](#task1). Để tích hợp một cách liền mạch nhất có thể, bạn cũng nên áp dụng kỹ thuật này.

Liên quan đến phần còn lại của việc triển khai amp-analytics, hãy xem tài liệu [cấu hình amp-analytics](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/) để biết thông tin chi tiết về cách thiết lập các yêu cầu amp-analytics hoặc sửa đổi chúng cho nhà cung cấp phân tích của bạn. Lệnh ping có thể được sửa đổi thêm nữa để truyền tải dữ liệu bổ sung mà bạn định nghĩa trực tiếp, hoặc tận dụng các mã [AMP thay thế](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) khác.

> **Nên biết:**
> Vì sao chúng ta sử dụng tên `uid` cho tham số được truyền đến tính năng ID Máy khách? Tham số mà `clientId(...)` thay thế sử dụng sẽ được dùng để định nghĩa phạm vi. Bạn có thể sử dụng tính năng ID Máy khách cho nhiều trường hợp sử dụng và, do đó, tạo ra nhiều ID máy khách khác nhau. Tham số này phân biệt giữa những trường hợp sử dụng này và do đó bạn sử dụng nó để quy định trường hợp sử dụng mà bạn muốn dùng ID Máy khách đó. Ví dụ, bạn có thể muốn gửi nhiều mã định danh khác nhau đến các bên thư ba như một nhà quảng cáo và bạn có thể sử dụng tham số “scope” (phạm vi) để thực hiện điều này.

Trên nguồn gốc của nhà phát hành, bạn có thể coi “scope” (phạm vi) như một cookie. Thông qua việc khuyến nghị một giá trị `uid` cho tham số ID Máy khách trong [Tác vụ 2](#task2), chúng ta tiếp tục với lựa chọn sử dụng một cookie tên là `uid` trong [Tác vụ 1](#task1).

<a id="task3"></a>

### Tác vụ 3: Xử lý các ping phân tích từ các trang trên nguồn gốc của nhà phát hành <a name="task-3-process-analytics-pings-from-pages-on-the-publisher-origin"></a>

Nhờ các thiết lập được thực hiện trong Tác vụ 1 và 2, khi một ai đó truy cập phiên bản AMP (từ mọi ngữ cảnh) hay phiên bản không phải AMP trên nguồn gốc của nhà phát hành, ping phân tích sẽ sử dụng mã định danh này. Thông qua việc làm theo hướng dẫn trong [Tác vụ 2](#task2) để chọn một "scope" (phạm vi) ID Máy khách có cùng tên với cookie mà bạn đã dùng trong [Tác vụ 1](#task1), AMP sẽ tái sử dụng cookie này.

Điều này được minh họa trong bảng dưới đây:

<table>
  <tr>
    <td width="40%">Một lệnh ping phân tích đến từ một <strong>trang không phải AMP trên nguồn gốc của nhà phát hành</strong> có dạng</td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code></td>
  </tr>
  <tr>
    <td>Một lệnh ping phân tích đến từ một <strong>trang AMP trên nguồn gốc của nhà phát hành</strong> có dạng</td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code><br><em>Trong trường hợp này, chúng giống nhau! Thông qua việc lựa chọn giá trị phạm vi là <code>uid</code>, giá trị cơ sở của cookie <code>uid</code>, vốn là <code>$publisher_origin_identifier</code> sẽ được sử dụng.</em>
</td>
  </tr>
</table>

<a id="task4"></a>

### Tác vụ 4: Xử lý ping phân tích từ bộ nhớ đệm AMP hoặc ngữ cảnh hiển thị của trình xem AMP và thiết lập các sơ đồ mã định danh (nếu cần) <a name="task-4-process-analytics-pings-from-amp-cache-or-amp-viewer-display-contexts-and-establish-identifier-mappings-if-needed"></a>

Khi chúng ta thiết lập ping phân tích trong [Tác vụ 2](#task2) để truyền tải dữ liệu từ các trang AMP được hiển thị trong một bộ nhớ đệm AMP hoặc trình xem AMP, chúng ta cũng tạo một vấn đề. Như đã thảo luận trước đây, các ngữ cảnh của bộ nhớ đệm AMP và trình xem AMP khác với ngữ cảnh trên nguồn gốc của nhà phát hành, và cùng với việc này là những cách khác nhau để duy trì mã định danh. Để xử lý các ping này nhằm tránh các vấn đề như đếm thừa người dùng, chúng ta sẽ thực hiện một số [bước](#implementation-steps) để thử đối chiếu mã định danh một cách thường xuyên nhất có thể.

Để giúp giải thích các bước tiến hành, bạn cần kiểm tra lại rằng vấn đề đếm thừa có nguồn gốc chính xác từ đâu.

#### Xem lại vấn đề <a name="reviewing-the-problem"></a>

Cân nhắc luồng sau:

1. Một người dùng truy cập **trang AMP trong một ngữ cảnh hiển thị trình xem AMP** như `https://google.com/amp/s/example.com/article.amp.html`. Bởi trình xem AMP không thể truy cập cookie `uid` trên nguồn gốc của nhà phát hành, một giá trị ngẫu nhiên là `$amp_client_id` sẽ được tạo để xác định người dùng.
2. Sau đó, người dùng này sẽ truy cập **một trang trên nguồn gốc của nhà phát hành `https://example.com`**. Như đã mô tả trong [Tác vụ 3](#task3), người dùng này được xác định bằng `$publisher_origin_identifier`.

Ở đây, (1) và (2) có thể xuát hiện trên các nguồn gốc (hay ngữ cảnh) khác nhau. Do đó, không có trạng thái chung và `$amp_client_id` sẽ khác với `$publisher_origin_identifier`. Vậy, ảnh hưởng của nó như thế nào? (1) là một phiên xem trang đơn trông như của một người dùng và (2) là một phiên xem trang đơn khác trông như của một người dùng khác. **Về mặt cơ bản, tuy người dùng đã duy trì tương tác với nội dung của `https://example.com`, chúng ta đã đếm thừa người dùng và người dùng trong (1) trông như được nảy lại (một lượt xem trang đơn).**

#### Chiến lược giải pháp <a name="solution-strategy"></a>

Để giải quyết vấn đề đếm thừa, bạn nên sử dụng chiến lược sau đây, hiệu quả của nó tùy thuộc vào việc liệu bạn cho phép đọc hay ghi cookie của bên thứ ba:

- **Đối chiếu mã định danh ngay lập tức: Nếu bạn có thể truy cập hoặc thay đổi cookie cho nguồn gốc của nhà phát hành**, sử dụng hoặc tạo mã định danh nguồn gốc của nhà phát hành và bỏ qua mọi mã định danh trong yêu cầu phân tích. Bạn sẽ có thể liên kết hoạt động giữa hai ngữ cảnh.
- **Đối chiếu mã định danh chậm: Nếu bạn không thể truy cập hay thay đổi mã định danh cho nguồn gốc của nhà phát hành (ví dụ như cookie)**, hãy quay về ID Máy khách AMP đi kèm theo chính yêu cầu phân tích đó. Sử dụng mã định danh này như một “**alias**” (biệt danh), thay vì sử dụng hay tạo một mã định danh cho nguồn gốc của nhà phát hành mới (cookie), vốn không thể được thực hiện (bởi cookie của bên thứ ba đã bị chặn), và thêm biệt danh này vào một **bảng sơ đồ**. Bạn sẽ không thể liên kết hoạt động ngay lập tức giữa 2 ngữ cảnh này, nhưng bằng cách sử dụng một bảng sơ đồ, bạn sẽ có thể liên kết giá trị ID Máy khách AMP với mã định danh cho nguồn gốc của nhà phát hành trên một lượt truy cập trong tương lai của người dùng này. Khi điều này xảy ra, bạn sẽ có thông tin cần thiết để liên kết hoạt động và đối chiếu lượt truy cập trang đó trong các ngữ cảnh khác nhau để xác định rằng chúng đến từ cùng một người dùng. Tác vụ 5 mô tả cách đạt được một giải pháp toàn diện trong các tình huống cụ thể, ở đó người dùng điều hướng trực tiếp từ một trang sang một trang khác.

#### Các bước triển khai <a name="implementation-steps"></a>

Trên máy chủ, kiểm tra một mã định danh cho nguồn gốc của nhà phát hành hiện có

Đọc các cookie được gửi đi như một phần của yêu cầu phân tích. Trong ví dụ của chúng ta, điều này có nghĩa là kiểm tra cookie `uid` từ example.com.

- Nếu giá trị `uid` được đọc thành công, sử dụng nó để ghi lại dữ liệu phân tích (**mã định danh hồ sơ phân tích**). Từ [Tác vụ 1](#task1), chúng ta biết giá trị của mã định danh này là `$publisher_origin_identifier`. Sau khi thiết lập mã định danh cho hồ sơ phân tích, chúng ta có thể bỏ qua đến phần [Lưu trữ dữ liệu](#data-storage).
- Nếu giá trị `uid` không được đọc thành công, tiếp tục với các bước dưới đây liên quan đến bảng sơ đồ.

##### Bảng sơ đồ <a name="mapping-table"></a>

Bảng sơ đồ của chúng ta sẽ liên kết các giá trị ID Máy khách AMP trong ping phân tích với mã định danh cho nguồn gốc của nhà phát hành như sau:

<table>
  <tr>
    <th width="50%"><strong>ID Người dùng trên nguồn gốc của nhà phát hành</strong></th>
    <th width="50%"><strong>ID Người dùng trên trang AMP KHÔNG PHẢI là nguồn gốc của nhà phát hành (“biệt danh”)</strong></th>
  </tr>
  <tr>
    <td>Đến từ mã định danh cho nguồn gốc của nhà phát hành hoặc được tạo như một giá trị tiềm năng nếu mã định danh cho nguồn gốc của nhà phát hành không thể được truy cập.</td>
    <td>Đến từ ID Máy khách AMP</td>
  </tr>
</table>

Ngay sau khi xác định rằng bạn đã không thành công trong việc đọc mã định danh cho nguồn gốc của nhà phát hành, kiểm tra rằng ID Máy khách AMP có trong ping phân tích đã được sử dụng trong một sơ đồ. Để làm điều này, trước hết hãy tham vấn yêu cầu amp-analytics vào để nhận giá trị ID Máy khách. Ví dụ, từ yêu cầu này:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id
[/sourcecode]

Chúng ta trích xuất phần bôi đậm tương ứng với ID Máy khách AMP: `$amp_client_id`.

Tiếp đó, kiểm tra bảng sơ đồ để cố tìm giá trị này trong cột “alias” (biệt danh):

<table>
  <tr>
    <th width="50%"><strong>ID Người dùng trên nguồn gốc của nhà phát hành</strong></th>
    <th width="50%"><strong>ID Người dùng trên trang AMP KHÔNG PHẢI là nguồn gốc của nhà phát hành (“biệt danh”)</strong></th>
  </tr>
  <tr>
    <td><code>$existing_publisher_origin_identifier</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Trong ví dụ ở trên, chúng ta tìm thấy một hồ sơ đã tồn tại. Giá trị tìm thấy được ghép đôi với ID Máy khách AMP sẽ trở thành mã định danh cho hồ sơ phân tích. Ở đây là `$existing_publisher_origin_identifier`. Sau khi thiết lập mã định danh cho hồ sơ phân tích, chúng ta có thể bỏ qua đến phần [Lưu trữ dữ liệu](#data-storage).

Mặt khác, nếu ID Máy khách AMP không được tìm thấy trong một sơ đồ, chúng ta cần tạo một sơ đồ:

1. Tạo một **mã định danh cho nguồn gốc của nhà phát hành tiềm năng**. Hãy gọi nó là `$prospective_identifier` trong các ví dụ sau đây. Giá trị này nên được tạo theo cách bạn thiết lập nó trên nguồn gốc của nhà phát hành, như được mô tả trong [Tác vụ 1](#task1) ở trên.
2. Tiếp theo, cố [thiết lập](https://en.wikipedia.org/wiki/HTTP_cookie#Setting_a_cookie) mã định danh cho nguồn gốc của nhà phát hành tiềm năng là một cookie trên nguồn gốc của nhà phát hành. Việc này sẽ thành công nếu cookie của bên thứ ba có thể được ghi, nếu không, nó sẽ thất bại.
3. Sau đó, lưu trữ cặp {mã định danh cho nguồn gốc của nhà phát hành tiềm năng, ID Máy khách AMP}.

Sơ đồ chúng ta đã tạo sẽ có dạng như sau:

<table>
  <tr>
    <th><strong>ID Người dùng trên nguồn gốc của nhà phát hành</strong></th>
    <th><strong>ID Người dùng trên trang AMP KHÔNG PHẢI là nguồn gốc của nhà phát hành (“biệt danh”)</strong></th>
  </tr>
  <tr>
    <td>
<code>$prospective_identifier</code> (được tạo theo nguyên tắc kịp thời khi ping phân tích được nhận)</td>
    <td> <code>$amp_client_id</code> (đến từ ping phân tích)</td>
  </tr>
</table>

Chúng ta sẽ sử dụng mã định danh cho nguồn gốc của nhà phát hành tiềm năng làm mã định danh cho hồ sơ phân tích bởi giá trị này đã được liên kết với trạng thái trên nguồn gốc của nhà phát hành. Trong trường hợp này, nó sẽ là `$prospective_identifier` và được sử dụng trong phần [Lưu trữ dữ liệu](#data-storage) sau đây.

##### Lưu trữ dữ liệu <a name="data-storage"></a>

Bây giờ bạn đã biết mã định danh cho hồ sơ phân tích, bạn có thể lưu trữ thông tin trạng thái người dùng (dữ liệu phân tích trong trường hợp này) đã được nhập bởi mã định danh đó:

[sourcecode:text]
{analytics record identifier, analytics data ...}
[/sourcecode]

<a id="task5"></a>

### Tác vụ 5: Sử dụng ID Máy khách trong liên kết và biểu mẫu được gửi đi <a name="task-5-using-client-id-in-linking-and-form-submission"></a>

Nhìn chung, khi việc đọc và ghi các cookie của bên thứ ba bị cấm, sẽ có các tình huống mà ở đó bạn không thể quản lý trạng thái người dùng một cách hiệu quả. Trong Tác vụ 1-4, các bước chúng ta đã thực hiện sẽ hữu ích trong 2 cách: (1) Chúng cung cấp một hoàn toàn giải pháp hiệu quả khi việc đọc và ghi cookie của bên thứ ba được cho phép, và (2) chúng thiết lập hệ thống của chúng ta để tận dụng mọi cơ hội đối chiếu các mã định danh của nhiều ngữ cảnh nếu việc đối chiếu ngay lập tức không thể được thực hiện do cài đặt cookie của trình duyệt.

Trong tác vụ này, chúng ta sẽ bao gồm một biện pháp tối ưu bổ sung cho trường hợp người dùng điều hướng trên nhiều ngữ cảnh khác nhau, từ trang này đến trang kia **thông qua liên kết hoặc gửi đi biểu mẫu**. Trong các tình huống này, và với việc triển khai như được mô tả dưới đấy, bạn có thể thiết lập một kế hoạch hoàn toàn hiệu quả để quản lý trạng thái người dùng trên nhiều ngữ cảnh.

<amp-img alt="Links can be used to pass the identifier information of one context into another (linked) context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/link-form-identifier-forwarding.png" width="866" height="784">
  <noscript><img alt="Các liên kết có thể được sử dụng để chuyển thông tin nhận dạng của một ngữ cảnh này sang một ngữ cảnh (được liên kết) khác" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/link-form-identifier-forwarding.png"></noscript></amp-img>

##### Sử dụng các tính năng thay thế <a name="using-substitution-features"></a>

Lối tiếp cận của chúng ta sẽ tận dụng 2 loại [biến số AMP thay thế](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-var-substitutions.md).

**Để cập nhật liên kết đầu ra cho việc sử dụng một ID Máy khách thay thế:** Định nghĩa một tham số truy vấn mới, `ref_id` (“ID giới thiệu”), sẽ xuất hiện trong URL và chỉ báo **mã định danh của ngữ cảnh gốc** cho người dùng. Thiết lập tham số truy vấn này cho bằng giá trị của ID Máy khách AMP thay thế:

[sourcecode:html]
<a
href="https://example.com/step2.html?ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Giải pháp thay thế để truyền ID Máy khách cho các liên kết đầu ra:** Định nghĩa thuộc tính truy vấn mới `ref_id` như một phần của thuộc tính dữ liệu `data-amp-addparams` và cho các truy vấn cần tham số thay thế, cung cấp các thông tin đó như một phần của `data-amp-replace`. Với lối tiếp cận này, URL trông sẽ gọn gàng và các tham số được quy định trên `data-amp-addparams` sẽ được bổ sung động

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

Để truyền nhiều tham số truy vấn thông qua `data-amp-addparams`, phân tách chúng bằng `&` như sau

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)&pageid=p123"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Để cập nhật đầu vào biểu mẫu cho việc sử dụng một ID Máy khách thay thế:** Định nghĩa tên cho trường nhập liệu, ví dụ như `orig_user_id`. Quy định `default-value` của trường biểu mẫu làm giá trị của ID Máy khách AMP thay thế:

[sourcecode:html]
<input
  name="ref_id"
  type="hidden"
  value="CLIENT_ID(uid)"
  data-amp-replace="CLIENT_ID"
/>
[/sourcecode]

Thông qua việc thực hiện các bước này, ID Máy khách có thể được sử dụng bởi máy chủ đích và/hoặc như một tham số URL trên trang mà người dùng truy cập sau khi nhấn vào liên kết hoặc gửi đi biểu mẫu (**ngữ cảnh đích đến**). Tên (hoặc “khóa”) này sẽ là `ref_id` bởi đó là cách chúng ta đã định nghĩa nó trong việc triển khai ở trên và sẽ có một giá trị liên kết bằng ID Máy khách. Ví dụ, khi theo liên kết (thẻ `<a>`) được định nghĩa ở trên, người dùng sẽ điều hướng đến URL này:

[sourcecode:http]
https://example.com/step2.html?ref_id=$amp_client_id
[/sourcecode]

<amp-img alt="Example of how an identifier in an AMP viewer context can be passed via link into a publisher origin context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/link-identifier-forwarding-example-1.png" width="1038" height="890">
  <noscript><img alt="Ví dụ về cách một số nhận dạng trong ngữ cảnh của trình xem AMP có thể được chuyển qua liên kết vào ngữ cảnh nguồn gốc của nhà xuất bản" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/link-identifier-forwarding-example-1.png"></noscript></amp-img>

Khi người dùng đến một trang chứa giá trị `ref_id` dưới dạng tham số URL hoặc trong đầu đề của nó, chúng ta sẽ có cơ hội xử lý đồng thời mã định danh `ref_id` và mã định danh được hiển thị thông qua chính trang đó (nghĩa là một giá trị cookie). Thông qua việc bao gồm một ping phân tích, máy chủ phân tích của bạn có thể làm việc với cả 2 giá trị cùng lúc, và, bởi chúng liên quan đến nhau, phản ánh mối quan hệ này trong backend của bạn. Bước tiếp theo cung cấp thông tin về cách để làm điều này.

##### Truy xuất tham số truy vấn URL <a name="extracting-url-query-parameters"></a>

Thông qua việc sử dụng tính năng thay thế, chúng ta đã thiết lập một luồng điều hướng liên kết hoặc luồng gửi đi biểu mẫu để hiển thị thông tin, cụ thể là ID Máy khách, cho máy chủ đích và/hoặc như một tham số URL có thể được đọc trên máy khách sau khi người dùng hoàn tất việc điều hướng.

Nếu thông tin chỉ được hiển thị cho máy chủ, nghĩa là thông qua một lệnh POST (ĐĂNG) biểu mẫu, bạn có thể tiếp tục xử lý thông tin và render trang kết quả. Khi xử lý dữ liệu này, hãy lưu ý các bước liên quan đến việc [Xác thực tham số](#parameter-validation) được nêu dưới đây.

Nếu thông tin này có sẵn trong URL và bạn muốn xử lý nó, có một vài lối tiếp cận mà bạn có thể sử dụng:

- Xử lý trong quá trình chuyển hướng (xử lý phía máy chủ)
- Xử lý trên trang đích đến (xử lý phía máy khách)

**Xử lý trong quá trình chuyển hướng (xử lý phía máy chủ)**

Để xử lý trong quá trình chuyển hướng, xử lý yêu cầu này trên máy chủ và truy xuất các tham số liên quan. Hãy lưu ý các bước liên quan đến việc [Xác thực tham số](#parameter-validation) được nêu dưới đây. Xử lý dữ liệu, kết hợp với các giá trị cookie chứa những mã định danh liên quan khác, và sau đó chuyển hướng đến một URL không chứa tham số này.

**Xử lý trên trang đích đến (xử lý phía máy khách)**

Để xử lý trên trang đích đến, lối tiếp cận này sẽ thay đổi tùy vào việc đó là một trang AMP hay không phải AMP.

<amp-img alt="Example of how to construct an analytics ping that contains an identifier from the previous context provided via URL and an identifier from the current context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/link-identifier-forwarding-example-2.png" width="1326" height="828">
  <noscript><img alt="Ví dụ về cách tạo một ping phân tích có chứa một số nhận dạng từ ngữ cảnh trước đó được cung cấp qua URL và một số nhận dạng từ ngữ cảnh hiện tại" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/link-identifier-forwarding-example-2.png"></noscript></amp-img>

_Cập nhật cho trang AMP:_ Sử dụng tính năng thay thế Tham số Truy vấn trong cấu hình amp-analytics của bạn để thu giá trị mã định danh `ref_id` trong URL. Tính năng Tham số Truy vấn nhận một tham số chỉ báo “khóa” của cặp giá trị khóa mong muốn trong URL và trả về giá trị tương ứng. Sử dụng tính năng ID Máy khách như bình thường để nhận mã định danh cho ngữ cảnh trang AMP.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}
[/sourcecode]

Khi thông tin này được truyền tải qua mạng lưới, giá trị thực tế của nó sẽ được thay thế:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$referrer_page_identifier&user_id=$current_page_identifier
[/sourcecode]

Tiếp tục ví dụ ở trên, chúng ta có:

[sourcecode:text]
$referrer_page_identifier is $amp_client_id
$current_page_identifier is $publisher_origin_id
[/sourcecode]

vậy nên ping thực tế là:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$amp_client_id&user_id=$publisher_origin_id
[/sourcecode]

Chúng tôi khuyến nghị xác thực các giá trị tham số truy vấn bằng các bước được nêu trong phần [Xác thực tham số](#parameter-validation) dưới đây.

_Cập nhật cho trang không phải AMP:_ Tương tự, trên một trang không phải AMP được phục vụ từ nguồn gốc của nhà phát hành, truy xuất và truyền tải giá trị `ref_id` có trong URL. Xác thực giá trị bằng cách làm theo các bước được nêu trong phần [Xác thực tham số](#parameter-validation) dưới đây. Sau đó, xây dựng các lệnh ping phân tích sẽ bao gồm cả `orig_user_id` được rút ra từ `ref_id` và `user_id` được dựa trên giá trị của mã định danh cookie của bên thứ nhất.

<blockquote>
<p><strong>QUAN TRỌNG:</strong></p>
<p>Nếu bạn chọn xử lý tham số ở phía máy khách trên trang đích đến, trang đích đến nên xóa thông tin mã định danh ra khỏi URL ngay khi mã định danh có thể được chụp.</p>
<p>Trước khi xóa các tham số này, hãy đảm bảo các đoạn mã khác cần chạy để đọc chúng đã:</p>
<ul>
  <li>Chạy trước khi việc xóa bỏ được thực hiện; hoặc</li>
  <li>Có thể truy cập nơi lưu trữ dữ liệu của đoạn mã đã đọc và xóa tham số này</li>
</ul>
<p>Để làm điều này trên trang không phải AMP của bạn, hãy bao gồm JavaScript sau, nó sẽ xóa tất cả tham số truy vấn ra khỏi URL:</p>
<pre>var href = location.href.replace(/\?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');<br>history.replaceState(null, null, href);</pre>
<p>Thay đổi tùy nhu cầu để xóa ít tham số truy vấn hơn.</p>
</blockquote>

##### Xử lý nhiều mã định danh trong một ping phân tích <a name="processing-multiple-identifiers-in-an-analytics-ping"></a>

Khác với [Tác vụ 4](#task4), ở đó chúng ta đã cấu hình ping phân tích để chỉ chứa một giá trị mã định danh, với các bước chúng ta đã thực hiện trong Tác vụ 5, giờ đấy chúng ta có cả `orig_user_id` và `user_id`. Tiếp theo, chúng ta sẽ bàn về cách để xử lý 2 mã định danh này, vốn là một phần của ping phân tích đầu vào.

Trước khi tiếp tục, hãy lưu ý các bước được mô tả trong phần [Xác thực tham số](#parameter-validation) dưới đây và đảm bảo bạn sẵn sàng tin cả 2 giá trị được biểu thị bởi `orig_user_id` và `user_id`.

Kiểm tra liệu các giá trị tương ứng với nó đã có trong bảng sơ đồ của bạn hay chưa. Trong ví dụ của chúng ta ở trên, lượt xem đầu tiên xảy ra ở một trang AMP KHÔNG PHẢI trên nguồn gốc của nhà phát hành, theo sau là lượt xem trang thứ hai, xảy ra trên nguồn gốc của nhà phát hành. Do đó, các giá trị cho tham số truy vấn của ping phân tích sẽ có dạng như sau:

**Trường hợp #1: Bố trí mã định danh từ ping phân tích được gửi từ trang trên nguồn gốc của nhà phát hành**

<table>
  <tr>
    <th width="20%"></th>
    <th width="40%"><strong>ID Người dùng trên nguồn gốc của nhà phát hành</strong></th>
    <th width="40%"><strong>ID Người dùng trên trang AMP KHÔNG PHẢI là nguồn gốc của nhà phát hành (“biệt danh”)</strong></th>
  </tr>
  <tr>
    <td><strong>Cách nó được diễn đạt trong ping phân tích</strong></td>
    <td><code>user_id=$publisher_origin_id</code></td>
    <td><code>orig_user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Khóa tham số</strong></td>
    <td><code>user_id</code></td>
    <td><code>orig_user_id</code></td>
  </tr>
  <tr>
    <td><strong>Giá trị tham số</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Hãy lưu ý rằng mã định danh đến từ lượt xem trang đầu tiên tương ứng với cột bên phải ngoài cùng và mã định danh đến từ lượt xem trang thứ hai nằm ở cột giữa, theo cách luồng mẫu của chúng ta đã được xây dựng.

Nếu thay vào đó, người dùng bắt đầu trên một trang được phục vụ từ nguồn gốc của nhà phát hành và sau đó điều hướng đến một trang AMP KHÔNG PHẢI trên nguồn gốc của nhà phát hành, thì các khóa của tham số sẽ được đảo ngược, nhưng cách tương ứng mà chúng ta tham chiếu đến các giá trị thì không (nghĩa là `$amp_client_id` sẽ luôn tham chiếu đến một mã định danh được lưu trữ trên một trang AMP, KHÔNG PHẢI trên nguồn gốc của nhà phát hành):

**Trường hợp #2: Bố trí mã định danh từ ping phân tích được gửi từ một trang AMP KHÔNG PHẢI trên nguồn gốc của nhà phát hành**

<table>
  <tr>
    <th width="20%"> </th>
    <th width="40%"><strong>ID Người dùng trên nguồn gốc của nhà phát hành</strong></th>
    <th width="40%"><strong>ID Người dùng trên trang AMP KHÔNG PHẢI là nguồn gốc của nhà phát hành (“biệt danh”)</strong></th>
  </tr>
  <tr>
    <td><strong>Cách nó được diễn đạt trong ping phân tích</strong></td>
    <td><code>orig_user_id=$publisher_origin_id</code></td>
    <td><code>user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Khóa tham số</strong></td>
    <td><code>orig_user_id</code></td>
    <td><code>user_id</code></td>
  </tr>
  <tr>
    <td><strong>Giá trị tham số</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Khi bạn tìm kiếm trong bảng sơ đồ, hãy lưu ý tình huống được áp dụng và tìm kiếm giá trị trong các cột của bảng sơ đồ ở nơi bạn kỳ vọng chúng sẽ xuất hiện. Ví dụ, nếu ping phân tích đang được gửi từ một trang trên nguồn gốc của nhà phát hành (Trường hợp #1), hãy kiểm tra các giá trị được nhập bởi `user_id` trong cột “ID Người dùng trên nguồn gốc của nhà phát hành” của bảng sơ đồ và kiểm tra các giá trị được nhập bởi `orig_user_id` trong cột “ID Người dùng ở trang AMP KHÔNG PHẢI trên nguồn gốc của nhà phát hành (‘biệt danh’)”.

Nếu bạn không thể tìm được giá trị mã định danh nào được sử dụng trong bảng sơ đồ của mình, hãy thiết lập một sơ đồ mới:

- Nếu yêu cầu phân tích đến từ một trang trên nguồn gốc của nhà phát hành, bạn nên chọn giá trị tương ứng với `uid` làm mã định danh cho hồ sơ phân tích; chọn giá trị `orig_uid` làm “biệt danh”.
- Nếu yêu cầu phân tích không đến từ một trang trên nguồn gốc của nhà phát hành, bạn nên chọn giá trị tương ứng với `uid` làm giá trị “biệt danh” trong bảng sơ đồ. Sau đó, thực hiện các hướng dẫn còn lại trong [Tác vụ 4](#task4) để tạo một mã định danh cho nguồn gốc của nhà phát hành tiềm năng và cố thiết lập giá trị này làm cookie trên nguồn gốc.

##### Xác thực tham số <a name="parameter-validation"></a>

Các giá trị được chứa trong một URL có thể bị thay đổi một cách ác ý, có dạng không hợp lệ, hoặc nói cách khác không phải là giá trị mà bạn kỳ vọng. Hiện tượng này đôi khi được gọi là giả mạo yêu cầu chéo website. Tương tự như việc bạn cần đảm bảo ping phân tích mà máy chủ phân tích nhận được đều đến từ các trang gửi ping phân tích hợp lệ, khi bạn “chuyển tiếp” các giá trị là một phần của URL, hãy nhớ xác thực trình giới thiệu để đảm bảo bạn có thể tin các giá trị này.

Ví dụ, trong các bước ở trên, chúng ta đã xây dựng URL sau đây, nhằm để người dùng nhấn vào và điều hướng đến trang tương ứng:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$amp_client_id
[/sourcecode]

Tuy nhiên, người dùng hoặc một kẻ tấn công nào đó cũng có thể thay đổi URL này thành:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$malicious_value
[/sourcecode]

Bạn muốn đảm bảo rằng bạn chỉ xử lý các trường hợp `$amp_client_id` và tránh sử dụng các trường hợp `$malicious_value`.

**Các bước đề xuất để xác thực giá trị nhận được qua tham số truy vấn URL:** Xác nhận rằng trình giới thiệu của trang đích đến khớp với URL mà bạn kỳ vọng sẽ nhìn thấy. Nó thường là giá trị mà bạn đã biết, mang theo một mã định danh đã được xác định từ trước trong một yêu cầu CORS hợp lệ. Chúng tôi khuyến nghị bạn chỉ chấp nhận các mã định danh đã biết.

Trên một trang không phải AMP, hãy kiểm tra `document.referrer` trực tiếp trên phía máy khách hoặc chuyển tiếp giá trị này như một phần của ping phân tích để có thể xác thực trên phía máy chủ. Nếu bạn có thể tin tưởng giá trị giới thiệu, thì bạn có thể chấp nhận và xử lý các giá trị xuất phát từ URL của trang đích đến, ví dụ như `orig_user_id` trong ví dụ ở trên.

Trên một trang AMP, sử dụng biến số thay thế cho [Trình Giới thiệu Tài liệu](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#document-referrer) để chuyển tiếp giá trị giới thiệu như một phần của ping phân tích. Việc xử lý ở phía máy chủ là lựa chọn duy nhất. Để minh họa, đây là một ping phân tích mà trang đích đến có thể gửi chứa (1) giá trị ID Máy khách của trang hiện tại, (2) một giá trị được chuyển tiếp qua URL mà chúng ta đã thiết lập làm giá trị ID Máy khách trong trang giới thiệu, và (3) thông tin của trình giới thiệu để xác thực giá trị của (2): `https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}&referrer=${documentReferrer}`

Nếu bạn không thể tin tưởng trình giới thiệu, hãy từ chối mọi giá trị được cung cấp thông qua các tham số URL và không sử dụng chúng.

## Các biện pháp thực hành được đặc biệt khuyến nghị <a name="strongly-recommended-practices"></a>

### Chỉ giữ một mối quan hệ liên kết <a name="keep-just-one-association"></a>

**Chỉ nên duy trì một mối quan hệ liên kết giữa các mã định danh từ 2 ngữ cảnh bất kỳ.** Nếu một ID Máy khách AMP mà trước đây đã được bạn liên kết với một cookie hoặc một mã định danh người dùng khác mà bạn đã cấp được nhìn thấy với một cookie mới hoặc mã định danh người dùng mới mà bạn đã cấp, bạn nên xóa mọi trạng thái mà bạn đã duy trì cho cookie và mã định danh người dùng trước đó.

Các bước này sẽ giúp đảm bảo bạn tuân thủ các kỳ vọng về quyền riêng tư của người dùng. Như đã được mô tả trong các phần trên, việc quản lý trạng thái người dùng trong AMP thường liên quan đến việc lưu trữ và liên kết các mã định danh khác nhau trên nhiều ngữ cảnh mà ở đó nội dung AMP được hiển thị. **Tình huống này không nên được lạm dụng để xây dựng lại dữ liệu hoặc thực hiện những việc theo dõi ngoài kỳ vọng của người dùng hay chưa được tiết lộ cho họ, ví dụ như sau khi người dùng đã xóa cookie của họ cho website của bạn.**

### Tôn trọng cookie và lệnh xóa lưu trữ cục bộ <a name="respect-cookie-and-local-storage-deletions"></a>

**Bạn nên tôn trọng mọi biện pháp kiểm soát quyền riêng tư được áp dụng của người dùng, bao gồm mọi biện pháp kiểm soát cho khả năng xóa toàn bộ cookie và ổ lưu trữ cục bộ.** Trong mọi trường hợp, ID Máy khách AMP hoặc cấu trúc AMP đều không nên [được sử dụng để xây dựng lại một mã định danh đã bị xóa](https://en.wikipedia.org/wiki/Zombie_cookie) sau khi người dùng đã xóa một phía của mối quan hệ với mã định danh.

### Tuân thủ luật pháp và quy định địa phương <a name="comply-with-local-laws-and-regulations"></a>

**Việc liên kết các cookie và/hoặc mã định danh từ 2 hay nhiều tên miền có thể đòi hỏi bạn cập nhật chính sách quyền riêng tư của mình, tiết lộ bổ sung cho người dùng, hay có được sự đồng ý của người dùng cuối trong một số khu vực tài phán.** Việc sử dụng ID Máy khách AMP, nghĩa là sử dụng cookie hoặc ổ lưu trữ cục bộ làm ổ lưu trữ cố định để đảm bảo mã định danh ổn định, nên được các nhà phát hành cân nhắc liên quan đến mọi luật pháp và quy định hiện hành về thu thập, lưu trữ, xử lý dữ liệu và thông báo cho người dùng.

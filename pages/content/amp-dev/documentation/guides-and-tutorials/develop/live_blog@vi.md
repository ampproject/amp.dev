---
"$title": Tạo một blog trực tiếp
"$order": '102'
description: Blog trực tiếp là các trang web được cập nhật thường xuyên trong suốt một sự kiện đang diễn ra, ví dụ như một sự kiện thể thao hoặc một cuộc bầu cử. Trong AMP, bạn có thể triển khai một blog trực tiếp bằng cách sử dụng...
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- bpaduch
---

Blog trực tiếp là các trang web được cập nhật thường xuyên trong suốt một sự kiện đang diễn ra, ví dụ như một sự kiện thể thao hoặc một cuộc bầu cử. Trong AMP, bạn có thể triển khai một blog trực tiếp bằng cách sử dụng thành phần [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md).

Bài thực hành này cung cấp một cái nhìn tổng quan về thành phần [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) và tập trung vào các chi tiết triển khai cho blog trực tiếp, như [chia trang](#pagination) và [deep linking](#deeplinking). Chúng ta sẽ sử dụng [mẫu blog trực tiếp](live_blog.md) của AMP By Example để minh họa cho việc triển khai blog trực tiếp trong AMP.

[tip type="tip"] **MẸO –** Sử dụng đánh dấu siêu dữ liệu [LiveBlogPosting](http://schema.org/LiveBlogPosting) để blog của bạn có thể được tích hợp với các tính năng của nền tảng bên thứ ba. [/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## Tổng quan về `amp-live-list`

Thành phần [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) thường xuyên thăm dò tài liệu gốc để cập nhật các nội dung mới cho trình duyệt của người dùng khi các mục mới được đăng. Điều này có nghĩa mỗi khi một bài đăng blog mới cần được bổ sung, tài liệu gốc nên được CMS cập nhật để bao gồm bản cập nhật trong cả nội dung và phần [siêu dữ liệu](../../../documentation/examples/documentation/Live_Blog.html#metadata) của trang.

Đoạn code ban đầu cho blog sẽ trông như thế này:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
</amp-live-list>
```

Hãy xem đoạn code này:

Mỗi thành phần [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) đòi hỏi một ID riêng bởi có thể có nhiều thành phần này trên một trang. Trong ví dụ này, chúng ta đã quy định `my-live-list` làm ID riêng.

Thuộc tính `data-poll-interval` quy định tần suất thăm dò; nếu tài liệu gốc được cập nhật, bản cập nhật sẽ được cung cấp cho người dùng sau chu kỳ thời gian tiếp theo.

Mỗi khi một mục mới được thêm vào tài liệu gốc, yếu tố `<button update on="tap:my-live-list.update">` sẽ hiển thị một nút "Bạn có bản cập nhật" mà khi nhấn vào đó, sẽ kích hoạt trang để hiển thị các bài đăng mới nhất.

Blog trực tiếp có thể phát triển và khiến trang trở nên quá dài. Bạn có thể thêm thuộc tính `data-max-items-per-page` để quy định có bao nhiêu mục có thể được thêm vào blog trực tiếp. Nếu số mục sau một bản cập nhật vượt quá `data-max-items-per-page`, các bản cập nhật cũ nhất vượt quá số này sẽ bị xóa. Ví dụ, nếu trang hiện có 9 mục và `data-max-items-per-page` được đặt là 10, và có 3 mục mới được đăng trong bản cập nhật mới nhất, 2 mục cũ nhất sẽ bị xóa khỏi trang với bản cập nhật mới nhất.

Tất cả các bài đăng trong [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) đều phải là con của `<div items></div>`. Thông qua việc nhắc đến mỗi bài đăng như một mục, mọi mục đều có một `id` riêng và một `data-sort-time`.

## Chi tiết triển khai

Bây giờ bạn đã làm quen với thành phần [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), hãy xem cách để triển khai một blog trực tiếp phức tạp hơn. Đọc tiếp để tìm hiểu thêm về cách triển khai chia trang, và cách hoạt động của liên kết sâu.

### Chia trang <a name="pagination"></a>

Các blog dài có thể sử dụng chia trang để cải thiện hiệu năng bằng cách giới hạn số mục blog được hiển thị trên một trang. Để triển khai chia trang, trong thành phần [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), thêm `<div pagination></div>`, sau đó chèn mọi đánh dấu bạn cần để chia trang (ví dụ, một số trang hoặc một liên kết đến trang tiếp theo và trang trước đó).

Với chia trang, một đoạn code đơn giản chúng ta đã sử dụng trước đây sẽ trở thành:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
  <div pagination>
    <nav>
      <ul>
        <li>1</li>
        <li>Next</li>
      </ul>
     </nav>
   </div>
</amp-live-list>
```

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample_pg2.png', 700, 1441, align='right third') }}

Bạn có trách nhiệm điền đúng các mục điều hướng bằng cách cập nhật trang gốc. Ví dụ, trong [mẫu blog trực tiếp](live_blog.md), chúng ta render trang thông qua một khuôn mẫu phía máy chủ và sử dụng tham số truy vấn để quy định mục blog đầu tiên của trang đó. Chúng ta giới hạn mỗi trang có 5 mục, để nếu máy chủ đã tạo nhiều hơn 5 mục, một người dùng vào trang chính sẽ thấy yếu tố "Tiếp theo" trong khu vực điều hướng. Tham khảo [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) để biết thêm chi tiết.

Sau khi kích cỡ của bài đăng blog đã vượt quá số mục tối đa được quy định trong `data-max-items-per-page`, các mục blog cũ hơn sẽ được hiển thị trong các trang "Tiếp theo", ví dụ là trên trang 2. Bởi lẽ [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) sẽ thăm dò máy chủ định kỳ để xem liệu có thay đổi nào cho các mục hay không, sẽ không cần thăm dò máy chủ nếu người dùng đang không ở trang đầu tiên.

Bạn có thể thêm thuộc tính disabled (tắt) vào trang gốc để ngăn cơ cấu thăm dò này. Trong mẫu blog trực tiếp, chúng ta thực hiện hành vi này trong khuôn mẫu phía máy chủ; khi trang được yêu cầu không phải là trang đầu tiên, chúng ta thêm thuộc tính disabled (tắt) vào thành phần [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md).

### Liên kết sâu <a name="deeplinking"></a>

Khi bạn phát hành một bài đăng blog, bạn cần có thể tạo liên kết sâu đến bài đăng này để cho phép các tính năng như chia sẻ. Với [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), bạn có thể liên kết sâu bằng cách sử dụng `id` của mục blog. Ví dụ, [https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3) cho phép bạn điều hướng trực tiếp đến bài đăng blog có ID `post3`.

AMP By Example sử dụng một cookie trong [mẫu blog trực tiếp](live_blog.md) để tạo nội dung mới, vậy nên nếu đây không phải lần đầu tiên bạn truy cập trang, bài đăng với ID “post3” có thể sẽ không khả dụng, trong trường hợp đó, bạn sẽ được đổi hướng đến bài đăng đầu tiên.

## Tài nguyên

Tìm hiểu thêm từ các tài nguyên này:

- Tài liệu tham khảo cho [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [Mẫu blog trực tiếp của AMP BY Example](live_blog.md)

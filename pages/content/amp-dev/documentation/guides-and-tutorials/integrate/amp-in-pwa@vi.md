---
"$title": Sử dụng AMP như một nguồn dữ liệu cho PWA của bạn
"$order": '1'
description: Nếu bạn đã đầu tư vào AMP nhưng chưa xây dựng một Ứng dụng Web Lũy tiến (PWA), các Trang AMP của bạn có thể đơn giản hóa đáng kể việc phát triển Ứng dụng Web Lũy tiến.
formats:
- websites
author: pbakaus
---

Nếu bạn đã đầu tư vào AMP nhưng chưa xây dựng một Ứng dụng Web Lũy tiến (PWA), các Trang AMP của bạn có thể đơn giản hóa đáng kể việc phát triển Ứng dụng Web Lũy tiến. Trong hướng dẫn này, bạn sẽ học được cách sử dụng AMP trong Ứng dụng Web Lũy tiến và sử dụng các Trang AMP hiện có của bạn như một nguồn dữ liệu.

## Từ JSON đến AMP

Trong tình huống phổ biến nhất, một Ứng dụng Web Lũy tiến là một ứng dụng đơn trang kết nối đến một JSON API thông qua Ajax. JSON API này sau đó sẽ trả về các nhóm dữ liệu để thúc đẩy việc điều hướng, và nội dung thực tế để render bài viết.

Sau đó, bạn sẽ có thể chuyển nội dung thô thành HTML khả dụng và hiển thị nó lên máy khách. Quy trình này rất tốn kém và thường khó duy trì. Thay vào đó, bạn có thể tái sử dụng các Trang AMP hiện có như một nguồn nội dung. Tuyệt vời nhất, bạn có thể dễ dàng làm việc đó trong AMP chỉ với một vài dòng code.

## Bao gồm "Shadow AMP" trong Ứng dụng Web Lũy tiến

Bước đầu tiên là bao gồm một phiên bản đặc biệt của AMP mà chúng tôi gọi là “Shadow AMP” trong Ứng dụng Web Lũy tiến của bạn. Đúng vậy – bạn tải thư viện AMP ở trang cấp cao nhất, nhưng nó sẽ không thực sự kiểm soát nội dung cấp cao nhất. Nó chỉ “tăng cường” các phần của trang chúng tôi mà bạn yêu cầu.

Bao gồm Shadow AMP ở phần head của trang như thế này:

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

### Làm thế nào thì bạn biết API Shadow AMP đã sẵn sàng để sử dụng?

Chúng tôi khuyên bạn nên tải thư viện Shadow AMP với thuộc tính `async` (không đồng bộ). Điều đó có nghĩa là bạn cần sử dụng một lối tiếp cận nhất định để hiểu khi nào thì thư viện đã được tải đầy đủ và sẵn sàng để sử dụng.

Tín hiệu cần quan sát là tình trạng sẵn có của biến số `AMP` toàn cục, và Shadow AMP sử dụng một “[lối tiếp cận tải chức năng không đồng bộ](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)” để hỗ trợ việc đó. Hãy cân nhắc đoạn code này:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP is now available.
});
[/sourcecode]

Đoạn code này sẽ hoạt động, và mọi cuộc gọi lại được bổ sung theo cách này sẽ kích hoạt khi AMP khả dụng, nhưng vì sao?

Đoạn code này có nghĩa:

1. “nếu window.AMP không tồn tại, tạo một dãy trống để chiếm vị trí của nó”
2. "sau đó đẩy một chức năng gọi lại vào dãy để được thực thi khi AMP đã sẵn sàng"

Nó hoạt động bởi thư viện Shadow AMP, khi được tải thực tế, sẽ nhận ra rằng đã có một dãy cuộc gọi lại trong `window.AMP`, và sau đó xử lý toàn bộ hàng đợi này. Nếu sau đó bạn thực thi lại chức năng này, nó vẫn sẽ hoạt động, bởi Shadow AMP sẽ thay `window.AMP` bằng chính nó và một phương thức `push` (đẩy) tùy chỉnh sẽ kích hoạt cuộc gọi lại ngay lập tức.

[tip type="tip"] **MẸO –** Để tiện sử dụng đoạn code mẫu ở trên, chúng tôi khuyên bạn nên bọc nó trong một Promise (Lời hứa), sau đó luôn sử dụng Promise (Lời hứa) đó trước khi làm việc với AMP API. Hãy xem [Đoạn code mẫu React](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) của chúng tôi để biết ví dụ. [/tip]

## Xử lý việc điều hướng trong Ứng dụng Web Lũy tiến của bạn

Bạn vẫn cần triển khai thủ công bước này. Bởi lẽ, việc trình bày các liên kết đến nội dung trong khái niệm điều hướng của bạn là tùy thuộc vào bạn. Một số danh sách? Một loạt thẻ?

Trong tình huống phổ biến nhất, bạn sẽ truy xuất một số JSON, chúng sẽ trả về những URL đã đặt với một vài siêu dữ liệu. Cuối cùng, bạn sẽ có một cuộc gọi lại chức năng được kích hoạt khi người dùng nhấn vào một trong các liên kết, và cuộc gọi lại đó sẽ bao gồm URL của Trang AMP đã yêu cầu. Nếu bạn có nó, bạn đã sẵn sàng cho bước cuối cùng.

## Sử dụng API Shadow AMP để render mộ trang inline

Cuối cùng, khi bạn muốn hiển thị nội dung sau một hành động của người dùng, hãy truy xuất tài liệu AMP liên quan và cho phép Shadow AMP giành quyền kiểm soát. Đầu tiên, triển khai một chức năng để truy xuất trang, tương tự như:

[sourcecode:javascript]
function fetchDocument(url) {

  // unfortunately fetch() does not support retrieving documents,
  // so we have to resort to good old XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contains a ready-to-use Document object
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

[tip type="important"] **QUAN TRỌNG –** Để đơn giản hóa đoạn code ở trên, chúng tôi đã bỏ qua khâu xử lý lỗi. Bạn luôn nên đảm bảo bắt và xử lý các lỗi một cách khéo léo. [/tip]

Bây giờ thì chúng ta đã có đối tượng `Document` (Tài liệu) sẵn dùng, hãy để AMP giành quyền kiểm soát và render nó. Nhận một tham chiếu cho yếu tố DOM có tác dụng như một container cho tài liệu AMP, sau đó gọi `AMP.attachShadowDoc()` như thế này:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
  // Let AMP take over and render the page
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] **MẸO –** Trước khi bạn trao tài liệu cho AMP, đây là thời điểm thích hợp để xóa các yếu tố trang vốn phù hợp khi hiển thị trang AMP độc lập, nhưng không thích hợp trong chế độ nhúng: Ví dụ, các chân trang và đầu đề trang. [/tip]

Và thế là xong! Trang AMP của bạn sẽ render như một con của Ứng dụng Web Lũy tiến tổng quát.

## Dọn dẹp

Nhiều khả năng người dùng sẽ điều hướng giữa các trang AMP trong Ứng dụng Web Lũy tiến của bạn. Khi loại bỏ Trang AMP đã render trước đó, hãy luôn đảm bảo rằng bạn đã thông báo với AMP, ví dụ như:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

Điều này sẽ cho AMP biết bạn không còn sử dụng tài liệu này nữa và giải phóng bộ nhớ và CPU đang dùng.

## Xem hoạt động thực tế

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Bạn có thể thấy quy luật "AMP trong PWA" trong [mẫu React](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) mà chúng tôi đã xây dựng. Nó minh họa sự chuyển tiếp mượt mà trong quá trình điều hướng và đi kèm một thành phần React đơn giản để bọc các bước ở trên. Nó có ưu điểm của cả hai ngôn ngữ – JavaScript linh hoạt, tùy chỉnh trong Ứng dụng Web Lũy tiến, với AMP để thúc đẩy nội dung.

- Tải mã nguồn ở đây: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- Sử dụng thành phần React độc lập thông qua npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- Xem hành động thực tế ở đây: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (tốt nhất trên điện thoại hoặc trình giả lập di động của bạn)

Bạn cũng có thể xem code mẫu của PWA và AMP sử dụng khung Polymer. Mẫu này sử dụng [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) để nhúng các trang AMP.

- Tải mã ở đây: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- Xem hoạt động thực tế ở đây: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)

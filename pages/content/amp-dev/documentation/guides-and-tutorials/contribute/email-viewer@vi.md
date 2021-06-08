---
'$title': Sử dụng AMP Viewer để render email
$order: 5
author: alabiaga
formats:
  - email
---

Các trình khách email muốn hỗ trợ AMP cho Email nên sử dụng [AMP Viewer](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) để lưu trữ các email AMP của người gửi. Một trình xem được xây dựng với [Thư viện AMP Viewer](https://github.com/ampproject/amphtml/tree/main/extensions/amp-viewer-integration) sẽ bọc lấy một tài liệu AMP và hỗ trợ các [chức năng](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/CAPABILITIES.md) cho phép giao tiếp hai chiều với tài liệu AMP thông qua postMessage. Các chức năng này bao gồm cấp quyền kiểm soát hiển thị email, chuyển tiếp thông số người dùng và cung cấp các cách để đảm bảo sự an toàn cho các yêu cầu XHR được thực hiện từ email.

## Tiếp quản XHR của Trình xem

Chức năng `xhrInterceptor` của thư viện AMP Viewer cho phép trình xem có thể tiếp quản các yêu cầu XHR ra ngoài. AMP Viewer có thể kiểm tra một yêu cầu để xác định tính hợp lệ và ý định của nó nhằm đảm bảo độ bảo mật và quyền riêng tư của các người dùng.

#### Yêu cầu XHR

Các thành phần AMP như [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) và [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) yêu cầu các lệnh gọi đến điểm cuối để đăng hoặc truy xuất dữ liệu. Các lệnh gọi này được phân loại là các yêu cầu XHR.

#### Giao tiếp giữa Trình xem và tài liệu AMP

Giao thức được sử dụng để giao tiếp giữa trình xem và tài liệu AMP có được thông qua [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). Sau đây là một ví dụ nhỏ về hoạt động của postMessage trong trường hợp sử dụng về tiếp quản XHR, ở đó trình xem xử lý xhr postMessage được gửi từ một tài liệu AMP và trả về một hồi đáp tùy chỉnh.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
  const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {
    type: 'application/json',
  });
  const response = new Reponse(blob, {status: 200});
  return response;
};
```

### Cho phép tiếp quản XHR

Cho phép tiếp quản XHR bằng cách bật chức năngxhrInterceptor của trình xem khi khởi động. Hãy xem ví dụ cho trình xem về cách thực hiện việc này và một ví dụ về tiếp quản XHR. Sau đó, tài liệu AMP cần được bật và cho phép tiếp quản XHR. Các tài liệu bật chức năng này bằng cách thêm thuộc tính `allow-xhr-interception` vào thẻ `<html amp4email>`. Trình khách email phải đặt thuộc tính này trên tài liệu AMP trước khi render bởi nó cố tình được đặt là một thuộc tính không hợp lệ và sẽ được gắn cờ như vậy trong quá trình xác thực tài liệu AMP.

```html
<!DOCTYPE html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## Render khuôn mẫu phía máy chủ trình xem

Chức năng `viewerRenderTemplate` cho phép trình xem quản lý việc render khuôn mẫu [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) và [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email). Khi bật chức năng này, thời gian chạy AMP sẽ gửi trung gian một yêu cầu chứa lệnh gọi XHR gốc, dữ liệu khuôn mẫu và mọi chi tiết khác cần để render nội dung thành phần cho trình xem. Việc này cho phép trình xem kiểm tra nội dung dữ liệu điểm cuối và quản lý việc render [mustache](https://mustache.github.io/) của các khuôn mẫu nhằm xác minh và khử trùng dữ liệu. Lưu ý rằng nếu chức năng này được bật cùng với xhrInterceptor, trong thành phần amp-form và amp-list, chức năng `viewerRenderTemplate` gửi trung gian các yêu cầu đến trình xem sẽ được ưu tiên hơn xhrInterceptor.

Ví dụ [viewer.html](https://github.com/ampproject/amphtml/blob/main/examples/viewer.html) cho thấy cách một người có thể xử lý thông điệp `viewerRenderTemplate` được gửi từ tài liệu AMP. Trong ví dụ đó, Viewer.prototype.processRequest\_ sẽ bắt thông điệp `viewerRenderTemplate` và tùy vào loại thành phần amp có sẵn trong yêu cầu, gửi trả HTML để được render trong định dạng JSON sau đó.

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) =>
  Promise.resolve({
    'html':
      "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>" +
      "<div class='product' role='listitem'>Apple</div>" +
      '</div>',
    'body': '',
    'init': {
      'headers': {
        'Content-Type': 'application/json',
      },
    },
  });
```

Đây là một ví dụ nhỏ về trường hợp không có phụ thuộc thư viện [mustache](https://mustache.github.io/) hay khử trùng nội dung.

Sơ đồ dưới đây minh họa một trường hợp thực tế về cách một tài liệu AMP trong một trình xem email với chức năng `viewerRenderTemplate` có thể xử lý việc render khuôn mẫu [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email).

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

Thời gian chạy AMP sẽ gửi trung gian yêu cầu truy xuất dữ liệu thành phần [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) cho trình xem, việc này sẽ chuyển tiếp yêu cầu này đến một máy chủ của trình khách email. Sau đó, máy chủ này sẽ gửi URL và kết quả truy xuất URL thông qua các dịch vụ khác nhau, có thể cũng kiểm tra tính hợp lệ của URL, nội dung của dữ liệu được trả về từ URL đó và render khuôn mẫu [mustache](https://mustache.github.io/) với dữ liệu đó. Sau đó, nó sẽ trả về khuôn mẫu được render đó và gửi nó về cho trình xem trong định dạng hồi đáp JSON sau đây.

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init": {
    "headers": {
      "Content-Type": "application/json"
    }
  }
}
```

Giá trị html trong trọng tải JSON sẽ là giá trị được chèn vào tài liệu AMP để render.

Bảng dưới đây phác thảo chức năng và các thành phần bị ảnh hưởng:

<table>
  <thead>
    <tr>
      <th width="30%">Chức năng trình xem</th>
      <th>Các thành phần bị ảnh hưởng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xhrInterceptor</td>
      <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email), [amp-state](https://amp.dev/documentation/components/amp-bind?format=email#initializing-state-with-amp-state)</code></td>
    </tr>
     <tr>
       <td>viewerRenderTemplate</td>
       <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email)</code></td>
    </tr>
  </tbody>
</table>

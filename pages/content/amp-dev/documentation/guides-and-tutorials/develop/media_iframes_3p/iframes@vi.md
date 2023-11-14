---
'$title': Bao gồm các iframe
$order: 10
description: Tìm hiểu cách để hiển thị các nội dung đa phương tiện trong trang của bạn, và cách sử dụng iframe để hiển thị các nội dung nâng cao bên ngoài giới hạn của AMP.
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## Kiến thức cơ bản

Bạn có thể hiển thị một iframe trong trang của mình bằng cách sử dụng yếu tố [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md).

Iframe đặc biệt hữu ích trong AMP để hiển thị các nội dung không được hỗ trợ trong ngữ cảnh của trang chính, ví dụ như các nội dung đòi hỏi JavaScript do người dùng viết.

### Yêu cầu đối với `amp-iframe`

- Phải cách mép trên của màn hiển thị đầu tiên ít nhất **600px** hoặc **75%** (ngoại trừ các iframe sử dụng [`placeholder`](#using-placeholders) (mã giữ chỗ)).
- Chỉ có thể yêu cầu các tài nguyên qua HTTPS, và chúng phải không có cùng nguồn với container, trừ khi chúng không quy định allow-same-origin (cho phép cùng nguồn gốc).

[tip type="read-on"] **ĐỌC TIẾP** – Tìm hiểu thêm ở phần [thông số kỹ thuật đầy đủ cho `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md). [/tip]

### Bao gồm kịch bản

Để bao gồm một [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) trong trang của bạn, trước hết hãy bao gồm kịch bản sau trong phần `<head>` để tải thêm code cho thành phần mở rộng:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### Viết đánh dấu

Trong ví dụ sau, chúng ta đã tạo một [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) hồi đáp để nhúng Google Maps thông qua [API Nhúng Google Maps](https://developers.google.com/maps/documentation/embed/guide):

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## Sử dụng mã giữ chỗ <a name="using-placeholders"></a>

Bạn có thể hiển thị một [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) ở đầu tài liệu, với điều kiện [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) chứa một yếu tố với thuộc tính `placeholder` (mã giữ chỗ), (ví dụ, một yếu tố [`amp-img`](../../../../documentation/components/reference/amp-img.md)) nó sẽ được render dưới dạng một mã giữ chỗ cho đến khi iframe đã sẵn sàng để được hiển thị.

[tip type="read-on"] **ĐỌC TIẾP –**: Tìm hiểu thêm về mã giữ chỗ trong [Iframe với mã giữ chỗ](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder). [/tip]

Ví dụ với mã giữ chỗ:

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

Render dưới dạng:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## Ví dụ

Bạn có thể tìm thấy các ví dụ nâng cao hơn về [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) trong [AMP By Example](../../../../documentation/examples/documentation/amp-iframe.html).

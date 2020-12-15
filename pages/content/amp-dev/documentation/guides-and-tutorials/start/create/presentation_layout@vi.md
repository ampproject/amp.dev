---
"$title": Sửa đổi trình bày và bố cục
"$order": '3'
description: "Các trang AMP là các trang web; mọi phong cách cho trang và các yếu tố của nó đều được thực hiện sử dụng các đặc tính CSS thông dụng. Các yếu tố phong cách sử dụng bộ chọn lớp hoặc yếu tố..."
author: pbakaus
contributors:
- bpaduch
---

## Sửa đổi trình bày

Các trang AMP là các trang web; mọi phong cách cho trang và các yếu tố của nó đều được thực hiện sử dụng các đặc tính CSS thông dụng. Các yếu tố phong cách sử dụng bộ chọn lớp hoặc yếu tố trong một stylesheet nhúng trong phần `<head>`, gọi là `<style amp-custom>`:

[sourcecode:html]
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
[/sourcecode]

Mọi trang AMP đều chỉ có thể có một stylesheet nhúng duy nhất và các phong cách inline, nhưng có một số bộ chọn nhất định mà bạn không được phép sử dụng. [Tìm hiểu thêm về tạo phong cách](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Kiểm soát bố cục

AMP tuân thủ các quy tắc chặt chẽ hơn khi bố trí các yếu tố trên trang. Trên một trang HTML thông thường, bạn sẽ chủ yếu sử dụng CSS để bố trí các yếu tố. Nhưng vì lý do hiệu năng, AMP đòi hỏi tất cả các yếu tố đều phải có một nhóm kích cỡ rõ ràng từ đầu.

[tip type="read-on"] **ĐỌC THÊM –** Tìm hiểu chi tiết về cách AMP render và bố trí một trang và cách bạn có thể sửa bố cục này trong [Bố cục & Truy vấn Đa phương tiện](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

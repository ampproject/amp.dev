---
"$title": Làm quen với code bắt đầu
"$order": '1'
description: Một trang AMP là một trang HTML với một số hạn chế để đảm bảo hiệu năng ổn định. Các trang AMP có một số đánh dấu đặc biệt để xác định nó là một trang AMP.
---

## Code AMP soạn sẵn

Một trang AMP là một trang HTML với một số hạn chế để đảm bảo hiệu năng ổn định. Các trang AMP có một số đánh dấu đặc biệt để xác định nó là một trang AMP.

Một trang AMP rất cơ bản trông như thế này:

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[tip] Bạn có thể sử dụng [trình tạo code soạn sẵn](https://amp.dev/boilerplate) để nhanh chóng thiết lập một khung xương cơ bản cho trang AMP của mình. Nó cũng cung cấp các đoạn code cho cấu trúc dữ liệu, để tạo một PWA và nhiều hơn thế nữa! [/tip]

## Thành phần AMP

Code bắt đầu của bài thực hành này ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) được xây dựng trên trang AMP cơ bản với nội dung trang của nó (ảnh, văn bản, v.v.) và bao gồm một số thành phần AMP:

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>
<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
<script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
```

Các thành phần AMP cung cấp chức năng bổ sung và các thành phần UI để bổ sung khả năng tương tác đa dạng cho các trang AMP. Đoạn code bắt đầu sử dụng các thành phần AMP sau:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): Một băng chuyền ảnh hiển thị nhiều góc nhìn về sản phẩm.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): Một hệ thống khuôn mẫu để render hồi đáp của máy chủ từ amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): Bổ sung chức năng đặc biệt cho các yếu tố `<form>` vốn là cần thiết cho các trang AMP.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): Cung cấp một phương thức ngữ nghĩa để chọn một hoặc nhiều yếu tố trong một nhóm các yếu tố. Có thể được sử dụng như một nguồn đầu vào cho amp-form.

## Khả năng tương tác cơ bản

Code bắt đầu cung cấp một số khả năng tương tác cơ bản:

- Một băng chuyền ảnh ([`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) hiển thị nhiều góc nhìn về sản phẩm.
- Sản phẩm có thể được thêm vào giỏ hàng của người dùng (thông qua [`amp-form`](../../../../documentation/components/reference/amp-form.md)) bằng cách chạm vào nút "Add to cart" (Thêm vào giỏ hàng) ở cuối trang.

**Thử ngay**: Vuốt băng chuyền ảnh và chạm vào nút "Add to cart" (Thêm vào giỏ hàng).

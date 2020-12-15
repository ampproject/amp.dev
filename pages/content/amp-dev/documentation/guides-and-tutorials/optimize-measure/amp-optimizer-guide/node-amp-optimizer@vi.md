---
"$title": Hướng dẫn Bộ tối ưu hoá AMP phiên bản Node.js
"$order": '2'
description: Hướng dẫn này giải thích cách thiết lập và sử dụng phiên bản Node.js của Bộ tối ưu hoá AMP.
formats:
- websites
- stories
author: sebastianbenz
---

Hướng dẫn này giải thích cách thiết lập và sử dụng phiên bản Node.js của Bộ tối ưu hoá AMP.

## Thiết lập

Cài đặt qua NPM bằng:

```shell
npm install @ampproject/toolbox-optimizer
```

## Sử dụng

API của Bộ tối ưu hoá AMP lấy một chuỗi HTML làm đầu vào và trả về một phiên bản tối ưu hoá của chuỗi HTML đó. Việc sử dụng cơ bản trông như thế này:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Tạo AMP tối ưu hoá ở thời gian dựng

Đối với website tĩnh, tốt nhất là tối ưu hoá các trang AMP ở thời gian dựng khi dựng website của bạn. Đây là một ví dụ về cách bạn tích hợp nó vào bản dựng dựa trên [Gulp.js](https://gulpjs.com/). Ví dụ này thêm một biến đổi tuỳ chỉnh vốn sẽ tối ưu hoá tất cả các tập tin HTML bên trong thư mục src:

```js
const {src, dest} = require('gulp');
const through2 = require('through2');

const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

function build(cb) {
  return src('src/*.html')
    .pipe(
      through2.obj(async (file, _, cb) => {
        if (file.isBuffer()) {
          const optimizedHtml = await ampOptimizer.transformHtml(
            file.contents.toString()
          );
          file.contents = Buffer.from(optimizedHtml);
        }
        cb(null, file);
      })
    )
    .pipe(dest('dist/'));
}

exports.default = build;
```

### Thời gian render

Đối với các trang động, việc render các trang trên máy chủ thường là cần thiết. Trong trường hợp này, bạn có thể chạy Bộ tối ưu hóa AMP sau khi render các trang của mình. Đây là một tích hợp mẫu vào máy chủ [Express.js](https://expressjs.com/) . Một cách để tích hợp Bộ tối ưu hóa AMP vào bộ định tuyến Express là chạy nó trong lệnh gọi lại sau khi các khuôn mẫu được [render](https://expressjs.com/en/api.html#app.render):

```js
const express = require('express');
const router = express.Router();
const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

router.get('/', (req, res) => {
  const locals = {title: 'Express with AMP Optimizer'};
  res.render('index', locals, async (err, html) => {
    const optimizedHtml = await ampOptimizer.transformHtml(html);
    res.send(optimizedHtml);
  });
});

module.exports = router;
```

Quan trọng: Đảm bảo thiết lập tác vụ lưu bộ nhớ đệm hoặc CDN khi sử dụng Bộ tối ưu hóa AMP trên máy chủ để tránh render trễ.

## Cấu hình

Bộ tối ưu hoá AMP cung cấp cấu hình mặc định hợp lí vốn có thể hoạt động tốt trong hầu hết các trường hợp. Tuy nhiên, các phép biến đổi có thể được tuỳ chỉnh cho những trường hợp sử dụng cụ thể. Bạn có thể tìm thấy danh sách tất cả các tuỳ chọn có sẵn [tại đây](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

Một vài tuỳ chọn đáng chú ý:

- `lts: true` để cho phép [các URL ổn định dài hạn](https://github.com/ampproject/amphtml/blob/main/contributing/lts-release.md) cho thời gian chạy và các thành phần AMP.
- `verbose: true` cho đầu ra gỡ lỗi chi tiết. Đặc biệt tốt để nhận diện lí do code soạn sẵn AMP không thể được xoá bỏ.
- `imageOptimizer`: cho phép tạo srcset của hình ảnh được tự động, bằng cách cung ứng một chức năng để tính toán URL srcset đối với một src hình ảnh cho trước. Chức năng này có thể trả về một URL trỏ đến một phiên bản của hình ảnh `src` với độ rộng cho trước. Nếu không có hình ảnh nào, nó có thể trả về giá trị sai lệch. Thông tin thêm về điều này ở phần tiếp theo.

### Tối ưu hoá hình ảnh

Bộ tối ưu hóa AMP có thể tạo các giá trị `srcset` cho một `amp-img` dựa trên định nghĩa `layout` của nó. Để điều này hoạt động, bạn cần cung cấp một hàm ánh xạ `src` và `width` của hình ảnh thành giá trị nguồn `srcset` đã thay đổi kích thước. Việc thay đổi kích thước hình ảnh không được thực hiện bởi Bộ tối ưu hóa AMP và cần phải xảy ra tại thời gian dựng (ví dụ: đối với các website tĩnh) hoặc thông qua dịch vụ lưu trữ hình ảnh như [thumbor](https://github.com/thumbor/thumbor) .

Đây là một triển khai mẫu vốn ghép độ rộng hình ảnh vào `src`:

```js
const ampOptimizer = AmpOptimizer.create({
  // parameters are the amp-img `src` and the `width` of the to be generated srcset source value
  imageOptimizer: (src, width) => {
    // we cannot rename if the image does not have a file extension
    const index = src.lastIndexOf('.');
    if (index === -1) {
      // return null means we won't generate a srcset source value for this width
      return null;
    }
    const prefix = src.substring(0, index);
    const postfix = src.substring(index, src.length);
    return `${prefix}.${width}w${postfix}`;
  };
})
```

Sử dụng bản triển khai này, Bộ tối ưu hoá AMP sẽ biến đổi các khai báo `amp-img` sau:

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                             image-2x.png 2x"
></amp-img>
```

thành:

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
  srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                               image-2x.png 2x"
></amp-img>
```

Mẹo: Khi dùng `layout=responsive`, hãy dùng thuộc tính `width` và `height` để chỉ định kích thước hình ảnh tối thiểu. Ví dụ như đối với một hình ảnh anh hùng dạng tràn biên màn hình ở trên thiết bị di động, độ rộng là `width=320`.

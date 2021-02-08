---
'$title': Xác thực các trang AMP
$order: 0
description: Xem video của chúng tôi về các tùy chọn xác thực khác nhau. Ưu điểm chính của AMP không chỉ là giúp các trang của bạn tải nhanh hơn, mà là khiến trang của bạn...
formats:
  - websites
  - stories
  - ads
---

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='Watch our video about the various validation options.']

Ưu điểm chính của AMP không chỉ là giúp các trang của bạn tải nhanh hơn, mà là khiến trang của bạn vừa nhanh vừa _được xác thực_. Bằng cách này, các bên thứ ba như Twitter, Instagram hoặc Google Search có thể tự tin phục vụ các trang AMP cho độc giả theo nhiều cách khác nhau.

## Làm thế nào tôi có thể kiểm tra rằng trang của mình có phải AMP hợp lệ hay không?

Có một vài cách để xác thực cho một tài liệu AMP. Tất cả đều cho kết quả giống hệt nhau, vậy nên hãy sử dụng cách phù hợp với phong cách phát triển của bạn nhất.

Ngoài việc xác thực AMP, bạn có thể cũng muốn xác nhận rằng tài liệu AMP của bạn có thể [được khám phá](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) bởi các nền tảng thuộc bên thứ ba.

### Bảng điều khiển Phát triển Trình duyệt

Bộ xác thực AMP đi kèm thư viện AMP JS và có sẵn trên mọi trang AMP ngay sau khi triển khai. Để xác thực:

1. Mở trang AMP trong trình duyệt của bạn.
2. Chèn "`#development=[1,actions,amp,amp4ads,amp4email]`" vào URL, ví dụ, `http://localhost:8000/released.amp.html#development=1` là cách cũ để xác thực định dạng `AMP`. URL sau, `http://localhost:8000/released.amp.html#development=amp4email` sẽ xác thực tài liệu với thông số AMP cho email.
3. Mở [bảng điều khiển Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) và kiểm tra lỗi xác thực.

Lỗi trên Bảng điều khiển Nhà phát triển sẽ có dạng như sau:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" layout="responsive" alt="Screen grab of AMP Validator errors in chrome developer console"></amp-img>

### Giao diện Web

Bộ xác thực AMP có thể được sử dụng như một giao diện web tại <a href="https://validator.ampproject.org/">validator.ampproject.org</a>. Giao diện này hiển thị các lỗi được hiển thị trong văn bản bên cạnh nguồn HTML của trang. Giao diện này là một trình biên tập tương tác: các thay đổi đến nguồn HTML sẽ dẫn đến việc cần xác thực lại tương tác.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" layout="responsive" alt="Screen grab of validator.ampproject.org with error examples."></amp-img>

### Phần mở rộng Trình duyệt

Bộ xác thực AMP có thể được truy cập trực tiếp từ thanh công cụ của trình duyệt thông qua một phần mở rộng trình duyệt. Khi bạn duyệt, nó sẽ tự động xác thực từng trang AMP được truy cập và hiển thị tính xác thực của trang dưới dạng một biểu tượng màu.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" layout="fixed" alt="Red AMP icon indicating invalid AMP document.">
      </amp-img>
    </td>
    <td>Khi có lỗi trong một trang AMP, biểu tượng phần mở rộng sẽ hiển thị màu đỏ và số lỗi gặp phải.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" layout="fixed" alt="Green AMP icon indicating valid AMP document.">
      </amp-img>
    </td>
    <td>Khi trang AMP không có lỗi nào, biểu tượng này sẽ hiển thị màu xanh lục và số cảnh báo, nếu tồn tại.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" layout="fixed" alt="Blue AMP icon indicating AMP HTML variant if clicked.">
      </amp-img>
    </td>
    <td>Khi đây không phải trang AMP, nhưng lại có một phiên bản AMP, biểu tượng này sẽ hiển thị màu xanh dương với một biểu tượng liên kết, và việc nhấn vào phần mở rộng sẽ chuyển hướng trình duyệt sang phiên bản AMP.</td>
  </tr>
</table>

Phần mở rộng Bộ xác thực AMP cho [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) và [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Gói NPM cho CI

Bạn có thể tích hợp quy trình xác thực AMP thông qua gói NPM Bộ xác thực AMP vào đường ống xây dựng và kiểm tra của mình: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) hoặc [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (một plugin gulp). Ví dụ, bạn có thể sử dụng gói NPM Bộ xác thực AMP để kiểm tra xác thực hoặc trong một tác vụ theo lịch để xác minh các trang AMP sản xuất.

##### Ví dụ: Đang xác thực một tập tin AMP HTML

Trong ví dụ này, chúng ta sẽ xác thực một tập tin AMP HTML bằng cách sử dụng gói NPM [amphtml-validator](https://www.npmjs.com/package/amphtml-validator). Trạng thái xác thực được truyền đến bảng điều khiển.

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  (result.status === 'PASS' ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg =
      'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    (error.severity === 'ERROR' ? console.error : console.warn)(msg);
  }
});
```

##### Ví dụ: Sử dụng một tác vụ gulp để xác thực AMP HTML

Trong ví dụ này, chúng ta có một tác vụ gulp để xác thực mọi tập tin AMP HTML. Nếu có một lỗi xác thực AMP, tác vụ sẽ thoát với một mã lỗi (1).

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html',
};

gulp.task('amphtml:validate', () => {
  return gulp
    .src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['amphtml:validate'], function () {});
```

### Công cụ Dòng lệnh

Bạn có thể xác thực tập tin AMP HTML bằng cách sử dụng [công cụ dòng lệnh của bộ xác thực AMP HTML](https://www.npmjs.com/package/amphtml-validator).

Bắt đầu:

1. Đảm bảo bạn có [Node.js với trình quản lý gói 'npm'](https://docs.npmjs.com/getting-started/installing-node) trên hệ thống của mình.
2. Cài đặt [công cụ dòng lệnh của bộ xác thực AMP HTML](https://www.npmjs.com/package/amphtml-validator) bằng cách chạy dòng lệnh sau: `npm install -g amphtml-validator`.

Bây giờ hãy xác thực một trang AMP HTML thật sự:

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

Hiển nhiên, đây là một trang AMP HTML hợp lệ. Hãy thử một trang không hợp lệ: [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Để chạy lệnh `amphtml-validator`, bạn có thể cung cấp URL của trang này hoặc một tên tập tin cục bộ. Tải về và lưu [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) vào một tập tin, sau đó chạy:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

Định dạng của thông điệp lỗi chứa tên tập tin, dòng, cột, và thông điệp, và thường sau đó là một liên kết đến tham chiếu AMP HTML. Một số trình biên tập, bao gồm Emacs, có thể diễn giải định dạng này và cho phép bạn nhảy đến lỗi trong tập tin ban đầu.

Để bắt đầu tạo trang AMP của bạn, hãy cân nhắc [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Công cụ dòng lệnh cung cấp các tính năng bổ sung bao gồm tắt màu, in đầu ra JSON, hoặc chạy một phiên bản cụ thể của bộ xác thực Javascript (theo mặc định, nó sẽ chạy kịch bản được phát hành mới nhất).

[sourcecode:console]
$ amphtml-validator --help

Usage: index [options] <fileOrUrlOrMinus...>

Validates the files or urls provided as arguments. If "-" is
specified, reads from stdin instead.

Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.

[/sourcecode]

## Điều gì xảy ra nếu trang của tôi không hợp lệ?

Bộ xác thực AMP không chỉ tiện lợi cho bạn trong quá trình phát triển. Nó còn được sử dụng bởi các nền tảng như Twitter hoặc Google để tích hợp các trang AMP của bạn vào nội dung và kết quả tìm kiếm của họ. Còn hơn thế nữa, họ thường không yêu cầu trực tiếp các trang này từ máy chủ của bạn, mà sử dụng Bộ nhớ đệm AMP của Google, một dịch vụ miễn phí sẽ lưu các trang của bạn trong bộ nhớ đệm và cung cấp chúng trên khắp thế giới, để chúng có thể được tải nhanh hơn nữa.

Nếu dịch vụ xác thực AMP phát hiện rằng có điều gì đó không đúng với trang của bạn, nó sẽ không được phát hiện và phân phối bởi các website của bên thứ ba và không xuất hiện trong Bộ nhớ đệm AMP của Google. Vậy nên bạn sẽ không chỉ mất lợi ích về tốc độ của bộ nhớ đệm, mà nhiều khả năng trang của bạn sẽ không được hiển thị ở quá nhiều nơi! Đây không phải là một điều tốt, vậy nên hãy đảm bảo nó không xảy ra.

## Làm thế nào tôi có thể khắc phục các lỗi xác thực?

Hầu hết các lỗi xác thực đều dễ giải quyết và khắc phục. Hãy cân nhắc thẻ HTML này:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Nó sẽ tạo ra lỗi xác thực AMP này và được hiển thị trong các công cụ khác nhau này:

- Bảng điều khiển Phát triển Trình duyệt {amp-img0}{/amp-img0}

- Giao diện Web {amp-img0}{/amp-img0}

- Phần mở rộng Trình duyệt {amp-img0}{/amp-img0}

Mỗi công cụ đều cung cấp nhiều mảnh thông tin khác nhau:

1. Địa điểm (dòng và cột) trong tài liệu HTML nơi xảy ra lỗi, có thể nhấn trong một số giao diện để nêu bật địa điểm đó. Trong trường hợp này, vấn đề xảy ra ở dòng 11, cột 2.
2. Một dòng văn bản mô tả lỗi. Trong trường hợp này, văn bản thể hiện rằng chúng ta đang sử dụng một thẻ `<img>`, trong khi chúng ta nên sử dụng một thẻ <a><code><amp-img></code></a>.
3. Liên kết đến một tài liệu liên quan đến lỗi. Trong trường hợp này là tài liệu cho thẻ [`<amp-img>`](../../../../documentation/components/reference/amp-img.md). Không phải lỗi nào cũng tạo các liên kết đến tài liệu.

Sau khi đọc lại [thông số](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md), chúng ta nhận ra rằng mình đang sử dụng một thẻ `<img>`, trong khi chúng ta nên sử dụng một thẻ [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).

Để hiểu rõ hơn danh sách đầy đủ các lỗi tiềm năng, hãy xem [hướng dẫn về Lỗi Xác thực AMP](validation_errors.md). Nếu bạn vẫn bị kẹt sau khi đã kiểm tra kỹ, hãy [đặt câu hỏi](http://stackoverflow.com/questions/tagged/amp-html) và chúng tôi sẽ cố hỗ trợ.

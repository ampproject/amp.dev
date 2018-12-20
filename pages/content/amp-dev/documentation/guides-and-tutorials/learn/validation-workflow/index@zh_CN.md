---
$title: 验证 AMP 网页
---
[TOC]

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='观看我们的视频，了解各种验证选项。']

AMP 的强大之处在于它不仅能提升网页加载速度，还能以可验证的方式让网页快速加载。这样一来，Twitter、Instagram 或 Google 搜索等第三方就能够放心地通过越来越有趣的方式向读者呈现 AMP 网页。

## 如何检查我的网页是否是有效的 AMP 网页？

您可以通过多种方法验证 AMP 文档。这些验证方法
产生的结果完全相同，因此不妨使用最适合您的开发模式的
方法。

<<<<<<< HEAD
除了 AMP 有效性之外，您可能还需要确认 AMP 文档能被第三方平台[发现]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}})。
=======
除了 AMP 有效性之外，您可能还需要确认 AMP 文档能被第三方平台[发现]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}})。
>>>>>>> 3aeec0a67c667957f9f54faf118da91faf46313f

### 浏览器开发者控制台

AMP 验证工具绑定了 AMP JS 库，因此可直接在任何 AMP 网页上使用。要验证 AMP 网页，请执行以下操作：

  1. 在浏览器中打开 AMP 网页。
  1. 将 &ldquo;`#development=1` &rdquo; 附加到网址后面，例如，`http://localhost:8000/released.amp.html#development=1`。
  1. 打开 [Chrome 开发者工具控制台](https://developers.google.com/web/tools/chrome-devtools/debug/console/)并检查有无验证错误。

开发者控制台中显示的错误与下面屏幕截图中的类似：

<amp-img src="/static/img/docs/validator_errors.png"
         width="713" height="243" layout="responsive"
         alt="Chrome 开发者控制台中 AMP 验证工具错误的屏幕截图">
</amp-img>

### 网页界面

AMP 验证工具可以当做网页界面
使用：<a href="https://validator.ampproject.org/">validator.ampproject.org</a>。
此界面会在网页 HTML 源代码旁边并排显示错误。
此界面是个互动式编辑器：更改 HTML 源代码会立即
导致互动式重新验证。

<amp-img src="/static/img/docs/validator_web_ui.png"
         width="660" height="507" layout="responsive"
         alt="包含错误示例的 validator.ampproject.org 屏幕截图。">
</amp-img>

### 浏览器扩展程序

您可以使用浏览器扩展程序直接从浏览器的工具栏访问
AMP 验证工具。在您浏览网页时，该扩展程序会自动验证您访问的每个 AMP 网页，
并使用彩色图标直观地标示网页的
有效性。

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png"
               width="20" height="20" layout="fixed"
               alt="指示 AMP 文档无效的红色 AMP 图标。">
      </amp-img>
    </td>
    <td>如果 AMP 网页中存在错误，该扩展程序的图标
      将为红色并显示遇到的错误数。
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png"
               width="20" height="20" layout="fixed"
               alt="指示 AMP 文档有效的绿色 AMP 图标。">
      </amp-img>
    </td>
    <td>如果 AMP 网页中没有错误，该图标将为
      绿色并显示警告数（如果有的话）。
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png"
               width="20" height="20" layout="fixed"
               alt="指示点击后即可转到 AMP HTML 版本的蓝色 AMP 图标。">
      </amp-img>
    </td>
    <td>如果网页不是 AMP 版本，但标示存在 AMP 版本，
      则该图标将为蓝色并带有一个链接图标，点击
      扩展程序会将浏览器重定向至对应的 AMP 版本。
    </td>
  </tr>
</table>

适用于
[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) 和 [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/) 的 AMP 验证工具扩展程序。

### 适用于 CI 的 NPM 软件包

作为编译和测试管道的一部分，您可以通过以下 AMP 验证工具 NPM 软件包集成 AMP 验证功能：[amphtml-validator](https://www.npmjs.com/package/amphtml-validator) 或 [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator)（一种 gulp 插件）。例如，您可以将 AMP 验证工具 NPM 软件包用于集成测试或调度任务，以验证已向广大用户投放的实际 AMP 网页。


##### 示例：验证 AMP HTML 文件

在本示例中，我们使用 [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) NPM 软件包验证 AMP HTML 文件。验证状态将通过管道发送到控制台。

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  ((result.status === 'PASS') ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
  }
});
```

#####示例：使用 gulp 任务验证 AMP HTML

在本示例中，我们的 gulp 任务可验证所有 AMP HTML 文件。如果存在 AMP 验证错误，该任务将退出并显示错误代码 (1)。

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html'
};

gulp.task('amphtml:validate', () => {
  return gulp.src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['amphtml:validate'], function () {
});
```

### 命令行工具

您可以使用 [AMP HTML 验证工具命令行工具](https://www.npmjs.com/package/amphtml-validator)验证 AMP HTML 文件。

开始使用：

1.  确保您已在自己的系统上安装 [Node.js 及其软件包管理器
'npm'](https://docs.npmjs.com/getting-started/installing-node)。
2.  通过运行以下命令安装 [AMP HTML 验证工具命令行工具](https://www.npmjs.com/package/amphtml-validator)：`npm install -g amphtml-validator`。

现在，我们来验证一个真实的 AMP HTML 网页：

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

不出所料，该网页是有效的 AMP HTML。我们来试一个无效的网页：
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html)。要运行 `amphtml-validator` 命令，您可以提供网页的网址或本地文件名称。将 [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) 下载并保存到文件中，然后运行以下命令：

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/zh_cn/docs/reference/components/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/zh_cn/docs/reference/components/amp-ad.html)
…
[/sourcecode]

错误消息的格式由文件名、行、列和消息组成，
通常后跟指向 AMP HTML 参考的链接。某些编辑器（包括 Emacs，用于查找汇编命令和编译模式）
可以解析这种格式，并让您能够
跳至原始文件中的错误所在位置。

要顺利着手制作自己的 AMP 网页，请考虑使用 [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html)：

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

命令行工具提供了更多功能，包括取消颜色标注、
输出 JSON 输出结果或运行特定版本的
验证工具 JavaScript（默认运行最新发布的脚本）。

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
              json。
[/sourcecode]

## 如果我的网页无效，会出现什么情况？

AMP 验证工具不仅能在开发过程中为您提供便利，还可供将您的 AMP 网页集成到其内容与搜索结果中的 Twitter 或 Google 等平台使用。尤其值得一提的是，它们通常不会直接向您的服务器请求网页，而是使用免费的 Google AMP Cache 服务来缓存您的网页并使之可向全球分发，从而进一步提高网页加载速度。

如果 AMP 验证服务检测到您的网页有问题，则该网页不会被第三方网站发现和分发，也不会出现在 Google AMP Cache 中。这样一来，您不仅会失去缓存的速度优势，您的网页还有可能无法在许多位置显示！这样就太糟糕了，我们一定要确保这种情况不会发生。

## 如何修复验证错误？

大多数验证错误都可以轻松处理和修复。请考虑使用以下 HTML 标记：

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

该标记生成了相关的 AMP 验证错误（在 3 种不同的工具中分别如下所示）：

* 浏览器开发者控制台
<amp-img src="/static/img/docs/validator_console_imgerror.png"
         width="696" height="30" layout="responsive"
         alt="AMP 错误：标记 'img' 只能是
        标记 'noscript' 的子级。您是不是要使用 'amp-img'？第 11 行第 2 列">
</amp-img>

* 网页界面
<amp-img src="/static/img/docs/validator_webui_imgerror.png"
         width="676" height="58" layout="responsive"
         alt="AMP 错误：标记 'img' 只能是
        标记 'noscript' 的子级。您是不是要使用 'amp-img'？第 11 行第 2 列">
</amp-img>

* 浏览器扩展程序
<amp-img src="/static/img/docs/validator_extension_imgerror.png"
         width="724" height="108" layout="responsive"
         alt="AMP 错误：标记 'img' 只能是
        标记 'noscript' 的子级。您是不是要使用 'amp-img'？第 11 行第 2 列">
</amp-img>

每种工具都提供了以下几个信息：


  1. HTML 文档中存在错误的位置（行和列），
     在某些界面中可以点击，以突出显示相应位置。在本例中，
     错误发生在第 11 行第 2 列。
  1. 一行描述错误的文字。在本例中，这些文字表明
     我们在本该使用 `<amp-img>` 标记的位置使用了 `<img>` 标记。
  1. 指向与错误相关的文档的链接。本例中
     是指 `<amp-img>` 标记的文档。并非所有错误都会生成
     文档链接。

再次仔细阅读[规范]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.md', locale=doc.locale).url.path}})之后，我们意识到我们在本该使用 `<amp-img>` 标记的位置使用了 `<img>` 标记。

要详细了解可能出现的错误的完整列表，
请参阅 [AMP 验证错误指南]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md', locale=doc.locale).url.path}})。
如果在认真评估之后仍有疑问，请[提出
问题](http://stackoverflow.com/questions/tagged/amp-html)，我们将尽力提供
帮助。




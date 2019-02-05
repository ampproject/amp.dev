---
$title: 添加自定义字体
---

AMP 网页不得包含外部样式表（自定义字体除外）。您可以通过以下两种方式将自定义字体嵌入您的网页：

1.  通过 `<link>` 标记（仅限已列入白名单的字体提供商）
2.  通过 `@font-face` （没有限制，可使用所有字体）

###  1. 使用 `<link>`

 使用 `<link>` 标记（通常位于您网页的标头中），如下所示：

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

以下来源已列入白名单，并能够通过 link 标记提供字体：

*  Typography.com：**https://cloud.typography.com**
*  Fonts.com：**https://fast.fonts.net**
*  Google Fonts：**https://fonts.googleapis.com**
*  Typekit: **https://use.typekit.net**
*  Font Awesome：**https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

###  2. 使用 `@font-face`

 另外，您也可以使用 [&ldquo;@font-face&rdquo;](https://developer.mozilla.org/zh-cn/docs/Web/CSS/@font-face)
within your AMP stylesheet:

[sourcecode:html]

<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>

[/sourcecode]

注意: 使用 `@font-face` 添加的字体必须通过 HTTP 或 HTTPS 架构抓取。


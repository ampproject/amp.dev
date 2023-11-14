---
$title: 在您的 AMP 网页中利用广告获利
---

本指南提供了关于在 AMP 网页上展示广告的说明和最佳做法。

## 向网页中添加广告

在非 AMP 网页（传统 HTML）中，若要展示广告，需要添加一段 JavaScript 代码，才能投放来自广告网络的广告。出于性能和安全原因，您不能在 AMP 网页中添加第三方 JavaScript。因此，要在 AMP 中展示广告，您需要将自定义 [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 组件添加到 AMP 网页中。

[tip type="success"]

请参阅 [AMP By Example 在线演示](../../../../documentation/components/reference/amp-ad.md)，了解如何将 amp-ad 标记添加到 AMP 网页中。

[/tip]

我们先看看如何添加该组件，以便在 AMP 网页上展示广告。

### 第 1 步：添加 amp-ad 脚本

`<amp-ad>` 组件是 AMP 库的一个自定义广告扩展组件。`<amp-ad>` 本质上是专为优化性能而精心设计的自定义 JavaScript。要运行 `<amp-ad>` 组件，您必须在 AMP 网页的 `head` 部分添加此组件所需的 JavaScript：

```html
<script async custom-element="amp-ad" src="https://ampjs.org/v0/amp-ad-0.1.js"></script>
```

### 第 2 步：将 amp-ad 标记添加到 AMP 网页中

超过 100 个[广告服务商和广告网络](ads_vendors.md)提供与 AMP 的内置集成。要为指定广告网络添加广告，请添加 `<amp-ad>` 标记，然后在 `type` 属性中指定广告网络。

在本例中，我们添加一个广告位来投放 a9 网络中的广告：

```html
<amp-ad type="a9">
</amp-ad>
```

### 第 3 步：指定广告单元的大小

将 `width` 和 `height` 属性添加到 `<amp-ad>` 标记中，以便指定 AMP 网页上广告的大小：

```html hl_lines="2"
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### 第 4 步：设置广告网络参数

每个网络都具有投放广告所需的特定数据属性。请参阅广告网络的 `<amp-ad>` 文档并添加所需的属性。在下面的示例中，a9 网络需要其他参数以指定广告的大小及其他详细信息：

```html hl_lines="3 4 5"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### 第 5 步：（可选）指定占位符

根据具体的广告网络，您可以选择在广告可供查看前显示占位符。这样做可防止出现空白，从而提供更好的用户体验。要指定占位符，请通过 `placeholder` 属性添加一个子元素。有关详情请参阅[占位符和后备行为](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)。

```html hl_lines="6"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### 第 6 步：（可选）指定后备行为

根据具体的广告网络，您可以选择在没有广告可投放时显示后备元素。要指定后备行为，请通过 `fallback` 属性添加一个子元素。有关详情请参阅[占位符和后备行为](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)。

```html hl_lines="6"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

恭喜！现在，您可以在 AMP 网页上投放广告了！

## 投放直销型 AMPHTML 广告

[`amp-ad`](../../../../documentation/components/reference/amp-ad.md)。

## 利用定位数据增强广告请求

作为快速获取投放机制的一部分，实时配置 (RTC) 功能使发布商能够利用在运行时检索到的第一方和第三方定位信息增强广告请求。对于每个广告位，RTC 最多支持对定位服务器发出 5 次出价邀约，相关结果会附加到广告请求中。要对您的广告使用 RTC，您所使用的广告网络必须支持 RTC 和快速获取。

要详细了解 RTC，请观看下面的 YouTube 视频：

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='观看《使用标头出价通过 AMP 有效获利》(Effective AMP Monetization with Header Bidding)。']

或者，通过下面的 RTC 资源了解详情：

*   [AMP RTC 发布商实现指南](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
*   [AMP 实时配置](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-documentation.md)

## 最佳做法

以下提示可帮助您最大限度地提升您 AMP 网页上广告的效果：

### 展示位置与控件：优化广告展示位置

*   **在 AMP 网页上展示与非 AMP 网页相同数量的广告**，以实现每页收益最大化。
*   **在第一个视口的正下方展示第一个广告**（“非首屏”），以提供最佳用户体验。
*   除非您使用的是高级 CSS 或媒体查询，否则请**确保您的广告单元位于网页中央**，以便为用户提供最佳移动网页体验。
*   对 AMP 广告资源启用[多尺寸广告请求](https://github.com/ampproject/amphtml/blob/main/ads/README.md#support-for-multi-size-ad-requests)，以增加广告竞价压力并提高收入。

### 需求与定价：为广告确定合适的价格

*   **跨所有销售渠道（包括直接和间接销售渠道）销售 AMP 网页上的广告单元**，以最大限度提高您 AMP 网页上的广告资源的竞争力。
*   **为 AMP 网页上的广告资源定价**（价格与非 AMP 网页上的广告资源相差无几）。监控效果并适当调整价格。
*   **确保所有广告需求渠道都在争夺您 AMP 网页上的广告资源**，以提高竞争压力。

### 广告类型：投放最佳类型的广告

*   **遵循 [IAB 指南](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf)，避免使用尺寸很大的广告文件**。
*   **避免使用插页式广告**或其他会导致内容在广告加载时重排的广告格式。
*   **进行优化以提高可见度**：将 data-loading-strategy 设置为 prefer-viewability-over-views。
*   **通过[支持的播放器](../../../../documentation/components/reference/amp-iframe.md#media).url.path}}) 在视频内容中展示广告**，以通过各种类型的内容创收。
*   **使用多尺寸广告请求实现原生广告**，以与展示广告展开竞争，从而在提供优质用户体验的同时增加需求压力。

### 创新：提供最具吸引力的广告产品

*   **在辅助 AMP 网页上投放广告**，以获得增量收入：
    *   [轮播广告](../../../../documentation/examples/documentation/Carousel_Ad.html)
    *   [灯箱广告](../../../../documentation/examples/documentation/Lightbox_Ad.html)
    *   以及[更多类型](../../../../documentation/examples/index.html)
*   **使直销型广告采用新格式**，以便为您的销售团队提供效果显著的创新广告产品：
    *   [粘性广告](../../../../documentation/examples/documentation/amp-sticky-ad.html)
    *   [飞毯](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## 其他资源

*   [AMPHTML 广告模板](../../../../documentation/examples/index.html)
*   [演示：如何将 `amp-ad` 添加到 AMP 网页中](../../../../documentation/components/reference/amp-ad.md)

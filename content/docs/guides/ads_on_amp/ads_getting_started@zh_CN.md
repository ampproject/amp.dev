---
$title : 使用入门
$order : 0
---

## 在您的 AMP 网页上投放广告的 3 个简单步骤

不确定如何着手？在此简要指南中，您将了解如何快速轻松地在您的 AMP 网页上投放广告。

###  1. 向您的 AMP 网页中添加 `<amp-ads>` 组件：

[sourcecode:html]

<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>

[/sourcecode]

 添加 `amp-ads` 组件后，意味着您向自己的 AMP 网页添加了广告架构。

###  2. 在 `type` 属性中指定广告服务器或广告网络：

[sourcecode:html]
<amp-ad
type="a9">
</amp-ad>
[/sourcecode]

[此处是受支持的广告网络列表](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks)。

### 3. 指定您的广告单元的高度和宽度：

[sourcecode:html]
<amp-ad width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302">
</amp-ad>
[/sourcecode]

定义广告单元的高度和宽度后，意味着您指定了自己 AMP 网页上的广告尺寸。

{% call callout('注意', type='note') %}
 其他数据属性用于指示广告网络从服务器提取合适的尺寸和发布商数据。每个广告网络都有不同的属性要发送。[了解详情](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks)
。 {% endcall %}

###  4. [可选] 指定占位符：

[sourcecode:html]
<amp-ad width="300"
height="200"
type="doubleclick"
data-slot="/4119129/doesnt-exist">
<amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
[/sourcecode]

AMP 支持可选的占位符属性。您可以选择在广告可供观看之前展示占位符，具体取决于广告网络。这样可防止网页上展示空白区域，从而提升用户体验：

###  5. [可选] 指定后备属性：

[sourcecode:html]
<amp-ad width="300"
height="200"
type="doubleclick"
data-slot="/4119129/doesnt-exist">
<amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
[/sourcecode]

AMP 支持可选的后备属性。您可以选择在没有可供投放的广告时展示此后备元素，具体取决于广告网络。

### 6. 恭喜！您现在已经在自己的 AMP 网页上投放广告了！


---
"$title": Creating the cover page
"$order": '4'
description: 要创建网页，请将 <amp-story-page> 元素作为 amp-story 的子级添加。为网页分配一个唯一 ID。对于我们的第一页（即封面页），我们不妨分配唯一 ID cover…
author: bpaduch
---

网页故事中的网页由 `<amp-story-page>` 组件表示。在 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 中，可以使用一个或多个 `<amp-story-page>` 组件，其中包含故事的各个画面。在文档顺序中指定的第一页将在网页故事中最先显示。

要创建网页，请将 `<amp-story-page>` 元素作为 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 的子级**添加**。为网页**分配**一个唯一 ID。对于我们的第一页（即封面页），我们不妨分配唯一 ID `cover`：

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
   <amp-story-page id="cover">
   </amp-story-page>
</amp-story>
```

现在，我们已为封面页搭建好了“外壳”，但我们的故事仍然无效。在网页内，我们需要指定至少一个**图层**。{{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='此封面页有 2 个图层', align='right third' ) }}

## 网页中的图层

与图形中的图层一样，您可以在 AMP 故事网页中使用图层来创建视觉效果。图层是相互堆叠的，因此，第一个图层是最底层，第二个图层在第一个图层之上，依此类推。

我们的封面页实际上由 2 个图层组成：

- **第 1 个图层**：一张用作背景幕的图片
- **第 2 个图层**：故事的标题和署名行

### 创建第 1 个图层

让我们向封面页添加第 1 个图层。该图层包含一张会填满整个屏幕的图片。

将 `<amp-story-grid-layer>` 元素作为 `<amp-story-page>` 的子级添加，即可创建该图层。由于我们想让该图片填满整个屏幕，因此需要为 `amp-story-grid-layer` 指定 `template="fill"` 属性。在该图层中，为 `cover.jpg` 文件添加 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 元素，并确保它是自适应元素（即 `layout="responsive"`）且图片尺寸为 720 x 1280 px。我们的图层会如下所示：

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img src="assets/cover.jpg"
        width="720" height="1280"
        layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

我们来看看该网页的显示效果。在您的浏览器中打开该网页：<a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>。

它看起来应当如下所示：

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### 创建第 2 个图层

好了，我们已经有背景幕，但现在需要创建第 2 个图层，该图层应位于背景幕之上且包含我们的标题和署名行。添加第 2 个图层时，我们要执行的操作与添加第 1 个图层时相同，但这次要改用 **`vertical`** 模板（而不使用 `fill` 模板）。不过，在进一步操作之前，让我们先来了解一下各种模板以及如何在 `<amp-story-grid-layer>` 中放置 AMP 和 HTML 元素。

#### 使用模板放置元素

`<amp-story-grid-layer>` 元素会将其子元素放置在网格（基于 [CSS 网格](https://www.w3.org/TR/css-grid-1/)）中。要指明您希望如何放置这些子元素，您需要指定以下布局模板之一：

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">模板：Fill</h5></td>
</tr>
<tr>
    <td width="65%">
<strong>fill</strong> 模板会使用图层中的第一个子元素填充屏幕。但此图层中的任何其他子元素都不会显示。fill 模板非常适用于添加背景（包括图片和视频）。<code class="nopad"><pre><amp-story-grid-layer template="fill">   <amp-img src="dog.png" width="720" height="1280" layout="responsive">   </amp-img> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">模板：Vertical</h5></td>
</tr>
<tr>
    <td width="65%">
<strong>vertical</strong> 模板会沿 y 轴放置子元素。这些元素与屏幕顶部对齐，并占据 x 轴方向的整个屏幕。如果想沿竖直方向相继堆叠元素，vertical 模板无疑是不错的选择。<code class="nopad"><pre><amp-story-grid-layer template="vertical">   <p>element 1</p>   <p>element 2</p>   <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">模板：Horizontal</h5></td>
</tr>
<tr>
    <td width="65%"> <strong>horizontal</strong> 模板会沿 x 轴放置子元素。这些元素会与屏幕起始位置对齐，并且会沿着 y 轴占据整个屏幕。如果想沿水平方向相继堆叠元素，horizontal 模板无疑是不错的选择。<code class="nopad"><pre><amp-story-grid-layer template="horizontal">   <p>element 1</p>   <p>element 2</p>   <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">模板：Thirds</h5></td>
</tr>
<tr>
<td width="65%">
<strong>thirds</strong> 模板将屏幕分成大小相等的三行，用于将内容插入每个区域中。此外，您也可以指定一个命名的 <code>grid-area</code>，用于指明要将内容插入哪一个 third 区域：<code>upper-third</code>、<code>middle-third</code> 或 <code>lower-third</code>。命名的网格区域可用于更改元素显示位置的默认行为。例如，如果图层中有两个元素，可以指定第一个元素显示在 <code>grid-area="upper-third"</code> 中，第二个元素显示在 <code>grid-area="lower-third"</code> 中。<code class="nopad"><pre><amp-story-grid-layer template="thirds">   <h1 grid-area="upper-third">element 1</h1>   <p grid-area="lower-third">element 2</p> </amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### 完成封面页

现在，您已经了解了各种图层模板，下面我们就来完成封面页中的第 2 个图层。

对于第 2 个图层，我们想将标题和署名行放置在顶部，并希望元素相继堆叠，因此我们将指定 `vertical` 模板。我们的第二个 `amp-story-grid-layer` 会跟在第一个图层后面，如下所示：

```html
<amp-story-grid-layer>
<!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

刷新浏览器即可查看您的工作成果。至此，我们的封面页就制作完毕了。

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='完成后的封面页' ) }}

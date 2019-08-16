---
$title: 创建封面页
---

AMP 故事内的网页由 `<amp-story-page>` 组件表示。一个 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 中可包含一个或多个 `<amp-story-page>` 组件，以用于呈现故事的各个画面。您按文档顺序指定的第一页即是故事中显示的第一页。

若想创建故事网页，请将 `<amp-story-page>` 元素**添加**为 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 的子级。为该网页**分配**一个唯一 ID。对于我们的第一页（即封面页），我们不妨分配唯一 ID `cover`：

```html hl_lines="6 7"
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
   <amp-story-page id="cover">
   </amp-story-page>
</amp-story>
```

现在，我们已为封面页搭建好了“外壳”，但我们的故事仍是无效的。在此网页内，我们需要指定至少 1 个**图层**。
{{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='此封面页有 2 个图层', align='right third' ) }}

## 网页中的图层

与图形中的图层一样，您可在 AMP 故事网页中使用图层来创建视觉效果。图层是相互堆叠的，因此，第一个图层是最底层，第二个图层在第一个图层之上，以此类推。

我们的封面页实际上是由 2 个图层组成：

* **第 1 个图层**：一张用作背景幕的图片
* **第 2 个图层**：故事的标题和署名行

### 创建第 1 个图层

让我们向封面页添加第 1 个图层。该图层包含一张会填满整个屏幕的图片。

将 `<amp-story-grid-layer>` 元素添加为 `<amp-story-page>` 的子级，即可创建该图层。由于我们想让该图片填满整个屏幕，因此需要为 `amp-story-grid-layer` 指定 `template="fill"` 属性。在该图层中，为 `cover.jpg` 文件添加 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 元素，并确保它是自适应元素（即 `layout="responsive"`）且图片尺寸为 720 x 1280 像素。我们的这个图层会如下所示：

```html hl_lines="2 3 4 5 6 7"
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

它看起来应该会如下所示：

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### 创建第 2 个图层

好了，我们已经有背景幕了，但现在需要创建第 2 个图层，该图层应位于背景幕之上且包含我们的标题和署名行。添加第 2 个图层时，我们要执行的操作与添加第 1 个图层时相同，但这次要改用 **`vertical`** 模板（而不使用 `fill` 模板）。不过，在进一步操作之前，让我们先来了解一下各种模板以及如何在 `<amp-story-grid-layer>` 中摆放 AMP 和 HTML 元素。

#### 使用模板摆放元素

`<amp-story-grid-layer>` 元素会将其子级元素摆放在网格（基于 [CSS 网格](https://www.w3.org/TR/css-grid-1/)）中。若想指明您希望如何摆放这些子级元素，您需要指定以下布局模板之一：

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">模板：Fill</h5></td>
</tr>
<tr>
    <td width="65%"><strong>fill</strong> 模板会使用该图层中的第一个子级元素填满屏幕。但该图层中的任何其他子级元素都不会显示。

    <p>fill 模板非常适用于添加背景内容（包括图片和视频）。</p>
   <code class="nopad"><pre>&lt;amp-story-grid-layer template="fill">
  &lt;amp-img src="dog.png"
      width="720" height="1280"
      layout="responsive">
  &lt;/amp-img>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">模板：Vertical</h5></td>
</tr>
<tr>
    <td width="65%"><strong>vertical</strong> 模板会沿着 y 轴放置子级元素。这些元素会与屏幕顶部对齐，并会沿着 x 轴占据整个屏幕。

    <p>当您想沿垂直方向一个紧挨着一个地堆叠元素时，vertical 模板堪称理想之选。</p>

   <code class="nopad"><pre>&lt;amp-story-grid-layer template="vertical">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">模板：Horizontal</h5></td>
</tr>
<tr>
    <td width="65%"><strong>horizontal</strong> 模板会沿着 x 轴放置子级元素。这些元素会与屏幕起始位置对齐，并会沿着 y 轴占据整个屏幕。

    <p>当您想沿水平方向一个紧挨着一个地堆叠元素时，horizontal 模板无疑是不错的选择。</p>

    <code class="nopad"><pre>&lt;amp-story-grid-layer template="horizontal">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">模板：Thirds</h5></td>
</tr>
<tr>
<td width="65%">
<strong>thirds</strong> 模板会将屏幕均分为 3 行，以便您在各个区域中放置相应内容。

<p>您还可指定一个已命名的 <code>grid-area</code>，以指明您希望自己的内容位于 <code>upper-third</code>、<code>middle-third</code> 还是 <code>lower-third</code> 中。如果您想更改元素的默认显示区域，已命名的网格区域会很有用。例如，如果您的图层包含 2 个元素，则可指定让第一个元素在 <code>grid-area="upper-third"</code> 中显示，让第二个元素在 <code>grid-area="lower-third"</code> 中显示。</p>

<code class="nopad"><pre>&lt;amp-story-grid-layer template="thirds">
  &lt;h1 grid-area="upper-third">element 1&lt;/h1>
  &lt;p grid-area="lower-third">element 2&lt;/p>
&lt;/amp-story-grid-layer>
</pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### 完成封面页

现在，您已经了解了各种图层模板，下面我们就来完成封面页中的第 2 个图层吧。

对于第 2 个图层，我们想将标题和署名行放置在顶部，并希望元素相继堆叠，因此我们将指定 `vertical` 模板。我们的第二个 `amp-story-grid-layer` 会跟在第一个图层后面，如下所示：

```html hl_lines="4 5 6 7"
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

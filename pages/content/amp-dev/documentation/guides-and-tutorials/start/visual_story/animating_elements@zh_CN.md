---
'$title': Animating elements
$order: 6
description: 您可通过向网页中的元素应用入场动画效果来进一步完善 AMP 故事。例如，您可以让标题从左侧飞入 ...
components:
  - anim
author: bpaduch
---

您可通过向网页中的元素应用入场动画效果来进一步完善 AMP 故事。例如，您可以让标题从左侧飞入、落入网页中、淡入，等等。AMP 故事框架提供了以下预设动画：

<table>
<thead><tr>
  <th width="50%">动画预设</th>
  <th width="25%">默认持续时长（毫秒）</th>
  <th width="25%">默认延迟（毫秒）</th>
</tr></thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

若想将入场动画效果应用于某个元素，您必须使用某一动画预设值指定 <code>animate-in="<em>&lt;animation preset></em>"</code>。例如，倘若要让一段文本落入网页中，则需向相应的文本元素添加 `animate-in="drop"`：

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"] 只需为您的故事网页上的元素添加 `animate-in="<animation preset>"` 属性，即可探索各种不同的动画效果。 [/tip]

## 动画时间设置

每个动画预设都内置了以下两项的默认时间值：

- **延迟**：这是指动画会延迟多久才开始播放。例如，如果延迟为 0.3 秒，即意味着动画会在 0.3 秒后进入网页。如果延迟为 0 秒，则动画会立即开始播放。
- **持续时长**：这是指动画会持续多久。例如，淡入动画从开始到结束需要 500 毫秒。

您可以自定义动画的时间设置，只需通过 `animate-in-delay` 和 `animate-in-duration` 属性更改延迟或持续时长即可。在下面的示例中，`my-element` 会在 0.3 秒后从网页左侧飞入，并会在 0.5 秒内完全飞入：

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </div>
</amp-story-page>
```

## 为最后一个网页添加动画效果

我们的最后一个 Web 故事网页由两个图层组成：第一个图层由动物图片拼贴而成，第二个图层展示了一段横幅文本。要创建该网页，请将以下代码**添加**到上一个故事网页后面：

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img
        src="assets/cat.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/dog.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/bird.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/rabbit.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

在浏览器中重新加载该 AMP 故事，然后验证并确保网页能够正确呈现且具有如下显示效果：

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

It looks great but everything is static! Let's animate!

首先，让我们为横幅文本添加入场动画效果，使它从网页右侧快速飞入。向 `<p>` 元素添加 `animate-in="whoosh-in-right"`，如下所示：

```html
<p class="banner-text" animate-in="whoosh-in-right">
  Pets can lower your stress levels!
</p>
```

在浏览器中重新加载您的故事网页，然后验证并确保该横幅会快速飞入。

接下来，让我们将所有图片都设为淡入。为每个 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 元素分别添加 `animate-in="fade-in"`；待添加完毕后，代码将会如下所示：

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
```

此时，如果您刷新并重新加载该网页，则所有图片都会淡入。虽然设置成功了，但这种效果却不易察觉，因为所有图片都是同时淡入的！我们可通过更改这些动画的时间设置来改进视觉效果。

我们将第一张图片的入场时间延迟一下（例如延迟 0.4 秒），使其等到文本横幅的入场行为快要完成时再开始入场。其余 3 张图片可分别比上一张图片晚 0.2 秒再开始入场。为每个 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 元素分别添加 `animate-in-delay=""`，并设置适当的时间延迟值。待添加完毕后，代码应该会如下所示：

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.4s"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.6s"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay=".8s"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="1s"
>
</amp-img>
```

刷新并重新加载您的故事。此时，最后一个网页应该会如下所示：

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

您可以采用诸多形式（例如动画组合、动画链）在 AMP 故事中实现动画效果，本教程只是浅谈则止。若想详细了解动画，请查阅 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 参考文档。

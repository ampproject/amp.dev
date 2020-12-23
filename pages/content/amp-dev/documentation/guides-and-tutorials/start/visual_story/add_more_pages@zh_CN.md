---
"$title": Adding more pages
"$order": '5'
description: 现在，您已熟悉如何为 Web 故事添加网页，为我们的故事“宠物的乐趣”添加后续网页的步骤与此非常相似。
author: bpaduch
---

现在，您已熟悉如何为 AMP 故事添加网页，为我们的故事“宠物的乐趣”添加后续网页的步骤与此非常相似。请根据下面提供的信息，利用您目前已掌握的知识**继续制作其余网页**。如果您遇到问题，请查看已完成的 (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>) 代码。

[tip type="tip"] 请注意，每个网页都需要有唯一的“id”属性（例如 `id="page1"`）。 [/tip]

## 第 1 页：猫咪

演示如何在单个图层中显示图片和文字。

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>包含 1 个图层：       <ul>         <li>实施 <a href="create_cover_page.md#vertical"><code>vertical</code></a> 模板。</li>         <li>包含 3 个元素：           <ul>             <li>1 个 <code><h1></code> 元素，标题为：猫咪</li>             <li>1 个自适应 <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>（<code class="filename">cat.jpg</code>，大小为 720 x 1280px）</li>             <li>1 个 <code><q></code> 元素，用于引用以下语录：狗随招随到，猫闻声会意，但稍后才会来到您身边。--玛丽·布莱</li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='第 1 页 - 猫咪' ) }}</td>
  </tr>
</table>

## 第 2 页：狗狗

演示在使用两个图层时如何排列文字并显示全屏图片。

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>包含 2 个图层：       <ul>         <li> <b>第 1 个图层</b>：实施 <a href="create_cover_page.md#fill"><code>fill</code></a> 模板，并包含一个自适应 <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>（<code class="filename">dog.jpg</code>，大小为 720 x 1280px）。</li>         <li> <b>第 2 个图层</b>：实施 <a href="create_cover_page.md#thirds"><code>thirds</code></a> 模板，并包含 2 个元素：           <ul>             <li>1 个 <code><h1></code> 元素，标题为：狗狗</li>             <li>1 个 <code><p></code> 元素，用于指定 <a href="create_cover_page.md#thirds"><code>grid-area</code></a>（占据 <a href="create_cover_page.md#thirds"><code>lower-third</code></a>），并包含以下文字：犬类可能是最早被驯服的动物。数万年来，它们一直陪伴着人类。一些科学家认为，所有犬类（无论是家养的，还是野生的）都与南亚的小狼有着共同的祖先。</li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='第 2 页 - 狗狗' ) }}</td>
  </tr>
</table>

## 第 3 页：小鸟

演示如何在单个图层中显示图片和文字。

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>包含 3 个图层：       <ul>         <li> <b>第 1 个图层</b>：实施 <a href="create_cover_page.md#fill"><code>fill</code></a> 模板，并包含一个自适应 <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>（<code class="filename">bird.jpg</code>，大小为 720 x 1280px）。</li>         <li> <b>第 2 个图层</b>：实施 <a href="create_cover_page.md#vertical"><code>vertical</code></a> 模板，并包含 1 个元素：           <ul>             <li>1 个 <code><h1></code> 元素，标题为：小鸟</li>           </ul>         </li>         <li> <b>第 3 个图层</b>：实施 <a href="create_cover_page.md#vertical"><code>vertical</code></a> 模板，并包含 1 个元素：           <ul>             <li>1 个 <code><q></code> 元素，用于引用以下语录：鸟有三宝：羽毛、飞行的本领和歌声，其中羽毛是最次要的。--玛乔丽·艾伦·塞弗特</li>             <li>第三个图层指定 <code>class="bottom"</code>，以将子元素与屏幕底部对齐。           </li> </ul>         </li>       </ul>
</li>
      <li>网页显示时在后台播放音频文件。您可以在后台针对整个故事或单个网页播放音频。要针对某个网页播放音频，请将 <code>background-audio="assets/bird-singing.mp3"</code> 属性添加到 <code><amp-story-page></code> 元素中。</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='第 3 页 - 小鸟' ) }}</td>
  </tr>
</table>

## 第 4 页：兔子

演示如何为网页排列文字并显示会全屏播放的视频。

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>包含 3 个图层：       <ul>         <li> <b>第 1 个图层</b>：实施 <code>fill</code> 模板，并包含一个自适应 <a href="../../../../documentation/components/reference/amp-video.md">amp-video</a> (<code class="filename">rabbit.mp4</code>)。           <ul>             <li>请务必在 <code></code> 部分为 <a href="../../../../documentation/components/reference/amp-video.md">amp-video</a> 组件添加<strong>必需脚本</strong>，以便视频可以正常显示。</li>             <li>指定 <code>poster</code> 图片 (<code class="filename">rabbit.jpg</code>)。这是有效 AMP 故事的<strong>必需</strong>属性。</li>             <li>使用 <code>autoplay</code> 属性将视频设置为自动播放。这是有效 AMP 故事的<strong>必需</strong>属性。</li>             <li>使用 <code>loop</code> 属性将视频设置为自动循环播放。</li>             <li>将尺寸设置为 <code>width="720"</code>、<code>height="1280"</code> 和 <code>layout="responsive"</code>。</li>           </ul> </li>         <li> <b>第 2 个图层</b>：实施 <code>vertical</code> 模板，并包含 1 个元素：           <ul>             <li>1 个 <code><h1></code> 元素，标题为：兔子</li>           </ul>         </li>         <li> <b>第 3 个图层</b>：实施 <code>vertical</code> 模板，并包含 1 个元素：           <ul>             <li>1 个 <code><p></code> 元素，包含以下文字：兔子可以学习执行简单的语音指令，而且会在听到自己的名字时跑过来，非常好奇好玩。</li>             <li>将 <code>bottom</code> CSS 类应用于该图层，以将子元素与屏幕底部对齐。</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='第 4 页 - 兔子' ) }}</td>
  </tr>
</table>

我们的故事“宠物的乐趣”即将完成。最后一页，我们将使用动画来集中展示所有宠物。

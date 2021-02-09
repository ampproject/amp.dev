---
'$title': Creating the bookend
$order: 7
description: 现在，所有网页均已添加完毕，下面我们来看看故事的最后一个屏幕，即“结束画面”。最后一个屏幕对故事进行收尾，您可以在该屏幕上提供社交分享按钮以及与故事相关的链接 ...
author: bpaduch
---

现在，所有网页均已添加完毕，下面我们来看看故事的最后一个屏幕，即“结束画面”。最后一个屏幕对故事进行收尾，您可以在该屏幕上提供社交分享按钮以及与故事相关的链接，使用户能够分享故事或深入了解您网站上的其他内容。

结束画面屏幕上的信息来自在 `<amp-story-bookend>` 标记中指定的 JSON 文件。对于我们的教程，我们已经有一个包含结束画面数据的 JSON 文件 ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json))。

`<amp-story-bookend>` 标记必须是 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 中的最后一个标记。因此，我们在末尾的 `</amp-story>` 标记前面**添加** `<amp-story-bookend></amp-story-bookend>`。在 `amp-story-bookend` 标记中，将 `src` 属性指向 `bookend.json` 文件，并设置 `layout="nodisplay"`：

```html
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

如果刷新浏览器，并转到最后一个屏幕，则会看到以下结束画面：

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='结束画面' ) }}

我们来看看 JSON 文件。在文本编辑器中打开 [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) 文件。

每个结束画面屏幕都需要一个 `bookendVersion`，本教程为 `v1.0`：

```json
"bookendVersion": "v1.0",
```

借助社交分享按钮，用户可以通过 Twitter、Facebook、Pinterest 等社交平台分享您的内容。您可以在 shareProviders 对象中指定社交分享提供程序，并创建一个数组，在其中包含各社交平台的[类型名称](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers)。

对于本教程，我们选择 Facebook、Twitter 和电子邮件作为分享提供程序：

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='结束画面社交分享' ) }}

结束画面屏幕的其余空间用于显示相关内容。所有相关内容都包含在 `components` 对象中。

您可以使用各种组件显示相关内容和链接；每个组件都是使用类型属性指定的。我们来看看可用的组件：

<table>
<thead><tr>
  <th width="20%">Type</th>
  <th>Description</th>
</tr></thead>
<tbody>
  <tr>
    <td>heading</td>
    <td>借助该组件，您可以指定标题以对文章分组。   <pre class="nopreline">
  {
    "type": "heading",
    "text": "More to read"
  },
  </pre>     <br>     <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="bookend heading"></amp-img>
    </figure></td>
  </tr>
  <tr>
    <td>small</td>
    <td>借助该组件，您可以链接到相关文章并且可以选择添加相关小图片。  <pre class="nopreline">
  {
    "type": "small",
    "title": "Learn about cats",
    "url": "https://wikipedia.org/wiki/Cat",
    "image": "assets/bookend_cats.jpg"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="bookend small article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>landscape</td>
    <td>借助该组件，您可以链接到文章或其他内容（例如视频）。与该类型相关联的图片较大，并采用横向格式。  <pre class="nopreline">
  {
    "type": "landscape",
    "title": "Learn about border collies",
    "url": "https://wikipedia.org/wiki/Border_Collie",
    "image": "assets/bookend_dogs.jpg",
    "category": "Dogs"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="bookend landscape article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>portrait</td>
    <td>借助该组件，您可以链接到故事或其他内容。与该类型相关联的图片较大，并采用纵向格式。  <pre class="nopreline">
  {
    "type": "portrait",
    "title": "Learn about macaws",
    "url": "https://wikipedia.org/wiki/Macaw",
    "image": "assets/bookend_birds.jpg",
    "category": "birds"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="bookend portrait article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>cta-link</td>
    <td>借助该组件，您可以指定显示为按钮的号召性用语链接（例如“了解详情”、“订阅”）。  <pre class="nopreline">
  {
    "type": "cta-link",
    "links": [
      {
        "text": "Learn more",
        "url": "https://amp.dev/about/stories.html"
      }
    ]
  }
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="bookend cta"></amp-img>
    </figure></pre>
</td>
  </tr>
</tbody>
</table>

关于 bookend 组件，还有更多信息有待了解。有关详情，请参阅 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 参考文档。

我们的故事就快完成了。我们需要先检查 AMP HTML 是否有效，然后才能发布内容。

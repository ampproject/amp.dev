---
"$title": 在网页故事中进行广告宣传
"$order": '3'
description: 网页故事是一种可点按的全屏体验，能够使读者沉浸在内容中。在 AMP 故事中投放广告，可以毫无违和感地无缝整合…
formats:
- 故事
author: CrystalOnScript
---

网页故事是一种可点按的全屏体验，能够使读者沉浸在内容中。在网页故事中进行广告宣传，可以毫无违和感地无缝整合到用户的行为历程中，让用户被平台吸引并对平台产生好感。

## 广告展示位置

网页故事使用一个  [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 组件来指示广告数量和展示位置。

[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 是 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 组件的封装容器，可以在用户浏览故事内容时动态插入一个或多个广告。为了确保用户获得最佳体验，请执行以下操作：

1. 在网页故事运行时预先对广告进行呈现，然后再插入广告。这样可以确保用户永远看不到空白或未加载的广告。

2. 使用内容比对广告密度进行优化，以免出现过饱和现象。[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 组件根据用户的进度确定何时以及在何处插入广告。

有时，网页故事会在用户浏览前两页后展示第一个广告，目的是优化收益和提升用户体验。

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type="note"] **注**：网页故事越长，展示广告的机会就越多。广告算法的准确位置将随着时间推移持续得到优化。[/tip]

## 用户互动

用户在屏幕三分之二的位置处点按，可以像在常规故事页面上那样跳过广告。

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='图片显示的是用户可以跳过广告的点按区域', caption='用户在屏幕三分之二的位置处点按可以跳过广告。', align='' ) }}

用户点按系统呈现的[号召性用语](story_ads_best_practices.md#call-to-action-button-text-enum)按钮后，可以直接与广告互动，该按钮显示在所有网页故事广告底部三分之一的位置处。可以对该按钮进行配置，将用户转到任意网址（或相关的应用商店）。

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='图片显示的是用户被重定向到广告着陆目标，但可以返回故事。', caption='用户被重定向到广告着陆目标，但可以返回故事。', align='' ) }}

## 为广告配置网页故事

网页故事无法在页面上直接支持 [`amp-ad`](../../../documentation/components/reference/amp-ad.md)。所有广告均由 [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 组件提取和展示。[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 组件必须作为 [`amp-story`](../../../documentation/components/reference/amp-story.md) 的直接子元素放置。

[sourcecode:html]
<amp-story>
  <amp-story-auto-ads>
    <script type="application/json">
      {
        "ad-attributes": {
          // ad server configuration
        }
      }
    </script>
  </amp-story-auto-ads>
  <amp-story-page>
  ...
</amp-story>
[/sourcecode]

与正常 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 不同的是，`<fallback>` 或 `<placeholder>` 不是必需项，因为网页故事广告仅在完全呈现后展示。

## 开始使用故事广告

要在网页故事中加入广告，最简单的方式是从支持的广告服务器投放广告。

目前，支持网页故事广告的广告平台包括：

- Google Ad Manager <a name="google-ad-manager"></a>
    - [直接销售广告](https://support.google.com/admanager/answer/9038178)
    - [程序化广告](https://support.google.com/admanager/answer/9416436)
- 即将推出的 Google AdSense
- 可以整合其他广告平台（有关[详细信息](https://github.com/ampproject/amphtml/issues/30769)，请通过 GitHub 联系我们）

如果您是一家广告客户，想在网页故事中投放自有广告，请[联系我们](mailto:story-ads-wg@google.com)了解详情。

如果发布商自行设置了广告服务器，他们也可以投放自定义广告。[此处详细介绍了过程](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads)。

[tip type="note"] 请参阅[在 AMP 故事中投放自定义广告素材](https://support.google.com/admanager/answer/9038178)，了解将广告上传到 Google Ad Manager 的相关信息，并查阅我们的[制作 AMP 故事广告的最佳做法](story_ads_best_practices.md)指南。[/tip]

---
'$title': 在网页中嵌入故事
$order: 3
description: '借助 '
formats:
  - websites
  - stories
---

故事是一种全屏沉浸式体验。它们使用自己的网址托管在开放网络上，方便用户共享。但是，如果您想将故事整合到自己的网站（例如博客、产品介绍或新闻报道）中，该如何操作呢？

借助 AMP 故事播放器，您可以在网页中嵌入供用户点按或点击的故事。请按照本分步指南操作，学习如何实现。

# 在非 AMP 网页中展示故事

您可以在非 AMP 网页中嵌入 AMP 故事，让用户不离开主文档即可享受点按或点击体验！

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## 嵌入 AMP 故事播放器

要在非 AMP 网页上展示 AMP 故事，需要使用 [`amp-story-player`](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md) 元素。

### 导入脚本

在文档的 head 中添加两个必需的脚本：

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link
  href="https://cdn.ampproject.org/amp-story-player-v0.css"
  rel="stylesheet"
  type="text/css"
/>
```

第一个脚本用于导入播放器的逻辑，第二个脚本用于设置默认样式。

### 指定故事

在文档 `body` 中添加 `<amp-story-player>` 元素。然后，在 `<amp-story-player>` 元素中放置 `<a>` 标记，指定所需的故事。将 `href` 指向故事所在位置。`href` 可能会指向已托管故事的网址或者相对路径。将故事标题放入 `<a>` 标记。

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
  >
    Stories in AMP - Hello World
  </a>
</amp-story-player>
```

### 确定播放器的大小

您可以定义故事播放器的 `width`、`height`， 以及其他内嵌样式或者所需的任何其他元素的样式。

```html
<body>
  ...
  <amp-story-player style="width: 360px; height: 600px;">
    ...
  </amp-story-player>
  ...
</body>
```

为了让用户获得最佳体验，我们建议保持 3:5 的宽高比，但您可以定义任何宽度和高度。

#### 自适应大小

故事播放器的自适应性与任何其他块元素相同。使用 CSS 来保持宽高比，如下面的示例所示：

```html
<amp-story-player style="width: 50vw; height: 83.35vw;"> ... </amp-story-player>
```

### 提供占位符

要添加有代表性的海报图片，可以添加 `<img>` 标记作为故事 `<a>` 标记的子项，并采用以下配置。AMP 故事播放器将在加载整个故事时展示此图片。

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes this story.
  </a>
</amp-story-player>
```

为了让用户获得最佳体验，我们强烈建议您添加海报图片。如果不添加海报图片，故事播放器将在灰色背景上显示加载程序旋转图标。

## 嵌入多个故事

您可以定义多个 `<a>` 标记，在同一 `<amp-story-player>` 元素中添加多个故事。播放器在用户点按完第一个故事后会展示第二个故事的封面。

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

您可以根据需要嵌入多个 `<amp-story-player>` 实例。它们会显示为独立的查看器。

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

# 在 AMP 网页中展示故事

要在 AMP 网页中使用 `<amp-story-player>` 组件，请参阅 [AMP 版本的 amp-story-player](https://amp.dev/documentation/components/amp-story-player/?format=stories) 文档。

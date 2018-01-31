---
$title: 组件/标记
$order: 0
---
AMP HTML 库提供的组件可划分为：

- **内置**：基础库中包含的组件，例如 `amp-img` 和 `amp-pixel`。
- **[扩展](https://github.com/ampproject/amphtml/blob/master/extensions/README.md)**：相对于基础库而言的扩展组件，必须作为自定义元素明确包含在文档中（例如 `<script async custom-element="amp-audio" ...`）。
- **[实验](experimental.html)**：已发布但尚不能广泛使用的组件。

若按类别，这些组件则可分别归为：

- [广告与分析](#广告与分析)
- [动态内容](#动态内容)
- [布局](#布局)
- [媒体](#媒体)
- [呈现](#呈现)
- [社交](#社交)

### 广告与分析

| 组件 | 说明 |
| --------- | ----------- |
| [`amp-ad`](components/amp-ad.html) | 一种容器，用于展示广告。|
| [`amp-ad-exit`](components/amp-ad-exit.html) | 为 A4A (AMP for Ads) 的广告退出事件提供可配置行为。|
| [`amp-analytics`](components/amp-analytics.html) | 从 AMP 文档获取分析数据。|
| [`amp-auto-ads`](components/amp-auto-ads.html) | 通过使用远程提供的配置文件，向 AMP 网页中动态投放广告。|
| [`amp-call-tracking`](components/amp-call-tracking.html) | 动态替换超链接中的电话号码，以启用来电跟踪。|
| [`amp-experiment`](components/amp-experiment.html) | 可用于在 AMP 文档上进行用户体验实验。|
| [`amp-pixel`](components/amp-pixel.html) | 一种跟踪像素，用于统计网页浏览量。|
| [`amp-sticky-ad`](components/amp-sticky-ad.html) | 提供一种方式，以在页面底部持续显示广告内容。|

### 动态内容

| 组件 | 说明 |
| --------- | ----------- |
| [`amp-access-laterpay`](components/amp-access-laterpay.html) | 可让发布者轻松集成 [LaterPay](https://www.laterpay.net/) 微支付平台。
| [`amp-access`](components/amp-access.html) | 提供 AMP 付费墙和订阅支持。|
| [`amp-bind`](components/amp-bind.html) | 允许元素发生变化，以通过数据绑定关系和与 JS 相似的简单表达式来响应用户操作或数据变更。|
| [`amp-form`](components/amp-form.html) | 提供表单支持。|
| [`amp-gist`](components/amp-gist.html) | 显示 [GitHub Gist](https://gist.github.com/)。|
| [`amp-install-serviceworker`](components/amp-install-serviceworker.html) | 安装 ServiceWorker。|
| [`amp-list`](components/amp-list.html) | 动态下载数据并使用模板创建列表项。|
| [`amp-live-list`](components/amp-live-list.html) | 提供一种方式，以实时地显示和更新内容。|
| [`amp-mustache`](components/amp-mustache.html) | 允许呈现 [`Mustache.js`](https://github.com/janl/mustache.js/) 模板。|
| [`amp-selector`](components/amp-selector.html) | 表示一种控件，可显示选项菜单并让用户从中选择。|
| [`amp-user-notification`](components/amp-user-notification.html) | 向用户显示可关闭的通知。|
| [`amp-web-push`](components/amp-web-push.html) | 让用户能够订阅[网络推送通知](https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/)。|

### 布局

| 组件 | 说明 |
| --------- | ----------- |
| [`amp-accordion`](components/amp-accordion.html) | 提供一种方式，让观看者可以大致了解网页内容并随意跳至想查看的部分。|
| [`amp-app-banner`](components/amp-app-banner.html) | 一个封装容器和极简界面，用于呈现一个跨平台且具有固定位置的横幅，以显示应用安装号召性用语。|
| [`amp-carousel`](components/amp-carousel.html) | 沿着一条横轴显示多个相似的内容片段。|
| [`amp-fx-flying-carpet`](components/amp-fx-flying-carpet.html) | 将其子对象封装在一个独特的全屏滚动容器中，可让您在不占用整个视口的情况下展示全屏广告。|
| [`amp-fx-parallax`](components/amp-fx-parallax.html) | 一种属性，可让元素呈现 3D 透视效果。|
| [`amp-iframe`](components/amp-iframe.html) | 显示 iframe。|
| [`amp-lightbox`](components/amp-lightbox.html) | 可带来“灯箱”或类似体验。|
| [`amp-position-observer`](components/amp-position-observer.html) | 在用户滚动屏幕并调度可与其他组件一起使用的事件时，监控视口内某个元素的位置。|
| [`amp-sidebar`](components/amp-sidebar.html) | 提供一种方式，以显示那些供临时访问的元内容，例如导航、链接、按钮、菜单。|


### 媒体

| 组件 | 说明 |
| --------- | ----------- |
| [`amp-3q-player`](components/amp-3q-player.html) | 嵌入来自 [3Q SDN](https://www.3qsdn.com) 的视频。|
| [`amp-anim`](components/amp-anim.html) | 管理动画图片，通常是 GIF 格式。|
| [`amp-apester-media`](components/amp-apester-media.html) | 显示 [Apester](https://apester.com/) 智能单元。|
| [`amp-audio`](components/amp-audio.html) | 替换 HTML5 `audio` 标记。|
| [`amp-brid-player`](components/amp-brid-player.html) | 显示 [Brid.tv](https://www.brid.tv/) 播放器。|
| [`amp-brightcove`](components/amp-brightcove.html) | 显示 Brightcove [视频云](https://www.brightcove.com/en/online-video-platform)或[执行](https://www.brightcove.com/en/perform)播放器。|
| [`amp-dailymotion`](components/amp-dailymotion.html) | 显示 [Dailymotion](https://www.dailymotion.com) 视频。|
| [`amp-google-vrview-image`](components/amp-google-vrview-image) | 显示 VR 图片。|
| [`amp-hulu`](components/amp-hulu.html) | 显示简单的嵌入式 [Hulu](http://www.hulu.com/) 视频。|
| [`amp-ima-video`](components/amp-ima-video.html) | 为与 [IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/) 集成的插播视频广告嵌入一个视频播放器。|
| [`amp-image-lightbox`](components/amp-image-lightbox.html) | 可带来“图片灯箱”或类似体验。|
| [`amp-img`](components/amp-img.html) | 替换 HTML5 `img` 标记。|
| [`amp-imgur`](components/amp-imgur.html) | 显示 [Imgur](http://imgur.com/) 帖子。|
| [`amp-izlesene`](components/amp-izlesene.html) | 显示 [Izlesene](https://www.izlesene.com/) 视频。|
| [`amp-jwplayer`](components/amp-jwplayer.html) | 显示由云托管的 [JW 播放器](https://www.jwplayer.com/)。|
| [`amp-kaltura-player`](components/amp-kaltura-player.html) | 显示 [Kaltura 的视频平台](https://corp.kaltura.com/)中使用的 Kaltura 播放器。|
| [`amp-nexxtv-player`](components/amp-nexxtv-player.html) | 显示来自 nexxOMNIA 平台的媒体流。|
| [`amp-o2-player`](components/amp-o2-player.html) | 显示 [AOL O2Player](http://on.aol.com/)。|
| [`amp-ooyala-player`](components/amp-ooyala-player.html) | 显示 [Ooyala](https://www.ooyala.com/) 视频。|
| [`amp-playbuzz`](components/amp-playbuzz.html) | 显示任何 [Playbuzz](http://www.playbuzz.com/) 内容（例如列表、意见调查，等等）。|
| [`amp-reach-player`](components/amp-reach-player.html) | 显示 [Beachfront Reach](https://beachfrontreach.com/) 视频播放器。|
| [`amp-soundcloud`](components/amp-soundcloud.html) | 显示 [Soundcloud](https://soundcloud.com/) 剪辑。|
| [`amp-springboard-player`](components/amp-springboard-player.html) | 显示 [Springboard 平台](http://publishers.springboardplatform.com/users/login) 视频播放器。|
| [`amp-video`](components/amp-video.html) | 替换 HTML5 `video` 标记。|
| [`amp-vimeo`](components/amp-vimeo.html) | 显示 [Vimeo](https://vimeo.com/) 视频。|
| [`amp-youtube`](components/amp-youtube.html) | 显示 [YouTube](https://www.youtube.com/) 视频。|

### 呈现

| 组件 | 说明 |
| --------- | ----------- |
| [`amp-animation`](components/amp-animation.html) | 定义并显示动画。|
| [`amp-dynamic-css-classes`](components/amp-dynamic-css-classes.html) | 在 HTML 元素上添加几个动态 CSS 类名称。|
| [`amp-fit-text`](components/amp-fit-text.html) | 放大或缩小字体，以适合给定空间内的内容。|
| [`amp-font`](components/amp-font.html) | 触发并监控自定义字体的加载。|
| [`amp-timeago`](components/amp-timeago.html) | 通过将日期格式设为“***多长时间前***”（例如 3 小时前）来提供模糊的时间戳。|
| [`amp-viz-vega`](components/amp-viz-vega.html) | 显示使用 [Vega](https://vega.github.io/vega/) 可视化语法创建的可视内容。|


### 社交

| 组件 | 说明 |
| --------- | ----------- |
| [`amp-facebook-comments`](components/amp-facebook-comments.html) | 嵌入 Facebook 评论插件。|
| [`amp-facebook-like`](components/amp-facebook-like.html) | 嵌入 Facebook 的“赞”按钮插件。|
| [`amp-facebook`](components/amp-facebook.html) | 显示 Facebook 帖子或视频。|
| [`amp-gfycat`](components/amp-gfycat.html) | 显示 [Gfycat](https://gfycat.com) 视频 GIF。|
| [`amp-instagram`](components/amp-instagram.html) | 显示 Instagram 嵌入内容。|
| [`amp-pinterest`](components/amp-pinterest.html) | 显示 Pinterest 微件或“Pin”按钮。|
| [`amp-reddit`](components/amp-reddit.html) | 显示嵌入的 Reddit 评论或帖子。|
| [`amp-social-share`](components/amp-social-share.html) | 显示社交分享按钮。|
| [`amp-twitter`](components/amp-twitter.html) | 显示 Twitter 微博。|
| [`amp-vine`](components/amp-vine.html) | 显示简单的 Vine 嵌入内容。|
 

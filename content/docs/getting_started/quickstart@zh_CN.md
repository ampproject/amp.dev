---
$title: 快速入门
---

[TOC]

{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

本指南提供了一些可帮助您快速上手使用 AMP 的关键资源。若想深入了解更多信息，请查看 [AMP 文档](/zh_cn/docs/)或我们的 [YouTube 频道](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw)。

<hr>

## 开始使用 AMP

执行下面这些关键步骤可帮助您快速上手使用 AMP：

1.  [制作您的 AMP 网页](#create-your-amp-pages)
2.  [验证您的 AMP 网页](#validate-and-test-amp-pages)
3.  [使您的内容可被轻松发现](#make-your-content-discoverable)

## 日常使用 AMP

利用 AMP 所提供的所有资源，让您的 AMP 技能日益精进。

<a class="button" href="#amp-day-to-day-resources">查看资源</a>

<hr>

### 制作您的 AMP 网页

请参阅以下与制作 AMP 网页相关的部分：[使用了 CMS](#using-a-cms?)、[从头开始制作](#starting-from-scratch?)或[转换现有内容](#converting-existing-content?)。

#### 使用了 CMS？

AMP 支持与许多第三方发布平台集成。要了解如何制作 AMP 网页，请查看您的发布平台的文档。

<div>
  {% for section in who.tech_companies.sections %}
    {% if section.title == 'CMS' %}
      <ul>
        {% for item in section.section_items %}
          <li class="item">
            {% if item.link %}
              <a href="{{item.link}}">{{item.title}}</a>
            {% else %}
              {{item.title}}
            {% endif %}
          </li>
        {% endfor %}
        </ul>
    {% endif %}
  {% endfor %}
</div>

#### 从头开始制作？

如果您要从头开始制作 AMP 网页或广告，请访问以下资源：

*   [教程：制作您的首个 AMP 网页](/zh_cn/docs/getting_started/create.html)
*   [教程：添加高级 AMP 功能](/zh_cn/docs/fundamentals/add_advanced.html)
*   [AMP HTML 规范](/zh_cn/docs/fundamentals/spec.html#the-amp-html-format)：包含样板、必需的标记和允许的 HTML
*   [AMPHTML 广告格式](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md)：详细介绍了如何在 AMP 中制作效果出色的广告
*   [YouTube 视频：AMP 中允许使用和不允许使用的内容](https://youtu.be/Gv8A4CktajQ)
*   [AMP Start 中的模板](https://www.ampstart.com/)：试用一些现成的 AMP 网页模板

#### 转换现有内容？

如果您要将现有的 HTML 网页转换为 AMPHTML，请访问以下资源：

*   [教程：将 HTML 网页转换成 AMP 网页](/zh_cn/docs/fundamentals/converting.html)
*   [YouTube 视频：将 AMP HTML 用于现有网站](https://youtu.be/OO9oKhs80aI)

### 验证和测试 AMP 网页

在发布内容之前，请确保您的 AMP 网页有效。以下是一些可供使用的资源：

*   [验证 AMP 网页](/zh_cn/docs/fundamentals/validate.html)：提供了一系列验证工具及相关说明，以帮助您验证网页
*   [YouTube 视频：如何验证和调试 AMP 网页](https://www.youtube.com/watch?v=npum8JsITQE&t=13s)
*   [测试 AMP 中的 CORS](/zh_cn/docs/fundamentals/amp-cors-requests.html#testing-cors-in-amp)

### 使您的内容可被轻松发现

确保用户可在第三方平台（例如 Twitter、Google、Bing 等）上发现您的内容。以下是一些有用的资源：

*   [使您的网页可被轻松发现](/zh_cn/docs/fundamentals/discovery.html)：与如何关联 AMP 网页和使用元数据相关的提示
*   [针对 AMP 网页的 Google 搜索准则](https://support.google.com/webmasters/answer/6340290)

<hr>

## AMP 日常资源

这些资源可帮助您顺利完成日常的 AMP 之旅：

*   将 [AMP 组件列表](/zh_cn/docs/reference/components.html)保存在触手可及之处。每个组件的参考页面都详细介绍了如何在 AMP 网页上集成和使用该组件。
*   想查看示例和演示？请访问 [AMP By Example](https://ampbyexample.com/)，其中就如何使用 AMP 组件提供了实例和场景。
*   需要汲取灵感？
    *   [AMP Start](https://www.ampstart.com/) 提供了已预设样式的模板和组件，可供您用于从头开始创建特定样式的 AMP 网站。
    *   我们的 [Showcase](/zh_cn/learn/showcases/) 着重展示了整个网络范围内引人注目的 AMP 网页。
*   需要获取支持？请参阅[获取支持](/zh_cn/support/developer/get_support.html)页面中提及的资源。
*   及时了解最新的 AMP 资讯：
    *   订阅[我们的播客](https://amphtml.wordpress.com/)
    *   订阅 [YouTube 上的 AMP 频道](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw)
    *   在 Twitter 上关注我们 [@AMPhtml](https://twitter.com/amphtml)
 

---
$title: 实现 AMP 样板移除
$order: 50
tags:
- lcp
---

移除 AMP 样板代码后，可以最大程度提升 AMP 优化工具的性能。但是，并不总是可以做到这一点，例如，在使用 [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) 等阻塞呈现的组件时就无法实现。如果使用 [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) 会让性能下降，请考虑改用基于服务器的 A/B 测试方法。如果在使用 AMP 组件时遇到无法满足阈值的问题，并且无法实现备选方案，请[在 GitHub 上提交议题](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type%3A+Page+experience&template=page-experience.md&title=Page+experience+issue)，以便 AMP 提供帮助！

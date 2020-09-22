---
$title: Enable AMP boilerplate removal
$order: 50
tags:
  - lcp
---

The biggest performance gain of AMP Optimizer results from removing the AMP
boilerplate code. But, this isn't always possible, such as when using a
render-blocking component like [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites).
If use of a [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites)
is hurting your performance, consider switching to a server-based A/B testing
approach. If you're having troubling meeting thresholds while using AMP
components, and unable to implement alternatives, please [file an issue on
GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type%3A+Page+experience&template=page-experience.md&title=Page+experience+issue) so that AMP can help!

---
'$title': AMP 电子邮件最佳做法
$order: 1
'$category': Develop
formats:
  - email
---

AMP 支持在电子邮件中加入一些令人兴奋的新型内容，这些内容极具吸引力并且是沉浸式内容！设计电子邮件时，遵循以下最佳做法可以确保电子邮件高效、在各种平台上均可靠，并且效果符合用户的预期。

#速度

使用 [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) 动态提取内容时，请加入占位符，以确保组件结构完整。在返回请求的数据后，布局中的占位符应当尽量与文档中的占位符类似。这样可以确保消息大小不会引起布局发生明显变化或改变。

#易用性和无障碍

- 如果使用 [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email)，确保已设置 `controls` 属性。这样，使用触摸屏设备（例如智能手机）的用户便可浏览轮播。
- 如果使用 [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email)，请记住，iOS 并不支持所有输入类型。有关详细信息，请参阅 Safari HTML 参考中的[支持的输入值](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html)。
- 不同的应用和浏览器仅支持部分 [`autocomplete` 属性值](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)。设想 autocomplete 不适用于您的用户并保持表单尽可能短。

#样式

- 请确保您的电子邮件仅使用 [AMP 电子邮件支持的 CSS](../learn/email-spec/amp-email-css.md?format=email)。
- 避免在 CSS 和 HTML 中的任何位置使用视口单位（`vw`、`vh`、`vmin` 和 `vmax`）。因为 AMP 电子邮件在 iframe 内部呈现，电子邮件的视口与浏览器的视口不一致。
- 不同的浏览器具有不同的默认 CSS 样式。必要时，使用可以标准化样式的 CSS 库。有关默认样式、样式标准化和可用库列表的详细信息，请参阅[重新启动、重置和推理](https://css-tricks.com/reboot-resets-reasoning/)。
- 小心 CSS 中的溢出边距：由于存在 [AMP 布局限制](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241)，可能不会呈现溢出边距。

##移动设备

使用 [CSS 媒体查询](style_and_layout/control_layout.md?format=email)确定设备，确保消息在各种尺寸的屏幕上均正常显示。应当在移动设备上对消息进行测试，确保布局正确，组件正常运行。

#其他注意事项

使用 AMP 电子邮件时，请记住以下提示和技巧：

- AMP 电子邮件 Playground 不代理 XHR，但某些电子邮件服务提供商代理 XHR。
- 在电子邮件中，AMP MIME 部分应当显示在 HTML MIME 部分前面，这样才能最大程度确保在各种电子邮件客户端之间的兼容性。
- [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email) 无法改变以下各个属性：[`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) 的 `src` 属性、[`amp-form`](../../../documentation/components/reference/amp-form.md?format=email) 的 [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) 属性、[`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email) 的 `src` 属性以及 `<a>` 标记的 href 属性。
- 消息应当包括静态 HTML 版本，以防用户被定向到 HTML 版消息，或者用户转发消息。

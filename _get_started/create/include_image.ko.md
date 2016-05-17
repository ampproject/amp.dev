---
layout: page
title: 이미지 포함
order: 1
locale: ko
---

대부분의 HTML 태그는 AMP HTML에 직접 사용될 수 있지만, `<img>` 태그와 같은 특정 태그는 이와 동등하거나 약간 향상된 사용자 지정 AMP HTML 태그로 대체되며, 문제가 있는 몇몇 태그는 즉시 금지됩니다([사양의 HTML 태그](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md) 참조).

추가적인 마크업이 어떻게 나타나는지를 보여주기 위해, 여기서는 이미지를 페이지에 삽입하는 데 필요한 코드를 보여줍니다.

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

`<img>`와 같은 태그를 `<amp-img>`로 대체하는 이유와 얼마나 많은 태그를 사용할 수 있는지에 대해 알아보려면, [Iframe 및 미디어 포함](/docs/guides/amp_replacements.html)으로 이동하세요.

{% include button.html title="3단계로 계속" link="/docs/get_started/create/presentation_layout.ko.html" %}

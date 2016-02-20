---
layout: page
title: amp-embed
order: 0
---

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


The `amp-embed` element is used to allow embedding elements in to the AMP page.

#### Implementation

The `<amp-embed>` is actually an alias to the [`<amp-ad>`](https://github.com/ampproject/amphtml/blob/master/builtins/amp-ad.md) tag, deriving all of it's functionality with a different tag name.
Can be used instead of `<amp-ad>` when that would be semantically more accurate.

{% highlight html %}
<amp-embed width=400 height=300
        layout=responsive
        data-publisher=thepublisher
        data-mode=themode
        data-article=auto
        data-placement="Below Article Thumbnails">
</amp-embed>
{% endhighlight %}

#### Supported embed types

- [Taboola](https://github.com/ampproject/amphtml/blob/master/builtins/../ads/taboola.md)

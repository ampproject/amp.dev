---
layout: page
title: ページの検出、配信の準備をする
order: 4
locale: ja
---

ニュース記事のように、同じページに対して AMP 版と非 AMP 版のページをそれぞれ用意したい場合を考えましょう。たとえば Google 検索で、あるページの非 AMP 版を検出した場合、そのページには AMP 版も存在することを知らせるにはどうしたらよいでしょうか。

## &lt;link> を使ってページをリンクする

この課題を解決するには、`<head>` 内の `<link>` タグという形で、AMP ページの情報を非 AMP ページに追加します。同様に、非 AMP ページの情報は AMP ページに追加します。

以下を非 AMP ページに追加します。

{% highlight html %}
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

また、以下を AMP ページに追加します。

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
{% endhighlight %}

## 1 ページしかない場合

1 ページしか存在せず、それが AMP ページである場合も、canonical リンクを追加して単純に自身を指定する必要があります。

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

{% include button.html title="ステップ 6 に進む" link="/docs/get_started/create/publish.ja.html" %}

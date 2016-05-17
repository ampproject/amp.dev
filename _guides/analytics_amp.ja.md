---
layout: page
title: アナリティクスの設定をする
order: 5
folder: analytics
locale: ja
---

## 開始前に決めておくこと

アナリティクス ソリューションはどれも、必要なデータとデータの分析方法が決定済みであることを前提に構成されています。
アナリティクスを始める前には、以下の内容を決定しましょう。

* ユーザー エンゲージメント解析にサードパーティのアナリティクス ツールを使用するか、社内のソリューションを利用するか。

* ユーザー エンゲージメント調査において、どのユーザー操作を計測するか。

### ベンダーと社内、どちらにデータを送信するか

ユーザー エンゲージメントを測定するための社内ソリューションがある場合は、URL さえ分かれば、そのソリューションと AMP アナリティクスを統合できます。

その URL がデータの送信先になります。
複数の URL にデータを送信することも可能で、
たとえばページビュー データとソーシャル エンゲージメント データをそれぞれ別の URL に送信できます。


AMP アナリティクスは 1 回の計測で、複数の URL に結果を送信できる特別な設計になっています。
すでに 1 つ以上のアナリティクス ベンダーを使用している場合は、[amp-analytics 仕様](/docs/reference/extended/amp-analytics.html)を確認して、そのソリューションが AMP と統合済みかを確認してください。



統合済みであれば、仕様に掲載されているベンダーのドキュメントを開いて、その手順に従ってください。


アナリティクス ベンダーが AMP を統合していない場合は、ベンダーのサポートを受けてください。

あわせて [AMP プロジェクトの課題として](https://github.com/ampproject/amphtml/issues/new)、そのベンダーの追加リクエストをすることをお勧めします。

[AMP HTML にアナリティクス ツールを統合する](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md)についてもご確認ください。


### 必要なデータ

設定をする前に、エンゲージメント測定において収集するユーザーデータを
決める必要があります。

主要データについて、以下の内容を検討しましょう。

* ページビューのみトラックするか、その他のユーザー エンゲージメント パターンもトラックするか（[amp-pixel か amp-analytics](/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics) についてもご覧ください）。

* ユーザー、コンテンツ、端末やブラウザについて、何のデータを収集するか（[変数置換](/docs/guides/analytics/analytics_basics.html#variable-substition)についてもご覧ください）。

* ユーザの特定方法はどうするか（[ユーザーの識別](/docs/guides/analytics/analytics_basics.html#user-identification)についてもご覧ください）。

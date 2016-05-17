---
layout: page
title: プレビューと検証
order: 3
locale: ja
---

AMP ページのプレビュー方法は静的な HTML サイトと同じです。ビルド工程や前処理は不要で、以下のいずれかの方法でプレビュー確認ができます。

  - **ファイルシステムから直接ブラウザでページを開く**（XMLHttpRequest が失敗するため、一部の要素が機能しない可能性があります）。
  - **Apache 2 や Nginx などのローカルのウェブサーバーを使用する**
    *(ヒント: （`python -m SimpleHTTPServer` を実行すると、すぐにウェブサーバーを使用できます）。

次に AMP ページが**実際に有効な AMP である**かを検証します。有効でない場合は、Google 検索などのサードパーティのプラットフォームによる検出や配信ができません。検証を行う方法は以下のとおりです。

  1. ブラウザで対象ページを開く。
  1. URL に「`#development=1`」を追加して、`http://localhost:8000/released.amp.html#development=1` のようにする。
  1. [Chrome DevTools のコンソール](https://developers.google.com/web/tools/chrome-devtools/debug/console/)を開いて、検証エラーを確認する。

[検証の詳細](/docs/guides/validate.html)とエラーの対処法についてもご確認ください。

{% include button.html title="ステップ 5 に進む" link="/docs/get_started/create/prepare_for_discovery.ja.html" %}

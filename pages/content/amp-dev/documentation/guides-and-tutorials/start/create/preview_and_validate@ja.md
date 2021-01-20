---
"$title": Preview and validate
"$order": '5'
description: AMP ページのプレビュー方法は静的な HTML サイトと同じです。構築手順や前処理は不要で、以下のいずれかの方法でプレビュー確認ができます。 ...
author: pbakaus
contributors:
- bpaduch
---

## プレビュー

AMP ページのプレビュー方法は静的な HTML サイトと同じです。構築手順や前処理は不要で、以下のいずれかの方法でプレビュー確認ができます。

- **ファイルシステムから直接ブラウザでページを開く**（XMLHttpRequest が失敗するため、一部の要素が機能しない可能性があります）。
- **Apache 2 や Nginx などのローカルのウェブサーバーを使用する**<em>（ヒント: <code data-md-type="codespan">python -m SimpleHTTPServer</code> を実行すると、すぐにウェブサーバーを使用できます）。</em>

## 検証

次に AMP ページが**実際に有効な AMP である**かを検証します。有効でない場合は、Google 検索などのサードパーティのプラットフォームによる検出や配信ができません。検証を行う方法は以下のとおりです。

1. ブラウザで対象ページを開く。
2. URL に「`#development=1`」を追加して、`http://localhost:8000/released.amp.html#development=1` のようにする。
3. [Chrome DevTools のコンソール](https://developers.google.com/web/tools/chrome-devtools/debug/console/)を開いて、検証エラーを確認する。

[tip type="read-on"] <strong>参考情報:</strong> [検証の詳細](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)とエラーの対処法についてもご確認ください。[/tip]

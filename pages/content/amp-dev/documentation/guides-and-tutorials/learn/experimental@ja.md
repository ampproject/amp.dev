---
$title: 試験運用機能
---

[AMP 試験運用コンポーネント](https://github.com/ampproject/amphtml/tree/main/tools/experiments)
は、一般公開する前の機能としてリリースされており、**試験運用**というステータスの下で保護されています。

デベロッパーやユーザーは、完全リリースされる前のこれらの機能を使用するかどうか、ご自身の意思で選択できます。
ただし、これらの機能にはバグが含まれていたり予想外の副作用が生じたりする可能性があるため、ご利用の際は注意が必要です。

## AMP Beta チャンネルを有効にする

AMP Beta チャンネルは、ブラウザで最新版の AMP JS ライブラリを有効にするための手段です。

AMP Beta チャンネルのリリースは**安定性が低い可能性があり**、まだすべてのユーザーに公開されていない機能が含まれている場合があります。新しいバージョンの AMP をテストする、バグを報告する、まだ全ユーザーに公開されていない新機能を使用してドキュメントを作成するなどの目的がある場合に、このオプションを選択してください。

Beta チャンネルは次のようなケースにおすすめです。

- まだ全ユーザーに公開されていない新機能のテストや試運用。
- サイトの品質保証（QA）に使用して AMP の次期バージョンとの互換性の確認。

Beta チャンネル バージョンの AMP でのみ発生すると思われる問題が見つかった場合は、問題の詳細を添えて[問題を送信](https://github.com/ampproject/amphtml/issues/new)してください。必ず、問題が再現されるページの URL を記載してください。

ブラウザで AMP Beta チャンネルを有効にするには、[AMP 試験運用機能のページ](https://cdn.ampproject.org/experiments.html)にアクセスして、「AMP Beta Channel」の試験運用機能を有効にします。AMP の重要な変更ついての通知を受けるには、[amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce) メーリング リストに登録してください。

## 試験運用コンポーネントを有効にする

#### cdn.ampproject.org から配信される場合

[https://cdn.ampproject.org](https://cdn.ampproject.org) から配信されるコンテンツについては、
[AMP 試験運用機能のページ](https://cdn.ampproject.org/experiments.html)にアクセスして、
試験運用コンポーネントのオンとオフを切り替えることで、有効または無効にすることができます。有効にすると、Google AMP キャッシュから配信されるすべての AMP ページでその試験運用機能が有効になるようにブラウザの Cookie が設定されます。

#### 他のドメインから配信される場合

その他のドメインから配信されるコンテンツについては、devtools コンソールで試験運用機能を切り替えることができます。その際は、次のコードを使用して開発モードを有効にします。

```js
AMP.toggleExperiment('experiment')
```

試験運用機能が含まれている AMP ファイルは、
[AMP の検証](validation-workflow/validate_amp.md)でエラーになります。
実用段階の AMP ドキュメントでは、試験運用コンポーネントを削除してください。

## 特定のドキュメントで試験運用機能を有効にする

ドキュメントで特定の試験運用機能を有効にするかどうか選択できます。これを行うには、HTML ドキュメントの先頭で、AMP スクリプト（`https://cdn.ampproject.org/v0.js`）の前に `amp-experiments-opt-in` という名前のメタタグを入れます。そのコンテンツの値には、有効にする試験運用機能の ID をカンマ区切り文字列として指定します。

```html
<<head>
  ...
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b">
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  ...
</head>
```

こうすることで、ドキュメントを閲覧するすべてのユーザーに対して、指定した試験運用機能が有効になります。ただし、すべての試験運用機能をドキュメント レベルで選択できるわけではありません。ホワイトリストに登録されている試験運用機能の詳細なリストについては、プロジェクトの `prod-config.json` ファイルの `allow-doc-opt-in` 属性を参照してください。ドキュメントで有効にした機能は、ユーザーのオプトアウトによって無効にすることができます。
 

---
$title: 試験運用機能
$order: 5
---

[AMP 試験運用コンポーネント](https://github.com/ampproject/amphtml/tree/master/tools/experiments)
は、一般公開する前にリリースされている機能です。したがって、試験運用というステータスの下で保護されています。

デベロッパーやユーザーは、完全リリースされる前のこれらの機能を使用するかどうかを、ご自身の意思で選択できます。
ただし、これらの機能にはバグが含まれていたり予想外の副作用が生じたりする可能性があるため、ご利用の際は注意が必要です。

## AMP Dev チャンネルを有効にする

AMP Dev チャンネルは、ブラウザで最新版の AMP JS ライブラリを有効にするための手段です。

AMP Dev チャンネル リリースは **安定性に欠ける可能性があり** 、まだ一般公開されていない新機能が含まれている場合があります。新しい 
AMP を試す、バグを報告する、まだ一般公開されていない新機能を必要とするドキュメントを作成するなどの目的がある場合に、このリリースを選択
してください。

Dev チャンネルは以下の場合におすすめします。

- まだ一般公開されていない新機能を試したい。
- サイトの品質保証のため、次のバージョンの AMP との互換性を確認したい。

Dev チャンネル バージョンの AMP でのみ発生する問題が見つかった場合は、 [バグ報告](https://github.com/ampproject/amphtml/issues/new)で問題の詳細についてお知らせください。その際は、問題を再現できるページの URL を必ず含めてください。

ブラウザで AMP Dev チャンネルを有効にするには、 [AMP 試験運用機能のページ](https://cdn.ampproject.org/experiments.html)にアクセスし、"AMP Dev Channel" 試験運用機能を有効にします。AMP の重要な変更について通知を受け取るには、 [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce) メーリング リストに登録してください。

## 試験運用コンポーネントを有効にする

[https://cdn.ampproject.org](https://cdn.ampproject.org) から配信されるコンテンツについては、[AMP 試験運用機能のページ](https://cdn.ampproject.org/experiments.html)にアクセスして、試験運用コンポーネントのオンとオフを切り替えることで、有効または無効にすることができます。有効にすると、Google AMP キャッシュから配信されるすべての AMP ページでその試験運用機能が有効になるようにブラウザの Cookie が設定されます。

その他のドメインから配信されるコンテンツについては、devtools コンソールで試験運用機能を切り替えることができます。その際は、次のコードを使用して開発モードを有効にします。

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

試験運用機能が含まれている AMP ファイルは、
[AMP の検証](/ja/docs/guides/validate.html)でエラーになります。
実用段階の AMP ドキュメントでは、試験運用コンポーネントを削除してください。


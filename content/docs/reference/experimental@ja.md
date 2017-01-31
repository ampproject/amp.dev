---
$title: 試験運用コンポーネント
---

[AMP 試験運用コンポーネント](https://github.com/ampproject/amphtml/tree/master/tools/experiments)
は、一般公開する前の機能としてリリースされるため、試験運用というステータスの下で保護されています。

デベロッパーやユーザーは、完全リリースされる前のこれらの機能を使用するかどうか、ご自身の意思で選択できます。
ただし、これらの機能にはバグが含まれていたり予想外の副作用が生じたりする可能性があるため、ご利用の際は注意が必要です。

## AMP Dev チャンネルを有効にする

AMP Dev コンソール チャンネルは、ブラウザで最新版の AMP JS ライブラリを有効にするための手段です。

ブラウザで AMP Dev チャンネルを有効にするには、
[AMP 試験運用機能のページ](https://cdn.ampproject.org/experiments.html)にアクセスして、
「AMP Dev チャンネル」の機能を有効にします。

## 試験運用コンポーネントを有効にする

[https://cdn.ampproject.org](https://cdn.ampproject.org) から配信されるコンテンツについては、
[AMP 試験運用機能のページ](https://cdn.ampproject.org/experiments.html)にアクセスして、
試験運用コンポーネントのオンとオフを切り替えることで、有効または無効にすることができます。有効にすると、Google AMP キャッシュから配信されるすべての AMP ページでその試験運用機能が有効になるようにブラウザの Cookie が設定されます。

その他のドメインから配信されるコンテンツについては、devtools コンソールで試験運用機能を切り替えることができます。その際は、次のコードを使用して開発モードを有効にします。

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

試験運用機能が含まれている AMP ファイルは、
[AMP の検証](/docs/guides/validate.html)でエラーになります。実用段階の AMP ドキュメントでは、試験運用コンポーネントを削除してください。

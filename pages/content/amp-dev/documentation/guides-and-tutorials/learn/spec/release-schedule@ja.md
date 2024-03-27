---
'$title': AMP のリリーススケジュール
$order: 10
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: '- リリースチャンネル'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [リリースチャンネル ](#release-channels)
  - [ナイトリー ](#nightly)
  - [ウィークリー ](#weekly)
    - [ベータおよび実験的チャンネル ](#experimental-and-beta-channels)
  - [長期安定版（LTS）](#long-term-stable-lts)
- [変更内容がリリースに含まれるかを確認する ](#determining-if-your-change-is-in-a-release)
- [リリースケイデンス ](#release-cadence)
  - [詳細スケジュール ](#detailed-schedule)
  - [リリースフリーズ ](#release-freezes)

AMP の新規リリースは、毎週火曜日にすべての AMP ページにプッシュされます。**AMP への変更が amphtml リポジトリのマスターブランチにマージされてから変更がすべてのユーザーに対してライブになるまでには、通常 1 ～ 2 週間かかります。**

## リリースチャンネル <a name="release-channels"></a>

AMP ランタイムと拡張機能は、さまざまな*リリースチャンネル*を通じて提供されます。各チャンネルには、開発者向けと AMP HTML プロジェクト自体向けの目的があります。[`ampproject/amphtml`](https://github.com/ampproject/amphtml) リポジトリのコードがリリースビルドに含まれる仕組みとタイミングに関する詳細は、[リリースケイデンスのセクション](#release-cadence)を参照してください。

PR が以下のいずれかのリリースチャンネルに含まれているかどうかを判断するには、「_PR Use: In Canary_」、「_PR Use: In Production_」、または「_PR Use: In LTS_」という GitHub ラベルを確認してください（詳細は、「[変更内容がリリースに含まれるかを確認する](#determining-if-your-change-is-in-a-release)」セクションを参照してください）。

### ナイトリー <a name="nightly"></a>

**ナイトリー**リリースチャンネルは、平日の夜間（名前が示すとおり）に更新されます。このプロセスは自動であり、ナイトリーリリースにバグやその他の課題が含まれないことは保証されていません。毎晩午前零時（太平洋時間）を過ぎると、その日の「グリーン」最終コミットがリリースのカットオフポイントに選択されるようになっています。グリーンビルドは、そのビルドがすべての自動テストに合格したことを示します。

ナイトリーリリースには、トラフィックが増加する*ウィークリー*父ースチャンネルに到達する前に課題を素早く検出して解決する仕組みが含まれています。また、新たに導入された課題に影響を受けるユーザー数を抑制する目的もあります。

**ナイトリー**チャンネルにオプトインして、過去数日間にマージされたプルリクエストをテストすることが可能です。詳細は、[DEVELOPING.md] の[オプトインのセクション](https://github.com/ampproject/amphtml/blob/main/docs/developing.md#opting-in-to-pre-release-channels)を参照してください。

### ウィークリー <a name="weekly"></a>

*ウィークリー*リリースチャンネルは、主要「エバーグリーン」リリースチャンネルとして捉えられています。毎週、前の週の**ベータ**リリースは**安定**リリースに昇格され、前の週の最後の**ナイトリー**リリースは**実験的**および**ベータ**リリースチャンネルに昇格されます（「[詳細スケジュール](#detailed-schedule)」を参照してください。）。

リリースビルドの作成に使用されるビルド構成には、*カナリー*構成と*本番*構成の 2 つがあります。**実験的**および**ベータ**リリースチャンネルは、同じコミットから構築されていますが、**実験的**チャンネルは*カナリー*構成を使用するのに対し、**ベータ**チャンネルは*本番*構成を使用しています。*カナリー*構成では、*本番*では無効化される可能性のある実験的コンポーネントと機能が有効化されています。**実験的**または**ベータ**チャンネルには、[実験ページ](https://ampjs.org/experiments.html)でオプトインすることができます。

**安定**リリースチャンネルは、*本番*構成で構築されており、ほとんどの AMP トラフィックに配信されます。**ベータ**リリースも*本番*構成で構築されているため、翌週には**安定版**となるビルドそのものを指すことになります（チェリーピックにより、直前に課題が修正される可能性があります。詳細は、「[コードの貢献](https://github.com/ampproject/amphtml/blob/main/docs/contributing-code.md#Cherry-picks)」を参照してください）。

#### ベータおよび実験的チャンネル <a name="beta-and-experimental-channels"></a>

*ベータ*および*実験的チャンネル*は、AMP の次期安定リリースのプレリリース候補です。毎週火曜日（[リリースフリーズ](#release-freezes)がある週を除く）、前の週の**ナイトリー**が、**ベータ**と**実験的**の開発者オプトインチャンネルに昇格されます。1 日間、これらのチャンネルに機能やパフォーマンスの退行がないことを確認したのち、水曜日に一部のトラフィックに対してこのリリースが昇格されます。翌週の火曜日、この同じリリースが**安定**チャンネルに昇格されます。

これらのチャンネルにオプトインすることができます。詳細は、[DEVELOPING.md] の[オプトインのセクション](https://github.com/ampproject/amphtml/blob/main/docs/developing.md#opting-in-to-pre-release-channels)を参照してください。

*ベータチャンネル*にオプトインすると、以下の項目を行えるようになります。

- 近日リリース予定の AMP ランタイムバージョンをテストして試すことができる
- 品質保証（QA）で使用して、サイトと次期バージョンの AMP の互換性を確認することができる

*実験的チャンネル*にオプトインすると、以下の項目を行えるようになります。

- すべてのユーザーにはまだ公開されていない新機能をテストして試すことができる
- 品質保証（QA）で使用して、サイトと開発段階にある近日公開予定の AMP 機能の互換性を確認することができる

*実験的チャンネル*の**安定性は低い可能性があり**、すべてのユーザーには提供されていない機能が含まれる場合があります。

### 長期安定版（LTS） <a name="long-term-stable-lts"></a>

**LTS** リリースチャンネルは、1 か月間隔で、前の**安定**ビルドを提供します。毎月第 2 月曜日、現在の**安定**リリースは **LTS** に昇格されます。これは、すべての AMP サイト運営者に推奨されるチャンネルではなく、ウェブサイトでの QA サイクルをあまり頻繁に実施する意思のないサイト運営者が、特定のウェブページを **LTS** チャンネルにオプトインして実施できるように提供されているチャンネルです（<a href="https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md" data-md-type="link">**LTS** の Readme</a> を参照してください)。

月の第 2 月曜日が休日である場合は、[リリースフリーズ](#release-freezes)の終了後に昇格されます。

重要: **LTS** リリースチャンネルを使用するサイト運営者は、新たに導入される機能を使用してはいけません。サイクルの期間がより長期であるため、**LTS** リリースは `ampproject/amphtml` の `HEAD` から最大 7 週間遅れている可能性があります。変更内容が選択したリリースサイクルで使用できるかどうかを検証するには、「[変更内容がリリースに含まれているかどうかを確認する](#determining-if-your-change-is-in-a-release)」セクションを参照してください。

## 変更内容がリリースに含まれるかを確認する <a name="determining-if-your-change-is-in-a-release"></a>

[_Type: Release_ GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) は、初期カットから、**実験的**/**ベータ**チャンネルでのテスト、**安定**および **LTS** チャンネルでのリリースの評価まで、現行または過去のリリースのステータスを追跡するために使用されます。リリースに関する告知は、[AMP Slack #release channel](https://amphtml.slack.com/messages/C4NVAR0H3/) で行われます（[Slack に登録](https://bit.ly/amp-slack-signup)）。

あるビルドのどの変更が含まれるかを判断するには、以下のいずれかを使用します。

- 各リリースビルドの [_Type: Release_ GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) には、そのリリースに含まれる変更内容が記載された特定の[リリースページ](https://github.com/ampproject/amphtml/releases)へのリンクが含まれます。
- [_PR Use: In Beta / Experimental_](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22)、[_PR Use: In Stable_](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22)、および [_PR Use: In LTS_](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) ラベルは、PR が*ウィークリー*または **LTS** ビルドに昇格されると追加されます。ビルドが作成されるタイミングとラベルが追加されるタイミングには遅延が生じる場合があります。

## リリースケイデンス <a name="release-cadence"></a>

リリースケイデンスについては、意識的に大きく注意を払っています。

AMP の新規バージョンをどれくらいの頻度で全ユーザーに対してプッシュするかを判断するには、以下のような多くの要因を考慮しなければなりません。

- AMP を使って構築された何百万ものサイトや、何十億ものページの安定性
- 新規バージョンをプッシュする際に発生する可能性のあるキャッシュ無効化
- 新機能を素早く公開したいという願望

こういった要因をすべて考慮したうえで、プッシュサイクルを 1 ～ 2 週間に決定しました。これまでのところ、これが合理的な妥協として成り立っていますが、こういった要因を継続して評価し、将来的に変更を適用することも考えられます。

### 詳細スケジュール <a name="detailed-schedule"></a>

このスケジュールにできるだけ緊密に従うように努めていますが、複雑化すれば遅延が生じる可能性もあります。リリースの最新ステータスは、「[_Type: Release_ GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release)」および [AMP Slack #release channel](https://amphtml.slack.com/messages/C4NVAR0H3/)（[Slack に登録](https://bit.ly/amp-slack-signup)）で追跡することができます。

- 火曜日[午前 11 時（米国太平洋時間）](https://www.google.com/search?q=11am+pacific+in+current+time+zone): 新しい**実験的**および**ベータ**リリースが[すべてのテストに合格した最新のマスタービルド](https://travis-ci.com/ampproject/amphtml/branches)から構築され、[AMP 実験的チャンネル](#amp-experimental-and-beta-channels)または [AMP ベータチャンネル](#amp-experimental-and-beta-channels)にオプトインしている AMP ユーザーにプッシュされます。
- 水曜日: *実験的チャンネル*および*ベータチャンネル*ユーザーのバグレポートを確認し、すべてが良好であれば、AMP ページの 1% に対して**ベータ**をプッシュします。
- 木曜日から月曜日: *実験的チャンネル*および*ベータチャンネル*ユーザー、および**実験的**/**ベータ**ビルドを使用する 1% のページのエラー率とバグレポートを監視し続けます。
- 翌週の火曜日: **ベータ**ビルドは**安定**ビルドに昇格されます（すべての AMP ページで個のビルドを使用できるようになります）。

### リリースフリーズ <a name="release-freezes"></a>

AMP の本番リリースを省略する場合がたまにあり、これをリリースフリーズと呼んでいます。

第 N 週に 1 週間のリリースフリーズが告知された場合、スケジュールは以下のようになります。

- 前の週のリリースビルドは、もう 1 週間、**実験的**/**ベータ**のままになります。通常スケジュールとは異なり、第 N-1 週のリリースカットは第 N 週に**安定**リリースにはならず、第 N+1 週に**安定**リリースにプッシュされます。
- フリーズウィーク（第 N 週）には、新規ビルドは*リリースされません*。
- 通常スケジュールは、第 N+1 週に再開します。**実験的**/**ベータ**は、第 N+1 週にカットされ、第 N+2 週に**安定**に昇格されます。
- 第 N-1 週に昇格された**安定**リリースがもともと第 N 週中に **LTS** に昇格予定であった場合は、第 N+1 <br>週の月曜日に **LTS** に昇格されるようになります。
- **ナイトリー**リリースは、完全に自動化されているため、そのまま生成されて昇格されます。

リリースフリーズには、以下のような原因があります。

- AMP リリースを**安定**にプッシュしてそれを監視するのに十分な人員が確保されない時期。現在、AMP リリースを実施している人員のほとんどが米国を拠点としているため、通常、米国の独立記念日（7 月 4 日）、サンクスギビング（11 月第 4 木曜日）、クリスマス（12 月 25 日）、および大晦日と元日（12 月 31 日/ 1 月 1 日）といった主な米国の祝日が発生する週です。
- [技術運営委員会（TSC）](https://github.com/ampproject/meta-tsc)またはリリースを実施する人員によって、セキュリティやプライバシーに関する問題などの緊急事態が認められた場合。
- TSC によってコードベースの安定性が特別に重要であると判定された場合など。

緊急時を除くすべてのケースでは、少なくとも 1 か月前にリリースフリーズを告知しています。

リリースフリーズは、そのように指定がない限りコードフリーズではありません。リリースフリーズ中、コードの記述、レビュー、およびマージはそのまま続行することができます。

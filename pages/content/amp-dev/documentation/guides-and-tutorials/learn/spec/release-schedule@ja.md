---
"$title": AMP のリリーススケジュール
order: '10'
formats:
- websites
- email
- stories
- ads
teaser:
  text: "- リリースチャンネル"
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/contributing/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Release Channels](#release-channels)
    - [Nightly](#nightly)
    - [Weekly](#weekly)
        - [Experimental and Beta channels](#experimental-and-beta-channels)
    - [Long-Term Stable (lts)](#long-term-stable-lts)
- [Determining if your change is in a release](#determining-if-your-change-is-in-a-release)
- [Release Cadence](#release-cadence)
    - [Detailed schedule](#detailed-schedule)
    - [Release Freezes](#release-freezes)

A new release of AMP is pushed to all AMP pages every week on Tuesday. **Once a change in AMP is merged into the master branch of the amphtml repository, it will typically take 1-2 weeks for the change to be live for all users.**

## リリースチャンネル <a name="release-channels"></a>

AMP ランタイムと拡張機能は、さまざまな*リリースチャンネル*を通じて提供されます。各チャンネルには、開発者向けと AMP HTML プロジェクト自体向けの目的があります。[`ampproject/amphtml`](https://github.com/ampproject/amphtml) リポジトリのコードがリリースビルドに含まれる仕組みとタイミングに関する詳細は、[リリースケイデンスのセクション](#release-cadence)を参照してください。

PR が以下のいずれかのリリースチャンネルに含まれているかどうかを判断するには、「*PR Use: In Canary*」、「*PR Use: In Production*」、または「*PR Use: In LTS*」という GitHub ラベルを確認してください（詳細は、「[変更内容がリリースに含まれるかを確認する](#determining-if-your-change-is-in-a-release)」セクションを参照してください）。

### ナイトリー <a name="nightly"></a>

**ナイトリー**リリースチャンネルは、平日の夜間（名前が示すとおり）に更新されます。このプロセスは自動であり、ナイトリーリリースにバグやその他の課題が含まれないことは保証されていません。毎晩午前零時（太平洋時間）を過ぎると、その日の「グリーン」最終コミットがリリースのカットオフポイントに選択されるようになっています。グリーンビルドは、そのビルドがすべての自動テストに合格したことを示します。

ナイトリーリリースには、トラフィックが増加する*ウィークリー*父ースチャンネルに到達する前に課題を素早く検出して解決する仕組みが含まれています。また、新たに導入された課題に影響を受けるユーザー数を抑制する目的もあります。

**ナイトリー**チャンネルにオプトインして、過去数日間にマージされたプルリクエストをテストすることが可能です。詳細は、[DEVELOPING.md] の[オプトインのセクション](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels)を参照してください。

### ウィークリー <a name="weekly"></a>

*ウィークリー*リリースチャンネルは、主要「エバーグリーン」リリースチャンネルとして捉えられています。毎週、前の週の**ベータ**リリースは**安定**リリースに昇格され、前の週の最後の**ナイトリー**リリースは**実験的**および**ベータ**リリースチャンネルに昇格されます（「[詳細スケジュール](#detailed-schedule)」を参照してください。）。

リリースビルドの作成に使用されるビルド構成には、*カナリー*構成と*本番*構成の 2 つがあります。**実験的**および**ベータ**リリースチャンネルは、同じコミットから構築されていますが、**実験的**チャンネルは*カナリー*構成を使用するのに対し、**ベータ**チャンネルは*本番*構成を使用しています。*カナリー*構成では、*本番*では無効化される可能性のある実験的コンポーネントと機能が有効化されています。**実験的**または**ベータ**チャンネルには、[実験ページ](https://cdn.ampproject.org/experiments.html)でオプトインすることができます。

**安定**リリースチャンネルは、*本番*構成で構築されており、ほとんどの AMP トラフィックに配信されます。**ベータ**リリースも*本番*構成で構築されているため、翌週には**安定版**となるビルドそのものを指すことになります（チェリーピックにより、直前に課題が修正される可能性があります。詳細は、「[コードの貢献](https://github.com/ampproject/amphtml/blob/master/contributing/contributing-code.md#Cherry-picks)」を参照してください）。

#### ベータおよび実験的チャンネル <a name="beta-and-experimental-channels"></a>

*ベータ*および*実験的チャンネル*は、AMP の次期安定リリースのプレリリース候補です。毎週火曜日（[リリースフリーズ](#release-freezes)がある週を除く）、前の週の**ナイトリー**が、**ベータ**と**実験的**の開発者オプトインチャンネルに昇格されます。1 日間、これらのチャンネルに機能やパフォーマンスの退行がないことを確認したのち、水曜日に一部のトラフィックに対してこのリリースが昇格されます。翌週の火曜日、この同じリリースが**安定**チャンネルに昇格されます。

これらのチャンネルにオプトインすることができます。詳細は、[DEVELOPING.md] の[オプトインのセクション](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels)を参照してください。

*ベータチャンネル*にオプトインすると、以下の項目を行えるようになります。

- 近日リリース予定の AMP ランタイムバージョンをテストして試すことができる
- 品質保証（QA）で使用して、サイトと次期バージョンの AMP の互換性を確認することができる

*実験的チャンネル*にオプトインすると、以下の項目を行えるようになります。

- すべてのユーザーにはまだ公開されていない新機能をテストして試すことができる
- 品質保証（QA）で使用して、サイトと開発段階にある近日公開予定の AMP 機能の互換性を確認することができる

*実験的チャンネル*の**安定性は低い可能性があり**、すべてのユーザーには提供されていない機能が含まれる場合があります。

### 長期安定版（LTS） <a name="long-term-stable-lts"></a>

**LTS** リリースチャンネルは、1 か月間隔で、前の**安定**ビルドを提供します。毎月第 2 月曜日、現在の**安定**リリースは **LTS** に昇格されます。これは、すべての AMP サイト運営者に推奨されるチャンネルではなく、ウェブサイトでの QA サイクルをあまり頻繁に実施する意思のないサイト運営者が、特定のウェブページを **LTS** チャンネルにオプトインして実施できるように提供されているチャンネルです（<a href="https://github.com/ampproject/amphtml/blob/master/contributing/lts-release.md" data-md-type="link">**LTS** の Readme</a> を参照してください)。

If the second Monday of the month falls on a holiday, the promotion will be performed after the end of the [release freeze](#release-freezes).

重要: **LTS** リリースチャンネルを使用するサイト運営者は、新たに導入される機能を使用してはいけません。サイクルの期間がより長期であるため、**LTS** リリースは `ampproject/amphtml` の `HEAD` から最大 7 週間遅れている可能性があります。変更内容が選択したリリースサイクルで使用できるかどうかを検証するには、「[変更内容がリリースに含まれているかどうかを確認する](#determining-if-your-change-is-in-a-release)」セクションを参照してください。

## 変更内容がリリースに含まれるかを確認する <a name="determining-if-your-change-is-in-a-release"></a>

[*Type: Release* GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) are used to track the status of current and past releases; from the initial cut, to testing via **experimental**/**beta** channels, to eventual release via the **stable** and **lts** channels. Announcements about releases are made on the [AMP Slack #release channel](https://amphtml.slack.com/messages/C4NVAR0H3/) ([sign up for Slack](https://bit.ly/amp-slack-signup)).

あるビルドのどの変更が含まれるかを判断するには、以下のいずれかを使用します。

- 各リリースビルドの [*Type: Release* GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) には、そのリリースに含まれる変更内容が記載された特定の[リリースページ](https://github.com/ampproject/amphtml/releases)へのリンクが含まれます。
- [*PR Use: In Beta / Experimental*](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22)、[*PR Use: In Stable*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22)、および [*PR Use: In LTS*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) ラベルは、PR が*ウィークリー*または **LTS** ビルドに昇格されると追加されます。ビルドが作成されるタイミングとラベルが追加されるタイミングには遅延が生じる場合があります。

## リリースケイデンス <a name="release-cadence"></a>

リリースケイデンスについては、意識的に大きく注意を払っています。

AMP の新規バージョンをどれくらいの頻度で全ユーザーに対してプッシュするかを判断するには、以下のような多くの要因を考慮しなければなりません。

- AMP を使って構築された何百万ものサイトや、何十億ものページの安定性
- cache-busting that might happen when we push a new version
- 新機能を素早く公開したいという願望

こういった要因をすべて考慮したうえで、プッシュサイクルを 1～2 週間に決定しました。これまでのところ、これが合理的な妥協として成り立っていますが、こういった要因を継続して評価し、将来的に変更を適用することも考えられます。

### 詳細スケジュール <a name="detailed-schedule"></a>

このスケジュールにできるだけ緊密に従うように努めていますが、複雑化すれば遅延が生じる可能性もあります。リリースの最新ステータスは、「[*Type: Release* GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release)」および [AMP Slack #release channel](https://amphtml.slack.com/messages/C4NVAR0H3/)（[Slack に登録](https://bit.ly/amp-slack-signup)）で追跡することができます。

- Tuesday @ [11am Pacific](https://www.google.com/search?q=11am+pacific+in+current+time+zone): new **experimental** and **beta** release builds are created from the [latest master build that passes all of our tests](https://travis-ci.com/ampproject/amphtml/branches) and are pushed to users who opted into the [AMP Experimental Channel](#amp-experimental-and-beta-channels) or [AMP Beta Channel](#amp-experimental-and-beta-channels), respectively.
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

- Times when there are not enough people available to push the AMP release to **stable** and monitor it. Currently, most of the people performing AMP releases are based in the United States, so this will usually be the weeks of the major US holidays of Independence Day (July 4), Thanksgiving (fourth Thursday in November), Christmas (25 December), and New Year's Eve/Day (December 31/January 1).
- [技術運営委員会（TSC）](https://github.com/ampproject/meta-tsc)またはリリースを実施する人員によって、セキュリティやプライバシーに関する問題などの緊急事態が認められた場合。
- Other situations when the stability of the codebase is deemed to be particularly important as determined by the TSC.

In all cases, except emergencies, the release freezes will be announced at least one month in advance.

リリースフリーズは、そのように指定がない限りコードフリーズではありません。リリースフリーズ中、コードの記述、レビュー、およびマージはそのまま続行することができます。

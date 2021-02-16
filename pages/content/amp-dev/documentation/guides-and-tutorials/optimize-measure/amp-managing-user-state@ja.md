---
'$title': AMP で非認証ユーザーの状態を管理する
$order: 2
formats:
  - websites
teaser:
  text: '**目次**'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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

**目次**

- [背景 ](#background)
- [実装ガイド](#implementation-guide)
  - [始める前に ](#before-getting-started)
  - [タスク 1: サイト運営者オリジンの非 AMP ページについては、ID をセットアップし、アナリティクス ping を送信する ](#task1)
  - [タスク 2: AMP ページについては、ID をセットアップし、amp-analytics ping にクライアント ID の置換を含めてアナリティクス ping を送信する](#task2)
  - [タスク 3: サイト運営者オリジンでページのアナリティクス ping を処理する ](#task3)
  - [タスク 4: AMP キャッシュまたは AMP ビューアの表示コンテキストのアナリティクス ping を処理し、ID マッピングを確立する（必要な場合） ](#task4)
  - [タスク 5: リンクとフォーム送信にクライアント ID を使用する ](#task5)
- [強く推奨される実践 ](#strongly-recommended-practices)

ユーザー状態は今日のウェブにおいて重要な概念です。ユーザー状態を管理することで可能となる次の使用事例を考察してみましょう。

- マーチャントは、ユーザーが数週間前に初めて訪問した際に買い物かごに追加した商品を、2 回目の訪問時に表示する**買い物かご**を構築しています。このようなエクスペリエンスを導入すると、ユーザーが過去に購入しようとした商品を思い出させることができ、ユーザーが購入する確率を高めることができます。
- ニュースサイト運営者は、ユーザーが繰り返し訪問したサイト運営者の記事に基き、そのユーザー向けにカスタマイズされた**推奨記事**を提供しています。こうすることで、ユーザーの関心を維持し、ほかのコンテンツを見つけられるようにすることができます。
- さまざまな種類のサイトを運営しているウェブサイト開発者は、2 つのページビューがそれらを閲覧した同一人物であるのか、1 つのページを閲覧したユーザーが 2 人いるのかを知るために、**アナリティクス**を収集しています。このような洞察を得ることで、サイトのパフォーマンスを知ることができ、最終的には改善方法を見出すことができます。

この記事は、**非認証ユーザーの状態を AMP で管理**する方法を説明しています。ユーザーがサインインなどによってアイデンシティを提供するアクションを取っていない場合でも、ユーザーのジャーニーを円滑化するための方法です。このトピックのアプローチにかかわる課題と考慮事項をいくつか確認した後、AMP におけるユーザー状態のサポートと技術的な実装方法を説明しています。

## 背景 <a name="background"></a>

AMP におけるユーザー状態のトピックには特別な注意が必要です。AMP ページは、ウェブサイト、Google 検索、またはサードパーティのアプリなど、様々なコンテキストで表示されるため、ユーザーがこれらを移動する際にどのようにしてユーザー状態を管理できるかという課題が生まれます。

### AMP ページの表示コンテキスト <a name="display-contexts-for-amp-pages"></a>

AMP は、どこにおいても高速にコンテンツを有効化する移植可能なコンテンツ形式として考えることができます。AMP ドキュメントは、主に次の 3 つを介して表示することができます。

- サイト運営者のオリジン
- AMP キャッシュ
- AMP ビューア

<table>
  <tr>
    <th width="20%">コンテキスト</th>
    <th width="20%">非 AMP ページをこの場所から配信できるか</th>
    <th width="20%">AMP ページをこの場所から配信できるか</th>
    <th>サンプル URL</th>
  </tr>
  <tr>
    <td>サイト運営者のオリジン</td>
    <td>可能</td>
    <td>可能</td>
    <td><code>https://example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>AMP キャッシュ</td>
    <td>不可</td>
    <td>可能</td>
    <td><code>https://example-com.cdn.ampproject.org/s/example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>AMP ビューア</td>
    <td>不可</td>
    <td>可能</td>
    <td><code>https://google.com/amp/s/example.com/article.amp.html</code></td>
  </tr>
</table>

これらの状況をさらに詳しく見てみましょう。

**コンテキスト 1: サイト運営者のオリジン。** AMP ページは、サイト運営者のサイト（`https://example.com`）にホスティングされており、そこからアクセスできるようにデプロイされています（`https://example.com/article.amp.html`）。

サイト運営者は、AMP で排他的に公開するか、2 つのバージョンを公開するか（AMP コンテンツと「対となる」非 AMP コンテンツ）を選択することができます。この「対となる」モデルには、検索エンジン、ソーシャルメディアサイト、およびその他のプラットフォームで AMP バージョンのページが発見されるようにするための[特別な手順](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery)が必要です。いずれの公開方法も完全にサポートされているため、どちらを採用するかは、サイト運営者の判断によります。

> **注意:**
> 上述した「対となる」公開モデルにより、サイト運営者のオリジン（この例では `https://example.com`）は、**AMP と非 AMP コンテンツの両方にアクセスできる**コンテキストです。以下に説明する AMP キャッシュと AMP ビューアは、有効な AMP コンテンツのみを配信できるため、事実上、これを行える唯一のコンテキストと言えます。

**コンテキスト 2: AMP キャッシュ。**AMP ファイルは、サードパーティのキャッシュによってクラウドにキャッシュされるため、コンテンツがユーザーのモバイルデバイスに到達するまでの時間を短縮することができます。

AMP 形式を使用することで、コンテンツ制作者はサードパーティがキャッシュできる AMP ファイルを作成しています。この種のフレームワークでは、コンテンツの制御はサイト運営者によって継続して行われますが（上述のとおりオリジンに公開することで制御）、 プラットフォームがコンテンツをキャッシュまたはミラーリングするため、最適な配信速度を得ることができます。

従来的には、このようにして配信されるコンテンツは、異なるドメインを発行元としています。たとえば、[Google AMP キャッシュ](https://developers.google.com/amp/cache/overview)は `https://cdn.ampproject.org` を使用してコンテンツ（`https://example-com.cdn.ampproject.org/s/example.com/article.amp.html` など）を配信しています。

**コンテキスト 3: AMP ビューア。** AMP 形式は、サードパーティ AMP ビューア内への埋め込みをサポートするように構築されています。このため、AMP ファイルとビューアエクスペリエンス間での高度な連携が可能となり、コンテンツのスマートで安全なプリロードとプリレンダリングや完全な AMP ページ間でのスワイプといった革新的なアフォーダンスなどのメリットが得られます。

AMP キャッシュの場合と同様、AMP ビューアのドメインは、サイト運営者のオリジンとは異なります。たとえば、Google 検索のビューアは `https://google.com` にホストされており、Google AMP キャッシュにサイト運営者のコンテンツをリクエストする iframe が埋め込まれています。

### コンテキストが複数あるため、状態の管理も複数行う必要がある <a name="multiple-contexts-means-multiple-state-management"></a>

サイト運営者は、表示コンテキストごとにユーザー常置を管理する必要があります。AMP の[クライアント ID](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#client-id) 機能は、cookie またはローカルストレージを活用して状態を永続化していますが、AMP ページがユーザーの安定した仮名 ID を使用するために必要なサポートを提供しています。実装の観点から言えば、cookie またはローカルストレージが使用されており、AMP は表示コンテキストに応じてどちらを使用するかを決定しています。この選択は、この状態を数百から数千ものサイト運営者にわたって管理する技術的な実現可能性による影響を受けます。

ただし、AMP ページのサイト運営者は、（意図せずに）複数のコンテキストを伴うユーザージャーニーを設計してしまいがちです。最初の買い物かごのケースを見直し、完全な**ユーザーストーリー**を作成するための詳細をさらに追加しましょう。

> _1 日目、ユーザーは Google 検索で Example Inc の AMP ページを見つけます。Google 検索は AMP ビューアに AMP ページを読み込みます。ページを閲覧しながら、ユーザーは買い物かごに 4 つの商品を追加しますが、清算しませんでした。2 週間後の 15 日目、ユーザーは購入しようと思った 4 つの商品を思い出し、購入しようと決めます。Example Inc. の `https://example.com` にあるホームページ（非 AMP ホームページ）に直接アクセスすると、買い物かごにその 4 つの商品が保存されていました。_

このシナリオでは、ユーザーは AMP ビューアコンテキストからサイト運営者のオリジンのコンテキストに移動しただけでなく、イベント間で時間が経過しているにもかかわらず、一貫した買い物かごエクスペリエンスが提供されています。このエクスペリエンスは非常に合理的であり、買い物エクスペリエンスを設計しているのであればサポートすべきものであるといえます。では、どのようにして実現されているのでしょうか。

**ユーザー状態を伴うエクスペリエンスを有効化するには、ユーザーが移動するすべてのコンテキスト間で、個別に管理された状態が共有されている必要があります。**これらのコンテキストの境界をまたいで cookie の値をユーザー ID と共有する、という考えに「なるほど！」と納得するかもしれませんが、アドバイスが 1 つあります。これらのコンテキストはそれぞれ、同一のサイト運営者が制御するコンテンツを表示してはいますが、コンテキストは別々のドメインに存在するため、互いをサードパーティとみなします。

<amp-img alt="AMP's ability to be displayed in many contexts means that each of those contexts has its own storage for identifiers" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png" width="1030" height="868">
  <noscript><img alt="多くのコンテキストで表示されるAMPの機能は、それらのコンテキストのそれぞれが識別子用の独自のストレージを持っていることを意味します" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png"></noscript></amp-img>

次の議論からわかるように、cookie を操作する際にサードパーティであれば、ユーザーのブラウザ設定がどのように構成されているかによって、問題となることがあります。特に、特定の状況でサードパーティ cookie がブロックされている場合、コンテキスト間での情報共有が行えなくなります。一方、サードパーティ cookie の操作が許可されている場合は、情報を共有することができます。

## 実装ガイド <a name="implementation-guide"></a>

このセクションには、ユーザー状態の管理に関する推奨事項を記載しています。以下のタスクは順に提示されていますが、大まかに 2 つに分けてみることができます。

**パート 1: 基本実装:** タスク 1 ～ 4 は、基本部分が機能するようにするための基礎項目です。ジョブを部分的に達成するために必要な最小限の機能（AMP のクライアント ID 置換、cookie の読み取りと書き込み、およびバックエンドマッピングテーブルの管理）に依存しています。なぜ「部分的」なのでしょうか。これらのタスクで行われる手順は cookie の読み取りと書き込みに依存しており、ある状況ではブラウザの cookie 設定がこれを阻止する可能性があるため、これらのタスクは、すべてのシナリオにおいてユーザー状態を完全に管理するには不十分であるからです。

基礎を固めたら、使用事例をより狭めてトピックを確認し、そのケースに対して完全なソリューションを提供することができるようになります。

**パート 2: リンクとフォーム送信にクライアント ID を使用する**: タスク 5 では、リンクトラバーサルとフォーム送信を活用して、ユーザーがあるページから直接別のページへ移動するコンテキストの境界をまたいで AMP クライアント ID 情報を渡します。

> **注意事項:**
> 次の実装ガイドでは、cookie の使用方法と操作に関するアドバイスを提供しています。留意すべき重要な推奨事項について、「[強く推奨される実践](#strongly-recommended-practices)」セクションを必ずご覧ください。

### 始める前に <a name="before-getting-started"></a>

以下の技術ガイダンスを説明するにあたり、**ユーザー状態**をユーザーを表す安定した **ID** にバインドすることを前提とします。ID を `n34ic982n2386n30` とした場合、サーバー側で `n34ic982n2386n30` を、買い物かごの内容、以前に読んだ記事のリスト、または使用事例に応じたその他のデータなどのユーザー状態情報に関連付けます。

<amp-img alt="A single identifier could be used to manage user state for many use cases" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png" width="1276" height="376">
  <noscript><img alt="単一の識別子を使用して、多くのユースケースのユーザー状態を管理できます" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png"></noscript></amp-img>

このドキュメントの残りでは、わかりやすいように、ID を示す文字列をドル記号（`$`）の後に読みやすい名前をつなげた形式で示します。次にその例を示します。

[sourcecode:text]
n34ic982n2386n30 ⇒ $sample_id
[/sourcecode]

**使用事例:** このガイドを通じて、単純なページビュートラッキング（アナリティクス）を行うように設計された例を使用して、できる限り最も正確なユーザー数を調べます。つまり、ユーザーが別のコンテキストから特定のサイト運営者のコンテンツにアクセスしている場合であっても（AMP と非 AMP ページをまたぐ場合も含む）、それらの訪問を、サイト運営者の従来型の非 AMP ページでのみブラウズしているかのようにユーザーの統一理解に計数します。

**安定した cookie 値の可用性に関する前提:** また、ユーザーが同一のデバイスとブラウザを使用しており、プライベート/インコグニトブブラウジングを使用していないことを前提とします。これは、cookie の値が保持されたまま、ユーザーのセッション間で長期間使用できることを保証するためです。このようなケースでない場合は、これらのテクニックは機能しません。その場合は、ユーザーの認証済み（サインイン）ID に基づいてユーザー状態を管理する方法を参考にしてください。

**以下に提示する概念はほかの使用事例にも拡張できます。**アナリティクスの使用事例のみに焦点を当てていますが、以下に説明する概念は、コンテキスト間でユーザー状態を管理する必要のある使用事例に合わせて作り直すことができます。

<a id="task1"></a>

### タスク 1: サイト運営者オリジンの非 AMP ページについては、ID をセットアップし、アナリティクス ping を送信する <a name="task-1-for-non-amp-pages-on-the-publisher-origin-set-up-an-identifier-and-send-analytics-pings"></a>

サイト運営者オリジンから配信される非 AMP ページに対してアナリティクスを構成することから始めましょう。Google アナリティクスや Adobe Analytics などのアナリティクスパッケージを使用したり、カスタム実装を記述したりなど、さまざまな方法で構成することができます。

ベンダーが提供するアナリティクスパッケージを使用する場合、そのパッケージの構成コードと API で、cookie のセットアップと ping の送信の両方が行われる可能性があります。その場合は、以下の手順に目を通し、それらが目的のアナリティクスアプローチに沿ったものかを確認してください。ただし、このタスクを完成するために変更する必要はありません。

このタスクの残りでは、独自のアナリティクスをセットアップしようとしている場合のガイダンスを提供しています。

##### ファーストパーティ cookie を使って ID をセットアップする <a name="set-up-an-identifier-using-first-party-cookies"></a>

サイト運営者オリジンから配信されている非 AMP ページがある場合、これらのページで使用する永続的な安定した ID をセットアップします。これは通常、[ファーストパーティ cookie で実装されます](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking)。

この例の目的により、ユーザーの初回訪問時に作成される `uid`（ユーザー ID）という cookie を設定したとしましょう。ユーザーの初回訪問でない場合は、過去に起きた初回訪問時に設定された値を読み取ります。

つまり、サイト運営者オリジンにある非 AMP ページの状態 T には 2 つのケースがあるということです。

**ケース 1: 初回訪問。** 非 AMP ページに初めてアクセスしたときには、cookie は存在しません。それより前に設定された cookie を確認しても、`uid` に対応する cookie に設定された値は見つかりません。

[sourcecode:bash]

> document.cookie
> ""
> [/sourcecode]

初回読み込み時のある時点で cookie を設定する必要があるため、ページが読み込まれた後に確認すると、値が設定されていることがわかります。

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

**ケース 2: 2 回目以降の訪問。** cookie が設定されているはずです。したがって、そのページで開発者コンソールを開くと、次の項目を確認できます。

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

##### アナリティクス ping を送信する <a name="send-analytics-pings"></a>

ID をセットアップしたら、アナリティクス ping に統合して、ページビューの追跡を開始することができます。

具体的な実装は、希望する構成によって異なりますが、一般的には、アナリティクスサーバーに ping（リクエスト）を送信することになるでしょう。ping には、リクエスト自体の URL 内に有益なデータが含まれます。次にその例を示しますが、リクエスト内に cookie 値を含める方法も示しています。

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier
[/sourcecode]

上記の例では、ユーザーの ID は特定のクエリパラメータ `user_id` によって示されています。

[sourcecode:text]
user_id=$publisher_origin_identifier
[/sourcecode]

ここでの “`user_id`” の使用方法は、使用するアナリティクスサーバーが処理するものによって決定し、cookie と呼んでいる、ID をローカルに保存するものに特に紐づけられてはいません。

<a id="task2"></a>

### タスク 2: AMP ページについては、ID をセットアップし、amp-analytics ping にクライアント ID の置換を含めてアナリティクス ping を送信する<a name="task-2-for-amp-pages-set-up-an-identifier-and-send-analytics-pings-by-including-client-id-replacement-in-amp-analytics-pings"></a>

AMP ページに移り、アナリティクス向けの ID を確立して送信する方法を確認してみましょう。これは、AMP ページが配信されるコンテキストは関係ないため、サイト運営者オリジンの AMP ページ、AMP キャッシュから配信される AMP ページ、または AMP ビューアに表示される AMP ページに適用されます。

クライアント ID を必要とする機能を使用することで、AMP は「内部的に」クライアント ID 値を生成して保存し、それを必要とする機能に提供します。AMP のクライアント ID を使用できる主な機能の 1 つに、このアナリティクス使用事例の例を実装するために必要な [amp-analytics](https://amp.dev/documentation/components/amp-analytics) があります。

AMP ページで、クライアント ID を含む amp-analytics ping を構築します。

<table>
  <tr>
    <td width="40%"><strong>amp-analytics 構成例:</strong></td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=${clientId(uid)}</code></td>
  </tr>
  <tr>
    <td><strong>ネットワークで送信される形式例:</strong></td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id</code><p><em>この場合、<code>${clientId(uid)}</code> は、AMP がその時点で生成した実際値かユーザーのブラウザがローカルに保存済みのものに基づいて返す値のいずれかに置き換えられます。</em></p>
</td>
  </tr>
</table>

クライアント ID の置換に渡されるパラメータ `${clientId(uid)` が `uid` であることに注意してください。これは、[タスク 1](#task1) で説明されたものと同じ、サイト運営者オリジンで使用されている cookie 名に一致するように意図的に選択されています。藤堂を最もシームレスに行えるようにするには、同じテクニックを適用するようにしてください。

amp-analytics の残りの実装については、amp-analytics リクエストを設定する方法、またはアナリティクスベンダーのリクエストを変更する方法の詳細について、[amp-analytics 構成](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/)のドキュメントをご覧ください。ping は、直接定義するか、他の [AMP 置換](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)を利用して追加のデータを転送できるようにさらに変更することができます。

> **お役立ち情報:**
> クライアント ID 機能に渡されるパラメータに `uid` という名前をなぜ使用したのでしょうか。`clientId(...)` 置換が取るパラメータは、スコープの定義に使用されます。実際のところ、クライアント ID 機能は多数の使用事例で使用できる機能であるため、結果的に多数のクライアント ID を生成することになります。これらの使用事例はパラメータによって区別することができるため、パラメータを使用して、どの使用事例にクライアント ID を使用したいのかを指定することができます。たとえば、異なる ID を広告主のようなサードパーティに送信するには、“scope” パラメータを使用して実現することができます。

サイト運営者オリジンでは、「スコープ」を cookie と呼んでいるものと考えるのが最も簡単です。<a>タスク 2</a> でクライアント ID パラメータに <code>uid</code> の値を推奨することで、<a>タスク 1</a> で <code>uid</code> という cookie を使用する選択に合わせています。

<a id="task3"></a>

### タスク 3: サイト運営者オリジンでページのアナリティクス ping を処理する <a name="task-3-process-analytics-pings-from-pages-on-the-publisher-origin"></a>

タスク 1 と 2 で実施したセットアップにより、誰かがサイト運営者オリジンの AMP バージョン（すべてのコンテキスト）または非 AMP バージョンにアクセスする際、アナリティクス ping は同じ ID を使用します。[タスク 2](#task2) のガイダンスに従って、[タスク 1](#task1) に使用した cookie と同じ名前のクライアント ID "scope" を選択することで、AMP は同じ cookie を再利用します。

これは、次の表で説明されています。

<table>
  <tr>
    <td width="40%">
<strong>サイト運営者オリジンの非 AMP ページ</strong>から発行されるアナリティクス ping の例</td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code></td>
  </tr>
  <tr>
    <td>
<strong>サイト運営者オリジンの AMP ページ</strong>から発行されるアナリティクス ping の例</td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code><br><em>この場合も同じです！<code>uid</code> の scope 値を選択することで、<code>uid</code> cookie の基本値である <code>$publisher_origin_identifier</code> が使用されます。</em>
</td>
  </tr>
</table>

<a id="task4"></a>

### タスク 4: AMP キャッシュまたは AMP ビューアの表示コンテキストのアナリティクス ping を処理し、ID マッピングを確立する（必要な場合） <a name="task-4-process-analytics-pings-from-amp-cache-or-amp-viewer-display-contexts-and-establish-identifier-mappings-if-needed"></a>

[タスク 2](#task2) 2 でアナリティクス ping をセットアップして AMP キャッシュまたは AMP ビューア内に表示される AMP ページからデータを送信する際に、問題も作ってしまいました。上記で述べたように、AMP キャッシュと AMP ビューアのコンテキストはサイト運営者オリジンのコンテキストは異なり、そのために ID の管理方法も異なります。これらの ping を処理してユーザーの過剰計数のような問題を避けるには、できるだけ頻繁に ID を解決するための[手順](#implementation-steps)を踏む必要があります。

この手順を説明するには、まず、過剰計数の問題がどのように発生しているのかを考えてみましょう。

#### 問題を確認する <a name="reviewing-the-problem"></a>

次のフローを考察します。

1. ユーザーは、`https://google.com/amp/s/example.com/article.amp.html` などの **AMP ビューアの表示コンテキストで AMP ページ**にアクセスします。AMP ビューアはサイト運営者オリジンの `uid` cookie にアクセスできないため、ユーザーを識別するために、`$amp_client_id` のランダムな値が生成されます。
2. 同じユーザーが、**`https://example.com` というサイト運営者オリジンのページ**にアクセスします。[タスク 3](#task3) で説明した通り、このユーザーは、`$publisher_origin_identifier` で識別されます。

（1）と（2）は異なるオリジン（またはコンテキスト）で発生します。このため、共有状態は存在せず、`$amp_client_id` と `$publisher_origin_identifier` が異なってしまいます。では、どのような影響が考えられるでしょうか。（1）は 1 人のユーザーのよう見える単一のページビューセッションであり、（2）は別のユーザーから発行されたように見える別の単一のページビューセッションです。**基本的に、1 人のユーザーが `https://example.com` のコンテンツにエンゲージしているにも関わらず、ユーザーを過剰に計数し、（1）のユーザーはバウンス（単一のページ訪問）のように見えてしまいます。**

#### ソリューション戦略 <a name="solution-strategy"></a>

過剰計数の問題を解決するには、次の戦略を採用する必要がありますが、その効力は、サードパーティ cookie の読み取りまたは書き込みが許可されているかによって異なります。

- **ID の即時調整: サイト運営者オリジンの cookie にアクセスまたはそれを変更できる場合**は、サイト運営者オリジンの ID を使用または作成して、アナリティクスリスクエスト内の ID を無視するようにします。こうすれば、2 つのコンテキストでアクティビティをうまくリンクすることができるようになります。
- **ID の遅延調整: サイト運営者オリジンの ID（cookie）にアクセスまたはそれを変更できない場合**は、アナリティクスリクエスト自体に含まれる AMP クライアント ID にフォールバックします。（サードパーティ cookie のブロックにより）いずれにしても使用できない新しいサイト運営者オリジンの ID（cookie）を使用する代わりに、この ID を「**エイリアス**」として使用し、そのエイリアスを**マッピングテーブル**に追加します。2 つのコンテキストで直ちにアクティビティをうまくリンクできるようになりますが、マッピングテーブルを使用することで、将来的に同じユーザーが訪問したときに、AMP クライアント ID の値とサイト運営者オリジンの ID をリンクできる可能性があります。これが起きた場合、アクティビティをリンクするために必要な情報を得て、異なるコンテキストのページアクセスが同じユーザーによって行われたものであるように調整することができます。タスク 5 では、ユーザーがあるページからすぐに別のページに移動した場合の特定のシナリオで、完全なソリューションを投入する方法を説明しています。

#### 実装手順 <a name="implementation-steps"></a>

サーバーで、既存のサイト運営者オリジンの ID を確認します。

アナリティクスリクエストの一環として送信された cookie を読み取ります。この例では、example.com の `uid` cookie を確認します。

- `uid` の値が正しく読み取れる場合、それを使ってアナリティクスデータ（**アナリティクスレコード ID**）を記録します。[タスク 1](#task1) により、この ID の値は `$publisher_origin_identifier` であることがわかっています。アナリティクスレコード ID が確立されているため、「[データストレージ](#data-storage)」セクションに進みます。
- `uid` の値を読み取れない場合、マッピングテーブルを使用する、次の手順に進みます。

##### マッピングテーブル <a name="mapping-table"></a>

マッピングテーブルは、次のようにして、アナリティクス ping に見られる AMP クライアント ID の値をサイト運営者オリジンの ID に関連付けます。

<table>
  <tr>
    <th width="50%"><strong>サイト運営者オリジンのユーザー ID</strong></th>
    <th width="50%"><strong>サイト運営者オリジンにはない AMP ページのユーザー ID（「エイリアス」）</strong></th>
  </tr>
  <tr>
    <td>サイト運営者オリジンの ID であるか、サイト運営者オリジンの ID にアクセスできない場合に見込みの値として生成される ID</td>
    <td>AMP クライアント ID</td>
  </tr>
</table>

サイト運営者オリジンの ID の読み取りがうまくいかないと判断したらすぐに、アナリティクス ping に含まれる AMP クライアント ID がマッピングで既に使用されているかどうかを確認します。これを行うには、まず、amp-analytics 受信リクエストを確認し、クライアント ID の値を取得します。たとえば、次のリクエストがあるとします。

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id
[/sourcecode]

AMP クライアント ID に対応する太字の部分を抽出します（`$amp_client_id`）。

次に、マッピングテーブルを調べて、「エイリアス」の列に同じ値がないか探します。

<table>
  <tr>
    <th width="50%"><strong>サイト運営者オリジンのユーザー ID</strong></th>
    <th width="50%"><strong>サイト運営者オリジンにはない AMP ページのユーザー ID（「エイリアス」）</strong></th>
  </tr>
  <tr>
    <td><code>$existing_publisher_origin_identifier</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

上記の例では、すでに存在するレコードが見つかります。AMP クライアント ID とペアになっている値がアナリティクスレコード ID です。ここでは、`$existing_publisher_origin_identifier` です。アナリティクスレコード ID が確立したら、「[データストレージ](#data-storage)」セクションに進みます。

AMP クライアント ID がマッピングに見つからない場合は、マッピングを作成する必要があります。

1. **見込みのサイト運営者オリジン ID** を生成します。以降ではこれを `$prospective_identifier` と呼ぶことにします。この値は、上記の[タスク 1](#task1) で説明されたとおり、サイト運営者オリジンの値のセットアップに従って作成する必要があります。
2. 次に、見込みのサイト運営者オリジン ID をサイト運営者オリジンの cookie として[設定](https://en.wikipedia.org/wiki/HTTP_cookie#Setting_a_cookie)します。サードパーティ cookie の書き込みが可能であれば、設定できますが、書き込みできなければ設定できません。
3. {見込みのサイト運営者オリジン ID, AMP クライアント ID} のペアを保存します。

作成したマッピングは、次のようになります。

<table>
  <tr>
    <th><strong>サイト運営者オリジンのユーザー ID</strong></th>
    <th><strong>サイト運営者オリジンにはない AMP ページのユーザー ID（「エイリアス」）</strong></th>
  </tr>
  <tr>
    <td> <code>$prospective_identifier</code>（アナリティクス ping を受信するときにジャストインタイムで生成）</td>
    <td> <code>$amp_client_id</code>（アナリティクス ping の ID）</td>
  </tr>
</table>

見込みのサイト運営者オリジン ID をアナリティクスレコード ID として使用します。それが、サイト運営者オリジンの状態と関連付けられた値であるためです。この場合は `$prospective_identifier` で、次の「[データストレージ](#data-storage)」セクションで使用されます。

##### データストレージ <a name="data-storage"></a>

アナリティクスレコード ID を得たので、その ID をキーとするユーザー状態情報（この場合はアナリティクスデータ）を実際に保存することができます。

[sourcecode:text]
{analytics record identifier, analytics data ...}
[/sourcecode]

<a id="task5"></a>

### タスク 5: リンクとフォーム送信にクライアント ID を使用する <a name="task-5-using-client-id-in-linking-and-form-submission"></a>

一般的に、サードパーティ cookie の読み取りと書き込みが許可されていない場合、ユーザー状態の管理を完全に有効に行えない状況が発生します。タスク 1 ～ 4 で行った手順には、（1）サードパーティ cookie の読み取りと書き込みが許可されている場合に、完全に有効なソリューションを提供し、（2）ブラウザの cookie 設定により即時調整が不可能である場合に、最終的な機会を利用してクロスコンテキスト ID を調整できるようにシステムをセットアップするという 2 つの効果がありました。

このタスクでは、ユーザーが**リンクまたはフォーム送信によって**あるページから別のページにコンテキストをまたがって移動する場合に役立つ追加の最適化方法を説明します。このような状況において、以下に説明する実装を行うと、コンテキスト間でユーザー状態を管理するための完全に有効なスキームをセットアップすることができます。

<amp-img alt="Links can be used to pass the identifier information of one context into another (linked) context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png" width="866" height="784">
  <noscript><img alt="リンクを使用して、あるコンテキストの識別子情報を別の（リンクされた）コンテキストに渡すことができます" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png"></noscript></amp-img>

##### 置換機能を使用する <a name="using-substitution-features"></a>

このアプローチでは、2 種類の [AMP 変数置換](https://github.com/ampproject/amphtml/blob/master/spec/./amp-var-substitutions.md)を利用します。

**発信リンクを更新して、クライアント ID 置換を使用する:** 新しいクエリパラメータ `ref_id`（「リファラー ID」）を定義します。これは URL 内に表示され、ユーザーの**発信元コンテキストの ID** を示します。このクエリパラメータを AMP のクライアント ID 置換の値と同等になるように設定します。

[sourcecode:html]
<a
href="https://example.com/step2.html?ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**クライアント ID を発信リンクに渡すための代替ソリューション:** 新しいクエリパラメータ `ref_id` をデータ属性 `data-amp-addparams` の一環として定義し、パラメータ置換を必要とするクエリについては、それらの詳細を `data-amp-replace` の一環として指定します。このアプローチでは、URL がすっきりし、`data-amp-addparams` に指定されたパラメータが動的に追加されるようになります。

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

`data-amp-addparams` を通じて複数のクエリパラメータを渡す場合、次のように `&` で区切られます。

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)&pageid=p123"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**フォーム入力を更新してクライアント ID 置換を使用する: **`orig_user_id` のように、入力フィールドの名前を定義します。フォームフィールドの `default-value` が AMP のクライアント ID 置換の値になるように指定します。

[sourcecode:html]
<input
  name="ref_id"
  type="hidden"
  value="CLIENT_ID(uid)"
  data-amp-replace="CLIENT_ID"
/>
[/sourcecode]

これらの手順を行うと、リンククリックやフォーム送信後にユーザーがたどり着くページ（**リンク先コンテキスト**）のターゲットサーバーや URL パラメータとして、クライアント ID が利用できるようになります。上記の実装で定義したように、名前（または「キー」）は `ref_id` で、クライアント ID と同じ関連付けられた値が指定されます。たとえば、上記で定義したリンク（`<a>` タグ）をたどると、ユーザーは次の URL に移動します。

[sourcecode:http] https://example.com/step2.html?ref_id=$amp_client_id [/sourcecode]

<amp-img alt="Example of how an identifier in an AMP viewer context can be passed via link into a publisher origin context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png" width="1038" height="890">
  <noscript><img alt="AMPビューアコンテキストの識別子をリンク経由でパブリッシャーオリジンコンテキストに渡す方法の例" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png"></noscript></amp-img>

ユーザーが、URL パラメータとしてまたはヘッダー内に `ref_id` 値を含むページにアクセスすると、ページ自体が公開する ID（cookie 値）とともに `ref_id` ID を同時処理することができます。両方をアナリティクス ping に含めることで、アナリティクスサーバーは両方の値を同時に操作し、それらが関連していることを理解した上で、バックエンドにこの関係を反映させます。次の手順では、このやり方を説明します。

##### URL クエリパラメータを抽出する <a name="extracting-url-query-parameters"></a>

置換機能を使用することで、ユーザーがナビゲーションを完了したときに読み取られる情報、特にクライアント ID を、ターゲットサーバーや URL パラメータとして公開するリンクナビゲーションフローまたはフォーム送信フローをセットアップしました。

フォームの POST 送信経由などで、情報がサーバーにのみ公開される場合は、情報を処理し、結果ページを表示することができます。そのようなデータを処理する際は、以下に説明する[パラメータの検証](#parameter-validation)に関する手順に注意してください。

情報が URL 経由で利用でき、それを処理する場合は、次のアプローチをとることができます。

- リダイレクト中に処理する（サーバー側処理）
- ランディングページで処理する（クライアント側処理）

**リダイレクト中に処理する（サーバー側処理）**

リダイレクト中に処理するには、サーバーでリクエストを処理し、関連するパラメータを抽出します。以下に説明する[パラメータの検証](#parameter-validation)に関する手順に注意してください。データを、ほかの関連する ID を含む cookie 値とともに処理してから、パラメータを含まない URL にリダイレクトします。

**ランディングページで処理する（クライアント側処理）**

ランディングページで処理するには、そのページが AMP ページであるか非 AMP ページであるかによって、アプローチが異なります。

<amp-img alt="Example of how to construct an analytics ping that contains an identifier from the previous context provided via URL and an identifier from the current context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png" width="1326" height="828">
  <noscript><img alt="URLを介して提供された以前のコンテキストからの識別子と現在のコンテキストからの識別子を含む分析pingを構築する方法の例" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png"></noscript></amp-img>

これらの手順を行うと、リンククリックやフォーム送信後にユーザーがたどり着くページ（<strong>リンク先コンテキスト</strong>）のターゲットサーバーや URL パラメータとして、クライアント ID が利用できるようになります。上記の実装で定義したように、名前（または「キー」）は `ref_id` で、クライアント ID と同じ関連付けられた値が指定されます。たとえば、上記で定義したリンク（<code><a></code> タグ）をたどると、ユーザーは次の URL に移動します。

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}
[/sourcecode]

これがネットワークに送信されると、実際の値が置き換えられます。

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$referrer_page_identifier&user_id=$current_page_identifier
[/sourcecode]

上記の例に従うと、次のコードが得られます。

[sourcecode:text]
$referrer_page_identifier is $amp_client_id
$current_page_identifier is $publisher_origin_id
[/sourcecode]

そのため、実際の ping は次のようになります。

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$amp_client_id&user_id=$publisher_origin_id
[/sourcecode]

以下の「[パラメータの検証](#parameter-validation)」セクションで説明される手順を実行し、クエリパラメータ値の真実性を検証することをお勧めします。

_非 AMP ページへの更新:_ 同様に、サイト運営者オリジンから配信される非 AMP ページで、URL に含まれる `ref_id` 値を抽出して送信します。以下の「[パラメータの検証](#parameter-validation)」セクションに説明される手順に従って、その値の真実性を検証します。その後で、`ref_id` から取得した `orig_user_id` とファーストパーティ cookie ID の値に基づく `user_id` の両方を含むアナリティクス ping を構築します。

<blockquote>
<p><strong>重要:</strong></p>
<p>パラメータをクライアント側のランディングページで処理する場合、ランディングページは ID がキャプチャされた時点で URL から ID 情報を削除する必要があります。</p>
<p>パラメータを削除する前に、それらを実行する必要のあるほかのコードが次のいずれかに該当するようにしてください。</p>
<ul>
  <li>削除が発生する前に実行していること。</li>
  <li>パラメータを読み取って取り除いたコードがデータを保存した場所にアクセスできること。</li>
</ul>
<p>非 AMP ページでこれを実現するには、次の JavaScript を含めます。これは、URL からすべてのクエリパラメータを削除する JavaScript です。</p>
<pre>var href = location.href.replace(/\?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');<br>history.replaceState(null, null, href);</pre>
<p>削除するクエリパラメータを減らすように、必要に応じてこれを変更してください。</p>
</blockquote>

##### アナリティクス ping で複数の ID を処理する <a name="processing-multiple-identifiers-in-an-analytics-ping"></a>

1 つの ID 値のみを含むようにアナリティクス ping を構成した[タスク 4](#task4)とは異なり、タスク 5 でこれまで実施した手順によって、`orig_user_id` と `user_id` の 2 つの ID 値を得ることができました。次は、アナリティクス受信 ping の一部であるこれら 2 つの ID を処理する方法を説明します。

先に進む前に、以下の「[パラメータの検証](#parameter-validation)」セクションに説明される手順に注意し、`orig_user_id` と `user_id` が示す両方の値を信頼できることを確認してください。

対応するいずれかの値がマッピングテーブルに存在するかどうかを確認します。上記の例では、最初のページビューは、サイト運営者オリジンにない AMP ページで発生し、その後 2 つ目のページビューがサイト運営者オリジンで発生します。その結果、アナリティクス ping のクエリパラメータの値は次のようになります。

**ケース 1: アナリティクス ping がサイト運営者オリジンのページから送信された場合の ID**

<table>
  <tr>
    <th width="20%"></th>
    <th width="40%"><strong>サイト運営者オリジンのユーザー ID</strong></th>
    <th width="40%"><strong>サイト運営者オリジンにはない AMP ページのユーザー ID（「エイリアス」）</strong></th>
  </tr>
  <tr>
    <td><strong>アナリティクス ping での表現</strong></td>
    <td><code>user_id=$publisher_origin_id</code></td>
    <td><code>orig_user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>パラメータのキー</strong></td>
    <td><code>user_id</code></td>
    <td><code>orig_user_id</code></td>
  </tr>
  <tr>
    <td><strong>パラメータの値</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

上記のサンプルフローの構造に従って、最初のページビューで得た ID は右端の列に対応し、2 つ目のページビューで得た ID は中央の列にあることに注意してください。

ユーザーがサイト運営者オリジンのページから始めて、その後にサイト運営者オリジンにない AMP ページに移動する場合、パラメータのキーは保持されますが、それに対応する、値の参照方法は維持されません（`$amp_client_id` は必ずサイト運営者オリジンにない AMP ページに保 z ンされた ID を参照します）。

**ケース #2: アナリティクス ping がサイト運営者オリジンにない AMP ページから送信された場合の ID**

<table>
  <tr>
    <th width="20%"> </th>
    <th width="40%"><strong>サイト運営者オリジンのユーザー ID</strong></th>
    <th width="40%"><strong>サイト運営者オリジンにはない AMP ページのユーザー ID（「エイリアス」）</strong></th>
  </tr>
  <tr>
    <td><strong>アナリティクス ping での表現</strong></td>
    <td><code>orig_user_id=$publisher_origin_id</code></td>
    <td><code>user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>パラメータのキー</strong></td>
    <td><code>orig_user_id</code></td>
    <td><code>user_id</code></td>
  </tr>
  <tr>
    <td><strong>パラメータの値</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

マッピングテーブルを検索する際は、どの状況に該当するかを確認し、値が表示されると思われるマッピングテーブルの列で値を検索します。たとえば、アナリティクス ping がサイト運営者オリジンのページから送信されている場合（ケース 1）、マッピングテーブルの「サイト運営者オリジンのユーザー ID」列にある `user_id` キーの値を確認し、「サイト運営者オリジンにない AMP ページのユーザー ID（エイリアス）」の `orig_user_id` キーの値を確認します。

マッピングテーブルでいずれの ID 値の使用も確認できない場合は、新しいマッピングを作成します。

- アナリティクスリクエストがサイト運営者オリジンのページから発信されている場合は、`uid` に対応する値をアナリティクスレコード ID に選択し、`orig_uid` の値を「エイリアス」に選択する必要があります。
- アナリティクスリクエストがサイト運営者オリジンのページから発信されていない場合は、マッピングテーブルに `uid` に対応する値を「エイリアス」の値に選択し、[タスク 4](#task4) の残りの手順に従って見込みのサイト運営者オリジン ID を作成し、その値をオリジンの cookie に設定します。

##### パラメータの検証 <a name="parameter-validation"></a>

URL に含まれる値は、悪意を以て変更されたり、不正な形式であったり、何らかの理由でそこに期待される値でなかったりすることがあります。これはクロスサイトリクエストフォージェリと呼ばれることがあり、アナリティクスサーバーが受信するアナリティクス ping が期待されるページから送信されていることを確認することも重要ですが、URL の一部であった値で「転送」する場合は、リファラーを検証してそれらの値を信頼できることを確認してください。

たとえば、上記の手順では、ユーザーがクリックして対応するページに移動させることを目的に、次の URL を作成しました。

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$amp_client_id
[/sourcecode]

ただし、ユーザーまたは攻撃者がこの URL を次のように変更してしまうことも考えられます。

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$malicious_value
[/sourcecode]

そのため、`$amp_client_id` のインスタンスのみを処理し、`$malicious_value` の値を回避する必要があります。

**URL クエリパラメータ経由で受信した値を検証するための推奨手順:** ランディングページのリファラーが期待される URL に一致することを確認します。通常、有効な CORS リクエストに過去に含まれているのを見たことがある ID です。そういった既知の ID のみを受け入れることをお勧めします。

非 AMP ページでは、クライアント側で直接 `document.referrer` を確認するか、サーバー側で検証できるように、アナリティクス ping の一部として値を渡します。リファラーの値が信頼できるものである場合は、上記の例では `orig_user_id` に当たる、ランディングページの URL から送信された値を受け入れて処理します。

AMP ページでは、[ドキュメントリファラー](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#document-referrer)置換変数を使用して、リファラーの値をアナリティクス ping の一環として渡します。唯一利用できるオプションはサーバー側処理です。これを説明する次の URL には、ランディングページが送信できるアナリティクス ping には、（1）現在のページのクライアント ID 値、（2）参照先ページでクライアント ID となるようにセットアップした URL 経由で渡される値、（3）（2）の値を検証するためのリファラー情報そのものが含まれます。 `https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}&referrer=${documentReferrer}`

リファラーを信頼できない場合は、URL パラメータ経由で提供される値を拒否して使用しないようにしてください。

## 強く推奨される実践 <a name="strongly-recommended-practices"></a>

### 1 つの関連のみを維持すること <a name="keep-just-one-association"></a>

**2 つのコンテキストから得る ID の関連付けは 1 つのみ維持しましょう。** 過去に cookie やその他のユーザー ID と関連付けたことのある AMP クライアント ID が新しい cookie やユーザー ID と並んでいる場合、過去の cookie とユーザー ID に維持している状態をすべて削除する必要があります。

このようにすることで、ユーザーのプライバシーの期待に応えることができるようになります。前のセクションで説明した通り、AMP でのユーザー状態の管理には、AMP コンテンツが表示されるさまざまなコンテキストにまたがる異なる ID の保存や関連付けが伴うことが多くあります。**この状況を悪用して、たとえば、ユーザーがサイトの cookie を削除した後など、ユーザーが期待しないかユーザーに明確に開示されることなく、データの再構築や追跡の実行を行ってはいけません。**

### cookie とロカールストレージの削除を尊重すること <a name="respect-cookie-and-local-storage-deletions"></a>

**すべての cookie とローカルストレージを削除する機能を作成するコントロールを含む、ユーザーが利用できるすべての適用可能なプライバシーコントロールを尊重する必要があります。**ユーザーが ID リレーションの片側を明示的に削除した後に、AMP クライアント ID または AMP インフラストラクチャを[削除された ID を再構築するために使用](https://en.wikipedia.org/wiki/Zombie_cookie)してはいけません。

### 現地の法規制に準じること <a name="comply-with-local-laws-and-regulations"></a>

**2 つ以上のドメインから発行される cookie や ID を関連付ける場合、一部の司法管轄では、プライバシーポリシーの更新、ユーザー開示の追加提供、エンドユーザーの同意の取得などが必要となる場合があります。**安定した ID を提供するために永続ストレージとして cookie やローカルストレージを使用する AMP クライアント ID の使用は、各サイト運営者が、データの収集、保管、処理、およびユーザー通知に関するすべての適用法や規制に照らし合わせて分析する必要があります。

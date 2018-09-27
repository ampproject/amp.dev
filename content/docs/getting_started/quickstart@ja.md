---
$title: クイックスタート
---

[TOC]

{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

このガイドでは、AMP を今すぐ使い始めるのに役立つ主な関連資料をご紹介します。さらに詳しい情報については、[AMP のドキュメント](/ja/docs/)または AMP プロジェクトの [YouTube チャンネル](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw)をご確認ください。

<hr>

## AMP スタートガイド

AMP の使用を開始する主な手順は次のとおりです。

1. [AMP ページを作成する](#create-your-amp-pages)
2. [AMP ページを検証する](#validate-and-test-amp-pages)
3. [コンテンツが検出されるようにする](#make-your-content-discoverable)

## 日常的に AMP を使用する

AMP が提供するすべてのリソースを駆使して、日常的に AMP を使用します。

<a class="button" href="#amp-day-to-day-resources"> リソースを確認する</a>

<hr>

### AMP ページを作成する

[CMS の使用方法](#using-a-cms?)、[ゼロから始める方法](#starting-from-scratch?)、[既存のコンテンツを変換する方法](#converting-existing-content?)に関する以下のセクションをご確認ください。

#### CMS を使用する

AMP は、サードパーティが提供するさまざまなパブリッシング プラットフォームとの統合に対応しています。お使いのパブリッシング プラットフォームで AMP ページを作成する方法については、各プラットフォームのドキュメントをご確認ください。

<div>
  {% for section in who.tech_companies.sections %}
    {% if section.title == 'CMS' %}
      <ul>
        {% for item in section.section_items %}
          <li class="item">
            {% if item.link %}
              <a href="{{item.link}}">{{item.title}}</a>
            {% else %}
              {{item.title}}
            {% endif %}
          </li>
        {% endfor %}
        </ul>
    {% endif %}
  {% endfor %}
</div>

#### ゼロから始める

AMP ページや AMP 広告をゼロから作成する場合は、次の関連資料をご確認ください。

*   [チュートリアル: 初めての AMP ページを作成する](/ja/docs/getting_started/create.html)
*   [チュートリアル: 高度な AMP 機能を追加する]({{g.doc('/content/docs/fundamentals/add_advanced.md', locale=doc.locale).url.path}})
*   [AMP HTML の仕様](/ja/docs/fundamentals/spec.html#the-amp-html-format): ボイラープレート、必須のマークアップ、使用できる HTML など
*   [AMP HTML 広告のフォーマット](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md): AMP で効果的な広告を作成する方法の詳細
*   [YouTube 動画: AMP でできること、できないこと](https://youtu.be/Gv8A4CktajQ)
*   [AMP Start のテンプレート](https://www.ampstart.com/): すぐに使える既製の AMP ページ テンプレート

#### 既存のコンテンツを変換する

既存の HTML ページを AMP HTML に変換する場合は、次の関連資料をご確認ください。

*   [チュートリアル: HTML を AMP に変換する]({{g.doc('/content/docs/fundamentals/converting.md', locale=doc.locale).url.path}})
*   [YouTube 動画: 既存のサイトで AMP HTML を使用する](https://youtu.be/OO9oKhs80aI)

### AMP ページを検証、テストする

コンテンツを公開する前に、AMP ページが有効かどうかを確認する必要があります。次の関連資料をご確認ください。

*   [AMP ページを検証する]({{g.doc('/content/docs/fundamentals/validate.md', locale=doc.locale).url.path}}): 検証ツールの一覧とページを検証する手順
*   [YouTube 動画: AMP ページを検証、デバッグする方法](https://www.youtube.com/watch?v=npum8JsITQE&t=13s)
*   [AMP の CORS をテストする](/ja/docs/fundamentals/amp-cors-requests.html#testing-cors-in-amp)

### コンテンツが検出されるようにする

ユーザーが Twitter や Google、Bing などのサードパーティ プラットフォーム上でコンテンツを検出できるようにします。次の関連資料をご確認ください。

*   [ページが検出されるようにする]({{g.doc('/content/docs/fundamentals/discovery.md', locale=doc.locale).url.path}}): AMP ページをリンクする方法、メタデータを使用する方法のヒント
*   [Google 検索での AMP ページに関するガイドライン](https://support.google.com/webmasters/answer/6340290)

<hr>

## 日常的に AMP を使用するための関連資料

日常的に AMP を使用する際には、次の関連資料をご確認ください。

*   [AMP コンポーネントの一覧](/ja/docs/reference/components.html): 各コンポーネントのリファレンス ページには、AMP ページにコンポーネントを組み込み、使用する方法の詳細がまとめられています。
*   例とデモ: AMP コンポーネントの具体的な使用例がまとめられ、実際に試すことのできる [AMP By Example](https://ampbyexample.com/) をご覧ください。
*   ヒントが必要な場合は次の関連資料をご確認ください。
    *   [AMP Start](https://www.ampstart.com/): あらかじめスタイルが設定されたテンプレートとコンポーネントを使用して、デザインされた AMP サイトをゼロから構築できます。
    *   AMP プロジェクトの[ショーケース](/ja/learn/showcases/): 一般に公開されている優れた AMP ページをご紹介します。
*   サポートが必要な場合は、[サポートのご案内](/ja/support/developer/get_support.html)のリソースをご利用ください。
*   AMP の最新ニュースは、次の方法で入手できます。
    *   [AMP プロジェクトのブログ](https://amphtml.wordpress.com/)に登録する
    *   [YouTube の AMP Channel](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw) に登録する
    *   AMP プロジェクトの Twitter アカウント [@AMPhtml](https://twitter.com/amphtml) をフォローする


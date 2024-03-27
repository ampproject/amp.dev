---
'$title': 初めての AMP メールを作成する
$order: 0
description: 最初のメールを作成して、AMP メールでは何が異なるのかを学習します。
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

AMP for Email では、メール送信者はメールのメッセージに新機能一式をサポートする AMP を使用することができます。AMP で記述されたメールには、画像カルーセルやアコーディオンなどのインタラクティブな要素を含めることができ、メッセージのコンテンツを最新状態に維持しながら、受信トレイから移動することなくフォームに返信するといったアクションを受信者に提供することができます。

AMP for Email には既存のメールとの互換性があります。AMP バージョンのメッセージは、HTML やプレーンテキストのほか、新しい MIME パートとしてメールに埋め込まれるため、すべてのメールクライアントでの互換性を確保することができます。

ヒント: AMP for Email をサポートするメールプラットフォーム（ESP）、クライアント、およびプロバイダのリストについては、よくある質問の「[対応メールプラットフォーム](../../../support/faq/email-support.md)」を参照してください。

このチュートリアルでは、AMP を使用した初めての動的なメールの構築と送信を説明します。完成したコードは[こちら](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73)でご覧いただけます。

# AMP メールボイラープレートから始める

AMP Playground では、AMP for Email 形式がサポートされているため、AMP メールの開発、テスト、および検証を実施することができます。[AMP Playground](https://playground.amp.dev/?runtime=amp4email) を開き、左上で形式が `AMP for Email` に設定されていることを確認してください。以下のコードが表示されます。

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://ampjs.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

上記には、有効な AMP メールを形成するために必要なすべてのマークアップと最小限のコードが含まれます。また、右上のドロップダウンメニューにあるドロップダウンリストには、有効なメールテンプレートの例が豊富に含まれています。

では、従来の HTML メールとは大きく異なる点について見てみましょう。

- AMP メールは、html タグに `⚡4email` または `amp4email` を含めることで、AMP メールであることを示す必要があります。
- `<head>` タグにも、AMP ランタイムを読み込む `<script>` タグを含める必要があります。`<script async src="https://ampjs.org/v0.js"></script>`
- 最初に AMP が読み込まれるまでコンテンツを非表示にする CSS ボイラープレート。` <style amp4email-boilerplate>body{visibility:hidden}</style>`

メールの作業を行ったことがある方は、メールにスクリプトを配置するという考えに対して抵抗があるかもしれません！ご安心ください。AMP メールをサポートするメールプロバイダは厳格なセキュリティチェックを実施しており、検証済みの AMP スクリプトのみをクライアントで実行できるようにしています。このため、セキュリティの脆弱性を生じることなく、動的でインタラクティブな機能を受信者の受信トレイで直接実行することができるのです！AMP メールに必要なマークアップの詳細について読み進めてください。

[tip type="important"] [サポートされているコンポーネント](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md)の AMP スクリプトのみを AMP メールに含めることができます。 [/tip]

# 画像を含める

AMP メールには、メールに使用されるほとんどの HTML タグを使用できますが、`<img>` などの一部のタグは [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md) のように AMP の相当するタグに置き換えられます。

`<amp-img>` タグには、画像の幅と高さが定義されている必要があり、`<img>` とは異なって `<amp-img>` は、`</amp-img>` で明示的に閉じられる必要があります。

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

また、GIF ファイルは [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md) を通じてサポートされています。

メールは自分のサーバーにホストされないため、AMP メール内の URL は絶対パスであり、HTTPS である必要があります。

[Placekitten](https://placekitten.com/) は、子猫の画像をプレースホルダとして使用するウェブサイトで、画像のサイズを URL で直接指定することができます！

初めてのメールに以下のコードを追加して画像を含めてみましょう。

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## レスポンシブ対応にする

メールはさまざまなデバイスと画面サイズで閲覧されますが、AMP にはビルトインのレイアウトシステムが備わっています！[`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) システムとメディアクエリを使用すれば、レスポンシブメールも簡単に実装できます。配置した子猫の画像を適切な画面サイズに合わせるには、`<amp-image>` に `layout="responsive"` 属性を追加してください。

[tip type="read-on"] [AMP がレイアウトやメディアクエリとどのように連携するのかについて、お読みください](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)。 [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

ブラウザウィンドウを拡大・縮小し、画像サイズが変化するのを確認してください！[サポートされているレイアウト固有のコンポーネントのリストは、こちら](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout)を参照してください。

# 体制とレイアウトを変更する

画像が 1 つであれば良いのですが、ほかの画像も表示する場合にはどうすればよいのでしょうか。AMP for Email は、アコーディオンやサイドバーといったレイアウト要素をサポートしています。

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

このチュートリアルでは、[`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) を使用して、養子縁組用の猫の写真を表示することにします。

メールの head に `amp-carousel` スクリプトを追加します。

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

次に、最初の画像を `<amp-carousel>` タグでラッピングします。

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

何も変化しませんが、それで良いのです！カルーセルには属性 `type=slides` が指定されているため、1 回あたり 1 枚の写真が表示されるようになっています。タグには写真を 1 枚しか配置していないため、スライダー矢印が表示されていないのです。

次に、`<amp-carousel>` 内で、子猫の画像を養子縁組用の AMP 猫に置き換えます。

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

これで、カルーセルの左右にあるナビゲーション用の矢印をクリックすると、写真を変更できるようになりました！

## スタイル付きで送信する

AMP では、ドキュメントの head に配置される `<style amp-custom>` タグ内でスタイルを指定することができます。また、以前に禁止された CSS クラスと疑似クラスも使用できるようになりました。[こちらでリスト全文をご覧ください](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style)。

`Hello, AMP4EMAIL world` を実際のタイトルに更新しましょう。

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

次に、head にスタイルを追加します。

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# 動的な機能を追加する

従来的に、メールは静的なコンテンツのみを使用できるものですが、AMP を使用すると、メールに新たな可能性の世界を取り入れることができます！ユーザーは、[フォーム](/content/amp-dev/documentation/components/reference/amp-form.md)の送信、[リストコンテンツの動的な更新](/content/amp-dev/documentation/components/reference/amp-list.md)、コンテンツの操作を体験することができます。

このチュートリアルでは、[`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) を使用して、ユーザーが養子縁組の猫のスライドを使用する際に、その猫の名前と説明を表示します。メールの head に `amp-bind` スクリプトを含めることから始めましょう。

```html
<script
  async
  custom-element="amp-bind"
  src="https://ampjs.org/v0/amp-bind-0.1.js"
></script>
```

次に、AMP バインド変数 "myState" を JSON 文字列として、[`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state) タグ内に宣言します。猫の写真は 4 枚あるため、4 つすべての状態を含めることにします。

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[AMP のアクションとイベント](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md)によって、異なる状態がトリガされます。この場合、ユーザーがカルーセルのナビゲーション矢印をクリックする際に状態を更新します。amp-carousel は [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides) イベントを発行し、それに応じて、`AMP.setState` を使って `currentCat` 変数を更新します。

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

このコードは、カルーセルのインデックスに一致するように `currentCat` の状態を設定します。そのため、スライド `event.index=2` を表示している場合、状態は配列のインデックス 2 にある項目にマッピングされます。

後は、猫の名前と説明を表示するだけです。`amp-carousel` の終了タグの下に、以下のコードを追加します。

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

`amp-bind` 拡張機能は、[式](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions)と[バインド](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings)を使用して、コンテンツを動的に変化させます。上記のコンテンツでは、`[text]` バインドを使用して、状態が変わるたびに `"myState.cats[currentCat].name"` 式を評価することで、`<span>` タグ内のテキストを更新しています。

[tip type="note"] パフォーマンスのため、また予期しないコンテンツのジャンプのリスクを回避するため、amp-bind は式の評価をページ読み込み時には行いません。つまり、視覚的な要素にはデフォルトの状態が指定されている必要があり、初回レンダリング時には amp-bind に依存していないことになります [/tip]

`</div>` タグの後に、忘れずに猫の説明を追加しましょう！

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

これで、カルーセルに表示される猫の写真を変更すると、名前と説明も更新されるはずです！

# AMP メールを送信する

受信トレイにメールを送信する方法を学習するには、[AMP メールのテストについてお読みください](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)。

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

お疲れさまでした！初めての AMP メールを送信することができました！

次のステップでは、[AMP for Email の基礎についてさらにお読みください](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md)。

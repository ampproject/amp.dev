---
'$title': AMP for Email 対応コンポーネント
$order: 3
formats:
  - email
teaser:
  text: 以下は、現在 AMP メールメッセージでサポートされている AMP コンポーネントのリストです。コンポーネントは次のカテゴリに分類されています。
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-components.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

以下は、現在 AMP メールメッセージでサポートされている AMP コンポーネントのリストです。コンポーネントは次のカテゴリに分類されています。

- [動的コンテンツ ](#dynamic-content)
- [レイアウト ](#layout)
- [レイアウト ](#media)

## 動的コンテンツ <a name="dynamic-content"></a>

| 要素                                                                                                                                                                               | 説明                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                                  | フォーム要素。action-xhr 属性は通常のアクション属性の代わりに使用する必要があります。`<template type="amp-mustache">` とともに使用して、レスポンスをレンダリングすることができます。<br><br>**注意:** [送信後のリダイレクト](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission)は行えません。  |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                          | フォーム内で使用する複数選択ウィジェット。                                                                                                                                                                                                                                                                                     |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) および [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | マシンの状態を操作して要素間の対話を行えるようにする AMP のシンプルスクリプト言語。特定のイベントである動作を行うために使用することもできます。<br><br>**注意:** `[href]` または `[src]` にバインドすることはできません。また、`AMP.print`、`AMP.navigateTo`、および `AMP.goBack` アクションを使用することも禁止されています。 |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                                   | `<amp-state>` は、`amp-bind` が使用する初期状態を定義するために使用します。<br><br>**注意:** `src` 属性は、現在サポートされていません。                                                                                                                                                                                        |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                                  | [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache) がレンダリングする JSON データをリモートでフェッチします。<br><br>**注意:** `[src]` 属性にバインドすることはできません。`credentials="include"` でユーザーの資格情報を含めることも禁止されています。                                                 |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                          | `amp-list` 呼び出しの結果をレンダリングする Mustache テンプレートマークアップです。                                                                                                                                                                                                                                            |

## レイアウト <a name="layout"></a>

| 要素                                                                                                           | 説明                                                                    |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [レイアウト属性 ](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | レイアウトの動作は、レイアウト属性によって決定します。                  |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                    | さまざまなセクションの表示/非表示を簡単に行えるようにする UI 要素です。 |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                      | カルーセル UI コンポーネント。                                          |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                      | テキストを特定の領域に適合させるためのヘルパーコンポーネント。          |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                          | アスペクト比に基づくレスポンシブレイアウトを利用できるコンテナ。        |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                        | ナビゲーション目的に使用するサイドバー。                                |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                        | タイムスタンプのレンダリングを支援します。                              |

## メディア <a name="media"></a>

| 要素                                                              | 説明                                                                                              |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | `<img>` に置き換わる AMP コンポーネント。<br><br>**注意:** `[src]` へのバインドは許可されません。 |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | GIF ファイルを埋め込みます。<br><br>**注意:** `[src]` へのバインドは許可されません。              |

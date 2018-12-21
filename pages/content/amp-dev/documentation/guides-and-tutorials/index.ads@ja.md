---
$title: AMP での広告掲載の概要
---

AMP プロジェクトは、ウェブページの表示を高速化して、最適なユーザー エクスペリエンスを実現することを目指しています。AMP で広告を掲載する場合も同様に、ユーザーにとって魅力的で効果的な広告を高速かつ安全に表示することで、最善なユーザー エクスペリエンスを提供しています。では、それはどのようにして実現されているのでしょうか。

次の図に示すように、AMP ページに広告を配信する仕組みは、従来のように HTML ページに広告を配信する仕組みとそれほど変わりません。

{{ image('/static/img/docs/ads/ads_in_amp.svg', 647, 263, alt='AMP ページへの広告配信', align='' ) }}

1. まずサイト運営者が、広告を掲載する AMP ページに広告用のスロットを作成します。通常のページでは、JavaScript のスニペットを挿入しますが、AMP の場合は、特定の広告ネットワーク用の [`<amp-ad>`](/ja/docs/reference/components/amp-ad.html) タグを AMP ページに追加します。詳しくは、[広告による AMP ページの収益化に関するガイド]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}})をご覧ください。

2. ユーザーが AMP ページを読み込むと、`<amp-ad>` タグが広告ネットワークに広告リクエストを送信します。広告ネットワークは、AMP ページに広告を返すために、`amp-ad` の実装を作成します。詳しくは、[AMP への広告ネットワークの統合に関するガイド](https://github.com/ampproject/amphtml/blob/master/ads/README.md)をご覧ください。

3.  広告ネットワークが、広告主から提供された広告を配信します。広告主は、通常の HTML 形式または新しい形式の [AMP HTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}) で広告を作成できます。

## 対応する広告ネットワーク

AMP は、幅広い[広告サーバーと広告ネットワーク]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}})に対応しています。

[tip type="note"]
独自の広告技術と AMP を統合する方法については、こちらの[ガイドライン]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/integration-guide.md', locale=doc.locale).url.path}})をご覧ください。
[/tip]

## 対応する広告

AMP は、通常の広告と、より高速で安全な AMP HTML 広告の両方に対応しています。AMP ページ上の広告は、形式にかかわらず外部リソースとして扱われ、[AMP であらゆるリソースに適用される制約](/learn/about-how/)に従う必要があります。AMP における広告要件について詳しくは、[このガイド](https://github.com/ampproject/amphtml/blob/master/ads/README.md#constraints)をご確認ください。

### AMP HTML 広告で広告表示を高速化

AMP HTML 広告では、より高速、軽量かつ安全にウェブ広告を配信できます。AMP ページは通常の HTML 広告にも対応していますが、その場合、読み込みに時間がかかることがあります。その点 AMP HTML で広告を作成すると、広告自体を AMP ページの他の部分と同じくらい高速に表示できます。AMP HTML 広告は、配信前に必ず検証されるため、マルウェアが埋め込まれた広告を配信してしまうリスクを防ぐことができます。また、AMP ページだけでなくウェブ上のあらゆる場所で配信できます。

AMP HTML 広告について詳しくは、[AMP HTML 広告に関するガイド]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}})をご確認ください。


## 始める

AMP ページで広告掲載を始めるには、次のリソースをご確認ください。

* [広告で AMP ページを収益化する]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}})
* [AMP との統合でディスプレイ広告を掲載する]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/adnetwork_integration.md', locale=doc.locale).url.path}})
* [AMP HTML 広告]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}})
 

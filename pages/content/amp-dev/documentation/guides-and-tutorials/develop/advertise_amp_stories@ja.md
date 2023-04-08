---
'$title': Web ストーリーの広告
$order: 3
description: Web ストーリーは、読者にコンテンツへの没入感を与える、タップ可能な全画面表示エクスペリエンスです。AMPストーリー広告を使用した広告は、シームレスで中断のない...
formats:
  - ストーリー
author: CrystalOnScript
---

Web ストーリーは、読者にコンテンツへの没入感を与える、タップ可能な全画面表示エクスペリエンスです。Web ストーリー広告を使用した広告は、ユーザーの体験へのシームレスで中断のない統合を可能にし、プラットフォームに楽しく没頭させ続けることができます。

## 広告プレースメント

Web ストーリーは、単一の [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) コンポーネントを使って、広告の数量とプレースメントを指定します。

[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) は、[`amp-ad`](../../../documentation/components/reference/amp-ad.md) コンポーネントのラッパーで、ユーザーがストーリーのコンテンツを消費する間に 1 つ以上の広告を動的に挿入します。最高のユーザーエクスペリエンスを確保するために、以下のことが行われます。

1. 広告は、Web ストーリーランタイムによて事前にレンダリングされた上で挿入されます。そのため、空の広告や読み込み途中の広告がユーザーに表示されることがありません。

2. 広告の掲載密度は、画面が広告で飽和されないように、コンテンツの比率によって最適化されます。ユーザーが読み進める過程でいつどこに広告が挿入されるかは、[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) コンポーネントによって決定されます。

Web ストーリーは、金銭的な収益とユーザーエクスペリエンスを最適化するために、最初の 2 ページの後に最初の広告を配置することがあります。

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type="note"] **注意 –** 通常、Web ストーリーが長いほど、広告プレースメントの機会が多くなります。広告の正確なプレースメントアルゴリズムの最適化は、継続的に行われます。[/tip]

## ユーザーインタラクション

ユーザーは通常のストーリーページと同様に、画面の右 3 分の 2 をタップして広告を飛ばして閲覧し続けることができます。

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='広告をスキップできるタップ領域を示した画像', caption='ユーザーは、画面の右側 3 分の 2 をタップして、広告をスキップして進むことができる。', align='' ) }}

すべての Web ストーリー広告の下 3 分の 1 には、システムがレンダリングした[コールトゥアクション](story_ads_best_practices.md#call-to-action-button-text-enum)ボタンが表示されます。このボタンは、ユーザーを任意の URL（または関連するアプリストア）に移動させるように設定することが可能です。

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='ユーザーが広告のランディング先にリダイレクトされるが、ストーリーに戻れることを示した画像。', caption='ユーザーは広告ランディング先にリダイレクトされても、ストーリーにもどることができる。', align='' ) }}

## Web ストーリーを広告向けに構成

Web ストーリーは、ページで直接 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) を使用することができないため、代わりに、[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) コンポーネントを使って、すべての広告をフェッチして表示しています。[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) コンポーネントは [`amp-story`](../../../documentation/components/reference/amp-story.md) の直属の子要素として配置されている必要があります。

[sourcecode:html]
<amp-story>
<amp-story-auto-ads>
<script type="application/json">
{
"ad-attributes": {
// ad server configuration
}
}
</script>
</amp-story-auto-ads>
<amp-story-page>
...
</amp-story>
[/sourcecode]

Web ストーリー広告は完全にレンダリングされてからしか表示されないため、通常の [`amp-ad`](../../../documentation/components/reference/amp-ad.md) とは異なり、`<fallback>` や `<placeholder>` は必要ありません。

## ストーリー広告の基礎

Web ストーリーに広告を含めるには、サポートされているアドサーバーから配信するのが最も簡単な方法です。

以下に、現在 Web ストーリー広告をサポートしている広告プラットフォームを示します。

- Google アドマネージャー
  - [直接販売広告](https://support.google.com/admanager/answer/9038178)
  - [プログラマティック広告](https://support.google.com/admanager/answer/9416436)
- Google アドセンス（近日対応）
- Mgid
  - [直接販売広告](https://help.mgid.com/generate-revenue-with-amp-web-stories)
- その他の広告プラットフォームも統合可能（[GitHub で詳細](https://github.com/ampproject/amphtml/issues/30769)をお問い合わせください）

Web ストーリー内での広告の掲載にご興味がある広告主の方は、詳細について[お問い合わせ](mailto:story-ads-wg@google.com)ください。

サイト運営者も、独自のアドサーバーをセットアップすれば、カスタム広告を配置することができます。[そのプロセスは、こちらで説明しています](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story-ads.md#publisher-placed-ads)。

[tip type="note"] Google アドマネージャーに広告をアップロードする方法については、「[Web ストーリーでカスタムクリエイティブをトラフィックする](https://support.google.com/admanager/answer/9038178)」を参照してください。また、[AMP ストーリー広告作成のベストプラクティス](story_ads_best_practices.md)に関するガイドも確認してください。[/tip]

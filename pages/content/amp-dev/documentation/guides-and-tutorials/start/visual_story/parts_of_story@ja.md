---
$title: AMP ストーリーのパーツについて
---

AMP ストーリーは、画像、動画、グラフィックス、音声などを使ってフルスクリーンで視覚的に情報を伝えるストーリーテリングを提供します。分かりやすくビジュアルが豊富なコンテンツを求めるユーザーに最適です。

AMP ストーリーに含まれる基本的な構成要素は個々の**ページ**です。個々のページは、HTML および AMP の基本**要素**を含む個々の**レイヤ**で構成されています。

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

これらの各構成要素は AMP コンポーネントに翻訳され、ストーリーは [`amp-story`](../../../../documentation/components/reference/amp-story.md) で、ページは `amp-story-page` で、レイヤは `amp-story-grid-layer` で表されます。

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

それでは、[`amp-story`](../../../../documentation/components/reference/amp-story.md) コンテナを使用してストーリーを作成してみましょう。

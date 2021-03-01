---
'$title': Understanding the parts of an AMP story
$order: 2
description: ウェブストーリーは、画像、動画、グラフィックス、音声などを使って全画面で視覚的に情報を伝えるストーリーテリングを提供します。分かりやすく ...
author: bpaduch
---

ウェブストーリーは、画像、動画、グラフィックス、音声などを使って全画面で視覚的に情報を伝えるストーリーテリングを提供します。分かりやすく、視覚的にリッチなコンテンツを要求するユーザーに最適です。

ウェブストーリーに含まれる基本的な構成要素は個々の**ページ**です。これらのページは、HTML および AMP の基本**要素**を含む個々の**レイヤー**で構成されています。

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

これらの各構成要素は AMP コンポーネントに変換され、ストーリーは [`amp-story`](../../../../documentation/components/reference/amp-story.md) で、ページは `amp-story-page` で、レイヤーは `amp-story-grid-layer` で表されます。

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

それでは、[`amp-story`](../../../../documentation/components/reference/amp-story.md) コンテナを使用してウェブストーリーを作成してみましょう。

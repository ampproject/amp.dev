---
'$title': AMP オプティマイザの使用
$order: 2
'$hidden': 'true'
description: AMP オプティマイザはサイトの AMP キャッシュ最適化を行うツールです。優れたページエクスペリエンスを作り出し、Core Web Vitals コンプライアンスを達成するには、AMP オプティマイザの使用が鍵となります。このガイドでは、AMP オプティマイザを活用して AMP ページを最適化する方法を説明します。
formats:
  - websites
  - stories
author: sebastianbenz
---

AMP オプティマイザはサイトの AMP キャッシュ最適化を行うツールです。優れた[ページエクスペリエンス](https://developers.google.com/search/docs/guides/page-experience)を作り出し、[Core Web Vitals](https://web.dev/vitals/) コンプライアンスを達成するには、AMP オプティマイザの使用が鍵となります。AMP オプティマイザの仕組みに関する詳細は、[詳しく説明された AMP 最適化がガイド](explainer.md)を参照してください。

## AMP はすでに高速ではないのですか？

「ちょっと待って、AMP はデフォルト設定を変えずに高速なのではないですか？」と思っている方もいるかもしれません。その通りかもしれません。AMP ランタイムは高速化に最適化されているため、すべての有効な AMP ページの読み込みは高速です。ただし、ブラウザが AMP ページをさらに素早く読み込むためにサーバーに実装できるパフォーマンス最適化がほかにもあります。

当初 AMP キャッシュは AMP ページの大半を送信していました。キャッシュはさらにページの最適化を行い、強力なユーザーエクスペリエンスを保証していました。しかし、時が経つにつれ、より多くのサーフェスが AMP ページにリンクするようになり、開発者はウェブサイト全体を AMP で構築し始めました。そのため、AMP チームは、独自のオリジンで AMP キャッシュのようなパフォーマンスを得る AMP ページを配信できるように、AMP オプティマイザの制作に着手し始めたのです。

## AMP オプティマイザの統合

AMP オプティマイザを使用するには、3 つの方法があります。

1. オプティマイザのビルトイン統合を備えたサイトジェネレータまたは CMS を使用する。
2. ビルドシステムまたはサーバーに、AMP オプティマイザを統合する
3. ホスティング環境に、AMP オプティマイザを統合する

### CMS とサイトジェネレータ

最適化された AMP を公開する最も優れた方法は、AMP オプティマイザをビルトインサポートしているサイトジェネレータまたは CMS を使用する方法です。この場合、AMP ページは自動的に最適化されます。現在のところ、以下のサイトジェネレータと CMS が AMP オプティマイザを統合しています。

- [WordPress](https://wordpress.org/): [AMP WordPress Plugin](https://wordpress.org/plugins/amp/) を使用
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/): [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/) を使用
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### カスタムビルドまたはサーバー統合

AMP オプティマイザは自分で統合することもできます。多数のオープンソースの AMP オプティマイザ実装が提供されています。

- [AMP オプティマイザ（Node.js）](node-amp-optimizer.md): 最適化された AMP を生成するための Node.js ベースのライブラリ。amp.dev で入門ガイドを参照してください。実装は、AMP チームが管理しています。
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer（Python）](https://github.com/chasefinch/amp-renderer): Node AMP オプティマイザの Python ポート

サーバーや静的サイトが動的にレンダリングするページには、さまざまな統合があります。

1. **ビルド時**: 静的サイトでは、ビルドの一環として AMP ページを最適するのが最良です。このアプローチは、AMP ページの最適化によって配信パフォーマンスが影響を受けないため、理想的と言えます。[AMP オプティマイザ + Gulp 統合のサンプル](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp)を参照してください。
2. **レンダリング時**: ウェブサイトの性質がより動的であるか、静的に変換を適用できない場合、AMP ドキュメントがサーバーでレンダリングされた後に最適化を実施することができます。この場合、配信時間を高速化するために、2 回目以降のリクエスト用に、変換済みのページをキャッシュするのが最良です。キャッシングは CDN レベルやサイトの内部インフラストラクチャ（Memcached など）のほか、ページがメモリに収まる程度の大きさであればサーバー自体でも行われます。このアプローチの詳細については、[AMP オプティマイザを Express.JS に統合する実演デモ](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express)を参照してください。

### ホスティングプロバイダでの統合

一部のホスティングプロバイダでは、ウェブページのデプロイや配信時にカスタムロジックを実行することができ、AMP オプティマイザを統合するための優れたオプションです。以下は、その統合の例です。

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/)（[近日公開予定](https://github.com/ampproject/amp-toolbox/issues/878)）
- AMP Optimizer Docker Image（[近日公開予定](https://github.com/ampproject/amp-toolbox/issues/879)）
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

---
$title: JavaScript Module バージョンの AMP ランタイムの使用
$order: 25
tags:
- lcp
- fid
---

ユーザーとその帯域幅を考慮することは重要なことです。[JavaScript Module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) を使用すると、最新のウェブブラウザでのページパフォーマンスを大きく改善できます。AMP ランタイムと AMP コンポーネントの JavaScript Module バージョンにオプトインするには、[`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) フラグを最新の [AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) バージョンで使用することができます。実装を最新の状態に維持しておけば、JavaScript プログラムを個別のモジュールに分割できるため、必要なものだけをインポートすることができるのです。現時点では、この機能は実験的（近日公開！）であるため、使用すると AMP ページが無効になる可能性があることに注意してください。

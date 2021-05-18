---
'$title': Node.js AMP オプティマイザガイド
$order: 2
description: このガイドでは、Node.js バージョンの AMP オプティマイザをセットアップして使用する方法を説明します。
formats:
  - websites
  - stories
author: sebastianbenz
---

このガイドでは、Node.js バージョンの AMP オプティマイザをセットアップして使用する方法を説明します。

## セットアップ

以下のコードを使って、NPM 経由でインストールします。

```shell
npm install @ampproject/toolbox-optimizer
```

## 使用方法

AMP Optimizer API は、HTML 文字列を入力として取り、その HTML 文字列の最適化バージョンを返します。以下に、基本的な使用方法を示します。

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### ビルド時に最適化された AMP を作成する

静的サイトについては、サイトを構築する際に、AMP ページを最適化することが最良です。以下に、このアプローチを [Gulp.js](https://gulpjs.com/) ベースのビルドに統合する方法の例を示します。この例では、src フォルダ内のすべての HTML ファイルを最適化するカスタム変換を追加しています。

```js
const {src, dest} = require('gulp');
const through2 = require('through2');

const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

function build(cb) {
  return src('src/*.html')
    .pipe(
      through2.obj(async (file, _, cb) => {
        if (file.isBuffer()) {
          const optimizedHtml = await ampOptimizer.transformHtml(
            file.contents.toString()
          );
          file.contents = Buffer.from(optimizedHtml);
        }
        cb(null, file);
      })
    )
    .pipe(dest('dist/'));
}

exports.default = build;
```

### レンダリング時

動的なページにおいては、サーバーでページをレンダリングする必要のあることがよくあります。この場合、ページをレンダリングした後に、AMP オプティマイザを実行することができます。以下は、このアプローチを [Express.js](https://expressjs.com/) サーバーに統合した例です。AMP 最適化を Express ルーターに統合する方法の 1 つとして、テンプレートが[レンダリング](https://expressjs.com/en/api.html#app.render)された後に、コールバックでオプティマイザを実行しています。

```js
const express = require('express');
const router = express.Router();
const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

router.get('/', (req, res) => {
  const locals = {title: 'Express with AMP Optimizer'};
  res.render('index', locals, async (err, html) => {
    const optimizedHtml = await ampOptimizer.transformHtml(html);
    res.send(optimizedHtml);
  });
});

module.exports = router;
```

重要: AMP オプティマイザをサーバーで使用する際は、レンダリングの遅延を回避するために、キャッシングまたは CDN を必ずセットアップしてください。

## 構成

AMP オプティマイザは妥当なデフォルト構成を提供しており、ほとんどの場合では十分に役立ちますが、特定の使用事例に対して変換をカスタマイズすることができます。利用できるすべてのオプションのリストは、[こちら](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options)を参照してください。

特筆すべきオプションをいくつか以下に示します。

- `lts: true`: AMP ランタイムとコンポーネントの[長期的安定 URL](https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md) を可能にします。
- `verbose: true`: 詳細なデバッグ出力を得られます。特に、AMP ボイラープレートを削除できない理由を特定する上で役立ちます。
- `imageOptimizer`: 特定の画像 src の srcset URL を計算するための関数を提供し、画像 srcset の生成を自動化します。この関数は、ある幅が指定された `src` 画像バージョンをポイントする URL を返します。利用できる画像がない場合は、偽の値を返します。この詳細は次のセクションで説明します。

### 画像の最適化

AMP オプティマイザは、`layout` 定義に基づき、指定された `amp-img` の `srcset` 値を生成できます。これが機能するには、画像の `src` と `width` をサイズ変更される `srcset` ソース値にマッピングする関数を指定する必要があります。画像のサイズ変更は、AMP オプティマイザが実行するのではなく、ビルド時（静的サイト）または [thumbor](https://github.com/thumbor/thumbor) などの画像ホスティングサービスのいずれかで発生します。

以下は、画像の幅を `src` にアペンドする実装例です。

```js
const ampOptimizer = AmpOptimizer.create({
  // parameters are the amp-img `src` and the `width` of the to be generated srcset source value
  imageOptimizer: (src, width) => {
    // we cannot rename if the image does not have a file extension
    const index = src.lastIndexOf('.');
    if (index === -1) {
      // return null means we won't generate a srcset source value for this width
      return null;
    }
    const prefix = src.substring(0, index);
    const postfix = src.substring(index, src.length);
    return `${prefix}.${width}w${postfix}`;
  };
})
```

この実装を使用すると、AMP オプティマイザは、以下の `amp-img` 宣言を変換します。

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                             image-2x.png 2x"
></amp-img>
```

上記を以下のように変換します。

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
  srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                               image-2x.png 2x"
></amp-img>
```

ヒント: `layout=responsive` を使用している場合は、`width` と `height` 属性を使用して画像の最小寸法を指定してください。たとえば、モバイルデバイス用のフルブリードのヒーロー画像であれば、幅を `width=320` に指定します。

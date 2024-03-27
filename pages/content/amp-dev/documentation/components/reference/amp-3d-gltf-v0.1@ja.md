---
$title: amp-3d-gltf
$category@: media
teaser:
  text: GL Transmission Format（glTF）の 3D モデルを表示します。
---

<!--
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



GL Transmission Format（glTF）の 3D モデルを表示します。

<table>
  <tr>
    <td width="40%"><strong>必須のスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-3d-gltf" src="https://ampjs.org/v0/amp-3d-gltf-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、responsive</td>
  </tr>
  <tr>
    <td><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-3d-gltf/">amp-3d-gltf サンプル</a>をご覧ください。</td>
  </tr>
</table>

## 使用方法 <a name="usage"></a>

`amp-3d-gltf` コンポーネントは、glTF 形式の 3D モデルを表示します。

**注**: このモデルを表示するには、WebGL 対応ブラウザが必要です。

### 例 <a name="example"></a>

```html
<amp-3d-gltf
    layout="responsive"
    width="320"
    height="240"
    alpha="true"
    antialiasing="true"
    src="path/to/model.glb"></amp-3d-gltf>
```

### 制限事項 <a name="limitations"></a>

現在のところ、対応しているのは glTF 2.0 だけに限られます。

サポートされていない機能:

- embeded cameras
- animation

### CORS <a name="cors"></a>

`amp-3d-gltf` は、オリジンの `https://<random>.ampproject.net` から `fetch` リクエストを作成します。そのため、エンドポイントのレスポンス ヘッダーで `access-control-allow-origin: *.ampproject.net` を `src` として指定する必要があります。オリジンにはランダムなサブドメイン コンポーネントがあるため、ワイルドカードが必要です。

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src（必須）</strong></td>
    <td>gltf ファイルの URL を指定する必須属性。</td>
  </tr>
  <tr>
    <td width="40%"><strong>alpha（省略可）</strong></td>
    <td>キャンバスの空きスペースを透明にするかどうかを指定するブール値属性。デフォルトでは、空きスペースは黒色で塗りつぶされます。
        デフォルト値は <code>false</code> です。</td>
    </tr>
    <tr>
      <td width="40%"><strong>antialiasing（省略可）</strong></td>
      <td>アンチエイリアスをオンにするかどうかを指定するブール値属性。デフォルト値は <code>false</code> です。</td>
    </tr>
    <tr>
      <td width="40%"><strong>clearColor（省略可）</strong></td>
      <td>キャンバスの空きスペースを塗りつぶす際に使用する有効な CSS 色を格納した文字列。</td>
    </tr>
    <tr>
      <td width="40%"><strong>maxPixelRatio（省略可）</strong></td>
      <td>pixelRatio レンダリング オプションの上限を指定する数値。デフォルトは <code>window.devicePixelRatio</code> です。</td>
    </tr>
    <tr>
      <td width="40%"><strong>autoRotate（省略可）</strong></td>
      <td>モデルの中央を中心にしてカメラを自動的に回転するかどうかを指定するブール値属性。デフォルト値は <code>false</code> です。</td>
    </tr>
    <tr>
      <td width="40%"><strong>enableZoom（省略可）</strong></td>
      <td>ズームをオンにするかどうかを指定するブール値属性。デフォルト値は <code>true</code> です。</td>
    </tr>
  </table>

## アクション <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong>setModelRotation(x, y, z, xMin, xMax, yMin, yMax, zMin, zMax)</strong></td>
    <td>モデルの回転を設定します。回転順序は ZYX です。
      <ul>
        <li>x / y / z - 0～1 の数値で指定します。デフォルトは、直前のモデル回転値です。</li>
        <li>min / max - 角度をラジアンで指定します。デフォルトは 0 / pi * 2 で、ターゲット範囲を定義します。</li>
      </ul>
      たとえば、<code>setModelRotation(x=0.5, xMin=0, xMax=3.14)</code> は、回転の <code>x</code> 成分を <code>1.57</code> に変更します。</td>
    </tr>
  </table>

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-3d-gltf ルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-3d-gltf/validator-amp-3d-gltf.protoascii)をご覧ください。

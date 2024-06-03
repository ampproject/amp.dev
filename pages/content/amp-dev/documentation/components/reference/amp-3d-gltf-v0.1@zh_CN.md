---
$title: amp-3d-gltf
$category@: media
teaser:
  text: 显示 GL 传输格式 (glTF) 的 3D 模型。
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



显示 GL 传输格式 (glTF) 的 3D 模型。

<table>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-3d-gltf" src="https://cdn.ampproject.org/v0/amp-3d-gltf-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、responsive</td>
  </tr>
  <tr>
    <td><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-3d-gltf/">amp-3d-gltf 示例</a>。</td>
  </tr>
</table>

## 用法 <a name="usage"></a>

`amp-3d-gltf` 组件可显示 glTF 格式的 3D 模型。

**注意**：要显示这些模型，必须使用支持 WebGL 的浏览器。

### 示例 <a name="example"></a>

```html
<amp-3d-gltf
    layout="responsive"
    width="320"
    height="240"
    alpha="true"
    antialiasing="true"
    src="path/to/model.glb"></amp-3d-gltf>
```

### 限制 <a name="limitations"></a>

目前，此组件仅适用于 glTF 2.0。

不支持的功能：

- 嵌入式摄像头
- 动画

### CORS <a name="cors"></a>

`amp-3d-gltf` 从来源网域 `https://<random>.ampproject.net` 发出 `fetch` 请求，因此，必须在指定为 `src` 的端点的响应标头上设置 `access-control-allow-origin: *.ampproject.net`。需要使用通配符，因为来源网域包含随机子网域组件。

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src [必需]</strong></td>
    <td>必需的属性，用于指定 gltf 文件的网址。</td>
  </tr>
  <tr>
    <td width="40%"><strong>alpha [可选]</strong></td>
    <td>布尔值属性，用于指定画布上的可用空间是否透明。默认情况下，可用空间用黑色填充。默认值为 <code>false</code>。</td>
  </tr>
  <tr>
    <td width="40%"><strong>antialiasing [可选]</strong></td>
    <td>布尔值属性，用于指定是否开启防混叠功能。默认值为 <code>false</code>。</td>
  </tr>
  <tr>
    <td width="40%"><strong>clearColor [可选]</strong></td>
    <td>字符串，必须包含用于填充画布上可用空间的有效 CSS 颜色。</td>
  </tr>
  <tr>
    <td width="40%"><strong>maxPixelRatio [可选]</strong></td>
    <td>数值，用于指定 pixelRatio 呈现选项的上限。默认为 <code>window.devicePixelRatio</code>。</td>
  </tr>
  <tr>
    <td width="40%"><strong>autoRotate [可选]</strong></td>
    <td>布尔值属性，用于指定是否围绕模型中心自动旋转摄像头。默认值为 <code>false</code>。</td>
  </tr>
  <tr>
    <td width="40%"><strong>enableZoom [可选]</strong></td>
    <td>布尔值属性，用于指定是否开启缩放功能。默认值为 <code>true</code>。</td>
  </tr>
</table>

## 操作 <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong>setModelRotation(x, y, z, xMin, xMax, yMin, yMax, zMin, zMax)</strong></td>
    <td>设置模型旋转。旋转顺序为 ZYX<ul>
      <li>x/y/z - 数字 0..1，默认为模型旋转的上一个值。</li>
      <li>min/max - 以弧度表示的角度，默认为 0 / pi * 2，用于定义目标范围</li>
    </ul>
    例如 <code>setModelRotation(x=0.5, xMin=0, xMax=3.14)</code> 会将旋转的 <code>x</code> 分量改为 <code>1.57</code>。</td>
  </tr>
</table>

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-3d-gltf 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-3d-gltf/validator-amp-3d-gltf.protoascii)。

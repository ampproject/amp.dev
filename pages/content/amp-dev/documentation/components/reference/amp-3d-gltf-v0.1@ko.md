---
$title: amp-3d-gltf
$category@: media
teaser:
  text: GL 전송 양식(glTF) 3D 모델을 표시합니다
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



GL 전송 양식(glTF) 3D 모델을 표시합니다.

<table>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-3d-gltf" src="https://cdn.ampproject.org/v0/amp-3d-gltf-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, responsive</td>
  </tr>
  <tr>
    <td><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-3d-gltf/">amp-3d-gltf 예</a>를 참조하세요.</td>
  </tr>
</table>

## 사용 <a name="usage"></a>

`amp-3d-gltf` 구성요소는 glTF 형식의 3D 모델을 표시합니다.

**참고**: 이 모델을 표시하려면 WebGL이 지원되는 브라우저가 필요합니다.

### 예 <a name="example"></a>

```html
<amp-3d-gltf
  layout="responsive"
  width="320"
  height="240"
  alpha="true"
  antialiasing="true"
  src="path/to/model.glb"></amp-3d-gltf>
```

### 제한사항 <a name="limitations"></a>

현재 glTF 2.0에서만 작동합니다.

지원되지 않는 기능:

- 내장 카메라
- 애니메이션

### CORS <a name="cors"></a>

`amp-3d-gltf`는 `access-control-allow-origin: *.ampproject.net`가 `src`로 지정된 엔드포인트의 응답 헤더에 설정되도록 원본 `https://<random>.ampproject.net`에서 `fetch` 요청을 합니다. 원본에 이 구성요소에 대한 임의의 하위 도메인 구성요소가 있으므로 와일드 카드가 필요합니다.

## 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src [필수]</strong></td>
    <td>gltf 파일의 URL을 지정하는 필수 속성입니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>alpha [선택사항]</strong></td>
    <td>캔버스의 빈 공간이 투명한지 여부를 지정하는 부울 속성입니다. 기본적으로 빈 공간은 검정색으로 채워집니다.
        기본값은 <code>false</code>입니다.</td>
    </tr>
    <tr>
      <td width="40%"><strong>antialiasing [선택사항]</strong></td>
      <td>안티 앨리어싱을 사용 설정할지 여부를 지정하는 부울 속성입니다. 기본값은 <code>false</code>입니다.</td>
    </tr>
    <tr>
      <td width="40%"><strong>clearColor [선택사항]</strong></td>
      <td>유효한 CSS 색상을 포함해야 하는 문자열로, 캔버스의 빈 공간을 채우는 데 사용됩니다.</td>
    </tr>
    <tr>
      <td width="40%"><strong>maxPixelRatio [선택사항]</strong></td>
      <td>pixelRatio 렌더링 옵션의 상한을 지정하는 숫자 값입니다. 기본값은 <code>window.devicePixelRatio</code>입니다.</td>
    </tr>
    <tr>
      <td width="40%"><strong>autoRotate [선택사항]</strong></td>
      <td>모델의 중심 주위로 카메라를 자동으로 회전할지 여부를 지정하는 부울 속성입니다. 기본값은 <code>false</code>입니다.</td>
    </tr>
    <tr>
      <td width="40%"><strong>enableZoom [선택사항]</strong></td>
      <td>확대/축소를 사용 설정할지 여부를 지정하는 부울 속성입니다. 기본값은 <code>true</code>입니다.</td>
    </tr>
  </table>

## 작업 <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong>setModelRotation(x, y, z, xMin, xMax, yMin, yMax, zMin, zMax)</strong></td>
    <td>모델 회전을 설정합니다. 회전 순서는 ZYX입니다.
      <ul>
        <li>x/y/z: 숫자 0..1로, 기본값은 모델 회전의 이전 값입니다.</li>
        <li>min/max: 각도(라디안)로, 기본값은 0 / pi * 2이며, 대상 범위를 정의합니다.</li>
      </ul>
      예를 들어 <code>setModelRotation(x=0.5, xMin=0, xMax=3.14)</code> 는 회전의 <code>x</code> 구성요소를 <code>1.57</code>로 변경합니다.</td>
    </tr>
  </table>

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양의 [amp-3d-gltf 규칙](https://github.com/ampproject/amphtml/blob/master/extensions/amp-3d-gltf/validator-amp-3d-gltf.protoascii)을 참조하세요.

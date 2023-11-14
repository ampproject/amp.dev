---
$title: amp-3d-gltf
$category@: media
teaser:
  text: Displays GL Transmission Format (glTF) 3D models.
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



يعرض نماذج GL Transmission Format (glTF) ثلاثية الأبعاد.

<table>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-3d-gltf" src="https://ampjs.org/v0/amp-3d-gltf-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>fill وfixed وfixed-height وflex-item وresponsive</td>
  </tr>
  <tr>
    <td><strong>أمثلة</strong></td>
    <td>اطّلِع على <a href="https://ampbyexample.com/components/amp-3d-gltf/">مثال amp-3d-gltf</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>

## الاستخدام <a name="usage"></a>

يعرض المكوِّن `amp-3d-gltf` نماذج ثلاثية الأبعاد بالتنسيق glTF.

**ملاحظة**: يجب استخدام متصفح متوافق مع WebGL لعرض هذه النماذج.

### مثال <a name="example"></a>

```html
<amp-3d-gltf
    layout="responsive"
    width="320"
    height="240"
    alpha="true"
    antialiasing="true"
    src="path/to/model.glb"></amp-3d-gltf>
```

### القيود <a name="limitations"></a>

يعمل المكّوِن حاليًا مع 2.0 glTF فقط.

الميزات غير المتاحة:

- الكاميرات المضمنة
- الحركة

### CORS <a name="cors"></a>

يرسل `amp-3d-gltf` طلب `fetch` من الأصل `https://<random>.ampproject.net` لذا يجب تعيين `access-control-allow-origin: *.ampproject.net` على رأس الاستجابة لنقطة النهاية المحددة على هيئة `src`. وتظهر الحاجة إلى استخدام حرف بدل لأن الأصل يحتوي على مكّوِن نطاق فرعي عشوائي.

## السمات <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src [مطلوبة]</strong></td>
    <td>سمة مطلوبة تحدد عنوان URL لملف gltf.</td>
  </tr>
  <tr>
    <td width="40%"><strong>alpha [اختياريّة]</strong></td>
    <td>سمة Boolean تحدد ما إذا كانت المساحة الخالية في لوحة الرسم شفافة أم لا. يتم تلقائيًا ملء المساحة الخالية باللون الأسود.
      والقيمة التلقائية هي <code>false</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>antialiasing [اختياريّة]</strong></td>
    <td>سمة Boolean تحدد ما إذا سيتم تفعيل مضاد التشويش أم لا. والقيمة التلقائية هي <code>false</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>clearColor [اختياريّة]</strong></td>
    <td>سلسلة يجب أن تحتوي على لون CSS صالح سيتم استخدامه لملء المساحة الخالية في لوحة الرسم.</td>
  </tr>
  <tr>
    <td width="40%"><strong>maxPixelRatio [اختياريّة]</strong></td>
    <td>قيمة رقمية تحدد الحد الأعلى لخيار عرض pixelRatio. والقيمة التلقائية هي <code>window.devicePixelRatio</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>autoRotate [اختياريّة]</strong></td>
    <td>سمة Boolean تحدد ما إذا كان سيتم تدوير الكاميرا تلقائيًا حول مركز النموذج أم لا. والقيمة التلقائية هي <code>false</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>enableZoom [اختياريّة]</strong></td>
    <td>سمة Boolean تحدد ما إذا كان يجب تفعيل التكبير/التصغير. القيمة التلقائية هي <code>true</code>.</td>
  </tr>
</table>

## الإجراءات <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong>setModelRotation(x, y, z, xMin, xMax, yMin, yMax, zMin, zMax)</strong></td>
    <td>يحدد دوران النموذج علمًا بأن ترتيب الدوران هو ZYX.
      <ul>
        <li>x/y/z - رقم 0..1، يتم تعيينه تلقائيًا على القيمة السابقة لدوران النموذج.</li>
        <li>min/max - الزاوية بالراديان، يتم تعيينه تلقائيًا على 0 / pi * 2 ويحدد النطاق المستهدف.</li>
      </ul>
      على سبيل المثال، سيغير <code>setModelRotation(x=0.5, xMin=0, xMax=3.14)</code> مكوِّن الدوران <code>x</code> إلى <code>1.57</code>.</td>
  </tr>
</table>

## التحقق <a name="validation"></a>

اطِّلع على [قواعد amp-3d-gltf ](https://github.com/ampproject/amphtml/blob/main/extensions/amp-3d-gltf/validator-amp-3d-gltf.protoascii) في مواصفات مدقق AMP.

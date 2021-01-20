---
$title: amp-3d-gltf
$category@: media
teaser:
  text: Компонент для показа 3D-моделей, использующих формат glTF (GL Transmission Format)
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



Этот компонент предназначен для показа 3D-моделей, использующих формат glTF (GL Transmission Format).

<table>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-3d-gltf" src="https://cdn.ampproject.org/v0/amp-3d-gltf-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, responsive</td>
  </tr>
  <tr>
    <td><strong>Примеры</strong></td>
    <td>См. пример <a href="https://ampbyexample.com/components/amp-3d-gltf/">amp-3d-gltf</a> на сайте AMP By Example.</td>
  </tr>
</table>

## Использование <a name="usage"></a>

Компонент `amp-3d-gltf` предназначен для показа 3D-моделей, при создании которых использовался формат glTF.

**Примечание.** Такие модели могут демонстрироваться только в браузерах, которые поддерживают WebGL.

### Пример <a name="example"></a>

```html
<amp-3d-gltf
    layout="responsive"
    width="320"
    height="240"
    alpha="true"
    antialiasing="true"
    src="path/to/model.glb"></amp-3d-gltf>
```

### Ограничения <a name="limitations"></a>

В настоящее время поддерживается только версия glTF 2.0.

Неподдерживаемые функции:

- встроенные камеры
- анимация.



### Поддержка CORS <a name="cors"></a>

Компонент `amp-3d-gltf` выполняет запрос `fetch` с исходного URL `https://<random>.ampproject.net`, поэтому в заголовке ответа конечной точки, определенной с помощью атрибута `src`, должен быть указан элемент `access-control-allow-origin: *.ampproject.net`. Поскольку исходный URL содержит случайным образом указываемый субдомен, потребуется использовать подстановочный знак.

## Атрибуты <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src (обязательно)</strong></td>
    <td>Обязательный атрибут, указывающий на URL, по которому размещен файл glTF.</td>
  </tr>
  <tr>
    <td width="40%"><strong>alpha (необязательно)</strong></td>
    <td>Логический атрибут, который определяет, является ли прозрачным свободное пространство, содержащееся в элементе canvas. По умолчанию для свободного пространства используется заливка черным цветом.
        Значение по умолчанию – <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>antialiasing (необязательно)</strong></td>
      <td>Логический атрибут, который определяет, должно ли использоваться субпиксельное сглаживание. Значение по умолчанию – <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>clearColor (необязательно)</strong></td>
      <td>Строка, в которой с помощью стиля CSS указан цвет, используемый для заливки свободного пространства.</td>
    </tr>
    <tr>
      <td width="40%"><strong>maxPixelRatio (необязательно)</strong></td>
      <td>Числовое значение, которое определяет верхний предел значения свойства pixelRatio, используемого при отрисовке. Значение по умолчанию – <code>window.devicePixelRatio</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>autoRotate (необязательно)</strong></td>
      <td>Логический атрибут, который определяет, должно ли автоматически запускаться вращение камеры вокруг центра 3D-модели. Значение по умолчанию – <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>enableZoom (необязательно)</strong></td>
      <td>Логический атрибут, который указывает, следует ли включать масштабирование. Значение по умолчанию – <code>true</code>.</td>
    </tr>
  </table>

## Действия <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong>setModelRotation(x, y, z, xMin, xMax, yMin, yMax, zMin, zMax)</strong></td>
    <td>Этот элемент контролирует вращение модели. Направление вращения соответствует осям ZYX.
      <ul>
        <li>Элементам x, y и z присваивается значение в диапазоне от 0 до 1. По умолчанию используется предшествующее значение, которое задает параметры вращения.</li>
        <li>Элементы, содержащие "Min" и "Max", определяют возможный диапазон вращения и соответствуют величине угла в радианах. Значения по умолчанию: 0 или π * 2.</li>
      </ul>
      Пример: если указан вариант <code>setModelRotation(x=0.5, xMin=0, xMax=3.14)</code>, значение <code>x</code> в компоненте, относящемся к ротации, будет равно <code>1,57</code>.</td>
    </tr>
  </table>

## Проверка <a name="validation"></a>

С правилами для компонента amp-3d-gltf rules можно ознакомиться в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-3d-gltf/validator-amp-3d-gltf.protoascii).

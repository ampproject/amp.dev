---
$title: amp-3d-gltf
$category@: media
teaser:
  text: Muestra modelos en 3D en formato GL Transmission Format (glTF).
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



Muestra modelos en 3D en formato GL Transmission Format (glTF).

<table>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-3d-gltf" src="https://ampjs.org/v0/amp-3d-gltf-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item y responsive</td>
  </tr>
  <tr>
    <td><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-3d-gltf/">ejemplo de amp-3d-gltf</a> de AMP By Example.</td>
  </tr>
</table>

## Uso <a name="usage"></a>

El componente `amp-3d-gltf` muestra modelos en 3D que están en formato glTF.

**Nota:** Para poder mostrar estos modelos, se necesita un navegador compatible con WebGL.

### Ejemplo <a name="example"></a>

```html
<amp-3d-gltf
    layout="responsive"
    width="320"
    height="240"
    alpha="true"
    antialiasing="true"
    src="path/to/model.glb"></amp-3d-gltf>
```

### Limitaciones <a name="limitations"></a>

Actualmente, solo funciona con glTF 2.0.

Funciones no admitidas:

- cámaras insertadas
- animación

### CORS <a name="cors"></a>

`amp-3d-gltf` hace una solicitud `fetch` desde el origen `https://<random>.ampproject.net`, por lo que `access-control-allow-origin: *.ampproject.net` debe aparecer en el encabezado de respuesta del punto de conexión que se ha definido como `src`. El comodín es necesario porque el origen tiene un componente de subdominio aleatorio.

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src [obligatorio]</strong></td>
    <td>Atributo obligatorio que especifica la URL del archivo gltf.</td>
  </tr>
  <tr>
    <td width="40%"><strong>alpha [opcional]</strong></td>
    <td>Atributo booleano que especifica si el espacio libre del canvas es transparente. De forma predeterminada, el espacio libre se rellena con color negro.
        El valor predeterminado es <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>antialiasing [opcional]</strong></td>
      <td>Atributo booleano que especifica si se debe activar el antialiasing (suavizado). El valor predeterminado es <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>clearColor [opcional]</strong></td>
      <td>Cadena que debe contener un color CSS válido que se utilizará para rellenar el espacio libre del canvas.</td>
    </tr>
    <tr>
      <td width="40%"><strong>maxPixelRatio [opcional]</strong></td>
      <td>Valor numérico que especifica el límite superior de la opción de renderizado pixelRatio. El valor predeterminado es <code>window.devicePixelRatio</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>autoRotate [opcional]</strong></td>
      <td>Atributo booleano que especifica si la cámara gira automáticamente alrededor del centro del modelo. El valor predeterminado es <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>enableZoom [opcional]</strong></td>
      <td>Atributo booleano que especifica si se activa el zoom. El valor predeterminado es <code>true</code>.</td>
    </tr>
  </table>

## Acciones <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong>setModelRotation(x, y, z, xMin, xMax, yMin, yMax, zMin, zMax)</strong></td>
    <td>Define la rotación del modelo. El orden de rotación es ZYX.
      <ul>
        <li>x/y/z: número del 0 al 1. Utiliza de forma predeterminada el valor anterior de la rotación del modelo.</li>
        <li>min/max: ángulo en radianes, define el intervalo objetivo. El valor predeterminado es 0 / pi * 2.</li>
      </ul>
      Por ejemplo, <code>setModelRotation(x=0.5, xMin=0, xMax=3.14)</code> cambiará el valor del componente de rotación <code>x</code> a <code>1.57</code>.</td>
    </tr>
  </table>

## Validación <a name="validation"></a>

Consulta las [reglas de amp-3d-gltf](https://github.com/ampproject/amphtml/blob/main/extensions/amp-3d-gltf/validator-amp-3d-gltf.protoascii) en la especificación de la herramienta de validación de AMP.

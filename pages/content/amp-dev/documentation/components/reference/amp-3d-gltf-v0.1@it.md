---
$title: amp-3d-gltf
$category@: media
teaser:
  text: Mostra modelli 3D nel formato glTF (GL Transmission Format).
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



Mostra modelli 3D nel formato glTF (GL Transmission Format).

<table>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-3d-gltf" src="https://cdn.ampproject.org/v0/amp-3d-gltf-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, responsive</td>
  </tr>
  <tr>
    <td><strong>Esempi</strong></td>
    <td>Vedi l'<a href="https://ampbyexample.com/components/amp-3d-gltf/">esempio amp-3d-gltf</a> del sito AMP By Example</td>
  </tr>
</table>

## Utilizzo <a name="usage"></a>

Il componente `amp-3d-gltf` mostra i modelli 3D che sono nel formato glTF.

**Nota**: per visualizzare questi modelli è necessario un browser che supporti WebGL.

### Esempio <a name="example"></a>

```html
<amp-3d-gltf
    layout="responsive"
    width="320"
    height="240"
    alpha="true"
    antialiasing="true"
    src="path/to/model.glb"></amp-3d-gltf>
```

### Limitazioni <a name="limitations"></a>

Attualmente funziona solo con glTF 2.0.

Funzionalità non supportate:

- Videocamere incorporate
- Animazione

### CORS <a name="cors"></a>

`amp-3d-gltf` effettua una richiesta `fetch` dall'origine `https://<random>.ampproject.net`, per cui `access-control-allow-origin: *.ampproject.net` deve essere impostato come intestazione della risposta dell'endpoint specificato come `src`. Il carattere jolly è necessario perché l'origine contiene un componente di sottodominio casuale.

## Attributi <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src [obbligatorio]</strong></td>
    <td>Un attributo obbligatorio che specifica l'URL del file gltf.</td>
  </tr>
  <tr>
    <td width="40%"><strong>alpha [facoltativo]</strong></td>
    <td>Un attributo booleano che specifica se lo spazio libero su canvas è trasparente o meno. Per impostazione predefinita, lo spazio libero è riempito di nero.
        Il valore predefinito è <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>antialiasing [facoltativo]</strong></td>
      <td>Un attributo booleano che specifica se attivare o meno l'antialiasing. Il valore predefinito è <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>clearColor [facoltativo]</strong></td>
      <td>Una stringa che deve contenere un colore CSS valido che sarà utilizzato per riempire lo spazio libero su canvas.</td>
    </tr>
    <tr>
      <td width="40%"><strong>maxPixelRatio [facoltativo]</strong></td>
      <td>Un valore numerico che specifica il limite superiore per l'opzione di visualizzazione pixelRatio. Il valore predefinito è <code>window.devicePixelRatio</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>autoRotate [facoltativo]</strong></td>
      <td>Un attributo booleano che specifica se ruotare automaticamente la videocamera attorno al centro del modello. Il valore predefinito è <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>enableZoom [facoltativo]</strong></td>
      <td>Un attributo booleano che specifica se attivare o meno lo zoom. Il valore predefinito è <code>true</code>.</td>
    </tr>
  </table>

## Azioni <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong>setModelRotation(x, y, z, xMin, xMax, yMin, yMax, zMin, zMax)</strong></td>
    <td>Imposta la rotazione del modello. L'ordine di rotazione è ZYX.
      <ul>
        <li>x/y/z - i numeri 0..1, impostano come valore predefinito il valore precedente della rotazione del modello</li>
        <li>min/max - angolo in radianti, imposta come valore predefinito 0 / pi * 2, definisce l'intervallo di destinazione</li>
      </ul>
      Ad esempio, <code>setModelRotation(x=0.5, xMin=0, xMax=3.14)</code> imposterà la componente <code>x</code> della rotazione <code>1.57</code>.</td>
    </tr>
  </table>

## Convalida <a name="validation"></a>

Consulta le [regole amp-3d-gltf](https://github.com/ampproject/amphtml/blob/master/extensions/amp-3d-gltf/validator-amp-3d-gltf.protoascii) nella specifica dello strumento di convalida AMP.

---
$title: amp-3d-gltf
$category@: media
teaser:
  text: Afficher les modèles 3D au format glTF (GL Transmission Format).
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



Ce composant affiche les modèles 3D au format glTF (GL Transmission Format).

<table>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-3d-gltf" src="https://ampjs.org/v0/amp-3d-gltf-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, responsive</td>
  </tr>
  <tr>
    <td><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-3d-gltf/">exemple de composant amp-3d-gltf</a> sur AMP By Example.</td>
  </tr>
</table>

## Utilisation <a name="usage"></a>

Le composant `amp-3d-gltf` affiche les modèles 3D qui sont au format glTF.

**Remarque** : Un navigateur compatible WebGL est requis pour afficher ces modèles.

### Exemple <a name="example"></a>

```html
<amp-3d-gltf
    layout="responsive"
    width="320"
    height="240"
    alpha="true"
    antialiasing="true"
    src="path/to/model.glb"></amp-3d-gltf>
```

### Limitations <a name="limitations"></a>

Actuellement, ce composant fonctionne uniquement avec le format glTF 2.0.

Fonctionnalités non compatibles :

- Caméras intégrées
- Animation

### CORS <a name="cors"></a>

`amp-3d-gltf` effectue une requête `fetch` à partir de l'origine `https://<random>.ampproject.net`. `access-control-allow-origin : *.ampproject.net` doit donc être défini dans l'en-tête de réponse du point de terminaison spécifié en tant que `src`. Un caractère générique est nécessaire, car l'origine est associée à un composant de sous-domaine aléatoire.

## Attributs <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src [obligatoire]</strong></td>
    <td>Attribut obligatoire qui indique l'URL du fichier gltf.</td>
  </tr>
  <tr>
    <td width="40%"><strong>alpha [facultatif]</strong></td>
    <td>Attribut booléen qui indique si l'espace disponible sur le canevas est transparent ou opaque. Par défaut, l'espace disponible est noir.
        La valeur par défaut est <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>antialiasing [facultatif]</strong></td>
      <td>Attribut booléen qui indique si l'anticrénelage doit être activé ou désactivé. La valeur par défaut est <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>clearColor [facultatif]</strong></td>
      <td>Chaîne qui doit contenir une couleur CSS valide. Cette couleur sera utilisée pour remplir l'espace disponible sur le canevas.</td>
    </tr>
    <tr>
      <td width="40%"><strong>maxPixelRatio [facultatif]</strong></td>
      <td>Valeur numérique qui indique la limite supérieure de l'option de rendu pixelRatio. La valeur par défaut est <code>window.devicePixelRatio</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>autoRotate [facultatif]</strong></td>
      <td>Attribut booléen qui indique si la caméra doit pivoter automatiquement ou non autour du centre du modèle. La valeur par défaut est <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>enableZoom [facultatif]</strong></td>
      <td>Attribut booléen qui indique si le zoom doit être activé ou désactivé. La valeur par défaut est <code>true</code>.</td>
    </tr>
  </table>

## Actions <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong>setModelRotation(x, y, z, xMin, xMax, yMin, yMax, zMin, zMax)</strong></td>
    <td>Définit la rotation du modèle ; l'ordre de rotation est ZYX
      <ul>
        <li>x/y/z - nombre 0..1, défini par défaut sur la valeur précédente de rotation du modèle.</li>
        <li>min/max - angle en radians, défini par défaut sur 0 / pi * 2 ; définit la plage cible.</li>
      </ul>
      Par exemple, <code>setModelRotation(x=0.5, xMin=0, xMax=3.14)</code> change le composant de rotation <code>x</code> en <code>1.57</code>.</td>
    </tr>
  </table>

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-3d-gltf](https://github.com/ampproject/amphtml/blob/main/extensions/amp-3d-gltf/validator-amp-3d-gltf.protoascii) dans les spécifications du validateur AMP.

---
$title: amp-analytics
$category@: ads-analytics
teaser:
  text: Inserta de forma dinámica anuncios en una página AMP mediante un archivo de configuración servido de forma remota.
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



Inserta de forma dinámica anuncios en una página AMP mediante un archivo de configuración servido de forma remota.

<table>
  <tr>
    <td class="col-fourty"><strong>Disponibilidad</strong></td>
    <td>Experimental</td>
  </tr>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td>
      <code>
      &lt;script async custom-element="amp-auto-ads"
      src="https://ampjs.org/v0/amp-auto-ads-0.1.js">&lt;/script>
        </code>
      </td>
    </tr>
    <tr>
      <td class="col-fourty">
        <strong>
          <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">
            Diseños admitidos
          </a>
        </strong>
      </td>
      <td>N/D</td>
    </tr>
  </table>


## Comportamiento

Si hay un número suficiente de emplazamientos válidos (definidos en la configuración), `amp-auto-ads` intenta insertar anuncios adicionales teniendo en cuenta ciertas restricciones de la red publicitaria. Estas restricciones limitan:

* El número total de anuncios que se pueden insertar
* La distancia mínima que debe haber entre anuncios adyacentes

Además, los anuncios solo se insertarán en las ubicaciones de la página que no provoquen una redistribución inaceptable (según lo determinado por attemptChangeSize).

La etiqueta `<amp-auto-ads>` debe estar colocada como primer elemento secundario de `<body>`.

Debe especificarse en la etiqueta el tipo de red publicitaria y cualquier otra información que requiera dicha red.
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">
  </amp-auto-ads>
```

## Redes publicitarias admitidas <a name="supported-ad-networks"></a>

* [AdSense](https://github.com/ampproject/amphtml/blob/main/ads/google/adsense.md)
* [DoubleClick (experimental)](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)

## Atributos

<table>
  <tr>
    <td width="40%"><strong>type (obligatorio)</strong></td>
    <td>Identificador de la red publicitaria.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>La mayoría de las redes publicitarias requieren más configuración, que se puede transferir a la red mediante atributos HTML del tipo <code>data-</code>. Los nombres de los parámetros pasan de ser nombres estándar de atributos de datos (separados mediante guiones) a alternar mayúsculas y minúsculas (camel case). Por ejemplo, "data-foo-bar" se envía al anuncio para su configuración como "fooBar". Consulta la documentación de la <a href="#supported-ad-networks">red publicitaria</a> específica para saber qué atributos se pueden usar.</td>
  </tr>
  <tr>
    <td width="40%"><strong>atributos comunes</strong></td>
    <td>Este elemento incluye <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comunes</a> que se aplican a los componentes de AMP.</td>
  </tr>
</table>

## Especificación de la configuración

La configuración define en qué parte de la página `<amp-auto-ads>` puede colocar anuncios. La configuración se obtiene de la red publicitaria de terceros a la que enlaza la URL que aparece en `ad-network-config.js`. La configuración debe ser un objeto JSON serializado que coincida con la definición de [`ConfigObj`](#configobj) que se describe más abajo.

### Configuración de ejemplo

En el siguiente ejemplo se especifica que el anuncio debe posicionarse inmediatamente después de todos los elementos `<P class='paragraph'>` que se encuentren dentro del tercer `<DIV id='domId'>` de la página. El anuncio que se coloque en cualquiera de estas posiciones debe ser de tipo BANNER y tener un margen superior de 4 píxeles y un margen inferior de 10.

```json
{
  "placements": [
    {
      "anchor": {
        "selector": "DIV#domId",
        "index": 2,
        "sub": {
          "selector": "P.paragraph",
          "all": true,
        },
      },
      "pos": 4,
      "type": 1,
      "style": {
        "top_m": 5,
        "bot_m": 10,
      },
    },
  ]
}

```

### Definiciones de objetos

#### ConfigObj <a name="configobj"></a>

Estos son los campos que se especifican en el objeto de configuración:

<table>
  <tr>
    <th class="col-thirty">Nombre del campo</th>
    <th class="col-thirty">Tipo</th>
    <th class="col-fourty">Descripción</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>Array&lt;!PlacementObj&gt;</td>
    <td>Campo <strong></strong>obligatorio que indica las partes de la página en las que se pueden insertar anuncios.</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>Campo <em></em>opcional que sirve para especificar la asignación de valores a nombres de atributo y la aplica a todos los elementos <code>&lt;amp-ad&gt;</code> que se inserten mediante esta configuración. Solo se permiten los siguientes nombres de atributo:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (es decir, cualquier atributo de datos)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>adConstraints</code></td>
    <td>AdConstraintsObj</td>
    <td>
      Campo <em></em>opcional que especifica las restricciones que se deben utilizar al colocar anuncios en la página. Si no se especifican, <code>amp-auto-ads</code> intentará utilizar las restricciones predeterminadas definidas en [ad-network-config.js](0.1/ad-network-config.js).
    </td>
  </tr>
</table>

#### PlacementObj

Campos que se deben especificar en el objeto de configuración `placements`:

<table>
  <tr>
    <th class="col-thirty">Nombre del campo</th>
    <th class="col-thirty">Tipo</th>
    <th class="col-fourty">Descripción</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td>Campo <strong></strong>obligatorio que proporciona información que se utiliza para buscar los elementos de la página a los que están anclados los emplazamientos de anuncios.
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td>Campo <strong></strong>obligatorio que indica el emplazamiento del anuncio en relación con su elemento de anclaje.</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td>Campo <strong></strong>obligatorio que indica el tipo de emplazamiento.</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td>Campo <em></em>opcional que indica cualquier estilo que se deba aplicar a un anuncio insertado en este emplazamiento.
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>Campo <em></em>opcional que sirve para asignar un valor a un nombre de atributo y aplicar esto a todos los elementos <code>&lt;amp-ad&gt;</code> insertados en este emplazamiento. Cualquier atributo especificado aquí anula los demás que tengan el mismo nombre y aparezcan en el elemento <code>ConfigObj</code> superior. Solo se permiten los siguientes nombres de atributo:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (es decir, cualquier atributo de datos)</li>
      </ul>
    </td>
  </tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

Los campos que se especifican en el objeto de configuración `anchor` son:

<table>
  <tr>
    <th class="col-thirty">Nombre del campo</th>
    <th class="col-thirty">Tipo</th>
    <th class="col-fourty">Descripción</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>cadena</td>
    <td>Campo <strong></strong>obligatorio que define un selector de CSS para elegir los elementos de este nivel de la definición del campo "anchor".
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>número</td>
    <td>Campo <em></em>opcional que sirve para especificar el índice de los elementos elegidos por el selector a los que se debe limitar este nivel de la definición de "anchor". De forma predeterminada, el valor es 0 si el campo <code>all</code> es "false".</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>boolean</td>
    <td>Se ignora si se ha especificado el campo <code>index</code>. Si se define en <code>true</code>, se incluirán todos los elementos que haya elegido el selector. Si no quieres que se incluyan, debes definirlo en <code>false</code>.
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>número</td>
    <td>Campo <em></em>opcional que especifica la longitud mínima de la propiedad textContent de un elemento para que se pueda incluir. El valor predeterminado es 0.</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>objeto AnchorObj</td>
    <td>Campo <em></em>opcional que especifica un objeto <code>AnchorObj</code> recursivo que seleccionará los elementos de cualquier elemento seleccionado en este nivel de definición de "anchor".
    </td>
  </tr>
</table>

#### PlacementStyleObj <a name="placementstyleobj"></a>

Los campos que se especificarán en el objeto de configuración `style` son:

<table>
  <tr>
    <th class="col-twenty">Nombre del campo</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-fourty">Descripción</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>número</td>
    <td>Campo <em></em>opcional que indica el margen superior en píxeles que debe tener cualquier anuncio insertado en esta posición. El valor predeterminado es 0.
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>número</td>
    <td>Campo <em></em>opcional que indica el margen inferior en píxeles que debe tener cualquier anuncio insertado en esta posición. El valor predeterminado es 0.
    </td>
  </tr>
</table>

#### RelativePositionEnum <a name="relativepositionenum"></a>

Los valores ENUM del campo `pos` del objeto de configuración `placements` son:

<table>
  <tr>
    <th class="col-fourty">Nombre</th>
    <th class="col-twenty">Valor</th>
    <th class="col-fourty">Descripción</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>El anuncio debe insertarse como elemento del mismo nivel inmediatamente antes del anclaje.</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>El anuncio debe insertarse como el primer elemento secundario del anclaje.</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>El anuncio debe insertarse como el último elemento secundario del anclaje.</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>El anuncio debe insertarse como elemento del mismo nivel inmediatamente después del anclaje.</td>
  </tr>
</table>

#### PlacementTypeEnum <a name="placementtypeenum"></a>

Los valores ENUM del campo `type` del objeto de configuración `placements` son:

<table>
  <tr>
    <th class="col-fourty">Nombre</th>
    <th class="col-twenty">Valor</th>
    <th class="col-fourty">Descripción</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>Describe una posición de anuncio de banner.</td>
  </tr>
</table>

#### AdConstraintsObj

Los campos que se especifican en el objeto de configuración `adConstraints` son:

<table>
  <tr>
    <th class="col-twenty">Nombre del campo</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-fourty">Descripción</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>cadena</td>
    <td>
      Campo <strong></strong>obligatorio que indica en el momento de la inserción la distancia mínima que debe haber entre un anuncio y cualquier otro que ya esté en la página (colocado de forma manual o que haya insertado amp-auto-ads).
      Los valores se expresan como un número junto a una forma abreviada de la unidad correspondiente. Por ejemplo, "10px" quiere decir "10 píxeles", mientras que "0.5vp" representa la mitad de la altura de un viewport. Los valores negativos no son válidos. Las unidades admitidas son:
      <ul>
        <li>px: píxeles</li>
        <li>vp: múltiplo de la altura del viewport</li>
      </ul>
      Este valor solo se aplica cuando el número de anuncios que ya están en la página es inferior al de cualquier coincidencia de <code>adCount</code> que se especifique en el campo subsequentMinSpacing.
    </td>
  </tr>
  <tr>
    <td><code>subsequentMinSpacing</code></td>
    <td>Array&lt;!SubsequentMinSpacingObj&gt;</td>
    <td>
      Campo <em></em>opcional que especifica el espaciado entre anuncios que se debe aplicar en función de la cantidad de anuncios que hay en la página en el momento de la inserción.
    </td>
  </tr>
  <tr>
    <td><code>maxAdCount</code></td>
    <td>número</td>
    <td>
      Campo <strong></strong>obligatorio que especifica el número máximo de anuncios que <code>amp-auto-ads</code> puede hacer que haya en una página. Se cuentan tanto los anuncios colocados manualmente como los que inserta <code>amp-auto-ads</code>.
      Por ejemplo, si este campo se define en 5 y hay 3 anuncios colocados de forma manual en la página, <code>amp-auto-ads</code> colocaría un máximo de 2 anuncios adicionales.
    </td>
  </tr>
</table>

#### SubsequentMinSpacingObj

Campos que se especifican en el objeto de configuración `subsequentMinSpacing`. Las entradas de este objeto`` se pueden utilizar para cambiar el espaciado requerido entre los anuncios adicionales en función del número de anuncios que ya se hayan incluido en la página. Por ejemplo, supongamos que se da la siguiente situación:

* Hay 2 anuncios en la página.
* En el campo subsequentMinSpacing aparece:
<code>
  [
    {adCount: 3, spacing: "500px"},
    {adCount: 5, spacing: "1000px"},
  ]
</code>
```

Al principio, hay 2 anuncios en la página, por lo que no coincide ninguna asignación.
Por lo tanto, se asigna el espaciado mínimo predeterminado, initialMinSpacing, en el objeto `AdConstraints`.
`amp-auto-ads` intentará insertar anuncios hasta que se agoten los emplazamientos disponibles, sin infringir las reglas de `adConstraints`.
Cuando `amp-auto-ads` haya colocado el primer anuncio, habrá 3 anuncios en la página. Dado que en el parámetro `subsequentMinSpacing` hay una asignación de 3 anuncios o más, el espaciado mínimo será de 500 píxeles.
Esto se aplica hasta que hay 5 anuncios en la página, ya que hay una regla para 5 anuncios. Si se insertan 6 o más, el espacio entre anuncios deberá ser de 1000 píxeles como mínimo.

<table>
  <tr>
    <th class="col-twenty">Nombre del campo</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-fourty">Descripción</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>número</td>
    <td>
      Campo obligatorio<strong></strong>
      que indica el número mínimo de anuncios presentes en la página que provoca que se aplique esta regla (si no hay otra regla que tenga prioridad). Para obtener una explicación más detallada, consulta la descripción que aparece más arriba.
    </td>
  </tr>
  <tr>
    <td><code>spacing</code></td>
    <td>cadena</td>
    <td>
      Campo <strong></strong>obligatorio que especifica el espacio entre anuncios mínimo que se aplica cuando se cumple esta regla en función de <code>adCount</code>.
      Los valores se expresan como un número junto a una forma abreviada de la unidad correspondiente. Por ejemplo, "10px" quiere decir "10 píxeles", mientras que "0.5vp" representa la mitad de la altura de un viewport. Los valores negativos no son válidos. Las unidades admitidas son:
      <ul>
        <li>px: píxeles</li>
        <li>vp: múltiplo de la altura del viewport</li>
      </ul>
    </td>
  </tr>
</table>

## Validación

Consulta las [reglas de amp-auto-ads](https://github.com/ampproject/amphtml/blob/main/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii) en la especificación de la herramienta de validación de AMP.

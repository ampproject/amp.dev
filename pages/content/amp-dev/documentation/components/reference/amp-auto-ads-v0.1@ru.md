---
$title: amp-auto-ads
$category@: ads-analytics
teaser:
  text: Динамически размещает объявления на AMP-странице с помощью файла конфигурации с удаленного сервера.
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



Динамически размещает объявления на AMP-странице с помощью файла конфигурации со стороннего сервера.

<table>
  <tr>
    <td class="col-fourty"><strong>Где можно пользоваться функцией</strong></td>
    <td>Экспериментальная функция</td>
  </tr>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td>
    <code>
      &lt;script async custom-element="amp-auto-ads"
      src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">&lt;/script>
    </code>
      </td>
    </tr>
    <tr>
      <td class="col-fourty">
        <strong>
          <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">
            Поддерживаемые макеты
          </a>
        </strong>
      </td>
      <td>–</td>
    </tr>
  </table>



## Принципы работы

При достаточном количестве действительных мест размещения, заданных в конфигурации, компонент `amp-auto-ads` стремится добавить дополнительные объявления, соблюдая ограничения в рекламной сети. Ограничения касаются:

* общего числа объявления, которые можно разместить;
* минимально допустимое расстояние между находящимися рядом объявлениями.

Кроме того, объявления добавляются только в области на странице, которые не приводят с недопустимым исправлениям, определенным в attemptChangeSize.

Тег `<amp-auto-ads>` необходимо разместить в качестве первого дочернего элемента тега `<body>`.

Тип рекламной сети и дополнительные сведения, необходимые для этой сети, указываются в теге.
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">
  </amp-auto-ads>
```

## Поддерживаемые рекламные сети <a name="supported-ad-networks"></a>

* [AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [DoubleClick (эксперимент)](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)

## Атрибуты

<table>
  <tr>
    <td width="40%"><strong>type (обязательно)</strong></td>
    <td>Идентификатор рекламной сети.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>Для большинства рекламных сетей требуются дополнительные параметры конфигурации, которые можно передать в сеть с помощью HTML-атрибутов <code>data-</code>. При этом дефисы из имен параметров удаляются и используется "верблюжья" нотация. Например, параметр data-foo-bar передается как fooBar. <a href="#supported-ad-networks">Подробнее…</a></td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>Этот элемент содержит <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">распространенные атрибуты</a>, которые поддерживаются компонентами AMP.</td>
  </tr>
</table>

## Сведения о конфигурации

В конфигурации определено, в каких областях страницы при помощи компонента `<amp-auto-ads>` можно размещать рекламу. Конфигурация извлекается из сторонней рекламной сети по адресу, заданному в элементе `ad-network-config.js`, и представляет собой сериализованный объект JSON, который соответствует описанному ниже определению [`ConfigObj`](#configobj).

### Пример конфигурации

В приведенном ниже примере объявление должно быть размещено сразу после всех элементов `<P class='paragraph'>`, находящихся в третьем элементе `<DIV id='domId'>` на странице. В этих областях можно размещать только объявления типа "баннер" верхнее и нижнее поля которого составляют 4 и 10 пикселей соответственно.

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

### Определение объектов

#### ConfigObj <a name="configobj"></a>

Ниже перечислены поля, которые следует заполнить в объекте конфигурации.

<table>
  <tr>
    <th class="col-thirty">Название поля</th>
    <th class="col-thirty">Тип</th>
    <th class="col-fourty">Описание</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>Массив &lt;!PlacementObj&gt;</td>
    <td><strong>Обязательное</strong> поле, показывающее, в каких местах на странице можно размещать рекламу.</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Объект &lt;string, string&gt;</td>
    <td><em>Необязательное</em> поле для сопоставления названия и значений атрибута, которые будут применяться ко всем элементам <code>&lt;amp-ad&gt;</code>, добавленным с помощью этой конфигурации. Допускаются только следующие названия атрибутов:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (т. е. любой атрибут данных)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>adConstraints</code></td>
    <td>AdConstraintsObj</td>
    <td>
      <em>Необязательное</em> поле, в котором приведены ограничения, действующие при размещении рекламы на странице. Если поле не заполнено, компонент <code>amp-auto-ads</code> попробует использовать ограничения по умолчанию, заданные в элементе [ad-network-config.js](0.1/ad-network-config.js).
      </td>
    </tr>
  </table>

#### PlacementObj

Ниже перечислены поля, которые следует заполнить в объекте конфигурации `placements`.

<table>
  <tr>
    <th class="col-thirty">Название поля</th>
    <th class="col-thirty">Тип</th>
    <th class="col-fourty">Описание</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td><strong>Обязательное</strong> поле that provides information used to look up the element(s) on the page that the placement position is anchored to.
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td><strong>Обязательное</strong> поле, в котором указана позиция места размещения по отношению к его элементу привязки.</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td><strong>Обязательное</strong> поле, в котором указан тип места размещения.</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td><em>Необязательное</em> поле со стилями, которые следует применить к объявлению, размещенному в этой области места размещения.
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Объект &lt;string, string&gt;</td>
    <td><em>Необязательное</em> поле для сопоставления названия и значения атрибутов, которые будут применяться ко всем элементам <code>&lt;amp-ad&gt;</code>, добавленным с помощью этого места размещения. Указанный здесь атрибут переопределяет любые другие варианты, которые имеют такое же название и также указаны в родительском элементе <code>ConfigObj</code>. Допускаются только следующие названия атрибутов:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (т. е. любой атрибут данных)</li>
      </ul>
    </td>
  </tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

Ниже перечислены поля, которые следует заполнить в объекте конфигурации `anchor`.

<table>
  <tr>
    <th class="col-thirty">Название поля</th>
    <th class="col-thirty">Тип</th>
    <th class="col-fourty">Описание</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>строка</td>
    <td><strong>Обязательное</strong> поле, в котором определен селектор CSS для выбора элементов на этом уровне определения привязки.
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>число</td>
    <td><em>Необязательное</em> поле для указания индекса элементов, выбранных в селекторе, которым должен быть ограничен этот уровень определения привязки. По умолчанию здесь задается значение 0 (если в поле <code>all</code> установлено значение false).</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>логическое значение</td>
    <td>Игнорируется, если заполнено поле <code>index</code>. Если включить нужно все элементы, выбранные в селекторе, здесь задается значение <code>true</code>, в противном случае указывается значение <code>false</code>.
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>число</td>
    <td><em>Необязательное</em> поле, где указывается минимальная длина ресурса элемента textContent, при котором этот ресурс будет включен. Значение по умолчанию – 0.</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>AnchorObj</td>
    <td><em>Необязательное</em> поле, где указывается повторяющийся объект <code>AnchorObj</code>, которые выбирает элементы в рамках любых элементов, заданных на этом уровне определения привязки.
    </td>
  </tr>
</table>

#### PlacementStyleObj <a name="placementstyleobj"></a>

Ниже перечислены поля, которые следует заполнить в объекте конфигурации `style`.

<table>
  <tr>
    <th class="col-twenty">Название поля</th>
    <th class="col-twenty">Тип</th>
    <th class="col-fourty">Описание</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>число</td>
    <td><em>Необязательное</em> поле, где указывается верхнее поле (в пикселях), которое необходимо для объявления, размещенного в этой позиции. Значение по умолчанию – 0.
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>число</td>
    <td><em>Необязательное</em> поле, где указывается нижнее поле (в пикселях), которое необходимо для объявления, размещенного в этой позиции. Значение по умолчанию – 0.
    </td>
  </tr>
</table>

#### RelativePositionEnum <a name="relativepositionenum"></a>

Значения ENUM для поля `pos` в объекте конфигурации `placements`:

<table>
  <tr>
    <th class="col-fourty">Название</th>
    <th class="col-twenty">Значение</th>
    <th class="col-fourty">Описание</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>Объявление должно быть размещено как элемент того же уровня непосредственно перед привязкой.</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>Объявление должно быть размещено как первый дочерний элемент привязки.</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>Объявление должно быть размещено как последний дочерний элемент привязки.</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>Объявление должно быть размещено как элемент того же уровня сразу после привязки.</td>
  </tr>
</table>

#### PlacementTypeEnum <a name="placementtypeenum"></a>

Значения ENUM для поля `type` в объекте конфигурации `placements`:

<table>
  <tr>
    <th class="col-fourty">Название</th>
    <th class="col-twenty">Значение</th>
    <th class="col-fourty">Описание</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>Место размещения, характеризующее позицию баннера.</td>
  </tr>
</table>

#### AdConstraintsObj

Ниже перечислены поля, которые следует заполнить в объекте конфигурации `adConstraints`.

<table>
  <tr>
    <th class="col-twenty">Название поля</th>
    <th class="col-twenty">Тип</th>
    <th class="col-fourty">Описание</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>строка</td>
    <td>
      <strong>Обязательное</strong> поле, где указано минимальное расстояние между объявлением, добавленным вручную или с помощью компонента, и другими рекламными материалами на странице на момент размещения.
          Значения представляют собой число и префикс, обозначающий единицы измерения, например вариант 10px означает 10 пикселей, а 0.5vp – половину высоты области просмотра. Отрицательные значения не допускаются. Поддерживаются следующие единицы:
          <ul>
          <li>px – пиксели;</li>
          <li>vp – доля высоты области просмотра.</li>
        </ul>
        Это значение действует, только если количество объявлений на странице меньше количества в инструменте сравнения <code>adCount</code>, заданном в поле subsequentMinSpacing.
      </td>
    </tr>
    <tr>
      <td><code>subsequentMinSpacing</code></td>
      <td>Массив &lt;!SubsequentMinSpacingObj&gt;</td>
      <td>
        <em>Необязательное</em> поле, где указаны сведения по интервалам между объявлениями, которые могут применяться в зависимости от количества объявлений на странице не момент размещения новых.
        </td>
      </tr>
      <tr>
        <td><code>maxAdCount</code></td>
        <td>число</td>
        <td>
          <strong>Обязательное</strong> поле, где указано максимальное количество объявлений, которое может быть размещено на странице с помощью компонента <code>amp-auto-ads</code>. Это суммарное значение, в котором учитываются объявления, добавленные как вручную, так и с помощью компонента <code>amp-auto-ads</code>.
              Например, если в этом поле задано значение 5, а на странице вручную размещены 3 объявления, то с помощью компонента <code>amp-auto-ads</code> можно добавить не больше 2 объявлений.
            </td>
        </tr>
      </table>

#### SubsequentMinSpacingObj

В этих полях указывается объект конфигурации `subsequentMinSpacing`. Данные в поле `subsequentMinSpacing` позволяют изменять интервалы между дополнительными объявлениями исходя из того, сколько рекламных материалов уже есть на странице. Приведем пример:

* 2 объявления на странице;
* значение в поле subsequentMinSpacing:
<code>
  [
    {adCount: 3, spacing: "500px"},
    {adCount: 5, spacing: "1000px"},
  ]
</code>

На странице размещены 2 объявления, поэтому сопоставление не выполняется.
Значение интервала по умолчанию соответствует варианту initialMinSpacing из объекта `AdConstraints`.
Компонент `amp-auto-ads` будет пробовать размещать объявления, пока не будут израсходованы все места размещения, которые можно использовать, не нарушая условия `adContraints`.
После того как с помощью компонента `amp-auto-ads` размещено первое объявление, количество объявлений на странице достигает трех. Поскольку
в поле `subsequentMinSpacing` задано сопоставление по меньшей мере трех объявлений, в качестве минимального интервала устанавливается значение 500px.
Оно применяется, пока на странице не будут размещены 5 объявлений, так как имеется правило для такого числа объявлений. При добавлении дополнительных объявлений для них будет необходимо соблюдать интервал, составляющий по меньшей мере 1000px.

<table>
  <tr>
    <th class="col-twenty">Название поля</th>
    <th class="col-twenty">Тип</th>
    <th class="col-fourty">Описание</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>число</td>
    <td>
      <strong>Обязательное</strong> поле.
          Минимальное количество объявления, уже размещенных на странице, при котором может применяться определенное правило (при условии отсутствия более подходящего правила). Дополнительные сведения доступны в описании выше.
        </td>
    </tr>
    <tr>
      <td><code>spacing</code></td>
      <td>строка</td>
      <td>
        <strong>Обязательное</strong> поле, где указывается минимальный интервал между объявлениями, который действует, когда выполняется сопоставление с правилом в инструменте <code>adCount</code>.
            Значения представляют собой число и префикс, обозначающий единицы измерения, например вариант 10px означает 10 пикселей, а 0.5vp – половину высоты области просмотра. Отрицательные значения не допускаются. Поддерживаются следующие единицы:
            <ul>
            <li>px – пиксели;</li>
            <li>vp – доля высоты области просмотра.</li>
          </ul>
        </td>
      </tr>
    </table>

## Валидация

С правилами для компонента amp-auto-ads можно ознакомиться в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii).

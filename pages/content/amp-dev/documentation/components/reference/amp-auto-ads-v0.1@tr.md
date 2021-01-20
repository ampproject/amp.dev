---
$title: amp-auto-ads
$category@: ads-analytics
teaser:
  text: Uzaktan sunulan bir yapılandırma dosyası kullanarak reklamları bir AMP sayfasına dinamik şekilde yerleştirir.
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



Uzaktan sunulan bir yapılandırma dosyası kullanarak reklamları bir AMP sayfasına dinamik şekilde yerleştirir.

<table>
  <tr>
    <td class="col-fourty"><strong>Durum</strong></td>
    <td>Deneme</td>
  </tr>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
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
            Desteklenen Düzenler
          </a>
        </strong>
      </td>
      <td>Yok</td>
    </tr>
  </table>



## Davranış

Yeterli sayıda geçerli yerleşim göz önünde bulundurulduğunda (yapılandırmada sağlanır) `amp-auto-ads`, bir yandan reklam ağı tarafından belirtilen kısıtlamalara uyarken diğer yandan ek reklamlar yerleştirmeye çalışır. Bu kısıtlamalar şunları sınırlandırır:

* Eklenebilecek toplam reklam sayısı
* Bitişik reklamlar arasında olması gereken minimum mesafe

Buna ek olarak, reklamlar yalnızca sayfada kabul edilemez yeniden akışa neden olmayacak (attemptChangeSize ile belirlenir) konumlara eklenir.

`<amp-auto-ads>` etiketi, `<body>` öğesinin ilk alt öğesi olarak yerleştirilmelidir.

Reklam ağı türü ve (reklam ağının gerektirdiği) ek bilgiler etikette belirtilmelidir.
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">
  </amp-auto-ads>
```

## Desteklenen reklam ağları <a name="supported-ad-networks"></a>

* [AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [DoubleClick (deneysel)](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)

## Özellikler

<table>
  <tr>
    <td width="40%"><strong>type (zorunlu)</strong></td>
    <td>Reklam ağı için bir tanımlayıcı.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>Çoğu reklam ağı, HTML <code>data-</code> özelliklerini kullanarak ağa geçirilebilecek ek yapılandırma gerektirir. Parametre adlarında, standart veri özelliği çizgisi büyük/küçük harfe dönüştürülür. Örneğin, "data-foo-bar" adı, yapılandırma için reklama "fooBar" olarak gönderilir. Özelliklerin kullanılabileceği <a href="#supported-ad-networks">reklam ağı</a> ile ilgili dokümanlara bakın.</td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>Bu öğe, AMP bileşenlerine genişletilmiş <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">ortak özellikleri</a> içerir.</td>
  </tr>
</table>

## Yapılandırma Spesifikasyonu

Yapılandırma, `<amp-auto-ads>` etiketinin reklamları sayfada yerleştirebileceği yerleri tanımlar. Yapılandırma, `ad-network-config.js` dosyasında tanımlanan URL'deki bir üçüncü taraf reklam ağından getirilir. Yapılandırma, aşağıda açıklanan [`ConfigObj`](#configobj) tanımına uygun serileştirilmiş bir JSON nesnesi olmalıdır.

### Örnek Yapılandırma

Aşağıdaki örnekte, reklamın sayfada üçüncü `<DIV id='domId'>` öğesi içindeki tüm `<P class='paragraph'>` öğelerinden hemen sonra yerleştirilmesi gerektiği belirtilmektedir. Bu konumların herhangi birine yerleştirilen bir reklamın BANNER türünde olması ve 4 piksel üst ve 10 piksel alt kenar boşluğu olması gerekir.

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

### Nesne Tanımları

#### ConfigObj <a name="configobj"></a>

Yapılandırma nesnesinde belirtilecek alanlar:

<table>
  <tr>
    <th class="col-thirty">Alan Adı</th>
    <th class="col-thirty">Tür</th>
    <th class="col-fourty">Açıklama</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>Array&lt;!PlacementObj&gt;</td>
    <td>Sayfada reklamların eklenebileceği potansiyel yerleri belirten <strong>zorunlu</strong> bir alandır.</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>Bu yapılandırma kullanılarak yerleştirilen tüm <code>&lt;amp-ad&gt;</code> öğelerine uygulamak üzere özellik adından özellik değerlerine bir eşleme belirten <em>isteğe bağlı</em> bir alandır. Yalnızca aşağıdaki özellik adlarına izin verilir:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (ör. herhangi bir veri özelliği)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>adConstraints</code></td>
    <td>AdConstraintsObj</td>
    <td>
      Reklamları sayfaya yerleştirirken kullanılması gereken kısıtlamaları belirten <em>isteğe bağlı</em> bir alandır. Belirtilmezse <code>amp-auto-ads</code> etiketi, [ad-network-config.js](0.1/ad-network-config.js) içinde belirtilen varsayılan kısıtlamaları kullanmaya çalışır.
    </td>
  </tr>
</table>

#### PlacementObj

`placements` yapılandırma nesnesinde belirtilecek alanlar:

<table>
  <tr>
    <th class="col-thirty">Alan Adı</th>
    <th class="col-thirty">Tür</th>
    <th class="col-fourty">Açıklama</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td>Yerleşim konumunun bağlantılı olduğu sayfadaki öğeleri aramak için kullanılan bilgileri sağlayan <strong>zorunlu</strong> bir alandır.
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td>Yerleşimin sabit öğesine göre konumunu belirten <strong>zorunlu</strong> bir alandır.</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td>Yerleşim türünü belirten <strong>zorunlu</strong> bir alandır.</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td>Bu yerleşim konumuna eklenen bir reklama uygulanması gereken stilleri belirten <em>isteğe bağlı</em> bir alandır.
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>Bu yerleşim kullanılarak yerleştirilen tüm <code>&lt;amp-ad&gt;</code>  öğelerine uygulanmak üzere özellik adından özellik değerine bir eşleme için <em>isteğe bağlı</em> bir alandır. Burada belirtilen bir özellik, üst <code>ConfigObj</code> nesnesinde de belirtilen aynı adlı diğer özellikleri geçersiz kılar. Yalnızca aşağıdaki özellik adlarına izin verilir:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (ör. herhangi bir veri özelliği)</li>
      </ul>
    </td>
  </tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

`anchor` yapılandırma nesnesinde belirtilecek alanlar:

<table>
  <tr>
    <th class="col-thirty">Alan Adı</th>
    <th class="col-thirty">Tür</th>
    <th class="col-fourty">Açıklama</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>string</td>
    <td>Sabit tanımın bu düzeyindeki öğeleri seçmek için bir CSS seçici tanımlayan <strong>zorunlu</strong> bir alandır.
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>number</td>
    <td>Bu sabit tanım düzeyini sınırlandıracak, seçici tarafından seçilen öğe dizinini belirtmek için kullanılan <em>isteğe bağlı</em> bir alandır. Varsayılan olarak 0 değerine ayarlanır (<code>all</code> alanı false (yanlış) değerine ayarlanmışsa).</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>boolean</td>
    <td><code>index</code> alanı belirtilmişse yoksayılır. <code>true</code> (doğru) değerine ayarlanmışsa seçici tarafından seçilen tüm öğelerin eklenmesi gerektiğini belirtir; aksi takdirde, <code>false</code> (yanlış) değerine ayarlanır.
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>number</td>
    <td>Bir öğenin textContent özelliğinin eklenecek minimum uzunluğunu belirten <em>isteğe bağlı</em> bir alandır. Varsayılan değer 0'dır.</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>AnchorObj</td>
    <td>Bu sabit tanım düzeyinde seçilen öğeler içinden öğeler seçecek yinelemeli bir <code>AnchorObj</code> nesnesinin belirtildiği <em>isteğe bağlı</em> bir alandır.
    </td>
  </tr>
</table>

#### PlacementStyleObj <a name="placementstyleobj"></a>

`style` yapılandırma nesnesinde belirtilecek alanlar:

<table>
  <tr>
    <th class="col-twenty">Alan Adı</th>
    <th class="col-twenty">Tür</th>
    <th class="col-fourty">Açıklama</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>number</td>
    <td>Bu konuma eklenen bir reklamın sahip olması gereken üst kenar boşluğunun piksel cinsinden belirtildiği <em>isteğe bağlı</em> bir alan. Varsayılan değer: 0.
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>number</td>
    <td>Bu konuma eklenen bir reklamın sahip olması gereken alt kenar boşluğunun piksel cinsinden belirtildiği <em>isteğe bağlı</em> bir alan. Varsayılan değer: 0.
    </td>
  </tr>
</table>

#### RelativePositionEnum <a name="relativepositionenum"></a>

`placements` yapılandırma nesnesindeki `pos` alanı için ENUM değerleri:

<table>
  <tr>
    <th class="col-fourty">Ad</th>
    <th class="col-twenty">Değer</th>
    <th class="col-fourty">Açıklama</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>Reklam, sabit öğeden hemen önce eşdüzey öğe olarak eklenmelidir.</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>Reklam, sabit öğenin ilk alt öğesi olarak eklenmelidir.</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>Reklam, sabit öğenin son alt öğesi olarak eklenmelidir.</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>Reklam, sabit öğeden hemen sonra eşdüzey öğe olarak eklenmelidir.</td>
  </tr>
</table>

#### PlacementTypeEnum <a name="placementtypeenum"></a>

`placements` yapılandırma nesnesindeki `type` alanı için ENUM değerleri:

<table>
  <tr>
    <th class="col-fourty">Ad</th>
    <th class="col-twenty">Değer</th>
    <th class="col-fourty">Açıklama</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>Yerleşim, bir banner reklam konumunu tanımlar.</td>
  </tr>
</table>

#### AdConstraintsObj

`adConstraints` yapılandırma nesnesinde belirtilecek alanlar:

<table>
  <tr>
    <th class="col-twenty">Alan Adı</th>
    <th class="col-twenty">Tür</th>
    <th class="col-fourty">Açıklama</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>string</td>
    <td>
      Bir reklamın ekleme sırasında halihazırda sayfada bulunan (manuel olarak veya önceden amp-auto-ads tarafından yerleştirilmiş) diğer reklamlarla aralarında olması gereken minimum mesafeyi gösteren <strong>zorunlu</strong> bir alandır.
      Değerler, bir sayı ve birim öneki şeklinde ifade edilir. Örneğin, "10px", 10 piksel veya "0,5vp", yarım görüntü alanı yüksekliği anlamına gelir. Negatif değerler geçersizdir. Şu birimler desteklenir:
      <ul>
        <li>px - piksel</li>
        <li>vp - görüntü alanı yüksekliğinin katı</li>
      </ul>
      Bu değer yalnızca halihazırda sayfada bulunan reklam sayısı, subsequentMinSpacing alanında belirtilen <code>adCount</code> eşleyicisinden daha az olduğunda uygulanır.
    </td>
  </tr>
  <tr>
    <td><code>subsequentMinSpacing</code></td>
    <td>Array&lt;!SubsequentMinSpacingObj&gt;</td>
    <td>
      Ekleme sırasında halihazırda sayfada bulunan reklam sayısına dayalı olarak uygulanması gereken reklam aralıklarını belirten <em>isteğe bağlı</em> bir alandır.
    </td>
  </tr>
  <tr>
    <td><code>maxAdCount</code></td>
    <td>number</td>
    <td>
      <code>amp-auto-ads</code> etiketinin sayfada yer almasına neden olabileceği maksimum reklam sayısını belirten <strong>zorunlu</strong> bir alandır. Hem manuel olarak yerleştirilmiş reklamlar hem de <code>amp-auto-ads</code> tarafından yerleştirilenler bu toplama dahil edilir.
          Örneğin, bu alan 5 değerine ayarlandıysa ve sayfada manuel olarak yerleştirilmiş 3 reklam bulunuyorsa <code>amp-auto-ads</code>, en fazla 2 reklam daha yerleştirebilir.
        </td>
    </tr>
  </table>

#### SubsequentMinSpacingObj

`subsequentMinSpacing` yapılandırma nesnesinde belirtilecek alanlar. `subsequentMinSpacing` girişleri, halihazırda sayfada bulunan reklamların sayısına dayalı olarak ilave reklamlar arasında bulunması gereken aralıkları değiştirmek için kullanılabilir. Örneğin, aşağıdaki senaryoyu inceleyin:

* Sayfada 2 reklam vardır
* subsequentMinSpacing alanı şöyledir:
<code>
  [
    {adCount: 3, spacing: "500px"},
    {adCount: 5, spacing: "1000px"},
  ]
</code>

Başlangıçta, sayfada 2 reklam olduğundan herhangi bir eşleme gerçekleşmez.
Dolayısıyla, minimum aralık varsayılan olarak `AdConstraints` nesnesindeki initialMinSpacing değerine ayarlanır.
`amp-auto-ads`, `adConstraints` kısıtlamasını bozmadan kullanabileceği yerleşimler tükeninceye kadar tekrarlanan bir şekilde reklam yerleştirmeyi dener.
`amp-auto-ads` ilk reklamını yerleştirdikten sonra sayfada artık 3 reklam vardır. `subsequentMinSpacing` alanında 3 (veya daha fazla) reklam için bir eşleme olduğundan minimum aralık şimdi 500 px olur.
5. reklam için bir kural olduğundan, bu durum sayfada 5 reklam yer alıncaya kadar uygulanır. 6. ve sonraki reklamların eklenmesi için eklenen reklamın, diğer reklamlardan en az 1.000 px uzakta olması gerekir.

<table>
  <tr>
    <th class="col-twenty">Alan Adı</th>
    <th class="col-twenty">Tür</th>
    <th class="col-fourty">Açıklama</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>number</td>
    <td>
      <strong>Zorunlu</strong> bir alandır.
          Bu kuralın uygulanmasına (başka hiçbir kuralın daha iyi eşleşmediği varsayıldığında) neden olan, halihazırda bu sayfada bulunan minimum reklam sayısı. Daha ayrıntılı bilgi için yukarıdaki açıklamaya bakın.
        </td>
    </tr>
    <tr>
      <td><code>spacing</code></td>
      <td>string</td>
      <td>
        Bu kural, <code>adCount</code> alanına dayalı olarak eşleştirildiğinde uygulanacak minimum reklam aralığını belirten <strong>zorunlu</strong> bir alandır.
        Değerler, bir sayı ve birim öneki şeklinde ifade edilir. Örneğin, "10px", 10 piksel veya "0,5vp", yarım görüntü alanı yüksekliği anlamına gelir. Negatif değerler geçersizdir. Şu birimler desteklenir:
        <ul>
          <li>px - piksel</li>
          <li>vp - görüntü alanı yüksekliğinin katı</li>
        </ul>
      </td>
    </tr>
  </table>

## Doğrulama

AMP doğrulayıcı spesifikasyonundaki [amp-auto-ads kurallarına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii) bakın.

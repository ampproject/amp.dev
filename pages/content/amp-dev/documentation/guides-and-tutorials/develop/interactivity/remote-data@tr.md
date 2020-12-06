---
"$title": Uzak veri ile çalışma
"$order": '3'
description: "Bağlanabilir verileriniz sayfa yüklendiğinde almak için çok büyük veya karmaşıksa ne olur? Ya da her SKU'nun bakmak için uzun zaman alan bir fiyatı varsa ne olur?"
toc: 'true'
---

Bağlanabilir verileriniz sayfa yüklendiğinde almak için çok büyük veya karmaşıksa ne olur? Ya da her SKU'nun bakmak için uzun zaman alan bir fiyatı varsa ne olur? Görüntülenmeyen ürünler için SKU'ların fiyatlarının araştırılması boşa giden bir iştir.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), JSON'u bir CORS uç noktasından getiren <a><code>src</code></a> özniteliği aracılığıyla uzak veri getirmeyi destekler. Bu getirme, bir kez ve sayfa yüklendiğinde gerçekleştirilir ve verilerin tazeliğini sağlamak için kullanışlıdır (özellikle önbellekten sunulduğunda).

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) öğesi için `src` özniteliğini de bağlayabilirsiniz. Bu, bir kullanıcı eyleminin sayfanın bağlanabilir durumuna uzak JSON verilerinin getirilmesini tetikleyebileceği anlamına gelir.

[/tip]

## Bir gömlek için mevcut boyutları getirme

Örneğimizdeki SKU'ların fiyatlarını aramak için uzak verileri alma yeteneğinden yararlanalım. `app.js`'deki Express.js geliştirme sunucumuzda, bir gömlek SKU'su verildiğinde, her beden için mevcut boyutları ve fiyatı döndüren bir `/shirts/sizesAndPrices?shirt=<sku>` uç noktası vardır. Ağ gecikmesini simüle etmek için yanıtı bir saniyelik yapay bir gecikmeyle gönderir.

İstek | Yanıt
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) öğelerindeki JSON verilerine benzer şekilde, bu getirilerden döndürülen uzak veriler birleştirilir ve öğenin `id` özniteliği altında kullanılabilir. Örneğin, yukarıdaki örnek yanıttan döndürülen verilere bir ifadede erişilebilir:

İfade | Sonuç
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### Verileri bağlama

Şimdi, bunu e-ticaret örneğimize uygulayalım. İlk önce yeni bir SKU seçildiğinde bu gömlek verilerini alalım. `amp-state#shirts` öğemize `[src]` bağlaması ekleyin:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Mevcut olmayan bedenleri belirtme

Ardından, belirli bir SKU için mevcut olmayan boyutları açıkça işaretleyelim. `"unavailable"` CSS sınıfı, bir öğe aracılığıyla diyagonal bir çizgi ekler. Bunu, kullanılamayan boyutlara karşılık gelen [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) içindeki öğelere ekleyebiliriz:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Şimdi sayfayı yeniden yükleyin ve deneyin. Yeni bir SKU (gömlek rengi) seçmek, mevcut olmayan bedenlerin üstünün çizilmesine neden olur (kısa bir gecikmeden sonra).

### Başlangıç durumlarını belirtme

Yine de küçük bir sorun var. Peki ya siyah gömlek, varsayılan seçilmiş renkse ne olacak? Siyah gömleğin boyut ve fiyat verilerini `amp-state#shirts` eklememiz gerekecek. Çünkü [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) sadece açık kullanıcı eylemine yanıt olarak çalışır:

```html
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg",
        "sizes": {
          "XS": 8.99,
          "S": 9.99
        }
      },
<!-- ... -->
```

Ayrıca ilgili öğelerin varsayılan durumunu güncellememiz gerekecek:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Add the 'unavailable' class to the next three <td> elements
           to be consistent with the available sizes of the default SKU. -->
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

[tip type="note"] **NOT –**  [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) yalnızca açık kullanıcı eylemine yanıt olarak sayfa yüklemede çalışmaz. Bu, ilk sayfa yüklemesinin, [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) kullanımından bağımsız olarak sayfalar arasında sürekli olarak hızlı olmasını sağlar. [/tip]

## Değişken gömlek fiyatları

Artık mevcut boyutları doğru bir şekilde görüntülediğimize göre, doğru fiyatın da görüntülendiğinden emin olalım.

AMPPAREL mağazamız, gömlek fiyatının hem renge hem de bedene özgü olması açısından kendine özgüdür. Bu, kullanıcı tarafından seçilen boyutu izlemek için yeni bir değişkene ihtiyacımız olduğu anlamına gelir. [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) beden öğemize yeni bir eylem ekleyelim:

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

`selectedSize` değerini `amp-state#selected` öğesi aracılığıyla başlatmadığımıza dikkat edin. Bunun nedeni, kasıtlı olarak varsayılan olarak seçilen bir boyut sağlamamamız ve bunun yerine kullanıcıyı bir boyut seçmeye zorlamak istememizdir.

[tip type="tip"] **İPUCU –** `AMP.setState()`, mevcut değişkenleri değiştirmenin yanı sıra yeni değişkenleri tanımlamak için de kullanılabilir. İfadeler tanımlanmamış değişkenleri `null` olarak değerlendirecektir. [/tip]

Fiyat etiketini saran yeni bir `<span>` öğesi ekleyin ve varsayılan boyut seçimi olmadığından varsayılan metni "---" olarak değiştirin.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

Ve doğru fiyatlarımız var! Deneyin.

## Koşullu olarak etkinleştirilmiş düğme

İşimiz neredeyse bitti! Seçilen beden mevcut olmadığında "Sepete ekle" düğmesini devre dışı bırakalım:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Deneyin**:  Stokta olmayan bir beden seçerseniz, sepete ekleyemezsiniz.

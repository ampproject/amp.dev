---
"$title": العمل مع البيانات عن بُعد
"$order": '3'
description: ماذا لو كانت بياناتك القابلة للربط كبيرة جدًا أو مركَّبة بحيث يتعذر استردادها عند تحميل الصفحة؟ أو ماذا لو كان لكل وحدة حفظ مخزون سعر يستغرق ...
toc: 'true'
---

ماذا لو كانت بياناتك القابلة للربط كبيرة جدًا أو مركَّبة بحيث يتعذر استردادها عند تحميل الصفحة؟ أو ماذا لو كان لكل وحدة حفظ مخزون سعر يستغرق وقتًا طويلًا للبحث عنه؟ حيث يُعد البحث عن الأسعار لوحدات حفظ المخزون للعناصر غير المرئية عملًا مهدرًا.

[tip type="success"]

يدعم [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) إحضار البيانات عن بُعد عبر سمة [`src`](../../../../documentation/components/reference/amp-bind.md#attributes)الخاصة بها، حيث يحضر JSON من نقطة نهاية CORS. ويتم تنفيذ عملية الإحضار هذه مرة واحدة وعند تحميل الصفحة، وهو مفيد لضمان حداثة البيانات (خاصة عند عرضها من ذاكرة تخزين مؤقت).

ويمكنك أيضًا ربط السمة `src` بالمكون [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state). وهذا يعني أن بإمكان إجراء المستخدم تشغيل عملية إحضار بيانات JSON إلى الحالة القابلة للربط الخاصة بالصفحة.

[/tip]

## إحضار المقاسات المتوفرة لقميص

لنستفد من إمكانية إحضار بيانات عن بًعد للبحث عن أسعار وحدات حفظ المخزون في النموذج لدينا. يحتوي خادم التطوير Express.js لدينا الموجود في `app.js` على نقطة نهاية بالفعل `/shirts/sizesAndPrices?shirt=<sku>` والتي، بالنظر إلى وحدة حفظ مخزون القميص، تقوم بإرجاع المقاسات المتوفرة وسعر كل مقاس. وترسل الاستجابة بتأخير اصطناعي يبلغ ثانية واحدة لمحاكاة زمن انتقال الشبكة.

طلب | استجابة
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

وعلى نحو مماثل لبيانات JSON ضمن المكون [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state)، يتم دمج البيانات البعيدة التي تم إرجاعها من عمليات الإحضار هذه وإتاحتها ضمن السمات `id` الخاصة بالمكون. على سبيل المثال، يمكن الوصول إلى البيانات التي تم إرجاعها من مثال الرد أعلاه في تعبير:

تعبير | نتيجة
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### ربط البيانات

والآن، لنطبق هذا الأمر على مثال التجارة الإلكترونية لدينا، أولًا، نقوم بإحضار بيانات هذا القميص عند تحديد وحدة حفظ المخزون. أضف `[src]` ربط للعنصر `amp-state#shirts`:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### الإشارة إلى المقاسات غير المتوفرة

وبعد ذلك، لنضع وسمًا واضحًا على المقاسات غير المتوفرة على هذا النحو لوحدة حفظ مخزون معينة. وتضيف فئة CSS `"unavailable"` خطًا قطريًا عبر عنصر ما -- يمكننا إضافته إلى العناصر الموجودة ضمن [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) المقابلة للمقاسات غير المتوفرة:

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

والآن، أعد تحميل الصفحة وجربها. سيؤدي تحديد وحدة حفظ المخزون (لون القميص) الجديدة إلى شطب المقاسات غير المتوفرة (بعد مهلة قصيرة).

### تحديد الحالات الأولية

هناك مشكلة صغيرة على الرغم من ذلك -- ماذا عن القميص أسود اللون، لون المحدد الافتراضي؟ سنحتاج إلى إضافة بيانات المقاس والسعر للقميص الأسود إلى `amp-state#shirts` نظرًا لأن [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) يعمل فقط استجابة لإجراء المستخدم الصريح:

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

وسنحتاج إلى تحديث الحالة الافتراضية للعناصر ذات الصلة:

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

[tip type="note"] **ملحوظة –** لا يعمل [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) عند تحميل الصفحة -- يعمل فقط استجابة لإجراء المستخدم. وهذا يضمن تحميل الصفحة الأولي بسرعة ثابتة عبر كل الصفحات بصرف النظر عن استخدام [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

## أسعار القميص المتغيرة

الآن بعد أن عرضنا المقاسات المتوفرة على نحو صحيح، دعنا نتأكد أيضًا من عرض السعر الصحيح.

يتميز متجر AMPPAREL لدينا في كون سعر هذا القميص محددًا من حيث اللون والمقاس. وهذا يعني أننا بحاجة إلى متغير جديد لتتبع المقاس المحدد بواسطة المستخدم. أضف إجراءً جديدًا لعنصر المقاس لدينا [`amp-selector`](../../../../documentation/components/reference/amp-selector.md):

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

لاحظ أننا لا نقوم بتهيئة قيمة العنصر `selectedSize` via the `amp-state#selected`. وهذا لأننا لا نقدم عن قصد مقاسًا محددًا افتراضيًا ونرغب بدلًا عن ذلك في إلزام المستخدم باختيار مقاس.

[tip type="tip"] **تلميح –** يمكن استخدام `AMP.setState()` لتحديد المتغيرات الجديدة بالإضافة إلى تعديل تلك الموجودة مسبقًا. وستقوم التعبيرات بتقييم المتغيرات غير المحددة إلى `null`. [/tip]

أضف عنصر `<span>` جديدًا من شأنه العمل على التفاف ملصق السعر وتغيير النص الافتراضي إلى "---" نظرًا لعدم وجود تحديد سعر افتراضي.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

والآن أصبح لدينا أسعار صحيحة! جرِّبها.

## زر ممكَّن على نحو مشروط

نحن على وشك الانتهاء! دعنا نعطل زر "إضافة إلى عربة التسوق" عندما يكون المقاس المحدد غير متوفر:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**جرِّبه**:  إذا حددت مقاسًا غير متوفر، فلا يمكنك إضافته إلى عربة التسوق.

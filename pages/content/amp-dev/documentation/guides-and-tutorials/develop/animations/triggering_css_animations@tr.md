---
'$title': CSS animasyonlarını ve geçişlerini tetikleme
$order: 1
description: CSS animasyonları, web öğelerinin bir CSS stili yapılandırmasından diğerine geçmesine izin verir. Tarayıcı, yükleme sırasında belirli animasyonları başlatabilir.
formats:
  - websites
  - ads
---

CSS animasyonları, web öğelerinin bir CSS stili yapılandırmasından diğerine geçmesine izin verir. Tarayıcı, yükleme sırasında belirli animasyonları başlatabilir. Ancak olay tetiklenen CSS animasyonları [sınıflarının eklenmesine ve kaldırılmasına](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) dayanır. AMP her iki animasyon türünü de destekler.

Kesin olarak zamanlanması gerekmeyen daha küçük, kapsayıcı bir animasyonunuz olduğunda CSS kullanın.

## CSS ve anahtar kareleri tanımlama

CSS'i AMP'de aşağıdaki şekillerde tanımlayabilirsiniz:

[filter formats="websites, stories"]

- Belgenin başlığının içindeki `<style amp-custom>` etiketi içinde. 75.000 bayt sınır.
- Satır içi stiller. Bir satır içi stilin her örneğinin 1.000 bayt sınırı vardır. Satır içi stiller 75.000 bayt `<style amp-custom>` sınırına dahil edilir.
- Belgenin başlığının içindeki `<style amp-keyframes>` etiketinin içinde. 500.000 bayt sınır. Anahtar kare özellikleri ile sınırlıdır.

[/filter]

[filter formats="ads"]

- Belgenin başlığının içindeki `<style amp-custom>` etiketinin içinde. 20.000 bayt sınır.
- Satır içi stiller. Bir satır içi stilin her örneğinin 1.000 bayt sınırı vardır. Satır içi stiller 20.000 bayt `<style amp-custom>` sınırına dahil edilir.
- Belgenin başlığının içindeki `<style amp-keyframes>` etiketi içinde. 500.000 bayt sınır. Anahtar kare özellikleriyle sınırlıdır.

[/filter]

[tip type="read-on"] AMP'de CSS kullanma hakkında [Stil ve düzen](../style_and_layout/index.md) bölümünden daha fazla bilgi edinin. [/tip]

[filter formats="websites, stories"] Sayfalarınızın düşük ve hızlı olmasını sağlamak için AMP, `<amp style-custom>` etiketinde 75.000 baytlık bir CSS sınırı uyguladı. Bunu, animasyon stillerini tanımlamak için kullanabilirsiniz, ancak `<amp style-keyframes>` etiketinin içindeki 500.000 bayt sınırı, değerli site stili kaynaklarını ortadan kaldırmayan daha ayrıntılı animasyonlara olanak tanır. [/filter]

[filter formats="ads"] Reklamlarınızın düşük ve hızlı olmasını sağlamak için AMP, `<amp style-custom>` etiketinde 20.000 baytlık bir CSS sınırı uyguladı. Bunu, animasyon stillerini tanımlamak için kullanabilirsiniz, ancak `<amp style-keyframes>` etiketinin içindeki 500.000 bayt sınırı, değerli site stili kaynaklarını ortadan kaldırmayan daha ayrıntılı animasyonlara olanak tanır. [/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## Sınıfları ekleme, kaldırma ve değiştirme

AMP eylemi `toggleClass`, tanımlanmış öğelere sınıfların eklenmesini ve kaldırılmasını sağlar.

```js
elementName.toggleClass(class="className")
```

Animasyonlu hamburger menüsü gibi, kullanıcıların etkileşimde bulunmasını istediğiniz aynı öğe üzerinde bir sınıfı açıp kapatabilirsiniz.

```html
<div
  id="hamburger"
  tabindex="1"
  role="button"
  on="tap:hamburger.toggleClass(class='close')"
></div>
```

`toggleClass` eylemi diğer öğelere de uygulanabilir ve `force` özniteliğini ekleyerek iki sınıf arasında geçiş yapabilir.

```html
<button
  on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)"
>
  Disappear
</button>
<button
  on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)"
>
  Reappear
</button>
```

Bir sınıfı kaldırmanız ve yeniden uygulamaya izin vermemeniz gerekiyorsa, `force` özniteliğine `false` değerini ekleyin. Bir sınıf eklemeniz ve kaldırmaya izin vermemeniz gerekiyorsa, `true` değeriyle `force` ekleyin.

## CSS ve state ile canlandırma

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) kullanarak durumlarla istediğiniz sayıda CSS sınıfı ekleyebilir ve kaldırabilirsiniz.

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-bind"
    src="https://ampjs.org/v0/amp-bind-0.1.js"
  ></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px);
    }
    .right {
      transform: translatex(50px);
    }
    button {
      margin-top: 1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"></div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
</body>
```

[/example]

Önce belgenin <code>head</code> bölümündeki `<style amp-custom>` etiketine CSS sınıflarının bir listesini ekleyerek birden fazla sınıf animasyonu tanımlayın:

```css
.visible {
  opacity: 1;
}
.invisible {
  opacity: 0;
}
.left {
  transform: translatex(-50px);
}
.right {
  transform: translatex(50px);
}
```

Ardından her sınıfı bir durum ile eşleştirin:

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

Ve öğeyi sınıflarla ilişkilendirin:

```html
<div [class]="magicBox[animateBox].className"></div>
```

Durumlar, bağlantılı bir AMP eylemi veya olayından değişir. Aşağıdaki örnek, durumu kullanıcı etkileşiminden değiştirir:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
```

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md)'i bu şekilde kullanmak, sınıfı açıkça tanımlanmış sınıfa ayarlar. Diğer sınıfları kaldırmasını söylemenize gerek kalmayacak.

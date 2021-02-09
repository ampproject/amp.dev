---
'$title': Sitenizde gezinme
$order: 5
description: Çoğu mobil web sitesi bir site gezinme menüsü içerir. Bu menüler çok farklı şekillerde olabilir. Bu öğreticide, AMP sayfalarında gezinme sunmak için aşağıdaki örnekleri deneyeceğiz.
---

Çoğu mobil web sitesi bir site gezinme menüsü içerir. Bu menüler çok farklı şekillerde olabilir. Bu öğreticide, AMP sayfalarında gezinme sunmak için aşağıdaki örnekleri deneyeceğiz:

- Ana sayfanıza geri dönen bir bağlantı - en basit seçenek.
- [`amp-<br>sidebar`](../../../../documentation/components/reference/amp-sidebar.md) bileşenini kullanarak bir yan gezinme çubuğu.

## Ana sayfaya geri bağlantı

Kullanıcılarınızın web sitenizin normal gezinme seçeneklerine erişmesini sağlamanın en kolay yolu, onları ana sayfanıza geri döndürmektir!

`<header>` etiketinizi bir bağlantı içeren bu sürümle **değiştirmeyi** deneyin:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img
      class="home-button"
      src="icons/home.png"
      width="36"
      height="36"
    ></amp-img>
  </a>
  <div class="site-name">News Site</div>
</header>
```

Ve bu stil kurallarını satır içi CSS'nize **ekleyin**:

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

Şimdi sayfayı **yenileyin**. Sayfanın sol üst köşesinde `homepage.html`'ye işaret eden bir bağlantı görmelisiniz. Ana sayfa simgesini tıklarsanız, bunun hiçbir yere götürmediğini hemen fark edeceksiniz (çünkü bir `homepage.html` dosyamız yok).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Home icon navigation') }}

Bu bağlantı, kullanıcılarınızın mevcut web sitenizin gezinme menüsü aracılığıyla sitenizin diğer bölümlerine gezinmesine izin vermek için web sitenizin ana sayfasının URL'si ile değiştirilebilir.

Bu, mevcut web sitesi gezinme menüsünü kullanan en basit yaklaşımdır. Ardından, sitede gezinmek için popüler bir seçenek keşfedeceğiz.

## Bir kenar çubuğu ile gezinme

Yaygın bir gezinme tekniği, tıklandığında bir dizi gezinme bağlantısını (sayfanın yanından) gösteren bir menü simgesi eklemektir. AMP'de, [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) bileşenini kullanarak böyle bir gezinme menüsü oluşturabiliriz.

İlk olarak, [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) bileşeninin Javascript'ini `<head>` etiketine **eklemeliyiz**:

```html
<script
  async
  custom-element="amp-sidebar"
  src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
></script>
```

Ardından, bir menü simgesi görüntülemek istiyoruz. Simgeye dokunulduğunda, kenar çubuğu açılır. Ev simgesi yerine ["hamburger"](https://en.wikipedia.org/wiki/Hamburger_button) simgesini görüntülemek için `<header>` öğesini aşağıdaki kodla **değiştirin**:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">
    ☰
  </div>
  <div class="site-name">News Site</div>
</header>
```

Yukarıdaki kodda, `sidebar1` kimliği ile tanımlanan [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) öğesindeki [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) action özniteliği aracılığıyla kenar çubuğunu `toggle` ediyoruz. Kenar çubuğunu ekleyelim.

Aşağıdaki HTML'yi `</header>` öğesinden hemen sonra **ekleyin**:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div
    role="button"
    aria-label="close sidebar"
    on="tap:sidebar1.toggle"
    tabindex="0"
    class="close-sidebar"
  >
    ✕
  </div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

Kenar çubuğumuz gizlenecek, ancak kullanıcı hamburger simgesine dokunduğunda, ekranın sol tarafında bir menü görünecektir. Menüyü kapatmak için kullanıcı X simgesine dokunabilir.

Son olarak, bu stil kurallarını satır içi CSS'nize **ekleyin**:

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom: 10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Tamam, kenar çubuğumuza bakalım. AMP sayfanızı **yenileyin** ve yeniden yükleyin. Böyle bir şey görmelisin:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Sidebar menu navigation') }}

Sayfamız harika görünüyor! Son bir dokunuş ekleyelim: Özel bir yazı tipi.

---
'$title': Yer tutucular ve yedekler
$order: 3
descriptions: "In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible."
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible.

Hatta bazı öğeler, kısıtlamaları gevşeterek bunu yaptığınız için sizi ödüllendirecektir - örneğin, [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder) için bir yer tutucu sağlarsanız, sayfanın üst kısmına yakın bir yerde kullanılabilir olacaktır (bu olmadan çalışmaz).

## Yer tutucular

`placeholder` özniteliğiyle işaretlenen öğe, üst AMP öğesi için bir yer tutucu görevi görür. Bir `placeholder` öğesi, belirtildiği takdirde, AMP öğesinin doğrudan alt öğesi olmalıdır. `placeholder` olarak işaretlenen bir öğe, her zaman üst AMP öğesini `fill` eder (doldurur).

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300"
>
  <amp-img
    placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill"
  >
  </amp-img>
</amp-anim>
```

[/example]

Varsayılan olarak yer tutucu, AMP öğesinin kaynakları indirilmemiş veya başlatılmamış olsa bile AMP öğesi için hemen gösterilir. AMP öğesi hazır olduğunda genellikle yer tutucusunu gizler ve içeriği gösterir.

[tip type="note"] **NOT -** Yer tutucunun bir AMP öğesi olması gerekmez; herhangi bir HTML öğesi yer tutucu görevi görebilir. [/tip]

## Yedekler <a name="fallbacks"></a>

Şu durumlarda yedekleme davranışını belirtmek için bir `fallback` özniteliği belirtebilirsiniz:

- tarayıcının desteklemediği herhangi bir öğe için
- içerik yüklenemezse (örneğin, Tweet silinmişse)
- görüntü türü desteklenmiyorsa (örneğin, WebP tüm tarayıcılarda desteklenmiyor)

`fallback` özniteliğini yalnızca AMP öğelerinde değil, _herhangi bir_ HTML öğesinde de ayarlayabilirsiniz. `fallback` öğesi belirtilirse, AMP öğesinin doğrudan alt öğesi olmalıdır.

##### Örnek: Desteklenmeyen özellik

Aşağıdaki örnekte, tarayıcının belirli bir özelliği desteklemediğini kullanıcıya bildirmek için `fallback` özniteliğini kullanıyoruz:

[example preview="inline" playground="true" imports="amp-video:0.1"]

```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

[/example]

##### Örnek: Farklı görüntü biçimleri sunun

Aşağıdaki örnekte, tarayıcıya WebP biçimi desteklenmiyorsa JPEG dosyasını kullanmasını söylemek için `fallback` özniteliğini kullanıyoruz.

[example preview="inline" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

## Yer tutucuların ve yedeklerin etkileşimi

Dinamik içeriğe (ör. [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) , [`amp-list`](../../../../documentation/components/reference/amp-list.md)) dayanan AMP bileşenleri için, yedeklerin ve yer tutucuların etkileşimi şu şekilde çalışır:

<ol>
  <li>İçerik yüklenirken yer tutucuyu görüntüleyin.</li>
  <li>İçerik başarıyla yüklenirse, yer tutucuyu gizleyin ve içeriği görüntüleyin.</li>
  <li>İçerik yüklenemezse: <ol>
<li> Bir yedek öğe varsa, yedeği görüntüleyin. </li>
<li>Aksi takdirde, yer tutucuyu görüntülemeye devam edin.</li>
</ol>
</li>
</ol>

## Yükleme göstergelerini gizleme

Birçok AMP öğesinin, öğenin henüz tam olarak yüklenmediğini gösteren temel bir animasyon olan bir "yükleme göstergesi" göstermesine izin verilir. Öğeler, `noloading` özniteliği ekleyerek bu davranışı devre dışı bırakabilir.

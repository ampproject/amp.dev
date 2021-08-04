---
'$title': Daha fazla sayfa ekleme
$order: 5
description: Artık bir Web Hikayesine sayfa eklemeye aşina olduğunuza göre, "The Joy of Pets" hikayemize sonraki sayfaları benzer şekilde ekleyebilirsiniz.
author: bpaduch
---

Artık bir Web Hikayesine sayfa eklemeye aşina olduğunuza göre, "The Joy of Pets" hikayemize sonraki sayfaları eklemek benzer bir şekilde olacaktır. Aşağıda verilen bilgilere göre şu ana kadar öğrendiklerinizi kullanarak **devam edin ve kalan sayfaları oluşturun**. Takılırsanız, tamamlanmış koda (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>) bakın.

[tip type="tip"] **İPUCU –** Her sayfanın benzersiz bir "id" özniteliği (örneğin, `id="page1"`) alması gerektiğini unutmayın. [/tip]

## 1. Sayfa: Kediler

Tek bir katmanda bir görüntünün ve metnin nasıl görüntüleneceğini gösterir.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>1 katman içerir:       <ul>         <li> <a href="create_cover_page.md#vertical"><code>vertical</code></a> şablonunu uygular.</li>         <li>3 öğe içerir:           <ul>             <li>Bir <code><h1></code> öğesi ve şu başlık: <em>Cats</em> </li>             <li>Duyarlı bir <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">cat.jpg</code>, 720 x 1280px)</li>             <li>Aşağıdaki alıntı için <code><q></code>: <em>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## 2. Sayfa: Köpekler

Metnin nasıl düzenleneceğini ve iki katmanla ekran dolduran bir görüntünün nasıl görüntüleneceğini gösterir.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>2 katman içerir:       <ul>         <li> <b>1. Katman</b>: <a href="create_cover_page.md#fill"><code>fill</code></a> şablonunu uygular ve duyarlı bir <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">dog.jpg</code>, 720 x 1280px) içerir.</li>         <li> <b>2. katman</b>:  <a href="create_cover_page.md#thirds"><code>thirds</code></a> şablonu uygular ve 2 öğe içerir:           <ul>             <li>Bir <code><h1></code> öğesi ve şu başlık: <em>Dogs</em> </li>             <li>Bir <code><p></code> öğesi; bu öğe bir <a href="create_cover_page.md#thirds"><code>grid-area</code></a> belirtir, bu alan <a href="create_cover_page.md#thirds"><code>lower-third</code></a> bölümünü kaplar ve aşağıdaki metni içerir: <em>Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## Sayfa 3. Kuşlar

Metnin nasıl düzenleneceğini, ekranı dolduran bir resmin nasıl görüntüleneceğini ve sayfa için arka plan sesinin nasıl sağlanacağını gösterir.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>3 katman içerir:       <ul>         <li> <b>1. Katman</b>: <a href="create_cover_page.md#fill"><code>fill</code></a> şablonunu uygular ve duyarlı bir <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">bird.jpg</code>, 720 x 1280px) içerir.</li>         <li> <b>2. Katman</b>  <a href="create_cover_page.md#vertical"><code>vertical</code></a> şablonunu uygular ve bir öğe içerir:           <ul>             <li>Bir <code><h1></code> öğesi ve şu başlık:<em>Birds</em> </li>           </ul>         </li>         <li> <b>3. Katman</b>:  <a href="create_cover_page.md#vertical"><code>vertical</code></a> şablonu uygular ve şu öğeyi içerir:           <ul>             <li>Aşağıdaki alıntı için <code><q></code> öğesi: <em>A bird is three things: Feathers, flight and song, And feathers are the least of these.--Marjorie Allen Seiffert</em> </li>             <li>Bu üçüncü katman, alt öğeleri ekranın altına hizalamak için <code>class="bottom"</code> özniteliğini belirtir.</li>           </ul>         </li>       </ul>
</li>
      <li>Sayfa görüntülenirken arka planda bir ses dosyası çalar. Hikayenin tamamı veya tek bir sayfa için arka planda ses çalabilirsiniz. Bir sayfada ses çalmak için <code>background-audio="assets/bird-singing.mp3"</code> özniteliğini <code>&lt;amp-story-page></code> öğesine ekleyin.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## 4. Sayfa: Tavşanlar

Sayfa için metnin nasıl düzenleneceğini ve ekran dolduran bir videonun nasıl görüntüleneceğini gösterir.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>3 katman içerir:       <ul>         <li> <b>1. Katman</b>:<code>fill</code> şablonu uygular ve duyarlı bir <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> (<code class="filename">rabbit.mp4</code> içerir).           <ul>             <li>Videonun görünmesi için <code></code> bölümünüzde <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> bileşeni için <strong>zorunlu betiği </strong> eklemeyi unutmayın.</li>
<br>             <li>Bir <code>poster</code> resmi (<code class="filename">rabbit.jpg</code>) belirtin. Bu öznitelik geçerli AMP hikayeleri için <strong>zorunludur</strong>.</li>             <br><li>Videonun <code>autoplay</code> özniteliğinde otomatik olarak oynatılacak şekilde ayarlayın. Bu öznitelik geçerli AMP hikayeleri için <strong>zorunludur</strong>.</li>             <br><li>Videoyu <code>loop</code> özniteliğiyle otomatik olarak döngü yapacak şekilde ayarlayın.</li>             <br><li>Boyutları şu şekilde ayarlayın: <code>width="720"</code> <code>height="1280"</code> ve <code>layout="responsive"</code>.</li>           </ul> </li>
<br>         <li> <b>2. Katman</b> <code>vertical</code> şablonunu uygular ve bir öğe içerir:           <ul>             <br><li>Bir <code><h1></code> öğesi ve şu başlık: <em>Rabbits</em> </li>           </ul>
<br>         </li>         <li> <br><b>3. Katman</b>: <code>vertical</code> şablonunu uygular ve bir öğe içerir:           <ul>             <br><li>Bir <code><p></code> öğesi; bu öğe aşağıdaki metni içerir: <em>Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful</em>.</li>            <br><li>Alt öğeleri ekranın altına hizalamak için <code>bottom</code> CSS sınıfını katmana uygulayın.</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

"Joy of Pets" hikayemiz neredeyse tamamlandı. Tüm evcil hayvanları bir araya getirmek için son sayfamızda animasyonlar kullanacağız.

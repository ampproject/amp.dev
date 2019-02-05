---
$title: Bir Görüntü Ekleyin
---

HTML etiketlerinin birçoğu AMP HTML›de kullanılabilir, ancak `<img>` etiketi gibi bazı etiketler eşdeğeri ya da biraz geliştirilmiş özel AMP HTML etiketleri ile değiştirilir (ve sorunlu etiketlerden birkaçı tamamen yasaklanır, bkz.[Spesifikasyondaki HTML Etiketleri]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.md', locale=doc.locale).url.path}})).

Ek işaretlerin nasıl görüneceğini örneklendirmek için, sayfaya bir görüntü yerleştirmek için gerekli kod burada verilmiştir:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

`<img>` gibi etiketleri [`<amp-img>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) ile neden değiştirdiğimizi ve kaç tane mevcut olduğunu öğrenmek için, [Bilgi İletim Birimleri ve Medya Ekle]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/media_iframes_3p/index.md', locale=doc.locale).url.path}}) bölümüne gidin.

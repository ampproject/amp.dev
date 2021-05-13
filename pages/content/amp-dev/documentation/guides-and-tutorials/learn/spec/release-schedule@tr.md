---
'$title': AMP Sürüm Yayınlama Programı
$order: 10
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: '- Yayın Kanalları'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Sürüm Yayınlama Kanalları](#release-channels)
  - [Gecelik](#nightly)
  - [Haftalık](#weekly)
    - [Deneysel ve Beta kanallar](#beta-and-experimental-channels)
  - [Uzun Vadeli Kararlı (lts)](#long-term-stable-lts)
- [Değişikliğinizin bir sürümde olup olmadığını belirleme](#determining-if-your-change-is-in-a-release)
- [Yayın Temposu](#release-cadence)
  - [Ayrıntılı program](#detailed-schedule)
  - [Sürüm Dondurma](#release-freezes)

Her hafta Salı günü tüm AMP sayfalarına yeni bir AMP sürümü aktarılır. **AMP'deki bir değişiklik, amphtml havuzunun ana dalıyla birleştirildiğinde, değişikliğin tüm kullanıcılar için geçerli olması genellikle 1-2 hafta sürer.**

## Yayın Kanalları <a name="release-channels"></a>

AMP çalışma zamanı ve uzantıları, çeşitli farklı _yayın kanalları_ aracılığıyla sunulur. Her kanal, geliştiriciler ve AMP HTML Projesi'nin kendisi için bir amaca hizmet eder. [`ampproject/amphtml`](https://github.com/ampproject/amphtml) bilgi havuzundan kodların nasıl ve ne zaman yayın derlemelerine aktarıldığına dair daha detaylı döküm için [yayın temposu bölümüne](#release-cadence) göz atın.

Aşağıdaki yayın kanallarından herhangi birine PR dahil edilip edilmediğini belirlemek için şu GitHub etiketlerini arayın: _PR Use: In Canary_, _PR Use: In Production_ veya _PR Use: In LTS_ (daha fazla ayrıntı için [değişikliğinizin bir sürümde olup olmadığını belirleme ](#determining-if-your-change-is-in-a-release) hakkındaki bölüme bakın).

### Gecelik <a name="nightly"></a>

**Gecelik** yayın kanalı, (adından da anlaşılacağı gibi) hafta içi her gece güncellenir. Bu süreç otomatiktir ve herhangi bir gecelik sürümün hata veya başka sorunlar içermediğinin garantisi yoktur. Her gece, gece yarısından (Pasifik Saati) sonra, günün son "yeşil" yürütmesi (commit), yayın sona erme noktası olarak seçilir. Yeşil bir derleme, tüm otomatik testlerin bu derlemede gerçekleştirildiğini gösterir.

Her gece yayınlanan sürüm, sorunları hızlı bir şekilde ve trafiği daha yoğun _haftalık_ yayın kanallarına ulaşmadan önce tespit etmek ve çözmek için bir mekanizma sağlar. Ayrıca yeni ortaya çıkan sorunlardan etkilenen kullanıcı sayısını azaltmaya da hizmet eder.

Son birkaç gün içinde birleştirilen çekme taleplerini test etmek için **gecelik** kanalı seçmek mümkündür. Ayrıntılar için [DEVELOPING.md] içindeki [kaydolma bölümüne](https://github.com/ampproject/amphtml/blob/main/docs/developing.md#opting-in-to-pre-release-channels) bakın.

### Haftalık <a name="weekly"></a>

_Haftalık_ yayın kanalları, birincil "her zaman yeşil" yayın kanalları olarak kabul edilir. Her hafta önceki haftanın **beta** sürümü **kararlı** sürüm kanalına yükseltilir ve önceki haftanın son **gece** sürümü **deneysel** ve **beta** sürüm kanallarına yükseltilir ([ayrıntılı programa bakın](#detailed-schedule)).

Sürüm derlemeleri oluştururken kullanılan iki grup derleme yapılandırması vardır: _kanarya_ yapılandırması ve _üretim_ yapılandırması. **Deneysel** ve **beta** sürüm kanalları, aynı yürütme (commit) ile oluşur. Ancak **deneysel** kanal, _kanarya_ yapılandırmasını kullanırken **beta** kanalı _üretim_ yapılandırmasını kullanır. _Kanarya_ yapılandırması, _üretimde_ kapatılabilen deneysel bileşenleri ve özellikleri etkinleştirir. <a>Deneyler sayfasından</a> **deneysel** veya <strong>beta</strong> kanallarını seçmek mümkündür.

**Kararlı** sürüm kanalı, _üretim_ yapılandırmasıyla oluşturulur ve AMP trafiğinin çoğuna sunulur. **Beta** sürüm kanalı da _üretim_ yapılandırmasından oluşturulduğundan, sonraki hafta **kararlı** hale gelecek olan tam derlemeyi temsil eder (son dakika sorunlarını düzeltmek için seçim yapma olasılığı ile; [Kod Katkısı Yapma](https://github.com/ampproject/amphtml/blob/main/docs/contributing-code.md#Cherry-picks) bölümüne bakın).

#### Beta ve Deneysel kanalları <a name="beta-and-experimental-channels"></a>

_Beta_ ve _Deneysel Kanalları_, AMP'nin bir sonraki Kararlı sürümü için yayın öncesi adaylardır. Her Salı ([sürümün dondurulduğu](#release-freezes) haftalar hariç), geçen haftanın **gecelik** sürümü, **beta** ve **deneysel** sürümü seçimi için geliştirici seçim kanallarına yükseltilir. Bu kanallarda hiçbir özellik veya performans düşürme eyleminin yapılmadığını doğruladığımız 1 günlük bir sürenin ardından, bu sürümü Çarşamba günü trafiğin küçük bir kısmına aktarırız. Aynı sürüm, sonraki hafta Salı günü **kararlı** kanala yükseltilir.

Bu kanalları seçmek mümkündür. Ayrıntılar için [DEVELOPING.md] içindeki [kaydolma bölümüne](https://github.com/ampproject/amphtml/blob/main/docs/developing.md#opting-in-to-pre-release-channels) bakın.

Şu amaçlarla _Beta Kanalına_ dahil olunur:

- yakında yayınlanacak AMP çalışma zamanı sürümünü test etme ve onunla oynama
- sitenizin bir sonraki AMP sürümüyle uyumlu olmasını sağlamak için Kalite Güvencesi (QA) kullanma

Şu amaçlarla _Deneysel Kanalına_ dahil olunur:

- henüz tüm kullanıcılar için mevcut olmayan yeni özellikleri test etme ve onlarla oynama
- sitenizin, henüz geliştirilmekte olan AMP'nin gelecek özellikleriyle uyumlu olmasını sağlamak için Kalite Güvencesi (KG) kullanma

_Deneysel Kanalı_ **daha az kararlı** olabilir ve henüz tüm kullanıcılar tarafından kullanılamayan özellikler içerebilir.

### Uzun Vadeli Kararlı (lts) <a name="long-term-stable-lts"></a>

**lts** sürüm yayınlama kanalı, bir aylık aralıklarla önceki bir **kararlı** derlemeyi sağlar. Her ayın ikinci Pazartesi günü, mevcut **kararlı** sürüm **lts'ye** yükseltilir. Bu kanal, tüm AMP yayıncıları için önerilmez. Bu seçenk, web sitelerinde daha az sıklıkta KG döngüsü gerçekleştirmek isteyen yayıncıların bunu **lts** kanalına belirli web sayfalarını seçerek yapabilmeleri için sağlanmıştır (bkz. <a href="https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md" data-md-type="link">**lts** readme</a>).

Ayın ikinci pazartesi gününün tatile denk gelmesi durumunda, yükseltme, [yayın dondurma](#release-freezes) sürecinin bitiminden sonra gerçekleştirilecektir.

Önemli: **lts** sürüm kanalını kullanan yayıncılar yeni tanıtılan özellikleri kullanmamalıdır. Daha uzun döngüden dolayı, **lt** sürümü, [`ampproject/amphtml`](https://github.com/ampproject/amphtml) `HEAD` bölümünden yedi hafta kadar geride olabilir. Seçtiğiniz sürüm döngüsünde bir değişikliğin hazır olup olmayacağını doğrulamak için [değişikliğinizin bir sürümde olup olmadığını belirleme](#determining-if-your-change-is-in-a-release) bölümüne bakın.

## Değişikliğinizin bir sürümde olup olmadığını belirleme <a name="determining-if-your-change-is-in-a-release"></a>

[_Type:Release_ GitHub konuları](https://github.com/ampproject/amphtml/labels/Type%3A%20Release), mevcut ve geçmiş sürümlerin durumunu izlemek için kullanılır; ilk kesitten **deneysel**/**beta** kanalları aracılığıyla test etmeye, **kararlı** ve **lts** kanalları aracılığıyla nihai sürüme kadar. Sürümlerle ilgili duyurular [AMP Slack #release kanalında](https://amphtml.slack.com/messages/C4NVAR0H3/) yapılır ([Slack'e kaydolun](https://bit.ly/amp-slack-signup)).

Aşağıdakilerden birini kullanarak belirli bir derlemede hangi değişikliklerin olduğunu belirleyebilirsiniz:

- Her bir sürüm derlemesi için [_Type: Release_ GitHub konuları](https://github.com/ampproject/amphtml/labels/Type%3A%20Release), ilgili sürümde bulunan değişiklikleri listeleyen belirli bir [sürüm sayfasına](https://github.com/ampproject/amphtml/releases) bir bağlantı içerir.
- [_PR Use: In Beta / Experimental_](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22), [_PR Use: In Stable_](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22) ve [_PR Use: In LTS_](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) etiketleri, _haftalık_ veya **lts** derlemelerine aktarıldıklarında PR'lara eklenir. Derlemenin oluşturulduğu zaman ile etiketin eklendiği zaman arasında bir gecikme olabilir.

## <a id="release-cadence">Yayın Temposu</a>

Yayın tempomuz konusunda kasıtlı olarak ihtiyatlıyız.

AMP'nin yeni sürümlerini ne sıklıkla herkese yaymamız gerektiğini belirlerken, aşağıdakiler dahil birçok faktörü tartmamız gerekiyor:

- AMP kullanılarak oluşturulan milyonlarca site/milyarlarca sayfa için kararlılık
- yeni bir sürümü gönderdiğimizde ortaya çıkabilecek önbellek bozulması
- yeni özellikleri hızla ortaya çıkarma arzusu

Tüm bu faktörleri değerlendirdikten sonra 1-2 haftalık aktarma döngüsüne ulaştık. Şimdiye kadar, bunu makul bir taviz olarak görüyoruz, ancak tüm bu faktörleri değerlendirmeye devam edeceğiz ve gelecekte değişiklikler yapabiliriz.

### Ayrıntılı program <a name="detailed-schedule"></a>

Karışıklıklar gecikmelere neden olsa da, bu programa olabildiğince yakından bağlı kalmaya çalışıyoruz. [_Type: Release_ GitHub konuları](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) ve [AMP Slack #release kanalındaki](https://amphtml.slack.com/messages/C4NVAR0H3/) herhangi bir sürümle ilgili en son durumu takip edebilirsiniz ([Slack'e kaydolun](https://bit.ly/amp-slack-signup)).

- Salı, [11am Pasifik](https://www.google.com/search?q=11am+pacific+in+current+time+zone): yeni **deneysel** ve **beta** sürüm derlemeleri, [tüm testlerimizi geçen en son ana derlemeden](https://travis-ci.org/ampproject/amphtml/branches) oluşturulur ve sırasıyla [AMP Deneysel Kanalına](#beta-and-experimental-channels) veya [AMP Beta Kanalına](#beta-and-experimental-channels) katılan AMP kullanıcılarına aktarılır.
- Çarşamba: _Deneysel Kanalı_ ve _Beta Kanalı_ kullanıcıları için hata raporlarını kontrol ediyoruz ve her şey yolunda görünüyorsa **beta sürümünü** AMP sayfalarının %1'ine aktarıyoruz
- Perşembe-Pazartesi: _Deneysel Kanalı_ ve _Beta Kanalı_ kullanıcıları için hata oranlarını ve hata raporlarını ve **deneysel**/**beta** derlemelerine sahip sayfaların %1'ini izlemeye devam ediyoruz
- Ertesi hafta Salı: **beta** derleme tamamen **kararlı** hale getirilir (yani tüm AMP sayfaları artık bu yapıyı kullanır)

### Sürüm Dondurma <a name="release-freezes"></a>

Sürümün dondurulması olarak bilinen bir AMP sürümünü üretim aşamasına aktarmayı atladığımız durumlar vardır.

N Haftası için bir haftalık sürüm dondurması duyurulursa:

- Önceki haftanın sürüm yapısı, fazladan bir hafta boyunca **deneysel**/**beta sürümünde** kalır, yani normalde olduğu gibi Hafta N-1'deki sürüm kesiti, Hafta N'de **kararlı** hale getirilmez. Bunun yerine, Hafta N + 1'de **kararlı** hale getirilecektir.
- Dondurma haftasında (Hafta N) yeni bir sürüm derlemesi _yapılmadı_ .
- Normal program, Hafta N + 1'de devam edecek, yani **deneysel**/**beta** sürüm Hafta N + 1'de kesilecek ve Hafta N + 2'de **kararlı** hale getirilecektir.
- N-1 Haftasında yükseltilen **kararlı** sürümün başlangıçta N Haftasında **lts'ye** yükseltilmesi planlanmışsa, artık Hafta N + 1'in Pazartesi günü **lts'ye** yükseltilecektir.
- Tamamen otomatik olduklarından **gecelik** yayınlar oluşturulmaya ve aktarılmaya devam edilirler.

Aşağıdaki nedenlerden dolayı sürüm dondurma meydana gelebilir:

- AMP sürümünü **kararlı** hale getirmek ve izlemek için yeterli sayıda kişinin bulunmadığı zamanlar. Şu anda AMP sürümlerini gerçekleştiren kişilerin çoğu Amerika Birleşik Devletleri'nde yaşıyor, bu nedenle dondurma tarihleri genellikle ABD'nin Bağımsızlık Günü (4 Temmuz), Şükran Günü (Kasım'ın dördüncü Perşembe günü), Noel (25 Aralık) ve Yeni Yıl Arifesi/Gün (31 Aralık/1 Ocak) gibi büyük tatillerinin haftaları içinde olacaktır.
- [Teknik Yürütme Komitesi (TSC)](https://github.com/ampproject/meta-tsc) veya sürümü yayınlayan kişiler tarafından belirlenen güvenlik veya gizlilik sorunu gibi acil bir durum.
- TSC tarafından belirlendiği üzere kod tabanının kararlılığının özellikle önemli olduğu diğer durumlar.

Acil durumlar haricindeki tüm durumlarda, sürüm dondurma zamanları en az bir ay önceden duyurulacaktır.

Aksi belirtilmedikçe, sürüm dondurmanın kod dondurma anlamına gelmediğini unutmayın. Sürüm dondurma sırasında kod yine de yazılabilir, incelenebilir ve birleştirilebilir.

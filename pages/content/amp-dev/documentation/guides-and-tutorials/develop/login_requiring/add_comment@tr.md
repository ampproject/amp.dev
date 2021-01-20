---
"$title": Yorum ekleme
"$order": '2'
description: 'Bu noktada, kullanıcı amp-form kütüphanesini kullanarak bir yorum ekleyebilir. Formun varlığının, amp-access bileşeninin durumuna bağlı olarak nasıl koşullu olduğuna dikkat edin:'
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

Bu noktada, kullanıcı [`amp-form`](../../../../documentation/components/reference/amp-form.md) kütüphanesini kullanarak bir yorum ekleyebilir. Formun varlığının, [`amp-access`](../../../../documentation/components/reference/amp-access.md) bileşeninin durumuna bağlı olarak nasıl koşullu olduğuna dikkat edin:

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

AMP'de POST yöntemlerinde XHR olmayan eylemlere izin verilmediğinden, bir POST yöntemi ve bir XHR eylemi belirtiyoruz. Bu bir demo olduğu için yorumlarda ısrarcı değiliz, bu nedenle bir seferde sadece bir yorum eklemek mümkündür; bir yorum eklendiğinde, AMPByExample sunucusu, girilen metni içeren bir JSON yanıtıyla yanıt verir ve bir zaman damgası, bir avatar ve kullanıcı için bir ad gibi bazı eklemeler içerir.

JSON yanıtının bir örneğini burada bulabilirsiniz:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

Form bileşeni, [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md) şablonunu kullanarak bu değerleri sayfanın içinde görüntüleyecektir:

[sourcecode:html]
<div submit-success>
  <template type="amp-mustache">
    <div class="comment-user">
      <amp-img width="44" class="user-avatar" height="44" alt="user" src="{{UserImg}}"></amp-img>
      <div class="card comment">
        <p><span class="user">{% raw %}{{User}}{% endraw %}</span><span class="date">{% raw %}{{Datetime}}{% endraw %}</span></p>
        <p>{% raw %}{{Text}}{% endraw %}</p>
      </div>
    </div>
  </template>
</div>
[/sourcecode]

Bu örnekte, sadece yorumun değerinin boş olup olmadığını kontrol ediyoruz; değer boşsa, aşağıdaki kodun yürütülmesine neden olan bir hata ile yanıt veriyoruz

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

Fazladan bir dokunuş olarak, yorumu göndermeden önce yorum metninin varlığını zorunlu kılmak için `required` özelliği ekliyoruz:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Bir yorum ekleyip gönder düğmesini tıkladığınızda, şimdi aşağıdaki ekran görüntüsüne benzer bir şey görmelisiniz:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>

---
layout: page
title: Вставка изображения
order: 1
locale: ru
---

Большинство тегов HTML может быть использовано непосредственно в AMP HTML, однако некоторые теги, такие как `<img>`, заменяются своим эквивалентом или слегка расширенными персонализированными тегами AMP HTML (также запрещено использование нескольких проблемных тегов, см. [описание тегов HTML в спецификации AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

Для демонстрации того, как может выглядеть дополнительная разметка, ниже приведен пример кода для встраивания изображения в страницу:

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

Чтобы узнать о причинах замены тегов `<img>` на `<amp-img>`, а также о других доступных возможностях, ознакомьтесь с разделом [Вставка встроенных фреймов и мультимедийного содержимого](/docs/guides/amp_replacements.html).

{% include button.html title="Перейти к шагу 3" link="/docs/get_started/create/presentation_layout.ru.html" %}

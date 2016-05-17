---
layout: page
title: Incluir uma imagem
order: 1
locale: pt-br
---

A maioria das tags HTML podem ser usadas diretamente em AMP HTML, mas algumas, como a tag `<img>`, são substituídas por tags AMP HTML equivalentes ou ligeiramente melhoradas e personalizadas (e algumas poucas tags problemáticas são diretamente eliminadas, consulte [Tags HTML na especificação](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

Para demonstrar qual seria a aparência de uma marcação adicional, veja o código necessário para incorporar uma imagem na página:

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

Para saber por que estamos substituindo tags como `<img>` por `<amp-img>` e quantas estão disponíveis, consulte [Incluir iframes e mídia](/docs/guides/amp_replacements.html).

{% include button.html title="Continuar para a etapa 3" link="/docs/get_started/create/presentation_layout.pt-br.html" %}

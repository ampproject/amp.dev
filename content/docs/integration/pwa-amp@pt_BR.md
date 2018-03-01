---
$title: Combinar AMP com Progressive Web Apps
---
[TOC]

{{ youtube('Yllbfu3JE2Y', 480, 270, caption='Assista o vídeo de introdução sobre como combinar AMP e PWA.') }}

Os Progressive Web Apps e as páginas AMP funcionam muito bem juntos. Em muitos casos, eles se complementam de uma forma ou de outra. Saiba como:

1. [ativar recursos de PWA](/pt_br/docs/guides/pwa-amp/amp-as-pwa.html) para suas páginas AMP;
2. criar uma [navegação super-rápida e atrativa](/pt_br/docs/guides/pwa-amp/amp-to-pwa.html) das AMP para o PWA;
3. [simplificar seu PWA](/pt_br/docs/guides/pwa-amp/amp-in-pwa.html) usando o poder das AMP.

{% call callout('Progressive Web App?', type='note') %}
Saiba mais sobre os [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) no Web Fundamentals.
{% endcall %}

# Páginas AMP com recursos de PWA

As páginas AMP podem usar muitos recursos de PWA por conta própria, desde que sejam veiculadas a partir da sua origem (o domínio do site), e não de um cache de AMP. Isso significa que os recursos de PWA não serão iniciados ao usar uma página AMP de uma plataforma como o Google ou o Bing, mas sim durante a navegação ou se os usuários acessarem as páginas AMP diretamente.

{% call callout('Leia mais', type='read') %}
Saiba como [ativar recursos de PWA](/pt_br/docs/guides/pwa-amp/amp-as-pwa.html) para suas páginas AMP.
{% endcall %}

## AMP como ponto de entrada para o PWA

Uma vantagem exclusiva das AMP é a **exibição quase instantânea**, uma característica ideal para a primeira interação do usuário com seu site. Os *Progressive Web Apps* permitem muito **mais interatividade e recursos que estimulam o engajamento**, mas o carregamento inicial é prejudicado porque o service worker do site, os recursos e o shell do app só serão exibidos rapidamente nos carregamentos posteriores.

Uma boa estratégia é fazer com que o ponto de entrada do seu site seja uma página AMP, carregar o PWA em segundo plano e mudar para ele durante a navegação.

{% call callout('Leia mais', type='read') %}
Saiba como [conectar AMP a um PWA](/pt_br/docs/guides/pwa-amp/amp-to-pwa.html) usando `amp-install-serviceworker`.
{% endcall %}

## AMP como fonte de dados para seu PWA

Um dos principais recursos das páginas AMP é a incorporação fácil e segura. Por isso, cada vez mais plataformas distribuem e veiculam essas páginas.

Ao criar um Progressive Web App, você pode ter os mesmos benefícios e reduzir drasticamente a complexidade do cliente e do seu back-end **reutilizando suas páginas AMP como fonte de dados para seu PWA**.

{% call callout('Leia mais', type='read') %}
Saiba como [usar páginas AMP em um PWA](/pt_br/docs/guides/pwa-amp/amp-in-pwa.html).
{% endcall %}
 
 

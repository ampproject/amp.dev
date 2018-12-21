---
$title: Combinar AMP com Progressive Web Apps
---
[TOC]

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Assista o vídeo de introdução sobre como combinar AMP e PWA.']

Os Progressive Web Apps e as páginas AMP funcionam muito bem juntos. Em muitos casos, eles se complementam de uma forma ou de outra. Saiba como:

1. [ativar recursos de PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-as-pwa.md', locale=doc.locale).url.path}}) para suas páginas AMP;
2. criar uma [navegação super-rápida e atrativa]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-to-pwa.md', locale=doc.locale).url.path}}) das AMP para o PWA;
3. [simplificar seu PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-in-pwa.md', locale=doc.locale).url.path}}) usando o poder das AMP.

[tip type="note"]

Saiba mais sobre os [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) no Web Fundamentals.

[/tip]

# Páginas AMP com recursos de PWA

As páginas AMP podem usar muitos recursos de PWA por conta própria, desde que sejam veiculadas a partir da sua origem (o domínio do site), e não de um cache de AMP. Isso significa que os recursos de PWA não serão iniciados ao usar uma página AMP de uma plataforma como o Google ou o Bing, mas sim durante a navegação ou se os usuários acessarem as páginas AMP diretamente.

Leia mais: Saiba como [ativar recursos de PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-as-pwa.md', locale=doc.locale).url.path}}) para suas páginas AMP.

## AMP como ponto de entrada para o PWA

Uma vantagem exclusiva das AMP é a **exibição quase instantânea**, uma característica ideal para a primeira interação do usuário com seu site. Os *Progressive Web Apps* permitem muito **mais interatividade e recursos que estimulam o engajamento**, mas o carregamento inicial é prejudicado porque o service worker do site, os recursos e o shell do app só serão exibidos rapidamente nos carregamentos posteriores.

Uma boa estratégia é fazer com que o ponto de entrada do seu site seja uma página AMP, carregar o PWA em segundo plano e mudar para ele durante a navegação.

Leia mais: Saiba como [conectar AMP a um PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-to-pwa.md', locale=doc.locale).url.path}}) usando `amp-install-serviceworker`.

## AMP como fonte de dados para seu PWA

Um dos principais recursos das páginas AMP é a incorporação fácil e segura. Por isso, cada vez mais plataformas distribuem e veiculam essas páginas.

Ao criar um Progressive Web App, você pode ter os mesmos benefícios e reduzir drasticamente a complexidade do cliente e do seu back-end **reutilizando suas páginas AMP como fonte de dados para seu PWA**.

Leia mais: Saiba como [usar páginas AMP em um PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-in-pwa.md', locale=doc.locale).url.path}}).

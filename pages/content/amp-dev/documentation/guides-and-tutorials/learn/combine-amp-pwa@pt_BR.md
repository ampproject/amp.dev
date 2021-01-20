---
"$title": How AMP and PWA relate to each other
"$order": '7'
description: Os Progressive Web Apps (PWA) e as páginas AMP funcionam muito bem juntos. Em muitos casos, eles se complementam de uma forma ou de outra. Saiba como ...
formats:
- websites
components:
- youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Assista o vídeo de introdução sobre como combinar AMP e PWA.']

Os Progressive Web Apps (PWA) e as páginas AMP funcionam muito bem juntos. Em muitos casos, eles se complementam de uma forma ou de outra. Saiba como:

1. [ativar recursos de PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) para suas páginas AMP;
2. criar uma [navegação super-rápida e atrativa](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) de páginas AMP para os PWA;
3. [simplificar seu PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) usando o poder das páginas AMP.

[tip type="note"]

Saiba mais sobre os [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) no Web Fundamentals.

[/tip]

## Páginas AMP com recursos PWA

As páginas AMP podem usar muitos recursos de PWA por conta própria, desde que sejam servidas a partir da sua origem (o domínio do seu site), e não de um cache de AMP. Isto significa que os recursos de PWA não serão iniciados ao usar uma página AMP de uma plataforma como o Google ou o Bing, mas sim durante a navegação ou se os usuários acessarem as páginas AMP diretamente.

[tip type="read-on"] <strong>LEIA MAIS –</strong> Saiba como [ativar recursos de PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) para suas páginas AMP.[/tip]

## AMP como ponto de entrada no seu PWA

Uma vantagem exclusiva das páginas AMP é a **exibição quase instantânea** - uma característica ideal para a primeira interação do usuário com seu site. As *Progressive Web Apps* permitem muito **mais interatividade e recursos que estimulam o engajamento**, mas o carregamento inicial é prejudicado porque o Service Worker do site, os recursos e o shell do app só serão processados rapidamente em carregamentos posteriores.

Uma boa estratégia é fazer com que o ponto de entrada do seu site seja uma página AMP, depois carregar o PWA em segundo plano e mudar para ele para o restante da navegação.

Leia mais: Saiba como [conectar AMP a um PWA](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) usando [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md).

## AMP como fonte de dados para seu PWA

Um dos principais recursos das páginas AMP é a incorporação fácil e segura. Por isso, cada vez mais plataformas distribuem e servem essas páginas.

Ao criar um Progressive Web App, você pode ter os mesmos benefícios e reduzir drasticamente a complexidade do cliente e do seu back-end **reutilizando suas páginas AMP como fonte de dados para seu PWA**.

Leia mais: Saiba como [usar páginas AMP em um PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md).

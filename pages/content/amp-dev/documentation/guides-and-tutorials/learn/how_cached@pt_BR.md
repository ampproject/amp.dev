---
$title: Como as páginas AMP são armazenadas em cache
---

[TOC]

Neste documento, você descobrirá qual é a função do cache de AMP no ecossistema AMP e como a página AMP é armazenada em cache.

## O que é o cache de AMP?
O cache de AMP é uma rede de fornecimento de conteúdo (CDN, na sigla em inglês) baseada em proxy para entrega de documentos AMP. Os caches de AMP servem para:

1.  exibir somente páginas AMP válidas;
2.  permitir que as páginas AMP sejam pré-carregadas com eficiência e segurança;
3.  realizar otimizações de desempenho adicionais para o conteúdo, que são benéficas para o usuário.

Saiba mais sobre os caches de AMP neste vídeo do YouTube ou na postagem do blog [Por que existem caches de AMP](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src="https://www.youtube.com/watch?v=n8n7fj60lds" width="480" height="270" caption="Assista esse vídeo para saber por que existem caches de AMP."]

## Quais caches de AMP estão disponíveis?
No momento, há dois provedores de cache de AMP:

- [Cache de AMP do Google](https://developers.google.com/amp/cache/)
- [Cache de AMP do Cloudflare](https://amp.cloudflare.com/)

AMP é um ecossistema aberto, e o Projeto AMP incentiva ativamente o desenvolvimento de mais caches de AMP.  Para saber mais sobre a criação de caches de AMP, consulte as [Diretrizes de cache de AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Como escolher um cache de AMP?

O editor não escolhe um cache de AMP. Essa escolha é feita pela *plataforma* que vincula seu conteúdo (se houver).

Isso é o contrário do modelo normal em que a entrega de conteúdo é de responsabilidade do editor.  No entanto, esse modelo permite que as plataformas forneçam aos usuários um desempenho de carregamento previsível e, entre outras coisas, que garantam as constantes necessárias de segurança e privacidade durante a fase de pré-renderização de AMP. [Clique aqui](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md) se quiser saber mais sobre as diretrizes rígidas para a criação de caches de AMP.

## Posso optar por não armazenar em cache?

O armazenamento em cache é uma parte essencial do ecossistema AMP. Publicar um documento AMP válido é optar automaticamente pelo armazenamento em cache.

Se você não quiser armazenar seu documento em cache, uma opção é remover o atributo `amp` da tag HTML. Isso torna o documento AMP tecnicamente inválido, mas não afeta a funcionalidade dele.

## Quem solicita páginas AMP armazenadas em cache?

As páginas AMP armazenadas em cache são acessadas por plataformas, como a Pesquisa Google, o Google Notícias e o Cloudflare, e aplicativos para dispositivos móveis. Os aplicativos para dispositivos móveis podem vincular o conteúdo armazenado em cache de AMP por meio do URL (consulte a [AMP URL API] do Google(https://developers.google.com/amp/cache/use-amp-url)) ou por XHRs de origem cruzada em Progressive Web Apps (saiba mais em [Incorporar e usar AMP como fonte de dados]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-in-pwa.md', locale=doc.locale).url.path}})).

<amp-img src="/static/img/docs/platforms_accessing_cache.png"
         width="1054" height="356" layout="responsive"
         alt="platforms and mobile apps access cached AMP pages">
</amp-img>

## Como minha página AMP é armazenada em cache?
Ao usar o formato AMP, você disponibiliza conteúdo para ser armazenado em cache pelos caches de AMP. Sua página AMP pode ser armazenada em um cache de AMP das seguintes maneiras:

* **Descoberta de plataforma**: as plataformas descobrem seu conteúdo de AMP por meio das tags `<html ⚡>` ou `<html amp>` e o armazenam em cache. Por exemplo, a Pesquisa Google rastreia o conteúdo de todas as páginas AMP identificadas e válidas e adiciona esse conteúdo ao cache de AMP do Google.

* **Solicitação de URL de cache**: as plataformas podem solicitar especificamente uma página AMP usando o formato de URL do cache de AMP.  O cache de AMP atua como um proxy reverso, por isso, quando a plataforma acessa a página, ela é armazenada em cache automaticamente.
    - Exemplo de URL do cache de AMP do Cloudflare: `https://amp.cloudflare.com/c/foo.com/amp_document.html`
    - Exemplo de URL do cache de AMP do Google: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

Observação: o URL do cache de AMP não é um URL voltado ao usuário, ou seja, normalmente ele não solicita conteúdo por meio desses URLs.

* **Inclusão de editores**: os editores podem adicionar especificamente a página AMP ao cache de AMP.  Essa opção é aplicável somente ao cache de AMP do Google (consulte [Cache de AMP do Google: atualizar o conteúdo AMP] (https://developers.google.com/amp/cache/update-cache)).

## Outros recursos

* [Diretrizes do cache de AMP do Projeto AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
* [Visão geral do cache de AMP do Google](https://developers.google.com/amp/cache/overview)
* [Documentação do cache de AMP do Cloudflare](https://amp.cloudflare.com/)

---
"$title": Como páginas AMP são armazenadas em cache
"$order": '0'
description: Neste documento, você aprenderá sobre a função do cache de AMP no ecossistema de AMP e como sua página AMP é armazenada em cache.
formats:
- websites
- stories
- ads
---

Neste documento, você descobrirá qual é a função do cache de AMP no ecossistema AMP e como a página AMP é armazenada em cache.

## O que é o cache de AMP?

O cache de AMP é uma rede de fornecimento de conteúdo (CDN, na sigla em inglês) baseada em proxy para entrega de documentos AMP. Os caches de AMP servem para:

1. exibir somente páginas AMP válidas;
2. permitir que as páginas AMP sejam pré-carregadas com eficiência e segurança;
3. realizar otimizações de desempenho adicionais para o conteúdo, que são benéficas para o usuário.

[tip type = "note"] Os documentos de e-mail de AMP estão isentos do cache de AMP. [/dica]

Learn more about AMP Caches in the YouTube video below, or in the [Why AMP Caches Exist](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456) blog post.

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Watch this video to learn why AMP Caches exist.']

## Quais caches de AMP estão disponíveis?

Currently, there are two AMP Cache providers:

- [Cache de AMP do Google](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP is an open ecosystem and the AMP Project actively encourages the development of more AMP Caches.  To learn about creating AMP Caches, see the [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Como escolher um cache de AMP?

As a publisher, you don't choose an AMP Cache, it's *actually the platform* that links to your content that chooses the AMP Cache (if any) to use.

This is an inversion of the typical model where content delivery is the responsibility of the publisher.  However, this model allows platforms to provide their users with predictable load performance and among other things allows them to ensure required security and privacy invariants during AMP’s pre-rendering phase. To learn about the strict guidelines for creating AMP Caches, see the [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Posso optar por não armazenar em cache?

O armazenamento em cache é uma parte essencial do ecossistema AMP. Publicar um documento AMP válido é optar automaticamente pelo armazenamento em cache.

Should you desire not to have your document cached, one option is to remove the `amp` attribute from the HTML tag. This makes the document technically invalid AMP, while not impacting the functionality of the document.

## Quem solicita páginas AMP armazenadas em cache?

Cached AMP pages are accessed by platforms (like Google Search, Google News, and Bing) and mobile apps. Mobile apps can link to cached AMP content via the URL (see Google's [AMP URL API](https://developers.google.com/amp/cache/use-amp-url)) or by cross-origin XHRs in  Progressive Web Apps (learn more in [Embed & use AMP as a data source](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## Como minha página AMP é armazenada em cache?

By using the AMP format, you are making your content available to be cached by AMP Caches. There are a few ways that your AMP page can end up in an AMP Cache:

- **Descoberta de plataforma**: as plataformas descobrem seu conteúdo de AMP por meio das tags `<html ⚡>` ou `<html amp>` e o armazenam em cache. Por exemplo, a Pesquisa Google rastreia o conteúdo de todas as páginas AMP identificadas e válidas e adiciona esse conteúdo ao cache de AMP do Google.

- **Solicitação de URL de cache**: as plataformas podem solicitar especificamente uma página AMP usando o formato de URL do cache de AMP.  O cache de AMP atua como um proxy reverso, por isso, quando a plataforma acessa a página, ela é armazenada em cache automaticamente.

    - Exemplo de URL do cache de AMP do Google: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **NOTE –** The AMP Cache URL is not a user-facing URL, that is, users wouldn't typically request content via those URLs. [/tip]

- **Inclusão de editores**: os editores podem adicionar especificamente a página AMP ao cache de AMP.  Essa opção é aplicável somente ao cache de AMP do Google (consulte [Cache de AMP do Google: atualizar o conteúdo AMP] (https://developers.google.com/amp/cache/update-cache)).

## Outros recursos

- [Diretrizes do cache de AMP do Projeto AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
- [Visão geral do cache de AMP do Google](https://developers.google.com/amp/cache/overview)
- [Bing AMP Cache Documentation](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

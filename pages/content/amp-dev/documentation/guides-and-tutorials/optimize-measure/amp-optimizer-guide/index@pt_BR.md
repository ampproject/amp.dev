---
"$title": Usando um Otimizador AMP
"$order": '2'
"$hidden": 'true'
description: Os Otimizadores AMP são ferramentas que trazem as otimizações do cache AMP para seu próprio site. Usar um Otimizador AMP é a chave para criar uma ótima experiência de página e obter conformidade com o Core Web Vitals. Este guia explica como usar melhor um Otimizador AMP para otimizar suas páginas AMP.
formats:
- websites
- stories
author: sebastianbenz
---

Os Otimizadores AMP são ferramentas que trazem as otimizações do cache AMP para seu próprio site. Usar um Otimizador AMP é a chave para criar uma ótima [experiência de página](https://developers.google.com/search/docs/guides/page-experience) e obter conformidade com o [Core Web Vitals](https://web.dev/vitals/). Se você quer saber mais sobre como funciona um Otimizador AMP, d}e uma olhada no nosso [Guia de Otimizações AMP.](explainer.md)

## Mas o AMP já não é rápido?

Você pode estar pensando: espere aí - o AMP já não deveria ser rápido sem precisar de configuração extra? E você teria razão: o runtime AMP é otimizado para maior velocidade e todas as páginas AMP válidas carregam rapidamente. No entanto, existem otimizações de desempenho adicionais que você pode implementar no seu servidor para ajudar o navegador a carregar as páginas AMP ainda mais rapidamente.

No início, os caches AMP serviam a maioria das páginas AMP. Esses caches realizavam otimizações adicionais nas páginas para garantir uma ótima experiência do usuário. Mas, com o tempo, mais superfícies começaram a serem vinculadas a páginas AMP e os desenvolvedores começaram a construir sites inteiros com AMP. É por isso que a equipe AMP começou a trabalhar nos Otimizador AMP para permitir que todos sirvam páginas AMP, com desempenho semelhante ao Cache AMP, na sua própria origem.

## Integre um Otimizador AMP

Há três maneiras de usar um Otimizador AMP:

1. Usar um gerador de site ou CMS com integração de otimizador embutido.
2. Integrar um Otimizador AMP no seu sistema de build ou servidor.
3. Integrar um Otimizador AMP no seu ambiente de hospedagem.

### CMS e geradores de sites

A melhor maneira de publicar AMP otimizado é usando um gerador de sites ou CMS com suporte integrado ao Otimizador AMP. Nesse cenário, suas páginas AMP serão otimizadas automaticamente. Atualmente, os seguintes geradores de sites e CMS integram o Otimizador AMP:

- [WordPress](https://wordpress.org/) através do [AMP WordPress Plugin](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) através do [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Builds personalizados ou integrações de servidor

Você também pode integrar um Otimizador AMP você mesmo. Existem duas implementações diferentes do Otimizador AMP disponíveis em código aberto:

- [Otimizador AMP do Node.js](node-amp-optimizer.md): uma biblioteca baseada em Node.js para produzir AMP otimizado. Confira nosso guia de introdução aqui no amp.dev. A implementação é mantida pela equipe AMP.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): uma versão Python do Otimizador AMP do Node.

Existem diferentes integrações para páginas renderizadas dinamicamente pelo seu servidor por sites estáticos:

1. **Tempo de build**: para sites estáticos, é melhor otimizar as páginas AMP como parte do build. Essa abordagem é ideal, pois a otimização de páginas AMP não afeta o desempenho do serviço. Veja [este exemplo de integração AMP Optimizer + Gulp](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **Tempo de renderização**: se os sites tiverem uma natureza mais dinâmica ou não conseguirem aplicar as transformações de forma estática, a otimização poderá ser realizada depois que os documentos AMP forem renderizados no servidor. Nesse caso, para garantir tempos de serviço rápidos, é melhor armazenar em cache as páginas transformadas para as solicitações subsequentes. O armazenamento em cache pode ocorrer no nível do CDN, na infraestrutura interna do site (por exemplo: Memcached) ou até mesmo no próprio servidor, se o conjunto de páginas for pequeno o suficiente para caber na memória. Para saber mais sobre essa abordagem, dê uma olhada [nesta demonstração de integração do Otimizador AMP com o Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Integrações com provedor de hospedagem

Alguns provedores de hospedagem permitem a execução de lógica personalizada ao implantar ou servir uma página web. Essa pode ser uma ótima opção para integrar o Otimizador AMP. Alguns exemplos de integração incluem:

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) ([em breve](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Image ([em breve](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

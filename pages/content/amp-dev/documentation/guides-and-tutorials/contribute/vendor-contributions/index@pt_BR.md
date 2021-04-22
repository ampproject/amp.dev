---
$title: Integrar AMP à sua tecnologia
---

Mais de 1,4 bilhão de documentos AMP já foram criados por editores e hospedados em mais de 750.000 domínios exclusivos. Esse crescimento não seria possível sem o apoio de mais de 100 empresas de tecnologia de terceiros que já fizeram a integração com a tecnologia AMP.

Convidamos todos os fornecedores de tecnologia para editores ou anunciantes na Web a adicionar a compatibilidade com AMP. Dessa forma, seus clientes poderão continuar a aproveitar ao máximo sua tecnologia e concretizar nossa visão conjunta de construir uma Web melhor.

Há quatro maneiras principais de fazer a integração com AMP:

## 1. Adicionar compatibilidade com a extensão amp-analytics
Com AMP Analytics, é possível enviar eventos de volta ao servidor com base em acionadores configurados por você. Criamos um [guia de integração de análise](../../../guides-and-tutorials/optimize-measure/configure-analytics/index.md) para ajudá-lo a começar.

Se você só precisar adicionar um pixel de rastreamento com parâmetros dinâmicos ao URL de rastreamento, confira [`amp-pixel`](../../../components/reference/amp-pixel.md). Documente o uso nas suas páginas de suporte para os desenvolvedores que queiram usar sua tecnologia com AMP.

Mais de 20 fornecedores de análise já oferecem compatibilidade com a extensão [`amp-analytics`](../../../components/reference/amp-analytics.md) . Veja um [exemplo de solicitação pull](https://github.com/ampproject/amphtml/pull/1595) do fornecedor de análise [Parse.ly](https://www.parsely.com/help/integration/google-amp/).

## 2. Usar uma extensão amp-ad

A extensão [`amp-ad`](../../../components/reference/amp-ad.md)  é reservada para a veiculação de anúncios gráficos em páginas AMP. Mais de 90 fornecedores de tecnologia de anúncios já oferecem compatibilidade com AMP.  Para começar, leia a [`amp-ad`](../../../components/reference/amp-ad.md) podem ser úteis.

Mais de 90 fornecedores de anúncios já oferecem compatibilidade com recursos relacionados à publicidade, como a extensão [`amp-ad`](../../../components/reference/amp-ad.md) . Veja um exemplo de [solicitação pull](https://github.com/ampproject/amphtml/pull/2299) da rede de publicidade [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md).

## 3. Usar a extensão amp-call-tracking

Se você fornecer serviços de medição de rastreamento de chamadas, seu caso de uso poderá ser compatível com a nova extensão [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md). Essa extensão substitui dinamicamente números de telefone em hiperlinks para permitir o rastreamento de chamadas, fazendo uma solicitação CORS para substituir o número.

Para saber mais sobre como essa extensão pode ajudá-lo, consulte a [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md).

## 4. Adicionar uma nova extensão/incorporação

Se o caso de uso não puder ser atendido pelas extensões [`amp-analytics`](../../../components/reference/amp-analytics.md) , [`amp-pixel`](../../../components/reference/amp-pixel.md) ou [`amp-ad`](../../../components/reference/amp-ad.md) , [poste a questão no GitHub](https://github.com/ampproject/amphtml/issues/new) para discutir opções alternativas. Recebemos novas extensões que podem ser usadas por várias empresas. Veja a seção [componentes estendidos contribuintes](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#contributing-extended-components) para mais detalhes.

## 5. Usar amp-iframe

Como assim? Existe uma 5ª maneira? Sim, existe, mas ela deve ser usada somente em último caso. Caso nenhuma das opções acima seja adequada às suas necessidades, você poderá usar uma tag [`amp-iframe`](../../../components/reference/amp-iframe.md)  genérica para permitir que os editores incorporem conteúdo. No entanto, essa abordagem traz uma série de desvantagens devido a dificuldades relacionadas ao desempenho e à experiência do usuário. [Saiba mais aqui](../../../components/reference/amp-iframe.md).url.path}}) .html#guideline:-prefer-specific-amp-components-to-[`amp-iframe`](../../../components/reference/amp-iframe.md) ).

## Resumo

Para começar, leia as [diretrizes do desenvolvedor terceirizado](https://github.com/ampproject/amphtml/blob/main/3p/README.md). O projeto AMP já é compatível com muitos casos de uso de terceiros, mas sabemos que existem recursos da Web que ainda não foram integrados.

Por exemplo, o rastreamento dinâmico de chamadas é um caso de uso ainda não compatível com AMP. No entanto, estamos [trabalhando ativamente](https://github.com/ampproject/amphtml/issues/5276) com a comunidade para torná-lo compatível.

Caso tenha dúvidas ou sugestões, [envie seus comentários](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#filing-issues) ou entre em contato por um dos [canais de discussão](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#discussion-channels).

## Outros recursos

- [Site do projeto AMP](https://amp.dev/pt_br/)
- [Projeto AMP no GitHub](https://github.com/ampproject/amphtml)
- [Blog das AMP](https://blog.amp.dev/)
- [Roteiro do projeto AMP](/content/amp-dev/community/roadmap.html)

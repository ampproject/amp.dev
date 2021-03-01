---
'$title': Integre a sua ferramenta de análise com o AMP
$order: 1
formats:
  - websites
  - stories
teaser:
  text: ' Visão geral'
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Visão geral <a name="overview"></a>

Se você opera uma ferramenta de software como serviço para que os editores compreendam melhor o seu tráfego e visitantes, você talvez queira integrar o seu serviço ao `amp-analytics`. Isto permitirá aos seus clientes visualizar os padrões de tráfego para as suas páginas AMP HTML.

## Antes de começar <a name="before-you-begin"></a>

Antes que você possa adicionar o seu serviço de análise ao runtime AMPHTML, você talvez precise:

- Identificar os tipos de [variáveis](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) e [solicitações](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#requests) que você vai precisar em um documento AMP HTML para o seu serviço de análise.
- Identificar os gatilhos que resultam em solicitações de análise enviadas a partir de uma página que seria relevante para o seu serviço.
- Considerar se e como você irá [rastrear os usuários através de](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md) contextos AMP principais e de terceiros.
- Determinar como seu painel de análise irá lidar com o tráfego AMP.
- Identificar qualquer funcionalidade em falta no `amp-analytics` e [registrar solicitações](https://github.com/ampproject/amphtml/issues/new) de recursos necessários.
- A análise AMP envia suas variáveis para um endpoint pré-configurado. Se você ainda não possui um endpoint existente, consulte [este exemplo](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample) para uma visão geral sobre como construir um.
  - Para todos os tipos de transporte, exceto `iframe`, as variáveis são enviadas como parâmetros de query string em uma solicitação HTTPS.
  - Para o tipo de transporte `iframe` , um iframe é criado e as variáveis são enviadas para ele via `window.postMessage`. Neste caso, a mensagem não precisa ser uma URL. Esta opção está disponível apenas para vendedores acreditados pelo MRC.
- Considere como a integração com `amp-analytics` pode impactar quaisquer políticas (especialmente sua política de privacidade) ou acordos que você possa ter.

## Como adicionar a sua configuração ao runtime AMP HTML <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Crie um [Intent-To-Implement issue](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features) declarando que você adicionará a configuração do seu serviço de análise ao runtime do AMP HTML. Certifique-se de incluir **cc @ampproject/wg-analytics** na sua descrição.
2. Desenvolva um patch que implemente o seguinte:
   1. Um novo arquivo json de configuração `${vendorName}.json` na [pasta](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors) de fornecedores, incluindo quaisquer opções acima e além do default, tais como:
      1. `"vars": {}` para variáveis default adicionais.
      2. `"requests": {}` para solicitações que seu serviço irá usar.
      3. `"optout":` se necessário. Atualmente não temos um grande sistema de opt-out, então por favor entre em contato para nos ajudar a projetar um que funcione bem para você.
      4. `"warningMessage":` se necessário. Exibe informações de advertência do fornecedor (como deprecação ou migração) na console.
   2. Se você estiver usando o transporte iframe, adicione também uma nova linha ao ANALYTICS_IFRAME_TRANSPORT_CONFIG no iframe-transport-vendors.js contendo `"*vendor-name*": "*url*"`
   3. Um exemplo na referência [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
   4. Um teste no arquivo [extensions/amp-analytics/0.1/test/vendor-requests.json ](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
   5. Adicione o seu serviço de análise à lista de fornecedores suportados no arquivo [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./analytics-vendors-list.md). Inclua o tipo, descrição e link para a sua documentação de uso.
3. Teste o novo exemplo que você colocou em [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) para garantir que os hits do exemplo estejam funcionando como esperado. Por exemplo, os dados necessários estão sendo coletados e exibidos no seu painel de análise.
4. Submeta uma solicitação de pull com este patch, referenciando a issue Intent-To-Implement.
5. Atualize a documentação de uso do seu serviço e avise aos seus clientes.
6. É altamente recomendado manter um [teste de integração fora do repositório AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## Gerentes de tags <a name="tag-managers"></a>

Os serviços de gestão de tags têm duas opções para integrar com AMP Analytics:

- **Abordagem de endpoint:** agindo como um endpoint adicional para `amp-analytics` e realizando gestão de marketing no back-end
- **Abordagem de configuração:** realizando a gestão de tags através de um arquivo de configuração JSON gerado dinamicamente e exclusivo para cada editor.

A abordagem de endpoint é a mesma que a abordagem padrão detalhada na seção anterior. A abordagem de configuração consiste em se criar uma configuração única para amp-analytics que seja específica para cada editor e inclua todos os seus pacotes de análise compatíveis. Um editor incluiria a configuração usando uma sintaxe como esta:

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

Para seguir esta abordagem, revise a documentação para a integração de editores com análises AMP.

## Outros Recursos <a name="further-resources"></a>

- Deep Dive: [Por que não simplesmente usar um iframe?](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/why-not-iframe.md)
- Deep Dive: [Gerenciando o estado de usuário não-autenticado com o AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)
- [amp-analytics sample](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- documentação de referência do [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- documentação de referência do [amp-analytics variables](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)

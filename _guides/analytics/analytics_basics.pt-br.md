---
layout: page
title: Analytics&#58; conceitos básicos
order: 0
locale: pt-br
---

Comece aqui a aprender os conceitos básicos sobre o AMP Analytics.

{% include toc.html %}

## Usar amp-pixel ou amp-analytics?

O AMP oferece dois componentes para atender às suas necessidades de análise e medição:
[amp-pixel](/docs/reference/amp-pixel.html) e
[amp-analytics](/docs/reference/extended/amp-analytics.html).
Ambas as opções enviam dados de análise a um endpoint definido.

Se você estiver buscando comportamentos como um simples
[pixel de rastreamento](https://en.wikipedia.org/wiki/Web_beacon#Implementation),
o componente `amp-pixel` proporciona um rastreamento de visualização de páginas básico;
os dados de visualização de página são enviados para um URL definido.
Algumas integrações com fornecedor podem necessitar esse componente,
em cujo caso eles especificarão o terminal exato do URL. 

Para a maioria das soluções de análise, utilize `amp-analytics`.
O rastreamento de visualizações de páginas também funciona em `amp-analytics`.
No entanto, você também pode rastrear o envolvimento do usuário com qualquer tipo de conteúdo de página,
incluindo cliques em links e botões.
Além disso, você pode medir até onde o usuário rolou a página,
se ele se interagiu ou não com mídias sociais e muito mais
(consulte
[Informações detalhadas sobre o AMP Analytics](/docs/guides/analytics/deep_dive_analytics.html)).

Como parte da integração com a plataforma AMP,
provedores ofereceram configurações predefinidas de`amp-analytics`
para que seja mais fácil capturar dados e movê-los para suas ferramentas de rastreamento.
Acesse a documentação para fornecedores da
[especificação do amp-analytics](/docs/reference/extended/amp-analytics.html).

Você pode usar `amp-pixel` e `amp-analytics` em suas páginas:
`amp-pixel` para rastreamento simples de visualizações de páginas
e `amp-analytics` para todo o resto.
Você também pode adicionar várias instâncias de cada tag disponível.
Se estiver trabalhando com vários provedores de análises,
precisará de uma tag por solução.
Tenha em mente que páginas AMP mais simples são melhores para os usuários,
portanto, se não precisar de tags adicionais, não as use.

## Criar uma configuração de análise simples

Saiba como criar uma configuração simples de
[amp-pixel](/docs/reference/amp-pixel.html) e
[amp-analytics](/docs/reference/extended/amp-analytics.html).

### Configuração simples de amp-pixel

Para criar uma configuração simples de `amp-pixel`,
insira algo parecido com o seguinte no corpo de sua página AMP:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
{% endhighlight %}

Neste exemplo,
os dados de visualização de página são enviados para um URL definido, juntamente com um número aleatório.
A variável `RANDOM` é uma entre muitas
[variáveis de substituição na plataforma AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
Saiba mais sobre
[Substituição de variáveis](/docs/guides/analytics/analytics_basics.html#variable-substitution) aqui.

O componente [amp-pixel](/docs/reference/amp-pixel.html)
é integrado,
de forma que você não precisa de uma declaração de inclusão, como ocorre
com os componentes estendidos do AMP, incluindo `amp-analytics`.
Entretanto, você deve colocar a tag `amp-pixel` o mais perto possível
do começo do seu `<body>`.
O pixel de rastreamento só será acionado quando a própria tag for visualizada.
Se `amp-pixel` estiver posicionado perto da parte inferior da página,
ele pode não ser acionado.

### Configuração simples de amp-analytics

Para criar uma configuração simples de
[amp-analytics](/docs/reference/extended/amp-analytics.html),
você deve primeiro incluir esta declaração `custom-element`
no `<head>` do documento AMP (consulte também
[Declaração de inclusão de componente](/docs/reference/extended.html#component-inclusion-declaration)):

{% highlight html %}
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
{% endhighlight %}

O seguinte exemplo é semelhante ao [exemplo do `amp-pixel`](/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration).
Todas as vezes que uma página está visível,
o evento é acionado e
envia os dados de page view para um URL definido, juntamente com uma ID aleatória: 

{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
{% endhighlight %}

No exemplo acima, definimos que uma solicitação chamada page view seria https://foo.com/pixel?RANDOM. Como discutido antes, RANDOM é substituído por um número aleatório, de forma que a solicitação acabe sendo algo parecido com https://foo.com/pixel?0.23479283687235653498734.

Quando a página se torna visível
(como especificado pelo uso da palavra-chave de acionamento `visible`),
um evento é acionado e a solicitação `pageview` é enviada.
O atributo triggers determina quando a solicitação de page view é acionada.
Saiba mais sobre [solicitações e acionamentos](/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports).

## Substituição de variáveis

Tanto o componente [amp-pixel](/docs/reference/amp-pixel.html) quanto
o [amp-analytics](/docs/reference/extended/amp-analytics.html)
permitem todas as substituições de variáveis de URL padrão (consulte
[Substituições de variáveis de AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).
No exemplo a seguir,
a solicitação de visualização de página é enviada ao URL
juntamente com o URL canônico do documento atual, seu título e uma
[ID de cliente](/docs/guides/analytics/analytics_basics.html#user-identification):

{% highlight html %}
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
{% endhighlight %}

Devido à sua simplicidade,
a tag `amp-pixel` somente pode incluir variáveis definidas pela plataforma
ou que o tempo de execução do AMP possa analisar a partir da página AMP.
No exemplo acima,
a plataforma preenche os valores do
`canonicalURL` e do `clientId(site-user-id)`.
A tag `amp-analytics` pode incluir as mesmas variáveis que `amp-pixel`,
assim como variáveis definidas de forma exclusiva dentro da configuração da tag.

Use o formato `${varName}` em uma string de solicitação para uma variável definida por página
ou plataforma.
A tag `amp-analytics` substituirá o modelo por seu valor real
no momento da construção da solicitação de análise (consulte também
[Variáveis permitidas no amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

No seguinte exemplo de `amp-analytics`,
a solicitação de visualização de página é enviada ao URL,
com dados adicionais extraídos de substituições de variáveis,
algumas fornecidas pela plataforma,
algumas definidas em linha,
dentro da configuração de `amp-analytics`:

{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }  
}
</script>
</amp-analytics>
{% endhighlight %}

No exemplo acima,
as variáveis `account` e `title` são definidas
na configuração de `amp-analytics`.
As variáveis `canonicalUrl` e `clientId` não são definidas na configuração,
de forma que seus valores são substituídos pela plataforma.

**Importante:** a substituição de variáveis é flexível;
você pode ter as mesmas variáveis definidas em diferentes locais,
e o tempo de execução do AMP analisará os valores nessa ordem de precedência
(consulte [Ordem da substituição de variáveis](/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)).

## Identificação do usuário

Websites usam cookies para armazenar informações específicas de um usuário no navegador.
Os cookies podem ser usados para dizer que um usuário já visitou um site antes.
No AMP,
as páginas podem ser fornecidas pelo website de um editor ou um cache
(como o Google AMP Cache).
O website do editor e o cache provavelmente têm domínios distintos.
Por razões de segurança,
os navegadores podem limitar o acesso aos cookies de outros domínios (e geralmente o fazem)
(consulte também
[Rastrear usuários em diferentes origens](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

Por padrão, o
AMP administrará a provisão de uma ID de cliente, seja a página acessada pelo website original do editor ou por um cache.
A ID de cliente gerada pelo AMP tem o valor `"amp-"`
seguido de uma string codificada aleatória `base64` e permanece a mesma
para o usuário se ele voltar a visitar a página.

O AMP administra a leitura e gravação da ID de cliente em todos os casos.
Isso é particularmente notável no caso em que uma página é fornecida
através de um cache ou mostrada fora do contexto de visualização
do site original do editor.
Nessa circunstância, o acesso aos cookies do site do editor não está disponível.

Quando uma página AMP é fornecida a partir do site do editor,
a estrutura da ID de cliente que o AMP usa pode ser instruída a buscar e usar
um cookie de fallback.
Nesse caso,
o argumento `cid-scope-cookie-fallback-name` da variável `clientId`
é interpretado como o nome do cookie.
O formato pode aparecer como
`CLIENT_ID(cid-scope-cookie-fallback-name)` ou como
`${clientId(cid-scope-cookie-fallback-name)}`.

Por exemplo:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
{% endhighlight %}

Se o AMP descobrir que o cookie está definido,
a substituição da ID de cliente retornará o valor do cookie.
Se o AMP descobrir que esse cookie não está definido,
ele gerará um valor do formulário `amp-` seguido
de uma string codificada aleatória base64.

Saiba mais sobre a substituição da ID de cliente,
incluindo como adicionar uma ID de notificação de usuário adicional em
[Variáveis permitidas no AMP Analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).

---
$title: amp-access-laterpay
$category@: dynamic-content
teaser:
  text: Permite que os editores se integrem facilmente com a plataforma de micropagamentos LaterPay.
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



Permite que os editores se integrem facilmente com a plataforma de micropagamentos [LaterPay](https://www.laterpay.net). O `amp-access-laterpay` é baseado no [AMP Access](amp-access.md) e o exige.

<table>
  <tr>
    <td class="col-fourty"><strong>Scripts obrigatórios</strong></td>
    <td>
      <small>Você precisa de scripts para "amp-access-laterpay", "amp-access" e "amp-analytics".</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://cdn.ampproject.org/v0/amp-access-laterpay-0.2.js"></script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>Exemplos</strong></td>
    <td>Consulte um exemplo <a href="https://ampbyexample.com/components/amp-access-laterpay/">com notas do amp-access-laterpay</a> no site AMP By Example.</td>
  </tr>
</table>


## Comportamento <a name="behavior"></a>

[O LaterPay](https://laterpay.net) é uma plataforma de micropagamento que permite aos usuários comprar qualquer conteúdo on-line com apenas dois cliques e ter acesso imediato, sem registro antecipado, dados pessoais ou pagamento. Os usuários só pagam quando as compras atingirem um total de cinco dólares ou cinco euros nos sites. Os provedores de conteúdo podem vender itens individuais ou cartões de tempo, que permitem o acesso ao conteúdo por uma taxa fixa ou por um tempo limitado.

Se você estiver integrando o LaterPay por meio da [integração do Connector Script](https://docs.laterpay.net/connector/) (link em inglês), não poderá usar essa integração em páginas AMP. O `amp-access-laterpay` é semelhante ao Connector Script, fornecendo um conjunto semelhante de recursos, mas criado para páginas AMP.

Também é possível vender conteúdo pelo LaterPay simplesmente usando o `amp-access-laterpay` como único método de integração.

O componente `amp-access-laterpay` usa o AMP Access internamente para oferecer um comportamento semelhante ao AMP Access, mas adaptado para uso com o serviço LaterPay.

Se você tem seu próprio serviço de paywall e quer usá-lo com o AMP Access e com o LaterPay na mesma página, [também é possível fazer isso](#using-amp-access-laterpay-together-with-amp-access).

O componente `amp-access-laterpay` não requer uma configuração de autorização ou pingback, porque ele está pré-configurado para funcionar com o serviço LaterPay. Ele também não precisa de configuração manual de links de login.

As diferentes opções de compra podem ser configuradas na conta do LaterPay do editor, e o componente recuperará a configuração e criará uma lista de opções de compra disponíveis.

Consulte a documentação sobre a configuração do [LaterPay Connector](https://docs.laterpay.net/connector/configuration/) (link em inglês), a integração de front-end do LaterPay, para saber como configurar as opções de compra.

A lista gerada pode ser estilizada e apresentada de acordo com a preferência do editor.

Esse componente também depende da [marcação de conteúdo de acesso](amp-access.md#access-content-markup) para mostrar e ocultar conteúdo.

## Configuração <a name="configuration"></a>

A configuração é semelhante ao AMP Access, mas não são necessários links de login, autorização e pingback.

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
      }
    }
</script>

```

Os seguintes valores podem ser definidos no objeto de configuração `laterpay`:

<table>
  <tr>
    <th class="col-fourty">Propriedade</th>
    <th class="col-twenty">Valores</th>
    <th class="col-fourty">Descrição</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>Seletor de CSS <strong>obrigatório</strong></td>
    <td>Um seletor de CSS que determina o elemento na página que contém o título do artigo. Isso garante que a página apresentada para compra do artigo contenha esse título para que o usuário saiba o que está comprando.</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>Lista de identificadores separados por vírgulas</td>
    <td>Por padrão, o URL de um artigo é usado para fazer a correspondência com uma opção de compra. No entanto, em vez de especificar um caminho do URL para uma opção de compra, você pode definir um código do artigo na IU do LaterPay Connector e depois usar a propriedade <code>articleId</code> para fazer a correspondência do artigo com a opção de compra.
      <br>
        Isso é necessário nos casos em que a correspondência com uma opção de compra usando o URL de um artigo não é flexível o suficiente. Consulte a <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">página de configuração do LaterPay Connector ()</a> (link em inglês) para ver alguns exemplos de situações em que isso é útil.</td>
      </tr>
      <tr>
        <td><code>jwt</code></td>
        <td>Token JWT para configuração de pagamento dinâmico</td>
        <td>Esta opção permite que você especifique um JSON Web Token conectado, com uma configuração para o conteúdo pago disponível. Isso significa que você pode fornecer uma configuração in-page, gerada de modo programático nas suas páginas, em vez de especificá-la manualmente na interface do administrador do LaterPay Connector. Isso pode ser útil principalmente para configurar compras únicas de muitos artigos diferentes.
          <br>
            Se você quiser mais informações sobre como criar esse token e sobre qual conteúdo pode ser especificado nele, consulte a documentação da <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">API JWT Paid Content</a> do LaterPay (link em inglês) para integração com o Connector Script.
          </td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>string</td>
          <td>Define o estilo de formatação de preço adequado para a localidade.</td>
        </tr>
        <tr>
          <td><code>localeMessages</code></td>
          <td>objeto</td>
          <td>Permite que o editor personalize ou localize o texto presente na lista gerada de opções de compra. Consulte a seção <a href="#localization">Localização</a> para ver mais informações.</td>
        </tr>
        <tr>
          <td><code>scrollToTopAfterAuth</code></td>
          <td>booleano</td>
          <td>Se for verdadeiro, rola a página para a parte superior após a conclusão do processo de autorização. Isso pode ser útil se o lugar em que você mostra a caixa de diálogo estiver mais abaixo na página, e o usuário puder ficar confuso com a posição de rolagem dele depois de retornar à página.</td>
        </tr>
        <tr>
          <td><code>region</code></td>
          <td>string</td>
          <td>Especifica se você está na região <code>eu</code> ou <code>us</code> do <a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html">LaterPay</a>.</td>
        </tr>
        <tr>
          <td><code>sandbox</code></td>
          <td>booleano</td>
          <td>Necessário apenas se você estiver usando o modo de sandbox para testar a configuração do seu servidor. Você também precisa usar o <a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">modo de desenvolvimento</a> de AMP.</td>
        </tr>
      </table>

## Usar a marcação de conteúdo de acesso e mostrar a lista de compras <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

A marcação de conteúdo de acesso precisa ser usada da mesma forma que o AMP Access.

O elemento com o código `amp-access-laterpay-dialog` renderiza uma lista de opções de compra quando o usuário não tem acesso ao artigo. Essa lista tem um estilo muito básico e pode ser personalizada para uma integração maior com a página do editor.

Adicione a classe `amp-access-laterpay` se quiser usar o estilo padrão.

```html
<section amp-access="NOT error AND NOT access" amp-access-hide="">
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide="">
  Oops... Something broke.
</section>

<div amp-access="access" amp-access-hide="">
  <p>...article content...</p>
</div>

```

## Estilo <a name="styling"></a>

Várias classes são aplicadas a alguns dos elementos na marcação gerada. Os elementos sem classes podem ser citados sem ambiguidades por meio de seletores de elementos CSS.

Já existe um CSS com layout básico, mas é recomendável que os editores definam o estilo para que ele corresponda à aparência das páginas deles.

A estrutura criada para a caixa de diálogo se parece com a seguinte:

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      Optional, appears if header locale message is defined.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio">
            <div class="amp-access-laterpay-metadata">
              <span class="amp-access-laterpay-title">Purchase option title</span>
              <p class="amp-access-laterpay-description">Purchase option description</p>
            </div>
          </label>
          <p class="amp-access-laterpay-price-container">
            <span class="amp-access-laterpay-price">0.15</span>
            <sup class="amp-access-laterpay-currency">USD</sup>
          </p>
        </li>
        <!-- ... more list items for other purchase options ... -->
      </ul>
      <button class="amp-access-laterpay-purchase-button">Comprar agora</button>
      <p class="amp-access-laterpay-already-purchased-container">
        <a href="...">I already bought this</a>
      </p>
      <p class="amp-access-laterpay-footer">
        Optional, appears if footer locale message is defined.
      </p>
    </div>
    <p class="amp-access-laterpay-badge">Powered by <a href="https://laterpay.net" target="_blank">LaterPay</a></p>
  </div>

```

## Localização <a name="localization"></a>

O texto mostrado na caixa de diálogo das opções de compra é definido pelo editor na IU do LaterPay Connector.

O texto restante faz parte do componente estendido e pode ser alterado e localizado usando as opções de configuração da seguinte forma:

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
        }
      }
    }
</script>

```

As seguintes chaves de mensagem podem ser traduzidas ou personalizadas, mas precisam manter o significado e a intenção originais.

<table>
  <tr>
    <th class="col-fourty">Chave</th>
    <th class="col-fourty">Descrição</th>
    <th>Valor padrão</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>Texto mostrado no botão de compra para opções que podem ser pagas posteriormente.</td>
    <td>"Compre agora, pague depois"</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>Texto mostrado no botão de compra para opções que precisam ser pagas no momento da compra.</td>
    <td>"Compre agora"</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>Texto padrão mostrado no botão de compra antes de qualquer opção ser selecionada.</td>
    <td>"Compre agora"</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>Se o usuário já tiver comprado o artigo, mas tiver perdido os cookies ou estiver em outro dispositivo, ele poderá usar esse link para fazer login no LaterPay e recuperar as compras.</td>
    <td>"Já comprei isso"</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>Texto de cabeçalho opcional.</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>Texto de rodapé opcional.</td>
    <td></td>
  </tr>
</table>

## Análise <a name="analytics"></a>

Como `amp-access-laterpay` é baseado em `amp-access`, ele é compatível com todos os [eventos de análise](amp-access.md#integration-with-amp-analytics) enviados pelo `amp-access`.

Todos os exemplos disponíveis em [https://ampexample.laterpay.net/](https://ampexample.laterpay.net/) estão configurados para enviar esses eventos de análise, caso você queira ver um exemplo mais completo de como isso é na prática.

## Usar o AMP Access LaterPay com o AMP Access <a name="using-amp-access-laterpay-together-with-amp-access"></a>

Se você tem um sistema de assinatura e pretende usar o LaterPay somente para vendas de artigos individuais, é possível fazer com que os dois métodos de venda coexistam na mesma página, usando AMP Access e AMP Access LaterPay juntos.

Primeiro, consulte a documentação do [AMP Access](amp-access.md) para saber como configurar o AMP Access com seu paywall existente.

A seção sobre [vários provedores](amp-access.md#multiple-access-providers) explica como configurar diversos provedores com namespaces.

Ao usar o AMP Access com o LaterPay e uma integração de paywall existente, a configuração necessária pode ser semelhante a esta:

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
      },
      "namespace": "laterpay"
    },
    {
      "authorization":
          "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
          "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
          "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
      "namespace": "publishername"
    }
  ]
</script>

```

Em que a marcação de acesso ao conteúdo pode se parecer com esta:

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">Login here to access your PublisherName subscription.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide>
  Oops... Something broke.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>...article content...</p>
</div>

```

Veja um exemplo mais completo em [https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html) (link em inglês).

## Documentação relacionada <a name="related-documentation"></a>

* [AMP Access](amp-access.md)
* [LaterPay (link em inglês)](https://www.laterpay.net)
* [LaterPay: como fazemos micropagamentos (link em inglês)](https://docs.laterpay.net/how_we_do_micropayments/)
* [LaterPay Connector](https://connectormwi.laterpay.net/docs/index.html) (link em inglês). Semelhante ao AMP Access LaterPay, mas voltado para páginas que não são AMP.

## Validação <a name="validation"></a>

Consulte as [regras do amp-access-laterpay](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii) (link em inglês) nas especificações do validador de AMP.

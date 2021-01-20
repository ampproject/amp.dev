---
$title: amp-addthis
$category@: social
teaser:
  text: Exibe uma incorporação de ferramentas do site do AddThis.
---


<!--
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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



Exibe uma incorporação das ferramentas do site do [AddThis](https://www.addthis.com).

<table>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-addthis" src="https://cdn.ampproject.org/v0/amp-addthis-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
</table>


## Por que o AddThis? <a name="why-addthis"></a>

O componente `amp-addthis` oferece botões de compartilhamento simples e bonitos. Faça com que os visitantes do seu site compartilhem conteúdo com facilidade em mais de 200 redes sociais, incluindo Messenger, WhatsApp, Facebook, Twitter, Pinterest e muitas outras.

O AddThis é usado por mais de 15 milhões de sites, com mais de dois bilhões de usuários únicos, que compartilham conteúdo no mundo todo, em mais de 60 idiomas.

## Botões de compartilhamento <a name="share-buttons"></a>

### Flutuantes <a name="floating"></a>

Colocados nas laterais, na parte superior ou inferior da página, seguindo o leitor à medida que ele rola a página. Uma ótima maneira de promover o compartilhamento sem ficar muito "na cara".

Exemplo:
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  layout="responsive"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="957l"
  data-widget-type="floating">
</amp-addthis>
```

### In-line <a name="inline"></a>

Integre botões de compartilhamento ao seu conteúdo para ter uma experiência de compartilhamento ideal.

Exemplo:
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="mv93"
  data-widget-type="inline">
</amp-addthis>
```

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>data-pub-id</strong></td>
    <td>O ID do editor do AddThis encontrado no URL do <a href="https://addthis.com/dashboard">painel do AddThis</a> após o login. Por exemplo, no URL <code>https://www.addthis.com/dashboard#gallery/pub/ra-5c191331410932ff</code>, <code>ra-5c191331410932ff</code> é o ID do editor.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-id</strong></td>
    <td>O código do widget do AddThis para a ferramenta a ser exibida, também encontrado no <a href="https://addthis.com/dashboard">painel do AddThis</a>. O código do widget para uma ferramenta específica pode ser encontrado abrindo a ferramenta pelo painel do AddThis e copiando a última parte do URL. Por exemplo, no URL <code>https://www.addthis.com/dashboard#tool-config/pub/ra-5c191331410932ff/widgetId/957l</code>, <code>957l</code> é o código do widget.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-type</strong></td>
    <td>Atributo que descreve o tipo de widget.
      <ul>
        <li>Flutuante: <code>data-widget-type="floating"</code></li>
        <li>In-line: <code>data-widget-type="inline"</code></li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-title</strong></td>
      <td>Opcional. Se for configurado, é o título que a ferramenta AddThis tentará compartilhar durante o compartilhamento. Se não for configurado, o título do documento que contém a tag <code>amp-addthis</code> será usado.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-url</strong></td>
      <td>Opcional. Se for configurado, é o URL que a ferramenta AddThis tentará compartilhar durante o compartilhamento. Se não for configurado, a propriedade <code>location.href</code> do documento que contém a tag <code>amp-addthis</code> será usada.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-media</strong></td>
      <td>Opcional. Se for configurado, é o URL de uma mídia (por exemplo, imagem ou vídeo) que a ferramenta AddThis tentará compartilhar durante o compartilhamento. Se não for configurado, isso ficará indefinido.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-description</strong></td>
      <td>Opcional. Se for configurado, é a descrição da página que a ferramenta do AddThis tentará compartilhar durante o compartilhamento. Se não for configurado, isso ficará indefinido.</td>
    </tr>
  </table>

## Documentação de implementação <a name="implementation-documentation"></a>

1. Você precisará criar uma conta do AddThis em [https://www.addthis.com/register](https://www.addthis.com/register), caso ainda não tenha feito isso. A criação de uma conta do AddThis é totalmente gratuita e permite que você acesse nosso conjunto completo de ferramentas de sites, bem como nossos relatórios de análise detalhados para entender melhor o tráfego social do seu site.
1. Acesse [seu painel](https://addthis.com/dashboard) e personalize seus botões de compartilhamento. No momento, as páginas AMP são compatíveis apenas com botões de compartilhamento flutuantes e in-line.
1. Personalize seus botões de compartilhamento como quiser e pressione "activate tool". Isso redirecionará você para nossa página "Get The Code".
1. Por fim, copie e cole o código in-line na seção do corpo da sua página onde você quer que os botões de compartilhamento apareçam. No caso dos botões de compartilhamento flutuantes, você pode colocar esse código em qualquer parte do corpo, porque ele aparecerá automaticamente no lado esquerdo ou direito da tela, dependendo de onde você o definiu nas configurações da ferramenta.

Pronto! Você verá os botões de compartilhamento aparecendo na sua página.

Confira nosso [vídeo do YouTube](https://www.youtube.com/watch?v=BSkuAB4er2o) para ver instruções passo a passo:
<amp-youtube width="480" height="270" data-videoid="BSkuAB4er2o" layout="responsive"></amp-youtube>

## Validação <a name="validation"></a>

Consulte as [regras do amp-addthis](https://github.com/ampproject/amphtml/blob/master/extensions/amp-addthis/validator-amp-addthis.protoascii) (em inglês) nas especificações do validador de AMP.

## Privacidade <a name="privacy"></a>

[http://www.addthis.com/privacy/privacy-policy/](http://www.addthis.com/privacy/privacy-policy/)

As ferramentas e a barra de ferramentas do AddThis coletam informações do dispositivo usado pelo usuário final para interagir com os sites do editor ou pelo usuário da barra de ferramentas para interagir com a barra de ferramentas do AddThis (coletivamente chamados de “Dados do AddThis”).

Os Dados do AddThis podem consistir nos seguintes itens:

* Endereço de Protocolo de Internet (IP, na sigla em inglês); ID de publicidade móvel (MAID, na sigla em inglês), que permite aos desenvolvedores de apps para dispositivos móveis identificarem quem está usando os apps deles; ID do aplicativo móvel; tipo de navegador; idioma do navegador; tipo de sistema operacional; data e hora em que o usuário final acessou um site do editor ou uma barra de ferramentas.
* O usuário que usou a barra de ferramentas.
* O comportamento em um site do editor, por exemplo, por quanto tempo o usuário final visitou o site do editor, o comportamento de compartilhamento de conteúdo do usuário final em um site do editor e o comportamento de rolagem de um usuário final em um site do editor.
* O URL de referência e a pesquisa na Web que o usuário final usou para localizar e navegar para um site do editor.
* Palavras-chave inseridas na funcionalidade de pesquisa da barra de ferramentas do AddThis e quando o usuário da barra de ferramentas fez o download, instalou ou desinstalou a barra de ferramentas do AddThis, se aplicável.
* Informações sobre a frequência com que um usuário final usa as ferramentas do AddThis e a frequência com que um usuário utiliza a barra de ferramentas do AddThis.
* Dados de geolocalização derivados do endereço IP de um usuário final e de um usuário da barra de ferramentas.

Os Dados do AddThis serão tratados como informações pessoais na medida exigida pela legislação aplicável. Os editores são obrigados, de acordo com os Termos de Serviço do AddThis, a receber do usuário final todos os consentimentos e autorizações necessários e a dar todos os avisos necessários para o fornecimento dos Dados do AddThis coletados de usuários finais para a Oracle.

## Suporte <a name="support"></a>

Caso você tenha alguma dúvida ou precise de ajuda para implementar o AddThis em AMP, entre em contato com nossa equipe de suporte enviando um tíquete [aqui](https://www.addthis.com/support/) ou enviando um e-mail para [help@addthis.com](mailto%3ahelp@addthis.com).

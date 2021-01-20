---
$title: amp-iframe
$category@: layout
teaser:
  text: Exibe um iframe.
---


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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



Exibe um iframe.


<table>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemplos</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">Exemplo de código com notas para amp-iframe</a></td>
  </tr>
</table>

# Comportamento <a name="behavior"></a>

O `amp-iframe` tem várias diferenças importantes em relação aos iframes vanilla, que têm como objetivo torná-lo mais seguro e evitar arquivos AMP que sejam dominados por um único iframe:

* Um `amp-iframe` pode não aparecer perto da parte superior do documento (exceto para iframes que usam `placeholder` como [descrito abaixo](#iframe-with-placeholder)). O iframe precisa estar a 600 px da parte superior ou não estar dentro dos primeiros 75% da janela de visualização quando rolado para a parte superior, o que for menor.
* Por padrão, um amp-iframe é colocado em sandbox (veja [mais detalhes](#sandbox)).
* Um `amp-iframe` só deve solicitar recursos por meio de HTTPS, de um URI de dados ou do atributo `srcdoc`.
* Um `amp-iframe` não pode ter a mesma origem que o contêiner, a menos que não permita `allow-same-origin` no atributo `sandbox`. Consulte o documento [Política de origem do iframe](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md) (link em inglês) para ver mais detalhes sobre as origens permitidas para iframes.

*Exemplo: um mapa do Google Maps incorporado a um amp-iframe*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland">
  </amp-iframe>
```

É renderizado como:

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="success"]
para ver mais demonstrações do `amp-iframe`, visite o site [AMP By Example](https://ampbyexample.com/components/amp-iframe/).
[/tip]

# Uso do amp-iframe para publicidade <a name="usage-of-amp-iframe-for-advertising"></a>

O `amp-iframe` **não pode** ser usado com a finalidade principal de exibir publicidade. Não há problema em usar o `amp-iframe` para exibir vídeos que contenham publicidade em parte deles. Essa política de AMP pode ser aplicada ao não renderizar os respectivos iframes.

Os casos de uso de publicidade precisam usar o [`amp-ad`](amp-ad.md).

Os motivos dessa política são os seguintes:

* O `amp-iframe` aplica a colocação em sandbox, que também é aplicado a iframes filhos. Isso significa que as páginas de destino podem ser corrompidas, mesmo que o anúncio em si pareça funcionar.
* O `amp-iframe` não fornece nenhum mecanismo para transmitir a configuração para o iframe.
* O `amp-iframe` não tem um mecanismo de redimensionamento totalmente controlado por iframe.
* As informações de visibilidade podem não estar disponíveis para o `amp-iframe`.

# Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>O atributo <code>src</code> se comporta praticamente da mesma forma que um iframe padrão, com uma exceção: o fragmento <code>#amp=1</code> é adicionado ao URL para permitir que os documentos de origem saibam que estão incorporados no contexto de AMP. Esse fragmento só é adicionado se o URL especificado por <code>src</code> ainda não tiver um fragmento.</td>
  </tr>
  <tr>
    <td width="40%"><strong>srcdoc, frameborder, allowfullscreen, allowpaymentrequest, allowtransparency, referrerpolicy</strong></td>
    <td>Todos esses atributos se comportam como em iframes padrão.
      <br>
        Se o <code>frameborder</code> não for especificado, ele será definido como <code>0</code>, por padrão.</td>
      </tr>
      <tr>
        <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
        <td>Iframes criados pelo <code>amp-iframe</code> sempre têm o atributo <code>sandbox</code> definido neles. Por padrão, o valor fica vazio, o que significa que eles são "colocados em sandbox ao máximo". Ao configurar os valores de <code>sandbox</code>, é possível optar que uma parte menor do iframe seja colocada em sandbox. Todos os valores aceitos pelos navegadores são permitidos. Por exemplo, a configuração de <code>sandbox="allow-scripts"</code> permite que o iframe execute JavaScript, e de <code>sandbox="allow-scripts allow-same-origin"</code> permite que o iframe execute JavaScript, crie XHRs que não sejam CORS e leia/grave cookies.
          <br><br>
            Se você estiver transformando em iframe um documento que não foi especificamente criado com sandbox em mente, provavelmente precisará adicionar <code>allow-scripts allow-same-origin</code> ao atributo <code>sandbox</code> e talvez precise permitir recursos adicionais.
            <br><br>
              Além disso, o sandbox se aplica a todas as janelas abertas a partir de um iframe colocado em sandbox. Isso inclui novas janelas criadas por um link com <code>target=_blank</code> (adicione <code>allow-popups</code> para que isso aconteça). O acréscimo de <code>allow-popups-to-escape-sandbox</code> ao atributo <code>sandbox</code> faz com que essas novas janelas se comportem como novas janelas sem sandbox. Na maioria das vezes, isso é o que você espera que aconteça. Infelizmente, no momento, o <code>allow-popups-to-escape-sandbox</code> só é compatível com o Google Chrome.
              <br><br>
                Consulte os <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/iframe#attr-sandbox">documentos no MDN</a> para ver mais detalhes sobre o atributo sandbox.</td>
              </tr>
              <tr>
                <td width="40%"><strong>common attributes</strong></td>
                <td>Este elemento inclui <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comuns</a> estendidos a componentes de AMP.</td>
              </tr>
            </table>

# Iframe com marcador <a name="iframe-with-placeholder"></a>

É possível fazer com que um `amp-iframe` apareça na parte superior de um documento quando o `amp-iframe` tiver um elemento `placeholder`, como mostrado no exemplo abaixo.

* O `amp-iframe` precisa conter um elemento com o atributo `placeholder` (por exemplo, um elemento `amp-img`), que seria renderizado como um marcador até que o iframe esteja pronto para exibição.
* A prontidão do iframe pode ser conhecida ouvindo o `onload` do iframe ou uma `embed-ready` `postMessage` enviada pelo documento do iframe, o que ocorrer primeiro.

*Exemplo: iframe com um marcador*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    src="https://foo.com/iframe">
    <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*Exemplo: solicitação de iframe pronto para incorporação*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
  }, '*');
```

# Redimensionamento do iframe <a name="iframe-resizing"></a>

Um `amp-iframe` precisa ter o layout estático definido, como acontece com qualquer outro elemento AMP. No entanto, é possível redimensionar um `amp-iframe` no tempo de execução. Para fazer isso, siga estas etapas:

1. O `amp-iframe` precisa ser definido com o atributo `resizable`.
1. O `amp-iframe` precisa ter um elemento filho `overflow`.
1. O `amp-iframe` precisa configurar o atributo de sandbox `allow-same-origin`.
1. O documento do iframe precisa enviar uma solicitação de `embed-size` como uma mensagem de janela.
1. A solicitação de `embed-size` será negada se a altura pedida for menor que determinado limite (100 px).

Observe que `resizable` modifica o valor de `scrolling` para `no`.

*Exemplo: `amp-iframe` com elemento `overflow`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
    <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*Exemplo: solicitação de redimensionamento de iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-size',
  height: document.body.scrollHeight
  }, '*');
```

Depois que essa mensagem é recebida, o ambiente de tempo de execução de AMP tenta atender à solicitação assim que possível, mas leva em consideração a parte que está sendo lida no momento, se a rolagem é contínua ou não e qualquer outra UX ou fator de desempenho. Se o ambiente de tempo de execução não atender à solicitação de redimensionamento, o `amp-iframe` mostrará um elemento `overflow`. Ao clicar no elemento `overflow`, o `amp-iframe` será redimensionado imediatamente, já que ele é acionado por uma ação do usuário.

Veja alguns fatores que afetam a rapidez com que o redimensionamento será executado:

* Se o redimensionamento for acionado por uma ação do usuário.
* Se o redimensionamento for solicitado para um iframe ativo no momento.
* Se o redimensionamento for solicitado para um iframe abaixo ou acima da janela de visualização.

# Visibilidade do iframe <a name="iframe-viewability"></a>

Iframes podem enviar uma mensagem `send-intersections` aos respectivos pais para começar a receber [registros de alterações](https://developer.mozilla.org/pt-BR/docs/Web/API/IntersectionObserverEntry) com o estilo IntersectionObserver da intersecção do iframe com a janela de visualização pai.

*Observação: nos exemplos a seguir, presumimos que o script esteja no iframe criado, em que `window.parent` é a janela superior. Se o script estiver em um iframe aninhado, altere `window.parent` para a janela de AMP superior.*

*Exemplo: solicitação `send-intersections` de iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'send-intersections'
  }, '*');
```

O iframe pode escutar uma mensagem `intersection` da janela pai para receber os dados de interseção.

*Exemplo: solicitação `send-intersections` de iframe*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
  event.origin == window.location.origin ||
  !event.data ||
  event.data.sentinel != 'amp' ||
  event.data.type != 'intersection') {
    return;
    }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

A mensagem de interseção seria enviada ao iframe pelo pai quando o iframe entrar ou sair da janela de visualização (ou estiver parcialmente visível), quando ele for rolado ou redimensionado.

# Iframes de rastreamento/análise <a name="trackinganalytics-iframes"></a>

Recomendamos o uso do [`amp-analytics`](amp-analytics.md) para fins de análise, porque ele é significativamente mais robusto, completo e uma solução eficiente que pode ser configurada para uma ampla gama de fornecedores de análise.

As AMP permitem apenas um iframe por página, que é usado para fins de análise e rastreamento. Para economizar recursos, esses iframes serão removidos do DOM cinco segundos depois de serem carregados, o que é tempo suficiente para concluir qualquer trabalho que precise ser feito.

Os iframes são identificados como de rastreamento/análise se não parecem atender a nenhum propósito de usuário direto, como ser invisível ou pequeno.

# Diretriz: usar componentes AMP existentes sobre amp-iframe <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

O componente `amp-iframe` precisa ser considerado um substituto se a experiência do usuário necessária não for possível por outros meios em AMP, ou seja, se ainda não existir um [componente AMP](../../../documentation/components/index.html) para o caso de uso. Isso ocorre porque há muitos benefícios em usar um componente AMP personalizado para um caso de uso específico, como:

* Melhor gerenciamento de recursos e desempenho.
* Componentes personalizados podem fornecer imagens de marcadores incorporadas em alguns casos. Isso significa conseguir, digamos, a miniatura de vídeo correta antes do carregamento de um vídeo, reduzindo o esforço de codificação para adicionar um marcador manualmente.
* Redimensionamento integrado. Isso significa que o conteúdo de iframe com tamanho imprevisível pode aparecer com mais frequência para o usuário, como se fosse nativo à página, e não em um frame rolável.
* Outros recursos adicionais podem ser incorporados (por exemplo, reprodução automática para players de vídeo).

# Validação <a name="validation"></a>

Consulte as [regras do amp-iframe](https://github.com/ampproject/amphtml/blob/master/extensions/amp-iframe/validator-amp-iframe.protoascii) (link em inglês) nas especificações do validador de AMP.

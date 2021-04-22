---
$title: amp-lightbox
$category@: layout
teaser:
  text: Exibe elementos em um modal "lightbox" que ocupa toda a janela de visualização.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



<table>
  <tr>
    <td width="40%"><strong>Descrição</strong></td>
    <td>Exibe elementos em um modal "lightbox" que ocupa toda a janela de visualização.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemplos</strong></td>
    <td>Veja um exemplo de <a href="https://ampbyexample.com/components/amp-lightbox/">amp-lightbox</a> no site AMP By Example.</td>
  </tr>
</table>

## Comportamento <a name="behavior"></a>

O componente `amp-lightbox` define elementos filhos que são exibidos em uma modal/sobreposição que ocupa toda a janela de visualização. Quando o usuário toca ou clica em um elemento (por exemplo, um botão), o código do `amp-lightbox` referenciado no atributo `on` do elemento clicado aciona o lightbox para que ocupe toda a janela de visualização e exiba os elementos filhos do `amp-lightbox`.

Pressionar a tecla Esc no teclado fecha o lightbox. Como alternativa, definir o atributo `on` em um ou mais elementos do lightbox e configurar o respectivo método como `close` fecha o lightbox quando se toca ou clica no elemento.

```html
<button on="tap:quote-lb">See Quote</button>
<amp-lightbox id="quote-lb" layout="nodisplay">
  <blockquote>"Don't talk to me about JavaScript fatigue" - Horse JS</blockquote>
  <button on="tap:quote-lb.close">Nice!</button>
</amp-lightbox>
```

[tip type="read"]
para mostrar imagens em um lightbox, há também o componente [`<amp-image-lightbox>`](amp-image-lightbox.md).
[/tip]

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>animate-in (opcional)</strong></td>
    <td>Define o estilo da animação para abrir o lightbox. Por padrão, ele é definido como <code>fade-in</code>. Os valores válidos são <code>fade-in</code>, <code>fly-in-bottom</code> e <code>fly-in-top</code>.
      <br><br>
        <strong>Observação</strong>: as predefinições de animação <code>fly-in-*</code> modificam a propriedade <code>transform</code> do elemento <code>amp-lightbox</code>. Não confie na transformação direta do elemento <code>amp-lightbox</code>. Se você precisar aplicar uma transformação, defina-a em um elemento aninhado.</td>
      </tr>
      <tr>
        <td width="40%"><strong>close-button (obrigatório em anúncios HTML para AMP)</strong></td>
        <td>Renderiza um botão "fechar" no cabeçalho, na parte superior do lightbox. Esse atributo só é obrigatório e válido para uso com <a href="#a4a">anúncios HTML para AMP</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>id (obrigatório)</strong></td>
        <td>Identificador exclusivo para o lightbox.</td>
      </tr>
      <tr>
        <td width="40%"><strong>layout (obrigatório)</strong></td>
        <td>Precisa ser configurado como <code>nodisplay</code>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>scrollable (opcional)</strong></td>
        <td>Quando o atributo <code>scrollable</code> está presente, o conteúdo do lightbox pode ser rolável ao ultrapassar a altura do lightbox.
          <br><br>
            <strong>Observação</strong>: o atributo <code>scrollable</code> não é permitido ao usar o <code>&lt;amp-lightbox&gt;</code> dentro de um anúncio HTML para AMP. Para ver mais detalhes, leia a seção <a href="#a4a">Usar o amp-lightbox em anúncios HTML para AMP</a>.</td>
          </tr>
          <tr>
            <td width="40%"><strong>scrollable (opcional)</strong></td>
            <td></td>
          </tr>
        </table>

## Estilo <a name="styling"></a>

É possível estilizar o `amp-lightbox` com CSS padrão.

## Ações <a name="actions"></a>

O `amp-lightbox` expõe as seguintes ações em que você pode usar [a sintaxe AMP para acionar](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md):

<table>
  <tr>
    <th width="20%">Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>open</code> (padrão)</td>
    <td>Abre o lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Fecha o lightbox.</td>
  </tr>
</table>

## <a id="a4a"></a>Usar o `amp-lightbox` em anúncios HTML para AMP <a name="a4a"></a>

[tip type="note"]
o componente `amp-lightbox` para uso em anúncios HTML para AMP é [experimental](../../../documentation/guides-and-tutorials/learn/experimental.md) e está em desenvolvimento. Para usar o `amp-lightbox` em anúncios HTML para AMP, [ative o experimento `amp-lightbox-a4a-proto`](http://cdn.ampproject.org/experiments.html).
[/tip]

Há algumas diferenças entre o uso de `amp-lightbox` em documentos AMP normais e em [anúncios escritos em HTML para AMP](../../../documentation/guides-and-tutorials/learn/a4a_spec.md):

### Botão de fechar obrigatório <a name="requires-close-button"></a>

Para anúncios HTML para AMP, o atributo `close-button` é obrigatório. Esse atributo faz com que um cabeçalho seja renderizado na parte superior do lightbox. O cabeçalho contém um botão "Fechar" e um rótulo escrito "Anúncio". O requisito desse cabeçalho é necessário para:

* definir uma experiência do usuário consistente e previsível para anúncios HTML para AMP;
* garantir que sempre exista um ponto de saída para o lightbox. Caso contrário, o criativo poderá invadir o conteúdo do documento do host por meio de um lightbox.

O atributo `close-button` é obrigatório e permitido apenas em anúncios HTML para AMP. Em documentos AMP normais, você pode renderizar um botão "Fechar" sempre que precisar dele no conteúdo do `<amp-lightbox>`.

### Lightboxes roláveis não são permitidos <a name="scrollable-lightboxes-are-disallowed"></a>

Não é permitido usar lightbox rolável em anúncios HTML para AMP.

### Plano de fundo transparente <a name="transparent-background"></a>

Quando você usa o `<amp-lightbox>` em anúncios HTML para AMP, o plano de fundo do elemento `<body>` fica transparente, porque o ambiente de tempo de execução de AMP é redimensionado e realinha o conteúdo do criativo antes da expansão do lightbox. Isso é feito para evitar um "salto" visual do criativo enquanto o lightbox é aberto. Se seu criativo precisar de um plano de fundo, configure-o em um contêiner intermediário (como um `<div>` de tamanho original), em vez de um `<body>`.

Quando o anúncio HTML para AMP é executado em um ambiente de terceiros (por exemplo, em um documento que não seja AMP), o criativo é centralizado em relação à janela de visualização e depois é expandido. Isso ocorre porque os iframes de terceiros precisam de uma API postMessage para ativar recursos como o redimensionamento de frames, que é assíncrono. Assim, a centralização do criativo permite uma transição suave, sem saltos visuais.

### Exemplos de transições no lightbox para anúncios HTML para AMP <a name="examples-of-transitions-in-lightbox-for-amphtml-ads"></a>

Nos exemplos abaixo, demonstramos como a transição procura um anúncio HTML para AMP que tenha o atributo `animate-in="fly-in-bottom"` configurado no elemento lightbox para um anúncio HTML para AMP em um iframe compatível, bem como um anúncio HTML para AMP em um iframe de terceiros.

##### Em iframes compatíveis (por exemplo, provenientes de um cache de AMP) <a name="on-friendly-iframes-eg-coming-from-an-amp-cache"></a>

<amp-img alt="anúncio lightbox em iframe compatível" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-fie.gif" layout="fixed">
  <noscript>
    <img alt="anúncio lightbox em iframe compatível" src="../../spec/img/lightbox-ad-fie.gif">
    </noscript>
  </amp-img>

##### Em iframes de terceiros (por exemplo, fora do cache de AMP) <a name="on-third-party-iframes-eg-outside-the-amp-cache"></a>

<amp-img alt="anúncio lightbox em iframe de terceiro" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-3p.gif" layout="fixed">
  <noscript>
    <img alt="anúncio lightbox em iframe de terceiro" src="../../spec/img/lightbox-ad-3p.gif">
    </noscript>
  </amp-img>

## Validação <a name="validation"></a>

Veja as [regras do amp-lightbox](https://github.com/ampproject/amphtml/blob/main/extensions/amp-lightbox/validator-amp-lightbox.protoascii) (link em inglês) nas especificações do validador de AMP.

---
$title: amp-carousel
$category@: layout
teaser:
  text: Exibe vários conteúdos semelhantes em um eixo horizontal.
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



Um carrossel genérico para exibir vários conteúdos semelhantes em um eixo horizontal, que visa ser flexível e com excelente desempenho.

<table>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>
      <ul>
        <li>carrossel: fixed, fixed-height e nodisplay.</li>
        <li>slides: fill, fixed, fixed-height, flex-item, nodisplay e responsive.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemplos</strong></td>
    <td>No site AMP By Example:<ul>
      <li><a href="https://ampbyexample.com/components/amp-carousel/">Exemplo de amp-carousel</a></li>
      <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/">Galerias de imagens com amp-carousel</a></li></ul></td>
    </tr>
  </table>

# Comportamento <a name="behavior"></a>

Cada filho imediato do componente `amp-carousel` é considerado um item do carrossel. Cada um desses nós também pode ter filhos HTML arbitrários.

O carrossel consiste em um número arbitrário de itens, bem como setas de navegação opcionais para avançar ou voltar para um único item.

O carrossel avança entre os itens se o usuário deslizar o dedo, usar as teclas de seta ou clicar em uma seta de navegação opcional.

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel width="450"
  height="300">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]

# Avançar para um slide específico <a name="advancing-to-a-specific-slide"></a>

Definir um método para o atributo `on` em um elemento `tap:carousel-id.goToSlide(index=N)`, quando o usuário tocar ou clicar nele, avançará um carrossel com o código "carousel-id" para o slide em index=N (o primeiro slide está no index=0, o segundo no index=1 e assim por diante).

No exemplo a seguir, temos um carrossel de três imagens com botões de visualização abaixo do carrossel. Quando um usuário clica em um dos botões, o item correspondente do carrossel é exibido.

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel id="carousel-with-preview"
    width="450"
    height="300"
    layout="responsive"
    type="slides">
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="apples"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="lemons"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="blueberries"></amp-img>
  </amp-carousel>
  <div class="carousel-preview">
    <button on="tap:carousel-with-preview.goToSlide(index=0)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
        width="60"
        height="40"
        alt="apples"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=1)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
        width="60"
        height="40"
        alt="lemons"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=2)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
        width="60"
        height="40"
        alt="blueberries"></amp-img>
    </button>
  </div>
```
[/example]

# Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type</strong></td>
    <td>Especifica o tipo de exibição para os itens do carrossel, que podem ser:
      <ul>
        <li><code>carousel</code> (padrão): todos os slides são mostrados e podem ser rolados no sentido horizontal. Esse tipo aceita somente os seguintes layouts: <code>fixed</code>, <code>fixed-height</code> e <code>nodisplay</code>.</li>
        <li><code>slides</code>: mostra um único slide por vez. Esse tipo aceita os seguintes layouts: <code>fill</code>, <code>fixed</code>, <code>fixed-height</code>, <code>flex-item</code>, <code>nodisplay</code> e <code>responsive</code>.</li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>height (obrigatório)</strong></td>
      <td>Especifica a altura do carrossel, em pixels.</td>
    </tr>
    <tr>
      <td width="40%"><strong>controls (opcional)</strong></td>
      <td>Exibe permanentemente setas para a esquerda e para a direita, permitindo que o usuário navegue pelos itens do carrossel em dispositivos móveis.
          Por padrão, as setas de navegação desaparecem após alguns segundos no dispositivo.
          A visibilidade das setas também pode ser controlada por meio do estilo, e uma consulta de mídia pode ser usada para exibir setas somente em determinadas larguras de tela. No computador, as setas são sempre exibidas, a menos que apenas um filho esteja presente.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-next-button-aria-label (opcional)</strong></td>
        <td>Define o aria-label para <code>amp-carousel-button-next</code>. Se nenhum valor for fornecido, o padrão do aria-label será "Próximo item do carrossel".</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-prev-button-aria-label (opcional)</strong></td>
        <td>Define o aria-label para <code>amp-carousel-button-prev</code>. Se nenhum valor for fornecido, o padrão do aria-label será "Item anterior do carrossel".</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-button-count-format (opcional)</strong></td>
        <td>Uma string de formato parecida com <code>(%s of %s)</code>, usada como sufixo do aria-label para <code>amp-carousel-button-next</code>/<code>amp-carousel-button-prev</code>. Ela fornece aos usuários que utilizam um leitor de tela informações sobre a navegação pelo carrossel. Se nenhum valor for fornecido, o padrão será '(%s of %s)'.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay (opcional)</strong></td>
        <td>Avança para o próximo slide sem interação do usuário.<br>
          Se estiver presente sem um valor:
          <ul>
            <li>Por padrão, avança um slide em intervalos de 5.000 milissegundos (5 segundos). Pode ser substituído pelo atributo <code>delay</code>.</li>
            <li>Anexa o atributo <code>loop</code> a <code>amp-carousel</code> se <code>loop</code> ainda não estiver presente.</li>
            <li>Requer pelo menos dois slides para que a reprodução automática ocorra.</li>
            <li>Aplicável apenas a carrosséis com <code>type=slides</code>.</li>
          </ul>
          Se está presente com um valor:
          <ul>
            <li>Anexa o atributo <code>loop</code> a `amp-carousel` se <code>loop</code> ainda não estiver presente.</li>
            <li>Remove o atributo <code>loop</code> depois que o número requisitado de loops é feito.</li>
          </ul></td>
        </tr>
        <tr>
          <td width="40%"><strong>delay (opcional)</strong></td>
          <td>Especifica a duração (em milissegundos) para atrasar o avanço para o próximo slide quando a <code>autoplay</code> está ativada. O atributo <code>delay</code> só é aplicável a carrosséis com <code>type=slides</code>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop (opcional)</strong></td>
          <td>Permite que o usuário avance para o primeiro ou o último item. É necessário que haja pelo menos três slides para que o looping aconteça. O atributo <code>loop</code> só é aplicável a carrosséis com <code>type=slides</code>.
            <em>Exemplo: exibição de um carrossel de slides com controles, looping e reprodução automática com atraso</em>

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel type="slides"
  width="450"
  height="300"
  controls
  loop
  {% if not format=='email'%}  autoplay
  delay="3000"{% endif %}
  data-next-button-aria-label="Go to next slide"
  data-previous-button-aria-label="Go to previous slide">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]</td>
          </tr>
          <tr>
            <td width="40%"><strong>common attributes</strong></td>
            <td>Este elemento inclui <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comuns</a> estendidos a componentes de AMP.</td>
          </tr>
        </table>

# Estilo <a name="styling"></a>

* Você pode usar o seletor de elemento `amp-carousel` para estilizá-lo à vontade.
* Você pode usar o seletor de classe `.amp-carousel-slide` para segmentar itens do carrossel.
* Quando o estado visual de um botão `amp-carousel` está desativado, ele fica oculto.
* Por padrão, o `.amp-carousel-button` usa um SVG in-line como a imagem de plano de fundo dos botões. Você pode substituí-lo por seu próprio SVG ou imagem, como no exemplo abaixo.

*Exemplo: SVG in-line padrão `.amp-carousel-button`*

```css
.amp-carousel-button-prev {
  left: 16px;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" fill="#fff" /></svg>');
}
```

*Exemplo: substituição do SVG padrão in-line `.amp-carousel-button`*

```css
.amp-carousel-button-prev {
  left: 5%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="#fff" /></svg>');
}
```

# Validação <a name="validation"></a>

Consulte as [regras do amp-carousel](https://github.com/ampproject/amphtml/blob/master/extensions/amp-carousel/validator-amp-carousel.protoascii) (link em inglês) nas especificações do validador de AMP.

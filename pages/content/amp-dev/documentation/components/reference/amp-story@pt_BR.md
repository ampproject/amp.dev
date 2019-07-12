---
$category@: presentation
formats:
- websites
teaser:
  text: É um formato avançado de narrativa visual.
---



<!---
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

# amp-story

<table>
  <tr>
    <td width="40%"><strong>Descrição</strong></td>
    <td>É um formato avançado de narrativa visual.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Disponibilidade</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">Experimental</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Layouts compatíveis</a></strong></td>
    <td>nenhum</td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemplos</strong></td>
    <td><ul>
      <li>Veja uma amostra de <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Hello World</a> no site AMP By Example.</li>
      <li>Aprenda com o tutorial <a href="https://www.ampproject.org/docs/tutorials/visual_story">Criar uma história visual com AMP</a>.</li>
    </ul></td>
  </tr>
</table>

[tip type="caution"]
este recurso é experimental e está em desenvolvimento. Se tiver algum problema, [registre-o no GitHub](https://github.com/ampproject/amphtml/issues/new).
[/tip]

## Notas de versão

| Versão | Descrição                                                            |
|-------|----------------------------------------------------------------------|
| 1.0     | Versão atual, desde 16/07/2018.                                     |
| 0.1     | Implementação inicial.  Obsoleta e foi removida em 19/03/2019. |

## Migração de 0.1 para 1.0

Desde 16/07/2018, a versão 0.1 é considerada obsoleta e foi removida em 19/03/2019.  Isso pode causar pequenas alterações interruptivas, porque suas histórias serão atualizadas automaticamente para a versão 1.0.  Recomendamos a migração manual das suas páginas para a versão 1.0 antes dessa data para garantir a funcionalidade e um design adequado.

### Novos recursos de bookend

Adicionamos novos recursos ao bookend do amp-stories, proporcionando compatibilidade com componentes e layouts visuais mais sofisticados. Algumas das alterações:

* Os provedores de compartilhamento são classificados de acordo com a configuração JSON.
* Novos componentes de bookend:
    * Links de call-to-action
    * Caixa de texto
    * Cards em orientação retrato e paisagem</li>

Para usar esses novos recursos, adicione uma tag `<amp-story-bookend>` como a última filha do seu `<amp-story>` com os atributos obrigatórios, da seguinte forma:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `src` and `layout=nodisplay` are required. -->
  <amp-story-bookend src="bookendv1.json" layout="nodisplay">
  </amp-story-bookend>
<amp-story>
```

Saiba mais sobre os novos componentes e como especificá-los na configuração JSON na seção [amp-story-bookend](#bookend-amp-story-bookend).

### Novos requisitos de metadados

Adicionamos novos atributos de metadados ao elemento `<amp-story>`. Esses atributos de metadados serão usados para exibir uma visualização da história em todo o ecossistema de histórias em AMP. Por exemplo, esses atributos podem ser usados para renderizar um link de visualização atraente no bookend de uma história relacionada. Ao fornecer esses atributos, você também ajuda a garantir que sua história esteja preparada para o futuro, oferecendo experiências ricas e incorporadas nas histórias em AMP que estão por vir.

```html
<!--</code>title<code>,</code>publisher<code>,</code>publisher-logo-src<code>and</code>poster-portrait-src` will soon be required. -->
<amp-story title="Minha história" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"></amp-story></p>

<!-- <code>poster-square-src</code> and <code>poster-landscape-src</code> are optional, but strongly recommended. -->
<amp-story title="Minha história" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg" poster-square-src="https://example.com/my-story/poster/1x1.jpg" poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
```

Esses atributos de metadados complementam e não substituem nenhum dado estruturado (por exemplo, JSON-LD) na página. Ainda recomendamos adicionar [dados estruturados](https://developers.google.com/search/docs/data-types/article#amp-sd) a todas as suas páginas AMP, incluindo as histórias em AMP.

Os novos atributos:

| ATRIBUTO | DESCRIÇÃO |
|--|--|
| `title` [obrigatório] | O título da história. |
| `publisher` [obrigatório] | O nome do editor da história. |
| `publisher-logo-src` [obrigatório] | O logotipo do editor em formato quadrado (proporção 1 x 1). |
| `poster-portrait-src` [obrigatório] | O pôster da história em formato retrato (proporção 3 x 4). |
| `poster-square-src` | O pôster da história em formato quadrado (proporção 1 x 1). |
| `poster-landscape-src` | O pôster da história em formato paisagem (proporção 4 x 3). |

#### Diretrizes do `publisher-logo-src`

As seguintes diretrizes se aplicam à imagem do logotipo do editor:

* O arquivo precisa ser de varredura, como `.jpg`, `.png` ou `.gif`.  Evite arquivos vetoriais, como `.svg` ou `.eps`.
* Evite imagens animadas (como GIFs animados).
* A parte gráfica do logotipo precisa estar legível na cor do plano de fundo

<table>
  <tr>
    <td>
      <amp-img alt="Logotipo com texto azul em fundo branco" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="Logotipo com texto azul em fundo branco" src="img/publisher-logo-1.png">
        </noscript>
      </amp-img>
      Recomendável
    </td>
    <td>
      <amp-img alt="Logotipo com texto branco em fundo azul" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
        <noscript>
          <img alt="Logotipo com texto branco em fundo azul" src="img/publisher-logo-2.png">
        </noscript>
      </amp-img>
      Recomendável
    </td>
    <td>
      <amp-img alt="Logotipo com texto azul em fundo azul" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
        <noscript>
          <img alt="Logotipo com texto azul em fundo azul" src="img/publisher-logo-3.png">
        </noscript>
      </amp-img>
      Evite
    </td>
  </tr>
</table>

* O formato do logotipo precisa ser um quadrado, não um retângulo.
* Não é permitido que a cor do plano de fundo seja transparente.
* Use um logotipo por marca, que seja consistente em todas as histórias em AMP.
* O logotipo precisa ter pelo menos 96 x 96 pixels.

#### Diretrizes para pôsteres (`poster-portrait-src`, `poster-landscape-src` e `poster-square-src`)

As diretrizes a seguir se aplicam às imagens de pôsteres de histórias:

* A imagem do pôster precisa representar a história em AMP inteira.
* A imagem do pôster precisa ficar visível para o usuário quando ele iniciar a história em AMP.  No entanto, o URL do arquivo de imagem usado nos metadados não precisa corresponder exatamente ao URL usado na primeira página da história.  O URL usado nos metadados pode incluir dimensionamento, corte ou pequenas alterações de estilo para fins de visualização.
* A imagem do pôster precisa ser um arquivo de varredura, como `.jpg`, `.png` ou `.gif`.  Evite arquivos vetoriais, como `.svg` ou `.eps`.
* A imagem do pôster precisa ter a proporção de 3 x 4 para retrato, 4 x 3 para paisagem e 1 x 1 para quadrado.
* Se a imagem do pôster for derivada de um frame de vídeo, a miniatura precisa representar o vídeo. Por exemplo, o primeiro frame de um vídeo muitas vezes não é representativo.
* Cada imagem do pôster precisa atender ao tamanho mínimo recomendado:
    * Retrato: 696 px x 928 px
    * Paisagem: 928 px x 696 px
    * Quadrado: 928 px x 928 px</li>

## Visão geral

A extensão `amp-story` oferece um novo formato para a exibição de conteúdo visual que pode ser usado para contar histórias. Com uma história em AMP, você pode oferecer aos usuários conteúdo e informações visualmente interessantes, em um tamanho reduzido.

<figure class="centered-fig">
  <amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="Exemplo de história em AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
    </noscript>
  </amp-anim>
</figure>

## Formato da história em AMP

Uma [história em AMP](#story%3a-amp-story) é um documento HTML para AMP completo, composto de [páginas](#pages%3a-amp-story-page). Dentro das páginas há [camadas](#layers%3a-amp-story-grid-layer) e, dentro delas, há elementos AMP e HTML, como mídia, análise, texto e assim por diante.

<amp-img alt="Hierarquia da tag de história em AMP" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Hierarquia da tag de história em AMP" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
    </noscript>
  </amp-img>

### Clichê

A marcação a seguir é um bom ponto de partida ou clichê. Copie e salve-a em um arquivo com extensão `.html`.

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>Hello, amp-story</title>
    <link rel="canonical" href="http://example.ampproject.org/my-story.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal
    both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript>
      <style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none
        }
      </style>
    </noscript>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="my-first-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>Hello, amp-story!</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="my-second-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg2.gif" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>The End</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-bookend src="bookendv1.json" layout="nodisplay">
      </amp-story-bookend>
    </amp-story>
  </body>
</html>
```

O conteúdo do corpo cria uma história com duas páginas.  Cada página tem uma imagem de plano de fundo sem margens, com uma string de texto simples sobre ela.

### Marcação obrigatória para amp-story

O formato HTML da história em AMP segue os [mesmos requisitos de marcação de um documento HTML para AMP válido](https://www.ampproject.org/docs/reference/spec#required-markup), além dos seguintes requisitos adicionais:

| REGRA | DESCRIÇÃO |
|----|---|
| O elemento `<amp-story standalone>` é o único elemento filho de `<body>`. | Identifica que o documento é uma história em AMP. |
| Contém uma tag `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` como terceira filha da tag `<head>`. | Inclui e carrega a biblioteca JavaScript amp-story. |
| Contém uma tag `<link rel="canonical" href="$STORY_URL">` dentro de `<head>`. | O link aponta para a história em si, identificando-a como o documento canônico. |

## História: `amp-story`

O componente `amp-story` representa uma história inteira.  O componente em si implementa o shell da IU, incluindo o processamento de gestos e navegação, e inserindo a IU do shell do aplicativo (controles, barra de progresso etc.).

<figure class="centered-fig">
  <amp-anim alt="Exemplo de amp-story" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="Exemplo de amp-story" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

### Exemplo

```html
<amp-story
    standalone
    title="My Story"
    publisher="The AMP Team"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
    poster-square-src="https://example.com/my-story/poster/1x1.jpg"
    poster-landscape-src="https://example.com/my-story/poster/4x3.jpg"
    background-audio="my.mp3">
    <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-bookend src="./related.json"></amp-story-bookend>
</amp-story>
```

### Atributos

##### standalone [obrigatório]

Identifica que o documento AMP é uma história.

##### title [obrigatório]

O título da história.

##### publisher [obrigatório]

O nome do editor da história.

##### publisher-logo-src [obrigatório]

URL para o logotipo do editor da história em formato quadrado (proporção 1 x 1). Por exemplo, `publisher-logo-src="https://example.com/logo/1x1.png"`, em que 1x1.png é um logotipo de 36 x 36 px.

##### poster-portrait-src [obrigatório]

URL para o [pôster da história](#posters) em formato retrato (proporção 3 x 4).

##### supports-landscape [opcional]

Ativa a compatibilidade com a orientação paisagem em dispositivos móveis e uma experiência de paisagem sem margens em computadores.

##### background-audio [opcional]

URL para um arquivo de áudio tocado ao longo da história.

##### poster-square-src [opcional]

URL para o [pôster da história](#posters) em formato quadrado (proporção 1 x 1).

##### poster-landscape-src [opcional]

URL para o [pôster da história](#posters) em formato paisagem (proporção 4 x 3).

### Pôsteres

Um "pôster" é uma imagem exibida na IU até que sua história seja carregada. Geralmente, o pôster é a primeira tela da história, mas é possível usar qualquer imagem que a represente.

### Filhos (de amp-story)

O componente `<amp-story>` contém um ou mais componentes [`<amp-story-page>`](#pages%3a-amp-story-page), que incluem cada uma das telas da história.  A primeira página especificada na ordem do documento é a primeira página mostrada na história.

### Ativação da orientação paisagem e da experiência sem margens para computadores

Se o atributo `supports-landscape` for especificado no elemento `<amp-story>`, ele:

* permitirá que a história seja vista quando um dispositivo móvel for segurado na orientação paisagem;
* mudará a experiência no computador para um modo sem margens imersivo, substituindo a experiência padrão de três painéis na orientação retrato.

Uso: `<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">Antes:</span>
  <amp-anim alt="Experiência de três painéis para computadores" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">Depois:</span>
  <amp-anim alt="Experiência sem margens para computadores" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## Páginas: `amp-story-page`

O componente `<amp-story-page>` representa o conteúdo a ser exibido em uma única página de uma história.

<figure class="centered-fig">
  <amp-anim alt="Exemplo de página 1" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
    <noscript>
      <img alt="Exemplo de página 1" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
      </noscript>
    </amp-anim>
  </figure>
  <figure class="centered-fig">
    <amp-anim alt="Exemplo de página 2" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
      <noscript>
        <img alt="Exemplo de página 2" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
        </noscript>
      </amp-anim>
    </figure>

### Exemplo

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-video layout="fill" src="background.mp4" poster="background.png" muted autoplay></amp-video>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>These are the Top 5 World's Most...</h1>
    <p>Jon Bersch</p>
    <p>May 18</p>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="bottom-third" src="a-logo.svg" width="64" height="64"></amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

### Atributos

##### id [obrigatório]

Um identificador exclusivo para a página. Pode ser usado para aplicar estilo à página e aos descendentes dela em CSS, além de ser usado para identificar de modo exclusivo a página no fragmento de URL.

##### auto-advance-after [opcional]

Especifica quando avançar automaticamente para a próxima página.  Se omitido, a página não avançará automaticamente. O valor para `auto-advance-after` precisa ser:

* uma quantidade positiva de [tempo](https://developer.mozilla.org/pt-BR/docs/Web/CSS/time) (link em inglês) de espera antes de avançar automaticamente para a próxima página;
* ou um código de um [HTMLMediaElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLMediaElement) (link em inglês) ou vídeo de interface de vídeo cuja conclusão acione o avanço automático.

Exemplo:

```html
<amp-story-page id="tokyo" auto-advance-after="1s">
```

##### background-audio [opcional]

Um URI para um arquivo de áudio tocado enquanto a página está sendo visualizada.

Exemplo:

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">
```

### Filhos (de amp-story-page)

O componente `<amp-story-page>` contém uma ou mais [camadas](#layers).  As camadas são empilhadas de baixo para cima (a primeira camada especificada no DOM fica na base, enquanto a última fica no topo).

## Camadas

As camadas são empilhadas umas sobre as outras para criar o efeito visual desejado.

### `amp-story-grid-layer`

O componente `<amp-story-grid-layer>` coloca os filhos em uma grade.  A implementação dele se baseia nas [especificações de grade CSS](https://www.w3.org/TR/css-grid-1/) (link em inglês).

<div class="flex-images">
  <amp-img alt="Camada 1" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
  </amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Camada 2" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript></amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Camada 3" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript></amp-img>
  <span class="special-char">=</span>
  <amp-img alt="Todas as camadas" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript></amp-img>
</div>

#### Atributos

##### template [obrigatório]

O atributo `template` determina o layout da camada de grade. Os modelos disponíveis são descritos na seção [Modelos](#templates) abaixo.

##### grid-area [opcional]

O atributo é especificado nos filhos de `<amp-story-grid-layer>`. O `grid-area` especifica a área nomeada (usando um `template` que a define) em que o elemento que contém esse atributo precisa aparecer.

Exemplo:

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Modelos

Veja a seguir os modelos disponíveis para especificar o layout da camada de grade.

[tip type="success"]
para ver os modelos de layout em uso, confira a [demonstração de layouts no site AMP By Example](https://ampbyexample.com/stories/features/layouts/).
[/tip]

##### fill

O modelo `fill` mostra o primeiro filho sem margens. Os outros filhos não são mostrados.

Áreas nomeadas: (nenhuma)

Exemplo:

<amp-img alt="Exemplo do modelo fill" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Exemplo do modelo horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="fill">
  <amp-img src="cat.jpg"></amp-img>
</amp-story-grid-layer>
```

##### vertical

O modelo `vertical` posiciona os elementos dele ao longo do eixo y.  Por padrão, os elementos são alinhados à parte superior da tela e a ocupam completamente ao longo do eixo x.

Áreas nomeadas: (nenhuma)

<amp-img alt="Exemplo do modelo vertical" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Exemplo do modelo horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="vertical">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### horizontal

O modelo `horizontal` posiciona os elementos filhos ao longo do eixo x.  Por padrão, os elementos dele são alinhados ao início da linha e podem ocupar a tela inteira ao longo do eixo y.

Áreas nomeadas: (nenhuma)

<amp-img alt="Exemplo do modelo horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Exemplo do modelo horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="horizontal">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### thirds

O modelo `thirds` divide a tela em três linhas do mesmo tamanho e permite que você insira conteúdo em cada área.

Áreas nomeadas:

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="Exemplo do modelo horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Exemplo do modelo thirds" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Filhos

Uma `amp-story-grid-layer` pode conter os seguintes elementos:

**Observação**: esta lista será expandida com o passar do tempo.

<table>
  <tr>
    <th width="40%">Área
    </th><th>Tags permitidas </th>
  </tr>
  <tr>
    <td>Mídia</td>
    <td>
      <ul>
        <li><code>&lt;amp-audio></code></li>
        <li><code>&lt;amp-gfycat></code></li>
        <li><code>&lt;amp-google-vrview-image></code></li>
        <li><code>&lt;amp-img></code></li>
        <li><code>&lt;amp-video></code></li>
        <li><code>&lt;source></code></li>
        <li><code>&lt;track></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Análise e medição</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics></code></li>
        <li><code>&lt;amp-experiment></code></li>
        <li><code>&lt;amp-pixel></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Seccionamento</td>
    <td>
      <ul>
        <li><code>&lt;address></code></li>
        <li><code>&lt;article></code></li>
        <li><code>&lt;aside></code></li>
        <li><code>&lt;footer></code></li>
        <li><code>&lt;h1>-<h6></code></li>
        <li><code>&lt;header></code></li>
        <li><code>&lt;hgroup></code></li>
        <li><code>&lt;nav></code></li>
        <li><code>&lt;section></code></li>
        <li><code>&lt;amp-story-cta-layer></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Texto</td>
    <td>
      <ul>
        <li><code>&lt;abbr></code></li>
        <li><code>&lt;amp-fit-text></code></li>
        <li><code>&lt;amp-font></code></li>
        <li><code>&lt;amp-gist></code></li>
        <li><code>&lt;b></code></li>
        <li><code>&lt;bdi></code></li>
        <li><code>&lt;bdo></code></li>
        <li><code>&lt;blockquote></code></li>
        <li><code>&lt;br></code></li>
        <li><code>&lt;cite></code></li>
        <li><code>&lt;code></code></li>
        <li><code>&lt;data></code></li>
        <li><code>&lt;del></code></li>
        <li><code>&lt;dfn></code></li>
        <li><code>&lt;div></code></li>
        <li><code>&lt;em></code></li>
        <li><code>&lt;figcaption></code></li>
        <li><code>&lt;figure></code></li>
        <li><code>&lt;hr></code></li>
        <li><code>&lt;i></code></li>
        <li><code>&lt;ins></code></li>
        <li><code>&lt;kbd></code></li>
        <li><code>&lt;main></code></li>
        <li><code>&lt;mark></code></li>
        <li><code>&lt;p></code></li>
        <li><code>&lt;pre></code></li>
        <li><code>&lt;q></code></li>
        <li><code>&lt;rp></code></li>
        <li><code>&lt;rt></code></li>
        <li><code>&lt;rtc></code></li>
        <li><code>&lt;ruby></code></li>
        <li><code>&lt;s></code></li>
        <li><code>&lt;samp></code></li>
        <li><code>&lt;small></code></li>
        <li><code>&lt;span></code></li>
        <li><code>&lt;strong></code></li>
        <li><code>&lt;sub></code></li>
        <li><code>&lt;sup></code></li>
        <li><code>&lt;time></code></li>
        <li><code>&lt;u></code></li>
        <li><code>&lt;var></code></li>
        <li><code>&lt;wbr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Listas</td>
    <td>
      <ul>
        <li><code>&lt;amp-list></code></li>
        <li><code>&lt;amp-live-list></code></li>
        <li><code>&lt;dd></code></li>
        <li><code>&lt;dl></code></li>
        <li><code>&lt;dt></code></li>
        <li><code>&lt;li></code></li>
        <li><code>&lt;ol></code></li>
        <li><code>&lt;ul></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tabelas</td>
    <td>
      <ul>
        <li><code>&lt;caption></code></li>
        <li><code>&lt;col></code></li>
        <li><code>&lt;colgroup></code></li>
        <li><code>&lt;table></code></li>
        <li><code>&lt;tbody></code></li>
        <li><code>&lt;td></code></li>
        <li><code>&lt;tfoot></code></li>
        <li><code>&lt;th></code></li>
        <li><code>&lt;thead></code></li>
        <li><code>&lt;tr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Outro</td>
    <td>
      <ul>
        <li><code>&lt;amp-install-serviceworker></code></li>
        <li><code>&lt;noscript></code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

O componente `<amp-story-cta-layer>` permite o uso de elementos `<a>` e `<button>` dentro de uma `<amp-story-page>`.

#### Restrições

* Se especificado, o elemento `<amp-story-cta-layer>` precisa ser a última camada de uma `<amp-story-page>`. Como resultado, na prática, cada `<amp-story-page>` pode ter exatamente um ou zero elementos `<amp-story-cta-layer>`.
* Não é possível controlar o posicionamento e o dimensionamento dessa camada. Ela tem sempre 100% da largura da página, 20% da altura e é alinhada à parte inferior da página.

#### Exemplo

```html
<amp-story-page id="vertical-template-thirds">
  <amp-story-grid-layer template="thirds">
    <div class="content" grid-area="upper-third">Paragraph 1</div>
    <div class="content" grid-area="middle-third">Paragraph 2</div>
    <div class="content" grid-area="lower-third">Paragraph 3</div>
  </amp-story-grid-layer>
  <amp-story-cta-layer>
    <a href="https://www.ampproject.org" class="button">Outlink here!</a>
  </amp-story-cta-layer>
</amp-story-page>
```

<amp-img alt="Camada de CTA" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
  <noscript>
    <img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
  </noscript>
</amp-img>

[Exemplo completo encontrado no diretório de exemplos (link em inglês)](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### Filhos

O componente `amp-story-cta-layer` permite praticamente os mesmos descendentes de `amp-story-grid-layer`, além das tags `<a>` e `<button>`.

Para ver uma lista atualizada dos filhos aceitos, consulte o campo [amp-story-cta-layer-allowed-descendants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) nas regras de validação (link em inglês).

## Anexos de página

### `amp-story-page-attachment`

<amp-img alt="Anexo de página de história em AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
  <noscript>
    <img alt="Anexo de página de história em AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
    </noscript>
  </amp-img>

  Anexe conteúdo extra a uma página de história.

  Os anexos de página de história permitem que você forneça conteúdo HTML para AMP a páginas específicas. Esse conteúdo pode ser visto pelos usuários com um gesto de "deslizar para cima" ou um toque no elemento de call-to-action.
  Uma solicitação de UI para abrir o anexo será adicionada automaticamente à parte inferior de todas as páginas que tiverem configurado um anexo.

  O elemento `<amp-story-page-attachment>` precisa ser o último filho de `<amp-story-page>` e ter o atributo `layout="nodisplay"`. O conteúdo HTML para AMP do anexo precisa ser fornecido in-line na sua história em AMP, dentro dessa tag `<amp-story-page-attachment>`.

### Conteúdo e componentes permitidos

Os anexos da página de história permitem praticamente os mesmos elementos HTML da história em AMP, além dos outros componentes listados abaixo, como players de vídeo de terceiros ou incorporações de mídia social. Isso significa que você pode adicionar conteúdo muito detalhado ou não permitido em uma página de história em AMP.

<details>
  <summary>Lista de componentes de AMP permitidos em um anexo de página</summary>

  * `<amp-3d-gltf>`
  * `<amp-3q-player>`
  * `<amp-accordion>`
  * `<amp-audio>`
  * `<amp-beopinion>`
  * `<amp-bodymovin-animation>`
  * `<amp-brid-player>`
  * `<amp-brightcove>`
  * `<amp-byside-content>`
  * `<amp-call-tracking>`
  * `<amp-carousel>`
  * `<amp-dailymotion>`
  * `<amp-date-countdown>`
  * `<amp-embedly-card>`
  * `<amp-facebook>`
  * `<amp-facebook-comments>`
  * `<amp-facebook-like>`
  * `<amp-facebook-page>`
  * `<amp-fit-text>`
  * `<amp-fx-collection>`
  * `<amp-fx-flying-carpet>`
  * `<amp-gfycat>`
  * `<amp-gfycat>`
  * `<amp-gist>`
  * `<amp-gist>`
  * `<amp-google-document-embed>`
  * `<amp-google-vrview-image>`
  * `<amp-google-vrview-image>`
  * `<amp-hulu>`
  * `<amp-ima-video>`
  * `<amp-image-slider>`
  * `<amp-img>`
  * `<amp-imgur>`
  * `<amp-instagram>`
  * `<amp-izlesene>`
  * `<amp-jwplayer>`
  * `<amp-kaltura-player>`
  * `<amp-list>`
  * `<amp-list>`
  * `<amp-live-list>`
  * `<amp-live-list>`
  * `<amp-mathml>`
  * `<amp-mowplayer>`
  * `<amp-nexxtv-player>`
  * `<amp-o2-player>`
  * `<amp-ooyala-player>`
  * `<amp-pan-zoom>`
  * `<amp-pinterest>`
  * `<amp-playbuzz>`
  * `<amp-powr-player>`
  * `<amp-reach-player>`
  * `<amp-reddit>`
  * `<amp-riddle-quiz>`
  * `<amp-soundcloud>`
  * `<amp-trampolim-player>`
  * `<amp-timeago>`
  * `<amp-twitter>`
  * `<amp-video>`
  * `<amp-video-iframe>`
  * `<amp-vimeo>`
  * `<amp-vine>`
  * `<amp-viqeo-player>`
  * `<amp-vk>`
  * `<amp-wistia-player>`
  * `<amp-yotpo>`
  * `<amp-youtube>`

</details>

### Exemplo

```html
<amp-story-page id="foo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600">
    </amp-story-grid-layer>
    <amp-story-page-attachment layout="nodisplay">
      <h1>My title</h1>
      <p>Lots of interesting text with <a href="https://example.ampproject.org">links</a>!</p>
      <p>More text and a YouTube video!</p>
      <amp-youtube
          data-videoid="b4Vhdr8jtx0"
          layout="responsive"
          width="480" height="270">
        </amp-youtube>
      <p>And a tweet!</p>
      <amp-twitter
          data-tweetid="885634330868850689"
          layout="responsive"
          width="480" height="270">
      </amp-twitter>
  </amp-story-page-attachment>
</amp-story-page>
```

## Animações

Cada elemento de uma `<amp-story-page>` pode ter uma animação de entrada.

Você pode configurar animações especificando um conjunto de [atributos de animação](#animation-attributes) no elemento. Nenhuma extensão ou configuração adicional de AMP é necessária.

### Efeitos de animação

Os seguintes efeitos de animação estão disponíveis como predefinições para histórias em AMP:

| Nome da predefinição       | Duração padrão (ms) | Atraso padrão (ms) |
|-----------------|---------------------| ------------------ |
| `drop`            | 1600                  | 0 |
| `fade-in`         | 500                   | 0 |
| `fly-in-bottom`   | 500                   | 0 |
| `fly-in-left`     | 500                   | 0 |
| `fly-in-right`    | 500                   | 0 |
| `fly-in-top`      | 500                   | 0 |
| `pulse`           | 500                   | 0 |
| `rotate-in-left`  | 700                   | 0 |
| `rotate-in-right` | 700                   | 0 |
| `twirl-in`        | 1000                  | 0 |
| `whoosh-in-left`  | 500                   | 0 |
| `whoosh-in-right` | 500                   | 0 |
| `pan-left`        | 1000                  | 0 |
| `pan-right`       | 1000                  | 0 |
| `pan-down`        | 1000                  | 0 |
| `pan-up`          | 1000                  | 0 |
| `zoom-in`         | 1000                  | 0 |
| `zoom-out`        | 1000                  | 0 |

[tip type="success"]
veja uma [demonstração ao vivo de todas as animações de histórias em AMP](https://ampbyexample.com/stories/features/animations/) no site AMP By Example.
[/tip]

### Atributos de animação

##### animate-in [obrigatório]

Use esse atributo para especificar o nome da [predefinição de animação](#animation-effects) da entrada.

*Exemplo*: um título sai do lado esquerdo da página.

```html
<h2 animate-in="fly-in-left">
  Fly from left!
</h2>
```

##### animate-in-duration [opcional]

Use o atributo para especificar a duração da animação de entrada, em segundos ou milissegundos (por exemplo, 0,2s ou 200ms). A duração padrão depende da predefinição de animação especificada.

*Exemplo*: um título sai do lado esquerdo da página, e a animação termina em meio segundo.

```html
<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
  Fly from left!
</h2>
```

##### animate-in-delay [opcional]

Use esse atributo para especificar o atraso antes do início da animação. O valor precisa ser maior ou igual a 0, em segundos ou milissegundos (por exemplo, 0,2s ou 200ms). O atraso padrão depende da predefinição de animação especificada.

*Exemplo*: após 0,4 segundo, um título sai do lado esquerdo da página e conclui a entrada em 0,5 segundo.

```html
<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
  Fly from left!
</h2>
```

[tip type="note"]
não é garantido que o atraso da animação será exato. Atrasos maiores podem ser causados pelo carregamento da extensão `amp-animation` em segundo plano depois que o primeiro elemento animado é verificado. O contrato de atributo é definido como *atrasar esta animação por pelo menos N milissegundos*. Isso se aplica a todos os elementos, incluindo aqueles com um atraso de 0 segundos.
[/tip]

##### animate-in-after [opcional]

Use esse atributo para encadear ou sequenciar animações (por exemplo, a animation2 se inicia após a conclusão da animation1). Especifique o código do elemento animado que a animação desse elemento seguirá. O elemento precisa estar presente na mesma `<amp-story-page>`. O atraso é aplicado após a animação do elemento anterior terminar. Para ver mais detalhes, consulte abaixo a seção [Sequenciar animações](#sequencing-animations).

Por exemplo, no código a seguir, o `object2` é animado depois que o `object1` conclui a entrada:

```html
<amp-story-page id="page1">
  <amp-story-grid-layer template="vertical">
    <div id="object1"
        animate-in="rotate-in-left">
        1
      </div>
    <div id="object2"
        animate-in="fly-in-right"
        animate-in-after="object1">
      2. <!-- will start after object1 has finished -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

##### scale-start, scale-end [opcionais, só funcionam com animações `zoom-in` e `zoom-out`]

Use esses dois atributos para especificar melhor os parâmetros que aumentam e diminuem o zoom das suas animações. O valor precisa ser maior ou igual a 0, e decimais são permitidos. O padrão será scale-start: 1 e scale-end: 3 para aumentar zoom, e o inverso para diminuir zoom.

*Exemplo*: uma imagem com o zoom aumentado de 2x para 5x ao longo de quatro segundos.

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x [opcional, só funciona com animações `pan-left` e `pan-right`]

Use esse atributo para especificar a movimentação horizontal da sua imagem em uma animação pan-left/pan-right. O valor, em pixels, precisa ser maior ou igual a 0. O valor padrão movimentará toda a largura da imagem especificada.

*Exemplo*: uma imagem movimentando 200 px para a esquerda ao longo de 10 segundos.

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y [opcional, só funciona com animações `pan-up` e `pan-down`]

Use esse atributo para especificar a movimentação vertical da sua imagem em uma animação pan-up/pan-down. O valor, em pixels, precisa ser maior ou igual a 0. O valor padrão movimentará toda a altura da imagem especificada.

*Exemplo*: uma imagem movimentando 50 px para baixo ao longo de 15 segundos.

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### Sequenciar animações

Para encadear animações em sequência, use o atributo `animate-in-after`. Todos os elementos de determinada cadeia precisam estar presentes na mesma `<amp-story-page>`. Elementos sem o atributo `animate-in-after` não pertencem a uma cadeia de sequência e são iniciados de forma independente na entrada da página.

```html
<amp-story-page id="my-sequencing-page">
  <amp-story-grid-layer template="vertical">
    <div class="circle"
        animate-in="drop-in"
        animate-in-duration="1.8s">
        1. <!-- will start independently -->
    </div>
    <div id="rotate-in-left-obj"
        class="square"
        animate-in="rotate-in-left"
        animate-in-after="fade-in-obj"
        animate-in-delay="0.2s">
        2. <!-- will start after fade-in-obj has finished -->
    </div>
    <div class="square"
        animate-in-after="rotate-in-left-obj"
        animate-in="whoosh-in-right"
        animate-in-delay="0.2s">
        3. <!-- will start after rotate-in-left-obj has finished -->
    </div>
    <div id="fade-in-obj"
        class="circle"
        animate-in="fade-in"
        animate-in-duration="2.2s">
        1. <!-- will start independently -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

### Combinar várias animações

Você pode aplicar várias animações de entrada a um elemento (por exemplo, um elemento voa para a página e esmaece ao mesmo tempo). Não é possível atribuir mais de uma animação predefinida a um único elemento. No entanto, elementos com diferentes animações de entrada podem ser aninhados para serem combinados em uma só.

```html

<div animate-in="fly-in-left">
  <div animate-in="fade-in">
    I will fly-in and fade-in!
  </div>
</div>

```

[tip type="note"]
se uma animação composta for iniciada após o término da animação de um elemento separado, é preciso que todos os elementos aninhados que compõem a animação tenham o atributo `animate-in-after` configurado com o mesmo `id`.
[/tip]

## Bookend: `amp-story-bookend`

O `amp-story-bookend` é a última tela da história. Ele contém links relacionados, opções de compartilhamento, links de call-to-action, entre outros itens.

<figure class="centered-fig">
  <amp-anim alt="exemplo de artigo relacionado" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
    <noscript>
      <img alt="exemplo de artigo relacionado" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
      </noscript>
    </amp-anim>
  </figure>

  Para usá-lo, inclua uma tag `<amp-story-bookend>` como filha do seu `<amp-story>` com o atributo obrigatório `layout=nodisplay`.
  Em seguida, você pode especificar a configuração JSON em um arquivo separado e importá-la usando o atributo `src` ou colocá-la in-line.

  Importar a configuração JSON por meio do atributo `src`:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `layout=nodisplay` is required. -->
  <amp-story-bookend src="bookendv1.json" layout=nodisplay>
  </amp-story-bookend>
<amp-story>
```

Se não quiser buscar a configuração de bookend de um servidor, você também pode especificá-la in-line:

```html
<amp-story standalone>
  ...
  <amp-story-bookend layout=nodisplay>
    <script type="application/json">
      {
        bookendVersion: "v1.0",
        shareProviders: [ ... ],
        components: [ ... ]
      }
    </script>
  </amp-story-bookend>
<amp-story>
```

Em seguida, você precisa preencher a configuração do JSON. É nela que você personaliza o bookend. A estrutura geral da configuração é esta:

```text
{
  bookendVersion: "v1.0",
  shareProviders: [
    ...
  ],
  components: [
    ...
  ]
}
```

É obrigatório incluir a primeira linha para especificar que você está usando a versão v1.0.

#### Componentes de bookend

O bookend é composto por vários componentes. Esses componentes podem ser artigos, links de call-to-action, texto, entre outros.

Eles são especificados no campo `components` do JSON configurado. Veja a seção [Exemplo de resposta JSON](#example-json-response) abaixo.

##### heading

O componente <code>heading</code> tem um campo `text`, que pode ser usado para anexar um título a um grupo de artigos.

```json
{
  type: "heading",
  text: "More to Read"
}
```

<amp-img alt="Componente heading do bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
  <noscript>
    <img alt="Componente heading do bookend" src="img/amp-story-bookend-component-heading.png">
    </noscript>
  </amp-img>

##### small

O componente `small` pode ser usado para vincular a artigos relacionados. Esse componente tem os campos obrigatórios `title` e `url` e o campo opcional `image`.

```json
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/article.html",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Componente small do bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
  <noscript>
    <img alt="Componente small do bookend" src="img/amp-story-bookend-component-small.png">
    </noscript>
  </amp-img>

##### landscape

O componente `landscape` pode ser usado para formatos alternativos de conteúdo, como vídeos. Esse componente tem os seguintes campos obrigatórios: `title`, `url` e `image`. Se quiser, você pode adicionar um campo `category`, que exibe um subtítulo acima do título.

```json
{
  type: "landscape",
  title: "TRAPPIST-1 Planets May Still Be Wet Enough for Life",
  url: "http://example.com/article.html",
  category: "astronomy",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Componente landscape do bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="Componente landscape do bookend" src="img/amp-story-bookend-component-landscape.png">
  </noscript>
</amp-img>

##### portrait

O componente `portrait` pode ser usado para vincular a outras histórias. Esse componente tem os seguintes campos obrigatórios: `title`, `url` e `image`. Se quiser, você pode adicionar um campo `category`, que exibe um subtítulo acima do título.

```json
{
  type: "portrait",
  category: "Science",
  title: "New discovery found",
  url: "http://example.com/article.html",
  image: "http://placehold.it/312x416"
}
```

<amp-img alt="Componente portrait do bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="Componente portrait do bookend" src="img/amp-story-bookend-component-portrait.png">
  </noscript>
</amp-img>

##### cta-link

O componente <code>cta-link</code> permite que você especifique links para calls-to-action (por exemplo, <code>Read More</code> ou <code>Subscribe</code>). Esse componente tem uma chave <code>links</code>, que especifica uma matriz de links. Cada link é um objeto com os valores ```text</code> e <code>url</code>.

```json
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup"
      },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
}
```

<amp-img alt="Componente cta-links do bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
  <noscript>
    <img alt="Componente cta-links do bookend" src="img/amp-story-bookend-component-cta-links.png">
  </noscript>
</amp-img>

##### textbox

O componente ```textbox</code> permite que você especifique o texto dentro do bookend (por exemplo, créditos de fotos). O componente requer uma matriz <code>text</code>, em que cada elemento da matriz é uma linha de texto.

```json
{
  type: "textbox",
  text: [
    Food by Enrique McPizza,
    Choreography by Gabriel Filly,
    Script by Alan Ecma S.,
    Direction by Jon Tarantino
  ]
}
```

<amp-img alt="Componente textbox do bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Componente textbox do bookend" src="img/amp-story-bookend-component-textbox.png">
    </noscript>
  </amp-img>

  **Vinculação de AMP para AMP**

  Para documentos exibidos em um visualizador de AMP, os links geralmente navegam para `_top` ou são abertos em uma nova janela. No entanto, links para páginas AMP podem continuar sendo exibidos no visualizador. Para ativar esse comportamento, adicione `"amphtml": true` a um componente compatível com links. Exemplo:

```json
...
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/my-amp-document.html",
  image: "http://placehold.it/256x128",
  amphtml: true
  },
  {
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup",
      amphtml: true
      },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
},
...
```

#### Compartilhamento em redes sociais

A configuração de compartilhamento em redes sociais é definida no campo `shareProviders` do objeto de resposta e é opcional.

Esse campo precisa conter uma string que represente o nome de um provedor de compartilhamento (por exemplo, `twitter`).

Quando parâmetros extras forem necessários, um objeto com pares de chave-valor precisará ser usado. O objeto precisa conter uma chave `provider` com um valor (por exemplo, `facebook`) correspondente ao nome do provedor. As próximas chave-valor dependerão do provedor de compartilhamento.

A lista de provedores disponíveis é a mesma do componente [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share).

Cada um desses provedores tem um conjunto diferente de parâmetros disponíveis ([consulte `data-param-*`](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a)). O objeto de configuração usa esses parâmetros sem o prefixo `data-param-` (por exemplo, o `data-param-app_id` apareceria no objeto de configuração como `app_id`).

#### Configuração JSON

O `<amp-story-bookend>` precisa ter um atributo `src` que aponte para a configuração JSON do bookend. Ele é descrito como um endpoint de URL que aceita solicitações GET e retorna uma resposta JSON com o conteúdo do bookend.  Se omitido, o componente amp-story renderiza uma IU padrão para a tela final. O sistema é responsável por buscar os dados necessários para a renderização de artigos relacionados e em alta.  Eles podem ser exibidos a partir de um arquivo JSON estático ou gerados de forma dinâmica (por exemplo, para calcular o que está em alta no momento).

#### Exemplo de resposta JSON

```text
{
  // You must specify version v1.0.
  bookendVersion: "v1.0",
  shareProviders: [
    email,
    tumblr,
    {
      provider: "twitter",
      // You can add custom sharing parameters depending on the social platform.
      text: "This is custom share text that I would like for the Twitter platform"
    },
    {
      provider: "facebook",
      // Facebook requires an</code>app_id` param
      app_id: "MY_FACEBOOK_APP_ID"
    }
  ],
  components: [
    {
      type: "heading",
      text: "More to read"
    },
    {
      type: "small",
      title: "This is India an the best places you should go",
      url: "<a href="
      http: //example.com/article.html">http://example.com/article.html</a>",
        image: "<a href="
      http: //placehold.it/256x128">http://placehold.it/256x128</a>"
    },
    ...
  ]
}
```

## Outros componentes que podem ser usados em histórias em AMP

Veja abaixo outros componentes que podem ser usados em histórias em AMP que exigem algumas ressalvas específicas para a história.

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

Para ver os componentes gerais mais utilizáveis, consulte a [lista de filhos permitidos](https://www.ampproject.org/docs/reference/components/amp-story#children).

## Validação

Consulte as [regras do amp-story](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) (link em inglês) nas especificações do validador de AMP.

## Localização

Para localizar sua história, inclua o código de idioma no atributo `lang` da tag `<html>` da sua história, como `<html lang="en">` para o inglês.  Os códigos de idioma aceitos são:

* ar (árabe)
* de (alemão)
* en-GB (inglês do Reino Unido)
* en (inglês dos EUA)
* es-419 (espanhol da América Central/Latina)
* es (espanhol da Espanha)
* fr-ca (francês do Canadá)
* fr (francês da França)
* hi (hindu)
* id (indonésio)
* it (italiano)
* ja (japonês)
* ko (coreano)
* nl (holandês)
* no (norueguês)
* pt-BR (português do Brasil)
* pt (português de Portugal)
* ru (russo)
* tr (turco)
* vi (vietnamita)
* zh-TW (chinês tradicional)
* zh (chinês simplificado)

Além disso, para idiomas escritos da direita para a esquerda, você pode incluir o atributo `dir="rtl"` na tag `<html>` da sua história.  Ele também pode ser usado em conjunto com o código de idioma, por exemplo, `<html lang="ar" dir="rtl">`.

## Recursos relacionados

* [Tutorial: criar uma história visual com AMP](https://www.ampproject.org/docs/tutorials/visual_story)
* [Amostras no site AMP By Example](https://ampbyexample.com/stories/#stories/introduction)
* [Práticas recomendadas para criar uma história AMP](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>

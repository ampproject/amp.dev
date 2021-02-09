---
'$title': Adding more pages
$order: 5
description: Você já sabe como adicionar páginas a uma história AMP. Para incluir as próximas páginas da nossa história "A alegria de ter animais de estimação", o processo é bem parecido.
author: bpaduch
---

Você já sabe como adicionar páginas a uma história AMP. Para incluir as próximas páginas da nossa história "A alegria de ter animais de estimação", o processo é bem parecido. Com base nas informações abaixo, **crie as páginas restantes** usando o que você aprendeu até agora. Se você tiver dúvidas, veja o código completo (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>) (em inglês).

[tip type="tip"] Cada página precisa de um atributo "id" exclusivo (por exemplo, `id="page1"`). [/tip]

## Página 1: gatos

Demonstra como exibir uma imagem e um texto em uma única camada.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Contém uma camada:       <ul>         <li>Implementa o modelo <a href="create_cover_page.md#vertical"><code>vertical</code></a>.</li>         <li>Contém três elementos:           <ul>             <li>um elemento <code><h1></code> com o título: <em>Cats</em> </li>             <li>um <a href="../../../../documentation/components/reference/amp-img.md">componente <code>amp-img</code></a> responsivo (<code class="filename">cat.jpg</code>, 720 x 1280 px)</li>             <li>um elemento <code><q></code> com a seguinte mensagem: <em>"Dogs come when they're called. Cats take a message and get back to you." — Mary Bly</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## Página 2: cachorros

Demonstra como definir a disposição do texto e exibir uma imagem com duas camadas que preenche a tela inteira.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Contém duas camadas:       <ul>         <li> <b>Camada 1</b>: implementa o modelo <a href="create_cover_page.md#fill"><code>fill</code></a> e contém um <a href="../../../../documentation/components/reference/amp-img.md">componente <code>amp-img</code></a> responsivo (<code class="filename">dog.jpg</code>, 720 x 1280 px).</li>         <li> <b>Camada 2</b>: implementa o modelo <a href="create_cover_page.md#thirds"><code>thirds</code></a> e contém dois elementos:           <ul>             <li>um elemento <code><h1></code> com o título: <em>Dogs</em> </li>             <li>um elemento <code><p></code> que especifica uma <a href="create_cover_page.md#thirds"><code>grid-area</code></a> ocupando a parte inferior da tela, o <a href="create_cover_page.md#thirds"><code>lower-third</code></a>, e inclui o seguinte texto: <em>Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## Página 3: pássaros

Demonstra como organizar o texto, exibir uma imagem que preenche a tela e fornecer áudio de fundo para a página.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contém três camadas:       <ul>         <li> <b>Camada 1</b>: implementa o modelo <a href="create_cover_page.md#fill"><code>fill</code></a> e contém um <a href="../../../../documentation/components/reference/amp-img.md">componente <code>amp-img</code></a> responsivo (<code class="filename">bird.jpg</code>, 720 x 1280 px).</li>         <li> <b>Camada 2</b>: implementa o modelo <a href="create_cover_page.md#vertical"><code>vertical</code></a> e contém:           <ul>             <li>um elemento <code><h1></code> com o título: <em>Birds</em> </li>           </ul>         </li>         <li> <b>Camada 3</b>: implementa o modelo <a href="create_cover_page.md#vertical"><code>vertical</code></a> e contém:           <ul>             <li>um elemento <code><q></code> com o seguinte texto: <em>"A bird is three things: Feathers, flight and song, And feathers are the least of these." — Marjorie Allen Seiffert</em> </li>             <li>Essa terceira camada especifica <code>class="bottom"</code> para alinhar os elementos filhos à parte inferior da tela.</li>           </ul>         </li>       </ul>
</li>
      <li>Um arquivo de áudio tocará em segundo plano quando a página for exibida. Ele pode continuar por toda a história ou acompanhar uma única página.  Para usar áudio em uma página, adicione o atributo <code>background-audio="assets/bird-singing.mp3"</code> ao elemento <code><amp-story-page></code>.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## Página 4: coelhos

Demonstra como definir a disposição do texto e exibir um vídeo que preenche a tela inteira na página.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contém três camadas:       <ul>         <li> <b>Camada 1</b>: implementa o modelo <code>fill</code> e contém um <a href="../../../../documentation/components/reference/amp-video.md">componente <code>amp-video</code></a> responsivo (<code class="filename">rabbit.mp4</code>).           <ul>             <li>Para exibir o vídeo, inclua o <strong>script necessário</strong> do <a href="../../../../documentation/components/reference/amp-video.md">componente <code>amp-video</code></a> na seção <code></code>.</li>             <li>Especifique uma imagem de <code>poster</code> (<code class="filename">rabbit.jpg</code>). Esse atributo é <strong>obrigatório</strong> para histórias AMP.</li>             <li>Defina a exibição automática do vídeo com o atributo <code>autoplay</code>. Esse atributo é <strong>obrigatório</strong> para histórias AMP.</li>             <li>Configure o vídeo para voltar ao início automaticamente com o atributo <code>loop</code>.</li>             <li>Defina as dimensões como <code>width="720"</code> <code>height="1280"</code> e <code>layout="responsive"</code>.</li>           </ul> </li>         <li> <b>Camada 2</b>: implementa o modelo <code>vertical</code> e contém um item:           <ul>             <li>um elemento <code><h1></code> com o título: <em>Rabbits</em> </li>           </ul>         </li>         <li> <b>Camada 3</b>: implementa o modelo <code>vertical</code> e contém um item:           <ul>             <li>um elemento <code><p></code> com o seguinte texto: <em>Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful</em>.</li>             <li>Aplique a classe CSS <code>bottom</code> à camada para alinhar os elementos filhos à parte inferior da tela.</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

Nossa história "A alegria de ter animais de estimação" está quase pronta. Usaremos animações na última página para mostrar todos os animais de estimação.

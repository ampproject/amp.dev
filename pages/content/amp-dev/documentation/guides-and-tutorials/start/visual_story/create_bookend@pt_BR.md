---
$title: Criação do bookend
---

Depois de adicionar todas as páginas, veremos a última tela da história, o "bookend".  Essa tela encerra a história e permite incluir links de compartilhamento social e relacionados à sua história. Assim, os usuários podem compartilhar o material ou navegar mais em outros conteúdos do seu site.

As informações na tela de bookend vêm de um arquivo JSON especificado na tag `<amp-story-bookend>`. Para nosso tutorial, já temos um arquivo JSON ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) com os dados correspondentes.

A tag `<amp-story-bookend>` precisa ser a última tag em [`amp-story`](../../../../documentation/components/reference/amp-story.md). Então, **adicionaremos** `<amp-story-bookend></amp-story-bookend>` antes da tag `</amp-story>`.  Na tag `amp-story-bookend`, vincule o atributo `src` ao arquivo `bookend.json` e defina `layout="nodisplay"`:

```html hl_lines="2"
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

Se você atualizar o navegador e acessar a última tela, verá o seguinte bookend:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

Vejamos o arquivo JSON.  Abra [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) no seu editor de texto.

Toda tela de bookend exige um `bookendVersion`, que é `v1.0` neste tutorial:

```json
"bookendVersion": "v1.0",
```

Os botões de compartilhamento social permitem que os leitores compartilhem seu conteúdo por meio de plataformas sociais, como Twitter, Facebook, Pinterest e outros. Você especifica os provedores de compartilhamento social em um objeto shareProviders e cria uma matriz com os [nomes dos tipos](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) de cada plataforma social.

Para este tutorial, escolhemos Facebook, Twitter e e-mail como nossos provedores de compartilhamento:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

O restante da tela de bookend é para o conteúdo relacionado.  Todo esse conteúdo está em um objeto `components`.

Há vários componentes que você pode usar para exibir links e conteúdo relacionado. Cada componente é especificado com um atributo de tipo. Vejamos os componentes disponíveis:

<table>
<thead>
<tr>
  <th width="20%">Tipo</th>
  <th>Descrição</th>
</tr>
<tr>
  <td>heading</td>
  <td>Permite especificar um título para agrupar artigos.
<pre class="nopreline">
{
  "type": "heading",
  "text": "More to read"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="bookend heading"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>small</td>
  <td>Permite vincular artigos relacionados com a opção de incluir uma imagem associada pequena.
<pre class="nopreline">
{
  "type": "small",
  "title": "Learn about cats",
  "url": "https://wikipedia.org/wiki/Cat",
  "image": "assets/bookend_cats.jpg"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="bookend small article"></amp-img>
  </figure>
</td>
</tr>
<tr>
  <td>landscape</td>
  <td>Permite incluir links para artigos ou outros conteúdos, como vídeos. A imagem associada a esse tipo é maior e no formato paisagem.
<pre class="nopreline">
{
  "type": "landscape",
  "title": "Learn about border collies",
  "url": "https://wikipedia.org/wiki/Border_Collie",
  "image": "assets/bookend_dogs.jpg",
  "category": "Dogs"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="bookend landscape article"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>portrait</td>
  <td>Permite incluir links para histórias ou outros conteúdos.  A imagem associada a esse tipo é maior e no formato retrato.
<pre class="nopreline">
{
  "type": "portrait",
  "title": "Learn about macaws",
  "url": "https://wikipedia.org/wiki/Macaw",
  "image": "assets/bookend_birds.jpg",
  "category": "birds"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="bookend portrait article"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>cta-link</td>
  <td>Permite especificar links de calls-to-action exibidos como botões (por exemplo, "Leia mais", "Assine").
<pre class="nopreline">
{
  "type": "cta-link",
  "links": [
    {
      "text": "Learn more",
      "url": "https://amp.dev/about/stories.html"
    }
  ]
}
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="bookend cta"></amp-img>
  </figure>
  </td>
</tr>
</thead>
<tbody>
</tbody>
</table>

Veja mais informações sobre o componente de bookend. Acesse a documentação de referência do [`amp-story`](../../../../documentation/components/reference/amp-story.md).

Nossa história está quase pronta.  Antes de publicar o conteúdo, vamos verificar se o HTML para AMP é válido.

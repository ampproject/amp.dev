---
$title: Adicionar componentes estendidos de AMP
---

Com o sistema de componentes AMP, é fácil e rápido criar recursos eficientes e responsivos nos seus artigos. A biblioteca de HTML para AMP tem três classificações de componentes AMP:

- **Incorporados**: são os componentes incluídos na biblioteca JavaScript para AMP de base (especificados na tag `<head>`), como [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) e [`amp-pixel`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-pixel.md', locale=doc.locale).url.path}}).  Esses componentes podem ser usados imediatamente em documentos AMP.

- **Estendidos**: são as extensões da biblioteca de base que precisam ser incluídas explicitamente no documento como elementos personalizados.  Os elementos personalizados exigem a inclusão de scripts específicos na seção `<head>`, por exemplo, `<script async custom-element="amp-video" ...`).

- **Experimentais**: são componentes que foram lançados, mas não estão prontos para uso geral. Os desenvolvedores podem optar por usar esses recursos antes que eles estejam totalmente disponíveis para o público.  Saiba mais em [Recursos experimentais]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/experimental.md', locale=doc.locale).url.path}}).

Nosso exemplo já usa um componente incorporado, [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}).  Agora, adicione alguns componentes AMP **estendidos** de uso comum ao artigo de notícias.

## Gerar receita com anúncios

Nas AMP, os anúncios são elaborados por meio do componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}). O componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) permite definir várias configurações dos anúncios, como a largura, a altura e o modo de layout. No entanto, várias plataformas de anúncios exigem configurações adicionais, como o ID da conta da rede de publicidade, o anúncio veiculado ou opções de segmentação da publicidade. Use atributos HTML para definir essas opções com facilidade no componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}).

Veja este exemplo de um anúncio da **DoubleClick**:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

Essa é uma configuração muito simples. Observe o atributo `type`, que informa o componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) sobre a plataforma de anúncios desejada. Nesse caso, queremos usar a plataforma [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md), então `doubleclick` foi especificado como valor.

O atributo `data-slot` é mais exclusivo. No [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}), os atributos iniciados por `data-` são específicos ao fornecedor. Isso significa que nem todos os fornecedores necessariamente exigirão esse atributo em particular, e talvez nem respondam a ele. Por exemplo, compare o exemplo anterior da **DoubleClick** com o anúncio de teste a seguir da plataforma [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302">
</amp-ad>
```

Tente **adicionar** ambos os exemplos acima ao artigo logo após a tag `<header>`. **Atualize** a página e veja os dois anúncios de teste:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Anúncios de teste') }}

Importante: Pode haver alguns erros no console de desenvolvimento, como `Mixed Content` ou `XMLHttpRequest cannot load`. É provável que esse último erro seja relacionado à publicidade da A9, porque nem todo conteúdo carregado por ela é seguro. Esse é um requisito importante para todos os anúncios veiculados nas AMP.

Os dois [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) a seguir são um exemplo da compatibilidade flexível do componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) com recursos de plataformas de anúncios.  Nesse caso, dois anúncios de teste da DoubleClick foram configurados (usando o painel da DoubleClick) para serem exibidos somente em alguns países. O primeiro será exibido só no Reino Unido, e o segundo, só nos EUA.  Tente **adicionar** essas duas configurações de segmentação geográfica ao documento AMP abaixo dos anúncios adicionados anteriormente:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk">
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us">
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**Atualize** a página e veja. A captura de tela a seguir aparece na página canadense, ou seja, nenhum dos anúncios é exibido:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Anúncios de teste') }}

Observação: Dentro dessas tags [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) existem tags `div` adicionais com um atributo chamado `fallback`. Você sabe o que o atributo `fallback` indica? Ele informa ao sistema de carregamento AMP que somente os conteúdos desse elemento são mostrados quando o elemento principal não é carregado. Saiba mais em [Marcadores e substitutos]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}).

Leia mais: Para ver as redes de publicidade compatíveis mais recentes, leia a documentação de referência do componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}).

Observação: Não é permitido exibir JavaScript fornecido pela rede de publicidade no documento AMP. Em vez disso, o ambiente de tempo de execução de AMP carrega um iframe de uma origem diferente (por meio de um sandbox de iframe) e executa o JS da rede de publicidade dentro do sandbox desse iframe.

Agora nosso documento AMP inclui texto, uma imagem e um anúncio incorporado na página, os principais ingredientes para contar uma história e gerar receita com seu conteúdo. No entanto, os sites modernos geralmente incluem outros recursos além de imagens e texto.

Para criar um documento AMP completo, inclua recursos da Web mais avançados que costumam ser encontrados em artigos de notícias, como estes:

- vídeos do YouTube
- tweets
- citações de artigos

## Incorporar um vídeo do YouTube
Tente incorporar um vídeo do YouTube ao documento. **Adicione** o código a seguir logo após `<header>` no documento AMP, acima dos [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) que você acabou de adicionar:

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270">
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Atualize** a página. Em vez do vídeo, você verá este texto: *"Não foi possível carregar o vídeo".*

Mesmo que seu navegador possa mostrar vídeos do YouTube sem problemas, esse erro ainda será exibido. Por quê? Na verdade, não foi o carregamento do vídeo que falhou, mas o próprio componente.

Nem todos os componentes estão incluídos no arquivo JavaScript da biblioteca AMP principal. É necessário incluir uma solicitação JavaScript adicional para o componente do YouTube.

Observação: Se o console de desenvolvimento ainda estiver aberto e o URL tiver `#development=1`, um erro do validador de AMP será exibido para lembrar você de adicionar o JavaScript [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}). A mensagem também incluirá um link para a documentação que informa qual tag `script` precisa ser adicionada.

**Adicione** o script a seguir à tag `<head>`:

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

**Atualize** a página e veja o vídeo do YouTube:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Vídeo incorporado do YouTube') }}

Assim como os outros elementos da página, os elementos `width` e `height` do vídeo foram especificados para que o sistema de layout AMP possa calcular a proporção. Além disso, o `layout` foi definido como `responsive`, para que o vídeo preencha a largura do respectivo elemento principal.

Para saber mais sobre a incorporação de vídeos do YouTube, leia a documentação do componente [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}).

Dica: Use o atributo [`fallback`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}#fallbacks) para informar os usuários caso haja uma falha no carregamento do componente ou ele não seja compatível com o navegador.

## Mostrar um tweet
Incorporar tweets pré-formatados do Twitter é um recurso comum em artigos de notícias. O componente [`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}) é uma maneira fácil de incluir esse conteúdo.

Para começar, adicione a solicitação JavaScript a seguir à tag `<head>` do documento:

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

Depois, **adicione** este código ao artigo para incorporar o tweet:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

O atributo `data-tweetid` é outro exemplo de atributo do cliente exigido por uma plataforma específica. Nesse caso, o Twitter correlaciona o valor do atributo `data-tweetid` a um determinado tweet.

**Atualize** seu navegador e veja a página. O tweet deverá aparecer:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Tweet incorporado') }}

Para saber mais sobre como incorporar tweets do Twitter, leia a documentação do componente [`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}).

Dica: A AMP oferece ainda mais componentes para incorporar conteúdo de redes sociais. Confira os [componentes AMP de redes sociais mais recentes]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}).

## Destacar uma citação do artigo

Um recurso comum em artigos de notícias é destacar os trechos de texto mais interessantes. Por exemplo, uma citação de uma fonte específica ou um fato importante podem aparecer novamente em uma fonte maior para chamar a atenção do leitor.

No entanto, nem todos os snippets de texto têm necessariamente o mesmo comprimento em termos de caracteres. Por isso, pode ser mais difícil equilibrar um tamanho de fonte maior com a quantidade de espaço que o texto preenche na página.

As AMP fornecem outro componente especificamente projetado para esse tipo de situação, chamado [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}). O componente [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) permite definir um elemento de largura e altura fixas, bem como um tamanho máximo de fonte. De maneira inteligente, o componente dimensiona o tamanho da fonte para **ajustar** o texto à largura e à altura disponíveis.

Vamos testar. Primeiro, **adicione** a biblioteca do componente à tag `<head>`:

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

Adicione o seguinte à sua página:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Atualize** a página e veja o resultado.

Agora, teste outra opção. O que acontece quando a citação é muito mais curta?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

E se a citação for mais longa?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

Como um último experimento com o [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}), crie um texto curto, como "Olá", com uma altura muito maior (por exemplo, um valor de 400), mantendo o valor de 42 no atributo max-font-size. Como a página ficaria? O texto está centralizado verticalmente? Ou a altura da tag [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) é reduzida para se ajustar ao tamanho máximo da fonte? Pense no que você já sabe sobre o sistema de layout AMP e tente responder a essas perguntas antes de usar o código.

Saiba mais sobre o [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) com a [demonstração ao vivo da AMP]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-fit-text.html', locale=doc.locale).url.path}}).

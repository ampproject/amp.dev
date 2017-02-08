---
$title: Incluir conteúdo de terceiros
---

Saiba como incluir componentes de terceiros em suas páginas.

[TOC]

## Incorporar um tweet

Incorpore um tweet na sua página
usando o elemento [`amp-twitter`](/docs/reference/extended/amp-twitter.html).

Para incluir um tweet em sua página,
em primeiro lugar inclua o seguinte script no `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Atualmente, os tweets são dimensionados automaticamente de acordo com sua proporção
para se ajustarem ao tamanho fornecido,
mas isso pode gerar uma aparência não muito boa.
Ajuste manualmente a largura e a altura fornecidas ou use o atributo de mídia
para selecionar a proporção com base na largura da tela.

Exemplo de `amp-twitter` a partir do
[exemplo de twitter.amp](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html):

[sourcecode:html]
<amp-twitter width=390 height=50
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## Incorporar uma imagem do Instagram

Incorpore uma imagem do Instagram em sua página
usando o elemento [`amp-instagram`](/docs/reference/extended/amp-instagram.html).

Para incluir uma imagem do Instagram,
em primeiro lugar inclua o seguinte script no `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Inclua o data-shortcode do Instagram encontrado no URL da foto no Instagram.
Por exemplo, em `https://instagram.com/p/fBwFP`,
`fBwFP` é o data-shortcode.
Além disso, o Instagram usa uma proporção fixa para os layouts responsivos,
de modo que os valores de largura e altura são universais.

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## Exibir postagem ou vídeo do Facebook

Exiba uma postagem ou um vídeo do Facebook na sua página
usando o elemento [`amp-facebook`](/docs/reference/extended/amp-facebook.html).

Você precisa incluir o seguinte script no `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

Exemplo - Incorporação de uma postagem:

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

Exemplo - Incorporação de um vídeo:

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## Incluir um vídeo do YouTube

Inclua um vídeo do YouTube em sua página
usando o elemento [`amp-youtube`](/docs/reference/extended/amp-youtube.html).

Você precisa incluir o seguinte script no `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

O `data-videoid` do YouTube pode ser encontrado em qualquer URL de uma página de vídeos do YouTube.
Por exemplo, em https://www.youtube.com/watch?v=Z1q71gFeRqM,
Z1q71gFeRqM é o ID do vídeo.

Use `layout="responsive"` para gerar layouts de forma correta para vídeos com proporção de 16:9.

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## Exibir um anúncio

Exiba um anúncio em sua página
usando o elemento [`amp-ad`](/docs/reference/amp-ad.html).
Somente anúncios veiculados via HTTPS são compatíveis.

Nenhuma rede de anúncios que forneça JavaScript pode ser executada dentro do documento de AMP.
Em vez disso, o tempo de execução da AMP carrega um iframe de uma
origem diferente (por meio de uma sandbox de iframe)
e executa o JS da rede de anúncios dentro da sandbox desse iframe.

Você precisa especificar a largura e a altura do anúncio e o tipo de rede de anúncios.
O `type` identifica o modelo da rede de anúncios.
Diferentes tipos de anúncios exigem diferentes atributos `data-*`.

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

Se compatível com a rede de anúncios,
inclua um `placeholder`
para ser mostrado quando nenhum anúncio estiver disponível:

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

A AMP é compatível com uma ampla gama de redes de anúncios. Consulte as [referências para ver a lista completa](/docs/reference/amp-ad.html#supported-ad-networks).

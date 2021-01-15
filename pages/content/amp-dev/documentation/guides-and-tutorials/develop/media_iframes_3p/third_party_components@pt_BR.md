---
"$title": Include third-party content
"$order": '9'
description: Saiba como incluir componentes de terceiros em suas páginas...
formats:
- websites
components:
- iframe
- facebook
author: Meggin
contributors:
- pbakaus
- bpaduch
---

Saiba como incluir componentes de terceiros em suas páginas.

## Incorporar um tweet

Incorpore um tweet na sua página usando o elemento [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

Para incluir um tweet em sua página, em primeiro lugar inclua o seguinte script no `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Atualmente, os tweets são dimensionados automaticamente de acordo com sua proporção para se ajustarem às dimensões disponíveis, mas isto pode não resultar numa aparência muito boa. Ajuste manualmente a largura e a altura fornecidas ou use o atributo media para selecionar a proporção com base na largura da tela.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

[tip type="tip"] <strong>DICA –</strong> Veja mais exemplos de [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) na página [AMP By Example](../../../../documentation/examples/documentation/amp-twitter.html).[/tip]

## Incorporar uma imagem do Instagram

Incorpore uma imagem do Instagram em sua página usando o elemento [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Para incluir uma imagem do Instagram, primeiro inclua o seguinte script no `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram"
  src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Inclua o valor do atributo data-shortcode do Instagram encontrado no URL da foto no Instagram. Por exemplo, em `https://instagram.com/p/fBwFP`, `fBwFP` é o data-shortcode. Além disso, o Instagram usa uma proporção fixa para os layouts responsivos, de modo que os valores de largura e altura são universais.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

[tip type="tip"] <strong>DICA –</strong> Veja mais exemplos de [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) na página [AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html).[/tip]

## Exibir postagem ou vídeo do Facebook

Exiba uma postagem ou um vídeo do Facebook na sua página usando o elemento [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md).

Você precisa incluir o seguinte script no `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook"
  src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Exemplo - Incorporação de uma postagem:

Source:

```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```

Preview: <amp-facebook width="486" height="657" layout="responsive" data-href="https://www.facebook.com/zuck/posts/10102593740125791"> </amp-facebook>

##### Exemplo - Incorporação de um vídeo:

Source:

```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```

Preview: <amp-facebook width="476" height="316" layout="responsive" data-embed-as="video" data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"> </amp-facebook>

[tip type="tip"] <strong>DICA –</strong> Veja mais exemplos de [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) na página [AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html).[/tip]

## Incluir um vídeo do YouTube

Inclua um vídeo do YouTube em sua página usando o elemento [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

Você precisa incluir o seguinte script no `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

O atributo `data-videoid` do YouTube pode ser encontrado em qualquer URL de uma página de vídeos do YouTube. Por exemplo, em `https://www.youtube.com/watch?v=Z1q71gFeRqM`, `Z1q71gFeRqM` é o ID do vídeo.

Use `layout="responsive"` para gerar os layouts corretos para vídeos com proporção de 16:9.

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

[tip type="tip"] <strong>DICA –</strong> Veja mais exemplos de [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) na página [AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html).[/tip]

## Exibir um anúncio

Exiba um anúncio em sua página usando o elemento [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Somente anúncios veiculados via HTTPS são compatíveis.

Nenhum JavaScript fornecido por uma rede de anúncios pode ser executado dentro do documento AMP. Em vez disso, o runtime AMP carrega um iframe de uma origem diferente (através do sandbox do iframe) e executa o JS da rede de anúncios dentro da sandbox desse iframe.

Você precisa especificar a largura e a altura do anúncio e o tipo de rede de anúncios. O `type` identifica o modelo da rede de anúncios. Diferentes tipos de anúncios exigem diferentes atributos `data-*`.

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
</amp-ad>
```
[/example]

Se compatível com a rede de anúncios, inclua um `placeholder` para ser mostrado quando nenhum anúncio estiver disponível:

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
  <div placeholder>Have a great day!</div>
</amp-ad>
```
[/example]

O AMP é compatível com uma ampla gama de redes de anúncios. Consulte as [referências](../../../../documentation/components/reference/amp-ad.md#supported-ad-networks) para uma lista completa.

[tip type="read-on"] <strong>LEIA MAIS –</strong> Saiba mais sobre anúncios no guia [Como veicular anúncios em AMP](../../../../documentation/guides-and-tutorials/develop/monetization/index.md).[/tip]

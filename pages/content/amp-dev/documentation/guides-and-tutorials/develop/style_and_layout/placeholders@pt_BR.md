---
'$title': Placeholders e fallbacks
$order: 3
descriptions: No espírito do desempenho percebido e melhoria progressiva, é uma prática recomendada no AMP fornecer placeholders e fallbacks sempre que possível.
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

No espírito do desempenho percebido e melhoria progressiva, é uma prática recomendada no AMP fornecer placeholders e fallbacks sempre que possível.

Se você fizer isso, alguns elementos até reduzirão as restrições. Por exemplo, se você usar um placeholder para [`<amp-iframe>`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), ele poderá ser usado na parte superior da página. Isso não seria possível sem o placeholder.

## Placeholders

O elemento com o atributo `placeholder` atua como um marcador de posição para o elemento AMP pai. Se um elemento `placeholder` for especificado, ele terá que ser um filho direto do elemento AMP. Os elementos marcados como `placeholder` sempre terão a função `fill` em relação ao elemento AMP pai.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300"
>
  <amp-img
    placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill"
  >
  </amp-img>
</amp-anim>
```

[/example]

Por default, o placeholder é mostrado imediatamente para o elemento AMP, mesmo que os recursos desse elemento não tenham sido inicializados nem baixados. Depois de pronto, o elemento AMP geralmente oculta o placeholder e mostra o conteúdo.

[tip type="note"] <strong>OBSERVAÇÃO –</strong> O placeholder não precisa ser um elemento AMP. Qualquer elemento HTML pode ter essa função.[/tip]

## Fallbacks <a name="fallbacks"></a>

É possível especificar o atributo `fallback` em um elemento para indicar um substituto:

- para qualquer elemento incompatível com o navegador;
- se o conteúdo não for carregado, por exemplo, tweet excluído;
- se o tipo de imagem não for compatível. Por exemplo, o WebP não é compatível com todos os navegadores.

O atributo `fallback` pode ser definido em _qualquer_ elemento HTML, e não somente em elementos AMP. Quando especificado, o elemento `fallback` precisa ser um filho direto do elemento AMP.

##### Exemplo: recurso incompatível

No exemplo abaixo, o atributo `fallback` é usado para comunicar ao usuário que o navegador não é compatível com um determinado recurso:

[example preview="inline" playground="true" imports="amp-video:0.1"]

```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

[/example]

##### Exemplo: como exibir diferentes formatos de imagem

No exemplo abaixo, o atributo `fallback` é usado para instruir o navegador a usar o arquivo JPEG se o formato WebP não for compatível.

[example preview="inline" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

## Interação entre placeholders e fallbacks

No caso dos componentes AMP que dependem de conteúdo dinâmico (por exemplo, [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) e [`amp-list`](../../../../documentation/components/reference/amp-list.md)), a interação entre placeholders e fallbacks é a seguinte:

<ol>
  <li>O placeholder é exibido durante o carregamento do conteúdo.</li>
  <li>Quando o conteúdo for carregado, o placeholder será ocultado para a exibição do conteúdo.</li>
  <li>Quando ocorrer uma falha no carregamento do conteúdo:     <ol>       <li>Se houver um elemento de fallback, ele será exibido.</li>       <li>Caso contrário, o placeholder continuará em exibição.</li>     </ol>
</li>
</ol>

## Ocultar indicadores de carregamento

Muitos elementos AMP são colocados na lista de permissões para mostrar um "indicador de carregamento", uma animação básica indicando que o elemento ainda não foi totalmente carregado. É possível desativar esse comportamento nos elementos com a inclusão do atributo `noloading`.

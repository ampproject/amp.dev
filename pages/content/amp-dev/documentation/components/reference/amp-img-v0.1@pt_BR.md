---
$title: amp-img
$category@: media
teaser:
  text: Substitui a tag img de HTML5.
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



<table>
  <tr>
    <td class="col-fourty"><strong>Descrição</strong></td>
    <td>Uma substituição gerenciada pelo ambiente de execução para a tag <code>img</code> de HTML.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td>Veja um exemplo de <a href="https://ampbyexample.com/components/amp-img/">amp-img</a> no site AMP By Example.</td>
  </tr>
</table>


# Comportamento <a name="behavior"></a>

O ambiente de execução pode optar por atrasar ou priorizar o carregamento de recursos com base na posição da janela de visualização, nos recursos do sistema, na largura de banda da conexão ou em outros fatores. Assim, os componentes de `amp-img` permitem que o ambiente de execução gerencie recursos de imagem com eficácia.

Os componentes de `amp-img`, assim como todos os recursos de AMP buscados externamente, precisam receber um tamanho explícito (como em `width`/`height`) com antecedência para que a proporção seja conhecida sem buscar a imagem. O comportamento real do layout é determinado pelo atributo `layout`.

[tip type="read-on"]
saiba mais sobre os layouts na especificação [Sistema de layout do HTML para AMP](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md) (link em inglês) e em [Layouts compatíveis](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute).
[/tip]

# Exemplo: como exibir uma imagem responsiva <a name="example-displaying-a-responsive-image"></a>

No exemplo a seguir, mostramos uma imagem que responde ao tamanho da janela de visualização configurando `layout=responsive`.  A imagem se estica e encolhe de acordo com a proporção especificada por `width` e `height`.

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

[tip type="read-on"]
saiba mais sobre páginas AMP responsivas no guia [Criar páginas AMP responsivas](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).
[/tip]

Se o recurso solicitado pelo componente `amp-img` não for carregado, o espaço ficará em branco, a menos que um [`fallback`](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#fallback) filho seja fornecido. Um substituto (fallback) é executado somente no layout inicial. As alterações src subsequentes após o fato (por meio de resize + srcset, por exemplo) não terão um substituto para implicações de desempenho.

# Exemplo: especificar uma imagem substituta <a name="example-specifying-a-fallback-image"></a>

No exemplo a seguir, se o navegador não for compatível com WebP, a imagem JPG substituta será exibida:

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

Uma cor de segundo plano de marcador ou outro recurso visual pode ser definido usando o seletor e o estilo CSS no próprio elemento.

Outros recursos de imagem, como legendas, podem ser implementados com HTML padrão (por exemplo, `figure` e `figcaption`).

[tip type="read-on"]
saiba mais sobre como utilizar o `amp-img`:

* [Marcadores e substitutos](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)
* [Incluir imagens e vídeo](../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)
[/tip]

# Atributos <a name="attributes"></a>

**src**

Esse atributo é semelhante ao `src` da tag `img`. O valor precisa ser um URL que aponte para um arquivo de imagem armazenável em cache publicamente. Provedores de cache podem reescrever esses URLs ao ingerir arquivos AMP para que apontem para uma versão em cache da imagem.

**srcset**

Igual ao atributo `srcset` na tag `img`. Para navegadores não compatíveis com o `srcset`, o `<amp-img>` assumirá como padrão o `src`. Se apenas `srcset` e `src` forem fornecidos, o primeiro URL em `srcset` será selecionado.

**sizes**

Igual ao atributo `sizes` da tag `img`.

[tip type="read-on"]
consulte [Imagens responsivas com os atributos "srcset", "sizes" e "heights"](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md) para ver o uso de `sizes` e `srcset`.
[/tip]

**alt**

Uma string de texto alternativo, semelhante ao atributo `alt` da `img`.

**attribution**

Uma string que indica a atribuição da imagem. Por exemplo, `attribution="CC courtesy of Cats on Flicker"`

**height** e **width**

Um tamanho explícito da imagem, que é usado pelo ambiente de tempo de execução de AMP para determinar a proporção sem buscar a imagem.

**common attributes**

Esse elemento inclui [atributos comuns](../../../documentation/guides-and-tutorials/learn/common_attributes.md) estendidos a componentes de AMP.

# Estilo <a name="styling"></a>

`amp-img` pode ser estilizado diretamente por meio das propriedades de CSS. A definição de um marcador de segundo plano cinza, por exemplo, pode ser conseguida com o seguinte código:

```css
amp-img {
  background-color: grey;
  }
```

# Dicas e truques <a name="tips--tricks"></a>

# Dimensionar uma imagem até uma largura máxima <a name="scaling-an-image-up-to-a-maximum-width"></a>

Se você quiser que sua imagem seja dimensionada à medida que a janela for redimensionada, mas até uma largura máxima (para que a imagem não se estenda além da própria largura):

1. Defina `layout=responsive` para `<amp-img>`.
1. No contêiner da imagem, especifique o atributo CSS `max-width:<max width to display image>`.  Por que no contêiner?  Um elemento `amp-img` com `layout=responsive` é um elemento de *nível de bloco*, enquanto `<img>` é *in-line*. Outra alternativa é definir `display: inline-block` no seu CSS para o elemento amp-img.

# Diferença entre o layout responsive e o intrinsic <a name="the-difference-between-responsive-and-intrinsic-layout"></a>

Os layouts `responsive` e `intrinsic` criam uma imagem que será dimensionada automaticamente.  A principal diferença é que o layout `intrinsic` usa uma imagem SVG no elemento de dimensionamento.  Isso faz com que ele se comporte da mesma forma que uma imagem HTML padrão, mantendo o benefício de o navegador saber o tamanho da imagem no layout inicial. O layout `intrinsic` terá um tamanho intrínseco e aumentará um `div` flutuante até que ele chegue ao tamanho natural da imagem ou a uma restrição de CSS, como `max-width`. O layout `responsive` renderizará 0x0 em um `div` flutuante, porque tem o tamanho do pai, que não tem tamanho natural quando flutuante.

# Definir uma imagem de tamanho fixo <a name="setting-a-fixed-sized-image"></a>

Se você quiser que sua imagem seja exibida em um tamanho fixo:

1. Defina `layout=fixed` para `<amp-img>`.
1. Especifique `width` e `height`.

[tip type="read-on"]
saiba mais sobre o [layout inferido](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified) caso você não especifique o atributo `layout`.
[/tip]

# Definir a proporção <a name="setting-the-aspect-ratio"></a>

Para imagens responsivas, `width` e `height` não precisam corresponder à largura e altura exatas do `amp-img`. Esses valores só precisam resultar na mesma proporção.

Por exemplo, em vez de especificar `width="900"` e `height="675"`, você pode simplesmente especificar `width="1.33"` e `height="1"`.

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="1.33"
  height="1"
  layout="responsive">
</amp-img>
```
[/example]

# Configurar vários arquivos de origem para diferentes resoluções de tela <a name="setting-multiple-source-files-for-different-screen-resolutions"></a>

O atributo [`srcset`](#attributes) precisa ser usado para fornecer resoluções diferentes da mesma imagem, todas com a mesma proporção. O navegador escolherá automaticamente o arquivo mais apropriado de `srcset` com base na resolução da tela e na largura do dispositivo do usuário.

Por outro lado, o atributo [`media`](../../../documentation/guides-and-tutorials/learn/common_attributes.md#media) mostra ou oculta componentes de AMP e precisa ser usado ao projetar layouts responsivos. A maneira apropriada de exibir imagens com proporções diferentes é usar vários componentes `<amp-img>`, cada um com um atributo `media` que corresponda às larguras de tela em que cada instância será mostrada.

Consulte o guia sobre como [criar páginas AMP responsivas](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#displaying-responsive-images) para ver mais detalhes.

# Manter a proporção para imagens com dimensões desconhecidas <a name="maintaining-the-aspect-ratio-for-images-with-unknown-dimensions"></a>

O sistema de layout AMP requer a proporção de uma imagem antes de buscar essa imagem. No entanto, em alguns casos, você pode não saber as dimensões dela. Para exibir imagens com dimensões desconhecidas e manter as proporções, combine o layout [`fill`](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) de AMP com a propriedade CSS [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/). Para ver mais informações, consulte [Como oferecer compatibilidade com imagens de dimensões desconhecidas](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions) (link em inglês) no site AMP By Example.

# Validação <a name="validation"></a>

Consulte as [regras do amp-img](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) na especificação do validador de AMP.

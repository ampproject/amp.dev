---
$title: Encontrando o Componente Certo
$order: 5
leveled: true
---

[filter level="beginner"]
## Navegando na documentação dos componentes AMP

Até agora, os componentes que usamos foram bastante simples. Para `<amp-img>` e `<amp-youtube>`, bastou visitar a documentação, olhar um exemplo e copiar para o nosso site. Para recursos mais avançados desses componentes, ou para componentes mais complicados, teremos que ler e absorver mais informações da documentação.

Para desenvolver sites AMP de maneira eficaz, é importante aprender a navegar na documentação dos componentes AMP. Vamos praticar essa habilidade extensivamente ao longo de cada um dos treinamentos desta série.

Em seguida, queremos adicionar uma coleção de imagens de produtos de bicicleta de queijo para nossos usuários rolarem. Para isso, usaremos um componente de carrossel de imagens. Um **carrossel** é um elemento que contém um conjunto de itens que podem ser percorridos como uma apresentação de slides. A implementação AMP de um carrossel é o componente: `<amp-carousel>`. Este componente não é embutido, então você precisará adicionar seu script no `<head>` da página.

Quando observamos para a [documentação]({{g.doc('/content/amp-dev/documentation/components/reference/amp-carousel.md', locale=doc.locale).url.path}}) para `<amp-carousel>`, estamos procurando respostas para perguntas como:

- O que esse componente faz?

- Como faço para usar este componente?

- Como posso usar atributos para personalizar este componente?

- Como faço para estilizar este componente?

- Preciso incluir um script adicional para habilitar este componente?

- Quais layouts este componente suporta?

{{ image('/static/img/courses/beginner/image25.png', 512, 386, caption='Página de documentação de AMP para <amp‑carousel>.') }}

Veja os seguintes itens na [documentação]({{g.doc('/content/amp-dev/documentation/components/reference/amp-carousel.md', locale=doc.locale).url.path}}) do `<amp-carousel>`:

- **A descrição** - No início da documentação de cada componente, há uma breve descrição. Ele resume o que é o componente e por que existe.

- **A seção de comportamento** - Esta seção explica como o componente funciona. Ele geralmente fornece algum código de amostra, bem como uma prévia da aparência do componente.

- **A lista de atributos** - Falamos sobre atributos personalizados na seção anterior sobre web components. Isso nos permite personalizar nosso componente AMP de certas maneiras. Esta seção contém a lista de diferentes atributos, seus valores possíveis e o que os atributos controlam.

- **A seção de estilo** - Esta seção explica como usar CSS para alterar a aparência deste componente. Além de estilizar por nome de tag ou ID, muitos componentes fornecem classes CSS adicionais que podem ser usadas para alterar a aparência do componente em certos estados. Por exemplo, `<amp-carousel>` fornece a classe `.amp-carousel-button`, que permite aos desenvolvedores remodelar os botões que mudam o slide do carrossel.

- **A tag de script necessária** - Localizada no topo da documentação, esta tag precisa ser adicionada ao `<head>` do nosso site para fazer o componente funcionar. A maioria dos componentes requer esses scripts adicionais para funcionar.

- **Os layouts suportados** - Discutimos o atributo [layout]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html', locale=doc.locale).url.path}}) em uma seção anterior. Ele controla a maneira como o elemento é renderizado na tela. Esta seção explica quais layouts são válidos para este componente.

Esses itens estão listados na documentação de quase todos os componentes AMP. Vamos explorar a documentação usando um de seus exemplos:

[sourcecode:html]
{% raw %}<amp-carousel id="carousel-with-preview"
    width="450"
    height="300"
    layout="responsive"
    type="slides">
<amp-img src="images/image1.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="apples"></amp-img>
<amp-img src="images/image2.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="lemons"></amp-img>
<amp-img src="images/image3.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="blueberries"></amp-img>
</amp-carousel>
{% endraw %}[/sourcecode]

Este carrossel contém três imagens para os usuários deslizarem. Os atributos desta instância do componente carrossel(`id`, `width`, `height`, `layout`, e `type`) são divididos em três grupos: [atributos comuns a todos os elementos HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Global_attributes) (`id`), [atributos comuns a todos os componentes AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/common_attributes.md', locale=doc.locale).url.path}})
(`width`, `height`, e `layout`), e atributos exclusivos do componente carrossel (`type`).

Na documentação para `<amp-carousel>`, vemos que o componente pode ter um atributo `type`. Isso mostra que as entradas válidas para `type` incluem` slides` e `carousel`.

Isso significa que se você não especificar um `type`, o padrão será` carousel`.

[tip type="read-on"]
**Dica**: alguns atributos não exigem nenhum valor. Eles são chamados de [atributos booleanos](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes). Nesses casos, o atributo tem um valor padrão `false` e um valor` true` quando anexado a um elemento ou componente.
[/tip]

Muitos outros atributos personalizados podem ser usados com o componente `<amp-carousel>`. Ao usar um componente AMP pela primeira vez, consulte a documentação para ter uma ideia de todas as maneiras de personalizar a aparência ou o comportamento do componente por meio de atributos.

## Exercício 5: Criando uma apresentação de slides de imagens

Vamos praticar o uso da documentação para adicionar um `<amp-carousel>` ao nosso projeto. Adicione um carrossel sob o elemento `<p class =" main-text ">` com as seguintes configurações:

- Dê ao carrossel um layout `responsive`.

- Dê ao carrossel um `type` de` slides`.

- Adicione três imagens ao carrossel: `assets/cheddar-chaser.jpg`, `assets/cheese.jpg` e `assets/mouse.jpg`.

- Faça as imagens do carrossel voltarem ao início se um usuário tentar avançar além do último slide.

Diretrizes de estilo recomendadas:

- Dê ao carrossel uma `width` de` 412` e uma `height` de `309`.

- Dê a cada imagem uma `width` de` 412` e uma `height` de `309`.

Depois de fazer as alterações, olhe para a página on-line para verificar seu trabalho. Sua página deve ser semelhante a esta:

{{ image('/static/img/courses/beginner/image9.png', 312, 552,  align='center third', caption='O carrossel em nossa página.') }}

### Solução

Esta é a aparência do código que você adicionou em seu projeto:

[sourcecode:html]
{% raw %}<amp-carousel layout="responsive" width="412" height="309" type="slides" loop>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser.jpg?1540228205366"
             width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese.jpg?1540228223785"
             width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse.jpg?1540228223963"
             width="412" height="309" layout="responsive"></amp-img>
</amp-carousel>
{% endraw %}[/sourcecode]

Lembre-se de incluir o script `<amp-carousel>` no `<head>`:

```
<script async custom-element="amp-carousel" src="https://ampjs.org/v0/amp-carousel-0.1.js"></script>
```

## Descobrindo Novos Componentes

À medida que continuamos a desenvolver nosso site de bike cheese, nem sempre saberemos o nome do componente AMP que queremos adicionar para implementar algum novo recurso desejado. A comunidade AMP produziu uma grande coleção de componentes que lidam com muitos tipos diferentes de funcionalidade: anúncios e análises, conteúdo dinâmico, layout, mídia, apresentação e social. É comum, ao desenvolver um site AMP, receber um conjunto de requisitos para um novo recurso e, em seguida, pesquisar nas listas de componentes AMP em busca de um componente que atenda a esses requisitos.

A primeira maneira de descobrir novos componentes AMP é usar seu mecanismo de pesquisa favorito ou a funcionalidade de pesquisa no projeto AMP [site](https://amp.dev/). Esta é uma maneira eficaz de ir diretamente para a documentação de um componente que você já conhece pelo nome. Além disso, você pode pesquisar descrições de componentes nos quais tem interesse para encontrar resultados. Pesquisar “vídeos do YouTube”, por exemplo, exibirá `<amp-youtube>` como o primeiro resultado. Da mesma forma, pesquisar “conteúdo que pode ser recolhido” trará o componente `<amp-accordion>` como o primeiro resultado.

Outra maneira de encontrar componentes é usar a página de [Referência de componentes de AMP]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}). Ele contém uma lista dos componentes compatíveis com AMP. Cada entrada de componente inclui o nome do componente e uma breve descrição da funcionalidade que o componente fornece. Podemos acessar a documentação de um componente clicando em seu nome. Como aprendemos anteriormente, a documentação se aprofundará ainda mais no comportamento do componente. Com base nessas informações, devemos ser capazes de determinar se o componente atenderá às nossas necessidades ou se precisamos procurar um componente diferente. Em um treinamento futuro, discutiremos o que fazer se nenhum componente atender a todos os nossos requisitos.

{{ image('/static/img/courses/beginner/image3.png', 512, 271, caption='A página de referência do componente AMP.') }}

Finalmente, podemos ainda ter dúvidas sobre como o componente atuaria em nosso site, ou podemos não estar certos sobre como usar o componente de maneiras mais complexas. A seção [AMP por exemplo]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}}) em amp.dev tem páginas que mostram muitos componentes AMP, mostrando uma variedade de maneiras de configurar esses componentes para atender a casos de uso comuns em sites modernos. Normalmente, você pode acessar a página AMP por exemplo correspondente para um componente diretamente da documentação.

{{ image('/static/img/courses/beginner/image7.png', 512, 350, caption='Página AMP por exemplo para o componente`<amp-carousel>`.') }}

## Exercício 6: Adicionando Links de Compartilhamento Social

Links de mídia social são comuns em páginas web modernas. O AMP nos fornece botões de link prontos que permitem aos usuários compartilhar sua página em suas mídias sociais com um único clique, ajudando assim a aumentar o engajamento do usuário.

Usando a documentação de AMP, adicione botões abaixo do componente `<amp-youtube>` que permitem ao usuário **compartilhar** nossa página com um único clique. No entanto, você precisará navegar e pesquisar em [Referência de componentes de AMP]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}) para encontrar o componente AMP adequado. (**Dica**: o título desta seção deve ajudá-lo a encontrar o que procura.)

Depois de localizar o componente correto, clique no nome do componente para acessar sua documentação. Use essa documentação para adicionar componentes que:

- Oferece ao usuário a opção de compartilhar sua página nas seguintes plataformas: Email, LinkedIn, Tumblr e Twitter.

Diretrizes de estilo recomendadas:

- Envolva os componentes AMP em um `div` com uma classe`social-bar`.

- Dê a cada componente AMP uma `width` e uma` height` de `44`.

Depois de concluir esta tarefa, sua página deve conter botões para o usuário compartilhar seu site:

{{ image('/static/img/courses/beginner/image19.png', 220, 392,  align='center third', caption='Botões de mídia social incorporados na página.') }}

### Solução

[sourcecode:html]
{% raw %}<div class="social-bar">
  <amp-social-share type="email" width="44" height="44"></amp-social-share>
  <amp-social-share type="linkedin" width="44" height="44"></amp-social-share>
  <amp-social-share type="tumblr" width="44" height="44"></amp-social-share>
  <amp-social-share type="twitter" width="44" height="44"></amp-social-share>
</div>
{% endraw %}[/sourcecode]

Lembre-se de incluir o script `<amp-social-share>` no `<head>`:

```
<script async custom-element="amp-social-share" src="https://ampjs.org/v0/amp-social-share-0.1.js"></script>
```
[/filter]

[filter level="advanced"]
## Navegando na documentação dos componentes AMP

Em seguida, queremos adicionar uma coleção de imagens de produtos de bicicleta de queijo para nossos usuários rolarem. Para isso, usaremos um componente de carrossel de imagens. A implementação AMP de um carrossel é o componente: `<amp-carousel>`. Este componente não é padrão, então você precisará adicionar seu script no `<head>` da página.

Quando olhamos para a [documentação]({{g.doc('/content/amp-dev/documentation/components/reference/amp-carousel.md', locale=doc.locale).url.path}}) para `<amp-carousel>`, estamos procurando respostas para perguntas como:

- O que esse componente faz?

- Como faço para usar este componente?

- Como posso usar atributos para personalizar este componente?

- Como faço para estilizar este componente?

- Preciso incluir um script adicional para habilitar este componente?

- Quais layouts este componente suporta?

{{ image('/static/img/courses/beginner/image25.png', 512, 386, caption='Página de documentação de AMP para <amp‑carousel>.') }}

Veja os seguintes itens na [documentação]({{g.doc('/content/amp-dev/documentation/components/reference/amp-carousel.md', locale=doc.locale).url.path}}) do `<amp-carousel>`:

- **A descrição** - No início da documentação de cada componente, há uma breve descrição. Ele resume o que é o componente e por que existe.

- **A seção de comportamento** - Esta seção explica como o componente funciona. Ele geralmente fornece algum código de amostra, bem como uma prévia da aparência do componente.

- **A lista de atributos** - Falamos sobre atributos personalizados na seção anterior sobre web components. Isso nos permite personalizar nosso componente AMP de certas maneiras. Esta seção contém a lista de diferentes atributos, seus valores possíveis e o que os atributos controlam.

- **A seção de estilo** - Esta seção explica como usar CSS para alterar a aparência deste componente. Além de estilizar por nome de tag ou ID, muitos componentes fornecem classes CSS adicionais que podem ser usadas para alterar a aparência do componente em certos estados. Por exemplo, `<amp-carousel>` fornece a classe `.amp-carousel-button`, que permite aos desenvolvedores remodelar os botões que mudam o slide do carrossel.

- **A tag de script necessária** - Localizada no topo da documentação, esta tag precisa ser adicionada ao `<head>` do nosso site para fazer o componente funcionar. A maioria dos componentes requer esses scripts adicionais para funcionar.

- **Os layouts suportados** - Discutimos o atributo [layout]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html', locale=doc.locale).url.path}}) em uma seção anterior. Ele controla a maneira como o elemento é renderizado na tela. Esta seção explica quais layouts são válidos para este componente.

Esses itens estão listados na documentação de quase todos os componentes AMP. Vamos explorar a documentação usando um de seus exemplos:

[sourcecode:html]
{% raw %}<amp-carousel id="carousel-with-preview"
    width="450"
    height="300"
    layout="responsive"
    type="slides">
<amp-img src="images/image1.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="apples"></amp-img>
<amp-img src="images/image2.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="lemons"></amp-img>
<amp-img src="images/image3.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="blueberries"></amp-img>
</amp-carousel>
{% endraw %}[/sourcecode]

Este carrossel contém três imagens para os usuários deslizarem. Os atributos desta instância do componente carrossel(`id`, `width`, `height`, `layout`, e `type`) são divididos em três grupos: [atributos comuns a todos os elementos HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Global_attributes) (`id`), [atributos comuns a todos os componentes AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/common_attributes.md', locale=doc.locale).url.path}})
(`width`, `height`, e `layout`), e atributos exclusivos do componente carrossel (`type`).

Na documentação para `<amp-carousel>`, vemos que o componente pode ter um atributo `type`. Isso mostra que as entradas válidas para `type` incluem` slides` e `carousel`.

Isso significa que se você não especificar um `type`, o padrão será` carousel`.

[tip type="read-on"]
**Dica**: alguns atributos não exigem nenhum valor. Eles são chamados de [atributos booleanos](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes). Nesses casos, o atributo tem um valor padrão `false` e um valor` true` quando anexado a um elemento ou componente.
[/tip]

Muitos outros atributos personalizados podem ser usados com o componente `<amp-carousel>`. Ao usar um componente AMP pela primeira vez, consulte a documentação para ter uma ideia de todas as maneiras de personalizar a aparência ou o comportamento do componente por meio de atributos.

## Exercício 5: Criando uma apresentação de slides de imagens

Vamos praticar o uso da documentação para adicionar um `<amp-carousel>` ao nosso projeto. Adicione um carrossel sob o elemento `<p class =" main-text ">` com as seguintes configurações:

- Dê ao carrossel um layout `responsive`.

- Dê ao carrossel um `type` de` slides`.

- Adicione três imagens ao carrossel: `assets/cheddar-chaser.jpg`, `assets/cheese.jpg` e `assets/mouse.jpg`.

- Faça as imagens do carrossel voltarem ao início se um usuário tentar avançar além do último slide.

Diretrizes de estilo recomendadas:

- Dê ao carrossel uma `width` de` 412` e uma `height` de `309`.

- Dê a cada imagem uma `width` de` 412` e uma `height` de `309`.

Depois de fazer as alterações, olhe para a página on-line para verificar seu trabalho. Sua página deve ser semelhante a esta:

{{ image('/static/img/courses/beginner/image9.png', 312, 552,  align='center third', caption='O carrossel em nossa página.') }}

### Solução

Esta é a aparência do código que você adicionou em seu projeto:

[sourcecode:html]
{% raw %}<amp-carousel layout="responsive" width="412" height="309" type="slides" loop>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser.jpg?1540228205366"
             width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese.jpg?1540228223785"
             width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse.jpg?1540228223963"
             width="412" height="309" layout="responsive"></amp-img>
</amp-carousel>
{% endraw %}[/sourcecode]

Lembre-se de incluir o script `<amp-carousel>` no `<head>`:

```
<script async custom-element="amp-carousel" src="https://ampjs.org/v0/amp-carousel-0.1.js"></script>
```

## Descobrindo Novos Componentes

À medida que continuamos a desenvolver nosso site de bike cheese, nem sempre saberemos o nome do componente AMP que queremos adicionar para implementar algum novo recurso desejado. A comunidade AMP produziu uma grande coleção de componentes que lidam com muitos tipos diferentes de funcionalidade: anúncios e análises, conteúdo dinâmico, layout, mídia, apresentação e social. A página [Referência de componentes de AMP]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}) contém uma lista de componentes AMP:

{{ image('/static/img/courses/beginner/image3.webp', 1024, 541, caption='A página de referência dos componentes AMP.') }}

Podemos ainda ter dúvidas sobre como o componente atuaria em nosso site, ou podemos não estar certos sobre como usar o componente de maneiras mais complexas. A sessão [AMP por exemplo]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}}) em amp.dev tem páginas que mostram muitos componentes AMP, mostrando uma variedade de maneiras de configurar esses componentes para atender a casos de uso comuns em sites modernos. Ele também possui playgrounds de codificação, onde você pode executar seus próprios experimentos.

{{ image('/static/img/courses/beginner/image7.webp', 1024, 699, caption='Página AMP por exemplo para o componente <amp‑carousel>.') }}

## Exercício 6: Adicionando Links de Compartilhamento Social

A biblioteca de componentes AMP inclui componentes para compartilhamento social. Vamos adicionar alguns deles ao nosso site agora!
Navegue e pesquise em [Referência de componentes de AMP]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}) para encontrar o componente AMP adequado e, em seguida, coloque-o sob o elemento `<amp-youtube>`. Use a documentação para adicionar componentes que dão ao usuário a opção de compartilhar sua página via e-mail, LinkedIn, Tumblr e Twitter.

Diretrizes de estilo recomendadas:

- Envolva os componentes AMP em um `div` com uma classe`social-bar`.

- Dê a cada componente AMP uma `width` e uma` height` de `44`.

Depois de concluir esta tarefa, sua página deve conter botões para o usuário compartilhar seu site:

{{ image('/static/img/courses/beginner/image19.png', 220, 392,  align='center third', caption='Botões de mídia social incorporados na página.') }}

### Solução

[sourcecode:html]
{% raw %}<div class="social-bar">
  <amp-social-share type="email" width="44" height="44"></amp-social-share>
  <amp-social-share type="linkedin" width="44" height="44"></amp-social-share>
  <amp-social-share type="tumblr" width="44" height="44"></amp-social-share>
  <amp-social-share type="twitter" width="44" height="44"></amp-social-share>
</div>
{% endraw %}[/sourcecode]

Lembre-se de incluir o script `<amp-social-share>` no `<head>`:

```
<script async custom-element="amp-social-share" src="https://ampjs.org/v0/amp-social-share-0.1.js"></script>
```
[/filter]

---
$title: Pensando em componentes
$order: 4
leveled: true
---

[filter level="beginner"]
## Adicionando recursos ao nosso site

Até agora, convertemos nosso site HTML básico em um site AMP básico. Há apenas um erro de validação restante em nosso site, e vamos corrigi-lo usando um componente `<amp-img>` em vez de uma tag `<img>`. Conforme corrigimos esse último erro de validação, aprenderemos o que são os componentes de AMP, por que algumas tags HTML foram substituídas ou não permitidas em AMP e como adicionar componentes ao nosso site.

Depois disso, é hora de adicionar funcionalidades adicionais ao nosso site. Para completar a versão inicial da página inicial da Chico’s Cheese Bike, vamos adicionar algum conteúdo de marketing adicional. A equipe decidiu adicionar um vídeo no YouTube sobre como fazer nossas bicicletas de queijo, um carrossel de imagens de nossos vários produtos de bicicletas de queijo e alguns links de mídia social que ajudarão os usuários a compartilhar nosso site com suas redes sociais favoritas.

Pode parecer assustador adicionar tantas peças ao nosso site tão rapidamente. Precisaríamos criar HTML, CSS e JavaScript para cumprir muitos dos requisitos para os recursos que queremos adicionar (como alterar o slide ativo do carrossel). Depois, teríamos que considerar como fazer todo o site ter um bom desempenho.

Mas essa é a beleza do AMP. Com AMP, não precisamos nos preocupar com todos esses detalhes! Os autores da biblioteca AMP nos forneceram blocos de construção que nos fornecem esses recursos e ajudam a cuidar de qualidades como desempenho, acessibilidade e segurança. Esses blocos são chamados de **componentes** e são a chave para criar sites de sucesso com AMP.

## O que são Web Components?

Os componentes são blocos de construção para a web. Eles representam a combinação de estrutura (HTML), estilo (CSS) e comportamento (JavaScript) com uma interface que facilita o uso em seu site e o compartilhamento com outras pessoas. Os componentes têm:

- Um nome (por exemplo, `<amp-img>`) usado como o nome da tag para identificar o componente.

- Atributos personalizados que alteram o comportamento, estilo ou conteúdo de um componente (como `width`,` height`, `src` e `attribution`).

- Eventos que podem capturar entradas do usuário para o componente (atributo `on`).

Opcionalmente, os componentes também têm "filhos". Aqui, "filhos" refere-se ao conteúdo (como texto, tags HTML ou outros componentes) que é colocado entre as tags de abertura e fechamento do componente. A maneira como esses filhos são exibidos na página é diferente para cada componente.

O sistema de componentes do AMP ajuda você a criar rapidamente recursos eficientes e responsivos em suas páginas com o mínimo de esforço. A biblioteca AMP fornece uma lista abrangente de componentes para você usar. Existem componentes para construir formulários e carrosséis, para integrar a análise de página, para fazer solicitações XHR para servidores e muito mais. As possibilidades são virtualmente infinitas. Você pode ver a lista completa de componentes disponíveis na referência de componentes de AMP [aqui]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}).

Por exemplo, aqui estão três componentes AMP que podemos usar em nosso site:

| componentes AMP                                                                            | Como ele é renderizado em nosso site                                        |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `<amp-img src="IMG-URL" layout="responsive" width="640" height="480"></amp-img>`             | {{ image('/static/img/courses/beginner/image14.png', 311, 550) }} |
| `<amp-twitter width="486" height="657" layout="responsive" data-tweetid="ID"></amp-twitter>` | {{ image('/static/img/courses/beginner/image19.png', 311, 550) }} |
| `<amp-youtube data-videoid="ID" layout="responsive" width="480" height="270"></amp-youtube>` | {{ image('/static/img/courses/beginner/image15.png', 311, 550) }} |

O objetivo ao criar seus sites AMP é usar componentes AMP sempre que possível. Os componentes maximizam os benefícios de desempenho da construção com AMP, porque você não precisa criar algo que já existe, aproveitando assim o trabalho dos autores da biblioteca AMP.

Quase todos os componentes AMP são executados por pelo menos algum JavaScript. Para alguns componentes AMP (como `<amp-img>`), o JavaScript é construído diretamente no script do runtime do AMP que você incluiu na parte superior da sua página no boilerplate. Para a maioria dos componentes AMP, você precisará incluir uma tag de script separada. E há um bom motivo para isso: você só inclui os scripts que realmente usa em seu site. Então, os usuários só precisam baixar o código necessário para navegar em sua página. Menos código para baixar significa que seu site carregará mais rápido!

## Exercício 3: Nosso primeiro componente - `<amp-img>`

A maioria das tags HTML pode ser usada diretamente em AMP, mas certas tags, como a tag `<img>`, devem ser substituídas por componentes AMP equivalentes. Esses componentes incorporam as melhores práticas integradas em acessibilidade, capacidade de resposta e desempenho.

Por exemplo, no caso de `<amp-img>`, AMP exige que especifiquemos as dimensões da imagem. O AMP precisa entender o layout da página antes do carregamento dos recursos (como imagens). Isso melhora a experiência do usuário quando sua página está carregando, mas antes que os ativos de imagem tenham sido baixados. Quando as imagens são baixadas, elas podem ser inseridas na página sem que nenhum conteúdo existente na página se mova. Isso dá ao runtime do AMP margem para decidir quando carregar ativos de imagem com base nos recursos do dispositivo do usuário e na conexão com a Internet.

[tip type="note"]
**Note**: Se você quiser saber mais sobre as otimizações automáticas de AMP, leia sobre o lazy-loading em AMP no [apêndice]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/appendix.md', locale=doc.locale).url.path}}).
[/tip]

Para usar o componente e resolver o erro de validação `<amp-img>` anterior, substitua a tag img existente em nossa página pelo equivalente de AMP. Dica: em vez de `<img…>`, escreva `<amp-img…>` e atribua dimensões fixas à imagem. Dê à imagem uma `largura` de` 640` e uma `altura` de` 480`.

Se necessário, consulte a documentação para `<amp-img>` [aqui]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}).

### Solução

A parte da página que contém a imagem deve ter a seguinte aparência:

[sourcecode:html]
{% raw %}<amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746" width=”640” height="480"></amp-img>
{% endraw %}[/sourcecode]

[tip type="note"]
**Nota**: Verifique a extensão do Validador de AMP. Se você concluiu este exercício com sucesso, o ícone da extensão deve estar verde. Se sim, parabéns! Sua página agora é AMP válida!
[/tip]

## Organização e dimensionamento de componentes

O próximo problema que precisamos solucionar tem a ver com a aparência de nossa página. Você não notará isso em um grande monitor de área de trabalho, mas é fácil ver o que está errado quando olhamos o site em um dispositivo móvel.

{{ image('/static/img/courses/beginner/image23.png', 311, 550,  align='center third', caption='A imagem da bicicleta sai da borda da tela') }}

A imagem que adicionamos à página não encolhe para caber em telas menores; apenas derrama para o lado. Se não especificarmos uma estratégia para dispor a imagem e redimensioná-la, o padrão será uma largura e altura fixas, conforme especificamos em nosso código. Felizmente, podemos corrigir esse problema usando o sistema de layout de AMP.

Vamos dar à nossa imagem um `layout` do tipo` responsive` para que ela seja dimensionada automaticamente conforme a janela é redimensionada. O layout responsivo faz com que a imagem assuma as dimensões do contêiner pai, ao mesmo tempo que respeita a proporção original. Se o contêiner pai tiver apenas 320 pixels de largura, a imagem manterá sua proporção e será redimensionada para 320 x 240 (em vez de 640 x 480).

Adicione o atributo `layout` à nossa imagem. Se feito corretamente, será semelhante a este:

[sourcecode:html]
{% raw %}<amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746" layout="responsive" width="640" height="480"></amp-img>
{% endraw %}[/sourcecode]

Depois de fazer a alteração, dê uma olhada em sua página. A imagem tem a proporção correta e preenche a largura da tela de maneira responsiva. Problema resolvido.

{{ image('/static/img/courses/beginner/image26.png', 311, 550,  align='center third', caption='Imagem de bicicleta com proporção correta') }}

Existem outros tipos de layout além do responsivo (pelo menos 8 no total, na verdade).
Por exemplo, o layout `fixed` indica que o componente nunca deve ser redimensionado da altura e largura atribuídas a ele. O layout `intrinsic` é semelhante ao layout `responsive`, exceto que tem o conceito de altura e largura intrínsecas que não podem ser excedidas pelo componente. Alguns layouts só podem ser aplicados a determinados componentes. A documentação de cada componente especificará quais layouts são válidos para aquele componente. Você pode ler sobre o resto dos tipos de layout [aqui]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html', locale=doc.locale).url.path}}).

Se você deseja se tornar um desenvolvedor de AMP de sucesso, aprender a usar o sistema de layout é fundamental. Todos os layouts fornecidos pelo AMP podem ser implementados usando CSS simples, mas geralmente podem ser complicados ou ter casos extremos complicados que exigem conhecimento profundo para serem solucionados. O AMP simplifica o processo e expõe muitas dessas opções de layout para serem usadas em qualquer elemento da página AMP. Confira o
[documentação oficial]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/index.md', locale=doc.locale).url.path}}) para obter mais informações sobre o sistema de layout.

[tip type="tip"]
**Dica**: Tente selecionar diferentes dispositivos móveis no menu suspenso (veja a captura de tela abaixo) para ver como a imagem se adapta a diferentes tamanhos de tela. É uma boa prática testar seu site em tamanhos de tela diferentes. Navegadores em dispositivos móveis reais podem se comportar de maneira diferente, então, quando possível, teste sua página da web em dispositivos reais também.

{{ image('/static/img/courses/beginner/image4.png', 297, 380,  align='center half', caption='Lista suspensa de dispositivos no Chrome') }}
[/tip]

## Exercício 4: Incorporação de Vídeo

A seguir, vamos incorporar um vídeo do YouTube em nosso documento. Nossa equipe de marketing da Chico’s Bikes lançou [este](https://www.youtube.com/watch?v=BlpMQ7fMCzA) vídeo de uma de nossas bicicletas queijos sendo construídas.

Use a documentação do [`<amp-youtube>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}) para incorporar este vídeo do YouTube no componente `<amp-img>` com as seguintes configurações:

- Defina o id do vídeo para `BlpMQ7fMCzA`.

- Faça o layout do vídeo `responsive`.

- **Nota**: Não se esqueça de adicionar o script ao `<head>`.

Diretrizes de estilo recomendadas:

- Defina o elemento `width` como` 480` e a `height` como` 270`.

[tip type="read-on"]
**Dica**: A documentação contém exemplos de como usar o componente `<amp-youtube>`. Para este exercício, é suficiente copiar um desses exemplos e adaptá-lo aos requisitos acima.[/tip]

Depois de fazer as alterações, olhe para sua página. Agora você deve ver o vídeo do YouTube:

{{ image('/static/img/courses/beginner/image18.png', 311, 550,  align='center third', caption='Imagem do vídeo do YouTube na página') }}

### Solução

[sourcecode:html]
{% raw %}<amp-youtube data-videoid="BlpMQ7fMCzA" layout="responsive" width="480" height="270"></amp-youtube>
{% endraw %}[/sourcecode]

Lembre-se de incluir o script `<amp-youtube>` no `<head>`:

```
<script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js"></script>
```

[tip type="note"]
**Nota**: AMP também inclui suporte para outros players de vídeo. Confira "[Integrando Vídeos em AMP e Visão Geral](https://ampbyexample.com/advanced/integrating_videos_in_amp_an_overview/)" em AMP por exemplos.[/tip]
[/filter]
[filter level="advanced"]
Há apenas um erro de validação restante em nosso site, e vamos corrigi-lo usando um **componente** `<amp-img>` em vez de uma tag `<img>`.

## O que são Web Components?

Os componentes são blocos de construção para a web. Eles combinam estrutura (HTML), estilo (CSS) e comportamento (JavaScript) com uma interface simples. Os componentes têm:

- Um nome (por exemplo, `<amp-img>`) usado como o nome da tag para identificar o componente.

- Atributos personalizados que alteram o comportamento, estilo ou conteúdo de um componente (como `width`,`height`, `src` e `attribution`).

- Eventos que podem capturar entradas do usuário para o componente (atributo `on`).

Os componentes podem ter filhos, assim como a maioria das outras tags HTML.

O sistema de componentes do AMP ajuda você a criar rapidamente recursos eficientes e responsivos em suas páginas com o mínimo de esforço. A biblioteca AMP fornece componentes para a construção de formulários e carrosséis, para integração de análise de página, para fazer solicitações XHR a servidores e muito mais. Você pode ver a lista completa de componentes disponíveis na referência de componentes de AMP [aqui]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}).

Por exemplo, aqui estão três componentes AMP que podemos usar em nosso site:

| Componente AMP                                                                                 | Como ele é renderizado em nosso site                                        |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `<amp-img src="IMG-URL" layout="responsive" width="640" height="480"></amp-img>`             | {{ image('/static/img/courses/beginner/image14.png', 311, 550) }} |
| `<amp-twitter width="486" height="657" layout="responsive" data-tweetid="ID"></amp-twitter>` | {{ image('/static/img/courses/beginner/image19.png', 311, 550) }} |
| `<amp-youtube data-videoid="ID" layout="responsive" width="480" height="270"></amp-youtube>` | {{ image('/static/img/courses/beginner/image15.png', 311, 550) }} |

O objetivo ao criar seus sites AMP é usar componentes AMP sempre que possível. Os componentes maximizam os benefícios de desempenho da construção com AMP, porque você não precisa criar algo que já existe, aproveitando assim o trabalho dos autores da biblioteca AMP.

Quase todos os componentes AMP são movidos por um pequeno código de JavaScript. Para alguns componentes AMP, como `<amp-img>`, isso está incluído no script do runtime do AMP. No entanto, a maioria dos componentes AMP precisa de uma tag de script separada incluída no cabeçalho da página. E há um bom motivo para isso: você só inclui os scripts que realmente usa em seu site. Então, os usuários só precisam baixar o código necessário para navegar em sua página.

## Exercício 3: Nosso primeiro componente - `<amp-img>`

A maioria das tags HTML pode ser usada diretamente em AMP, mas certas tags, como a tag `<img>`, devem ser substituídas por componentes AMP equivalentes. Esses componentes incorporam as melhores práticas integradas em acessibilidade, capacidade de resposta e desempenho.

Por exemplo, no caso de `<amp-img>`, o AMP exige que especifiquemos as dimensões da imagem e fechemos a tag com `</amp-img>`. O AMP precisa entender o layout da página antes do download dos recursos. Isso melhora a experiência do usuário quando sua página está carregando, mas antes que os ativos de imagem tenham sido baixados. Quando as imagens são baixadas, elas podem ser inseridas na página sem que nenhum conteúdo existente na página se mova. Isso dá ao AMP tempo de execução para decidir quando carregar ativos de imagem com base nos recursos do dispositivo do usuário e na conexão com a Internet.

[tip type="note"]
**Nota**: Se você quiser saber mais sobre as otimizações automáticas de AMP, leia sobre o lazy-loading em AMP no [apêndice]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/appendix.md', locale=doc.locale).url.path}}).
[/tip]

Para usar o componente e resolver o erro de validação `<amp-img>`, substitua a tag img existente em nossa página pelo equivalente de AMP.
Em vez de `<img…>`, escreva `<amp-img…>` e dê à sua imagem uma largura fixa de 640 e uma altura de 480.
Se necessário, consulte a documentação para `<amp-img>` [aqui]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}).

### Solução

A parte da página que contém a imagem deve ter a seguinte aparência:

[sourcecode:html]
{% raw %}<amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746" width=”640” height="480"></amp-img>
{% endraw %}[/sourcecode]

[tip type="note"]
**Nota**: Verifique a extensão do Validador de AMP. Se você concluiu este exercício com sucesso, o ícone da extensão deve estar verde. Se sim, parabéns! Sua página agora é AMP válida!
[/tip]

## Organização e dimensionamento de componentes

O próximo problema que precisamos solucionar tem a ver com a aparência de nossa página. Você não notará isso em um grande monitor de área de trabalho, mas é fácil ver o que está errado quando olhamos o site em um dispositivo móvel.

{{ image('/static/img/courses/beginner/image23.png', 311, 550,  align='center third', caption='A imagem da bicicleta sai da borda da tela') }}

A imagem que adicionamos à página não encolhe para caber em telas menores; apenas derrama para o lado. Se não especificarmos uma estratégia para definir o layout da imagem e redimensioná-la, o padrão será a largura e altura fixas que especificamos em nosso código. Felizmente, podemos corrigir esse problema usando o sistema de layout de AMP.

Vamos dar à nossa imagem um `layout` do tipo` responsive` para que ela seja dimensionada automaticamente conforme a janela é redimensionada. O layout responsivo faz com que a imagem assuma as dimensões do contêiner pai, ao mesmo tempo que respeita a proporção original. Se o contêiner pai tiver apenas 320 pixels de largura, a imagem manterá sua proporção e será redimensionada para 320 x 240 (em vez de 640 x 480).

Adicione o atributo `layout` à nossa imagem com o valor` responsive`:

[sourcecode:html]
{% raw %}<amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746" layout="responsive" width="640" height="480"></amp-img>
{% endraw %}[/sourcecode]

Depois de fazer a alteração, dê uma olhada em sua página. A imagem tem a proporção correta e preenche a largura da tela de maneira responsiva. Problema resolvido.

{{ image('/static/img/courses/beginner/image26.png', 311, 550,  align='center third', caption='Imagem de bicicleta com proporção correta') }}

Existem outros tipos de layout além do responsivo (pelo menos 8 no total).

Por exemplo, o layout `fixed` indica que o componente nunca deve ser redimensionado da altura e largura atribuídas a ele. O layout `intrinsic` é semelhante ao layout `responsive`, exceto que tem o conceito de altura e largura intrínsecas que não podem ser excedidas pelo componente. Alguns layouts só podem ser aplicados a determinados componentes. A documentação de cada componente especificará quais layouts são válidos para aquele componente. Você pode ler sobre o resto dos tipos de layout [aqui]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html', locale=doc.locale).url.path}}).

Todos os layouts fornecidos pelo AMP podem ser implementados usando CSS simples, mas geralmente podem ser complicados ou ter casos extremos complicados que exigem conhecimento profundo para serem solucionados. O AMP simplifica o processo e expõe muitas dessas opções de layout para serem usadas em qualquer elemento da página AMP. Confira a [documentação oficial]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout/index.md', locale=doc.locale).url.path}}) para obter mais informações sobre o sistema de layout.

[tip type="tip"]
**Dica**: Tente selecionar diferentes dispositivos móveis no menu suspenso (veja a captura de tela abaixo) para ver como a imagem se adapta a diferentes tamanhos de tela. É uma boa prática testar seu site em tamanhos de tela diferentes. Navegadores em dispositivos móveis reais podem se comportar de maneira diferente, então, quando possível, teste sua página da web em dispositivos reais também.

{{ image('/static/img/courses/beginner/image4.png', 297, 380,  align='center half', caption='Lista suspensa de dispositivos no Chrome') }}
[/tip]

## Exercício 4: Incorporação de Vídeo

A seguir, vamos incorporar um vídeo do YouTube em nosso documento. Nossa equipe de marketing da Chico’s Bikes lançou [este](https://www.youtube.com/watch?v=BlpMQ7fMCzA) vídeo de uma de nossas bicicletas queijos sendo construídas.

Use a documentação do [`<amp-youtube>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}) para incorporar este vídeo do YouTube no componente `<amp-img>` com as seguintes configurações: 

- Defina a id do vídeo para `BlpMQ7fMCzA`.

- Faça o layout do vídeo `responsive`.

- **Nota**: Não se esqueça de adicionar o script ao `<head>`.

Diretrizes de estilo recomendadas:

- Defina o elemento `width` como` 480` e a `height` como` 270`.

[tip type="read-on"]
**Dica**: A documentação contém exemplos de como usar o componente `<amp-youtube>`. Para este exercício, é suficiente copiar um desses exemplos e adaptá-lo aos requisitos acima.[/tip]

Depois de fazer as alterações, olhe para sua página. Agora você deve ver o vídeo do YouTube:

{{ image('/static/img/courses/beginner/image18.png', 311, 550,  align='center third', caption='Imagem do vídeo do YouTube na página') }}

### Solução

[sourcecode:html]
{% raw %}<amp-youtube data-videoid="BlpMQ7fMCzA" layout="responsive" width="480" height="270"></amp-youtube>
{% endraw %}[/sourcecode]

Lembre-se de incluir o script `<amp-youtube>` no `<head>`:

```
<script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js"></script>
```

[tip type="note"]
**Nota**: AMP também inclui suporte para outros players de vídeo. Confira "[Integrando Vídeos em AMP e Visão Geral](https://ampbyexample.com/advanced/integrating_videos_in_amp_an_overview/)" em AMP por exemplo.[/tip]
[/filter]

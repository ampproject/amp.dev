---
"$title": Crie seu primeiro E-mail AMP
"$order": '0'
description: Saiba o que torna os e-mails AMP diferentes criando seu primeiro e-mail.
tutorial: 'true'
formats:
- email
author: CrystalOnScript
---

O AMP para E-mail permite que remetentes de e-mail usem AMP em suas mensagens de e-mail para oferecer suporte a uma série de novos recursos. Os e-mails escritos com AMP podem conter elementos interativos, como carrosséis de imagens ou acordeões, têm conteúdo que permanece sempre atualizado na mensagem e permitem que os destinatários realizem ações como responder a um formulário, tudo sem sair da caixa de entrada.

O AMP para E-mail é compatível com e-mails existentes. A versão AMP da mensagem é incorporada ao e-mail como um novo componente MIME, além do HTML e do texto simples, garantindo a compatibilidade em todos os clientes de e-mail.

Dica: para uma lista de plataformas de e-mail (ESPs), clientes e provedores que oferecem suporte a AMP para E-mail, veja [Supported Email Platforms](../../../support/faq/email-support.md) no FAQ.

Siga este tutorial para criar e enviar seu primeiro e-mail dinâmico com tecnologia AMP. Você pode ver o código finalizado [aqui](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73).

# Comece com o boilerplate do E-mail AMP

O Playground AMP suporta o formato AMP para E-mail, permitindo que você desenvolva, teste e valide seus e-mails AMP. Abra o [Playground AMP](https://playground.amp.dev/?runtime=amp4email) e verifique se o formato está definido como `AMP for Email` no canto superior esquerdo. Você deve ver o seguinte código:

```html
<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <style amp-custom>
    h1 {
      margin: 1rem;
    }
  </style>
</head>
<body>
  <h1>Hello, I am an AMP EMAIL!</h1>
</body>
</html>
```

Ele contém toda a marcação necessária e o código mínimo para um e-mail AMP válido. Observe também os muitos outros exemplos de modelos de e-mail válidos na lista drop-down no menu drop-down superior direito.

Vamos dar uma olhada em algumas diferenças notáveis em relação a e-mails HTML clássicos:

- E-mails AMP devem se identificar como tal, incluindo `⚡4email`, ou `amp4email`, na tag html.
- A tag `<head>` também deve conter uma tag `<script>` que carrega o runtime AMP. `<script async src="https://cdn.ampproject.org/v0.js"></script>`
- Um boilerplate CSS para inicialmente ocultar o conteúdo até que o AMP seja carregado. ` <style amp4email-boilerplate>body{visibility:hidden}</style>`

Se você já trabalhou com e-mails antes, a ideia de colocar um script em um e-mail pode disparar vários sinais de alerta na sua cabeça! Fique tranquilo, os provedores de e-mail que oferecem suporte a e-mails AMP aplicam verificações de segurança rigorosas que só permitem a execução de scripts AMP controlados nos seus clientes. Isto permite que recursos dinâmicos e interativos sejam executados diretamente nas caixas de correio dos destinatários, sem vulnerabilidades de segurança! Leia mais sobre a marcação necessária para emails AMP aqui.

[tip type="important"] Apenas scripts AMP para [componentes suportados](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) podem ser incluídos em E-mails AMP. [/tip]

# Inclua uma imagem

A maioria das tags HTML usadas em e-mails pode ser usada em e-mails de AMP. No entanto, algumas tags, como a tag `<img>` são substituídas por uma equivalente AMP, [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

A tag `<amp-img>` requer que a largura e a altura de uma imagem sejam definidas e, diferentemente de `<img>`, `<amp-img>`, ela precisa ser explicitamente fechada usando `</amp-img>`.

```html
<amp-img src="https://link/to/img.jpg"
         alt="photo description"
         width="100"
         height="100">
</amp-img>
```

Além disso, os arquivos GIF são suportados através de [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md).

Como os e-mails não são hospedados em seu servidor, as URLs devem usar caminhos absolutos nos e-mails AMP e devem ser HTTPS.

[Placekitten](https://placekitten.com/) é um site que usa imagens de gatinhos como placeholders. Eles permitem que você escolha o tamanho de uma imagem diretamente na URL!

Podemos incluir uma imagem em nosso primeiro e-mail adicionando o código abaixo.

```html
<body>
  <amp-img src="https://placekitten.com/800/400"
           alt="Welcome"
           width="800"
           height="400">
  </amp-img>
</body>
```

## Deixe-o responsivo

E-mails são visualizados em uma variedade de dispositivos e tamanhos de tela, e o AMP vem com um sistema de layout integrado! Com o sistema [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) e media queries, implementar e-mails responsivos é fácil. Para dimensionar nossa imagem de gatinho colocada nas telas apropriadas, adicione o atributo <code>layout="responsive"</code> à sua tag <code><amp-image></code>.

[tip type="read-on"] [Leia mais sobre como o AMP funciona com layout e media queries](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Aumente e diminua a janela do navegador para ver a imagem mudar de tamanho! Veja a [lista de componentes específicos de layout suportados](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# Modifique a apresentação e o layout

Uma imagem é fácil, mas e se quisermos exibir mais imagens? O AMP para E-mail oferece suporte a elementos de layout, tais como acordeões e barras laterais.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

Para este tutorial, vamos usar [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) para exibir fotos de gatos para adoção.

Adicione o script `amp-carousel` no head do seu e-mail.

```html
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

Em seguida, envolva nossa primeira imagem dentro do elemento `<amp-carousel>`.

```html
<amp-carousel layout="responsive"
              width="800"
              height="400"
              type="slides">
        <amp-img layout="fill" src="https://placekitten.com/800/400"  alt="Welcome" height="400" width="800"></amp-img>
</amp-carousel>
```

Você talvez perceba que nada mudou, e isto é uma coisa boa! Nosso carrossel recebeu o atributo `type=slides`, o que significa que ele mostrará uma foto de cada vez. Como colocamos apenas uma foto dentro das tags, ele não mostra, ao usuário, as setas do slider.

Em seguida, substitua a imagem de gatinho placeholder por nossos gatos AMP para adoção em seu `<amp-carousel>`.

```html
<amp-carousel id="carousel-with-preview"
    width="800"
    height="400"
    layout="responsive"
    type="slides"
    on="slideChange:AMP.setState({currentCat: event.index})">
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"  alt="photo courtesy of Unsplash"></amp-img>
 </amp-carousel>
```

Agora você deve ser capaz de alterar as fotos clicando nas setas de navegação à esquerda ou à direita do carrossel!

## Envie com estilo

O AMP permite aplicar estilos no cabeçalho do documento dentro da tag `<style amp-custom>`. Além disso, classes e pseudo classes do CSS que eram antes proibidas agora já podem ser usadas. [Veja a lista completa aqui](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Vamos atualizar o `Hello, AMP4EMAIL world` com um título real.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

E depois adicione alguns estilos no head

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# Acrescente capacidades dinâmicas

Emails clássicos permitem apenas conteúdo estático. Através do AMP, os e-mails se abrem para um novo mundo de possibilidades! Usuários agora podem responder a [formulários](/content/amp-dev/documentation/components/reference/amp-form.md), obter [conteúdo atualizado dinamicamente](/content/amp-dev/documentation/components/reference/amp-list.md), e interagir com o conteúdo

Neste tutorial, usaremos [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) para exibir o nome de nosso gato adotável e uma descrição quando o usuário estiver no slide desse gato. Comece incluindo o script `amp-bind` no cabeçalho do seu e-mail.

```html
 <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

Em seguida, declararemos uma variável de mapeamento AMP "myState" como uma string JSON dentro de uma tag [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state). Como temos quatro fotos de gatos, incluiremos o estado de todas as quatro.

```html
<body>
<amp-state id="myState">
  <script type="application/json">
    {
      "cats": [
         {
          "name": "Aakash",
          "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
        },
        {
          "name": "Filip",
          "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
        },
        {
          "name": "Julian",
          "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
        },
        {
          "name": "John",
          "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
        }
      ]
    }
  </script>
</amp-state>
```

[Ações e eventos AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) disparam diferentes estados. Em nosso caso, queremos atualizar o estado quando o usuário clica nas setas de navegação do carrossel. O amp-carrossel dispara um evento [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides), sobre o qual atualizaremos a variável `currentCat` usando `AMP.setState`.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel width="800"
              height="400"
              layout="responsive"
              type="slides"
              on="slideChange:AMP.setState({ currentCat: event.index} )">
  ...
</amp-carousel>
```

Este código define o estado de `currentCat` para corresponder à foto do gato no índice do carrossel. Portanto, se estivermos no slide `event.index=2`, o estado será mapeado ao item no índice 2 do array.

A única coisa que resta é exibir o nome e as descrições do nosso gato. Adicione o seguinte código abaixo da tag de fechamento `amp-carousel`.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

A extensão `amp-bind` usa [expressões](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) and [mapeamentos](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) para alterar o conteúdo dinamicamente. O exemplo de código acima usa o mapeamento `[text]` para atualizar o texto dentro da tag `<span>` cada vez que o estado é alterado, avaliando a expressão `"myState.cats[currentCat].name"`.

[tip type="note"] Para o melhor desempenho e para evitar o risco de saltos inesperados de conteúdo, o amp-bind não avalia expressões durante o carregamento da página. Isto significa que os elementos visuais devem receber um estado default e não depender de amp-bind para sua renderização inicial. [/tip]

Não se esqueça de adicionar as descrições dos gatos depois da tag `</div>`!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Agora, quando você altera a foto do gato no carrossel, o nome e a descrição também serão atualizados!

# Envie seu e-mail AMP

Para saber como enviar seu e-mail para sua caixa de entrada, [leia mais sobre como testar e-mails AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Parabéns! Você enviou seu primeiro e-mail AMP!

Para os próximos passos, [leia mais sobre os fundamentos do AMP para E-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).

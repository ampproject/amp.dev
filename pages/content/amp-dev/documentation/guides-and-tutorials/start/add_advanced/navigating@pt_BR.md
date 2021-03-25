---
'$title': Navigating your site
$order: 5
description: A maioria dos sites para dispositivos móveis tem um menu de navegação. Esses menus podem ter várias formas. Neste tutorial, testaremos os seguintes exemplos de ...
---

A maioria dos sites para dispositivos móveis tem um menu de navegação. Esses menus podem ter várias formas. Neste tutorial, testaremos os seguintes exemplos de como apresentar a navegação nas páginas AMP:

- Incluir um link para sua página inicial: a opção mais simples.
- Adicionar uma barra de navegação lateral usando o componente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

## Link para a página inicial

A maneira mais simples de fazer com que os usuários acessem as opções de navegação normais do site é levá-los de volta à página inicial.

Experimente **substituir** sua tag `<header>` por esta versão com um link:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img
      class="home-button"
      src="icons/home.png"
      width="36"
      height="36"
    ></amp-img>
  </a>
  <div class="site-name">News Site</div>
</header>
```

Depois, **adicione** estas regras de estilo ao CSS inline:

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

Agora, **atualize** a página. Você verá um link para `homepage.html` no canto superior esquerdo da página. Se você clicar no ícone da página inicial, verá que ele não leva a lugar algum, porque o arquivo `homepage.html` não existe.

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Navegação com ícone da página inicial') }}

É possível substituir este link pela URL da página inicial do seu site para permitir que os usuários naveguem para outras seções por meio da navegação existente.

Essa é a forma mais fácil de aproveitar os elementos existentes de navegação do seu site. A seguir, veremos uma opção muito usada para a navegação em sites.

## Navegação com uma barra lateral

Uma técnica comum de navegação é adicionar um ícone de menu que, ao receber um clique, mostra vários links de navegação na lateral da página. Nas páginas AMP, é possível criar esse tipo de navegação com o componente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

Primeiro, é preciso **adicionar** o JavaScript do componente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) à tag `<head>`:

```html
<script
  async
  custom-element="amp-sidebar"
  src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
></script>
```

Em seguida, queremos exibir um ícone de menu. Quando tocado, ele abrirá a barra lateral. **Substitua** o `<header>` pelo seguinte código para exibir um ícone de ["hambúrguer"](https://en.wikipedia.org/wiki/Hamburger_button) em vez de um representando a página inicial:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">
    ☰
  </div>
  <div class="site-name">News Site</div>
</header>
```

No código acima, `alternamos` a barra lateral usando o atributo de ação [`on`](https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md) no elemento [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md), que é identificado pelo código `sidebar1`. Vamos adicionar a barra lateral.

**Adicione** o HTML a seguir logo após o `</header>`:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div
    role="button"
    aria-label="close sidebar"
    on="tap:sidebar1.toggle"
    tabindex="0"
    class="close-sidebar"
  >
    ✕
  </div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

A barra ficará oculta, mas quando o usuário tocar no ícone de hambúrguer, o menu será exibido no lado esquerdo da tela. Para fechar o menu, o usuário pode tocar no ícone X.

Por fim, **adicione** estas regras de estilo ao CSS inline:

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom: 10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Vejamos como ficou a barra lateral. **Atualize** e recarregue a página AMP. Você verá algo como:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Navegação com menu de barra lateral') }}

Nossa página está ótima! Vamos dar um toque final com uma fonte personalizada.

---
$title: Incluir iframes
---

Saiba como exibir conteúdo de mídia nas páginas e usar iframes para exibir conteúdo avançado e superar as limitações da AMP.

## Conceitos básicos

Exiba iframes na página usando o elemento [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}).

Nas AMP, os iframes são úteis principalmente para exibir conteúdos incompatíveis no contexto da página principal, como os que exigem JavaScript criado pelo usuário.

### Requisitos do elemento `amp-iframe`:

* Precisa estar a uma distância de pelo menos **600 px** ou **75%** da primeira janela de visualização em
relação à parte superior.
* Pode solicitar recursos somente através de HTTPS, e eles não podem estar na mesma origem do contêiner,
a menos que não especifiquem o valor allow-same-origin.

Leia mais: Saiba mais nas [especificações completas do `amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}).

### Incluir o script

Para incluir o [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) em sua página, inclua primeiro o script a seguir em `<head>`.
Ele carregará código adicional para o componente estendido:

[sourcecode:html]
<script async custom-element="amp-iframe"
    src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### Escrever a marcação

Um [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) exemplo:

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe">
</amp-iframe>
```

## Usar marcadores

É possível exibir um [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) na parte superior de um documento desde que o [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) inclua um elemento com o atributo `placeholder` (por exemplo, um elemento [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})) para ser renderizado como marcador até que o iframe esteja pronto para exibição.

Leia mais: Saiba mais sobre marcadores no artigo sobre [iframes com marcadores]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}#iframe-with-placeholder).

Exemplo com marcador:

```html
<amp-iframe width="400" height="225"
sandbox="allow-scripts allow-same-origin"
layout="responsive"
src="https://giphy.com/embed/OWabwoEn7ezug">
<amp-img placeholder layout="fill"
src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>
```
Renderização do exemplo:

<amp-iframe width="400" height="225"
sandbox="allow-scripts allow-same-origin"
layout="responsive"
src="https://giphy.com/embed/OWabwoEn7ezug">
<amp-img placeholder layout="fill"
src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>

## Exemplos

Veja mais exemplos avançados em nossa [página de demonstração avançada]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-iframe.html', locale=doc.locale).url.path}}).

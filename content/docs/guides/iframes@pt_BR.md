---
$title: Incluir iframes
$order: 2
$category: Develop 
components:
- iframe
toc: true
---
[TOC]

Saiba como exibir conteúdo de mídia nas páginas e usar iframes para exibir conteúdo avançado e superar as limitações da AMP.

## Conceitos básicos

Exiba iframes na página usando o elemento [`amp-iframe`](/pt_br/docs/reference/components/amp-iframe.html).

Nas AMP, os iframes são úteis principalmente para exibir conteúdos incompatíveis no contexto da página principal, como os que exigem JavaScript criado pelo usuário.

### Requisitos do elemento `amp-iframe`:

* Precisa estar a uma distância de pelo menos **600 px** ou **75%** da primeira janela de visualização em 
relação à parte superior.
* Pode solicitar recursos somente através de HTTPS, e eles não podem estar na mesma origem do contêiner, 
a menos que não especifiquem o valor allow-same-origin.

{% call callout('Dica', type='read') %}
Saiba mais nas [especificações completas do <code>amp-iframe</code>](/pt_br/docs/reference/components/amp-iframe.html).
{% endcall %}

### Incluir o script

Para incluir o `amp-iframe` em sua página, inclua primeiro o script a seguir em `<head>`. 
Ele carregará código adicional para o componente estendido:

[sourcecode:html]
<script async custom-element="amp-iframe"
    src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### Escrever a marcação

Um `amp-iframe` exemplo:

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=europe">
</amp-iframe>
```
Preview: 

<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=europe">
</amp-iframe>

## Exemplos

Veja mais exemplos avançados em nossa [página de demonstração avançada](https://ampbyexample.com/components/amp-iframe/).

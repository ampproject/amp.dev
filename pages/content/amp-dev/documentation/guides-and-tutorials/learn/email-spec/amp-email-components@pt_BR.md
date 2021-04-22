---
'$title': 'AMP para Email: Componentes Suportados'
$order: 3
formats:
  - email
teaser:
  text: 'A seguir está a lista de '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-components.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

A seguir está a lista de [componentes AMP](https://amp.dev/documentation/components/?format=email) que atualmente suportados em mensagens de e-mail AMP. Os componentes são agrupados nas seguintes categorias:

- [Conteúdo dinâmico](#dynamic-content)
- [Layout](#layout)
- [Mídia](#media)

## Conteúdo dinâmico <a name="dynamic-content"></a>

| Elemento                                                                                                                                                                      | Descrição                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                             | Elemento do formulário. O atributo action-xhr deve ser usado no lugar do atributo action. Pode ser usado em conjunto com `<template type="amp-mustache">` para gerar uma resposta. <br><br>**Observação:** [O redirecionamento após o envio](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission) não é permitido.           |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                     | Um widget de seleção múltipla para uso em um formulário.                                                                                                                                                                                                                                                                                                   |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) e [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Linguagem de script simples em AMP que permite a manipulação de uma máquina de estado para interações entre elementos. Também pode ser usado para adicionar comportamento em determinados eventos.<br><br>**Observação:** Não é permitido mapear a `[href]` ou `[src]`. Também não é permitido usar as ações `AMP.print`, `AMP.navigateTo` e `AMP.goBack`. |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                              | `<amp-state>` é usado para definir o estado inicial usado por `amp-bind`.<br><br>**Observação:** O atributo `src` não é suportado no momento.                                                                                                                                                                                                              |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                             | Busca remotamente dados JSON que serão renderizados por um [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache).<br><br>**Observação:** Mapeamento ao atributo `[src]` não é permitido. A inclusão de credenciais do usuário com `credentials="include"` também não é permitida.                                                      |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                     | Uma marcação de modelo Mustache para renderizar os resultados de uma chamada `amp-list`.                                                                                                                                                                                                                                                                   |

## Layout <a name="layout"></a>

| Elemento                                                                                                           | Descrição                                                                                   |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| [Atributos de layout](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | O comportamento do layout é determinado pelo atributo layout.                               |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                        | Um elemento da interface do usuário que facilita a exibição/ocultação de diferentes seções. |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                          | Um componente UI de carrossel.                                                              |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                          | Um componente auxiliar para ajustar o texto em determinada área.                            |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                              | Um container que pode ter layouts responsivos baseados na sua proporção.                    |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                            | Uma barra lateral para navegação.                                                           |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                            | Fornece uma maneira conveniente de renderizar timestamps.                                   |

## Mídia <a name="media"></a>

| Elemento                                                          | Descrição                                                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | Um componente AMP que substitui `<img>`.<br><br>**Note:** Mapeamento a `[src]` não é permitido. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | Incorpora arquivos GIF.<br><br>**Note:** Mapeamento a `[src]` não é permitido.                  |

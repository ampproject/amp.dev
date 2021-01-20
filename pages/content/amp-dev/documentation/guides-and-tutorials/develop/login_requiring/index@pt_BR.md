---
"$title": Create a login-requiring AMP page
"$order": '0'
description: Algumas interações do usuário com a página, como a postagem de um comentário, podem ser condicionadas por um fluxo de login. Você pode implementar um fluxo de login ...
numbered: '1'
"$hidden": 'true'
formats:
- websites
---

Algumas interações do usuário com a página, como a postagem de um comentário, podem ser condicionadas por um fluxo de login. Você pode implementar um fluxo de login com AMP usando o componente [`amp-access`](../../../../documentation/components/reference/amp-access.md).

[tip type="tip"] <strong>DICA - </strong>Para um exemplo de implementação, acesse o [exemplo de uma seção de comentários](../../../../documentation/examples/documentation/Comment_Section.html) no site [ampbyexample.com](../../../../documentation/examples/index.html).[/tip]

O [exemplo de uma seção de comentários](../../../../documentation/examples/documentation/Comment_Section.html) combina [`amp-access`](../../../../documentation/components/reference/amp-access.md) com [`amp-form`](../../../../documentation/components/reference/amp-form.md) para criar uma seção de comentários que só será ativada quando o usuário tiver feito login. Para explicar melhor como esse exemplo de código funciona, vamos acompanhar o conjunto de ações que serão realizadas assim que você acessar a página.

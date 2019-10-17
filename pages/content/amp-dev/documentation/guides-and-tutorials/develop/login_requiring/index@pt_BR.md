---
$title: Criar uma página AMP que requer login
---
Algumas interações do usuário com a página, como a postagem de um comentário, podem ser condicionadas por um fluxo de login. Você pode implementar um fluxo de login com AMP usando o componente [`amp-access`](../../../../documentation/components/reference/amp-access.md).

Dica: Para uma amostra de implementação, acesse o [exemplo de uma seção de comentários](../../../../documentation/examples/documentation/Comment_Section.html) no site [ampbyexample.com](../../../../documentation/examples/index.html).

O [exemplo de uma seção de comentários](../../../../documentation/examples/documentation/Comment_Section.html) combina [`amp-access`](../../../../documentation/components/reference/amp-access.md) com [`amp-form`](../../../../documentation/components/reference/amp-form.md) para criar uma seção de comentários que só será ativada quando o usuário tiver feito login. Para explicar melhor como essa amostra funciona, veremos o conjunto de ações que serão realizadas quando você acessar a página.

---
$title: Criar uma página AMP que requer login
---
Algumas interações do usuário com a página, como a postagem de um comentário, podem ser condicionadas por um fluxo de login. Você pode implementar um fluxo de login com AMP usando o componente [`amp-access`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}}).

Dica: Para uma amostra de implementação, acesse o [exemplo de uma seção de comentários]({{g.doc('/content/amp-dev/documentation/examples/documentation/Comment_Section.html', locale=doc.locale).url.path}}) no site [ampbyexample.com]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}}).

O [exemplo de uma seção de comentários]({{g.doc('/content/amp-dev/documentation/examples/documentation/Comment_Section.html', locale=doc.locale).url.path}}) combina [`amp-access`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}}) com [`amp-form`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}) para criar uma seção de comentários que só será ativada quando o usuário tiver feito login. Para explicar melhor como essa amostra funciona, veremos o conjunto de ações que serão realizadas quando você acessar a página.

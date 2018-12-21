---
$title: Criar uma página AMP que requer login
---
Algumas interações do usuário com a página, como a postagem de um comentário, podem ser condicionadas por um fluxo de login. Você pode implementar um fluxo de login com AMP usando o componente [amp-access](/pt_br/docs/reference/components/amp-access.html) junto com o [amp-form](/pt_br/docs/reference/components/amp-form.html).

Dica: Para uma amostra de implementação, acesse o [exemplo de uma seção de comentários](https://ampbyexample.com/samples_templates/comment_section/) no site [ampbyexample.com](https://ampbyexample.com).

O [exemplo de uma seção de comentários](https://ampbyexample.com/samples_templates/comment_section/) combina `amp-access` com `amp-form` para criar uma seção de comentários que só será ativada quando o usuário tiver feito login. Para explicar melhor como essa amostra funciona, veremos o conjunto de ações que serão realizadas quando você acessar a página.



<div class="prev-next-buttons">
<a class="button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/login.md', locale=doc.locale).url.path}}"><span class="arrow-next">Primeiros passos</span></a>
</div>

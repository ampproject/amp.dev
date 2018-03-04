---
$title: Criar uma página AMP que requer login
$order: 4
numbered: 1
---
Algumas interações do usuário com a página, como a postagem de um comentário, podem ser condicionadas por um fluxo de login. Você pode implementar um fluxo de login com AMP usando o componente [amp-access](https://www.ampproject.org/pt_br/docs/reference/components/amp-access) junto com o [amp-form](https://www.ampproject.org/pt_br/docs/reference/components/amp-form).
{% call callout('Dica', type='success') %}
Para uma amostra de implementação, acesse o [exemplo de uma seção de comentários](https://ampbyexample.com/samples_templates/comment_section/) no site [ampbyexample.com](https://ampbyexample.com).
{% endcall %}

O [exemplo de uma seção de comentários](https://ampbyexample.com/samples_templates/comment_section/) combina `amp-access` com `amp-form` para criar uma seção de comentários que só será ativada quando o usuário tiver feito login. Para explicar melhor como essa amostra funciona, veremos o conjunto de ações que serão realizadas quando você acessar a página.

{% include "/views/partials/sub_nav.html" %}

<div class="prev-next-buttons">
<a class="button" href="/pt_br/docs/tutorials/login_requiring/login.html"><span class="arrow-next">Primeiros passos</span></a>
</div>

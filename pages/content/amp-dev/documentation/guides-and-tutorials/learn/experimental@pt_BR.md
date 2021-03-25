---
$title: Recursos experimentais
---

Os [componentes experimentais de AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments)
são recursos lançados que ainda não estão prontos para uso geral. Por isso, esses componentes são protegidos por um status **experimental**.

Os desenvolvedores e os usuários podem optar por usar esses recursos antes que eles estejam totalmente disponíveis para o público.
No entanto, eles precisam ser usados com cautela, porque podem apresentar bugs ou causar efeitos inesperados.

## Ativar o Canal Dev AMP

O Canal Dev AMP é uma forma de fazer com que o navegador use uma versão mais recente das bibliotecas de JavaScript para AMP.

Talvez a versão do Canal Dev AMP seja **mais instável** e tenha recursos indisponíveis para alguns usuários. Ative essa opção se quiser testar as novas versões AMP, informar bugs ou criar documentos usando recursos novos que ainda não estão disponíveis para todos.

Ativar o Canal Dev é ideal para:

- testar e analisar recursos novos que ainda não estão disponíveis para todos os usuários;
- fazer o controle de qualidade para verificar se o site está compatível com a próxima versão AMP.

Se você encontrar um problema que pareça ocorrer somente na versão do Canal Dev AMP, [envie um relatório do problema](https://github.com/ampproject/amphtml/issues/new) com uma descrição. Sempre inclua o URL de uma página que mostre esse problema.

Para ativar o Canal Dev AMP no navegador, acesse [a página de experimentos de AMP](https://cdn.ampproject.org/experiments.html) e ative o experimento "AMP Beta Channel" (Canal Dev AMP, em inglês). Para receber notificações sobre alterações/novidades importantes das AMP, inscreva-se na lista de e-mails [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce).

## Ativar um componente experimental

#### Disponibilizado por cdn.ampproject.org

Para conteúdo disponibilizado por [https://cdn.ampproject.org](https://cdn.ampproject.org), 
acesse a [página de experimentos de AMP](https://cdn.ampproject.org/experiments.html)
e ative (ou desative) qualquer componente experimental clicando nos controles correspondentes. A ativação de um experimento definirá um cookie no seu navegador para ativar o experimento em todas as páginas AMP disponibilizadas por meio do cache de AMP do Google.

#### Disponibilizado por outros domínios

Para conteúdo disponibilizado por qualquer outro domínio, é possível ativar ou desativar os experimentos no console de ferramentas do desenvolvedor quando o modo de desenvolvimento estiver ativado. Para isso, use:

```js
AMP.toggleExperiment('experiment')
```

Se o arquivo AMP incluir recursos experimentais, será reprovado na
[validação de AMP](validation-workflow/validate_amp.md).
Remova os componentes experimentais de documentos AMP prontos para produção.

## Ativar um experimento para um documento específico

O documento pode ativar alguns experimentos. Para fazer isso, basta colocar uma metatag do nome `amp-experiments-opt-in` no cabeçalho do documento HTML antes do script AMP (`https://cdn.ampproject.org/v0.js`). O valor do conteúdo é uma string com os códigos dos experimentos que serão ativados, separados por vírgula.

```html
<head>
  …
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b">
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  …
</head>
```

Ao fazer isso, os experimentos especificados serão ativados para todos os visitantes do documento. No entanto, nem todos os experimentos podem ser ativados no nível do documento. Para ver todos os experimentos na lista de permissões, verifique o atributo `allow-doc-opt-in` no arquivo` prod-config.json` do projeto. O recurso ativado no documento pode ser desativado pelo usuário.
 

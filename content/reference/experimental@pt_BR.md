---
$title: Recursos experimentais
$order: 5
---

[Os componentes experimentais de AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments) 
são recursos lançados que não estão prontos para uso geral. Por isso, eles são protegidos por um status 
experimental.

Os desenvolvedores e usuários podem ativar esses recursos antes do lançamento completo. No entanto, esses 
recursos devem ser usados ​​com cautela, pois podem ter bugs ou efeitos colaterais inesperados.

## Ativar o Canal Dev das AMP

O Canal Dev das AMP é uma forma de fazer com que o navegador use uma versão mais recente das bibliotecas de 
JavaScript AMP.

Talvez a versão do Canal Dev das AMP **seja mais instável** e tenha recursos indisponíveis para alguns 
usuários. Ative essa opção se quiser testar as novas versões da AMP, informar bugs ou criar documentos 
vinculados a recursos novos que ainda não estejam disponíveis para todos.

Ativar o Canal Dev é ideal para:

- testar e analisar recursos novos que ainda não estão disponíveis para todos os usuários;
- usar garantia da qualidade para garantir que seu site seja compatível com a próxima versão das AMP.

Se você encontrar um problema que pareça ocorrer somente na versão do Canal Dev das AMP, [comunique esse problema](https://github.com/ampproject/amphtml/issues/new) com uma descrição. Sempre inclua o URL de uma página que reproduza o problema.

Para ativar o Canal Dev das AMP no navegador, acesse [a página de experimentos de AMP](https://cdn.ampproject.org/experiments.html) e ative o experimento "Canal Dev das AMP". Para receber notificações sobre alterações importantes/novidades das AMP, inscreva-se na lista de e-mails [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce).

## Ativar um componente experimental

Para o conteúdo veiculado a partir de [https://cdn.ampproject.org](https://cdn.ampproject.org), acesse a [página de experimentos de AMP](https://cdn.ampproject.org/experiments.html) e ative (ou desative) qualquer componente experimental clicando nos controles correspondentes. A ativação definirá um cookie no navegador que ativará o experimento em todas as páginas AMP veiculadas pelo cache de AMP do Google.

Para o conteúdo veiculado a partir de outros domínios, use o modo desenvolvedor e ative os experimentos nos controles do console de ferramentas do desenvolvedor com isto:

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

Nenhum arquivo AMP que inclua recursos experimentais passará na 
[validação de AMP](/pt_br/docs/guides/validate.html). 
Remova os componentes experimentais de documentos AMP prontos para produção.


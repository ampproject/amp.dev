---
$title: Componentes experimentais
---

Os [Componentes experimentais das AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments) são elementos lançados que ainda não estão prontos para uso amplo. Por essa razão, esses componentes são protegidos por um status experimental.

Os desenvolvedores e os usuários podem optar por usar esses recursos antes que eles sejam completamente liberados.
No entanto, eles devem ser usados com cautela, pois podem conter bugs ou produzir efeitos colaterais inesperados.

## Optar pelo Canal Dev AMP

O AMP Dev Console Channel é uma maneira de fazer com que o navegador use uma versão mais recente das bibliotecas de JS AMP.

Para fazer com que seu navegador opte pelo AMP Dev Console Channel, acesse a [página de experimentos de AMP](https://cdn.ampproject.org/experiments.html) e ative o experimento "AMP Dev Console Channel".

## Ativar um componente experimental

Para conteúdo veiculado por [https://cdn.ampproject.org](https://cdn.ampproject.org), acesse a [página de experimentos de AMP](https://cdn.ampproject.org/experiments.html) e ative (ou desative) qualquer componente experimental clicando em "On" (ou "Off"). A ativação de um experimento definirá um cookie no seu navegador que ativará o experimento em todas as páginas AMP veiculadas por meio do cache de AMP do Google.

Para conteúdo veiculado por qualquer outro domínio, os experimentos poderão ser ativados ou desativados no console de ferramentas do desenvolvedor quando o modo de desenvolvimento estiver ativado usando:

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

Nenhum arquivo das AMP que inclua recursos experimentais passará na [validação de AMP](/pt_br/docs/guides/debug/validate.html).
Remova os componentes experimentais de documentos de AMP prontos para produção.

---
"$title": Cronograma de lançamento do AMP
order: '10'
formats:
- websites
- email
- stories
- ads
teaser:
  text: "- Canais de lançamento"
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/contributing/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Release Channels](#release-channels)
    - [Nightly](#nightly)
    - [Weekly](#weekly)
        - [Experimental and Beta channels](#experimental-and-beta-channels)
    - [Long-Term Stable (lts)](#long-term-stable-lts)
- [Determining if your change is in a release](#determining-if-your-change-is-in-a-release)
- [Release Cadence](#release-cadence)
    - [Detailed schedule](#detailed-schedule)
    - [Release Freezes](#release-freezes)

A new release of AMP is pushed to all AMP pages every week on Tuesday. **Once a change in AMP is merged into the master branch of the amphtml repository, it will typically take 1-2 weeks for the change to be live for all users.**

## Canais de lançamento <a name="release-channels"></a>

O runtime AMP e as extensões são fornecidos através de uma variedade de *canais de lançamento*. Cada canal serve a um propósito específico para desenvolvedores e para o próprio projeto AMP HTML. Veja a [seção cadência de lançamentos](#release-cadence) para uma descrição mais detalhada de como e quando o código do repositório [`ampproject/amphtml`](https://github.com/ampproject/amphtml) torna-se parte dos builds de lançamento.

Para determinar se um PR (pull request) foi incluído em algum dos seguintes canais de lançamento, procure pelos rótulos do GitHub *PR Use: In Canary*, *PR Use: In Production* ou *PR Use: In LTS* (veja a seção [determinando se sua alteração está em um lançamento](#Determining-if-your-change-is-in-a-release) para mais detalhes).

### Noturno (nightly) <a name="nightly"></a>

O canal de lançamentos **nightly** é atualizado (como sugere seu nome) todas as noites de dias úteis. Este processo é automatizado e não há garantia de que qualquer lançamento noturno esteja livre de bugs ou outros problemas. Cada noite, depois da meia-noite (horário do Pacífico), o último commit "verde" do dia é selecionado para ser o ponto de corte do lançamento. Um build verde indica que todos os testes automatizados foram aprovados nesse build.

O lançamento noturno fornece um mecanismo para detectar e resolver problemas rapidamente e antes que eles alcancem os canais de lançamento *weekly* (semanal), que têm mais tráfego. Também serve para reduzir o número de usuários afetados por problemas recém-introduzidos.

É possível participar do canal **nightly**, para testar pull requests que foram alvo de merges nos últimos dias. Veja detalhes na seção [opt-in section](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) em [DEVELOPING.md] .

### Semanal (weekly) <a name="weekly"></a>

Os canais de lançamento *weekly* (semanal) são considerados os principais canais de lançamento "sempre verdes". Cada semana o lançamento **beta** da semana anterior é promovido ao canal de lançamento **stable** (estável) e o último lançamento **nightly** da semana anterior é promovido aos canais **experimental** e **beta** (veja o [cronograma detalhado](#detailed-schedule)).

Há dois grupos de configurações de build usados na criação de compilações de lançamento: a configuração *canary* e a configuração *production*. Os canais de lançamento **experimental** e **beta** são construídos a partir do mesmo commit. No entanto, o canal **experimental** usa a configuração *canary*, enquanto que o canal **beta** usa a configuração *production*. A configuração *canary* ativa componentes experimentais e recursos que podem ser desativados em *production*. É possível optar pelos canais **experimental** ou **beta** por meio da [página de experimentos](https://cdn.ampproject.org/experiments.html).

O canal de lançamento **stable** é construído com a configuração de *production* e servido para a maioria do tráfego AMP. Como o canal de lançamento **beta** também é criado a partir da configuração *production*, ele representa o build exato que se tornará **stable** na semana seguinte (com a possibilidade de algumas escolhas para corrigir problemas de última hora; veja [Contribuição de código](https://github.com/ampproject/amphtml/blob/master/contributing/contributing-code.md#Cherry-picks)).

#### Canais Beta e Experimental <a name="beta-and-experimental-channels"></a>

Os Canais *Beta* e *Experimental* são candidatos de pré-lançamento para o próximo lançamento Stable do AMP. Todas as terças-feiras (exceto nas semanas em que há um [release freeze](#release-freezes)), o **nightly** da semana anterior é promovido aos canais de desenvolvimento escolhidos para **beta** e **experimental**. Após um período de um dia onde verificamos que nenhum recurso ou regressão de desempenho tenha sido introduzido nesses canais, promovemos este lançamento na quarta-feira para uma pequena parte do tráfego. Essa mesma versão será então promovida ao canal **stable** na terça-feira da semana seguinte.

É possível participar desses canais. Veja mais detalhes na [seção de participação](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) em [DEVELOPING.md].

A escolha do *Beta Channel* é ideal para:

- testar e brincar com a versão do runtime AMP que será lançado em breve
- usar em controle de qualidade (QA) para garantir que seu site seja compatível com a próxima versão do AMP.

A intenção do *Experimental Channel* é:

- testar e brincar com novos recursos ainda não disponíveis para todos os usuários
- uso no controle de qualidade (QA) para garantir que seu site seja compatível com os próximos recursos do AMP que ainda estão em desenvolvimento

O *Experimental Channel* **&nbsp;pode ser menos estável** e pode conter recursos que ainda não estão disponíveis a todos os usuários.

### Long-Term Stable (lts) <a name="long-term-stable-lts"></a>

O canal de lançamento **lts** fornece uma versão **stable** anterior para intervalos de um mês. Na segunda segunda-feira de cada mês, a versão atual **stable** é promovida para **lts**. Este canal não é recomendado para todos os editores de AMP. É fornecido para que editores que queiram realizar um ciclo de controle de qualidade em seus sites com menos frequência possam fazê-lo através da opção por páginas da web específicas no canal **lts** (consulte o <a href="https://github.com/ampproject/amphtml/blob/master/contributing/lts-release.md" data-md-type="link">readme do **lts**</a>).

If the second Monday of the month falls on a holiday, the promotion will be performed after the end of the [release freeze](#release-freezes).

Importante: editores que usam o canal de lançamento **lts** não devem usar os recursos recém-introduzidos. Por causa do ciclo mais longo, o lançamento de **lts** poderá estar até sete semanas atrás do `HEAD` de [`ampproject/amphtml`](https://github.com/ampproject/amphtml). Consulte a seção [determinando se sua alteração está num lançamento](#determining-if-your-change-is-in-a-release) para validar se uma alteração estará pronta no ciclo de lançamento escolhido por você.

## Determinando se sua mudança está num lançamento <a name="determining-if-your-change-is-in-a-release"></a>

[*Type: Release* GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) are used to track the status of current and past releases; from the initial cut, to testing via **experimental**/**beta** channels, to eventual release via the **stable** and **lts** channels. Announcements about releases are made on the [AMP Slack #release channel](https://amphtml.slack.com/messages/C4NVAR0H3/) ([sign up for Slack](https://bit.ly/amp-slack-signup)).

Você pode determinar quais alterações estão em uma determinada versão usando uma das alternativas a seguir:

- Os [issues de GitHub *Type: Release*](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) para cada versão de lançamento incluirá um link para a [página de lançamento](https://github.com/ampproject/amphtml/releases) específica, listando as mudanças contidas nesse lançamento.
- Os rótulos [*PR Use: In Beta / Experimental*](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22), [*PR Use: In Stable*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22) e [*PR Use: In LTS*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) são adicionados aos PRs quando eles são promovidos a builds *weekly* ou **lts**. Pode haver um atraso entre o momento em que o build é criado e o momento em que o rótulo é adicionado.

## Cadência de lançamentos <a name="release-cadence"></a>

Somos intencionalmente cautelosos com nossa cadência de lançamentos.

Ao determinar a frequência com que devemos enviar novas versões de AMP para todos, temos que pesar diversos fatores, incluindo:

- estabilidade para os milhões de sites/bilhões de páginas construídas com AMP
- cache-busting that might happen when we push a new version
- o desejo de disponibilizar novos recursos rapidamente

Depois de considerar todos esses fatores, chegamos ao ciclo push de 1-2 semanas. Até agora, temos considerado que este é um meio-termo razoável, mas continuaremos avaliando todos esses fatores e podemos fazer alterações no futuro.

### Cronograma detalhado <a name="detailed-schedule"></a>

Tentamos seguir esse cronograma o máximo possível, embora complicações possam causar atrasos. Você pode acompanhar o status mais recente sobre qualquer lançamento em [Issues de GitHub *Type: Release* e ](https://github.com/ampproject/amphtml/labels/Type%3A%20Release)[Canal AMP no Slack #release](https://amphtml.slack.com/messages/C4NVAR0H3/) ([inscreva-se no Slack](https://bit.ly/amp-slack-signup)).

- Tuesday @ [11am Pacific](https://www.google.com/search?q=11am+pacific+in+current+time+zone): new **experimental** and **beta** release builds are created from the [latest master build that passes all of our tests](https://travis-ci.com/ampproject/amphtml/branches) and are pushed to users who opted into the [AMP Experimental Channel](#amp-experimental-and-beta-channels) or [AMP Beta Channel](#amp-experimental-and-beta-channels), respectively.
- Quarta-feira: nós verificamos relatórios de bugs para usuários do *Experimental Channel* e *Beta Channel* e se tudo parecer OK, enviamos o **beta** a 1% das páginas AMP
- Quinta-feira a segunda-feira: continuamos a monitorar as taxas de erro e relatórios de bugs para os usuários dos *Experimental Channel* e *Beta Channel* e 1% das páginas com builds **experimental**/**beta**
- Terça-feira da semana seguinte: o build **beta** é promovido a **stable** (ou seja, todas as páginas AMP agora vão usar esse build)

### Congelamento de lançamentos (Release Freezes) <a name="release-freezes"></a>

Há ocasiões em que pularemos um lançamento de AMP para produção, o que é conhecido como release freeze (congelamento de lançamento).

Se um release freeze de uma semana for anunciado para a Semana N:

- O build de lançamento da semana anterior permanece em **experimental**/**beta** por uma semana a mais, ou seja, o corte de lançamento na Semana N-1 não é promovido para **stable** na Semana N, como normalmente seria o caso. Em vez disso, ele será promovido para **stable** na Semana N+1.
- Um novo build de lançamento *não* é realizado na semana do release freeze (Semana N).
- A programação normal será retomada na Semana N+1, ou seja,**experimental**/**beta** são cortados na Semana N+1 e promovidos para **stable** na Semana N+2.
- Se o lançamento **stable** promovido durante a Semana N-1 foi originalmente programado para ser promovido para **lts** durante a Semana N, agora será promovido para **lts** na segunda-feira da Semana N+1.
- Lançamentos **nightly** ainda são gerados e promovidos, já que são totalmente automatizados.

Um release freeze pode acontecer devido a:

- Times when there are not enough people available to push the AMP release to **stable** and monitor it. Currently, most of the people performing AMP releases are based in the United States, so this will usually be the weeks of the major US holidays of Independence Day (July 4), Thanksgiving (fourth Thursday in November), Christmas (25 December), and New Year's Eve/Day (December 31/January 1).
- Uma situação de emergência, como um problema de segurança ou privacidade, conforme determinado pelo [Technical Steering Committee (TSC)](https://github.com/ampproject/meta-tsc) ou pelas pessoas que executam a liberação.
- Other situations when the stability of the codebase is deemed to be particularly important as determined by the TSC.

In all cases, except emergencies, the release freezes will be announced at least one month in advance.

Observe que, a menos que seja anunciado de outra forma, um release freeze não implica em um code freeze (congelamento de código). O código ainda pode ser escrito, revisado e passar por merges durante um release freeze.

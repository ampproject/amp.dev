---
$title: Validar páginas AMP
---

A principal vantagem da AMP não é apenas tornar as páginas mais rápidas, mas também acelerá-las de uma forma que possa ser *validada*. Assim, alguns terceiros, como Twitter, Instagram ou a Pesquisa Google, recebem a oportunidade de veicular páginas AMP para os leitores de maneiras cada vez mais interessantes.

## Como posso verificar se a minha página é uma AMP válida?

Existem diversas formas para validar um documento AMP. Todas elas terão
o mesmo resultado, então use a que mais se adaptar ao seu
estilo de desenvolvimento.

Além da validade da AMP, você também pode querer confirmar se seu documento AMP [pode ser detectado](/pt_br/docs/guides/deploy/discovery.html) por plataformas de terceiros.

### Console do navegador para desenvolvedores

O validador de AMP vem com a biblioteca JavaScript AMP para estar disponível em todas as páginas AMP por padrão. Para validar:

  1. Abra sua página AMP no navegador
  1. Anexe "`#development=1`" ao URL, por exemplo, `http://localhost:8000/released.amp.html#development=1`.
  1. Abra o [console do Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) e verifique se há erros de validação.

Os erros do Developer Console serão mostrados assim:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" alt="Captura de tela de erros no validador de AMP no console do desenvolvedor Google Chrome" layout="responsive"></amp-img>


### Interface da Web

O validador de AMP pode ser usado como uma interface da Web em
[validator.ampproject.org](https://validator.ampproject.org/). Essa
interface exibe os erros in-line ao lado da fonte HTML da página.
A interface é um editor interativo: alterações na fonte HTML resultam em
revalidação interativa.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" alt="Captura de tela de validator.ampproject.org com exemplos de erro." layout="responsive"></amp-img>


### Extensão do navegador

O validador de AMP pode ser acessado diretamente na barra de ferramentas do seu navegador por meio de
uma extensão. Enquanto você navega, ele valida automaticamente cada página AMP visitada
e fornece uma indicação visual sobre essa validade por meio de um ícone
colorido.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" alt="Ícone da AMP em vermelho indicando documento de AMP inválido." layout="fixed"></amp-img>
      
    </td>
    <td>Quando houver erros dentro de uma página AMP, o ícone da extensão
      ficará vermelho e informará o número de erros encontrados.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" alt="Ícone da AMP em verde indicando documento de AMP válido." layout="fixed"></amp-img>
      
    </td>
    <td>Quando não houver erros dentro de uma página AMP, o ícone ficará
      verde e exibirá o número de avisos, no caso de existir algum.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" alt="Ícone da AMP em azul indicando variante HTML para AMP, se clicado." layout="fixed"></amp-img>
      
    </td>
    <td>Quando a página não for AMP, mas houver uma versão AMP
      disponível, será exibido um ícone azul de link. Além disso, ao clicar na
      extensão, o navegador será redirecionado para a versão AMP.
    </td>
  </tr>
</table>

Extensão do validador de AMP para
[Google Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) e [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Ferramenta de linha de comando

Como pré-requisito, pode ser necessário instalar o <a href="https://docs.npmjs.com/getting-started/installing-node">Node.js e seu respectivo gerenciador de pacotes
`npm` no seu sistema</a>.

Para instalar a [ferramenta de linha de comando do validador de HTML para AMP](https://www.npmjs.com/package/amphtml-validator), digite `npm install -g amphtml-validator`.

Agora, vamos validar uma página HTML para AMP real.

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

Não é novidade que esta página tem um HTML para AMP válido. Vamos tentar uma página que não seja válida:
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Para executar o comando `amphtml-validator`, você pode fornecer o URL da página ou um nome de arquivo local. Faça download de [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) e salve-o em um arquivo. Em seguida, execute:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 O atributo 'charset' pode não aparecer na tag 'meta name= and content='.
several_errors.html:26:2 A tag 'script' não é permitida, exceto em formas específicas.
several_errors.html:32:2 O atributo obrigatório 'height' está ausente na tag 'amp-img'. (veja https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 O atributo 'width' na tag 'amp-ad' está definido para o valor inválido '100%'. (veja https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

As mensagens de erro são formadas por nome de arquivo, linha, coluna e uma mensagem,
muitas vezes seguida por um link para a referência HTML da AMP. Alguns editores, incluindo o Emacs
(procure o comando de compilação e o modo de compilação), podem interpretar esse formato e levá-lo
diretamente para os erros no arquivo original.

Para ter um bom ponto de partida para criar a sua própria página AMP, considere [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

A ferramenta de linha de comando oferece recursos adicionais, incluindo desativação da cor,
impressão da saída JSON ou execução de uma versão específica do
validador JavaScript (por padrão, ele executa o script que foi publicado mais recentemente).

[sourcecode:console]
$ amphtml-validator --help

  Uso: index [options] <fileOrUrlOrMinus...>

  Valida os arquivos ou URLs fornecidos como argumentos. Se "-" for
  especificado, lê a partir de stdin.

  Opções:

    -h, --help                  informação de uso de saída
    -V, --version               gera o número da versão
    --validator_js <fileOrUrl>  O JavaScript do validador.
      Versão mais recente publicada por padrão ou
      dist/validator_minified.js (criada com build.py)
      para desenvolvimento.
    --format <color|text|json>  Como formatar a saída.
      "color" exibe erros/avisos/êxito em
              vermelho/laranja/verde.
      "text"  evita cor (por exemplo, útil para terminais sem
              suporte a cor).
      "json"  emite json correspondente à mensagem ValidationResult
              em validator.proto.
[/sourcecode]

## O que acontece se a minha página não for válida?

O validador de AMP não é apenas uma conveniência para você durante o desenvolvimento. Ele também é usado por plataformas como Twitter ou Google, que integram as páginas AMP aos seus conteúdos e resultados de pesquisa. Mais ainda, eles não costumam solicitar as páginas diretamente do seu servidor, mas usam o Google AMP Cache, um serviço gratuito que armazena em cache as suas páginas e as disponibiliza em todo o mundo para que sejam carregadas ainda mais rápido.

Se o serviço de validação de AMP detectar que há algo de errado com a sua página, ela não será detectada e distribuída por sites de terceiros e não aparecerá no Google AMP Cache. Desse modo, não só você perde os benefícios do cache em termos de velocidade, como corre o risco de não ter a sua página sendo exibida em muitos lugares. Como isso seria uma pena, vamos tomar cuidado para que não aconteça.

## Como faço para corrigir os erros de validação?

A maioria dos erros de validação são fáceis de tratar e corrigir. Veja esta tag HTML:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Ela gera este erro de validação AMP, apresentado nestas diferentes ferramentas:

* Console do navegador para desenvolvedores
<amp-img alt="Erro de AMP: a tag &#39;img&#39; só pode aparecer como descendente da tag &#39;noscript&#39;. Você quis dizer &#39;amp-img&#39;? linha 11, coluna 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive"></amp-img>

* Interface da Web
<amp-img alt="Erro de AMP: a tag &#39;img&#39; só pode aparecer como descendente da tag &#39;noscript&#39;. Você quis dizer &#39;amp-img&#39;? linha 11, coluna 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive"></amp-img>

* Extensão do navegador
<amp-img alt="Erro de AMP: a tag &#39;img&#39; só pode aparecer como descendente da tag &#39;noscript&#39;. Você quis dizer &#39;amp-img&#39;? linha 11, coluna 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive"></amp-img>

Cada ferramenta fornece várias informações:

1. A localização (linha e coluna) no documento HTML onde ocorreu o
     erro, que pode receber cliques em algumas interfaces para destacar esse local. Nesse
     caso, o problema ocorre na linha 11, coluna 2.
1. Uma linha de texto que descreve o erro. Nesse caso, o texto indica que
     uma tag `<img>` está em uso, quando na verdade a tag `<amp-img>` é que deveria estar sendo usada.
1. Um link para um documento relevante sobre o erro. Nesse caso, a
     documentação da tag `<amp-img>`. Nem todos os erros geram
     links de documentação.

Em uma releitura cuidadosa das especificações, percebemos que estamos usando uma tag `<img>`, quando deveríamos ter usado uma tag `<amp-img>`.

Para entender melhor a lista completa de possíveis erros,
consulte o [guia de erros de validação de AMP](/pt_br/docs/reference/validation_errors.html).
Se a solução não aparecer mesmo após uma avaliação cuidadosa, [faça uma pergunta](http://stackoverflow.com/questions/tagged/amp-html), e nós tentaremos ajudar.

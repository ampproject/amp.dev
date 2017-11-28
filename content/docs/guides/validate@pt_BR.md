---
$title: Validar páginas AMP
---
[TOC]

A principal vantagem das AMP não é somente deixar as páginas mais rápidas, mas fazer isso de uma forma que pode ser *validada*. Assim, alguns terceiros, como o Twitter, o Instagram ou a Pesquisa Google, podem veicular páginas AMP para os leitores de maneiras cada vez mais interessantes.

## Como posso verificar se minha página é uma AMP válida?

Há várias formas de validar um documento AMP. Todas elas terão o mesmo resultado, então use a que mais se adaptar ao seu estilo de desenvolvimento.

 Além da validade das AMP, também é possível confirmar se o documento AMP [pode ser encontrado](/pt_br/docs/guides/discovery.html) por plataformas de terceiros.

### Developer Console do navegador

O validador de AMP vem com a biblioteca JavaScript AMP e está disponível em todas as páginas AMP por padrão. Para validar:

1. Abra sua página AMP no navegador.
1. Anexe "`#development=1`" ao URL, por exemplo, `http://localhost:8000/released.amp.html#development=1`.
1.  Abra o [console do Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) e verifique se há erros de validação.

Os erros do Developer Console serão semelhantes ao exemplo:

<amp-img src="/static/img/docs/validator_errors.png"
    width="713" height="243" layout="responsive"
    alt="Screen grab of AMP Validator errors in chrome developer console">
</amp-img>

### Interface da Web


O validador de AMP pode ser usado como uma interface da Web em <a href="https://validator.ampproject.org/">validator.ampproject.org</a>. Essa interface exibe os erros in-line junto ao código-fonte HTML da página. A interface é um editor interativo: alterações no código-fonte HTML resultam na revalidação interativa.

<amp-img src="/static/img/docs/validator_web_ui.png"
    width="660" height="507" layout="responsive"
    alt="Screen grab of validator.ampproject.org with error examples.">
</amp-img>

### Extensão do navegador

O validador de AMP pode ser acessado diretamente na barra de ferramentas do seu navegador por meio de uma extensão. Enquanto você navega, ele valida automaticamente cada página AMP visitada e fornece uma indicação visual sobre essa validade por meio de um ícone colorido.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png"
               width="20" height="20" layout="fixed"
               alt="Red AMP icon indicating invalid AMP document.">
      </amp-img>
    </td>
    <td>
    Quando houver erros em uma página AMP, o ícone da extensão ficará vermelho e informará o número de erros encontrados.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png"
               width="20" height="20" layout="fixed"
               alt="Green AMP icon indicating valid AMP document.">
      </amp-img>
    </td>
    <td>
    Quando não houver erros em uma página AMP, o ícone ficará verde e exibirá o número de avisos, caso tenha algum.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png"
               width="20" height="20" layout="fixed"
               alt="Blue AMP icon indicating AMP HTML variant if clicked.">
      </amp-img>
    </td>
    <td>
    Quando a página não for AMP, mas houver uma versão AMP disponível, será exibido um ícone azul de link. Clicar na extensão redirecionará o navegador para a versão AMP.</td>
  </tr>
</table>


Extensão do validador de AMP para [Google Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) e [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Pacotes de NPM para CI

 Como parte do fluxo de criação e testes, é possível integrar a validação de AMP por meio dos pacotes de NPM do validador de AMP: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) ou [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (um plug-in do gulp). Por exemplo, é possível usar o pacote de NPM do validador de AMP para testes de integração ou em uma tarefa programada para verificar páginas AMP em produção.

##### Exemplo: validar um arquivo HTML das AMP

 Neste exemplo, a validação do arquivo HTML das AMP será feita usado o pacote de NPM [amphtml-validator](https://www.npmjs.com/package/amphtml-validator). O status de validação passa pelo fluxo do console.

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  ((result.status === 'PASS') ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
  } 
});
```

##### Exemplo: usar uma tarefa do gulp para validar o HTML das AMP

Neste exemplo, será usada uma tarefa do gulp para a validação de todos os arquivos HTML AMP. Se houver um erro de validação das AMP, a tarefa retornará um código de erro (1).

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html'

};gulp.task('amphtml:validate', () => {
  return gulp.src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['amphtml:validate'], function () {
});
```

### Ferramenta de linha de comando

 É possível validar arquivos HTML AMP usando a [ferramenta de linha de comando do validador de HTML das AMP](https://www.npmjs.com/package/amphtml-validator).

Primeiros passos:

1.  É preciso ter o [Node.js com o respectivo gerenciador de pacote "NPM"](https://docs.npmjs.com/getting-started/installing-node) no seu sistema.
2.   Instale a [ferramenta de linha de comando do validador de HTML das AMP](https://www.npmjs.com/package/amphtml-validator) executando o comando "`npm install -g amphtml-validator`".

Agora, validaremos uma página AMP real em HTML:

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]


Como era de se esperar, o HTML da AMP é válido. Vejamos agora uma página que não é válida: [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Para executar o comando `amphtml-validator`, você pode fornecer o URL da página ou um nome de arquivo local. Faça download e salve [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) como um arquivo. Em seguida, execute:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

As mensagens de erro são formadas por nome de arquivo, linha, coluna e mensagem, geralmente seguida por um link para a referência HTML AMP. Alguns editores, incluindo o Emacs (procure o comando e o modo de compilação), podem interpretar esse formato e levar você diretamente para os erros no arquivo original.

 Como um bom ponto de partida para a criação da sua própria página AMP, recomendamos [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

A ferramenta de linha de comando oferece outros recursos, incluindo desativação da cor, impressão da saída JSON ou execução de uma versão específica do validador JavaScript. Por padrão, ele executa o script que foi publicado por último.

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## O que acontece se minha página não é válida?

O validador de AMP não é somente uma conveniência para você durante o desenvolvimento. Ele também é usado por plataformas como Twitter ou Google, que integram as páginas AMP aos conteúdos e resultados da pesquisa deles. Além disso, eles não costumam solicitar as páginas diretamente do seu servidor, mas usam o Google AMP Cache, um serviço gratuito que armazena em cache suas páginas e as disponibiliza em todo o mundo para que sejam carregadas ainda mais rápido.

Se o serviço de validação de AMP detectar que há algo errado com sua página, ela não será detectada nem distribuída por websites de terceiros. Além disso, não aparecerá no Google AMP Cache. Dessa forma, não só você perderia os benefícios do cache em termos de velocidade, mas também correria o risco de não exibir sua página em vários lugares. Queremos garantir que isso não aconteça.

## Como faço para corrigir os erros de validação?

A maioria dos erros de validação é fácil de verificar e corrigir. Veja esta tag HTML:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Ela gera o seguinte erro de validação de AMP, exibido nestas ferramentas:

* Developer Console do navegador
<amp-img src="/static/img/docs/validator_console_imgerror.png"
    width="696" height="30" layout="responsive"
    alt="AMP error: The tag 'img' may only appear as a descendant of tag
    'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>

* Interface da Web
<amp-img src="/static/img/docs/validator_webui_imgerror.png"
    width="676" height="58" layout="responsive"
    alt="AMP error: The tag 'img' may only appear as a descendant of tag
    'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>

* Extensão do navegador
<amp-img src="/static/img/docs/validator_extension_imgerror.png"
    width="724" height="108" layout="responsive"
    alt="AMP error: The tag 'img' may only appear as a descendant of tag
    'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>

Cada ferramenta fornece várias informações:

1. A localização (linha e coluna) no documento HTML onde ocorreu o erro, que pode receber cliques em algumas interfaces para destacar esse local. Nesse caso, o problema ocorre na linha 11, coluna 2.
1.  Uma linha de texto que descreve o erro. Nesse caso, o texto indica que uma tag `<img>` está em uso quando na verdade a tag `<amp-img>` é que deveria estar sendo usada.
1.  Um link para um documento relevante sobre o erro. Nesse caso, a documentação da tag `<amp-img>`. Nem todos os erros geram links de documentação.

 Ao reler cuidadosamente as [especificações](/pt_br/docs/reference/spec.html), percebemos que estamos usando uma tag `<img>` quando deveríamos ter usado uma tag `<amp-img>`.

 Para entender melhor a lista completa de possíveis erros, consulte o [guia de erros de validação de AMP](https://www.ampproject.org/pt_br/docs/reference/validation_errors.html). Se você ainda tiver dúvidas após uma avaliação cuidadosa, [faça uma pergunta,](http://stackoverflow.com/questions/tagged/amp-html) e tentaremos ajudar.


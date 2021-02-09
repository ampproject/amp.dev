---
'$title': Validate AMP pages
$order: 0
description: Assista ao nosso vídeo sobre as várias opções de validação. A principal vantagem da tecnologia AMP não é simplesmente deixar as páginas mais rápidas, mas sim fazer isso de uma maneira que pode ser...
formats:
  - sites
  - histórias
  - anúncios
---

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='Assista nosso vídeo sobre as várias opções de validação.']

A principal vantagem da tecnologia AMP não é simplesmente deixar as páginas mais rápidas, mas sim fazer isso de uma maneira que pode ser _validada_. Assim, serviços de terceiros, tais como Twitter, Instagram ou a Busca do Google, podem ficar tranquilos ao disponibilizar páginas AMP para os leitores de maneiras cada vez mais interessantes.

## Como posso verificar se a minha página é uma AMP válida?

Há várias formas de validar um documento AMP. Todas elas terão o mesmo resultado. Por isso, use a opção mais adequada ao seu estilo de desenvolvimento.

Além de validar a página AMP, também é possível confirmar que o documento AMP [pode ser detectado](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) por plataformas de terceiros.

### Console do navegador para desenvolvedores

O Validador AMP vem com a biblioteca JavaScript AMP. Assim, ele está disponível em todas as páginas AMP por default. Para validar uma página, siga estas etapas:

1. Abra a página AMP no navegador.
2. Anexe "`#development=1`" ao URL, por exemplo, `http://localhost:8000/released.amp.html#development=1`.
3. Abra o [DevTools Console no Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) e verifique se há erros de validação.

Os erros do console serão exibidos assim:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" layout="responsive" alt="Screen grab of AMP Validator errors in chrome developer console"></amp-img>

### Interface da Web

O Validador AMP pode ser usado como uma interface web em <a href="https://validator.ampproject.org/">validator.ampproject.org</a>. Nessa interface, os erros são exibidos inline ao lado da fonte HTML da página. A interface é um editor interativo. Se você fizer alterações na fonte HTML, o conteúdo será validado novamente de maneira interativa.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" layout="responsive" alt="Screen grab of validator.ampproject.org with error examples."></amp-img>

### Extensão do navegador

É possível acessar o Validador AMP diretamente na barra de ferramentas do navegador com uma extensão. Durante a navegação, ele validará automaticamente cada página AMP acessada e exibirá um ícone colorido como indicador visual da validade do conteúdo.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" layout="fixed" alt="Red AMP icon indicating invalid AMP document.">
      </amp-img>
    </td>
    <td>Quando houver erros numa página AMP, o ícone da extensão será exibido em vermelho e informará o número de problemas encontrados.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" layout="fixed" alt="Green AMP icon indicating valid AMP document.">
      </amp-img>
    </td>
    <td>Quando não houver erros numa página AMP, o ícone será exibido em verde e informará o número de avisos, se for o caso.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" layout="fixed" alt="Blue AMP icon indicating AMP HTML variant if clicked.">
      </amp-img>
    </td>
    <td>Quando a página não for AMP, mas houver uma versão AMP disponível,       o ícone será exibido em azul com um link. Ao clicar na extensão,       o navegador será redirecionado à versão AMP da página.     </td>
  </tr>
</table>

Extensão do Validador AMP para [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) e [Opera](https://addons.opera.com/pt-br/extensions/details/amp-validator/).

### Pacotes de NPM para CI

Você pode integrar a validação de AMP aos seus canais de desenvolvimento e testes usando os pacotes da NPM: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) ou o plug-in Gulp [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator). Por exemplo, você pode usar o pacote Validador AMP NPM em testes de integração ou numa tarefa programada para verificar as páginas AMP de produção.

##### Exemplo: como validar um arquivo AMPHTML

Neste exemplo, validamos um arquivo AMPHTML usando o pacote da NPM [amphtml-validator](https://www.npmjs.com/package/amphtml-validator). O status de validação é enviado ao console.

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  (result.status === 'PASS' ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg =
      'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    (error.severity === 'ERROR' ? console.error : console.warn)(msg);
  }
});
```

##### Exemplo: como usar uma tarefa Gulp na validação de AMPHTML

Neste exemplo, temos uma tarefa Gulp que valida todos os arquivos AMPHTML. Se houver um erro de validação de AMP, a tarefa será encerrada com um código de erro (1).

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html',
};

gulp.task('amphtml:validate', () => {
  return gulp
    .src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['amphtml:validate'], function () {});
```

### Ferramenta de linha de comando

Você pode validar arquivos AMPHTML com a [ferramenta de validação AMPHTML de linha de comando](https://www.npmjs.com/package/amphtml-validator).

Primeiros passos:

1. Verifique se você tem [Node.js com o gerenciador de pacotes 'npm'](https://docs.npmjs.com/getting-started/installing-node) no seu sistema.
2. Execute o comando `npm install -g amphtml-validator` para instalar a [ferramenta de validação AMPHTML de linha de comando](https://www.npmjs.com/package/amphtml-validator).

Agora, veja a validação de uma página HTML para AMP real.

[sourcecode:console] $ amphtml-validator https://amp.dev/ https://amp.dev/: PASS [/sourcecode]

Obviamente, esta página contém AMPHTML válido. Agora, vejamos uma página que não é válida: [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Para executar o comando `amphtml-validator`, forneça a URL da página ou um nome de arquivo local. Faça o download e salve [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) em um arquivo. Depois, execute o seguinte:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

As mensagens de erro incluem nome do arquivo, linha, coluna e um texto, e costumam terminar com um link da referência AMPHTML. Alguns editores, incluindo o Emacs (procure o comando e o modo de compilação), conseguem interpretar esse formato e levam você diretamente aos erros no arquivo original.

Para começar, faça sua página AMP identificar [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console] $ amphtml-validator minimum_valid_amp.html minimum_valid_amp.html: PASS [/sourcecode]

A ferramenta de linha de comando oferece recursos adicionais, incluindo desativação da cor, impressão da saída JSON ou execução de uma versão específica do JavaScript do validador. Por default, ele executa o script publicado mais recentemente.

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

## O que acontece quando minha página não é válida?

O validador de AMP não é só uma ferramenta conveniente para ajudar você durante o desenvolvimento. Ele também é usado por plataformas como Twitter ou Google, que integram as páginas AMP aos seus conteúdos e resultados de pesquisa. Mais ainda, eles não costumam solicitar as páginas diretamente do seu servidor, mas usam o Google AMP Cache, um serviço gratuito que armazena em cache as suas páginas e as disponibiliza em todo o mundo para que sejam carregadas ainda mais rápido.

Se o serviço de validação de AMP detectar que há algo de errado com a sua página, ela não será detectada e distribuída por sites de terceiros e não aparecerá no Google AMP Cache. Desse modo, não só você perde os benefícios do cache em termos de velocidade, como corre o risco de não ter sua página sendo exibida em muitos lugares. Tome cuidado para que isso não aconteça.

## Como faço para corrigir erros de validação?

A maioria dos erros de validação é fácil de verificar e corrigir. Veja esta tag HTML:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Ela gera este erro de validação AMP, mostrado nessas diferentes ferramentas:

- Console de desenvolvimento do navegador {amp-img0}{/amp-img0}

- Interface web {amp-img0}{/amp-img0}

- Extensão do navegador {amp-img0}{/amp-img0}

Cada ferramenta fornece várias informações:

1. A mensagem indica a localização (linha e coluna) no documento HTML onde ocorreu o erro. Em algumas interfaces, é possível clicar no texto para destacar esse local. Nesse caso, o problema ocorre na linha 11, coluna 2.
2. Uma linha de texto descreve o erro. Nesse caso, o texto indica que estamos usando uma tag `<img>`, quando deveríamos ter usado uma tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).
3. Há um link para um documento relevante sobre o erro. Nesse caso, o link leva à documentação da tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md). Nem todos os erros geram links de documentação.

Se relermos com atenção o [artigo de especificações](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md), veremos que estamos usando uma tag `<img>`, quando deveríamos ter usado uma tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).

Para entender melhor a lista completa de possíveis erros, consulte o [guia sobre erros de validação de AMP](validation_errors.md). Se você ainda tiver dúvidas após uma análise detalhada, [faça uma pergunta](http://stackoverflow.com/questions/tagged/amp-html) (em inglês) para receber ajuda.

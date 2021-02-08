---
'$title': Validação de e-mails AMP
$order: 1
author: CrystalOnScript
formats:
  - email
---

Os e-mails AMP dependem da biblioteca JavaScript AMP para permitir ricas experiências interativas e dinâmicas para os leitores. Por esse motivo, os provedores de e-mail precisam que suas mensagens sejam validadas. A marcação AMP válida garante que os e-mails sejam seguros e superem os padrões de experiência esperados pelo usuário.

# Como posso verificar se meu e-mail é AMP válido?

Há muitas maneiras de validar um e-mail como um e-mail AMP válido. Todas produzirão exatamente o mesmo resultado, então escolha aquela que mais se adapte ao seu estilo de desenvolvimento!

## Validação na Web

O [validador AMP baseado na Web](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) é compatível com a plataforma AMP para E-mail. Use esse validador colando seu e-mail AMP na ferramenta. Ele avisará sobre quaisquer erros de validação inline.

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## Validação de linha de comando

Você pode validar arquivos de E-mails AMP usando [a ferramenta de linha de comando para validação AMP HTML](https://www.npmjs.com/package/amphtml-validator).

### Instalação

1. Certifique-se que você possui o [Node.js com seu gerenciador de pacotes 'npm'](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) instalado no seu sistema.
2. Instale a ferramenta de validação AMP HTML de linha de comando ao executar o comando a seguir: `npm install -g amphtml-validator`.

### Uso

Depois de instalar a ferramenta de linha de comando, execute o seguinte comando após substituir `<amphtml file>` com seu arquivo contendo o conteúdo do email AMP.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

Se o e-mail for válido, a ferramenta de linha de comando imprimirá o valor `PASS`. Se inválido, ela listará os erros encontrados.

## Playground AMP

Você também pode validar e-mails de AMP usando o [Playground AMP](https://playground.amp.dev/?runtime=amp4email). Semelhante ao validador Web, cole seu e-mail AMP na ferramenta e o playground identificará todos os erros do validador inline.

### Validação de e-mails entregues

Às vezes, seus e-mails AMP entregues podem ser inválidos mesmo que a marcação de e-mail que você criou já tenha sido validada pelas ferramentas documentadas nesta página. O motivo mais comum para isso acontecer é que seu [ESP](https://amp.dev/support/faq/email-support/) (provedor de serviço de e-mail) modificou sua marcação de e-mail deixando-a inválida depois que você enviou seu e-mail para o ESP para distribuição. Por exemplo, se seu ESP é o SparkPost e você não configurou pixels de rastreamento HTTPS com o SparkPost, então o SparkPost adicionará um pixel de rastreamento HTTP inseguro ao seu e-mail. Como os e-mails de AMP só permitem imagens HTTPS, isso deixará seu e-mail AMP inválido.

Para verificar se um e-mail entregue na sua caixa de entrada é AMP válido:

1. [baixe o e-mail AMP como um arquivo `.eml`](https://www.codetwo.com/kb/export-email-to-file) do seu cliente de e-mail.
2. Abra o [Playground AMP](https://playground.amp.dev/?runtime=amp4email).
3. Clique em "IMPORT EMAIL", e selecione o arquivo `.eml` que você acaba de baixar.

O playground importará o e-mail AMP do qual você fez o download para o editor inline e identificará quaisquer erros de validação.

# O que acontece se meu e-mail não for válido?

O validador AMP não é apenas uma conveniência para você durante o desenvolvimento. Os provedores de e-mail que oferecem suporte a e-mails AMP farão a substituição automática para os outros tipos MIME fornecidos, HTML ou texto simples. Um e-mail AMP só deve ser enviado se passar no validador.

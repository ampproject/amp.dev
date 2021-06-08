---
$title: Integrar AMP ao seu aplicativo
---

Este guia é voltado a desenvolvedores de apps da Web e para dispositivos móveis que queiram integrar e vincular aplicativos a páginas AMP. Um exemplo disso seria um aplicativo de bate-papo para dispositivos móveis que carrega a versão AMP de um URL compartilhado para proporcionar uma experiência mais rápida aos usuários.

## Transformar links em AMP

Com as AMP, é possível renderizar sites externos quase instantaneamente no seu
app nativo ou da Web para dispositivos móveis. Você pode fazer isso vinculando os URLs no seu conteúdo
aos URLs de AMP correspondentes (se houver) e abrindo a versão AMP
em vez de abrir a versão original. Para isso, use ferramentas como a
[AMP URL API do Google](https://developers.google.com/amp/cache/use-amp-url)
.

Por exemplo, a mensagem a seguir pode ser transformada para disponibilizar as versões AMP
substituindo todos os URLs por suas versões AMP correspondentes (se houver). Para
reduzir o tempo de carregamento e garantir que um AMP válido seja disponibilizado, é preciso vincular as
páginas AMP em cache ao cache de AMP.

Mensagem original

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

Mensagem transformada:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="success"]
Considere oferecer aos usuários também a opção de visualizar a versão não AMP
por meio das configurações de preferências no aplicativo.
[/tip]

### Maneiras de transformar os links

Há três maneiras programáticas de transformar os links:

1.  **Tempo de gravação no servidor (preferido)**: recupere o URL de AMP com a
    AMP URL API do Google no tempo de gravação de um URL e armazene os URLs de AMP no servidor. Transmita ambos os
    URLs ao cliente, já que o URL original pode ser necessário para compartilhamento.
    Essa é a abordagem recomendada porque há menos solicitações na rede
    do cliente. Ao usar essa abordagem, é importante verificar regularmente
    (diariamente, por exemplo) as versões AMP nos links, porque os sites estão
    cada vez mais usando o formato AMP.
1.  **Tempo de leitura no servidor (algum uso)**: recupere o URL de AMP com a
    AMP URL API do Google antes de transmitir o conteúdo ao cliente. Conforme já foi dito, transmita
    ambos os URLs (AMP e não AMP) ao cliente, já que talvez você precise do URL original
    para compartilhamento. Esse método pode ser adequado para serviços de baixa distribuição de dados.
1.  **No cliente (caso não seja possível fazer isso no servidor)**: recupere o URL de AMP com a
    AMP URL API do Google do cliente. Use essa abordagem caso a transformação do URL
    no servidor não seja possível (por exemplo, para aplicativos de mensagens que usam
    criptografia de ponta a ponta). Acione a transformação do URL assim que
    o conteúdo estiver disponível, antes de qualquer interação com o usuário.

[tip type="important"]
Nunca solicite URLs de AMP usando a AMP API do Google como resultado da interação
com um usuário, porque isso compromete o desempenho do seu aplicativo devido à introdução
de uma solicitação de rede adicional. Em vez disso, use uma das três abordagens
descritas acima.
[/tip]

#### AMP URL API do Google

O Google fornece a AMP URL API para recuperar os URLs de HTML para AMP correspondentes para uma
determinada lista de URLs ([documentação oficial](https://developers.google.com/amp/cache/use-amp-url) /
[demonstração](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html). Os URLs não
precisam ser versões canônicas. Se houver uma versão AMP, a resposta
incluirá o URL de AMP original e o URL da página AMP armazenada no cache
de AMP do Google.

Por exemplo, para uma determinada lista de URLs:

```json
{"urls": [
  "https://www.example.org/article-with-amp-version",
  "http://www.example.com/no-amp-version.html"
]}
```

O corpo da resposta contém o mapeamento do URL de AMP no formato JSON:

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"]
URLs de páginas AMP armazenadas em caches de AMP que não forem do Google não podem ser recuperados com a
AMP URL API. No entanto, é fácil derivar o URL em cache do URL de AMP
retornado (ampURL).
[/tip]

## Usar caches de AMP

Um [cache de AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) é uma
rede de fornecimento de conteúdo (CDN, na sigla em inglês) baseada em proxy que tem a função de exibir documentos AMP válidos.
Os caches de AMP servem para:

*   exibir somente páginas AMP válidas;
*   permitir que as páginas AMP sejam pré-carregadas com eficiência e segurança;
*   fazer otimizações adicionais no desempenho do conteúdo para melhorar a experiência do usuário.

No momento, há dois provedores de cache de AMP:

*   [cache de AMP do Google](https://developers.google.com/amp/cache/)
*   [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

Assim, você tem duas opções para exibir um arquivo AMP em um aplicativo:

1.  a versão hospedada pelo editor
1.  a versão hospedada em um cache de AMP

Recomendamos usar o cache de AMP pelos seguintes motivos:

*   A experiência do usuário é melhor devido ao tempo de carregamento mais rápido e à baixa latência (redução de mais de 1s
    no tempo de carregamento).
*   O desempenho e o uso da largura de banda são otimizados com o armazenamento em cache adicional dos artefatos
    com base no cliente (por exemplo, armazenamento em cache de diferentes versões da mesma imagem
    dependendo do tamanho da janela de visualização do cliente).
*   O arquivo AMP original pode não ser mais válido, o que poderia gerar uma
    experiência insatisfatória para o usuário. Nesse caso, o cache de AMP disponibiliza a versão válida
    mais recente do arquivo AMP.
*   Um editor desonesto poderia disponibilizar dois documentos diferentes para um rastreador de cache de
    AMP e para seus usuários. Usar um cache de AMP garante que os usuários
    sempre vejam o mesmo arquivo AMP que está no cache.

[tip type="important"]
Ao disponibilizar páginas AMP por meio do cache de AMP, ofereça uma experiência de visualização que
mostre claramente a origem do AMP e que ofereça aos usuários a possibilidade de compartilhar o
URL canônico (veja também as duas seções a seguir para saber mais).
[/tip]

## Implementar um visualizador de AMP

O ambiente de tempo de execução de AMP oferece uma API de visualizador, que fornece um protocolo para o envio e
recebimento de mensagens entre o ambiente de tempo de execução de AMP e o visualizador. Isso torna possível
controlar a pré-renderização dos documentos AMP, o deslizar entre artigos, e a instrumentação do ambiente
de tempo de execução de AMP. Saiba mais sobre a API de visualizador de AMP no guia sobre
[conectar visualizadores de AMP a páginas AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md)
. As implementações do visualizador [para a Web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md)
e [para iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) estão
disponíveis no [GitHub](https://github.com/ampproject/amp-viewer). Ainda não há
um visualizador disponível para Android. Confira [esta resposta](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) (em inglês)
no Stack Overflow para saber qual a melhor configuração de um WebView para exibir páginas AMP.

Veja algumas práticas recomendadas gerais para implementar um visualizador de AMP:

*   Disponibilize a página AMP a partir de um cache de AMP. Isso diminui o tempo de carregamento em mais de 1s.
*   Exiba a origem do editor do artigo (por exemplo, em um cabeçalho que pode ser recolhido).
*   Forneça uma ação de compartilhamento (veja também a seção "[Compartilhar conteúdo AMP](integrate-with-apps.md#sharing-amp-content)"
    abaixo).
*   Nos visualizadores baseados em WebView, permita cookies de terceiros.
*   Defina um referenciador para sua plataforma ou seu aplicativo.

### Compartilhar conteúdo AMP <a name="sharing-amp-content"></a>

Ao compartilhar um documento AMP a partir do visualizador de AMP de uma plataforma, ela
precisa compartilhar o URL canônico caso isso seja possível do ponto de vista técnico. Por exemplo, se a
plataforma fornecer um botão de compartilhamento, esse botão terá que compartilhar o URL canônico.

A filosofia do Projeto AMP é de que as plataformas possam escolher qual
versão de um documento apresentar ao usuário. Por isso, faz mais
sentido compartilhar a versão canônica (e não a versão AMP) ao
fazer o compartilhamento em outra plataforma para depois esperar que a plataforma de destino faça a
escolha certa.

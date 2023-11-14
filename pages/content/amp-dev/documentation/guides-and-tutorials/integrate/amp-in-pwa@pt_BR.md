---
$title: Incorporar e usar AMP como fonte de dados
---

Se você já usar AMP, mas ainda não tiver criado um Progressive Web App, aproveite as páginas AMP para simplificar muito o desenvolvimento do seu Progressive Web App. Neste guia, você verá como aproveitar as AMP no seu Progressive Web App e usar as páginas AMP existentes como fonte de dados.

## De JSON para AMP

Nos casos mais comuns, os Progressive Web Apps são aplicativos de página única que se conectam a uma JSON API por Ajax. Essa JSON API retorna conjuntos de dados para direcionar a navegação e conteúdos para renderizar artigos.

Em seguida, é preciso converter o conteúdo bruto em HTML utilizável e renderizá-lo no cliente. Esse processo é caro e muitas vezes difícil de manter. Em vez disso, você pode reutilizar as páginas AMP já existentes como fonte de conteúdo. O melhor de tudo é que, com as AMP, isso pode ser feito com apenas algumas linhas de código.

## Incluir "Shadow AMP" no seu Progressive Web App

A primeira etapa é incluir uma versão especial da AMP chamada de "Shadow AMP" no seu Progressive Web App. Sim, você carregará a biblioteca AMP na página de nível superior, mas na verdade ela não controlará o conteúdo desse nível. Ela só "amplificará" as partes da página que você indicar.

Inclua a Shadow AMP no cabeçalho da sua página, por exemplo:

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://ampjs.org/shadow-v0.js"></script>
[/sourcecode]

### Como saber quando a Shadow AMP API está pronta para o uso?

Recomendamos que você carregue a biblioteca Shadow AMP com o atributo `async`. No entanto, isso exige usar uma abordagem específica para saber quando a biblioteca está totalmente carregada e pronta para o uso.

O sinal que deve ser observado é a disponibilidade da variável global `AMP`. A Shadow AMP usa uma [abordagem de carregamento assíncrono de função](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/) (em inglês) para facilitar isso. Veja este código:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP is now available.
});
[/sourcecode]

Esse código funcionará e todos os retornos de chamada adicionados dessa maneira serão ativados quando a AMP estiver disponível, mas por quê?

O código pode ser traduzido como:

  1. "Se window.AMP não existir, criar uma matriz vazia para ficar na posição correspondente."
  1. "Em seguida, enviar uma função de retorno de chamada para a matriz que será ativada quando a AMP estiver pronta."

Isso funciona porque, após o carregamento, a biblioteca Shadow AMP detectará que já existe uma matriz de retornos de chamada em `window.AMP` e processará a fila toda. Se você usar a mesma função novamente, ela ainda funcionará, porque a Shadow AMP substitui `window.AMP` por ela própria e um método `push` personalizado que ativa o retorno de chamada imediatamente.

Dica: Para usar o código de exemplo acima na prática, recomendamos que você o una a uma Promise e use-a antes de trabalhar com a AMP API. Para ver um exemplo, confira nosso [código React de demonstração](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) (em inglês).

## Controlar a navegação no seu Progressive Web App

Você ainda precisará implementar esta etapa manualmente. Afinal, é você que decide como quer apresentar os links para o conteúdo no seu conceito de navegação. Em formato de listas? Em cartões?

Normalmente, você busca um JSON que retorna URLs ordenados com metadados. No final, você terá um retorno de chamada de função que será ativado quando o usuário clicar em um link. Esse retorno de chamada precisa incluir o URL da página AMP solicitada. Depois disso, você estará pronto para a etapa final.

## Usar a Shadow AMP API para renderizar a página in-line

Por último, quando você quiser exibir conteúdo após uma ação do usuário, basta buscar o documento AMP relevante e deixar a Shadow AMP assumir o controle. Primeiro, crie uma função para buscar a página, desta forma:

[sourcecode:javascript]
function fetchDocument(url) {

  // unfortunately fetch() does not support retrieving documents,
  // so we have to resort to good old XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contains a ready-to-use Document object
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

Importante: Para simplificar o código de exemplo acima, ignoramos o tratamento de erros. Sempre detecte e resolva os erros de modo adequado.

Agora que temos o objeto `Document` pronto para usar, é hora de deixar a AMP assumir o controle e fazer a renderização. Use uma referência ao elemento DOM que serve de contêiner para o documento AMP e chame a função `AMP.attachShadowDoc()`. Por exemplo:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
  // Let AMP take over and render the page
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

Dica: Antes de entregar o documento para a AMP, remova elementos que fazem sentido ao exibir a página AMP autônoma, mas não no modo incorporado, como rodapés e cabeçalhos.

Pronto. Sua página AMP será renderizada como derivada do Progressive Web App.

## Manter tudo limpo

Provavelmente, seus usuários navegarão entre as páginas AMP do seu Progressive Web App. Ao descartar a AMP renderizada antes, sempre informe a AMP usando isto:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

Isso dirá à AMP que você não está mais usando o documento e reduzirá o uso da memória e da CPU.

## Veja na prática

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Veja na prática o padrão "AMP em PWA" na [amostra React](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) que criamos (em inglês). Ela demonstra o uso de transições suaves durante a navegação e tem um componente React simples que une as etapas acima. É o melhor dos dois mundos: JavaScript flexível e personalizado no Progressive Web App e AMP para administrar o conteúdo.

* Veja o código-fonte aqui: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) (em inglês).
* Use o componente React autônomo pelo npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document) (em inglês).
* Veja na prática aqui: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (em inglês). Para o melhor resultado, abra esse conteúdo em emulações de dispositivos móveis ou smartphones.

Você também pode ver uma amostra de PWA e AMP usando a biblioteca Polymer. A amostra utiliza [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) para incorporar páginas AMP.

* Encontre o código aqui: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp) (em inglês).
* Veja na prática aqui: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/) (em inglês).


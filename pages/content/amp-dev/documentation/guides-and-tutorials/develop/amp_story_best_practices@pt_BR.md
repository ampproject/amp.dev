---
$title: Práticas recomendadas para criar uma história AMP
---

[TOC]

Este guia mostra práticas recomendadas que precisam ser implementadas ao criar uma [história AMP](/pt_br/docs/reference/components/amp-story.html).


## Cor do plano de fundo  

É preciso especificar a cor do plano de fundo das páginas da história AMP. Essa cor ajuda a proporcionar uma boa experiência do usuário com substitutos, mesmo se uma conexão ruim impedir o download de recursos de imagem ou vídeo.

*   A cor do plano de fundo deve representar a cor dominante no recurso de plano de fundo da página.
*   Escolha uma cor que permita uma transição suave para a imagem ou página. Você pode:
    *   usar uma cor dominante que represente a imagem/o vídeo;
    *   aplicar a mesma cor a todas as páginas da história como um tema. 
*   A cor do plano de fundo precisa ser diferente da cor da fonte, para que o texto seja legível antes de a imagem ser carregada.

## Texto 

### Legibilidade

As sobreposições de texto das páginas precisam ser legíveis:

* Escolha uma cor de fonte que contraste com a imagem e a cor do plano de fundo.
* Adicione uma sobreposição de gradiente entre a imagem e o texto para dar contraste.

### Texto resumido   

As histórias AMP foram criadas para oferecer uma experiência mais visual. Por isso, limite o texto das páginas a blocos de leitura rápida, ou seja, não mais que uma ou duas frases. Se você quiser que a página tenha mais texto, analise com atenção seus objetivos e o fluxo de leitura.

## Vídeo  

### Especificar um atributo de pôster 

O `poster` é uma imagem exibida na IU até que o download do vídeo seja concluído. Geralmente, o pôster é o primeiro frame de um vídeo, mas é possível usar qualquer imagem.  É importante escolher uma imagem que represente o vídeo e permita uma transição suave. Se você escolher o primeiro frame, verifique se ele não é um frame temporário em branco. 

As dimensões recomendadas para uma imagem do pôster são 720p (720 px de largura x 1280 px de altura).

*Exemplo: especificar um pôster*

```html
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

### Especificar `<source>` ou `src` 

Ao especificar a origem de um componente [amp-video](/pt_br/docs/reference/components/amp-video.html), use os elementos filhos de `<source>` em vez do atributo `src`. Ao usar o elemento `<source>`, é possível especificar o tipo do vídeo, assim como adicionar outras origens de vídeo. No elemento `<source>`, especifique o tipo MIME por meio do atributo `"type"`. Para vídeos HLS, é preciso especificar um dos seguintes tipos MIME: `application/x-mpegurl` ou `application/vnd.apple.mpegurl`. Para todos os outros vídeos, especifique o prefixo MIME `video/` e o formato do vídeo, por exemplo, "`video/mp4`".

*Exemplo: especificar arquivos com várias origens*

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### Tamanho/duração do vídeo

*  Para ter o desempenho ideal, os vídeos precisam ter menos de 4 MB.
*   No caso de vídeos longos, recomendamos dividir o conteúdo em várias páginas.
*   Evite colocar vídeos grandes na página de abertura.

### Formatos de vídeo

Se você só puder fornecer um formato de vídeo, use o **MP4**.  No entanto, quando possível, use vídeos **HLS** e especifique MP4 como substituto para navegadores que ainda não são compatíveis com HLS. O HLS faz streaming com taxa de bits adaptável, que permite ajustar a qualidade do vídeo de acordo com a conexão de rede do usuário.

[tip type="note"]

O formato de vídeo HLS ainda não é compatível com o navegador Chrome para computador, nem mesmo por emulação. Por isso, é preciso especificar o MP4 como substituto em qualquer tráfego de computadores para sua página. É preciso usar a depuração USB em um dispositivo móvel para depurar vídeos HLS.

[/tip]

### Resolução do vídeo

Os vídeos das histórias AMP sempre são verticais, ou seja, no modo retrato, com uma proporção esperada de 16:9. Use a resolução recomendada para o tipo de streaming de vídeo: 

<table>
  <thead>
    <tr>
     <th>Video streaming type</th>
     <th>Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non-adaptive</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptive</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>


[tip type="note"]

Em dispositivos móveis com uma proporção diferente de 16:9, o vídeo pode ser cortado na horizontal ou na vertical para se ajustar à janela de visualização.

[/tip]


### Codec de vídeo

1.  Para MP4, use `H.264`.
1.  Para WEBM, use `VP9`.
1.  Para HLS ou DASH, use `H.264`.


### Qualidade do vídeo

#### Otimizações de transcodificação

Existem várias ferramentas que podem ser usadas para codificar vídeos e ajustar a qualidade deles durante a codificação.  Algumas delas são:

<table>
  <thead>
    <tr>
     <th>Tool</th>
     <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>An encoder that can also output the HLS format including the playlist.
     </td>
    </tr>
  </tbody>
</table>

#### Tamanho dos segmentos HLS

É preciso que os segmentos HLS não tenham mais de dez segundos de duração, em geral.

### Avançar para a próxima página após o fim do vídeo

Para avançar automaticamente de uma página a outra após o fim de um vídeo, é necessário definir o valor do atributo `auto-advance-after` de `<amp-story-page>` como o ID do vídeo, em vez da duração esperada dele. Ou seja, use isto:

```html
<amp-story-page auto-advance-after="myvideo">
```

Não use isto:

```html
<amp-story-page auto-advance-after="9s">
```

O motivo disso é que talvez o vídeo não se inicie exatamente no mesmo momento em que a página é exibida, ou a duração definida esteja incorreta, levando a uma diferença entre a duração real e a esperada. Como resultado, a repetição do vídeo pode ocorrer, causando distração para o usuário.
 

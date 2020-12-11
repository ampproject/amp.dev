---
$title: amp-video
$category@: media
teaser:
  text: Substitui a tag de vídeo HTML5.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS-IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
-->



Um substituto para a tag `video` de HTML5; para ser usado apenas em incorporações diretas de arquivos de vídeo HTML5.

<table>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemplos</strong></td>
    <td>No site AMP By Example:<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">Exemplo de amp-video</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">Sobreposição de reprodução com um clique para amp-video</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
      <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
    </tr>
  </table>

## Comportamento <a name="behavior"></a>

O componente `amp-video` carrega o recurso de vídeo especificado pelo atributo `src` de forma lenta, em um horário determinado pelo ambiente de tempo de execução. Você pode controlar um componente `amp-video` da mesma forma que uma tag `<video>` padrão de HTML5.

O componente `amp-video` aceita até quatro tipos exclusivos de nós HTML como filhos:

* Tags `source`: assim como na tag `<video>` de HTML, você pode adicionar tags `<source>` filhas para especificar diversos arquivos de mídia de origem a serem abertos.
* Tags `track` para ativar legendas no vídeo. Se a faixa estiver hospedada em uma origem diferente do documento, adicione o atributo `crossorigin` à tag `<amp-video>`.
* Um marcador antes do início do vídeo.
* Um substituto caso o navegador não seja compatível com vídeo HTML5: um ou zero nós filhos imediatos podem ter o atributo `fallback`. Se presente, esse nó e os filhos dele formam o conteúdo exibido caso o vídeo HTML5 não seja compatível com o navegador do usuário.

#### Exemplo <a name="example"></a>

[example preview="inline" playground="true" imports="amp-video"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  layout="responsive"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## Análise <a name="analytics"></a>

O `amp-video` é compatível com análises prontas. Consulte a seção [análise de vídeos](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md) (link em inglês) para ver mais informações.

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>Obrigatório se nenhum filho de <code>&lt;source&gt;</code> estiver presente. Precisa ser HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>A imagem do frame a ser exibida antes do início da reprodução do vídeo. Por padrão, o primeiro frame é exibido.
      <br>
        Como alternativa, você pode apresentar uma sobreposição de reprodução com um clique. Para mais detalhes, consulte abaixo a seção <a href="#click-to-play-overlay">Sobreposição de reprodução com um clique</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay</strong></td>
        <td>Se este atributo estiver presente e o navegador for compatível com a reprodução automática, o vídeo será iniciado automaticamente assim que ficar visível. Há algumas condições que o componente precisa atender para ser reproduzido, <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-video-interface.md#autoplay">descritas na especificações de vídeo em AMP</a> (link em inglês).</td>
      </tr>
      <tr>
        <td width="40%"><strong>controls</strong></td>
        <td>Este atributo é semelhante ao atributo <code>controls</code> no <code>video</code> HTML5. Se o atributo estiver presente, o navegador oferecerá controles para que o usuário utilize na reprodução do vídeo.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controlsList</strong></td>
        <td>Igual ao atributo <a href="https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> do elemento de vídeo HTML5. Compatível apenas com alguns navegadores. Consulte <a href="https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList</a> (link em inglês) para ver mais detalhes.</td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Requer a extensão <code>amp-video-docking</code>.</strong> Se o atributo estiver presente e o vídeo for reproduzido manualmente, o vídeo será "minimizado" e fixado a um canto ou elemento quando o usuário rolar para fora da área visual do componente de vídeo.
            Para mais detalhes, consulte a <a href="amp-video-docking.md">documentação sobre a extensão de âncora</a> (link em inglês).</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop</strong></td>
          <td>Se presente, o vídeo voltará automaticamente ao início quando chegar ao fim.</td>
        </tr>
        <tr>
          <td width="40%"><strong>crossorigin</strong></td>
          <td>Obrigatório se um recurso <code>track</code> estiver hospedado em uma origem diferente do documento.</td>
        </tr>
        <tr>
          <td width="40%"><strong>disableremoteplayback</strong></td>
          <td>Determina se o elemento de mídia pode ter uma IU de reprodução remota, como Chromecast ou AirPlay.</td>
        </tr>
        <tr>
          <td width="40%"><strong>muted (obsoleto)</strong></td>
          <td>O atributo <code>muted</code> está obsoleto e não tem mais efeito. O atributo <code>autoplay</code> controla automaticamente o comportamento de desativar o som.</td>
        </tr>
        <tr>
          <td width="40%"><strong>noaudio</strong></td>
          <td>Anota o vídeo como não tendo áudio. Isso oculta o ícone do equalizador que é exibido quando o vídeo tem reprodução automática.</td>
        </tr>
        <tr>
          <td width="40%"><strong>rotate-to-fullscreen</strong></td>
          <td>Se o vídeo estiver visível, ele será exibido em tela cheia depois que o usuário girar o dispositivo para o modo paisagem. Para ver mais detalhes, consulte as <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-video-interface.md#rotate-to-fullscreen">especificações de vídeo em AMP</a> (link em inglês).</td>
        </tr>
        <tr>
          <td width="40%"><strong>common attributes</strong></td>
          <td>Este elemento inclui <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comuns</a> estendidos a componentes de AMP.</td>
        </tr>
      </table>

## Atributos da API Media Session <a name="media-session-api-attributes"></a>

O componente `amp-video` implementa a [API Media Session](https://developers.google.com/web/updates/2017/02/media-session), que permite aos desenvolvedores especificar mais informações sobre o arquivo de vídeo. As outras informações do vídeo são exibidas na central de notificações do dispositivo do usuário (junto com os controles de reprodução/pausa).

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>Especifica um URL para uma imagem PNG/JPG/ICO que atua como a arte do vídeo. Se `artwork` não estiver presente, o assistente da API Media Session usará o campo` image` na definição de `schema.org`, `og:image` ou `favicon` do site.</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>Indica o autor do arquivo de vídeo, especificado como uma string.</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>Indica o álbum/coleção de onde o vídeo foi retirado, especificado como uma string.</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>Indica o nome/título do vídeo, especificado como uma string. Se não for fornecido, o assistente da API Media Session usará o atributo `aria-label` ou voltará para o título da página.</td>
  </tr>
</table>

Exemplo:

Este exemplo contém os atributos `poster` e `artwork`. O `poster` atua como a imagem do marcador antes da reprodução do vídeo, enquanto o `artwork` é a imagem exibida na notificação por meio da API Media Session.

```html
<amp-video width="720" height="305" layout="responsive"
    src="https://yourhost.com/videos/myvideo.mp4"
    poster="https://yourhost.com/posters/poster.png"
    artwork="https://yourhost.com/artworks/artwork.png"
    title="Awesome video" artist="Awesome artist"
    album="Amazing album">
</amp-video>
```

## Sobreposição de reprodução com um clique <a name="click-to-play-overlay"></a>

O fornecimento de uma sobreposição de reprodução com um clique é um recurso comum de UX para players de vídeo na Web.  Por exemplo, você pode exibir um ícone de reprodução personalizado em que o usuário pode clicar, bem como incluir o título do vídeo, imagens de pôster de diferentes tamanhos etc.  Como o componente `amp-video` é compatível com a ação padrão de AMP `play`, é possível implementar facilmente a reprodução com um clique.

Para um exemplo detalhado, acesse [Sobreposição de reprodução com um clique para amp-video](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/) no site AMP By Example.

## Validação <a name="validation"></a>

Consulte as [regras do amp-video](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) (link em inglês) na especificação do validador de AMP.

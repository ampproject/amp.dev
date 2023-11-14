---
$title: amp-youtube
$category@: media
teaser:
  text: Exibe um vídeo do YouTube.
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



Exibe um vídeo do [YouTube](https://www.youtube.com/).

<table>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemplos</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">Exemplo de código com notas para amp-youtube</a></td>
  </tr>
</table>

## Exemplo <a name="example"></a>

Com o layout responsivo, a largura e a altura do exemplo geram layouts corretos para vídeos com proporção de 16:9:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
  [/sourcecode]

  [sourcecode:html]
  <amp-youtube
      id="myLiveChannel"
      data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
      width="358"
      height="204"
      layout="responsive">
    <amp-img
      src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
      placeholder
      layout="fill"
      />
  </amp-youtube>
  [/sourcecode]

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>Se este atributo estiver presente e o navegador for compatível com a reprodução automática:
      <ul>
        <li>o vídeo será silenciado automaticamente antes do início da reprodução automática;
        </li>
        <li>quando o vídeo for rolado para fora da visualização, o ele será pausado;
        </li>
        <li>quando o vídeo for rolado para dentro da visualização, a reprodução será retomada;
        </li>
        <li>quando o usuário tocar no vídeo, o áudio será ativado;
        </li>
        <li>se o usuário tiver interagido com o vídeo (por exemplo, desativar/ativar som, pausar/retomar etc.), e o vídeo for rolado para dentro ou fora da visualização, o estado dele permanecerá como o usuário o deixou. Por exemplo, se o usuário pausar o vídeo, depois rolá-lo para fora da visualização e retornar para ele, o vídeo continuará pausado.
        </li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-videoid</strong></td>
      <td>O ID do vídeo do YouTube encontrado em todos os URLs de páginas de vídeo desse serviço.
          Por exemplo, no URL https://www.youtube.com/watch?v=Z1q71gFeRqM, <code>Z1q71gFeRqM</code> é o ID do vídeo.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-live-channelid</strong></td>
        <td>O ID do canal do YouTube que fornece um URL estável de transmissão ao vivo. Por exemplo, no URL https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q, <code>UCB8Kb4pxYzsDsHxzBfnid4Q</code> é o ID do canal. Você pode fornecer um atributo <code>data-live-channelid</code>, em vez de <code>data-videoid</code>, para incorporar um URL estável para uma transmissão ao vivo, e não de um vídeo. Os canais não vêm com os marcadores padrão. Você pode fornecer um marcador para o vídeo, conforme o exemplo 2 acima.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-param-*</strong></td>
        <td>Todos os atributos <code>data-param-*</code> serão adicionados como parâmetros de consulta ao src de iframe do YouTube. Isso pode ser usado para transmitir valores personalizados por meio de plug-ins do YouTube, como, por exemplo, para definir se os controles serão exibidos ou não.
            As chaves e os valores serão codificados na URI. As chaves serão em CamelCase.
            <ul>
            <li>`data-param-controls=1` se transforma em `&amp;controls=1`</li>
          </ul>
          Consulte <a href="https://developers.google.com/youtube/player_parameters">Parâmetros do player incorporado do YouTube</a> para ver mais opções de parâmetros do YouTube.
        </td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Requer a extensão <code>amp-video-docking</code>.</strong> Se esse atributo estiver presente e o vídeo estiver sendo reproduzido manualmente, o vídeo será minimizado e fixado em um canto ou elemento quando o usuário rolar para fora da área visual do componente de vídeo.
            Para mais detalhes, consulte a <a href="amp-video-docking.md">documentação sobre a extensão de âncora</a> (link em inglês).</td>
        </tr>
        <tr>
          <td width="40%"><strong>credentials (opcional)</strong></td>
          <td>Define uma opção de <code>credentials</code>, conforme especificado pela <a href="https://fetch.spec.whatwg.org/">API Fetch</a>.
            <ul>
              <li>Valores aceitos: `omit`, `include`</li>
              <li>Padrão: `include`</li>
            </ul>
            Se você quer usar o <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">player do YouTube no modo de privacidade aprimorada</a>, passe o valor de <code>omit</code>.
            Normalmente, o YouTube define os cookies quando o player é carregado. No modo de privacidade aprimorada, os cookies são definidos quando o usuário clica no player.</td>
          </tr>
          <tr>
            <td width="40%"><strong>common attributes</strong></td>
            <td>Este elemento inclui <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comuns</a> estendidos a componentes de AMP.</td>
          </tr>
        </table>

## Validação <a name="validation"></a>

Consulte as [regras do amp-youtube](https://github.com/ampproject/amphtml/blob/main/extensions/amp-youtube/validator-amp-youtube.protoascii) (link em inglês) nas especificações do validador de AMP.
,false,false

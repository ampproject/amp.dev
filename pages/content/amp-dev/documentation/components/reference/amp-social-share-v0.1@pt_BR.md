---
$title: amp-social-share
$category@: ads-analytics
teaser:
  text: O recurso de rastreamento de compartilhamento está sendo desenvolvido.
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



Exibe um botão de compartilhamento social.


<table>
  <tr>
    <td class="col-fourty"><strong>Script obrigatório</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td>Veja o exemplo de <a href="https://ampbyexample.com/components/amp-social-share/">amp-social-share</a> no site AMP By Example.</td>
  </tr>
</table>

## Visão geral <a name="overview"></a>

O componente `amp-social-share` exibe um botão de compartilhamento social para vários provedores de plataformas sociais.

## Exemplos <a name="examples"></a>

**Exemplo: botão de compartilhamento social básico**

O botão de compartilhamento adivinha alguns padrões para alguns provedores pré-configurados. Ele presume que o URL canônico do documento atual é o URL que você quer compartilhar e que o título da página é o texto que você quer compartilhar.

```html
<amp-social-share type="twitter"></amp-social-share>
```

**Exemplo: transmissão de parâmetros**

Quando você quiser transmitir parâmetros para o endpoint de compartilhamento, pode especificar o `data-param-<attribute>` que será anexado ao endpoint.
```html
<amp-social-share type="linkedin" width="60" height="44"
    data-param-text="Hello world"
    data-param-url="https://example.com/">
</amp-social-share>
```

O LinkedIn é um dos provedores pré-configurados, então não é necessário fornecer o atributo `data-share-endpoint`.

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (obrigatório)</strong></td>
    <td>Seleciona um tipo de provedor. É necessário para provedores pré-configurados e não configurados.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>Especifica o destino em que será aberto. O padrão é <code>&#95;blank</code> para todos os casos, exceto e-mail/SMS no iOS, em que o destino é definido como <code>&#95;top</code>.
        Sugerimos que você use essa modificação apenas para e-mails.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-share-endpoint</strong></td>
      <td>Este atributo é <strong>obrigatório para provedores não configurados</strong>.
        <br>
          Alguns provedores mais usados têm endpoints de compartilhamento pré-configurados. Para mais detalhes, consulte a seção <a href="#pre-configured-providers">Provedores pré-configurados</a>. Para provedores não configurados, é necessário especificar o endpoint de compartilhamento.</td>
        </tr>
        <tr>
          <td width="40%"><strong>data-param-*</strong></td>
          <td>Todos os atributos <code>data-param-*</code> pré-fixados são transformados em parâmetros de URL e transmitidos ao endpoint de compartilhamento.</td>
        </tr>
      </table>

## Provedores pré-configurados <a name="pre-configured-providers"></a>

O componente `amp-social-share` fornece [alguns provedores pré-configurados](0.1/amp-social-share-config.js) que identificam os respectivos endpoints de compartilhamento, bem como alguns parâmetros padrão.

<table>
  <tr>
    <th class="col-twenty">Provedor</th>
    <th class="col-twenty">Tipo</th>
    <th>Parâmetros</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">API Web Share</a> (aciona a caixa de diálogo de compartilhamento do sistema operacional)</td>
    <td><code>system</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: opcional, o padrão é "Título da página atual".</li>
        <li><code>data-mode</code>: opcional. Se for definido como <code>replace</code>, todas as outras opções de compartilhamento serão removidas.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>E-mail</td>
    <td><code>email</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code>: opcional, o padrão é: Título da página atual.</li>
        <li><code>data-param-body</code>: opcional, o padrão é: URL <code>rel=canonical</code>.</li>
        <li><code>data-param-recipient</code>: opcional, o padrão é: '' (string vazia).</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code>: <strong>obrigatório</strong>, o padrão é: none. Este parâmetro é o <code>app_id</code> do Facebook, que é obrigatório para a <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">caixa de diálogo de compartilhamento do Facebook</a>.</li>
        <li><code>data-param-href</code>: opcional, o padrão é: URL <code>rel=canonical</code>.</li>
        <li><code>data-param-quote</code>: opcional. Pode ser usado para compartilhar uma citação ou um texto.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: opcional, o padrão é: URL <code>rel=canonical</code>.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code>: opcional (mas recomendamos que seja definido), o padrão é: none. URL para a mídia ser compartilhada no Pinterest. Se não for definido, será solicitado que o usuário final faça upload de uma mídia pelo Pinterest.</li>
        <li><code>data-param-url</code>: opcional, o padrão é: URL <code>rel=canonical</code>.</li>
        <li><code>data-param-description</code>: opcional, o padrão é: Título da página atual.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>G+</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: opcional, o padrão é: URL <code>rel=canonical</code>.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: opcional, o padrão é: URL <code>rel=canonical</code>.</li>
        <li><code>data-param-text</code>: opcional, o padrão é: Título da página atual.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: opcional, o padrão é: URL <code>rel=canonical</code>.</li>
        <li><code>data-param-text</code>: opcional, o padrão é: Título da página atual.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>WhatsApp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: opcional, o padrão é: "Título da página atual - URL da página atual".</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: opcional, o padrão é: URL <code>rel=canonical</code>.</li>
        <li><code>data-param-text</code>: opcional, o padrão é: Título da página atual.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SMS</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code>: opcional, o padrão é: URL <code>rel=title - rel=canonical</code>.</li></ul>
      </td>
    </tr>
  </table>

## Provedores não configurados <a name="non-configured-providers"></a>

Além dos provedores pré-configurados, é possível usar provedores não configurados especificando outros atributos no componente `amp-social-share`.

**Exemplo: criar um botão de compartilhamento para um provedor não configurado**

O exemplo a seguir cria um botão de compartilhamento no Facebook Messenger, definindo o atributo `data-share-endpoint` como o endpoint correto para o protocolo personalizado do Facebook Messenger.

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

Como esses provedores não são pré-configurados, será necessário criar a imagem e os estilos de botão adequados para o provedor.

## Estilos <a name="styles"></a>

### Estilos padrão <a name="default-styles"></a>

Por padrão, o `amp-social-share` inclui alguns provedores pré-configurados mais usados. Os botões desses provedores são estilizados com a cor e o logotipo oficiais do provedor. A largura padrão é de 60 px, e a altura padrão é de 44 px.

[tip type="success"]
acesse o [AMP Start](https://ampstart.com/components#links-and-sharing) para ver links de compartilhamento responsivos e pré-estilizados que você pode usar nas suas páginas AMP.
[/tip]

### Estilos personalizados <a name="custom-styles"></a>

Às vezes, você quer aplicar seu próprio estilo. Você pode simplesmente modificar os estilos fornecidos, como os seguintes:
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## Substituição de variável <a name="variable-substitution"></a>

Você pode usar a [substituição global de variáveis AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) (link em inglês) no elemento `<amp-social-share>`. No exemplo abaixo, `TITLE` é substituído pelo título da página e `CANONICAL_URL` pelo URL canônico do documento.

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## Validação <a name="validation"></a>

Consulte as [regras do amp-social-share](https://github.com/ampproject/amphtml/blob/main/extensions/amp-social-share/validator-amp-social-share.protoascii) (link em inglês) na especificação do validador de AMP.

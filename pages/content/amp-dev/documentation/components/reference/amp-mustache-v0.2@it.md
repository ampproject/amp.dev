---
$title: amp-mustache
$category@: dynamic-content
teaser:
  text: consente il rendering dei modelli Mustache.js.
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



Consente il rendering di [Mustache.js](https://github.com/janl/mustache.js/).

<table>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Esempi</strong></td>
    <td>Vedi l'esempio di <a href="https://ampbyexample.com/components/amp-mustache/">amp-mustache annotato</a> di AMP By Example.</td>
  </tr>
</table>


## Note sulla versione <a name="version-notes"></a>

| Versione | Descrizione |
|-------|-----|
| 0.2 | Supporto per gli elementi `<svg>` e riduzione delle dimensioni dei gruppi (12,2 KB rispetto a 20,5 KB, compressione con gzip).<br><br>Esegue la migrazione a una più moderna libreria di strumenti di pulizia HTML (da Caja a DOMPurify). Per questo motivo, a causa delle differenze nelle allowlist di attributi e tag, potrebbero verificarsi lievi modifiche che provocano interruzioni. Ti consigliamo di verificare le pagine prima di passare alla produzione, per assicurarti che le modifiche al markup generato non influiscano sulla funzionalità. |
| 0.1 | Implementazione iniziale. |

## Sintassi <a name="syntax"></a>

Mustache è una sintassi template che non utilizza la logica. Per ulteriori informazioni, consulta i [documenti di Mustache.js](https://github.com/janl/mustache.js/). Di seguito sono riportati alcuni dei principali tag Mustache:

* {% raw %}`{{variable}}`{% endraw %}: tag variabile. Restituisce il valore di escape HTML di una variabile.
*  {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: tag di sezione. Può verificare l'esistenza di una variabile e scorrerla se si tratta di un array.
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: tag invertito. Può verificare la non esistenza di una variabile.
* {% raw %}`{{{unescaped}}}`{% endraw %}: HTML non escape. È limitato nel markup che potrebbe restituire (vedi "Restrizioni" di seguito).

## Utilizzo <a name="usage"></a>

Il modello `amp-mustache` deve essere definito e utilizzato secondo le [specifiche del modello AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-templates.md).

In primo luogo, `amp-mustache` deve essere dichiarato/caricato come segue:

```html
<script src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js" async="" custom-template="amp-mustache"></script>
```

I modelli Mustache possono essere quindi definiti in un tag 'script' o 'template' come questo:

[sourcecode:html]
{% raw %}<!-- Using template tag. -->
<template type="amp-mustache">
  Hello {{world}}!
</template>
{% endraw %}[/sourcecode]
oppure

<!-- Using script tag. -->
[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  Hello {{world}}!
</script>
{% endraw %}[/sourcecode]

Dove possibile, utilizza il tag `template`, poiché la convalida AMP fornisce utili suggerimenti dev-x. Utilizza il modello `script` per casi limite e problemi relativi ai modelli nel contesto delle tabelle. Consulta la sezione "Tabelle" di seguito.

Il modo in cui vengono scoperti i modelli, quando ne viene effettuato il rendering, come vengono forniti i dati: tutto viene deciso dall'elemento AMP target, che utilizza questo modello per renderizzarne i contenuti (ad esempio in un [amp-list](amp-list.md), [amp-form](amp-form.md) e così via).

## Restrizioni <a name="restrictions"></a>

### Convalida <a name="validation"></a>

Come tutti i modelli AMP, i template `amp-mustache` devono essere frammenti DOM ben strutturati. Ciò significa che non puoi utilizzare `amp-mustache`, ad esempio, per:

* Calcolare il nome del tag. Ad esempio, {% raw %}`<{{tagName}}>`{% endraw %} non è consentito.
* Calcolare il nome dell'attributo. Ad esempio, {% raw %}`<div {{attrName}}=something>`{% endraw %} non è consentito.

L'output di "triple-mustache" è purificato e consente solo i seguenti tag: `a`, `b`, `br`, `caption`, `colgroup`, `code`, `del`, `div`, `em`, `i`, `ins`, `li`, `mark`, `ol`, `p`, `q`, `s`, `small`, `span`, `strong`, `sub`, `sup`, `table`, `tbody`, `time`, `td`, `th`, `thead`, `tfoot`, `tr`, `u`, `ul`.

### Purificazione <a name="sanitization"></a>

L'output di Mustache viene purificato per motivi di sicurezza e per mantenere la validità AMP. Ciò potrebbe comportare la rimozione non segnalata di alcuni elementi e attributi.

## Problematiche <a name="pitfalls"></a>

### Modelli nidificati <a name="nested-templates"></a>

Per la convalida AMP, gli elementi `<template>` non devono essere secondari di altri elementi `<template>`. Ciò potrebbe verificarsi quando si nidificano due componenti che utilizzano modelli, ad esempio `amp-list` e `amp-form`.

Per risolvere il problema, gli elementi `<template>` possono anche essere indicati tramite `id` mediante l'attributo `template` sul componente. Ad esempio:

[sourcecode:html]
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}[/sourcecode]

Può anche essere rappresentato come:

[sourcecode:html]
{% raw %}<!-- Externalize templates to avoid nesting. -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}[/sourcecode]

### Tabelle <a name="tables"></a>

Poiché le stringhe del modello AMP devono essere specificate negli elementi `<template>`, può verificarsi un comportamento imprevisto dovuto all'analisi del browser. Ad esempio, gli elementi `<table>` possono causare l'[associazione con un elemento padre](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables) del testo. Nel seguente esempio:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</template>
{% endraw %}[/sourcecode]


Il browser creerà un'associazione con un elemento padre dei nodi di testo {% raw %}`{{#foo}}`{% endraw %} e {% raw %}`{{/foo}}`{% endraw %}:

[sourcecode:html]
{% raw %}{{#foo}}
{{/foo}}
<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}[/sourcecode]

Le soluzioni alternative includono il ritorno a capo automatico delle sezioni Mustache nei commenti HTML (ad esempio {% raw %}`<!-- {{#bar}} -->`{% endraw %}), l'uso di elementi non appartenenti a tabelle come `<div>` o l'uso di un tag `<script type="text/plain">` per definire i modelli.

[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</script>
{% endraw %}[/sourcecode]

### Escape delle virgolette <a name="quote-escaping"></a>

Quando utilizzi `amp-mustache` per calcolare i valori degli attributi, l'escape delle virgolette può essere un problema. Ad esempio:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <!-- A double-quote (") in foo will cause malformed HTML. -->
  <amp-img alt="{{foo}}" src="example.jpg" width=100 height=100></amp-img>

  <!-- A single-quote (') or double-quote (") in bar will cause an AMP runtime parse error. -->
  <button on="tap:AMP.setState({foo: '{{bar}}'})">Click me</button>
</template>
{% endraw %}[/sourcecode]

L'uso di codici di caratteri HTML nelle variabili  {% raw %}`{{foo}}`{% endraw %} o {% raw %}`{{bar}}`{% endraw %} non funzionerà perché Mustache imposta come escape HTML i caratteri `&amp;` (ad esempio `&quot;` -&gt; `&amp;quot;`). Una soluzione alternativa consiste nell'utilizzo di caratteri facsimile, ad esempio ' (`&prime;`) e " (`&Prime;`).

Esiste invece una [proposta aperta](https://github.com/ampproject/amphtml/issues/8395) per eseguire questa sostituzione in `amp-mustache`. Se vuoi sostenerla, scrivi un commento a riguardo.

### Entità HTML <a name="html-entities"></a>

Le entità HTML non vengono mantenute negli elementi `<template>`.

Questo può essere un problema se vuoi eseguire il rendering lato server di un `<template>` contenente testo generato dall'utente, poiché il testo generato dall'utente contenente {% raw %} `{{`, `}}`, `{{{`, `}}}` {% endraw %} verrà trattato come una sezione di Mustache. Ad esempio, sostituire {% raw %} `{{` {% endraw %} con le entità HTML `&lcub;&lcub;` non funzionerà, perché queste non vengono mantenute quando il browser analizza il `<template>`.

Le soluzioni alternative includono la sostituzione di stringhe come {% raw %} `{{` {% endraw %} con caratteri diversi o l'eliminazione definitiva dai contenuti generati dall'utente.

## Convalida <a name="validation-1"></a>

Consulta le [regole amp-mustache](https://github.com/ampproject/amphtml/blob/main/extensions/amp-mustache/validator-amp-mustache.protoascii) nella specifica dello strumento di convalida AMP.

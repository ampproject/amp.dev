---
$title: amp-animation
$category@: presentation
teaser:
  text: definisce e visualizza un'animazione.
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



Definisce ed esegue animazioni.

<table>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/main/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>


## Panoramica <a name="overview"></a>

Le animazioni AMP si basano sulle [API delle animazioni web](https://www.w3.org/TR/web-animations/) per definire ed eseguire animazioni nei documenti AMP.

## Formato <a name="format"></a>

Un elemento `amp-animation` definisce tale animazione come una struttura JSON.

### Specifiche dell'animazione di livello superiore <a name="top-level-animation-specification"></a>

L'oggetto di livello superiore definisce un processo di animazione generale costituito da un numero arbitrario di componenti di animazione
definiti come un `animations array`:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  // Timing properties
  ...
  "animations": [
    {
      // Animation 1
    },
    ...
    {
      // Animation N
    }
  ]
}
</script>
</amp-animation>
```

### Posizionamento in DOM <a name="placement-in-dom"></a>

`<amp-animation>` può essere posizionato solo come elemento secondario diretto di `<body>` se `trigger="visibility"`. Se `trigger` non viene specificato e la riproduzione dell'animazione viene controllata a livello di programmazione tramite le sue azioni, può essere posizionata ovunque in DOM.

### Componenti dell'animazione <a name="animation-component"></a>

Ogni componente dell'animazione è un [keyframes effect](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect)
e consiste di:

- elementi target citati da un selettore
- condizioni: media query e condizione supporti
- proprietà di temporizzazione
- fotogrammi chiave

```text
{
  "selector": "#target-id",
  // Conditions
  // Variables
  // Timing properties
  // Subtargets
  ...
  "keyframes": []
}
```

### Condizioni <a name="conditions"></a>

Le condizioni specificano se un determinato componente dell'animazione è incluso nell'animazione finale.

#### Media query <a name="media-query"></a>

La media query può essere specificata utilizzando la proprietà `media` . Questa proprietà può contenere qualsiasi espressione consentita per
l'API di [Window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) e corrisponde alla regola CSS `@media`.

Se viene specificato un valore per un componente dell'animazione, questo verrà incluso solo se
la media query corrisponderà all'ambiente corrente.

#### Condizione supporti <a name="supports-condition"></a>

La condizione supporti può essere specificata utilizzando la proprietà `supports`. La proprietà può contenere qualsiasi espressione consentita per l'API di [CSS.supports](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) e corrisponde alla regola CSS `@supports`.

Se viene specificato un valore per un componente dell'animazione, quest'ultimo verrà incluso solo se
la condizione supporti corrisponderà all'ambiente corrente.

### Istruzione di animazione `switch` <a name="animation-switch-statement"></a>

In alcuni casi è conveniente combinare in una singola animazione più [animazioni condizionali](#conditions) con un valore predefinito facoltativo. Questa operazione può essere eseguita utilizzando l'istruzione `switch` in questo formato:

```

  // Optional selector, vars, timing
  ...
  "switch": [
    {
      "media": "(min-width: 320px)",
      "keyframes": {...},
    },
    {
      "supports": "offset-distance: 0",
      "keyframes": {...},
    },
    {
      // Optional default: no conditionals
    }
  ]
}
```

Nell'animazione `switch`, i candidati vengono valutati nell'ordine definito e viene eseguita la prima animazione corrispondente alle [istruzioni condizionali](#conditions), mentre il resto viene ignorato.

Ad esempio, questa animazione esegue l'animazione del percorso di movimento, se supportata, e torna alla trasformazione:
```
{
  "selector": "#target1",
  "duration": "1s",
  "switch": [
    {
      "supports": "offset-distance: 0",
      "keyframes": {
        "offsetDistance": [0, '300px']
      }
    },
    {
      "keyframes": {
        "transform": [0, '300px']
      }
    }
  ]
}
```

### Variabili <a name="variables"></a>

Un componente dell'animazione può dichiarare le variabili CSS che verranno utilizzate per i valori di timing e fotogrammi chiave tramite espressioni `var()`. Le espressioni `var()` vengono valutate utilizzando il contesto di target corrente. Le variabili CSS specificate nei componenti dell'animazione vengono propagate ad animazioni nidificate, applicate ai target di animazione e quindi sostituite dalle variabili CSS utilizzate nelle animazioni finali.

Ad esempio:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "--delay": "0.5s",
  "--x": "100px",
  "animations": [
    {
      "selector": "#target1",
      "delay": "var(--delay)",
      "--x": "150px",
      "keyframes": {"transform": "translate(var(--x), var(--y, 0px)"}
    },
    ...
  ]
}
</script>
</amp-animation>
```

In questo esempio:

  - `--delay` viene propagato in animazioni nidificate e utilizzato come un ritardo dell'animazione `#target1`.
  - `--x` viene propagato in animazioni nidificate ma sostituito dall'animazione `#target1` e utilizzato in seguito per la proprietà `transform`.
  - `--y` non è specificato in `<amp-animation>` e diventerà quindi un oggeto della query sull'elemento `#target1`. Il valore predefinito è `0px` se non definito in CSS.

  Per ulteriori informazioni su `var()`, consulta la sezione [`var()` e `calc()`](#var-and-calc-expressions).

### Proprietà di temporizzazione <a name="timing-properties"></a>

Animazioni di livello superiore e i componenti dell'animazione possono avere proprietà di temporizzazione. Queste proprietà sono definite in dettaglio in
[AnimationEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties) delle specifiche della Web Animation. Il set delle proprietà consentite qui include:

<table>
  <tr>
    <th class="col-twenty">Proprietà</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-twenty">Predefinito</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>ora</td>
    <td>0</td>
    <td>Durata dell'animazione. Indicata con un valore numerico in millisecondi o un valore numerico CSS, ad esempio '2s'.</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>ora</td>
    <td>0</td>
    <td>Il ritardo prima della riproduzione di un'animazione. Indicato con un valore numerico in millisecondi o un valore numerico CSS, ad esempio '2s'.</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>ora</td>
    <td>0</td>
    <td>Il ritardo dopo il completamento dell'animazione e prima che sia effettivamente considerata completa Indicato con un valore numerico in millisecondi o un valore numerico CSS, ad esempio '2s'.</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>numero o<br>"illimitato" o<br>"infinito"</td>
    <td>1</td>
    <td>Il numero di volte in cui l'effetto di animazione si ripete.</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>numero/CSS</td>
    <td>0</td>
    <td>Il punto di corrispondenza in cui inizia l'animazione dell'effetto.</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>string</td>
    <td>"lineare"</td>
    <td>La <a href="https://www.w3.org/TR/web-animations/#timing-function">funzione di temporizzazione</a> utilizzata per ridimensionare il tempo necessario per produrre effetti di andamento.</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>string</td>
    <td>"normale" </td>
    <td>Indicato con "normale", "inversa", "alternata" o "alternata-inversa".</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>string</td>
    <td>"nessuno"</td>
    <td>Indicato con "nessuno", "in avanti", "indietro", "entrambi", "automatico".</td>
  </tr>
</table>

Tutte le proprietà di temporizzazione possono essere indicate con valori diretti numerici/stringa o valori CSS. Ad esempio, "durata" può essere specificato con `1000` o `1s` o `1000ms`. Inoltre, sono consentite anche `calc()` `var()` e altre espressioni CSS.

Un esempio delle proprietà di temporizzazione in JSON:
```text
{
  ...
  "duration": "1s",
  "delay": 100,
  "endDelay": "var(--end-delay, 10ms)",
  "easing": "ease-in",
  "fill": "both"
  ...
}
```

I componenti dell'animazione ereditano le proprietà di temporizzazione specificate per l'animazione di livello superiore.

### Target secondari <a name="subtargets"></a>

Ovunque sia possibile specificare il `selector`, è possibile specificare anche i `subtargets: []`. I target secondari possono sostituire le proprietà di temporizzazione o le variabili definite nell'animazione per determinati target secondari segnalati tramite un indice o un selettore CSS.

Ad esempio:
```text
{
  "selector": ".target",
  "delay": 100,
  "--y": "100px",
  "subtargets": [
    {
      "index": 0,
      "delay": 200,
    },
    {
      "selector": ":nth-child(2n+1)",
      "--y": "200px"
    }
  ]
}
```

In questo esempio, per impostazione predefinita, tutti i target che corrispondono a ".target" hanno un ritardo di 100ms e "--y" di 100px. Tuttavia, il primo target (`index: 0`) viene sostituito per ottenere un ritardo di 200ms e i target dispari vengono sostituiti per ottenere "--y" di 200 px.

Tieni presente che più target secondari possono corrispondere a un solo elemento target.

### Fotogrammi chiave <a name="keyframes"></a>

I fotogrammi chiave possono essere specificati in diversi modi descritti nella sezione [fotogrammi chiave](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) delle specifiche delle Animazioni web o come una stringa che fa riferimento al nome `@keyframes` nel CSS.

Di seguito sono riportati alcuni esempi tipici di definizioni di fotogrammi chiave.

Il formato notazione oggetto in forma abbreviata "to" specifica lo stato finale sul 100%:
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

Il formato notazione oggetto in forma abbreviata "from-to" "specifica gli stati iniziale e finale su 0 e 100%:
```text
{
  "keyframes": {
    "opacity": [1, 0],
    "transform": ["scale(1)", "scale(2)"]
}
}
```

Il formato notazione oggetto in forma abbreviata "value-array" specifica più valori per l'avvio, gli stati finali e gli offset multipli (con spaziatura uguale):
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
    "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
  }
}
```

Il formato matrice specifica i fotogrammi chiave. Gli offset vengono assegnati automaticamente a 0, 100% e distribuiti in modo uniforme nell'intervallo:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Il formato matrice può anche includere "offset" esplicitamente:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
{"opacity": 0, "transform": "scale(3)"}
]
}
```

Il formato matrice può anche includere "easing":
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Per ulteriori formati di fotogrammi chiave, consulta le [specifiche sulle animazioni web](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument).

I valori delle proprietà consentono qualsiasi valore CSS valido, inclusi `calc()`, `var()` e altre espressioni CSS.

#### Fotogrammi chiave da CSS <a name="keyframes-from-css"></a>

Un altro modo per specificare i fotogrammi chiave si trova nel foglio di stile del documento (tag `<style>`) come regola CSS `@keyframes`. Ad esempio:
```html
<style amp-custom>
  @keyframes keyframes1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<amp-animation layout="nodisplay">
<script type="application/json">
{
  "duration": "1s",
  "keyframes": "keyframes1"
}
</script>
</amp-animation>
```

I `@keyframes` CSS sono per lo più equivalenti alla definizione di fotogrammi chiave incorporati in JSON per le [specifiche sulle animazioni web](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument).Tuttavia, ci sono alcune piccole differenze:

  - per essere supportati su più piattaforme, per i prefissi dei fornitori, potrebbero essere necessari `@-ms-keyframes {}` o `-moz-transform`, ad esempio. I prefissi dei fornitori non sono necessari e non sono consentiti nel formato JSON, ma potrebbero essere necessari in CSS.
  - Le piattaforme che non supportano `calc()` e `var()` non saranno in grado di utilizzare polyfill di `amp-animation` quando i fotogrammi chiave sono specificati in CSS. Pertanto, ti consigliamo di includere sempre valori di riserva nel CSS.
  - Le estensioni CSS come [`width()`, `height()`, `num()`, `rand()`, `index()` e `length()`](#css-extensions) non possono essere utilizzate in CSS.

#### Proprietà autorizzate per i fotogrammi chiave <a name="allow-listed-properties-for-keyframes"></a>

Non tutte le proprietà CSS possono essere utilizzate nei fotogrammi chiave. Sono autorizzate solo le proprietà CSS che i browser moderni possono ottimizzare e
animare rapidamente. L'elenco delle proprietà autorizzate si allungherà man mano che verranno confermate le proprietà che hanno un buon
rendimento. Al momento le proprietà autorizzate sono:
- [`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
- [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
- [`offset-distance`](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance)

Ti preghiamo di notare che l'utilizzo di proprietà CSS con prefisso fornitore non è necessario né consentito.

### Forme abbreviate di configurazione dell'animazione <a name="abbreviated-forms-of-animation-configuration"></a>

Se l'animazione riguarda solo un singolo elemento ed è sufficiente un solo effetto fotogrammi chiave, la configurazione
può essere ridotta al solo componente di animazione. Ad esempio:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "selector": "#target-id",
  "duration": "1s",
  "keyframes": {"opacity": 1}
}
</script>
</amp-animation>
```

Se l'animazione è composta da un elenco di componenti ma non dispone di un'animazione di livello superiore, la configurazione può essere ridotta a un array di componenti. Ad esempio:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": 1000,
    "keyframes": {"opacity": 1}
  },
  {
    "selector": ".target-class",
    "duration": 600,
    "delay": 400,
    "keyframes": {"transform": "scale(2)"}
  }
]
</script>
</amp-animation>
```

### Composizione dell'animazione <a name="animation-composition"></a>

Le animazioni possono fare riferimento ad altre, combinando così diverse dichiarazioni `amp-animation` in un'unica animazione finale. Il riferimento a un'animazione che proviene da un'altra animazione è molto simile alla nidificazione. Il motivo di suddividere le animazioni in elementi diversi è che consente di riutilizzare la stessa animazione da diversi posti o semplicemente di rendere le dichiarazioni di ogni animazione più piccole e gestibili.

Ad esempio:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

"Questa animazione di esempio combina l'animazione "anim2" come parte di "anim1". "anim2" è inclusa
senza un target (`selector`). In questo caso, si prevede che l'animazione inclusa faccia riferimento al proprio target.

Un altro formato consente l'inclusione dell'animazione per fornire il target o più target. In tal caso, l'animazione
inclusa viene eseguita per ogni target corrispondente. Ad esempio:
```html
  <amp-animation id="anim1" layout="nodisplay">
  <script type="application/json">
  {
    "selector": ".target-class",
    "animation": "anim2",
    "duration": 1000,
    "--scale": 2
  }
  </script>
  </amp-animation>

  <amp-animation id="anim2" layout="nodisplay">
  <script type="application/json">
  {
    "keyframes": {"transform": "scale(var(--scale))"}
  }
  </script>
  </amp-animation>
```

In questo caso, sia che la" ".target-class" corrisponda a un solo elemento, a diversi o a nessuno, viene eseguito "anim2" per ogni target corrispondente.

Anche le variabili e le proprietà di temporizzazione specificate nell'animazione del chiamante vengono inviate all'animazione inclusa.

### Espressioni `var()` e `calc()` <a name="var-and-calc-expressions"></a>

`amp-animation` consente l'utilizzo di espressioni `var()` e `calc()` per i valori di temporizzazione e fotogrammi chiave.

Ad esempio:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay)",
    "--y": "var(--other-y, 100px)",
    "keyframes": {"transform": "translate(calc(100vh + 20px), var(--y))"}
  }
]
</script>
</amp-animation>
```

Sia `var()` che `calc()` eseguono il polyfill su piattaforme che non le supportano direttamente. Le proprietà `var()` vengono estratte dagli elementi target corrispondenti. Tuttavia, purtroppo è impossibile eseguire il polyfill completo di `var()`. Pertanto, quando la compatibilità è importante, ti consigliamo vivamente di includere valori predefiniti nelle espressioni `var()`. Ad esempio:
```html
  <amp-animation layout="nodisplay">
  <script type="application/json">
  [
    {
      "selector": ".target-class",
      "duration": "4s",
      "delay": "var(--delay, 100ms)",
    }
  ]
  </script>
  </amp-animation>
```

I componenti dell'animazione possono specificare le proprie variabili come campi `--var-name`. Queste variabili vengono propagate in animazioni nidificate e sostituiscono le variabili degli elementi target specificati tramite il foglio di stile (tag `<style>`). Le espressioni `var()` cercano innanzitutto di risolvere i valori delle variabili specificati nelle animazioni e quindi di eseguire una query sugli stili di destinazione.

### Estensioni CSS <a name="css-extensions"></a>

`amp-animation` fornisce diverse estensioni CSS per le classiche esigenze di animazione: `rand()`, `num()`, `width()` e `height()`. Queste funzioni possono essere utilizzate ovunque sia possibile utilizzare i valori CSS all'interno di `amp-animation`, inclusi i valori di temporizzazione e dei fotogrammi chiave.

#### Estensione CSS `index()` <a name="css-index-extension"></a>

La funzione `index()` restituisce un indice dell'elemento target corrente nell'effetto di animazione. Ciò è più pertinente quando più target sono animati con lo stesso effetto utilizzando la proprietà `selector`. Il primo target per cui il selettore trova una corrispondenza avrà indice `0`, il secondo `1` e così via.

Tra le altre cose, questa proprietà può essere combinata con le espressioni `calc()` e può essere utilizzata per creare effetti sfalsati. Ad esempio:
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
  }
```

#### Estensione CSS `length()` <a name="css-length-extension"></a>

La funzione `length()` restituisce il numero di elementi target nell'effetto di animazione. Ciò è più pertinente se combinato con `index()`:

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
  }
```

#### Estensione CSS `rand()` <a name="css-rand-extension"></a>

La funzione `rand()` restituisce un valore CSS casuale. Esistono due formati.

Il formato senza argomenti restituisce semplicemente il numero casuale compreso tra 0 e 1.
```
{
  "delay": "calc(10s * rand())"
  }
```

Il secondo formato ha due argomenti e restituisce il valore casuale tra questi due argomenti.
```
{
  "delay": "rand(5s, 10s)"
  }
```

#### Estensioni CSS `width()` e `height()` <a name="css-width-and-height-extensions"></a>

Le estensioni `width()` e `height()` restituiscono la larghezza/altezza dell'elemento animato o dell'elemento specificato dal selettore. Il valore è espresso in pixel, ad esempio `100 px`.

Sono supportati i seguenti formati:

- `width()` e `height()` - larghezza/altezza dell'elemento animato.
- `width('.selector')` e `height('.selector')` - larghezza/altezza dell'elemento specificato dal selettore. È possibile utilizzare qualsiasi selettore CSS. Ad esempio, `width('#container &gt; li')`.
- `width(closest('.selector'))` e `height(closest('.selector'))` - larghezza/altezza dell'elemento specificato dal selettore più vicino.

`width()` e `height()` sono particolarmente utili per le trasformazioni. Le proprietà CSS `left`, `top` e simili che possono utilizzare valori `%` per esprimere animazioni proporzionali alle dimensioni del contenitore. Tuttavia, la proprietà `transform` interpreta diversamente i valori `%`, ovvero come percentuale dell'elemento selezionato. In questo modo, `width()` e `height()` possono essere utilizzate per esprimere animazioni di trasformazione in termini di elementi contenitore e simili.

Queste funzioni possono essere combinate con `calc()`, `var()` e altre espressioni CSS. Ad esempio:
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
  }
```

#### Estensione CSS `num()` <a name="css-num-extension"></a>

La funzione `num()` restituisce una rappresentazione numerica di un valore CSS. Ad esempio:

- `num(11px)` restituisce `11`;
- `num(110ms)` restituisce `110`;
- ecc.

Ad esempio, la seguente espressione calcola il ritardo in secondi proporzionale alla larghezza dell'elemento:
```
{
  "delay": "calc(1s * num(width()) / 100)"
  }
```

### Animazioni SVG <a name="svg-animations"></a>

Gli elementi SVG sono fantastici e consigliamo di utilizzarli per le animazioni.

Le animazioni SVG sono supportate dalle stesse proprietà CSS descritte nell'[elenco delle proprietà autorizzate per i fotogrammi chiave](#allow-listed-properties-for-keyframes) con alcune piccole differenze:

* Gli elementi SVG IE/Edge [non supportano le proprietà `transform` di CSS](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1173754/). L'animazione `transform` stessa è eseguita in polyfill. Tuttavia, lo stato iniziale definito in un foglio di stile non viene applicato. Se lo stato di trasformazione iniziale è importante su IE/Edge, ti consigliamo di duplicarlo tramite l'[attributo SVG `transform`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform).
* Il polyfill di `transform` CSS viene eseguito per IE/Edge, ma purtroppo è impossibile eseguire il polyfill di `transform-origin`. Pertanto, per la compatibilità con IE/Edge, ti consigliamo di utilizzare solo `transform-origin` predefinito.
* Al momento la maggior parte dei browser ha problemi a interpretare correttamente `transform-origin` CSS. Vedi i problemi relativi a [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300), [Safari](https://bugs.webkit.org/show_bug.cgi?id=174285) e [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340). La maggior parte di questi problemi si dovrebbe risolvere una volta implementata la [`transform-box` di CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box). Nei casi in cui `transform-origin` è importante, ti consigliamo di includere anche il CSS della `transform-box` desiderato per una compatibilità futura.

## Attivazione dell'animazione <a name="triggering-animation"></a>

L'animazione può essere attivata tramite un attributo `trigger` o un'azione `on`.

### Attributo `trigger` <a name="trigger-attribute"></a>

Attualmente, `visibility` è l'unico valore disponibile per l'attributo `trigger`. `visibility` si attiva quando il documento sottostante o l'embed sono visibili (nella visualizzazione).

Ad esempio:
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

### Attivazione tramite azione `on` <a name="triggering-via-on-action"></a>

Ad esempio:

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">Animate</button>
```

## Azioni `on` <a name="on-actions"></a>

L'elemento `amp-animation` esporta le seguenti azioni:

* `start`: avvia l'animazione se non è già in esecuzione. Le proprietà e le variabili di temporizzazione
possono essere specificate come argomenti di azione. Ad esempio: `anim1.start(delay=-100, --scale=2)`.
* `restart`: avvia l'animazione o riavvia quella attualmente in esecuzione. Le proprietà e le variabili di temporizzazione
possono essere specificate come argomenti di azione. Ad esempio: `anim1.start(delay=-100, --scale=2)`.
* `pause`: mette in pausa l'animazione attualmente in esecuzione.
* `resume`: riattiva l'animazione attualmente in esecuzione.
* `togglePause`: attiva/disattiva le azioni di messa in pausa/ripristino.
* `seekTo`: mette in pausa l'animazione e cerca il momento specificato dall'argomento `time` in millisecondi o dall'argomento `percent` come punto percentuale nella sequenza temporale.
* `reverse`: inverte l'animazione.
* `finish`: termina l'animazione.
* `cancel`: annulla l'animazione.

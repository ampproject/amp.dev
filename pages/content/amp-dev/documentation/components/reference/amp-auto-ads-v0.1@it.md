---
$title: amp-auto-ads
$category@: ads-analytics
teaser:
  text: Inserisce in modo dinamico gli annunci in una pagina AMP utilizzando un file di configurazione gestito in remoto.
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



Inserisce in modo dinamico gli annunci in una pagina AMP utilizzando un file di configurazione gestito in remoto.

<table>
  <tr>
    <td class="col-fourty"><strong>Disponibilità</strong></td>
    <td>Sperimentale</td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td>
      <code>
      <code>
        &lt;script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">&lt;/script>
      </code>
      </td>
    </tr>
    <tr>
      <td class="col-fourty">
        <strong>
          <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">
            Layout supportati
          </a>
        </strong>
      </td>
      <td>N/D</td>
    </tr>
  </table>


## Comportamento

Dato un numero sufficiente di posizionamenti validi (forniti nella configurazione),
`amp-auto-ads` cerca di inserire annunci aggiuntivi rispettando al contempo una serie di
limitazioni specificate dalla rete pubblicitaria. Queste limitazioni agiscono su:

* Il numero totale di annunci che possono essere inseriti
* La distanza minima tra gli annunci adiacenti

In aggiunta, gli annunci verranno inseriti solo in posizioni della pagina che
non causano una ripetizione flusso inaccettabile, come determinato da attemptChangeSize.

Il tag `<amp-auto-ads>` dovrebbe essere posizionato come primo tag secondario di `<body>`.

Il tipo di rete pubblicitaria e qualsiasi informazione aggiuntiva richiesta dalla rete pubblicitaria
devono essere specificati nel tag.
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">
  </amp-auto-ads>
```

## Reti pubblicitarie supportate <a name="supported-ad-networks"></a>

* [AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [DoubleClick (sperimentale)](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)

## Attributi

<table>
  <tr>
    <td width="40%"><strong>type (obbligatorio)</strong></td>
    <td>Un identificatore per la rete pubblicitaria.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>La maggior parte delle reti pubblicitarie necessita di un'ulteriore configurazione, che può essere trasmessa alla rete tramite attributi <code>data-</code> HTML. I nomi dei parametri sono soggetti alla conversione standard degli attributi dei dati dai trattini alla notazione a cammello. Ad esempio, "data-foo-bar" viene inviato all'annuncio per la configurazione come "fooBar". Consulta la documentazione relativa alla <a href="#supported-ad-networks">rete pubblicitaria</a> in cui possono essere utilizzati gli attributi.</td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>Questo elemento include <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributi comuni</a> estesi ai componenti AMP.</td>
  </tr>
</table>

## Specifica della configurazione

La configurazione definisce in quali aree della pagina `<amp-auto-ads>` può inserire gli annunci. La configurazione viene recuperata da una rete pubblicitaria di terze parti all'URL specificato in `ad-network-config.js`. La configurazione dovrebbe essere un oggetto JSON serializzato che corrisponde alla definizione [`ConfigObj`](#configobj) descritta di seguito.

### Configurazione di esempio

L'esempio seguente specifica che l'annuncio dovrebbe essere posizionato
subito dopo tutti gli elementi `<P class='paragraph'>` all'interno del terzo `<DIV id='domId'>` della pagina. Gli annunci inseriti in questi posizionamenti devono essere del tipo BANNER e avere un margine superiore di 4 px e uno inferiore di 10 px.

```json
{
  "placements": [
    {
      "anchor": {
        "selector": "DIV#domId",
        "index": 2,
        "sub": {
          "selector": "P.paragraph",
          "all": true,
        },
      },
      "pos": 4,
      "type": 1,
      "style": {
        "top_m": 5,
        "bot_m": 10,
      },
    },
  ]
}
```

### Definizioni dell'oggetto

#### ConfigObj <a name="configobj"></a>

I campi da specificare nell'oggetto di configurazione sono i seguenti:

<table>
  <tr>
    <th class="col-thirty">Nome campo</th>
    <th class="col-thirty">Tipo</th>
    <th class="col-fourty">Descrizione</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>Array&lt;!PlacementObj&gt;</td>
    <td>Un campo <strong>obbligatorio</strong> che indica i posizionamenti potenziali all'interno della pagina in cui gli annunci possono essere inseriti.</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;></td>
    <td>Un campo <em>facoltativo</em> che specifica una mappatura dal nome dell'attributo ai valori dell'attributo da applicare a tutti gli elementi <code>&lt;amp-ad&gt;</code> inseriti per mezzo di questa configurazione. Sono consentiti solo i seguenti nomi di attributi:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (ossia qualsiasi attributo dei dati)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>adConstraints</code></td>
    <td>AdConstraintsObj</td>
    <td>
      Un campo <em>facoltativo</em> che specifica le limitazioni da rispettare per l'inserimento di annunci nella pagina. Se non specificato,
      <code>amp-auto-ads</code> tenterà di utilizzare le limitazioni predefinite specificate in [ad-network-config.js](0.1/ad-network-config.js).
      </td>
    </tr>
  </table>

#### PlacementObj

I campi da specificare nell'oggetto di configurazione `placements` sono i seguenti:

<table>
  <tr>
    <th class="col-thirty">Nome campo</th>
    <th class="col-thirty">Tipo</th>
    <th class="col-fourty">Descrizione</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td>Un campo <strong>obbligatorio</strong> che fornisce informazioni utilizzate per cercare gli elementi all'interno della pagina a cui è ancorata la posizione del posizionamento.
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td>Un campo <strong>obbligatorio</strong> che indica la posizione del posizionamento in relazione al suo elemento di ancoraggio.</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td>Un campo <strong>obbligatorio</strong> che indica il tipo di posizionamento.</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td>Un campo <em>facoltativo</em> che indica gli stili da applicare a un annuncio inserito nella posizione di questo posizionamento.
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>Un campo <em>facoltativo</em> per una mappa dal nome dell'attributo al valore degli attributi da applicare a tutti gli elementi <code>&lt;amp-ad&gt;</code> inseriti per mezzo di questa configurazione. Un attributo specificato qui sostituisce qualsiasi attributo con lo stesso nome specificato anche nella <code>ConfigObj</code> principale. Sono consentiti solo i seguenti nomi di attributi:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (ossia qualsiasi attributo dei dati)</li>
      </ul>
    </td>
  </tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

I campi da specificare nell'oggetto di configurazione `anchor` sono i seguenti:

<table>
  <tr>
    <th class="col-thirty">Nome campo</th>
    <th class="col-thirty">Tipo</th>
    <th class="col-fourty">Descrizione</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>string</td>
    <td>Un campo <strong>obbligatorio</strong> che definisce un selettore CSS per selezionare gli elementi a questo livello della definizione dell'ancoraggio.
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>number</td>
    <td>Un campo <em>facoltativo</em> per specificare l'indice degli elementi selezionati dal selettore a cui dovrebbe essere limitato questo livello di definizione dell'ancoraggio. Per impostazione predefinita, il valore è impostato su 0 (se il campo <code>all</code> è false).</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>boolean</td>
    <td>Ignorato se il campo <code>index</code> è stato specificato. Se impostato su <code>true</code>, indica che tutti gli elementi selezionati dal selettore devono essere inclusi. In caso contrario, impostalo su <code>false</code>.
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>number</td>
    <td>Un campo <em>facoltativo</em> che specifica la lunghezza minima della proprietà textContent di un elemento affinché venga inclusa. Il valore predefinito è 0.</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>AnchorObj</td>
    <td>Un campo <em>facoltativo</em> che specifica un <code>AnchorObj</code> ricorsivo che selezionerà degli elementi tra quelli selezionati a questo livello di definizione dell'ancoraggio.
    </td>
  </tr>
</table>

#### PlacementStyleObj <a name="placementstyleobj"></a>

I campi da specificare nell'oggetto di configurazione `style` sono i seguenti:

<table>
  <tr>
    <th class="col-twenty">Nome campo</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-fourty">Descrizione</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>number</td>
    <td>Un campo <em>facoltativo</em> che indica il numero di pixel che deve misurare il margine superiore di un annuncio inserito in questo posizionamento. Il valore predefinito è 0.
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>number</td>
    <td>Un campo <em>facoltativo</em> che indica il numero di pixel che deve misurare il margine inferiore di un annuncio inserito in questo posizionamento. Il valore predefinito è 0.
    </td>
  </tr>
</table>

#### RelativePositionEnum <a name="relativepositionenum"></a>

I valori ENUM per il campo `pos` nell'oggetto di configurazione `placements` sono i seguenti:

<table>
  <tr>
    <th class="col-fourty">Nome</th>
    <th class="col-twenty">Valore</th>
    <th class="col-fourty">Descrizione</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>L'annuncio deve essere inserito come pari livello immediatamente prima dell'ancoraggio.</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>L'annuncio deve essere inserito come primo tag secondario dell'ancoraggio.</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>L'annuncio deve essere inserito come ultimo tag secondario dell'ancoraggio.</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>L'annuncio deve essere inserito come pari livello immediatamente dopo l'ancoraggio.</td>
  </tr>
</table>

#### PlacementTypeEnum <a name="placementtypeenum"></a>

I valori ENUM per il campo `type` nell'oggetto di configurazione `placements` sono i seguenti:

<table>
  <tr>
    <th class="col-fourty">Nome</th>
    <th class="col-twenty">Valore</th>
    <th class="col-fourty">Descrizione</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>Il posizionamento descrive la posizione di un annuncio banner.</td>
  </tr>
</table>

#### AdConstraintsObj

I campi da specificare nell'oggetto di configurazione `adConstraints` sono i seguenti:

<table>
  <tr>
    <th class="col-twenty">Nome campo</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-fourty">Descrizione</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>string</td>
    <td>
      Un campo <strong>obbligatorio</strong> che indica la distanza minima che un annuncio dovrebbe avere dagli annunci già presenti sulla pagina (posizionati manualmente o inseriti da amp-auto-ads) al momento dell'inserimento.
      I valori sono espressi come numeri con prefisso di unità. Ad esempio, "10 px" significa 10 pixel, o "0.5 vp" significa metà dell'altezza dell'area visibile. I valori negativi non sono validi. Le unità supportate sono:
      <ul>
        <li>px: pixel</li>
        <li>vp: multiplo dell'altezza dell'area visibile</li>
      </ul>
      Questo valore si applica solo quando il numero di annunci già presenti sulla pagina è inferiore a qualsiasi corrispondenza <code>adCount</code> specificata nel campo subsequentMinSpacing.
    </td>
  </tr>
  <tr>
    <td><code>subsequentMinSpacing</code></td>
    <td>Array&lt;!SubsequentMinSpacingObj&gt;</td>
    <td>
      Un campo <em>facoltativo</em> che specifica le spaziature degli annunci da rispettare sulla base del numero di annunci già presenti sulla pagina al momento dell'inserimento.
    </td>
  </tr>
  <tr>
    <td><code>maxAdCount</code></td>
    <td>number</td>
    <td>
      Un campo <strong>obbligatorio</strong> che specifica il numero massimo di annunci che possono comparire in una pagina tramite <code>amp-auto-ads</code>. Vengono conteggiati sia gli annunci posizionati manualmente che quelli inseriti da <code>amp-auto-ads</code>.
      Ad esempio, se imposti questo campo su 5 e sulla pagina ci sono già 3 annunci posizionati manualmente, <code>amp-auto-ads</code> vi inserirà al massimo altri 2 annunci.
    </td>
  </tr>
</table>

#### SubsequentMinSpacingObj

I campi da specificare nell'oggetto di configurazione `subsequentMinSpacing`. Le voci `subsequentMinSpacing`
possono essere utilizzate per modificare la spaziatura obbligatoria tra gli annunci aggiuntivi a seconda del numero di annunci già presenti
sulla pagina. Ad esempio, se si hanno:

* 2 annunci esistenti sulla pagina
* Il campo subsequentMinSpacing seguente è:
<code>
  [
    {adCount: 3, spacing: "500px"},
    {adCount: 5, spacing: "1000px"},
  ]
</code>

Inizialmente vi sono 2 annunci sulla pagina, quindi nessuna mappatura corrisponde.
Pertanto, la spaziatura minima viene impostata in modo predefinito su initialMinSpacing nell'oggetto `AdConstraints`.
`amp-auto-ads` cercherà ripetutamente di inserire annunci fino a che non avrà esaurito i posizionamenti
utilizzabili senza infrangere i limiti imposti da `adContraints`.
Dopo che `amp-auto-ads` ha posizionato il suo primo annuncio, ci sono 3 annunci sulla pagina. Dato che
la mappatura di `subsequentMinSpacing` prevede 3 o più annunci, la spaziatura minima diventa di 500 px.
Ciò si applica fino a che non ci sono 5 annunci sulla pagina, dato che esiste una regola per 5 annunci. Per inserire sei o più annunci, è necessario
che questi siano distanti da altri annunci almeno 1000 px.

<table>
  <tr>
    <th class="col-twenty">Nome campo</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-fourty">Descrizione</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>number</td>
    <td>
      Un campo <strong>obbligatorio</strong>.
      Il numero minimo di annunci già presenti nella pagina che determinano l'applicazione di questa regola se nessun'altra regola rappresenta una corrispondenza migliore. Vedi la descrizione sopra
      per una spiegazione più dettagliata.
    </td>
  </tr>
  <tr>
    <td><code>spacing</code></td>
    <td>string</td>
    <td>
      Un campo <strong>obbligatorio</strong> che specifica la spaziatura minima degli annunci applicata quando questa regola trova corrispondenze sulla base di <code>adCount</code>.
      I valori sono espressi come numeri con prefisso di unità. Ad esempio, "10 px" significa 10 pixel, o "0.5 vp" significa metà dell'altezza dell'area visibile. I valori negativi non sono validi. Le unità supportate sono:
      <ul>
        <li>px: pixel</li>
        <li>vp: multiplo dell'altezza dell'area visibile</li>
      </ul>
    </td>
  </tr>
</table>

## Convalida

Consulta le [regole amp-auto-ads](https://github.com/ampproject/amphtml/blob/master/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii) nella specifica dello strumento di convalida AMP.

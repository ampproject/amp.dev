---
$category@: ads-analytics
formats:
- websites
- ads
- stories
teaser:
  text: Un pixel di monitoraggio per il conteggio delle visualizzazioni di pagina.
---



<!---
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

# amp-pixel

<table>
  <tr>
    <td class="col-fourty"><strong>Descrizione</strong></td>
    <td>Può essere utilizzato come un tipico pixel di monitoraggio per conteggiare le visualizzazioni di pagina</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Layout supportati</a></strong></td>
    <td>fixed, nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td>Vedi l'<a href="https://ampbyexample.com/components/amp-pixel/">esempio amp-pixel</a> del sito AMP By Example</td>
  </tr>
</table>

## Comportamento

Il componente `amp-pixel` si comporta come un semplice pixel di monitoraggio `img`. Richiede un singolo URL, ma fornisce variabili che possono essere sostituite dal componente nella stringa URL quando si effettua la richiesta. Per ulteriori dettagli, consulta la sezione [Sostituzioni](#substitutions).

In questo esempio di base, `amp-pixel` effettua una semplice richiesta GET all'URL specificato e ignora il risultato.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"></amp-pixel>
```

[tip type="note"]
mentre elabori gli URL AMP nell'intestazione del referrer delle richieste di analisi dei dati, rimuovi o ignora il parametro `usqp`. Google utilizza questo parametro per attivare gli esperimenti per la cache AMP di Google.
[/tip]

## Attributi

##### src (obbligatorio)

Un URL semplice di un endpoint remoto che deve utilizzare il protocollo `https`.

##### referrerpolicy (facoltativo)

Simile all'attributo `referrerpolicy` di `<img>`, tuttavia l'unico valore ammesso è `no-referrer`. Se viene specificato `referrerpolicy=no-referrer`, l'intestazione `referrer` viene rimossa dalla richiesta HTTP.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"
    referrerpolicy="no-referrer"></amp-pixel>
```

##### allow-ssr-img (facoltativo)

Questo attributo, utilizzato nelle creatività AMP4ADS, indica che, come parte della
trasformazione successiva alla convalida, è possibile posizionare un elemento img direttamente
all'interno dell'elemento amp-pixel, permettendo al ping di essere inviato in contemporanea all'esecuzione/recupero del runtime AMP.
Tieni presente che eventuali macro all'interno dell'URL NON verranno espanse,
quindi utilizzale solo se non sono presenti macro nell'src.

##### common attributes

Questo elemento include [attributi comuni](https://www.ampproject.org/docs/reference/common_attributes) estesi ai componenti AMP.

## Sostituzioni

`amp-pixel` consente tutte le sostituzioni di variabili URL standard.
Per ulteriori informazioni, consulta la [Guida alle sostituzioni](../spec/amp-var-substitutions.md).

Nel seguente esempio, potrebbe essere effettuata una richiesta a `https://foo.com/pixel?0.8390278471201`, dove il valore RANDOM viene generato in modo casuale per ciascuna impressione.

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"
    layout="nodisplay"></amp-pixel>
```

## Stili

Non modificare lo stile di `amp-pixel`.

## Convalida

Consulta le [regole amp-pixel](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) nella specifica dello strumento di convalida AMP.

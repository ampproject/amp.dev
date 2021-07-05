---
'$title': Aktionen und Events in AMP E-Mails
$order: 0
formats:
  - email
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-email-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

[tip type="note"] Diese Dokumentation behandelt Aktionen und Events für das AMP E-Mail Format. Entsprechende Informationen zu AMP Websites, Storys und Ads findest du unter [Aktionen und Events](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-actions-and-events.md). [/tip]

Das Attribut `on` wird verwendet, um Event Handler für Elemente zu platzieren. Die unterstützten Events sind vom Element abhängig.

Der Wert der Syntax ist eine einfache domänenspezifische Sprache in der folgenden Form:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

Die folgende Tabelle beschreibt die einzelnen Elemente der Syntax.

<table>
  <tr>
    <th width="30%">Syntax</th>
    <th width="18%">Erforderlich?</th>
    <th width="42%">Beschreibung</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>ja</td>
    <td>Das ist der Name des Events, welches das Element verfügbar macht.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>ja</td>
    <td>Das ist die DOM ID für das Element oder ein vordefiniertes <a href="#special-targets">besonderes Ziel</a>, für das eine Aktion als Reaktion auf das Event ausgeführt werden soll. Im folgenden Beispiel ist die <code>targetId</code> die DOM ID des Ziels <code>amp-lightbox</code>, <code>photo-slides</code>. <pre>&lt;amp-lightbox id="photo-slides">&lt;/amp-lightbox> &lt;button on="tap:photo-slides">Bilder anzeigen&lt;/button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>nein</td>
    <td>Das ist für Elemente mit Standardaktionen.<p>Dies ist die Methode, welche vom Zielelement (referenziert von <code>targetId</code>) verfügbar gemacht wird und die ausgeführt werden soll, wenn das Event ausgelöst wird.</p> <p>In AMP sind Standardaktionen möglich, die für Elemente implementiert werden können. Wird <code>methodName</code> weggelassen, führt AMP die Standardmethode aus.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>nein</td>
    <td>Manche Aktionen können (sofern sie dokumentiert sind) Argumente akzeptieren. Die Argumente werden in Klammern im Format <code>key=value</code> angegeben. Die zulässigen Werte sind:       <ul>         <li>einfache Strings ohne Anführungszeichen: <code>simple-value</code> </li>         <li>Strings mit Anführungszeichen: <code>"string value"</code> oder <code>'string value'</code> </li>         <li>Boolesche Werte: <code>true</code> oder <code>false</code> </li>         <li>Zahlen: <code>11</code> oder <code>1.1</code> </li>         <li>Punktsyntaxverweis auf Ereignisdaten: <code>event.someDataVariableName</code> </li>       </ul>
</td>
  </tr>
</table>

## Verarbeiten mehrerer Events <a name="handling-multiple-events"></a>

Um mehrere Events eines Elements abzuhören, müssen diese durch ein Semikolon `;` getrennt werden.

Beispiel: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Mehrere Aktionen für ein Event <a name="multiple-actions-for-one-event"></a>

Für dasselbe Ereignis können mehrere Aktionen nacheinander ausgeführt werden. Dazu werden die Aktionen durch ein Komma ',' getrennt.

Beispiel: `on="tap:target1.actionA,target2.actionB"`

## Global definierte Events und Aktionen <a name="globally-defined-events-and-actions"></a>

AMP definiert das Event `tap` als global. Dieses kann für jedes HTML Element (einschließlich AMP Elemente) abgehört werden.

AMP definiert außerdem die Aktionen `hide`, `show` und `toggleVisibility` als global. Sie können auf jedem beliebigen HTML Element ausgelöst werden.

[tip type="note"]

Ein Element kann nur wieder angezeigt werden, wenn es zuvor durch die Aktion `hide` oder `toggleVisibility` oder mithilfe des Attributs [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) ausgeblendet wurde. Die Aktion `show` unterstützt keine Elemente, die mit der CSS Eigenschaft `display:none` oder der AMP Eigenschaft `layout=nodisplay` ausgeblendet waren.

In AMP ist beispielsweise Folgendes möglich:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## Elementspezifische Events <a name="element-specific-events"></a>

### \* – alle Elemente <a name="---all-elements"></a>

<table>
  <tr>
    <th>Event</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>Wird ausgelöst, wenn das Element angeklickt/angetippt wird.</td>
  </tr>
</table>

### Elemente für die Eingabe <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">Event</th>
    <th width="30%">Beschreibung</th>
    <th width="40%">Elemente</th>
    <th>Daten</th>
  </tr>
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Wird ausgelöst, wenn der Wert des Elements geändert und bestätigt wird. <p> Die Eigenschaften der Daten spiegeln diese in <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> und <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a> wider.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <tr>
    <td><code>input-debounced</code></td>
    <td>Wird ausgelöst, wenn der Wert des Elements geändert wird. Das ist vergleichbar mit dem Standard Event <code>change</code>, dieses hier wird aber erst 300 ms nach Ende der Änderung des Eingabewertes ausgelöst.</td>
    <td>Elemente, die das Event <code>input</code> auslösen.</td>
    <td>Entspricht den Event Daten von <code>change</code>.</td>
  </tr>
  <tr>
    <td><code>input-throttled</code></td>
    <td>Wird ausgelöst, wenn der Wert des Elements geändert wird. Das ist vergleichbar mit dem Standard Event <code>change</code>, dieses hier wird aber so gedrosselt, dass es höchstens einmal alle 100 ms ausgelöst wird, während der Eingabewert sich ändert.</td>
    <td>Elemente, die das Ereignis <code>input</code> auslösen.</td>
    <td>Entspricht den Event Daten von <code>change</code>.</td>
  </tr>
</table>

### amp-accordion > section <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>Wird ausgelöst, wenn ein Abschnitt im Akkordeonstil erweitert wird.</td>
    <td>Keine</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Wird ausgelöst, wenn ein Abschnitt im Akkordeonstil reduziert wird.</td>
    <td>Keine</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>Wird ausgelöst, wenn sich die aktuelle Folie des Karussells ändert.</td>
    <td><pre>// Foliennummer.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>Wird ausgelöst, wenn die Lightbox vollständig sichtbar ist.</td>
    <td>Keine</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>Wird ausgelöst, wenn die Lightbox vollständig geschlossen wird.</td>
    <td>Keine</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>Wird ausgelöst, wenn das Abrufen von Daten fehlschlägt.</td>
    <td>Keine</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Wird ausgelöst, wenn eine Option ausgewählt oder abgewählt wird.</td>
    <td><pre>// Wert des Attributs "option" des Zielelements.<br>event.targetOption<br>// Array mit den Werten des Attributs "option" aller ausgewählten Elemente.<br>event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>Wird ausgelöst, wenn die Seitenleiste nach Ende des Übergangs vollständig geöffnet ist.</td>
    <td>Keine</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Wird ausgelöst, wenn die Seitenleiste nach Ende des Übergangs vollständig geschlossen ist.</td>
    <td>Keine</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>Wird ausgelöst, wenn das Abrufen von Daten fehlschlägt.</td>
    <td>Keine</td>
  </tr>
</table>

### form <a name="form"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Wird ausgelöst, wenn das Formular abgesendet wird.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Wird ausgelöst, wenn die Formularübermittlung laut Rückantwort erfolgreich war.</td>
    <td><pre>// JSON mit Rückantwort.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Wird ausgelöst, wenn die Formularübermittlung laut Rückantwort fehlerhaft war.</td>
    <td><pre>// JSON mit Rückantwort.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Wird ausgelöst, wenn das Formular gültig ist.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Wird ausgelöst, wenn das Formular ungültig ist.</td>
    <td></td>
  </tr>
</table>

## Elementspezifische Aktionen <a name="element-specific-actions"></a>

### \* (alle Elemente) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Blendet das Zielelement aus.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Zeigt das Zielelement an. Wenn dadurch das <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">Element</a><code>autofocus</code> sichtbar wird, springt der Fokus darauf.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Schaltet die Sichtbarkeit des Zielelements um.     Wenn dadurch das <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">Element <code>autofocus</code></a>     sichtbar wird, rückt es in den Fokus.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Schaltet die Klasse des Zielelements um. <code>force</code> ist optional und stellt sicher, dass die Klasse bei <code>true</code> nur hinzugefügt, aber nicht entfernt wird, und bei <code>false</code> nur entfernt, aber nicht hinzugefügt wird.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Setzt den Fokus auf das Zielelement. Um den Fokus aufzuheben, muss ein anderes Element mittels <code>focus</code> den Fokus erhalten (in der Regel das übergeordnete Element). Aus Gründen der Barrierefreiheit raten wir dringend davon ab, den Fokus zu diesem Zweck auf <code>body</code>/<code>documentElement</code> zu setzen.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>Schaltet zwischen den Zuständen <code>expanded</code> und <code>collapsed</code> der Sektionen von <code>amp-accordion</code> um. Bei Aufruf ohne Argumente werden alle Sektionen des Akkordeons umgeschaltet. Gib die Section ID, damit die Aktion bei einer bestimmten Sektion ausgelöst wird: <code>on="tap:myAccordion.toggle(section='section-id')"</code>.</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Erweitert die Sektionen des Akkordeons. Ist eine Sektion bereits erweitert, bleibt sie in diesem Zustand. Bei Aufruf ohne Argumente werden alle Sektionen des Akkordeons erweitert. Gib die Section ID an, damit das Event bei einer bestimmten Sektion ausgelöst wird: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Reduziert die Sektionen des Akkordeons. Ist eine Sektion bereits reduziert, bleibt sie in diesem Zustand. Bei Aufruf ohne Argumente werden alle Sektionen des Akkordeons reduziert. Gib die Section ID an, damit das Event bei einer bestimmten Sektion ausgelöst wird: <code>on="tap:myAccordion.collapse(section='section-id')"</code>.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>Dreht das Karussell bis zu einem bestimmten Folienindex.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Öffnet die Image Lightbox, wobei das Bild, welches die Aktion ausgelöst hat, zum Quellbild wird.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Öffnet die Lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Schließt die Lightbox.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>Aktualisiert das Layout von <code>amp-list</code> zu <code>layout="CONTAINTER"</code>, um eine <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">dynamische Größenänderung</a> zu ermöglichen.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>Wird ausgelöst, wenn das Abrufen von Daten fehlschlägt.</td>
    <td>Keine</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Löscht alle Auswahlen aus einem definierten <code>amp-selector</code>.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>Verschiebt die Auswahl um den Wert von 'delta' nach oben. Der Standardwert von 'delta' ist -1. Wenn keine Optionen ausgewählt sind, erhält der ausgewählte Zustand den Wert der letzten Option.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>Verschiebt die Auswahl um den Wert von 'delta' nach unten. Das Standardwert für 'delta' ist 1. Wenn keine Optionen ausgewählt sind, wird der ausgewählte Zustand zum Wert der ersten Option.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>Schaltet die Anwendung von `selected` um. Wenn das Attribut select nicht vorhanden ist, wird es durch diese Aktion hinzugefügt. Wenn das Attribut select vorhanden ist, wird es durch diese Aktion entfernt.     Du kannst das Hinzufügen oder Entfernen erzwingen und beibehalten, indem du einen Booleschen Wert in das Argument `value` aufnimmst. Der Wert `true` erzwingt das Hinzufügen des Attributs `selected` und entfernt es nicht, wenn es bereits vorhanden ist. Der Wert `false` entfernt das Attribut, fügt es jedoch nicht hinzu, wenn es nicht vorhanden ist.</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Öffnet die Seitenleiste.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Schließt die Seitenleiste.</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>Schaltet den Status der Seitenleiste um.</td>
  </tr>
</table>

### form <a name="form-1"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Löscht alle Werte aus den Eingabefeldern des Formulars.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Sendet das Formular ab.</td>
  </tr>
</table>

## Besondere Ziele <a name="special-targets"></a>

Die folgenden Ziele werden vom AMP System bereitgestellt und haben besondere Anforderungen:

### Ziel: AMP <a name="target-amp"></a>

Das Ziel `AMP` wird von der AMP Runtime bereitgestellt und implementiert Aktionen der obersten Ebene, die für das gesamte Dokument gelten.

<table>
  <tr>
    <th width="40%">Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Benötigt <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>Fügt ein Objektliteral in den bindbaren Status ein.</p>
      <p></p>
    </td>
  </tr>
</table>

<sup>1</sup>Bei Verwendung mit <a href="#multiple-actions-for-one-event">mehreren Aktionen</a>, warten nachfolgende Aktionen auf <code>setState()</code>, um den vorherigen Aufruf abzuschließen. Pro Ereignis ist nur ein einziger <code>setState()</code> zulässig.

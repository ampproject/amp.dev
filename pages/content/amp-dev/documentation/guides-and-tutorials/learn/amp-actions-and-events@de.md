---
'$title': Aktionen und Ereignisse
$order: 0
formats:
  - websites
  - stories
  - ads
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

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

[tip type="note"]Diese Dokumentation beschreibt Aktionen und Events für AMP Websites, Storys und Ads. Infos über das AMP E-Mail Format findest du in [Aktionen und Events in AMP E-Mail](https://github.com/ampproject/amphtml/blob/master/spec/amp-email-actions-and-events.md). [/tip]

Das Attribut `on` wird verwendet, um Event Handler für Elemente zu installieren.

Der Wert für die Syntax ist eine einfache domänenspezifische in der folgenden Form:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

Die nachfolgenden Tabelle beschreibt die einzelnen Elemente der Syntax.

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
    <td>Das ist die DOM ID für das Element oder ein vordefiniertes <a href="#special-targets">besonderes Ziel</a>, für das eine Aktion als Reaktion auf das Event ausgeführt werden soll. Im folgenden Beispiel ist die <code>targetId</code> die DOM ID des Ziels <code>amp-lightbox</code>, <code>photo-slides</code>. <pre><amp-lightbox id="photo-slides"></amp-lightbox> <button on="tap:photo-slides">Bilder anzeigen</button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>Nein</td>
    <td>Das ist für Elemente mit Standardaktionen.<p>Dies ist die Methode, welche vom Zielelement (referenziert von <code>targetId</code>) verfügbar gemacht wird und die ausgeführt werden soll, wenn das Event ausgelöst wird.</p> <p>In AMP sind Standardaktionen möglich, die in Elementen implementiert werden können. Wird <code>methodName</code> weggelassen, führt AMP die Standardmethode aus.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>Nein</td>
    <td>Manche Aktionen können (sofern sie dokumentiert sind) Argumente akzeptieren. Die Argumente werden in Klammern im Format <code>key=value</code> angegeben. Die zulässigen Werte sind:       <ul>         <li>einfache Strings ohne Anführungszeichen: <code>simple-value</code> </li>         <li>Strings mit Anführungszeichen: <code>"string value"</code> oder <code>'string value'</code> </li>         <li>Boolesche Werte: <code>true</code> oder <code>false</code> </li>         <li>Zahlen: <code>11</code> oder <code>1.1</code> </li>         <li>Punktsyntaxverweis auf Ereignisdaten: <code>event.someDataVariableName</code> </li>       </ul>
</td>
  </tr>
</table>

## Verarbeiten mehrerer Events <a name="handling-multiple-events"></a>

Um mehrere Events eines Elements abzuhören, müssen diese durch ein Semikolon `;` getrennt werden.

Beispiel: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Mehrere Aktionen für ein Event <a name="multiple-actions-for-one-event"></a>

Für dasselbe Ereignis können mehrere Aktionen nacheinander ausgeführt werden. Dazu werden die Aktionen durch ein Komma

Beispiel: `on="tap:target1.actionA,target2.actionB"`

## Global definierte Events und Aktionen <a name="globally-defined-events-and-actions"></a>

AMP definiert das Event `tap` als global. Dieses kann für jedes HTML Element (einschließlich AMP Elemente) abgehört werden.

AMP definiert außerdem die Aktionen `hide`, `show` und `toggleVisibility` als global. Sie können auf jedem beliebigen HTML Element ausgelöst werden.

[tip type="note"]

Ein Element kann nur angezeigt werden, wenn es zuvor durch die Aktion `hide` oder `toggleVisibility` oder mithilfe des Attributs [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) ausgeblendet war. Die Aktion `show` unterstützt keine Elemente, die mit der CSS Eigenschaft `display:none` oder der AMP Eigenschaft `layout=nodisplay` ausgeblendet waren.

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
    <td>Wird ausgelöst, wenn das Element angeklickt/angetippt wird</td>
  </tr>
</table>

### Eingabeelemente

<table>
  <tr>
    <th width="20%">Event</th>
    <th width="30%">Beschreibung</th>
    <th width="40%">Elemente</th>
    <th>Daten</th>
  </tr>
  <!-- change -->
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Wird ausgelöst, wenn der Wert des Elements geändert und bestätigt wird.       <p>       Die Eigenschaften der Daten spiegeln diese in <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> und <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a> wider.</p>
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
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>Wird ausgelöst, wenn der Wert des Elements geändert wird. Dies ist vergleichbar mit dem Standard Event <code>change</code>, dieses hier wird aber erst 300ms nach Ende der Wertänderung ausgelöst.</td>
    <td>Elemente, die das Event <code>input</code> auslösen.</td>
    <td>Entspricht den Event Daten von <code>change</code>.</td>
  </tr>
    <!-- input-throttled -->
  <tr>
    <td><code>input-throttled</code></td>
    <td>Wird ausgelöst, wenn der Wert des Elements geändert wird. Das ist vergleichbar mit dem Standard Event <code>change</code>, dieses hier wird aber so gedrosselt, dass es höchstens einmal alle 100 ms ausgelöst wird, während der Eingabewert sich ändert.</td>
    <td>Elemente, die das Event <code>input</code> auslösen.</td>
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
    <td>Wird ausgelöst, wenn sich ein Abschnitt im<br>Akkordeonstil ausdehnt.</td>
    <td>Keiner</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Wird ausgelöst, wenn ein Abschnitt im Akkordeonstil reduziert wird.</td>
    <td>Keiner</td>
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
    <td><pre>// Slide number.<br>event.index</pre></td>
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
    <td>Keiner</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>Wird ausgelöst, wenn die Lightbox vollständig geschlossen wird.</td>
    <td>Keiner</td>
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
    <td><code>changeToLayoutContainer</code></td>
    <td>Aktualisiert das Layout von <code>amp-list</code> zu <code>layout="CONTAINTER"</code>, um eine <a href="https://github.com/ampproject/amphtml/blob/master/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">dynamische Größenänderung</a> zu ermöglichen.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>Wird ausgelöst, wenn das Abrufen von Daten fehlschlägt.</td>
    <td>Keiner</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Blendet das Zielelement aus.</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Wird ausgelöst, wenn eine Option ausgewählt oder abgewählt wird.</td>
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
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
    <td>Keiner</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Wird ausgelöst, wenn die Seitenleiste nach Ende des Übergangs vollständig geschlossen ist.</td>
    <td>Keiner</td>
  </tr>
</table>

### amp-state <a name="amp-state-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>Wird ausgelöst, wenn das Abrufen von Daten fehlschlägt.</td>
    <td>Keiner</td>
  </tr>
</table>

### amp-video, amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Daten</th>
  </tr>
  <tr>
    <td> <code>firstPlay</code>(low-trust)</td>
    <td>Wird ausgelöst, wenn der Benutzer das Video zum ersten Mal abspielt. Bei Autoplayvideos wird es ausgelöst, sobald der Benutzer mit dem Video interagiert. Da dieses Ereignis eine niedrige Vertrauensebene hat, kann es die meisten Aktionen nicht auslösen. Es können nur Aktionen der niedrigen Vertrauensebene ausgeführt werden wie z. B. <code>amp-animation</code>.</td>
    <td></td>
  </tr>
  <tr>
    <td> <code>firstPlay</code>(low-trust)</td>
    <td>Wird ausgelöst, wenn sich die Wiedergabeposition eines Videos geändert hat. AMP steuert die Häufigkeit des Ereignisses. Das vordefinierte Intervall beträgt 1 Sekunde. Da dieses Ereignis eine niedrige Vertrauensebene hat, kann es die meisten Aktionen nicht auslösen. Es können nur Aktionen der niedrigen Vertrauensebene ausgeführt werden wie z. B. <code>amp-animation</code>.</td>
    <td> <code>{time, percent}</code><code>time</code> gibt die aktuelle Zeit in Sekunden an, <code>percent</code> ist eine Zahl zwischen 0 und 1, und gibt die aktuelle Position als Prozentsatz der Gesamtzeit an.</td>
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
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Wird ausgelöst, wenn die Antwort auf die Formularübermittlung ein Fehler ist.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Wird ausgelöst, wenn das Formular gültig ist.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Fired when the form is invalid.</td>
    <td></td>
  </tr>
</table>

## Elementspezifische Aktionen <a name="element-specific-actions"></a>

### \* – alle Elemente <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Action</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Blendet das Zielelement aus.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Zeigt das Zielelement an. Wenn dadurch das Element <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code></a> sichtbar wird, springt der Fokus darauf.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Schaltet die Sichtbarkeit des Zielelements um. Wenn dadurch das Element <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code></a> sichtbar wird, springt der Fokus darauf.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Schaltet die Klasse des Zielelements um. <code>force</code> ist optional und stellt sicher, dass die Klasse bei <code>true</code> nur hinzugefügt, aber nicht entfernt wird, und bei <code>false</code> nur entfernt, aber nicht hinzugefügt wird.</td>
  </tr>
  <tr>
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>Scrollt ein Element mit einer glatten Animation in den sichtbaren Bereich.<br> <code>duration</code> ist optional. Gibt die Länge der Animation in Millisekunden an. Wenn nicht angegeben, wird ein Wert relativ zur Bildlaufdifferenz unter oder gleich 500 Millisekunden verwendet.<br> <code>position</code> ist optional. Entweder <code>top</code>, <code>center</code> oder <code>bottom</code> (Standardwert ist <code>top</code>). Gibt die Position des Elements im Verhältnis zum Viewport nach dem Scrollen an.<br> Als Best Practice im Sinne der Barrierefreiheit sollte diese Aktion mit einem Aufruf von <code>focus()</code> kombiniert werden, um den Fokus auf das Element zu setzen, zu dem gescrollt wird.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Setzt den Fokus auf das Zielelement. Um den Fokus aufzuheben, muss ein anderes Element mittels <code>focus</code> den Fokus erhalten (in der Regel das übergeordnete Element). Aus Gründen der Barrierefreiheit raten wir dringend davon ab, den Fokus zu diesem Zweck auf <code>body</code>/<code>documentElement</code> zu setzen.</td>
  </tr>
</table>

### amp-audio <a name="amp-audio"></a>

<table>
  <tr>
    <th width="20%">Action</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Spielt das Audio ab. Ist eine No-Op, wenn das Element <code>&lt;amp-audio></code> dem Element <code>&lt;amp-story></code> untergeordnet ist.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Hält das Audio an. Ist eine No-Op, wenn das Element <code>&lt;amp-audio></code> dem Element <code>&lt;amp-story></code> untergeordnet ist.</td>
  </tr>
</table>

### amp-bodymovin-animation <a name="amp-bodymovin-animation"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Spielt die Animation ab.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Hält die Animation an.</td>
  </tr>
  <tr>
    <td><code>stop</code></td>
    <td>Stoppt die Animation.</td>
  </tr>
  <tr>
    <td><code>seekTo(time=INTEGER)</code></td>
    <td>Setzt die currentTime der Animation auf den angegebenen Wert und hält die Animation an.</td>
  </tr>
  <tr>
    <td><code>seekTo(percent=[0,1])</code></td>
    <td>Verwendet den angegebenen Prozentwert, um die currentTime der Animation auf den angegebenen Wert festzulegen und die Animation anzuhalten.</td>
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
    <td>Schaltet die <code>expanded</code> und <code>collapsed</code> Zustände der <code>amp-accordion</code> Abschnitte um. Wenn es ohne Argumente aufgerufen wird, werden alle Abschnitte des Akkordeons umgeschaltet. Um einen bestimmten Abschnitt auszulösen, gib die ID des Abschnitts an: <code>on="tap:myAccordion.toggle(section='section-id')"</code>.</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Erweitert die Abschnitte des Akkordeons. Wenn ein Abschnitt bereits erweitert ist, bleibt er erweitert. Wenn es ohne Argumente aufgerufen wird, werden alle Abschnitte des Akkordeons erweitert. Um einen bestimmten Abschnitt auszulösen, gib die ID des Abschnitts an: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Reduziert die Abschnitte des Akkordeons. Wenn ein Abschnitt bereits reduziert ist, bleibt er reduziert. Wenn es ohne Argumente aufgerufen wird, werden alle Abschnitte des Akkordeons reduziert. Um einen bestimmten Abschnitt auszulösen, gib die ID des Abschnitts an: <code>on="tap:myAccordion.collapse(section='section-id')"</code>.</td>
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
  <tr>
    <td><code>toggleAutoplay(toggleOn=true|false)</code></td>
    <td>Schaltet den Autoplaystatus des Karussells um. <code>toggleOn</code> ist optional.</td>
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

### <a name="amp-lightbox">amp-lightbox</a>

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

### amp-lightbox-gallery <a name="amp-lightbox-gallery"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>open</code></td>
    <td>Öffnet die lightbox-gallery. Kann durch Tippen auf ein anderes Element ausgelöst werden, wenn du die ID des Bildes angibst: `on="tap:amp-lightbox-gallery.open(id='image-id')"`.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Aktualisiert Daten aus der <code>src</code> und rendert die Liste erneut.</td>
  </tr>
</table>

### amp-live-list <a name="amp-live-list"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>update (default)</code></td>
    <td>Aktualisiert die DOM Elemente, um aktualisierten Inhalt anzuzeigen.</td>
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
    <td>Löscht alle Auswahlen von einem definierten <code>amp-selector</code>.</td>
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

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Ruft Daten des Attributs `src` erneut ab, während der Browser Cache ignoriert wird.</td>
  </tr>
</table>

### amp-user-notification <a name="amp-user-notification"></a>

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>dismiss (default)</code></td>
    <td>Blendet das referenzierte Benutzerbenachrichtigungselement aus.</td>
  </tr>
</table>

### Videoelemente <a name="video-elements"></a>

Die folgenden Aktionen werden in den folgenden AMP Videoelementen unterstützt: `amp-video`, `amp-youtube`, `amp-3q-player`, `amp-brid-player`, `amp-dailymotion`, `amp-delight-player`, `amp-ima-video`.

<table>
  <tr>
    <th>Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Spielt das Video ab.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Hält das Video an.</td>
  </tr>
  <tr>
    <td><code>mute</code></td>
    <td>Schaltet das Video stumm.</td>
  </tr>
  <tr>
    <td><code>unmute</code></td>
    <td>Hebt die Stummschaltung des Videos auf.</td>
  </tr>
  <tr>
    <td><code>fullscreencenter</code></td>
    <td>Bringt das Video in den Vollbildmodus.</td>
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
    <td>Versendet das Formular.</td>
  </tr>
</table>

## Sonderziele <a name="special-targets"></a>

Die folgenden Ziele werden vom AMP System bereitgestellt und haben besondere Anforderungen:

### Ziel: AMP <a name="target-amp"></a>

Das Ziel `AMP` wird von der AMP Runtime bereitgestellt und implementiert Aktionen der obersten Ebene, die für das gesamte Dokument gelten.

<table>
  <tr>
    <th width="40%">Aktion</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Navigiert das aktuelle Fenster zur angegebenen URL oder zum optional definierten Ziel, sofern angegeben (unterstützt derzeit nur <code>_top</code> und <code>_blank </code>). Der optionale Parameter <code>opener</code> kann angegeben werden, wenn ein Ziel von <code>_blank</code> verwendet wird, damit die neu geöffnete Seite auf <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/opener"><code>window.opener</code></a> zugreifen kann. Unterstützt <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md">standardmäßige URL <br>Substitutionen</a>.</p>
      <p><strong>Warnung:</strong> Es wird empfohlen, nach Möglichkeit normale <code><a></code> Links zu verwenden, da <code>AMP.navigateTo</code> von Webcrawlern nicht erkannt wird.</p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Versucht, das Fenster zu schließen, sofern dies zulässig ist. Andernfalls wird ähnlich wie bei der Aktion <code>navigateTo</code> navigiert. Nützlich für Use Cases, in denen es sein kann, dass eine Schaltfläche "Zurück" das Fenster schließen muss, wenn es in einem neuen Fenster von der vorherigen Seite geöffnet wurde, oder wenn eine Navigation erforderlich ist, wenn das Fenster nicht geöffnet wurde.</p>
      <p><strong>Warnung:</strong> Es wird empfohlen, nach Möglichkeit normale <code><a></code> Links zu verwenden, da <code>AMP.closeOrNavigateTo</code> von Webcrawlern nicht erkannt wird.</p>
    </td>
  </tr>
  <tr>
    <td><code>goBack</code></td>
    <td>Navigiert in den Verlauf zurück.</td>
  </tr>
  <tr>
    <td><code>print</code></td>
    <td>Öffnet den Druckdialog, um die aktuelle Seite zu drucken.</td>
  </tr>
  <tr>
    <td>scrollTo(id=STRING, duration=INTEGER, position=STRING)</td>
    <td>Scrollt zur angegebenen Element ID auf der aktuellen Seite.</td>
  </tr>
  <tr>
    <td>optoutOfCid</td>
    <td>Deaktiviert die Client ID Generierung für alle Bereiche.</td>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Benötigt <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>Führt ein Objektliteral in den bindbaren Status zusammen.</p>
      <p></p>
    </td>
  </tr>
  <tr>
    <td>
<code>pushState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Benötigt <a href="https://amp.dev/documentation/components/amp-bind.html#modifying-history-with-amppushstate">amp-bind</a>.</p>
      <p>Führt ein Objektliteral in den bindbaren Status zusammen und verschiebt einen neuen Eintrag in den Browserverlaufsstapel. Da der Eintrag gelöscht wird, werden die vorherigen Variablenwerte wiederhergestellt (in diesem Beispiel <code>foo</code>).</p>
</td>
  </tr>
</table>

<sup>1</sup>Bei Verwendung mit <a href="#multiple-actions-for-one-event">mehreren Aktionen</a>, warten nachfolgende Aktionen auf <code>setState()</code> oder <code>pushState()</code>, um den vorherigen Aufruf abzuschließen. Pro Ereignis ist nur ein einziger <code>setState()</code> oder <code>pushState()</code> zulässig.

### Target: amp-access <a name="target-amp-access"></a>

Das Ziel `amp-access` wird von der Komponente [amp-access](https://amp.dev/documentation/components/amp-access.html) bereitgestellt.

Für das Ziel `amp-access` gelten aus folgenden Gründen spezielle Bedingungen:

1. Dieses Ziel kann keine beliebige ID erhalten. Das Ziel ist immer `amp-access`.
2. The actions for `amp-access` are dynamic depending on the structure of the [AMP Access Configuration](https://amp.dev/documentation/components/amp-access#configuration).

[Hier](https://amp.dev/documentation/components/amp-access#login-link) findest du weitere Informationen über die Verwendung des Ziels `amp-access`.

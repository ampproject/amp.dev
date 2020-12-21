---
"$title": Aktionen und Ereignisse
order: '0'
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
    <th width="42%">Description</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>ja</td>
    <td>Das ist der Name des Events, welches das Element verfügbar macht.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>yes</td>
    <td>This is the DOM id for the element, or a predefined <a href="#special-targets">special target</a> you'd like to execute an action on  in response to the event. In the following example, the <code>targetId</code> is the DOM id of the <code>amp-lightbox</code> target, <code>photo-slides</code>.     <pre><amp-lightbox id="photo-slides"></amp-lightbox>
<button on="tap:photo-slides">Show Images</button></pre>     </td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>no</td>
    <td>This is for elements with default actions.<p>This is the method that the target element (referenced by <code>targetId</code>) exposes and you'd like to execute when the event is triggered.</p>
<p>AMP has a concept of a default action that elements can implement. So when omitting the <code>methodName</code> AMP will execute that default method.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>no</td>
    <td>Some actions, if documented, may accept arguments. The arguments are defined between parentheses in <code>key=value</code> notation. The accepted values are:       <ul>         <li>simple unquoted strings: <code>simple-value</code>
</li>         <li>quoted strings: <code>"string value"</code> or <code>'string value'</code>
</li>         <li>boolean values: <code>true</code> or <code>false</code>
</li>         <li>numbers: <code>11</code> or <code>1.1</code>
</li>         <li>dot-syntax reference to event data: <code>event.someDataVariableName</code>
</li>       </ul>     </td>
  </tr>
</table>

## Handling multiple events <a name="handling-multiple-events"></a>

You can listen to multiple events on an element by separating the events with a semicolon `;`.

Example: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Multiple actions for one event <a name="multiple-actions-for-one-event"></a>

You can execute multiple actions in sequence for the same event by separating the actions with a comma ','.

Example: `on="tap:target1.actionA,target2.actionB"`

## Globally-defined events and actions <a name="globally-defined-events-and-actions"></a>

AMP defines a `tap` event globally that you can listen to on any HTML element (including AMP elements).

AMP also defines the `hide`, `show` and `toggleVisibility` actions globally that you can trigger on any HTML element.

[tip type="note"]

An element can only be shown if it was previously hidden by a `hide` or `toggleVisibility` action, or by using the [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) attribute. The `show` action does not support elements hidden by CSS `display:none` or AMP's `layout=nodisplay`.

For example, the following is possible in AMP:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## Element-specific events <a name="element-specific-events"></a>

### * - all elements <a name="---all-elements"></a>

<table>
  <tr>
    <th>Event</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>Fired when the element is clicked/tapped.</td>
  </tr>
</table>

### Input elements <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">Event</th>
    <th width="30%">Description</th>
    <th width="40%">Elements</th>
    <th>Data</th>
  </tr>
  <!-- change -->
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Fired when the value of the element is changed and committed.       <p>       Data properties mirror those in <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>     </td>
    <td><code>input</code></td>
    <td>
      <pre>event.min
event.max
event.value
event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td>
<code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min
event.max
event.value</pre>
    </td>
  </tr>
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>Fired when the value of the element is changed. This is similar to the standard <code>change</code> event, but it only fires when 300ms have passed after the value of the input has stopped changing.</td>
    <td>Elements that fire <code>input</code> event.</td>
    <td>Same as <code>change</code> event data.</td>
  </tr>
    <!-- input-throttled -->
  <tr>
    <td><code>input-throttled</code></td>
    <td>Fired when the value of the element is changed. This is similar to the standard <code>change</code> event, but it is throttled to firing at most once every 100ms while the value of the input is changing.</td>
    <td>Elements that fire <code>input</code> event.</td>
    <td>Same as <code>change</code> event data.</td>
  </tr>
</table>

### amp-accordion > section <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Description</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>Fired when an accordion section expands.</td>
    <td>None.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Fired when an accordion section collapses.</td>
    <td>None.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Description</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>Fired when the carousel's current slide changes.</td>
    <td><pre>// Slide number.
event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Description</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>Fired when lightbox is fully visible.</td>
    <td>None</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>Fired when lightbox is fully closed.</td>
    <td>None</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Description</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>Update's <code>amp-list</code>'s layout to <code>layout="CONTAINTER"</code> to allow <a href="https://github.com/ampproject/amphtml/blob/master/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">dynamic resizing</a>.</td>
  </tr>
  <tr>
    <td>
<code>fetch-error</code>(low-trust)</td>
    <td>Fired when fetching data fails.</td>
    <td>None</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Description</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Fired when an option is selected or deselected.</td>
    <td><pre>// Target element's "option" attribute value.
event.targetOption
// Array of "option" attribute values of all selected elements.
event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Description</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>Fired when sidebar is fully opened after transition has ended.</td>
    <td>None</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Fired when sidebar is fully closed after transition has ended.</td>
    <td>None</td>
  </tr>
</table>

### amp-state <a name="amp-state-1"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td>
<code>fetch-error</code>(low-trust)</td>
    <td>Fired when fetching data fails.</td>
    <td>None</td>
  </tr>
</table>

### amp-video, amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td>
<code>firstPlay</code>(low-trust)</td>
    <td>Wird ausgelöst, wenn der Benutzer das Video zum ersten Mal abspielt. Bei Autoplayvideos wird es ausgelöst, sobald der Benutzer mit dem Video interagiert. Da dieses Ereignis eine niedrige Vertrauensebene hat, kann es die meisten Aktionen nicht auslösen. Es können nur Aktionen der niedrigen Vertrauensebene ausgeführt werden wie z. B. <code>amp-animation</code>.</td>
    <td></td>
  </tr>
  <tr>
    <td>
<code>timeUpdate</code>(low-trust)</td>
    <td>Wird ausgelöst, wenn sich die Wiedergabeposition eines Videos geändert hat. AMP steuert die Häufigkeit des Ereignisses. Das vordefinierte Intervall beträgt 1 Sekunde. Da dieses Ereignis eine niedrige Vertrauensebene hat, kann es die meisten Aktionen nicht auslösen. Es können nur Aktionen der niedrigen Vertrauensebene ausgeführt werden wie z. B. <code>amp-animation</code>.</td>
    <td> <code>{time, percent}</code><code>time</code> gibt die aktuelle Zeit in Sekunden an, <code>percent</code> ist eine Zahl zwischen 0 und 1, und gibt die aktuelle Position als Prozentsatz der Gesamtzeit an.</td>
  </tr>
</table>

### form <a name="form"></a>

<table>
  <tr>
    <th width="25%">Event</th>
    <th width="35%">Beschreibung</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Fired when the form is submitted.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Fired when the form submission response is success.</td>
    <td><pre>// Response JSON.
event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Fired when the form submission response is an error.</td>
    <td><pre>// Response JSON.
event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Fired when the form is valid.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Fired when the form is invalid.</td>
    <td></td>
  </tr>
</table>

## Element-specific actions <a name="element-specific-actions"></a>

### * (all elements) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Action</th>
    <th>Beschreibung</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Hides the target element.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Shows the target element. If an     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> element</a> becomes visible as a     result, it gains focus.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Toggles the visibility of the target element. If an     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> element</a> becomes visible as a     result, it gains focus.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Toggles class of the target element. <code>force</code> is optional, and if defined, it ensures that class would only be added but not removed if set to <code>true</code>, and only removed but not added if set to <code>false</code>.</td>
  </tr>
  <tr>
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>Scrolls an element into view with a smooth animation.<br>     <code>duration</code> is optional. Specifies the length of the animation in milliseconds. If unspecified, an amount relative to scroll difference     under or equal to 500 milliseconds is used.<br>     <code>position</code> is optional. One of <code>top</code>, <code>center</code>     or <code>bottom</code> (default <code>top</code>).     Specifies the position of the element relative to the viewport after     scrolling.<br>     As an accessibility best practice, pair this with a call to <code>focus()</code> to focus on the element being scrolled to.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Makes the target element gain focus. To lose focus, <code>focus</code>     on another element (usually parent element). We strongly advise against     losing focus by focusing on <code>body</code>/<code>documentElement</code>     for accessibility reasons.</td>
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
    <td>Plays the audio. Is a no-op if the <code><amp-audio></code> element is a descendant of <code><amp-story></code>.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Pauses the audio. Is a no-op if the <code><amp-audio></code> element is a descendant of <code><amp-story></code>.</td>
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

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

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

### amp-lightbox <a name="amp-lightbox-1"></a>

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
    <td>Closes the lightbox.</td>
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

### amp-list <a name="amp-list-1"></a>

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

### amp-selector <a name="amp-selector-1"></a>

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

### amp-sidebar <a name="amp-sidebar-1"></a>

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

### amp-state <a name="amp-state-1"></a>

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
    <th>Description</th>
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
    <th>Description</th>
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
    <th>Description</th>
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
    <th>Description</th>
  </tr>
  <tr>
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Navigiert das aktuelle Fenster zur angegebenen URL oder zum optional definierten Ziel, sofern angegeben (unterstützt derzeit nur <code>_top</code> und <code>_blank </code>). Der optionale Parameter <code>opener</code> kann angegeben werden, wenn ein Ziel von <code>_blank</code> verwendet wird, damit die neu geöffnete Seite auf <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/opener"><code>window.opener</code></a> zugreifen kann. Unterstützt <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md">standardmäßige URL <br>Substitutionen</a>.</p>
      <p><strong>Caveat:</strong> Using normal <code><a></code> links is recommended wherever possible since <code>AMP.navigateTo</code> is not recognized by web crawlers.</p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Versucht, das Fenster zu schließen, sofern dies zulässig ist. Andernfalls wird ähnlich wie bei der Aktion <code>navigateTo</code> navigiert. Nützlich für Use Cases, in denen es sein kann, dass eine Schaltfläche "Zurück" das Fenster schließen muss, wenn es in einem neuen Fenster von der vorherigen Seite geöffnet wurde, oder wenn eine Navigation erforderlich ist, wenn das Fenster nicht geöffnet wurde.</p>
      <p><strong>Caveat:</strong> Using normal <code><a></code> links is recommended wherever possible since <code>AMP.closeOrNavigateTo</code> is not recognized by web crawlers.</p>
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

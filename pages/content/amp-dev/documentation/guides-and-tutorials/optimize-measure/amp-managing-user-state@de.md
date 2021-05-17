---
'$title': Status nicht authentifizierter Benutzer mit AMP verwalten
$order: 2
formats:
  - websites
teaser:
  text: '**Inhaltsverzeichnis**'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-managing-user-state.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

**Inhaltsverzeichnis**

- [Hintergrund](#background)
- [Anleitung zur Implementierung](#implementation-guide)
  - [Bevor du beginnst ](#before-getting-started)
  - [Aufgabe 1: Einrichtung eines Identifikators und Versand von Analytics Pings für nicht-AMP Seiten in der Quelle des Publishers ](#task1)
  - [Aufgabe 2: Einrichtung eines Identifikators für AMP Seiten und Versand von Analytics Pings mit Substitution der Client ID in amp-analytics Pings ](#task2)
  - [Aufgabe 3: Verarbeiten von Analytics Pings von Seiten in der Publisher Quelle ](#task3)
  - [Aufgabe 4: Verarbeiten von Analytics Pings aus dem Anzeigekontext eines AMP Cache oder AMP Viewers und Anlegen von Identifikatorzuordnungen (falls erforderlich)](#task4)
  - [Aufgabe 5: Verwendung der Client ID in Links und bei Formularübermittlungen ](#task5)
- [Dringende Empfehlungen ](#strongly-recommended-practices)

Der Benutzerstatus ist ein wichtiges Konzept im heutigen Web. Betrachte die folgenden Use Cases, die dank Benutzerstatus ermöglicht werden:

- Ein Händler implementiert einen **Warenkorb**, der Benutzern bei ihrem zweiten Besuch dieselben Artikel anzeigt, die sie bei ihrem ersten Besuch mehrere Wochen zuvor in den Warenkorb gelegt haben. Dieses Feature erhöht die Wahrscheinlichkeit, dass Benutzer diese Artikel kaufen, denn sie werden daran erinnert, dass sie den Kauf der Artikel bereits in Betracht gezogen haben.
- Ein Nachrichtenportal, das auf der Grundlage bereits gelesener Artikel eine Auswahl an **empfohlenen Artikeln** für Leser zusammenstellen kann, damit diese involviert bleiben und weitere Inhalte entdecken.
- Ein Webentwickler mit einer Website beliebigen Typs, der mithilfe von **Analytics** ermittelt, ob zwei Seitenaufrufe von derselben Person ausgingen oder ob zwei verschiedene Personen jeweils eine einzelne Seite angesehen haben. Mit solchen Erkenntnissen lässt sich messen, ob eine Website erfolgreich ist und wie sie verbessert werden kann.

Dieser Artikel soll dabei helfen, **den Status nicht authentifizierter Benutzer in AMP** erfolgreich zu verwalten, um eine nahtlose Benutzerführung zu ermöglichen, selbst wenn der Benutzer seine Identität nicht mit einer Aktion wie der Anmeldung bestätigt hat. Dieser Leitfaden gibt einen Überblick über einige der Herausforderungen und Überlegungen zu diesem Thema, beschreibt die Unterstützung des Benutzerstatus durch AMP und gibt Empfehlungen für die Herangehensweise an die technische Implementierung.

## Hintergrund <a name="background"></a>

Das Thema des Benutzerstatus verdient in AMP besondere Aufmerksamkeit, da AMP Seiten in mehreren Kontexten angezeigt werden können, z. B. auf deiner Website, in der Google Suche oder in der App eines Drittanbieters. Wenn Benutzer zwischen diesen Kontexten wechseln, entstehen gewisse Herausforderungen bei der Verwaltung des Benutzerstatus.

### Kontexte von AMP Seiten anzeigen <a name="display-contexts-for-amp-pages"></a>

Du kannst dir AMP als ein portables Format für Content vorstellen, mit dem Inhalte überall schnell geladen werden können. AMP Dokumente können in drei nennenswerten Kontexten angezeigt werden:

- in der Quelle des Publishers
- in einem AMP Cache
- in einem AMP Viewer

<table>
  <tr>
    <th width="20%">Kontext</th>
    <th width="20%">Können Seiten ohne AMP von hier aus bereitgestellt werden?</th>
    <th width="20%">Können AMP Seiten von hier aus bereitgestellt werden?</th>
    <th>Beispiel-URL</th>
  </tr>
  <tr>
    <td>Quelle des Publishers</td>
    <td>Ja</td>
    <td>Ja</td>
    <td><code>https://example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>AMP Cache</td>
    <td>Nein</td>
    <td>Ja</td>
    <td><code>https://example-com.cdn.ampproject.org/s/example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>AMP Viewer</td>
    <td>Nein</td>
    <td>Ja</td>
    <td><code>https://google.com/amp/s/example.com/article.amp.html</code></td>
  </tr>
</table>

Sehen wir uns jede dieser Situationen genauer an.

**Kontext Nr. 1: Quelle des Publishers.** AMP Seiten werden so bereitgestellt, dass sie ursprünglich auf der Website des Publisher gehostet werden und über diese zugänglich sind. So kann z. B. unter `https://example.com` die Seite `https://example.com/article.amp.html` aufgerufen werden.

Publisher können wählen, ob sie ausschließlich in AMP veröffentlichen möchten oder zwei Versionen von Inhalten bereitstellen (d. h. AMP Inhalte in Kombination mit Inhalten ohne AMP). Das kombinierte Modell setzt einige [besondere Schritte](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery) voraus, die sicherstellen, dass die AMP Versionen der Seiten von Suchmaschinen, Social Media Websites und anderen Plattformen gefunden werden können. Beide Ansätze werden vollständig unterstützt. Es liegt beim Publisher, sich für eine Variante zu entscheiden.

> **HINWEIS:**
> Das soeben beschriebene kombinierte Veröffentlichungsmodell macht die Quelle des Publishers (im obigen Beispiel `https://example.com`) zu einem Kontext, in dem **sowohl auf AMP Inhalte als auch auf Inhalte ohne AMP zugegriffen werden kann**. Dies ist auch der einzige Kontext, in dem das der Fall ist, da AMP Caches und AMP Viewer (wie nachfolgend beschrieben) nur gültige AMP Inhalte bereitstellen.

**Kontext 2: Ein AMP Cache.** AMP Dateien können im Cache eines Drittanbieters in der Cloud zwischengespeichert werden, um die Dauer der Bereitstellung von Content auf den mobilen Geräten der Benutzer zu reduzieren.

Wenn Content Ersteller das AMP Format nutzen, stellen sie die Inhalte in ihren AMP Dateien Caches von Drittanbietern zur Zwischenspeicherung zur Verfügung. In dieser Art von Framework kontrollieren Publisher weiterhin ihre Inhalte (indem sie wie oben beschrieben in ihrer Quelle veröffentlichen). Gleichzeitig können Plattformen die Inhalte zwischenspeichern oder spiegeln, um Benutzern eine optimale Übertragungsgeschwindigkeit zu bieten.

Traditionell haben die auf diese Weise bereitgestellten Inhalte ihren Ursprung in einer anderen Domäne. Der [Google AMP Cache](https://developers.google.com/amp/cache/overview) verwendet z. B. `https://cdn.ampproject.org` zur Bereitstellung von Inhalten, z. B. `https://example-com.cdn.ampproject.org/s/example.com/article.amp.html`.

**Kontext 3: ein AMP Viewer.** Das AMP Format unterstützt die Einbettung in die AMP Viewer von Drittanbietern. Dies ermöglicht ein hohes Maß an Interaktion zwischen der AMP Datei und der Darstellung im Viewer. Die Vorteile: intelligentes und sicheres Vorladen und Prerendering von Inhalten sowie innovative Möglichkeiten wie das Wechseln zwischen ganzen AMP Seiten durch Wischen.

Genau wie beim AMP Cache kannst du auch hier davon ausgehen, dass sich die Domäne des AMP Viewers von der Quelle des Publishers unterscheidet. Der Viewer der Google Suche wird beispielsweise auf `https://google.com` gehostet und bettet einen iframe ein, der den Publisher Content aus dem Google AMP Cache anfordert.

### Mehrere Kontexte bedeutet die Verwaltung mehrerer Statusvarianten <a name="multiple-contexts-means-multiple-state-management"></a>

Publisher müssen sich darauf einstellen, den Benutzerstatus für jeden Anzeigekontext separat zu verwalten. Das Feature [Client ID](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#client-id) von AMP, das Cookies und lokalen Speicher nutzt, um den Status dauerhaft zu speichern, bietet die erforderliche Unterstützung, um AMP Seiten mit einem stabilen und pseudonymen Identifikator für Benutzer auszustatten. Aus Sicht der Implementierung werden entweder Cookies oder lokaler Speicher verwendet, und AMP entscheidet je nach Anzeigekontext, welche der Varianten verwendet werden soll. Diese Wahl wird durch die technische Umsetzbarkeit der Statusverwaltung beeinflusst, skaliert auf Hunderte oder Tausende von Publishern.

Es kann jedoch sein, dass Publisher von AMP Seiten ungewollt eine Benutzerführung entwickeln, die über mehrere Kontexte geht. Sehen wir uns noch einmal den Use Case mit dem Warenkorb an und erweitern wir ihn um weitere Details, um daraus eine vollwertige **User Story** zu machen:

> _An Tag 1 entdeckt eine Benutzerin eine AMP Seite von Example Inc. über die Google Suche. Die Google Suche lädt AMP Seiten in einem AMP Viewer. Während des Seitenbesuchs legt die Benutzerin vier Artikel in den Warenkorb, geht damit jedoch nicht zur Kasse. Zwei Wochen später, an Tag 15, erinnert sie sich an die vier Artikel, die sie kaufen wollte, und entscheidet sich, diese jetzt zu kaufen. Sie greift direkt auf die Homepage von Example Inc. unter `https://example.com` zu (eine Homepage ohne AMP) und stellt fest, dass ihre vier Artikel noch im Warenkorb gespeichert sind._

In diesem Szenario hat die Benutzerin ein einheitliches Erlebnis mit dem Warenkorb, obwohl sie vom Kontext des AMP Viewers zum Kontext der Publisher Quelle gewechselt ist – und obwohl zwischen diesen Ereignissen einige Zeit vergangen ist. Ein solches Erlebnis ist durchaus wünschenswert, und als Designer von Shoppingabläufen solltest du seine Implementierung unterstützen. Die Frage ist: Wie machst du das?

**Um dieses Erlebnis sowie alle anderen Erfahrungen mit Fokus auf Benutzerstatus zu ermöglichen, müssen alle Kontexte, die Benutzer durchlaufen, ihren individuell verwalteten Status miteinander teilen.** "Perfekt!", denkst du vielleicht und möchtest die Werte der Cookies mit Benutzer IDs über die Kontextgrenzen hinweg teilen. Ein kleines Problem: Obwohl in jedem dieser Kontexte Content angezeigt wird, der von ein und demselben Publisher kontrolliert wird, sehen die Kontexte einander als Drittanbieter, da sie sich in unterschiedlichen Domänen befinden.

<amp-img alt="AMP's ability to be displayed in many contexts means that each of those contexts has its own storage for identifiers" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/contexts-with-different-storage.png" width="1030" height="868">
  <noscript><img alt="Die Fähigkeit von AMP, in vielen Kontexten angezeigt zu werden, bedeutet, dass jeder dieser Kontexte über einen eigenen Speicher für Bezeichner verfügt" src="https://github.com/ampproject/amphtml/raw/main/spec/img/contexts-with-different-storage.png"></noscript></amp-img>

Wie du nachfolgend sehen wirst, kann es je nach Konfiguration der Browsereinstellungen des Benutzers eine Herausforderung darstellen, sich bei der Interaktion mit Cookies in der Position eines Drittanbieters zu befinden. Insbesondere gilt: Wenn Cookies von Drittanbietern in einer bestimmten Situation blockiert werden, können Informationen nicht kontextübergreifend ausgetauscht werden. Wenn Vorgänge mit Cookies von Drittanbietern zulässig sind, können Informationen gemeinsam genutzt werden.

## Anleitung zur Implementierung <a name="implementation-guide"></a>

Dieser Abschnitt enthält Empfehlungen zur Verwaltung des Benutzerstatus. Die folgenden Aufgaben werden als eine Sequenz dargestellt, können aber in zwei grundlegende Abschnitte unterteilt werden:

**Abschnitt 1: Grundlegende Implementierung:** Die Aufgaben 1 bis 4 sind wesentlich für die grundlegende Funktion der Verwaltung. Sie sind auf eine minimale Auswahl von Features angewiesen, die für eine teilweise Umsetzung der Aufgabe erforderlich sind: die Substitution der Client ID durch AMP, das Lesen und Schreiben von Cookies und das Anlegen und Verwalten einer Zuordnungstabelle im Backend. Warum nur "teilweise"? Diese Aufgaben sind höchstwahrscheinlich nicht ausreichend, um den Benutzerstatus in allen Szenarien vollständig zu verwalten, da die dafür vorgenommenen Schritte auf die Möglichkeit zum Lesen und Schreiben von Cookies angewiesen sind. Das kann jedoch durch die Cookie Einstellungen des Browsers unter bestimmten Umständen verhindert werden.

Nach diesen Grundlagen sehen wir uns ein Thema mit einer engeren Auswahl an Use Cases an, das jedoch eine vollständige Lösung für diese Use Cases bietet.

**Abschnitt 2: Verwendung der Client ID beim Verlinken und Übermitteln von Formularen:** In Aufgabe 5 erfährst du, welche Vorteile es hat, die Informationen zur AMP Client ID mittels Linkübergängen und/oder Formularübermittlungen kontextübergreifend weiterzugeben, während die Benutzer von einer Seite direkt zu einer anderen wechseln.

> **ACHTUNG:**
> Die folgende Anleitung zur Implementierung rät zur Verwendung von Cookies. Sieh dir unbedingt den Abschnitt [Dringende Empfehlungen](#strongly-recommended-practices) mit wichtigen Vorschlägen an, die zu beachten sind.

### Bevor du beginnst <a name="before-getting-started"></a>

In der folgenden technischen Anleitung gehen wir davon aus, dass du den **Benutzerstatus** an einen stabilen **Identifikator** bindest, der den Benutzer repräsentiert. Der Identifikator könnte zum Beispiel so aussehen: `n34ic982n2386n30`. Auf der Serverseite verknüpfst du den Identifikator `n34ic982n2386n30` dann mit einer beliebigen Auswahl von Informationen zum Benutzerstatus, z. B. dem Inhalt des Warenkorbs, einer Liste von bereits gelesenen Artikeln oder anderen Daten – je nach Use Case.

<amp-img alt="A single identifier could be used to manage user state for many use cases" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/identifiers-for-use-cases.png" width="1276" height="376">
  <noscript><img alt="Eine einzelne Kennung kann verwendet werden, um den Benutzerstatus für viele Anwendungsfälle zu verwalten" src="https://github.com/ampproject/amphtml/raw/main/spec/img/identifiers-for-use-cases.png"></noscript></amp-img>

Aus Gründen der Übersichtlichkeit werden wir im Weiteren die Zeichenfolgen, die als Identifikatoren fungieren, mit lesbaren Namen ersetzen, denen ein Dollarzeichen (`$`) vorangestellt ist:

[sourcecode:text] n34ic982n2386n30 ⇒ $sample_id [/sourcecode]

**Unser Use Case:** In dieser Anleitung werden wir an einem Beispiel arbeiten, mit dem wir ein einfaches Tracking von Seitenaufrufen (Analytics) umsetzen wollen, um eine möglichst präzise Benutzerzählung zu erreichen. Das bedeutet: Selbst wenn Benutzer aus verschiedenen Kontexten (einschließlich einer Kombination aus AMP Seiten und Seiten ohne AMP) auf den Inhalt eines bestimmten Publishers zugreifen, sollen diese Besuche einem einzelnen Benutzer zugeordnet werden, so als würde dieser sich nur auf traditionellen nicht-AMP Seiten dieses Publishers bewegen.

**Annahme der Verfügbarkeit stabiler Cookie Werte:** Wir gehen außerdem davon aus, dass der Benutzer ein einziges Gerät, einen einzigen Browser und nicht den privaten bzw. Inkognito Modus verwendet, um sicherzustellen, dass die Cookie Werte über die Sitzungen des Benutzers hinweg für längere Zeit erhalten bleiben und verfügbar sind. Ist dies nicht der Fall, können wir nicht erwarten, dass diese Methoden funktionieren. Ist dies dennoch erforderlich, solltest du den Benutzerstatus auf der Basis der authentifizierten (angemeldeten) Identität des Benutzers verwalten.

**Die nachfolgend beschriebenen Konzepte können auf andere Use Cases erweitert werden:** Zwar fokussieren wir uns nur auf den Use Case "Analytics", aber die folgenden Konzepte können auf andere Use Cases, die eine kontextübergreifende Verwaltung des Benutzerstatus erfordern, zugeschnitten werden.

<a id="task1"></a>

### Aufgabe 1: Einrichtung eines Identifikators und Versand von Analytics Pings für nicht-AMP Seiten in der Quelle des Publishers <a name="task-1-for-non-amp-pages-on-the-publisher-origin-set-up-an-identifier-and-send-analytics-pings"></a>

Beginnen wir mit der Konfiguration von Analytics für Seiten ohne AMP, die von der Quelle des Publishers aus bereitgestellt werden. Dies kann auf viele Arten erreicht werden. Dazu gehört der Einsatz eines Analytics Pakets wie Google Analytics oder Adobe Analytics oder eine benutzerdefinierte Implementierung.

Wenn du das Analytics Paket eines Anbieters verwendest, übernimmt das Paket höchstwahrscheinlich sowohl die Einrichtung von Cookies als auch die Übermittlung von Pings via Konfigurationscode und APIs. In einem solchen Fall solltest du dir die folgenden Schritte ansehen, um sicherzustellen, dass sie mit deiner Herangehensweise an Analytics im Einklang stehen. Du kannst jedoch grundsätzlich davon ausgehen, dass du im Rahmen dieser Aufgabe keine Änderungen vornehmen musst.

Der Rest dieser Aufgabe bietet eine Anleitung zur Einrichtung deiner eigenen Analytics Funktionen.

##### Richte einen Identifikator mithilfe von Erstanbieter-Cookies ein <a name="set-up-an-identifier-using-first-party-cookies"></a>

Wenn du Seiten ohne AMP von deiner Publisher Quelle erhältst, richte einen permanenten und stabilen Identifikator ein, der auf diesen Seiten verwendet werden soll. Dies wird normalerweise [mithilfe von Erstanbieter-Cookies](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking) implementiert.

Für unser Beispiel nehmen wir an, dass du ein Cookie namens `uid` ("user identifier") eingerichtet hast, das beim ersten Besuch eines Benutzers angelegt wird. Ist dies nicht der erste Besuch des Benutzers, soll der Wert ausgelesen werden, der zuvor beim ersten Besuch gespeichert wurde.

Das bedeutet, dass es zwei mögliche Fälle für den Status von Seiten ohne AMP in der Quelle des Publishers gibt:

**Fall Nr. 1: Der erste Besuch.** Beim ersten Aufruf der Seite ohne AMP gibt es noch keinen Cookie. Wenn du den Cookie abrufst, bevor er angelegt wurde, siehst du, dass keine Werte im Cookie gespeichert sind, die dem `uid` entsprechen:

[sourcecode:bash]

> document.cookie
> ""
> [/sourcecode]

Irgendwann während des ersten Ladevorgangs sollte der Cookie angelegt werden. Wenn du ihn nach dem Laden der Seite abrufst, siehst du, dass darin ein Wert gespeichert wurde:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

**Fall 2: Erneuter Besuch.** Es gibt bereits einen Cookie. Wenn du also die Entwicklerkonsole auf der Seite öffnest, siehst du Folgendes:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

##### Versand von Analytics Pings <a name="send-analytics-pings"></a>

Sobald du den Identifikator eingerichtet hast, kannst du ihn in Analytics Pings integrieren, um Seitenaufrufe nachzuverfolgen.

Die spezifische Implementierung hängt von deiner gewünschten Konfiguration ab. Grundsätzlich wirst du aber vermutlich Pings (Anfragen) mit nützlichen Daten in der URL der Anfrage an deinen Analytics Server senden. Das folgende Beispiel zeigt, wie du deinen Cookie Wert in die Anfrage aufnimmst:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier
[/sourcecode]

Beachte, dass der Identifikator des Benutzers im obigen Beispiel mit dem speziellen Abfrageparameter `user_id` gekennzeichnet ist:

[sourcecode:text]
user_id=$publisher_origin_identifier
[/sourcecode]

Die Verwendung von "`user_id`" wird hier durch das bestimmt, was dein Analytics Server zur Verarbeitung erwartet, und ist nicht an den konkreten Namen des Cookies gebunden, der den Identifikator lokal speichert.

<a id="task2"></a>

### Aufgabe 2: Einrichtung eines Identifikators für AMP Seiten und Versand von Analytics Pings mit Substitution der Client ID in amp-analytics Pings <a name="task-2-for-amp-pages-set-up-an-identifier-and-send-analytics-pings-by-including-client-id-replacement-in-amp-analytics-pings"></a>

Sehen wir uns nun an, wie du für AMP Seiten einen Identifikator für Analytics erstellst und übermittelst. Dies funktioniert unabhängig vom Kontext, in dem die AMP Seite dargestellt wird, und gilt somit für alle AMP Seiten in der Quelle des Publishers, die über einen AMP Cache bereitgestellt oder im AMP Viewer angezeigt werden.

Wenn Funktionen verwendet werden, die Client IDs erfordern, arbeitet AMP hinter den Kulissen, um die Werte der Client IDs zu generieren, zu speichern und an die Funktionen zu übergeben, die diese benötigen. Eine der Hauptfunktionen, welche die Client ID von AMP verwenden kann, ist [amp-analytics](https://amp.dev/documentation/components/amp-analytics). Eben diese brauchen wir zur Implementierung unseres Beispiels für den Analytics Use Case.

Erstelle auf AMP Seiten einen amp-analytics Ping mit der Client ID:

<table>
  <tr>
    <td width="40%"><strong>So sieht die Konfiguration von amp-analytics aus:</strong></td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=${clientId(uid)}</code></td>
  </tr>
  <tr>
    <td><strong>Das hier wird über das Netzwerk übermittelt:</strong></td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id</code><p><em>In diesem Fall wird <code>${clientId(uid)}</code> durch einen tatsächlichen Wert ersetzt, den AMP entweder zu diesem Zeitpunkt generiert oder der auf Basis der Daten zurückgegeben wird, die der Browser des Benutzers bereits lokal gespeichert hat.</em></p>
</td>
  </tr>
</table>

Beachte, dass der Parameter, der an die Substitution der Client ID `${clientId(uid)` übergeben wird, `uid` ist. Wir haben bewusst einen Namen gewählt, der mit dem Cookie Namen übereinstimmt, der – wie in [Aufgabe 1](#task1) beschrieben – in der Quelle des Publishers verwendet wird. Für eine nahtlose Integration solltest du dieselbe Methode anwenden.

Weitere Informationen zur Implementierung von amp-analytics, zum Einrichten von amp-analytics Anfragen oder zum Ändern der Anfragen deines Analytics Anbieters findest du in der Dokumentation zur [Konfiguration von amp-analytics](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/). Der Ping kann noch weiter angepasst werden, um zusätzliche Daten zu übertragen, die du entweder direkt definierst oder mithilfe anderer [AMP Substitutionen](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) ermittelst.

> **Gut zu wissen:**
> Warum haben wir den Namen `uid` für den Parameter verwendet, der an die Client ID Funktion übergeben wird? Mithilfe des Parameters, den die Substitution `clientId(...)` verwendet, wird der Geltungsbereich ("scope") definiert. Du kannst die Client ID Funktion in vielen Use Cases verwenden und als Ergebnis viele Client IDs generieren. Da der Parameter zwischen diesen Use Cases unterscheidet, kannst du damit angeben, für welche Use Cases du eine Client ID benötigst. So kannst du z. B. mithilfe des Parameters für den Geltungsbereich verschiedene Identifikatoren an Drittanbieter wie Werbetreibende senden.

In der Publisher Quelle ist es am einfachsten, als Geltungsbereich den Namen zu sehen, den du dem Cookie zugewiesen hast. Wenn wir in <a>Aufgabe 2</a> den Wert <code>uid</code> für den Client ID Parameter empfehlen, orientieren wir uns an der Entscheidung, in <a>Aufgabe 1</a> ein Cookie namens <code>uid</code> zu verwenden.

<a id="task3"></a>

### Aufgabe 3: Verarbeiten von Analytics Pings von Seiten in der Publisher Quelle <a name="task-3-process-analytics-pings-from-pages-on-the-publisher-origin"></a>

Aufgrund des in den Aufgaben 1 und 2 durchgeführten Setups wird der Analytics Ping denselben Identifikator verwenden, wenn jemand aus einem beliebigen Kontext heraus auf die AMP Version oder auf die Version ohne AMP in der Quelle des Publishers zugreift. Wenn du die Anleitung in [Aufgabe 2](#task2) befolgst, um einen Geltungsbereich für die Client ID auszuwählen, der denselben Namen hat wie der Name des in [Aufgabe 1](#task1) verwendeten Cookies, wird AMP denselben Cookie erneut verwenden.

Das wird in der folgenden Tabelle veranschaulicht:

<table>
  <tr>
    <td width="40%">So sieht ein Analytics Ping aus, der von einer <strong>nicht-AMP Seite in der Publisher Quelle</strong> ausgeht:</td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code></td>
  </tr>
  <tr>
    <td>So sieht ein Analytics Ping aus, der von einer <strong>AMP Seite in der Publisher Quelle</strong> ausgeht:</td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code><br><em>In diesem Fall ist es der gleiche Ping! Indem <code>uid</code> als Wert für den Geltungsbereich gewählt wird, wird der zugrunde liegende Wert des <code>uid</code> Cookies, nämlich <code>$publisher_origin_identifier</code>, verwendet.</em>
</td>
  </tr>
</table>

<a id="task4"></a>

### Aufgabe 4: Verarbeiten von Analytics Pings aus dem Anzeigekontext eines AMP Cache oder AMP Viewers und Anlegen von Identifikatorzuordnungen (falls erforderlich) <a name="task-4-process-analytics-pings-from-amp-cache-or-amp-viewer-display-contexts-and-establish-identifier-mappings-if-needed"></a>

Bei der Einrichtung von Analytics Pings in [Aufgabe 2](#task2) zum Übertragen von Daten von AMP Seiten, die in einem AMP Cache oder AMP Viewer angezeigt werden, haben wir ein Problem verursacht: Wie bereits erwähnt, unterscheiden sich die Kontexte von AMP Cache und AMP Viewer vom Kontext der Publisher Quelle, was sich auch in unterschiedlichen Methoden der Verwaltung von Identifikatoren widerspiegelt. Um diese Pings zu verarbeiten und Probleme wie die Überzählung von Benutzern zu vermeiden, werden wir einige [Schritte](#implementation-steps) vornehmen, um zu versuchen, Identifikatoren so oft wie möglich untereinander abzustimmen.

Bevor wir die einzelnen Schritte erläutern, sollten wir uns genau ansehen, wie das Problem der Überzählung eigentlich auftritt.

#### Das Problem <a name="reviewing-the-problem"></a>

Betrachte den folgenden Ablauf:

1. Ein Benutzer besucht die **AMP Seite im Anzeigekontext eines AMP Viewers**, z. B. `https://google.com/amp/s/example.com/article.amp.html`. Da der AMP Viewer keinen Zugriff auf den `uid` Cookie in der Publisher Quelle hat, wird ein zufälliger Wert von `$amp_client_id` generiert, um den Benutzer zu identifizieren.
2. Der gleiche Benutzer besucht dann **die Seite `https://example.com` in der Publisher Quelle**. Wie in [Aufgabe 3](#task3) beschrieben, wird der Benutzer mit `$publisher_origin_identifier` identifiziert.

Die Vorgänge unter (1) und (2) erfolgen hier in unterschiedlichen Quellen (oder Kontexten). Aus diesem Grund gibt es keinen gemeinsamen Status, und `$amp_client_id` unterscheidet sich von `$publisher_origin_identifier`. Was ist also das Ergebnis? (1) ist eine Sitzung mit einem einzelnen Seitenaufruf, die von einem Benutzer auszugehen scheint, während (2) eine weitere Sitzung mit einem einzelnen Seitenaufruf ist, die von einem anderen Benutzer auszugehen scheint. **Das heißt also, dass wir zu viele Benutzer gezählt haben und der Benutzer in (1) nach einem einzelnen Seitenaufruf abgesprungen zu sein scheint, obwohl er sich mit den Inhalten auf `https://example.com` beschäftigt hat.**

#### Die Lösungsstrategie <a name="solution-strategy"></a>

Um das Problem der Überzählung zu lösen, solltest du die folgende Strategie anwenden. Ihre Wirksamkeit hängt davon ab, ob das Lesen oder Schreiben von Cookies von Drittanbietern zulässig ist:

- **Sofortige Abstimmung von Identifikatoren: Wenn du auf die Cookies aus der Publisher Quelle zugreifen oder diese bearbeiten kannst**, verwende oder erstelle einen Identifikator für die Publisher Quelle und ignoriere alle Identifikatoren innerhalb der Analytics Anfrage. So kannst du die Aktivität zwischen den beiden Kontexten erfolgreich verknüpfen.
- **Verzögerte Abstimmung von Identifikatoren: Wenn du nicht auf den Identifikator der Publisher Quelle (also die Cookies) zugreifen oder diesen bearbeiten kannst**, verwende die AMP Client ID, die in der eigentlichen Analytics Anfrage enthalten ist, als Fallback. Verwende den Identifikator als "**Alias**", anstatt einen neuen Identifikator (Cookie) für die Publisher Quelle zu verwenden oder zu erstellen (da du dies aufgrund der Blockierung von Cookies von Drittanbietern nicht tun kannst), und füge den Alias einer **Zuordnungstabelle** hinzu. Du wirst nicht in der Lage sein, die Aktivitäten zwischen beiden Kontexten sofort zu verknüpfen. Mithilfe einer Zuordnungstabelle kannst du jedoch eventuell den Wert der AMP Client ID bei einem zukünftigen Besuch des Benutzers mit dem Identifikator der Publisher Quelle verknüpfen. In einem solchen Fall erhältst du die erforderlichen Informationen, um die Aktivität zu verknüpfen und die Seitenaufrufe untereinander so abzustimmen, dass deutlich wird, dass sie vom selben Benutzer in verschiedenen Kontexten stammen. In Aufgabe 5 wird beschrieben, wie du eine Gesamtlösung in bestimmten Szenarien erreichst, in denen der Benutzer sofort von einer Seite zur nächsten wechselt.

#### Implementierungsschritte <a name="implementation-steps"></a>

Suche auf dem Server nach einem vorhandenen Identifikator der Publisher Quelle.

Lies die Cookies aus, die als Teil der Analytics Anfrage gesendet wurden. In unserem Beispiel müssen wir den Cookie `uid` von example.com finden.

- Wenn der Wert von `uid` erfolgreich ausgelesen wurde, verwende ihn zum Aufzeichnen von Daten für Analytics (**Identifikator für Analyseeinträge**). Nach [Aufgabe 1](#task1) wissen wir, dass der Wert dieses Identifikators `$publisher_origin_identifier` ist. Sobald ein Identifikator für Analyseeinträge feststeht, können wir mit dem Abschnitt [Datenspeicherung](#data-storage) fortfahren.
- Wenn der `uid` Wert nicht erfolgreich ausgelesen wird, fahre mit der nachfolgend beschriebenen Zuordnungstabelle und den zugehörigen Schritten fort.

##### Zuordnungstabelle <a name="mapping-table"></a>

In unserer Zuordnungstabelle werden die Werte der AMP Client IDs, die in den Analytics Pings angezeigt werden, wie folgt den Identifikatoren in der Publisher Quelle zugeordnet:

<table>
  <tr>
    <th width="50%"><strong>Benutzer ID in der Quelle des Publishers</strong></th>
    <th width="50%"><strong>Benutzer ID auf einer AMP Seite NICHT in der Quelle des Publishers ("Alias")</strong></th>
  </tr>
  <tr>
    <td>Stammt vom Identifikator in der Publisher Quelle oder wird als zukünftiger Wert generiert, wenn der Identifikator in der Publisher Quelle nicht ausgelesen werden kann.</td>
    <td>Stammt von AMP Client ID</td>
  </tr>
</table>

Wenn du feststellst, dass du den Identifikator in der Quelle des Publishers nicht auslesen konntest, überprüfe sofort, ob die im Analytics Ping enthaltene AMP Client ID bereits Teil einer Zuordnung ist. Sieh dir dazu zunächst die eingehende Anfrage von amp-analytics an, um den Client ID Wert auszulesen. Angenommen, die Anfrage sieht wie folgt aus:

[sourcecode:http] https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id [/sourcecode]

Wir extrahieren daraus den fett gedruckten Teil, welcher der AMP Client ID entspricht: `$amp_client_id`.

Untersuche als Nächstes die Zuordnungstabelle, um denselben Wert in der Spalte "Alias" zu finden:

<table>
  <tr>
    <th width="50%"><strong>Benutzer ID in der Quelle des Publishers</strong></th>
    <th width="50%"><strong>Benutzer ID auf einer AMP Seite NICHT in der Quelle des Publishers ("Alias")</strong></th>
  </tr>
  <tr>
    <td><code>$existing_publisher_origin_identifier</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Im obigen Beispiel finden wir einen bereits vorhandenen Eintrag. Der gefundene Wert, welcher der AMP Client ID zugeordnet ist, wird zum Identifikator für Analyseeinträge. In diesem Fall ist dies `$existing_publisher_origin_identifier`. Sobald ein Identifikator für Analyseeinträge feststeht, können wir mit dem Abschnitt [Datenspeicherung](#data-storage) fortfahren.

Andernfalls müssen wir eine Zuordnung erstellen, wenn die AMP Client ID nicht in einer der Zuordnungen gefunden wird:

1. Generiere einen **zukünftigen Identifikator in der Publisher Quelle**. In unseren weiteren Beispielen nennen wir ihn `$prospective_identifier`. Berücksichtige bei der Erstellung dieses Wertes dein Setup des Wertes in der Publisher Quelle, wie oben in [Aufgabe 1](#task1) beschrieben.
2. Versuche als Nächstes, den zukünftigen Identifikator in der Publisher Quelle als Cookie in der Publisher Quelle [anzulegen](https://en.wikipedia.org/wiki/HTTP_cookie#Setting_a_cookie). Das gelingt nur, wenn das Schreiben von Cookies von Drittanbietern zulässig ist. Andernfalls schlägt der Versuch fehl.
3. Speichere anschließend das Paar {zukünftiger Identifikator in der Publisher Quelle, AMP Client ID}.

Die so erstellte Zuordnung sieht folgendermaßen aus:

<table>
  <tr>
    <th><strong>Benutzer ID in der Quelle des Publishers</strong></th>
    <th><strong>Benutzer ID auf einer AMP Seite NICHT in der Quelle des Publishers ("Alias")</strong></th>
  </tr>
  <tr>
    <td>
<code>$prospective_identifier</code> (wird bei Bedarf generiert, wenn der Analytics Ping empfangen wird)</td>
    <td>
<code>$amp_client_id</code> (stammt aus Analytics Ping)</td>
  </tr>
</table>

Wir verwenden den zukünftigen Identifikator in der Publisher Quelle als Identifikator für Analyseeinträge, da dieser Wert dem Status in der Publisher Quelle zugeordnet ist. In diesem Fall ist dies `$prospective_identifier`. Dieser Wert wird im folgenden Abschnitt zur [Datenspeicherung](#data-storage) verwendet.

##### Datenspeicherung <a name="data-storage"></a>

Jetzt kennst du den Identifikator für Analyseeinträge und kannst die Informationen zum Benutzerstatus (in diesem Fall Daten für Analytics) speichern, die zu diesem Identifikator gehören:

[sourcecode:text] {analytics record identifier, analytics data ...} [/sourcecode]

<a id="task5"></a>

### Aufgabe 5: Verwendung der Client ID in Links und bei Formularübermittlungen <a name="task-5-using-client-id-in-linking-and-form-submission"></a>

Wenn das Lesen und Schreiben von Cookies von Drittanbietern nicht zulässig ist, können Situationen entstehen, in denen der Benutzerstatus nicht effektiv verwaltet werden kann. Die Schritte, die wir in den Aufgaben 1 bis 4 unternommen haben, helfen uns auf zwei Arten: (1) Sie bieten eine vollständig effektive Lösung in Situationen, in denen das Lesen und Schreiben von Cookies von Drittanbietern zulässig ist, und (2) sie richten unser System so ein, dass wir jede Möglichkeit nutzen, kontextübergreifende Identifikatoren abzustimmen, sollte eine sofortige Abstimmung aufgrund der Cookie Einstellungen des Browsers nicht möglich sein.

Bei dieser Aufgabe besprechen wir eine zusätzliche Optimierung, die hilfreich ist, wenn Benutzer von einer Seite zur anderen **via Verlinkung oder Formularübermittlung** navigieren – und sich damit zwischen mehreren Kontexten bewegen. In solchen Situationen ist es mithilfe der nachfolgend beschriebenen Implementierungsschritte möglich, ein rundum wirksames Schema für die kontextübergreifende Verwaltung des Benutzerstatus einzurichten.

<amp-img alt="Links can be used to pass the identifier information of one context into another (linked) context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-form-identifier-forwarding.png" width="866" height="784">
  <noscript><img alt="Links können verwendet werden, um die Bezeichnungsinformationen eines Kontexts in einen anderen (verknüpften) Kontext zu übertragen" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-form-identifier-forwarding.png"></noscript></amp-img>

##### Verwenden von Substitutionsfunktionen <a name="using-substitution-features"></a>

Bei unserem Ansatz nutzen wir zwei Arten von [Variablensubstitution in AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-var-substitutions.md).

**Wenn ausgehende Links eine Client ID Substitution verwenden sollen:** Definiere einen neuen Abfrageparameter, `ref_id` ("Referrer ID"), der innerhalb der URL platziert wird und **den Identifikator des ursprünglichen Kontextes** für den Benutzer angibt. Gib diesem Abfrageparameter den Wert der AMP Client ID Substitution:

[sourcecode:html]
<a
href="https://example.com/step2.html?ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Alternative Lösung für die Übergabe der Client ID an ausgehende Links:** Definiere den neuen Abfrageparameter `ref_id` als Teil des Datenattributs `data-amp-addparams` und stelle Abfragen, die eine Parametersubstitution erfordern, die entsprechenden Informationen als Teil von `data-amp-replace` bereit. Bei diesem Ansatz bleibt die URL übersichtlich, und die in `data-amp-addparams` angegebenen Parameter werden dynamisch hinzugefügt.

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

Um mehrere Abfrageparameter via `data-amp-addparams` zu übergeben, trenne diese durch das Zeichen `&` voneinander:

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)&pageid=p123"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Wenn Formulareingaben eine Client ID Substitution verwenden sollen:** Definiere einen Namen für das Eingabefeld, z. B. `orig_user_id`. Gib dem `default-value` des Formularfelds den Wert der AMP Client ID Substitution:

[sourcecode:html]
<input
  name="ref_id"
  type="hidden"
  value="CLIENT_ID(uid)"
  data-amp-replace="CLIENT_ID"
/>
[/sourcecode]

Diese Schritte sorgen dafür, dass die Client ID auf dem Zielserver und/oder als URL Parameter auf der Seite verfügbar ist, auf der Benutzer nach dem Klick auf einen Link oder einer Formularübermittlung landen (**Zielkontext**). Der Name (oder "Schlüssel") ist `ref_id`, da wir ihn zuvor bei der Implementierung so definiert haben. Der zugeordnete Wert entspricht der Client ID. Wenn Benutzer z. B. dem oben angegebenen Link (Tag `<a>`) folgen, gelangen sie zur folgenden URL:

[sourcecode:http]
https://example.com/step2.html?ref_id=$amp_client_id
[/sourcecode]

<amp-img alt="Example of how an identifier in an AMP viewer context can be passed via link into a publisher origin context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-1.png" width="1038" height="890">
  <noscript><img alt="Beispiel dafür, wie eine Kennung in einem AMP-Viewer-Kontext über einen Link in einen Publisher-Ursprungskontext übergeben werden kann" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-1.png"></noscript></amp-img>

Wenn Benutzer auf einer Seite landen, die den Wert `ref_id` entweder als URL Parameter oder im Header enthält, können wir den Identifikator `ref_id` zusammen mit dem Identifikator verarbeiten, den die Seite selbst zur Verfügung stellt (also einem Cookie Wert). Wenn du beide Identifikatoren in einen Analytics Ping aufnimmst, kann dein Analytics Server beide Werte gleichzeitig verarbeiten. Da dem Server bekannt ist, dass die Werte in Beziehung zueinander stehen, kann er diese Beziehung in deinem Backend widerspiegeln. Im nächsten Schritt findest du eine ausführliche Beschreibung dieser Vorgehensweise.

##### Extrahieren der URL Abfrageparameter <a name="extracting-url-query-parameters"></a>

Mithilfe von Substitutionsfunktionen richten wir eine Kette von Seitenübergängen oder Formularübermittlungen ein, bei der bestimmte Daten (insbesondere die Client ID) übertragen werden. Diese stehen dann dem Zielserver zur Verfügung und/oder liegen als URL Parameter vor, die auf dem Client gelesen werden können, sobald der Benutzer die Navigation abgeschlossen hat.

Wenn die Daten nur dem Server zur Verfügung gestellt wurden (z. B. via Formular mittels POST Methode), kannst du mit der Verarbeitung der Daten fortfahren und die resultierende Seite rendern. Beachte bei der Verarbeitung dieser Daten die nachfolgenden Schritte zur [Parametervalidierung](#parameter-validation).

Wenn du Daten verarbeiten möchtest, die mittels URL verfügbar sind, so gibt es mehrere Ansätze:

- Verarbeitung während der Weiterleitung (serverseitiges Handling)
- Verarbeitung auf der Landing Page (clientseitiges Handling)

**Verarbeitung während der Weiterleitung (serverseitiges Handling)**

Bei einer Verarbeitung während der Weiterleitung musst du die Anfrage auf dem Server bearbeiten und die relevanten Parameter extrahieren. Bitte beachte die nachfolgenden Schritte zur [Parametervalidierung](#parameter-validation). Verarbeite die Daten in Kombination mit den Cookie Werten, die andere relevante Identifikatoren enthalten, und leite den Benutzer dann zu einer URL weiter, die diese Parameter nicht enthält.

**Verarbeitung auf der Landing Page (clientseitiges Handling)**

Bei der Verarbeitung auf der Landing Page muss unterschieden werden, ob es sich dabei um eine AMP Seite oder um eine Seite ohne AMP handelt.

<amp-img alt="Example of how to construct an analytics ping that contains an identifier from the previous context provided via URL and an identifier from the current context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-2.png" width="1326" height="828">
  <noscript><img alt="Beispiel für die Erstellung eines Analyse-Pings, der einen Bezeichner aus dem vorherigen Kontext enthält, der über eine URL bereitgestellt wird, und einen Bezeichner aus dem aktuellen Kontext" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-2.png"></noscript></amp-img>

_Aktualisierung einer AMP Seite:_ Verwende die Substitutionsfunktion "Query Parameter" in deiner amp-analytics Konfiguration, um den Identifikatorwert `ref_id` innerhalb der URL auszulesen. Die Funktion "Query Parameter" akzeptiert einen Parameter, der als "Schlüssel" für das gewünschte Schlüssel-Wert-Paar in der URL fungiert, und gibt den entsprechenden Wert zurück. Verwende die Client ID Funktion wie bisher, um den Identifikator für den Kontext der AMP Seite zu erhalten.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}
[/sourcecode]

Wenn diese Zeile über das Netzwerk übertragen wird, werden die Werte entsprechend ersetzt:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$referrer_page_identifier&user_id=$current_page_identifier
[/sourcecode]

Nach unseren obigen Beispielen gilt Folgendes:

[sourcecode:text]
$referrer_page_identifier is $amp_client_id
$current_page_identifier is $publisher_origin_id
[/sourcecode]

Der Ping ist also:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$amp_client_id&user_id=$publisher_origin_id
[/sourcecode]

Wir empfehlen, die Authentizität der Werte der Abfrageparameter mithilfe der im Abschnitt [Parametervalidierung](#parameter-validation) beschriebenen Schritte zu überprüfen.

_Aktualisierung einer Seite ohne AMP:_ Ähnlich dazu musst du auf einer Seite ohne AMP, die von deiner Publisher Quelle bereitgestellt wird, den in der URL enthaltenen Wert `ref_id` extrahieren und übermitteln. Überprüfe die Authentizität des Wertes mithilfe der im Abschnitt [Parametervalidierung](#parameter-validation) beschriebenen Schritte. Konstruiere anschließend die Analytics Pings, die sowohl eine `orig_user_id` enthalten, die von `ref_id` abgeleitet ist, als auch eine `user_id` auf der Grundlage des Identifikatorwertes des Erstanbieter-Cookies.

<blockquote>
<p><strong>WICHTIG:</strong></p>
<p>Wenn du die Parameter clientseitig auf der Landing Page verarbeiten möchtest, sollte die Landing Page die Identifikatordaten sofort nach Erfassung des Identifikators aus den URLs entfernen.</p>
<p>Stelle vor dem Entfernen der Parameter sicher, dass der Code, der zum Auslesen der Werte ausgeführt werden muss, entweder:</p>
<ul>
  <li>ausgeführt wurde, bevor die Parameter entfernt werden, oder</li>
  <li>auf den Ort zugreifen kann, an dem der Code, der die Parameter ausgelesen und entfernt hat, die entsprechenden Daten gespeichert hat.</li>
</ul>
<p>Füge dazu auf deiner Seite ohne AMP das folgende JavaScript hinzu, mit dem alle Abfrageparameter aus der URL entfernt werden:</p>
<pre>var href = location.href.replace(/\?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');<br>history.replaceState(null, null, href);</pre>
<p>Passe diesen Code nach Bedarf an, um nur bestimmte Abfrageparameter zu entfernen.</p>
</blockquote>

##### Verarbeitung mehrerer Identifikatoren in einem Analytics Ping <a name="processing-multiple-identifiers-in-an-analytics-ping"></a>

In [Aufgabe 4,](#task4) haben wir den Analytics Ping so konfiguriert, dass er nur einen einzigen Identifikatorwert enthält. Im Unterschied dazu haben wir mit den Schritten, die wir bisher in Aufgabe 5 vorgenommen haben, jetzt zwei solche Werte: `orig_user_id` und `user_id`. Als Nächstes befassen wir uns mit der Verarbeitung dieser beiden Identifikatoren, die Teil des eingehenden Analytics Pings sind.

Bevor wir fortfahren, sieh dir unbedingt die unter [Parametervalidierung](#parameter-validation) beschriebenen Schritte an und stelle sicher, dass du bereit bist, den unter `orig_user_id` und `user_id` angegebenen Werten zu vertrauen.

Überprüfe, ob einer der Werte in deiner Zuordnungstabelle vorhanden ist. In unserem obigen Beispiel erfolgt der erste Seitenaufruf auf einer AMP Seite, die sich NICHT in der Publisher Quelle befindet, gefolgt vom zweiten Seitenaufruf in der Publisher Quelle. Als Ergebnis sehen die Werte für die Abfrageparameter des Analytics Pings folgendermaßen aus:

**Fall 1: Anordnung der Identifikatoren, wenn der Analytics Ping von einer Seite in der Publisher Quelle gesendet wird**

<table>
  <tr>
    <th width="20%"></th>
    <th width="40%"><strong>Benutzer ID in der Quelle des Publishers</strong></th>
    <th width="40%"><strong>Benutzer ID auf einer AMP Seite NICHT in der Quelle des Publishers ("Alias")</strong></th>
  </tr>
  <tr>
    <td><strong>Ausdruck im Analytics Ping</strong></td>
    <td><code>user_id=$publisher_origin_id</code></td>
    <td><code>orig_user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Parameterschlüssel</strong></td>
    <td><code>user_id</code></td>
    <td><code>orig_user_id</code></td>
  </tr>
  <tr>
    <td><strong>Parameterwert</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Bitte beachte: Basierend auf dem Aufbau der Ereigniskette in unserem Beispiel entspricht der Identifikator vom ersten Seitenaufruf der Spalte ganz rechts, während der Identifikator vom zweiten Seitenaufruf zur mittleren Spalte gehört.

Wenn der Benutzer stattdessen auf einer Seite startet, die von der Publisher Quelle bereitgestellt wird, und anschließend zu einer AMP Seite navigiert, die sich NICHT in der Publisher Quelle befindet, sind die Parameterschlüssel vertauscht – jedoch nicht die Art und Weise, wie wir die Werte referenzieren (`$amp_client_id` bezieht sich also immer auf einen Identifikator, der auf einer AMP Seite gespeichert ist, die NICHT von der Publisher Quelle stammt):

**Fall 2: Anordnung der Identifikatoren, wenn der Analytics Ping von einer AMP Seite gesendet wird, die sich NICHT in der Publisher Quelle befindet**

<table>
  <tr>
    <th width="20%"> </th>
    <th width="40%"><strong>Benutzer ID in der Quelle des Publishers</strong></th>
    <th width="40%"><strong>Benutzer ID auf einer AMP Seite NICHT in der Quelle des Publishers ("Alias")</strong></th>
  </tr>
  <tr>
    <td><strong>Ausdruck im Analytics Ping</strong></td>
    <td><code>orig_user_id=$publisher_origin_id</code></td>
    <td><code>user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Parameterschlüssel</strong></td>
    <td><code>orig_user_id</code></td>
    <td><code>user_id</code></td>
  </tr>
  <tr>
    <td><strong>Parameterwert</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Wenn du die Zuordnungstabelle durchsuchst, berücksichtige immer die jeweilige Situation und suche die Werte in den entsprechenden Spalten der Tabelle. Wenn der Analytics Ping z. B. von einer Seite in der Publisher Quelle gesendet wird (Fall 1), musst du die Werte mit dem Schlüssel `user_id` in der Spalte "Benutzer ID in der Quelle des Publishers", die Werte mit dem Schlüssel `orig_user_id` in der Spalte "Benutzer ID auf einer AMP Seite NICHT in der Quelle des Publishers ("Alias")" der Zuordnungstabelle suchen.

Wenn du in deiner Zuordnungstabelle keinen der Identifikatorwerte finden kannst, erstelle eine neue Zuordnung:

- Wenn die Analytics Anfrage von einer Seite in deiner Publisher Quelle stammt, solltest du als Identifikator für Analyseeinträge den Wert wählen, der `uid` entspricht, und als "Alias" den Wert von `orig_uid`.
- Wenn die Analytics Anfrage nicht von einer Seite in deiner Publisher Quelle stammt, solltest du als "Alias" in der Zuordnungstabelle den Wert wählen, der `uid` entspricht. Befolge dann die weiteren Schritte in [Aufgabe 4](#task4), um einen zukünftigen Identifikator in der Publisher Quelle zu erstellen, und versuche, diesen Wert als Cookie in der Quelle anzulegen.

##### Parametervalidierung <a name="parameter-validation"></a>

In einer URL enthaltene Werte können mit böswilliger Absicht verändert worden sein, fehlerhaft sein oder auf andere Weise von den Werten abweichen, die du eigentlich erwartest. Dies wird manchmal als "Cross-Site Request Forgery" bezeichnet. Es ist nicht nur wichtig, sicherzustellen, dass die von deinem Analytics Server empfangenen Pings von Seiten stammen, von denen du solche Pings erwartest. Darüber hinaus musst du auch noch den Referrer validieren, wenn du bei der Weiterleitung Werte mitsendest, die Teil der URL sind, um sicherzustellen, dass du diesen Werten vertrauen kannst.

In den obigen Schritten haben wir beispielsweise die folgende URL erstellt, auf die der Benutzer klicken kann, um zur entsprechenden Seite zu navigieren:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$amp_client_id
[/sourcecode]

Es ist jedoch möglich, dass der Benutzer oder ein Angreifer diese URL wie folgt ändert:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$malicious_value
[/sourcecode]

Du musst sicherstellen, dass du nur Instanzen von `$amp_client_id` verarbeitest und die Nutzung der Instanzen von `$malicious_value` vermeidest.

**Vorgeschlagene Schritte zur Validierung von Werten, die über URL Abfrageparameter empfangen werden:** Stelle sicher, dass der Referrer der Landing Page mit einer erwarteten URL übereinstimmt. Dies ist in der Regel eine URL, die schon einmal einen bereits bekannten Identifikatorwert in einer gültigen CORS Anfrage übermittelt hat. Wir empfehlen, nur solche bekannten Identifikatoren zu akzeptieren.

Überprüfe auf einer Seite ohne AMP `document.referrer` direkt auf der Clientseite oder gib den Wert als Teil des Analytics Pings weiter, um die Validierung auf der Serverseite durchführen zu können. Wenn dem Referrer Wert vertraut werden kann, kannst du Werte akzeptieren und verarbeiten, die von der URL der Landing Page stammen, z. B. `orig_user_id` im obigen Beispiel.

Verwende auf AMP Seiten die Substitutionsvariable [Document Referrer](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#document-referrer), um den Referrer Wert als Teil des Analytics Pings weiterzugeben. Die serverseitige Verarbeitung ist die einzige verfügbare Option. Zur Veranschaulichung siehst du hier einen Analytics Ping, den die Landing Page senden kann und der (1) den Wert der Client ID der aktuellen Seite, (2) einen Wert, der via URL übergeben wird und den wir als Client ID Wert in der verweisenden Seite eingerichtet haben, und (3) die eigentlichen Referrer Informationen zur Validierung des Wertes von (2) enthält: `https://analytics.example.com/ping?type=Seitenansicht&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}&referrer=${documentReferrer}`

Wenn du dem Referrer nicht vertrauen kannst, lehne alle über URL Parameter übermittelten Werte ab und verwende sie nicht.

## Dringende Empfehlungen <a name="strongly-recommended-practices"></a>

### Beschränke dich auf eine einzige Zuordnung <a name="keep-just-one-association"></a>

**Es sollte nur eine einzige Zuordnung von Identifikatoren aus zwei verschiedenen Kontexten existieren.** Wenn eine AMP Client ID, die du zuvor einem Cookie oder einer sonstigen von dir ausgestellten Benutzer ID zugeordnet hast, nun mit einem neuen Cookie oder einer neuen von dir ausgestellten Benutzer ID angezeigt wird, solltest du jeden Status löschen, der mit einem früheren Cookie bzw. einer früheren Benutzer ID verknüpft war.

Mithilfe dieser Schritte kannst du die Erwartungen der Benutzer hinsichtlich Datenschutz erfüllen. Wie in den obigen Abschnitten beschrieben, ist die Verwaltung des Benutzerstatus in AMP häufig damit verbunden, verschiedene Identifikatoren über mehrere Kontexte hinweg, in denen AMP Inhalte angezeigt werden, zu speichern und zuzuordnen. **Diese Situation darf niemals dazu missbraucht werden, Daten zu rekonstruieren oder Tracking einzusetzen, das Benutzer nicht erwarten oder auf das sie nicht eindeutig hingewiesen wurden, z. B. nachdem Benutzer die Cookies deiner Website gelöscht haben.**

### Respektiere die Löschung von Cookies und lokal gespeicherten Daten <a name="respect-cookie-and-local-storage-deletions"></a>

**Respektiere alle in Frage kommenden Datenschutzeinstellungen, die Benutzern zur Verfügung stehen, einschließlich der Einstellungen, die es erlauben, alle Cookies und lokal gespeicherten Daten zu löschen.** Zu keinem Zeitpunkt darf die AMP Client ID oder die AMP Infrastruktur [dazu verwendet werden, einen gelöschten Identifikator wiederherzustellen](https://en.wikipedia.org/wiki/Zombie_cookie), nachdem der Benutzer ausdrücklich den identifizierenden Aspekt auf seiner Seite der Beziehung gelöscht hat.

### Beachte die örtlichen Gesetze und Vorschriften <a name="comply-with-local-laws-and-regulations"></a>

**Wenn du Cookies und/oder Identifikatoren aus zwei oder mehr Domänen verknüpfen willst, bist du in bestimmten Regionen möglicherweise verpflichtet, deine Datenschutzrichtlinie zu aktualisieren, Benutzern zusätzliche Informationen bereitzustellen oder die Zustimmung des Endbenutzers einzuholen.** Die Verwendung der AMP Client ID, die mittels Cookies und lokal gespeicherten Daten einen permanent gespeicherten, stabilen Identifikator zur Verfügung stellt, sollte von jedem Publisher im Hinblick auf alle geltenden Gesetze und Vorschriften zur Datenerfassung, Datenspeicherung, Datenverarbeitung und Benachrichtigung von Benutzern bedacht werden.

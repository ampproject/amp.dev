---
"$title": AMP Releasezeitplan
order: '10'
formats:
- websites
- email
- stories
- ads
teaser:
  text: "- Releasekanäle"
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/contributing/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Releasekanäle](#release-channels)
    - [Nightly](#nightly)
    - [Weekly](#weekly)
        - [Die Kanäle Experimentell und Beta](#experimental-and-beta-channels)
    - [Long-Term Stable (lts)](#long-term-stable-lts)
- [Feststellen, ob sich deine Änderung in einem Release befindet ](#determining-if-your-change-is-in-a-release)
- [Intervall für Releases ](#release-cadence)
    - [Detaillierter Zeitplan ](#detailed-schedule)
    - [Releasepausen ](#release-freezes)

Ein neues Release von AMP wird jede Woche am Dienstag auf alle AMP Seiten übertragen. **Sobald eine Änderung in AMP mit dem Hauptzweig des amphtml Repositorys zusammengeführt wurde, dauert es gewöhnlich 1-2 Wochen, bis die Änderung bei allen Benutzer ankommt.**

## Releasekanäle <a name="release-channels"></a>

Die AMP Laufzeit und Erweiterungen werden über verschiedene *Releasekanäle* bereitgestellt. Die einzelnen Kanäle dienen zu Entwicklerzwecken und für das eigentliche AMP HTML Projekt. Der Abschnitt [Intervall für Releases](#release-cadence) beschreibt genau, wie und wann Code aus dem [`ampproject/amphtml`](https://github.com/ampproject/amphtml) Repository in Releasebuilds aufgenommen wird.

Um festzustellen, ob ein PR (Pull Request) in einem der folgenden Releasekanäle enthalten ist, suche nach den GitHub Labels *PR Use: In Canary*, *PR Use: In Production* oder *PR Use: In LTS* (mehr Details findest du im Abschnitt [Feststellen, ob sich deine Änderung in einem Release befindet](#determining-if-your-change-is-in-a-release)).

### Nightly <a name="nightly"></a>

Der **nightly** Releasekanal wird an jedem Arbeitstag (wie der Name sagt) aktualisiert. Dieser Prozess ist automatisiert und es gibt keine Garantie dafür, dass ein bestimmtes nächtliches Release fehlerfrei ist und keine anderen Problemen enthält. Jede Nacht nach Mitternacht (Pazifische Zeit) wird das letzte „grüne“ Commit des Tages als Releasestichpunkt ausgewählt. Ein grünes Build hat alle automatisierten Tests bestanden.

Das nächtliche Release bietet einen Mechanismus, mit dem sich Probleme schnell erkennen und lösen lassen, bevor sie die *weekly* Releasekanäle mit intensiveren Datenverkehr erreichen. Außerdem bleibt hier die Anzahl der Benutzer geringer, die von neu auftretenden Problemen betroffen sind.

Es ist möglich, am **nightly** Kanal teilzunehmen, um Pull Anforderungen zu testen, die in den letzten Tagen zusammengeführt wurden. Mehr Details findest du [im Opt-in Abschnitt](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) in [DEVELOPING.md].

### Weekly <a name="weekly"></a>

Die *weekly* Releasekanäle gelten als die primären "immergrünen" Releasekanäle. Jede Woche wird das **Beta** Release der Vorwoche in den **stabilen** Releasekanal aufgenommen und das letzte **nightly** Release der Vorwoche in die Releasekanäle **Experimentell** und **Beta** (siehe [Detaillierter Zeitplan](#detailed-schedule)).

Es gibt zwei Sätze von Buildkonfigurationen, die zum Erstellen von Releasebuilds verwendet werden: die *canary* Konfiguration und die *production* Konfiguration. Der **experimentelle** und der **Beta** Releasekanal basieren auf demselben Commit. Der **experimentelle** Kanal verwendet jedoch die *canary* Konfiguration, während der **Beta** Kanal die *production* Konfiguration verwendet. Die *canary* Konfiguration ermöglicht experimentelle Komponenten und Funktionen, die in der *production* Konfiguration  deaktiviert werden können. Die Kanäle <br> **Experimentell** oder **Beta** können über die [Experimentierseite](https://cdn.ampproject.org/experiments.html) aktiviert werden.

Der **stabile** Releasekanal wird mit der *production* Konfiguration erstellt und für den Großteil des AMP Datenverkehrs bereitgestellt. Da der **Beta** Releasekanal auch aus der *production* Konfiguration erstellt wird, entspricht er genau dem Build, das in der folgenden Woche **stabil** wird (mit möglichen Sonderlösungen, um dringende Probleme zu beheben; siehe [Beitragen von Code](https://github.com/ampproject/amphtml/blob/master/contributing/contributing-code.md#Cherry-picks)).

#### Die Kanäle Experimentell und Beta <a name="beta-and-experimental-channels"></a>

Die *Kanäle Beta* und *Experimentell* sind Pre-Releasekandidaten für die nächste Stabile Version von AMP. Jeden Dienstag (mit Ausnahme von Wochen, in denen es [Releasepausen](#release-freezes) gibt) wird das **nightly** der letzten Woche in die Opt-in Entwicklerkanäle für **Beta** und **Experimentell** aufgenommen. Einen Tag später, nachdem wir überprüft haben, ob keine Funktions- oder Leistungsnachteile in diese Kanäle gelangt sind, geben wir diese Version am Mittwoch für einen kleinen Teil des Datenverkehrs frei. Dieselbe Version wird dann am Dienstag der folgenden Woche in den **stabilen** Kanal aufgenommen.

Es ist möglich, an diesen Kanälen teilzunehmen. Weitere Informationen findest du [im Opt-in Abschnitt](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) in [DEVELOPING.md].

Das Opt-in beim *Beta Kanal* hat folgende Zwecke:

- Testen und Ausprobieren der AMP Laufzeitversion, die in Kürze veröffentlicht wird
- mithilfe der Qualitätssicherung (QA) sicherstellen, dass deine Website mit der nächsten AMP Version kompatibel ist

Das Opt-in beim *Experimentellen Kanal* hat folgende Zwecke:

- Testen und Ausprobieren von neuen Funktionen, die noch nicht allen Benutzern zur Verfügung stehen
- mithilfe der Qualitätssicherung (QA) sicherstellen, dass deine Website mit den neuen AMP Funktionen, die noch entwickelt werden, kompatibel ist.

Der *Experimentelle Kanal* **ist möglicherweise weniger stabil** und kann Funktionen enthalten, die noch nicht allen Benutzern zur Verfügung stehen.

### Long-Term Stable (lts) <a name="long-term-stable-lts"></a>

Der **lts** Releasekanal bietet in einem monatlichen Intervall ein vorheriges **stabiles** Build. Am zweiten Montag jeden Monats wird die aktuelle **stabile** Version in **lts** aufgenommen. Dieser Kanal wird nicht für alle AMP Publisher empfohlen. Er dient für Publisher, die auf ihrer Website seltener eine QA durchführen. Zu diesem Zweck können sie den **lts** Kanal für bestimmte Webseiten aktivieren (siehe <a href="https://github.com/ampproject/amphtml/blob/master/contributing/lts-release.md" data-md-type="link">**lts** Readme</a>)

Wenn der zweite Montag des Monats auf einen Feiertag fällt, erfolgt die Promotion nach dem Ende der [Releasepause](#release-freezes).

Wichtig: Publisher, die den **lts** Releasekanal verwenden, sollten keine neu eingeführten Funktionen verwenden. Aufgrund des längeren Zyklus kann der **lts** Release bis zu sieben Wochen nach dem `HEAD` von [`ampproject/amphtml`](https://github.com/ampproject/amphtml) liegen. Lies den Abschnitt [Feststellen, ob sich deine Änderung in einem Release befindet](#determining-if-your-change-is-in-a-release), um zu  überprüfen, ob eine Änderung für den von dir gewählten Releasezyklus bereitsteht.

## Feststellen, ob sich deine Änderung in einem Release befindet <a name="determining-if-your-change-is-in-a-release"></a>

Der [*Typ: Release* für GitHub Probleme](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) wird verwendet, um den Status aktueller und früherer Releases zu verfolgen: von der ersten Version über das Testen auf den Kanälen **Experimell**/**Beta** bis hin zu einem etwaigen Release über die **stabilen** und **lts** Kanäle. Releaseankündigungen erfolgen  auf dem [AMP Slack # Release Channel](https://amphtml.slack.com/messages/C4NVAR0H3/) ([Bei Slack anmelden](https://bit.ly/amp-slack-signup)).

Mithilfe der folgenden Methoden kannst du feststellen, welche Änderungen ein bestimmtes Build enthält:

- Die [GitHub Probleme vom *Typ: Release*](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) für jedes Releasebuild enthalten einen Link zu der jeweiligen [Releaseseite](https://github.com/ampproject/amphtml/releases), auf der die in diesem Release enthaltenen Änderungen aufgeführt sind.
- Die Labels [*PR Use: In Beta / Experimental*](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22), [*PR Use: In Stable*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22) und [*PR Use: In LTS*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) werden PRs hinzugefügt, wenn sie in ein *weekly* oder **lts** Build aufgenommen wurden. Das Erstellen des Builds und das Hinzufügen des Labels können zeitlich differieren.

## Intervall für Releases <a name="release-cadence"></a>

Was unser Intervall für Releases betrifft, sind wir absichtlich vorsichtig.

Wenn es darum geht, wie oft wir neue Versionen von AMP für alle bereitstellen, sind viele Faktoren zu berücksichtigen, darunter:

- Stabilität für die Millionen von Websites und Milliarden von Seiten, die mit AMP erstellt wurden
- Probleme mit Caches, die auftreten können, wenn wir eine neue Version veröffentlichen
- der Wunsch, neue Funktionen schnell zu veröffentlichen

Wir haben all diese Faktoren berücksichtigt und uns für einen 1-2-wöchigen Pushzyklus entschieden. Nach bisherigen Erfahrungen scheint dies ein vernünftiger Kompromiss zu sein. Trotzdem werden wir diese Faktoren weiterhin beobachten und den Zyklus möglicherweise ändern.

### Detaillierter Zeitplan <a name="detailed-schedule"></a>

Wir versuchen, diesen Zeitplan so genau wie möglich einzuhalten. Trotzdem kann es aufgrund von Komplikationen zu Verzögerungen kommen. Den aktuellen Status der einzelnen Releases kannst du in den [GitHub Problemen *Typ: Release*](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) und im [AMP Slack #Release Channel](https://amphtml.slack.com/messages/C4NVAR0H3/) ([Bei Slack anmelden](https://bit.ly/amp-slack-signup)) verfolgen.

- Dienstag [11 Uhr pazifischer Zeit](https://www.google.com/search?q=11am+pacific+in+current+time+zone): neue **Experimentell** und **Beta** Builds werden aus dem [neuesten Primärbuild erstellt, das alle unsere Tests besteht](https://travis-ci.com/ampproject/amphtml/branches), und an die AMP Benutzer weitergeleitet, die am [AMP Experimentellen Kanal](#amp-experimental-and-beta-channels) oder am [AMP Betakanal](#amp-experimental-and-beta-channels) teilnehmen.
- Mittwoch: Wir überprüfen Fehlerberichte für die Benutzer des *Experimentellen Kanals* und des *Betakanals*. Wenn alles gut aussieht, erhält 1% der AMP Seiten die **Beta**.
- Donnerstag-Montag: Wir überwachen weiterhin die Fehlerraten und Fehlerberichte für Benutzer des *Experimentellen Kanals* und des *Betakanals* sowie das 1% der Seiten mit dem **experimentellen** bzw. **Beta** Build
- Dienstag der folgenden Woche:  Das **Beta** Build wird vollständig auf **stabil** hochgestuft (d. h. jetzt verwenden alle AMP Seiten dieses Build).

### Releasepausen <a name="release-freezes"></a>

Es gibt Fälle, in denen wir eine AMP Veröffentlichung in der Produktion überspringen, also eine Releasepause einlegen.

Wenn für Woche N eine einwöchiger Releasepause angekündigt wird:

- Das Releasebuild der Vorwoche bleibt für eine weitere Woche in **Experimentell**/**Beta**, d. h. die Releaseversion in Woche N-1 wird nicht wie gewöhnlich in Woche N als **stabil** aufgenommen, sondern erst in der Woche N+1 nach **stabil** geschoben.
- In der Pausenwoche (Woche N) wird *kein* neues Releasebuild erstellt.
- Der normale Zeitplan wird in Woche N+1 fortgesetzt, d. h. **Experimentell**/**Beta** werden in Woche N+1 bearbeitet und in Woche N+2 auf **stabil** befördert.
- Wenn das **stabile** Release, das während Woche N-1 aufgenommen wurde, ursprünglich während der Woche N in **lts** aufgenommen werden sollte, wird es nun am Montag der Woche N+1 in **lts** aufgenommen.
- **nightly** Releases werden weiterhin generiert und befördert, da sie vollständig automatisiert sind.

Mögliche Gründe für eine Releasepause:

- Zeiten, in denen nicht genügend Personen verfügbar sind, um die AMP Version zu **stabilisieren** und zu überwachen. Derzeit befinden sich die meisten Leute, die AMP Releases durchführen, in den USA. Deshalb sind es normalerweise die Wochen der wichtigsten amerikanischen Feiertage: Independence Day (4. Juli), Thanksgiving (vierter Donnerstag im November), Weihnachten (25. Dezember) und Silvester/Neujahr (31. Dezember/1. Januar).
- Ein Notfall, z. B. ein Problem mit der Sicherheit oder dem Datenschutz, das vom [Technischen Entscheidungsgremium (TSC)](https://github.com/ampproject/meta-tsc) oder den Releaseverantwortlichen festgestellt wurde.
- Andere Situationen, in denen die Stabilität des Basiscodes als vorrangig betrachtet wird, wie vom TSC festgelegt.

In allen Fällen außer in Notfällen wird eine Releasepause mindestens einen Monat im Voraus bekanntgegeben.

Beachte, dass eine Releasepause, sofern nicht anders angekündigt, kein Einfrieren des Codes bedeutet. Während einer Releasepause kann weiterhin Code geschrieben, überprüft und zusammengeführt werden.

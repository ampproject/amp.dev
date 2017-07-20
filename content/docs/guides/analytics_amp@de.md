---
$title: Analyse konfigurieren
---

## Entscheidungen am Anfang

Bei allen Analyselösungen muss man sich darüber im Klaren sein, welche Daten benötigt werden und wie sie analysiert werden sollen. Entscheiden Sie gleich zu Beginn über folgende Fragen:

* Möchten Sie die Nutzerinteraktion mit Analysetools von Drittanbietern oder mithilfe einer eigenen Lösung analysieren?
* Welche Verhaltensweisen von Nutzern möchten Sie messen, um die Nutzerinteraktion zu verstehen?

### Daten an Anbieter oder an sich selbst senden?

Wenn Sie über eine eigene Lösung zum Messen der Nutzerinteraktion verfügen, brauchen Sie zur Integration der AMP-Analyse in diese Lösung lediglich eine URL. An diese URL werden die Daten gesendet.
Es ist auch möglich, Daten an verschiedene URLs zu senden. Sie können z. B. Daten zu Seitenaufrufen an die eine URL und Daten zu Interaktionen über soziale Netzwerke an eine andere URL senden.

Die AMP-Analyse wurde dafür entwickelt, Daten einmal zu messen und dann gleichzeitig an viele Adressaten zu senden.
Wenn Sie bereits mit einem oder mehreren Analyseanbietern zusammenarbeiten, sehen Sie in der [amp-analytics-Spezifikation](/docs/reference/extended/amp-analytics.html) nach, ob diese Anbieter ihre Lösung in AMP integriert haben. Ist dies der Fall, erstellen Sie einfach eine Verknüpfung von der Spezifikation zu deren Dokumenten und befolgen Sie die Anleitung.

Wenn der Analyseanbieter keine Integration in AMP vorgenommen hat, bitten Sie ihn um Unterstützung.
Scheuen Sie sich nicht, bei Bedarf [im AMP-Projekt einen Problemfall zu erstellen](https://github.com/ampproject/amphtml/issues/new), um das Hinzufügen des Anbieters zu beantragen.
Weitere Informationen finden Sie unter [Analysetools in AMP-HTML integrieren](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### Welche Daten benötigen Sie?

Welche Arten von Nutzerdaten werden Sie erfassen, um die Nutzerinteraktion zu messen?
Auch dies müssen Sie entscheiden, um die entsprechenden Konfigurationen vornehmen zu können.

Beachten Sie die folgenden wichtigen Punkte:

* Möchten Sie nur Seitenaufrufe oder auch zusätzliche Nutzerinteraktionsmuster erfassen (siehe auch [amp-pixel oder amp-analytics](/de/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics))?
* Welche Arten von Daten zu Ihren Nutzern, Ihren Inhalten, zum Gerät oder zum Browser möchten Sie erfassen (siehe auch [Variablensubstitution](/de/docs/guides/analytics/analytics_basics.html#variablensubstitution))?
* Wie werden Sie Ihre Nutzer identifizieren (siehe auch [Nutzeridentifikation](/de/docs/guides/analytics/analytics_basics.html#nutzeridentifikation))?


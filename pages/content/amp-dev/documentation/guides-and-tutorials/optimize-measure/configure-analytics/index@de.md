---
"$title": Analytics konfigurieren
"$order": '5'
"$hidden": 'true'
description: Wenn du Google Analytics als Analytics Anbieter verwendest, erfährst du hier, wie du die grundlegenden Funktionen von Google Analytics für AMP einrichtest und Inhalte mit und ohne AMP mithilfe der Client ID verknüpfst.
formats:
- websites
- stories
---

[tip] **TIPP:** Wenn du Google Analytics als Analytics Anbieter verwendest, erfährst du hier, [wie du die grundlegenden Funktionen von Google Analytics für AMP einrichtest](https://developers.google.com/analytics/devguides/collection/amp-analytics/#basic_setup_to_measure_page_views) und [Inhalte mit und ohne AMP mithilfe der Client ID verknüpfst](https://support.google.com/analytics/answer/7486764). [/tip]

## Bedenke, bevor du loslegst

Alle Analytics Lösungen setzen voraus, dass du weißt, welche Daten du benötigst und wie du diese Daten analysieren willst. Triff also die folgenden Entscheidungen, bevor du loslegst:

- Wirst du Analytics Tools von Drittanbietern oder deine eigene interne Lösung verwenden, um User Engagement zu analysieren?
- Welches Benutzerverhalten willst du messen, um User Engagement besser zu verstehen?

### Werden Daten an Anbieter gesendet – oder an dich selbst?

Wenn du über eine eigene interne Lösung zur Messung von User Engagement verfügst, erfolgt die Integration von AMP Analytics und dieser Lösung mithilfe einer URL. An diese URL werden die Daten gesendet. Du kannst außerdem Daten an verschiedene URLs senden. Beispielsweise kannst du Daten zu Seitenaufrufen an eine URL, Daten zu Social Engagement an eine andere URL senden.

AMP Analytics wurde bewusst so konzipiert, dass nur eine einzige Messung stattfindet und die Daten dann an mehrere Empfänger weitergegeben werden. Wenn du bereits einen oder mehrere Analytics Anbieter verwendest, sieh in der Liste der [Analytics Anbieter](analytics-vendors.md) nach, ob diese eine Integration von AMP unterstützen. Falls ja, lies dir deren Daten zur Konfiguration durch und befolge die Anleitung.

Wenn der Analytics Anbieter keine AMP Integration unterstützt, wende dich an den Anbieter und bitte um entsprechende Unterstützung. Erstelle gerne auch ein [Issue im AMP Projekt](https://github.com/ampproject/amphtml/issues/new) und fordere an, dass der Anbieter hinzugefügt wird. Siehe auch den Abschnitt [Integriere deine Analytics Tools in AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### Welche Daten benötigst du?

Welche Daten über deine Benutzer willst du erfassen, um das Engagement zu messen? Diese Daten müssen identifiziert werden, bevor du sie konfigurieren kannst.

Berücksichtige die folgenden wichtigen Datenpunkte:

- Willst du nur Seitenaufrufe oder noch weitere Muster von User Engagement tracken (siehe auch [amp-pixel oder amp-analytics](analytics_basics.md#use-amp-pixel-or-amp-analytics))?
- Welche Arten von Daten willst du über deine Benutzer, deinen Content, das Gerät oder den Browser erfassen (siehe auch [Variablensubstitution](analytics_basics.md#variable-substitution))?
- Wie identiizierst du deine Benutzer (siehe auch [Benutzeridentifikation](analytics_basics.md#user-identification))?

Learn more: Continue to learn about analytics with [Analytics: the Basics](analytics_basics.md).

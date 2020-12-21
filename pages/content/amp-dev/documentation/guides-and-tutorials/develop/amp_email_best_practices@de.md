---
"$title": Best Practices für AMP für E-Mail
"$order": '1'
"$category": Develop
formats:
- email
---

AMP ermöglicht neue spannende Arten von beeindruckenden und attraktiven Inhalten in E-Mails. Wenn du E-Mails entwirfst, beachte die folgenden Best Practices. Dadurch stellst du sicher, dass die E-Mails performant sind und auf allen Plattformen zuverlässig und gemäß den Benutzererwartungen funktionieren.

#Geschwindigkeit

Wenn du zum dynamischen Abrufen von Inhalten [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) verwendest, füge einen Platzhalter ein, um die Integrität der Komponentenstruktur zu gewährleisten. Der Platzhalter sollte in seinem Layout dem Dokument möglichst ähnlich sein, nachdem die angeforderten Daten zurückgegeben wurden. Dies stellt sicher, dass die Nachrichtengröße das Layout nicht wesentlich ändert oder abwandelt.

#Benutzerfreundlichkeit und Barrierefreiheit

- Wenn du [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email)verwendest, stelle sicher, dass das Attribut `controls` festgelegt ist. Auf diese Weise können Benutzer auf Geräten mit Touchscreen wie z. B. Smartphones durch das Karussell navigieren.
- Beachte bei der Verwendung von [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), dass in iOS nicht alle Eingabetypen unterstützt werden. Weitere Informationen findest du in [Supported Input Values](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) in der Safari HTML Reference.
- In manchen Apps und Browsern werden nicht alle [Attributwerte für `autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) unterstützt. Gehe davon aus, dass deine Benutzer keine automatische Vervollständigung haben, und halte die Formulare kurz.

#Styling

- Stelle sicher, dass deine E-Mail nur [CSS, das von AMP für E-Mail unterstützt wird](../learn/email-spec/amp-email-css.md?format=email), verwendet.
- Verwende keinerlei Einheiten für Viewport (`vw`, `vh`, `vmin` und `vmax`) in deinem CSS und HTML. Da AMP E-Mails in einem iframe gerendert werden, stimmt der Viewport der E-Mail nicht mit dem Viewport des Browsers überein.
- Bestimmte Browser haben unterschiedliche Standard CSS Styles. Verwende eine CSS Bibliothek, die Styles bei Bedarf normalisiert. Weitere Informationen zu standardmäßigen Styles und der Normalisierung von Styles sowie eine Liste der verfügbaren Bibliotheken findest du in [Reboot, Resets, and Reasoning](https://css-tricks.com/reboot-resets-reasoning/).
- Sei vorsichtig mit überlaufenden Rändern in CSS: Sie werden möglicherweise aufgrund der [Einschränkung des AMP Layouts](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241) nicht gerendert.

##Mobile Geräte

Stelle sicher, dass deine Nachricht auf allen Bildschirmgrößen gut aussieht. Verwende dazu [CSS Medienabfragen](style_and_layout/control_layout.md?format=email), um das Gerät zu identifizieren. Nachrichten sollten auf Mobilgeräten getestet werden, um sicherzustellen, dass das Layout korrekt ist und die Komponenten erwartungsgemäß funktionieren.

#Andere häufige Fehler

Beachte bei der Arbeit mit AMP für E-Mail die folgenden Tipps und Tricks:

- Der Playground von AMP für E-Mail leitet XHRs nicht weiter, einige E-Mail Anbieter tun dies aber.
- Der AMP MIME Teil sollte in deiner E-Mail vor dem HTML MIME Teil angezeigt werden, um maximale Kompatibilität zwischen den E-Mail Clients zu gewährleisten.
- Das Attribut `src` von [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email), [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) von [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), das `src` für [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email) oder das Attribut href eines `<a>` Tags kann nicht durch [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email) geändert werden.
- Deine Nachrichten sollten eine statische HTML Version enthalten, falls Benutzer zur HTML Version der Nachricht weitergeleitet werden oder falls Benutzer die Nachricht weiterleiten.

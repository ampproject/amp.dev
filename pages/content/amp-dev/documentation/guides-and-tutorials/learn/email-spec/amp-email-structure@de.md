---
'$title': Struktur und Rendering von AMP E-Mails
$order: 2
formats:
  - email
teaser:
  text: 'Eine E-Mail besitzt die Struktur eines '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

Eine E-Mail besitzt die Struktur eines MIME Baumes. Dieser MIME Baum enthält den Nachrichtentext und alle Anhänge der E-Mail.

Um AMP in eine E-Mail einzubetten, füge einen neuen MIME Teil mit dem Inhaltstyp `text/x-amp-html` als Nachfolger von `multipart/alternative` hinzu. Er muss den vorhandenen Teilen `text/html` oder `text/plain` gleichgestellt sein. Dadurch wird sichergestellt, dass die E-Mail Nachricht auf allen Clients funktioniert.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="AMP für E-Mail-MIME-Teilediagramm" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

Weitere Informationen über den Untertyp `multipart/alternative` findest du in [RFC 1521, Abschnitt 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

## Zusätzliche Information <a name="additional-information"></a>

Der Teil `text/x-amp-html` muss unter einem `multipart/alternative` Knoten verschachtelt sein. Eine E-Mail darf nicht mehr als einen `text/x-amp-html` Teil in einem `multipart/alternative` Knoten enthalten.

Das `multipart/alternative` muss zusätzlich zum Knoten `text/x-amp-html` mindestens einen nicht-AMP Knoten (`text/plain` oder `text/html`) enthalten. Dies wird Benutzern angezeigt, deren E-Mail Clients AMP nicht unterstützen oder die AMP über die Einstellungen ihres E-Mail Anbieters deaktiviert haben.

Hinweis: Einige E-Mail Clients[[1]](https://openradar.appspot.com/radar?id=6054696888303616) rendern nur den letzten MIME Teil. Deshalb empfehlen wir, den MIME Teil `text/x-amp-html` _vor_ den MIME Teil `text/html` zu setzen.

### Semantik für Antworten und Weiterleitung <a name="replyingforwarding-semantics"></a>

Der E-Mail Client entfernt den Teil `text/x-amp-html` des MIME Baumes, wenn ein Benutzer auf eine AMP E-Mail Nachricht antwortet oder diese weiterleitet.

### Ablauf <a name="expiry"></a>

Es kann sein, dass der E-Mail Client nach einem festgelegten Zeitraum, z. B. 30 Tagen, den AMP Teil einer E-Mail nicht mehr anzeigt. In diesem Fall wird in E-Mails der Teil `text/html` oder `text/plain` angezeigt.

## Beispiel <a name="example"></a>

<!-- prettier-ignore-start -->

[sourcecode:html]
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae--
[/sourcecode]

<!-- prettier-ignore-end -->

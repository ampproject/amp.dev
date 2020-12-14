---
"$title": AMP E-Mails testen
"$order": '2'
"$category": Develop
description: Teste deine AMP E-Mails vor dem Massenversand, um die bestmögliche Benutzererfahrung sicherzustellen.
formats:
- email
author: fstanis
---

Teste deine AMP E-Mails vor dem Massenversand, um die bestmögliche Benutzererfahrung sicherzustellen.

## Checkliste für den Test

1. Füge deiner AMP E-Mail auch eine HTML Version und/oder eine Version mit reinem Text hinzu. E-Mail Clients, die AMP nicht unterstützen, können bei Bedarf darauf zurückgreifen.
2. Stelle sicher, dass dein AMP gültig ist. Befolge dazu die Schritte unter [AMP E-Mails validieren](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md).
3. Sieh dir [CSS mit Unterstützung von AMP für E-Mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) an, um sicherzustellen, dass das verwendete CSS von allen E-Mail Clients unterstützt wird.
4. Teste deine E-Mail im [AMP Playground](https://playground.amp.dev/?runtime=amp4email) und stelle sicher, dass alle dynamischen Funktionen wie Formulare ordnungsgemäß funktionieren.

## Spezifische Tests für E-Mail Clients

E-Mail Clients, die AMP unterstützen, stellen auch Entwicklerdokumentation bereit, die zusätzliche Richtlinien und Anforderungen enthalten kann.

### Gmail

Die Dokumentation für Gmail präsentiert Richtlinien für Tests unter [Test your AMP emails in Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email).

Gmail Benutzer können im [Gmail AMP for Email Playground](https://amp.gmail.dev/playground/) zu Testzwecken eine E-Mail an sich selbst senden.

### Mail.ru

Unter [Mail.ru AMP Emails](https://postmaster.mail.ru/amp) findest du Informationen zum Aktivieren von Tests in deinem Mail.ru Konto.

Mail.ru Benutzer können im [Mail.ru AMP Playground](https://postmaster.mail.ru/amp/playground.html) zu Testzwecken eine E-Mail an sich selbst senden.

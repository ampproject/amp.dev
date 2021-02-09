---
'$title': Testowanie wiadomości e-mail AMP
$order: 2
'$category': Develop
description: Zapewnij doskonałe wrażenia użytkownika, testując swoje wiadomości e-mail AMP przed wysłaniem ich do dużej grupy odbiorców.
formats:
  - email
author: fstanis
---

Zapewnij doskonałe wrażenia użytkownika, testując swoje wiadomości e-mail AMP przed wysłaniem ich do dużej grupy odbiorców.

## Lista kontrolna testów

1. Dołącz wersję HTML i/lub zwykłą tekstową wersję wiadomości e-mail AMP. Programy pocztowe, które nie obsługują AMP, wyświetlą wówczas taką rezerwową wersję.
2. Upewnij się, że Twój kod AMP jest prawidłowy, wykonując kroki opisane w artykule [Walidacja wiadomości e-mail AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md).
3. Zapoznaj się z artykułem [CSS obsługiwane przez AMP dla poczty e-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md), aby upewnić się, że używany przez Ciebie CSS jest obsługiwany we wszystkich programach pocztowych.
4. Wypróbuj swoją wiadomość e-mail w [placu zabaw AMP](https://playground.amp.dev/?runtime=amp4email) i upewnij się, że wszystkie funkcje dynamiczne, takie jak formularze, działają prawidłowo.

## Testy specyficzne dla programów pocztowych

Programy pocztowe obsługujące AMP mają również dokumentację producencką, która może zawierać dodatkowe wytyczne i wymagania.

### Gmail

Dokumentacja usługi Gmail zawiera wytyczne dotyczące testowania w artykule [Test your AMP emails in Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email).

Użytkownicy usługi Gmail mogą używać [placu zabaw Gmail dla AMP dla poczty e-mail](https://amp.gmail.dev/playground/) do wysyłania wiadomości e-mail do siebie w celach testowych.

### Mail.ru

Informacje o włączaniu testowania na koncie Mail.ru zawiera artykuł [Wiadomości e-mail AMP w Mail.ru](https://postmaster.mail.ru/amp).

Użytkownicy Mail.ru mogą użyć [placu zabaw AMP dla Mail.ru](https://postmaster.mail.ru/amp/playground.html) do wysyłania wiadomości e-maila do siebie w celach testowych.

### Outlook.com

W dokumentacji Outlook.com znajduje się przewodnik [Get Started with AMP for Email](https://docs.microsoft.com/en-us/outlook/amphtml/get-started), który wyjaśnia jak tworzyć i testować wiadomości e-mail AMP.

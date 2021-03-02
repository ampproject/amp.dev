---
'$title': Walidacja wiadomości e-mail AMP
$order: 1
author: CrystalOnScript
formats:
  - email
---

Wiadomości e-mail AMP zależą od biblioteki JS AMP, która zapewnia czytelnikom bogate, interaktywne i dynamiczne wrażenia. Z tego powodu dostawcy poczty elektronicznej wymagają walidacji takich wiadomości. Prawidłowe znaczniki AMP gwarantują, że wiadomości e-mail są bezpieczne i przekraczają standardy doznań użytkownika.

# Jak sprawdzić, czy moja wiadomość e-mail AMP jest prawidłowa?

Dostępnych jest kilka sposobów walidacji wiadomości e-mail AMP. Wszystkie one dają dokładnie taki sam wynik, więc użyj tego z nich, który najbardziej pasuje do Twojego stylu programowania.

## Walidator internetowy

[Walidator internetowy](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) AMP obsługuje platformę AMP dla poczty e-mail. Użyj internetowego walidatora, wklejając kod wiadomości e-mail AMP do narzędzia. Błędy walidatora będą flagowane bezpośrednio inline.

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## Walidator wiersza polecenia

Walidację wiadomości e-mail AMP można wykonać za pomocą [narzędzia wiersza polecenia walidatora AMP HTML](https://www.npmjs.com/package/amphtml-validator).

### Instalacja

1. Upewnij się, że masz w systemie [Node.js z menedżerem pakietów „npm”](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Zainstaluj <a>narzędzie wiersza polecenia walidatora AMP HTML</a>, wykonując następujące polecenie: <code>npm install -g amphtml-validator</code>.

### Użycie

Po zainstalowaniu narzędzia wiersza polecenia wykonaj następujące polecenie po zastąpieniu `<amphtml file>` plikiem zawierającym treść wiadomości e-mail AMP.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

Jeśli wiadomość e-mail jest prawidłowa, narzędzie wiersza polecenia wyświetli wynik `PASS`. Jeśli jest nieprawidłowa, zwróci znalezione błędy.

## Plac zabaw AMP

Walidację wiadomości e-mail AMP możesz również wykonać, używając placu zabaw [AMP](https://playground.amp.dev/?runtime=amp4email). Podobnie jak w przypadku walidatora internetowego, wklej kod wiadomości e-mail AMP do narzędzia, a plac zabaw oznaczy wszystkie błędy walidatora bezpośrednio inline.

### Walidacja dostarczonych wiadomości e-mail

Czasami dostarczone wiadomości e-mail AMP mogą być nieprawidłowe, nawet jeśli Twóje znaczniki w wiadomości zostały już sprawdzone pod względem poprawności przez narzędzia udokumentowane na tej stronie. Najczęstszą przyczyną takiej sytuacji jest modyfikacja znaczników przez dostawcę usług poczty elektronicznej ([ESP](https://amp.dev/support/faq/email-support/)) i utrata prawidłowości kodu po wysłaniu wiadomości do dostawcy usług poczty elektronicznej w celu jej dostarczenia. Jeżeli na przykład Twoim ESP jest SparkPost i nie skonfigurowano pikseli śledzących HTTPS za pomocą SparkPost, SparkPost dodaje do Twojej wiadomości e-mail niebezpieczny piksel śledzący HTTP. Jako że wiadomości e-mail AMP zezwalają jedynie na obrazy HTTPS, spowoduje to nieprawidłowość wiadomości e-mail AMP.

Aby sprawdzić, czy wiadomość e-mail AMP dostarczona do Twojej skrzynki odbiorczej jest prawidłowa:

1. [Pobierz wiadomość e-mail AMP jako plik `.eml`](https://www.codetwo.com/kb/export-email-to-file) z programu pocztowego.
2. Otwórz [plac zabaw AMP](https://playground.amp.dev/?runtime=amp4email).
3. Kliknij przycisk IMPORT EMAIL i wybierz właśnie pobrany plik `.eml`.

Plac zabaw zaimportuje pobraną wiadomość e-mail AMP do edytora inline i oflaguje wszystkie błędy walidacji.

# Co się dzieje, jeśli wiadomość e-mail jest nieprawidłowa?

Walidator AMP nie jest tylko udogodnieniem dla Ciebie podczas programowania, dostawcy poczty elektronicznej obsługujący wiadomości e-mail AMP automatycznie używają rezerwowych typów MIME HTML lub Plain Text. Wiadomości e-mail AMP należy wysyłać tylko pod warunkiem, że pomyślnie przechodzą przez walidator.

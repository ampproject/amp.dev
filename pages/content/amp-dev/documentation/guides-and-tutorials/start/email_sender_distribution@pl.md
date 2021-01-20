---
$title: Rejestr nadawców
$order: 1
description: Rejestr nadawców wiadomości e-mail AMP
$category: Początek
author: CrystalOnScript
---

Programy pocztowe wymagają rejestracji nadawcy w celu wyświetlania użytkownikom wiadomości AMP. Postępuj zgodnie z tym przewodnikiem, aby umieścić swój adres nadawcy na liście obsługujących klientów!

# Tworzenie i wysyłanie gotowych do produkcji wiadomości e-mail AMP

Należy wykazać się znajomością formatu wiadomości e-mail AMP i zgodnością z nim. Wiadomości e-mail muszą:

- Przejść [SPF/DKIM/DMARC](https://support.google.com/a/answer/33786?hl=en) z dopasowaniem domeny TLD z adresem nadawcy
- Mieć rezerwową część MIME "text/html"
- Spełniać wszystkie wymagania klienta dotyczące nadawcy

Wyślij gotową do produkcji wiadomość e-mail AMP na następujące adresy:

- amphtmltest@outlook.com
- postmaster_amp@corp.mail.ru
- ampforemail.whitelisting@gmail.com

# Wypełnianie globalnego formularza

Musisz wypełnić [formularz rejestracyjny nadawcy AMP dla poczty e-mail](https://docs.google.com/forms/d/e/1FAIpQLSdso95e7UDLk_R-bnpzsAmuUMDQEMUgTErcfGGItBDkghHU2A/viewform?gxids=7628). Jest to jedyny formularz, który musisz wypełnić, aby trafić na listę dozwolonych nadawców wiadomości e-maili AMP wszystkich obsługujących programów pocztowych.

# Przestrzeganie polityk prywatności

Musisz przestrzegać polityki prywatności każdego klienta.

**Gmail**

[GooglePrivacy & Terms](https://policies.google.com/privacy)

**Mail.ru**

- [Użytkownicy spoza Rosji](https://help.mail.ru/engmail-help/privacy)
- [Użytkownicy z Rosji](https://agent.mail.ru/legal/privacypolicy/en)

**Microsoft**

[Oświadczenie Microsoft o ochronie prywatności](https://privacy.microsoft.com/en-us/privacystatement)

**Verizon Media (Yahoo Mail)**

- [Verizon Media Privacy Policy - US](https://www.verizonmedia.com/policies/us/en/verizonmedia/privacy/index.html)
- W przypadku innych krajów należy odwiedzić [to miejsce](https://www.verizonmedia.com/policies/).

# Potwierdzenie

Każdy program pocztowy powiadomi Cię o Twoim statusie dotyczącym listy dozwolonych użytkowników za pomocą poczty elektronicznej. W razie problemów skontaktuj się z AMP for Email Working Group przez [GitHub](https://github.com/ampproject/wg-amp4email).

# Dodawanie obsługi klienta

Jeśli chcesz dodać obsługę AMP dla poczty e-mail w swoim kliencie poczty elektronicznej, [skontaktuj się z zespołem na GitHub](https://github.com/ampproject/wg-amp4email/)!

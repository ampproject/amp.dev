---
'$title': Debugowanie problemów z usługą buforowania AMP
$order: 8
formats:
  - websites
  - stories
  - ads
teaser:
  text: ' Dlaczego mój dokument jest uszkadzany na serwerze buforującym AMP?'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Dlaczego mój dokument jest uszkadzany na serwerze buforującym AMP? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

Prawidłowe dokumenty AMP zazwyczaj wyglądają i działają na serwerach buforujących AMP tak samo, jak w źródle. Niektóre składniki i konfiguracje serwerów mogą jednak powodować problemy.

Jeśli konkretny dokument wygląda i działa zgodnie z oczekiwaniami w lokalizacji źródłowej, a pobrany z serwera buforującego już nie ([zobacz jak mapować adresy URL źródeł na serwery buforujące AMP firmy Google](https://developers.google.com/amp/cache/overview#amp-cache-url-format)), spróbuj wykonać następujące czynności:

1. Otwórz konsolę narzędzi programistycznych/błędów w swojej przeglądarce i rozwiąż wszelkie pojawiające się błędy lub ostrzeżenia.
2. Przepuść dokument przez walidator [AMPBench](https://ampbench.appspot.com/) i rozwiąż wszelkie niespodziewane błędy lub ostrzeżenia.

Jeśli po wykonaniu tych czynności problem nie ustąpi, sprawdź poniższą tabelę.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">Objaw</th>
      <th width="30%">Problem</th>
      <th width="40%">Rozwiązanie</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Czcionki internetowe nie są wyświetlane (stosowane są czcionki rezerwowe)</td>
      <td>Serwer buforujący AMP nie znajduje się na białej liście dostawcy czcionek.</td>
      <td>Skontaktuj się z dostawcą czcionek i poproś go o umieszczenie na liście dozwolonych <a href="amp-cors-requests.md#cors-security-in-amp">wszystkich serwerów buforujących</a>.</td>
    </tr>
    <tr>
      <td>Nie są wyświetlane zasoby (np. czcionki i obrazy, <strong>&nbsp;tylko źródło HTTP</strong>)</td>
      <td>W dokumencie zastosowano adresy URL z względnym protokołem.</td>
      <td>Przejdź na bezwzględne adresy URL (takie jak <code>http://www.site.com/doc/amp</code>, a nie <code>//www.site.com/doc/amp</code>).</td>
    </tr>
    <tr>
      <td rowspan="2">Nie są wyświetlane zasoby (np. czcionki i obrazy)</td>
      <td>Zasoby są serwowane z niewłaściwym typem MIME.</td>
      <td>Określ <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">dopuszczalny typ MIME</a>.</td>
    </tr>
    <tr>
      <td>Serwer buforujący AMP nie może uzyskać dostępu do zasobów.</td>
      <td>Upewnij się, że serwer buforujący AMP ma dostęp do Twoich zasobów i nie jest blokowany przez adres IP, program użytkownika itd. (<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Lista programów użytkownika używanych przez robota indeksującego Google</a>).</td>
    </tr>
    <tr>
      <td>Elementy dynamiczne, takie jak <code><amp-form></amp-form></code>, <kod><amp-list></amp-list> nie działają zgodnie z oczekiwaniami.</kod>
</td>
      <td>Uszkodzone lub brakujące nagłówki CORS.</td>
      <td>Składniki te generują żądania danych z różnych źródeł, wysyłane z serwera buforującego AMP do Twojego źródła. Przeglądarki domyślnie blokują te żądania. Aby zezwolić na te żądania, należy emitować nagłówki <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS</a>, zezwalające na umieszczenie na liście dozwolonych <a href="amp-cors-requests.md">wszystkich serwerów buforujących</a>.</td>
    </tr>
    <tr>
      <td>Dostarczane są treści, które muszą zostać usunięte w związku z prawnym zawiadomieniem o konieczności ich usunięcia.</td>
      <td>Serwer buforujący AMP nie odebrał jeszcze usunięcia.</td>
      <td>Postępuj zgodnie z wytycznymi danego serwera buforującego AMP, aby odświeżyć treść. Informacje na temat usługi Google AMP Cache można znaleźć w sekcji <a href="https://developers.google.com/amp/cache/update-cache">Aktualizowanie zawartości AMP</a>.</td>
    </tr>
</tbody>
</table>

</table>

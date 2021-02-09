---
'$title': Serwowanie AMP za pomocą podpisanych wymian
$order: 4
formats:
  - websites
author: CrystalOnScript
---

AMP zapewnia wykraczające poza format korzyści dotyczące szybkości dzięki technikom takim jak buforowanie i ładowanie wstępne. Korzyści te mogą mieć [minusy](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/), takie jak dodatkowe adresy URL wyświetlane podczas osadzania w [przeglądarce AMP](https://developers.google.com/search/docs/guides/about-amp). Serwując zawartość AMP przy użyciu podpisanych wymian, można wykorzystać nową funkcję platformy internetowej, aby przezwyciężyć te wszystkie problemy.

[Podpisana wymiana](https://developers.google.com/web/updates/2018/11/signed-exchanges) składa się z prawidłowego dokumentu AMP i oryginalnego adresu URL zawartości. Informacje te są chronione podpisami cyfrowymi, które w bezpieczny sposób wiążą dokument z jego deklarowanym adresem URL. Umożliwia to przeglądarkom bezpieczne wyświetlanie oryginalnego adresu URL na pasku adresu URL, zamiast nazwy hosta komputera, który dostarczył bajty do przeglądarki.

Podpisana zawartość AMP jest dostarczana _dodatkowo do_ (a nie zamiast) zwykłej zawartości AMP.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"] Ta funkcja jest obecnie obsługiwana w Chrome, ale planowana jej implementacja dla dodatkowych przeglądarek. [/tip]

# Czy podpisane wymiany będą działać u mnie?

Aby zaimplementować podpisane wymiany, musisz spełnić następujące wymagania:

- Możliwość konfiguracji i kontroli nagłówków HTTP generowanych przez serwer. (Większość czysto internetowych rozwiązań hostingowych, takich jak Blogger, _nie_ jest zgodna z podpisanymi wymianami).
- Możliwość generowania podpisanych wymian AMP, np. poprzez uruchomienie narzędzia [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) jako [pliku binarnego Go](https://golang.org/doc/install) lub na maszynie wirtualnej [Docker VM](https://docs.docker.com/machine/get-started/).
  - Narzędzie do tworzenia pakietów należy aktualizować co sześć tygodni.
- Możliwość stosowania nagłówków [Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) `Accept` i `AMP-Cache-Transform` na serwerach brzegowych HTTP, zwracających różne treści z tego samego adresu URL.
- System z narzędziem `amppackager` musi być w stanie wykonywać wychodzące żądania sieciowe do:
  - Urzędu CA wydającego Twój certyfikat
  - Serwera wydawcy, na którym znajdują się dokumenty AMP do podpisania
  - Domeny `cdn.ampproject.org` w celu uzyskiwania bieżącej wersji AMP
- Trwały system plików magazynu udostępnionego między wszystkimi wystąpieniami narzędzia `amppackera` działającymi w tym samym centrum danych.

# Implementowanie podpisanych wymian

Poniżej widnieje zalecana kolejność implementacji obsługi podpisanych wymian w dokumentach AMP.

## Uzyskanie obsługiwanego certyfikatu TLS

Do wykonania podpisanych wymian niezbędny jest certyfikat TLS z rozszerzeniem `CanSignHttpExchanges`. Od kwietnia 2019 roku jedynym dostawcą tego rozszerzenia jest [DigiCert](https://www.digicert.com/) ([więcej informacji](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)).

W celu wygenerowania certyfikatu urząd certyfikacji (CA) będzie potrzebować żądania podpisania certyfikatu (CSR), które może być generowane za pomocą `openssl`. Przykład CSR dla domeny `ampbyexample.com`:

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## Określanie adresów URL, które mają zostać podpisane

Konieczne będzie utworzenie wzorca URL określającego, które dokumenty powinny zostać podpisane. Bardzo ważne jest, aby nie podpisywać prywatnych treści, takich jak informacje spersonalizowane, aby uniknąć wysyłania treści wprowadzających w błąd lub nieprawidłowych.

Ze względów wydajności narzędzie do tworzenia pakietów powinno otrzymywać jako dane wejściowe tylko prawidłowe dokumenty AMP. W razie potrzeby można przesyłać niektóre nieprawidłowe dokumenty AMP, ale należy unikać wysyłania całego ruchu przez narzędzie do tworzenia pakietów.

## Instalowanie narzędzia do tworzenia pakietów na serwerze przejściowym

Aby sprawdzić prawidłowość konfiguracji przed migracją do produkcji, podpisane wymiany należy najpierw skonfigurować na serwerze przejściowym.

Do generowania podpisanych wymian zalecamy używanie narzędzia [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md). Jeśli jednak nie jest to dobre rozwiązanie dla danego środowiska produkcyjnego, możesz zamiast tego użyć klientów wiersza polecenia [`transformator`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) lub [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange) i samodzielnie obsługiwać negocjowanie zawartości oraz zarządzaniem certyfikatami.

Poniższe instrukcje dotyczą implementacji z użyciem narzędzia `amppackager`.

### Konfiguracja

Plik konfiguracji narzędzia [`amppackager`](https://github.com/ampproject/amppackager) o nazwie (`amppkg.toml`) wywołuje pliki **CertFile** i **KeyFile**.

Plik **KeyFile** jest kluczem prywatnym (`ampbyexample-packager.key` w powyższym przykładzie) i powinien mieć następujący format. (Uwaga: nie udostępniaj własnego klucza prywatnego i chroń go przed nieumyślnym udostępnieniem!)

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

Plik **CertFile** jest certyfikatem publicznym. Jeżeli certyfikat pochodzi od DigiCert, można go utworzyć poprzez konkatenację certyfikatu źródła dostarczonego przez DigiCert i pliku `DigiCertCA.crt`.

```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### Instalacja

Wykonaj instrukcje podane [tutaj, aby zainstalować narzędzie `amppackager` w swojej witrynie](https://github.com/ampproject/amppackager/blob/master/README.md).

[tip type="read-on"] Plik [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (używany przez `amp.dev`) przedstawia przykład zmian po stronie serwera, które trzeba będzie wprowadzić w celu kierowania niezbędnych żądań do pliku `amppkg`. [/tip]

### Testowanie

Sprawdź, czy witryna przejściowa odpowiada zawartością typu MIME `application/signed-exchange`, gdy jest to określone przez żądanie HTTP. Na przykład (zastąp `staging.example.com` swoim serwerem przejściowym):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

Dane wyjściowe muszą zawierać ten wiersz:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] Parametr `v="1..100"` w żądaniu to element zastępczy. Nie dopasowuj do tej wartości; zamiast tego, jak [opisano w instrukcjach instalacji narzędzia amppackager](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing) sprawdź tylko, czy istnieje nagłówek `amp-cache-transform` i zignoruj wartość. [/tip]

[tip type="important"] Ciąg znaków wersji `v=b3` w odpowiedzi to wersja z sierpnia 2019 roku. Ta wersja zostanie zmieniona. [/tip]

Większą część odpowiedzi powinna stanowić Twoja strona AMP (w zwykłym tekście). Jest tam mały nagłówek binarny, a jeśli strona jest >16 kB, zawierać będzie po kilka rozrzuconych bajtów binarnych.

Do zbadania odpowiedzi można użyć [narzędzia `dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation):

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(Pamiętaj, że przełącznik `-verify` nie będzie działać w tym momencie, ponieważ wymagane certyfikaty nie znajdują się na serwerze `https://example.com/`.)

Sprawdź, czy odpowiedź _zawsze_ zawiera nagłówek `Vary` o wartości `Accept,AMP-Cache-Transform` (bez względu na to, czy typ MIME to `text/html`, `application/signed-exchange`, czy jeszcze inny):

```sh
$ curl -si https://staging.example.com/ | less
```

Dane wyjściowe muszą zawierać ten wiersz:

```txt
vary: Accept,AMP-Cache-Transform
```

## Instalowanie narzędzia do tworzenia pakietów w produkcji

### Instalacja

Dostosuj powyższe kroki instalacji do swojego środowiska produkcyjnego.

### Testowanie

#### Za pomocą narzędzi wiersza polecenia

Wykonaj te same testy, co wyżej. Operacja `dump-signedexchange -verify` tym razem powinna się powieść.

#### W Chrome

Możesz również przetestować kod w Chrome przy użyciu rozszerzenia [ModHeader ](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en). Zainstaluj je z Chrome Web Store i skonfiguruj `Request Headers` `amp-cache-transform` z `Value` `google`.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testowanie w Chrome za pomocą rozszerzenia ModHeader', caption=' ', align='' ) }}

Po zażądaniu `https://example.com/` Twój serwer dostarczy podpisaną wymianę, ale powinien wyglądać i działać tak samo jak wcześniej. Trzeba będzie sprawdzić w [konsoli DevTools](https://developers.google.com/web/tools/chrome-devtools/), czy podpisana wymiana jest zwracana prawidłowo.

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Nagłówek podpisanej wymiany wyświetlany w konsoli DevTools', caption=' ', align='' ) }}

Na karcie `Network` kliknij nazwę swojej domeny i sprawdź, czy w obszarze `Preview` widnieje `Signed HTTP exchange`.

#### W usłudze Google AMP Cache

Upewnij się, że podpisane wymiany są zgodne z usługą Google AMP Cache. Wiąże się to z ich wykrywalnością w wyszukiwarkach takich jak Google.

Aby przetestować podpisane wymiany w usłudze Google AMP Cache, otwórz kartę Network w konsoli DevTools, włącz opcję `Preserve log`, a następnie odwiedź adres URL taki jak `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

W konsoli DevTools zobaczysz wartość `200` w wierszu `signed-exchange`, a jeśli żądanie powiodło się, wiersz `from signed-exchange`.

W razie niepowodzenia wierszy signed-exchange będzie brakować lub zostaną wyróżnione kolorem czerwonym. Może być również obecny nagłówek `warning`, zapewniający dodatkowe informacje.

## Podpisane wymiany w wyszukiwarce Google

Jeśli strony AMP zostały pomyślnie rozesłane jako podpisane wymiany, wyniki ich wyszukiwania będą błyskawicznie wyświetlać AMP, tak samo jak wcześniej, ale dotknięcie wyników poskutkuje wyświetleniem na pasku adresu URL domeny `https://example.com`, zamiast adresu URL zaczynającego się od `https://www.google.com/amp/...`. Ponadto nie będzie wyświetlany pasek `viewer`.

W konsoli DevTools na karcie `Network` będzie widać `signed-exchange` w kolumnie `type`.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='W konsoli DevTools na karcie Network będzie widać signed-exchange w kolumnie type.', caption=' ', align='' ) }}

# Dostawcy usług podpisanej wymiany

Poniżej znajduje się lista sieci CDN i dostawców usług hostingowych oferujących gotową obsługę podpisanych wymian. Korzystanie z jednego z nich jest najprostszym sposobem rozpoczęcia korzystania z podpisanych wymian:

- [AMP Packager Instalator Google Cloud Click-to-Deploy](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) to narzędzie do ulepszania adresów URL AMP poprzez udostępnianie stron AMP za pomocą podpisanych giełd. Przeczytaj więcej na [blogu AMP](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/).
- [Rzeczywisty adres URL AMP Cloudflare](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) jest jedną z największych sieci na świecie. Dziś firmy, organizacje non-profit, blogerzy i każdy, kto ma obecność w Internecie, mogą dzięki Cloudflare pochwalić się szybszymi, bezpieczniejszymi witrynami internetowymi i aplikacjami.

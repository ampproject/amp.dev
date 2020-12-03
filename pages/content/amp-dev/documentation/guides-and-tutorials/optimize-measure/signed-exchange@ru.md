---
"$title": Выдача контента AMP с использованием подписанных обменов
"$order": '4'
formats:
- websites
author: CrystalOnScript
---

AMP может работать быстрее заявленных возможностей за счет таких методов, как кеширование и предварительная загрузка. У этих преимуществ могут быть свои [недостатки](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/), например отображение дополнительных URL-адресов при встраивании в средство [просмотра AMP](https://developers.google.com/search/docs/guides/about-amp). Решить эти проблемы позволяет новая функциональность веб-платформ — Signed Exchanges («подписанные обмены»).

[Подписанный обмен](https://developers.google.com/web/updates/2018/11/signed-exchanges) состоит из корректно сформированного документа AMP и исходного URL-адреса контента. Эта информация защищена цифровыми подписями, которые надежно связывают документ с его заявленным URL. Это позволяет браузерам безопасно отображать исходный URL в адресной строке вместо имени хоста устройства, выполнившего доставку байтов в браузер.

Подписанный контент AMP доставляется *в дополнение* к обычному контенту AMP (а не вместо него).

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"] В настоящее время эта функция поддерживается в Chrome, но ее планируется реализовать и для других браузеров. [/tip]

# Будут ли подписанные обмены работать в моей среде?

Для функционирования подписанных обменов требуется соблюдение следующих условий:

- Возможность настройки и управления заголовками HTTP, генерируемыми вашим сервером. Большинство решений для хостинга, являющихся исключительно веб-решениями (например, Blogger), *не* совместимы с подписанными обменами.
- Способность генерировать подписанные обмены AMP, например путем запуска [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md), в виде [двоичного файла Go](https://golang.org/doc/install) или внутри [Docker VM](https://docs.docker.com/machine/get-started/).
    - Упаковщик должен обновляться каждые шесть недель.
- Способность возвращать различное содержимое с одного и того же URL, учитывая значение [Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) с заголовками `Accept` и `AMP-Cache-Transform` на пограничных HTTP-серверах.
- Система, в которой работает `amppackager`, должна иметь возможность отправлять исходящие сетевые запросы на:
    - Центр сертификации, выдающий ваш сертификат
    - Сервер издателя, на котором размещены подписываемые документы AMP
    - `cdn.ampproject.org` для получения текущей версии AMP
- Постоянное общее хранилище (файловая система), доступное всем экземплярам `amppackager`, работающим в одном центре обработки данных.

# Реализация подписанных обменов

Ниже приведен предлагаемый порядок действий для реализации поддержки подписанных обменов в ваших документах AMP.

## Получите поддерживаемый сертификат TLS

Для создания подписанных обменов необходим сертификат TLS с расширением `CanSignHttpExchanges`. По состоянию на апрель 2019 года единственным поставщиком этого расширения является [DigiCert](https://www.digicert.com/) ([подробнее](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)).

Для создания сертификата Центру сертификации (CA) потребуется запрос на подпись сертификата (CSR), который можно сгенерировать с помощью `openssl`. Образец CSR для `ampbyexample.com`:

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## Определите, какие URL-адреса будут подписываться

Вам потребуется создать шаблон URL, определяющий, какие документы должны быть подписаны. Очень важно не допускать подписывания частного контента, такого как персонализированная информация, чтобы избежать отправки вводящего в заблуждение или неверного контента.

Для сохранения надлежащей производительности в качестве входных данных упаковщику следует передавать только корректно сформированные документы AMP. Несколько недействительных документов AMP не приведут к плохим последствиям, однако следует избегать отправки всего трафика через упаковщик.

## Разверните упаковщик на промежуточном сервере

Начальное внедрение подписанных обменов следует осуществлять на промежуточном сервере, чтобы проверить правильность конфигурации до переноса ее в рабочую среду.

Для генерации подписанных обменов рекомендуем использовать [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md). Однако, если такой подход плохо сочетается с вашей рабочей средой, вы можете использовать клиенты командной строки [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) и [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange), осуществляя согласование контента и управление сертификатами самостоятельно.

Приведенные ниже инструкции относятся к развертыванию с помощью `amppackager`.

### Конфигурация

В файле конфигурации [`amppackager`](https://github.com/ampproject/amppackager) (`amppkg.toml`) необходимо указывать **CertFile** и **KeyFile**.

**KeyFile** — это закрытый ключ (в приведенном выше примере `ampbyexample-packager.key`), и он должен иметь следующий формат:

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

Примечание: никому не передавайте свой личный ключ и защищайте его от непреднамеренного разглашения!<br>**CertFile** — это открытый сертификат. Если вы используете DigiCert: CertFile можно создать, объединив сертификат источника, полученный от DigiCert, с файлом `DigiCertCA.crt`.

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

### Установка

Чтобы настроить [`amppackager` на своем сайте, выполните инструкции по этой ссылке](https://github.com/ampproject/amppackager/blob/master/README.md).

[tip type="read-on"] Изучите файл [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (используемый сайтом `amp.dev`), чтобы увидеть пример изменений, которые вам нужно будет внести на стороне сервера для маршрутизации необходимых запросов к `amppkg`. [/tip]

### Тестирование

Убедитесь, что ваш промежуточный сайт отвечает на соответствующие HTTP-запросы контентом с MIME-типом `application/signed-exchange`. Например (замените `staging.example.com` на свой промежуточный сервер):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

Вывод должен включать эту строку:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] `v="1..100"` в запросе является заполнителем. Не пытайтесь проверять соответствие по этому значению; вместо этого, как [описано в инструкциях по установке amppackager](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing), проверяйте только наличие заголовка `amp-cache-transform` и игнорируйте значение. [/tip]

[tip type="important"] Строка версии `v=b3` в ответе — это версия по состоянию на август 2019 года. Она будет меняться. [/tip]

Основная часть ответа должна быть вашей AMP-страницей (в виде открытого текста). В нем также присутствует небольшой двоичный заголовок и периодически вставленные двоичные байты (если размер страницы больше 16 КБ).

[Инструмент `dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) можно использовать для просмотра ответа:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

Обратите внимание, что переключатель `-verify` на этом этапе работать не будет, поскольку требуемые сертификаты на сервере `https://example.com/` отсутствуют.

Убедитесь, что ответ *всегда* включает заголовок `Vary` со значением `Accept,AMP-Cache-Transform` (независимо от того, какой используется MIME-тип — `text/html`, `application/signed-exchange` или какой-либо другой):

```sh
$ curl -si https://staging.example.com/ | less
```

Вывод данной команды должен включать следующую строку:

```txt
vary: Accept,AMP-Cache-Transform
```

## Выполните развертывание упаковщика в рабочей среде

### Установка

Скорректируйте этапы промежуточного развертывания, описанные выше, для соответствия вашей рабочей среде.

### Тестирование

#### С помощью инструментов командной строки

Выполните те же тесты, что выше. Команда `dump-signedexchange -verify` теперь должна работать.

#### С помощью Chrome

Тестировать можно в Chrome с помощью [расширения ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en). Установите его из Интернет-магазина Chrome и добавьте в раздел `Request Headers` строку `amp-cache-transform`, установив параметру `Value` значение `google`.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testing Chrome with the help of the ModHeader extension', caption=' ', align='' ) }}

По запросу `https://example.com/` ваш сервер выдаст подписанный обмен, который, однако, будет неотличим от обычного сайта. Вам потребуется удостовериться в корректном возврате подписанного обмена через [консоль DevTools](https://developers.google.com/web/tools/chrome-devtools/).

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Signed exchange header displayed in the DevTools console', caption=' ', align='' ) }}

На вкладке `Network` нажмите на имя своего домена и убедитесь, что в разделе `Preview` отображается `Signed HTTP exchange`.

#### С помощью Google AMP Cache

Убедитесь, что подписанные обмены совместимы с Google AMP Cache. От этого зависит возможность их обнаружения в поисковых системах, таких как Поиск Google.

Чтобы протестировать подписанные обмены в Google AMP Cache, откройте вкладку Network в DevTools, активируйте `Preserve log`, после чего откройте URL-адрес, например `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

Если запрос был успешен, DevTools покажет значение `200` в строках `signed-exchange` и `from signed-exchange`.

В случае неудачи строки signed-exchange будут отсутствовать или будут выделены красным цветом. Также может отображаться заголовок `warning` с дополнительной информацией.

## Подписанные обмены в Поиске Google

Если ваши AMP-страницы успешно загружались в виде подписанных обменов, в результатах поиска напротив них будет по-прежнему отображаться значок молнии AMP, но при нажатии на результаты вместо URL, начинающегося с `https://www.google.com/amp/….`, в адресной строке будет отображаться `https://example.com`. Кроме того, не будет отображаться панель `viewer`.

На вкладке `network` консоли DevTools в столбце `type` будет отображено значение `signed-exchange`.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='Within the DevTools console, under the network tab, you will be able to see signed-exchange under the type column.', caption=' ', align='' ) }}

# Поставщики услуг подписанного обмена

Ниже приведен список CDN и хостинг-провайдеров, предлагающих готовую поддержку подписанных обменов. Их услуги — самый простой способ начать работу с подписанными обменами.

- [AMP Packager Google Cloud Click-to-Deploy Installer](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) - это инструмент для улучшения URL-адресов AMP путем обслуживания AMP с помощью подписанных обменов. Подробнее читайте в [блоге AMP](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/) .
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) — одна из крупнейших сетей в мире. Cloudflare помогает обеспечить повышенную скорость и защищенность для сайтов предприятий, некоммерческих организаций, блогеров и всех, кто ведет деятельность в Интернете.

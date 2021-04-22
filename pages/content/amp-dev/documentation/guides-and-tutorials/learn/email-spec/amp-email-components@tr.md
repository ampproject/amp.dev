---
'$title': E-Posta Destekli Bileşenler için AMP
$order: 3
formats:
  - email
teaser:
  text: 'Şu anda AMP e-posta mesajlarında desteklenen AMP bileşenlerinin listesi aşağıdadır. Bileşenler aşağıdaki kategorilere ayrılır:'
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-components.md.
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

Şu anda AMP e-posta mesajlarında desteklenen [AMP bileşenlerinin](https://amp.dev/documentation/components/?format=email) listesi aşağıdadır. Bileşenler aşağıdaki kategorilere ayrılır:

- [Dinamik İçerik](#dynamic-content)
- [Yerleşim](#layout)
- [Medya](#media)

## Dinamik İçerik <a name="dynamic-content"></a>

| Öğe                                                                                                                                                                            | Açıklama                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                              | Form öğesi. Action-xhr özniteliği normal eylem özniteliği yerine kullanılmalıdır. Bir yanıt oluşturmak için `<template type="amp-mustache">` ile birlikte kullanılabilir. <br><br>**Not:** [gönderildikten sonra yeniden yönlendirmeye izin verilmez.](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission) |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                      | Bir form içinde kullanmak için bir çoklu seçim bileşeni.                                                                                                                                                                                                                                                                                  |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) ve [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Elemanlar arasındaki etkileşimler için bir durum makinesinin manipülasyonuna izin veren AMP'deki basit bir betik dili. Belirli olaylara davranış eklemek için de kullanılabilir.<br><br>**Not:** `[href]` ya da `[src]` bağlanmak yasaktır. `AMP.print`, `AMP.navigateTo` ve `AMP.goBack` eylemlerinin kullanılması da yasaktır.          |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                               | `<amp-state>`, `amp-bind` tarafından kullanılan başlangıç durumunu tanımlamak için kullanılır. <br><br>**Not:** `src` özniteliği şu anda desteklenmiyor.                                                                                                                                                                                  |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                              | Uzaktan bir [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache) tarafından işlenecek JSON verilerini getirir.<br><br>**Not:** `[src]` özniteliğine bağlanmaya izin verilmez. `credentials="include"` ile kullanıcı kimlik bilgilerinin dahil edilmesi de yasaktır.                                                  |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                      | Bir `amp-list` çağrısının sonuçlarını oluşturmak için bir Mustache şablonu işaretlemesi.                                                                                                                                                                                                                                                  |

## Yerleşim <a name="layout"></a>

| Öğe                                                                                                                   | Açıklama                                                                         |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [yerleşim öznitelikleri](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | Yerleşim davranışı yerleşim özniteliği tarafından belirlenir.                    |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                           | Farklı bölümleri göstermeyi/gizlemeyi kolaylaştıran bir kullanıcı arayüzü öğesi. |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                             | Bir resim döngüsü kullanıcı arayüzü bileşeni.                                    |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                             | Belirli bir alana metin sığdırmak için yardımcı bir bileşen.                     |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                                 | En boy oranı tabanlı duyarlı yerleşimlere sahip olabilen bir kapsayıcı.          |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                               | Navigasyon amaçlı bir kenar çubuğu.                                              |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                               | Zaman damgalarını oluşturmanın uygun bir yolunu sağlar.                          |

## Medya <a name="media"></a>

| Öğe                                                               | Açıklama                                                                                   |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | `<img>` yerine geçen bir AMP bileşeni.<br><br>**Not:** `[src]` bağlantısına izin verilmez. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | GIF dosyalarını yerleştirir.<br><br>**Not:** `[src]` bağlantısına izin verilmez.           |

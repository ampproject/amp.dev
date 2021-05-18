---
'$title': Struttura e rendering delle e-mail AMP
$order: 2
formats:
  - email
teaser:
  text: 'Le e-mail hanno la struttura di un '
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

Le e-mail hanno la struttura di un albero MIME. Questo albero MIME contiene il corpo del messaggio e gli eventuali allegati all'e-mail.

Per incorporare contenuti AMP in un'email, occorre aggiungere una nuova parte MIME con contenuto di tipo `text/x-amp-html` come discendente di `multipart/alternative`. Tale elemento dovrà coesistere con le parti `text/html` o `text/plain` esistenti. Ciò garantisce che il messaggio e-mail funzioni su tutti i client.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/main/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="Diagramma delle parti MIME di AMP per email" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

Per ulteriori informazioni sul sottotipo `multipart/alternative`, fare riferimento allo standard [RFC 1521, sezione 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

## Informazioni aggiuntive <a name="additional-information"></a>

La parte `text/x-amp-html` deve essere innestata sotto un nodo `multipart/alternative`. Un'e-mail non può contenere più di una parte `text/x-amp-html` all'interno di un nodo `multipart/alternative`.

L'elemento `multipart/alternative` deve contenere almeno un nodo non AMP (`text/plain` o `text/html`) oltre al nodo `text/x-amp-html`. La parte non AMP verrà mostrata agli utenti i cui client di posta elettronica non supportano AMP o che hanno disattivato l'opzione tramite le impostazioni del proprio fornitore di posta elettronica.

Nota: Alcuni client di posta elettronica [[1]](https://openradar.appspot.com/radar?id=6054696888303616) riproducono solo l'ultima parte MIME, quindi si consiglia di posizionare la parte MIME `text/x-amp-html` _prima_ della parte MIME `text/html`.

### Semantica delle funzioni di risposta/inoltro <a name="replyingforwarding-semantics"></a>

Il client di posta elimina la parte `text/x-amp-html` dell'albero MIME quando un utente risponde o inoltra un messaggio e-mail AMP.

### Scadenza <a name="expiry"></a>

Alcuni client di posta elettronica potrebbero interrompere la visualizzazione della parte AMP di un'e-mail dopo un determinato periodo di tempo, ad esempio 30 giorni. In questo caso, le e-mail mostreranno la parte `text/html` o `text/plain`.

## Esempio <a name="example"></a>

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
<html ⚡4email data-css-strict>
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

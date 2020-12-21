---
"$title": Testando e-mails AMP
"$order": '2'
"$category": Develop
description: Garanta a melhor experiência do usuário possível testando seus e-mails AMP antes de enviá-los a um grande público.
formats:
- email
author: fstanis
---

Garanta a melhor experiência do usuário possível testando seus e-mails AMP antes de enviá-los a um grande público.

## Checklist de testes

1. Inclua uma versão HTML e/ou versão de texto simples do seu e-mail AMP. Clientes de e-mail que não suportam AMP mostrarão essa versão como reserva.
2. Garanta a validade do seu AMP ao seguir os passos descritos em  [Validação de E-mails AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md).
3. Consulte  [AMP para e-mail: CSS suportado](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) para ter a certeza que o CSS que você está usando é suportado em todos os clientes de e-mail.
4. Try your email in the [AMP Playground](https://playground.amp.dev/?runtime=amp4email) and ensure all dynamic features such as forms work correctly.

## Testando clientes de e-mail específicos

Os clientes de e-mail que suportam AMP também fornecem documentação para desenvolvedores que poderá conter diretrizes e requisitos adicionais.

### Gmail

Gmail documentation lists guidelines for testing in [Test your AMP emails in Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email).

Os usuários do Gmail podem usar o [Gmail AMP for Email Playground](https://amp.gmail.dev/playground/) para enviar um e-mail para eles mesmos como teste.

### Mail.ru

[Mail.ru AMP emails](https://postmaster.mail.ru/amp) provides information on how to enable testing in your Mail.ru account.

Mail.ru users can use the [Mail.ru AMP Playground](https://postmaster.mail.ru/amp/playground.html) to send an email to themselves for testing.

---
'$title': Testando e-mails AMP
$order: 2
'$category': Develop
description: Garanta a melhor experiência do usuário possível testando seus e-mails AMP antes de enviá-los a um grande público.
formats:
  - email
author: fstanis
---

Garanta a melhor experiência do usuário possível testando seus e-mails AMP antes de enviá-los a um grande público.

## Checklist de testes

1. Inclua uma versão HTML e/ou versão de texto simples do seu e-mail AMP. Clientes de e-mail que não suportam AMP mostrarão essa versão como reserva.
2. Garanta a validade do seu AMP ao seguir os passos descritos em [Validação de E-mails AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md).
3. Consulte [AMP para e-mail: CSS suportado](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) para ter a certeza que o CSS que você está usando é suportado em todos os clientes de e-mail.
4. Experimente seu e-mail no [Playground AMP](https://playground.amp.dev/?runtime=amp4email) e garanta que todos os recursos dinâmicos, como formulários, estejam funcionando corretamente.

## Testando clientes de e-mail específicos

Os clientes de e-mail que suportam AMP também fornecem documentação para desenvolvedores que poderá conter diretrizes e requisitos adicionais.

### Gmail

A documentação do Gmail lista diretrizes para testes em [Teste seus e-mails AMP no Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email).

Os usuários do Gmail podem usar o [Gmail AMP for Email Playground](https://amp.gmail.dev/playground/) para enviar um e-mail para eles mesmos como teste.

### Mail.ru

O documento [Mail.ru AMP emails](https://postmaster.mail.ru/amp) fornece informações sobre como habilitar testes na sua conta Mail.ru.

Os usuários do Mail.ru podem usar o [Playground AMP do Mail.ru](https://postmaster.mail.ru/amp/playground.html) para enviar um e-mail para eles mesmos como teste.

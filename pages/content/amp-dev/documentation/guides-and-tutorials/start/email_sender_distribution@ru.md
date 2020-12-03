---
"$title": Регистрация в качестве отправителя
"$order": '1'
description: Для рассылки AMP-писем требуется регистрация в качестве отправителя
"$category": Start
formats:
- email
author: CrystalOnScript
---

Почтовые клиенты требуют специальной регистрации от отправителей AMP-писем. Следуйте этому руководству, чтобы добавить ваш адрес отправителя в разрешенный список на поддерживаемых клиентах.

# Создайте и отправьте готовое AMP-письмо

От вас требуется понимание и соблюдение формата AMP-писем. Электронные письма должны:

- Передавать с адресом отправителя [SPF/DKIM/DMARC](https://support.google.com/a/answer/33786?hl=en) с совпадающим доменом верхнего уровня
- Содержать MIME-блок «text/html», служащий резервным способом отображения письма
- Соблюдать все требования клиента к отправителю

Отправьте готовое к работе AMP-письмо по следующим адресам:

- amphtmltest@outlook.com
- postmaster_amp@corp.mail.ru
- ampforemail.whitelisting@gmail.com

# Заполните общую форму

Вы должны заполнить форму [AMP для писем: форма регистрации отправителя](https://docs.google.com/forms/d/e/1FAIpQLSdso95e7UDLk_R-bnpzsAmuUMDQEMUgTErcfGGItBDkghHU2A/viewform?gxids=7628). Это единственная форма, которую вам нужно заполнить, чтобы получить разрешение на отправку AMP-писем со всех совместимых почтовых клиентов.

# Соблюдайте политику конфиденциальности

Вы должны соблюдать политику конфиденциальности каждого клиента.

**Gmail**

[Политика конфиденциальности и Условия использования Google](https://policies.google.com/privacy)

**Mail.ru**

- [Пользователям не из России](https://help.mail.ru/engmail-help/privacy)
- [Пользователям из России](https://agent.mail.ru/legal/privacypolicy/en)

**Microsoft**

[Заявление о конфиденциальности Microsoft](https://privacy.microsoft.com/en-us/privacystatement)

**Verizon Media (Yahoo Mail)**

- [Политика конфиденциальности Verizon Media — США](https://www.verizonmedia.com/policies/us/en/verizonmedia/privacy/index.html)
- Другие страны: перейдите [по этой ссылке](https://www.verizonmedia.com/policies/).

# Подтверждение

Каждый почтовый клиент уведомит вас о статусе вашей заявки по электронной почте. Если у вас возникли проблемы, обратитесь в рабочую группу AMP для писем через [GitHub](https://github.com/ampproject/wg-amp4email).

# Добавьте поддержку своего клиента

Если вы хотите добавить поддержку AMP для писем в свой почтовый клиент, свяжитесь [с нашей командой на GitHub](https://github.com/ampproject/wg-amp4email/).

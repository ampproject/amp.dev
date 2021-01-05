---
"$title": 발신자 메일 등록
"$order": '1'
description: AMP 이메일의 발신자 메일 등록
"$category": Start
formats:
- email
author: CrystalOnScript
---

이메일 클라이언트는 사용자에게 AMP 이메일을 표시하기 위해 발신자 등록을 요청합니다. 이 가이드에 따라 발신자 주소를 지원 클라이언트 허용 목록에 추가할 수 있습니다!

# 프로덕션 준비 상태의 AMP 이메일 작성 및 전송

AMP 이메일 형식에 대한 이해 및 컴플라이언스를 증명해야 합니다. 이메일 필수 요건은 다음과 같습니다.

- "From:" 주소의 동일한 TLD로 [SPF/DKIM/DMARC](https://support.google.com/a/answer/33786?hl=en) 통과
- 폴백 "text/html" MIME 부분 포함
- 모든 클라이언트 발신자 요건 준수

다음 주소로 프로덕션 준비 상태의 AMP 이메일을 전송합니다.

- ampverification@yahoo.com
- postmaster_amp@corp.mail.ru
- ampforemail.whitelisting@gmail.com

# 전체 양식 작성

[이메일용 AMP: 발신자 등록 양식](https://docs.google.com/forms/d/e/1FAIpQLSdso95e7UDLk_R-bnpzsAmuUMDQEMUgTErcfGGItBDkghHU2A/viewform?gxids=7628)을 작성해야 합니다. 이 양식은 모든 지원 이메일 클라이언트에 AMP 이메일을 전송할 수 있는 허용 목록 추가를 위해 작성해야 할 유일한 양식입니다.

# 개인정보 보호정책 준수

클라이언트의 개인정보 보호정책을 준수해야 합니다.

**Gmail**

[Google 개인정보 보호 및 약관](https://policies.google.com/privacy)

**Mail.ru**

- [러시아에 거주하지 않는 사용자](https://help.mail.ru/engmail-help/privacy)
- [러시아 거주 사용자](https://agent.mail.ru/legal/privacypolicy/en)

**Verizon Media (Yahoo Mail)**

- [Verizon Media Privacy Policy - US](https://www.verizonmedia.com/policies/us/en/verizonmedia/privacy/index.html)
- 기타 국가의 정책은 [이곳](https://www.verizonmedia.com/policies/)에서 확인하세요.

# 확인

각 이메일 클라이언트는 이메일로 허용 목록 상태를 공지합니다. 문제가 있을 경우 [GitHub](https://github.com/ampproject/wg-amp4email)를 통해 이메일용 AMP 워킹그룹에 문의해 주세요.

# 클라이언트 지원 추가

이메일용 AMP 지원에 관심이 있는 이메일 클라이언트는 [GitHub에서 저희 팀으로 문의해 주세요](https://github.com/ampproject/wg-amp4email/)!

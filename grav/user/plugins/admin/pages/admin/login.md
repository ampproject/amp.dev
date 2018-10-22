---
title: Admin Login

forms:
  login:
    action:
    method: post

    fields:
      username:
        type: text
        placeholder: PLUGIN_ADMIN.USERNAME_EMAIL
        autofocus: true
        validate:
          required: true
    
      password:
        type: password
        placeholder: PLUGIN_ADMIN.PASSWORD
        validate:
          required: true

  login-twofa:
    action:
    method: post

    fields:
      2fa_instructions:
        type: display
        markdown: true
        content: PLUGIN_ADMIN.2FA_INSTRUCTIONS
      2fa_code:
        type: text
        id: twofa-code
        autofocus: true
        placeholder: PLUGIN_ADMIN.2FA_CODE_INPUT 
---

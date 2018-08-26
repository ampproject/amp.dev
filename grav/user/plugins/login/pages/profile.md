---
title: Profile
access:
    site.login: true
    
form:
  fields:
    avatar_img:
      type: avatar
  
    username:
      type: text
      readonly: true
      disabled: true

    email:
      type: email
      placeholder: "Enter your email"
      validate:
        required: true
        message: PLUGIN_LOGIN.EMAIL_VALIDATION_MESSAGE
        
    fullname:
      type: text
      
    title:
      type: text  

    password:
      type: password
      label: Enter new password
      validate:
        message: PLUGIN_LOGIN.PASSWORD_VALIDATION_MESSAGE
        config-pattern@: system.pwd_regex


  buttons:
      -
          type: submit
          value: Submit
      -
          type: reset
          value: Reset

  process:
      update_user: true
      message: "Your profile has been updated"
---

# Profile
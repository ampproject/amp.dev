# Grav Form Plugin

The **form plugin** for [Grav](http://github.com/getgrav/grav) adds the ability to create and use forms.  This is currently used extensively by the **admin** and **login** plugins.

# Installation

The form plugin is easy to install with GPM.

```
$ bin/gpm install form
```

# Configuration

Simply copy the `user/plugins/form/form.yaml` into `user/config/plugins/form.yaml` and make your modifications.

```
enabled: true
```  

# How to use the Form Plugin

The Learn site has two pages describing how to use the Form Plugin:
- [Forms](http://learn.getgrav.org/advanced/forms)
- [Add a contact form](http://learn.getgrav.org/forms/forms/example-form)

# Using email

Note: when using email functionality in your forms, make sure you have configured the Email plugin correctly. In particular, make sure you configured the "Email from" and "Email to" email addresses in the Email plugin with your email address

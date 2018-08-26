# Grav Login Plugin

The **login plugin** for [Grav](http://github.com/getgrav/grav) adds login, basic ACL, and session wide messages to Grav.  It is designed to provide a way to secure front-end and admin content throughout Grav.

# Installation

The **login** plugin actually requires the help of the **email** and **form** plugins. The **email** plugin is needed to ensure that you can recover a password via email if required.  The **form** plugin is used to generate the forms required.

These are available via GPM, and because the plugin has dependencies you just need to proceed and install the login plugin, and agree when prompted to install the others:

```
$ bin/gpm install login
```

# Changes in version 2.6

* User registration is now disabled by default.  If you were relying on it being activated, you need to manually enable it in your `user/config/plugins/login.yaml`:

    ```
    user_registration:
      enabled: true 
    ```
* `login_after_registration` has also been changed to a default value of `false` for security purposes.


# Changes in version 2.5

Added new `$grav['login']->login()` and `$grav['login']->logout()` functions for you to use.

They use following events which can be hooked by plugins:

* `onUserLoginAuthenticate` Allows plugins to include their own authentication methods.
* `onUserLoginAuthorize`    Allows plugins to block user from being logged in.
* `onUserLoginFailure`      Allows plugins to include their own logic when user authentication failed.
* `onUserLogin`             Allows plugins to include their own logic when user logs in.
* `onUserLogout`            Allows plugins to include their own logic when user logs out.
* `onUserLoginRegisterData` Allows plugins to include their own data to be added to the user object during registration.
* `onUserLoginRegistered`   Allows plugins to hook into user registration just before the redirect.

New Plugin options have been added for:

* `dynamic_page_visibility` - Integrate access into page visibility so things can be shown or hidden in the menu

# Changes in version 2.0

* OAuth has been separated to its own plugin, needs to be installed separately and configured. The users account filename format has changed too, to fix an issue that involved people with the same name on a service.
* The `redirect` option has been changed to `redirect_after_login`.
* The Remember Me session minimum length is now 1 week.
* Removed the option to login from oauth without creating the corresponding user file under `user/accounts/`.

# Messages Output

There is not a guaranteed way to display system messages including those added by the Login plugin, so in order to see messages you will need to make sure your theme has a method to output the messages.  This is done by adding a simple Twig include, and the best place to do this to ensure it's visible in all your pages, is to add it to the `partials/base.html.twig` (or whatever your base Twig template is called):

```twig
    {% block messages %}
        {% include 'partials/messages.html.twig' ignore missing %}
    {% endblock %}
```

A good location is probably to add this right above where your content is going to be output.

# Creating Users

You can either use the built-in CLI capabilities, or you create a user manually by creating a new YAML file in your `user/acounts` folder.


# CLI Usage

The simplest way to create a new user is to simply run the `bin/plugin login newuser` command. This will take you through a few questions to gather information with which to create your user. You can also use inline arguments to avoid the interactive questions.

### Commands

| Command       | Arguments                            | Explination                |
|---------------|--------------------------------------|----------------------------|
|`newuser`|Aliases: `add-user`, `new-user`|Creates a new user (creates file in `user/accounts/`)
|| [ -u, --user=USER ]               | The username.                                                   |
|| [ -p, --password=PASSWORD ]       | The password. Ensure the password respects Grav's password policy. **Note that this option is not recommended because the password will be visible by users listing the processes.** |
|| [ -e, --email=EMAIL ]             | The user email address.                                         |
|| [ -P, --permissions=PERMISSIONS ] | The user permissions. It can be either `a` for Admin access only, `s` for Site access only and `b` for both Admin and Site access. |
|| [ -N, --fullname=FULLNAME ]       | The user full name                                              |
|| [ -t, --title=TITLE ]             | The title of the user. Usually used as a subtext. Example: Admin, Collaborator, Developer |
|| [ -s, --state=STATE ]             | The state of the account. Either `enabled` (default) or `disabled` |
|||
|`changepass`|Aliases: `newpass`, `passwd`|Changes password of the specified user (User file must exist)
|| [ -u, --user=USER ]               | The username.                                                   |
|| [ -p, --password=PASSWORD ]       | The new password. Ensure the password respects Grav's password policy. **Note that this option is not recommended because the password will be visible by users listing the processes.** |


### CLI Example
```
> bin/plugin login newuser -u joeuser -p 8c9sRCeBExAiwk -e joeuser@grav.org -P b -N "Joe User" -t "Site Administrator"
Creating new user


Success! User joeuser created.
```

### Interactive Example
```
> bin/plugin login newuser
Creating new user

Enter a username: joeuser
Enter a password: 8c9sRCeBExAiwk
Enter an email:   joeuser@grav.org
Please choose a set of permissions:
  [a] admin access
  [s] site access
  [b] admin and site access
 > b
Enter a fullname: Joe User
Enter a title:    Site Administrator
Please choose the state for the account:
  [enabled ] Enabled
  [disabled] Disabled
 > enabled

Success! User joeuser created.
```

### Manual User Creation

Here is example user defined in `user/accounts/admin.yaml`:

```
password: password
email: youremail@mail.com
fullname: Johnny Appleseed
title: Site Administrator
access:
  admin:
    login: true
    super: true
```

>> Note: the username is based on the name of the YAML file.

# Default Configuration

```yaml
enabled: true                             # Enable the plugin
built_in_css: true                        # Use built-in CSS
route:                                    # Specific route for Login page (default is '/login')
redirect_to_login: true                   # If you try to access a page you don't have access to, should you redirect to login route
redirect_after_login:                     # Path to redirect to after a successful login (eg '/user_profile')
route_activate: '/activate_user'          # Route for the user activation process
route_forgot: '/forgot_password'          # Route for the forgot password process
route_reset: '/reset_password'            # Route for the reset password process
route_profile: '/user_profile'            # Route for the user profile page
route_register: '/user_register'          # Route for the user registration page
route_unauthorized: '/user_unauthorized'  # Route for a page to display if user is unauthorized

dynamic_page_visibility: false            # Integrate access into page visibility so things can be shown or hidden in the menu
parent_acl: false                         # Look to parent `access` rules for access requirements
protect_protected_page_media: false       # Take `access` rules into account when directly accessing a page's media

rememberme:
  enabled: true                           # Enable 'remember me' functionality
  timeout: 604800                         # Timeout in seconds. Defaults to 1 week
  name: grav-rememberme                   # Name prefix of the session cookie

max_pw_resets_count: 0                    # Number of password resets in a specific time frame (0 = unlimited)
max_pw_resets_interval: 60                # Time in minutes to track password resets
max_login_count: 0                        # Number of failed login attempts in a specific time frame (0 = unlimited)
max_login_interval: 2                     # Time in minutes to track login attempts
``` 

# Usage

You can add ACL to any page by typing something like below into the page header:

```
access:
  site.login: true
  admin.login: true
```

Users who have any of the listed ACL roles enabled will have access to the page.
Others will be forwarded to login screen.

Because the admin user contains an `admin.login: true` reference he will be able to login to the secured page because that is one of the conditions defined in the page header. You are free to create any specific set of ACL rules you like.  Your user account must simply contain those same rules if you wish the user to have access.

## Create Private Areas

Enabling the setting "Use parent access rules" (`parent_acl` in login.yaml) allows you to create private areas where you set the access level on the parent page, and all the subpages inherit that requirement.

# Login Page

>> Note: the **frontend site** and **admin plugin** use different sessions so you need to explicitly provide a login on the frontend.

The login plugin can **automatically generate** a login page for you when you try to access a page that your user (or guest account) does not have access to.

Alternatively, you can also provide a specific login route if you wish to forward users to a specific login page. To do this you need to create a copy of the `login.yaml` from the plugin in your `user/config/plugins` folder and provide a specific route (or just edit the plugin setttings in the admin plugin).

```
route: /user-login
```

You would then need to provide a suitable login form, probably based on the one that is provided with the plugin.

## Redirection after Login

By default Grav will redirect to the prior page visited before entering the login process.  Any page is fair game unless you manually set:

```
login_redirect_here: false
```

In the page's header.  If you set this value to `false`, this page will not be a valid redirect page, and the page visited prior to this page will be considered.

You can override this default behavior by forcing a standard location by specifying an explicit option in your Login configuration YAML:

```
redirect_after_login: '/profile'
```

This will always take you to the `/profile` route after a successful login.

# Logout

The login plugin comes with a simple Twig partial to provide a logout link (`login-status.html.twig`).  You will need to include it in your theme however.  An example of this can be found in the Antimatter theme's `partials/navigation.html.twig` file:

```
{% if config.plugins.login.enabled and grav.user.username %}
    <li><i class="fa fa-lock"></i> {% include 'partials/login-status.html.twig' %}</li>
{% endif %}
```

You can also copy this `login-status.html.twig` file into your theme and modify it as you see fit.

# Allow User Registration

The Login plugin handles user registration.
To enable the built-in registration form, in the Login Plugin configuration enable user registration and just add a value to the "Registration path" field.

Then just open your browser on that page, and you'll be presented a registration form.

## Adding the registration page to the menu

Here are two ways you can do it, but of course Grav is flexible and you can come up with other ways too.

The first and easiest way is to add a page with the same slug (route) as the registration form. So for example if in the Login Plugin settings you set /register as the registration form path, then create a `04.register` page (the 04 number is just an example, use your own ordering), with no content.
The Login plugin will "override" that page, serving the registration page form when the user clicks on that menu item.

A second way is to add a custom menu item that points to the registration page, by editing `site.yaml` with this code, that will append a "Register" menu item:

```
menu:
  -
    url: 'register'
    text: Register
```

This works in most themes, Antimatter included, but it's not guaranteed to work in all themes, as it's something that must be added to the navigation twig code.

## Customizing the registration form

The provided registration form is just a quick way to start using it. You might however need different fields on the registration form, or you want to add more content. Here's how to do it.

First, create a registration form page.

Create a folder `04.registration/form.md`. The folder name is just an example. Pick the one that suits you. The important part is the file name: since we're building a form, we need a `form.md` file.

Also, your theme needs to implement forms. Use Antimatter or another form-compatible theme if yours does not work, then once you're setup with the form you can migrate the forms files and make it work on your theme too.

Add the following content to your registration form page:

```yaml
---
form:

  fields:
    fullname:
      type: text
      validate:
        required: true

    username:
      type: text
      validate:
        required: true
        message: PLUGIN_LOGIN.USERNAME_NOT_VALID
        config-pattern@: system.username_regex

    email:
      type: email
      validate:
        required: true
        message: PLUGIN_LOGIN.EMAIL_VALIDATION_MESSAGE

    password1:
      type: password
      label: Enter a password
      validate:
        required: true
        message: PLUGIN_LOGIN.PASSWORD_VALIDATION_MESSAGE
        config-pattern@: system.pwd_regex

    password2:
      type: password
      label: Enter the password again
      validate:
        required: true
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
      register_user: true
      message: "Thanks for registering..."
      reset: true      
---
```

# Registration of Users

Create a new user account by entering all the required fields below:

This is a normal form. The only thing different from a contact form or another form that you might write on your site is the process field `register_user`, which takes care of processing the user registration.

Once the user is registered, Grav redirects the user to the `display` page with the `message` message.

The only field strictly required by Grav is `username`. Then the other fields can be added as needed.

For example in this case we added

- password1
- password2

to the form. And, in the Login plugin configuration we have by default enable the double password verification with the "Validate double entered password" option. What this does is picking the password1 and password2 fields, validate them, check they are equal and put the content in the `password` field.

You can avoid having 2 fields for the password, which by the way is a recommended option, and just put a single `password` field.

Last important thing before the registration is correctly setup: make sure in the Login plugin settings you have the user registration enabled, otherwise the registration will trigger an error, as by default user registration is DISABLED.


# Registration Options

There are several options that can be configured when registering users via `user/plugins/login.yaml`, they are pretty self-explanatory:

```yaml
user_registration:
  enabled: false                            # Enable User Registration Process

  fields:                                   # List of fields to validate and store during user registration
    - 'username'                            # This should match up with your registration form definition
    - 'password'
    - 'email'
    - 'fullname'
    - 'title'
    - 'level'

  default_values:                           # Any default values for fields you would like to set
    level: Newbie                           # Here the 'level' field will be pre-populated with 'Newbie' text

  access:                                   # Default access to set for users created during registration     
    site:
      login: 'true'

  redirect_after_registration: ''           # Route to redirect to after registration

  options:
    validate_password1_and_password2: true  # Ensure that password1 and password2 match during registration (allows you to have just 1 pw field or 2)
    set_user_disabled: false                # Set this `true` if you want a user to activate their account via email
    login_after_registration: false         # Automatically login after registration
    send_activation_email: false            # Send an email that requires a special link to be clicked in order to activate the account
    send_notification_email: false          # Send an email to the site administrator to indicate a user has registered
    send_welcome_email: false               # Send a welcome email to the user (probably should not be used with `send_activation_email`
```

## Sending an activation email

By default the registration process adds a new user, and sets it as enabled.
Grav allows disabled user accounts, so we can take advantage of this functionality and add a new user, but with a disabled state. Then we can send an email to the user, asking to validate the email address.

That validation email will contain a link to set the user account to enabled. To do this, just enable "Set the user as disabled" and "Send activation email" in the Login Plugin options.

## Send a welcome email

Enable "Send welcome email" in the options.

The content of the welcome email is defined in the language file, strings `PLUGIN_LOGIN.WELCOME_EMAIL_SUBJECT` and `PLUGIN_LOGIN.WELCOME_EMAIL_BODY`. Customize them as needed in your language file override.

Note: if the activation email is enabled, the welcome email to be sent upon the account activation action (when the user clicks the link to activate the account)

## Send a notification email to the site owner

Enable "Send notification email" in the options.

The content of the notification email is defined in the language file, strings `PLUGIN_LOGIN.NOTIFICATION_EMAIL_SUBJECT` and `PLUGIN_LOGIN.NOTIFICATION_EMAIL_BODY`. Customize them as needed in your language file override.

Note: if the activation email is enabled, the notification email to be sent upon the account activation action (when the user clicks the link to activate the account)

## Default Access

To control what access your users have upon registering you can edit the `user_registration.access:` attribute in the `user/plugins/login.yaml`.  The default is simply `site.login: true`:

```
user_registration:
  access:
    site:
      login: 'true'
```

## Adding your own fields

If you want to add your own custom fields to the registration form, just add fields to the form like you would with any other form.

Then, to let the Login plugin add those fields to the user yaml file, you also need to add it to the "Registration fields" option in the Login Plugin configuration.

By default we have

```
user_registration:
  fields:
    - 'username'
    - 'password'
    - 'email'
    - 'fullname'
    - 'title'
```

Add your own as you prefer, to build any custom registration form you can think of.

## Specifying a default value for a field

If you want to pre-fill a field, without showing it to the user in the form, you could set it as an hidden field. But the user could see it - and modify it via the browser dev tools.

To add a field and make sure the user cannot modify it, add it to "default_values" list:

```
user_registration:
    default_values:
        title: "Newbie User"
```

## Login users directly after the registration

Just enable "Login the user after registration"

If the user activation email is enabled, the user will be logged in as soon as the activation link is clicked.

## Add captcha to the user registration

Add a captcha like you would with any form:

Add

```
        - name: g-recaptcha-response
          label: Captcha
          type: captcha
          recaptcha_site_key: aeio43kdk3idko3k4ikd4
          recaptcha_not_validated: 'Captcha not valid!'
          validate:
            required: true
```

to the form field, and

```
process:
  - captcha
```

to validate it server-side. Put this process action before all the other actions, so it's processed first and the user is not created if the captcha is not valid.

## Redirect to another page after login

You can set the "Redirect after registration" option in the Login plugin, or as with any form, use the `process.display` property, and set it to the destination page route:

```
  process:
     -
       display: /welcome
```



# Known issues

When updating from an older version, pre-october 2015, you might have an error `Class 'Grav\Login\Controller' Not Found`. The problem is during the update, since a file name was changed from lowercase to capitalized. Solution: reinstall the Login plugin, or change the file name `user/plugins/login/classes/controller.php` to `user/plugins/login/classes/Controller.php` (notice the capital `C`).

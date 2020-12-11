---
$title: CORS in AMP for Email
description: 'Ensure you set the correct HTTP headers on your server-side'
formats:
    - email
author: fstanis
---

Cross-Origin Resource Sharing (CORS) is a mechanism that uses HTTP headers to tell browsers which origins are allowed access to a resource using XHR. AMP for Email extends this mechanism by adding HTTP headers that similarly tell email clients which senders are allowed access to these resources.

There are currently two versions of this mechanism. For the time being, it's recommended to support both on your server-side.

# Version 2

When an email makes a request via `amp-form`, `amp-list` or any other XHR-based mechanism, the email client includes the following HTTP header:

*   `AMP-Email-Sender`, set to the email address of the sender of the email.

It expects that the HTTP response contains the following header in return:

*   `AMP-Email-Allow-Sender` with either the same value as `AMP-Email-Sender` in the request, or `*` indicating all sender emails are allowed.

## Example

A user opens an email from `sender@company.example` in their email client by going to `https://emailclient.example/myinbox`. The email uses AMP for Email and loads data using an `amp-list` from `https://company.example/data.json`.

The email client sends an HTTP request to `https://company.example/data.json` with the following headers set:

```
AMP-Email-Sender: sender@company.example
```

The email client expects that the HTTP response contains the following headers:

```
AMP-Email-Allow-Sender: sender@company.example
```

Alternatively, using `*` in either header is allowed (but not recommended).

# Version 1 (deprecated)

In version 1, the email client uses a query string parameter instead of an HTTP header to indicate the sender email. It also provides an `Origin` header and requires the `Access-Control-Allow-Origin` header in response, like CORS on websites.

When an email makes a request via `amp-form`, `amp-list` or any other XHR-based mechanism, the email client includes the following HTTP header:

*   `Origin` with the value of the origin of the page used to display the email.

The URL also always has a query string with the `__amp_source_origin` parameter set to the email address of the sender of the email.

It expects that the HTTP response contains the following headers:

*   `Access-Control-Allow-Origin` with the same value as `Origin` in the request
*   `AMP-Access-Control-Allow-Source-Origin` with the same value as the `__amp_source_origin` query string parameter in the request.
*   `Access-Control-Expose-Headers` set to `AMP-Access-Control-Allow-Source-Origin`

### Example

A user opens an email from `sender@company.example` in their email client by going to `https://emailclient.example/myinbox`. The email uses AMP for Email and loads data using an `amp-list` from `https://company.example/data.json`.

The email client sends an HTTP request to `https://company.example/data.json?__amp_source_origin=sender@company.example` (notice the added query string) with the following header set:

```
Origin: https://emailclient.example
```

The email client expects that the HTTP response contains the following headers:

```
Access-Control-Allow-Origin: https://emailclient.example
AMP-Access-Control-Allow-Source-Origin: sender@company.example
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin
```

Note that this version does not support using `*` in the `AMP-Access-Control-Allow-Source-Origin` header.

# Implementing CORS

These are the recommended steps to take on the server-side to implement CORS that supports both version 1 and 2:

When you receive an HTTP request, check if the `Origin` and `AMP-Email-Sender` HTTP headers are set.

1. If the `AMP-Email-Sender` header is set:
    1. Let _senderEmail_ be the value of the `AMP-Email-Sender` header.
    2. Check if _senderEmail_ is an email address owned by you or one that you trust. If not, reject the request.
    3. Set the response header `AMP-Email-Allow-Sender` to _senderEmail_.
2. If the `Origin` header is set, but `AMP-Email-Sender` is not set:
    4. Let _requestOrigin_ be the value of the `Origin` header.
    5. Set the response header `Access-Control-Allow-Origin` to _requestOrigin_.
    6. Check if the URL contains the `__amp_source_origin` query string parameter. If not reject the request.
    7. Let _senderEmail_ be the value of the `__amp_source_origin` query string parameter.
    8. Check if _senderEmail_ is an email address owned by you or one that you trust. If not, reject the request.
    9. Set the response header `AMP-Access-Control-Allow-Source-Origin` to _senderEmail_.
    10. Set the response header `Access-Control-Expose-Headers` to `AMP-Access-Control-Allow-Source-Origin`.
3. If neither `Origin` nor `AMP-Email-Sender` are set, reject the request.

## Example 1

### Request sent by email client

```
GET /data.json?__amp_source_origin=sender@company.example HTTP/1.1
Host: company.example
Origin: https://emailclient.example
User-Agent: EmailClientProxy
Accept: application/json
```

### Response headers expected

```
Access-Control-Allow-Origin: https://emailclient.example
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin
AMP-Access-Control-Allow-Source-Origin: sender@company.example
```

### Explanation

Because the `Origin` header was set, this request is using CORS version 1 and requires the three headers listed above to be set.

## Example 2

### Request sent by email client

```
GET /data.json HTTP/1.1
Host: company.example
AMP-Email-Sender: sender@company.example
User-Agent: EmailClientProxy
Accept: application/json
```

### Response headers expected

```
AMP-Email-Allow-Sender: sender@company.example
```

### Explanation

Because the `AMP-Email-Sender` header was set, this request is using CORS version 2 and only requires the `AMP-Email-Allow-Sender` header.

## Example 3

### Request sent by email client

```
GET /data.json?__amp_source_origin=sender@company.example HTTP/1.1
Host: company.example
Origin: https://emailclient.example
AMP-Email-Sender: sender@company.example
User-Agent: EmailClientProxy
Accept: application/json
```

### Response headers expected

```
AMP-Email-Allow-Sender: sender@company.example
```

### Explanation

Both `Origin` and `AMP-Email-Sender` are set, indicating that the client supports both versions. Because version 2 takes precedence, only the `AMP-Email-Allow-Sender` header is set and `Origin` and the value of `__amp_source_origin` can be safely ignored.

# Code examples

## PHP

```
if (isset($_SERVER['HTTP_AMP_EMAIL_SENDER'])) {
    $senderEmail = $_SERVER['HTTP_AMP_EMAIL_SENDER'];
    if (!isAllowedSender($senderEmail)) {
        die('invalid sender');
    }
    header("AMP-Email-Allow-Sender: $senderEmail");
} elseif (isset($_SERVER['HTTP_ORIGIN'])) {
    $requestOrigin = $_SERVER['HTTP_ORIGIN'];
    if (empty($_GET['__amp_source_origin'])) {
        die('invalid request');
    }
    $senderEmail = $_GET['__amp_source_origin'];
    if (!isAllowedSender($senderEmail)) {
        die('invalid sender');
    }
    header("Access-Control-Allow-Origin: $requestOrigin");
    header('Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin');
    header("AMP-Access-Control-Allow-Source-Origin: $senderEmail");
} else {
    die('invalid request');
}
```

## Python (Django)

```
response = JsonResponse(...)
if request.META.HTTP_AMP_EMAIL_SENDER:
    senderEmail = request.META.HTTP_AMP_EMAIL_SENDER
    if not isAllowedSender(senderEmail):
        raise PermissionDenied
    response['AMP-Email-Allow-Sender'] = senderEmail
elif request.META.HTTP_ORIGIN:
    requestOrigin = request.META.HTTP_ORIGIN
    senderEmail = request.GET.get('__amp_source_origin')
    if not isAllowedSender(senderEmail):
        raise PermissionDenied
    response['Access-Control-Allow-Origin'] = requestOrigin
    response['Access-Control-Expose-Headers'] = 'AMP-Access-Control-Allow-Source-Origin'
    response['AMP-Access-Control-Allow-Source-Origin'] = senderEmail
else
    raise PermissionDenied
```
## SSJS

```
<script runat="server" language="JavaScript">

Platform.Load("core", "1");

if (Platform.Request.GetRequestHeader("AMP-Email-Sender")) {
  var senderEmail = Platform.Request.GetRequestHeader("AMP-Email-Sender")
  if (isValidSender(senderEmail)) {
    HTTPHeader.SetValue("AMP-Email-Allow-Sender", senderEmail)
  } else {
    Platform.Function.RaiseError("Sender Not Allowed",true,"statusCode","3");
  }
} else if (Platform.Request.GetRequestHeader("Origin")) {
  var requestOrigin = Platform.Request.GetRequestHeader("Origin")

  if (Platform.Request.GetQueryStringParameter("__amp_source_origin")) {
    var senderEmail = Platform.Request.GetQueryStringParameter("__amp_source_origin");

    if (isValidSender(senderEmail)) {
      HTTPHeader.SetValue("Access-Control-Allow-Origin", requestOrigin);
      HTTPHeader.SetValue("Access-Control-Expose-Headers", "AMP-Access-Control-Allow-Source-Origin");
      HTTPHeader.SetValue("AMP-Access-Control-Allow-Source-Origin", senderEmail);
    } else {
      Platform.Function.RaiseError("Invalid Source Origin",true,"statusCode","3");
    }

  } else {
    Platform.Function.RaiseError("Source Origin Not Present",true,"statusCode","3");
  }
} else {
  Platform.Function.RaiseError("Origin and Sender Not Present",true,"statusCode","3");
}
</script>
```
Visit [Salesforce Developer Documentation](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-programmatic-content.meta/mc-programmatic-content/ssjs_serverSideJavaScript.htm) to learn more about SSJS.

## Node.js

Use the officially supported [@ampproject/toolbox-cors npm package](https://www.npmjs.com/package/@ampproject/toolbox-cors).

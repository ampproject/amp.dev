---
$title: Disable tap delay
$order: 50
tags:
  - fid
---
Set viewport width to match the device width to disable touch delay, which 
can increase FID. To remove this 300-350ms tap delay, change the viewport 
declaration in the `<head>` of your page to: `<meta name="viewport" content="width=device-width">`.
<br><br>
This sets the viewport width to the same as the device, and is generally a 
best-practice for mobile-optimized sites. You can
[read more about disabling the tap delay on web.dev](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away).
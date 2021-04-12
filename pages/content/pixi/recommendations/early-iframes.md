---
$title: Improve FID and LCP by moving iframes below the initial viewport
$order: 40
tags:
  - fid
  - cls
---

Loading an iframe can slow down your enire page. You can avoid this by
leveraging AMP's automatic iframe lazy loading. All you need to do is make
sure that there are no iframes in the initial viewport of your user's devices.
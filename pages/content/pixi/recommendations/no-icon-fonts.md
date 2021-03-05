---
$title: Don't use icon fonts
$order: 200
tags:
  - cls
  - lcp
---
Icon fonts have a negative impact on CLS, causing layout shift as they load in (unless blocked from loading). Document authors are unaware of the impact since it rarely appears on high-speed connections.

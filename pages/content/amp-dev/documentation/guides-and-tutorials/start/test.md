---
$title: Format test
$order: 0
description: 'Learn what makes AMP emails different by creating your first email.'
tutorial: true
formats:
  - email
author: CrystalOnScript
---


[tip type="note"]
For performance and to avoid the risk of unexpected content jumping, amp-bind does not evaluate expressions on page load. This means that the visual elements should be given a default state and not rely amp-bind for initial render.
[/tip]

[filter formats="websites"]
This is only showing for format websites.
[/filter]

[filter formats="stories"]
This is only showing for format stories.
[/filter]

[filter formats="websites, stories, email"]
This should show for all formats except ads.
[/filter]

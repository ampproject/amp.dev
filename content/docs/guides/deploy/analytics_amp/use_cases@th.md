---
$title: การนำไปใช้งาน
toc: true
---
[TOC]


คู่มือนี้จะให้ข้อมูลเกี่ยวกับการนำไปใช้งานทั่วไปของการติดตามการมีส่วนร่วมของผู้ใช้

หากต้องการเพิ่มวิธีการนำไปใช้งาน
[โปรดแจ้งให้เราทราบ](https://github.com/ampproject/docs/issues/new)

คุณสามารถแนะนำวิธีการนำไปใช้งานของคุณเองได้อีกด้วย
ดูเกี่ยวกับ[วิธีการมีส่วนร่วม](https://www.ampproject.org/docs/support/contribute.html)

## การติดตามการเข้าชมหน้าเว็บ

เรียนรู้วิธีการติดตามการเข้าชมหน้าเว็บโดยใช้ `amp-pixel` และ `amp-analytics`

### การใช้ amp-pixel

ส่งข้อมูลการเข้าชมหน้าเว็บไปยัง URL ที่ระบุโดยใช้
[amp-pixel](/docs/reference/amp-pixel.html)

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
[/sourcecode]

### การใช้ amp-analytics - ไม่มีผู้ให้บริการ

ส่งข้อมูลการเข้าชมหน้าเว็บไปยัง URL ที่ระบุโดยใช้
[amp-analytics](/docs/reference/extended/amp-analytics.html)

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

### การใช้ amp-analytics - googleanalytics

ส่งข้อมูลการเข้าชมหน้าเว็บไปยัง Google Analytics
(ดูเพิ่มเติมเกี่ยวกับ[การติดตามหน้าเว็บใน Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking))

[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  },
  "triggers": {
    "trackPageview": {  // Trigger names can be any string. trackPageview is not a required name.
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

## การติดตามการคลิกบนหน้าเว็บ

เรียนรู้วิธีการติดตามการคลิกบนหน้าเว็บโดยใช้
[amp-analytics](/docs/reference/extended/amp-analytics.html)
ส่งข้อมูลการดำเนินการไปยัง URL ที่ระบุ และ
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)

### การส่งข้อมูลไปยัง URL ที่ระบุ

ตัวอย่างต่อไปนี้ใช้แอททริบิวต์ `selector` ในการส่งการดำเนินการ `click`
ไปยัง URL ที่ระบุทุกครั้งที่ผู้ใช้คลิกที่ลิงก์ (`<a href>`)

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

### การส่งข้อมูลไปยัง Google Analytics

ตัวอย่างต่อไปนี้ใช้แอททริบิวต์ `selector` ของ `trigger`
ในการส่งการดำเนินการ `click` ไปยัง Google Analytics เมื่อมีการคลิกอิลิเมนต์ที่ระบุ
(ดูเพิ่มเติมเกี่ยวกับ[การติดตามการดำเนินการบน AMP ใน Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking))


[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics3">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  },
  "triggers": {
    "trackClickOnHeader" : {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "ui-components",
        "eventAction": "header-click"
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

## การติดตามการเลื่อนดูข้อมูล

ติดตามการเลื่อนดูหน้าเว็บโดยใช้ [amp-analytics](/docs/reference/extended/amp-analytics.html)
ตัวอย่างต่อไปนี้ใช้แอททริบิวต์ `scrollspec` ในการส่งการดำเนินการ `scroll`
ไปยัง URL ที่ระบุเมื่อมีการเลื่อนดูหน้าเว็บในแนวตั้ง 25%, 50% และ 90%
นอกจากนี้การดำเนินการจะเริ่มต้นเมื่อมีการเลื่อนดูหน้าเว็บในแนวนอน
90% ของความกว้างของ `scroll` อีกด้วย

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "scrollPings": {
      "on": "scroll",
      "scrollSpec": {
        "verticalBoundaries": [25, 50, 90],
        "horizontalBoundaries": [90]
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

## การติดตามการมีส่วนร่วมในเครือข่ายสังคม

เรียนรู้วิธีการติดตามการมีส่วนร่วมในเครือข่ายสังคมโดยใช้
[amp-analytics](/docs/reference/extended/amp-analytics.html)
ส่งข้อมูลการดำเนินการไปยัง URL ที่ระบุ และ
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)

### การส่งข้อมูลไปยัง URL ที่ระบุ

ตัวอย่างต่อไปนี้ใช้แอททริบิวต์ `selector` ในการส่งการดำเนินการ `click`
ไปยัง URL ที่ระบุทุกครั้งที่ผู้ใช้คลิกบน Tweet (`#tweet-link`)

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "trackClickOnTwitterLink": {
      "on": "click",
      "selector": "#tweet-link",
      "request": "event",
      "vars": {
        "eventId": "43",
        "eventLabel": "clicked on a tweet link"
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

### การส่งข้อมูลไปยัง Google Analytics

ตัวอย่างต่อไปนี้ใช้แอททริบิวต์ `selector` ของ `trigger`
ในการส่งการดำเนินการเมื่อมีการคลิกปุ่มเครือข่ายสังคมที่ระบุ
(ดูเพิ่มเติมเกี่ยวกับ[การติดตามการมีส่วนร่วมในเครือข่ายสังคมบน AMP ใน Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions))


[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics4">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y" // Replace with your property ID.
  },
  "triggers": {
    "trackClickOnTwitterLink" : {
      "on": "click",
      "selector": "#tweet-link",
      "request": "social",
      "vars": {
          "socialNetwork": "twitter",
          "socialAction": "tweet",
          "socialTarget": "https://www.examplepetstore.com"
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

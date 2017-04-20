---
$title: ข้อมูลเชิงลึกเกี่ยวกับ AMP Analytics
toc: true
---
[TOC]


คู่มือนี้จะให้ข้อมูลเชิงลึกเกี่ยวกับ[คอมโพเนนต์ amp-analytics](/docs/reference/extended/amp-analytics.html)
พร้อมยกตัวอย่างการกำหนดค่า `amp-analytics` สำหรับการใช้งานต่างๆ ดังต่อไปนี้

เนื้อหาส่วนที่เหลือในคู่มือนี้จะใช้ตัวอย่างการกำหนดค่านี้
ซึ่งจะติดตามการเข้าชมหน้าเว็บและการคลิกลิงก์ของผู้ใช้
และส่งข้อมูลการวิเคราะห์ให้กับผู้ให้บริการที่เป็นบุคคลที่สาม ซึ่งก็คือ
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)

[sourcecode:html]
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
[/sourcecode]

**หมายเหตุ:** ตัวอย่างโค้ดข้างต้นจะช่วยให้คุณเรียนรู้ แต่ไม่ได้เป็นตัวอย่างจริง หากคุณทำงานร่วมกับผู้ให้บริการวิเคราะห์ข้อมูล ตัวอย่างข้างต้นจะนำไปใช้ไม่ได้ การกำหนดค่าของผู้ให้บริการจะช่วยลดความยุ่งยากซับซ้อน โปรดดูตัวอย่างการกำหนดค่าในเอกสารประกอบของผู้ให้บริการวิเคราะห์ข้อมูล

## ข้อมูลการวิเคราะห์จะถูกส่งไปที่ใด: แอททริบิวต์ type

AMP ได้รับการออกแบบมาให้สนับสนุนการรวบรวมข้อมูลในสองรูปแบบ

* การส่งไปยังตำแหน่งปลายทางของผู้เผยแพร่ที่มีระบบการวิเคราะห์ข้อมูลของตนเอง
* การส่งไปยังตำแหน่งปลายทางของผู้ให้บริการสำหรับการทำงานร่วมกับโซลูชันของผู้ให้บริการ
(เช่น [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/))

หากต้องการส่งข้อมูลการวิเคราะห์ไปยังผู้ให้บริการ
ให้ใส่แอททริบิวต์ `type` ในแท็ก `amp-analytics` แล้วตั้งค่าเป็นผู้ให้บริการที่เหมาะสมตามที่ระบุไว้ใน[ข้อกำหนดในการใช้ amp-analytics](/docs/reference/extended/amp-analytics.html)



ตัวอย่างเช่น `<amp-analytics type="googleanalytics">` จะส่งข้อมูลการวิเคราะห์ไปยังผู้ให้บริการวิเคราะห์ข้อมูลที่เป็นบุคคลที่สาม ซึ่งก็คือ
Google Analytics
หากต้องการส่งข้อมูลไปยังตำแหน่งปลายทางของผู้เผยแพร่
อย่าใส่แอททริบิวต์ `type`
ข้อมูลการวิเคราะห์จะถูกส่งไปยังปลายทางที่ระบุสำหรับ[คำขอ](/th/docs/guides/analytics/deep_dive_analytics.html#ข้อมูลใดที่จะถูกส่ง:-แอททริบิวต์-requests)แต่ละรายการ


การกำหนดค่า Analytics ของผู้ให้บริการคือวิธีการที่รวดเร็วในการเริ่มต้นใช้งาน
`amp-analytics`
คุณควรดูเอกสารประกอบของผู้ให้บริการ
และแหล่งข้อมูลความช่วยเหลือต่างๆ สำหรับคำแนะนำเพิ่มเติม
ดังที่ได้กล่าวมาแล้ว
คุณสามารถดูรายชื่อผู้ให้บริการที่มีการรวมการทำงานกับ
AMP รวมถึงลิงก์ไปยังเอกสารประกอบที่เฉพาะเจาะจงได้ใน[ข้อกำหนดในการใช้ amp-analytics](/docs/reference/extended/amp-analytics.html)


หากคุณเป็นผู้ให้บริการวิเคราะห์ข้อมูล
เรียนรู้เพิ่มเติมเกี่ยวกับ[การรวมการกำหนดค่าการวิเคราะห์ข้อมูลของคุณใน AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md)


## โหลดการกำหนดค่าจากระยะไกล: แอททริบิวต์ config

คุณไม่จำเป็นต้องใส่การกำหนดค่าทั้งหมดสำหรับ
`amp-analytics` ไว้ในหน้า AMP
เนื่องจากคุณสามารถเรียกการกำหนดค่าทั้งหมดหรือบางส่วนจาก URL
ระยะไกลแทน

ซึ่งช่วยให้คุณสามารถทำการกำหนดค่าที่แตกต่างกันตามคำขอที่เฉพาะเจาะจงได้

หากคุณเป็นผู้เผยแพร่ซึ่งสามารถควบคุมไฟล์ระยะไกลได้
คุณจะสามารถทำการประมวลผลใดๆ ที่จำเป็นทางฝั่งเซิร์ฟเวอร์เพื่อสร้างข้อมูลการกำหนดค่าได้


ขั้นตอนแรกในการโหลดการกำหนดค่าระยะไกลคือการใส่แอททริบิวต์ config ไว้ในแท็ก `amp-analytics` ดังนี้


[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

สิ่งที่ต้องดำเนินการต่อไปคือการสร้างข้อมูล JSON ที่อยู่ใน URL ระยะไกล
ในตัวอย่างง่ายๆ นี้
การกำหนดค่าที่อยู่ในออบเจ็กต์ JSON เป็นเพียงค่าตัวแปรสำหรับบัญชีการวิเคราะห์ข้อมูล

ตัวอย่างข้อมูลใน `https://example.com/analytics.account.config.json`

[sourcecode:html]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

ขั้นตอนสุดท้ายคือการตรวจสอบว่ามีการดึงข้อมูลในไฟล์ระยะไกลเข้ามายังตำแหน่งที่เหมาะสมในการกำหนดค่า
`amp-analytics`
ทั้งคำขอ `pageview` และ `event` นี้
จะมีการตั้งค่าตัวแปร `account` เป็นค่าบัญชีใน
URL ระยะไกล (`"account": "UA-XXXXX-Y"`) โดยอัตโนมัติ

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

**ข้อมูลสำคัญ:** AMP ไม่มีการตรวจสอบการใช้ตัวแปรเดียวกันหลายครั้ง
ค่าจะแสดงตามลำดับการแทนค่าตัวแปร
ซึ่งค่าใน URL ระยะไกลจะอยู่ในลำดับที่สูงกว่า
(ดู[การจัดลำดับการแทนค่าตัวแปร](/th/docs/guides/analytics/deep_dive_analytics.html#การจัดลำดับการแทนค่าตัวแปร))

## requests, triggers และ transports

แอททริบิวต์ `requests` จะเป็นตัวกำหนด ‘ข้อมูลที่จะส่ง’
(ตัวอย่างเช่น `pageviews`, `events`)
และตำแหน่งที่ใช้ส่งข้อมูล (URL ที่ใช้ในการส่งข้อมูล)

แอททริบิวต์ `triggers` จะใช้ระบุว่าการส่งข้อมูลการวิเคราะห์จะเกิดขึ้นเมื่อใด
ตัวอย่างเช่น เมื่อผู้ใช้เข้าชมหน้าเว็บหรือคลิกลิงก์ เป็นต้น

แอททริบิวต์ `transport` จะระบุวิธีการส่งคำขอ
ซึ่งก็คือโปรโตคอลที่ใช้ส่งข้อมูล

โปรดอ่านรายละเอียดเพื่อเรียนรู้เพิ่มเติมเกี่ยวกับการกำหนดค่าเหล่านี้
(คุณยังสามารถอ่านข้อมูลเกี่ยวกับการกำหนดค่าเหล่านี้ได้ใน[ข้อมูลอ้างอิงเกี่ยวกับ amp-analytics](/docs/reference/extended/amp-analytics.html))


### ข้อมูลใดที่จะถูกส่ง: แอททริบิวต์ requests

`request-name` จะใช้ในการกำหนดค่าทริกเกอร์เพื่อระบุว่าจะส่งคำขอใด

โดย `request-value` จะเป็น `https` URL
ค่าเหล่านี้อาจมีโทเค็น Placeholder ที่สามารถอ้างอิงคำขอหรือตัวแปรอื่นๆ


[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

ผู้ให้บริการวิเคราะห์ข้อมูลบางราย (รวมถึง Google Analytics)
ได้จัดเตรียมการกำหนดค่าไว้แล้ว
ซึ่งคุณสามารถใช้ผ่านแอททริบิวต์ `type`
หากคุณใช้บริการของผู้ให้บริการวิเคราะห์ข้อมูล
คุณอาจไม่จำเป็นต้องใส่ข้อมูล `requests`
โปรดดูเอกสารประกอบของผู้ให้บริการว่าคุณจำเป็นต้องกำหนดค่า
`requests` หรือไม่ และต้องดำเนินการอย่างไร

#### การเพิ่มข้อมูลลงใน URL คำขอ: Extra URL Params

แอททริบิวต์ [extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
จะระบุพารามิเตอร์เพิ่มเติมที่จะเพิ่มลงในสตริงการสอบถามของ URL คำขอผ่านรูปแบบปกติของ "&foo=baz"

ตัวอย่างของ `amp-analytics` จะเพิ่มพารามิเตอร์ <code>cd1</code>
ลงในคำขอโดยตั้งค่าพารามิเตอร์เป็น "AMP" ดังนี้

[sourcecode:html]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### ข้อมูลจะถูกส่งเมื่อใด: แอททริบิวต์ triggers

แอททริบิวต์ `triggers` จะระบุเวลาส่งคำขอการวิเคราะห์ข้อมูล
ซึ่งประกอบด้วยคู่ key-value ของ trigger-name และ trigger-configuration
โดยชื่อทริกเกอร์จะใช้สตริงใดก็ได้ที่ประกอบด้วยตัวอักษรและตัวเลข
(a-zA-Z0-9)

ตัวอย่างเช่น
อิลิเมนต์ของ `amp-analytics` ต่อไปนี้ได้รับการกำหนดค่าให้ส่งคำขอไปยัง
`https://example.com/analytics` เมื่อมีการโหลดเอกสารครั้งแรก
และทุกครั้งที่มีการคลิกแท็ก `a`

[sourcecode:html]
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
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
[/sourcecode]

AMP สนับสนุนการกำหนดค่าทริกเกอร์ดังต่อไปนี้

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">การกำหนดค่าทริกเกอร์</th>
      <th data-th="Description">คำอธิบาย</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (ต้องมี)</td>
      <td data-th="Description">รอรับคำสั่ง ค่าที่ใช้ได้คือ <code>click</code>, <code>scroll</code>, <code>timer</code> และ <code>visible</code></td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (ต้องมี)</td>
      <td data-th="Description">ชื่อคำขอที่จะส่ง (ตามที่ระบุไว้ในคำขอ <a href="/th/docs/guides/analytics/deep_dive_analytics.html#ข้อมูลใดที่จะถูกส่ง:-แอททริบิวต์-requests"></a>)</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">ออบเจ็กต์ที่มีคู่ key-value ที่ใช้แทนค่า <code>vars</code> ที่ระบุไว้ในการกำหนดค่าระดับบนสุด หรือเพื่อระบุ <code>vars</code> ที่ไม่ซ้ำสำหรับทริกเกอร์นี้ (ดูเพิ่มเติมเกี่ยวกับ<a href="/th/docs/guides/analytics/deep_dive_analytics.html#การจัดลำดับการแทนค่าตัวแปร">การจัดลำดับการแทนค่าตัวแปร</a>)</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (ต้องมีเมื่อตั้งค่า <code>on</code> เป็น <code>click</code>)</td>
      <td data-th="Description">ตัวเลือก CSS ที่ใช้ในการกำหนดอิลิเมนต์ที่จะติดตาม ให้ใช้ค่า <code>*</code> ในการติดตามอิลิเมนต์ทั้งหมด การกำหนดค่านี้จะใช้ร่วมกับทริกเกอร์ <code>click</code> เรียนรู้วิธีการใช้ตัวเลือกในการ<a href="/th/docs/guides/analytics/use_cases.html#การติดตามการคลิกบนหน้าเว็บ">ติดตามการคลิกบนหน้าเว็บ</a> และ<a href="/th/docs/guides/analytics/use_cases.html#การติดตามการมีส่วนร่วมในเครือข่ายสังคม">การมีส่วนร่วมในเครือข่ายสังคม</a></td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (ต้องมีเมื่อตั้งค่า <code>on</code> เป็น <code>scroll</code>)</td>
      <td data-th="Description">ควบคุมว่าการดำเนินการใดบนหน้าจะถือว่าเป็นการเลื่อนดูข้อมูล ซึ่งจะทำให้ <code>scroll</code> ทำงาน ออบเจ็กต์นี้สามารถมี <code>verticalBoundaries</code> และ <code>horizontalBoundaries</code> โดยจะต้องมีหนึ่งในสองคุณสมบัตินี้ <code>scroll</code> จึงจะทำงาน ค่าของคุณสมบัติทั้งสองจะต้องเป็นชุดตัวเลขที่อยู่ในขอบเขตที่มีการสร้างการเลื่อนดูข้อมูล โปรดดูตัวอย่างนี้ได้ใน<a href="/th/docs/guides/analytics/use_cases.html#การติดตามการเลื่อนดูข้อมูล">การติดตามการเลื่อนดูข้อมูล</a></td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (ต้องมีเมื่อตั้งค่า <code>on</code> เป็น <code>timer</code>)</td>
      <td data-th="Description">ควบคุมว่า <code>timer</code> จะทำงานเมื่อใด โดยตัวตั้งเวลาจะทริกเกอร์ในทันที และเป็นระยะๆ ตามช่วงเวลาที่ระบุ การกำหนดค่านี้จะใช้ร่วมกับทริกเกอร์ <code>timer</code></td>
    </tr>
  </tbody>
</table>

**ข้อมูลสำคัญ:** ทริกเกอร์จากการกำหนดค่าที่อยู่ในลำดับต่ำกว่าจะถูกแทนที่โดยทริกเกอร์ที่มีชื่อเดียวกันจากการกำหนดค่าที่อยู่ในลำดับสูงกว่า
(ดู[การจัดลำดับการแทนค่าตัวแปร](/th/docs/guides/analytics/deep_dive_analytics.html#การจัดลำดับการแทนค่าตัวแปร))


### ข้อมูลจะถูกส่งอย่างไร: แอททริบิวต์ transport

แอททริบิวต์ `transport` จะระบุวิธีการส่งคำขอ
โดยค่าเริ่มต้นจะเปิดใช้งานสามวิธีต่อไปนี้

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">วิธีการส่งข้อมูล</th>
      <th data-th="Description">คำอธิบาย</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">ระบุว่าสามารถใช้ <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> ในการส่งคำขอ ซึ่งจะส่งคำขอ <code>POST</code> พร้อมด้วยข้อมูลประจำตัว และเนื้อความว่างเปล่า</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">ระบุว่าสามารถใช้ <code>XMLHttpRequest</code> ในการส่งคำขอ ซึ่งจะส่งคำขอ <code>POST</code> พร้อมด้วยข้อมูลประจำตัว และเนื้อความว่างเปล่า</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">ระบุว่าสามารถส่งคำขอโดยการสร้างแท็ก <code>Image</code> ซึ่งจะส่งคำขอ <code>GET</code></td>
    </tr>
  </tbody>
</table>

โดยสามารถใช้ได้เพียงวิธีเดียว
และเป็นวิธีที่อยู่ในลำดับสูงสุด
และมีการเปิดใช้งาน ได้รับอนุญาต และพร้อมใช้งาน
ตามลำดับดังต่อไปนี้ `beacon` > `xhrpost` > `image`
หาก User Agent ของไคลเอ็นต์ไม่สนับสนุนวิธีใด
วิธีที่อยู่ในลำดับถัดไปซึ่งมีการเปิดใช้งานไว้จะถูกนำมาใช้

ให้ใส่แอททริบิวต์ `transport` ไว้ในการกำหนดค่าของคุณเฉพาะเมื่อคุณต้องการจำกัดตัวเลือกการส่งเท่านั้น
ไม่เช่นนั้น คุณอาจหยุดการส่งคำขอโดยไม่ตั้งใจ


ในตัวอย่างด้านล่าง
`beacon` และ `xhrpost` ถูกตั้งค่าเป็น False
ดังนั้น จะไม่มีการใช้วิธีดังกล่าวแม้ว่าจะอยู่ในลำดับที่สูงกว่า `image`
หาก User Agent ของไคลเอ็นต์สนับสนุนวิธีส่งแบบ`image`
ก็จะมีการนำไปใช้ ไม่เช่นนั้นจะไม่มีการส่งคำขอใดๆ

[sourcecode:html]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## การจัดลำดับการแทนค่าตัวแปร

AMP จะแสดงตัวแปรพร้อมค่าตามลำดับดังต่อไปนี้

1. การกำหนดค่าจากระยะไกล (ผ่าน `config`)
2. `vars` ที่อยู่ภายในทริกเกอร์ของ `triggers`
3. `vars` ที่อยู่ภายใน `amp-analytics` ในระดับบนสุด
4. ค่าที่กำหนดโดยแพลตฟอร์ม

ในตัวอย่างนี้ เรามีการกำหนดค่าจากระยะไกล
ตัวแปรที่ระบุไว้ในระดับบนสุด ในทริกเกอร์ และในระดับแพลตฟอร์มดังนี้

[sourcecode:html]
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
[/sourcecode]

เมื่อมีการระบุ `var` เดียวกันไว้ในหลายจุด
จะมีการตั้งค่าลำดับของตัวแปรเพียงครั้งเดียว
ดังนั้น หากการกำหนดค่าจากระยะไกลระบุ `account` เป็น UA-XXXXX-Y ในตัวอย่างข้างต้น
ค่าของ vars ในจุดต่างๆ จะเป็นดังนี้

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">ค่า</th>
      <th data-th="Defined By" class="col-thirty">กำหนดโดย</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">แพลตฟอร์ม</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">ทริกเกอร์</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">การกำหนดค่าจากระยะไกล</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">ทริกเกอร์</td>
    </tr>
  </tbody>
</table>

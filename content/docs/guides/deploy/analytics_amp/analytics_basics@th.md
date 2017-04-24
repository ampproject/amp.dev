---
$title: "Analytics: ข้อมูลเบื้องต้น"
toc: true
---

เริ่มต้นที่นี่เพื่อเรียนรู้ข้อมูลเบื้องต้นเกี่ยวกับการวิเคราะห์ AMP

[TOC]

## ควรใช้ amp-pixel หรือ amp-analytics

AMP มีคอมโพเนนต์สองส่วนที่จะช่วยตอบสนองความต้องการด้านการวิเคราะห์และการวัดผลของคุณ ซึ่งได้แก่
[amp-pixel](/docs/reference/amp-pixel.html) และ
[amp-analytics](/docs/reference/extended/amp-analytics.html)
โดยทั้งสองตัวเลือกจะส่งข้อมูลการวิเคราะห์ไปยังปลายทางที่ระบุไว้

หากคุณกำลังมองหาลักษณะการทำงาน เช่น
[พิกเซลการติดตาม](https://en.wikipedia.org/wiki/Web_beacon#Implementation)ในรูปแบบง่ายๆ
คอมโพเนนต์ `amp-pixel` สามารถติดตามการเข้าชมหน้าเว็บแบบพื้นฐาน
และส่งข้อมูลการเข้าชมหน้าเว็บดังกล่าวไปยัง URL ที่ระบุ
การทำงานร่วมกับผู้ให้บริการบางรายอาจมีการเรียกใช้คอมโพเนนต์นี้
โดยไม่ว่ากรณีใด จะมีการระบุปลายทาง URL ที่แน่นอน

สำหรับโซลูชันการวิเคราะห์โดยส่วนใหญ่จะใช้ `amp-analytics`
โดยการติดตามการเข้าชมหน้าเว็บยังใช้ `amp-analytics` ได้อีกด้วย
นอกจากนี้คุณยังสามารถติดตามการมีส่วนร่วมของผู้ใช้ต่อเนื้อหาประเภทต่างๆ บนหน้าเว็บ
ซึ่งรวมถึงการคลิกลิงก์และปุ่มต่างๆ
และคุณยังสามารถตรวจสอบได้ว่าผู้ใช้เลื่อนดูเนื้อหาบนหน้าเว็บไปถึงรายการใด
ผู้ใช้มีส่วนร่วมในสื่อสังคมหรือไม่ และอื่นๆ
(ดู[ข้อมูลเจาะลึกเกี่ยวกับ AMP Analytics](/th/docs/guides/analytics/deep_dive_analytics.html))


ในส่วนของการทำงานร่วมกับแพลตฟอร์ม AMP
ผู้ให้บริการบางรายยังมีการเตรียมการกำหนดค่า `amp-analytics` ไว้ล่วงหน้า
เพื่อช่วยในการรวบรวมข้อมูลและส่งไปยังเครื่องมือการติดตามของตนได้ง่าย
โปรดดูเอกสารประกอบของผู้ให้บริการเกี่ยวกับ[ข้อกำหนดในการใช้ amp-analytics](/docs/reference/extended/amp-analytics.html)


คุณสามารถใช้ทั้ง `amp-pixel` และ `amp-analytics` ในหน้าเว็บของคุณ
โดยใช้ `amp-pixel` สำหรับการติดตามการเข้าชมหน้าเว็บแบบง่ายๆ
และใช้ `amp-analytics` สำหรับการติดตามเรื่องอื่นๆ
นอกจากนี้คุณยังสามารถเพิ่มแท็กแต่ละอย่างได้หลายรายการ
หากคุณทำงานร่วมกับผู้ให้บริการวิเคราะห์ข้อมูลหลายราย
คุณจะต้องใช้หนึ่งแท็กต่อหนึ่งโซลูชัน
อย่าลืมว่าหน้าเว็บแบบ AMP ที่เรียบง่ายจะช่วยให้ผู้ใช้ได้รับประสบการณ์ที่ดีกว่า
ดังนั้น คุณไม่ควรใช้แท็กเพิ่มเติมเหล่านี้ในกรณีที่ไม่จำเป็น

## สร้างการกำหนดค่าการวิเคราะห์อย่างง่ายๆ

เรียนรู้วิธีการสร้างการกำหนดค่า
[amp-pixel](/docs/reference/amp-pixel.html) และ
[amp-analytics](/docs/reference/extended/amp-analytics.html) อย่างง่ายๆ

### การกำหนดค่า amp-pixel อย่างง่ายๆ

หากต้องการสร้างการกำหนดค่า `amp-pixel` อย่างง่ายๆ
ให้แทรกข้อความดังเช่นด้านล่างลงในเนื้อความของหน้า AMP

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

ในตัวอย่างนี้
จะมีการส่งข้อมูลการเข้าชมหน้าเว็บไปยัง URL ที่ระบุ พร้อมหมายเลขแบบสุ่ม
ตัวแปร `RANDOM`
คือหนึ่งใน[ตัวแปรแทนค่าในแพลตฟอร์ม AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)
เรียนรู้ข้อมูลเพิ่มเติมเกี่ยวกับ[การแทนค่าตัวแปร](/th/docs/guides/analytics/analytics_basics.html#การแทนค่าตัวแปร)ที่นี่


[amp-pixel](/docs/reference/amp-pixel.html)
เป็นคอมโพเนนต์ที่มีอยู่ในระบบ
คุณจึงไม่จำเป็นต้องทำการประกาศเหมือนอย่างเช่นคอมโพเนนต์ที่ขยายการทำงานของ
AMP ซึ่งรวมถึง `amp-analytics`
อย่างไรก็ตาม คุณควรวางแท็ก `amp-pixel` ไว้ใกล้กับส่วนเริ่มต้นของ `<body>` ให้มากที่สุด

พิกเซลการติดตามจะทำงานเฉพาะเมื่อมีการดูข้อมูลนั้น
หากวาง `amp-pixel` ไว้ใกล้กับส่วนท้ายของหน้าเว็บ
พิกเซลการติดตามอาจไม่ทำงาน

### การกำหนดค่า amp-analytics อย่างง่ายๆ

หากต้องการสร้างการกำหนดค่า
[amp-analytics](/docs/reference/extended/amp-analytics.html) อย่างง่ายๆ
คุณจะต้องใส่ข้อความประกาศ `custom-element` นี้ที่
`<head>` ของเอกสาร AMP ก่อน (ดู[การประกาศคอมโพเนนต์ที่ใช้งาน](/docs/reference/extended.html#component-inclusion-declaration))


[sourcecode:html]
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
[/sourcecode]

ตัวอย่างต่อไปนี้จะเหมือนกับใน[ตัวอย่างของ `amp-pixel`](/th/docs/guides/analytics/analytics_basics.html#การกำหนดค่า-amp-pixel-อย่างง่ายๆ)
โดยทุกครั้งที่มีการแสดงหน้าเว็บ
ทริกเกอร์จะทำงาน
และส่งข้อมูลการเข้าชมหน้าเว็บไปยัง URL ที่ระบุ พร้อมกับ ID แบบสุ่ม

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
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

ในตัวอย่างข้างต้น เราได้ระบุการเข้าชมหน้าเว็บที่เรียกของคำขอเป็น https://foo.com/pixel?RANDOM ตามที่ได้อธิบายไว้ก่อนหน้านี้ RANDOM จะถูกแทนที่ด้วยหมายเลขแบบสุ่ม ดังนั้นคำขอจึงอยู่ในรูปแบบ https://foo.com/pixel?0.23479283687235653498734

เมื่อมีการแสดงหน้าเว็บ
(ตามที่ระบุไว้ให้เริ่มทำงานด้วยคำหลัก `visible`)
จะมีการเริ่มทำงานและส่งคำขอ `pageview`
โดยแอททริบิวต์ triggers จะพิจารณาว่าคำขอการเข้าชมหน้าเว็บเริ่มทำงานเมื่อใด
เรียนรู้เพิ่มเติมเกี่ยวกับ [requests และ triggers](/th/docs/guides/analytics/deep_dive_analytics.html#requests,-triggers-และ-transports)

## การแทนค่าตัวแปร

ทั้งคอมโพเนนต์ [amp-pixel](/docs/reference/amp-pixel.html) และ
[amp-analytics](/docs/reference/extended/amp-analytics.html) สามารถรองรับการแทนค่าตัวแปร URL มาตรฐานทั้งหมด (ดู[การแทนค่าตัวแปรของ AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md))


ในตัวอย่างต่อไปนี้
คำขอการเข้าชมหน้าเว็บจะถูกส่งไปยัง URL
พร้อมกับ URL มาตรฐาน ชื่อ และ
[ID ไคลเอ็นต์](/th/docs/guides/analytics/analytics_basics.html#การระบุผู้ใช้)ของเอกสาร AMP ปัจจุบัน

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

เนื่องจากการใช้งานที่เรียบง่าย
แท็ก `amp-pixel` จะมีเฉพาะตัวแปรที่ระบุโดยแพลตฟอร์ม
หรือที่รันไทม์ของ AMP สามารถแยกวิเคราะห์จากหน้า AMP
ในตัวอย่างข้างต้น
แพลตฟอร์มจะแสดงค่าสำหรับทั้ง
`canonicalURL` และ `clientId(site-user-id)`
โดยแท็ก `amp-analytics` สามารถมีตัวแปรเดียวกับ `amp-pixel`
รวมถึงตัวแปรที่ระบุขึ้นโดยเฉพาะในการกำหนดค่าแท็ก

ให้ใช้รูปแบบ `${varName}` ในสตริงคำขอของหน้าเว็บหรือตัวแปรที่ระบุโดยแพลตฟอร์ม

จากนั้นค่าที่แท้จริงของแท็ก `amp-analytics` จะเข้าไปแทนที่ในเทมเพลตเมื่อมีการสร้างคำขอสำหรับการวิเคราะห์
ดู[ตัวแปรที่สนับสนุนใน amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md))


ในตัวอย่างของ `amp-analytics` ต่อไปนี้
จะมีการส่งคำขอการเข้าชมหน้าเว็บไปยัง URL
พร้อมข้อมูลเพิ่มเติมที่ได้จากการแทนค่าตัวแปร
ซึ่งอาจมาจากแพลตฟอร์ม
หรือระบุเป็นข้อความอินไลน์
ในการกำหนดค่า `amp-analytics`

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

ในตัวอย่างข้างต้น
ตัวแปร `account` และ `title` ได้รับการระบุไว้ในการกำหนดค่า
`amp-analytics`
แต่ไม่ได้ระบุตัวแปร `canonicalUrl` และ `clientId`
ดังนั้นแพลตฟอร์มจึงมีการแทนค่าดังกล่าว

**ข้อมูลสำคัญ:** การแทนค่าตัวแปรนั้นมีความยืดหยุ่น
คุณสามารถระบุตัวแปรเดียวกันไว้ในตำแหน่งที่ต่างกันได้
และรันไทม์ของ AMP จะแยกวิเคราะห์ค่าตามลำดับนี้
(ดู[การจัดลำดับการแทนค่าตัวแปร](/th/docs/guides/analytics/deep_dive_analytics.html#การจัดลำดับการแทนค่าตัวแปร))

## การระบุผู้ใช้

เว็บไซต์ต่างๆ จะใช้คุกกี้ในการจัดเก็บข้อมูลที่เฉพาะเจาะจงของผู้ใช้ไว้ในเบราว์เซอร์
โดยสามารถนำคุกกี้มาใช้เพื่อบอกให้ทราบว่าผู้ใช้เคยมาที่เว็บไซต์นี้มาก่อนหรือไม่
ใน AMP
การแสดงหน้าเว็บอาจเป็นการแสดงจากเว็บไซต์ของผู้เผยแพร่หรือแคช
(เช่น Google AMP Cache)
โดยเว็บไซต์ของผู้เผยแพร่และแคชอาจมีโดเมนที่แตกต่างกัน
ด้วยเหตุผลด้านความปลอดภัย
เบราว์เซอร์สามารถ (และมักจะ) จำกัดการเข้าถึงคุกกี้ของโดเมนอื่นๆ
(ดู[การติดตามผู้ใช้จากแหล่งที่มาต่างๆ](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md))


โดยค่าเริ่มต้น
AMP จะจัดการข้อกำหนดของ ID ไคลเอ็นต์เพื่อให้ทราบว่ามีการเข้าชมหน้าเว็บจากเว็บไซต์ของผู้เผยแพร่หรือแคช
ID ไคลเอ็นต์ที่ AMP สร้างขึ้นจะมีค่าเป็น `"amp-"`
ตามด้วยสตริงที่เข้ารหัส `base64` แบบสุ่ม และจะคงค่าเดิมสำหรับผู้ใช้ที่เข้าชมหน้าเว็บนั้นอีกครั้ง


AMP จะจัดการการอ่านและการเขียน ID ไคลเอ็นต์ในทุกกรณี
ซึ่งจะเห็นได้อย่างชัดเจนในกรณีที่มีการแสดงหน้าเว็บ
ผ่านแคชหรือนอกเหนือจากการดูเนื้อหาในเว็บไซต์ต้นฉบับของผู้เผยแพร่

ในกรณีนี้จะไม่สามารถเข้าถึงคุกกี้ในเว็บไซต์ของผู้เผยแพร่ได้

หากเป็นการแสดงหน้า AMP จากเว็บไซต์ของผู้เผยแพร่
เฟรมเวิร์ก ID ไคลเอ็นต์ที่ AMP ใช้สามารถบอกได้ว่าควรค้นหาและใช้คุกกี้ใด

ในกรณีนี้
อาร์กิวเมนต์ `cid-scope-cookie-fallback-name` ของตัวแปร `clientId` จะถูกแปลความหมายว่าเป็นชื่อคุกกี้

โดยอาจแสดงในรูปแบบ
`CLIENT_ID(cid-scope-cookie-fallback-name)` หรือ
`${clientId(cid-scope-cookie-fallback-name)}`

ตัวอย่างเช่น:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

หาก AMP พบว่ามีการตั้งค่าคุกกี้นี้
การแทนค่า ID ไคลเอ็นต์จะส่งกลับค่าของคุกกี้
หาก AMP พบว่าไม่มีการตั้งค่าคุกกี้นี้
AMP จะสร้างค่าในรูปแบบ `amp-`
ตามด้วยสตริงที่เข้ารหัส base64 แบบสุ่ม

เรียนรู้เพิ่มเติมเกี่ยวกับการแทนค่า ID ไคลเอ็นต์
ซึ่งรวมถึงวิธีการเพิ่ม ID การแจ้งเตือนผู้ใช้เพิ่มเติมใน[ตัวแปรที่สนับสนุนในการวิเคราะห์ AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)

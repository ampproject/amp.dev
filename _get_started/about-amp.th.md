---
layout: page
title: AMP คืออะไร
order: 0
locale: th
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP คือวิธีการสร้างหน้าเว็บที่มีเนื้อหาไม่เปลี่ยนแปลง ซึ่งสามารถแสดงผลได้อย่างรวดเร็ว
โดยการทำงานของ AMP จะประกอบด้วยคอมโพเนนต์สามส่วนคือ

{% include toc.html %}

**AMP HTML** คือ HTML ที่มีข้อจำกัดบางอย่างเพื่อการทำงานได้อย่างมีประสิทธิภาพ
และส่วนขยายสำหรับการสร้างเนื้อหาที่มีความสมบูรณ์มากกว่า HTML ทั่วไป
ไลบรารี **AMP JS** จะช่วยทำให้แสดงหน้า AMP HTML ได้อย่างรวดเร็ว
**Google AMP Cache** (ตัวเลือก) จะใช้ในการแสดงหน้า AMP HTML

## AMP HTML

โดยทั่วไปแล้ว AMP HTML คือ HTML ที่มีการเพิ่มคุณสมบัติ AMP แบบกำหนดเอง
ไฟล์ AMP HTML ที่เรียบง่ายที่สุดจะมีลักษณะดังนี้

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

แม้ว่าแท็กส่วนใหญ่ในหน้า AMP HTML จะเป็นแท็ก HTML ตามปกติ
แต่มีการนำแท็กแบบ AMP โดยเฉพาะมาใช้แทนแท็ก HTML บางแท็ก (โปรดดู
[แท็ก HTML ในแบบ AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md))
อิลิเมนต์แบบกำหนดเองเหล่านี้จะเรียกว่าคอมโพเนนต์ AMP HTML
ที่ช่วยให้สามารถนำรูปแบบทั่วไปไปใช้งานได้อย่างมีประสิทธิภาพ

เช่น แท็ก [`amp-img`](/docs/reference/amp-img.html)
จะสนับสนุน `srcset` ได้อย่างสมบูรณ์แม้ในเบราว์เซอร์ที่ยังไม่มีการสนับสนุนดังกล่าว
ดูวิธีการ[สร้าง AMP HTML หน้าแรกของคุณ](/docs/get_started/create_page.html)

## AMP JS

[ไลบรารี AMP JS](https://github.com/ampproject/amphtml/tree/master/src) จะใช้[แนวปฏิบัติเพื่อประสิทธิภาพที่ดีที่สุดของ AMP](/docs/get_started/technical_overview.html)
ทั้งหมด
จัดการการโหลดทรัพยากร และใช้แท็กแบบกำหนดเองตามที่กล่าวไว้ข้างต้น
เพื่อให้สามารถแสดงหน้าเว็บของคุณได้อย่างรวดเร็ว

โดยการเพิ่มประสิทธิภาพที่สำคัญที่สุดก็คือ การทำงานนี้จะทำให้การเรียกใช้ทรัพยากรภายนอกไม่เกิดขึ้นพร้อมกัน จึงไม่มีองค์ประกอบใดในหน้าเว็บที่จะบล็อกการแสดงผล

เทคนิคที่ช่วยเพิ่มประสิทธิภาพอื่นๆ ได้แก่ การกรอง iframe ทั้งหมด การคำนวณเค้าโครงของแต่ละอิลิเมนต์บนหน้าเว็บล่วงหน้าก่อนที่จะมีการโหลดทรัพยากร และการปิดใช้งาน CSS Selector ที่ทำงานช้า

หากต้องการเรียนรู้เพิ่มเติมไม่เพียงแค่[การเพิ่มประสิทธิภาพ](/docs/get_started/technical_overview.html) แต่รวมถึงข้อจำกัดต่างๆ [อ่านข้อกำหนดเกี่ยวกับ AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)

## Google AMP Cache

Google AMP Cache คือเครือข่ายการแสดงเนื้อหาผ่านพร็อกซี
สำหรับการแสดงเอกสาร AMP ที่ถูกต้องทั้งหมด
ซึ่งจะดึงข้อมูลหน้า AMP HTML แล้วเก็บข้อมูลไว้ในแคชเพื่อเพิ่มประสิทธิภาพในการแสดงหน้าเว็บโดยอัตโนมัติ
เมื่อใช้ Google AMP Cache เอกสาร, ไฟล์ JS และรูปภาพทั้งหมดจะได้รับการโหลดจากที่เดียวกัน โดยใช้
[HTTP 2.0](https://http2.github.io/)
เพื่อประสิทธิภาพการทำงานสูงสุด

แคชดังกล่าวยังมาพร้อมกับ[ระบบการตรวจสอบ](https://github.com/ampproject/amphtml/tree/master/validator)ที่ช่วยยืนยันว่าหน้าเว็บจะทำงานอย่างถูกต้อง


โดยไม่ขึ้นอยู่กับทรัพยากรภายนอก
ระบบการตรวจสอบจะทำการยืนยันว่า
มาร์กอัปของหน้าเว็บเป็นไปตามข้อกำหนดของ AMP HTML

เครื่องมือตรวจสอบอีกเวอร์ชันหนึ่งจะมาพร้อมกับหน้า AMP ทุกหน้า โดยเวอร์ชันนี้สามารถบันทึกข้อผิดพลาดจากการตรวจสอบไปยังคอนโซลของเบราว์เซอร์โดยตรงเมื่อมีการแสดงหน้าเว็บ
ช่วยให้คุณทราบว่าการเปลี่ยนโค้ดที่ซับซ้อนอาจส่งผลกระทบต่อประสิทธิภาพและประสบการณ์ของผู้ใช้อย่างไรบ้าง


เรียนรู้เพิ่มเติมเกี่ยวกับ[การทดสอบหน้า AMP HTML](/docs/guides/validate.html)

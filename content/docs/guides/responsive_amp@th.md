---
$title: สร้างหน้า AMP ที่ตอบสนองตามอุปกรณ์
toc: true
---

การสร้างองค์ประกอบที่ตอบสนองตามอุปกรณ์ใน AMP นั้นง่ายมาก
เพียงแค่วาง `layout=responsive` ในองค์ประกอบนั้น

[TOC]

## สร้างรูปภาพที่ตอบสนองตามอุปกรณ์

ทรัพยากรที่โหลดจากภายนอกทั้งหมด ซึ่งรวมถึงรูปภาพ
ต้องมีขนาดและตำแหน่งตามที่ระบุ
เพื่อให้เวลาที่ทรัพยากรโหลดขึ้นมา หน้าจะไม่กระตุกและแสดงใหม่อีกรอบ

สร้างรูปภาพที่ตอบสนองตามอุปกรณ์
โดยระบุความกว้างและความสูง
การกำหนดเค้าโครงให้เป็นแบบตอบสนองตามอุปกรณ์
และการบ่งบอกด้วย [`srcset`](/th/docs/guides/responsive/style_pages.html)
ว่าจะมีการใช้เนื้อหารูปภาพใดโดยอิงตามหน้าจอขนาดต่างๆ ดังตัวอย่างต่อไปนี้

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

องค์ประกอบ `amp-img` นี้จะปรับให้พอดีกับความกว้าง
ขององค์ประกอบคอนเทนเนอร์ของตัวเองโดยอัตโนมัติ
และความสูงจะปรับไปตามอัตราส่วนจอภาพโดยอัตโนมัติ
ซึ่งกำหนดโดยความกว้างและความสูงที่ให้ไว้

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857" layout="responsive"></amp-img>

โปรดดู [AMP ตาม amp-img ของตัวอย่าง](https://ampbyexample.com/components/amp-img/)ด้วย

## เพิ่มสไตล์ไปยังหน้าเว็บ

เพิ่มสไตล์ทั้งหมดภายในแท็ก `<style amp-custom>`
ในส่วนหัวของเอกสาร
ตัวอย่างเช่น

[sourcecode:html]
<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
[/sourcecode]

**สำคัญ:**
แท็ก `<style amp-custom>` ในหน้าเว็บจะมีได้เพียงแท็กเดียว
เพราะไม่สามารถใช้แท็กดังกล่าวได้เกินกว่า 1 ครั้งใน AMP

กำหนดสไตล์คอมโพเนนต์ด้วยคลาสหรือตัวเลือกองค์ประกอบ
โดยใช้คุณสมบัติ CSS โดยทั่วไป ตัวอย่างเช่น

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**สำคัญ:**
ตรวจสอบว่าสไตล์ของคุณใช้ได้ใน AMP
เพราะบางสไตล์ใช้ไม่ได้เนื่องจากเหตุผลด้านประสิทธิภาพ
(ดู [CSS ที่รองรับ](/th/docs/guides/responsive/style_pages.html)ด้วย)

## องค์ประกอบขนาดและตำแหน่ง

AMP แยกเค้าโครงเอกสารออกจากการโหลดทรัพยากร
เพื่อให้ AMP โหลดเค้าโครงของหน้าได้โดยไม่ต้องรอให้ดาวน์โหลดทรัพยากรก่อน

ระบุขนาดและตำแหน่งขององค์ประกอบ AMP ที่มองเห็นได้ทั้งหมด
โดยระบุแอตทริบิวต์ `width` และ `height`
แอตทริบิวต์เหล่านี้บ่งบอกถึงอัตราส่วนจอภาพขององค์ประกอบ
ซึ่งต่อจากนั้นจะปรับขนาดไปตามคอนเทนเนอร์ได้

ตั้งค่าเค้าโครงให้เป็นแบบตอบสนองตามอุปกรณ์
ซึ่งจะปรับขนาดองค์ประกอบให้พอดีกับความกว้างขององค์ประกอบคอนเทนเนอร์ของตัวเอง
 และปรับความสูงตามอัตราส่วนจอภาพที่กำหนดโดยแอตทริบิวต์ความกว้างและความสูงโดยอัตโนมัติ

เรียนรู้เพิ่มเติมเกี่ยวกับ[เค้าโครงที่รองรับใน AMP](/th/docs/guides/responsive/control_layout.html)

## ตรวจสอบสไตล์และเค้าโครง

ใช้เครื่องมือตรวจสอบ AMP เพื่อทดสอบ
ค่า CSS และเค้าโครงของหน้าเว็บ

เครื่องมือตรวจสอบจะยืนยันว่า CSS ของหน้าเว็บมีขนาดไม่เกินขีดจำกัด 50,000 ไบต์ ตรวจหาสไตล์ที่ไม่อนุญาต และตรวจดูว่าเค้าโครงของหน้าเว็บนั้น
สามารถใช้ได้และจัดรูปแบบอย่างถูกต้อง
โปรดดูรายการ[ข้อผิดพลาดทั้งหมดเกี่ยวกับสไตล์และเค้าโครง](/th/docs/reference/validation_errors.html#ข้อผิดพลาดด้านสไตล์และการออกแบบ)ด้วย

ต่อไปนี้เป็นต้วอย่างข้อผิดพลาดในคอนโซลที่แสดงหน้าเว็บที่มี CSS ซึ่งมีขนาดเกินขีดจำกัด 50,000 ไบต์

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

เรียนรู้เพิ่มเติมเกี่ยวกับวิธี[ตรวจสอบหน้า AMP](/th/docs/guides/debug/validate.html)
ซึ่งรวมถึงวิธีตรวจหาข้อผิดพลาดเกี่ยวกับสไตล์และแก้ไขข้อผิดพลาดนั้น

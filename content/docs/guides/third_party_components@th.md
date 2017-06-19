---
$title: รวมเนื้อหาของบุคคลที่สาม
---

เรียนรู้วิธีรวมคอมโพเนนต์ของบุคคลที่สามในหน้าเว็บ

[TOC]

## ฝังทวีต

ฝังทวีตของ Twitter ในหน้าเว็บ
โดยใช้องค์ประกอบ [`amp-twitter`](/docs/reference/components/amp-twitter.html)

หากต้องการรวมทวีตไว้ในหน้าเว็บ
ก่อนอื่น ให้ใส่สคริปต์ต่อไปนี้ใน `<head>`

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

ปัจจุบันทวีตมีการปรับขนาดตามสัดส่วน
ให้พอดีกับขนาดที่ระบุไว้โดยอัตโนมัติ
แต่ก็อาจทำให้ลักษณะที่ควรจะเป็นด้อยลงไป
โปรดปรับเปลี่ยนความกว้างและความสูงที่ระบุไว้ด้วยตัวเองหรือใช้แอตทริบิวต์สื่อ
เพื่อเลือกอัตราส่วนตามความกว้างของหน้าจอ

<!-- embedded twitter example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.twitter.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## ฝัง Instagram

ฝัง Instagram ในหน้าเว็บ
โดยใช้องค์ประกอบ [`amp-instagram`](/docs/reference/components/amp-instagram.html)

หากต้องการรวม Instagram ไว้ด้วย
ก่อนอื่น ให้ใส่สคริปต์ต่อไปนี้ใน `<head>`

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

รวม data-shortcode ของ Instagram ที่พบใน URL รูปภาพของ Instagram
ตัวอย่างเช่น ใน `https://instagram.com/p/fBwFP`
`fBwFP` คือ data-shortcode
นอกจากนี้ Instagram จะใช้อัตราส่วนคงที่สำหรับเค้าโครงแบบตอบสนองตามอุปกรณ์
ดังนั้น ค่าของความกว้างและความสูงควรจะใช้ได้ในทุกที่

<!-- embedded Instagram example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.instagram.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## แสดงโพสต์หรือวิดีโอ Facebook

แสดงโพสต์หรือวิดีโอ Facebook ในหน้าเว็บ
โดยใช้องค์ประกอบ [`amp-facebook`](/docs/reference/components/amp-facebook.html)

คุณต้องใส่สคริปต์ต่อไปนี้ใน `<head>`

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### ตัวอย่าง - การฝังโพสต์

Source: 
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
Preview: 
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### ตัวอย่าง - การฝังวิดีโอ

Source: 
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
Preview: 
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>

## รวมวิดีโอ YouTube

รวมวิดีโอ YouTube ในหน้าเว็บ
โดยใช้องค์ประกอบ [`amp-youtube`](/docs/reference/components/amp-youtube.html)

คุณต้องใส่สคริปต์ต่อไปนี้ใน `<head>`

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

คุณสามารถพบ `data-videoid` ของ YouTube ใน URL หน้าวิดีโอ YouTube ทุกหน้า
ตัวอย่างเช่น ใน https://www.youtube.com/watch?v=Z1q71gFeRqM
Z1q71gFeRqM เป็นรหัสวิดีโอ

ใช้ `layout="responsive"` เพื่อแสดงเค้าโครงที่ถูกต้องสำหรับวิดีโออัตราส่วน 16:9 ดังนี้

<!-- embedded youtube example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## แสดงโฆษณา

แสดงโฆษณาในหน้าเว็บ
โดยใช้องค์ประกอบ [`amp-ad`](/docs/reference/components/amp-ad.html)
ระบบรองรับเฉพาะโฆษณาที่แสดงผ่าน HTTPS เท่านั้น

ไม่อนุญาตให้ JavaScript ที่เครือข่ายโฆษณาจัดหาให้ทำงานภายในเอกสาร AMP
แต่รันไทม์ของ AMP จะโหลด iframe จาก
ต้นทางอื่น (ผ่านแซนด์บ็อกซ์ของ iframe)
และเรียกใช้ JS ของเครือข่ายโฆษณาภายในแซนด์บ็อกซ์ของ iframe

คุณต้องระบุความกว้างและความสูงของโฆษณาและประเภทของเครือข่ายโฆษณา
`type` จะระบุเทมเพลตของเครือข่ายโฆษณา
ประเภทโฆษณาที่ต่างกันต้องใช้แอตทริบิวต์ `data-*` ต่างกัน

<!-- embedded ad example -->
<div>
<amp-iframe height="212"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

หากเครือข่ายโฆษณารองรับ
ให้รวม `placeholder`
เพื่อแสดงถ้าไม่มีโฆษณาให้ใช้งาน

<!-- embedded ad example -->
<div>
<amp-iframe height="232"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-placeholder.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

AMP รองรับเครือข่ายโฆษณาหลากหลายประเภท ดู[ข้อมูลอ้างอิงสำหรับรายการทั้งหมด](/docs/reference/components/amp-ad.html#supported-ad-networks)

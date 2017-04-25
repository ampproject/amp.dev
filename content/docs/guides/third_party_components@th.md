---
$title: รวมเนื้อหาของบุคคลที่สาม
---

เรียนรู้วิธีรวมคอมโพเนนต์ของบุคคลที่สามในหน้าเว็บ

[TOC]

## ฝังทวีต

ฝังทวีตของ Twitter ในหน้าเว็บ
โดยใช้องค์ประกอบ [`amp-twitter`](/docs/reference/extended/amp-twitter.html)

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

ตัวอย่าง `amp-twitter` จาก
[ตัวอย่าง twitter.amp](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html)

[sourcecode:html]
<amp-twitter width=390 height=50
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## ฝัง Instagram

ฝัง Instagram ในหน้าเว็บ
โดยใช้องค์ประกอบ [`amp-instagram`](/docs/reference/extended/amp-instagram.html)

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

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## แสดงโพสต์หรือวิดีโอ Facebook

แสดงโพสต์หรือวิดีโอ Facebook ในหน้าเว็บ
โดยใช้องค์ประกอบ [`amp-facebook`](/docs/reference/extended/amp-facebook.html)

คุณต้องใส่สคริปต์ต่อไปนี้ใน `<head>`

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

ตัวอย่าง - การฝังโพสต์

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

ตัวอย่าง - การฝังวิดีโอ

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## รวมวิดีโอ YouTube

รวมวิดีโอ YouTube ในหน้าเว็บ
โดยใช้องค์ประกอบ [`amp-youtube`](/docs/reference/extended/amp-youtube.html)

คุณต้องใส่สคริปต์ต่อไปนี้ใน `<head>`

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

คุณสามารถพบ `data-videoid` ของ YouTube ใน URL หน้าวิดีโอ YouTube ทุกหน้า
ตัวอย่างเช่น ใน https://www.youtube.com/watch?v=Z1q71gFeRqM
Z1q71gFeRqM เป็นรหัสวิดีโอ

ใช้ `layout="responsive"` เพื่อแสดงเค้าโครงที่ถูกต้องสำหรับวิดีโออัตราส่วน 16:9 ดังนี้

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## แสดงโฆษณา

แสดงโฆษณาในหน้าเว็บ
โดยใช้องค์ประกอบ [`amp-ad`](/docs/reference/amp-ad.html)
ระบบรองรับเฉพาะโฆษณาที่แสดงผ่าน HTTPS เท่านั้น

ไม่อนุญาตให้ JavaScript ที่เครือข่ายโฆษณาจัดหาให้ทำงานภายในเอกสาร AMP
แต่รันไทม์ของ AMP จะโหลด iframe จาก
ต้นทางอื่น (ผ่านแซนด์บ็อกซ์ของ iframe)
และเรียกใช้ JS ของเครือข่ายโฆษณาภายในแซนด์บ็อกซ์ของ iframe

คุณต้องระบุความกว้างและความสูงของโฆษณาและประเภทของเครือข่ายโฆษณา
`type` จะระบุเทมเพลตของเครือข่ายโฆษณา
ประเภทโฆษณาที่ต่างกันต้องใช้แอตทริบิวต์ `data-*` ต่างกัน

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

หากเครือข่ายโฆษณารองรับ
ให้รวม `placeholder`
เพื่อแสดงถ้าไม่มีโฆษณาให้ใช้งาน

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

AMP รองรับเครือข่ายโฆษณาหลากหลายประเภท ดู[ข้อมูลอ้างอิงสำหรับรายการทั้งหมด](/docs/reference/amp-ad.html#supported-ad-networks)

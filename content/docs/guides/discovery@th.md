---
$title: ทำให้ค้นพบหน้าเว็บของคุณได้
---

[TOC]

ในบางกรณีคุณอาจต้องการให้หน้าเว็บเดียว อย่างเช่น บทความข่าว มีทั้งเวอร์ชัน AMP และไม่ใช่ AMP ลองพิจารณาดังนี้ หาก Google Search พบหน้าเว็บเวอร์ชันที่ไม่ใช่ AMP แล้วจะรู้ได้อย่างไรว่าหน้าเว็บนั้นมีเวอร์ชัน AMP ด้วย

### การลิงก์หน้าเว็บด้วย `<link>`

เพื่อแก้ไขปัญหานี้ เราจะเพิ่มข้อมูลเกี่ยวกับหน้า AMP ไปยังหน้าที่ไม่ใช่ AMP หรือเพิ่มข้อมูลเกี่ยวกับหน้าที่ไม่ใช่ AMP ไปยังหน้า AMP ในรูปแบบของแท็ก `<link>` ใน `<head>`

เพิ่มบรรทัดต่อไปนี้ไปยังหน้าเว็บที่ไม่ใช่ AMP

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

และบรรทัดนี้ไปยังหน้า AMP

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### ถ้าฉันมีเพียงหน้าเดียวล่ะ

หากคุณมีเพียงหน้าเดียวและหน้านั้นเป็นหน้า AMP คุณยังคงต้องเพิ่มลิงก์ตามรูปแบบบัญญัติลงในหน้านั้น ซึ่งจะชี้ไปที่ตัวมันเองดังนี้

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## รวมเข้ากับแพลตฟอร์มของบุคคลที่สามผ่านข้อมูลเมตาที่เพิ่มเข้ามา

บางครั้งเว็บไซต์ของบุคคลที่สาม (ที่ฝังหน้า AMP ของคุณหรือมีลิงก์ไปยังหน้าดังกล่าว) จำเป็นต้องทราบข้อมูลเพิ่มเติมเกี่ยวกับหน้าเว็บของคุณนอกเหนือจากข้อเท็จจริงที่ว่าหน้านั้นเป็นหน้า AMP คำถามที่แพลตฟอร์มอาจจะถามเกี่ยวกับหน้าเว็บมีลักษณะดังนี้ "คุณคือบทความข่าวหรือ" "หรือเป็นวิดีโอ" หรือ "คุณมีภาพหน้าจอและคำอธิบายสั้นๆ ไหม" ฯลฯ

ข้อมูลเพิ่มเติมนี้ไม่ได้เกี่ยวข้องเฉพาะกับหน้า AMP เท่านั้น แต่เกี่ยวข้องกับหน้าเว็บทุกหน้า ข้อมูลเมตานี้เป็นข้อมูลเพิ่มเติมสำหรับบางแพลตฟอร์ม แต่สำหรับแพลตฟอร์มอื่นจะถือเป็นข้อกำหนด ซึ่งหมายความว่าแพลตฟอร์ม**จะไม่แสดงลิงก์ไปยังเนื้อหาของคุณหากคุณไม่ได้รวมข้อมูลเมตาที่เหมาะสมไว้ด้วย** โปรดตรวจสอบว่าคุณมีข้อมูลเมตาที่เหมาะสมสำหรับแพลตฟอร์มที่ต้องการให้เนื้อหาของคุณปรากฏ

### ใช้ Schema.org สำหรับเครื่องมือค้นหาส่วนใหญ่

[Schema.org](http://schema.org/) เสนอรายการคำศัพท์ที่เผยแพร่ต่อสาธารณะเพื่อเพิ่มข้อมูลเมตาแก่ทุกรายการ ในกรณีของ AMP คุณสมบัติที่เหมาะสมในบริบทจะรวมถึงประเภทเนื้อหาที่เฉพาะเจาะจง (เช่น "บทความข่าว") พาดหัว วันที่เผยแพร่ และรูปภาพตัวอย่างที่เกี่ยวข้อง

ตัวอย่าง

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

สามารถดูตัวอย่างเพิ่มเติมได้ใน[โฟลเดอร์ตัวอย่าง ampproject](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) ซึ่งมีไวยากรณ์ของแอตทริบิวต์ HTML ทางเลือกด้วย)

หมายเหตุ: คำนิยามของ Schema.org นี้คือข้อกำหนดเพื่อทำให้เนื้อหาของคุณมีสิทธิ์ที่จะปรากฏในการสาธิต[ภาพหมุนของข่าวใน Google Search (ลองใช้บนอุปกรณ์เคลื่อนที่)](https://g.co/ampdemo)
โปรดดู[เรื่องเด่นที่ใช้ AMP](https://developers.google.com/structured-data/carousels/top-stories) และ[เครื่องมือทดสอบข้อมูลที่มีโครงสร้าง](https://developers.google.com/structured-data/testing-tool/)ด้วย

### ข้อมูลเมตาอื่นๆ สำหรับแพลตฟอร์มอื่นๆ

ไปยัง[คำแนะนำการค้นพบทางโซเชียลที่ "ข้อมูลพื้นฐานเกี่ยวกับเว็บ"](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) เพื่อเรียนรู้เกี่ยวกับวิธีอื่นๆ ทั้งหมดในการจัดเตรียมเนื้อหาของคุณเพื่อการค้นพบและการเผยแพร่

---
layout: page
title: สร้างหน้า AMP HTML
order: 0
locale: th
---

มาร์กอัปต่อไปนี้คือจุดเริ่มต้นหรือต้นแบบที่ดี
ให้คัดลอกและบันทึกลงในไฟล์ที่มีส่วนขยาย .html

{% highlight html %}
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
{% endhighlight %}

ส่วนเนื้อความในตัวอย่างจะค่อนข้างตรงไปตรงมา แต่มีการเพิ่มโค้ดหลายอย่างไว้ที่ส่วนหัวของหน้าซึ่งคุณอาจไม่ทันได้สังเกต ลองมาดูมาร์กอัปที่จำเป็นกัน

## มาร์กอัปที่จำเป็น

เอกสาร AMP HTML จะต้อง:

  - เริ่มต้นด้วย doctype `<!doctype html>`
  - มีแท็ก `<html ⚡>` ระดับบนสุด (สามารถใช้ `<html amp>` ได้เช่นกัน)
  - มีแท็ก `<head>` และ `<body>` (มีหรือไม่ก็ได้ใน HTML)
  - มีแท็ก `<link rel="canonical" href="$SOME_URL" />` อยู่ภายในส่วนหัวที่นำไปยังเอกสาร AMP HTML เวอร์ชัน HTML ปกติหรือไปยังหน้านั้นเองในกรณีที่ไม่มีเวอร์ชัน HTML
  - มีแท็ก `<meta charset="utf-8">` เป็นรายการย่อยแรกของแท็กส่วนหัว
  - มีแท็ก `<meta name="viewport" content="width=device-width,minimum-scale=1">` อยู่ในแท็กส่วนหัว โดยแนะนำให้ใส่ initial-scale=1 ไว้ด้วย
  - มีแท็ก `<script async src="https://cdn.ampproject.org/v0.js"></script>` เป็นอิลิเมนต์สุดท้ายในส่วนหัว (ซึ่งรวมถึงและการโหลดไลบรารี AMP JS)
  - มีรายการต่อไปนี้ในแท็ก `<head>`:
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## เมตาดาตาที่จะมีหรือไม่ก็ได้

นอกเหนือจากข้อกำหนดโดยทั่วไป ตัวอย่างของเรายังมีการใช้ข้อกำหนด Schema.org ในส่วนหัว ซึ่งไม่ใช่ข้อกำหนดที่จำเป็นต้องใช้สำหรับ AMP แต่จำเป็นต้องมีเพื่อให้สามารถเผยแพร่เนื้อหาของคุณไปยังปลายทางที่ระบุ เช่น ใน[การสาธิตการแสดงข่าวแบบหมุนใน Google Search (ให้ลองใช้บนโทรศัพท์ของคุณ)](https://g.co/ampdemo)

หากต้องการเรียนรู้เพิ่มเติมเกี่ยวกับเมตาดาตาทั้งหมดที่คุณจำเป็นต้องใช้ในที่ต่างๆ เช่น Twitter [ให้ดูตัวอย่างของเรา](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) หากต้องการเรียนรู้เฉพาะเจาะจงเกี่ยวกับ AMP ใน Google Search ดู[การแสดงเรื่องเด่นด้วย AMP](https://developers.google.com/structured-data/carousels/top-stories)

<hr>

ข่าวดี! คุณได้ดำเนินการต่างๆ ที่จำเป็นสำหรับการสร้าง AMP หน้าแรกแล้ว อย่างไรก็ตาม ยังมีเนื้อหาในส่วนเนื้อความไม่มากนัก ในส่วนต่อไป เราจะกล่าวถึงวิธีการเพิ่มรายการพื้นฐาน เช่น รูปภาพ อิลิเมนต์ AMP แบบกำหนดเอง การจัดรูปแบบหน้าเว็บของคุณ และการจัดเค้าโครงแบบอินเทอร์แอคทีฟ

{% include button.html title="ไปยังขั้นตอนที่ 2" link="/docs/get_started/create/include_image.th.html" %}

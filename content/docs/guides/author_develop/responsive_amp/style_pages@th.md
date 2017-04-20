---
$title: CSS ที่รองรับ
---


เช่นเดียวกับหน้าเว็บทุกหน้า หน้า AMP มีการจัดสไตล์โดยใช้ CSS
แต่คุณจะไม่สามารถอ้างอิงสไตล์ชีตภายนอก
(ยกเว้น[แบบอักษรที่กำหนดเอง](#ข้อยกเว้นสำหรับแบบอักษรที่กำหนดเอง))
นอกจากนี้ยังมีสไตล์บางอย่างที่ไม่อนุญาตให้ใช้เนื่องจากอาจมีผลกระทบต่อประสิทธิภาพ
 ด้วยเหตุนี้ แอตทริบิวต์ของสไตล์แบบอินไลน์จึงไม่สามารถใช้ได้

สไตล์ทั้งหมดต้องแสดงในส่วนหัวของเอกสาร
(ดู[เพิ่มสไตล์ในหน้าเว็บ](/th/docs/guides/debug/validate.html))
แต่คุณสามารถใช้ CSS Preprocessor และการสร้างเทมเพลตเพื่อสร้างหน้าเว็บแบบคงที่
เพื่อให้จัดการเนื้อหาได้ดีขึ้น

**หมายเหตุ:**
คอมโพเนนต์ AMP มาพร้อมกับสไตล์ที่เป็นค่าเริ่มต้น
เพื่อช่วยให้สร้างหน้าเว็บที่ตอบสนองตามอุปกรณ์ได้ง่ายขึ้นตามสมควร
สไตล์เหล่านี้กำหนดไว้ใน
[`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css)

[TOC]

## การใช้ CSS Preprocessor

เอาต์พุตที่สร้างขึ้นของ Preprocessor ทำงานได้ดีใน AMP พอๆ กับในหน้าเว็บอื่นๆ
ตัวอย่างเช่น ไซต์ [ampproject.org](https://www.ampproject.org/) ใช้
[Sass](http://sass-lang.com/)
(เราใช้ <a href="http://grow.io/"><span class="notranslate">Grow</span></a> ในการสร้างหน้า AMP แบบคงที่
ซึ่งเป็นส่วนหนึ่งของไซต์ [ampproject.org](https://www.ampproject.org/))

เมื่อใช้ Preprocessor
ให้ระวังเป็นพิเศษเกี่ยวกับโค้ดที่คุณเพิ่มเข้าไป โดยให้โหลดเฉพาะสิ่งที่หน้าเว็บนั้นใช้เท่านั้น
ตัวอย่างเช่น
[head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)
มีมาร์กอัป AMP ที่จำเป็นทั้งหมดและ CSS แบบอินไลน์จากไฟล์ซอร์ส `*.scss`
นอกจากนี้ยังมีสคริปต์ขององค์ประกอบที่กำหนดเองสำหรับ
[`amp-youtube`](/docs/reference/extended/amp-youtube.html) นอกเหนือจากสคริปต์อื่นๆ
ดังนั้น หน้าเว็บต่างๆ ทั่วไซต์จึงมีวิดีโอ YouTube ฝังอยู่ได้

[sourcecode:html] {% raw %} 
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">

  <title>Accelerated Mobile Pages Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="https://www.ampproject.org{{doc.url.path}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

หากต้องการดูว่าโค้ดข้างต้นแปลงเป็น AMP HTML ที่มีการจัดรูปแบบอย่างไร
ให้ดูซอร์สของหน้าเว็บใดก็ได้ใน [ampproject.org](https://www.ampproject.org/)
(ใน Chrome ให้คลิกขวาและ`ดูซอร์สของหน้าเว็บ`)

## สไตล์ที่ไม่อนุญาตให้ใช้

สไตล์ต่อไปนี้ไม่สามารถใช้ได้ในหน้า AMP

<table>
  <thead>
    <tr>
      <th data-th="Banned style">สไตล์ที่ห้ามใช้</th>
      <th data-th="Description">คำอธิบาย</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">แอตทริบิวต์ของสไตล์แบบอินไลน์</td>
      <td data-th="Description">สไตล์ทั้งหมดต้องกำหนดไว้ใน <code>&lt;head&gt;</code> ของหน้าเว็บ
       ภายในแท็ก <code>&lt;style amp-custom&gt;</code></td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>ควอลิไฟเออร์ !</code>important </td>
      <td data-th="Description">ไม่อนุญาตให้ใช้สไตล์นี้
      ซึ่งเป็นข้อกำหนดที่จำเป็นเพื่อให้ AMP บังคับใช้กฎการปรับขนาดองค์ประกอบของตนได้</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">ไม่อนุญาตให้ใช้ ยกเว้น<a href="#ข้อยกเว้นสำหรับแบบอักษรที่กำหนดเอง">แบบอักษรที่กำหนดเอง</a></td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (ตัวเลือกสากล)</td>
      <td data-th="Description">อาจทำให้ประสิทธิภาพลดลงและอาจมีการใช้งาน
      เพื่อหลีกเลี่ยงข้อจำกัดของตัวเลือกอื่นๆ</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">สามารถใช้เพื่อเลียนแบบตัวเลือกสากลได้</td>
    </tr>
    <tr>
      <td data-th="Banned style">Pseudo-selector, Pseudo-class และ Pseudo-element</td>
      <td data-th="Description">Pseudo-selector, Pseudo-class และ Pseudo-element สามารถใช้ได้เฉพาะใน
      ตัวเลือกที่มีชื่อแท็ก และชื่อแท็กเหล่านั้นต้องไม่ขึ้นต้นด้วย <code>amp-</code>
      ตัวอย่างที่ใช้ได้ เช่น <code>a:hover, div:last-of-type</code>
      ตัวอย่างที่ใช้ไม่ได้ เช่น <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style">คลาส <code>-amp-</code> และชื่อแท็ก <code>i-amp-</code></td>
      <td data-th="Description">ชื่อคลาสซึ่งอยู่ในสไตล์ชีตของผู้เขียนต้องไม่ขึ้นต้นด้วยสตริง <code>-amp-</code> ชื่อคลาสเหล่านี้สงวนไว้สำหรับการใช้งานภายในของรันไทม์ AMP โดยเป็นไปตามสไตล์ชีตของผู้ใช้ที่อาจไม่สามารถอ้างอิงตัวเลือก CSS สำหรับคลาส <code>-amp-</code> และแท็ก <code>i-amp</code></td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>behavior</code>, <code>-moz-binding</code></td>
      <td data-th="Description">คุณสมบัติเหล่านี้ไม่อนุญาตให้ใช้
      เนื่องจากเหตุผลด้านความปลอดภัย</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>ฟิลเตอร์</code></td>
      <td data-th="Description">ขึ้นบัญชีดำเนื่องจากมีข้อกังวลด้านประสิทธิภาพ</td>
    </tr>
  </tbody>
</table>

## การเปลี่ยนแปลงที่อนุญาตพิเศษและคุณสมบัติของภาพเคลื่อนไหว

AMP อนุญาตเฉพาะการเปลี่ยนแปลงและภาพเคลื่อนไหวของคุณสมบัติ
ที่สามารถเร่งโดยใช้ GPU ได้ในเบราว์เซอร์ทั่วไป
โครงการ AMP ในปัจจุบันอนุญาตพิเศษให้กับ `opacity`, `transform`
และ `-vendorPrefix-transform`

ในตัวอย่างต่อไปนี้ `<property>` จะต้องอยู่ในรายการที่อนุญาตพิเศษ

* `transition <property> (Also -vendorPrefix-transition)`
* @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

คุณสมบัติ `overflow` (และ `overflow-y`, `overflow-x`)
ไม่สามารถจัดสไตล์เป็น <span class="notranslate">“auto”</span> หรือ <span class="notranslate">“scroll”</span>
องค์ประกอบใดก็ตามที่กำหนดโดยผู้ใช้ในเอกสาร AMP ไม่สามารถมีแถบเลื่อนได้

## ข้อยกเว้นสำหรับแบบอักษรที่กำหนดเอง

หน้า AMP จะมีสไตล์ชีตภายนอกไม่ได้ ยกเว้นแบบอักษรที่กำหนดเอง
วิธีการอ้างอิงแบบอักษรที่กำหนดเองที่ใช้ได้มี 2 วิธีได้แก่
การใช้แท็กลิงก์ที่ชี้ไปยังผู้ให้บริการแบบอักษรที่ได้รับอนุญาตพิเศษและการรวม `@font-face` ไว้ด้วย

ผู้ให้บริการแบบอักษรจะได้รับอนุญาตพิเศษได้
ก็ต่อเมื่อรองรับการรวมเฉพาะ CSS เท่านั้นและแสดงผ่าน HTTPS
ปัจจุบันต้นทางต่อไปนี้ได้รับอนุญาตพิเศษ
และสามารถแสดงแบบอักษรผ่านแท็กลิงก์

* [https://fast.fonts.net](https://fast.fonts.net)
* [https://fonts.googleapis.com](https://fonts.googleapis.com)

ต่อไปนี้เป็นตัวอย่างแท็กลิงก์ที่ชี้ไปยังผู้ให้บริการแบบอักษรที่ได้รับอนุญาตพิเศษ ซึ่งก็คือ Google Fonts

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

อีกทางเลือกหนึ่งคือ คุณสามารถใช้ [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) ได้
โดยแบบอักษรที่รวมอยู่ด้วยผ่านทาง `@font-face` ต้องดึง
ผ่านชุดรูปแบบ HTTP หรือ HTTPS

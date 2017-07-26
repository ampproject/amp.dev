---
$title: ข้อผิดพลาดในการตรวจสอบความถูกต้องของ AMP
---

เอกสาร AMP ที่ถูกต้องต้องไม่มีข้อผิดพลาดในการตรวจสอบความถูกต้อง
เอกสารนี้มีไว้เพื่อช่วยให้คุณเข้าใจข้อผิดพลาด
ในการตรวจสอบความถูกต้องได้ดีขึ้นและแก้ไขข้อผิดพลาดที่พบ
เมื่อคุณ[ตรวจสอบความถูกต้องของหน้า AMP](/th/docs/guides/debug/validate.html)
สำหรับภาพรวมทั้งหมดของข้อผิดพลาดในการตรวจสอบความถูกต้อง โปรดดู[ข้อกำหนดโปรแกรมตรวจสอบ AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)

[TOC]

## ข้อกำหนดแท็กและแอตทริบิวต์ AMP HTML

### แท็กที่จำเป็นขาดหายไป

<table>
   <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The mandatory tag '%1' is missing or incorrect."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>เพิ่ม (หรือแก้ไข) แท็ก HTML ที่จำเป็น</td>
  </tr>
</table>

เอกสาร AMP ทั้งหมดต้องมีแท็กต่อไปนี้

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

แท็กที่จำเป็นเหล่านี้รวมถึงช่อง `mandatory: true` ใน[ข้อกำหนดโปรแกรมตรวจสอบ AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)
และยังมีการอ้างอิงถึงใน[ข้อกำหนดของ AMP](/docs/reference/spec.html) ด้วย

### แท็กที่อีกแท็กหนึ่งต้องใช้ขาดหายไป

<table>
   <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">TAG_REQUIRED_BY_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The '%1' tag is missing or incorrect, but required by '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>เพิ่ม (หรือแก้ไข) แท็ก HTML ที่ต้องใช้</td>
  </tr>
</table>

โปรแกรมตรวจสอบจะแสดงข้อผิดพลาด `TAG_REQUIRED_BY_MISSING`
เมื่อพบองค์ประกอบขยายในเอกสาร AMP
แต่ไม่พบ `<script>` ที่เทียบเท่ากัน

[องค์ประกอบขยาย](/docs/reference/extended.html)
ต้องรวมอยู่ในเอกสาร AMP โดยเป็นส่วนประกอบที่กำหนดเอง
ในการแก้ไขข้อผิดพลาดเหล่านี้ ให้นำทางไปที่หน้าอ้างอิงขององค์ประกอบขยาย
คัดลอกสคริปต์ที่ต้องใช้และวางลงใน `<head>` ของเอกสาร AMP

### แท็กไม่ได้รับอนุญาต

<table>
   <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">DISALLOWED_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The tag '%1' is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำแท็กที่ไม่ได้รับอนุญาตออก</td>
  </tr>
</table>

แท็กมีรายการที่อนุญาตพิเศษ จึงไม่มีรายการที่สมบูรณ์ที่สุดของแท็กที่ไม่ได้รับอนุญาตทั้งหมด
อย่างไรก็ตาม [ข้อกำหนด AMP](/docs/reference/spec.html)
ระบุชุดแท็กที่ไม่ได้รับอนุญาตไว้กว้างๆ

### แอตทริบิวต์ที่จำเป็นขาดหายไป

<table>
   <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">MANDATORY_ATTR_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The mandatory attribute '%1' is missing in tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>เพิ่มแอตทริบิวต์ที่จำเป็นลงในแท็ก</td>
  </tr>
</table>

แอตทริบิวต์ที่จำเป็นสำหรับแท็ก AMP จะระบุไว้ใน
[ข้อกำหนดโปรแกรมตรวจสอบ AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)
เพียงค้นหาแท็ก
ดูแอตทริบิวต์ในรายการ
และตรวจดู `mandatory: true`
แอตทริบิวต์ที่จำเป็นสำหรับแท็ก AMP แต่ละรายการจะแสดงอยู่
ในข้อกำหนดของแท็กด้วย

### ค่าแอตทริบิวต์ไม่ถูกต้อง

<table>
   <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">INVALID_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>แก้ไขค่าแอตทริบิวต์เป็นค่าที่ถูกต้อง</td>
  </tr>
</table>

ข้อผิดพลาดนี้ระบุว่าแท็ก HTML มีแอตทริบิวต์ที่มีชื่อที่อนุญาต
แต่มีค่าที่ไม่อนุญาต
ตัวอย่างเช่น ทริกเกอร์หนึ่งที่พบบ่อยสำหรับข้อผิดพลาดนี้คือค่า URL ที่ไม่ถูกต้อง
ค่า URL ทั้งหมด (ในแอตทริบิวต์ `href` และ `src`) ต้องตรงกับ
[ค่าแอตทริบิวต์ที่เป็นไปได้](http://www.w3schools.com/tags/att_a_href.asp)เหล่านี้

<strong>สำคัญ:</strong> ค่า URL หลายค่าใน AMP ต้องใช้ HTTPS
หากคุณได้รับข้อผิดพลาดนี้ และไม่ทราบว่าเพราะอะไร
ให้ตรวจสอบข้อกำหนดของแท็ก AMP ที่เกี่ยวข้อง
เพื่อดูว่าแอตทริบิวต์ต้องใช้ HTTPS หรือไม่

### แอตทริบิวต์ไม่ได้รับอนุญาต

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">DISALLOWED_ATTR</span></td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The attribute '%1' may not appear in tag '%2'."</span></td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำแอตทริบิวต์ดังกล่าวออกจากแท็ก HTML</td>
  </tr>
</table>

แอตทริบิวต์มีรายการที่อนุญาตพิเศษ จึงไม่มีรายการที่สมบูรณ์ที่สุดของแอตทริบิวต์ที่ไม่ได้รับอนุญาตทั้งหมด
ในการตรวจสอบแอตทริบิวต์ที่ใช้ได้สำหรับแท็กที่เจาะจงแต่ละรายการ
ให้ค้นหาแท็ก HTML จากนั้น `attrs`
ใน[ข้อกำหนดโปรแกรมตรวจสอบ AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)

นอกเหนือจากรายการที่อนุญาตพิเศษของแอตทริบิวต์เฉพาะของแต่ละแท็ก
แท็ก AMP ทั้งหมดสามารถใช้แอตทริบิวต์ใดก็ตามที่ได้รับอนุญาตพิเศษในส่วน `$GLOBAL_ATTRS`
โดยแอตทริบิวต์ทั้งหมดที่มี `"data-"` นำหน้ายังได้รับอนุญาตพิเศษด้วย

### ข้อความที่จำเป็นขาดหายไปหรือไม่ถูกต้อง

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">MANDATORY_CDATA_MISSING_OR_INCORRECT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>เพิ่มหรือแก้ไขข้อความที่จำเป็นภายในแท็ก</td>
  </tr>
</table>

CDATA คือข้อมูลเนื้อหาระหว่างแท็ก HTML เริ่มต้นและสิ้นสุด
และขณะนี้มีการประเมินกับรายการที่อนุญาตพิเศษและบัญชีดำ
แท็กที่มี CDATA ที่จำเป็นประกอบด้วย

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

และ

[sourcecode:html]
<style amp-custom>
[/sourcecode]

ข้อความโดยละเอียดของข้อผิดพลาดนี้อาจเป็นข้อใดข้อหนึ่งต่อไปนี้

* "Mandatory style boilerplate (js enabled)"
* "Mandatory style boilerplate (noscript)"
* "Disallowed -amp- CSS class name prefix"
* "Disallowed !important attribute in CSS"
* "Disallowed @charset in CSS"
* "Disallowed @import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
* "Disallowed @viewport in CSS"

### ข้อความภายในแท็กไม่ได้รับอนุญาต

<table>
   <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">CDATA_VIOLATES_BLACKLIST</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำข้อความที่ไม่ได้รับอนุญาตออก</td>
  </tr>
</table>

ข้อมูล CSS บางอย่างถูกขึ้นบัญชีดำ
เพื่อตรวจสอบความถูกต้องของกฎ CSS AMP ที่สำคัญ

ต่อไปนี้คือรายการข้อมูล CSS ที่ขึ้นบัญชีดำ
(ดู [`blacklisted_cdata_regex` ในข้อกำหนดโปรแกรมตรวจสอบ AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) เพิ่มเติม)

* `"\\.i?-amp-"` ("คำนำหน้าชื่อคลาส CSS -amp-")
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### พร็อพเพอร์ตี้ภายในแอตริบิวต์ในแท็กไม่ได้รับอนุญาต

<table>
   <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">DISALLOWED_PROPERTY_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The property '%1' in attribute '%2' in tag '%3' is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำพร็อพเพอร์ตี้ที่ไม่ได้รับอนุญาตในแอตทริบิวต์ที่ระบุออก</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อชื่อพร็อพเพอร์ตี้ภายในแอตทริบิวต์ไม่ได้รับอนุญาต
คำว่าพร็อพเพอร์ตี้ในบริบทนี้หมายถึงข้อมูลคีย์/ค่าที่มีโครงสร้างภายในแอตทริบิวต์
ตัวอย่างเช่น ใน
`<meta name="viewport content="width=device-width;minimum-scale=1">`
`width` และ `minimum-scale` คือชื่อพร็อพเพอร์ตี้

โค้ดต่อไปนี้ทำให้เกิดข้อผิดพลาด DISALLOWED_PROPERTY_IN_ATTR_VALUE

`<meta name="viewport content="width=device-width;invalidfoo=1">`

ต่อไปนี้คืออีกตัวอย่างหนึ่ง
ที่ทำให้เกิดข้อผิดพลาด

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

ควรจะเป็น `<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### ค่าพร็อพเพอร์ตี้ไม่ถูกต้อง

<table>
   <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>แก้ไขค่าพร็อพเพอร์ตี้ที่ไม่ถูกต้อง</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อค่าพร็อพเพอร์ตี้ภายในแอตทริบิวต์ไม่ถูกต้อง
คำว่าพร็อพเพอร์ตี้ในบริบทนี้หมายถึงข้อมูลคีย์/ค่าที่มีโครงสร้างภายในแอตทริบิวต์
ตัวอย่างเช่น ใน
`<meta name="viewport content="width=device-width;minimum-scale=1">`
`device-width` และ `1` คือค่าพร็อพเพอร์ตี้

โค้ดต่อไปนี้ทำให้เกิดข้อผิดพลาด INVALID_PROPERTY_VALUE_IN_ATTR_VALUE

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

ต่อไปนี้คืออีกตัวอย่างหนึ่ง
ที่ทำให้เกิดข้อผิดพลาด

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

ควรจะเป็น `<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### URL ขาดหายไป

<table>
  <tr>
    <td class="col-thirty"><strong>รหัส</strong></td>
    <td><span class="notranslate">MISSING_URL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>รูปแบบ</strong></td>
    <td><span class="notranslate">"Missing URL for attribute '%1' in tag '%2'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>แก้ไข</strong></td>
    <td>เพิ่ม URL ที่ถูกต้อง</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อพบแอตทริบิวต์ที่ต้องใช้ URL ขาดหายไป
ตัวอย่างเช่น แอตทริบิวต์ `href` หรือ `src` ที่ว่างเปล่า

### URL ไม่ถูกต้อง

<table>
  <tr>
    <td class="col-thirty"><strong>รหัส</strong></td>
    <td><span class="notranslate">INVALID_URL_PROTOCOL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>รูปแบบ</strong></td>
    <td><span class="notranslate">"Malformed URL '%3' for attribute '%1' in tag '%2'"</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>แก้ไข</strong></td>
    <td>แก้ไข URL ที่ใช้ไม่ได้</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อแอตทริบิวต์มี URL
แต่ URL นั้นไม่ถูกต้อง

### โปรโตคอล URL ไม่ถูกต้อง

<table>
  <tr>
    <td class="col-thirty"><strong>รหัส</strong></td>
    <td><span class="notranslate">INVALID_URL_PROTOCOL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>รูปแบบ</strong></td>
    <td><span class="notranslate">Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>แก้ไข</strong></td>
    <td>เปลี่ยนแปลงโปรโตคอลที่ถูกต้อง ตัวอย่างเช่น `http` อาจต้องเป็น `https`</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นสำหรับแท็กที่มี `href` หรือ `src`
ซึ่งต้องตั้งค่าเป็นโปรโตคอลที่เจาะจง
ตัวอย่างเช่น แท็กหลายรายการต้องใช้ `https`

### พร็อพเพอร์ตี้ที่จำเป็นขาดหายไปจากแอตทริบิวต์

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The property '%1' is missing from attribute '%2' in tag '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>เพิ่มพร็อพเพอร์ตี้ที่ขาดหายไป</td>
  </tr>
</table>

ขณะนี้ข้อผิดพลาดนี้จะเกิดขึ้นหากพร็อพเพอร์ตี้ที่จำเป็นต่อไปนี้ขาดหายไป

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

พร็อพเพอร์ตี้ดังกล่าวอ้างอิงแท็กที่คาดหวังไว้ ดังนี้

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### มีแอตทริบิวต์ที่ใช้พร้อมกันไม่ได้

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">MUTUALLY_EXCLUSIVE_ATTRS</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำแอตทริบิวต์ที่ใช้พร้อมกันไม่ได้รายการใดรายการหนึ่งออก</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อพบแท็กหนึ่งมีแอตทริบิวต์ที่ใช้พร้อมกันไม่ได้ทั้ง 2 รายการ
ตัวอย่างเช่น อนุญาตให้มีแอตทริบิวต์เพียง 1 รายการสำหรับแท็กต่อไปนี้

* [amp-twitter](/docs/reference/extended/amp-twitter.html): `data-tweetid` หรือ `src`
* [amp-instagram](/docs/reference/extended/amp-instagram.html): `data-shortcode` หรือ `src`
* [amp-iframe](/docs/reference/extended/amp-iframe.html): `src` หรือ `srcdoc`
* [amp-youtube](/docs/reference/extended/amp-youtube.html): `src` หรือ `data-videoid`

### แอตทริบิวต์ที่จำเป็นขาดหายไปจากรายการ

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">MANDATORY_ONEOF_ATTR_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The tag '%1' is missing a mandatory attribute - pick one of %2." </span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>เพิ่มแอตทริบิวต์ที่จำเป็นที่ขาดหายไปจากตัวเลือกแอตทริบิวต์ที่มีให้</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อพบแท็กหนึ่งไม่มีแอตทริบิวต์ที่ต้องใช้ 1 รายการ
จากตัวเลือกหลายรายการ
ตัวอย่างเช่น แท็กเหล่านี้ต้องใช้แอตทริบิวต์ 1 รายการจาก 2 ตัวเลือกที่เป็นไปได้ ดังนี้

* [amp-twitter](/docs/reference/extended/amp-twitter.html): `data-tweetid` หรือ `src`
* [amp-instagram](/docs/reference/extended/amp-instagram.html): `data-shortcode` หรือ `src`
* [amp-iframe](/docs/reference/extended/amp-iframe.html): `src` หรือ `srcdoc`
* [amp-youtube](/docs/reference/extended/amp-youtube.html): `src` หรือ `data-videoid`

### แท็กระดับบนสุดไม่ถูกต้อง

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">WRONG_PARENT_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The parent tag of tag '%1' is '%2', but it can only be '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>ทำให้แท็กดังกล่าวเป็นแท็กย่อยโดยตรงของแท็กระดับบนสุดที่กำหนด</td>
  </tr>
</table>

แท็กบางรายการต้องมีระดับบนสุดที่อยู่เหนือขึ้นไปโดยตรง (ที่ไม่ใช่ระดับบนสุดที่อยู่เหนือขึ้นไปหลายขั้น)
รายการต่อไปนี้แสดงระดับบนสุดที่จำเป็นสำหรับแท็กต่างๆ
(แท็ก ระดับบนสุด)

* `!doctype` ต้องใช้แท็กระดับบนสุด `root`
* `html` ต้องใช้แท็กระดับบนสุด `!doctype`
* `head` ต้องใช้แท็กระดับบนสุด `html`
* `body` ต้องใช้แท็กระดับบนสุด `html`
* `link` ต้องใช้แท็กระดับบนสุด `head`
* `meta` ต้องใช้แท็กระดับบนสุด `head`
* `style amp-custom` ต้องใช้แท็กระดับบนสุด `head`
* `style` ต้องใช้แท็กระดับบนสุด `boilerplate (noscript)`
* `noscript` ต้องใช้แท็กระดับบนสุด `head`
* `script` ต้องใช้แท็กระดับบนสุด `head`
* `source` ต้องใช้แท็กสื่อ (`amp-audio`, `amp-video` ฯลฯ)

### แท็กซ้อนระดับบนสุดไม่ได้รับอนุญาต

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">DISALLOWED_TAG_ANCESTOR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The tag '%1' may not appear as a descendant of tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำออก (หรือย้าย) แท็กซ้อนที่ไม่ได้รับอนุญาต</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อพบว่าแท็กเป็นแท็กซ้อนย่อยของอีกแท็กหนึ่ง
ซึ่งไม่ผ่านการตรวจสอบความถูกต้อง
ขณะนี้ตัวอย่างเดียวที่มีคือแท็ก `template`
ซึ่งอาจไม่ได้ซ้อนอยู่ใต้แท็ก `template` อีกแท็กหนึ่ง

### แท็กซ้อนระดับบนสุดที่จำเป็น

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_ANCESTOR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The tag '%1' may only appear as a descendant of tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำแท็กออกหรือทำให้แท็กเป็นแท็กซ้อนย่อยของแท็กที่เจาะจง</td>
  </tr>
</table>

แท็กซ้อนย่อยที่จำเป็นจะกำหนดไว้ใน
[ข้อกำหนดโปรแกรมตรวจสอบ AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)
เป็น `mandatory_ancestor`

ข้อผิดพลาดนี้เกิดขึ้นเมื่อแท็กต่อไปนี้
ไม่มี `mandatory_ancestor` (แท็ก แท็กซ้อนระดับบนสุด)

* `img` ต้องเป็นแท็กซ้อนย่อยของ `noscript`
* `video` ต้องเป็นแท็กซ้อนย่อยของ `noscript`
* `audio` ต้องเป็นแท็กซ้อนย่อยของ `noscript`
* `noscript` ต้องเป็นแท็กซ้อนย่อยของ `body`

### แท็กซ้อนระดับบนสุดที่จำเป็นพร้อมคำแนะนำ

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_ANCESTOR_WITH_HINT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำแท็กออก ทำให้แท็กเป็นแท็กซ้อนย่อยของแท็กที่เจาะจง หรือเปลี่ยนแท็กดังกล่าวเป็นแท็กที่มีคำแนะนำ</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อพบแท็กใดแท็กหนึ่งต่อไปนี้ในเอกสาร AMP
และแท็กนั้นไม่ได้ซ้อนอยู่ในระดับบนสุดที่จำเป็นอย่างถูกต้อง

* `img` ไม่ได้อยู่ใน `noscript` ระดับบนสุด
* `video` ไม่ได้อยู่ใน `noscript` ระดับบนสุด
* `audio` ไม่ได้อยู่ใน `noscript` ระดับบนสุด
* `noscript` ไม่ได้อยู่ใน `body` ระดับบนสุด

### มีรายการซ้ำของแท็กที่ไม่ซ้ำกัน

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">DUPLICATE_UNIQUE_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The tag '%1' appears more than once in the document."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำแท็กที่ซ้ำกันรายการหนึ่งออกจากเอกสาร AMP</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่ออนุญาตให้มีแท็กได้ 1 ครั้ง
และพบแท็กซ้ำ

รายการแท็กที่ไม่ซ้ำทั้งหมดมีดังนี้

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://cdn.ampproject.org/v0.js">`

## ข้อผิดพลาดด้านสไตล์และการออกแบบ

ก่อนจะเจาะลึกเกี่ยวกับข้อผิดพลาดด้านสไตล์และการออกแบบ
คุณควรทราบวิธีการทำงานของ
[สไตล์](/th/docs/guides/author-develop/responsive/style_pages.html)และ
[การออกแบบ](/th/docs/guides/author-develop/responsive/control_layout.html)ใน AMP
เนื่องจากหน้า AMP เป็นหน้า HTML สไตล์จึงจะเหมือนกับหน้า HTML ทั่วไป
แต่มีข้อจำกัดบางอย่างเพื่อดูแลให้หน้าโหลดได้เร็ว
และโปรแกรมตรวจสอบ AMP จะบังคับใช้ข้อจำกัดเหล่านี้

การออกแบบมีการควบคุมมากกว่าในหน้า AMP
แท็กที่แสดงในหน้า
ต้องกำหนดความสูงและความกว้างไว้ล่วงหน้า
ซึ่งจะช่วยลดความยุ่งยากในการแสดงผลและการเลื่อน
และไม่ได้หมายความว่าคุณจะต้องรวมแอตทริบิวต์เหล่านี้ด้วยตนเอง
สำหรับการออกแบบที่เจาะจงแต่ละประเภท
โปรแกรมตรวจสอบ AMP จะไม่แสดงข้อผิดพลาด
เนื่องจากคาดว่าจะมีการใช้ค่าเริ่มต้น

แท็ก AMP แต่ละรายการมีรายการ `supported_layouts`
ตามที่ระบุไว้ใน
[ข้อกำหนดโปรแกรมตรวจสอบ AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)
โปรแกรมตรวจสอบจะแสดงข้อผิดพลาดสำหรับการออกแบบที่ไม่รองรับ
และจะตรวจสอบกฎของการตรวจสอบความถูกต้องสำหรับการออกแบบที่กำหนดไว้ล่วงหน้า

### สไตล์ชีตยาวเกินไป

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">STYLESHEET_TOO_LONG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>ลดขนาดของสไตล์ชีตเพื่อให้เล็กกว่า 50,000 ไบต์</td>
  </tr>
</table>

โปรแกรมตรวจสอบ AMP จะแสดงข้อผิดพลาดนี้
เมื่อวัดขนาดของเนื้อหาสไตล์
ภายใน `<style amp-custom>` แล้วพบว่ามีขนาดเกิน 50,000 ไบต์ที่กำหนดไว้

### ข้อผิดพลาดด้านไวยากรณ์ CSS

<table>
   <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">CSS_SYNTAX</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"CSS syntax error in tag '%1' - %2."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>แก้ไขข้อผิดพลาดด้านไวยากรณ์ CSS</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อคุณมีข้อผิดพลาดด้านไวยากรณ์ CSS
ในแท็กที่ระบุ
หากคุณไม่แน่ใจว่าสาเหตุของข้อผิดพลาดคืออะไร
ให้ลองเรียกใช้ CSS
ผ่านโปรแกรมตรวจสอบ CSS ออนไลน์ ตัวอย่างเช่น
[csslint](http://csslint.net/)

### ข้อผิดพลาดด้านไวยากรณ์ CSS ในบางกฎ

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">CSS_SYNTAX_INVALID_AT_RULE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>แก้ไขข้อผิดพลาดไวยากรณ์ CSS ที่ระบุ</td>
  </tr>
</table>

ข้อผิดพลาดนี้อ้างอิงถึง @-กฎ ภายใน CSS
ซึ่ง AMP อนุญาตกฎเพียงจำนวนหนึ่งเท่านั้น
(ดู[ข้อกำหนด AMP](/docs/reference/spec.html) เพิ่มเติม)
ตัวอย่างเช่น ไม่อนุญาตให้ใช้ `@import`
ข้อผิดพลาดในการตรวจสอบความถูกต้อง
จะบอกให้คุณทราบถึงกฎที่ไม่ถูกต้องอย่างเจาะจง
ซึ่งจะช่วยให้แก้ไขกฎนั้นได้ง่ายขึ้น

### แท็ก AMP ไม่รองรับการออกแบบที่บอกเป็นนัย

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">IMPLIED_LAYOUT_INVALID</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The implied layout '%1' is not supported by tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>ระบุแอตทริบิวต์การออกแบบที่ถูกต้องสำหรับแท็ก</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อคุณไม่ระบุการออกแบบสำหรับแท็ก AMP
และไม่มีการรองรับการออกแบบที่บอกเป็นนัย (อิงตามความกว้าง ความสูง และขนาด)
ตรวจสอบค่า `supported_layout` ของแท็ก
ใน[ข้อกำหนดโปรแกรมตรวจสอบ AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)

ลักษณะการทำงานของการออกแบบจริงจะกำหนดโดยแอตทริบิวต์ `layout`
สำหรับข้อมูลเพิ่มเติมเกี่ยวกับวิธีการทำงานของการออกแบบ
โปรดอ่าน[วิธีควบคุมการออกแบบ](/th/docs/guides/author-develop/responsive/control_layout.html)และ
[ข้อกำหนดของระบบการออกแบบ AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md)

**หมายเหตุ:** หากคุณไม่ระบุการออกแบบ
และคุณไม่ได้รวมค่า `width` และ `height`
การออกแบบจะมีค่าเริ่มต้นเป็นคอนเทนเนอร์
โปรแกรมตรวจสอบจะแสดงข้อผิดพลาด
เนื่องจากไม่มีการสนับสนุนคอนเทนเนอร์ในแท็ก AMP ใดๆ
โปรดระบุการออกแบบที่ไม่ใช่คอนเทนเนอร์
หรือเพิ่มค่า `width` และ/หรือ `height` แล้วข้อผิดพลาดจะหมดไป

### แอตทริบิวต์ไม่ได้รับอนุญาตจากการออกแบบที่บอกเป็นนัย

<table>
  <tr>
    <td class="col-thirty"><strong>รหัส</strong></td>
    <td><span class="notranslate">ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>รูปแบบ</strong></td>
    <td><span class="notranslate">"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>แก้ไข</strong></td>
    <td>นำแอตทริบิวต์ที่ไม่ได้รับอนุญาตออกจากแท็ก
      หรือระบุการออกแบบที่อนุญาตแอตทริบิวต์ดังกล่าว</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อคุณไม่ระบุการออกแบบสำหรับแท็ก AMP
และการออกแบบที่บอกเป็นนัยมีแอตทริบิวต์ที่ไม่ได้รับอนุญาต
แอตทริบิวต์ที่ไม่ได้รับอนุญาตสำหรับประเภทการออกแบบที่อธิบายไว้ใน
[ข้อกำหนดของระบบการออกแบบ AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md)

### แท็ก AMP ไม่รองรับการออกแบบที่ระบุ

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">SPECIFIED_LAYOUT_INVALID</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The specified layout '%1' is not supported by tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>ระบุการออกแบบที่แท็กรองรับ</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อไม่มีการรองรับ
การออกแบบที่ระบุสำหรับแท็ก
ตรวจสอบค่า `supported_layout` ของแท็ก
ใน[ข้อกำหนดโปรแกรมตรวจสอบ AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)

ลักษณะการทำงานของการออกแบบจริงจะกำหนดโดยแอตทริบิวต์ `layout`
สำหรับข้อมูลเพิ่มเติมเกี่ยวกับวิธีการทำงานของการออกแบบ
โปรดอ่าน[วิธีควบคุมการออกแบบ](/th/docs/guides/author-develop/responsive/control_layout.html)และ
[ข้อกำหนดของระบบการออกแบบ AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md)

### แอตทริบิวต์ไม่ได้รับอนุมัติจากการออกแบบที่ระบุ

<table>
  <tr>
    <td class="col-thirty"><strong>รหัส</strong></td>
    <td><span class="notranslate">ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>รูปแบบ</strong></td>
    <td><span class="notranslate">"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>แก้ไข</strong></td>
    <td>นำแอตทริบิวต์ที่ไม่ได้รับอนุญาตออกจากแท็ก
      หรือระบุการออกแบบที่อนุญาตแอตทริบิวต์ดังกล่าว</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อคุณระบุการออกแบบสำหรับแท็ก AMP
และการออกแบบมีแอตทริบิวต์ที่ไม่ได้รับอนุญาต
แอตทริบิวต์ที่ไม่ได้รับอนุญาตสำหรับประเภทการออกแบบที่อธิบายไว้ใน
[ข้อกำหนดของระบบการออกแบบ AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md)

### ค่าที่ไม่ถูกต้องสำหรับแอตทริบิต์ที่ต้องใช้ในการออกแบบ

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">ATTR_VALUE_REQUIRED_BY_LAYOUT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>กำหนดแอตทริบิวต์เป็นค่าที่ระบุ</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นเมื่อค่าแอตทริบิวต์ไม่ถูกต้องสำหรับการออกแบบที่ระบุ
หากต้องการทราบสิ่งที่ทำให้เกิดข้อผิดพลาดนี้
คุณต้องทำความคุ้นเคยกับ
[ลักษณะการทำงานที่ต่างกันของการออกแบบ](/th/docs/guides/author-develop/responsive/control_layout.html)

สมมติว่าคุณตั้งค่าการออกแบบเป็น `fixed-height` และ
คุณรวมค่าที่เป็นตัวเลขทั้งสำหรับ `height` และ `width`
การออกแบบ `fixed-height` จะใช้ค่า `height`
โดยจะต้องไม่มีแอตทริบิวต์ `width` หรือตั้งค่าเป็น `auto`
โปรแกรมตรวจสอบจะแสดง ATTR_VALUE_REQUIRED_BY_LAYOUT

### หน่วยของความกว้างและความสูงไม่สอดคล้องกัน

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>ระบุความกว้างและความสูงที่สอดคล้องกัน</td>
  </tr>
</table>

ข้อยกเว้นของ `layout=fixed`
ทำให้แอตทริบิวต์ความกว้างและความสูงต้องแสดงเป็นหน่วยเดียวกัน
ข้อผิดพลาดนี้จะเกิดขึ้นเมื่อหน่วยไม่เหมือนกัน

ตัวอย่างเช่น `<amp-img src="" layout="responsive" width="42px" height="42rem">`
ทำให้เกิดข้อความแสดงข้อผิดพลาดนี้

"หน่วยวัดความกว้างและความสูงในแท็ก "amp-img" ไม่สอดคล้องกัน โดยความกว้างระบุเป็นหน่วย "px" ขณะที่ความสูงระบุเป็น "rem""

## ข้อผิดพลาดในการกำหนดเทมเพลต

หน้า AMP ต้องไม่รวมไวยากรณ์การกำหนดเทมเพลต
เว้นแต่ไวยากรณ์ดังกล่าวอยู่ในแท็ก AMP ซึ่งออกแบบมา
ให้รวมเทมเพลตไว้โดยเฉพาะ เช่น
[amp-mustache](/docs/reference/extended/amp-mustache.html)

คุณสามารถรวมเทมเพลตในไฟล์ซอร์ส
ตราบใดที่เอาต์พุตที่สร้างขึ้นจากไฟล์เหล่านั้นไม่มีเทมเพลต
(ดู
[ใช้โปรแกรมประมวลผล CSS ล่วงหน้า](//th/docs/guides/author-develop/responsive/style_pages.html)เพิ่มเติม)

### แอตทริบิวต์มีไวยากรณ์เทมเพลต

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">TEMPLATE_IN_ATTR_NAME</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"Mustache template syntax in attribute name '%1' in tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำไวยากรณ์เทมเพลต Mustache ออกจากแอตทริบิวต์</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นทุกครั้งที่โปรแกรมตรวจสอบพบ
[ไวยากรณ์เทมเพลต Mustache](https://mustache.github.io/mustache.5.html)
ในค่าแอตทริบิวต์

### แอตทริบิวต์มีไวยากรณ์เทมเพลตที่ไม่ได้ใช้ Escape

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">UNESCAPED_TEMPLATE_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>ใช้ Escape กับเทมเพลต Mustache</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นทุกครั้งที่โปรแกรมตรวจสอบพบ
[ไวยากรณ์เทมเพลต Mustache ที่ไม่ได้ใช้ Escape](https://mustache.github.io/mustache.5.html)
ในค่าแอตทริบิวต์

### แอตทริบิวต์มีเทมเพลตบางส่วน

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">TEMPLATE_PARTIAL_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำ Mustache บางส่วนออก</td>
  </tr>
</table>

ข้อผิดพลาดนี้เกิดขึ้นทุกครั้งที่โปรแกรมตรวจสอบพบ
[Mustache บางส่วน](https://mustache.github.io/mustache.5.html)
ในค่าแอตทริบิวต์

## ข้อผิดพลาดของการเลิกใช้งาน

### แท็กที่เลิกใช้งาน

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">DEPRECATED_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">No error message defined as yet (no deprecated tags).</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>นำแท็กที่เลิกใช้งานออก</td>
  </tr>
</table>

คำเตือนนี้ปรากฏขึ้นเมื่อพบแท็ก AMP ที่เคยใช้ได้ก่อนหน้านี้ในเอกสาร AMP
นี่เป็นเพียงแค่คำเตือน เอกสาร AMP ที่มีคำเตือนจะยังใช้งานได้
ขณะนี้ยังไม่มีแท็กที่เลิกใช้งาน คำเตือนจึงมีไว้สำหรับการเลิกใช้งานในอนาคต

### แอตทริบิวต์ที่เลิกใช้งาน

<table>
  <tr>
  	<td class="col-thirty"><strong>รหัส</strong></td>
  	<td><span class="notranslate">DEPRECATED_ATTR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>รูปแบบ</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>แก้ไข</strong></td>
  	<td>แนวทางปฏิบัติที่แนะนำคือ นำแอตทริบิวต์ที่เลิกใช้งานออก</td>
  </tr>
</table>

คำเตือนนี้ปรากฏขึ้นเมื่อพบแอตทริบิวต์ AMP ที่เคยใช้ได้ก่อนหน้านี้ในเอกสาร AMP
นี่เป็นเพียงแค่คำเตือน เอกสาร AMP ที่มีคำเตือนจะยังใช้งานได้

ระบุแอตทริบิวต์ที่เลิกใช้งานสำหรับแท็ก AMP แต่ละรายการ
โดยค้นหา `deprecation` ใน
[ข้อกำหนดโปรแกรมตรวจสอบ AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)
</body>
</html>

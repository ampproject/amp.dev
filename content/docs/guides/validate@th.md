---
$title: ตรวจสอบหน้า AMP
---

จุดแข็งที่สำคัญของ AMP ไม่ใช่แค่การทำให้หน้าเว็บของคุณทำงานได้รวดเร็ว แต่คือการทำให้หน้าเว็บทำงานรวดเร็วโดยที่สามารถ*ตรวจสอบความถูกต้อง*ได้ด้วย ซึ่งจุดแข็งนี้ทำให้บุคคลที่สามอย่างเช่น Twitter, Instagram หรือ Google Search สามารถแสดงหน้า AMP แก่ผู้อ่านด้วยวิธีต่างๆ ที่น่าสนใจมากขึ้น

## ฉันจะตรวจสอบว่าหน้าเว็บของฉันเป็น AMP ที่ถูกต้องได้อย่างไร

วิธีตรวจสอบเอกสาร AMP มีหลายวิธีด้วยกัน ทุกวิธีจะให้
ผลลัพธ์ที่เหมือนกันทุกประการ ดังนั้นโปรดใช้วิธีที่เหมาะกับรูปแบบการพัฒนา
ของคุณมากที่สุด

นอกจากนี้ ในการตรวจสอบความถูกต้องของ AMP คุณอาจต้องการตรวจสอบด้วยว่าแพลตฟอร์มของบุคคลที่สามสามารถ[ค้นพบ](/th/docs/guides/deploy/discovery.html)เอกสาร AMP ของคุณได้

### Developer Console ของเบราว์เซอร์

เครื่องมือตรวจสอบ AMP มาพร้อมกับไลบรารี JS ของ AMP จึงมีให้ใช้งานในหน้า AMP ทุกหน้าอยู่แล้วตั้งแต่แรก วิธีตรวจสอบมีดังนี้

  1. เปิดหน้า AMP ในเบราว์เซอร์
  1. เติม "`#development=1`" ต่อท้าย URL ตัวอย่างเช่น `http://localhost:8000/released.amp.html#development=1`
  1. เปิด[คอนโซล Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) และตรวจหาข้อผิดพลาดในการตรวจสอบ

ข้อผิดพลาดใน Developer Console จะมีลักษณะตามด้านล่างนี้

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" alt="จับภาพหน้าจอข้อผิดพลาดที่ได้จากเครื่องมือตรวจสอบ AMP ใน Developer Console ของ Chrome" layout="responsive"></amp-img>


### เว็บอินเทอร์เฟซ

เครื่องมือตรวจสอบ AMP สามารถใช้เป็นเว็บอินเทอร์เฟซได้ที่
[validator.ampproject.org](https://validator.ampproject.org/) อินเทอร์เฟซ
นี้จะแสดงข้อผิดพลาดแบบแสดงในบรรทัดควบคู่ไปกับซอร์ส HTML ของหน้าเว็บ
และเนื่องจากอินเทอร์เฟซนี้เป็นตัวแก้ไขแบบอินเทอร์แอกทีฟ การเปลี่ยนแปลงซอร์ส HTML จะแสดงผลลัพธ์เมื่อทำการตรวจสอบซ้ำอีกครั้งในแบบอินเทอร์แอกทีฟ

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" alt="จับภาพหน้าจอ validator.ampproject.org ที่มีตัวอย่างข้อผิดพลาด" layout="responsive"></amp-img>


### ส่วนขยายของเบราว์เซอร์

คุณสามารถใช้ส่วนขยายของเบราว์เซอร์เพื่อเข้าถึงเครื่องมือตรวจสอบ AMP ได้โดยตรง
จากแถบเครื่องมือของเบราว์เซอร์ เมื่อคุณเรียกดู เครื่องมือจะตรวจสอบหน้า AMP แต่ละหน้าที่เข้าชมโดยอัตโนมัติและบ่งบอกความถูกต้องของหน้าเว็บด้วยไอคอนที่มีสีต่างๆ

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" alt="ไอคอน AMP สีแดงบ่งบอกว่าเอกสาร AMP ไม่ถูกต้อง" layout="fixed"></amp-img>
      
    </td>
    <td>เมื่อมีข้อผิดพลาดในหน้า AMP ไอคอนของส่วนขยายจะ
      เป็นสีแดงและแสดงจำนวนข้อผิดพลาดที่พบ
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" alt="ไอคอน AMP สีเขียวบ่งบอกว่าเอกสาร AMP ถูกต้อง" layout="fixed"></amp-img>
      
    </td>
    <td>เมื่อไม่มีข้อผิดพลาดในหน้า AMP ไอคอนจะเป็น
      สีเขียวและแสดงจำนวนคำเตือน หากมี
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" alt="ไอคอน AMP สีน้ำเงินบ่งบอกเวอร์ชันของ AMP HTML เมื่อคลิก" layout="fixed"></amp-img>
      
    </td>
    <td>เมื่อหน้านั้นไม่ใช่หน้า AMP แต่บ่งชี้ว่ามีเวอร์ชัน AMP
      ให้ใช้งาน ไอคอนจะเป็นสีน้ำเงินพร้อมแสดงไอคอนลิงก์ เมื่อคลิก
      ส่วนขยาย ระบบจะเปลี่ยนเส้นทางเบราว์เซอร์ไปยังเวอร์ชัน AMP
    </td>
  </tr>
</table>

ส่วนขยายของเครื่องมือตรวจสอบ AMP สำหรับ
[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) และ [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)

### เครื่องมือบรรทัดคำสั่ง

คุณอาจต้องติดตั้ง <a href="https://docs.npmjs.com/getting-started/installing-node">Node.js พร้อมด้วยตัวจัดการแพ็กเกจ `npm` 
ในระบบของคุณ</a> ซึ่งเป็นสิ่งหนึ่งที่ต้องมีก่อนดำเนินการ

ในการติดตั้ง[เครื่องมือบรรทัดคำสั่งของเครื่องมือตรวจสอบ AMP HTML](https://www.npmjs.com/package/amphtml-validator) ให้พิมพ์ `npm install -g amphtml-validator`

ตอนนี้เรามาลองตรวจสอบหน้า AMP HTML ที่แท้จริง

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

ไม่น่าแปลกใจที่หน้านี้เป็นซอร์ส AMP HTML ที่ถูกต้อง คราวนี้ลองใช้หน้า 
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) ซึ่งไม่ถูกต้อง ในการเรียกใช้คำสั่ง `amphtml-validator` คุณสามารถป้อน URL ของหน้าเว็บหรือชื่อไฟล์ในเครื่องก็ได้ ดาวน์โหลดและบันทึก [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) เป็นไฟล์หนึ่ง แล้วเรียกใช้ดังนี้

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

รูปแบบของข้อความแสดงข้อผิดพลาดประกอบด้วยชื่อไฟล์ บรรทัด คอลัมน์ และข้อความ
ซึ่งมักจะตามด้วยลิงก์ที่ไปยังข้อมูลอ้างอิง AMP HTML ตัวแก้ไขบางประเภท ซึ่งรวมถึง Emacs
(มองหาคำสั่งคอมไพล์และโหมดการคอมไพล์) สามารถแปลความหมายของรูปแบบนี้และให้
คุณข้ามไปที่ข้อผิดพลาดในไฟล์ต้นฉบับได้

เพื่อเป็นจุดเริ่มต้นที่ดีในการสร้างหน้า AMP ของคุณเอง ให้พิจารณาใช้ [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html) ดังนี้

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

เครื่องมือบรรทัดคำสั่งมีคุณลักษณะเพิ่มเติมบางอย่าง เช่น การปิดสี
 การพิมพ์เอาต์พุต JSON หรือการเรียกใช้ JavaScript ของเครื่องมือตรวจสอบในเวอร์ชันที่เจาะจง (โดยค่าเริ่มต้น จะเรียกใช้สคริปต์ที่เผยแพร่ล่าสุด)

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## จะเกิดอะไรขึ้นถ้าหน้าเว็บของฉันไม่ถูกต้อง

เครื่องมือตรวจสอบ AMP ไม่ได้อำนวยความสะดวกแก่คุณเฉพาะในระหว่างการพัฒนาเท่านั้น แต่แพลตฟอร์มต่างๆ อย่างเช่น Twitter หรือ Google ที่รวมหน้า AMP ของคุณเข้าไปในเนื้อหาและผลการค้นหาของตนจะใช้งานเครื่องมือดังกล่าวด้วย ยิ่งไปกว่านั้น โดยปกติแล้วแพลตฟอร์มดังกล่าวจะไม่ขอหน้าเว็บจากเซิร์ฟเวอร์ของคุณโดยตรง แต่จะใช้ Google AMP Cache ซึ่งเป็นบริการฟรีที่แคชหน้าเว็บและทำให้หน้าเว็บนั้นใช้งานได้ทั่วโลก หน้าดังกล่าวจึงโหลดได้เร็วขึ้นอีก

ถ้าบริการตรวจสอบ AMP ตรวจพบว่ามีบางอย่างในหน้าเว็บไม่ถูกต้อง เว็บไซต์ของบุคคลที่สามก็จะไม่พบและเผยแพร่หน้าดังกล่าว และหน้านั้นจะไม่ปรากฏใน Google AMP Cache ด้วย ดังนั้น ไม่เพียงแต่คุณจะไม่ได้รับประโยชน์จากความเร็วที่ได้จากแคช แต่มีแนวโน้มว่าจะไม่มีใครเห็นหน้าเว็บของคุณในที่ต่างๆ มากมายหลายแห่งด้วย ซึ่งเป็นเรื่องน่าเสียดาย จึงควรดูแลไม่ให้เหตุการณ์นี้เกิดขึ้น

## ฉันจะแก้ไขข้อผิดพลาดจากการตรวจสอบได้อย่างไร

ข้อผิดพลาดจากการตรวจสอบโดยส่วนใหญ่สามารถแก้ไขได้ง่าย ลองดูแท็ก HTML นี้

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

แท็กนี้ทำให้เกิดข้อผิดพลาดในการตรวจสอบ AMP นี้ ซึ่งแสดงในเครื่องมือต่างๆ เหล่านี้

* Developer Console ของเบราว์เซอร์
<amp-img alt="ข้อผิดพลาดเกี่ยวกับ AMP: แท็ก &quot;img&quot; อาจปรากฏเป็นเพียงรายการย่อยของแท็ก &quot;noscript&quot; เท่านั้น คุณหมายถึง &quot;amp-img&quot; ใช่ไหม บรรทัดที่ 11 คอลัมน์ที่ 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive"></amp-img>

* เว็บอินเทอร์เฟซ
<amp-img alt="ข้อผิดพลาดเกี่ยวกับ AMP: แท็ก &quot;img&quot; อาจปรากฏเป็นเพียงรายการย่อยของแท็ก &quot;noscript&quot; เท่านั้น คุณหมายถึง &quot;amp-img&quot; ใช่ไหม บรรทัดที่ 11 คอลัมน์ที่ 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive"></amp-img>

* ส่วนขยายของเบราว์เซอร์
<amp-img alt="ข้อผิดพลาดเกี่ยวกับ AMP: แท็ก &quot;img&quot; อาจปรากฏเป็นเพียงรายการย่อยของแท็ก &quot;noscript&quot; เท่านั้น คุณหมายถึง &quot;amp-img&quot; ใช่ไหม บรรทัดที่ 11 คอลัมน์ที่ 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive"></amp-img>

เครื่องมือแต่ละอย่างจะให้ข้อมูลในส่วนต่างๆ ดังนี้

1. ตำแหน่ง (บรรทัดและคอลัมน์) ในเอกสาร HTML ที่มีข้อผิดพลาด
     เกิดขึ้น ซึ่งสามารถคลิกได้ในบางอินเทอร์เฟซเพื่อไฮไลต์ตำแหน่งนั้น ในกรณี
     นี้ ปัญหาเกิดขึ้นในบรรทัดที่ 11 คอลัมน์ที่ 2
1. บรรทัดข้อความที่อธิบายข้อผิดพลาด ในกรณีนี้ ข้อความนี้บ่งบอกว่า
     เรากำลังใช้แท็ก `<img>` ในขณะที่ควรใช้แท็ก `<amp-img>`
1. ลิงก์ไปยังเอกสารที่เกี่ยวข้องกับข้อผิดพลาดนั้น ในกรณีนี้
     เป็นเอกสารสำหรับแท็ก `<amp-img>` อย่างไรก็ตาม จะมีเฉพาะข้อผิดพลาดบางส่วนเท่านั้นที่ระบบจะสร้าง
     ลิงก์ของเอกสาร

เมื่ออ่านข้อกำหนดจำเพาะอย่างละเอียดอีกครั้ง เราจะทราบว่าเราใช้แท็ก `<img>` ในขณะที่ควรใช้แท็ก `<amp-img>`

หากต้องการทำความเข้าใจรายการข้อผิดพลาดทั้งหมดที่อาจเกิดขึ้นได้
โปรดดู[คำแนะนำเกี่ยวกับข้อผิดพลาดในการตรวจสอบ AMP](/th/docs/reference/validation_errors.html)
หากคุณยังคงมีข้อสงสัยหลังจากที่ตรวจสอบอย่างละเอียดแล้ว โปรด<a href="http://stackoverflow.com/questions/tagged/amp-html">ถาม
คำถาม</a> เราจะพยายาม
ช่วยเหลือคุณ

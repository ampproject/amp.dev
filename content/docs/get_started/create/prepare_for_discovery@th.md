---
$title: เตรียมหน้าเว็บของคุณให้ผู้อื่นสามารถค้นหาได้และเพื่อเผยแพร่
---

ในบางกรณี คุณอาจต้องการให้มีหน้าเว็บเดียวกันทั้งในแบบ AMP และไม่ใช่ AMP เช่น บทความข่าว ให้พิจารณาว่า หาก Google Search พบหน้าเว็บดังกล่าวในแบบที่ไม่ใช่ AMP แล้ว ระบบจะทราบได้อย่างไรว่าคุณมีหน้าเว็บในแบบ AMP ด้วย

## การเชื่อมโยงหน้าเว็บด้วย &lt;link>

ในการแก้ไขปัญหานี้ เราได้เพิ่มข้อมูลเกี่ยวกับหน้า AMP ลงในหน้าที่ไม่ใช่ AMP และในทางกลับกันในรูปแบบแท็ก `<link>` ในส่วน `<head>`

เพิ่มข้อความต่อไปนี้ลงในหน้าที่ไม่ใช่ AMP

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

และข้อความต่อไปนี้ลงในหน้า AMP

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## จะเกิดอะไรขึั้นหากมีเว็บเพียงหน้าเดียว

หากคุณมีเว็บเพียงหน้าเดียว ซึ่งเป็นหน้า AMP คุณต้องเพิ่มลิงก์มาตรฐานลงในหน้าเว็บ ซึ่งจะนำไปที่หน้านั้นเองดังนี้

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<a class="go-button button" href="/th/docs/get_started/general/create/publish.html">ไปยังขั้นตอนที่ 6</a>

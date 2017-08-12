---
$title: ใส่รูปภาพ
---

แท็ก HTML ส่วนใหญ่สามารถนำไปใช้ใน AMP HTML ได้โดยตรง แต่สำหรับบางแท็ก เช่น แท็ก `<img>` จะถูกแทนที่ด้วยแท็ก AMP HTML แบบกำหนดเองที่เทียบเท่าหรือปรับปรุงเล็กน้อย (ซึ่งแท็กที่ไม่สามารถแสดงได้บางอย่างจะถูกห้ามแสดงในทันที ดู[ข้อกำหนดในการใช้แท็ก HTML](/th/docs/reference/spec.html))

หากต้องการทราบว่ามาร์กอัปเพิ่มเติมที่จำเป็นต้องใช้มีลักษณะอย่างไร โปรดดูโค้ดที่ใช้ในการฝังรูปภาพไว้ในหน้าเว็บด้านล่าง

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

หากต้องการทราบว่าเหตุใดเราจึงแทนที่แท็ก `<img>` ด้วย `<amp-img>` รวมถึงมีแท็กใดบ้างที่สามารถนำมาใช้แทนได้ โปรดไปที่[การใส่ Iframe และสื่อต่างๆ](/th/docs/guides/author-develop/amp_replacements.html)

<div class="prev-next-buttons">
  <a class="button prev-button" href="/th/docs/tutorials/create/basic_markup.html"><span class="arrow-prev">ก่อนหน้า</span></a>
  <a class="button next-button" href="/th/docs/tutorials/create/presentation_layout.html"><span class="arrow-next">ถัดไป</span></a>
</div>


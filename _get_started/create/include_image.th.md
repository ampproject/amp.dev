---
layout: page
title: ใส่รูปภาพ
order: 1
locale: th
---

แท็ก HTML ส่วนใหญ่สามารถนำไปใช้ใน AMP HTML ได้โดยตรง แต่สำหรับบางแท็ก เช่น แท็ก `<img>` จะถูกแทนที่ด้วยแท็ก AMP HTML แบบกำหนดเองที่เทียบเท่าหรือปรับปรุงเล็กน้อย (ซึ่งแท็กที่ไม่สามารถแสดงได้บางอย่างจะถูกห้ามแสดงในทันที ดู[ข้อกำหนดในการใช้แท็ก HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md))

หากต้องการทราบว่ามาร์กอัปเพิ่มเติมที่จำเป็นต้องใช้มีลักษณะอย่างไร โปรดดูโค้ดที่ใช้ในการฝังรูปภาพไว้ในหน้าเว็บด้านล่าง

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

หากต้องการทราบว่าเหตุใดเราจึงแทนที่แท็ก `<img>` ด้วย `<amp-img>` รวมถึงมีแท็กใดบ้างที่สามารถนำมาใช้แทนได้ โปรดไปที่[การใส่ Iframe และสื่อต่างๆ](/docs/guides/amp_replacements.html)

{% include button.html title="ไปยังขั้นตอนที่ 3" link="/docs/get_started/create/presentation_layout.th.html" %}

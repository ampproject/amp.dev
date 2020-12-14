---
"$title": Thêm một số trang nữa
"$order": '5'
description: Giờ đây bạn đã quen thuộc với thao tác thêm một trang vào Câu chuyện web, thao tác thêm những trang tiếp theo trong câu chuyện "Niềm vui của thú cưng" cũng thực hiện tương tự vậy
author: bpaduch
---

Giờ đây bạn đã quen thuộc với thao tác thêm một trang vào Câu chuyện web, thao tác thêm những trang tiếp theo trong câu chuyện "Niềm vui của thú cưng" cũng thực hiện tương tự vậy. Dựa trên thông tin được cung cấp bên dưới, **hãy tiếp tục tạo những trang còn lại** bằng cách dùng những điều mà bạn đã học được tới giờ. Nếu bị kẹt, hãy nhìn vào mã (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>) hoàn chỉnh.

[tip type="tip"] **MẸO –** Nhớ rằng mỗi trang cần có một thuộc tính "id" đặc trưng (ví dụ như `id="page1"`). [/tip]

## Trang 1: Mèo

Minh hoạ cách hiển thị một hình ảnh hay văn bản trong một lớp duy nhất.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Contains 1 layer:       <ul>         <li>Implements the <a href="create_cover_page.md#vertical"><code>vertical</code></a> template.</li>         <li>Contains 3 elements:           <ul>             <li>An <code><h1></code> element with the title: <em>Cats</em>
</li>             <li>A responsive <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">cat.jpg</code>, 720 x 1280px)</li>             <li>A <code><q></code> element for the following quotation: <em>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</em>
</li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## Trang 2: Chó

Minh hoạ cách sắp xếp văn bản và hiển thị một hình ảnh lấp đầy màn hình với hai lớp.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Contains 2 layers:       <ul>         <li>
<b>Layer 1</b>: Implements the <a href="create_cover_page.md#fill"><code>fill</code></a> template, and contains a responsive <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">dog.jpg</code>, 720 x 1280px).</li>         <li>
<b>Layer 2</b>:  Implements the <a href="create_cover_page.md#thirds"><code>thirds</code></a> template and contains 2 elements:           <ul>             <li>An <code><h1></code> element with the title: <em>Dogs</em>
</li>             <li>A <code><p></code> element that specifies a <a href="create_cover_page.md#thirds"><code>grid-area</code></a> that occupies the <a href="create_cover_page.md#thirds"><code>lower-third</code></a> and contains the following text: <em>Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.</em>
</li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## Trang 3: Chim

Minh hoạ cách sắp xếp văn bản, hiển thị một hình ảnh lấp đầy màn hình, và cung ứng âm thanh nền cho trang.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contains 3 layers:       <ul>         <li>
<b>Layer 1</b>: Implements the <a href="create_cover_page.md#fill"><code>fill</code></a> template, and contains a responsive <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">bird.jpg</code>, 720 x 1280px).</li>         <li>
<b>Layer 2</b>  Implements the <a href="create_cover_page.md#vertical"><code>vertical</code></a> template and contains one element:           <ul>             <li>An <code><h1></code> element with the title: <em>Birds</em>
</li>           </ul>         </li>         <li>
<b>Layer 3</b>:  Implements the <a href="create_cover_page.md#vertical"><code>vertical</code></a> template and contains one element:           <ul>             <li>A <code><q></code> element for the following quotation: <em>A bird is three things: Feathers, flight and song, And feathers are the least of these.--Marjorie Allen Seiffert</em>
</li>             <li>This third layer specifies <code>class="bottom"</code> to align the child elements to the bottom of screen.</li>           </ul>         </li>       </ul>
</li>
      <li>Plays an audio file in the background while the page is displayed. You can play audio in the background for the whole story or for a single page.  To play audio for a page, add the <code>background-audio="assets/bird-singing.mp3"</code> attribute to the <code><amp-story-page></code> element.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## Trang 4: Thỏ

Minh hoạ cách sắp xếp văn bản và hiển thị một video lấp đầy màn hình cho trang.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contains 3 layers:       <ul>         <li>
<b>Layer 1</b>: Implements the <code>fill</code> template, and contains a responsive <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> (<code class="filename">rabbit.mp4</code>).           <ul>             <li>Remember to add the <strong>required script</strong> for the <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> component in your <code><head></code> section so the video appears.</li>             <li>Specify a <code>poster</code> image (<code class="filename">rabbit.jpg</code>). This attribute is <strong>required</strong> for valid AMP stories.</li>             <li>Set the video to play automatically with the <code>autoplay</code> attribute. This attribute is <strong>required</strong> for valid AMP stories.</li>             <li>Set the video to automatically loop back with the <code>loop</code> attribute.</li>             <li>Set the dimensions to <code>width="720"</code> <code>height="1280"</code> and <code>layout="responsive"</code>.</li>           </ul>
</li>         <li>
<b>Layer 2</b>  Implements the <code>vertical</code> template and contains one element:           <ul>             <li>An <code><h1></code> element with the title: <em>Rabbits</em>
</li>           </ul>         </li>         <li>
<b>Layer 3</b>:  Implements the <code>vertical</code> template and contains one element:           <ul>             <li>A <code><p></code> element that contains the following text: <em>Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful</em>.</li>             <li>Apply the <code>bottom</code> CSS class to the layer to align the child elements to the bottom of screen.</li>           </ul>         </li>
</ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

Câu chuyện "Niềm vui của thú cưng" gần hoàn thành. Chúng ta sẽ dùng hình hoạt họa trong trang cuối để tập hợp lại tất cả mấy con thú cưng này.

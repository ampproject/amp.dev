---
'$title': Thêm một số trang nữa
$order: 5
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
        <li>Bao hàm 1 lớp:       <ul>         <li>Thực thi khuôn mẫu <a href="create_cover_page.md#vertical"><code>vertical</code></a>.</li>         <li>Bao hàm 3 yếu tố:           <ul>             <li>Một yếu tố <code><h1></code> với tiêu đề: <em>Mèo</em> </li>             <li>Một <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> thích nghi (<code class="filename">cat.jpg</code>, 720 x 1280px)</li>             <li>Một yếu tố <code><q</code> cho trích dẫn sau: <em>Chó đến khi được gọi. Mèo lãnh thông điệp và quay về lại với bạn. --Mary Bly</em> </li>           </ul>         </li>       </ul>
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
        <li>Bao hàm 2 lớp:       <ul>         <li> <b>Lớp 1</b>: Thực thi  khuôn mẫu <a href="create_cover_page.md#fill"><code>fill</code></a>, và bao hàm một <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> thích nghi (<code class="filename">dog.jpg</code>, 720 x 1280px).</li>         <li> <b>Lớp 2</b>:  Thực thi khuôn mẫu <a href="create_cover_page.md#thirds"><code>thirds</code></a> và bao hàm 2 yếu tố:           <ul>             <li>Một yếu tố <code><h1></code> với tiêu đề: <em>Chó</em> </li>             <li>Một yếu tố <code><p></code> vốn chỉ định một <a href="create_cover_page.md#thirds"><code>grid-area</code></a> chiếm phần <a href="create_cover_page.md#thirds"><code>lower-third</code></a> và có dòng chữ sau: <em>&nbsp;Chó có lẽ là loài vật thuần dưỡng đầu tiên. Chúng đã đi theo con người khoảng 10.000 năm nay. Một số nhà khoa học khẳng quyết rằng mọi loài chó, dù là chó nhà hay chó hoang dã, đều có cùng tổ tiên ở loài sói nhỏ vùng Nam Á.</em> </li>           </ul>         </li>       </ul>
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
      <li>Bao hàm 3 lớp:       <ul>         <li> <b>Lớp 1</b>: Thực thi khuôn mẫu <a href="create_cover_page.md#fill"><code>fill</code></a> và bao hàm một <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> thích nghi (<code class="filename">bird.jpg</code>, 720 x 1280px).</li>         <li> <b>Lớp 2</b>  Thực thi khuôn mẫu <a href="create_cover_page.md#vertical"><code>vertical</code></a> và bao hàm một yếu tố:           <ul>             <li>Một yếu tố <code><h1></code> với tiêu đề: <em>Chim</em> </li>           </ul>         </li>         <li> <b>Lớp 3</b>:  Thực thi khuôn mẫu <a href="create_cover_page.md#vertical"><code>vertical</code></a> và bao hàm một yếu tố:           <ul>             <li>Một yếu tố <code><q></code> cho câu trích sau: <em>Một con chim có ba thứ: Lông vũ, khả năng bay và tiếng hót, Và lông vũ là thứ nhạt nhoà nhất.--Marjorie Allen Seiffert</em> </li>             <li>Lớp thứ ba này chỉ định <code>class="bottom"</code> để sắp các yếu tố con ở cuối màn hình.</li>           </ul>         </li>       </ul>
</li>
      <li>Phát một file âm thanh chạy nền trong khi đang hiểu thị trang. Bạn có thể phát âm thanh chạy nền cho toàn bộ câu chuyện hoặc cho những trang đơn lẻ. Để phát âm thanh cho một trang, hãy thêm thuộc tính  <code>background-audio="assets/bird-singing.mp3"</code> vào yếu tố <code><amp-story-page></code>.</li>
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
      <li>Bao hàm 3 lớp:       <ul>         <li> <b>Lớp 1</b>: Thực thi khuôn mẫu <code>fill</code>, và bao hàm một <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> thích nghi (<code class="filename">rabbit.mp4</code>).           <ul>             <li>Nhớ thêm <strong>đoạn mã bắt buộc</strong> cho thành phần <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> trong phần <code></code> để cho video xuất hiện.</li>             <li>Chỉ định một hình ảnh <code>poster</code> (<code class="filename">rabbit.jpg</code>). Thuộc tính này <strong>bắt buộc</strong> cho những câu chuyện AMP hợp lệ.</li>             <li>Đặt video phát tự động với thuộc tính <code>autoplay</code>. Thuộc tính này <strong>bắt buộc</strong> cho những câu chuyện AMP hợp lệ.</li>             <li>Đặt video lặp trở lại với thuộc tính <code>loop</code>.</li>             <li>Đặt kích thước thành <code>width="720"</code> <code>height="1280"</code> và <code>layout="responsive"</code>.</li>           </ul> </li>         <li> <b>Lớp 2</b>  Thực thi khuôn mẫu <code>vertical</code> và bao hàm một yếu tố:           <ul>             <li>Một yếu tố <code><h1></code> với tiêu đề: <em>Thỏ</em> </li>           </ul>         </li>         <li> <b>Lớp 3</b>:  Thực thi khuôn mẫu <code>vertical</code> và bao hàm một yếu tố:           <ul>             <li>Một yếu tố <code><p></code> chứa dòng chữ sau: <em>Thỏ có thể học cách làm theo những câu lệnh giản đơn và chạy đến khi được gọi tên, và chúng là loài tò mò và nghịch ngợm</em>.</li>             <li>Áp dụng lớp CSS <code>bottom</code> cho lớp này để sắp các yếu tố con ở cuối màn hình.</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

Câu chuyện "Niềm vui của thú cưng" gần hoàn thành. Chúng ta sẽ dùng hình hoạt họa trong trang cuối để tập hợp lại tất cả mấy con thú cưng này.

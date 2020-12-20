---
"$title": Làm việc với dữ liệu từ xa
"$order": '3'
description: Điều gì sẽ xảy ra nếu dữ liệu có thể ràng buộc của bạn quá lớn hoặc quá phức tạp để truy xuất khi tải trang? Hoặc nếu mỗi SKU có một mức giá mà...
toc: 'true'
---

Điều gì sẽ xảy ra nếu dữ liệu có thể ràng buộc của bạn quá lớn hoặc quá phức tạp để truy xuất khi tải trang? Hoặc nếu mỗi SKU có một mức giá mà phải mất nhiều thời gian để tra cứu? Việc tra cứu giá cho SKU của các mục không xem đều là lãng phí.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) hỗ trợ truy xuất dữ liệu từ xa thông qua thuộc tính [`src`](../../../../documentation/components/reference/amp-bind.md#attributes) của nó, có chức năng truy xuất JSON từ một điểm cuối CORS. Việc truy xuất này được thực hiện một lần duy nhất khi tải trang và hữu ích trong việc đảm bảo độ mới của dữ liệu (đặc biệt khi được phục vụ từ một bộ nhớ đệm).

Bạn cũng có thể ràng buộc thuộc tính `src` cho yếu tố [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state). Điều này có nghĩa hành động của một người dùng có thể kích hoạt việc truy xuất dữ liệu JSON từ xa vào trạng thái ràng buộc được của trang.

[/tip]

## Truy xuất các kích cỡ sẵn có cho một chiếc áo

Hãy tận dụng khả năng truy xuất dữ liệu từ xa để tra cứu giá của các SKU trong mẫu của chúng ta. Máy chủ phát triển Express.js của chúng ta trong `app.js` đã có một điểm cuối `/shirts/sizesAndPrices?shirt=<sku>` mà khi được cho SKU của một chiếc áo, sẽ trả về các kích cỡ sẵn có và giá của mỗi kích cỡ. Nó gửi đi tín hiệu hồi đáp có độ trễ nhân tạo là 1 giây để giả lập độ trễ của mạng.

Yêu cầu | Hồi đáp
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

Tương tự dữ liệu JSON trong các yếu tố [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), dữ liệu từ xa được trả về từ các truy xuất này được hợp nhất và cung cấp theo thuộc tính `id` của yếu tố. Ví dụ, dữ liệu được trả về từ hồi đáp mẫu ở trên có thể được truy xuất trong một biểu thức:

Biểu thức | Kết quả
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### Ràng buộc dữ liệu

Bây giờ, hãy áp dụng điều này vào ví dụ thương mại điện tử của chúng ta. Đầu tiên, hãy truy xuất dữ liệu của chiếc áo này khi một SKU mới được chọn. Thêm một ràng buộc `[src]` vào yếu tố `amp-state#shirts` của chúng ta:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Chỉ báo các kích cỡ không có sẵn

Tiếp theo, hãy đánh dấu các kích cỡ không có sẵn cho một SKU đã cho. Lớp CSS `"unavailable"` (không có sẵn) bổ sung một đường chéo thông qua một yếu tố -- chúng ta có thể thêm nó vào các yếu tố trong [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) tương ứng với các kích cỡ không có sẵn:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Bây giờ, hãy tải lại trang và thử nó. Việc chọn một SKU mới (màu áo) sẽ khiến các kích cỡ không có sẵn bị gạch đi (sau một độ trễ ngắn).

### Quy định trạng thái ban đầu

Tuy nhiên, có một vấn đề nhỏ -- còn áo màu đen, là màu được chọn mặc định thì sao? Chúng ta sẽ cần thêm dữ liệu kích cỡ và giá của áo màu đen vào `amp-state#shirts` bởi [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) chỉ chạy để đáp lại hành động rõ ràng của người dùng:

```html
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg",
        "sizes": {
          "XS": 8.99,
          "S": 9.99
        }
      },
<!-- ... -->
```

Và chúng ta sẽ cần cập nhật trạng thái mặc định của các yếu tố liên quan:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Add the 'unavailable' class to the next three <td> elements
           to be consistent with the available sizes of the default SKU. -->
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

[tip type="note"] **LƯU Ý –** [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) không chạy khi tải trang -- mà chỉ để đáp lại hành động rõ ràng của người dùng. Điều này đảm bảo tốc độ tải trang ban đầu được nhanh và thống nhất trên tất cả các trang bất kể mức sử dụng của [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

## Giá áo thay đổi

Bây giờ chúng ta đã hiển thị chính xác các kích cỡ có sẵn, hãy đảm bảo giá hiển thị cũng là chính xác.

Cửa hàng AMPPAREL của chúng ta khá chi li ở điểm là giá áo phụ thuộc vào cả màu sắc VÀ kích cỡ. Điều đó có nghĩa chúng ta cần một biến số mới để theo dõi kích cỡ do người dùng chọn. Thêm một hành động mới vào yếu tố [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) kích cỡ của chúng ta:

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

Lưu ý rằng chúng ta không kích hoạt giá trị của `selectedSize` thông qua yếu tố `amp-state#selected`. Đó là bởi chúng ta cố ý không cung cấp một kích cỡ mặc định và muốn buộc người dùng chọn một kích cỡ.

[tip type="tip"] **MẸO –** `AMP.setState()` có thể được sử dụng để định nghĩa các biến số mới, ngoài việc sửa đổi các biến số hiện có. Biểu thức sẽ cập nhật các biến số chưa được định nghĩa thành `null`. [/tip]

Thêm một yếu tố `<span>` mới để bọc nhãn giá và đổi văn bản mặc định thành "---" bởi không có lựa chọn kích cỡ mặc định nào.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

Và chúng ta sẽ có giá đúng! Hãy thử xem.

## Nút điều kiện

Chúng ta sắp hoàn thành rồi! Hãy vô hiệu nút "Add to cart" (Thêm vào giỏ hàng) khi kích cỡ được chọn không có sẵn:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Thử ngay**: Nếu bạn chọn một kích cỡ không có sẵn, bạn không thể thêm nó vào giỏ hàng.

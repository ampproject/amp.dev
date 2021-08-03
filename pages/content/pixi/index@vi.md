---
"$title": Hướng dẫn Trải nghiệm Trang AMP
staticText:
  inputBar:
    headline: Phân tích trang AMP của bạn
    fieldPlaceholder: Nhập URL
    button: Phân tích
  infoDialog:
    open: Tìm hiểu về
    close: Đóng
  scrollToTop: Cuộn lên đầu trang
  shareDialog:
    headline: Sao chép & dán URL
    close: Đóng điều hướng
    copyToClipboard: Sao chép vào bộ nhớ tạm
    success: Thành công
  statusIntro:
    headline: Vui lòng chờ một chút
    headline2: Chúng tôi đang phân tích trang của bạn
    loadingCopy: Đã hoàn tất ${finishedChecks} / ${totalChecks} kiểm tra
    buttonShare: Chia sẻ
    buttonInvestigate: Kiểm tra
  coreWebVitals:
    headline: Core Web Vitals (Chỉ số thiết yếu về trang web)
    tabsAriaLabel: Tab dữ liệu thực địa và phòng thí nghiệm
    fieldData: Dữ liệu thực địa
    labData: Dữ liệu phòng thí nghiệm
    fieldDataExplainer: Dữ liệu này được cập nhật hàng ngày trong khoảng thời gian cuốn chiếu 28 ngày.
    labDataExplainer: Dữ liệu này được rút ra từ các kiểm tra tổng hợp và không ảnh hưởng đến trải nghiệm trên trang.
    loadingSpeed: Tốc độ tải
    interactivity: Tương tác
    visualStability: Hình ảnh ổn định
    pageLoads: Tải trang
    thresholdMarker: Phân vị thứ 75
    resultLabels:
      scorePercentile: Ghi điểm ở phân vị thứ 75
      score: Điểm
      opportunity: Cơ hội cải thiện
      pagesPassing: Chuyển lượt truy cập
      action: Hành động
  additionalChecks:
    headline: Kiểm tra bổ sung
    
    https: HTTPS
    mobileFriendliness: Mobile-friendliness
    intrusiveInterstitials: Quảng cáo xen kẽ gây khó chịu
    checkManually: Kiểm tra thủ công
  recommendations:
    headline: Hành động. Cải thiện website AMP của bạn
    nextAdvice: Lời khuyên tiếp theo
  tags:
    all: Tất cả
scriptText:
  inputBar:
    fieldError: Vui lòng nhập một URL hợp lệ
  status:
    analyzing: Phân tích
    calculating: Tính toán
    error: Phân tích đã thất bại
    failed: Đã thất bại
    passed: Đã đạt
    passedAddition: đã đạt
    none: Không có
    nothingToDo: "Không cần hành động! &#x1F389;"
    fileAnIssue: Báo cáo vấn đề với AMP
    recommendation: khuyến nghị
    recommendations: khuyến nghị
  buttonFixIt: Khắc phục ngay
  buttonMakeImprovements: Cải thiện
  detailsHeadlineImages: Các ảnh cần cân nhắc
  detailsHeadlineOther: Tài nguyên bị ảnh hưởng
  thumbnail: Ảnh thu nhỏ
  categories:
    fast: Tốt
    average: Cần cải thiện
    slow: Tồi
  tags:
    lcp: LCP
    fid: FID và TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: Mobile-friendliness
    
    intrusiveInterstitials: Quảng cáo xen kẽ gây khó chịu
---

Hướng dẫn trải nghiệm cho trang AMP là một công cụ cho phép các nhà phát triển AMP có thể thấy trang AMP của họ có kết quả thế nào trong xếp hạng trải nghiệm trang của Google Tìm kiếm, và cung cấp các phản hồi mà bạn có thể hành động để cải thiện xếp hạng này. Nếu chúng tôi không thể cung cấp cho bạn kiến thức để hành động, hãy sử dụng các lời nhắc có sẵn để [báo cáo vấn đề trên GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue), để nhóm của chúng tôi có thể giúp bạn hiểu cách các trang AMP của bạn có thể được cải thiện. Chúng tôi sử dụng các API có sẵn công khai như [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=vi), và [Mobile-friendliness Test](https://search.google.com/test/mobile-friendly?hl=vi).

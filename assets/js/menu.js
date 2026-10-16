/*
 * MỤC LỤC CHUNG CỦA TÀI LIỆU
 * --------------------------------------------------------------
 * Thanh bên, thanh trên, nút Trước/Sau và lưới mục ở trang chủ đều đọc từ đây.
 *
 * Quy ước làm việc 2 người:
 *   - Mỗi người chỉ sửa khối mục của mình (có chú thích tên người phụ trách).
 *   - Thêm màn hình: thêm một dòng vào "screens" của mục; "id" phải trùng id của <section class="screen"> trong trang.
 *   - Làm xong mục: xóa dòng "soon: true".
 *
 * Trường của một mục:
 *   no      số mục hiển thị            title   tên mục
 *   page    mã trang (trùng data-page của <body> trong file trang)
 *   href    đường dẫn file, tính từ thư mục gốc
 *   desc    mô tả ngắn (hiện ở thẻ trên trang chủ)
 *   owner   người phụ trách (chỉ để ghi nhớ, không hiển thị)
 *   soon    true = chưa có nội dung, hiện "Sắp có"
 *   screens các màn hình trong trang: { no, title, id }
 */
window.TSD_MENU = [
  { group: "Tổng quan", items: [
    { no: "I",  title: "Mục tiêu và phạm vi",   page: "home", href: "index.html#scope" },
    { no: "II", title: "Kiến trúc và phân vai", page: "home", href: "index.html#arch" }
  ]},

  { group: "III. Giải pháp hệ thống", items: [

    // ===== Mục 1 – Hoa =====
    { no: "1", title: "Master data", page: "01", href: "pages/01-master-data.html", owner: "Hoa",
      desc: "Tổ chức, kho, vị trí, đối tác kinh doanh, tem QR",
      screens: [
        { no: "1.1", title: "Danh mục tổ chức",   id: "m-org" },
        { no: "1.2", title: "Danh mục kho",       id: "m-warehouse" },
        { no: "1.3", title: "Danh mục vị trí",    id: "m-location" },
        { no: "1.4", title: "Đối tác kinh doanh", id: "m-partner" },
        { no: "1.5", title: "Phát hành tem NVL",  id: "m-label" }
      ]},

    // ===== Mục 2 – Hoa =====
    { no: "2", title: "Quy trình nguyên vật liệu", page: "02", href: "pages/02-nguyen-vat-lieu.html", owner: "Hoa", soon: true,
      desc: "Nhập, trả NCC, xuất dùng, trả hàng dư" },

    // ===== Mục 3 – Hoa =====
    { no: "3", title: "Quy trình gia công", page: "03", href: "pages/03-gia-cong.html", owner: "Hoa", soon: true,
      desc: "Xuất đi gia công và nhận về" },

    // ===== Mục 4 – Phương =====
    { no: "4", title: "Quy trình thành phẩm", page: "04", href: "pages/04-thanh-pham.html", owner: "Phương", soon: true,
      desc: "Nhập kho, giao hàng, hàng bán trả lại" },

    // ===== Mục 5 – Phương =====
    { no: "5", title: "Nhập xuất khác, chuyển kho", page: "05", href: "pages/05-nhap-xuat-khac.html", owner: "Phương", soon: true,
      desc: "Xuất hủy, xuất mẫu, chuyển kho, chuyển vị trí" },

    // ===== Mục 6 – Phương =====
    { no: "6", title: "Kiểm kê và tồn kho", page: "06", href: "pages/06-kiem-ke-ton-kho.html", owner: "Phương", soon: true,
      desc: "Kiểm kê tháng, tra cứu tồn" },

    // ===== Mục 7 =====
    { no: "7", title: "Báo cáo", page: "07", href: "pages/07-bao-cao.html", soon: true,
      desc: "Tồn kho, tồn lâu, chứng từ" }
  ]}
];

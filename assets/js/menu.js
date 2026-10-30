/*
 * MỤC LỤC CHUNG CỦA TÀI LIỆU
 * --------------------------------------------------------------
 * Thanh bên, thanh trên, nút Trước/Sau và lưới mục ở trang chủ đều đọc từ đây.
 *
 * Quy ước làm việc 2 người:
 *   - Mỗi người chỉ sửa khối mục của mình. Khi đã chia việc, ghi tên vào chú thích của khối
 *     và thêm owner: "Tên" vào dòng mục.
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
    { no: "A", title: "Mục tiêu và phạm vi",   page: "home", href: "index.html#scope" },
    { no: "B", title: "Quy trình nghiệp vụ kho", page: "home", href: "index.html#quy-trinh" }
  ]},

  { group: "Giải pháp hệ thống", items: [

    // ===== Mục 1 – (người phụ trách: chưa chia) =====
    { no: "1", title: "Master data", page: "01", href: "pages/01-master-data.html",
      desc: "Công ty, nhà máy, kho, vị trí, đối tác kinh doanh",
      screens: [
        { no: "1.1", title: "Danh mục công ty",   id: "m-company" },
        { no: "1.2", title: "Danh mục nhà máy",   id: "m-plant" },
        { no: "1.3", title: "Danh mục kho",       id: "m-warehouse" },
        { no: "1.4", title: "Danh mục vị trí",    id: "m-location" },
        { no: "1.5", title: "Đối tác kinh doanh", id: "m-partner" },
        { no: "1.6", title: "Danh mục loại hàng", id: "m-material-type" },
        { no: "1.7", title: "Danh mục nhóm hàng", id: "m-material-group" },
        { no: "1.8", title: "Danh mục mặt hàng",  id: "m-material" }
      ]},

    // ===== Mục 2 – sơ đồ quy trình 1 – (người phụ trách: chưa chia) =====
    { no: "2", title: "Quy trình mua", page: "02", href: "pages/02-quy-trinh-mua.html",
      desc: "Inbound từ NCC",
      screens: [
        { no: "2.1", title: "Danh sách yêu cầu nhập mua", id: "p-yc-list" },
        { no: "2.2", title: "Yêu cầu nhập mua", id: "p-yc" },
        { no: "2.3", title: "Danh sách phiếu nhập mua", id: "p-pn-list" },
        { no: "2.4", title: "Phiếu nhập mua", id: "p-pn" },
        { no: "2.5", title: "Danh sách yêu cầu xuất trả NCC", id: "p-yctl-list" },
        { no: "2.6", title: "Tạo yêu cầu trả nhà cung cấp", id: "p-yctl" },
        { no: "2.7", title: "Danh sách phiếu xuất trả NCC", id: "p-xtl-list" },
        { no: "2.8", title: "Phiếu xuất trả nhà cung cấp", id: "p-xtl" }
      ]},

    // ===== Mục 3 – sơ đồ quy trình 2 – (người phụ trách: chưa chia) =====
    { no: "3", title: "Quy trình nhập xuất dùng", page: "03", href: "pages/03-nhap-xuat-dung.html",
      desc: "Xuất vào sản xuất · nhập trả từ sản xuất",
      screens: [
        { no: "3.1", title: "Danh sách yêu cầu xuất vào sản xuất", id: "xsx-ds" },
        { no: "3.2", title: "Chi tiết yêu cầu xuất vào sản xuất", id: "xsx-yc" },
        { no: "3.3", title: "Danh sách phiếu xuất kho vào sản xuất", id: "xsx-pds" },
        { no: "3.4", title: "Phiếu xuất kho vào sản xuất", id: "xsx-phieu" },
        { no: "3.5", title: "Danh sách yêu cầu nhập trả từ sản xuất", id: "ntsx-ds" },
        { no: "3.6", title: "Chi tiết yêu cầu nhập trả từ sản xuất", id: "ntsx-yc" },
        { no: "3.7", title: "Danh sách phiếu nhập trả từ sản xuất", id: "ntsx-pds" },
        { no: "3.8", title: "Phiếu nhập trả từ sản xuất", id: "ntsx-phieu" }
      ]},

    // ===== Mục 4 – sơ đồ quy trình 3 – (người phụ trách: chưa chia) =====
    { no: "4", title: "Quy trình gia công", page: "04", href: "pages/04-gia-cong.html", soon: true,
      desc: "Xuất đi & nhận về" },

    // ===== Mục 5 – sơ đồ quy trình 4 – (người phụ trách: chưa chia) =====
    { no: "5", title: "Quy trình nhập kho thành phẩm / bán thành phẩm", page: "05", href: "pages/05-nhap-kho-thanh-pham.html",
      desc: "Nhập kho thành phẩm, bán thành phẩm từ sản xuất",
      screens: [
        { no: "5.1", title: "Yêu cầu nhập kho", id: "tp-yc" },
        { no: "5.2", title: "Phát hành và dán tem", id: "tp-tem" },
        { no: "5.3", title: "Quét tem nhập kho", id: "tp-quet" },
        { no: "5.4", title: "Lập phiếu nhập kho", id: "tp-phieu" }
      ]},

    // ===== Mục 6 – sơ đồ quy trình 5 – (người phụ trách: chưa chia) =====
    { no: "6", title: "Quy trình bán hàng", page: "06", href: "pages/06-ban-hang.html",
      desc: "Xuất bán & trả hàng thành phẩm",
      screens: [
        { no: "6.1", title: "Yêu cầu giao hàng", id: "bh-yc-giao" },
        { no: "6.2", title: "Quét tem giao hàng", id: "bh-quet-giao" },
        { no: "6.3", title: "Phiếu giao hàng", id: "bh-phieu-giao" },
        { no: "6.4", title: "Yêu cầu hàng bán trả lại", id: "bh-yc-tra" },
        { no: "6.5", title: "Phát hành tem", id: "bh-tem" },
        { no: "6.6", title: "Lập phiếu trả hàng", id: "bh-phieu-tra" },
        { no: "6.7", title: "Hàng thực tế về (chuyển vị trí)", id: "bh-ve-cvt" }
      ]},

    // ===== Mục 7 – sơ đồ quy trình 6 – (người phụ trách: chưa chia) =====
    { no: "7", title: "Quy trình xuất khác", page: "07", href: "pages/07-nhap-xuat-khac.html", soon: true,
      desc: "Xuất khác: xuất mẫu, xuất hủy",
      screens: [
        { no: "7.1", title: "Yêu cầu xuất khác", id: "xk-yc" },
        { no: "7.2", title: "Quét tem xuất khác", id: "xk-quet" },
        { no: "7.3", title: "Phiếu xuất khác", id: "xk-phieu" }
      ]},

    // ===== Mục 8 – sơ đồ quy trình 7 – (người phụ trách: chưa chia) =====
    { no: "8", title: "Quy trình chuyển kho", page: "08", href: "pages/08-chuyen-kho.html", soon: true,
      desc: "Chuyển kho · chuyển vị trí",
      screens: [
        { no: "8.1", title: "Chuyển sang kho khác", id: "ck-kho" },
        { no: "8.2", title: "Chuyển vị trí", id: "ck-vitri" }
      ]},

    // ===== Mục 9 – sơ đồ quy trình 8 – (người phụ trách: chưa chia) =====
    { no: "9", title: "Quy trình kiểm kê", page: "09", href: "pages/09-kiem-ke.html", soon: true,
      desc: "Hằng tháng, bằng PDA" },

    // ===== Mục 10 – (người phụ trách: chưa chia) =====
    { no: "10", title: "Báo cáo", page: "10", href: "pages/10-bao-cao.html", soon: true,
      desc: "Tồn kho, tồn lâu, chứng từ" },

    // ===== Mục 11 – (người phụ trách: chưa chia) =====
    { no: "11", title: "Phát hành tem nhãn", page: "11", href: "pages/11-phat-hanh-tem-nhan.html",
      desc: "In tem QR nguyên vật liệu, thành phẩm, vị trí",
      screens: [
        { no: "11.1", title: "Phát hành tem NVL", id: "t-nvl" },
        { no: "11.2", title: "Phát hành tem thành phẩm / bán thành phẩm", id: "t-tp" }
      ]}
  ]}
];

# Dorco WMS – To-Be Solution Design (TSD)

Trang tài liệu giải pháp WMS cho Dorco. HTML tĩnh, không cần build. Chạy được trên Netlify, GitHub Pages và mở thẳng `index.html` trên máy.

## Cấu trúc

| Đường dẫn | Nội dung | Ai sửa |
|---|---|---|
| `index.html` | Trang bìa, I. Mục tiêu và phạm vi, II. Kiến trúc và phân vai, thẻ dẫn vào các mục III | Hoa |
| `pages/NN-*.html` | Nội dung từng mục (01 Master data … 07 Báo cáo) | Người phụ trách mục |
| `pages/_mau-trang-muc.html` | File mẫu để chép khi tạo mục mới | – |
| `images/NN-*/` | Ảnh màn hình của từng mục | Người phụ trách mục |
| `assets/js/menu.js` | **Mục lục chung** (thanh bên, Trước/Sau, thẻ trang chủ đều đọc từ đây) | Mỗi người sửa khối mục của mình |
| `assets/js/layout.js` | Dựng khung trang, tìm kiếm, phóng to ảnh, In | Hoa |
| `assets/css/*.css` | Giao diện (`tokens.css` chứa màu và chữ) | Hoa |

## Phân công mục III

| Mục | Người phụ trách | Nhánh |
|---|---|---|
| 1, 2, 3 | Hoa | `hoa` |
| 4, 5, 6 | Phương | `phuong` |

Mỗi người làm trên nhánh của mình, gộp vào `main` bằng Pull Request trên GitHub. Chỉ sửa file trong phần mình phụ trách để tránh xung đột.

## Thêm một màn hình vào mục có sẵn

1. Chép ảnh vào `images/NN-ten-muc/`.
2. Trong `pages/NN-ten-muc.html`, chép một khối từ `<!-- ===== BẮT ĐẦU … -->` đến `<!-- ===== KẾT THÚC … -->`, đổi số, tên, đường dẫn menu, ảnh, mô tả. Đặt `id` mới cho `<section class="screen">`.
3. Trong `assets/js/menu.js`, thêm vào `screens` của mục đó: `{ no: "4.1", title: "Tên màn hình", id: "id-vua-dat" }`.
4. Nếu mục đang là "Sắp có": xóa khối `<div class="soon">` trong trang và xóa `soon: true` của mục trong `menu.js`.

## Thêm một mục mới

1. Chép `pages/_mau-trang-muc.html` thành `pages/NN-ten-muc.html`, đổi `data-page` thành mã trang.
2. Thêm một khối mục vào `assets/js/menu.js` (trường `page` trùng `data-page`).

## Xem thử trên máy

Bấm đúp `index.html`. Không cần cài thêm gì.

## Deploy

- **Netlify:** đã có `netlify.toml` (publish thư mục gốc).
- **GitHub Pages:** Settings › Pages › Deploy from a branch › `main` / `(root)`. File `.nojekyll` đã có sẵn.

Mọi đường dẫn đều là tương đối, nên chạy được cả khi site nằm trong thư mục con (`/ten-repo/`).

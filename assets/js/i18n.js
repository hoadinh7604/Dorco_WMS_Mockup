/*
 * Đa ngôn ngữ Việt / Anh / Hàn cho toàn bộ tài liệu.
 * Nội dung gốc trong HTML viết bằng tiếng Việt. Khi chọn EN hoặc KO, script đổi từng đoạn chữ
 * (nút chữ, thuộc tính title/placeholder/alt/aria-label) theo bảng DICT bên dưới: khóa là câu tiếng Việt
 * đúng nguyên văn, giá trị là [Anh, Hàn]. Câu chưa có trong bảng giữ nguyên tiếng Việt.
 * Muốn dịch thêm: thêm một dòng vào DICT. Không cần sửa HTML.
 * Câu có thẻ lồng bên trong (span...): gắn data-i18n-html="khóa" và thêm khóa vào HTML_DICT.
 * Trang nạp file này trước menu.js; layout.js gọi I18N.apply() sau khi dựng khung.
 */
(function () {
  "use strict";
  var LANGS = ["vi", "en", "ko"], KEY = "tsd-lang";
  var lang = "vi";
  try {
    var q = (location.search.match(/[?&]lang=(vi|en|ko)/) || [])[1];
    lang = q || localStorage.getItem(KEY) || "vi";
    if (q) localStorage.setItem(KEY, q);
  } catch (e) {}
  if (LANGS.indexOf(lang) < 0) lang = "vi";
  var IDX = { vi: -1, en: 0, ko: 1 };

  var DICT = {
    /* ---- Khung chung ---- */
    "☰ Mục lục": ["☰ Contents", "☰ 목차"],
    "‹ Trước": ["‹ Prev", "‹ 이전"],
    "Sau ›": ["Next ›", "다음 ›"],
    "In / PDF": ["Print / PDF", "인쇄 / PDF"],
    "Trang đầu": ["Home", "첫 페이지"],
    "Mục lục": ["Contents", "목차"],
    "Tìm trong mục lục": ["Search contents", "목차 검색"],
    "Tìm màn hình, chức năng…": ["Search screens, functions…", "화면, 기능 검색…"],
    "Không tìm thấy mục phù hợp.": ["No matching item found.", "일치하는 항목이 없습니다."],
    "Chuyển mục": ["Navigate sections", "섹션 이동"],
    "‹ Mục trước": ["‹ Previous section", "‹ 이전 섹션"],
    "Mục tiếp theo ›": ["Next section ›", "다음 섹션 ›"],
    "Sắp có": ["Coming soon", "준비 중"],
    "Ảnh phóng to": ["Enlarged image", "확대 이미지"],
    "Đóng (Esc)": ["Close (Esc)", "닫기 (Esc)"],
    "⤢ Phóng to": ["⤢ Zoom", "⤢ 확대"],
    "Ngôn ngữ": ["Language", "언어"],
    "⤢ Xem kích thước thật": ["⤢ View actual size", "⤢ 실제 크기로 보기"],
    "⤡ Thu vừa màn hình": ["⤡ Fit to screen", "⤡ 화면에 맞추기"],
    "Đang thu nhỏ vừa màn hình · bấm để xem kích thước thật, kéo ngang để xem hết": ["Scaled to fit the screen · click to view actual size, scroll sideways to see everything", "화면에 맞게 축소됨 · 클릭하면 실제 크기, 좌우로 스크롤하여 전체 보기"],
    "Chưa nạp được dữ liệu sơ đồ.": ["Could not load the diagram data.", "다이어그램 데이터를 불러오지 못했습니다."],
    "Cần bật JavaScript để xem sơ đồ quy trình.": ["JavaScript is required to view the process diagram.", "프로세스 다이어그램을 보려면 JavaScript가 필요합니다."],
    "Thủ công": ["Manual", "수작업"],

    /* ---- Mục lục: nhóm và mục ---- */
    "Tổng quan": ["Overview", "개요"],
    "Giải pháp hệ thống": ["System solution", "시스템 솔루션"],
    "Mục tiêu và phạm vi": ["Objectives and scope", "목표 및 범위"],
    "Quy trình nghiệp vụ kho": ["Warehouse business processes", "창고 업무 프로세스"],
    "Master data": ["Master data", "마스터 데이터"],
    "Quy trình nhập mua": ["Purchase receiving process", "구매 입고 프로세스"],
    "Quy trình nhập xuất dùng": ["Production issue / return process", "생산 출고·반납 프로세스"],
    "Quy trình gia công": ["Subcontracting process", "외주 가공 프로세스"],
    "Quy trình nhập kho thành phẩm / bán thành phẩm": ["Finished / semi-finished goods receiving process", "완제품 / 반제품 입고 프로세스"],
    "Quy trình bán hàng": ["Sales process", "판매 프로세스"],
    "Quy trình xuất khác": ["Other issue process", "기타 출고 프로세스"],
    "Quy trình chuyển kho": ["Warehouse transfer process", "창고 이동 프로세스"],
    "Quy trình kiểm kê": ["Stock count process", "재고 실사 프로세스"],
    "Báo cáo": ["Reports", "보고서"],
    "Phát hành tem nhãn": ["Label issuing", "라벨 발행"],
    "Công ty, nhà máy, kho, vị trí, đối tác, mặt hàng, nhóm hàng, loại hàng": ["Company, plant, warehouse, location, partner, material, material group, material type", "회사, 공장, 창고, 위치, 파트너, 품목, 품목 그룹, 품목 유형"],
    "Inbound từ NCC": ["Inbound from suppliers", "공급업체 입고"],
    "Xuất vào sản xuất · nhập trả từ sản xuất": ["Issue to production · return from production", "생산 출고 · 생산 반납"],
    "Xuất đi & nhận về": ["Send out & receive back", "외주 출고 및 입고"],
    "Nhập kho thành phẩm, bán thành phẩm từ sản xuất": ["Receive finished and semi-finished goods from production", "생산 완제품·반제품 입고"],
    "Xuất bán & trả hàng thành phẩm": ["Sales issue & finished goods returns", "완제품 판매 출고 및 반품"],
    "Xuất khác: xuất mẫu, xuất hủy": ["Other issues: samples, scrapping", "기타 출고: 샘플, 폐기"],
    "Chuyển kho · chuyển vị trí": ["Warehouse transfer · location transfer", "창고 이동 · 위치 이동"],
    "Hằng tháng, bằng PDA": ["Monthly, using PDA", "매월 PDA로 수행"],
    "Tồn kho, tồn lâu, chứng từ": ["Stock, aged stock, documents", "재고, 장기 재고, 전표"],
    "In tem QR nguyên vật liệu, thành phẩm, vị trí": ["Print QR labels for materials, finished goods, locations", "원자재, 완제품, 위치 QR 라벨 인쇄"],

    /* ---- Mục lục: màn hình ---- */
    "Danh mục công ty": ["Company catalog", "회사 목록"],
    "Danh mục nhà máy": ["Plant catalog", "공장 목록"],
    "Danh mục kho": ["Warehouse catalog", "창고 목록"],
    "Danh mục vị trí": ["Location catalog", "위치 목록"],
    "Đối tác kinh doanh": ["Business partners", "거래처"],
    "Danh mục loại hàng": ["Material type catalog", "품목 유형 목록"],
    "Danh mục nhóm hàng": ["Material group catalog", "품목 그룹 목록"],
    "Danh mục mặt hàng": ["Material catalog", "품목 목록"],
    "Yêu cầu nhập mua": ["Purchase receipt request", "구매 입고 요청"],
    "Phát hành in tem": ["Label issuing and printing", "라벨 발행 및 인쇄"],
    "Nhập mua trên PDA": ["Purchase receipt on PDA", "PDA 구매 입고"],
    "Phiếu nhập mua": ["Purchase receipt slip", "구매 입고 전표"],
    "Yêu cầu xuất trả nhà cung cấp": ["Return-to-supplier request", "공급업체 반품 요청"],
    "Xuất trả nhà cung cấp trên PDA": ["Return to supplier on PDA", "PDA 공급업체 반품 출고"],
    "Phiếu xuất trả nhà cung cấp": ["Return-to-supplier slip", "공급업체 반품 출고 전표"],
    "Yêu cầu xuất kho vào sản xuất": ["Issue-to-production request", "생산 출고 요청"],
    "Xuất kho vào sản xuất trên PDA": ["Issue to production on PDA", "PDA 생산 출고"],
    "Phiếu xuất kho vào sản xuất": ["Issue-to-production slip", "생산 출고 전표"],
    "Yêu cầu nhập trả từ sản xuất": ["Return-from-production request", "생산 반납 요청"],
    "Nhập trả từ sản xuất trên PDA": ["Return from production on PDA", "PDA 생산 반납 입고"],
    "Phiếu nhập trả từ sản xuất": ["Return-from-production slip", "생산 반납 입고 전표"],
    "Yêu cầu xuất nguyên liệu đi gia công": ["Request to send materials for subcontracting", "외주 가공 원자재 출고 요청"],
    "Quét tem chuyển kho": ["Scan labels for transfer", "이동용 라벨 스캔"],
    "Phiếu xuất nguyên liệu đi gia công": ["Subcontracting issue slip", "외주 가공 출고 전표"],
    "Yêu cầu nhập hàng gia công về": ["Subcontracted goods receipt request", "외주 가공품 입고 요청"],
    "In tem hàng nhập gia công về": ["Print labels for subcontracted goods", "외주 가공품 입고 라벨 인쇄"],
    "Nhập hàng gia công về kho bằng PDA": ["Receive subcontracted goods by PDA", "PDA로 외주 가공품 입고"],
    "Phiếu nhập hàng gia công về": ["Subcontracted goods receipt slip", "외주 가공품 입고 전표"],
    "Yêu cầu nhập kho": ["Warehouse receipt request", "입고 요청"],
    "Phát hành và dán tem": ["Issue and attach labels", "라벨 발행 및 부착"],
    "Quét tem nhập kho": ["Scan labels for receipt", "입고 라벨 스캔"],
    "Lập phiếu nhập kho": ["Create receipt slip", "입고 전표 생성"],
    "Yêu cầu giao hàng": ["Delivery request", "배송 요청"],
    "Quét tem giao hàng": ["Scan labels for delivery", "배송 라벨 스캔"],
    "Phiếu giao hàng": ["Delivery slip", "배송 전표"],
    "Yêu cầu hàng bán trả lại": ["Sales return request", "판매 반품 요청"],
    "Phát hành tem": ["Issue labels", "라벨 발행"],
    "Lập phiếu trả hàng": ["Create return slip", "반품 전표 생성"],
    "Hàng thực tế về (chuyển vị trí)": ["Goods physically arrived (location transfer)", "실물 도착 (위치 이동)"],
    "Yêu cầu xuất khác": ["Other issue request", "기타 출고 요청"],
    "Quét tem xuất khác": ["Scan labels for other issue", "기타 출고 라벨 스캔"],
    "Phiếu xuất khác": ["Other issue slip", "기타 출고 전표"],
    "Yêu cầu chuyển kho": ["Warehouse transfer request", "창고 이동 요청"],
    "Phiếu chuyển kho": ["Warehouse transfer slip", "창고 이동 전표"],
    "Chuyển vị trí": ["Location transfer", "위치 이동"],
    "Chuyển vị trí trên PDA": ["Location transfer on PDA", "PDA 위치 이동"],
    "Tạo kỳ kiểm kê": ["Create count period", "실사 기간 생성"],
    "Chốt số tồn kho": ["Freeze stock quantities", "재고 수량 확정"],
    "Quét tem kiểm kê": ["Scan labels for stock count", "실사 라벨 스캔"],
    "Ghi nhận kết quả kiểm kê": ["Record count results", "실사 결과 기록"],
    "Điều chỉnh nhập/xuất tồn": ["Adjust stock in/out", "재고 입출고 조정"],
    "Kiểm tra tồn kho - Giao dịch": ["Stock check – Transactions", "재고 조회 – 거래"],
    "Kiểm tra tồn kho - Phiếu chi tiết": ["Stock check – Slip details", "재고 조회 – 전표 상세"],
    "Kiểm tra tồn kho theo vị trí": ["Stock check by location", "위치별 재고 조회"],
    "Báo cáo nhập xuất tồn FIFO": ["FIFO inventory movement report", "FIFO 재고 수불 보고서"],
    "Phát hành tem NVL": ["Issue material labels", "원자재 라벨 발행"],
    "Phát hành tem thành phẩm / bán thành phẩm": ["Issue finished / semi-finished goods labels", "완제품 / 반제품 라벨 발행"],

    /* ---- Trang đầu (index.html) ---- */
    "To-Be Solution Design (TSD)": ["To-Be Solution Design (TSD)", "To-Be 솔루션 설계 (TSD)"],
    "Giải pháp quản lý kho cho Dorco Vina và Dorco Living tại Hưng Yên và Hà Nam, kết nối SAP, WMS và máy PDA. Kèm màn hình hệ thống để hai bên thống nhất trước khi triển khai.": [
      "A warehouse management solution for Dorco Vina and Dorco Living at Hung Yen and Ha Nam, connecting SAP, WMS and PDA devices. Includes system screens so both sides can align before implementation.",
      "흥옌과 하남의 Dorco Vina 및 Dorco Living을 위한 창고 관리 솔루션으로, SAP, WMS, PDA 단말기를 연동합니다. 구축 전에 양측이 합의할 수 있도록 시스템 화면을 함께 제공합니다."],
    "Khách hàng": ["Customer", "고객사"],
    "Dorco (Vina, Living)": ["Dorco (Vina, Living)", "Dorco (Vina, Living)"],
    "Đơn vị thực hiện": ["Implementer", "수행 업체"],
    "Cyberlogitec Vietnam": ["Cyberlogitec Vietnam", "Cyberlogitec Vietnam"],
    "Phiên bản": ["Version", "버전"],
    "A. Mục tiêu và phạm vi": ["A. Objectives and scope", "A. 목표 및 범위"],
    "Tài liệu mô tả cách DORCO WMS vận hành sau khi triển khai, dựa trên kết quả khảo sát tại Hưng Yên (02 đến 05/2026) và Hà Nam (10/2026). Sau buổi trình bày, mục đích là chốt giải pháp và các điểm cần xác nhận, được nêu ở cuối từng phần.": [
      "This document describes how DORCO WMS will operate after go-live, based on the surveys at Hung Yen (Feb to May 2026) and Ha Nam (Oct 2026). After the presentation, the goal is to finalize the solution and the points to be confirmed, listed at the end of each section.",
      "이 문서는 흥옌(2026년 2월~5월)과 하남(2026년 10월) 현장 조사 결과를 바탕으로, 구축 후 DORCO WMS가 어떻게 운영되는지 설명합니다. 발표 후 솔루션과 확인이 필요한 사항을 확정하는 것이 목적이며, 확인 사항은 각 부분의 끝에 기재했습니다."],
    "Mục tiêu": ["Objectives", "목표"],
    "Quản lý tồn kho theo từng tem QR: biết mặt hàng, số lượng, ngày nhập và vị trí của từng pallet.": ["Manage stock by QR label: know the item, quantity, receipt date and location of every pallet.", "QR 라벨 단위로 재고 관리: 팔레트별 품목, 수량, 입고일, 위치를 파악합니다."],
    "Thay phiếu giấy, email và file Excel bằng yêu cầu, phiếu và phê duyệt ngay trên WMS.": ["Replace paper slips, emails and Excel files with requests, slips and approvals directly in WMS.", "종이 전표, 이메일, 엑셀 파일을 WMS 내 요청, 전표, 승인으로 대체합니다."],
    "Kho thao tác bằng PDA, WMS tự sinh phiếu, văn phòng kho chỉ kiểm tra và duyệt, kết quả tự đồng bộ về SAP.": ["Warehouse staff work on PDA, WMS generates slips automatically, the warehouse office only reviews and approves, and results sync to SAP automatically.", "창고는 PDA로 작업하고, WMS가 전표를 자동 생성하며, 창고 사무실은 검토와 승인만 하고, 결과는 SAP로 자동 동기화됩니다."],
    "Trong phạm vi": ["In scope", "범위 내"],
    "Nhập, xuất, trả nguyên vật liệu và hàng gia công": ["Receiving, issuing and returning materials and subcontracted goods", "원자재 및 외주 가공품 입고, 출고, 반품"],
    "Nhập kho thành phẩm, giao hàng, nhận hàng bán bị trả lại": ["Finished goods receipt, delivery, receiving sales returns", "완제품 입고, 배송, 판매 반품 수령"],
    "Nhập khác, xuất mẫu, xuất hủy": ["Other receipts, sample issues, scrapping", "기타 입고, 샘플 출고, 폐기"],
    "Chuyển kho và chuyển vị trí": ["Warehouse and location transfers", "창고 이동 및 위치 이동"],
    "Kiểm kê hằng tháng, tra cứu tồn, báo cáo tồn kho": ["Monthly stock count, stock lookup, inventory reports", "월간 재고 실사, 재고 조회, 재고 보고서"],
    "Tem QR cho nguyên vật liệu và thành phẩm": ["QR labels for materials and finished goods", "원자재 및 완제품 QR 라벨"],
    "WMS Web, ứng dụng PDA và đồng bộ SAP ⇄ WMS": ["WMS Web, PDA app and SAP ⇄ WMS synchronization", "WMS 웹, PDA 앱 및 SAP ⇄ WMS 동기화"],
    "Ngoài phạm vi (theo khảo sát)": ["Out of scope (per survey)", "범위 외 (조사 기준)"],
    "Vật tư tiêu hao: nhập về dùng ngay, không theo dõi tồn trên hệ thống": ["Consumables: used immediately on receipt, stock not tracked in the system", "소모품: 입고 즉시 사용, 시스템에서 재고를 관리하지 않음"],
    "Cảnh báo tồn Min/Max: hiện chưa cần": ["Min/Max stock alerts: not needed for now", "최소/최대 재고 경고: 현재 불필요"],
    "Quản lý hạn sử dụng: Dorco chỉ theo dõi ngày nhập": ["Expiry date management: Dorco only tracks the receipt date", "유통기한 관리: Dorco는 입고일만 관리"],
    "Phân hạng hàng A/B/C": ["A/B/C item classification", "A/B/C 품목 등급 분류"],
    "Cần xác nhận:": ["To confirm:", "확인 필요:"],
    "danh sách ngoài phạm vi này được tổng hợp từ khảo sát.": ["this out-of-scope list is compiled from the survey.", "이 범위 외 목록은 조사 결과를 종합한 것입니다."],
    "Phạm vi nhà máy và kho": ["Plant and warehouse scope", "공장 및 창고 범위"],
    "Nhà máy": ["Plant", "공장"],
    "Pháp nhân": ["Legal entity", "법인"],
    "Kho chính (mã SAP)": ["Main warehouses (SAP code)", "주요 창고 (SAP 코드)"],
    "Quản lý vị trí": ["Location management", "위치 관리"],
    "Hưng Yên": ["Hung Yen", "흥옌"],
    "Hà Nam A": ["Ha Nam A", "하남 A"],
    "Hà Nam B": ["Ha Nam B", "하남 B"],
    "Kho thuê ngoài": ["Third-party warehouse", "외부 임대 창고"],
    "1000 NVL/BTP, 5000 thành phẩm, 5900 hàng bán trả lại, 9000 hàng lỗi": ["1000 materials/semi-finished, 5000 finished goods, 5900 sales returns, 9000 defective goods", "1000 원자재/반제품, 5000 완제품, 5900 판매 반품, 9000 불량품"],
    "Chỉ theo kho": ["Warehouse level only", "창고 단위만"],
    "Theo kho": ["By warehouse", "창고 단위"],
    "Có": ["Yes", "있음"],
    "5010 (bán thành phẩm, thành phẩm)": ["5010 (semi-finished, finished goods)", "5010 (반제품, 완제품)"],
    "B. Quy trình nghiệp vụ kho": ["B. Warehouse business processes", "B. 창고 업무 프로세스"],
    "Tổng hợp từ khảo sát: 8 nhóm quy trình kho (nguyên vật liệu, gia công, thành phẩm, bán hàng, chuyển kho, kiểm kê…) và điểm tích hợp SAP – WMS – PDA.": [
      "Compiled from the survey: 8 groups of warehouse processes (materials, subcontracting, finished goods, sales, transfers, stock count…) and the SAP – WMS – PDA integration points.",
      "조사 결과를 종합: 창고 프로세스 8개 그룹(원자재, 외주 가공, 완제품, 판매, 창고 이동, 재고 실사 등)과 SAP – WMS – PDA 연동 지점."],
    "Giải pháp chi tiết cho từng nhóm nghiệp vụ, kèm màn hình WMS. Chọn một mục để xem.": ["Detailed solution for each business group, with WMS screens. Select an item to view.", "업무 그룹별 상세 솔루션과 WMS 화면입니다. 항목을 선택하여 확인하세요."],
    "DORCO WMS – To-Be Solution Design (TSD), phiên bản 0.1. Dữ liệu trong mockup chỉ để minh họa.": ["DORCO WMS – To-Be Solution Design (TSD), version 0.1. Data in the mockup is for illustration only.", "DORCO WMS – To-Be 솔루션 설계 (TSD), 버전 0.1. 목업의 데이터는 예시용입니다."]
  };

  /* Câu có thẻ lồng bên trong (giữ nguyên thẻ, chỉ đổi chữ) */
  var HTML_DICT = {
    "scope-goal-4": [
      'One shared solution for Hung Yen and Ha Nam. Differences between the two plants are marked with the labels <span class="pl hy">HY</span> <span class="pl hn">HN</span>.',
      '흥옌과 하남을 위한 공통 솔루션입니다. 두 공장 간 차이는 <span class="pl hy">HY</span> <span class="pl hn">HN</span> 라벨로 표시합니다.']
  };

  /* Tra một câu tiếng Việt, trả về bản dịch (hoặc chính nó) */
  function tr(vi) {
    if (lang === "vi" || vi == null) return vi;
    var k = String(vi).trim(), d = DICT[k];
    if (!d || !d[IDX[lang]]) return vi;
    return String(vi).replace(k, d[IDX[lang]]);
  }
  /* Chọn bản theo ngôn ngữ từ {vi,en,ko} */
  function pick(x) {
    if (x == null) return "";
    if (typeof x !== "object") return tr(x);
    return x[lang] != null && x[lang] !== "" ? x[lang] : (x.vi != null ? x.vi : "");
  }

  var ATTRS = ["title", "placeholder", "alt", "aria-label"];
  function apply(root) {
    if (lang === "vi") return;
    root = root || document.body;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false), n, list = [];
    while ((n = w.nextNode())) {
      var p = n.parentNode;
      if (!p || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.nodeName) || (p.closest && p.closest("[data-i18n-skip]"))) continue;
      if (n.nodeValue.trim()) list.push(n);
    }
    list.forEach(function (t) { var v = tr(t.nodeValue); if (v !== t.nodeValue) t.nodeValue = v; });
    Array.prototype.forEach.call(root.querySelectorAll("[data-i18n-html]"), function (e) {
      var d = HTML_DICT[e.getAttribute("data-i18n-html")];
      if (d && d[IDX[lang]]) e.innerHTML = d[IDX[lang]];
    });
    Array.prototype.forEach.call(root.querySelectorAll("[title],[placeholder],[alt],[aria-label]"), function (e) {
      ATTRS.forEach(function (a) { if (e.hasAttribute(a)) { var v = tr(e.getAttribute(a)); if (v !== e.getAttribute(a)) e.setAttribute(a, v); } });
    });
  }

  function set(l) {
    try { localStorage.setItem(KEY, l); } catch (e) {}
    var u = location.href.replace(/([?&])lang=(vi|en|ko)&?/, "$1").replace(/[?&]$/, "");
    location.href = u;
  }

  /* Nút chọn ngôn ngữ (đặt ở thanh trên, trước Trước/Sau) */
  function switcher() {
    var names = { vi: "Tiếng Việt", en: "English", ko: "한국어" }, short = { vi: "VI", en: "EN", ko: "KO" };
    var box = document.createElement("div");
    box.className = "lang";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", tr("Ngôn ngữ"));
    LANGS.forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lang__btn" + (l === lang ? " is-on" : "");
      b.textContent = short[l];
      b.title = names[l];
      b.setAttribute("lang", l);
      b.setAttribute("aria-pressed", l === lang ? "true" : "false");
      b.addEventListener("click", function () { if (l !== lang) set(l); });
      box.appendChild(b);
    });
    return box;
  }

  document.documentElement.setAttribute("lang", lang);
  window.I18N = { lang: lang, tr: tr, pick: pick, apply: apply, switcher: switcher };
})();

/*
 * Dựng khung chung cho mọi trang từ window.TSD_MENU (menu.js):
 * thanh bên, thanh trên, nút Trước/Sau, thẻ mục ở trang chủ, mục lục tự sáng,
 * tìm kiếm, phóng to ảnh, In.
 * Trang cần: <body data-root="../" data-page="01"> và <main class="content">.
 * Không cần sửa file này khi thêm mục hay màn hình.
 */
(function () {
  "use strict";
  var MENU = window.TSD_MENU || [];
  var I18N = window.I18N || { tr: function (s) { return s; }, apply: function () {}, switcher: function () { return document.createElement("span"); } };
  var T = I18N.tr;
  var body = document.body;
  var ROOT = body.getAttribute("data-root") || "";
  var PAGE = body.getAttribute("data-page") || "";

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fold(s) {
    s = String(s).toLowerCase().replace(/đ/g, "d");
    return s.normalize ? s.normalize("NFD").replace(/[̀-ͯ]/g, "") : s;
  }
  /* Link tới một mục: cùng trang thì chỉ dùng #id */
  function link(item, id) {
    var file = item.href.split("#")[0], hash = id ? "#" + id : (item.href.split("#")[1] ? "#" + item.href.split("#")[1] : "");
    if (item.page === PAGE && hash) return hash;
    return ROOT + file + hash;
  }

  /* Danh sách trang theo thứ tự (để Trước/Sau) */
  var pages = [], seen = {}, current = null, currentGroup = "";
  MENU.forEach(function (g) {
    g.items.forEach(function (it) {
      if (it.page === PAGE && !current) { current = it; currentGroup = g.group; }
      if (seen[it.page]) return;
      seen[it.page] = 1;
      pages.push({ page: it.page, title: it.page === "home" ? T("Trang đầu") : it.no + ". " + T(it.title), href: ROOT + it.href.split("#")[0], soon: it.soon });
    });
  });
  var live = pages.filter(function (p) { return !p.soon || p.page === PAGE; });
  var idx = -1;
  live.forEach(function (p, i) { if (p.page === PAGE) idx = i; });
  var prev = idx > 0 ? live[idx - 1] : null;
  var next = idx >= 0 && idx < live.length - 1 ? live[idx + 1] : null;

  /* ---------- Thanh bên ---------- */
  var nav = "";
  MENU.forEach(function (g) {
    nav += '<div class="side__grp">' + esc(T(g.group)) + "</div>";
    g.items.forEach(function (it) {
      var cls = "nav" + (it.soon ? " is-soon" : "") + (it.page === PAGE && it.page !== "home" ? " is-page" : "");
      var hash = it.href.split("#")[1];
      nav += '<a class="' + cls + '" href="' + esc(link(it)) + '"' + (it.page === PAGE && hash ? ' data-spy="' + hash + '"' : "") +
        ' data-key="' + esc(fold(it.no + " " + it.title + " " + T(it.title))) + '"><i>' + esc(it.no) + "</i><span>" + esc(T(it.title)) + "</span></a>";
      (it.screens || []).forEach(function (s) {
        nav += '<a class="nav sub" href="' + esc(link(it, s.id)) + '" data-parent="' + esc(it.page) + '"' + (it.page === PAGE ? ' data-spy="' + esc(s.id) + '"' : "") +
          ' data-key="' + esc(fold(s.no + " " + s.title + " " + T(s.title) + " " + it.title)) + '"><i>' + esc(s.no) + "</i><span>" + esc(T(s.title)) + "</span></a>";
      });
    });
  });
  var side = el("aside", { "class": "side", id: "side", "aria-label": T("Mục lục") },
    '<a class="side__brand" href="' + ROOT + 'index.html"><small>Cyberlogitec · Dorco</small><b>Dorco WMS</b><span>To-Be Solution Design</span></a>' +
    '<div class="side__search"><label class="sr-only" for="q">' + T("Tìm trong mục lục") + '</label><input id="q" type="search" placeholder="' + T("Tìm màn hình, chức năng…") + '" autocomplete="off"></div>' +
    '<nav class="side__nav">' + nav + '</nav><p class="side__empty">' + T("Không tìm thấy mục phù hợp.") + '</p>');

  /* ---------- Thanh trên ---------- */
  var crumb = 'Dorco WMS' + (current && PAGE !== "home" ? ' › ' + esc(T(currentGroup)) + ' › <b>' + esc(current.no + ". " + T(current.title)) + '</b>' : ' › <b>' + T("Trang đầu") + '</b>');
  var top = el("header", { "class": "top" },
    '<button class="btn top__menu" type="button" aria-controls="side" aria-expanded="false">' + T("☰ Mục lục") + '</button>' +
    '<div class="top__crumb">' + crumb + '</div>' +
    '<span class="top__lang"></span>' +
    '<a class="btn btn--hide-sm" href="' + (prev ? esc(prev.href) : "#") + '"' + (prev ? ' title="' + esc(prev.title) + '"' : ' aria-disabled="true"') + '>' + T("‹ Trước") + '</a>' +
    '<a class="btn btn--hide-sm" href="' + (next ? esc(next.href) : "#") + '"' + (next ? ' title="' + esc(next.title) + '"' : ' aria-disabled="true"') + '>' + T("Sau ›") + '</a>' +
    '<button class="btn btn--pri" type="button" data-print>' + T("In / PDF") + '</button>');

  $(".top__lang", top).replaceWith(I18N.switcher());

  /* ---------- Ráp khung ---------- */
  var main = $("main.content");
  var app = el("div", { "class": "app" });
  var col = el("div", { "class": "app__main" });
  main.parentNode.insertBefore(app, main);
  app.appendChild(side);
  app.appendChild(col);
  col.appendChild(top);
  col.appendChild(main);

  /* Trước/Sau cuối trang */
  if (prev || next) {
    var pg = el("nav", { "class": "pager", "aria-label": T("Chuyển mục") },
      (prev ? '<a class="prev" href="' + esc(prev.href) + '"><small>' + T("‹ Mục trước") + '</small>' + esc(prev.title) + "</a>" : "") +
      (next ? '<a class="next" href="' + esc(next.href) + '"><small>' + T("Mục tiếp theo ›") + '</small>' + esc(next.title) + "</a>" : ""));
    main.appendChild(pg);
  }

  /* Thẻ mục ở trang chủ: <div data-menu-cards="Giải pháp hệ thống"> */
  $$("[data-menu-cards]").forEach(function (box) {
    var name = box.getAttribute("data-menu-cards"), html = "";
    MENU.forEach(function (g) {
      if (g.group !== name) return;
      g.items.forEach(function (it) {
        html += '<a class="card-link' + (it.soon ? " is-soon" : "") + '" href="' + esc(ROOT + it.href) + '"><i>' + esc(it.no) + "</i><div><b>" + esc(T(it.title)) + "</b><span>" +
          esc(it.soon ? T("Sắp có") : T(it.desc || "")) + "</span></div></a>";
      });
    });
    box.innerHTML = html;
  });

  /* ---------- Mục lục tự sáng khi cuộn ---------- */
  var spyLinks = $$("a[data-spy]", side), targets = [];
  spyLinks.forEach(function (a) { var t = document.getElementById(a.getAttribute("data-spy")); if (t) targets.push({ a: a, t: t }); });
  function spy() {
    var y = (window.innerHeight || 800) * 0.3, cur = null;
    targets.forEach(function (o) { if (o.t.getBoundingClientRect().top <= y) cur = o; });
    if (!cur && targets.length) cur = targets[0];
    spyLinks.forEach(function (a) { a.classList.toggle("is-active", !!cur && a === cur.a); });
  }
  if (targets.length) { window.addEventListener("scroll", spy, { passive: true }); spy(); }
  else $$("a.nav.is-page", side).forEach(function (a) { a.classList.add("is-active"); });

  /* Chỉ hiện màn hình con của trang đang mở (trừ khi đang tìm) */
  var subs = $$("a.nav.sub", side);
  function showSubs() { subs.forEach(function (a) { a.style.display = a.getAttribute("data-parent") === PAGE ? "" : "none"; }); }
  showSubs();

  /* ---------- Tìm kiếm ---------- */
  var q = $("#q", side), empty = $(".side__empty", side);
  q.addEventListener("input", function () {
    var v = fold(q.value.trim()), any = false;
    if (!v) { $$("a.nav:not(.sub)", side).forEach(function (a) { a.style.display = ""; }); $$(".side__grp", side).forEach(function (g) { g.style.display = ""; }); showSubs(); empty.style.display = "none"; return; }
    var grp = null, grpHit = false;
    $$(".side__nav > *", side).forEach(function (n) {
      if (n.classList.contains("side__grp")) { if (grp) grp.style.display = grpHit ? "" : "none"; grp = n; grpHit = false; return; }
      var hit = n.getAttribute("data-key").indexOf(v) > -1;
      n.style.display = hit ? "" : "none";
      if (hit) { grpHit = true; any = true; }
    });
    if (grp) grp.style.display = grpHit ? "" : "none";
    empty.style.display = any ? "none" : "block";
  });

  /* ---------- Menu trên điện thoại ---------- */
  var mb = $(".top__menu", top);
  function setMenu(open) { body.classList.toggle("menu-open", open); mb.setAttribute("aria-expanded", open ? "true" : "false"); }
  mb.addEventListener("click", function (e) { e.stopPropagation(); setMenu(!body.classList.contains("menu-open")); });
  document.addEventListener("click", function (e) { if (body.classList.contains("menu-open") && !side.contains(e.target)) setMenu(false); });
  $$("a", side).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* ---------- Phóng to ảnh ---------- */
  var lb = el("div", { "class": "lightbox", role: "dialog", "aria-modal": "true", "aria-label": T("Ảnh phóng to") }, '<img alt=""><button class="btn" type="button">' + T("Đóng (Esc)") + '</button>');
  body.appendChild(lb);
  var lbImg = $("img", lb), lbAnno = null, lastFocus = null;
  function openLb(img) {
    lastFocus = document.activeElement;
    /* Ảnh có đánh số vùng (.anno): phóng to cả khung để giữ số và khung vùng */
    var a = img.closest(".anno");
    if (lbAnno) { lbAnno.remove(); lbAnno = null; }
    if (a) {
      lbAnno = a.cloneNode(true);
      lbAnno.style.width = "min(100%, calc((100vh - 48px) * " + (img.naturalWidth / img.naturalHeight) + "))";
      lb.insertBefore(lbAnno, lbImg);
      lbImg.style.display = "none";
    } else {
      lbImg.style.display = "";
      lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
    }
    lb.classList.add("is-open"); $("button", lb).focus();
  }
  function closeLb() { lb.classList.remove("is-open"); if (lastFocus) lastFocus.focus(); }
  $$(".pda-step img").forEach(function (img) { img.addEventListener("click", function () { openLb(img); }); });
  lb.addEventListener("click", closeLb);
  $$(".shot").forEach(function (f) {
    var img = $("img", f), cap = $("figcaption", f);
    if (!img) return;
    img.addEventListener("click", function () { openLb(img); });
    if (cap) {
      var b = el("button", { "class": "btn shot__zoom", type: "button" }, T("⤢ Phóng to"));
      b.addEventListener("click", function () { openLb(img); });
      cap.appendChild(b);
    }
  });

  /* ---------- Màn hình HTML thu nhỏ vừa khung (.shot__fit) ---------- */
  function fitLive() {
    $$(".shot__fit").forEach(function (box) {
      var fr = $("iframe", box);
      if (fr) fr.style.transform = "scale(" + box.clientWidth / 1920 + ")";
    });
  }
  fitLive();
  if (window.ResizeObserver) { var ro = new ResizeObserver(fitLive); $$(".shot__fit").forEach(function (b) { ro.observe(b); }); }
  else window.addEventListener("resize", fitLive);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (lb.classList.contains("is-open")) closeLb(); else setMenu(false); }
  });

  /* ---------- Dịch nội dung trang (EN/KO) ---------- */
  I18N.apply(main);

  /* ---------- In ---------- */
  $$("[data-print]").forEach(function (b) { b.addEventListener("click", function () { window.print(); }); });
})();

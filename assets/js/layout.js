/*
 * Dựng khung chung cho mọi trang từ window.TSD_MENU (menu.js):
 * thanh bên, thanh trên, nút Trước/Sau, thẻ mục ở trang chủ, mục lục tự sáng,
 * tìm kiếm, phóng to ảnh, copy ảnh màn HTML, In.
 * Trang cần: <body data-root="../" data-page="01"> và <main class="content">.
 * Không cần sửa file này khi thêm mục hay màn hình.
 */
(function () {
  "use strict";
  var MENU = window.TSD_MENU || [];
  var I18N = window.I18N || { tr: function (s) { return s; }, apply: function () {}, switcher: function () { return document.createElement("span"); } };
  /* Khung dựng bằng tiếng Việt; I18N.first() dịch sau, nên đổi ngôn ngữ không cần tải lại trang */
  var T = function (s) { return s; };
  var ALL = I18N.all || T;
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
        ' data-key="' + esc(fold(it.no + " " + ALL(it.title))) + '"><i>' + esc(it.no) + "</i><span>" + esc(T(it.title)) + "</span></a>";
      (it.screens || []).forEach(function (s) {
        nav += '<a class="nav sub" href="' + esc(link(it, s.id)) + '" data-parent="' + esc(it.page) + '"' + (it.page === PAGE ? ' data-spy="' + esc(s.id) + '"' : "") +
          ' data-key="' + esc(fold(s.no + " " + ALL(s.title) + " " + ALL(it.title))) + '"><i>' + esc(s.no) + "</i><span>" + esc(T(s.title)) + "</span></a>";
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

  /* ---------- Copy ảnh / Tải PNG cho màn HTML tương tác (.shot__live) ----------
     Chụp đúng trạng thái đang hiện trong khung (kể cả popup đang mở) bằng html-to-image (assets/js/vendor).
     Mở qua web: trang mục chụp thẳng khung. Mở file://: trang mục không đọc được khung nên nhờ mockup tự chụp
     (mockup nạp assets/js/shot-frame.js). Quá 90 giây thì báo không chụp được, không treo nút. */
  var h2iP = null;
  function loadH2I() {
    if (window.htmlToImage) return Promise.resolve(window.htmlToImage);
    if (!h2iP) h2iP = new Promise(function (ok, no) {
      var s = document.createElement("script");
      s.src = ROOT + "assets/js/vendor/html-to-image.js";
      s.onload = function () { ok(window.htmlToImage); };
      s.onerror = function () { h2iP = null; no(new Error("lib")); };
      document.head.appendChild(s);
    });
    return h2iP;
  }
  function frameDoc(fr) {
    try { return fr.contentDocument; } catch (e) { return null; }
  }
  function frameReady(fr) {
    var d = frameDoc(fr);
    if (!d) return Promise.resolve();               /* khác nguồn (file://): không xem được, coi như đã nạp */
    if (d.readyState === "complete" && d.location.href !== "about:blank") return Promise.resolve();
    return new Promise(function (ok) {
      fr.addEventListener("load", function () { ok(); }, { once: true });
      fr.loading = "eager";
    });
  }
  function timeout(p, ms) {
    return Promise.race([p, new Promise(function (ok, no) { setTimeout(function () { no(new Error("timeout")); }, ms); })]);
  }
  /* file://: nhờ chính mockup tự chụp (assets/js/shot-frame.js nạp trong mockup) */
  var shotSeq = 0;
  function askFrame(fr) {
    return new Promise(function (ok, no) {
      var id = "s" + (++shotSeq) + "_" + Date.now();
      function on(e) {
        var m = e.data;
        if (!m || m.type !== "tsd-shot-r" || m.id !== id) return;
        window.removeEventListener("message", on);
        if (m.blob) ok(m.blob); else no(new Error(m.error || "shot"));
      }
      window.addEventListener("message", on);
      fr.contentWindow.postMessage({ type: "tsd-shot", id: id, width: 1920 }, "*");
    });
  }
  /* Bỏ qua phần tử nằm hẳn ngoài khung nhìn (bảng dài hàng nghìn ô) để chụp nhanh */
  function inView(win) {
    var de = win.document.documentElement;
    var z = parseFloat(de.style.zoom || win.getComputedStyle(de).zoom) || 1;
    var vw = Math.max(win.innerWidth, win.innerWidth / z) + 40, vh = Math.max(win.innerHeight, win.innerHeight / z) + 40;
    return function (n) {
      if (n.nodeType !== 1 || !n.getBoundingClientRect) return true;
      var r = n.getBoundingClientRect();
      if (!r.width && !r.height) return true;
      return r.bottom >= -40 && r.right >= -40 && r.top <= vh && r.left <= vw;
    };
  }
  function shotPng(fr) {
    return timeout(frameReady(fr).then(function () {
      var doc = frameDoc(fr);
      if (!doc || !doc.body) return askFrame(fr);
      return loadH2I().then(function (lib) {
        /* Mockup tự co bằng zoom trên <html>: chụp ở kích thước gốc (zoom 1), ảnh ra rộng 1920 */
        var de = doc.documentElement, cs = doc.defaultView.getComputedStyle(de);
        var z = parseFloat(de.style.zoom || cs.zoom) || 1;
        var w = Math.round(fr.clientWidth / z), h = Math.round(fr.clientHeight / z), pr = Math.max(1, 1920 / w);
        var bg = doc.defaultView.getComputedStyle(doc.body).backgroundColor;
        if (!bg || bg === "transparent" || bg === "rgba(0, 0, 0, 0)") bg = "#ffffff";
        return (doc.fonts ? doc.fonts.ready : Promise.resolve()).then(function () {
          return lib.toBlob(de, { width: w, height: h, canvasWidth: w, canvasHeight: h, pixelRatio: pr, backgroundColor: bg, style: { zoom: "1" }, filter: inView(doc.defaultView) });
        });
      });
    }).then(function (b) { if (!b) throw new Error("blob"); return b; }), 90000);
  }
  function savePng(blob, name) {
    var a = document.createElement("a"), u = URL.createObjectURL(blob);
    a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
  }
  function flash(b, label, msg) {
    b.textContent = I18N.tr(msg);
    clearTimeout(b._t);
    b._t = setTimeout(function () { b.textContent = I18N.tr(label); b.disabled = false; }, 2200);
  }
  $$(".shot").forEach(function (f) {
    var fr = $("iframe.shot__live", f), cap = $("figcaption", f);
    if (!fr || !cap) return;
    var file = (fold(fr.getAttribute("title") || "man-hinh").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "man-hinh") + ".png";
    var acts = el("span", { "class": "shot__acts" });
    var bc = el("button", { "class": "btn shot__zoom", type: "button" }, T("⧉ Copy ảnh"));
    var bd = el("button", { "class": "btn shot__zoom", type: "button" }, T("⤓ Tải PNG"));
    acts.appendChild(bc); acts.appendChild(bd);
    var open = $("a.shot__zoom", cap);
    if (open) acts.appendChild(open);
    cap.appendChild(acts);
    function fail() { flash(bc, "⧉ Copy ảnh", "✕ Không chụp được"); flash(bd, "⤓ Tải PNG", "⤓ Tải PNG"); }
    bc.addEventListener("click", function () {
      if (bc.disabled) return;
      bc.disabled = true; bc.textContent = I18N.tr("Đang chụp…");
      var blobP = shotPng(fr);
      var toFile = function () { return blobP.then(function (b) { savePng(b, file); flash(bc, "⧉ Copy ảnh", "✓ Đã tải PNG"); }, fail); };
      if (navigator.clipboard && navigator.clipboard.write && window.ClipboardItem && window.isSecureContext) {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blobP })])
          .then(function () { flash(bc, "⧉ Copy ảnh", "✓ Đã copy"); }, toFile);
      } else toFile();
    });
    bd.addEventListener("click", function () {
      if (bd.disabled) return;
      bd.disabled = true; bd.textContent = I18N.tr("Đang chụp…");
      shotPng(fr).then(function (b) { savePng(b, file); flash(bd, "⤓ Tải PNG", "⤓ Tải PNG"); }, function () { flash(bd, "⤓ Tải PNG", "✕ Không chụp được"); });
    });
  });

  /* ---------- Màn hình HTML thu nhỏ vừa khung (.shot__fit) ---------- */
  function fitLive() {
    $$(".shot__fit").forEach(function (box) {
      var fr = $("iframe", box);
      if (fr) fr.style.transform = "scale(" + box.clientWidth / (fr.offsetWidth || 1920) + ")";
    });
  }
  fitLive();
  if (window.ResizeObserver) { var ro = new ResizeObserver(fitLive); $$(".shot__fit").forEach(function (b) { ro.observe(b); }); }
  else window.addEventListener("resize", fitLive);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (lb.classList.contains("is-open")) closeLb(); else setMenu(false); }
  });

  /* ---------- Dịch nội dung trang (EN/KO) ---------- */
  (I18N.first || I18N.apply)(document.body);

  /* ---------- In ---------- */
  $$("[data-print]").forEach(function (b) { b.addEventListener("click", function () { window.print(); }); });
})();

/*
 * Nạp trong mỗi mockup (mockups/NN-ten-muc/N.html): khi trang mục gửi postMessage {type:"tsd-shot"},
 * mockup tự chụp chính nó bằng html-to-image và gửi ảnh PNG (Blob) về.
 * Dùng khi mở site bằng file:// (trình duyệt không cho trang mục đọc nội dung khung).
 */
(function () {
  "use strict";
  var me = document.currentScript;
  var base = me && me.src ? me.src.replace(/[^\/]*$/, "") : "";
  var libP = null;
  function lib() {
    if (window.htmlToImage) return Promise.resolve(window.htmlToImage);
    if (!libP) libP = new Promise(function (ok, no) {
      var s = document.createElement("script");
      s.src = base + "vendor/html-to-image.js";
      s.onload = function () { ok(window.htmlToImage); };
      s.onerror = function () { libP = null; no(new Error("lib")); };
      document.head.appendChild(s);
    });
    return libP;
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
  window.addEventListener("message", function (e) {
    var m = e.data;
    if (!m || m.type !== "tsd-shot") return;
    var src = e.source;
    function reply(o) { o.type = "tsd-shot-r"; o.id = m.id; try { src.postMessage(o, "*"); } catch (x) {} }
    var de = document.documentElement, z = parseFloat(de.style.zoom || getComputedStyle(de).zoom) || 1;
    var w = Math.round(window.innerWidth / z), h = Math.round(window.innerHeight / z), pr = Math.max(1, (m.width || 1920) / w);
    var bg = getComputedStyle(document.body).backgroundColor;
    if (!bg || bg === "transparent" || bg === "rgba(0, 0, 0, 0)") bg = "#ffffff";
    lib().then(function (L) {
      return (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () {
        return L.toBlob(de, { width: w, height: h, canvasWidth: w, canvasHeight: h, pixelRatio: pr, backgroundColor: bg, style: { zoom: "1" }, filter: inView(window) });
      });
    }).then(function (b) { if (!b) throw new Error("blob"); reply({ blob: b }); }, function (err) { reply({ error: String(err) }); });
  });
})();

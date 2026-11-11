/* CyRamage Christmas theme v2 – overlay, no changes to your HTML files.
   Finds elements by their wording. Auto-switches off after 6 Jan 2027. */
(function () {
  if (new Date() >= new Date(2027, 0, 7)) return;
  document.documentElement.classList.add("xmas");

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  // Smallest element whose own text contains the phrase
  function findByText(selector, phrase) {
    var els = document.querySelectorAll(selector), best = null;
    for (var i = 0; i < els.length; i++) {
      if (els[i].textContent.indexOf(phrase) !== -1) {
        if (!best || els[i].textContent.length < best.textContent.length) best = els[i];
      }
    }
    return best;
  }

  ready(function () {
    // 1. Delivery bar: restyle and swap the truck for a tree
    var msg = findByText("body *", "Free UK Delivery on Orders Over");
    if (msg) {
      var bar = msg;
      while (bar.parentElement && bar.parentElement !== document.body &&
             bar.parentElement.textContent.length < msg.textContent.length + 40) {
        bar = bar.parentElement;
      }
      bar.classList.add("xm-bar");
      var walker = document.createTreeWalker(bar, NodeFilter.SHOW_TEXT), n;
      while ((n = walker.nextNode())) n.nodeValue = n.nodeValue.replace(/\u{1F69A}/gu, "\u{1F384}");
    }

    // 2. Homepage hero: Christmas eyebrow and a gift-sets button
    var eyebrow = findByText("body *", "CyRamage Signature");
    if (eyebrow && eyebrow.children.length === 0) eyebrow.textContent = "Christmas Collection";

    var cta = findByText("a", "Shop the Collection");
    if (cta && !document.querySelector(".xm-gift-btn")) {
      var gift = cta.cloneNode(true);
      gift.className = cta.className + " xm-gift-btn";
      gift.textContent = "Christmas Gift Sets";
      gift.setAttribute("href", "https://cyramage.com/gift-sets.html");
      cta.insertAdjacentElement("afterend", gift);
    }

    // 3. Gentle snow (off for reduced-motion visitors)
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var canvas = document.createElement("canvas");
    canvas.id = "xm-snow";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d"), w, h, flakes = [];
    var count = window.innerWidth < 700 ? 35 : 70;
    function resize() {
      var dpr = window.devicePixelRatio || 1;
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);
    for (var i = 0; i < count; i++) {
      flakes.push({ x: Math.random() * w, y: Math.random() * h,
                    r: 1 + Math.random() * 2.2, s: 0.3 + Math.random() * 0.8,
                    d: Math.random() * Math.PI * 2 });
    }
    var running = true;
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(tick);
    });
    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        f.d += 0.01; f.y += f.s; f.x += Math.sin(f.d) * 0.4;
        if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    tick();
  });
})();

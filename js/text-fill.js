/* Scroll-driven text fill: characters change from dim to full colour as the block
   moves up the viewport. Apply with the data-text-fill attribute on any element. */
(function () {
  var reduce = false;
  try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  var items = [].slice.call(document.querySelectorAll("[data-text-fill]")).map(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    var chars = [];
    el.setAttribute("aria-label", words.join(" "));
    el.textContent = "";
    words.forEach(function (word, i) {
      var w = document.createElement("span");
      w.className = "w";
      w.setAttribute("aria-hidden", "true");
      word.split("").forEach(function (ch) {
        var c = document.createElement("span");
        c.className = "c";
        c.textContent = ch;
        w.appendChild(c);
        chars.push(c);
      });
      if (i < words.length - 1) w.appendChild(document.createTextNode(" "));
      el.appendChild(w);
    });
    return { el: el, chars: chars };
  });
  if (!items.length) return;

  function update() {
    items.forEach(function (item) {
      if (reduce) { item.chars.forEach(function (c) { c.classList.add("on"); }); return; }
      var rect = item.el.getBoundingClientRect();
      var from = innerHeight * 0.85, to = innerHeight * 0.45;
      var progress = (from - rect.top) / Math.max(1, from - to + rect.height);
      var count = Math.round(Math.min(1, Math.max(0, progress)) * item.chars.length);
      item.chars.forEach(function (c, i) { c.classList.toggle("on", i < count); });
    });
  }

  update();
  addEventListener("scroll", function () { requestAnimationFrame(update); }, { passive: true });
  addEventListener("resize", update);
})();

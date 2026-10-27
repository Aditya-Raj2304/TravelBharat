/* Smooth wheel scrolling (lerp easing) and smooth in-page anchor jumps.
   Skipped for touch devices and for visitors who prefer reduced motion. */
(function () {
  var reduce = false,
    fine = false;
  try {
    reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    fine = matchMedia("(pointer: fine)").matches;
  } catch (e) {}
  if (reduce || !fine) return;

  var LERP = 0.07,
    WHEEL = 0.8;
  var root = document.documentElement;
  var target = 0,
    current = 0,
    raf = 0,
    last = 0,
    animating = false;

  function maxScroll() {
    return Math.max(0, root.scrollHeight - innerHeight);
  }

  function tick(now) {
    var dt = Math.min(64, now - last);
    last = now;
    var k = 1 - Math.pow(1 - LERP, dt / 16.67);
    var diff = target - current;
    animating = true;
    if (Math.abs(diff) < 0.4) {
      current = target;
      scrollTo(0, current);
      raf = 0;
      requestAnimationFrame(function () {
        animating = false;
      });
      return;
    }
    current += diff * k;
    scrollTo(0, current);
    raf = requestAnimationFrame(tick);
  }

  function scrollToY(y) {
    if (!animating) current = scrollY;
    target = Math.min(maxScroll(), Math.max(0, y));
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  }

  function insideScrollable(el) {
    for (
      var n = el;
      n && n !== document.body && n !== root;
      n = n.parentElement
    ) {
      if (
        /(auto|scroll)/.test(getComputedStyle(n).overflowY) &&
        n.scrollHeight > n.clientHeight + 1
      )
        return true;
    }
    return false;
  }

  addEventListener(
    "wheel",
    function (e) {
      if (e.ctrlKey || e.metaKey || insideScrollable(e.target)) return;
      /* sideways wheel or trackpad swipe, or Shift + wheel: leave it to the browser so horizontal strips scroll */
      if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (!animating) current = target = scrollY;
      var dy =
        e.deltaY *
        (e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? innerHeight : 1);
      scrollToY(target + dy * WHEEL);
    },
    { passive: false },
  );

  addEventListener(
    "scroll",
    function () {
      if (!animating) target = current = scrollY;
    },
    { passive: true },
  );

  document.addEventListener(
    "click",
    function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute("href") === "#") return;
      var el = document.getElementById(
        decodeURIComponent(a.getAttribute("href").slice(1)),
      );
      if (!el) return;
      e.preventDefault();
      scrollToY(el.getBoundingClientRect().top + scrollY - 76);
    },
    true,
  );
})();

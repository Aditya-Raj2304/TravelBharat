/* Small shared UI: mobile menu, scroll reveal, and a fallback for missing images. */
(function () {
  var reduce = false;
  try {
    reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  /* Mobile menu */
  var btn = document.getElementById("menu-toggle");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    btn.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        btn.focus();
      }
    });
  }

  /* Scroll reveal: elements with [data-reveal] fade in once. */
  var observer = null;
  if (!reduce && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
  }
  function reveal(root) {
    [].slice
      .call(
        (root || document).querySelectorAll("[data-reveal]:not(.is-visible)"),
      )
      .forEach(function (el) {
        if (observer) observer.observe(el);
        else el.classList.add("is-visible");
      });
  }

  /* Missing images: hide the broken icon so the neutral background shows instead. */
  document.addEventListener(
    "error",
    function (e) {
      if (e.target && e.target.tagName === "IMG")
        e.target.classList.add("is-missing");
    },
    true,
  );
  document.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.images, function (img) {
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src"))
        img.classList.add("is-missing");
    });
  });

  /* Horizontal strips (state tiles): drag with the mouse to scroll sideways.
     Touch and trackpad swipes scroll natively. */
  [].forEach.call(document.querySelectorAll(".strip"), function (strip) {
    var down = false,
      moved = false,
      startX = 0,
      startLeft = 0;
    strip.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = strip.scrollLeft;
    });
    addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 5) {
        moved = true;
        strip.classList.add("is-dragging");
      }
      if (moved) strip.scrollLeft = startLeft - dx;
    });
    addEventListener("pointerup", function () {
      down = false;
      strip.classList.remove("is-dragging");
    });
    strip.addEventListener(
      "click",
      function (e) {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      },
      true,
    );
    strip.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
    /* previous / next buttons under the strip */
    var nav = document.createElement("div");
    nav.className = "strip-nav";
    function mk(label, dir, d) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "icon-btn";
      b.setAttribute("aria-label", label);
      b.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' +
        d +
        '"/></svg>';
      b.addEventListener("click", function () {
        strip.scrollBy({
          left: dir * strip.clientWidth * 0.8,
          behavior: reduce ? "auto" : "smooth",
        });
      });
      return b;
    }
    var prev = mk("Scroll states left", -1, "M15 5l-7 7 7 7"),
      next = mk("Scroll states right", 1, "M9 5l7 7-7 7");
    nav.appendChild(prev);
    nav.appendChild(next);
    strip.parentNode.insertBefore(nav, strip.nextSibling);
    function edges() {
      var max = strip.scrollWidth - strip.clientWidth;
      prev.disabled = strip.scrollLeft <= 1;
      next.disabled = strip.scrollLeft >= max - 1;
      nav.hidden = max <= 1;
    }
    strip.addEventListener("scroll", edges, { passive: true });
    addEventListener("resize", edges);
    new MutationObserver(edges).observe(strip, { childList: true });
    edges();

    /* mouse wheel over the strip scrolls it sideways; at either end the page scrolls again */
    strip.addEventListener(
      "wheel",
      function (e) {
        if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        var max = strip.scrollWidth - strip.clientWidth;
        if (max <= 1) return;
        var atEdge =
          e.deltaY > 0 ? strip.scrollLeft >= max - 1 : strip.scrollLeft <= 0;
        if (atEdge) return;
        e.preventDefault();
        e.stopPropagation();
        strip.scrollLeft += e.deltaY;
      },
      { passive: false },
    );
  });

  /* Hero gate: the first scroll gesture only brings the hero content in;
     the next gesture scrolls the page. Wheel, touch, keyboard and scrollbar are handled. */
  var hero = document.querySelector(".hero");
  if (hero && !reduce) {
    var revealed = false,
      released = false,
      lastWheel = 0,
      touchY = 0;
    var showHero = function () {
      revealed = true;
      hero.classList.add("is-in");
      document.documentElement.classList.add(
        "hero-in",
      ); /* navbar uses this to come in with the hero */
    };
    var open = function () {
      showHero();
      released = true;
      removeGate();
    };

    var onWheel = function (e) {
      if (e.ctrlKey || e.deltaY <= 0) return;
      var now = performance.now();
      if (!revealed) {
        e.preventDefault();
        e.stopPropagation();
        showHero();
        lastWheel = now;
        return;
      }
      if (!released) {
        /* same flick or trackpad momentum: keep swallowing; a new gesture after a pause scrolls */
        if (now - lastWheel < 220) {
          e.preventDefault();
          e.stopPropagation();
          lastWheel = now;
          return;
        }
        released = true;
        removeGate();
      }
    };
    var blocked = false;
    var onTouchStart = function (e) {
      touchY = e.touches[0].clientY;
      if (revealed) {
        blocked = false;
        released = true;
        removeGate();
        return;
      }
      blocked = true;
    };
    var onTouchMove = function (e) {
      if (!blocked) return;
      e.preventDefault(); /* keep the page still for the whole first swipe */
      if (touchY - e.touches[0].clientY > 8 && !revealed) showHero();
    };
    var onKey = function (e) {
      var t = e.target && e.target.tagName;
      if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT") return;
      if (
        ["ArrowDown", "PageDown", "End", " ", "Spacebar"].indexOf(e.key) === -1
      )
        return;
      if (!revealed) {
        e.preventDefault();
        showHero();
        return;
      }
      released = true;
      removeGate();
    };
    /* scrollbar drag, anchor jump or restored position: do not block, just show the content */
    var onScroll = function () {
      if (scrollY > 10) open();
    };

    var removeGate = function () {
      removeEventListener("wheel", onWheel, true);
      removeEventListener("touchstart", onTouchStart, true);
      removeEventListener("touchmove", onTouchMove, true);
      removeEventListener("keydown", onKey, true);
      removeEventListener("scroll", onScroll);
    };

    if (scrollY > 10) showHero();
    else {
      addEventListener("wheel", onWheel, { passive: false, capture: true });
      addEventListener("touchstart", onTouchStart, {
        passive: true,
        capture: true,
      });
      addEventListener("touchmove", onTouchMove, {
        passive: false,
        capture: true,
      });
      addEventListener("keydown", onKey, true);
      addEventListener("scroll", onScroll, { passive: true });
    }
  }

  /* Reduced motion: no gate, show the framed hero and the content straight away */
  if (hero && reduce) {
    hero.classList.add("is-in");
    document.documentElement.classList.add("hero-in");
  }

  window.TBUI = { reveal: reveal };
  reveal(document);
})();
